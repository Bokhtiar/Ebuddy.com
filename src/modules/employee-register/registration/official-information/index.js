import React, { useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { Row, Col, Input, Form, Radio, Select, DatePicker, Divider, Button } from 'antd';
import moment from 'moment';

const { Option } = Select;

const OfficalInformation = forwardRef((props, ref) => {
    const { officalInfosubmitForm } = props;
    const OfficalInfoFormRef = useRef(null);

    useImperativeHandle(ref, () => ({
        submitOfficalInfo() {
            OfficalInfoFormRef.current.validateFields((err, values) => {
                if (!err) {
                    officalInfosubmitForm(values);
                }
            });
        }
    }));

    return <CreateForm ref={OfficalInfoFormRef} props={props} />;
})

const CreateForm = Form.create()(({ form, props }) => {
    const { dropDownData, empInfo, isDetailsView } = props;
    return (
        <Form
            layout="vertical"
        // onSubmit={this.handleSubmit}
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label={'Company'}>
                        {form.getFieldDecorator('company_id', {
                            // rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.company_id ? parseInt(empInfo.company_id) : undefined
                        })(
                            <Select
                                size="large"
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Enter company"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                disabled={isDetailsView}
                            >
                                {dropDownData?.company ? dropDownData?.company?.map(item => (
                                    <Option key={'unit' + item.id} value={item.id}> 
                                        {item.name}
                                    </Option>
                                )) : null}
                            </Select>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'Branch/unit'}>
                        {form.getFieldDecorator('unit_id', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.unit_id ? parseInt(empInfo.unit_id) : undefined
                        })(
                            <Select
                                size="large"
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Enter branch/unit"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                disabled={isDetailsView}
                            >
                                {dropDownData?.units ? dropDownData?.units?.map(item => (
                                    <Option key={'unit' + item.id} value={item.id}> 
                                        {item.name}
                                    </Option>
                                )) : null}
                            </Select>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'Department'}>
                        {form.getFieldDecorator('department_id', {
                            // rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.department_id ? parseInt(empInfo?.department_id) : undefined
                        })(
                            <Select
                                size="large"
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Enter department name"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                disabled={isDetailsView}
                            >
                                {dropDownData?.department ? dropDownData?.department?.map(item => (
                                    <Option key={'Department' + item.id} value={item.id}>{item.name}</Option>
                                )) : null}
                            </Select>,
                        )}
                    </Form.Item>
                </Col>
            {/* </Row>
            <Row gutter={16}> */}
                <Col span={12}>
                    <Form.Item label={'Designation'}>
                        {form.getFieldDecorator('designation_id', {
                            // rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.designation_id ? parseInt(empInfo.designation_id ) : undefined
                        })(
                            <Select
                                size="large"
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Enter designation name"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                disabled={isDetailsView}
                            >
                                {dropDownData?.designation ? dropDownData?.designation?.map(item => (
                                    <Option key={'designation' + item.id} value={item.id}>{item.name}</Option>
                                )) : null}
                            </Select>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'designation group'}>
                        {form.getFieldDecorator('designation_group_id', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.designation_group_id ? parseInt(empInfo.designation_group_id ) : undefined
                        })(
                            <Select
                                size="large"
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Enter designation group"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                disabled={isDetailsView}
                            >
                                {dropDownData?.designationGroup ? dropDownData?.designationGroup?.map(item => (
                                    <Option key={'designation_group_id' + item.id}  value={item.id}>{item.name}</Option>
                                )) : null}
                            </Select>,
                        )}
                    </Form.Item>
                </Col>
            {/* </Row>
            <Row gutter={16}> */}
                <Col span={12}>
                    <Form.Item label={'Job Title'}>
                        {form.getFieldDecorator('job_title_id', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.job_title_id ? parseInt(empInfo.job_title_id ) : undefined
                        })(<Select
                            size="large"
                            showSearch
                            style={{ width: "100%" }}
                            placeholder="Enter Job Title"
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            disabled={isDetailsView}
                        >
                            {dropDownData?.jobTitle ? dropDownData?.jobTitle?.map(item => (
                                <Option key={'job_title_id' + item.id} value={item.id}>{item.name}</Option>
                            )) : null}
                        </Select>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'grade'}>
                        {form.getFieldDecorator('grade_id', {
                            // rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.grade_id ? parseInt(empInfo.grade_id ) : undefined
                        })(
                            <Select
                                size="large"
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Enter grade"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                disabled={isDetailsView}
                            >
                                {dropDownData?.grade ? dropDownData?.grade?.map(item => (
                                    <Option value={item.id} key={'grade' + item.id}>{item.name}</Option>
                                )) : null}
                            </Select>,
                        )}
                    </Form.Item>
                </Col>
            {/* </Row>
            <Row gutter={16}> */}
                <Col span={12}>
                    <Form.Item label={'Section'}>
                        {form.getFieldDecorator('section_id', {
                            // rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.section_id ? parseInt(empInfo.section_id ) : undefined
                        })(
                            <Select
                                size="large"
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Enter section name"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                disabled={isDetailsView}
                            >
                                {dropDownData?.section ? dropDownData?.section?.map(item => (
                                    <Option key={'section_id' + item.id}  value={item.id}>{item.name}</Option>
                                )) : null}
                            </Select>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'floor'}>
                        {form.getFieldDecorator('floor_id', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.floor_id ? parseInt(empInfo.floor_id ) : undefined
                        })(
                            <Select
                                size="large"
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Enter section name"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                disabled={isDetailsView}
                            >
                                {dropDownData?.floor ? dropDownData?.floor?.map(item => (
                                    <Option key={'floor_id' + item.id} value={item.id}>{item.name}</Option>
                                )) : null}
                            </Select>,
                        )}
                    </Form.Item>
                </Col>
            {/* </Row>
            <Row gutter={16}> */}
                <Col span={12}>
                    <Form.Item label={'line'}>
                        {form.getFieldDecorator('line_id', {
                            // rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.line_id ? parseInt(empInfo.line_id ) : undefined
                        })(
                            <Select
                                size="large"
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Enter line"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                disabled={isDetailsView}
                            >
                                {dropDownData?.line ? dropDownData?.line?.map(item => (
                                    <Option key={'line_id' + item.id} value={item.id}>{item.name}</Option>
                                )) : null}
                            </Select>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'block'}>
                        {form.getFieldDecorator('block_id', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.block_id ? parseInt(empInfo.block_id ) : undefined
                        })(
                            <Select
                                size="large"
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Enter block name"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                disabled={isDetailsView}
                            >
                                {dropDownData?.block ? dropDownData?.block?.map(item => (
                                    <Option key={'block_id' + item.id} value={item.id}>{item.name}</Option>
                                )) : null}
                            </Select>
                        )}
                    </Form.Item>
                </Col>
            {/* </Row>
            <Row gutter={16}> */}
                {/* <Col span={12}>
                    <Form.Item label={'Expertness'}>
                        {form.getFieldDecorator('expertness', {
                            rules: [{ required: false, message: 'Required!' }],
                        })(<Input placeholder="Enter expertness" size="large" />,
                        )}
                    </Form.Item>
                </Col> */}
                <Col span={12}>
                    <Form.Item label={'Staff Category'}>
                        {form.getFieldDecorator('staff_category_id', {
                            // rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.staff_category_id ? parseInt(empInfo.staff_category_id ) : undefined
                        })(
                            <Select
                                size="large"
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Enter staff category"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                disabled={isDetailsView}
                            >
                                {dropDownData?.staffCategory ? dropDownData?.staffCategory?.map(item => (
                                    <Option key={'staff_category_id' + item.id} value={item.id}>{item.name}</Option>
                                )) : null}
                            </Select>,
                        )}
                    </Form.Item>
                </Col>
            {/* </Row> */}
            {/* <Row gutter={16}> */}
            <Col span={12}>
                    <Form.Item label={'agreement'}>
                        {form.getFieldDecorator('agreement_type_id', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.agreement_type_id ? parseInt(empInfo.agreement_type_id ) : undefined
                        })(
                            <Select
                                size="large"
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Enter agreement"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                disabled={isDetailsView}
                            >
                                {dropDownData?.agreementType ? dropDownData?.agreementType?.map(item => (
                                    <Option key={'agreement_type_id' + item.id} value={item.id}>{item.name}</Option>
                                )) : null}
                            </Select>,
                        )}
                    </Form.Item>
                </Col>
                {/* <Col span={12}>
                    <Form.Item label={'legal status'}>
                        {form.getFieldDecorator('legal_status', {
                            rules: [{ required: false, message: 'Required!' }],
                        })(<Input placeholder="Enter legal status" size="large" />,
                        )}
                    </Form.Item>
                </Col> */}
            {/* </Row> */}
            {/* <Row gutter={16}> */}
                {/* <Col span={12}>
                    <Form.Item label={'employee type'}>
                        {form.getFieldDecorator('employee_type', {
                            rules: [{ required: false, message: 'Required!' }],
                        })(<Input placeholder="Enter employee type" size="large" />,
                        )}
                    </Form.Item>
                </Col> */}
                <Col span={12}>
                    <Form.Item label={'work station'}>
                        {form.getFieldDecorator('work_station_id', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.work_station_id ? parseInt(empInfo.work_station_id ) : undefined
                        })(
                            <Select
                                size="large"
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Enter work station"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                disabled={isDetailsView}
                            >
                                {dropDownData?.workStation ? dropDownData?.workStation?.map(item => (
                                    <Option key={'work_station_id' + item.id} value={item.id}>{item.name}</Option>
                                )) : null}
                            </Select>,
                        )}
                    </Form.Item>
                </Col>
            {/* </Row>
            <Row gutter={16}> */}
                <Col span={12}>
                    <Form.Item label={'roster type'}>
                        {form.getFieldDecorator('roster_type_id', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.roster_type_id ? parseInt(empInfo.roster_type_id ) : undefined
                        })(
                            <Select
                                size="large"
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Enter roster type"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                disabled={isDetailsView}
                            >
                                {dropDownData?.rosterType ? dropDownData?.rosterType?.map(item => (
                                    <Option key={'roster_type_id' + item.id} value={item.id}>{item.name}</Option>
                                )) : null}
                            </Select>
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'shift plan'}>
                        {form.getFieldDecorator('shift_type_id', {
                            // rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.shift_type_id ? parseInt(empInfo.shift_type_id ) : undefined
                        })(
                            <Select
                                size="large"
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Enter shift plan"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                disabled={isDetailsView}
                            >
                                {dropDownData?.shiftType ? dropDownData?.shiftType?.map(item => (
                                    <Option key={'shift_type_id' + item.id} value={item.id}>{item.name}</Option>
                                )) : null}
                            </Select>,
                        )}
                    </Form.Item>
                </Col>
            {/* </Row>
            <Row gutter={16}> */}
                {/* <Col span={12}>
                    <Form.Item label={'roster group'}>
                        {form.getFieldDecorator('roster_group', {
                            rules: [{ required: false, message: 'Required!' }],
                        })(<Input placeholder="Enter roster group" size="large" />,
                        )}
                    </Form.Item>
                </Col> */}
                <Col span={12}>
                    <Form.Item label={'1st weekend'}>
                        {form.getFieldDecorator('weekend_1', {
                            // rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.weekend_1 ? parseInt(empInfo.weekend_1 ) : undefined
                        })(
                            <Select
                                size="large"
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Enter Days"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                disabled={isDetailsView}
                            >
                                {dropDownData?.days ? dropDownData?.days?.map(item => (
                                    <Option key={'weekend_1' + item.id} value={item.id}>{item.name}</Option>
                                )) : null}
                            </Select>
                        )}
                    </Form.Item>
                </Col>
            {/* </Row>
            <Row gutter={16}> */}
                <Col span={12}>
                    <Form.Item label={'2nd weekend'}>
                        {form.getFieldDecorator('weekend_2', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.weekend_2 ? parseInt(empInfo.weekend_2 ) : undefined
                        })(
                            <Select
                                size="large"
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Enter Days"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                disabled={isDetailsView}
                            >
                                {dropDownData?.days ? dropDownData?.days?.map(item => (
                                    <Option key={'weekend_2' + item.id} value={item.id}>{item.name}</Option>
                                )) : null}
                            </Select>
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'Employee Type'}>
                        {form.getFieldDecorator('employee_type_id', {
                            // rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.employee_type_id ? parseInt(empInfo.employee_type_id ) : undefined
                        })(
                            <Select
                                size="large"
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Select Employee Type"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                disabled={isDetailsView}
                            >
                                {dropDownData?.employeeType ? dropDownData?.employeeType?.map(item => (
                                    <Option key={'employee_type_id' + item.id} value={item.id}>{item.name}</Option>
                                )) : null}
                            </Select>
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'confirm date'}>
                        {form.getFieldDecorator('confirmation_date', {
                            // rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.confirmation_date ? moment(empInfo?.confirmation_date) : undefined
                        })(<DatePicker placeholder="Enter confirm date" size="large" disabled={isDetailsView}/>,
                        )}
                    </Form.Item>
                </Col>
            {/* </Row>
            <Row gutter={16}> */}
                <Col span={12}>
                    <Form.Item label={'separation date'}>
                        {form.getFieldDecorator('separation_date', {
                            // rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.confirmation_date ? moment(empInfo?.separation_date) : undefined
                        })(<DatePicker placeholder="Enter separation date" size="large" disabled={isDetailsView}/>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'appraisal date'}>
                        {form.getFieldDecorator('appraisal_date', {
                            // rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.confirmation_date ? moment(empInfo?.appraisal_date) : undefined
                        })(<DatePicker placeholder="Enter appraisal date" size="large" disabled={isDetailsView}/>,
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    {/* <Form.Item label={'transfer date'}>
                        {form.getFieldDecorator('transfer_date', {
                            rules: [{ required: false, message: 'Required!' }],
                        })(<DatePicker placeholder="Enter transfer date" size="large" />,
                        )}
                    </Form.Item> */}
                </Col>
                <Col span={12}>
                    {/* <Form.Item label={'transfer form'}>
                        {form.getFieldDecorator('transfer_form', {
                            rules: [{ required: false, message: 'Required!' }],
                        })(<Input placeholder="Enter transfer form" size="large" />,
                        )}
                    </Form.Item> */}
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    {/* <Form.Item label={'appraisal plan'}>
                        {form.getFieldDecorator('appraisal_date', {
                            rules: [{ required: false, message: 'Required!' }],
                        })(<DatePicker placeholder="Enter appraisal plan" size="large" />,
                        )}
                    </Form.Item> */}
                </Col>
                <Col span={12}>
                    {/* <Form.Item label={'attendance correction mendatory'}>
                        {form.getFieldDecorator('attendance_correctin', {
                            rules: [{ required: false, message: 'Required!' }],
                        })(<Radio.Group
                        >
                            <Radio value={1}>Yes</Radio>
                            <Radio value={0}>No</Radio>
                        </Radio.Group>,
                        )}
                    </Form.Item> */}
                </Col>
            </Row>
        </Form>
    )
});

export default OfficalInformation;