import React, { useState, useEffect } from 'react'
import { Radio, Form, Input, Select, Row, Col, Button, Checkbox, DatePicker } from 'antd';
import { useHistory } from 'react-router-dom';
import {
    PIS_COMPANY_LIST_All,
    PIS_DEPARTMENT_LIST,
    DESIGNATION_LIST_ALL,
    USER_LIST,
    USER_CREATE,
    USER_UPDATE,
    GET_ROLES_DATA,
    EMPLOYEE_LIST_ALL,
    GET_USER_ROLES,
    TEAMS_LIST_ALL
} from "../../../../../scripts/api";
import { getData, postData } from "../../../../../scripts/api-service";
import {alertPop} from "../../../../../scripts/message";
import { mobileNumberValidationPattern } from "../../../../../scripts/helper";
import moment from 'moment';

const UserCreate = Form.create()(({form, isUpdate}) => {
    let searchUrl = window.location.search;
    let params = new URLSearchParams(searchUrl);
    let paramsEmployee = params.get('emp_id');
    let empId = paramsEmployee ? paramsEmployee * 1 : undefined;

    const [ companyList, setCompanyList ]= useState();
    const [ departmentList, setDepartmentList ]= useState();
    const [ designationList, setDesignationList ]= useState();
    const [ teamList, setTeamList ]= useState();
    const [ userList, setUserList ]= useState();
    const [ roleList, setRoleList ]= useState();
    const [ selectedCompany, setSelectedCompany ]= useState();
    const [ selectedDepartment, setSelectedDepartment ]= useState();
    const [ employeeData, setEmployeeData ]= useState();
    const [ userRolesList, setUserRolesList ]= useState();
    const history = useHistory();

    const getEmployeeInfo = async() => {
        let url = EMPLOYEE_LIST_ALL + "?";
            if(empId){
                url = url + "emp_id=" + empId;
                let res = await getData(url);
            
                if (res) {
                    let masterData = res?.data?.data?.data[0];
                    if (res.data.code === 200) {
                        setEmployeeData(masterData);
                    }
                }
            }
    }

    const getUserRolesList = async () => {
        let url = GET_USER_ROLES + "?";
        if(empId) url += "emp_id=" + empId
        let res = await getData(url);
    
        if (res) {
            let masterData = res?.data?.data;
            if (res.data.code === 200) {
                let result = [];
                Object.keys(masterData).forEach(item=>{
                    result.push(JSON.parse(item))
                })
                setUserRolesList(result);
            }
        }
    }

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
        let url = PIS_DEPARTMENT_LIST + "?";
        if(selectedCompany) url = url + "company_id=" + selectedCompany; 
        let res = await getData(url);
    
        if (res) {
            let masterData = res?.data?.data;
            if (res.data.code === 200) {
                setDepartmentList(masterData);
            }
        }
    }

    const getDesignationList = async () => {
        let url = DESIGNATION_LIST_ALL + "?";
        if(selectedDepartment) url = url + "department_id=" + selectedDepartment; 
        let res = await getData(url);
    
        if (res) {
            let masterData = res?.data?.data;
            if (res.data.code === 200) {
                setDesignationList(masterData);
            }
        }
    }

    const getTeamList = async () => {
        let url = TEAMS_LIST_ALL + "?";
        if(selectedDepartment) url = url + "department_id=" + selectedDepartment; 
        let res = await getData(url);
    
        if (res) {
            let masterData = res?.data?.data;
            if (res.data.code === 200) {
                setTeamList(masterData);
            }
        }
    }

    const getUserList = async () => {
        let url = USER_LIST + "?";
        if(selectedDepartment) url = url + "department_id=" + selectedDepartment; 
        let res = await getData(url);
    
        if (res) {
            let masterData = res?.data?.data;
            if (res.data.code === 200) {
                setUserList(masterData);
            }
        }
    }

    const getRoleList = async () => {
        let res = await getData(GET_ROLES_DATA);
    
        if (res) {
            let masterData = res?.data?.data;
            if (res.data.code === 200) {
                setRoleList(masterData);
            }
        }
    }

    const localSubmit = (e) => {
        e.preventDefault();
        form.validateFields(async(err, values) => {
          if (!err) {
            let payload = {};
            if(isUpdate) payload = {...values}
            else {
                payload = {
                    'name': values.name,
                    'email': values.email,
                    'contact_no': values.contact_no,
                    'company_id': values.company_id,
                    'department_id': values.department_id,
                    'team_id': values.team_id,
                    'designation_id': values.designation_id,
                    'reporting_to': values.reporting_to,
                    'employee_category': values.employee_category,
                    'status': values.status,
                    'department_head': values.department_head,
                    'role_ids': values.role_ids,
                    'emp_id': values.emp_id,
                    'password': values.password
                }
            }
            

            if(form.getFieldValue('confirm_password') === form.getFieldValue('password')){
                let url = isUpdate ? USER_UPDATE + "/" + values.emp_id : USER_CREATE;
                let res = await postData(url, payload);
        
                if (res) {
                  let masterData = res?.data?.data;
                  history.push('/employee-register/user-list');
                  if(isUpdate) alertPop('success', 'User updated successfully');
                  else alertPop('success', 'User created successfully');
                }
            }
            else alertPop('error', 'Password and Confirm password does not match')
          }
        })
    }    

    useEffect(()=>{
        getCompanyList();
        getRoleList();
    },[]);
 
    useEffect(()=>{
        if(selectedCompany) getDepartmentList(selectedCompany);
    },[selectedCompany]);
    
    useEffect(()=>{
        if(selectedDepartment) {
            getDesignationList(selectedDepartment);
            getUserList(selectedDepartment);
            getTeamList(selectedDepartment);
        }
    },[selectedDepartment]);
    
    useEffect(()=>{
        if(isUpdate){
            getEmployeeInfo();
            getDepartmentList();
            getDesignationList();
            getUserRolesList();
            getTeamList();
            getUserList();
        } 
    },[isUpdate]);

  return (
    <Form onSubmit={localSubmit}>
        <Row gutter={32}>
            <Col span={6}>
                <Form.Item label={'Employee Id'}>
                    {form.getFieldDecorator('emp_id', {
                        rules: [{required: true, message: "Required!"}],
                        initialValue: isUpdate ? employeeData?.emp_id : undefined
                    })(<Input 
                            placeholder="Enter employee Id" 
                            size="large"
                            // disabled={isUpdate ? true : false}
                        />)}
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label={'Employee Name'}>
                    {form.getFieldDecorator('name', {
                        rules: [{required: true, message: "Required!"}],
                        initialValue: isUpdate ? employeeData?.name : undefined
                    })(<Input 
                            placeholder="Enter employee name" 
                            size="large"
                            // disabled={empId ? true : false}
                        />)}
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label={'Email'}>
                    {form.getFieldDecorator('email', {
                        rules: [{required: true, message: "Required!"}, {
                            pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                            message: "Please enter a valid email address",
                        }],
                        initialValue: isUpdate ? employeeData?.email : undefined
                    })(<Input 
                            size="large" 
                            placeholder="Enter employee email"
                            // disabled={empId ? true : false}
                        />)}
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
                        initialValue:  isUpdate ? employeeData?.contact_no : undefined
                    })(<Input 
                            size="large" 
                            placeholder="Enter contact number"
                            // disabled={empId ? true : false}
                        />)}
                </Form.Item>
            </Col>
        </Row>
        {/* <hr className="line-top-border"/> */}
        <Row gutter={32}>
            <Col span={6}>
                <Form.Item label={'Company'}>
                    {form.getFieldDecorator('company_id', {
                        rules: [{required: true, message: "Required!"}],
                        initialValue: isUpdate ? employeeData?.company_id : undefined
                    })(<Select 
                        allowClear
                        getPopupContainer={trigger => trigger.parentNode} 
                        size="large" 
                        placeholder='Select Company' 
                        onChange={(value)=>{
                            setSelectedCompany(value);
                            form.resetFields(['department_id', 'team_id', 'designation_id', 'reporting_to']);
                            setDepartmentList();
                            setTeamList();
                            setDesignationList();
                            getUserList();
                        }}
                        showSearch
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        // disabled={isUpdate ? true : false}
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
                        initialValue: isUpdate ? employeeData?.department_id : undefined
                    })(<Select 
                        allowClear
                        getPopupContainer={trigger => trigger.parentNode} 
                        size="large" 
                        placeholder='Select Department' 
                        onChange={(value)=>{
                            setSelectedDepartment(value);
                            form.resetFields(['team_id', 'designation_id', 'reporting_to']);
                            setTeamList();
                            setDesignationList();
                            getUserList();
                        }}
                        showSearch
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        // disabled={isUpdate ? true : false}
                    >
                    {departmentList?.map((dept, index) =>
                    <Select.Option key={`dept-${index}-${dept.id}`}
                                value={dept.id}>{dept.name}</Select.Option>
                    )}
                    </Select>)}
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label={'Team'}>
                    {form.getFieldDecorator('team_id', {
                        // rules: [{required: true, message: "Required!"}],
                        initialValue: isUpdate ? employeeData?.team_id : undefined
                    })(<Select 
                        allowClear
                        getPopupContainer={trigger => trigger.parentNode} 
                        size="large" 
                        placeholder='Select Team' 
                        onChange={(value)=>setSelectedDepartment(value)}
                        showSearch
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        // disabled={isUpdate ? true : false}
                    >
                    {teamList?.map((team, index) =>
                    <Select.Option key={`team-${index}-${team.id}`}
                                value={team.id}>{team.name}</Select.Option>
                    )}
                    </Select>)}
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label={'Designation'}>
                    {form.getFieldDecorator('designation_id', {
                        rules: [{required: true, message: "Required!"}],
                        initialValue: isUpdate ? employeeData?.designation_id : undefined
                    })(<Select
                        allowClear 
                        getPopupContainer={trigger => trigger.parentNode} 
                        size="large" 
                        placeholder='Select Designation' 
                        showSearch
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        // disabled={isUpdate ? true : false}
                    >
                    {designationList?.map((designation, index) =>
                    <Select.Option key={`designation-${index}-${designation.id}`}
                                value={designation.id}>{designation.name}</Select.Option>
                    )}
                    </Select>)}
                </Form.Item>
            </Col>
        </Row>
        {/* <hr className="line-top-border"/> */}
        <Row gutter={32}>
            <Col span={6}>
                <Form.Item label={'Reporting To'}>
                    {form.getFieldDecorator('reporting_to', {
                        rules: [{required: true, message: "Required!"}],
                        initialValue: isUpdate ? employeeData?.reporting_to : undefined
                    })(<Select 
                        allowClear
                        getPopupContainer={trigger => trigger.parentNode} 
                        size="large" 
                        placeholder='Select Supervisor' 
                        showSearch
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        // disabled={isUpdate ? true : false}
                    >
                    {userList?.map((user, index) =>
                    <Select.Option key={`supervisor-${index}-${user.emp_id}`}
                                value={user.emp_id}>{user.name}</Select.Option>
                    )}
                    </Select>)}
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label={'Employee Category'}>
                    {form.getFieldDecorator('employee_category', {
                        rules: [{required: true, message: "Required!"}],
                        initialValue: isUpdate ? employeeData?.employee_category : undefined
                    })(<Select
                        allowClear 
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
            <Col span={6}>
                <Form.Item label={'Employee Status'}>
                    {form.getFieldDecorator('status', {
                        rules: [{required: true, message: "Required!"}],
                        initialValue: isUpdate ? employeeData?.status : undefined
                    })(
                        <Select 
                        allowClear
                        getPopupContainer={trigger => trigger.parentNode} 
                        size="large" 
                        placeholder='Select Employee Status' 
                        showSearch
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                    <Select.Option key="Active" value="Active">Active</Select.Option>
                    <Select.Option key="Deactive" value="Deactive">Deactive</Select.Option>
                    </Select>)}
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item label={''}>
                    {form.getFieldDecorator('department_head', {
                        // rules: [{required: true, message: "Required!"}],
                        initialValue: isUpdate ? employeeData?.department_head : undefined
                    })(<Checkbox 
                            style={{paddingTop: '2.5rem'}}
                            // disabled={isUpdate ? true : false}
                        >Is Department Head</Checkbox>)}
                </Form.Item>
            </Col>
        </Row>
        {!isUpdate ? 
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
                            rules: [{
                                required: true,
                                message: 'Please confirm your password!',
                                }]
                            // initialValue: activityDetails?.function_type ? activityDetails?.function_type?.id : undefined
                        })(<Input placeholder="Confirm password" size="large"/>)}
                    </Form.Item>
                </Col>
            </Row>
        : null}
        <hr className="line-top-border"/>
        <Row>
            <Col span={24}>
                <Form.Item label={'Employee role'}>
                    {form.getFieldDecorator('role_ids', {
                        rules: [{required: true, message: "Required!"}],
                        initialValue: isUpdate ? userRolesList : undefined
                    })(<Select 
                        mode="multiple"
                        getPopupContainer={trigger => trigger.parentNode} 
                        size="large" 
                        placeholder='Select Role(s)' 
                        showSearch
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {roleList?.map((role, index) =>
                        <Select.Option key={`role-${index}-${role.id}`}
                                    value={role.id}>{role.name}</Select.Option>
                        )}
                    </Select>)}
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
                    {/* {isUpdateState ? 'Update' : 'Create New'} */}
                    {isUpdate ? "Update" : "Create"}
                </Button>
            </Col>
        </Row>
    </Form>
  )
});

export default UserCreate;