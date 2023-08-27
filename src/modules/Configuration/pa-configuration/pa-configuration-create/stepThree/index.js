import React, { Fragment, useState, useEffect } from "react";
import { Input, Collapse, Row, Col, Select, Checkbox, Form, Button } from "antd";
import { alertPop } from "../../../../../scripts/message";

const stepThree = Form.create()(
  ({ form, departments, paTypeList, selectedDepartment, selectDepartment, categoryList, subCategoryList, criteriaList, current, thirdSubmit, steps, criteriaConfigList, context, previous }) => {

    const [department, setDepartment] = useState();
    const [selectedPA, setSelectedPA] = useState();
    const [status, setStatus] = useState(0);
    const [criteriaConfig, setCriteriaConfig] = useState();

    const checkStatus = (status) =>{
      return status * 1;
    }

    const calculateWeight = (configList, criteriaItem) =>{
      if(configList){
        for(let config=0; config < configList.length; config++){
          if(configList[config]?.id === criteriaItem?.id) return configList[config].weight;
        }
      }
    }

    const handelCriteriaChecked = (checked, criteria) => {
      if (criteriaList?.length) {
        criteriaList.forEach(cri => {
          if (criteria.id === cri.id) {
            cri.isChecked = checked;
          }
        })
      }
    }

    const calculateStatus = (configList, criteriaItem) =>{
      if(configList){
        for(let config=0; config < configList.length; config++){
          if(configList[config]?.id === criteriaItem?.id) return 1;
        }
      }
    }

    const criteriaSum = (event, subCat, crite) =>{
      if (criteriaList?.length) {
        criteriaList.forEach(cat => {
          if (cat?.pa_sub_category_id === subCat.id) {
            if (cat?.id === crite.id) {
              // cat.weight = parseInt(event) || 0;
              cat.weight = Number(event) || 0;
            }
          }
        })
      }
    }

    const categoryName = () =>{
      if(categoryList && criteriaList){
        for(let criteria = 0; criteria < criteriaList.length; criteria++){
          for(let cat = 0; cat < categoryList.length; cat++){
            if(criteriaList[criteria].pa_category_id === categoryList[cat].id){
              return categoryList[cat].name;
            }
          }
        }
      }
    }

    const criteriaName = (subCat, criteria) =>{
      if(subCat && criteria){
        if(subCat.id === criteria.pa_sub_category_id) return criteria.name;
        // else return alertPop("error", "Sub Category Id or Criteria Id not found!");
      }
    }

    const findCriSum = (subCatId) => {
      let result = 0;
      if (criteriaList?.length > 0) {
        criteriaList.forEach(criter => {
          if (criter?.pa_sub_category_id === subCatId) {
            result +=  criter?.weight || 0;
          }
        })
      }
      
      return result;
    }

    const fields = (subCat) => {
      const children = [];
      // console.log("criteriaList>>>",criteriaList);
      for (let criteria = 0; criteria < criteriaList.length; criteria++) {
          if(subCat.id === criteriaList[criteria].pa_sub_category_id){
            children.push(
              <>
              <Row gutter={16} style={{display:'flex', alignItems:'center'}}>
                <Col span={12}>
                  <Form.Item >
                    {form.getFieldDecorator(`status-${criteria}`, {
                        // rules: [{required: true, message: "Required!"}],
                        // initialValue: calculateStatus(criteriaConfigList, criteriaList[criteria])
                    })(<Checkbox 
                        onChange={(e)=>{
                            handelCriteriaChecked(e.target.checked, criteriaList[criteria]);
                          }} 
                        checked={criteriaList[criteria].isChecked}>{criteriaName(subCat, criteriaList[criteria])}</Checkbox>)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item >
                    {form.getFieldDecorator(`weight-${criteria}`, {
                        rules: [{pattern: /^[0-9]\d*(\.\d+)?$/,message: "Please enter a valid number"}],
                        // initialValue: calculateWeight(criteriaConfigList, criteriaList[criteria])
                    })(<Input size="medium" 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        let value = event.currentTarget.value;
                        criteriaSum(value, subCat, criteriaList[criteria])}}/>)
                      }
                    {/* (event)=>criteriaSum(event, subCat) */}
                  </Form.Item>
                </Col>
                <Form.Item >
                    {form.getFieldDecorator(`id-${criteria}`, {
                        // rules: [{required: true, message: "Required!"}],
                        initialValue: criteriaList[criteria]?.id || null
                    })(<Input size="medium" hidden/>)}
                  </Form.Item>
                  <Form.Item >
                    {form.getFieldDecorator(`pa_category_config_id-${criteria}`, {
                        // rules: [{required: true, message: "Required!"}],
                        initialValue: criteriaList[criteria]?.pa_category_id
                    })(<Input size="medium" hidden/>)}
                  </Form.Item>
                  <Form.Item >
                    {form.getFieldDecorator(`pa_sub_category_config_id-${criteria}`, {
                        // rules: [{required: true, message: "Required!"}],
                        initialValue: criteriaList[criteria]?.pa_sub_category_id
                    })(<Input size="medium" hidden/>)}
                  </Form.Item>
                  <Form.Item >
                    {form.getFieldDecorator(`pa_criteria_id-${criteria}`, {
                        // rules: [{required: true, message: "Required!"}],
                        initialValue: criteriaList[criteria]?.id
                    })(<Input size="medium" hidden/>)}
                  </Form.Item>
              </Row>
              <hr style={{margin:'1rem 0'}}/>
              </>,
            );
          }
        // }
      }
      return children;
    }

    const localSubmit = (event) =>{
      event.preventDefault();
      form.validateFields((err, values) => {
        if (!err && department) {
          let content = [];
          for(let i=0; i < criteriaList.length; i++){
            if(values[`weight-${i}`]){
              let vData = {
                "id": null,
                "pa_category_config_id": values[`pa_category_config_id-${i}`],
                "pa_sub_category_config_id": values[`pa_sub_category_config_id-${i}`],
                "pa_criteria_id":  values[`pa_criteria_id-${i}`],
                "weight": values[`weight-${i}`] * 1,
                "status": values[`status-${i}`] * 1
              };
              content.push(vData);
            }
          }
          let payload = {
            "department_id" : department,
            "pa_type_id": selectedPA,
            "data": content
          }
          thirdSubmit(payload);
        } else {
          previous();
          if (!department) alertPop("error", "Department is required!")
        }
      });
    }

    return(
        <Fragment>
          {(steps[current].id === 3 || steps[current].id === 4)?
          <div style={{display: current === 2 ? 'block' : 'none'}}>
          <Row gutter={16}>
          <Col span={18}>
              <p>Department Name</p>
              <Select 
                  allowClear={true}
                  style={{width: '100%', 'margin': '0.5rem 0rem'}} 
                  showSearch
                  placeholder='Select Department'
                  value={department ||  undefined }
                  onChange={(value)=>setDepartment(value)}
                  filterOption={(input, option) =>
                  option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
              >   
                  {
                    departments?.length ? 
                      departments.map(dep => <Select.Option value={dep.id} key={dep.id}>{dep.name}</Select.Option>) : ''
                  }
              </Select>
          </Col>
          <Col span={6}>
              <p>PA Type</p>
              <Select 
                  allowClear={true}
                  style={{width: '100%', 'margin': '0.5rem 0rem'}} 
                  showSearch
                  placeholder='Select PA Type'
                  value={selectedPA ? selectedPA : undefined }
                  onChange={(value)=>setSelectedPA(value)}
                  filterOption={(input, option) =>
                  option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
              >   
                  {
                    paTypeList?.length ? 
                      paTypeList.map(pa => <Select.Option value={pa.id} key={pa.id}>{pa.name}</Select.Option>) : ''
                  }
              </Select>
          </Col>
          </Row>
          <Row gutter={16}>
              <p>Select Criteria</p>
              {/* {console.log("subCategor/yList>>>",subCategoryList)} */}
              {subCategoryList ? 
              subCategoryList.map(subCat=>{
                return(
                  <Form 
                    // id='third-submit'
                    onSubmit={localSubmit}
                  >
                    <Col span={24} className="mt-2 mb-2">
                      <Collapse
                        defaultActiveKey={1}
                        expandIconPosition='right'
                        bordered="true"
                        >
                        <Collapse.Panel 
                            header={
                              <>
                                <p>Category: {subCat?.category?.name}</p>
                                <div style={{display:'flex', justifyContent:"space-between"}}>
                                    <p className="mt-2">Sub-Category: {subCat.name}</p>
                                    <p className="mt-2 ml-5">Total Weight : {findCriSum(subCat.id)}/{subCat?.weight}</p>
                                </div>
                              </>
                            } 
                            key={1}
                        >
                            <Fragment>
                            {fields(subCat)}
                          </Fragment>
                        </Collapse.Panel>
                    </Collapse>
                    </Col>
                    <Button type="primary" htmlType="submit" id="third-click" hidden/>
                </Form>
              )}):null}
          </Row>
          </div>
          :null}
        </Fragment>
    )
})

export default stepThree;