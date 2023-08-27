import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { Row, Col, Input, Form, Select, DatePicker, Divider, Button } from 'antd';
import moment from 'moment';
import { alertPop } from "../../../../scripts/message";
import { mobileNumberValidationPattern } from "../../../../scripts/helper";

const { Option } = Select;

const GeneralInformation = forwardRef((props, ref) => {
    const { empInfo, setEmpInfo, current, generalInfosubmitForm, isDetailsView, setjoiningDate } = props;

    
    const generalInfoFormRef = useRef(null);
    const [fileUpload, setFileUpload] = useState();
    const [sigFileUpload, setSigFileUpload] = useState()

    useImperativeHandle(ref, () => ({
        submitGeneralInfo() {
            generalInfoFormRef.current.validateFields((err, values) => {
                if (!err) {
                    console.log("values ==", values);

                    let formData = new FormData();
                    if (values?.emp_id) formData.append("emp_id", values?.emp_id);
                    if (values?.id_card_no) formData.append("id_card_no", values?.id_card_no);
                    if (values?.bank_ac_no) formData.append("bank_ac_no", values?.bank_ac_no);
                    if (values?.bank_id) formData.append("bank_id", values?.bank_id);
                    if (values?.contact_no) formData.append("contact_no", values?.contact_no);
                    if (values?.disable_date) formData.append("disable_date", moment(values?.disable_date).format('YYYY-MM-DD'));
                    if (values?.email) formData.append("email", values?.email);
                    if (values?.gender) formData.append("gender", values?.gender);
                    if (values?.name) formData.append("name", values?.name);
                    if (values?.name_bn) formData.append("name_bn", values?.name_bn);
                    if (values?.face_id) formData.append("face_id", values?.face_id);
                    formData.append("status", values.status || 0);
                    if (values?.dob && (moment(values?.dob) < moment(values?.joining_date))) {
                        formData.append("dob", moment(values?.dob).format('YYYY-MM-DD'));
                    } else return alertPop('error', 'Date of Birth should be earlier than joining date')
                    if (values?.joining_date) formData.append("joining_date", moment(values?.joining_date).format('YYYY-MM-DD'));

                    if (sigFileUpload) formData.append("signature", sigFileUpload);
                    if (fileUpload) formData.append("image", fileUpload);

                    formData.append('page', current + 1);

                    generalInfosubmitForm(formData);
                }
            });
        }
    }));

    return <CreateForm ref={generalInfoFormRef} props={props}
        setFileUpload={setFileUpload} setSigFileUpload={setSigFileUpload} setjoiningDate={setjoiningDate} />;
});

const CreateForm = Form.create()(({ form, props, setSigFileUpload, setFileUpload, setjoiningDate }) => {
    const { dropDownData, empInfo, isDetailsView } = props;

    const fileUploadHandler = async (event, flag) => {
        let value = event.target.files[0];
        if (flag === "image") {
            document.getElementById('reference-image-upload').innerHTML = value.name;
            setFileUpload(value);
        }
        if (flag === "signature") {
            document.getElementById('reference-upload-signature').innerHTML = value.name;
            setSigFileUpload(value);
        }
    }

    return (
        <Form
            layout="vertical"
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label={'ID card no'}>
                        {form.getFieldDecorator('id_card_no', {
                            // rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.id_card_no || undefined
                        })(<Input placeholder="Enter employee card no" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'Employee ID'}>
                        {form.getFieldDecorator('emp_id', {
                            rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.emp_id || undefined
                        })(<Input placeholder="Enter employee id" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'Official Mobile No'}>
                        {form.getFieldDecorator('contact_no', {
                            rules: [{ required: true, message: 'Required!' }, {
                                pattern: mobileNumberValidationPattern,
                                message: "Please enter a valid mobile no",
                            }],
                            initialValue: empInfo?.contact_no || undefined
                        })(<Input placeholder="Enter official mobile number" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
                {/* </Row>
            <Row gutter={16}> */}
                <Col span={12}>
                    <Form.Item label={'Employee Name'}>
                        {form.getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.name || undefined
                        })(<Input placeholder="Enter employee name" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'নাম'}>
                        {form.getFieldDecorator('name_bn', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.name_bn || undefined
                        })(<Input placeholder="Enter name(bengali)" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
                {/* </Row>
            <Row gutter={16}> */}
                <Col span={12}>
                    <Form.Item label={'Bank A/C no'}>
                        {form.getFieldDecorator('bank_ac_no', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.bank_ac_no || undefined
                        })(<Input placeholder="Enter bank account number" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'Bank Name'}>
                        {form.getFieldDecorator('bank_id', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.bank_id ? parseInt(empInfo?.bank_id) : undefined
                        })(
                            <Select
                                size="large"
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Select a Bank"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                disabled={isDetailsView}
                            >
                                {dropDownData?.bank ? dropDownData?.bank?.map(item => (
                                    <Option key={`bank-${item.id}`} value={item.id}>{item.bank_name}</Option>
                                )) : null}
                            </Select>
                        )}
                    </Form.Item>
                </Col>
                {/* </Row>
            <Row gutter={16}> */}
                <Col span={12}>
                    <Form.Item label={'RF/FP/Face id'}>
                        {form.getFieldDecorator('face_id', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.face_id || undefined
                        })(<Input placeholder="Enter RF/FP/Face id" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'Employee Status'}>
                        {form.getFieldDecorator('status', {
                            // rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo && parseInt(empInfo.status) !== NaN &&
                                typeof parseInt(empInfo.status) === 'number' ? parseInt(empInfo.status) : undefined
                        })(
                            <Select
                                size="large"
                                showSearch
                                disabled={isDetailsView}
                                style={{ width: "100%" }}
                                placeholder="Select employee status"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option key="Active" value={1}>Active</Option>
                                <Option key="Inactive" value={0}>Inactive</Option>
                            </Select>,
                        )}
                    </Form.Item>
                </Col>
                {/* </Row>
            <Row gutter={16}> */}
                <Col span={12}>
                    <Form.Item label={'Email'}>
                        {form.getFieldDecorator('email', {
                            // rules: [{ required: true, message: "Required!" },
                            // {
                            //     pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                            //     message: "Please enter a valid email address",
                            // }],
                            initialValue: empInfo?.email || undefined
                        })(<Input placeholder="Enter email id" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'Inactive/Disable date'}>
                        {
                            form.getFieldDecorator('disable_date', {
                                // rules: [{ required: false, message: 'Required!' }],
                                initialValue: empInfo?.disable_date ? moment(empInfo.disable_date) : undefined
                            })(<DatePicker placeholder="DD-MM-YYYY" size="large" disabled={isDetailsView} />,
                            )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item label={'Date of Birth'}>
                    {form.getFieldDecorator('dob', {
                        // rules: [{ required: true, message: 'Required!' }],
                        initialValue: empInfo?.dob ? moment(empInfo.dob) : undefined
                    })(<DatePicker placeholder="Enter date of birth" size="large" disabled={isDetailsView} />,
                    )}
                </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label={'joining date'}>
                        {form.getFieldDecorator('joining_date', {
                            // rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.joining_date ? moment(empInfo.joining_date) : undefined
                        })(<DatePicker
                            placeholder="Enter joining date"
                            format={'YYYY-MM-DD'}
                            size="large"
                            disabled={isDetailsView}
                            onChange={(value) => setjoiningDate(value)}
                        />,
                        )}
                    </Form.Item>

                    <Form.Item label={'gender'}>
                        {form.getFieldDecorator('gender', {
                            // rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.gender || undefined
                        })(<Select
                            size="large"
                            showSearch
                            style={{ width: "100%" }}
                            placeholder="Select employee status"
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            disabled={isDetailsView}
                        >
                            <Option value="Male">Male</Option>
                            <Option value="Female">Female</Option>
                        </Select>,
                        )}
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item extra="jpg,png file is accepted. May not accept file larger than 2MB.">
                                {form.getFieldDecorator('image')(
                                    <div className="file-upload-content">
                                        <label htmlFor="file-upload-field">
                                            <span style={{ fontWeight: 700, fontSize: '0.8rem', color: '#808080' }}>Employee Photo</span>
                                        </label>
                                        <div className="file-upload-wrapper">
                                            <span className="attacment-filename" id="reference-image-upload">Photo</span>
                                            <input disabled={isDetailsView}
                                                name="file-upload-field" type="file" className="file-upload-field" value=""
                                                onChange={(value) => fileUploadHandler(value, "image")}
                                                accept=".jpeg, .png,.jpg"
                                            />
                                        </div>
                                    </div>,
                                )}
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Form.Item extra="jpg,png file is accepted. May not accept file larger than 2MB.">
                                {form.getFieldDecorator('image')(
                                    <div className="file-upload-content">
                                        <label htmlFor="file-upload-field-sig">
                                            <span style={{ fontWeight: 700, fontSize: '0.8rem', color: '#808080' }}>Employee Signature</span>
                                        </label>
                                        <div className="file-upload-wrapper">
                                            <span className="attacment-filename" id="reference-upload-signature">Signature</span>
                                            <input disabled={isDetailsView}
                                                name="file-upload-field-sig" type="file" className="file-upload-field" value=""
                                                onChange={(value) => fileUploadHandler(value, "signature")}
                                                accept=".jpeg,.png,.jpg"
                                            />
                                        </div>
                                    </div>,
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {/* <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label={'age'}>
                        {form.getFieldDecorator('age')(<Input placeholder="Enter age" size="large" />,
                        )}
                    </Form.Item>
                </Col>
            </Row> */}
            {/* <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label={'service length'}>
                        {form.getFieldDecorator('service_length', {
                            rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.service_length || undefined
                        })(<Input placeholder="Enter service length" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
            </Row> */}
        </Form>
    )
});

export default GeneralInformation;

