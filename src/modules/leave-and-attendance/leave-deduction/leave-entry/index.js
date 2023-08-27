import React, {useState, useEffect} from 'react';
import { Form, Select, Input, PageHeader, Row, Col, DatePicker, Button, Radio } from 'antd';
import { useHistory } from 'react-router-dom';
import { TableWrapper, Wrapper } from "../../../commons/Wrapper";
import {getData, postData} from "../../../../scripts/api-service";
import {
  PIS_COMPANY_LIST,
  PIS_DEPARTMENT_LIST,
  USER_LIST,
  LEAVE_APPLICATION,
  EMPLOYEE_INFO_LIST
} from "../../../../scripts/api";
import moment from 'moment';
import { alertPop } from '../../../../scripts/message';

const { Option } = Select;

const LeaveEntry = Form.create()(({ form, props }) => {
  const [companyList, setCompanyList] = useState();
  const [selectedCompany, setSelectedCompany] = useState();
  const [departmentList, setDepartmentList] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState();
  const [employeeList, setEmployeeList] = useState();
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [startDate, setStartDate] = useState();
  const [until, setUntil] = useState();
  const [leaveCategory, setLeaveCategory] = useState();
  const [rowData, setRowData] = useState();
  const history = useHistory();

  let searchUrl = window.location.search;
  let params = new URLSearchParams(searchUrl);
  let paramsRowId = params.get('rowId');

  const getLeaveApplicationList = async () => {
    let url = LEAVE_APPLICATION + '/' + paramsRowId;
    let res = await getData(url);
    
    if (res) {
      let masterData = res?.data?.data;
      masterData && setRowData(masterData);
    }
  };

  const getCompanyList = async () => {
    let url = PIS_COMPANY_LIST + "?";
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data?.data;
      setCompanyList(masterData);
    }
  };

  const getDepartmentList = async () => {
    let url = PIS_DEPARTMENT_LIST + "?"; 
    if(selectedCompany) url = url + "&company_id=" + selectedCompany;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      setDepartmentList(masterData);
    }
  };

  const getEmployeeList = async () => {
    let url = EMPLOYEE_INFO_LIST + "?";
    if(selectedDepartment) url = url + "&department_id=" + selectedDepartment;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      setEmployeeList(masterData);
    }
  };

  const setDate = (value) =>{
    setStartDate(value);
    setUntil(value);
    form.setFieldsValue({date_to: moment(value)})
  }

  const localSubmit = (e) => {
    e.preventDefault();
    form.validateFields(async(err, values) => {
      if (!err) {
        let payload = {
          ...values,
          date_from: moment(values.date_from).format("YYYY-MM-DD"),
          date_to: moment(values.date_to).format("YYYY-MM-DD"),
          joining_date: moment(values.joining_date).format("YYYY-MM-DD")
        }
        let url = paramsRowId ? LEAVE_APPLICATION + '/' + paramsRowId : LEAVE_APPLICATION;
        let res = await postData(url, payload);

        if (res) {
          let masterData = res?.data?.data;
          history.push('/leave-and-attendance/deduction-leave-list');
          alertPop('success', 'Leave applied successfully')
        }
      }
    })
  }

  useEffect(()=>{
    getCompanyList();
    getLeaveApplicationList();
  },[]);

  useEffect(()=>{
    if(selectedCompany) getDepartmentList();
  },[selectedCompany]);

  useEffect(()=>{
    if(selectedDepartment) getEmployeeList();
  },[selectedDepartment]);

  useEffect(()=>{
    if(until){
      if(leaveCategory === 'Half Day'){
        if(moment(until).isSame(startDate)){
          form.setFieldsValue({leave_day_count: 0.5})
        }
        else{
          let difference = moment(until).diff(moment(startDate), 'days')
          form.setFieldsValue({leave_day_count: difference + 1 + 0.5})
        }
      }
      else{
        if(moment(until).isSame(startDate)){
          form.setFieldsValue({leave_day_count: 1})
        }
        else{
          let difference = moment(until).diff(moment(startDate), 'days')
          form.setFieldsValue({leave_day_count: difference + 1})
        }
      }
      form.setFieldsValue({joining_date: moment(until).add(1, 'd')})
    } 
  },[until, leaveCategory]);

  return (
    <Wrapper >
      <PageHeader
        style={{
          border: '1px solid rgb(235, 237, 240)',
        }}
        onBack={() => history.push(`/leave-and-attendance/deduction-leave-list`)}
        subTitle="Back to list"
      />
      <Form
        layout="vertical"
        onSubmit={localSubmit}
        style={{margin: '1rem'}}
      > 
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={'Company'}>
                {form.getFieldDecorator('company_id', {
                    rules: [{required: true, message: "Required!"}],
                    initialValue: rowData?.company?.id ? rowData?.company?.id : undefined
                })(
                    <Select
                        size="large"
                        showSearch
                        value={selectedCompany}
                        onChange={(value)=>{
                          setSelectedCompany(value)
                          form.resetFields(['department_id', 'emp_id'])
                        }}                        
                        style={{ width: "100%" }}
                        placeholder="Select company"
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {companyList?.map(m => <Select.Option key={m.value} value={m.id}>{m.name}</Select.Option>)}
                    </Select>,
                )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'Department'}>
                {form.getFieldDecorator('department_id', {
                    rules: [{required: true, message: "Required!"}],
                    initialValue: rowData?.department?.id ? rowData?.department?.id : undefined
                })(
                    <Select
                        size="large"
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="Select department"
                        value={selectedDepartment ? selectedDepartment : undefined}
                        onChange={(value)=>{
                          setSelectedDepartment(value)
                          form.resetFields('emp_id')
                        }}
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {departmentList?.map(m => <Select.Option key={m.value} value={m.id}>{m.name}</Select.Option>)}
                    </Select>,
                )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={'Employee'}>
                {form.getFieldDecorator('emp_id', {
                    rules: [{required: true, message: "Required!"}],
                    initialValue: rowData?.employee?.emp_id ? rowData?.employee?.emp_id : undefined
                })(
                    <Select
                        size="large"
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="Select employee"
                        value={selectedEmployee ? selectedEmployee : undefined}
                        onChange={(value)=>setSelectedEmployee(value)}
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {employeeList?.map(m => <Select.Option key={m.value} value={m.emp_id}>{m.name}</Select.Option>)}
                    </Select>,
                )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'Leave Type'}>
                {form.getFieldDecorator('leave_type', {
                    rules: [{required: true, message: "Required!"}],
                    initialValue: rowData?.leave_type ? rowData?.leave_type : undefined
                })(
                    <Select
                        size="large"
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="Select leave type"
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                      <Select.Option key="Annual" value="Annual">Annual</Select.Option>
                      <Select.Option key="Casual" value="Casual">Casual</Select.Option>
                      <Select.Option key="Medical" value="Medical">Medical</Select.Option>
                      <Select.Option key="Adjustment" value="Adjustment">Adjustment</Select.Option>
                      <Select.Option key="Probation" value="Probation">Probation</Select.Option>
                      <Select.Option key="Maternity" value="Maternity">Maternity</Select.Option>
                      <Select.Option key="Paternity" value="Paternity">Paternity</Select.Option>
                      <Select.Option key="No Pay" value="No Pay">No Pay</Select.Option>
                    </Select>,
                )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={'Date of Leave'}>
              {form.getFieldDecorator('date_from', {
                    rules: [{required: true, message: "Required!"}],
                    initialValue: rowData?.date_from ? moment(new Date(rowData?.date_from)) : undefined
                })(<DatePicker 
                    placeholder="Enter leave date" 
                    format={'YYYY-MM-DD'} 
                    size="large" 
                    onChange={setDate}
                  />,
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'Until'}>
              {form.getFieldDecorator('date_to', {
                    // rules: [{required: true, message: "Required!"}],
                    initialValue: rowData?.date_to ? moment(new Date(rowData?.date_to)) : undefined
                })(<DatePicker 
                    placeholder="until" 
                    format={'YYYY-MM-DD'} 
                    size="large" 
                    onChange={(value)=> setUntil(value)}
                  />,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={'Leave Category'}>
                {form.getFieldDecorator('leave_category', {
                    rules: [{required: true, message: "Required!"}],
                    initialValue: rowData?.leave_category ? rowData?.leave_category : undefined
                })(
                    <Select
                        size="large"
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="Select leave category"
                        onChange={(value)=>setLeaveCategory(value)}
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option key="Full Day" value="Full Day">Full Day</Option>
                        <Option key="Half Day" value="Half Day">Half Day</Option>
                    </Select>,
                )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'including total working day/days'}>
                {form.getFieldDecorator('leave_day_count', {
                    rules: [{required: true, message: "Required!"}],
                    initialValue: rowData?.leave_day_count ? parseInt(rowData?.leave_day_count) : undefined
                })(
                  <Input placeholder="Enter total working days" size="large" disabled/>,
                )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={'Next joining days'}>
              {form.getFieldDecorator('joining_date', {
                    rules: [{required: true, message: "Required!"}],
                    initialValue: rowData?.joining_date ? moment(new Date(rowData?.joining_date)) : undefined
                })(<DatePicker 
                      placeholder="Enter joining date" 
                      format={'YYYY-MM-DD'} 
                      size="large" 
                      disabled
                    />,
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'Reason for leave'}>
                {form.getFieldDecorator('reason', {
                    rules: [{required: true, message: "Required!"}],
                    initialValue: rowData?.reason ? rowData?.reason : undefined
                })(
                  <Input placeholder="Enter reason for leave" size="large"/>,
                )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={'Address & Telephone Number During Leave'}>
              {form.getFieldDecorator('contact_details_during_leave', {
                    // rules: [{required: true, message: "Required!"}],
                    initialValue: rowData?.contact_details_during_leave ? rowData?.contact_details_during_leave : undefined
                })(<Input placeholder="Enter Address & Telephone Number During Leave" size="large"/>,
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'Responsible person'}>
                {form.getFieldDecorator('responsible_person_id', {
                    rules: [{required: true, message: "Required!"}],
                    initialValue: rowData?.responsible_person_id ? rowData?.responsible_person_id : undefined
                })(
                    <Select
                        size="large"
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="Select responsible person"
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {employeeList?.map(m => <Select.Option key={m.value} value={m.emp_id}>{m.name}</Select.Option>)}
                    </Select>,
                )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={'Status'}>
              {form.getFieldDecorator('status', {
                    rules: [{required: true, message: "Required!"}],
                    initialValue: rowData?.status ? rowData.status : undefined
                })(<Radio.Group>
                  <Radio value={'1'}>Active</Radio>
                  <Radio value={"0"}>Inactive</Radio>
                </Radio.Group>,
              )}
            </Form.Item>
          </Col>
        </Row>
        <div style={{ textAlign: 'right' }}>
          <Button 
            size='large' 
            type="primary" 
            htmlType="submit"
          >
            Save Now
          </Button>
        </div>
      </Form>
    </Wrapper>
  )
})

export default LeaveEntry;