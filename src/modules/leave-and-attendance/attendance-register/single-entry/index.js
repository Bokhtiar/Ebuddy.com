import React, {useState, useEffect} from 'react';
import { Form, Select, Input, PageHeader, Row, Col, DatePicker, Button, Radio, TimePicker } from 'antd';
import { useHistory } from 'react-router-dom';
import { TableWrapper, Wrapper } from "../../../commons/Wrapper";
import {getData, postData} from "../../../../scripts/api-service";
import {
  PIS_COMPANY_LIST,
  PIS_DEPARTMENT_LIST,
  USER_LIST,
  ATTENDANCE_REGISTER,
  EMPLOYEE_INFO_LIST
} from "../../../../scripts/api";
import moment from 'moment';
import { alertPop } from '../../../../scripts/message';

const { Option } = Select;

const AttendanceSingleEntry = Form.create()(({ form, props }) => {
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
  let paramsRowId = params.get('rowId')

  const getLeaveApplicationList = async () => {
    let url = ATTENDANCE_REGISTER;

    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data?.data;
      let data = masterData.filter(item => item.id == paramsRowId);
      setRowData(data[0]);
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
        let url = ATTENDANCE_REGISTER;
        let payload ={
          ...values,
          date: moment(values?.date).format("YYYY-MM-DD"),
          first_in_time: moment(values?.first_in_time).format("HH:mm:ss"),
          last_out_time: moment(values?.last_out_time).format("HH:mm:ss"),
        }
        let res = await postData(url, payload);

        if (res) {
          let masterData = res?.data?.data;
          history.push('/leave-and-attendance/attendance-list');
          alertPop('success', 'Attendance registered successfully')
        }
      }
    })
  }

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current > moment().endOf('day');
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

  return (
    <Wrapper >
      <PageHeader
        style={{
          border: '1px solid rgb(235, 237, 240)',
        }}
        onBack={() => history.push(`/leave-and-attendance/attendance-list`)}
        // title="Back to list"
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
                        style={{ width: "100%" }}
                        placeholder="Select company"
                        value={selectedCompany}
                        onChange={(value)=>{
                          setSelectedCompany(value)
                          form.resetFields(['department_id', 'emp_id'])
                        }} 
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
            <Form.Item label={'Attendance Type'}>
                {form.getFieldDecorator('attendance_type', {
                    rules: [{required: true, message: "Required!"}],
                    initialValue: rowData?.attendance_type ? rowData?.attendance_type : undefined
                })(
                    <Select
                        size="large"
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="Select attendance type"
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                      <Select.Option key="Full Day" value="Full Day">Full Day</Select.Option>
                      <Select.Option key="Half Day" value="Half Day">Half Day</Select.Option>
                    </Select>,
                )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={'Punch In Time'}>
              {form.getFieldDecorator('first_in_time', {
                    // rules: [{required: true, message: "Required!"}],
                    initialValue: rowData?.first_in_time ? moment(rowData?.first_in_time, 'HH:mm:ss') : undefined
                })(<TimePicker 
                  style={{width: '100%'}}
                  placeholder="Enter Punch In Time" 
                  defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} 
                  size="large" 
                />,
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'Punch Out Time'}>
              {form.getFieldDecorator('last_out_time', {
                    // rules: [{required: true, message: "Required!"}],
                    initialValue: rowData?.last_out_time ? moment(rowData?.last_out_time, 'HH:mm:ss') : undefined
                })(<TimePicker 
                  style={{width: '100%'}}
                  placeholder="Enter Punch Out Time" 
                  defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} 
                  size="large" 
                />,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={'Date of Attendance'}>
              {form.getFieldDecorator('date', {
                    // rules: [{required: true, message: "Required!"}],
                    initialValue: rowData?.date ? moment(rowData?.date) : undefined
                })(<DatePicker 
                    disabledDate={disabledDate}
                    placeholder="Enter attendance date" 
                    format={'YYYY-MM-DD'} 
                    size="large" 
                  />,
              )}
            </Form.Item>
          </Col>
          {/* <Col span={12}>
            <Form.Item label={'Status'}>
              {form.getFieldDecorator('status', {
                    // rules: [{required: true, message: "Required!"}],
                    initialValue: rowData?.status ? rowData?.status : undefined
                })(<Radio.Group size="large">
                  <Radio value={1}>Active</Radio>
                  <Radio value={0}>Inactive</Radio>
                </Radio.Group>,
              )}
            </Form.Item>
          </Col> */}
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

export default AttendanceSingleEntry;

