import React, { Fragment, useState, useEffect } from "react";
import { Input, Collapse, Row, Col, Select, Checkbox, Form, Button } from "antd";
import { alertPop } from "../../../../../scripts/message";
import { postData, getData } from "../../../../../scripts/api-service";
import { PA_CRITERIA_CONFIGURATION_LIST } from "../../../../../scripts/api";

const stepFour = Form.create()(
  ({ form, departments, selectedDepartment, selectDepartment, categoryList, subCategoryList, criteriaList, current, fourthSubmit, steps, subCriteriaList, subCriteriaConfigList, context, departmentValue, paTypeValue, criteriaConfigList }) => {

    const [department, setDepartment] = useState();
    const [status, setStatus] = useState(0);
    const [criteriaConfig, setCriteriaConfig] = useState();
    // const [criteriaConfigList, setCriteriaConfigList] = useState();

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

    const handelCriteriaChecked = (checked, subCriteria) => {
      if (subCriteriaList?.length) {
        subCriteriaList.forEach(subCri => {
          if (subCriteria.id === subCri.id) {
            subCri.isChecked = checked;
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

    const criteriaSum = (event, cri, subCri) =>{
      let criteria = criteriaConfig;

      if (subCriteriaList?.length) {
        subCriteriaList.forEach(cat => {
          if (cat?.pa_criteria_id === cri.pa_criteria_id) {
            if (cat?.id === subCri.id) {
              // cat.weight = parseInt(event) || 0;
              cat.weight = Number(event) || 0;
            }
          }
        })
      }
    }

    const categoryName = (cri) =>{
      if (categoryList?.length && cri?.pa_category_config_id) {
        let findCat = categoryList.find(cat => cat.id === cri?.pa_category_config_id);

        if (findCat?.name) return findCat?.name;
        else return "N/A";
      }
    }

    const departmentName = () =>{
      let name = "";
      departments.forEach(dept=>{
        if(dept.id === departmentValue) {
          name = dept.name;
        }
      })
      return name;
    }

    const SubCategoryName = (cri) =>{
      if (subCategoryList?.length && cri?.pa_sub_category_config_id) {
        let findSubcat = subCategoryList.find(sucat => sucat.id === cri.pa_sub_category_config_id);

        if (findSubcat?.name) return findSubcat?.name;
        else return "N/A"; 
      }
    }

    const subCriteriaName = (cri, subCri) =>{
      if(cri && subCri){
        if(cri.pa_criteria_id === subCri.pa_criteria_id) return subCri.name;
        // else return alertPop("error", "Criteria Id or Sub Criteria Id not found!");
      }
      // else {
      //   return alertPop("error", "Criteria list or Sub Criteria list not found!");
      // }
    }

    const findCriSum = (criId) => {
      let result = 0;
      if (subCriteriaList?.length > 0) {
        subCriteriaList.forEach(subCri => {
          if (subCri?.pa_criteria_id === criId) {
            result +=  subCri?.weight || 0;
          }
        })
      }
      
      return result;
    }

    const fields = (cri) => {
      const children = [];
      for (let subCriteria = 0; subCriteria < subCriteriaList.length; subCriteria++) {
          // {console.log("cri>>>",cri.id)}
          // {console.log("subCri>>>",subCriteriaList[subCriteria].pa_criteria_id)}
          if(cri.pa_criteria_id === subCriteriaList[subCriteria].pa_criteria_id){
            children.push(
              <>
                {cri.weight ?
                <>
                <Row gutter={16} style={{display:'flex', alignItems:'center'}}>
                  <Col span={12}>
                    <Form.Item >
                      {form.getFieldDecorator(`status-${subCriteria}`, {
                          // rules: [{required: true, message: "Required!"}],
                          // initialValue: calculateStatus(subCriteriaConfigList, subCriteriaList[subCriteria])
                      })(<Checkbox 
                          onChange={(e)=>{
                              handelCriteriaChecked(e.target.checked, subCriteriaList[subCriteria]);
                            }} 
                          checked={subCriteriaList[subCriteria].isChecked}>{subCriteriaName(cri, subCriteriaList[subCriteria])}</Checkbox>)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item >
                      {form.getFieldDecorator(`weight-${subCriteria}`, {
                          rules: [{pattern: /^[0-9]\d*(\.\d+)?$/,message: "Please enter a valid number"}],
                          // rules: [{required: true, message: "Required!"}],
                          // initialValue: calculateWeight(subCriteriaConfigList, subCriteriaList[subCriteria])
                      })(<Input size="medium" 
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                          let value = event.currentTarget.value;
                          criteriaSum(value, cri, subCriteriaList[subCriteria])}}/>)
                        }
                      {/* (event)=>criteriaSum(event, subCat) */}
                    </Form.Item>
                  </Col>
                  <Form.Item >
                      {form.getFieldDecorator(`id-${subCriteria}`, {
                          // rules: [{required: true, message: "Required!"}],
                          initialValue: subCriteriaList[subCriteria]?.id || null
                      })(<Input size="medium" hidden/>)}
                    </Form.Item>
                    <Form.Item >
                      {form.getFieldDecorator(`pa_category_config_id-${subCriteria}`, {
                          // rules: [{required: true, message: "Required!"}],
                          initialValue: subCriteriaList[subCriteria]?.pa_category_id
                      })(<Input size="medium" hidden/>)}
                    </Form.Item>
                    <Form.Item >
                      {form.getFieldDecorator(`pa_sub_category_config_id-${subCriteria}`, {
                          // rules: [{required: true, message: "Required!"}],
                          initialValue: subCriteriaList[subCriteria]?.pa_sub_category_id
                      })(<Input size="medium" hidden/>)}
                    </Form.Item>
                    <Form.Item >
                      {form.getFieldDecorator(`pa_criteria_id-${subCriteria}`, {
                          // rules: [{required: true, message: "Required!"}],
                          initialValue: subCriteriaList[subCriteria]?.pa_criteria_id
                      })(<Input size="medium" hidden/>)}
                    </Form.Item>
                    <Form.Item >
                      {form.getFieldDecorator(`pa_sub_criteria_id-${subCriteria}`, {
                          // rules: [{required: true, message: "Required!"}],
                          initialValue: subCriteriaList[subCriteria]?.id
                      })(<Input size="medium" hidden/>)}
                    </Form.Item>
                </Row>
                <hr style={{margin:'1rem 0'}}/>
                </>:null}
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
        if (!err) {
          let content = [];
          for(let cri=0; cri < criteriaConfigList.length; cri++){
            if(criteriaConfigList[cri].weight){
              for(let subCriteria=0; subCriteria < subCriteriaList.length; subCriteria++){
                if(criteriaConfigList[cri].pa_criteria_id === subCriteriaList[subCriteria].pa_criteria_id){
                  if(values[`weight-${subCriteria}`]){
                    let vData = {
                      "id": null,
                      "pa_category_config_id": values[`pa_category_config_id-${subCriteria}`],
                      "pa_sub_category_config_id": values[`pa_sub_category_config_id-${subCriteria}`],
                      "pa_criteria_config_id":  criteriaConfigList[cri].id,
                      "pa_sub_criteria_id":  values[`pa_sub_criteria_id-${subCriteria}`],
                      "weight": values[`weight-${subCriteria}`] * 1,
                      "status": values[`status-${subCriteria}`] * 1
                    };
                    content.push(vData);
                  }
                }
              }
            }
          }
          let payload = {
            "department_id" : departmentValue,
            "pa_type_id" : paTypeValue,
            "data": content
          }
          fourthSubmit(payload);
        }
      });
    }

    // const getCriteriaConfigList = async () => {
    //   let res = await getData(PA_CRITERIA_CONFIGURATION_LIST + `?department_id=${departmentValue}`);
  
    //   if (res) {
    //     setCriteriaConfigList(res?.data?.data);
    //   }
    // };

    useEffect(()=>{
      // if(departmentValue) getCriteriaConfigList();
      if(departments && departmentValue) departmentName();
    },[departmentValue, departments]);

    return(
        <Fragment>          
          {steps[current].id === 4 ?
          <div>
          <Row style={{border: '1px solid #E8E8E8', padding : '1rem', margin : '1rem 0px', borderRadius: '5px'}}>
            <Col span={24}>
              <p>Department Name: <strong>{departmentName()}</strong></p>
            </Col>
            {/* <Col span={12}>
              <p>Category Name</p>
              <strong>{categoryName()}</strong>
            </Col> */}
          </Row>
          <Row gutter={16}>
              <p>Select Sub Criteria</p>
              {criteriaConfigList ? 
              criteriaConfigList.map(cri=>{
                return(
                  <Form 
                    // id='third-submit'
                    onSubmit={localSubmit}
                  >
                    <Col span={24} className="mt-2 mb-2">
                    {cri.weight ? 
                      <Collapse
                          defaultActiveKey={1}
                          expandIconPosition='right'
                          bordered="true"
                          >
                          <Collapse.Panel 
                              header={
                                <>
                                  <p>Category: {categoryName(cri)}</p>
                                  <p>Sub-Category: {SubCategoryName(cri)}</p>
                                  <div style={{display:'flex', justifyContent:"space-between"}}>
                                      <p className="mt-2">Criteria: {cri.criteria?.name}</p>
                                      <p className="mt-2 ml-5">Total Weight : {findCriSum(cri.pa_criteria_id)}/{cri?.weight}</p>
                                  </div>
                                </>
                              } 
                              key={1}
                          >
                              <Fragment>
                              {fields(cri)}
                            </Fragment>
                          </Collapse.Panel>
                      </Collapse>
                    :null }
                    </Col>
                    <Button type="primary" htmlType="submit" id="fourth-click" hidden/>
                </Form>
              )}):null}
          </Row>
          </div>
          :null}
        </Fragment>
    )
})

export default stepFour;