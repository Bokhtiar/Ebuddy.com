import { Button, Steps, Divider, Input, Collapse, Table, Row, Col, Select, Checkbox, PageHeader , message } from "antd";
import React, { Fragment, useState, useEffect } from "react";
import {useHistory} from "react-router-dom";
import { PA_CONFIG_SUMMARY, 
  PA_CATEGORY_CONFIGURATION_LIST,
  PA_CATEGORY_LIST, 
  PA_CRITERIA_CONFIGURATION_CREATE,
  PA_SUB_CRITERIA_CONFIGURATION_CREATE,
  PA_SUB_CATEGORY_CONFIGURATION_LIST,
  PA_SUB_CATEGORY_LIST, 
  PA_CRITERIA_CONFIGURATION_LIST, 
  PA_CRITERIA_DROPDOWN_LIST,
  PA_SUB_CRITERIA_CONFIGURATION_LIST,
  PA_SUB_CRITERIA_DROPDOWN_LIST,
  PA_TYPE_LIST,
  DEPARTMENT_LIST } from "../../../../scripts/api";
import ConfigView from "../../__commons__/ConfigView";
import {dateFormat} from "../../../../scripts/helper";
import { TableWrapper, Wrapper } from "../../../commons/Wrapper";
import { Flex } from "../../../commons/Flex";
import { PageTitle } from "../../../commons/PageTitle";
import SearchFilter from "../../../commons/SearchFilter";
import { postData, getData } from "../../../../scripts/api-service";
import ConfigList from "../pa-configuration-list/index";
import StepOne from './stepOne/index';
import StepTwo from './stepTwo/index';
import StepThree from './stepThree/index';
import StepFour from './stepFour/index';
import { alertPop } from "../../../../scripts/message";

const steps = [
  {
    id: 1,
    title: 'Category',
    content: 'category-configure',
  },
  {
    id: 2,
    title: 'Sub-Category',
    content: 'sub-category-configure',
  },
  {
    id: 3,
    title: 'Criteria',
    content: 'question-group-configure',
  },
  {
    id: 4,
    title: "Sub-Criteria",
    content: 'questions-configure',
  },
];

export default ({context}) => {
  const [edit, setEdit] = useState();
  const [modal, setModal] = useState();
  const [list, setList] = useState();
  const [pageCount, setPageCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchString, setSearchString] = useState();
  const [dateFilter, setDateFilter] = useState();
  const [current, setCurrent] = useState(0);
  const [departments, setDepartments] = useState();
  const [paTypeList, setPATypeList] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState();
  const [categoryList, setCategoryList] = useState();
  const [subCategoryList, setSubCategoryList] = useState();
  const [criteriaList, setCriteriaList] = useState();
  const [subCriteriaList, setSubCriteriaList] = useState();
  const [criteriaConfigList, setCriteriaConfigList] = useState();
  const [subCriteriaConfigList, setSubCriteriaConfigList] = useState();
  const [departmentValue, setDepartmentValue] = useState();
  const [paTypeValue, setPATypeValue] = useState();
  const [criteriaConfigListWithDept, setCriteriaConfigListWithDept] = useState();
  const [isHidePre, setIsHidePre] = useState(false);
  
  const history = useHistory();

  const next = () => setCurrent(current + 1);
  const done = () => {
    let fourthSubmitButton = document.getElementById('fourth-click');
    if (fourthSubmitButton) fourthSubmitButton.click();
  }
  const prev = () => setCurrent(current - 1);

  const getConfigurationList = async (que) => {
    setList(null);
    let url = que + '?page='+ currentPage;

    if (searchString) url = url + "&search=" + searchString;
    if (dateFilter && dateFilter.date_from && dateFilter.date_to) url = url + `&from_date=${dateFilter.date_from}&to_date=${dateFilter.date_to}`;

    let res = await getData(url);

    if (res) {
      setList(res?.data?.data);
      setPageCount(res?.data?.last_page);
    }
  };

  const getDepartments = async () => {
    let res  = await getData(DEPARTMENT_LIST);

    if (res) {
        let masterData = res.data.data;
        setDepartments(masterData);
    }
  }

  const getPATypeList = async () => {
    let res  = await getData(PA_TYPE_LIST);

    if (res) {
        let masterData = res.data.data;
        setPATypeList(masterData);
    }
  }

  const getCategoryList = async () => {
    let res = await getData(PA_CATEGORY_LIST);

    if (res) {
      setCategoryList(res?.data?.data?.data);
    }
  };

  const getSubCategoryList = async () => {
    let res = await getData(PA_SUB_CATEGORY_LIST);

    if (res) {
      setSubCategoryList(res?.data?.data?.data);
    }
  };

  const getCriteriaList = async () => {
    let res = await getData(PA_CRITERIA_DROPDOWN_LIST);

    if (res) {
      setCriteriaList(res?.data?.data);
    }
  };

  const getCriteriaConfigList = async () => {
    let res = await getData(PA_CRITERIA_CONFIGURATION_LIST);

    if (res) {
      setCriteriaConfigList(res?.data?.data);
    }
  };

  const getSubCriteriaList = async () => {
    let res = await getData(PA_SUB_CRITERIA_DROPDOWN_LIST);

    if (res) {
      setSubCriteriaList(res?.data?.data);
    }
  };

  const getSubCriteriaConfigList = async () => {
    let res = await getData(PA_SUB_CRITERIA_CONFIGURATION_LIST);

    if (res) {
      setSubCriteriaConfigList(res?.data?.data);
    }
  };

  const selectDepartment = (value) => {
    setSelectedDepartment(value);
  }

  const search = (value) => setSearchString(value);
  const filter = (filter) => setDateFilter(filter);

  const getCriteriaConfigListWithDept = async (departmentId, paTypeId) => {
    let res = await getData(PA_CRITERIA_CONFIGURATION_LIST + `?department_id=${departmentId}&pa_type_id=${paTypeId}`);

    if (res) {
      setCriteriaConfigListWithDept(res?.data?.data);
    }
  };

  const thirdSubmit = async (data) => {
    setDepartmentValue(data.department_id);
    setPATypeValue(data.pa_type_id);
    let res = await postData(PA_CRITERIA_CONFIGURATION_CREATE, {...data});

    if (res) {
      let masterData = res.data.data;
      getCriteriaConfigListWithDept(data.department_id, data.pa_type_id);
      alertPop("success", "Process completed successfully!");
      setIsHidePre(true);
    } else {
      prev();
    }
    // else return alertPop("error", "Something went wrong!");
  }

  const fourthSubmit = async (data) => {
    let res = await postData(PA_SUB_CRITERIA_CONFIGURATION_CREATE, {...data});

    if (res) {
        let masterData = res.data.data;
        alertPop("success", "Process completed successfully!");
        history.push('/configuration/configuration-list');
    }
    // else return alertPop("error", "Something went wrong!");
  }

  // submit criteria form
  useEffect(() => {
    if(current === 3){
      let thirdSubmitButton = document.getElementById('third-click');
      if (thirdSubmitButton) thirdSubmitButton.click();
    }
  }, [current]);

  useEffect(() => {
    getConfigurationList(PA_CONFIG_SUMMARY);
    getDepartments();
    getPATypeList();
    getCategoryList();
    getSubCategoryList();
    getCriteriaList();
    getSubCriteriaList();
    getCriteriaConfigList();
    getSubCriteriaConfigList();
  }, [currentPage]);

  useEffect(() => {
    if (currentPage === 1) getConfigurationList(PA_CATEGORY_CONFIGURATION_LIST);
    else setCurrentPage(1);
  }, [dateFilter, searchString]);

  const columns = [
    { title: "Department", dataIndex: "department", key: "department" },
    { title: "Category", dataIndex: "pa_category_id", key: "pa_category_id" },
    { title: "Sub Category", dataIndex: "sub-category", key: "sub-category" },
    { title: "Question Group", dataIndex: "question-group", key: "question-group" },
    { title: "Question's", dataIndex: "question's'", key: "question's" },
    { title: "Created By", key: "cb", render: (r) => r?.created_by?.name },
    { title: "Created Date", 
      key: "cd",
      render: ({ created_at }) => <span>{dateFormat(created_at)}</span>,
    },
    { title: "Weight", dataIndex: "weight", key: "weight" },
    {
      title: "Status",
      key: "sts",
      render: (r) => (r.status === 1 ? "Active" : "Inactive"),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Button onClick={() => setEdit(record)} type="link">
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Wrapper>
      {/* <SearchFilter
        search={search}
        filter={filter}
        filterOptions={[{ type: "date_range" }]}
        failsafe
      /> */}
      <div style={{margin: '1rem'}}>
      <h3 className="p-4"><strong>PA Configure</strong></h3>
        <Steps current={current}>
          {steps.map(item => (
            <Steps.Step key={item.title} title={item.title}/>
          ))}
        </Steps>
        <div className="steps-content p-4">
          {/* step -1 */}
        {/* {steps[current].id === 1 ?  */}
          <StepOne 
            departments={departments}
            selectedDepartment={selectedDepartment}
            selectDepartment={selectDepartment}
            categoryList={categoryList}
            steps={steps}
            current={current}
          />
          {/* // step - 2 */}
        {/* :steps[current].id === 2 ? */}
          <StepTwo 
            categoryList={categoryList}
            subCategoryList={subCategoryList}
            steps={steps}
            current={current}
          />
        {/* // step - 3 
        :steps[current].id === 3 ? */}
          <StepThree 
            departments={departments}
            paTypeList={paTypeList}
            categoryList={categoryList}
            subCategoryList={subCategoryList}
            criteriaList={criteriaList}
            criteriaConfigList={criteriaConfigList}
            current={current}
            thirdSubmit={thirdSubmit}
            steps={steps}
            context={context}
            previous={prev}
          />
        {/* // step - 4
        :steps[current].id === 4 ? */}
          <StepFour 
            departments={departments}
            categoryList={categoryList}
            subCategoryList={subCategoryList}
            criteriaList={criteriaList}
            current={current}
            fourthSubmit={fourthSubmit}
            steps={steps}
            subCriteriaList={subCriteriaList}
            subCriteriaConfigList={subCriteriaConfigList}
            context={context}
            departmentValue={departmentValue}
            paTypeValue={paTypeValue}
            criteriaConfigList={criteriaConfigListWithDept}
          />
        {/* :null} */}
        </div>
        <div className="steps-action">
          <Divider className="m-2"/>
          {/* {(current > 0 && !isHidePre) && (
            <Button style={{ margin: 8 }} onClick={() => prev()}>
              Previous
            </Button>
          )} */}
          {/* form='third-submit' htmlType="submit"  */}
          {current < steps.length - 1 && (
            <Button style={{ margin: 8, float:'right' }} type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button style={{ margin: 8, float:'right' }} type="primary" onClick={() => done()}>
              Done
            </Button>
          )}
        </div>
      </div>
    </Wrapper>
  );
};
