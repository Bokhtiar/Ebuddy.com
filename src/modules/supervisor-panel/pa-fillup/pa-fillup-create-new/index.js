import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  Input, Collapse, Row, Col, Select, Checkbox, Tag,
  Form, Button, PageHeader, Icon, Descriptions, InputNumber, Steps
} from "antd";
import { alertPop } from "../../../../scripts/message";
import SearchFilter from "../../../commons/SearchFilter";
import { TableWrapper, Wrapper } from "../../../commons/Wrapper";
import {
  PA_CONFIG_SUMMARY,
  PA_CATEGORY_CONFIGURATION_LIST,
  EMPLOYEE_PA_CREATE,
  PA_SUB_CRITERIA_CONFIGURATION_CREATE,
  PA_SUB_CATEGORY_CONFIGURATION_LIST,
  PA_CRITERIA_CONFIGURATION_LIST,
  PA_SUB_CRITERIA_CONFIGURATION_LIST,
  DEPARTMENT_LIST,
  PA_SCORE_LIST
} from "../../../../scripts/api";
import { postData, getData } from "../../../../scripts/api-service";
import SubCategoryContentForm from "./subcategoryForm";

const stepStyle = {
  marginBottom: 60,
  boxShadow: '0px -1px 0 0 #e8e8e8 inset',
};

const PAFillupCreate = () => {
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
  const [current, setCurrent] = useState(0);
  const [savedPa, setSavedPa] = useState(null);

  let searchUrl = window.location.search;
  let params = new URLSearchParams(searchUrl);
  let isdev = params.get('dev');

  const [stepers, setStepers] = useState([]);

  const getPAScore = async () => {
    let res = await getData(PA_SCORE_LIST);

    if (res) {
      let masterData = res?.data?.data?.data;
      setPAScoreList(masterData)
    }
  };

  const getEmployeeParams = async () => {
    let res = await getData(EMPLOYEE_PA_CREATE + '/' + kamId + '/' + paTypeId);

    if (res) {
      let masterData = res?.data?.data;

      if (masterData?.length) {
        let steps = [];

        masterData.forEach(category => {
          // steps = [...steps, ...category.pa_sub_categories];
          category.pa_sub_categories.forEach(subCategory => {
            let cat = {
              pa_sub_categorie: [subCategory],
              pa_category_config_id: category.pa_category_config_id,
              pa_category_config_weight: category.pa_category_config_weight,
              pa_category_name: category.pa_category_name,
              pa_type_id: category.pa_type_id
            }

            steps.push(cat);
          })
        });

        setStepers(steps);

        setEmployeePAList(masterData);
      }
    }
  };

  const onSteperChange = (num) => {
    setCurrent(num);
  }

  const roundNumber = (number) => {
    return number.toFixed(2);
  }

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (kamId) getEmployeeParams();
  }, [kamId])

  return (
    <Wrapper>
      <div id="stepper">
      <PageHeader
        style={{
          border: '1px solid rgb(235, 237, 240)',
        }}
        // onBack={() => history.push(`/supervisor-panel/pa-fillup-list?emp_id=${kamId}`)}
        backIcon={<Icon type="left" />}
        title={`Employee Name: ${KamName}`}
        extra={[
          // getTotalCategory()
          <div>
            <p>Total Score(Out of 100) : <span id="category-score-total">0.00</span>/100</p>
            <p id="pa-score-status"></p>
          </div>
        ]}
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="Department">{departmentName}</Descriptions.Item>
        </Descriptions>
      </PageHeader>
          <Steps
            type="navigation"
            size="small"
            current={current}
            // onChange={onSteperChange}
            style={stepStyle}
          >
            {
              stepers?.length ? stepers.map(step => <Steps.Step
                key={step.pa_sub_categorie[0].pa_sub_category_config_id}
                title={step.pa_sub_categorie[0].pa_sub_category_name}
                status="finish"
                description= {
                  <>
                    Avg: <span id={`subcriteria-config-${step.pa_sub_categorie[0].pa_sub_category_config_id}`}>0.00</span>/{step.pa_sub_categorie[0].pa_sub_category_config_weight}
                  </>
                }
                // {`Avg: ${<span id="">00</span>}/100`}
              />) : ''
            }
          </Steps>

          {
            stepers.length ? stepers.map((subCategory, index) => <SubCategoryContentForm
                key={'step-' + index}
                current={current} setCurrent={setCurrent}
                index={index} paTypeId={paTypeId} kamId={kamId} month={month} year={year}
                category={subCategory}
                employeePAList={employeePAList}
                setSavedPa={setSavedPa} savedPa={savedPa}
                countStep={stepers.length}
                paScorceList={paScorceList}
              >
            </SubCategoryContentForm>) : ''
          }
        </div>
        
    </Wrapper>
  )
};

export default PAFillupCreate;