import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import {
  PageHeader, Icon, Descriptions, Row, Col, Select, Collapse, Divider, Button, Radio, Input, Rate, Form 
} from "antd";
import {
  DEPARTMENT_LIST,
  EOM_WINGS_LIST,
  EOM_CATEGORY_LIST,
  USER_LIST,
  EOM_REASON_LIST,
  EOM_ATTRIBUTE_LIST,
  EOM_NOMINEE_CREATE
} from "../../../../scripts/api";
import {TableWrapper, Wrapper} from "../../../commons/Wrapper";
import {getData, postData} from "../../../../scripts/api-service";
import moment from 'moment';
// import {postData} from "../../../../scripts/postData";
import {alertPop} from "../../../../scripts/message";

let years = [],
    nextYear = moment().add(10, 'Y').format('YYYY');

    for (let i = 2010; i <= nextYear; i++) {
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

export default function NomineeCreate() {
  return <CreateForm />;
}

const CreateForm = Form.create()(({form}) => {

  const [departments, setDepartments] = useState();
  const [wings, setWings] = useState();
  const [eomCategory, setEOMCategory] = useState();
  const [kamList, setKAMList] = useState();
  const [selectDepartment, setSelectDepartment] = useState();
  const [selectCategory, setSelectCategory] = useState();
  const [reasonList, setReasonList] = useState();
  const [attributeList, setAttributeList] = useState();
  const [selectedYear, setSelectedYear] = useState(moment().format("YYYY"));
  const [selectedMonth, setSelectedMonth] = useState(moment().format("MMMM")); //by default previous month is selected.
  const history = useHistory();

  const getDepartments = async () => {
    let res  = await getData(DEPARTMENT_LIST);

    if (res) {
        let masterData = res?.data?.data;
        setDepartments(masterData);
    }
  }

  const getWings = async () => {
    let url = EOM_WINGS_LIST + '?';
    if(selectDepartment) url = url + 'department_id=' + selectDepartment;

    let res = await getData(url);
    if (res) {
        let masterData = res?.data?.data?.data;
        setWings(masterData);
    }
  }

  const getEOMCategory = async () => {
    let url = EOM_CATEGORY_LIST + '?';
    if(selectDepartment) url = url + 'department_id=' + selectDepartment;

    let res  = await getData(url);

    if (res) {
        let masterData = res?.data?.data?.data;
        setEOMCategory(masterData);
    }
  }

  const getKAMList = async () => {
    let url = USER_LIST + '?department_id=' + selectDepartment;
    let res = await getData(url);

    if (res) {
        let masterData = res?.data?.data || [];
        setKAMList(masterData);
    }
  }

  const getReasonList = async () => {
    let url = EOM_REASON_LIST + '?eom_category_id=' + selectCategory;
    let res = await getData(url);

    if (res) {
        let masterData = res?.data?.data?.data || [];
        setReasonList(masterData);
    }
  }

  const getAttributeList = async () => {
    let url = EOM_ATTRIBUTE_LIST + '?eom_category_id=' + selectCategory;
    let res = await getData(url);

    if (res) {
        let masterData = res?.data?.data?.data || [];
        setAttributeList(masterData);
    }
  }

  const localSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        let attribute = [];
        let reason = [];

        attributeList.forEach(item=> {

          let data = {
            "id": null,
            "eom_attribute_id": item.id,
            "score": values['attribute-' + item.id] || 0 
          }
          
          attribute.push(data);
        })
        
        reasonList.forEach(item=> {
          
          let data = {
            "id": null,
            "eom_reason_id": item.id,
            "checked": values['reason-' + item.id] || 0 
          }
          
          reason.push(data);
        })
        
        
        let payload = {
          "id": null,
          "department_id": values.department_id,
          "emp_id": values.emp_id,
          "eom_wing_id": values.eom_wing_id,
          "eom_category_id": values.eom_category_id,
          "month": values.month,
          "year": values.year, 
          "eom_reasons": reason,
          "eom_attributes": attribute,
          "key_achievement": values.key_achievement
        }

        submit(payload);
      }
    });
  };

  const submit = async(payload) =>{
    let res = await postData(`${EOM_NOMINEE_CREATE}`,payload);
    if (res) {
        let masterData = res?.data?.data;
        alertPop("success", "Successfully complete the process");
        history.push(`/supervisor-panel/nominee-list`);
    }
  }

  useEffect(()=>{
    getDepartments();
  },[]);

  useEffect(()=>{
    if(selectDepartment) {
      getKAMList();
      getWings();
      getEOMCategory();
    }
  },[selectDepartment]);

  useEffect(()=>{
    if(selectCategory){
      getReasonList();
      getAttributeList();
    } 
  },[selectCategory]);

  return (
    <Wrapper>
      <div style={{margin:'1remm'}}>
        {/* <PageHeader
          style={{
            border: '1px solid rgb(235, 237, 240)',
          }}
          // onBack={() => history.push(`/supervisor-panel/pa-fillup-list?emp_id=${kamId}`)}
          backIcon={<Icon type="left" />}
          title={`Employee Name: Hasibul Islam`}
          extra={[
            // getTotalCategory()
            <div>
              <p>Total Score(Out of 100) : <span id="category-score-total">0.00</span>/100</p>
              <p id="pa-score-status"> Excellent</p>
            </div>
          ]}
        >
          <Descriptions size="small" column={3}>
            <Descriptions.Item label="Department">Engineering</Descriptions.Item>
            <Descriptions.Item label="Designation">Software Specialist</Descriptions.Item>
          </Descriptions>
        </PageHeader> */}
        <Form 
          onSubmit={localSubmit}
        >
          <Row gutter={16} style={{margin: '1rem'}}>
            <Col span={8}>
              <Form.Item label={'Department Name'}>
                {form.getFieldDecorator('department_id', {
                    rules: [{required: true, message: "Required!"}],
                    // initialValue: nonBusiness ? activityDetails?.contact_person?.id : activityDetails?.client_department_id ? activityDetails?.client_department_id : undefined
                })(<Select 
                  // style={{width: '15%', 'marginRight': '1rem'}}
                  size="large"
                  showSearch
                  placeholder='Select Department'
                  dropdownMatchSelectWidth={false}
                  onChange={(value)=>setSelectDepartment(value)}
                  filterOption={(input, option) =>
                  option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
              >
                <Select.Option value="Department" label="Department Name">Department</Select.Option>
                  {departments?.map(dept=>{
                      return(
                          <Select.Option key={dept.id} value={dept.id}>{dept.name}</Select.Option>
                      )
                  })}
                </Select>)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={'Wings Name'}>
                {form.getFieldDecorator('eom_wing_id', {
                    rules: [{required: true, message: "Required!"}],
                    // initialValue: nonBusiness ? activityDetails?.contact_person?.id : activityDetails?.client_department_id ? activityDetails?.client_department_id : undefined
                })(<Select 
                  // style={{width: '15%', 'marginRight': '1rem'}} 
                  size="large"
                  showSearch
                  placeholder='Select Wings'
                  dropdownMatchSelectWidth={false}
                  // onChange={(value)=>setSelectDepartment(value)}
                  filterOption={(input, option) =>
                  option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
              >
                  {wings?.map(wing=>{
                    return(
                      <Select.Option key={wing.id} value={wing.id}>{wing.name}</Select.Option>
                    )
                  })}
                </Select>)}
            </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={'EOM Category Name'}>
                {form.getFieldDecorator('eom_category_id', {
                    rules: [{required: true, message: "Required!"}],
                    // initialValue: nonBusiness ? activityDetails?.contact_person?.id : activityDetails?.client_department_id ? activityDetails?.client_department_id : undefined
                })(<Select 
                  // style={{width: '15%', 'marginRight': '1rem'}} 
                  size="large"
                  showSearch
                  placeholder='Select Category'
                  dropdownMatchSelectWidth={false}
                  onChange={(value)=>setSelectCategory(value)}
                  filterOption={(input, option) =>
                  option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
              >
                  {eomCategory?.map(cat=>{
                      return(
                          <Select.Option key={cat.id} value={cat.id}>{cat.name}</Select.Option>
  
                      )
                  })}
                </Select>)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} style={{margin: '1rem'}}>
            <Col span={8}>
              <Form.Item label={'Employee Name'}>
                {form.getFieldDecorator('emp_id', {
                    rules: [{required: true, message: "Required!"}],
                    // initialValue: nonBusiness ? activityDetails?.contact_person?.id : activityDetails?.client_department_id ? activityDetails?.client_department_id : undefined
                })(<Select 
                  // style={{width: '15%', 'marginRight': '1rem'}} 
                  size="large"
                  showSearch
                  placeholder='Select Employee'
                  dropdownMatchSelectWidth={false}
                  // onChange={(value)=>setSelectKAM(value)}
                  filterOption={(input, option) =>
                  option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
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
            <Col span={8}>
              <Form.Item label={'Month'}>
                {form.getFieldDecorator('month', {
                    rules: [{required: true, message: "Required!"}],
                    initialValue: selectedMonth ? selectedMonth : undefined
                })(<Select 
                  // style={{width: '15%', 'marginRight': '1rem'}} 
                  size="large"
                  showSearch
                  placeholder='Select Month'
                  dropdownMatchSelectWidth={false}
                  // onChange={(value)=>setSelectDepartment(value)}
                  filterOption={(input, option) =>
                  option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
              >
                  {months.map(m => <Select.Option key={m.value} value={m.text}>{m.text}</Select.Option>)}
                </Select>)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={'Year'}>
                {form.getFieldDecorator('year', {
                    rules: [{required: true, message: "Required!"}],
                    initialValue: selectedYear ? selectedYear : undefined
                })(<Select 
                  // style={{width: '15%', 'marginRight': '1rem'}} 
                  size="large"
                  showSearch
                  placeholder='Select Year'
                  dropdownMatchSelectWidth={false}
                  // onChange={(value)=>setSelectDepartment(value)}
                  filterOption={(input, option) =>
                  option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
              >
                  {years.map(y => <Select.Option key={y} value={y}>{y}</Select.Option>)}
                </Select>)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} style={{margin: '1rem'}}>
            <Col span={12}>
              <Collapse
                defaultActiveKey={['1']}
                // onChange={callback}
                expandIconPosition='right'
              >
                <Collapse.Panel header="Reason" key="1">
                {reasonList ?
                  reasonList.map((reason) => {
                    return(
                      <>
                        <Row gutter={16}>
                          <Col span={12}><p>{reason.name}</p></Col>  
                          <Col span={12}>
                            <Form.Item >
                              {form.getFieldDecorator(`reason-${reason.id}`,{
                                rules: [{required: true, message: "Required!"}],
                              })(
                                <Radio.Group 
                                  // onChange={this.onChange} 
                                  // value={this.state.value}
                                  style={{float:'right'}}
                                >
                                  <Radio value={1}>Yes</Radio>
                                  <Radio value={0}>No</Radio>
                                </Radio.Group>,
                              )}
                            </Form.Item>
                          </Col>  
                        </Row>
                        <Divider className="m-2"/>
                      </>
                    ) 
                  })
                : <p>Please select a category</p>}
                </Collapse.Panel>
              </Collapse>
              <Collapse
                defaultActiveKey={['1']}
                // onChange={callback}
                expandIconPosition='right'
                style={{marginTop: '1rem'}}
              >
                <Collapse.Panel header="Key Achievement" key="1">
                  <Form.Item >
                    {form.getFieldDecorator('key_achievement',{
                      rules: [{required: true, message: "Required!"}],
                    })(
                      <Input.TextArea rows={4} placeholder="Write Key Achievements"/>
                    )}
                  </Form.Item>
                </Collapse.Panel>
              </Collapse>
            </Col>
            <Col span={12}>
              <Collapse
                defaultActiveKey={['1']}
                // onChange={callback}
                expandIconPosition='right'
              >
                <Collapse.Panel header="Attributes Scale" key="1">
                  {attributeList?.length > 0 ?
                    attributeList?.map(attribute =>{
                      return(
                        <>
                          <Row gutter={16}>
                            <Col span={6}><p>{attribute.name}</p></Col>  
                            <Col span={18}>
                            <Form.Item >
                                {form.getFieldDecorator(`attribute-${attribute.id}`,{
                                rules: [{required: true, message: "Required!"}],
                              })(
                                  <Rate count={10} style={{float:'right'}}/>
                                )}
                              </Form.Item>
                            </Col>  
                          </Row>
                          <Divider />
                        </>
                      )
                    })
                  :
                  <p>Please select a category</p>}
                </Collapse.Panel>
              </Collapse>
            </Col>
          </Row>
          <Divider />
          <Button 
            style={{float:'right', margin:'1rem'}}
            type="primary" 
            htmlType="submit"
          >Submit Now
          </Button>
        </Form>
      </div>
    </Wrapper>
  )
});
