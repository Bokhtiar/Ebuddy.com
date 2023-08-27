import React, { Fragment, useState, useEffect } from 'react'
import { Link, useHistory, useParams } from "react-router-dom";
import {
    Input, Collapse, Row, Col, Select, Checkbox, Tag,
    Form, Button, PageHeader, Icon, Descriptions, InputNumber, Steps
} from "antd";
import { EMPLOYEE_PA_CREATE } from "../../../../scripts/api";
import { postData } from "../../../../scripts/api-service";
import { alertPop } from "../../../../scripts/message";


const SubCategoryContentForm = Form.create()(({ form, current, setCurrent, index, category,
    paTypeId, kamId, month, year, paId, updatedEmployeePAList, countStep, paScorceList }) => {

    const history = useHistory();
    const [employeeValue, setEmployeeValue] = useState([]);
    const [loading, setLoading] = useState();

    const localSubmit = async (event) => {
        event.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                const body = document.querySelector('#stepper');
                body.scrollIntoView({
                    behavior: 'smooth'
                }, 100);
                
                if (countStep - 1 > current) {
                    setCurrent(current + 1);
                } else {
                    history.push(`/management-panel/pa-fillup-list`);
                }
            }
        });
    };

    const roundNumber = (number) => {
        return number.toFixed(2);
    }

    const avgScore = (criteriaId, subCriterias) => {
        let total = 0;

        subCriterias.forEach(subCri => {
            let value = subCri.emp_score;

            if (employeeValue.length) {
                let find = employeeValue.find(e => e.pa_sub_criteria_config_id === subCri.pa_sub_criteria_config_id);

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
                let find = employeeValue.find(e => e.pa_sub_criteria_config_id === subCri.pa_sub_criteria_config_id);
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

        let result = roundNumber(total/pa_criterias.length);

        document.getElementById(`subcriteria-config-${subCatId}`).innerHTML = result;
    
        return roundNumber(total/pa_criterias.length);
    };


    const avgCategory = (catId, subCategory) => {
        let total = 0;
        
        subCategory.forEach(subCat => {
          let subCatTotal = avgSubcategory(subCat.pa_sub_category_config_id, subCat.pa_employee_criterias);
          total = total + (subCatTotal * 1 || 0);
        });
  
        let result = roundNumber(total/subCategory.length);
        // document.getElementById(`category-score-total`).innerHTML = result;
        return result
    }

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

    const newSubcategoryTotal = (subCategory) => {
        let total = showSubcategoryTotal(subCategory.pa_sub_category_config_id, subCategory?.pa_employee_criterias);
        // return roundNumber(((total * 1) / subCategory.pa_weight) * 100);
        return roundNumber(total * 1);
    }

    const showCategoryTotal = (catId, subCategories) => {
        let total = 0;
  
        if (subCategories?.length && catId) {
          subCategories.forEach(subCat => {
            let subCatTotal = newSubcategoryTotal(subCat);
  
            total = total + (subCatTotal * 1 || 0);
          })
        };
  
        return roundNumber(total);
    }

    const showTotalCategoryScore = () => {
        let total = 0;

        updatedEmployeePAList.pa_emp_categories.forEach(category => {
            let result = showCategoryTotal(category.pa_category_config_id, category.pa_employee_sub_categories);

            total = total + (result * 1);
        });

        document.getElementById(`category-score-total`).innerHTML = roundNumber(total);
    }

    const getTotalCategory = () => {
        if (updatedEmployeePAList?.pa_emp_categories?.length) {
          let total = 0;
          updatedEmployeePAList.pa_emp_categories.forEach(cat => {
            let avg = showCategoryTotal(cat.pa_category_config_id, cat.pa_employee_sub_categories);
            total = total + (avg * 1);
          });
  
          if (total && paScorceList?.length) {
            let score = paScorceList.find(s => s.mark_start <= total && s.mark_end >= total);
            
            if (score) {
                document.getElementById(`pa-score-status`).innerHTML = `<p style="color: ${score?.color}; float: right">${score?.name}</p>`;
            }
            else return "";
          } else return false;
        } else return false;
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
        // avgSubcategory(category.pa_employee_sub_categories[0].pa_sub_category_config_id, category.pa_employee_sub_categories[0].pa_employee_criterias)
        // avgCategory(category.pa_category_config_id, category.pa_employee_sub_categories);
        showTotalCategoryScore();
        getTotalCategory();
        subCategoryWidth();
    }

    const subCategoryWidth = () => {
        let total = newSubcategoryTotal(category.pa_employee_sub_categories[0]);

        // console.log("total", total);
        document.getElementById(`subcriteria-config-${category.pa_employee_sub_categories[0].pa_sub_category_config_id}`).innerHTML = total;
    }

    useEffect(() => {
        if (category) {
            subCategoryWidth()
            // avgSubcategory(category.pa_employee_sub_categories[0].pa_sub_category_config_id, category.pa_employee_sub_categories[0].pa_employee_criterias)
        }
    }, [category])

    useEffect(() => {
        if (updatedEmployeePAList) {
            showTotalCategoryScore();
            getTotalCategory();
        }
    }, [updatedEmployeePAList])

    return (
        <div style={current !== index ? { display: 'none' } : {}}>
            <Form onSubmit={localSubmit}>
                <Row gutter={16}>
                    <Collapse defaultActiveKey={1}
                        expandIconPosition='right'
                        bordered="true">

                        {
                            category.pa_employee_sub_categories[0].pa_employee_criterias.length ?
                                category.pa_employee_sub_categories[0].pa_employee_criterias.map(criterias => <Col span={24}
                                    className="mt-2 mb-2">
                                    <Collapse
                                        defaultActiveKey={1}
                                        expandIconPosition='right'
                                        bordered="true"
                                    >
                                        <Collapse.Panel
                                            header={
                                                <>
                                                    <div style={{ display: 'flex', justifyContent: "space-between" }}>
                                                        <p>Criteria: {criterias?.pa_criteria_name}</p>
                                                        <p className="mt-2 ml-5">
                                                            Score: {avgScore(criterias.pa_criteria_config_id, criterias.pa_employee_sub_criterias)}/100 ||
                                                            {showCriteriaTotal(criterias.pa_criteria_config_id, criterias.pa_employee_sub_criterias)}/{criterias.pa_weight}
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
                                                            <Row gutter={16} style={{ display: 'flex', alignItems: 'center' }}>
                                                                <Col span={18}>
                                                                    {subCriteria.pa_sub_criteria_name}
                                                                </Col>
                                                                <Col span={6} style={{
                                                                    display: 'flex', justifyContent: "space-between",
                                                                    alignItems: 'center'
                                                                }}>
                                                                    <span>Score: </span>
                                                                    <Form.Item clasName="mt-5" style={{ margin: '0px 5px' }}>
                                                                        {form.getFieldDecorator(`score-${subCriteria.pa_sub_criteria_config_id}`, {
                                                                            rules: [{ required: true, message: "Required!" }],
                                                                            initialValue: subCriteria.emp_score || undefined
                                                                        })(<InputNumber size="medium" min={1} max={100} disabled
                                                                            placeholder={`Out of 100`} style={{ width: '100%' }}
                                                                            onChange={e => manageEmployeeVlaue(e, subCriteria)} />)}
                                                                    </Form.Item>
                                                                </Col>
                                                            </Row>
                                                            <hr style={{ margin: '1rem 0' }} />
                                                        </Fragment>) : ''
                                                }

                                            </Fragment>
                                        </Collapse.Panel>
                                    </Collapse>
                                </Col>) : ''
                        }
                    </Collapse>
                </Row>

                {
                    current ? <Button type="primary" style={{ margin: '10px 20px' }}
                        onClick={() => setCurrent(current - 1)}>
                        Previous
                    </Button> : ''
                }

                <Button 
                    loading={loading}
                    type="primary" 
                    htmlType="submit" 
                    id="fourth-click" 
                    size="large"
                    style={{ float: 'right', margin: '10px 20px' }}
                >
                    Next
                </Button>
            </Form>
        </div>
    )
})

export default SubCategoryContentForm;

