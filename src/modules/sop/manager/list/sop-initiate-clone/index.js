import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Select, Row, Col, PageHeader, DatePicker,Skeleton } from "antd";
import { useHistory } from "react-router-dom";
import { Wrapper } from "../../../../commons/Wrapper";
import { TASK_SETUP_SOP_LIST, SOP_WISE_DEPARTMENT_DESIGNATION_LIST, SOP_INITIATE, PIS_COMPANY_LIST_All } from '../../../../../scripts/api';
import { getData, postData } from '../../../../../scripts/api-service';
import { alertPop } from "../../../../../scripts/message";
import moment from 'moment';
import ResponsibleUser from './responsibleUser';

const SOPInititateInitiate = Form.create()(({ form, submit}) => {
  const [sopSetupList, setSopSetupList] = useState();
  const [startDate, setStartDate] = useState();
  const [sop, setSOP] = useState();
  const [companyList, setCompanyList] = useState();
  const [selectedCompany, setSelectedCompany] = useState();
  const [sopWiseDepartmentDesignationList, setSOPWiseDepartmentDesignationList] = useState();
  const [sopSetupListById, setSopSetupListById] = useState();
  const [sopInitiateList, setSOPInitiateList] = useState();
  const [loading, setLoading] = useState(false);
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

  const getCompanyList = async() => {
    let res = await getData(PIS_COMPANY_LIST_All);

    if (res) {
      setCompanyList(res?.data?.data);
    }
  }

  const disabledDate = (current) =>{
    return current && current.valueOf() < moment(startDate);
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

  const getSOPWiseDepartmentDesignationList = async(id) => {
    let url = "";
    if(id) url = SOP_WISE_DEPARTMENT_DESIGNATION_LIST + "/" + id;
    let res = await getData(url);
    
    if (res) {
      setSOPWiseDepartmentDesignationList(res?.data?.data);
    }
  }

  
  const localSubmit = (e) => {
    e.preventDefault();
    form.validateFields(async(err, values) => {
      if (!err) {
        setLoading(true);
        let details = [];

        // if(sopWiseDepartmentDesignationList){
        //   sopWiseDepartmentDesignationList.forEach((item, idx) => {
        //     details.push({
        //       "department_id": item.department_id,
        //       "designation_id": item.designation_id,
        //       "team_id": values[`team-${item.department_id}-${idx}`],
        //       "assignee": values[`assignee-${item.department_id}-${idx}`],
        //     });
        //   })
        // }

        if(sopInitiateList){
          sopInitiateList.forEach((item, idx) => {
            details.push({
              "department_id": item.department_id,
              "designation_id": item.designation_id,
              "team_id": values[`team-${item.department_id}-${idx}`],
              "assignee": values[`assignee-${item.department_id}-${idx}`],
            });
          })
        }

        let payload = {
          "sop_setup_id": values.sop_setup_id,
          "company_id": values.company_id,
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
    getCompanyList();
    getSOPSetupList();
  }, [])

  useEffect(() => {
    if(sopSetupListById?.sop_setup_id) {
      getSOPWiseDepartmentDesignationList(sopSetupListById?.sop_setup_id);
    }
  }, [sopSetupListById?.sop_setup_id])

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
            if(item.department_id === sopItem.department_id) sopItem.department_name = item.department?.name
            if(item.designation_id === sopItem.designation_id) sopItem.designation_name = item.designation?.name
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
      <Form onSubmit={localSubmit}>
        <div className="mx-4">
          <Row gutter={32}>
            <Col span={8}>
              <Form.Item label={'Select Company'}>
                {form.getFieldDecorator('company_id', {
                  rules: [{ required: true, message: "Required!" }],
                  initialValue: undefined
                })(<Select 
                    placeholder='Select Company' 
                    size="large" 
                    onChange={(value) => {
                      setSelectedCompany(value)
                      setSOP(null)
                    }}
                    disabled
                  >
                  {companyList?.map((company, index) =>
                    <Select.Option key={`company-${index}-${company.id}`} value={company.id}>{company.name}</Select.Option>
                  )}
                </Select>)}
              </Form.Item>
            </Col>
            <Col span={8}>
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
            <Col span={8}>
              <Form.Item label={'SOP Estimated Day'}>
                {form.getFieldDecorator('estimation_day', {
                  rules: [{ required: true, message: "Required!" }],
                  initialValue: undefined
                })(<Input placeholder="Estimated Day" size="large"/>)}
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
                  />)}
                </Form.Item>
              </Col>
            </Row>
            {!loading ?
              <>
              {sopInitiateList?.length ? <h3 style={{marginTop: '1rem'}}>Responsible User List <sup style={{color: '#928B81'}}>{sopInitiateList ? sopInitiateList?.length : 0} item(s)</sup></h3> : null}
              {sopInitiateList?.length ? 
              sopInitiateList?.map((row, index)=>{
                return(
                  <ResponsibleUser 
                    key={`sop-initiate-view-${index}`}
                    row={row} 
                    department_id={row?.department_id} 
                    form={form} 
                    rowIndex={index}
                    disabledTeamAssignee={false}
                  />
                )})
              :null}
              </>: <Skeleton active />}
          </div>
        </div>
        <Button 
          type="primary"  
          size="large" 
          htmlType="submit" 
          style={{float: 'right', marginRight: "1.5rem"}}
          loading={loading}
        >
          Update
        </Button>
    </Form>
    </Wrapper>
  )
})

export default SOPInititateInitiate