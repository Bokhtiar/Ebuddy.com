import React, { Fragment, useState, useEffect } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import {
    Input, Collapse, Row, Col, Select, Checkbox, Tag,
    Form, Button, PageHeader, Icon, Descriptions, InputNumber, Steps, Switch
} from "antd";
import { EMPLOYEE_PA_CREATE } from "../../../../scripts/api";
import { postData } from "../../../../scripts/api-service";
import { alertPop } from "../../../../scripts/message";

const { Panel } = Collapse;


const SubCategoryContentForm = Form.create()(({ form, current, setCurrent, index, employeePAList, category,
    paTypeId, kamId, month, year, savedPa, setSavedPa, countStep, paScorceList }) => {

    const history = useHistory();
    const [employeeValue, setEmployeeValue] = useState([]);
    const [loading, setLoading] = useState(false);
    const [switchStatus, setSwitchStatus] = useState(true);

    const localSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        form.validateFields((err, values) => {
            if (!err) {
                let payload = [];
                let categories = [];

                if (!savedPa) {
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
                                    // let subCri = {
                                    //     "pa_sub_criteria_config_id": subCriteris.pa_sub_criteria_config_id || null,
                                    //     // first priority given value 
                                    //     // then emp_pre_score 
                                    //     // or 0
                                    //     "emp_score": values[`score-${subCriteris.pa_sub_criteria_config_id}`] ? 
                                    //         values[`score-${subCriteris.pa_sub_criteria_config_id}`] : subCriteris?.emp_pre_score ? subCriteris.emp_pre_score : 0
                                    // }

                                    let subCri = {};

                                    if(category.pa_sub_categorie[0].pa_sub_category_name === "AI-ML Practice"){
                                        subCri = {
                                            id: subCriteris.id,
                                            "pa_sub_criteria_config_id": subCriteris.pa_sub_criteria_config_id,
                                            "pa_sub_criteria_input_value": values[`score-${subCriteris.pa_sub_criteria_config_id}`] || null,
                                            "emp_score": 100
                                        }
                                    }
                                    else{
                                        subCri = {
                                            id: subCriteris.id,
                                            "pa_sub_criteria_config_id": subCriteris.pa_sub_criteria_config_id,
                                            "pa_sub_criteria_input_value": null,
                                            "emp_score": values[`score-${subCriteris.pa_sub_criteria_config_id}`] ? 
                                            values[`score-${subCriteris.pa_sub_criteria_config_id}`] : subCriteris?.emp_pre_score ? subCriteris.emp_pre_score : 0
                                        }
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
                } else {
                    let cates = [];

                    savedPa.pa_emp_categories.forEach(cat => {
                        cat.pa_employee_sub_categories.forEach(subCat => {
                            let data = {
                                emp_pa_id: cat.emp_pa_id,
                                emp_score: cat.emp_score,
                                emp_weight: cat.emp_weight,
                                id: cat.id,
                                pa_category_config_id: cat.pa_category_config_id,
                                pa_category_name: cat.pa_category_name,
                                // pa_employee_sub_categories: (2) [{…}, {…}]
                                pa_weight: cat.pa_weight,
                                status: cat.status
                            };

                            data.pa_employee_sub_categories = [subCat];
                            
                            cates.push(data);
                        });
                    });

                    let proCategory = cates.find(c => c.pa_employee_sub_categories[0].pa_sub_category_config_id === category.pa_sub_categorie[0].pa_sub_category_config_id);

                    if (proCategory) {
                        let data = {
                            id: proCategory.id,
                            pa_category_config_id: proCategory.pa_category_config_id,
                            sub_categories: []
                        }

                        proCategory.pa_employee_sub_categories.forEach(subCategory => {
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
                                    let subCri = {};

                                    if(proCategory.pa_employee_sub_categories[0].pa_sub_category_name === "AI-ML Practice"){
                                        subCri = {
                                            id: subCriteria.id,
                                            "pa_sub_criteria_config_id": subCriteria.pa_sub_criteria_config_id,
                                            "pa_sub_criteria_input_value": values[`score-${subCriteria.pa_sub_criteria_config_id}`] || null,
                                            "emp_score": 100
                                        }
                                    }
                                    else{
                                        subCri = {
                                            id: subCriteria.id,
                                            "pa_sub_criteria_config_id": subCriteria.pa_sub_criteria_config_id,
                                            "pa_sub_criteria_input_value": null,
                                            "emp_score": values[`score-${subCriteria.pa_sub_criteria_config_id}`]
                                        }
                                    }

                                    cri.sub_criterias.push(subCri)
                                });
                                subCat.criterias.push(cri);
                            });

                            data.sub_categories.push(subCat);
                        });

                        categories = [data];

                        payload = {
                            "id": savedPa.id,
                            "emp_id": kamId,
                            "pa_type_id": paTypeId,
                            "month": month,
                            "year": year,
                            "categories": categories
                        };

                    }
                }
                console.log("payload>>>>>>", payload);

                postData(EMPLOYEE_PA_CREATE, payload).then(res => {
                    if (res?.data?.code == 201) {
                        let masterData = res.data.data;

                        setSavedPa(masterData);
                        setLoading(false);
                        alertPop("success", "Successfully complete the process");
                
                        if (countStep - 1 > current) {
                            setCurrent(current + 1);
                            
                            // scroll to top after form submission
                            const body = document.querySelector('#stepper');
                            body.scrollIntoView({
                                behavior: 'smooth'
                            }, 100);
                        
                        } else {
                            history.push(`/supervisor-panel/pa-fillup-list`);
                        }
                    }
                });
            }
        })
    }

    const roundNumber = (number) => {
        return number.toFixed(2);
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

    const showSubcategoryTotal = (subCatId, subCat, context) => {
        let total = 0;
        
        employeeValue.map(value => {
          if (value.pa_sub_category_config_id === subCatId) total = total + ((value.empScore * 1) || 0);
        });

        if (context === 'total' && subCat?.pa_criterias?.length ) {
            // PA preview 
            subCat.pa_criterias.forEach(cri => {
                if (cri?.pa_sub_criterias?.length) {
                    cri.pa_sub_criterias.forEach(subCri => {
                        let index = employeeValue.findIndex(e => e.pa_sub_criteria_config_id === subCri.pa_sub_criteria_config_id);

                        if (index === -1) {
                            total = total + ((subCri.empScore * 1) || 0);
                        }
                    })
                }
            })
        }
  
        return roundNumber(total);
    }

    const newSubcategoryTotal = (subCat, context) => {
        let total = showSubcategoryTotal(subCat.pa_sub_category_config_id, subCat, context) * 1;

        return roundNumber(total);
    }

    const showCategoryTotal = (catId, subCategory, context) => {
        let total = 0;

        subCategory.forEach(subCat => {
          total = total + (newSubcategoryTotal(subCat, context) * 1);
        })
  
        return roundNumber(total);
    }

    const showTotalCategoryScore = () => {
        if (employeePAList) {
            let total = 0;

            // if (savedPa && savedPa.pa_emp_categories && savedPa.pa_emp_categories.length) {
            //     savedPa.pa_emp_categories.forEach(cat => {
            //         total = total + (cat?.emp_weight || 0)
            //     })
            // };


            
            employeePAList.forEach(category => {
                let result = showCategoryTotal(category.pa_category_config_id, category.pa_sub_categories, 'total');
                total = total + (result * 1);
            });

            if (total && paScorceList?.length) {
                let score = paScorceList.find(s => s.mark_start <= total && s.mark_end >= total);
                
                if (score) {
                    document.getElementById(`pa-score-status`).innerHTML = `<p style="color: ${score?.color}; float: right">${score?.name}</p>`;
                }
            }

            document.getElementById(`category-score-total`).innerHTML = roundNumber(total);
        }
    }

    const manageEmployeeValue = (value, subCri) => {
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
        // avgSubcategory(category.pa_sub_categorie[0].pa_sub_category_config_id, category.pa_sub_categorie[0].pa_criterias)
        showTotalCategoryScore();
        showWaightTotal()
    }

    const showWaightTotal = () => {
        let total = newSubcategoryTotal(category.pa_sub_categorie[0]);

        document.getElementById(`subcriteria-config-${category.pa_sub_categorie[0].pa_sub_category_config_id}`).innerHTML = total;    
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

        let result = roundNumber(total / item);

        // console.log("result ==", result);
        document.getElementById(`subcriteria-config-${category.pa_sub_categorie[0].pa_sub_category_config_id}`).innerHTML = result;
    };

    const handleCriteria = (criteria, checked) =>{
        criteria.pa_sub_criterias.forEach(item=>{
            if(checked) {
                manageEmployeeValue(100, item);
                criteria.emp_score = 100;
            }
            else {
                manageEmployeeValue(0, item);
                criteria.emp_score = 0;
            }
        })
    }

    useEffect(() => {
        if (category) {
            if (category?.pa_sub_categorie[0]?.pa_criterias?.length) {
                category.pa_sub_categorie[0].pa_criterias.forEach(cri => {
                    if (cri?.pa_sub_criterias?.length) {
                        cri.pa_sub_criterias.forEach(subCri => {
                            if (subCri.emp_pre_score) {
                                manageEmployeeValue(subCri.emp_pre_score, subCri);
                            }
                        })
                    }
                })                
            }
        }
    }, [])

    useEffect(() => {
        if (employeePAList?.length && paScorceList) {
            let total = 0;

            employeePAList.forEach(cat => {
                if (cat?.pa_sub_categories?.length) {
                    cat.pa_sub_categories.forEach(subCat => {
                        if (subCat?.pa_criterias?.length) {
                            subCat.pa_criterias.forEach(cri => {
                                if (cri?.pa_sub_criterias?.length) {
                                    cri.pa_sub_criterias.forEach(subCri => {
                                        total = total + ((subCri.empScore * 1) || 0 )
                                    })
                                }
                            })
                        }
                    })
                }
            });

            if (total && paScorceList?.length) {
                let score = paScorceList.find(s => s.mark_start <= total && s.mark_end >= total);
                
                if (score) {
                    document.getElementById(`pa-score-status`).innerHTML = `<p style="color: ${score?.color}; float: right">${score?.name}</p>`;
                }
            }

            document.getElementById(`category-score-total`).innerHTML = roundNumber(total);
        }
    }, [employeePAList, paScorceList])

    return (
        <div style={current !== index ? { display: 'none' } : {}}>
            <Form onSubmit={localSubmit}>
                <Row gutter={16}>
                    <Collapse defaultActiveKey={1}
                        expandIconPosition='right'
                        bordered="true">
                        {
                            category?.pa_sub_categorie[0]?.pa_criterias?.length
                                ? category.pa_sub_categorie[0].pa_criterias.map((criterias, index) => <Panel
                                    header={
                                        <>
                                            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                                                <p>
                                                    {category.pa_sub_categorie[0].pa_sub_category_name === "AI-ML Practice" ? 
                                                    <Switch 
                                                        defaultChecked 
                                                        size="default"
                                                        onChange={(checked)=> handleCriteria(criterias, checked)}
                                                    />
                                                    :null}&nbsp;
                                                    <span>Criteria: {criterias?.pa_criteria_name}</span>
                                                </p>
                                                {category.pa_sub_categorie[0].pa_sub_category_name === "AI-ML Practice" ?
                                                <p className="mt-2 ml-5">
                                                    Score: {criterias?.emp_score} / 100
                                                </p>
                                                :
                                                <p className="mt-2 ml-5">
                                                    Score {avgScore(criterias.pa_criteria_config_id, criterias.pa_sub_criterias.length)}/100 || {showCriteriaTotal(criterias.pa_criteria_config_id)}/{criterias.pa_criteria_config_weight}
                                                </p>
                                                }
                                            </div>
                                        </>
                                    } key={index + 1}>
                                    <Fragment>
                                        {
                                            criterias.pa_sub_criterias.length ?
                                                criterias.pa_sub_criterias.map(subCriteria => <Fragment key={"subCriteria-" + subCriteria.pa_sub_criteria_config_id}>
                                                    {category.pa_sub_categorie[0].pa_sub_category_name === "AI-ML Practice" ? 
                                                        <Row gutter={16} style={{ display: 'flex', alignItems: 'center' }}>
                                                            <Col span={12}>
                                                                {subCriteria.pa_sub_criteria_name}
                                                            </Col>
                                                            <Col span={12} style={{
                                                                display: 'flex', justifyContent: "space-between",
                                                                alignItems: 'center'
                                                            }}>
                                                                <Form.Item clasName="mt-5" style={{ margin: '0px 5px' }}>
                                                                    {form.getFieldDecorator(`score-${subCriteria.pa_sub_criteria_config_id}`, {
                                                                        // rules: [{ required: true, message: "Required!" }],
                                                                        // initialValue: subCriteria.pa_sub_criteria_input_value || null
                                                                    })(<Input 
                                                                            size="medium"
                                                                            style={{ width: '100%' }}
                                                                            // onChange={e => manageEmployeeVlaue(e, subCriteria)} 
                                                                        />)}
                                                                </Form.Item>
                                                            </Col>
                                                        </Row>
                                                        :<Row gutter={16} style={{ display: 'flex', alignItems: 'center' }}>
                                                    <Col span={18}>
                                                        {subCriteria.pa_sub_criteria_name}
                                                    </Col>
                                                    <Col span={6} style={{
                                                        display: 'flex', justifyContent: "space-between",
                                                        alignItems: 'center'
                                                    }}>
                                                        <span>Score: </span>

                                                        <Form.Item className="mt-1" style={{ margin: '0px 5px' }}>
                                                            {form.getFieldDecorator(`score-${subCriteria.pa_sub_criteria_config_id}`, {
                                                                rules: [{ required: true, message: "Required!" }],
                                                                initialValue: subCriteria.score || 0
                                                                // initialValue: subCriteria.score || undefined
                                                            })(<InputNumber size="medium" min={1} max={100}
                                                                placeholder={`Out of 100`} style={{ width: '100%' }}
                                                                onChange={e => manageEmployeeValue(e, subCriteria)} />)}
                                                        </Form.Item>
                                                    </Col>
                                                        </Row>
                                                    }
                                                    {/* <Row gutter={16} style={{ display: 'flex', alignItems: 'center' }}>
                                                        <Col span={18}>
                                                            {subCriteria.pa_sub_criteria_name}
                                                        </Col>
                                                        <Col span={6} style={{
                                                            display: 'flex', justifyContent: "space-between",
                                                            alignItems: 'center'
                                                        }}>
                                                            <span>Score: </span>

                                                            <Form.Item className="mt-1" style={{ margin: '0px 5px' }}>
                                                                {form.getFieldDecorator(`score-${subCriteria.pa_sub_criteria_config_id}`, {
                                                                    rules: [{ required: true, message: "Required!" }],
                                                                    initialValue: subCriteria.score || 0
                                                                    // initialValue: subCriteria.score || undefined
                                                                })(<InputNumber size="medium" min={1} max={100}
                                                                    placeholder={`Out of 100`} style={{ width: '100%' }}
                                                                    onChange={e => manageEmployeeValue(e, subCriteria)} />)}
                                                            </Form.Item>
                                                        </Col>
                                                    </Row> */}
                                                    <hr style={{ margin: '1rem 0' }} />
                                                </Fragment>) : ''
                                        }
                                    </Fragment>
                                </Panel>) : ''
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
                    style={{ float: 'right', margin: '10px 20px' }}
                    disabled={loading}
                >
                    Save & Submit Now
                </Button>
            </Form>
        </div>
    )
});

export default SubCategoryContentForm
