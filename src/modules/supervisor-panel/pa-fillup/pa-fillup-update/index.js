import React, { Fragment, useState, useEffect } from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import { Input, Collapse, Row, Col, Select, Checkbox, Form, Button, PageHeader, Icon, Descriptions, InputNumber, Tag } from "antd";
import { alertPop } from "../../../../scripts/message";
import SearchFilter from "../../../commons/SearchFilter";
import { TableWrapper, Wrapper } from "../../../commons/Wrapper";
import { PA_CONFIG_SUMMARY, 
    PA_CATEGORY_CONFIGURATION_LIST, 
    EMPLOYEE_PA_CREATE, 
    EMPLOYEE_PA_UPDATE,
    PA_SUB_CRITERIA_CONFIGURATION_CREATE,
    PA_SUB_CATEGORY_CONFIGURATION_LIST, 
    PA_CRITERIA_CONFIGURATION_LIST, 
    PA_SUB_CRITERIA_CONFIGURATION_LIST,
    DEPARTMENT_LIST, PA_SCORE_LIST } from "../../../../scripts/api";
import { postData, getData } from "../../../../scripts/api-service";

const PAFillupUpdate = Form.create()(
  ({ form }) => {
    const history = useHistory();
    const [departmentId, setDepartmentId] = useState();
    const [KamName, setkamName] = useState("");
    const [departmentName, setDepartmentName] = useState("");
    const [month, setMonth] = useState("");
    const [kamId, setKamId] = useState();
    const [year, setYear] = useState();
    const [employeePAList, setEmployeePAList] = useState([]);
    const [updatedEmployeePAList, setUpdatedEmployeePAList] = useState();
    const [employeeValue, setEmployeeValue] = useState([]);
    const [paId, setPAId] = useState();
    const [paTypeId, setPATypeId] = useState();
    const [paScorceList, setPAScoreList] = useState([]);

    const getEditData = async (id) => {
        let res = await getData(EMPLOYEE_PA_UPDATE + '/' + id);
        if (res) {
            setUpdatedEmployeePAList(res?.data?.data);
        }
    };

    const getEmployeeParams = async () => {
      let res = await getData(EMPLOYEE_PA_CREATE + '/' + kamId);
  
      if (res) {
        setEmployeePAList(res?.data?.data);
      }
    };

    const localSubmit  = async (event) => {
      event.preventDefault();
      form.validateFields((err, values) => {
        if (!err) {
          let payload = [];
          let categories = [];

          // employeePAList.forEach(categori => {
          //   let data = {
          //     id: null,
          //     pa_category_config_id: categori.pa_category_config_id,
          //     sub_categories: []
          //   };

          //   categori.pa_sub_categories.forEach(subCategory => {
          //     let subCat = {
          //       pa_sub_category_config_id: subCategory.pa_sub_category_config_id,
          //       criterias: []
          //     };

          //     subCategory.pa_criterias.forEach(criteria => {
          //       let cri = {
          //         pa_criteria_config_id: criteria.pa_criteria_config_id,
          //         sub_criterias: []
          //       };

          //       criteria.pa_sub_criterias.forEach(subCriteris => {
          //         let subCri = {
          //           "pa_sub_criteria_config_id": subCriteris.pa_sub_criteria_config_id,
          //           "emp_score": values[`score-${subCriteris.pa_sub_criteria_config_id}`]
          //         }
          //         cri.sub_criterias.push(subCri)
          //       });

          //       subCat.criterias.push(cri);
          //     });

          //     data.sub_categories.push(subCat);
          //   });
          //   categories.push(data);
          // });

          updatedEmployeePAList.pa_emp_categories.forEach(category => {
            let data = {
              id: category.id,
              pa_category_config_id: category.pa_category_config_id,
              sub_categories: []
            }

            category.pa_employee_sub_categories.forEach(subCategory => {
              let subCat = {
                id: subCategory.id,
                pa_sub_category_config_id: subCategory.pa_sub_category_config_id,
                criterias: []
              };

              subCategory.pa_employee_criterias.forEach(criteria => {
                let cri = {
                  id: criteria.id,
                  pa_criteria_config_id: criteria.pa_criteria_config_id,
                  sub_criterias: []
                };

                criteria.pa_employee_sub_criterias.forEach(subCriteria => {
                  let subCri = {
                    id: subCriteria.id,
                    "pa_sub_criteria_config_id": subCriteria.pa_sub_criteria_config_id,
                    "emp_score": values[`score-${subCriteria.pa_sub_criteria_config_id}`]
                  }

                  cri.sub_criterias.push(subCri)
                });
                subCat.criterias.push(cri);
              });

              data.sub_categories.push(subCat);
            })
            categories.push(data);
          })


          payload = {    
            "id": paId,
            "emp_id": kamId,
            "pa_type_id": paTypeId,
            "month": month,
            "year": year,
            "categories": categories
          }

          postData(EMPLOYEE_PA_CREATE, payload).then(res => {
            if (res?.data?.code == 201) {
              alertPop("success", "Successfully complete the process");
              // history.push(`/supervisor-panel/pa-fillup-list?emp_id=${kamId}`);
              history.push(`/supervisor-panel/pa-fillup-list`);
            } 
          });
        }
      })
    }

    const roundNumber = (number) => {
      return number.toFixed(2);
    }

    const manageEmployeeVlaue = (value, subCri) => { 
      // roundNumber((((value * 1) || 0) / 100) * (subCri.pa_weight * (subCri?.sub_criteria_config?.sub_category_config?.weight / 100)))
      subCri.empWeight = roundNumber((((value * 1) || 0) / 100) * (subCri.pa_weight)) || subCri.emp_weight;
      subCri.emp_score = value;

      let subCriteria = employeeValue;
      let findIndex = subCriteria.findIndex(sc => sc.pa_sub_criteria_config_id === subCri.pa_sub_criteria_config_id);

      if (findIndex === -1) {
        subCriteria.push(subCri);
      } else {
        subCriteria[findIndex] = subCri;
      }

      setEmployeeValue(subCriteria);
    }

    const avgScore = (criteriaId, subCriterias) => {
      let total = 0;

      subCriterias.forEach(subCri => {
        let value = subCri.emp_score;

        if (employeeValue.length) {
          let find = employeeValue.find(e => e.pa_sub_criteria_config_id === subCri.pa_sub_criteria_config_id );

          if (find) {
            value = ((find.emp_score * 1) || 0);
          } 
        }

        total = total + value;
      });

      return roundNumber(total / subCriterias.length);
    }

    const showCriteriaTotal = (criteriaId, subCriterias) => {
      let total = 0;
      
      subCriterias.forEach(subCri => {
        let value = subCri.emp_weight;

        if (employeeValue.length) {
          let find = employeeValue.find(e => e.pa_sub_criteria_config_id === subCri.pa_sub_criteria_config_id );
          if (find) value = ((find.empWeight * 1) || 0);
        }

        total = total + value;
      });

      return roundNumber(total);
    }

    const avgSubcategory = (subCatId, pa_criterias) => {
      let total = 0;

      pa_criterias.forEach(cri => {
        let criTotal = avgScore(cri.pa_criteria_config_id, cri.pa_employee_sub_criterias);
        total = total + (criTotal * 1 || 0);
      });

      return roundNumber(total/pa_criterias.length);
    };

    const showSubcategoryTotal = (subCatId, criteria) => {
      let total = 0;

      if (criteria?.length && subCatId) {
        criteria.forEach(cri => {
          let criTotal = showCriteriaTotal(cri.pa_criteria_config_id, cri.pa_employee_sub_criterias);
          // console.log("fdata>>>>>>>>>>", criTotal);
          total = total + (criTotal * 1 || 0)
        })
      }
      return roundNumber(total);
    }

    const showCategoryTotal = (catId, subCategories) => {
      let total = 0;

      if (subCategories?.length && catId) {
        subCategories.forEach(subCat => {
          let subCatTotal = newSubcategoryTotal(subCat); //showSubcategoryTotal(subCat.pa_sub_category_config_id, subCat.pa_employee_criterias);

          total = total + (subCatTotal * 1 || 0);
        })
      };

      return roundNumber(total);
    }

    const avgCategory = (catId, subCategory) => {
      let total = 0;
      
      subCategory.forEach(subCat => {
        let subCatTotal = avgSubcategory(subCat.pa_sub_category_config_id, subCat.pa_employee_criterias);
        total = total + (subCatTotal * 1 || 0);
      });

      return roundNumber(total/subCategory.length);
    }

    const newSubcategoryTotal = (subCategory) => {
      let total = showSubcategoryTotal(subCategory.pa_sub_category_config_id, subCategory?.pa_employee_criterias);
      // return roundNumber(((total * 1) / subCategory.pa_weight) * 100);
      return roundNumber(total * 1);
    } 

    const getPAScore = async () => {
      let res = await getData(PA_SCORE_LIST);

      if (res) {
        let masterData = res?.data?.data?.data;
        setPAScoreList(masterData)
      }
    };

    const getTotalCategory = () => {
      if (updatedEmployeePAList?.pa_emp_categories?.length) {
        let total = 0;
        updatedEmployeePAList.pa_emp_categories.forEach(cat => {
          let avg = showCategoryTotal(cat.pa_category_config_id, cat.pa_employee_sub_categories);
          total = total + (avg * 1);
        });

        if (total && paScorceList?.length) {
          let score = paScorceList.find(s => s.mark_start <= total && s.mark_end >= total);

          if (score) return <Tag color={score?.color} size="large" style={{padding: "1rem 2rem", fontSize: "15px"}}>{score?.name}</Tag>;
          else return "";
        } else return false;
      } else return false;
    }

    useEffect(()=>{
      let searchUrl = window.location.search;
      let params = new URLSearchParams(searchUrl);
      let paramsPAId = params.get('paId');
      let paramsPATypeId = params.get('paTypeId');
      let paramsKam = params.get('empId');
      let paramsYear = params.get('year');
      setkamName(params.get('empName'));
      setDepartmentName(params.get('departmentName'));
      setMonth(params.get('monthName'));
      setPAId(paramsPAId ? paramsPAId * 1 : undefined);
      setPATypeId(paramsPATypeId ? paramsPATypeId * 1 : undefined);
      setKamId(paramsKam ? paramsKam * 1 : undefined);
      setYear(paramsYear ? paramsYear * 1 : undefined);
      setDepartmentId(params.get('department_id'));
      
      getPAScore();
    },[]);

    useEffect(()=>{
      // if(kamId) getEmployeeParams();
    },[kamId]);

    useEffect(()=>{
      if(paId) getEditData(paId);
    },[paId]);

    return(
        <Wrapper>
            <PageHeader
              style={{
              border: '1px solid rgb(235, 237, 240)',
              }}
              // onBack={() => history.push(`/supervisor-panel/pa-fillup-list?emp_id=${kamId}`)}
              backIcon={<Icon type="left" />}
              title={`Employee Name: ${KamName}`}
              extra={[
                getTotalCategory()
              ]}
            >
              {/* <Descriptions size="small" column={3}>
                <Descriptions.Item label="Department">{departmentName}</Descriptions.Item>
              </Descriptions> */}
            </PageHeader>
          <div>

          <Form onSubmit={localSubmit}>
            <Row gutter={16}>
              {
                updatedEmployeePAList?.pa_emp_categories ? updatedEmployeePAList.pa_emp_categories.map(category => <Col span={24} className="m-2" style={{width:'98%'}} 
                  key={category.pa_category_config_id}>
                  <Collapse
                    defaultActiveKey={1}
                    expandIconPosition='right'
                    bordered="true"
                    >
                    <Collapse.Panel 
                        header={
                          <>
                            <div style={{display:'flex', justifyContent:"space-between"}}>
                              <p>Category: {category.pa_category_name}</p>
                              <p className="mt-2 ml-5">Score:  
                                {avgCategory(category.pa_category_config_id, category.pa_employee_sub_categories)}/100 || 
                                {showCategoryTotal(category.pa_category_config_id, category.pa_employee_sub_categories)}/{category.pa_weight}
                              </p>
                            </div>
                          </>
                        } 
                        key={1}
                    >
                      <Fragment>
                        {
                          category.pa_employee_sub_categories ? 
                          category.pa_employee_sub_categories.map(subCategory => <Col span={24} className="m-2" 
                            style={{width:'98%'}}>
                              <Collapse
                                defaultActiveKey={1}
                                expandIconPosition='right'
                                bordered="true"
                                >
                                <Collapse.Panel 
                                    header={
                                      // showSubcategoryTotal(subCategory.pa_sub_category_config_id, subCategory?.pa_employee_criterias)
                                      <>
                                        <div style={{display:'flex', justifyContent:"space-between"}}>
                                          <p>Sub Category: {subCategory.pa_sub_category_name}</p>
                                          <p className="mt-2 ml-5">
                                            Score: {avgSubcategory(subCategory.pa_sub_category_config_id, subCategory?.pa_employee_criterias)}/100
                                              || {newSubcategoryTotal(subCategory)}/{subCategory.pa_weight} 
                                          </p>
                                        </div>
                                      </>
                                    } 
                                    key={1}
                                >
                                  {
                                    subCategory?.pa_employee_criterias?.length ? subCategory?.pa_employee_criterias.map(criterias => <Col span={24} 
                                      className="mt-2 mb-2">
                                      <Collapse
                                          defaultActiveKey={1}
                                          expandIconPosition='right'
                                          bordered="true"
                                          >
                                          <Collapse.Panel 
                                              header={
                                                <>
                                                    <div style={{display:'flex', justifyContent:"space-between"}}>
                                                      <p>Criteria: {criterias?.pa_criteria_name}</p>
                                                      <p className="mt-2 ml-5">
                                                        Score: {avgScore(criterias.pa_criteria_config_id, criterias.pa_employee_sub_criterias)}/100 || 
                                                          {showCriteriaTotal(criterias.pa_criteria_config_id, criterias.pa_employee_sub_criterias )}/{criterias.pa_weight}
                                                      </p>
                                                    </div>
                                                </>
                                              } 
                                              key={1}
                                          >
                                          <Fragment>
                                            {
                                              criterias.pa_employee_sub_criterias.length ? 
                                              criterias.pa_employee_sub_criterias.map(subCriteria => <Fragment>
                                                <Row gutter={16} style={{display:'flex', alignItems:'center'}}>
                                                  <Col span={18}>
                                                    {subCriteria.pa_sub_criteria_name}
                                                  </Col>
                                                  <Col span={6} style={{display:'flex', justifyContent:"space-between", 
                                                    alignItems:'center'}}>
                                                    <span>Score: </span>
                                                    <Form.Item clasName="mt-5" style={{margin: '0px 5px'}}>
                                                      {form.getFieldDecorator(`score-${subCriteria.pa_sub_criteria_config_id}`, {
                                                          rules: [{required: true, message: "Required!"}],
                                                          initialValue: subCriteria.emp_score || undefined
                                                      })(<InputNumber size="medium" min={1} max={100} 
                                                        placeholder={`Out of 100`} style={{width: '100%'}}
                                                        onChange={e => manageEmployeeVlaue(e, subCriteria)}/>)}
                                                    </Form.Item>
                                                  </Col>
                                                </Row>
                                                <hr style={{margin:'1rem 0'}}/>
                                              </Fragment>) : ''
                                            }
                                            
                                          </Fragment>
                                          </Collapse.Panel>
                                      </Collapse>
                                    </Col>) : ''
                                  }
                              </Collapse.Panel>
                            </Collapse>
                          </Col>
                            ) : null
                        }
                      </Fragment>
                    </Collapse.Panel>
                </Collapse>
                </Col>) : ''
              }
                
              </Row>
              <Button type="primary" htmlType="submit" id="fourth-click" style={{float: 'right', margin: '10px 20px'}}>Submit</Button>
            </Form>
          </div>
        </Wrapper>
    )
})

export default PAFillupUpdate;