import React, {useState, useEffect} from 'react'
import {useHistory} from "react-router-dom";
import {Button, Select, Radio, Form, Input,PageHeader, Row, Col } from "antd";
import { Wrapper} from "../../../../commons/Wrapper";
import { FFM_SERVICE_MODULE_UPDATE, ALL_PROJECT_SETUP_LIST, FFM_SERVICE_DROPDOWN_LIST, FFM_SERVICE_BY_ID } from "../../../../../scripts/api";
import {getData, postData} from "../../../../../scripts/api-service";
import { alertPop } from '../../../../../scripts/message';

const ProjectServiceModuleUpdate = Form.create()(({form}) => {
  const [projectList, setProjectList] = useState();
  const [projectId, setProjectId] = useState();
  const [serviceList, setServiceList] = useState();
  const [serviceData, setServiceData] = useState();
  const [loading, setLoading] = useState();
  const history = useHistory();
  
  let searchUrl = window.location.search;
  let params = new URLSearchParams(searchUrl);
  let paramsServiceModuleId = params.get('service_module_id');
  let serviceModuleId = paramsServiceModuleId ? paramsServiceModuleId * 1 : undefined;

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
    let url = FFM_SERVICE_DROPDOWN_LIST + '?';
    if(id) url += "project_id=" + id;
    let res = await getData(url);
    
    if (res) {
      let masterData = res?.data?.data;
      if (res) {
        setServiceList(masterData);
      }
    }
  }

  const getServiceModuleById = async (id) => {
    let url = FFM_SERVICE_BY_ID + "/" + id;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      if (res) {
        setServiceData(masterData);
      }
    }
  }

  useEffect(() => {
    getProjectList();
  }, []);

  useEffect(() => {
    if(projectId) getServiceList(projectId);
  }, [projectId]);

  useEffect(() => {
    if(serviceData) getServiceList(serviceData?.project_id);
  }, [serviceData]);

  useEffect(() => {
    if(serviceModuleId) {
      getServiceModuleById(serviceModuleId)
    }
  }, [serviceModuleId]);

  const localSubmit = (e) => {
    e.preventDefault();
    form.validateFields(async(err, values) => {
      if (!err) {
        setLoading(true);
        let payload = {
          ...values,
        }
        let url = FFM_SERVICE_MODULE_UPDATE + "/" + serviceModuleId;
        let res = await postData(url, payload);

        if (res) {
          let masterData = res?.data?.data;
          history.push('/ffm/config-service-module-list');
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
        onBack={() => history.push('/ffm/config-service-module-list')}
        title="Service Module Update"
      />
      <Form 
        className="m-4"
        onSubmit={localSubmit}
      >
        <Row gutter={16}> 
          <Col span={12}>
            <Form.Item label={'Project Name'}>
              {form.getFieldDecorator('project_id', {
                initialValue: serviceData?.project_id ? serviceData?.project_id : undefined
              })(<Select 
                  allowClear
                  size="large"
                  showSearch
                  placeholder='Project Name'
                  onChange={(value)=>{
                    setProjectId(value);
                    form.resetFields(['ffm_service_id']);
                    setServiceList();
                  }}
                  dropdownMatchSelectWidth={false}
                  filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {projectList ? projectList.map(project=>{
                    return(
                      <Select.Option key={`sop-${project.id}`} value={project.id} label={project.name}>{project.name}</Select.Option>
                    )
                  }):null}
              </Select>)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'Service Name'}>
              {form.getFieldDecorator('ffm_service_id', {
                initialValue: serviceData?.id ? serviceData?.id : undefined
              })(<Select 
                  allowClear
                  size="large"
                  showSearch
                  placeholder='Service Name'
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
            <Form.Item label={'Service Name'}>
              {form.getFieldDecorator('name', {
                initialValue: serviceData?.name ? serviceData?.name : undefined
              })(<Input size="large" placeholder="Enter Service Title"/>)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label={'Status'}>
              {form.getFieldDecorator('status', {
                initialValue: serviceData ? serviceData?.status : 1
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
              loading={loading}
            > 
              Update
            </Button>
        </div>
      </Form>
    </Wrapper>
  )
})

export default ProjectServiceModuleUpdate;