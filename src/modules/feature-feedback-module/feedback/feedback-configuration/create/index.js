import React, {useState, useEffect} from 'react'
import {useHistory} from "react-router-dom";
import {Button, Select, Card, Form, Icon,PageHeader, Row, Col, Checkbox } from "antd";
import uuid from "uuid/v4";
import { Wrapper} from "../../../../commons/Wrapper";
import { 
  ALL_PROJECT_SETUP_LIST, 
  FFM_SERVICE_DROPDOWN_LIST, 
  FFM_SERVICE_MODULE_DROPDOWN_LIST, 
  FFM_SERVICE_MODULE_FEATURE_DROPDOWN_LIST, 
  FFM_FEEDBACK_DROPDOWN_LIST, 
  FFM_FEEDBACK_OPTION_DROPDOWN_LIST, 
  FFM_FEEDBACK_REASON_DROPDOWN_LIST, 
  FFM_FEEDBACK_CONFIGURATION_CREATE 
} from "../../../../../scripts/api";
import {getData, postData} from "../../../../../scripts/api-service";
import { alertPop } from '../../../../../scripts/message';

const FeedbackConfigurationCreate = Form.create()(({form}) => {
  const [projectList, setProjectList] = useState();
  const [projectId, setProjectId] = useState();
  const [serviceList, setServiceList] = useState();
  const [serviceId, setServiceId] = useState();
  const [serviceModuleList, setServiceModuleList] = useState();
  const [serviceModuleId, setServiceModuleId] = useState();
  const [featureList, setFeatureList] = useState();
  const [feedbackList, setFeedbackList] = useState();
  const [feedbackTitle, setFeedbackTitle] = useState();
  const [feedbackId, setFeedbackId] = useState();
  const [feedbackOptionList, setFeedbackOptionList] = useState();
  const [reasonRequired, setReasonRequired] = useState([]);
  const [reasonType, setReasonType] = useState();
  const [feedbackReasonList, setFeedbackReasonList] = useState();
  const [feedbackConfiguration, setFeedbackConfiguration] = useState([{ id: uuid() }]);
  const [loading, setLoading] = useState();
  const history = useHistory();

  const getProjectList = async () => {
    let url = ALL_PROJECT_SETUP_LIST;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      if (res) {
        setProjectList(masterData);
      }
    }
  }

  const getServiceList = async (id) => {
    let url = FFM_SERVICE_DROPDOWN_LIST + "?project_id=" + id;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      if (res) {
        setServiceList(masterData);
      }
    }
  }

  const getServiceModuleList = async (id) => {
    let url = FFM_SERVICE_MODULE_DROPDOWN_LIST + "?ffm_service_id=" + id;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      if (res) {
        setServiceModuleList(masterData);
      }
    }
  }

  const getFeatureList = async (id) => {
    let url = FFM_SERVICE_MODULE_FEATURE_DROPDOWN_LIST + "?ffm_module_id=" + id;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      if (res) {
        setFeatureList(masterData);
      }
    }
  }

  const getFeedbackList = async () => {
    let url = FFM_FEEDBACK_DROPDOWN_LIST;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      if (res) {
        setFeedbackList(masterData);
      }
    }
  }
  
  const getFeedbackOptionList = async (id ) => {
    let url = FFM_FEEDBACK_OPTION_DROPDOWN_LIST + "?ffm_feedback_id=" + id;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      if (res) {
        setFeedbackOptionList(masterData);
      }
    }
  }

  const getFeedbackReasonList = async (type) => {
    let url = FFM_FEEDBACK_REASON_DROPDOWN_LIST;
    if(type) url += "?reason_type=" + type;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      if (res) {
        setFeedbackReasonList(masterData);
      }
    }
  }

  const AddMoreConfigs = () => {
    setFeedbackConfiguration(prevArray => [...prevArray, { id: uuid() }]);
  }

  const removeConfigs = (id) => {
    let items = feedbackConfiguration.filter(feedbackConfig => feedbackConfig.id !== id);
    setFeedbackConfiguration(items);
  }

  useEffect(() => {
    getProjectList();
    getFeedbackList();
  }, []);

  useEffect(() => {
    getServiceList(projectId);
  }, [projectId]);
  
  useEffect(() => {
    getServiceModuleList(serviceId);
  }, [serviceId]);

  useEffect(() => {
    getFeatureList(serviceModuleId);
  }, [serviceModuleId]);

  useEffect(() => {
    getFeedbackOptionList(feedbackId);
    
    let result = feedbackList?.find(item => item.id === feedbackId);
    if(result){
      setFeedbackTitle(result.title);
    }
  }, [feedbackId]);

  useEffect(() => {
    getFeedbackReasonList(reasonType);
  }, [reasonType]);

  const localSubmit = (e) => {
    e.preventDefault();
    form.validateFields(async(err, values) => {
      if (!err) {
        let configData = [];
        setLoading(true);
        if(feedbackConfiguration){
          feedbackConfiguration.forEach((config, index) => {
            let data = {
              "id": null,
              "name": feedbackOptionList.find(item => item.id === values[`options-${config.id}`]).name,
              "ffm_option_id": values[`options-${config.id}`],
              "reason_required": feedbackOptionList.find(item => item.id === values[`options-${config.id}`]).reason_required,
              "reason_type": feedbackOptionList.find(item => item.id === values[`options-${config.id}`]).reason_type || null,
              "reasons": [
                {
                  "id": null,
                  "ffm_reason_id": values[`reasons-${config.id}`]
                }
              ]
            }
            configData.push(data);
          });
        }

        let payload = {
          "project_id": values.project_id,
          "ffm_service_id": values.ffm_service_id,
          "ffm_module_id": values.ffm_module_id,
          "ffm_feature_id": values.ffm_feature_id,
          "ffm_feedback_id": values.ffm_feedback_id,
          "options": configData
        }

        let url = FFM_FEEDBACK_CONFIGURATION_CREATE;
        let res = await postData(url, payload);

        if (res) {
          let masterData = res?.data?.data;
          history.push('/ffm/config-feedback-configuration-list');
          alertPop('success', 'Process completed successfully');
          setLoading(false);
        }
        else setLoading(false);
      }
    })
  }

  return (
    <Wrapper>
      <PageHeader
        style={{
          border: '1px solid rgb(235, 237, 240)',
        }}
        onBack={() => history.push('/ffm/config-feedback-configuration-list')}
        title="Feedback Configuration Create"
      />
      <Form 
        className="m-4"
        onSubmit={localSubmit}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={'Project Name'}>
              {form.getFieldDecorator('project_id', {
              })(<Select 
                allowClear
                size="large"
                showSearch
                placeholder='Select Project'
                dropdownMatchSelectWidth={false}
                onChange={(value)=>setProjectId(value)}
                filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
                }
              >
                {projectList ? projectList.map(project=>{
                  return(
                    <Select.Option key={`project-${project.id}`} value={project.id} label={project.name}>{project.name}</Select.Option>
                  )
                }):null}
              </Select>)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'Service Name'}>
              {form.getFieldDecorator('ffm_service_id', {
              })(<Select 
                allowClear
                size="large"
                showSearch
                placeholder='Select Service'
                dropdownMatchSelectWidth={false}
                onChange={(value)=>setServiceId(value)}
                filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
                }
              >
                {serviceList ? serviceList.map(service=>{
                  return(
                    <Select.Option key={`service-${service.id}`} value={service.id} label={service.name}>{service.name}</Select.Option>
                  )
                }):null}
              </Select>)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={'Service Module Name'}>
              {form.getFieldDecorator('ffm_module_id', {
              })(<Select 
                allowClear
                size="large"
                showSearch
                placeholder='Select Service Module'
                dropdownMatchSelectWidth={false}
                onChange={(value)=>setServiceModuleId(value)}
                filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
                }
              >
                {serviceModuleList ? serviceModuleList.map(service_module=>{
                  return(
                    <Select.Option key={`service_module-${service_module.id}`} value={service_module.id} label={service_module.name}>{service_module.name}</Select.Option>
                  )
                }):null}
              </Select>)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'Feature Name'}>
              {form.getFieldDecorator('ffm_feature_id', {
              })(<Select 
                allowClear
                size="large"
                showSearch
                placeholder='Select Feature'
                dropdownMatchSelectWidth={false}
                onChange={(value)=>setServiceId(value)}
                filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
                }
              >
                {featureList ? featureList.map(feature=>{
                  return(
                    <Select.Option key={`feature-${feature.id}`} value={feature.id} label={feature.name}>{feature.name}</Select.Option>
                  )
                }):null}
              </Select>)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}> 
          <Col span={24}>
            <Form.Item label={'Feedback Name'}>
              {form.getFieldDecorator('ffm_feedback_id', {
              })(<Select 
                allowClear
                size="large"
                showSearch
                placeholder='Select Feedback'
                dropdownMatchSelectWidth={false}
                onChange={(value)=>setFeedbackId(value)}
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
            {feedbackTitle && <small><strong>Feedback Title: </strong>{feedbackTitle}</small>}
            </Form.Item>
          </Col>
        </Row>
        {feedbackConfiguration ? 
        feedbackConfiguration.map((item, index) => (
          <Row gutter={16} key={`feedback-config-${index}`}> 
            <Col span={22}>
              <Card>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label={'Feedback Options'}>
                      {form.getFieldDecorator(`options-${item.id}`, {
                      })(<Select 
                        allowClear
                        size="large"
                        showSearch
                        placeholder='Select Feedback Options'
                        onChange={(value)=>{
                          let result = feedbackOptionList.find(item => item.id === value);
                          setReasonType(result?.reason_type);
                          setReasonRequired(prevArray => [
                            ...prevArray, 
                            {
                              id: item.id,
                              isrequired : result?.reason_required,
                            }
                          ])
                        }}
                        dropdownMatchSelectWidth={false}
                        filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {feedbackOptionList ? feedbackOptionList.map(feedbackOption=>{
                          return(
                            <Select.Option key={`feedbackOption-${feedbackOption.id}`} value={feedbackOption.id} label={feedbackOption.name}>{feedbackOption.name}</Select.Option>
                          )
                        }):null}
                      </Select>)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label={'Feedback Reasons'}>
                      {form.getFieldDecorator(`reasons-${item.id}`, {
                      })(<Select 
                        allowClear
                        size="large"
                        showSearch
                        placeholder='Select Feedback Reasons'
                        dropdownMatchSelectWidth={false}
                        filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                        }
                        disabled={reasonRequired.id === item.id ? !reasonRequired.isrequired : false}
                      >
                        {feedbackReasonList ? feedbackReasonList.map(feedbackReason=>{
                          return(
                            <Select.Option key={`feedbackReason-${feedbackReason.id}`} value={feedbackReason.id} label={feedbackReason.name}>{feedbackReason.name}</Select.Option>
                          )
                        }):null}
                      </Select>)}
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={2} style={{display: 'flex', justifyContent: 'space-between', paddingTop: '4rem'}}>
              <Icon 
                type="plus-circle" 
                style={{ fontSize: "2rem", color: "#0285E7" }} 
                onClick={() => AddMoreConfigs() }
                hidden={feedbackConfiguration.length-1 === index? false : true}
              />
              <Icon 
                type="delete" 
                style={{ fontSize: "2rem", color: "#F32626"  }} 
                onClick={() => removeConfigs(item.id)}
                hidden={((feedbackConfiguration.length !== index) && (feedbackConfiguration.length > 1)) ? false : true}
              />
            </Col>
          </Row> ))
        : null}
        <div style={{display: 'flex', justifyContent:'flex-end'}}>
          <Button 
            style={{width: 'auto'}}
            block
            type="primary"
            htmlType="submit"
            loading={loading}
          > 
            Create
          </Button>
        </div>
      </Form>
    </Wrapper>
  )
})

export default FeedbackConfigurationCreate;