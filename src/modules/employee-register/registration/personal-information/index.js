import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { Row, Col, Input, Form, Radio, Select, DatePicker, Divider, Button } from 'antd';

const { Option } = Select;

const PersonalInformation = forwardRef((props, ref) => {
    const { personalInfosubmitForm } = props;
    const PersonalInfoFormRef = useRef(null);

    useImperativeHandle(ref, () => ({
        submitPersonalInfo() {
            PersonalInfoFormRef.current.validateFields((err, values) => {
                if (!err) {
                    personalInfosubmitForm(values)
                }
            });
        }
    }));

    return <CreateForm ref={PersonalInfoFormRef} props={props} />;
})

const CreateForm = Form.create()(({ form, props }) => {
    const { dropDownData, isDetailsView, empInfo } = props;
    return (
        <Form
            layout="vertical"
        // onSubmit={this.handleSubmit}
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label={'Father Name'}>
                        {form.getFieldDecorator('father_name', {
                            // rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.father_name || undefined
                        })(<Input placeholder="Enter father name" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'পিতার নাম'}>
                        {form.getFieldDecorator('father_name_bn', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.father_name_bn || undefined
                        })(<Input placeholder="পিতার নাম লিখুন" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
            {/* </Row>
            <Row gutter={16}> */}
                <Col span={12}>
                    <Form.Item label={'Mother Name'}>
                        {form.getFieldDecorator('mother_name', {
                            // rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.mother_name || undefined
                        })(<Input placeholder="Enter mother name" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'মাতার নাম'}>
                        {form.getFieldDecorator('mother_name_bn', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.mother_name_bn || undefined
                        })(<Input placeholder="মাতার নাম লিখুন" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
            {/* </Row>
            <Row gutter={16}> */}
                <Col span={12}>
                    <Form.Item label={'Religion'}>
                        {form.getFieldDecorator('religion_id', {
                            // rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.religion_id ? parseInt(empInfo.religion_id) : undefined
                        })(
                            <Select
                                size="large"
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Select religion"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                disabled={isDetailsView}
                            >
                                {dropDownData?.religion ? dropDownData?.religion?.map(item => (
                                    <Option value={item.id}>{item.name}</Option>
                                )) : null}
                            </Select>,
                        )}
                    </Form.Item>
                </Col>
                {/* 0: "The selected nationality is invalid."
                    1: "The selected blood group is invalid."
                    2: "The supervisor id must be an integer." */}
                <Col span={12}>
                    <Form.Item label={'Nationality'}>
                        {form.getFieldDecorator('nationality', {
                            // rules: [{required: true, message: "Required!"}],
                            initialValue: 'Bangladeshi'
                        })(<Input placeholder="Enter nationality" size="large" disabled />,
                        )}
                    </Form.Item>
                </Col>
            {/* </Row>
            <Row gutter={16}> */}
                <Col span={12}>
                    <Form.Item label={'Language'}>
                        {form.getFieldDecorator('language_id', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.language_id ? parseInt(empInfo.language_id) : undefined
                        })(
                            <Select
                                size="large"
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Select language"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                disabled={isDetailsView}
                            >
                                {dropDownData?.language ? dropDownData?.language?.map(item => (
                                    <Option value={item.id}>{item.name}</Option>
                                )) : null}
                            </Select>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    {/* <Form.Item label={'Resident'}>
                        {form.getFieldDecorator('resident')(<Input placeholder="Enter resident" size="large"/>,
                        )}
                    </Form.Item> */}
                </Col>
            {/* </Row>
            <Row gutter={16}> */}
                <Col span={12}>
                    <Form.Item label={'NID number'}>
                        {form.getFieldDecorator('nid_no', {
                            // rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.nid_no || undefined
                        })(<Input placeholder="Enter nid number" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'Birth Certification number'}>
                        {form.getFieldDecorator('birth_certificate_no', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.birth_certificate_no || undefined
                        })(<Input placeholder="Enter birth certification number" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
            {/* </Row>
            <Row gutter={16}> */}
                <Col span={12}>
                    <Form.Item label={'driving license'}>
                        {form.getFieldDecorator('driving_license', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.driving_license || undefined
                        })(<Input placeholder="Enter driving license" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'passport number'}>
                        {form.getFieldDecorator('passport_no', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.passport_no || undefined
                        })(<Input placeholder="Enter passport number" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
            {/* </Row>
            <Row gutter={16}> */}
                <Col span={12}>
                    <Form.Item label={'tin number'}>
                        {form.getFieldDecorator('tin_no', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.tin_no || undefined
                        })(<Input placeholder="Enter tin number" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'car no'}>
                        {form.getFieldDecorator('car_no', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.car_no || undefined
                        })(<Input placeholder="Enter car no" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
            {/* </Row>
            <Row gutter={16}> */}
                <Col span={12}>
                    <Form.Item label={'detection spot'}>
                        {form.getFieldDecorator('detection_spot', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.detection_spot || undefined
                        })(<Input placeholder="Enter detection spot" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'personal contact number'}>
                        {form.getFieldDecorator('personal_contact', {
                            // rules: [{ required: true, message: 'Required!' }, {
                            //     pattern: /^(?:\+?88)?01[15-9]\d{8}$/,
                            //     message: "Please enter a valid mobile no",
                            // }],
                            initialValue: empInfo?.personal_contact || undefined
                        })(<Input placeholder="Enter personal contact number" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
            {/* </Row>
            <Row gutter={16}> */}
                <Col span={12}>
                    <Form.Item label={'height'}>
                        {form.getFieldDecorator('height', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.height || undefined
                        })(<Input placeholder="Enter height" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'weight'}>
                        {form.getFieldDecorator('weight', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.weight || undefined
                        })(<Input placeholder="Enter weight" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
            {/* </Row>
            <Row gutter={16}> */}
                <Col span={12}>
                    <Form.Item label={'blood group'}>
                        {form.getFieldDecorator('blood_group', {
                            // rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.blood_group || undefined
                        })(
                            <Select
                                size="large"
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Select blood group"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                disabled={isDetailsView}
                            >
                                <Option value="A+">A+</Option>
                                <Option value="A-">A-</Option>
                                <Option value="B+">B+</Option>
                                <Option value="B-">B-</Option>
                                <Option value="AB+">AB+</Option>
                                <Option value="AB-">AB-</Option>
                                <Option value="O+">O+</Option>
                                <Option value="O-">O-</Option>
                            </Select>
                            // <Input placeholder="Enter blood group" size="large" disabled={isDetailsView}/>,
                        )}
                    </Form.Item>
                </Col>
                {/* <Col span={12}>
                    <Form.Item label={'El Number'}>
                        {form.getFieldDecorator('el_number', {
                            rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.el_number || undefined
                        })(<Input placeholder="Enter El Number" size="large"  disabled={isDetailsView}/>,
                        )}
                    </Form.Item>
                </Col> */}
            {/* </Row>
            <Row gutter={16}> */}
                <Col span={12}>
                    <Form.Item label={'supervisor'}>
                        {form.getFieldDecorator('supervisor_id', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.supervisor_id ? parseInt(empInfo.supervisor_id) : undefined
                        })(
                            <Select
                                size="large"
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Select supervisor name"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                disabled={isDetailsView}
                            >
                                {dropDownData?.employee ? dropDownData?.employee?.map(item => (
                                    <Option value={item.emp_id}>{item.name}</Option>
                                )) : null}
                            </Select>
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    {/* <Form.Item label={'origin'}>
                        {form.getFieldDecorator('origin', {
                            rules: [{ required: true, message: 'Required!' }],
                            })(<Input placeholder="Enter origin" size="large"/>,
                        )}
                    </Form.Item> */}
                </Col>
            {/* </Row>
            <Row gutter={16}> */}
                <Col span={12}>
                    <Form.Item label={'permanent district'}>
                        {form.getFieldDecorator('permanent_district_id', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.permanent_district_id ? parseInt(empInfo.permanent_district_id) : undefined
                        })(
                            <Select
                                size="large"
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Select Permanent District name"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                disabled={isDetailsView}
                            >
                                {dropDownData?.district ? dropDownData?.district?.map(item => (
                                    <Option value={item.id}>{item.name}</Option>
                                )) : null}
                            </Select>
                            // <Input placeholder="Permanent District name" size="large" disabled={isDetailsView}/>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'present district'}>
                        {form.getFieldDecorator('present_district_id', {
                            // rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.present_district_id ? parseInt(empInfo.present_district_id) : undefined
                        })(
                            <Select
                                size="large"
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Select Present District name"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                disabled={isDetailsView}
                            >
                                {dropDownData?.district ? dropDownData?.district?.map(item => (
                                    <Option value={item.id}>{item.name}</Option>
                                )) : null}
                            </Select>
                            // <Input placeholder="Present District name" size="large" disabled={isDetailsView}/>,
                        )}
                    </Form.Item>
                </Col>
            {/* </Row>
            <Row gutter={16}> */}
                <Col span={12}>
                    <Form.Item label={'present zone'}>
                        {form.getFieldDecorator('present_zone_id', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.present_zone_id ? parseInt(empInfo.present_zone_id) : undefined
                        })(
                            <Select
                                size="large"
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Select present zone"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                disabled={isDetailsView}
                            >
                                {dropDownData?.zone ? dropDownData?.zone?.map(item => (
                                    <Option value={item.id}>{item.name}</Option>
                                )) : null}
                            </Select>
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'postal code'}>
                        {form.getFieldDecorator('postal_code', {
                            // rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.postal_code || undefined
                        })(<Input placeholder="Enter postal code" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
            {/* </Row>
            <Row gutter={16}> */}
                <Col span={12}>
                    <Form.Item label={'present address'}>
                        {form.getFieldDecorator('present_address', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.present_address || undefined
                        })(<Input placeholder="Enter present address" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'বর্তমান ঠিকানা'}>
                        {form.getFieldDecorator('present_address_bn', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.present_address_bn || undefined
                        })(<Input placeholder="বর্তমান ঠিকানা লিখুন" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
            {/* </Row>
            <Row gutter={16}> */}
                <Col span={12}>
                    <Form.Item label={'permanent address'}>
                        {form.getFieldDecorator('permanent_address', {
                            // rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.permanent_address || undefined
                        })(<Input placeholder="Enter permanent address" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'স্থায়ী ঠিকানা'}>
                        {form.getFieldDecorator('permanent_address_bn', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.permanent_address_bn || undefined
                        })(<Input placeholder="স্থায়ী ঠিকানা লিখুন" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
            </Row>
            {/* <Divider style={{margin: '1rem 0'}}/>
            <Button type="primary" style={{float:'right', margin: '1rem'}}>
                Next
            </Button> */}
        </Form>
    )
});

export default PersonalInformation;

