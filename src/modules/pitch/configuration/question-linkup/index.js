import React, { useState, useEffect } from 'react'
import {Button, Select, Badge, Form, Input, Checkbox,PageHeader, Row, Col, Icon } from "antd";
import uuid from "uuid/v4";
import {TableWrapper, Wrapper} from "../../../commons/Wrapper";
import {useHistory} from "react-router-dom";
import { 
  PITCH_DROPDOWN_LIST, 
  PITCH_CARD_DROPDOWN_SETUP, 
  PIS_COMPANY_LIST_All, 
  SERVICE_SETUP_DROPDOWN_LIST, 
  GET_SERVICE_TYPE_LIST,
  PITCH_CARD_FEEDBACK_QUESTION_LIST, 
  PITCH_CARD_FEEDBACK 
} from "../../../../scripts/api";
import {getData, postData} from "../../../../scripts/api-service";
import { alertPop } from "../../../../scripts/message";

const QuestionLinkup = Form.create()(({form}) => {
  let searchUrl = window.location.search;
  let params = new URLSearchParams(searchUrl);
  let paramsCards = params.get('card_id');
  let cardId = paramsCards ? paramsCards * 1 : undefined;

  const [companyList, setCompanyList] = useState();
  const [selectedCompanyId, setSelectedCompanyId] = useState();
  const [serviceList, setServiceList] = useState();
  const [serviceTypeList, setServiceTypeList] = useState();
  const [selectedServiceTypeId, setSelectedServiceTypeId] = useState();
  const [serviceId, setServiceId] = useState();
  const [pitchList, setPitchList] = useState();
  const [selectedPitch, setSelectedPitch] = useState();
  const [cardList, setCardList] = useState();
  const [cardWiseQuestionsList, setCardWiseQuestionsList] = useState();
  const [createAnother, setCreateAnother] = useState(false);
  const [addedQuestions, setAddedQuestions] = useState();
  const [addedQuestionsList, setAddedQuestionsList] = useState([]);
  const history = useHistory();

  const getCompanyList = async () => {
    let res = await getData(PIS_COMPANY_LIST_All);
    
    if (res) {
      let masterData = res?.data?.data;
      if (res) {
        setCompanyList(masterData);
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

  const getPitchList = async (id) => {
    let url = PITCH_DROPDOWN_LIST + '?';
    if(id) url += 'service_id=' + id;
    let res = await getData(url);
    
    if (res) {
      let masterData = res?.data?.data;
      if (res) {
        setPitchList(masterData);
      }
    }
  }

  const getCardList = async () => {
    let url = PITCH_CARD_DROPDOWN_SETUP + '?';
    if(selectedPitch) url += 'pitch_id=' + selectedPitch;
    let res = await getData(url);
    
    if (res) {
      let masterData = res?.data?.data;
      if (res) {
        setCardList(masterData);
      }
    }
  }

  const getCardWiseQuestionsList = async (id) => {
    let res = await getData(PITCH_CARD_FEEDBACK_QUESTION_LIST + '/' + id);

    if (res) {
      let masterData = res?.data?.data;
      setCardWiseQuestionsList(masterData);
      setAddedQuestionsList(masterData?.pitch_card_feedbacks);
    }
  }

  const deleteQuestions = async (id) => {
    let url = PITCH_CARD_FEEDBACK + '/';
    if(typeof id == 'number'){
      url += id; 
      let res = await postData(url);
  
      if (res) {
        let masterData = res?.data?.data;
      }
    } 
  }

  const localSubmit = (e) => {
    e.preventDefault();
    form.validateFields(async(err, values) => {
      if (!err) {
        let feedback = [];

        if(addedQuestionsList.length <= 0) alertPop("error", "Please add questions");
        else{
          if(cardId && addedQuestionsList){
            addedQuestionsList.forEach((item=>{
              feedback.push({
                "id": item.id && isNaN(item.id) === false ? item.id : null,
                "name":  item.name,
                "status": item.status
              })
            }))
          }
          else{
            addedQuestionsList.forEach((question, idx) => {
              feedback.push({
                "id": null,
                "name":  question.name,
                "status": question.status
              })
            })
          }
  
          let payload = {
            "company_id": values.company_id,
            "service_type_id": values.service_type_id,
            "service_id":  values.service_id,
            "pitch_id":  values.pitch_id,
            "pitch_card_id":  values.pitch_card_id,
            "feedbacks": feedback
          }
    
          let url = PITCH_CARD_FEEDBACK;
          let res = await postData(url, payload);
  
          if (res) {
            if (createAnother) {
              setCreateAnother(false);
              form.resetFields();
            } else {
              let masterData = res?.data?.data;
              history.push('/pitch/config-pitch-question-list');
              alertPop('success', 'Question created successfully');
              form.resetFields();
            }
          }
        }
      }
    })
  }
  
  useEffect(()=>{
    getCompanyList();
  }, []);

  useEffect(()=>{
    if(selectedCompanyId) getServiceTypeList(selectedCompanyId);
  }, [selectedCompanyId]);

  useEffect(() => {
    if(selectedServiceTypeId) getServiceList(selectedServiceTypeId);
  }, [selectedServiceTypeId]);

  useEffect(()=>{
    if(serviceId) getPitchList(serviceId);
  }, [serviceId]);

  useEffect(()=>{
    if(selectedPitch) getCardList();
  }, [selectedPitch]);

  useEffect(() => {
    if (cardId) getCardWiseQuestionsList(cardId);
  }, [cardId]);

  useEffect(() => {
    if (cardWiseQuestionsList) {
      getServiceTypeList(cardWiseQuestionsList?.company_id);
      getServiceList(cardWiseQuestionsList?.service_type_id);
      getPitchList(cardWiseQuestionsList?.service_id);
      getCardList(cardWiseQuestionsList?.pitch_id);
    }
  }, [cardWiseQuestionsList])

  return (
    <Wrapper>
      <PageHeader
        style={{
          border: '1px solid rgb(235, 237, 240)',
        }}
        onBack={() => history.push('/pitch/config-pitch-question-list')}
        title="Question Setup"
        // subTitle="Back to list"
      />
      <Form 
        className="m-4"
        onSubmit={localSubmit}
      >
        <Row gutter={16}> 
          <Col span={24}>
            <Form.Item label={'Company Name'}>
              {form.getFieldDecorator('company_id', {
                initialValue: cardWiseQuestionsList?.company_id ? cardWiseQuestionsList?.company_id : undefined
              })(<Select 
                  allowClear
                  size="large"
                  showSearch
                  placeholder='Company Name'
                  dropdownMatchSelectWidth={false}
                  onChange={(value)=>{
                    setSelectedCompanyId(value);
                    form.resetFields(['service_type_id', 'service_id','pitch_id', 'pitch_card_id']);
                    setSelectedServiceTypeId();
                    setServiceId();
                    setSelectedPitch();
                    setServiceTypeList();
                    setServiceList();
                    setPitchList();
                    setCardList();
                  }}
                  filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                  }
                  disabled={cardId ? true : false}
                >
                  {companyList ? companyList.map(com=>{
                    return(<Select.Option key={`sop-${com.id}`} value={com.id} label={com.name}>{com.name}</Select.Option>
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
                initialValue: cardWiseQuestionsList?.service_type_id ? cardWiseQuestionsList?.service_type_id : undefined
              })(<Select 
                  allowClear
                  size="large"
                  showSearch
                  placeholder='Product/Service Type'
                  onChange={(value)=>{
                    setSelectedServiceTypeId(value);
                    form.resetFields(['service_id','pitch_id', 'pitch_card_id']);
                    setServiceId();
                    setSelectedPitch();
                    setServiceList();
                    setPitchList();
                    setCardList();
                  }}
                  dropdownMatchSelectWidth={false}
                  filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                  }
                  disabled={cardId ? true : false}
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
                initialValue: cardWiseQuestionsList?.service_id ? cardWiseQuestionsList?.service_id : undefined
              })(<Select 
                  allowClear
                  size="large"
                  showSearch
                  placeholder='Product/Service Name'
                  onChange={(value)=> {
                    setServiceId(value);
                    form.resetFields(['pitch_id', 'pitch_card_id']);
                    setSelectedPitch();
                    setPitchList();
                    setCardList();
                  }}
                  dropdownMatchSelectWidth={false}
                  filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                  }
                  disabled={cardId ? true : false}
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
            <Form.Item label={'Select Pitch'}>
              {form.getFieldDecorator('pitch_id', {
                initialValue: cardWiseQuestionsList?.pitch_id ? cardWiseQuestionsList?.pitch_id : undefined
              })(<Select 
                  allowClear
                  size="large"
                  showSearch
                  placeholder='Select Pitch'
                  onChange={(value)=> {
                    setSelectedPitch(value);
                    form.resetFields(['pitch_card_id']);
                    setCardList();
                  }}
                  dropdownMatchSelectWidth={false}
                  filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                  }
                  disabled={cardId ? true : false}
                >
                  {pitchList ? pitchList.map(pitch=>{
                    return(
                      <Select.Option key={`pitch-${pitch.id}`} value={pitch.id} label={pitch.name}>{pitch.name}</Select.Option>
                    )
                  }):null}
              </Select>)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'Select Card'}>
              {form.getFieldDecorator('pitch_card_id', {
                initialValue: cardWiseQuestionsList?.id ? cardWiseQuestionsList?.id : undefined
              })(<Select 
                  allowClear
                  size="large"
                  showSearch
                  placeholder='Select Card'
                  dropdownMatchSelectWidth={false}
                  filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                  }
                  disabled={cardId ? true : false}
                >
                  {cardList ? cardList.map(card=>{
                    return(
                      <Select.Option key={`card-${card.id}`} value={card.id} label={card.name}>{card.name}</Select.Option>
                    )
                  }):null}
              </Select>)}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} style={{display: 'flex', alignItems: 'center'}}> 
          <Col span={22}>
            <Form.Item label={'Question Title'}>
              {form.getFieldDecorator('name', {
                initialValue: undefined
              })(<Input.TextArea 
                  placeholder='Enter Question' 
                  rows={2} 
                  size="large" 
                  onChange={(event)=> setAddedQuestions(
                    {
                      "id": uuid(),
                      "name": event.target.value,
                      "status": 1
                    }
                  )}
                />)}
            </Form.Item>
          </Col>
          <Col span={2}>
            <Button 
              size="large" 
              key="1" 
              type="primary" 
              style={{marginTop: "15px", height: '50px'}}
              onClick={()=>{
                if(addedQuestions) setAddedQuestionsList([...addedQuestionsList, addedQuestions]);
                setAddedQuestions(null);
                form.resetFields('name');
              }}
            >
              Add
            </Button>
          </Col>
        </Row>
        <Row gutter={16}>
          {addedQuestionsList?.length > 0 ? <h3>Question List</h3> : null }
          {addedQuestionsList ? 
            addedQuestionsList?.map((item, index)=>{
              return(
                <div key={`all-questions-id-${item.id}`} className="my-3" style={{display: 'flex', alignItems: 'center'}}>
                  {/* <Col span={22}><Badge status="processing" text={item.name} /></Col> */}
                  <Col span={22}>
                    <Form.Item label={''}>
                      {form.getFieldDecorator(`question-list-name-${item.id}`, {
                        initialValue: item.name
                      })(<Input.TextArea 
                          placeholder='Enter Question' 
                          rows={2} 
                          size="large" 
                          onChange={(event)=> item.name = event.target.value}
                        />)}
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    <Icon 
                      type="delete" 
                      style={{ color: '#F2452F', fontSize: "1.5rem" }}
                      onClick={() => {
                        deleteQuestions(item.id);
                        let tempArray = [...addedQuestionsList];
                        tempArray.splice(index,1);
                        setAddedQuestionsList(tempArray);
                      }} 
                    />
                  </Col>
                </div>
              )
            })  
          : null}
        </Row>


        <div style={{display: 'flex', justifyContent:'flex-end'}}>
            {/* {cardId ? null :
              <Form.Item label={''}>
                {form.getFieldDecorator('is_create_another', {})(
                  <Checkbox 
                    checked={createAnother} 
                    onChange={e => setCreateAnother(e.target.checked)}
                  >
                    Create Another
                  </Checkbox>)}
              </Form.Item>
            } */}
            <Button 
              style={{width: 'auto', margin: '0.5rem 0'}}
              block
              type="primary"
              htmlType="submit"
            > 
              {cardId ? 'Update ' : 'Create '}
            </Button>
        </div> 
      </Form>
    </Wrapper>
  )
})

export default QuestionLinkup;