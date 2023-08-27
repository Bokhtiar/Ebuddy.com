import React, { useState, useEffect } from 'react'
import { Radio, Form, Input, Select, Row, Col, Button, Checkbox, DatePicker } from 'antd';
import { useHistory } from 'react-router-dom';
import {
    PIS_DEPARTMENT_LIST,
    EMPLOYEE_INFO,
    USER_LIST,
    PIS_COMPANY_LIST_All,
    DESIGNATION_LIST_ALL,
    USER_CREATE
} from "../../../../../scripts/api";
import { mobileNumberValidationPattern } from "../../../../../scripts/helper";
import { getData, postData } from "../../../../../scripts/api-service";
import {alertPop} from "../../../../../scripts/message";

const EmployeeFromRegister = Form.create()(({form}) => {

    const [ companyList, setCompanyList ]= useState();
    const [ departmentList, setDepartmentList ]= useState();
    const [ designationList, setDesignationList ]= useState();
    const [ userList, setUserList ]= useState();
    const history = useHistory();

    const getCompanyList = async () => {
        let res = await getData(PIS_COMPANY_LIST_All);
    
        if (res) {
            let masterData = res?.data?.data;
            if (res.data.code === 200) {
                setCompanyList(masterData);
            }
        }
    }

    const getDepartmentList = async () => {
        let res = await getData(PIS_DEPARTMENT_LIST);
    
        if (res) {
            let masterData = res?.data?.data;
            if (res.data.code === 200) {
                setDepartmentList(masterData);
            }
        }
    }

    const getDesignationList = async () => {
        let res = await getData(DESIGNATION_LIST_ALL);
    
        if (res) {
            let masterData = res?.data?.data;
            if (res.data.code === 200) {
                setDesignationList(masterData);
            }
        }
    }

    const getUserList = async () => {
        let res = await getData(USER_LIST);
    
        if (res) {
            let masterData = res?.data?.data;
            if (res.data.code === 200) {
                setUserList(masterData);
            }
        }
    }

    
    const handleSearch = async(value) =>{
        let url = EMPLOYEE_INFO;
        if(value){
            url = url + value;
            let res = await getData(url);

            if (res) {
                let masterData = res?.data?.data;
                if (res.data.code === 200) {
                    if(!masterData){
                        alertPop('error', 'No user found!');
                        form.resetFields();
                    }
                    else {
                        form.setFieldsValue({
                            'name': masterData.name || undefined,
                            'email': masterData.email || undefined,
                            'contact_no': masterData.contact_no || undefined,
                            'reporting_to': masterData.supervisor_id || undefined,
                            'company_id': masterData.company_id || undefined,
                            'department_id': masterData.department_id || undefined,
                            'designation_id': masterData.designation_id || undefined,
                            'employee_category': masterData.employee_category || undefined, 
                            'status': masterData.status || undefined,
                        })
                    }
                }
            }
        } 
    }

    const localSubmit = (e) => {
        e.preventDefault();
        form.validateFields(async(err, values) => {
          if (!err) {
            let payload = {
              ...values,
              'status': values.status === 1 ? 'Active' : 'Deactive'
            }

            if(form.getFieldValue('confirm_password') === form.getFieldValue('password')){
                let res = await postData(USER_CREATE, payload);
        
                if (res) {
                  let masterData = res?.data?.data;
                  history.push('/employee-register/employee-list');
                  alertPop('success', 'User created successfully')
                }
            }
            else alertPop('error', 'Password and Confirm password does not match');
          }
        })
    } 

    useEffect(()=>{
        getCompanyList();
        getDepartmentList();
        getDesignationList();
        getUserList();
    },[]);

  return (
    <Form onSubmit={localSubmit}>
        <Row gutter={32}>
            <Col span={8}>
                <Form.Item label={'Employee Id'}>
                    {form.getFieldDecorator('emp_id', {
                        rules: [{required: true, message: "Required!"}],
                    })(<Input.Search
                            placeholder="Input employee id"
                            enterButton="Search"
                            size="large"
                            onSearch={(value) => handleSearch(value)}
                      />)}
                </Form.Item>
            </Col>
        </Row>
        <hr className="line-top-border"/>
        <Row gutter={32}>
            <Col span={6}>
                <Form.Item label={'Employee Name'}>
                    {form.getFieldDecorator('name', {
                        rules: [{required: true, message: "Required!"}],
                    })(<Input placeholder="Enter employee name" size="large" disabled/>)}
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label={'Email'}>
                    {form.getFieldDecorator('email', {
                        rules: [{required: true, message: "Required!"}, {
                            pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                            message: "Please enter a valid email address",
                        }],
                    })(<Input size="large" placeholder="Enter employee email" disabled/>)}
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label={'Contact Number'}>
                    {form.getFieldDecorator('contact_no', {
                        rules: [{required: true, message: "Required!"},
                        {
                            pattern: mobileNumberValidationPattern,
                            message: "Please enter a valid mobile no",
                        }],
                    })(<Input size="large" placeholder="Enter contact number" disabled/>)}
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label={'Reporting To'}>
                    {form.getFieldDecorator('reporting_to', {
                        // rules: [{required: true, message: "Required!"}],
                    })(<Select 
                        getPopupContainer={trigger => trigger.parentNode} 
                        size="large" 
                        placeholder='Select Supervisor' 
                        showSearch
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        disabled
                    >
                    {userList?.map((user, index) =>
                    <Select.Option key={`supervisor-${index}-${user.emp_id}`}
                                value={user.emp_id}>{user.name}</Select.Option>
                    )}
                    </Select>)}
                </Form.Item>
            </Col>
        </Row>
        <Row gutter={32}>
            <Col span={6}>
                <Form.Item label={'Company'}>
                    {form.getFieldDecorator('company_id', {
                        rules: [{required: true, message: "Required!"}],
                    })(<Select 
                        getPopupContainer={trigger => trigger.parentNode} 
                        size="large" 
                        placeholder='Select Supervisor' 
                        showSearch
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        disabled
                    >
                    {companyList?.map((company, index) =>
                    <Select.Option key={`company-${index}-${company.id}`}
                                value={company.id}>{company.name}</Select.Option>
                    )}
                    </Select>)}
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label={'Department'}>
                    {form.getFieldDecorator('department_id', {
                        rules: [{required: true, message: "Required!"}],
                    })(<Select 
                        getPopupContainer={trigger => trigger.parentNode} 
                        size="large" 
                        placeholder='Select Supervisor' 
                        showSearch
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        disabled
                    >
                    {departmentList?.map((department, index) =>
                    <Select.Option key={`department-${index}-${department.id}`}
                                value={department.id}>{department.name}</Select.Option>
                    )}
                    </Select>)}
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label={'Designation'}>
                    {form.getFieldDecorator('designation_id', {
                        rules: [{required: true, message: "Required!"}],
                    })(<Select 
                        getPopupContainer={trigger => trigger.parentNode} 
                        size="large" 
                        placeholder='Select Supervisor' 
                        showSearch
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        disabled
                    >
                    {designationList?.map((designation, index) =>
                    <Select.Option key={`designation-${index}-${designation.id}`}
                                value={designation.id}>{designation.name}</Select.Option>
                    )}
                    </Select>)}
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label={'Employee Category'}>
                    {form.getFieldDecorator('employee_category', {
                        rules: [{required: true, message: "Required!"}],
                    })(<Select 
                        getPopupContainer={trigger => trigger.parentNode} 
                        size="large" 
                        placeholder='Select Employee Category' 
                        showSearch
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                    <Select.Option key="Probation" value="Probation">Probation</Select.Option>
                    <Select.Option key="Contractual" value="Contractual">Contractual</Select.Option>
                    <Select.Option key="Permanent" value="Permanent">Permanent</Select.Option>
                    <Select.Option key="Separated" value="Separated">Separated</Select.Option>
                    </Select>)}
                </Form.Item>
            </Col>
        </Row>
        <hr className="line-top-border"/>
        <Row gutter={32}>
            <Col span={12}>
                <Form.Item label={'Password'}>
                    {form.getFieldDecorator('password', {
                        rules: [{required: true, message: "Required!"}],
                        // initialValue: activityDetails?.department_id ? activityDetails?.department_id : userInfo ? userInfo?.department_id : undefined
                    })(<Input placeholder="Enter password" size="large"/>)}
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item label={'Confirm Password'}>
                    {form.getFieldDecorator('confirm_password', {
                        rules: [{required: true, message: "Required!"}],
                        // initialValue: activityDetails?.function_type ? activityDetails?.function_type?.id : undefined
                    })(<Input placeholder="Confirm password" size="large"/>)}
                </Form.Item>
            </Col>
        </Row>
        <hr className="line-top-border"/>
        <Row gutter={32}>
            <Col span={12}>
                <Form.Item label={'Employee Status'}>
                    {form.getFieldDecorator('status', {
                        rules: [{required: true, message: "Required!"}],
                    })(<Radio.Group disabled>
                        <Radio value={1}>Active</Radio>
                        <Radio value={0}>Inactive</Radio>
                        </Radio.Group>)}
                </Form.Item>
            </Col>
        </Row>
        <Row>
            <Col span={3} style={{float: 'right'}}>
                <Button
                    style={{width: 'auto', marginTop: '2rem'}}
                    // loading={loading}
                    block
                    type="primary"
                    htmlType="submit"
                    size="large"
                >
                    Update
                </Button>
            </Col>
        </Row>
    </Form>
  )
});

export default EmployeeFromRegister;