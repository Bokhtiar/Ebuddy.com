import React, { useState, useEffect } from 'react'
import {useHistory} from "react-router-dom";
import {Button, Table, Tag, Select, Modal, Radio, Form, Input, Checkbox,PageHeader, Row, Col, DatePicker } from "antd";
import {TableWrapper, Wrapper} from "../../../../commons/Wrapper";
import { FEEDBACK_DROPDOWN_LIST, CLIENT_DROPDOWN_LIST, FEEDBACK_SERVICE_LIST, ALL_PROJECT_SETUP_LIST, FEEDBACK_SERVICE_TYPE_LIST, FEEDBACK_INITIATE } from "../../../../../scripts/api";
import {getData, postData} from "../../../../../scripts/api-service";
import {alertPop} from "../../../../../scripts/message";
import moment from 'moment';

const FeedbackSubmissionInitiate = Form.create()(({form}) => {
  const [feedbackList, setFeedbackList] = useState();
  const [clientList, setClientList] = useState();
  const [projectList, setProjectList] = useState();
  const [serviceList, setServiceList] = useState();
  const [serviceTypeList, setServiceTypeList] = useState();
  const [selectedServiceTypeId, setSelectedServiceTypeId] = useState();
  const [serviceId, setServiceId] = useState();
  const [pitchList, setPitchList] = useState();
  const [selectedType, setSelectedType] = useState();
  const [feedbackType, setFeedbackType] = useState();
  const [clientId, setClientId] = useState();
  const history = useHistory();

  const feedbackTypeList = [
    { id: 1, name: "Pitch"},
    { id: 2, name: "BRD"},
    { id: 3, name: "Survey"},
  ]

  const getClientList = async () => {
    let res = await getData(CLIENT_DROPDOWN_LIST);
    
    if (res) {
      let masterData = res?.data?.data;
      if (res) {
        setClientList(masterData);
      }
    }
  }

  const getProjectList = async (id) => {
    let url = ALL_PROJECT_SETUP_LIST + '?client_id=' + id;
    let res = await getData(url);
    
    if (res) {
      let masterData = res?.data?.data;
      if (res) {
        setProjectList(masterData);
      }
    }
  }
  
  const getServiceList = async (id) => {
    let url = FEEDBACK_SERVICE_LIST + '?service_type_id=' + id;
    let res = await getData(url);
    
    if (res) {
      let masterData = res?.data?.data;
      if (res) {
        setServiceList(masterData);
      }
    }
  }

  const getServiceTypeList = async (id) => {
    let url = FEEDBACK_SERVICE_TYPE_LIST + '?company_id=' + id; 
    let res = await getData(url);
    
    if (res) {
      let masterData = res?.data?.data;
      if (res) {
        setServiceTypeList(masterData);
      }
    }
  }

  const getFeedbackList = async (feedbackId, serviceId) => {
    let url = FEEDBACK_DROPDOWN_LIST + '?' 
    if(feedbackId) url += '&feedback_type=' + feedbackId;
    if(serviceId) url += '&service_id=' + serviceId;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      if (res) {
        setFeedbackList(masterData);
      }
    }
  }

  useEffect(() => {
    getClientList();
    getServiceTypeList();
    // getFeedbackList();
  }, []);

  useEffect(()=>{
    if(selectedServiceTypeId) getServiceList(selectedServiceTypeId);
  }, [selectedServiceTypeId]);

  useEffect(()=>{
    if(feedbackType && serviceId) getFeedbackList(feedbackType, serviceId);
  }, [feedbackType, serviceId]);

  useEffect(()=>{
    if(clientId) getProjectList(clientId);
  }, [clientId]);

  const localSubmit = (e) => {
    e.preventDefault();
    form.validateFields(async(err, values) => {
      if (!err) {
        let payload = {
          ...values,
          "feedback_date": moment(values?.feedback_date).format("YYYY-MM-DD"),
        }

        // history.push(`/feedback/config-feedback-card-wise-question-list?init_card_id=${}`);

        
        let url = FEEDBACK_INITIATE;
        let res = await postData(url, payload);

        if (res) {
          let masterData = res?.data?.data;
          // history.push('/feedback/config-feedback-card-wise-question-list?feedback_id=' + masterData.id);
          history.push('/feedback/my-feedback-card-wise-question-list?feedback_id=' + masterData.id);
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
        onBack={() => history.push('/feedback/my-feedback-list')}
        title="Setup Feedback Submission"
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
              })(<Select 
                  allowClear
                  size="large"
                  showSearch
                  placeholder='Feedback Type'
                  dropdownMatchSelectWidth={false}
                  onChange={(value)=>setFeedbackType(value)}
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
            <Form.Item label={'Select Client'}>
              {form.getFieldDecorator('client_id', {
                rules: [{ required: true, message: "Required!" }],
              })(<Select 
                  allowClear
                  size="large"
                  showSearch
                  placeholder='Client Name'
                  onChange={(value)=>setClientId(value)}
                  dropdownMatchSelectWidth={false}
                  filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {clientList ? clientList.map(client=>{
                    return(
                      <Select.Option key={`client-${client.id}`} value={client.id} label={client.name}>{client.name}</Select.Option>
                    )
                  }):null}
              </Select>)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}> 
          <Col span={12}>
            <Form.Item label={'Is Project'}>
              {form.getFieldDecorator('is_project', {
                rules: [{ required: true, message: "Required!" }],
                initialValue: 0
              })(<Radio.Group onChange={(event)=>{
                  setSelectedType(event.target.value);
              }}>
                  <Radio value={1}>Project</Radio>
                  <Radio value={0}>Non-Project</Radio>
                </Radio.Group>)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'Project'}>
              {form.getFieldDecorator('project_id', {
                rules: [{ required: selectedType, message: "Required!" }],
              })(<Select 
                  allowClear
                  size="large"
                  showSearch
                  placeholder='Project Name'
                  dropdownMatchSelectWidth={false}
                  filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                  }
                  disabled={selectedType === 1 ? false : true}
                >
                  {projectList ? projectList.map(project=>{
                    return(
                      <Select.Option key={`sop-${project.id}`} value={project.id} label={project.name}>{project.name}</Select.Option>
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
              })(<Select 
                  allowClear
                  size="large"
                  showSearch
                  placeholder='Product/Service Type'
                  onChange={(value)=>{
                    setSelectedServiceTypeId(value);
                    form.setFieldsValue({
                      service_id: undefined,
                      pitch_id: undefined
                    });
                    setServiceId();
                    setServiceList();
                    setPitchList();
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
              })(<Select 
                  allowClear
                  size="large"
                  showSearch
                  placeholder='Product/Service Name'
                  onChange={(value)=> {
                    setServiceId(value);
                    form.setFieldsValue({pitch_id: undefined});
                    setPitchList();
                  }}
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
          <Col span={12}>
            <Form.Item label={'Select Feedback'}>
              {form.getFieldDecorator('feedback_id', {
                rules: [{ required: true, message: "Required!" }],
              })(<Select 
                  allowClear
                  size="large"
                  showSearch
                  placeholder='Feedback Name'
                  dropdownMatchSelectWidth={false}
                  filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {feedbackList ? feedbackList.map(feedback=>{
                    return(
                      <Select.Option key={`feedback-${feedback.id}`} value={feedback.id} label={feedback.name}>{feedback.name}</Select.Option>
                    )
                  }):null}
              </Select>)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'Feedback Date'}>
              {form.getFieldDecorator('feedback_date', {
                rules: [{ required: true, message: "Required!" }],
              })(<DatePicker placeholder="Select feedback date" size="large"/>)}
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
              Initiate
            </Button>
        </div>
      </Form>
    </Wrapper>
  )
})

export default FeedbackSubmissionInitiate;