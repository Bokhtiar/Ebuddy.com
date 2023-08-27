import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import {
    Row, Col, Input, Form, Radio, Select, DatePicker, Divider, Button, Upload,
    Icon
} from 'antd';
import moment from 'moment';

const { Option } = Select;

const Reference = forwardRef((props, ref) => {
    const { empInfo, current, setEmpInfo, referencesubmitForm } = props;

    const ReferenceFormRef = useRef(null);
    const [fileUpload, setFileUpload] = useState();
    const [sigFileUpload, setSigFileUpload] = useState()

    useImperativeHandle(ref, () => ({
        submitReference() {
            ReferenceFormRef.current.validateFields((err, values) => {
                if (!err) {
                    let formData = new FormData();
                    if (values?.marital_status) formData.append("marital_status", values?.marital_status);
                    if (values?.spouse_name) formData.append("spouse_name", values?.spouse_name);
                    if (values?.spouse_name_bn) formData.append("spouse_name_bn", values?.spouse_name_bn);
                    if (values?.spouse_profession) formData.append("spouse_profession", values?.spouse_profession);
                    if (values?.no_of_child) formData.append("no_of_child", values?.no_of_child);
                    if (values?.child_description) formData.append("child_description", values?.child_description);
                    if (values?.insurance_info) formData.append("insurance_info", values?.insurance_info);
                    if (values?.referer_name) formData.append("referer_name", values?.referer_name);
                    if (values?.referer_name_bn) formData.append("referer_name_bn", values?.referer_name_bn);
                    if (values?.referer_phone) formData.append("referer_phone", values?.referer_phone);
                    if (values?.referer_address) formData.append("referer_address", values?.referer_address);
                    if (values?.entry_date) formData.append("entry_date", moment(values.entry_date).format('YYYY-MM-DD'));
                    if (values?.old_card_no) formData.append("old_card_no", values?.old_card_no);
                    if (values?.daily_salary) formData.append("daily_salary", values?.daily_salary);
                    if (values?.salary_base_id) formData.append("salary_base_id", values?.salary_base_id);
                    if (values?.joining_salary) formData.append("joining_salary", values?.joining_salary);
                    if (values?.payment_term_id) formData.append("payment_term_id", values?.payment_term_id);
                    if (values?.payment_priority) formData.append("payment_priority", values?.payment_priority);
                    if (values?.nominee_name) formData.append("nominee_name", values?.nominee_name);
                    if (values?.nominee_name_bn) formData.append("nominee_name_bn", values?.nominee_name_bn);
                    if (values?.relation_with_nominee) formData.append("relation_with_nominee", values?.relation_with_nominee);
                    if (values?.nominee_phone) formData.append("nominee_phone", values?.nominee_phone);
                    if (values?.nominee_address) formData.append("nominee_address", values?.nominee_address);
                    if (fileUpload) formData.append("nominee_image", fileUpload);
                    if (sigFileUpload) formData.append("nominee_signature", sigFileUpload);

                    // adjust required fields 
                    if (empInfo?.emp_id) formData.append("emp_id", empInfo?.emp_id);
                    if (empInfo?.name) formData.append("name", empInfo?.name);
                    if (empInfo?.gender) formData.append("gender", empInfo?.gender);
                    formData.append('page', current + 1);

                    for (const value of formData.values()) {
                        console.log("form data insideeeeeeeeeeee>>>>>>>>>>>>", value);
                    }

                    referencesubmitForm(formData);
                }
            });
        }
    }));

    return <CreateForm ref={ReferenceFormRef} props={props} setFileUpload={setFileUpload} setSigFileUpload={setSigFileUpload} />;
})

const CreateForm = Form.create()(({ form, props, setFileUpload, setSigFileUpload }) => {
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
        // onSubmit={this.handleSubmit}
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label={'marital status'}>
                        {form.getFieldDecorator('marital_status', {
                            // rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.marital_status || undefined
                        })
                            (<Select
                                size="large"
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Select Marital Status"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                disabled={isDetailsView}
                            >
                                <Option value="Single">Single</Option>
                                <Option value="Married">Married</Option>
                                <Option value="Divorced">Divorced</Option>
                                <Option value="Widow">Widow</Option>
                            </Select>,
                            )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'spouse name'}>
                        {form.getFieldDecorator('spouse_name', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.spouse_name || undefined
                        })(<Input placeholder="Enter spouse name" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
                {/* </Row>
            <Row gutter={16}> */}
                <Col span={12}>
                    <Form.Item label={'স্বামী/স্ত্রী নাম'}>
                        {form.getFieldDecorator('spouse_name_bn', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.spouse_name_bn || undefined
                        })(<Input placeholder="স্বামী/স্ত্রী নাম লিখুন" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    {/* <Form.Item label={'spouse rel'}>
                        {form.getFieldDecorator('spouse_rel')(<Input placeholder="Enter spouse rel" size="large" />,
                        )}
                    </Form.Item> */}
                </Col>
                {/* </Row>
            <Row gutter={16}> */}
                <Col span={12}>
                    <Form.Item label={'spouse profession'}>
                        {form.getFieldDecorator('spouse_profession', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.spouse_profession || undefined
                        })(<Input placeholder="Enter spouse profession" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'no of child'}>
                        {form.getFieldDecorator('no_of_child', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.no_of_child || undefined
                        })(<Input placeholder="Enter no of child" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
                {/* </Row>
            <Row gutter={16}> */}
                <Col span={12}>
                    <Form.Item label={'child description'}>
                        {form.getFieldDecorator('child_description', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.child_description || undefined
                        })(<Input placeholder="Enter child description" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
                {/* <Col span={12}>
                    <Form.Item label={'service book'}>
                        {form.getFieldDecorator('service_book')(<Input placeholder="Enter service book" size="large" />,
                        )}
                    </Form.Item>
                </Col> */}
                {/* </Row>
            <Row gutter={16}> */}
                <Col span={12}>
                    <Form.Item label={'insurance information'}>
                        {form.getFieldDecorator('insurance_info', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.insurance_info || undefined
                        })(<Input placeholder="Enter insurance information" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'referer'}>
                        {form.getFieldDecorator('referer_name', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.referer_name || undefined
                        })(<Input placeholder="Enter referer" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
                {/* </Row>
            <Row gutter={16}> */}
                <Col span={12}>
                    <Form.Item label={'রেফারার'}>
                        {form.getFieldDecorator('referer_name_bn', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.referer_name_bn || undefined
                        })(<Input placeholder="রেফারার" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'referer phone'}>
                        {form.getFieldDecorator('referer_phone', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.referer_phone || undefined
                        })(<Input placeholder="Enter referer phone" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
                {/* </Row>
            <Row gutter={16}> */}
                <Col span={12}>
                    <Form.Item label={'referer address'}>
                        {form.getFieldDecorator('referer_address', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.referer_address || undefined
                        })(<Input placeholder="Enter referer address" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'entry date'}>
                        {form.getFieldDecorator('entry_date', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.entry_date ? moment(empInfo?.entry_date) : undefined
                        })(
                            <DatePicker placeholder="Enter entry date" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
                {/* </Row>
            <Row gutter={16}> */}
                <Col span={12}>
                    <Form.Item label={'old card number'}>
                        {form.getFieldDecorator('old_card_no', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.old_card_no || undefined
                        })(<Input placeholder="Enter old card number" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'daily salary'}>
                        {form.getFieldDecorator('daily_salary', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.daily_salary || undefined
                        })(<Input placeholder="Enter daily salary" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
                {/* </Row>
            <Row gutter={16}> */}
                <Col span={12}>
                    <Form.Item label={'salary based on'}>
                        {form.getFieldDecorator('salary_base_id', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.salary_base_id ? parseInt(empInfo.salary_base_id) : undefined
                        })(
                            <Select
                                size="large"
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Select based on salary"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                disabled={isDetailsView}
                            >
                                {dropDownData?.salaryBase ? dropDownData?.salaryBase?.map(item => (
                                    <Option value={item.id}>{item.name}</Option>
                                )) : null}
                            </Select>
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'joining salary'}>
                        {form.getFieldDecorator('joining_salary', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.joining_salary || undefined
                        })(<Input placeholder="Enter joining salary" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
                {/* </Row>
            <Row gutter={16}> */}
                <Col span={12}>
                    <Form.Item label={'payment terms'}>
                        {form.getFieldDecorator('payment_term_id', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.payment_term_id ? parseInt(empInfo.payment_term_id) : undefined
                        })(
                            <Select
                                size="large"
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Select payment terms"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                disabled={isDetailsView}
                            >
                                {dropDownData?.paymentTerms ? dropDownData?.paymentTerms?.map(item => (
                                    <Option value={item.id}>{item.name}</Option>
                                )) : null}
                            </Select>,
                        )}
                    </Form.Item>
                </Col>
                {/* <Col span={12}>
                    <Form.Item label={'payment priority'}>
                        {form.getFieldDecorator('payment_priority', {
                            rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.payment_priority || undefined
                        })(<Select
                            size="large"
                            showSearch
                            style={{ width: "100%" }}
                            placeholder="Select payment terms"
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            disabled={isDetailsView}
                        >
                            <Option value="bank">Bank</Option>
                            <Option value="cash">Cash</Option>
                        </Select>,
                        )}
                    </Form.Item>
                </Col> */}
                {/* </Row>
            <Row gutter={16}> */}
                {/* <Col span={12}>
                    <Form.Item label={'priority percent'}>
                        {form.getFieldDecorator('priority_percent', {
                            rules: [{ required: true, message: 'Required!' }],
                        })(<Input placeholder="Enter priority percent" size="large" />,
                        )}
                    </Form.Item>
                </Col> */}
            </Row><br />
            <Row gutter={16}>
                <Col span={12}>
                    <h2><strong>Nominee Information</strong></h2>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label={'nominee name'}>
                        {form.getFieldDecorator('nominee_name', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.nominee_name || undefined
                        })(<Input placeholder="Enter nominee name" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'মনোনীত ব্যক্তি '}>
                        {form.getFieldDecorator('nominee_name_bn', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.nominee_name_bn || undefined
                        })(<Input placeholder="মনোনীত ব্যক্তি " size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label={'relationship with nominee'}>
                        {form.getFieldDecorator('relation_with_nominee', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.relation_with_nominee || undefined
                        })(<Input placeholder="Enter relationship with nominee" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'Nominee phone '}>
                        {form.getFieldDecorator('nominee_phone', {
                            // rules: [{ required: false, message: 'Required!' }, {
                            //     pattern: /^(?:\+?88)?01[15-9]\d{8}$/,
                            //     message: "Please enter a valid mobile no",
                            // }],
                            initialValue: empInfo?.nominee_phone || undefined
                        })(<Input placeholder="Nominee phone number" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    {/* <Form.Item label={'nominee photo'}>
                        {form.getFieldDecorator('nominee_image')(<Input placeholder="Enter nominee photo" size="large" />,
                        )}
                    </Form.Item> */}
                    <Form.Item extra="jpg,png file is accepted. May not accept file larger than 2MB.">
                        {form.getFieldDecorator('nominee_image')(
                            <div className="file-upload-content">
                                <label htmlFor="file-upload-field">
                                    <span style={{ fontWeight: 700, fontSize: '0.8rem', color: '#808080' }}>Nominee Photo</span>
                                </label>
                                <div className="file-upload-wrapper">
                                    <span className="attacment-filename" id="reference-image-upload">Photo</span>
                                    <input disabled={isDetailsView}
                                        name="file-upload-field" type="file" className="file-upload-field" value=""
                                        onChange={(value) => fileUploadHandler(value, "image")}
                                        accept=".jpeg,.png,.jpg"
                                    />
                                </div>
                            </div>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    {/* <Form.Item label={'nominee photo'}>
                        {form.getFieldDecorator('nominee_image')(<Input placeholder="Enter nominee photo" size="large" />,
                        )}
                    </Form.Item> */}
                    <Form.Item extra="jpg,png file is accepted. May not accept file larger than 2MB.">
                        {form.getFieldDecorator('nominee_image')(
                            <div className="file-upload-content">
                                <label htmlFor="file-upload-field-sig">
                                    <span style={{ fontWeight: 700, fontSize: '0.8rem', color: '#808080' }}>Nominee Signature</span>
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
                <Col span={24}>
                    <Form.Item label={'nominee address '}>
                        {form.getFieldDecorator('nominee_address', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.nominee_address || undefined
                        })(<Input placeholder="nominee address " size="large" disabled={isDetailsView} />,
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

export default Reference;

