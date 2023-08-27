import React, {useEffect, useState} from 'react'
import {Button, Col, DatePicker, Form, Input, PageHeader, Row, Select, Skeleton} from "antd";
import {useHistory} from "react-router-dom";
import {Wrapper} from "../../../commons/Wrapper";
import {SOP_INITIATE, SOP_WISE_DEPARTMENT_DESIGNATION_LIST, TASK_SETUP_SOP_LIST, DEPARTMENT_WISE_SOP_LIST} from '../../../../scripts/api';
import {getData, postData} from '../../../../scripts/api-service';
import {alertPop} from "../../../../scripts/message";
import moment from 'moment';
import ResponsibleUser from './responsibleUser';
import * as Cookies from "js-cookie";

const SOPInititate = Form.create()(({ form, submit}) => {
  const company_id = JSON.parse(Cookies.get("profile")).company_id;
  const department_id = JSON.parse(Cookies.get("profile")).department_id;
  const [sopSetupList, setSopSetupList] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [sop, setSOP] = useState();
  const [selectedDepartment] = useState(department_id);
  const [sopWiseDepartmentDesignationList, setSOPWiseDepartmentDesignationList] = useState();
  const [loading, setLoading] = useState(false);
  const [isInitiateDisabled, setIsInitiateDisabled] = useState(true);
  const history = useHistory();

  const getSOPSetupList = async() => {
    let url = DEPARTMENT_WISE_SOP_LIST + '?';
    if(selectedDepartment) url = url + 'department_id=' + selectedDepartment;
     
    let res = await getData(url);
    if (res) {
      setSopSetupList(res?.data?.data);
    }
  }
  
  const getSOPWiseDepartmentDesignationList = async() => {
    let url = "";
    if(sop) url = SOP_WISE_DEPARTMENT_DESIGNATION_LIST + "/" + sop;
    let res = await getData(url);
    
    if (res) {
      setSOPWiseDepartmentDesignationList(res?.data?.data);
    }
  }

  const handelSOPSetupSelect = (val) => {
    let find = sopSetupList.find(sop => sop.id === val);

    if (find) {
      form.setFieldsValue({
        'company_id': find.company?.id,
        'company_name': find.company?.name,
        'estimation_day': find.estimation
      });
    }
  }
  
  const disabledDate = (current) =>{
    return current && current.valueOf() < moment(startDate);
  }

  const handleDate = (value) =>{
    setStartDate(value);
    let estimatedDay = form.getFieldValue('estimation_day');
    let endDate = moment(value).add(estimatedDay, 'days');
    setEndDate(endDate);
  }

  const localSubmit = (e) => {
    e.preventDefault();
    form.validateFields(async(err, values) => {
      if (!err) {
        setLoading(true);
        let details = [];

        sopWiseDepartmentDesignationList.forEach((item, idx) => {
          details.push({
            "department_id": item.department_id,
            "designation_id": item.designation_id,
            "team_id": values[`team-${item.department_id}-${idx}`],
            "assignee": values[`assignee-${item.department_id}-${idx}`],
          });
        })

        let payload = {
          "sop_setup_id": values.sop_setup_id,
          "company_id": company_id,
          "estimation_day": values.estimation_day,
          'start_date': moment(values.start_date).format("YYYY-MM-DD"),
          'end_date': moment(values.end_date).format("YYYY-MM-DD"),
          'details': details
        }

        let url = SOP_INITIATE;
        let res = await postData(url, payload);

        if (res) {
          if(res?.data?.code === 200 || res?.data?.code === 201){
            let masterData = res?.data?.data;
            alertPop('success', 'SOP updated successfully!')
            history.push('/sop/sop-list');
            setLoading(false);
          }
          else{
            setLoading(false);
          }
        }
      }
    })
  }

  useEffect(() => {
    if(department_id) getSOPSetupList();
  }, [department_id])

  useEffect(() => {
    if(sop) {
      getSOPWiseDepartmentDesignationList();
    }
  }, [sop])

  return (
    <Wrapper className="supervisor-dashboard pb-5">
      <PageHeader
        style={{
          border: '1px solid rgb(235, 237, 240)',
          backgroundColor: '#FAFAFA'
        }}
        title="SOP Initiate"
      />

      <Form onSubmit={localSubmit}> 
          <div className="mx-4">
            <Row gutter={32}>
              <Col span={12}>
                <Form.Item label={'Select SOP'}>
                  {form.getFieldDecorator('sop_setup_id', {
                    rules: [{ required: true, message: "Required!" }],
                    initialValue: undefined
                  })(<Select 
                      placeholder='Select SOP' 
                      size="large" 
                      onChange={(val) => {
                        handelSOPSetupSelect(val);
                        setSOP(val);
                        form.resetFields('start_date');
                        setEndDate(null);
                      }}
                      disabled={department_id ? false : true}
                      showSearch
                      filterOption={(input, option) =>
                        option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0}
                    >
                    {sopSetupList?.map((sop, index) =>
                      <Select.Option key={`sop-${index}-${sop.id}`} value={sop.id}>{sop.name}</Select.Option>
                    )}
                  </Select>)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={'SOP Estimated Day'}>
                  {form.getFieldDecorator('estimation_day', {
                    rules: [{ required: true, message: "Required!" }],
                    initialValue: undefined
                  })(<Input placeholder="Estimated Day" size="large" disabled/>)}
                </Form.Item>
              </Col>
            </Row>
          </div> 
          <div style={{backgroundColor: '#F5F5F5'}}>
            <div className="m-4">
              <Row gutter={32}>
                <Col span={12}>
                  <Form.Item label={'Start Date'}>
                    {form.getFieldDecorator('start_date', {
                      rules: [{ required: true, message: "Required!" }],
                      initialValue: undefined
                    })(<DatePicker 
                        placeholder="Enter start date" 
                        size="large"
                        onChange={(value)=>handleDate(value)}
                    />)}
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label={'End Date'}>
                    {form.getFieldDecorator('end_date', {
                      rules: [{ required: true, message: "Required!" }],
                      initialValue: endDate ? endDate : undefined
                    })(<DatePicker 
                        placeholder="Enter end date" 
                        size="large" 
                        disabledDate={disabledDate}
                        disabled={form.getFieldValue('estimation_day') === 0 ? false : true}
                    />)}
                  </Form.Item>
                </Col>
              </Row>
              {sopWiseDepartmentDesignationList?.length ? <h3 style={{marginTop: '1rem'}}>Responsible User List <sup style={{color: '#928B81'}}>{sopWiseDepartmentDesignationList ? sopWiseDepartmentDesignationList?.length : 0} item(s)</sup></h3> : null}
              {sopWiseDepartmentDesignationList?.length ? 
              sopWiseDepartmentDesignationList?.map((row, index)=>{
                return(
                  <ResponsibleUser 
                    key={`sop-initiate-view-${index}`}
                    row={row}  
                    department_id={row?.department?.id} 
                    form={form} 
                    rowIndex={index}
                    disabledTeamAssignee={false}
                  />
                )})
              :null}
            </div>
          </div> 
        <Button 
          type="primary"  
          size="large" 
          htmlType="submit" 
          style={{float: 'right', marginRight: "1.5rem"}}
          loading={loading}
        >
          Initiate Now
        </Button>
      </Form>
    </Wrapper>
  )
})

export default SOPInititate