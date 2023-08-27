import React, { useEffect, useState } from 'react'
import {Input, Radio, Col, Row, Select, DatePicker, Checkbox, Form, Icon, Button, PageHeader } from "antd";
import { useHistory } from 'react-router-dom';
import { Wrapper } from "../../../../commons/Wrapper";
import { Flex } from "../../../../commons/Flex";
import {
  USER_LIST,
  SALES_SERVICE_HEAD
} from "../../../../../scripts/api";
import {getData,postData} from "../../../../../scripts/api-service";
import { alertPop } from "../../../../../scripts/message";
import moment from 'moment';

let years = [],
nextYear = moment().add(10, 'Y').format('YYYY');

for (let i = 2000; i <= nextYear; i++) {
  years.push(i.toString());
}

let months = [
  {value: "1", text: "January"},
  {value: "2", text: "February"},
  {value: "3", text: "March"},
  {value: "4", text: "April"},
  {value: "5", text: "May"},
  {value: "6", text: "June"},
  {value: "7", text: "July"},
  {value: "8", text: "August"},
  {value: "9", text: "September"},
  {value: "10", text: "October"},
  {value: "11", text: "November"},
  {value: "12", text: "December"}
];

const SalesServiceHeadUpdate = Form.create()(({form}) => {
  const [kamList, setKAMList] = useState();
  const [salesHeadListById, setSalesHeadListById] = useState();
  const history = useHistory();

  let searchUrl = window.location.search;
  let params = new URLSearchParams(searchUrl);
  let rowId = params.get('row_id');

  const getSalesHeadListById = async (id) => {
    let url = SALES_SERVICE_HEAD + "/" + id;
    let res = await getData(url);
    
    if (res) {
      let masterData = res?.data?.data;
      setSalesHeadListById(masterData);
    }
  };

  const getKAMList = async () => {
    let url = USER_LIST ;
    let res = await getData(url);
    
    if (res) {
      let masterData = res?.data?.data;
      setKAMList(masterData);
    }
  };

  
  const localSubmit = (e) => {
    e.preventDefault();
    form.validateFields(async(err, values) => {
      if (!err) {
        let payload = {
          'new_kam_id': values.new_kam_id,
          'modify_effective_year': values.modify_effective_year,
          'modify_effective_month': values.modify_effective_month,
          // 'status': values.status
        }

        let url = SALES_SERVICE_HEAD + '/' + rowId;
        let res = await postData(url, payload);

        if (res) {
          let masterData = res?.data?.data;
          history.push('/sales-dashboard/config-sales-head-list');
          alertPop('success', 'Sales head updated successfully')
        }
      }
    })
  }

  useEffect(()=>{
    getKAMList();
  },[]);

  useEffect(()=>{
    getSalesHeadListById(rowId);
  },[rowId]);

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
                initialValue: salesHeadListById?.company?.name ? salesHeadListById?.company?.name : undefined
              })(<Input size="large" placeholder="Enter Company Name" disabled/>)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'Department'}>
              {form.getFieldDecorator('department_id', {
                rules: [{required: true, message: "Required!"}],
                initialValue: salesHeadListById?.department?.name ? salesHeadListById?.department?.name : undefined
              })(<Input size="large" placeholder="Enter Department Name" disabled/>)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={'Industry Type'}>
              {form.getFieldDecorator('industry_type_id', {
                rules: [{required: true, message: "Required!"}],
                initialValue: salesHeadListById?.industry_type?.name ? salesHeadListById?.industry_type?.name : undefined
              })(<Input size="large" placeholder="Enter Industry Type" disabled/>)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'Industry Sector'}>
              {form.getFieldDecorator('industry_sector_id', {
                rules: [{required: true, message: "Required!"}],
                initialValue: salesHeadListById?.industry_sector?.name ? salesHeadListById?.industry_sector?.name : undefined
              })(<Input size="large" placeholder="Enter Industry Sector" disabled/>)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={'Service Type'}>
              {form.getFieldDecorator('service_type_id', {
                rules: [{required: true, message: "Required!"}],
                initialValue: salesHeadListById?.service_type?.name ? salesHeadListById?.service_type?.name : undefined
              })(<Input size="large" placeholder="Enter Service Type" disabled/>)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'Service Name'}>
              {form.getFieldDecorator('service_id', {
                rules: [{required: true, message: "Required!"}],
                initialValue: salesHeadListById?.service?.full_name ? salesHeadListById?.service?.full_name : undefined
              })(<Input size="large" placeholder="Enter Service Name" disabled/>)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={'Client Name'}>
              {form.getFieldDecorator('client_id', {
                rules: [{required: true, message: "Required!"}],
                initialValue: salesHeadListById?.client?.name ? salesHeadListById?.client?.name : undefined
              })(<Input size="large" placeholder="Enter Client Name" disabled/>)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'Type'}>
              {form.getFieldDecorator('type', {
                rules: [{required: true, message: "Required!"}],
                initialValue: salesHeadListById?.type ? salesHeadListById?.type : undefined
              })(<Input size="large" placeholder="Enter Type" disabled/>)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label={'Kam'}>
              {form.getFieldDecorator('new_kam_id', {
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
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={'Year'}>
              {form.getFieldDecorator('modify_effective_year', {
                rules: [{required: true, message: "Required!"}],
              })(<Select 
                  size="large"
                  placeholder='Select Year'
                  showSearch
                  filterOption={(input, option) =>
                    option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0}
              >
                  {years.map(y => <Select.Option key={y} value={y}>{y}</Select.Option>)}
              </Select>)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'Month'}>
              {form.getFieldDecorator('modify_effective_month', {
                    rules: [{required: true, message: "Required!"}],
                })(<Select 
                    size="large"
                    placeholder='Select Month'
                    showSearch
                    filterOption={(input, option) =>
                      option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0}
                >
                    {months.map(m => <Select.Option key={m.value} value={m.text}>{m.text}</Select.Option>)}
                </Select>,
              )}
            </Form.Item>
          </Col>
        </Row>
        {/* <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={'Status'}>
              {form.getFieldDecorator('status', {
                  rules: [{required: true, message: "Required!"}],
                })(<Radio.Group >
                  <Radio value="1">Active</Radio>
                  <Radio value="0">Inactive</Radio>
                </Radio.Group>,
              )}
            </Form.Item>
          </Col>
        </Row> */}

        <div style={{ textAlign: 'right' }}>
          <Button
            style={{width: 'auto'}}
            // loading={loading}
            size="large"
            type="primary"
            htmlType="submit"
          >
            Update
          </Button>
        </div>
      </Form>
    </Wrapper>
  )
})

export default SalesServiceHeadUpdate;