import React, { useState, useEffect } from 'react'
import {Button, Select, Badge, Form, Input, Checkbox,PageHeader, Row, Col, Icon, Radio } from "antd";
import uuid from "uuid/v4";
import {TableWrapper, Wrapper} from "../../../../commons/Wrapper";
import {useHistory} from "react-router-dom";
import { 
  FEEDBACK_DROPDOWN_LIST, 
  FEEDBACK_CARD_DROPDOWN_LIST, 
  PIS_COMPANY_LIST_All, 
  FEEDBACK_SERVICE_LIST, 
  FEEDBACK_SERVICE_TYPE_LIST,
  FEEDBACK_QUESTION_VIEW, 
  FEEDBACK_QUESTION,
  FEEDBACK_QUESTION_DELETE
} from "../../../../../scripts/api";
import {getData, postData} from "../../../../../scripts/api-service";
import { alertPop } from "../../../../../scripts/message";

const QuestionForm = Form.create()(({form}) => {
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
  const [feedbackList, setFeedbackList] = useState();
  const [selectedPitch, setSelectedPitch] = useState();
  const [cardList, setCardList] = useState();
  const [cardWiseQuestionsList, setCardWiseQuestionsList] = useState();
  const [createAnother, setCreateAnother] = useState(false);
  const [questionTitle, setQuestionTitle] = useState();
  const [answerTitle, setAnswerTitle] = useState();
  const [answerType, setAnswerType] = useState();
  const [answerStatus, setAnswerStatus] = useState();
  const [addedQuestions, setAddedQuestions] = useState();
  const [addedQuestionsList, setAddedQuestionsList] = useState([]);
  const history = useHistory();

  const feedbackTypeList = [
    { id: 1, name: "Pitch"},
    { id: 2, name: "BRD"},
    { id: 3, name: "Survey"},
  ]

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
    let url = FEEDBACK_SERVICE_TYPE_LIST + '?company_id=' + id;
    let res = await getData(url);
    
    if (res) {
      let masterData = res?.data?.data;
      if (res) {
        setServiceTypeList(masterData);
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

  const getFeedbackList = async (id) => {
    let url = FEEDBACK_DROPDOWN_LIST + '?';
    if(id) url += 'service_id=' + id;
    let res = await getData(url);
    
    if (res) {
      let masterData = res?.data?.data;
      if (res) {
        setFeedbackList(masterData);
      }
    }
  }

  const getCardList = async () => {
    let url = FEEDBACK_CARD_DROPDOWN_LIST + '?';
    if(selectedPitch) url += 'feedback_id=' + selectedPitch;
    let res = await getData(url);
    
    if (res) {
      let masterData = res?.data?.data;
      if (res) {
        setCardList(masterData);
      }
    }
  }

  const getCardWiseQuestionsList = async (id) => {
    let res = await getData(FEEDBACK_QUESTION_VIEW + '/' + id);

    if (res) {
      let masterData = res?.data?.data;
      setCardWiseQuestionsList(masterData);
      setAddedQuestionsList(masterData?.questions);
    }
  }
  
  const deleteQuestions = async (id) => {
    let url = FEEDBACK_QUESTION_DELETE + '/';
    if(typeof id == 'number'){
      url += id; 
      let res = await postData(url);
  
      if (res) {
        let masterData = res?.data?.data;
      }
    } 
  }

  const handleQuestions = () => {

    let payload = {
      "id": uuid(),
      "name": questionTitle,
      "answer": answerTitle,
      "type": answerType,
      "status": answerStatus
    }

    setAddedQuestionsList([...addedQuestionsList, payload]);
    setQuestionTitle(null);
    setAnswerTitle(null);
    setAnswerType(null);
    setAnswerStatus(null);
    form.resetFields(['name', 'answer', 'type', 'status']);
  }

  const localSubmit = (e) => {
    e.preventDefault();
    form.validateFields(async(err, values) => {
      if (!err) {
        let feedback = [];

        if(cardId && addedQuestionsList){
          addedQuestionsList.forEach((item=>{
            feedback.push({
              "id": item.id && isNaN(item.id) === false ? item.id : null,
              "name":  item.name,
              "type":  item.type,
              "answer":  item.answer,
              "status": item.status
            })
          }))
        }
        else{
          addedQuestionsList.forEach((question, idx) => {
            feedback.push({
              "id": null,
              "name":  question.name,
              "type":  question.type,
              "answer":  question.answer,
              "status": question.status
            })
          })
        }

        let payload = {
          "feedback_type": values.feedback_type,
          "company_id": values.company_id,
          "service_type_id": values.service_type_id,
          "service_id":  values.service_id,
          "feedback_id":  values.feedback_id,
          "feedback_card_id":  values.feedback_card_id,
          "questions": feedback
        }
  
        let url = FEEDBACK_QUESTION;
        let res = await postData(url, payload);

        if (res) {
          let masterData = res?.data?.data;
          history.push('/feedback/config-feedback-question-list');
          alertPop('success', 'Question created successfully');
          form.resetFields();
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
    if(serviceId) getFeedbackList(serviceId);
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
      getFeedbackList(cardWiseQuestionsList?.service_id);
      getCardList(cardWiseQuestionsList?.feedback_id);
    }
  }, [cardWiseQuestionsList])

  return (
    <Wrapper>
      <PageHeader
        style={{
          border: '1px solid rgb(235, 237, 240)',
        }}
        onBack={() => history.push('/feedback/config-feedback-question-list')}
        title="Question Setup"
        // subTitle="Back to list"
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
                initialValue: cardWiseQuestionsList?.feedback_type ? cardWiseQuestionsList?.feedback_type : undefined
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
                  disabled={cardId ? true : false}
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
                initialValue: cardWiseQuestionsList?.company_id ? cardWiseQuestionsList?.company_id : undefined
              })(<Select 
                  allowClear
                  size="large"
                  showSearch
                  placeholder='Company Name'
                  dropdownMatchSelectWidth={false}
                  onChange={(value)=>{
                    setSelectedCompanyId(value);
                    form.resetFields(['service_type_id', 'service_id','feedback_id', 'feedback_card_id']);
                    setSelectedServiceTypeId();
                    setServiceId();
                    setSelectedPitch();
                    setServiceTypeList();
                    setServiceList();
                    setFeedbackList();
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
                rules: [{ required: true, message: "Required!" }],
                initialValue: cardWiseQuestionsList?.service_type_id ? cardWiseQuestionsList?.service_type_id : undefined
              })(<Select 
                  allowClear
                  size="large"
                  showSearch
                  placeholder='Product/Service Type'
                  onChange={(value)=>{
                    setSelectedServiceTypeId(value);
                    form.resetFields(['service_id','feedback_id', 'feedback_card_id']);
                    setServiceId();
                    setSelectedPitch();
                    setServiceList();
                    setFeedbackList();
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
                rules: [{ required: true, message: "Required!" }],
                initialValue: cardWiseQuestionsList?.service_id ? cardWiseQuestionsList?.service_id : undefined
              })(<Select 
                  allowClear
                  size="large"
                  showSearch
                  placeholder='Product/Service Name'
                  onChange={(value)=> {
                    setServiceId(value);
                    form.resetFields(['feedback_id', 'feedback_card_id']);
                    setSelectedPitch();
                    setFeedbackList();
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
            <Form.Item label={'Select Feedback'}>
              {form.getFieldDecorator('feedback_id', {
                rules: [{ required: true, message: "Required!" }],
                initialValue: cardWiseQuestionsList?.feedback_id ? cardWiseQuestionsList?.feedback_id : undefined
              })(<Select 
                  allowClear
                  size="large"
                  showSearch
                  placeholder='Select Feedback'
                  onChange={(value)=> {
                    setSelectedPitch(value);
                    form.resetFields(['feedback_card_id']);
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
                  {feedbackList ? feedbackList.map(feedback=>{
                    return(
                      <Select.Option key={`feedback-${feedback.id}`} value={feedback.id} label={feedback.name}>{feedback.name}</Select.Option>
                    )
                  }):null}
              </Select>)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'Select Card'}>
              {form.getFieldDecorator('feedback_card_id', {
                rules: [{ required: true, message: "Required!" }],
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
            <Row 
              style={{
                border: '1px solid #757575',
                borderRadius: '10px',
                padding: '1rem'
              }}
            >
              <Col span={24}>
                <Form.Item label={'Question Title'}>
                  {form.getFieldDecorator('name', {
                    // rules: [{ required: true, message: "Required!" }],
                    initialValue: undefined
                  })(<Input.TextArea 
                      placeholder='Enter Question' 
                      rows={1} 
                      size="large" 
                      onChange={(event)=> setQuestionTitle(event.target.value)}
                    />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={'Type'}>
                  {form.getFieldDecorator('type', {
                    // rules: [{ required: true, message: "Required!" }],
                    // initialValue: cardData ? cardData?.status : 1
                  })(<Radio.Group onChange={(event)=> setAnswerType(event.target.value)}>
                    <Radio value="Text">Text</Radio>
                    <Radio value="Radio">Radio</Radio>
                    <Radio value="Checkbox">Checkbox</Radio>
                  </Radio.Group>)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={'Status'}>
                  {form.getFieldDecorator('status', {
                    // rules: [{ required: true, message: "Required!" }],
                    // initialValue: cardData ? cardData?.status : 1
                  })(<Radio.Group onChange={(event)=> setAnswerStatus(event.target.value)}>
                    <Radio value={1}>Active</Radio>
                    <Radio value={0}>Inactive</Radio>
                  </Radio.Group>)}
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label={'Answer'}>
                  {form.getFieldDecorator('answer', {
                    // rules: [{ required: true, message: "Required!" }],
                    // initialValue: cardData?.description ? cardData?.description : undefined
                  })(<Input.TextArea 
                        placeholder="Enter answers" 
                        rows={2}
                        onChange={(event)=>setAnswerTitle(event.target.value)}
                      />)}
                    <small>Please separate your answer with a semicolon (Ex: answer1; answer2)</small>
                </Form.Item>
              </Col>
            </Row>  
          </Col>
          <Col span={2}>
            <Button 
              size="large" 
              key="1" 
              type="primary" 
              style={{marginTop: "15px", height: '50px'}}
              onClick={()=>{ handleQuestions()}}
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
                  <div>
                    <Row 
                      style={{
                        border: '1px solid #757575',
                        borderRadius: '10px',
                        padding: '1rem'
                      }}
                    >
                  <Col span={24}>
                    <Col span={24}>
                      <Form.Item label={''}>
                        {form.getFieldDecorator(`name-${item.id}`, {
                          initialValue: item.name
                        })(<Input.TextArea 
                            placeholder='Enter Question' 
                            rows={1} 
                            size="large" 
                            disabled
                            // onChange={(event)=> item.name = event.target.value}
                          />)}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label={'Type'}>
                        {form.getFieldDecorator(`type-${item.id}`, {
                          initialValue: item.type
                        })(<Radio.Group disabled>
                          <Radio value="Text">Text</Radio>
                          <Radio value="Radio">Radio</Radio>
                          <Radio value="Checkbox">Checkbox</Radio>
                        </Radio.Group>)}
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label={'Status'}>
                        {form.getFieldDecorator(`status-${item.id}`, {
                          initialValue: item.status
                        })(<Radio.Group disabled>
                            <Radio value={1}>Active</Radio>
                            <Radio value={0}>Inactive</Radio>
                          </Radio.Group>)}
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item label={'Answer'}>
                        {form.getFieldDecorator(`answer-${item.id}`, {
                          initialValue: item.answer
                        })(<Input.TextArea placeholder="Enter answers" rows={2} disabled/>)}
                      </Form.Item>
                    </Col>
                    </Col>
                  </Row>
                  </div>
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

export default QuestionForm;