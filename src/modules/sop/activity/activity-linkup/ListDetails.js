import React, { useEffect, useState } from 'react'
import { Button, Form, Input, InputNumber, Select, Checkbox, Table, Row, Col, Timeline, Collapse, Avatar, Icon, Tag, Progress, PageHeader, Card } from "antd";
import { getData } from '../../../../scripts/api-service';
import { DESIGNATION_LIST_ALL, DEPARTMENT_LIST_ALL, TASK_SOP_FUNCTION_LIST, TASK_SOP_FUNCTION_TYPE_LIST, TEAMS_LIST_ALL } from '../../../../scripts/api';

const { TextArea } = Input;

export default function ListDetails({ form, departments, index, itemId, activity, sopWiseDepartmentList }) {
    const [designation, setDesignation] = useState();
    const [functionNames, SetFunctionNames] = useState();
    const [sopFunctionsType, setSopFunctionsType] = useState();

    const handelDepartment = (val) => {
        // getTeamsList(val);
        getDesignationList(val);
        getSOPFunctionType(val);
        form.resetFields([`designation_id-${itemId}`, `function_type_id-${itemId}`, `function_id-${itemId}`]);
    }

    const getDesignationList = async (val) => {
        let res = await getData(DESIGNATION_LIST_ALL + '?department_id=' + val);

        if (res) {
            setDesignation(res?.data?.data);
        }
    }

    const handelFunctionType = async (val) => {
        form.resetFields(`function_id-${itemId}`);

        let res = await getData(TASK_SOP_FUNCTION_LIST + '?function_type_id=' + val);

        if (res) {
            SetFunctionNames(res?.data?.data);
        }
    };

    const getSOPFunctionType = async (val) => {
        let res = await getData(TASK_SOP_FUNCTION_TYPE_LIST + '?department_id=' + val);

        if (res) {
            setSopFunctionsType(res?.data?.data)
        }
    }

    useEffect(() => {
        if (activity && itemId) {
            let data = {};
            data[`id-${itemId}`] = activity.id;
            data[`department_id-${itemId}`] = activity.department_id;
            data[`designation_id-${itemId}`] = activity.designation_id;
            data[`function_type_id-${itemId}`] = activity.function_type_id;
            data[`function_id-${itemId}`] = activity.function_id;
            data[`activity_name-${itemId}`] = activity.activity_name;
            data[`estimation_day-${itemId}`] = activity.estimation_day;
            data[`estimation_time-${itemId}`] = activity.estimation_time;
            data[`status-${itemId}`] = activity.status;
            data[`is_attachment_required-${itemId}`] = activity.is_attachment_required ? true : false;

            getDesignationList(activity.department_id);
            handelFunctionType(activity.function_type_id);
            getSOPFunctionType(activity.department_id);

            form.setFieldsValue(data);
        }
    }, [])

    return (
        <>
            <Row gutter={32}>
                <Col span={16}>
                    <Row gutter={32}>
                        <Form.Item label={'test'} className="d-none">
                            {form.getFieldDecorator(`${itemId}`, {
                                rules: [{ required: false, message: "Required!" }],
                                initialValue: index
                            })(<Input disabled />)}
                        </Form.Item>

                        <Form.Item label={'heloo'} className="d-none">
                            {form.getFieldDecorator(`id-${itemId}`, {
                                rules: [{ required: false, message: "Required!" }],
                                // initialValue: index
                            })(<Input disabled />)}
                        </Form.Item>

                        <Col span={11}>
                            <Form.Item label={'Department'}>
                                {form.getFieldDecorator(`department_id-${itemId}`, {
                                    rules: [{ required: true, message: "Required!" }],
                                    initialValue: undefined
                                })(<Select 
                                        showSearch 
                                        placeholder='Select Department'
                                        size="large" 
                                        disabled={!departments?.length}
                                        onChange={handelDepartment}
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.props.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0}
                                    >
                                    {sopWiseDepartmentList?.map((project, index) =>
                                        <Select.Option key={`project-${index}-${project.id}`}
                                            value={project.id}>{project.name}</Select.Option>
                                    )}
                                    {/* {departments?.map((project, index) =>
                                        <Select.Option key={`project-${index}-${project.id}`}
                                            value={project.id}>{project.name}</Select.Option>
                                    )} */}
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item label={'Designation'}>
                                {form.getFieldDecorator(`designation_id-${itemId}`, {
                                    rules: [{ required: true, message: "Required!" }],
                                    initialValue: undefined
                                })(<Select 
                                        allowClear={true}
                                        showSearch 
                                        placeholder='Select Designation' 
                                        size="large" 
                                        disabled={!designation?.length}
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.props.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0}
                                    >
                                    {designation?.map((project, index) =>
                                        <Select.Option key={`project-${index}-${project.id}`}
                                            value={project.id}>{project.name}</Select.Option>
                                    )}
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item label={'Function Type'}>
                                {form.getFieldDecorator(`function_type_id-${itemId}`, {
                                    rules: [{ required: true, message: "Required!" }],
                                    initialValue: undefined
                                })(<Select 
                                        showSearch 
                                        placeholder='Select Function Type' 
                                        size="large"
                                        disabled={!sopFunctionsType?.length}
                                        onChange={handelFunctionType}
                                        filterOption={(input, option) =>
                                            option.props.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0}
                                    >
                                    {sopFunctionsType?.map((project, index) =>
                                        <Select.Option key={`project-${index}-${project.id}`}
                                            value={project.id}>{project.name}</Select.Option>
                                    )}
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item label={'Function Name'}>
                                {form.getFieldDecorator(`function_id-${itemId}`, {
                                    rules: [{ required: true, message: "Required!" }],
                                    initialValue: undefined
                                })(<Select 
                                    showSearch 
                                    placeholder='Select Function Name' 
                                    size="large" 
                                    disabled={!functionNames?.length}
                                    filterOption={(input, option) =>
                                        option.props.children
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0}
                                >
                                    {functionNames?.map((project, index) =>
                                        <Select.Option key={`project-${index}-${project.id}`}
                                            value={project.id}>{project.name}</Select.Option>
                                    )}
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col span={22}>
                            <Form.Item label={'Activity Name'}>
                                {form.getFieldDecorator(`activity_name-${itemId}`, {
                                    rules: [{ required: true, message: "Required!" }],
                                    initialValue: undefined
                                })(<TextArea placeholder='Select Activity Name' rows={2} size="large" />)}
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Form.Item label={'Which Day Task'}>
                        {form.getFieldDecorator(`estimation_day-${itemId}`, {
                            rules: [{ required: true, message: "Required!" }],
                            initialValue: undefined
                        })(<InputNumber className='w-100' placeholder='Which Day Task'
                            size="large" />)}
                    </Form.Item>

                    <Form.Item label={'Estimated Time'}>
                        {form.getFieldDecorator(`estimation_time-${itemId}`, {
                            rules: [{ required: true, message: "Required!" }],
                            initialValue: undefined
                        })(<InputNumber className='w-100' placeholder='Estimated Time'
                            size="large" />)}
                    </Form.Item>

                    {
                        activity ?
                            <Form.Item label={'Status'}>
                                {form.getFieldDecorator(`status-${itemId}`, {
                                    rules: [{ required: true, message: "Required!" }]
                                })(<Select placeholder='Select Status' size="large">
                                    <Select.Option value={1}>Active</Select.Option>
                                    <Select.Option value={0}>Inactive</Select.Option>
                                </Select>)}
                            </Form.Item>
                            : ''
                    }
                    <Form.Item >
                        {form.getFieldDecorator(`is_attachment_required-${itemId}`, {
                            valuePropName: 'checked',
                            initialValue: undefined
                        })(<Checkbox>Is Attachement Required</Checkbox>)}
                    </Form.Item>
                </Col>
            </Row>
        </>
    )
}
