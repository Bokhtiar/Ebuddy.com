import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Select, Row, Col, PageHeader, DatePicker } from "antd";
import { useHistory } from "react-router-dom";
import { Wrapper } from "../../../../commons/Wrapper";
import { TASK_SETUP_SOP_LIST, SOP_WISE_DEPARTMENT_DESIGNATION_LIST, SOP_INITIATE, PIS_COMPANY_LIST_All } from '../../../../../scripts/api';
import { getData, postData } from '../../../../../scripts/api-service';
import { alertPop } from "../../../../../scripts/message";
import moment from 'moment';
import ResponsibleUser from './responsibleUser';
import * as Cookies from "js-cookie";

const SOPInititateView = Form.create()(({ form, submit}) => {
  const company_id = JSON.parse(Cookies.get("profile")).company_id;
  const [sopSetupList, setSopSetupList] = useState();
  const [startDate, setStartDate] = useState();
  const [sop, setSOP] = useState();
  const [selectedCompany, setSelectedCompany] = useState(company_id);
  const [sopSetupListById, setSopSetupListById] = useState();
  const [sopInitiateList, setSOPInitiateList] = useState();
  const [departmentName, setDepartmentName] = useState();
  const [designationName, setDesignationName] = useState();
  const history = useHistory();

  let searchUrl = window.location.search;
  let params = new URLSearchParams(searchUrl);
  let paramsSOPId = params.get('sop_id');
  let paramsSOPSetupId = params.get('sop_setup_id');
  let sopId = paramsSOPId ? paramsSOPId * 1 : undefined;
  let sopSetupId = paramsSOPSetupId ? paramsSOPSetupId * 1 : undefined;

  const getSOPSetupList = async() => {
    let res = await getData(TASK_SETUP_SOP_LIST);

    if (res) {
      setSopSetupList(res?.data?.data);
    }
  }

  const getSOPSetupListById = async(id) => {
    let url = SOP_INITIATE + "/";
    if(id) url = url + id;
    let res = await getData(url);

    if (res) {
      setSopSetupListById(res?.data?.data);
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

  useEffect(() => {
    getSOPSetupList();
  }, [])

  useEffect(() => {
    if(sopId) getSOPSetupListById(sopId);
  }, [sopId])

  useEffect(() => {
    if(sopSetupListById){
      form.setFieldsValue({
        'sop_setup_id': sopSetupListById?.sop_setup_id,
        'company_id': sopSetupListById?.company?.id,
        'estimation_day': sopSetupListById?.estimation_day,
        'start_date': moment(new Date(sopSetupListById?.start_date)),
        'end_date': moment(new Date(sopSetupListById?.end_date)),
      });
      
      let sopInitiateList = JSON.parse(sopSetupListById?.initiate_details);
      
      //find department and designation name
      if(sopSetupListById?.sop_activity){
        sopSetupListById.sop_activity.forEach(item=>{
          sopInitiateList.forEach(sopItem =>{
            if(item.department_id === sopItem.department_id) {
              let department = {
                name: item.department?.name
              };
              sopItem.department = department;
            } 
            if(item.designation_id === sopItem.designation_id){
              let designation = {
                name: item.designation?.name
              };
              sopItem.designation = designation;
            } 
          })
        })
      }

      setSOPInitiateList(sopInitiateList);
    }
  }, [sopSetupListById])

  return (
    <Wrapper className="supervisor-dashboard pb-5">
      <PageHeader
        style={{
          border: '1px solid rgb(235, 237, 240)',
          backgroundColor: '#FAFAFA'
        }}
        onBack={() => history.push(`/sop/sop-list`)}
        subTitle="Back to list"
      />
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
                      handelSOPSetupSelect(val)
                      setSOP(val)
                    }}
                    disabled
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
                      onChange={(value)=>setStartDate(value)}
                      disabled
                  />)}
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label={'End Date'}>
                  {form.getFieldDecorator('end_date', {
                    rules: [{ required: true, message: "Required!" }],
                    initialValue: undefined
                  })(<DatePicker 
                      placeholder="Enter end date" 
                      size="large" 
                      disabledDate={disabledDate}
                      disabled
                  />)}
                </Form.Item>
              </Col>
            </Row>
            <h3 style={{marginTop: '1rem'}}>Responsible User List <sup style={{color: '#928B81'}}>{sopInitiateList ? sopInitiateList?.length : 0} item(s)</sup></h3>
            {sopInitiateList?.length ? 
            sopInitiateList?.map((row, index)=>{
              return(
                <ResponsibleUser 
                  key={`sop-initiate-view-${index}`}
                  row={row} 
                  department_id={row?.department_id} 
                  form={form} 
                  rowIndex={index}
                  disabledTeamAssignee={true}
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
          onClick={()=> history.push(`/sop/sop-list`)}
        >
          Close
        </Button>
    </Wrapper>
  )
})

export default SOPInititateView