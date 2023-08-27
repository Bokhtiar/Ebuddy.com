import React, { useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { Row, Col, Input, Form, Select, DatePicker, Divider, Button } from 'antd';

const { Option } = Select;

const LeaveRegister = forwardRef((props, ref) => {
    const { empInfo, setEmpInfo, leaveRegistersubmitForm } = props;

    const LeaveRegisterFormRef = useRef(null);

    useImperativeHandle(ref, () => ({
        submitLeaveRegister() {
            LeaveRegisterFormRef.current.validateFields((err, values) => {
                if (!err) {
                    // firstSubmit(values);
                    console.log("values", values);
                    leaveRegistersubmitForm(values);
                }
            });
        }
    }));

    return <CreateForm ref={LeaveRegisterFormRef} props={props} />;
});

const CreateForm = Form.create()(({ form, props }) => {
    const { dropDownData, empInfo, isDetailsView } = props;
    const [leaveType, setLeaveType] = useState("Package");

    const changePackage = (val) => {
        let packageDetailsResult = dropDownData?.leavePackageAllList?.find(item=> item.id === val);

        if (packageDetailsResult) {
            let item = packageDetailsResult;

            form.setFieldsValue({
                annual_leave: item.annual_leave,
                casual_leave: item.casual_leave,
                medical_leave: item.medical_leave,
                no_pay_leave: item.no_pay_leave,
            });
        }
    }
    useEffect(() => {
        if(empInfo) {
            setLeaveType(empInfo?.leave_type);
        }
    }, [empInfo?.leave_type]);

    // useEffect(() => {
    //     if(packageTypeId) {
    //         let packageDetailsResult = dropDownData?.leavePackageAllList?.data?.filter(item=> item.id === packageTypeId);
    //         if(packageDetailsResult?.length) setPackageDetails(packageDetailsResult[0]);
    //     }
    // }, [packageTypeId]);

    return (
        <Form
            layout="vertical"
        // onSubmit={handleSubmit}
        >
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item label={'Leave Type'}>
                        {form.getFieldDecorator('leave_type', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: leaveType
                        })(<Select
                            size="large"
                            showSearch
                            style={{ width: "100%" }}
                            placeholder="Select Leave Type"
                            onChange={(value) => setLeaveType(value)}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            disabled={isDetailsView}
                        >
                            <Option value="Package">Package</Option>
                            <Option value="Custom">Custom</Option>
                        </Select>,
                        )}
                    </Form.Item>
                </Col>
                {leaveType === "Package" ?
                    <Col span={24}>
                        <Form.Item label={'select Package'}>
                            {form.getFieldDecorator('leave_package_id', {
                                // rules: [{ required: false, message: 'Required!' }],
                                initialValue: empInfo?.leave_package_id ? parseInt(empInfo.leave_package_id) : undefined
                            })(<Select
                                size="large"
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Select Package"
                                onChange={(value) => {changePackage(value)}}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                disabled={isDetailsView}
                            >
                                {dropDownData?.leavePackage?.length ? dropDownData.leavePackage.map(item => (
                                    <Option value={item.id}>{item.name}</Option>
                                )) : null}
                            </Select>,
                            )}
                        </Form.Item>
                    </Col>
                : null}
                <Col span={12}>
                    <Form.Item label={'Annual Leave'}>
                        {form.getFieldDecorator('annual_leave', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo ? empInfo?.annual_leave : undefined
                        })(<Input placeholder="Ex: 10" size="large" disabled={isDetailsView}/>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'Casual Leave'}>
                        {form.getFieldDecorator('casual_leave', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo ? empInfo?.casual_leave : undefined
                        })(<Input placeholder="Ex: 10" size="large" disabled={isDetailsView}/>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'Medical Leave'}>
                        {form.getFieldDecorator('medical_leave', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo ? empInfo?.medical_leave : undefined
                        })(<Input placeholder="Ex: 10" size="large" disabled={isDetailsView}/>,
                        )}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'Nopay Leave'}>
                        {form.getFieldDecorator('no_pay_leave', {
                            // rules: [{ required: false, message: 'Required!' }],
                            initialValue: empInfo ? empInfo?.no_pay_leave : undefined
                        })(<Input placeholder="Ex: 10" size="large" disabled={isDetailsView}/>,
                        )}
                    </Form.Item>
                </Col>
                {/* <Col span={12}>
                    <Form.Item label={'Adjustment Leave'}>
                        {form.getFieldDecorator('adjustment_leave', {
                            rules: [{ required: false, message: 'Required!' }],
                            initialValue: packageDetails ? parseInt(packageDetails?.adjustment_leave) : empInfo ? empInfo?.adjustment_leave : undefined
                        })(<Input placeholder="Ex: 10" size="large" disabled={isDetailsView}/>,
                        )}
                    </Form.Item>
                </Col> */}
            </Row>
        </Form>
    )
});

export default LeaveRegister;


