import React, { useEffect, useState } from 'react';
import { PageHeader, Collapse, Input, Radio, Checkbox, Row, Col, Button, Form } from 'antd';
import { useHistory } from "react-router-dom";
import { FEEDBACK_INITIATE_BY_CARD_ID } from "../../../../../scripts/api";
import { getData, postData } from "../../../../../scripts/api-service";
import { alertPop } from '../../../../../scripts/message';
const CheckboxGroup = Checkbox.Group;

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

const Card = Form.create()(({ form, cardData, setCurrent, current, dataLength, answerData, setAnswerData, cardWiseQuestionList, feedbackId }) => {
    const history = useHistory();

    const handleInput = (value, id) => {
        let data = [...answerData];
        let idx = data.findIndex(item => item.id === id);

        if (idx !== -1) {
            data[idx].answer = value;
            setAnswerData(data);
        } else {
            setAnswerData([...answerData, {
                id: id,
                answer: value
            }])
        }
    }

    const showInitialValue = (itemId, context) => {
        let data = answerData.find(item => item.id === itemId);

        if (data) {
            return data.answer || undefined;
        }
    }

    const showCollapsePanel = (data) => {
        if (data.feedback_question?.type === "Text") {
            return (
                <Collapse.Panel header={data.feedback_question?.name} key={data.feedback_question?.id}>
                    <Form.Item>
                        {form.getFieldDecorator(`name-${data.feedback_question?.id}`, {
                            initialValue: showInitialValue(data.feedback_question?.id, 'Radio')
                        })(<Input
                            placeholder="Enter answer here"
                            size="large"
                            onChange={(event) => {
                                handleInput(event.target.value, data.feedback_question?.id);
                            }}
                        />)}
                    </Form.Item>
                </Collapse.Panel>
            )
        } else if (data.feedback_question?.type === "Radio") {
            return (
                <Collapse.Panel
                    key={data.feedback_question?.id}
                    header={`${data.feedback_question?.name}`}
                >
                    <Row>
                        <Col span={24}>
                            <Form.Item>
                                {form.getFieldDecorator(`name-${data.feedback_question?.id}`, {
                                    initialValue: showInitialValue(data.feedback_question?.id, 'Radio') //item.checked ? item.checked : undefined
                                })(
                                    <Radio.Group onChange={(event) => {
                                        handleInput(event.target.value, data?.feedback_question?.id)
                                    }}>
                                        { JSON.parse(data.answer)?.map(item => <>
                                            <Radio style={radioStyle} value={item.name} key={item.name}>
                                                {item.name}
                                            </Radio>
                                        </>)}
                                    </Radio.Group>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                </Collapse.Panel>
            )
        } else if (data.feedback_question?.type === "Checkbox") {
            return (
                <Collapse.Panel header={data.feedback_question?.name} key={data.feedback_question?.id}>
                    <Row key={data.feedback_question?.id}>
                        <Col span={24}>
                            <Form.Item>
                                {form.getFieldDecorator(`name-${data?.feedback_question?.id}`, {
                                    initialValue: showInitialValue(data.feedback_question?.id, 'Checkbox') //item.checked ? item.checked : undefined
                                })(
                                    <CheckboxGroup style={{ width: '100%' }}
                                        onChange={(value) => handleInput(value, data.feedback_question?.id)}
                                    >
                                        <Row>
                                            {JSON.parse(data.answer)?.map(item =>
                                                <Col span={24}>
                                                    <Checkbox value={item.name}>{item.name}</Checkbox>
                                                </Col>)}
                                        </Row>
                                    </CheckboxGroup>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                </Collapse.Panel>
            )
        }
    }

    const localSubmit = (e) => {
        e.preventDefault();

        form.validateFields(async (err, values) => {
            if (!err) {
                let cardDataArray = [];

                cardData.questions.forEach(qus => {
                    if (qus.feedback_question?.type === "Radio") {
                        let obj = {
                            "init_question_id": qus.id,
                            "answer": ""
                        };

                        let arr = JSON.parse(qus?.answer),
                            find = answerData.find(i => i.id === qus.feedback_question_id);

                        if (find) {
                            let array = [];
                            arr.forEach(a => {
                                array.push({
                                    name: a.name,
                                    checked: a.name === find.answer ? 1 : 0
                                })
                            });

                            obj.answer = JSON.stringify(array);
                        } else {
                            obj.answer = JSON.stringify(arr);
                        }

                        cardDataArray.push(obj);
                    } else if (qus.feedback_question?.type === "Checkbox") {
                        let obj = {
                            "init_question_id": qus.id,
                            "answer": ""
                        };

                        let arr = JSON.parse(qus.answer),
                            find = answerData.find(i => i.id === qus.feedback_question_id);

                        if (find) {
                            let array = [];
                            arr.forEach(a => {
                                array.push({
                                    name: a.name,
                                    checked: find.answer.findIndex(fi => fi === a.name) !== -1 ? 1 : 0
                                })
                            });

                            obj.answer = JSON.stringify(array);
                        } else {
                            obj.answer = JSON.stringify(arr);
                        };

                        cardDataArray.push(obj);
                    } else if (qus.feedback_question?.type === "Text") {
                        cardDataArray.push({
                            "init_question_id": qus.id,
                            "answer": answerData.find(an => an.id === qus.feedback_question_id)?.answer || ''
                        })
                    }
                });

                let url = FEEDBACK_INITIATE_BY_CARD_ID + "/" + cardData?.id;
                let res = await postData(url, {card: cardDataArray});

                if (res) {
                    setCurrent(current + 1);
                    alertPop('success', 'Process completed successfully');

                  if(current === dataLength) history.push('/feedback/my-feedback-list');
                }
            }
        })
    }

    useEffect(() => {
        console.log("answerData", answerData);
    }, [answerData])

    return (
        <div
            key={cardData.id}
            style={{
                border: '1px solid #D3D3D3',
                borderRadius: '20px',
                margin: '1rem',
            }}
        >
            <PageHeader
                style={{
                    border: '1px solid rgb(235, 237, 240)',
                    borderRadius: '20px',
                }}
                title={cardData?.card_name}
            />
            <Form
                className="m-4"
                onSubmit={localSubmit}
                style={{                
                    maxHeight: '450px',
                    overflowY: 'scroll'
                }}
            >
                <Row>
                    <Col span={24}>
                        {cardData?.questions?.map(item => {
                            return (
                                <Collapse
                                    key={item.id}
                                    defaultActiveKey={cardData?.questions?.map(item => item.feedback_question?.id)}                                    className="m-2"
                                // onChange={callback}
                                >
                                    {showCollapsePanel(item)}
                                </Collapse>
                            )
                        })}
                    </Col>
                </Row>
                <div>
                    <Button
                        type="primary"
                        size="large"
                        style={{ margin: '1rem', float: 'left' }}
                        onClick={() => setCurrent(current - 1)}
                        disabled={current === 0 ? true : false}
                    >Previous</Button>
                    <Button
                        type="primary"
                        size="large"
                        htmlType="submit"
                        style={{ margin: '1rem', float: 'right' }}
                    // disabled={current === dataLength ? true : false}
                    // onClick={() => {
                    //     // if (current !== dataLength ) setCurrent(current + 1);
                    //     // if (current === dataLength) {
                    //     //     history.push('/feedback/config-feedback-submission-list');
                    //     // }
                    // }}
                    >
                        {current === dataLength ? "Submit" : "Next"}
                    </Button>
                </div>
            </Form>

        </div>
    )
})

export default Card;