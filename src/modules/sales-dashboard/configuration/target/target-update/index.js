import React, { useEffect, useState } from 'react'
import {InputNumber, Input, Radio, Col, Row, Select, DatePicker, Checkbox, Form, Icon, Button, PageHeader } from "antd";
import { useHistory } from 'react-router-dom';
import { Wrapper } from "../../../../commons/Wrapper";
import {
  SALES_TARGET_DROPDOWN_LIST,
  SALES_TARGET
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

const SalesTargetUpdate = Form.create()(({form}) => {
  const [loading, setLoading] = useState();
  const [salesServiceHeadList, setSalesServiceHeadList] = useState();
  const [targetListById, setTargetListById] = useState({});
  const history = useHistory();

  let searchUrl = window.location.search;
  let params = new URLSearchParams(searchUrl);
  let rowId = params.get('row_id');

  
  const getSalesServiceHeadList = async () => {
    let res  = await getData(SALES_TARGET_DROPDOWN_LIST);

    if (res) {
      let masterData = res.data?.data;
      setSalesServiceHeadList(masterData);
    }
  }

  const getTargetListById = async (id) => {
    let url = SALES_TARGET + "/" + id;
    let res  = await getData(url);

    if (res) {
      let masterData = res.data?.data;
      handleTarget(masterData);
      setTargetListById(masterData);
    }
  }

  const handleTarget = (list) =>{
    if(list?.sales_month_targets?.length){
      let currentYear = moment().format("Y");
      let currentMonth = moment().format("M");

      list.sales_month_targets.forEach(item=>{
        if(item.year < currentYear) item.disable = true;
        else if(item.year === currentYear){
          let getMonth = moment().month(item.month).format("M");
          if(parseInt(getMonth) <= parseInt(currentMonth)) item.disable = true;
          else item.disable = false;
        }
        else item.disable = false;
      })
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

        
        const url = SALES_TARGET + "/" + rowId;
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

  
  useEffect(() => {
    getTargetListById(rowId);
  }, [rowId]);

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
                initialValue: targetListById?.service_head_id ? targetListById?.service_head_id : undefined
              })(<Select 
                  size="large"
                  showSearch
                  getPopupContainer={trigger => trigger.parentNode}
                  placeholder='Select Service Head' 
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  disabled
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
                initialValue: targetListById?.year ? targetListById?.year : undefined
              })(<Select 
                  allowClear={false}
                  placeholder="Year"
                  size="large"
                  showSearch       
                  filterOption={(input, option) =>
                    option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0}
                  disabled
              >
                  {years.map(y => <Select.Option key={y} value={y}>{y}</Select.Option>)}
              </Select>)}
            </Form.Item>
          </Col>
          {/* <Col span={4}>
            <Form.Item label={'Status'}>
              {form.getFieldDecorator('status', {
                  rules: [{required: true, message: "Required!"}],
                  initialValue: targetListById?.status ? targetListById?.status : undefined
                })(<Select 
                  size="large"
                  showSearch
                  getPopupContainer={trigger => trigger.parentNode}
                  placeholder='Select Status' 
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  disabled
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
          {targetListById?.sales_month_targets?.map((month, index)=>{
            return(
              <Row gutter={24} className="m-1" key={`monthly-data-${index}`}>
                <Col span={8}>
                  <Form.Item>
                    {form.getFieldDecorator(`month-${index}`, {
                    })(<Input size="large" placeholder={month.month} disabled/>)}
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <Form.Item>
                    {form.getFieldDecorator(`target-amount-${index+1}`, {
                      rules: [{required: true, message: "Required!"}],
                      initialValue: month?.target_amount ? month?.target_amount : undefined
                    })
                      (<InputNumber 
                          size="large"
                          placeholder="Target value can be BDT 1000000 maximum" 
                          style={{width: "100%"}} 
                          min={0} 
                          max={1000000} 
                          disabled={month.disable}
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
            Update
          </Button>
        </div>
      </Form>
    </Wrapper>
  )
})

export default SalesTargetUpdate;
