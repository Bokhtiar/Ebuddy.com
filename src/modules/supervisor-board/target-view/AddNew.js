import React, {useState, useEffect} from 'react';
import {Input, Radio, Col, Row, Select, DatePicker, Checkbox, Form, Icon, Button, Typography, Empty, Card} from "antd";
import styled from "styled-components";
import {Flex} from "../../commons/Flex";
import {getData} from "../../../scripts/api-service";
import {postData} from "../../../scripts/postData";
import moment from "moment";
import {alertPop} from "../../../scripts/message";

const Helper = styled.p`
  font-size: 0.8rem;
  margin: -0.5rem 0 -1rem 0;
  color: gray;
`;
const gridStyle = {
    width: '33.33%',
    textAlign: 'center',
};
const {Option} = Select;

export default function ActivityForm({setModal, quarterTargetDetails, isTaskUpdate, updateEvent}) {
    const [loading, setLoading] = useState();
    const [dropdownData, setDropdownData] = useState();
    const [isUpdateState, setIsUpdateState] = useState(isTaskUpdate);

    const submit = (value, form) => {
        setLoading(true);
        value.reporter = dropdownData?.reporter?.empid;
        value.status = isTaskUpdate ? quarterTargetDetails?.quarterTarget_status || 'To-Do' : 'To-Do';
        value.start_date = value.start_date.format('YYYY-MM-DD') + '';
        value.due_date = value.due_date.format('YYYY-MM-DD') + '';

        if (!value.parent_quarterTarget_id) delete value.parent_quarterTarget_id;

        const url = isUpdateState ? `/task/v1/quarter-target/${quarterTargetDetails?.id}` : '/task/v1/quarter-target-create';

        postData(url, value).then(res => {
            if (res?.data?.code == 201) {
                setModal(value.is_create_another == true);
                form.resetFields();
                setDropdownData((preState) => ({
                    projectList: preState.projectList
                }));
                setLoading(false);
                alertPop("success", "Successfully compete the process");
                // updateEvent();
            } else {
                alertPop("error", res[0]);
                // alertPop("error", "Check your internet connection!");
                // alertPop("error", res?.data?.messages[0]);
            }
        });
        setLoading(false);
        updateEvent(isUpdateState);
    };

    const dropDownDataSet = (url, key) => {
        getData(url).then(res => {
            if (key) {
                setDropdownData((preState) => ({
                    ...preState,
                    [key]: res?.data?.data || []
                }));

            } else {
                setDropdownData((preState) => ({
                    ...preState,
                    ...res?.data?.data || {}
                }));
            }
        });
    }
    useEffect(() => {
        dropDownDataSet('task/v1/project-setup-list', 'projectList');
        if (isTaskUpdate) {
            setIsUpdateState(isTaskUpdate);
            methods.projectChangeHandle(quarterTargetDetails?.project_details?.id);
            setDropdownData((prepState) => ({
                ...prepState,
                reporter: quarterTargetDetails?.reporter ? {
                    ...quarterTargetDetails?.reporter,
                    empid: quarterTargetDetails?.reporter.emp_id
                } : {}
            }));
        }

    }, [quarterTargetDetails, isTaskUpdate]);
    const methods = {
        projectChangeHandle: (e) => dropDownDataSet(`/task/v1/activity-select-params/${e}`, false),
        selectAssigneeHandle: (e) => {
            dropDownDataSet(`/task/v1/quarterTarget/assigne/${e}`, 'reporter');

        },
    };
    return <CreateForm submit={submit} methods={methods} dropdownData={dropdownData}
                       loading={loading} quarterTargetDetails={quarterTargetDetails} isUpdateState={isUpdateState}/>;
}

const CreateForm = Form.create()(
    ({form, submit, loading, editValues, dropdownData, methods, quarterTargetDetails, isUpdateState}) => {
        const localSubmit = (e) => {
            e.preventDefault();
            form.validateFields((err, values) => {
                if (!err) {
                    submit(values, form);
                }
            });
        };
        const [isCommunication, setIsCommunication] = useState(!!quarterTargetDetails?.is_communication);
        const communication_mediums = [
            {value: 'Visit', label: 'Visit',},
            {value: 'Call', label: 'Call'},
            {value: 'Email', label: 'Email'}
        ];
        return (
            <Form onSubmit={localSubmit}>
                <Row gutter={32}>
                    <Col span={6}>
                        <Form.Item label={'YEAR'}>
                            {form.getFieldDecorator('project_id', {
                                rules: [{required: true, message: "Required!"}],
                                initialValue: dropdownData?.projectList && quarterTargetDetails?.project_details?.id ? quarterTargetDetails.project_details.id : undefined
                            })(<Select placeholder='Select Project' size="large" onChange={methods.projectChangeHandle}>
                                {dropdownData?.projectList?.map((project, index) =>
                                    <Select.Option key={`project-${index}-${project.id}`}
                                                   value={project.id}>{project.name}</Select.Option>
                                )}
                            </Select>)}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label={'QUARTER'}>
                            {form.getFieldDecorator('project_id', {
                                rules: [{required: true, message: "Required!"}],
                                initialValue: dropdownData?.projectList && quarterTargetDetails?.project_details?.id ? quarterTargetDetails.project_details.id : undefined
                            })(<Select placeholder='Select Project' size="large" onChange={methods.projectChangeHandle}>
                                {dropdownData?.projectList?.map((project, index) =>
                                    <Select.Option key={`project-${index}-${project.id}`}
                                                   value={project.id}>{project.name}</Select.Option>
                                )}
                            </Select>)}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={'KAM'}>
                            {form.getFieldDecorator('project_id', {
                                rules: [{required: true, message: "Required!"}],
                                initialValue: dropdownData?.projectList && quarterTargetDetails?.project_details?.id ? quarterTargetDetails.project_details.id : undefined
                            })(<Select placeholder='Select Project' size="large" onChange={methods.projectChangeHandle}>
                                {dropdownData?.projectList?.map((project, index) =>
                                    <Select.Option key={`project-${index}-${project.id}`}
                                                   value={project.id}>{project.name}</Select.Option>
                                )}
                            </Select>)}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={32}>
                    <Col span={12}>
                        <Form.Item label={'INDUSTRY TYPE'}>
                            {form.getFieldDecorator('title', {
                                rules: [{required: true, message: "Required!"}],
                                initialValue: quarterTargetDetails?.title
                            })(<Input size="large" placeholder="Enter Title"/>)}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={'CLIENT NAME'}>
                            {form.getFieldDecorator('parent_quarterTarget_id', {
                                rules: [],
                                initialValue: quarterTargetDetails?.parent_quarterTarget?.id ? quarterTargetDetails?.parent_quarterTarget?.id : undefined
                            })(<Select size="large" placeholder='Select Parenttask'
                            >
                                {dropdownData?.parent_quarterTarget?.map((parent_act, index) =>
                                    <Select.Option key={`parent_act-${index}-${parent_act.id}`}
                                                   value={parent_act.id}>{parent_act.title}</Select.Option>
                                )}
                            </Select>)}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={'SERVICE TYPE'}>
                            {form.getFieldDecorator('quarterTarget_type_id', {
                                rules: [{required: true, message: "Required!"}],
                                initialValue: quarterTargetDetails?.quarterTarget_type?.id ? quarterTargetDetails?.quarterTarget_type?.id : quarterTargetDetails?.quarterTarget_type_formatted?.id ? quarterTargetDetails?.quarterTarget_type_formatted?.id : undefined
                            })(
                                <Select size="large" placeholder='Select Type'>
                                    {dropdownData?.quarterTarget_types?.map((quarterTarget_type, index) =>
                                        <Select.Option key={`quarterTarget_type-${index}-${quarterTarget_type.id}`}
                                                       value={quarterTarget_type.id}>{quarterTarget_type.name}</Select.Option>
                                    )}
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={'SERVICE NAME'}>
                            {form.getFieldDecorator('project_milestone_id', {
                                rules: [{required: true, message: "Required!"}],
                                initialValue: quarterTargetDetails?.milestone?.id ? quarterTargetDetails?.milestone?.id : undefined
                            })(<Select size="large" placeholder='Select Milestone'>
                                {dropdownData?.milestones?.map((milestone, index) =>
                                    <Select.Option key={`milestone-${index}-${milestone.id}`}
                                                   value={milestone.id}>{milestone.name}</Select.Option>
                                )}
                            </Select>)}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={32}>
                    <Col span={8} style={{'paddingRight':0}}>
                        <Card title={'Month'} style={{margin: 0}}>
                            <div className="ml-2 mr-2">
                                <Form.Item style={{'marginBottom':'5px'}}>
                                    {form.getFieldDecorator('project_id', {
                                        rules: [{required: true, message: "Required!"}],
                                        initialValue: dropdownData?.projectList && quarterTargetDetails?.project_details?.id ? quarterTargetDetails.project_details.id : undefined
                                    })(<Select className='mt-2' placeholder='Select Project' size="large"
                                               onChange={methods.projectChangeHandle}>
                                        {dropdownData?.projectList?.map((project, index) =>
                                            <Select.Option key={`project-${index}-${project.id}`}
                                                           value={project.id}>{project.name}</Select.Option>
                                        )}
                                    </Select>)}
                                </Form.Item>
                                <Form.Item style={{'marginBottom':'5px'}}>
                                    {form.getFieldDecorator('project_id', {
                                        rules: [{required: true, message: "Required!"}],
                                        initialValue: dropdownData?.projectList && quarterTargetDetails?.project_details?.id ? quarterTargetDetails.project_details.id : undefined
                                    })(<Select placeholder='Select Project' size="large"
                                               onChange={methods.projectChangeHandle}>
                                        {dropdownData?.projectList?.map((project, index) =>
                                            <Select.Option key={`project-${index}-${project.id}`}
                                                           value={project.id}>{project.name}</Select.Option>
                                        )}
                                    </Select>)}
                                </Form.Item>
                                <Form.Item style={{'marginBottom':'5px'}}>
                                    {form.getFieldDecorator('project_id', {
                                        rules: [{required: true, message: "Required!"}],
                                        initialValue: dropdownData?.projectList && quarterTargetDetails?.project_details?.id ? quarterTargetDetails.project_details.id : undefined
                                    })(<Select placeholder='Select Project' size="large"
                                               onChange={methods.projectChangeHandle}>
                                        {dropdownData?.projectList?.map((project, index) =>
                                            <Select.Option key={`project-${index}-${project.id}`}
                                                           value={project.id}>{project.name}</Select.Option>
                                        )}
                                    </Select>)}
                                </Form.Item>
                            </div>
                        </Card>
                    </Col>
                    <Col span={8} style={{'paddingRight':0,'paddingLeft':0}}>
                        <Card title={'* OTC (AMOUNT IN BDT)'}>
                            <div className="ml-2 mr-2">
                                <Form.Item style={{'marginBottom':'5px'}}>
                                    {form.getFieldDecorator('project_id', {
                                        rules: [{required: true, message: "Required!"}],
                                        initialValue: dropdownData?.projectList && quarterTargetDetails?.project_details?.id ? quarterTargetDetails.project_details.id : undefined
                                    })(<Select className='mt-2' placeholder='Select Project' size="large"
                                               onChange={methods.projectChangeHandle}>
                                        {dropdownData?.projectList?.map((project, index) =>
                                            <Select.Option key={`project-${index}-${project.id}`}
                                                           value={project.id}>{project.name}</Select.Option>
                                        )}
                                    </Select>)}
                                </Form.Item>
                                <Form.Item style={{'marginBottom':'5px'}}>
                                    {form.getFieldDecorator('project_id', {
                                        rules: [{required: true, message: "Required!"}],
                                        initialValue: dropdownData?.projectList && quarterTargetDetails?.project_details?.id ? quarterTargetDetails.project_details.id : undefined
                                    })(<Select placeholder='Select Project' size="large"
                                               onChange={methods.projectChangeHandle}>
                                        {dropdownData?.projectList?.map((project, index) =>
                                            <Select.Option key={`project-${index}-${project.id}`}
                                                           value={project.id}>{project.name}</Select.Option>
                                        )}
                                    </Select>)}
                                </Form.Item>
                                <Form.Item style={{'marginBottom':'5px'}}>
                                    {form.getFieldDecorator('project_id', {
                                        rules: [{required: true, message: "Required!"}],
                                        initialValue: dropdownData?.projectList && quarterTargetDetails?.project_details?.id ? quarterTargetDetails.project_details.id : undefined
                                    })(<Select placeholder='Select Project' size="large"
                                               onChange={methods.projectChangeHandle}>
                                        {dropdownData?.projectList?.map((project, index) =>
                                            <Select.Option key={`project-${index}-${project.id}`}
                                                           value={project.id}>{project.name}</Select.Option>
                                        )}
                                    </Select>)}
                                </Form.Item>
                            </div>

                        </Card>
                    </Col>
                    <Col span={8} style={{'paddingLeft':0}}>
                        <Card title={'* MRC/AMC (AMOUNT IN BDT)'}>
                            <div className="ml-2 mr-2">
                                <Form.Item style={{'marginBottom':'5px'}}>
                                    {form.getFieldDecorator('project_id', {
                                        rules: [{required: true, message: "Required!"}],
                                        initialValue: dropdownData?.projectList && quarterTargetDetails?.project_details?.id ? quarterTargetDetails.project_details.id : undefined
                                    })(<Select className='mt-2' placeholder='Select Project' size="large"
                                               onChange={methods.projectChangeHandle}>
                                        {dropdownData?.projectList?.map((project, index) =>
                                            <Select.Option key={`project-${index}-${project.id}`}
                                                           value={project.id}>{project.name}</Select.Option>
                                        )}
                                    </Select>)}
                                </Form.Item>
                                <Form.Item style={{'marginBottom':'5px'}}>
                                    {form.getFieldDecorator('project_id', {
                                        rules: [{required: true, message: "Required!"}],
                                        initialValue: dropdownData?.projectList && quarterTargetDetails?.project_details?.id ? quarterTargetDetails.project_details.id : undefined
                                    })(<Select placeholder='Select Project' size="large"
                                               onChange={methods.projectChangeHandle}>
                                        {dropdownData?.projectList?.map((project, index) =>
                                            <Select.Option key={`project-${index}-${project.id}`}
                                                           value={project.id}>{project.name}</Select.Option>
                                        )}
                                    </Select>)}
                                </Form.Item>
                                <Form.Item style={{'marginBottom':'5px'}}>
                                    {form.getFieldDecorator('project_id', {
                                        rules: [{required: true, message: "Required!"}],
                                        initialValue: dropdownData?.projectList && quarterTargetDetails?.project_details?.id ? quarterTargetDetails.project_details.id : undefined
                                    })(<Select placeholder='Select Project' size="large"
                                               onChange={methods.projectChangeHandle}>
                                        {dropdownData?.projectList?.map((project, index) =>
                                            <Select.Option key={`project-${index}-${project.id}`}
                                                           value={project.id}>{project.name}</Select.Option>
                                        )}
                                    </Select>)}
                                </Form.Item>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={32}>
                    <Col span={8} style={{'paddingRight':0}}>
                        <Card style={{margin: 0}}>
                            <div className="ml-2 mr-2">
                                <Form.Item style={{'marginBottom':'5px'}}>
                                    {form.getFieldDecorator('project_id', {
                                        rules: [{required: true, message: "Required!"}],
                                        initialValue: dropdownData?.projectList && quarterTargetDetails?.project_details?.id ? quarterTargetDetails.project_details.id : undefined
                                    })(<Select className='mt-2' placeholder='Select Project' size="large"
                                               onChange={methods.projectChangeHandle}>
                                        {dropdownData?.projectList?.map((project, index) =>
                                            <Select.Option key={`project-${index}-${project.id}`}
                                                           value={project.id}>{project.name}</Select.Option>
                                        )}
                                    </Select>)}
                                </Form.Item>
                            </div>
                        </Card>
                    </Col>
                    <Col span={8} style={{'paddingRight':0,'paddingLeft':0}}>
                        <Card>
                            <div className="ml-2 mr-2">
                                <Form.Item style={{'marginBottom':'5px'}}>
                                    {form.getFieldDecorator('project_id', {
                                        rules: [{required: true, message: "Required!"}],
                                        initialValue: dropdownData?.projectList && quarterTargetDetails?.project_details?.id ? quarterTargetDetails.project_details.id : undefined
                                    })(<Select className='mt-2' placeholder='Select Project' size="large"
                                               onChange={methods.projectChangeHandle}>
                                        {dropdownData?.projectList?.map((project, index) =>
                                            <Select.Option key={`project-${index}-${project.id}`}
                                                           value={project.id}>{project.name}</Select.Option>
                                        )}
                                    </Select>)}
                                </Form.Item>
                            </div>
                        </Card>
                    </Col>
                    <Col span={8} style={{'paddingLeft':0}}>
                        <Card>
                            <div className="ml-2 mr-2">
                                <Form.Item style={{'marginBottom':'5px'}}>
                                    {form.getFieldDecorator('project_id', {
                                        rules: [{required: true, message: "Required!"}],
                                        initialValue: dropdownData?.projectList && quarterTargetDetails?.project_details?.id ? quarterTargetDetails.project_details.id : undefined
                                    })(<Select className='mt-2' placeholder='Select Project' size="large"
                                               onChange={methods.projectChangeHandle}>
                                        {dropdownData?.projectList?.map((project, index) =>
                                            <Select.Option key={`project-${index}-${project.id}`}
                                                           value={project.id}>{project.name}</Select.Option>
                                        )}
                                    </Select>)}
                                </Form.Item>
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Flex space="1rem" justify="flex-end">
                    <Button
                        style={{width: 'auto'}}
                        loading={loading}
                        block
                        type="primary"
                        htmlType="submit"
                    >
                        {isUpdateState ? 'Update' : 'Create New'}
                    </Button>
                </Flex>
            </Form>
        );
    }
);
