import React, {useState, useEffect} from 'react'
import {useHistory} from "react-router-dom";
import {Button, Table, Tag, Select, Modal, Radio, Form, Input, Checkbox,PageHeader, Row, Col } from "antd";
import {TableWrapper, Wrapper} from "../../../../commons/Wrapper";
import { PIS_COMPANY_LIST_All, DEPARTMENT_LIST_ALL, TEAMS_LIST_ALL, SERVICE_SETUP_DROPDOWN_LIST, SERVICE_TYPE_DROPDOWN_LIST, PITCH_SETUP, FEEDBACK } from "../../../../../scripts/api";
import {getData, postData} from "../../../../../scripts/api-service";
import { alertPop } from '../../../../../scripts/message';

const FeedbackCreate = Form.create()(({form}) => {
  const [feedbackList, setFeedbackList] = useState();
  const [companyList, setCompanyList] = useState();
  const [selectedCompanyId, setSelectedCompanyId] = useState();
  const [serviceList, setServiceList] = useState();
  const [serviceTypeList, setServiceTypeList] = useState();
  const [selectedServiceTypeId, setSelectedServiceTypeId] = useState();
  const [isCreateAnother, setIsCreateAnother] = useState();
  const history = useHistory();
  
  let searchUrl = window.location.search;
  let params = new URLSearchParams(searchUrl);
  let paramsFeedbackId = params.get('feedback_id');
  let feedbackId = paramsFeedbackId ? paramsFeedbackId * 1 : undefined;

  const feedbackTypeList = [
    { id: 1, name: "Pitch"},
    { id: 2, name: "BRD"},
    { id: 3, name: "Survey"},
  ]

  const getFeedbackList = async () => {
    let url = FEEDBACK + `/${feedbackId}`;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      if (res) {
        setFeedbackList(masterData);
      }
    }
  }

  const getCompanyList = async () => {
    let res = await getData(PIS_COMPANY_LIST_All);
    
    if (res) {
      let masterData = res?.data?.data;
      if (res) {
        setCompanyList(masterData);
      }
    }
  }
  
  const getServiceList = async (id) => {
    let url = SERVICE_SETUP_DROPDOWN_LIST + '?';
    if(id) url += "service_type_id=" + id;
    
    let res = await getData(url);
    
    if (res) {
      let masterData = res?.data?.data;
      if (res) {
        setServiceList(masterData);
      }
    }
  }

  const getServiceTypeList = async (id) => {
    let url = SERVICE_TYPE_DROPDOWN_LIST + '?company_id=' + id;
      let res = await getData(url);
    
    if (res) {
      let masterData = res?.data?.data;
      if (res) {
        setServiceTypeList(masterData);
      }
    }
  }

  useEffect(() => {
    if(!feedbackId) getCompanyList();
  }, []);

  useEffect(() => {
    if(selectedCompanyId) getServiceTypeList(selectedCompanyId);
  }, [selectedCompanyId]);

  useEffect(() => {
    if(selectedServiceTypeId) getServiceList(selectedServiceTypeId);
  }, [selectedServiceTypeId]);

  useEffect(() => {
    if(feedbackId) {
      getFeedbackList();
      getCompanyList();
    }
  }, [feedbackId]);

  useEffect(() => {
    if(feedbackList) {
      getServiceTypeList(feedbackList?.company_id);
      getServiceList(feedbackList?.service_type_id);
    }
  }, [feedbackList]);

  const localSubmit = (e) => {
    e.preventDefault();
    form.validateFields(async(err, values) => {
      if (!err) {
        let payload = {
          ...values,
        }
        let url = feedbackList ? FEEDBACK + '/' + feedbackId : FEEDBACK;
        let res = await postData(url, payload);

        if (res) {
          let masterData = res?.data?.data;
          history.push('/feedback/config-feedback-list');
          alertPop('success', 'Process completed successfully');
        }
      }
    })
  }

  return (
    <Wrapper>
      <PageHeader
        style={{
          border: '1px solid rgb(235, 237, 240)',
        }}
        onBack={() => history.push('/feedback/config-feedback-list')}
        title="Setup Feedback"
      />
      <Form 
        className="m-4"
        onSubmit={localSubmit}
      >
        <Row gutter={16}> 
          <Col span={12}>
            <Form.Item label={'Feedback Type'}>
              {form.getFieldDecorator('feedback_type', {
                rules: [{ required: true, message: "Required!" }],
                initialValue: feedbackList?.feedback_type ? feedbackList?.feedback_type : undefined
              })(<Select 
                  allowClear
                  size="large"
                  showSearch
                  placeholder='Feedback Type'
                  dropdownMatchSelectWidth={false}
                  filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {feedbackTypeList ? feedbackTypeList.map(feedback=>{
                    return(
                      <Select.Option key={feedback.id} value={feedback.name} label={feedback.name}>{feedback.name}</Select.Option>
                    )
                  }):null}
              </Select>)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'Company Name'}>
              {form.getFieldDecorator('company_id', {
                rules: [{ required: true, message: "Required!" }],
                initialValue: feedbackList?.company_id ? feedbackList?.company_id : undefined
              })(<Select 
                  allowClear
                  size="large"
                  showSearch
                  placeholder='Company Name'
                  dropdownMatchSelectWidth={false}
                  onChange={(value)=>{
                    setSelectedCompanyId(value);
                    form.setFieldsValue({
                      service_type_id : undefined,
                      service_id: undefined
                    });
                    setSelectedServiceTypeId();
                    setServiceTypeList();
                    setServiceList();
                  }}
                  filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {companyList ? companyList.map(com=>{
                    return(
                      <Select.Option key={`sop-${com.id}`} value={com.id} label={com.name}>{com.name}</Select.Option>
                    )
                  }):null}
              </Select>)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}> 
          <Col span={12}>
            <Form.Item label={'Product/Service Type'}>
              {form.getFieldDecorator('service_type_id', {
                rules: [{ required: true, message: "Required!" }],
                initialValue: feedbackList?.service_type_id ? feedbackList?.service_type_id : undefined
              })(<Select 
                  allowClear
                  size="large"
                  showSearch
                  placeholder='Product/Service Type'
                  onChange={(value)=>{
                    setSelectedServiceTypeId(value);
                    form.setFieldsValue({service_id: undefined});
                    setServiceList();
                  }}
                  dropdownMatchSelectWidth={false}
                  filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {serviceTypeList ? serviceTypeList.map(serviceType=>{
                    return(
                      <Select.Option key={`sop-${serviceType.id}`} value={serviceType.id} label={serviceType.name}>{serviceType.name}</Select.Option>
                    )
                  }):null}
              </Select>)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'Product/Service Name'}>
              {form.getFieldDecorator('service_id', {
                rules: [{ required: true, message: "Required!" }],
                initialValue: feedbackList?.service_id ? feedbackList?.service_id : undefined
              })(<Select 
                  allowClear
                  size="large"
                  showSearch
                  placeholder='Product/Service Name'
                  dropdownMatchSelectWidth={false}
                  filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {serviceList ? serviceList.map(service=>{
                    return(
                      <Select.Option key={`sop-${service.id}`} value={service.id} label={service.name}>{service.name}</Select.Option>
                    )
                  }):null}
              </Select>)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label={'Feedback Title'}>
              {form.getFieldDecorator('name', {
                rules: [{ required: true, message: "Required!" }],
                initialValue: feedbackList?.name ? feedbackList?.name : undefined
              })(<Input placeholder="Enter title" size="large"/>)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label={'Status'}>
              {form.getFieldDecorator('status', {
                rules: [{ required: true, message: "Required!" }],
                initialValue: feedbackList ? feedbackList?.status : 1
              })(<Radio.Group>
                  <Radio value={1}>Active</Radio>
                  <Radio value={0}>Inactive</Radio>
                </Radio.Group>)}
            </Form.Item>
          </Col>
        </Row>
        <div style={{display: 'flex', justifyContent:'flex-end'}}>
            <Button 
              style={{width: 'auto'}}
              block
              type="primary"
              htmlType="submit"
            > 
              {feedbackList ? 'Update ' : 'Create '}
            </Button>
        </div>
      </Form>
    </Wrapper>
  )
})

export default FeedbackCreate;