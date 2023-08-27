import {Flex} from "../Flex";
import React, {useEffect, useState} from "react";
import {Button, Col, Form, Row, Steps} from "antd";
import styled from "styled-components";
import DynamicForm from "./DynamicForm";

const StyledBtn = styled(Button)`
  padding: 0 4.2rem;
`;

export const CreateStepperForm = ({steps, fields, loading, submit, edit, isDetailsView}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [editSubmitNow, setEditSubmitNow] = useState(false);

    useState(() => {
        if (edit) {
            setFormData(edit);
        }
    }, []);

    useEffect(() => {
        submit(formData, editSubmitNow, currentStep);
    }, [formData]);

    return (
        <Flex direction="column">
            <Steps current={currentStep}>
                {steps && steps.map((item, idx) => <Steps.Step {...item} />)}
            </Steps>
            <Flex full space="1rem 0">
                {steps[currentStep].dynamic ? (
                    <DynamicForm
                        fields={steps[currentStep].fields}
                        current={currentStep}
                        setCurrent={setCurrentStep}
                        steps={steps}
                        loading={loading}
                        formData={formData}
                        setFormData={setFormData}
                        setEditSubmitNow={setEditSubmitNow}
                        isDetailsView={isDetailsView}
                    />
                ) : (
                    <FormBuilder
                        fields={steps[currentStep].fields}
                        current={currentStep}
                        setCurrent={setCurrentStep}
                        steps={steps}
                        loading={loading}
                        formData={formData}
                        setFormData={setFormData}
                        setEditSubmitNow={setEditSubmitNow}
                        isDetailsView={isDetailsView}
                    />
                )}
            </Flex>
        </Flex>
    );
};

const FormBuilder = Form.create()(
    ({
         form,
         fields,
         loading,
         current,
         setCurrent,
         steps,
         formData,
         setFormData,
         setEditSubmitNow
     }) => {
        const localSubmit = () => {
            form.validateFields((err, values) => {
                if (!err) {
                    const entry = {...formData, [current]: {...values}};
                    setFormData(entry);
                    if (current < steps.length - 1) {
                        setCurrent((state) => state + 1);
                    }
                }
            });
        };

        const prevStep = () => current > 0 && setCurrent((state) => state - 1);

        useEffect(() => {
            if (formData && formData[current]) {
                form.setFieldsValue(formData[current]);
            }
        }, [current]);
        return (
            <Form style={{width: "100%"}}>
                <Row gutter={32}>
                    {fields &&
                    fields.map(
                        ({
                             id,
                             label,
                             name,
                             component,
                             full,
                             col,
                             customRules = [],
                             display = true,
                             required = true,
                             message = "Required!",
                            otherConfig={},
                            style
                         }) => (
                            display && <Col key={id} span={full ? 24 : col ? col : 12} style={style ? style : {}}>
                                <Form.Item label={label}>
                                    {form.getFieldDecorator(name, {
                                        ...otherConfig,
                                        rules: [
                                            {required, message},
                                            ...(customRules || []),
                                        ],
                                    })(component)}
                                </Form.Item>
                            </Col>
                        )
                    )}
                </Row>
                <Flex full justify="space-between">
                    <StyledBtn
                        size="large"
                        type="primary"
                        disabled={current < 1}
                        onClick={prevStep}
                    >
                        Prev
                    </StyledBtn>
                    <StyledBtn
                        size="large"
                        type="primary"
                        onClick={() => {
                            if (current === steps.length - 1) {
                                form.submit(localSubmit);
                                setEditSubmitNow(true);
                            } else {
                                form.submit(localSubmit);
                                setEditSubmitNow(false);
                            }
                        }}
                    >
                        {current === steps.length - 1 ? "Submit" : "Next"}
                    </StyledBtn>
                </Flex>
            </Form>
        );
    }
);
