import React, { useState, useEffect } from 'react'
import {useHistory} from "react-router-dom";
import {Button, Table, Tag, Select, Modal, Radio, Form, Input, Checkbox,PageHeader, Row, Col } from "antd";
import {TableWrapper, Wrapper} from "../../../commons/Wrapper";
import { PITCH_CARD_SETUP, PIS_COMPANY_LIST_All, SERVICE_SETUP_DROPDOWN_LIST, GET_SERVICE_TYPE_LIST, PITCH_DROPDOWN_LIST } from "../../../../scripts/api";
import {getData, postData} from "../../../../scripts/api-service";
import { alertPop } from '../../../../scripts/message';

const CardCreate = Form.create()(({form}) => {
  const [cardData, setCardData] = useState();
  const [companyList, setCompanyList] = useState();
  const [selectedCompanyId, setSelectedCompanyId] = useState();
  const [serviceList, setServiceList] = useState();
  const [serviceTypeList, setServiceTypeList] = useState();
  const [selectedServiceTypeId, setSelectedServiceTypeId] = useState();
  const [serviceId, setServiceId] = useState();
  const [pitchList, setPitchList] = useState();
  const [isCreateAnother, setIsCreateAnother] = useState();
  const history = useHistory();

  let searchUrl = window.location.search;
  let params = new URLSearchParams(searchUrl);
  let paramsCardId = params.get('card_id');
  let cardId = paramsCardId ? paramsCardId * 1 : undefined;

  const getCardData = async () => {
    let url = PITCH_CARD_SETUP + `/${cardId}`;
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

  const getPitchList = async (id) => {
    let url = PITCH_DROPDOWN_LIST + '?service_id=' + id;
    let res = await getData(url);
    
    if (res) {
      let masterData = res?.data?.data;
      if (res) {
        setPitchList(masterData);
      }
    }
  }
  
  const getServiceList = async (id) => {
    let url = SERVICE_SETUP_DROPDOWN_LIST + '?service_type_id=' + id;
    let res = await getData(url);
    
    if (res) {
      let masterData = res?.data?.data;
      if (res) {
        setServiceList(masterData);
      }
    }
  }

  const getServiceTypeList = async (id) => {
    let url = GET_SERVICE_TYPE_LIST + '?company_id=' + id; 
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
      getPitchList();
    }
  }, [cardId]);

  useEffect(()=>{
    if(serviceId) getPitchList(serviceId);
  }, [serviceId]);

  useEffect(()=>{
    if(cardData?.company_id) getServiceTypeList(cardData?.company_id);
    if(cardData?.service_type_id) getServiceList(cardData?.service_type_id);
    if(cardData?.service_id) getPitchList(cardData?.service_id);
  }, [cardData]);

  const localSubmit = (e) => {
    e.preventDefault();
    form.validateFields(async(err, values) => {
      if (!err) {
        let payload = {
          ...values,
        }
        let url = cardId ? PITCH_CARD_SETUP + '/' + cardId : PITCH_CARD_SETUP;
        let res = await postData(url, payload);

        if (res) {
          let masterData = res?.data?.data;
          history.push('/pitch/config-pitch-card-list');
          alertPop('success', 'Process completed successfully');
          setIsCreateAnother(false);
          if(isCreateAnother) {
            form.resetFields();
            history.push('/pitch/config-pitch-card-create')
          }
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
        onBack={() => history.push('/pitch/config-pitch-card-list')}
        title="Setup Card"
        // subTitle="Back to list"
      />
      <Form 
        className="m-4"
        onSubmit={localSubmit}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label={'Card Name'}>
              {form.getFieldDecorator('name', {
                initialValue: cardData?.name ? cardData?.name : undefined
              })(<Input placeholder="Enter title" size="large"/>)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}> 
          <Col span={12}>
            <Form.Item label={'Select Company'}>
              {form.getFieldDecorator('company_id', {
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
                    setPitchList();
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
        </Row>
        <Row gutter={16}> 
          <Col span={12}>
            <Form.Item label={'Product/Service Name'}>
              {form.getFieldDecorator('service_id', {
                initialValue: cardData?.service_id ? cardData?.service_id : undefined
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
          <Col span={12}>
            <Form.Item label={'Select Pitch'}>
              {form.getFieldDecorator('pitch_id', {
                initialValue: cardData?.pitch_id ? cardData?.pitch_id : undefined
              })(<Select 
                  allowClear
                  size="large"
                  showSearch
                  placeholder='Pitch Name'
                  dropdownMatchSelectWidth={false}
                  filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {pitchList ? pitchList.map(pitch=>{
                    return(
                      <Select.Option key={`sop-${pitch.id}`} value={pitch.id} label={pitch.name}>{pitch.name}</Select.Option>
                    )
                  }):null}
              </Select>)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}> 
          <Col span={24}>
            <Form.Item label={'Description'}>
              {form.getFieldDecorator('description', {
                initialValue: cardData?.description ? cardData?.description : undefined
              })(<Input.TextArea placeholder="Enter pitch name" rows={4}/>)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label={'Status'}>
              {form.getFieldDecorator('status', {
                initialValue: cardData ? cardData?.status : 1
              })(<Radio.Group>
                  <Radio value={1}>Active</Radio>
                  <Radio value={0}>Inactive</Radio>
                </Radio.Group>)}
            </Form.Item>
          </Col>
        </Row>
        <div style={{display: 'flex', justifyContent:'flex-end'}}>
            {!cardData ? <Form.Item label={''}>
              {form.getFieldDecorator('is_create_another', {})(
                <Checkbox 
                  checked={isCreateAnother} 
                  onChange={e => setIsCreateAnother(e.target.checked)}
                >
                  Create Another
                </Checkbox>)}
            </Form.Item> : null}
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