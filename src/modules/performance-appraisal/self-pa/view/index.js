import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Input, Collapse, Row, Col, Select, Checkbox, Form, Button, PageHeader, Icon, Descriptions, InputNumber, Tag, Steps } from "antd";
import { alertPop } from "../../../../scripts/message";
import SearchFilter from "../../../commons/SearchFilter";
import { TableWrapper, Wrapper } from "../../../commons/Wrapper";
import {
  PA_CONFIG_SUMMARY,
  PA_CATEGORY_CONFIGURATION_LIST,
  EMPLOYEE_PA_CREATE,
  EMPLOYEE_PA_UPDATE,
  PA_SUB_CRITERIA_CONFIGURATION_CREATE,
  PA_SUB_CATEGORY_CONFIGURATION_LIST,
  PA_CRITERIA_CONFIGURATION_LIST,
  PA_SUB_CRITERIA_CONFIGURATION_LIST,
  PA_SCORE_LIST
} from "../../../../scripts/api";
import { postData, getData } from "../../../../scripts/api-service";

import SubCategoryForm from "./subCategoryForm";

const stepStyle = {
  marginBottom: 60,
  boxShadow: '0px -1px 0 0 #e8e8e8 inset',
};

const SelfPAFillupView = Form.create()(
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
    const [current, setCurrent] = useState(0);


    const [stepers, setStepers] = useState([]);

    const getEditData = async (id) => {
      let res = await getData(EMPLOYEE_PA_UPDATE + '/' + id);
      if (res) {
        let masterData = res?.data?.data,
          cates = [];

        if (masterData?.pa_emp_categories?.length) {
          masterData.pa_emp_categories.forEach(cat => {

            cat.pa_employee_sub_categories.forEach(subCat => {
              let data = {
                emp_pa_id: cat.emp_pa_id,
                emp_score: cat.emp_score,
                emp_weight: cat.emp_weight,
                id: cat.id,
                pa_category_config_id: cat.pa_category_config_id,
                pa_category_name: cat.pa_category_name,
                pa_weight: cat.pa_weight,
                status: cat.status
              };
              data.pa_employee_sub_categories = [subCat];

              cates.push(data);
            });

          });

          setStepers(cates);
        }

        setUpdatedEmployeePAList(masterData);
      }
    };

    const getPAScore = async () => {
      let res = await getData(PA_SCORE_LIST);

      if (res) {
        let masterData = res?.data?.data?.data;
        setPAScoreList(masterData)
      }
    };

    useEffect(() => {
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
    }, []);

    useEffect(() => {
      if (paId) getEditData(paId);
    }, [paId]);

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
              <div>
                <p>Total Score(Out of 100) : <span id="category-score-total">0.00</span>/100</p>
                <p id="pa-score-status"></p>
              </div>
            ]}
          >
            {/* <Descriptions size="small" column={3}>
              <Descriptions.Item label="Department">{departmentName}</Descriptions.Item>
            </Descriptions> */}
          </PageHeader>
            {/* <div> */}
              <Steps
                type="navigation"
                size="small"
                current={current}
                style={stepStyle}
              >
                {
                  stepers?.length ? stepers.map(step => <Steps.Step
                    key={step.pa_employee_sub_categories[0].pa_sub_category_config_id}
                    title={step.pa_employee_sub_categories[0].pa_sub_category_name}
                    // status="finish"
                    description={
                      <>
                        Avg: <span id={`subcriteria-config-${step.pa_employee_sub_categories[0].pa_sub_category_config_id}`}>0.00</span>/{step.pa_employee_sub_categories[0].pa_weight}
                      </>
                    }
                  />) : ''
                }
              </Steps>

              {
                stepers?.length ? stepers.map((category, index) => <SubCategoryForm
                  key={'step-' + index}
                  current={current} setCurrent={setCurrent} paId={paId}
                  index={index} paTypeId={paTypeId} kamId={kamId} month={month} year={year}
                  category={category}
                  updatedEmployeePAList={updatedEmployeePAList}
                  countStep={stepers.length}
                  paScorceList={paScorceList}
                >
                </SubCategoryForm>) : ''
              }
        </div>
      </Wrapper>
    )
  })

export default SelfPAFillupView;