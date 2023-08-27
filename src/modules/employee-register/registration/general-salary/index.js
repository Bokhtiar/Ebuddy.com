import React, {useState, forwardRef, useImperativeHandle, useRef} from 'react';
import { Row, Col, Input, Form, Radio, Checkbox, Divider, Button } from 'antd';

const GeneralSalary = forwardRef((props, ref) => {
    const {empInfo, setEmpInfo, GeneralSalaryForm} = props;
    const GeneralSalaryFormRef = useRef(null);

    useImperativeHandle(ref, () => ({
        submitGeneralSalary() {
            GeneralSalaryFormRef.current.validateFields((err, values) => {
                if (!err) {
                    console.log("values", values);
                    GeneralSalaryForm(values);
                }
            });
        }
    }));

    return <CreateForm ref={GeneralSalaryFormRef} props={props} />;
})

const CreateForm = Form.create()(({ form, props }) => {
    const { isDetailsView, empInfo } = props;
    return (
        <Form
            layout="vertical"
        // onSubmit={this.handleSubmit}
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label={'salary scheme'}>
                        {form.getFieldDecorator('salary_scheme', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.salary_scheme || undefined
                        })(<Input placeholder="Enter salary scheme" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    {/* <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label={'Same as Standard'}><br />
                                {form.getFieldDecorator('same_as_standard')
                                    (<Checkbox>Apply</Checkbox>,
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={'Scheme Gross 8000'}><br />
                                {form.getFieldDecorator('salary_gross')
                                    (<Checkbox>Apply</Checkbox>,
                                )}
                            </Form.Item>
                        </Col>
                    </Row> */}
                </Col>
            </Row>
            <Row gutter={16}>
                <p style={{ margin: "1rem" }}>Gross 8000; basic: 66.677% of Gross-Allowance; House Rent: 50% of basic; Medical Fixed: 600; Transport Fixed: 350; Food Fixed: 900; Atten. Bonus Entitle: Yes; Attendance Bonus Fixed: 500; OT Entile: Yes;</p>
            </Row>
            <Divider />
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label={'gross salary'}>
                        {form.getFieldDecorator('gross_salary', {
                            // rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.gross_salary || undefined
                        })(<Input placeholder="Enter gross salary" size="large" disabled={isDetailsView}/>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'currency'}>
                        {form.getFieldDecorator('currency', {
                            // rules: [{ required: true, message: 'Required!' }],
                            initialValue: 'BDT'
                        })(<Input placeholder="Enter currency" size="large" disabled/>,
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label={'Basic'}>
                        {form.getFieldDecorator('basic', {
                            // rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.basic || undefined
                        })(<Input placeholder="Enter basic" size="large" disabled={isDetailsView}/>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'house rent'}>
                        {form.getFieldDecorator('house_rent', {
                            // rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.house_rent || undefined
                        })(<Input placeholder="Enter house rent" size="large" disabled={isDetailsView}/>,
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label={'attendance bonus'}>
                        {form.getFieldDecorator('attendance_bonus', {
                            // rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.attendance_bonus || undefined
                        })(<Input size="large" disabled={isDetailsView}/>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'ot entitle'}>
                        {form.getFieldDecorator('ot_entitled', {
                            // rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.ot_entitled || undefined
                        })(
                            <Input size="large" disabled={isDetailsView}/>,
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label={'income tax'}>
                        {form.getFieldDecorator('income_tex', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.income_tex || undefined
                        })(<Input placeholder="income tax" size="large" disabled={isDetailsView}/>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'tax rebate'}>
                        {form.getFieldDecorator('tax_rebate', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.tax_rebate || undefined
                        })(<Input placeholder="Enter tax rebate" size="large" disabled={isDetailsView}/>,
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    {/* <Form.Item label={'pf company'}>
                        {form.getFieldDecorator('pf_company', {
                            rules: [{ required: true, message: 'Required!' }],
                        })(<Input placeholder="Enter pf company" size="large" />,
                        )}
                    </Form.Item> */}
                </Col>
                <Col span={12}>
                    {/* <Form.Item label={'pf own'}>
                        {form.getFieldDecorator('pf_own', {
                            rules: [{ required: true, message: 'Required!' }],
                        })(<Input placeholder="Enter pf own" size="large" />,
                        )}
                    </Form.Item> */}
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label={'food allowance'}>
                        {form.getFieldDecorator('food_allowance', {
                            // rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.food_allowance || undefined
                        })(<Input placeholder="Enter food allowance" size="large" disabled={isDetailsView}/>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'medical allowance'}>
                        {form.getFieldDecorator('medical_allowance', {
                            // rules: [{ required: true, message: 'Required!' }],
                            initialValue: empInfo?.medical_allowance || undefined
                        })(<Input placeholder="Enter medical allowance" size="large" disabled={isDetailsView}/>,
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label={'transport allowance'}>
                        {form.getFieldDecorator('transport_allowance', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.transport_allowance || undefined
                        })(<Input placeholder="Enter transport allowance" size="large" disabled={isDetailsView}/>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'tiffin allowance'}>
                        {form.getFieldDecorator('tiffin_allowance', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.tiffin_allowance || undefined
                        })(<Input placeholder="Enter tiffin allowance" size="large" disabled={isDetailsView}/>,
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label={'dinner allowance'}>
                        {form.getFieldDecorator('dinner_allowance', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.dinner_allowance || undefined
                        })(<Input placeholder="Enter dinner allowance" size="large"  disabled={isDetailsView}/>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'other allowance'}>
                        {form.getFieldDecorator('other_allowance', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.other_allowance || undefined
                        })(<Input placeholder="Enter other allowance" size="large" disabled={isDetailsView}/>,
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label={'laundry allowance'}>
                        {form.getFieldDecorator('laundry_allowance', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.laundry_allowance || undefined
                        })(<Input placeholder="Enter laundry allowance" size="large" disabled={isDetailsView}/>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'mobile allowance'}>
                        {form.getFieldDecorator('mobile_allowance', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.mobile_allowance || undefined
                        })(<Input placeholder="Enter mobile allowance" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label={'night allowance'}>
                        {form.getFieldDecorator('night_allowance', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.night_allowance || undefined
                        })(<Input placeholder="Enter night allowance" size="large" disabled={isDetailsView}/>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'night shift allowance'}>
                        {form.getFieldDecorator('night_shift_allowance', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.night_shift_allowance || undefined
                        })(<Input placeholder="night shift allowance" size="large" disabled={isDetailsView}/>,
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label={'holiday allowance'}>
                        {form.getFieldDecorator('holiday_allowance', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.holiday_allowance || undefined
                        })(<Input placeholder="Enter holiday allowance" size="large" disabled={isDetailsView}/>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'safe OD allowance'}>
                        {form.getFieldDecorator('safe_od_allowance', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.safe_od_allowance || undefined
                        })(<Input placeholder="Enter Safe OD allowance" size="large" disabled={isDetailsView} />,
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label={'dearness allowance'}>
                        {form.getFieldDecorator('dearness_allowance', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.dearness_allowance || undefined
                        })(<Input placeholder="Enter dearness allowance" size="large" disabled={isDetailsView}/>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'sba'}>
                        {form.getFieldDecorator('sba', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo?.sba || undefined
                        })(<Input placeholder="Enter sba" size="large" disabled={isDetailsView}/>,
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

export default GeneralSalary;

