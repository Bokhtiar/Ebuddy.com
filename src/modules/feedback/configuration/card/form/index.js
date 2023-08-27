import React, { useState, useEffect } from 'react'
import {useHistory} from "react-router-dom";
import {Button, Table, Tag, Select, Modal, Radio, Form, Input, Checkbox,PageHeader, Row, Col } from "antd";
import {TableWrapper, Wrapper} from "../../../../commons/Wrapper";
import { FEEDBACK_CARD, PIS_COMPANY_LIST_All, FEEDBACK_SERVICE_LIST, FEEDBACK_SERVICE_TYPE_LIST, FEEDBACK_DROPDOWN_LIST } from "../../../../../scripts/api";
import {getData, postData} from "../../../../../scripts/api-service";
import { alertPop } from '../../../../../scripts/message';

const CardCreate = Form.create()(({form}) => {
  const [cardData, setCardData] = useState();
  const [companyList, setCompanyList] = useState();
  const [selectedCompanyId, setSelectedCompanyId] = useState();
  const [serviceList, setServiceList] = useState();
  const [serviceTypeList, setServiceTypeList] = useState();
  const [selectedServiceTypeId, setSelectedServiceTypeId] = useState();
  const [serviceId, setServiceId] = useState();
  const [feedbackList, setFeedbackList] = useState();
  const [isCreateAnother, setIsCreateAnother] = useState();
  const history = useHistory();

  let searchUrl = window.location.search;
  let params = new URLSearchParams(searchUrl);
  let paramsCardId = params.get('card_id');
  let cardId = paramsCardId ? paramsCardId * 1 : undefined;

  const feedbackTypeList = [
    { id: 1, name: "Pitch"},
    { id: 2, name: "BRD"},
    { id: 3, name: "Survey"},
  ]

  const getCardData = async () => {
    let url = FEEDBACK_CARD + `/${cardId}`;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      setCardData(masterData);
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

  const getFeedbackList = async (id) => {
    let url = FEEDBACK_DROPDOWN_LIST + '?service_id=' + id;
    let res = await getData(url);
    
    if (res) {
      let masterData = res?.data?.data;
      if (res) {
        setFeedbackList(masterData);
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

  useEffect(() => {
    getCompanyList();
  }, []);

  useEffect(()=>{
    if(selectedCompanyId) getServiceTypeList(selectedCompanyId);
  }, [selectedCompanyId]);

  useEffect(()=>{
    if(selectedServiceTypeId) getServiceList(selectedServiceTypeId);
  }, [selectedServiceTypeId]);

  useEffect(()=>{
    if(cardId) {
      getCardData();
      getFeedbackList();
    }
  }, [cardId]);

  useEffect(()=>{
    if(serviceId) getFeedbackList(serviceId);
  }, [serviceId]);

  useEffect(()=>{
    if(cardData?.company_id) getServiceTypeList(cardData?.company_id);
    if(cardData?.service_type_id) getServiceList(cardData?.service_type_id);
    if(cardData?.service_id) getFeedbackList(cardData?.service_id);
  }, [cardData]);

  const localSubmit = (e) => {
    e.preventDefault();
    form.validateFields(async(err, values) => {
      if (!err) {
        let payload = {
          ...values,
        }
        let url = cardId ? FEEDBACK_CARD + '/' + cardId : FEEDBACK_CARD;
        let res = await postData(url, payload);

        if (res) {
          let masterData = res?.data?.data;
          history.push('/feedback/config-feedback-card-list');
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
        onBack={() => history.push('/feedback/config-feedback-card-list')}
        title="Setup Card"
      />
      <Form 
        className="m-4"
        onSubmit={localSubmit}
      >
        <Row gutter={16}> 
            <Col span={24}>
            <Form.Item label={'Feedback Type'}>
              {form.getFieldDecorator('feedback_type', {
                rules: [{ required: true, message: "Required!" }],
                initialValue: cardData?.feedback_type ? cardData?.feedback_type : undefined
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
        </Row>
        <Row gutter={16}> 
          <Col span={12}>
            <Form.Item label={'Select Company'}>
              {form.getFieldDecorator('company_id', {
                rules: [{ required: true, message: "Required!" }],
                initialValue: cardData?.company_id ? cardData?.company_id : undefined
              })(<Select 
                  allowClear
                  size="large"
                  showSearch
                  placeholder='Company Name'
                  onChange={(value)=> {
                    setSelectedCompanyId(value);
                    form.setFieldsValue({
                      service_type_id: undefined,
                      service_id: undefined,
                      pitch_id: undefined
                    });
                    setSelectedServiceTypeId();
                    setServiceId();
                    setServiceTypeList();
                    setServiceList();
                    getFeedbackList();
                  }}
                  dropdownMatchSelectWidth={false}
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
          <Col span={12}>
            <Form.Item label={'Product/Service Type'}>
              {form.getFieldDecorator('service_type_id', {
                rules: [{ required: true, message: "Required!" }],
                initialValue: cardData?.service_type_id ? cardData?.service_type_id : undefined
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
                    getFeedbackList();
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
        </Row>
        <Row gutter={16}> 
          <Col span={12}>
            <Form.Item label={'Product/Service Name'}>
              {form.getFieldDecorator('service_id', {
                rules: [{ required: true, message: "Required!" }],
                initialValue: cardData?.service_id ? cardData?.service_id : undefined
              })(<Select 
                  allowClear
                  size="large"
                  showSearch
                  placeholder='Product/Service Name'
                  onChange={(value)=> {
                    setServiceId(value);
                    form.setFieldsValue({pitch_id: undefined});
                    getFeedbackList();
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
          <Col span={12}>
            <Form.Item label={'Select Feedback'}>
              {form.getFieldDecorator('feedback_id', {
                rules: [{ required: true, message: "Required!" }],
                initialValue: cardData?.feedback_id ? cardData?.feedback_id : undefined
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
                      <Select.Option key={`sop-${feedback.id}`} value={feedback.id} label={feedback.name}>{feedback.name}</Select.Option>
                    )
                  }):null}
              </Select>)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label={'Card Name'}>
              {form.getFieldDecorator('name', {
                rules: [{ required: true, message: "Required!" }],
                initialValue: cardData?.name ? cardData?.name : undefined
              })(<Input placeholder="Enter title" size="large"/>)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}> 
          <Col span={24}>
            <Form.Item label={'Description'}>
              {form.getFieldDecorator('description', {
                rules: [{ required: true, message: "Required!" }],
                initialValue: cardData?.description ? cardData?.description : undefined
              })(<Input.TextArea placeholder="Enter pitch name" rows={4}/>)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label={'Status'}>
              {form.getFieldDecorator('status', {
                rules: [{ required: true, message: "Required!" }],
                initialValue: cardData ? cardData?.status : 1
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
              {cardData ? 'Update ' : 'Create '} 
            </Button>
        </div>
      </Form>
    </Wrapper>
  )
})

export default CardCreate;