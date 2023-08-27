import React, { useEffect, useState } from 'react'
import {Input, Radio, Col, Row, Select, DatePicker, Checkbox, Form, Icon, Button, PageHeader } from "antd";
import { useHistory } from 'react-router-dom';
import { Wrapper } from "../../../../commons/Wrapper";
import { Flex } from "../../../../commons/Flex";
import {
    PIS_COMPANY_LIST_All,
    PIS_DEPARTMENT_LIST,
    USER_LIST,
    INDUSTRY_TYPE_DROPDOWN_LIST,
    INDUSTRY_SECTOR_DROPDOWN_LIST,
    CLIENT_DROPDOWN_LIST,
    SERVICE_TYPE_DROPDOWN_LIST,
    SERVICE_SETUP_DROPDOWN_LIST,
    SALES_SERVICE_HEAD
} from "../../../../../scripts/api";
import {getData,postData} from "../../../../../scripts/api-service";
import { alertPop } from "../../../../../scripts/message";
import * as Cookies from "js-cookie";

const SalesServiceHeadCreate = Form.create()(({form}) => {
  const [loading, setLoading] = useState();
  const [userInfo, setUserInfo] = useState();
  const [companyList, setCompanyList] = useState();
  const [departmentList, setDepartmentList] = useState();
  const [kamList, setKAMList] = useState();
  const [industryTypeList, setIndustryTypeList] = useState();
  const [industrySectorList, setIndustrySectorList] = useState();
  const [clientList, setClientList] = useState();
  const [serviceTypeList, setServiceTypeList] = useState();
  const [serviceSetupList, setServiceSetupList] = useState();
  const [industryType, setIndustryType] = useState();
  const [industrySector, setIndustrySector] = useState();
  const [serviceType, setServiceType] = useState();
  const [serviceName, setServiceName] = useState();
  const [client, setClient] = useState();
  const [department, setDepartment] = useState();
  const history = useHistory();

  const getUser = async() => {
    let userProfile = await JSON.parse(Cookies.get("profile"));
    setUserInfo(userProfile);
  }

  const getCompanyList = async () => {
    let res  = await getData(PIS_COMPANY_LIST_All);

    if (res) {
      let masterData = res.data.data;
      setCompanyList(masterData);
    }
  }

  const getDepartmentList = async () => {
    let res  = await getData(PIS_DEPARTMENT_LIST);

    if (res) {
      let masterData = res.data.data;
      setDepartmentList(masterData);
    }
  }
  

  const getKAMList = async (id) => {
    let url = USER_LIST + "?department_id=" + id;
    let res = await getData(url);
    if(res){
      let masterData = res?.data?.data;
      setKAMList(masterData);
    }
  }

  const getIndustryTypeList = async () => {
    let url = INDUSTRY_TYPE_DROPDOWN_LIST;
    let res = await getData(url);
    if(res){
      let masterData = res?.data?.data;
      setIndustryTypeList(masterData);
    }
  }

  const getIndustrySectorList = async (id) => {
    let url = INDUSTRY_SECTOR_DROPDOWN_LIST + "?industry_type_id=" + id;
    let res = await getData(url);
    if(res){
      let masterData = res?.data?.data;
      setIndustrySectorList(masterData);
    }
  }

  const getClientList = async (id) => {
    let url = CLIENT_DROPDOWN_LIST + "?industry_sector=" + id;
    let res = await getData(url);
    if(res){
      let masterData = res?.data?.data;
      setClientList(masterData);
    }
  }

  const getServiceTypeList = async () => {
    let url = SERVICE_TYPE_DROPDOWN_LIST;
    let res = await getData(url);
    if(res){
      let masterData = res?.data?.data;
      setServiceTypeList(masterData);
    }
  }

  const getServiceSetupList = async (id) => {
    let url = SERVICE_SETUP_DROPDOWN_LIST + "?service_type_id=" + id;
    let res = await getData(url);
    if(res){
      let masterData = res?.data?.data;
      setServiceSetupList(masterData);
    }
  }

  const localSubmit = (e) => {
    e.preventDefault();
    form.validateFields(async(err, values) => {
      if (!err) {
        let payload = {
          'department_id': values.department_id,
          'type': values.type,
          'industry_type_id': values.industry_type_id,
          'industry_sector_id': values.industry_sector_id,
          'service_type_id': values.service_type_id,
          'service_id': values.service_id,
          'client_id': values.client_id,
          'kam_id': values.kam_id,
          // 'status': values.status * 1
        }

        const url = SALES_SERVICE_HEAD;
        let res = await postData(url, payload);

        if (res) {
          alertPop("success", "Successfully complete the process");
          setLoading(false);
          form.resetFields();
          history.push(`/sales-dashboard/config-sales-head-list`);
        }
        else setLoading(false);
      }
    });
  };

  useEffect(() => {
    getUser();
    getCompanyList();
    getDepartmentList();
    getIndustryTypeList();
    getServiceTypeList();
  }, []);

  useEffect(()=>{
    getKAMList(userInfo?.department_id);
  },[userInfo]);

  useEffect(()=>{
    getKAMList(department);
  },[department]);

  useEffect(()=>{
    getIndustrySectorList(industryType);
  },[industryType]);

  useEffect(()=>{
    getClientList(industrySector);
  },[industrySector]);

  useEffect(()=>{
    getServiceSetupList(serviceType);
  },[serviceType]);

  return (
    <Wrapper>
      <PageHeader
        style={{
          border: '1px solid rgb(235, 237, 240)',
        }}
        onBack={() => history.push(`/sales-dashboard/config-sales-head-list`)}
        subTitle="Back to list"
      />
      <Form 
        onSubmit={localSubmit}
        style={{margin: '1rem'}}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={'Company'}>
              {form.getFieldDecorator(' ', {
                rules: [{required: true, message: "Required!"}],
                initialValue: userInfo?.company_id ? userInfo?.company_id : undefined
              })(<Select 
                  // disabled={flag === 'edit' ? true : false}
                  size="large"
                  showSearch
                  getPopupContainer={trigger => trigger.parentNode}
                  placeholder='Select Company' 
                  // onChange={handleIndustry}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  disabled
                >
                  {companyList?.map(company=>{
                    return(
                      <Select.Option key={company.id} value={company.id}>{company.name}</Select.Option>
                    )
                  })}
              </Select>)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'Department'}>
              {form.getFieldDecorator('department_id', {
                rules: [{required: true, message: "Required!"}],
                initialValue: userInfo?.department_id ? userInfo?.department_id : undefined
              })(<Select 
                size="large"
                showSearch
                getPopupContainer={trigger => trigger.parentNode}
                placeholder='Select Department' 
                onChange={(value)=> {
                  setDepartment(value);
                  form.resetFields('kam_id');
                  setKAMList();
                }}
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }>
                  {departmentList?.map(dept=>{
                    return(
                      <Select.Option key={dept.id} value={dept.id}>{dept.name}</Select.Option>
                    )
                  })}
              </Select>)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={'Industry Type'}>
              {form.getFieldDecorator('industry_type_id', {
                rules: [{required: true, message: "Required!"}],
              })(<Select 
                  size="large"
                  showSearch
                  getPopupContainer={trigger => trigger.parentNode}
                  placeholder='Select Industry Type' 
                  onChange={(value)=> {
                    setIndustryType(value);
                    form.resetFields(['industry_sector_id', 'client_id']);
                    setIndustrySectorList();
                    setClientList();
                  }}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }>
                    {industryTypeList?.map(industryType=>{
                      return(
                        <Select.Option key={industryType.id} value={industryType.id}>{industryType.name}</Select.Option>
                      )
                    })}
              </Select>)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'Industry Sector'}>
              {form.getFieldDecorator('industry_sector_id', {
                rules: [{required: true, message: "Required!"}],
              })(<Select 
                  size="large"
                  showSearch
                  getPopupContainer={trigger => trigger.parentNode}
                  placeholder='Select Industry Sector' 
                  onChange={(value)=> {
                    setIndustrySector(value);
                    form.resetFields('client_id');
                    setClientList();
                  }}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }>
                    {industrySectorList?.map(industrySector=>{
                      return(
                        <Select.Option key={industrySector.id} value={industrySector.id}>{industrySector.name}</Select.Option>
                      )
                    })}
              </Select>)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={'Service Type'}>
              {form.getFieldDecorator('service_type_id', {
                rules: [{required: true, message: "Required!"}],
              })(<Select 
                  size="large"
                  showSearch
                  getPopupContainer={trigger => trigger.parentNode}
                  placeholder='Select Service Type' 
                  onChange={(value)=> {
                    setServiceType(value);
                    form.resetFields('service_id');
                    setServiceSetupList();
                  }}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }>
                    {serviceTypeList?.map(serviceType=>{
                      return(
                        <Select.Option key={serviceType.id} value={serviceType.id}>{serviceType.name}</Select.Option>
                      )
                    })}
              </Select>)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'Service Name'}>
              {form.getFieldDecorator('service_id', {
                rules: [{required: true, message: "Required!"}],
              })(<Select 
                  size="large"
                  showSearch
                  getPopupContainer={trigger => trigger.parentNode}
                  placeholder='Select Service Name' 
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }>
                    {serviceSetupList?.map(service=>{
                      return(
                        <Select.Option key={service.id} value={service.id}>{service.name}</Select.Option>
                      )
                    })}
              </Select>)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={'Kam'}>
              {form.getFieldDecorator('kam_id', {
                rules: [{required: true, message: "Required!"}],
              })(<Select 
                  size="large"
                  showSearch
                  getPopupContainer={trigger => trigger.parentNode}
                  placeholder='Select KAM' 
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {kamList?.map(kam=>{
                    return(
                      <Select.Option key={kam.emp_id} value={kam.emp_id}>{kam.name}</Select.Option>
                    )
                  })}
                </Select>)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'Client Name'}>
              {form.getFieldDecorator('client_id', {
                rules: [{required: true, message: "Required!"}],
              })(<Select 
                  size="large"
                  showSearch
                  getPopupContainer={trigger => trigger.parentNode}
                  placeholder='Select Client' 
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }>
                    {clientList?.map(client=>{
                      return(
                        <Select.Option key={client.id} value={client.id}>{client.name}</Select.Option>
                      )
                    })}
              </Select>)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={'Type'}>
              {form.getFieldDecorator('type', {
                rules: [{required: true, message: "Required!"}],
              })(<Select 
                  size="large"
                  showSearch
                  getPopupContainer={trigger => trigger.parentNode}
                  placeholder='Select Type' 
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Select.Option key="Monetary" value="Monetary">Monetary</Select.Option>
                  <Select.Option key="Acquisition" value="Acquisition">Acquisition</Select.Option>
                </Select>)}
            </Form.Item>
          </Col>
          {/* <Col span={12}>
            <Form.Item label={'Status'}>
              {form.getFieldDecorator('status', {
                  rules: [{required: true, message: "Required!"}],
                })(<Radio.Group >
                  <Radio value={'1'}>Active</Radio>
                  <Radio value={"0"}>Inactive</Radio>
                </Radio.Group>,
              )}
            </Form.Item>
          </Col> */}
        </Row>

        <div style={{ textAlign: 'right' }}>
          <Button
            style={{width: 'auto'}}
            loading={loading}
            size="large"
            type="primary"
            htmlType="submit"
          >
            Create
          </Button>
        </div>
      </Form>
    </Wrapper>
  )
})

export default SalesServiceHeadCreate;