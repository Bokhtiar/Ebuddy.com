import { Button, Divider, Modal, Skeleton, Table, Select, Popover, Avatar,Radio } from "antd";
import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { EMPLOYEE_PA_LIST, PA_CATEGORY_CREATE, DEPARTMENT_LIST, USER_TEAM_LIST, PA_TYPE_LIST, USER_LIST, EMP_PA_TYPE, YEARLY_PA_LIST, YEARLY_PA_CHART_EXPORT } from "../../../../../scripts/api";
import ConfigView from "../../../../Configuration/__commons__/ConfigView";
import {dateFormat} from "../../../../../scripts/helper";
import { TableWrapper, Wrapper } from "../../../../commons/Wrapper";
import { Flex } from "../../../../commons/Flex";
import { PageTitle } from "../../../../commons/PageTitle";
import SearchFilter from "../../../../commons/SearchFilter";
import { getData } from "../../../../../scripts/api-service";
import moment from "moment";
import {alertPop} from "../../../../../scripts/message";
import sales_task from "../../../../../assets/icons/test/sales_task_icon.svg";

let years = [],
nextYear = moment().add(10, 'Y').format('YYYY');

for (let i = 2000; i <= nextYear; i++) {
  years.push(i.toString());
}

export default () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedYear, setSelectedYear] = useState(moment().format("YYYY"));
  const [departments, setDepartments] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState();
  const [kamList, setKAMList] = useState();
  const [selectedKAM, setSelectedKAM] = useState();
  const [yearlyList, setYearlyList] = useState();

  const getEmployeeList = async () => {
    let url = YEARLY_PA_LIST + "?";
    if (selectedYear) url = url + "&year=" + selectedYear;
    if (selectedDepartment) url = url + '&department_id=' + selectedDepartment;
    if (selectedKAM) url = url + '&emp_id=' + selectedKAM;

    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      setYearlyList(masterData);
    }
  };
  
  const getDepartments = async () => {
    let res  = await getData(DEPARTMENT_LIST);

    if (res) {
        let masterData = res.data.data;
        setDepartments(masterData);
    }
  }

  const getKAMList = async () => {
    let url = USER_LIST + '?department_id=' + selectedDepartment;
    let res = await getData(url);

    if (res) {
        let masterData = res?.data?.data || [];
        setKAMList(masterData);
    }
  }

  const exportData = async () => {
    let url = YEARLY_PA_CHART_EXPORT + "?";
    if (selectedYear) {
        url = url + "year=" + selectedYear ;
        if (selectedDepartment) url = url + '&department_id=' + selectedDepartment;
        if (selectedKAM) url = url + '&emp_id=' + selectedKAM;
        let res = await getData(url);
        if(res){
          let masterData = res?.data?.data;
          window.open(masterData);
        }
    }
    else alertPop("error", "Please select year");
  }
  
  const columns = [
    { 
      title: "Department", 
      dataIndex: "department", 
      key: "department",
    },
    { title: "Employee Name",
      dataIndex: "name", 
      key: "name",
    },
    { title: "Month",
      key: "date",
      render: () =>  <span className="employee-month">{selectedYear}</span>
    },
    { title: "Weight",
      key: "score",
      render: (row)=> 
      <span className="employee-mark">{`${row?.total ? row?.total.toFixed(2) : 0} out of 100`}</span>,
    },
    {
      title: "Performance",
      key: "sts",
      render: (row) => <span className="employee-status">{row?.score ? row?.score : 0}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (row) => 
      <Button 
        className="mr-2" 
        size="small"
        type="primary" 
        ghost
      >
        <Link 
          to={`/supervisor-panel/pa-fillup-details?emp_id=${row.emp_id}&year=${selectedYear}&empName=${row?.name || ''}${row?.department ? '&departmentName='+ row?.department : ''}`} 
          style={{color:'#5BB7FF', fontSize: '11px'}}>
          Details
        </Link>
    </Button>,
    },
  ];

  useEffect(() => {
    getDepartments();
  }, []);

  useEffect(() => {
    if(selectedDepartment) getKAMList();
  }, [selectedDepartment]);

  useEffect(() => {
    getEmployeeList();
  }, [selectedYear, selectedDepartment, selectedKAM, currentPage]);
  
  return (
    <Wrapper>
      <Flex space="1rem" justify="flex-start">
        <Select 
          allowClear={false}
          style={{width: '12%', 'marginRight': '1rem'}} 
          placeholder='Year'
          showSearch
          value={selectedYear}
          onChange={(value)=>setSelectedYear(value)}                    
          filterOption={(input, option) =>
              option.props.children
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0}
        >
          {years.map(y => <Select.Option key={y} value={y}>{y}</Select.Option>)}
        </Select>
        <Select allowClear={true} 
          style={{width: '25%', 'marginRight': '1rem'}} 
          placeholder='Department'
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
          option.props.children
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0}
          value={selectedDepartment ? selectedDepartment : undefined }
          onChange={(e) => {setSelectedDepartment(e); setSelectedKAM(null); }}>
          {
            departments?.length ? 
                departments.map(dep => <Select.Option value={dep.id} key={dep.id}>{dep.name}</Select.Option>) : ''
          }
      </Select>
        <Select 
          allowClear={true} 
          style={{width: '25%', 'marginRight': '1rem'}} 
          placeholder='Employee'
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
          option.props.children
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0}
          onChange={(e) => setSelectedKAM(e)}>
          {
            kamList?.length ? 
                kamList.map(kam => <Select.Option value={kam.emp_id} key={kam.emp_id}>{kam.name}</Select.Option>) : ''
          }
      </Select>
      <Button 
        type="primary"
        onClick={()=> exportData()}
      >Export Chart</Button>
      </Flex>
      <Divider />
      {yearlyList ? (
        <Table
          className="pa-employee-table"
          dataSource={yearlyList}
          columns={columns}
          // pagination={false}
          // scroll={{ y: "calc(100vh - 22rem)" }}
          // pagination={{
          //   current: currentPage,
          //   total: pageCount * 10,
          //   onChange: (page) => setCurrentPage(page),
          // }}
        />
      ) : (
        <LandingContent />
      )}
    </Wrapper>
  );
};

const LandingContent = () => {
  return (
    <div className="landing-content mt-5" style={{textAlign: 'center'}}>
      <img src={sales_task} height="200"/>
      <h2>No data found for the selected year.</h2>
    </div>
  )
}
