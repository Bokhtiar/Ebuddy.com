import React, { Fragment, useState, useEffect } from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import { Input, Collapse, Row, Col, Select, Checkbox, Tag,
  Form, Button, PageHeader, Icon, Descriptions, InputNumber } from "antd";
import { alertPop } from "../../../../scripts/message";
import SearchFilter from "../../../commons/SearchFilter";
import { TableWrapper, Wrapper } from "../../../commons/Wrapper";
import { PA_CONFIG_SUMMARY, 
    PA_CATEGORY_CONFIGURATION_LIST, 
    EMPLOYEE_PA_CREATE, 
    PA_SCORE_LIST } from "../../../../scripts/api";
import { postData, getData } from "../../../../scripts/api-service";

const PAFillupCreate = Form.create()(
  ({ form }) => {
    const history = useHistory();
    const [departmentId, setDepartmentId] = useState();
    const [KamName, setkamName] = useState("");
    const [departmentName, setDepartmentName] = useState("");
    const [month, setMonth] = useState("");
    const [kamId, setKamId] = useState();
    const [year, setYear] = useState();
    const [employeePAList, setEmployeePAList] = useState();
    const [employeeValue, setEmployeeValue] = useState([]);
    const [paTypeId, setPATypeId] = useState([]);
    const [paScorceList, setPAScoreList] = useState([]);

    let searchUrl = window.location.search;
    let params = new URLSearchParams(searchUrl);
    let isdev = params.get('dev');

    const getEmployeeParams = async () => {
      let res = await getData(EMPLOYEE_PA_CREATE + '/' + kamId + '/' + paTypeId);
  
      if (res) {

        if (isdev && isdev === "true") {
          let masterData = res?.data?.data;

          if (masterData?.length) {
            masterData.forEach(cat => {
              if (cat?.pa_sub_categories?.length) {
                cat.pa_sub_categories.forEach(subCat => {
                  if (subCat?.pa_criterias?.length) {
                    subCat.pa_criterias.forEach(cri => {
                      if (cri?.pa_sub_criterias?.length) {
                        cri.pa_sub_criterias.forEach(subCri => {
                          if (subCri.emp_pre_score) {
                            manageEmployeeVlaue(subCri.emp_pre_score, subCri);
                          }
                        })
                      }
                    })
                  }
                })
              }
            });

            setEmployeePAList(masterData);
          }
        } else {
          setEmployeePAList(res?.data?.data);
        }
      }
    };

    const localSubmit  = async (event) => {
      event.preventDefault();
      form.validateFields((err, values) => {
        if (!err) {
          let payload = [];
          let categories = [];

          employeePAList.forEach(categori => {
            let data = {
              id: null,
              pa_category_config_id: categori.pa_category_config_id,
              sub_categories: []
            };

            categori.pa_sub_categories.forEach(subCategory => {
              let subCat = {
                pa_sub_category_config_id: subCategory.pa_sub_category_config_id,
                criterias: []
              };

              subCategory.pa_criterias.forEach(criteria => {
                let cri = {
                  pa_criteria_config_id: criteria.pa_criteria_config_id,
                  sub_criterias: []
                };

                criteria.pa_sub_criterias.forEach(subCriteris => {
                  let subCri = {
                    "pa_sub_criteria_config_id": subCriteris.pa_sub_criteria_config_id,
                    "emp_score": values[`score-${subCriteris.pa_sub_criteria_config_id}`]
                  }
                  cri.sub_criterias.push(subCri)
                });

                subCat.criterias.push(cri);
              });

              data.sub_categories.push(subCat);
            });
            categories.push(data);
          });

          payload = {    
            "id": null,
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
      // subCri.empScore = roundNumber((((value * 1) || 0) / 100) * (subCri.pa_sub_criteria_config_weight * (subCri.pa_sub_category_config_weight / 100)));
      subCri.empScore = roundNumber((((value * 1) || 0) / 100) * (subCri.pa_sub_criteria_config_weight));
      subCri.score = value;

      let subCriteria = employeeValue;
      let findIndex = subCriteria.findIndex(sc => sc.pa_sub_criteria_config_id === subCri.pa_sub_criteria_config_id);

      if (findIndex === -1) {
        subCriteria.push(subCri);
      } else {
        subCriteria[findIndex] = subCri;
      }

      setEmployeeValue(subCriteria);
    }

    const avgScore = (criteriaId, item) => {
      let total = 0;
      employeeValue.map(value => {
        if (value.pa_criteria_config_id === criteriaId) total = total + ((value.score * 1) || 0);
      });

      return roundNumber(total / item);
    }

    const showCriteriaTotal = (criteriaId) => {
      let total = 0;
      employeeValue.map(value => {
        if (value.pa_criteria_config_id === criteriaId) total = total + ((value.empScore * 1) || 0);
      });

      return roundNumber(total);
    }

    const avgSubcategory = (subCatId, pa_criterias) => {
      let total = 0,
          item = 0;
      
      pa_criterias.forEach(cri => {
        item = item + cri.pa_sub_criterias.length;
      });
      
      employeeValue.map(value => {
        if (value.pa_sub_category_config_id === subCatId) total = total + ((value.score * 1) || 0);
      });

      return roundNumber(total/item);
    };

    const showSubcategoryTotal = (subCatId) => {
      let total = 0;
      
      employeeValue.map(value => {
        if (value.pa_sub_category_config_id === subCatId) total = total + ((value.empScore * 1) || 0);
      });

      return roundNumber(total);
    }

    const showCategoryTotal = (catId, subCategory) => {
      let total = 0;

      // console.log("filter", employeeValue.filter(w => w.));
      
      // employeeValue.map(value => {
      //   if (value.pa_category_config_id === catId) {
      //     console.log("newSubcategoryTotal(value.pa_sub_category_config_id)", value.pa_sub_category_config_id);

      //     total = total + (newSubcategoryTotal(value) * 1);
      //   } 
      // });

      subCategory.forEach(subCat => {
        total = total + (newSubcategoryTotal(subCat) * 1);
      })

      return roundNumber(total);
    }

    const avgCategory = (catId, category) => {
      let total = 0,
          item = 0;
      
      category.forEach(cat => {
        cat.pa_criterias.forEach(subCri => {
          item = item + subCri.pa_sub_criterias.length;
        })
      });
      
      employeeValue.map(value => {
        if (value.pa_category_config_id === catId) total = total + ((value.score * 1) || 0);
      });

      return roundNumber(total/item);
    }

    const newSubcategoryTotal = (subCat) => {
      let total = showSubcategoryTotal(subCat.pa_sub_category_config_id) * 1;
      // return roundNumber((total / subCat.pa_sub_category_config_weight) * 100);
      return roundNumber(total);
    }

    const getPAScore = async () => {
      let res = await getData(PA_SCORE_LIST);

      if (res) {
        let masterData = res?.data?.data?.data;
        setPAScoreList(masterData)
      }
    };

    const getTotalCategory = () => {
      if (employeePAList?.length) {
        let total = 0;
        employeePAList.forEach(cat => {
          let avg = showCategoryTotal(cat.pa_category_config_id, cat.pa_sub_categories);
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
      let paramsKam = params.get('empId');
      let paramsYear = params.get('year');
      setkamName(params.get('empName'));
      setDepartmentName(params.get('departmentName'));
      setMonth(params.get('monthName'));
      setKamId(paramsKam ? paramsKam * 1 : undefined);
      setYear(paramsYear ? paramsYear * 1 : undefined);
      setDepartmentId(params.get('department_id'));
      setPATypeId(params.get('pa_type_id'));

      getPAScore()
    },[]);

    useEffect(()=>{
      if(kamId) getEmployeeParams();
    },[kamId])

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
              <Descriptions size="small" column={3}>
                <Descriptions.Item label="Department">{departmentName}</Descriptions.Item>
              </Descriptions>
            </PageHeader>
          <div>

          <Form onSubmit={localSubmit}>
            <Row gutter={16}>
              {
                employeePAList ? employeePAList.map(category => <Col span={24} className="m-2" style={{width:'98%'}} 
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
                              <p className="mt-2 ml-5">Score {avgCategory(category.pa_category_config_id, category.pa_sub_categories)}/100 || 
                              {showCategoryTotal(category.pa_category_config_id, category.pa_sub_categories)}/{category.pa_category_config_weight}</p>
                            </div>
                          </>
                        } 
                        key={1}
                    >
                      <Fragment>
                        {
                          category.pa_sub_categories ? 
                          category.pa_sub_categories.map(subCategory => <Col span={24} className="m-2" 
                            style={{width:'98%'}}>
                              <Collapse
                                defaultActiveKey={1}
                                expandIconPosition='right'
                                bordered="true"
                                >
                                <Collapse.Panel 
                                    header={
                                      <>
                                        <div style={{display:'flex', justifyContent:"space-between"}}>
                                          <p>Sub Category: {subCategory.pa_sub_category_name}</p>
                                          <p className="mt-2 ml-5">
                                          {/* showSubcategoryTotal(subCategory.pa_sub_category_config_id) */}
                                            Score {avgSubcategory(subCategory.pa_sub_category_config_id, subCategory?.pa_criterias)}/100 
                                              || {newSubcategoryTotal(subCategory)}/{subCategory.pa_sub_category_config_weight}
                                          </p>
                                        </div>
                                      </>
                                    } 
                                    key={1}
                                >
                                  {
                                    subCategory?.pa_criterias?.length ? subCategory?.pa_criterias.map(criterias => <Col span={24} 
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
                                                        Score {avgScore(criterias.pa_criteria_config_id, criterias.pa_sub_criterias.length)}/100 || {showCriteriaTotal(criterias.pa_criteria_config_id)}/{criterias.pa_criteria_config_weight}
                                                      </p>
                                                    </div>
                                                </>
                                              } 
                                              key={1}
                                          >
                                          <Fragment>
                                            {/* {fields(criterias.pa_sub_criterias)} */}
                                            {
                                              criterias.pa_sub_criterias.length ? 
                                              criterias.pa_sub_criterias.map(subCriteria => <Fragment>
                                                <Row gutter={16} style={{display:'flex', alignItems:'center'}}>
                                                  <Col span={18}>
                                                    {/* <Form.Item >
                                                      {form.getFieldDecorator(`status-${subCriteria.pa_sub_criteria_id}`, {
                                                          // rules: [{required: true, message: "Required!"}],
                                                          // initialValue: subCriteriaList[subCriteria]?.status
                                                      })(<Checkbox>{subCriteria.pa_sub_criteria_name}</Checkbox>)}
                                                    </Form.Item> */}
                                                    {subCriteria.pa_sub_criteria_name}
                                                  </Col>
                                                  <Col span={6} style={{display:'flex', justifyContent:"space-between", 
                                                    alignItems:'center'}}>
                                                    <span>Score: </span>
                                                    
                                                    <Form.Item clasName="mt-5" style={{margin: '0px 5px'}}>
                                                      {form.getFieldDecorator(`score-${subCriteria.pa_sub_criteria_config_id}`, {
                                                          rules: [{required: true, message: "Required!"}],
                                                          initialValue: subCriteria.score || undefined
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

export default PAFillupCreate;