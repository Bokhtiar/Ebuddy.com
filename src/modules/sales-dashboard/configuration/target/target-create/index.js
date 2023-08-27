import React, { useEffect, useState } from 'react'
import {InputNumber, Input, Radio, Col, Row, Select, DatePicker, Checkbox, Form, Icon, Button, PageHeader } from "antd";
import { useHistory } from 'react-router-dom';
import { Wrapper } from "../../../../commons/Wrapper";
import { Flex } from "../../../../commons/Flex";
import {
  SALES_TARGET_DROPDOWN_LIST,
  SALES_TARGET
} from "../../../../../scripts/api";
import {getData,postData} from "../../../../../scripts/api-service";
import { alertPop } from "../../../../../scripts/message";
import moment from 'moment';

let years = [],
  nextYear = moment().add(4, 'Y').format('YYYY');

for (let i = 2000; i <= nextYear; i++) {
  if(i >= moment().year()){
    years.push(i.toString());
  }
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

const SalesTargetCreate = Form.create()(({form}) => {
  const [loading, setLoading] = useState();
  const [salesServiceHeadList, setSalesServiceHeadList] = useState();
  const [targetAmount, setTargetAmount] = useState({});
  const history = useHistory();

  const getSalesServiceHeadList = async () => {
    let res  = await getData(SALES_TARGET_DROPDOWN_LIST);

    if (res) {
      let masterData = res.data?.data;
      setSalesServiceHeadList(masterData);
    }
  }

  const localSubmit = (e) => {
    e.preventDefault();
    form.validateFields(async(err, values) => {
      if (!err) {
        let targetArray = [];

        months.forEach(month=>{
          targetArray.push({
            "month": month.text,
            "target_amount": values[`target-amount-${parseInt(month.value)}`]
          })
        })

        let payload = {
          'service_head_id': values.service_head_id,
          'year': values.year * 1,
          // 'status': values.status * 1,
          'target': targetArray
        }

        const url = SALES_TARGET;
        let res = await postData(url, payload);

        if (res) {
          alertPop("success", "Successfully complete the process");
          setLoading(false);
          form.resetFields();
          history.push(`/sales-dashboard/config-sales-target-list`);
        }
        else setLoading(false);
      }
    });
  };

  
  useEffect(() => {
    getSalesServiceHeadList();
  }, []);

  return (
    <Wrapper>
      <PageHeader
        style={{
          border: '1px solid rgb(235, 237, 240)',
        }}
        onBack={() => history.push(`/sales-dashboard/config-sales-target-list`)}
        subTitle="Back to list"
      />
      <Form 
        onSubmit={localSubmit}
        style={{margin: '1rem'}}
      >
        <Row gutter={16}>
          <Col span={20}>
            <Form.Item label={'Sales Service Head'}>
              {form.getFieldDecorator('service_head_id', {
                rules: [{required: true, message: "Required!"}],
              })(<Select 
                  size="large"
                  showSearch
                  getPopupContainer={trigger => trigger.parentNode}
                  placeholder='Select Service Head' 
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {salesServiceHeadList?.map(head=>{
                    return(
                      <Select.Option key={head.id} value={head.id}>{head.name}</Select.Option>
                    )
                  })}
              </Select>)}
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label={'Year'}>
              {form.getFieldDecorator('year', {
                rules: [{required: true, message: "Required!"}],
                initialValue: moment().format("YYYY") || undefined
              })(<Select 
                  allowClear={false}
                  placeholder="Year"
                  size="large"
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
          {/* <Col span={4}>
            <Form.Item label={'Status'}>
              {form.getFieldDecorator('status', {
                  rules: [{required: true, message: "Required!"}],
                })(<Select 
                  size="large"
                  showSearch
                  getPopupContainer={trigger => trigger.parentNode}
                  placeholder='Select Status' 
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Select.Option key={1} value={1}>Active</Select.Option>
                  <Select.Option key={0} value={0}>Inactive</Select.Option>
              </Select>,
              )}
            </Form.Item>
          </Col> */}
        </Row>

        <Row gutter={24} style={{border: '1px solid #D9D9D9', borderRadius: '5px', margin: '0.05rem'}}>
          <Row gutter={24} className="mx-1 my-3">
            <Col span={8} style={{backgroundColor:'#F1F1F1'}}>
              MONTH
            </Col>
            <Col span={16} style={{backgroundColor:'#F1F1F1'}}>
              Target (AMOUNT IN BDT)
            </Col>
          </Row>
          {months?.map((month, index)=>{
            return(
              <Row gutter={24} className="m-1" key={`monthly-data-${index}`}>
                <Col span={8}>
                  <Form.Item>
                    {form.getFieldDecorator(`month-${index}`, {
                    })(<Input size="large" placeholder={month.text} disabled/>)}
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <Form.Item>
                    {form.getFieldDecorator(`target-amount-${index+1}`, {
                      rules: [{required: true, message: "Required!"}],
                    })
                      (<InputNumber 
                          size="large"
                          placeholder="Target value can be BDT 1000000 maximum" 
                          style={{width: "100%"}} 
                          min={0}
                          max={1000000} 
                          // onChange={(value) => setTargetAmount(prevState => ({
                          //   ...prevState,
                          //   [`target-amount-${index+1}`]: parseInt(value || 0)
                          // }))}
                        />)}
                  </Form.Item>
                </Col>
              </Row>
            )
          })}
        </Row>

        <div style={{ textAlign: 'right' }}>
          <Button
            style={{margin: "1rem"}}
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

export default SalesTargetCreate;