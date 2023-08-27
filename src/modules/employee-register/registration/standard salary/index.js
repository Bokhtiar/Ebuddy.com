import React, {useState, forwardRef, useImperativeHandle, useRef} from 'react';
import { Row, Col, Input, Form, Radio, Checkbox,  Divider, Button } from 'antd';

const StandardSalary = forwardRef((props, ref) => {
    const StandardSalaryFormRef = useRef(null);

    useImperativeHandle(ref, () => ({
        submitStandardSalary() {
            StandardSalaryFormRef.current.validateFields((err, values) => {
                if (!err) {
                    console.log("values", values);
                    // firstSubmit(values);
                }
            });
        }
    }));

    return <CreateForm ref={StandardSalaryFormRef} />;
});
  
const CreateForm = Form.create()(({form}) => {      
  return (
        <Form 
            layout="vertical" 
            // onSubmit={this.handleSubmit}
        >
            <Row gutter={16}> 
                <Col span={10}>
                    <Form.Item label={'salary scheme'}>
                        {form.getFieldDecorator('salary_scheme')(
                            <Input placeholder="Enter salary scheme" size="large"/>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item label={'salary gross 8000'}><br />
                        {form.getFieldDecorator('gross_salary')
                        (<Checkbox 
                            // onChange={onChange}
                        >Apply</Checkbox>,
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}> 
                <p style={{margin: "1rem"}}>Gross 8000; basic: 66.677% of Gross-Allowance; House Rent: 50% of basic; Medical Fixed: 600; Transport Fixed: 350; Food Fixed: 900; Atten. Bonus Entitle: Yes; Attendance Bonus Fixed: 500; OT Entile: Yes;</p>
            </Row>
            <Divider />
            <Row gutter={16}> 
                <Col span={10}>
                    <Form.Item label={'gross salary'}>
                        {form.getFieldDecorator('gross_salary', {
                            // rules: [{ required: true, message: 'Required!' }],
                            })(<Input placeholder="Enter gross salary" size="large"/>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item label={'currency'}>
                        {form.getFieldDecorator('currency')(<Input placeholder="Enter currency" size="large"/>,
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}> 
                <Col span={10}>
                    <Form.Item label={'Basic'}>
                        {form.getFieldDecorator('basic', {
                            // rules: [{ required: true, message: 'Required!' }],
                            })(<Input placeholder="Enter basic" size="large"/>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item label={'house rent'}>
                        {form.getFieldDecorator('house_rent')(<Input placeholder="Enter house rent" size="large"/>,
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}> 
                <Col span={10}>
                    <Form.Item label={'attendance bonus'}>
                        {form.getFieldDecorator('attendance_bonus', {
                            // rules: [{ required: true, message: 'Required!' }],
                            })(<div style={{display: 'flex'}}>
                                <Radio.Group 
                                    // onChange={this.onChange} 
                                    // value={this.state.value}
                                >
                                    <Radio value={1}>Yes</Radio>
                                    <Radio value={0}>No</Radio>
                                </Radio.Group>
                                <Input size="large" />
                              </div>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item label={'ot entitle'}>
                        {form.getFieldDecorator('ot_entitle', {
                            // rules: [{ required: true, message: 'Required!' }],
                            })(<div style={{display: 'flex'}}>
                                <Radio.Group 
                                    // onChange={this.onChange} 
                                    // value={this.state.value}
                                >
                                    <Radio value={1}>Yes</Radio>
                                    <Radio value={0}>No</Radio>
                                </Radio.Group>
                                <Input size="large" />
                              </div>,
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}> 
                <Col span={10}>
                    <Form.Item label={'income tax'}>
                        {form.getFieldDecorator('income_tax', {
                            // rules: [{ required: true, message: 'Required!' }],
                            })(<Input placeholder="income tax" size="large"/>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item label={'tax rebate'}>
                        {form.getFieldDecorator('tax_rebate', {
                            // rules: [{ required: true, message: 'Required!' }],
                            })(<Input placeholder="Enter tax rebate" size="large"/>,
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}> 
                <Col span={10}>
                    <Form.Item label={'pf company'}>
                        {form.getFieldDecorator('pf_company', {
                            // rules: [{ required: true, message: 'Required!' }],
                            })(<Input placeholder="Enter pf company" size="large"/>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item label={'pf own'}>
                        {form.getFieldDecorator('pf_own', {
                            // rules: [{ required: true, message: 'Required!' }],
                            })(<Input placeholder="Enter pf own" size="large"/>,
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}> 
                <Col span={10}>
                    <Form.Item label={'food allowance'}>
                        {form.getFieldDecorator('food_allowance', {
                            // rules: [{ required: true, message: 'Required!' }],
                            })(<Input placeholder="Enter food allowance" size="large"/>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item label={'medical allowance'}>
                        {form.getFieldDecorator('medical_allowance', {
                            // rules: [{ required: true, message: 'Required!' }],
                            })(<Input placeholder="Enter medical allowance" size="large"/>,
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}> 
                <Col span={10}>
                    <Form.Item label={'transport allowance'}>
                        {form.getFieldDecorator('transport_allowance', {
                            // rules: [{ required: true, message: 'Required!' }],
                            })(<Input placeholder="Enter transport allowance" size="large"/>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item label={'tiffin allowance'}>
                        {form.getFieldDecorator('tiffin_allowance', {
                            // rules: [{ required: true, message: 'Required!' }],
                            })(<Input placeholder="Enter tiffin allowance" size="large"/>,
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}> 
                <Col span={10}>
                    <Form.Item label={'dinner allowance'}>
                        {form.getFieldDecorator('dinner_allowance', {
                            // rules: [{ required: true, message: 'Required!' }],
                            })(<Input placeholder="Enter dinner allowance" size="large"/>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item label={'other allowance'}>
                        {form.getFieldDecorator('other_allowance', {
                            // rules: [{ required: true, message: 'Required!' }],
                            })(<Input placeholder="Enter other allowance" size="large"/>,
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}> 
                <Col span={10}>
                    <Form.Item label={'laundry allowance'}>
                        {form.getFieldDecorator('laundry_allowance', {
                            // rules: [{ required: true, message: 'Required!' }],
                            })(<Input placeholder="Enter laundry allowance" size="large"/>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item label={'mobile allowance'}>
                        {form.getFieldDecorator('mobile_allowance', {
                            // rules: [{ required: true, message: 'Required!' }],
                            })(<Input placeholder="Enter mobile allowance" size="large"/>,
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}> 
                <Col span={10}>
                    <Form.Item label={'night allowance'}>
                        {form.getFieldDecorator('night_allowance', {
                            // rules: [{ required: true, message: 'Required!' }],
                            })(<Input placeholder="Enter night allowance" size="large"/>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item label={'night shift allowance'}>
                        {form.getFieldDecorator('night_shift_allowance', {
                            // rules: [{ required: true, message: 'Required!' }],
                            })(<Input placeholder="night shift allowance" size="large"/>,
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}> 
                <Col span={10}>
                    <Form.Item label={'holiday allowance'}>
                        {form.getFieldDecorator('holiday_allowance', {
                            // rules: [{ required: true, message: 'Required!' }],
                            })(<Input placeholder="Enter holiday allowance" size="large"/>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item label={'safe OD allowance'}>
                        {form.getFieldDecorator('safe_OD_allowance', {
                            // rules: [{ required: true, message: 'Required!' }],
                            })(<Input placeholder="Enter Safe OD allowance" size="large"/>,
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}> 
                <Col span={10}>
                    <Form.Item label={'dearness allowance'}>
                        {form.getFieldDecorator('dearness_allowance', {
                            // rules: [{ required: true, message: 'Required!' }],
                            })(<Input placeholder="Enter dearness allowance" size="large"/>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item label={'sba'}>
                        {form.getFieldDecorator('sba', {
                            // rules: [{ required: true, message: 'Required!' }],
                            })(<Input placeholder="Enter sba" size="large"/>,
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

export default StandardSalary;

