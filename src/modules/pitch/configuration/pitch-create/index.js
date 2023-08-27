import React, {useState, useEffect} from 'react'
import {useHistory} from "react-router-dom";
import {Button, Table, Tag, Select, Modal, Radio, Form, Input, Checkbox,PageHeader, Row, Col } from "antd";
import {TableWrapper, Wrapper} from "../../../commons/Wrapper";
import { PIS_COMPANY_LIST_All, DEPARTMENT_LIST_ALL, TEAMS_LIST_ALL, SERVICE_SETUP_DROPDOWN_LIST, GET_SERVICE_TYPE_LIST, PITCH_SETUP } from "../../../../scripts/api";
import {getData, postData} from "../../../../scripts/api-service";
import { alertPop } from '../../../../scripts/message';

const PitchCreate = Form.create()(({form}) => {
  const [pitchData, setPitchData] = useState();
  const [companyList, setCompanyList] = useState();
  const [selectedCompanyId, setSelectedCompanyId] = useState();
  const [serviceList, setServiceList] = useState();
  const [serviceTypeList, setServiceTypeList] = useState();
  const [selectedServiceTypeId, setSelectedServiceTypeId] = useState();
  const [isCreateAnother, setIsCreateAnother] = useState();
  const history = useHistory();
  
  let searchUrl = window.location.search;
  let params = new URLSearchParams(searchUrl);
  let paramsPitchId = params.get('pitch_id');
  let pitchId = paramsPitchId ? paramsPitchId * 1 : undefined;

  const getPitchList = async () => {
    let url = PITCH_SETUP + `/${pitchId}`;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      if (res) {
        setPitchData(masterData);
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
    if(!pitchId) getCompanyList();
  }, []);

  useEffect(() => {
    if(selectedCompanyId) getServiceTypeList(selectedCompanyId);
  }, [selectedCompanyId]);

  useEffect(() => {
    if(selectedServiceTypeId) getServiceList(selectedServiceTypeId);
  }, [selectedServiceTypeId]);

  useEffect(() => {
    if(pitchId) {
      getPitchList();
      getCompanyList();
    }
  }, [pitchId]);

  useEffect(() => {
    if(pitchData) {
      getServiceTypeList(pitchData?.company_id);
      getServiceList(pitchData?.service_type_id);
    }
  }, [pitchData]);

  const localSubmit = (e) => {
    e.preventDefault();
    form.validateFields(async(err, values) => {
      if (!err) {
        let payload = {
          ...values,
        }
        let url = pitchData ? PITCH_SETUP + '/' + pitchId : PITCH_SETUP;
        let res = await postData(url, payload);

        if (res) {
          let masterData = res?.data?.data;
          history.push('/pitch/config-pitch-list');
          alertPop('success', 'Process completed successfully');
          setIsCreateAnother(false);
          if(isCreateAnother) {
            form.resetFields();
            history.push('/pitch/config-pitch-create');
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
        onBack={() => history.push('/pitch/config-pitch-list')}
        title="Setup Pitch"
      />
      <Form 
        className="m-4"
        onSubmit={localSubmit}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label={'Pitch Title'}>
              {form.getFieldDecorator('name', {
                initialValue: pitchData?.name ? pitchData?.name : undefined
              })(<Input placeholder="Enter title" size="large"/>)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}> 
          <Col span={24}>
            <Form.Item label={'Company Name'}>
              {form.getFieldDecorator('company_id', {
                initialValue: pitchData?.company_id ? pitchData?.company_id : undefined
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
                initialValue: pitchData?.service_type_id ? pitchData?.service_type_id : undefined
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
                initialValue: pitchData?.service_id ? pitchData?.service_id : undefined
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
            <Form.Item label={'Status'}>
              {form.getFieldDecorator('status', {
                initialValue: pitchData ? pitchData?.status : 1
              })(<Radio.Group>
                  <Radio value={1}>Active</Radio>
                  <Radio value={0}>Inactive</Radio>
                </Radio.Group>)}
            </Form.Item>
          </Col>
        </Row>
        <div style={{display: 'flex', justifyContent:'flex-end'}}>
            {!pitchData ? <Form.Item label={''}>
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
              {pitchData ? 'Update ' : 'Create '}
            </Button>
        </div>
      </Form>
    </Wrapper>
  )
})

export default PitchCreate;