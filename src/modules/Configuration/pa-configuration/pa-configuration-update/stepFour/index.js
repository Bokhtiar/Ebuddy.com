import React, { Fragment, useState, useEffect } from "react";
import { Input, Collapse, Row, Col, Select, Checkbox, Form, Button } from "antd";
import { alertPop } from "../../../../../scripts/message";
import { postData, getData } from "../../../../../scripts/api-service";
import { PA_CRITERIA_CONFIGURATION_LIST, PA_SUB_CRITERIA_CONFIGURATION_LIST } from "../../../../../scripts/api";

const stepFour = Form.create()(
  ({ form, departments, selectedDepartment, selectDepartment, categoryList, subCategoryList, criteriaList, current, fourthSubmit, steps,
      subCriteriaList, setSubCriteriaList, subCriteriaConfigList, context, departmentValue, criteriaUpdated, paTypeValue }) => {

    const [criteriaConfigList, setCriteriaConfigList] = useState();
    const [subCriteriaConfig, setSubCriteriaConfig] = useState();
    const [count, setCount] = useState(1);

    let searchUrl = window.location.search;
    let params = new URLSearchParams(searchUrl);
    let paramsPATypeIName = params.get('paTypeName');

    const calculateWeight = (configList, subCriteriaItem) =>{
      if(configList){
        for(let config=0; config < configList.length; config++){
          if(configList[config]?.pa_sub_criteria_id === subCriteriaItem?.id) return configList[config].weight;
        }
      }
    }

    const handelCriteriaChecked = (checked, subCriteria) => {
      if (subCriteriaList?.length) {
        subCriteriaList.forEach(subCri => {
          if (subCriteria.id === subCri.id) {
            subCri.status = checked;
          }
        })
      }

      setSubCriteriaList([...subCriteriaList]);

      if (checked) {
        let data = {
          pa_category_config_id: subCriteria.pa_category_id,
          pa_criteria_config_id: subCriteria.pa_criteria_id,
          pa_sub_category_config_id: subCriteria.pa_sub_category_id,
          pa_sub_criteria_id: subCriteria.id,
          sub_criteria: subCriteria,
          isChecked: true,
          status: 1
        };

        let findIdx = subCriteriaConfig.findIndex( c => c.pa_sub_criteria_id === subCriteria.id );

        if (findIdx === -1) {
          setSubCriteriaConfig(oldArray => [...oldArray, data]); 
        }
      } else {
        let idx = subCriteriaConfig.findIndex( c => c.pa_sub_criteria_id === subCriteria.id && c.created_at == undefined );
        
        if (idx !== -1) {
          // assigning the list to temp variable
          const temp = [...subCriteriaConfig];

          // removing the element using splice
          temp.splice(idx, 1);
          setSubCriteriaConfig(temp);
        }
      }
    }

    const calculateStatus = (configList, subCriteriaItem) =>{
      if(configList){
        for(let config=0; config < configList.length; config++){
          if(configList[config]?.pa_sub_criteria_id === subCriteriaItem?.id) {
            // console.log("configList[config]?.pa_sub_criteria_id", configList[config]?.pa_sub_criteria_id);
            // console.log("subCriteriaItem?.id", subCriteriaItem?.id);
            return 'checked';
          }
        }
      }
    }

    const criteriaSum = (event, cri, subCri) =>{
      if (subCriteriaConfig?.length) {
        subCriteriaConfig.forEach(cat => {
          // if (cat?.pa_criteria_config_id === cri.id) {
            if (cat?.pa_sub_criteria_id === subCri.id) {
              // cat.weight = parseInt(event) || 0;
              cat.weight = Number(event) || 0;
            }
          // }
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

    const SubCategoryName = (cri) =>{
      if (subCategoryList?.length && cri?.pa_sub_category_config_id) {
        let findSubcat = subCategoryList.find(sucat => sucat.id === cri.pa_sub_category_config_id);

        if (findSubcat?.name) return findSubcat?.name;
        else return "N/A"; 
      }
    }

    const findCriSum = (criId, cri) => {
      let result = 0;
      if (subCriteriaConfig?.length > 0) {
        subCriteriaConfig.forEach(subCri => {
          if (subCri?.sub_criteria?.pa_criteria_id === cri.pa_criteria_id) {
            result +=  subCri?.weight || 0;
          }
        })
      }
      
      return result;
    }

    const fields = (cri) => {
      const children = [];
      // let criteriaArray = [];
      // let subCriteriaArray = [];
      for (let subCriteria = 0; subCriteria < subCriteriaList.length; subCriteria++) { 
        // criteriaArray.push(subCriteriaList[subCriteria].pa_criteria_id);
          if(cri.pa_criteria_id === subCriteriaList[subCriteria].pa_criteria_id){
            children.push(
              <>
                {cri.weight ?
                <>
                <Row gutter={16} style={{display:'flex', alignItems:'center'}}>
                  <Col span={12}>
                    {/* {console.log("subCriteriaList[subCriteria].isChecked",subCriteriaList[subCriteria].isChecked)} */}
                    <Form.Item >
                      {form.getFieldDecorator(`status-${subCriteria}`, {
                          // rules: [{required: true, message: "Required!"}],
                          // initialValue: calculateStatus(subCriteriaConfigList, subCriteriaList[subCriteria])
                          // initialValue: calculateStatus(subCriteriaConfig, subCriteriaList[subCriteria]),
                          // valuePropName: calculateStatus(subCriteriaConfig, subCriteriaList[subCriteria])
                          // initialValue: !!subCriteriaList[subCriteria].status
                      })(<Checkbox 
                          onChange={(e)=>{
                              handelCriteriaChecked(e.target.checked, subCriteriaList[subCriteria]);
                            }} 
                          checked={subCriteriaList[subCriteria].status}
                          // checked={calculateWeight(subCriteriaConfig, subCriteriaList[subCriteria])}
                          >{subCriteriaList[subCriteria].name} 
                            {console.log("subCriteriaList[subCriteria].status", subCriteriaList[subCriteria].status)}
                          </Checkbox>)}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item >
                      {form.getFieldDecorator(`weight-${subCriteria}`, {
                          rules: [{pattern: /^[0-9]\d*(\.\d+)?$/,message: "Please enter a valid number"}],
                          // rules: [{required: true, message: "Required!"}],
                          // initialValue: calculateWeight(subCriteriaConfigList, subCriteriaList[subCriteria])
                          initialValue: calculateWeight(subCriteriaConfig, subCriteriaList[subCriteria])
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
                    let findSUbcriConf = subCriteriaConfig.find(cat => cat.pa_sub_criteria_id === values[`id-${subCriteria}`]);
                    let vData = {
                      "id": findSUbcriConf?.id || null,
                      "pa_category_config_id": values[`pa_category_config_id-${subCriteria}`],
                      "pa_sub_category_config_id": values[`pa_sub_category_config_id-${subCriteria}`],
                      "pa_criteria_config_id":  criteriaConfigList[cri].id,
                      "pa_sub_criteria_id":  values[`pa_sub_criteria_id-${subCriteria}`],
                      "weight": values[`weight-${subCriteria}`] * 1,
                      "status": (values[`status-${subCriteria}`] * 1) || findSUbcriConf?.status
                    };
                    content.push(vData);
                  }
                }
              }
            }
          }
          let payload = {
            "department_id" : departmentValue,
            "pa_type_id": paTypeValue,
            "data": content
          }

          fourthSubmit(payload);
        }
      });
    }

    const departmentName = () =>{
      let name = "";
      if(departments){
        departments.forEach(dept=>{
          if(dept.id === departmentValue) {
            name = dept.name;
          }
        })
      }
      return name;
    }

    const getCriteriaConfigList = async () => {
      let res = await getData(PA_CRITERIA_CONFIGURATION_LIST + `?department_id=${departmentValue}&pa_type_id=${paTypeValue}`);
  
      if (res) {
        setCriteriaConfigList(res?.data?.data);
      }
    };

    const getSubCriteriaConfigList = async () => {
      let res = await getData(PA_SUB_CRITERIA_CONFIGURATION_LIST + `?department_id=${departmentValue}&pa_type_id=${paTypeValue}`);
  
      if (res) {
        setSubCriteriaConfig(res?.data?.data);
      }
    };

    useEffect(()=>{
      if(departmentValue && criteriaUpdated) {
        getCriteriaConfigList();
        getSubCriteriaConfigList();
      }
      if(departments && departmentValue) departmentName();
    },[departmentValue, departments, criteriaUpdated]);

    useEffect(() => {
      if (subCriteriaList?.length && subCriteriaConfig?.length) {
        // Update subcriteriaList once. count add for multipale time state update 
        if (count === 1) {
          subCriteriaList.forEach(subCri => {
            let find = subCriteriaConfig.find(config => config.pa_sub_criteria_id === subCri.id);
  
            if (find) {
              subCri.weight = find.weight;
              subCri.status = !!(find.weight); 
            } else {
              subCri.status = false;
            }
          });

          setSubCriteriaList([...subCriteriaList]);
          setCount(2)
        }
      } else if (subCriteriaList?.length && subCriteriaConfig && subCriteriaConfig?.length === 0) {
        if (count === 1) {
          subCriteriaList.forEach(subCri => {
              subCri.status = false;
          });

          setSubCriteriaList([...subCriteriaList]);
          setCount(2);
        }
      }
    }, [subCriteriaConfig, subCriteriaList])

    return(
        <Fragment>
          {/* {console.log("criteriaConfigList>>>>>>>>", criteriaConfigList)}
          {console.log("departmentValue>>>>>>>>", departmentValue)} */}
          {steps[current].id === 4 ?
          <div>
          <Row style={{border: '1px solid #E8E8E8', padding : '1rem', margin : '1rem 0px', borderRadius: '5px'}}>
            <Col span={24}>
              <span>Department Name: <strong>{departmentName()}</strong></span>
              <span style={{float:'right'}}>PA Type: <strong>{paramsPATypeIName}</strong></span>
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
                                      <p className="mt-2 ml-5">Total Weight : {findCriSum(cri.id, cri)}/{cri?.weight}</p>
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