import { Button, Divider, Modal, Skeleton, Table, Select, Popover, Avatar,Radio } from "antd";
import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { DEPARTMENT_LIST, USER_LIST, MANAGEMENT_PA_LIST } from "../../../../scripts/api";
import ConfigView from "../../../Configuration/__commons__/ConfigView";
import {dateFormat} from "../../../../scripts/helper";
import { TableWrapper, Wrapper } from "../../../commons/Wrapper";
import { Flex } from "../../../commons/Flex";
import { PageTitle } from "../../../commons/PageTitle";
import SearchFilter from "../../../commons/SearchFilter";
import { getData } from "../../../../scripts/api-service";
import moment from "moment";

let years = [],
    nextYear = moment().add(10, 'Y').format('YYYY');

    for (let i = 2000; i <= nextYear; i++) {
        years.push(i.toString());
    }

let months = [
    {value: "1", text: "January"},
    {value: "2", text: "February"},
    {value: "3", text: "March"},
    {value: "4", text: "April"},
    {value: "5", text: "May"},
    {value: "6", text: "June"},
    {value: "7", text: "July"},
    {value: "8", text: "August"},
    {value: "9", text: "September"},
    {value: "10", text: "October"},
    {value: "11", text: "November"},
    {value: "12", text: "December"}
];

export default () => {
  const [edit, setEdit] = useState();
  const [modal, setModal] = useState();
  const [list, setList] = useState();
  const [customList, setCustomList] = useState();
  const [paUserList, setPAUserList] = useState();
  const [pageCount, setPageCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchString, setSearchString] = useState();
  const [dateFilter, setDateFilter] = useState();
  const [selectedYear, setSelectedYear] = useState(moment().format("YYYY"));
  // const [selectedMonth, setSelectedMonth] = useState(moment().format("M"));
  const [selectedMonth, setSelectedMonth] = useState(moment().subtract(1, 'months').format("M")); //by default previous month is selected.
  const [status, setStatus] = useState("");
  const [departments, setDepartments] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState();
  const [departmentName, setDepartmentName] = useState("");
  const [monthName, setMonthName] = useState("");
  const [isDisabledType, setIsDisabledType] = useState(true);
  const [kamList, setKAMList] = useState();
  const [selectedKAM, setSelectedKAM] = useState();
  const [paramKAM, setParamKAM] = useState();
  const [permissionModal, setPermissionModal] = useState();
  const [rowData, setRowData] = useState();
  const [paTypeList, setPATypeList] = useState();
  const [selectedPA, setSelectedPA] = useState();

  const getEmployeeList = async (que) => {
    setList(null);
    // + '?page='+ currentPage
    let url = que + "?";
    if (searchString) url = url + "&search=" + searchString;
    if (selectedYear) url = url + "&year=" + selectedYear;
    if (monthName) url = url + "&month=" + monthName;
    if (status) url = url + "&status=" + status;
    if (selectedDepartment) url = url + '&department_id=' + selectedDepartment;
    if (selectedKAM) url = url + '&emp_id=' + selectedKAM;
    if (paramKAM) url = url + '&emp_id=' + paramKAM;
    if (dateFilter && dateFilter.date_from && dateFilter.date_to) url = url + `&from_date=${dateFilter.date_from}&to_date=${dateFilter.date_to}`;

    let res = await getData(url);

    if (res) {
      setList(res?.data?.data);

      let departmentName = departments?.filter(item => item.id === selectedDepartment)[0]?.name;
      setDepartmentName(departmentName);
    }
    setIsDisabledType(false);
  };

  const search = (value) => setSearchString(value);
  const filter = (filter) => setDateFilter(filter);
  
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

  const columns = [
    { 
      title: "Department", 
      key: "department",
      render:(row)=> <span className="department-name">{row.department?.name}</span>
    },
    { title: "Employee Name",
      key: "name",
      render:(row)=> <Popover 
                          content={row?.employee?.name}
                          placement="bottomLeft"
                      >
                        {row?.employee?.profile_pic ?
                          <Avatar 
                              src={row?.employee?.profile_pic}   
                              size='medium' 
                              icon="user" 
                          />
                          :
                          <Avatar 
                            size='medium' 
                            icon="user" 
                          />
                        }
                          <span className="ml-2 employee-name">{row?.employee?.name}</span>
                      </Popover>,
    },
    { title: "Employee Type", key: "employee_category", 
      render: (row) =>  <span className="employee-category">{row.employee?.employee_category}</span>},
    { title: "Month",
      key: "date",
      render: () =>  <span className="employee-month">{moment().month(selectedMonth).subtract(1, 'months').format("MMMM")} - {selectedYear}</span>
    },
    { title: "Weight",
      key: "score",
      render: (row)=> 
      <span className="employee-mark">{row.weight ? <p>{row.weight} out of 100</p> : <span className="soft-employee">00 out of 100</span>}</span>,
    },
    {
      title: "Performance",
      key: "sts",
      render: (row) => row.pa_score ? <span style={{color: row.pa_score?.color}}>{row.pa_score?.name}</span> : <span className="soft-employee">N/A</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (row) =>
        <>
          <Button 
            size="small"
            style={{ fontSize: '11px'}}
          >
            <Link 
              to={`/management-panel/pa-fillup-view?paId=${row?.id}&empId=${row?.emp_id}&empName=${row?.employee?.name}${departmentName ? '&departmentName='+ departmentName : ''}${selectedYear ? '&year='+ selectedYear : ''}${monthName ? '&monthName='+ monthName : ''}`} 
              style={{ color:'#5BB7FF', fontSize: '11px'}}
            >View</Link>
          </Button>
        </>,
    },
  ];

  const monthCalculation = (value) =>{
    setSelectedMonth(value);
    if(value){
      let monthName = months?.filter(item => item.value === value)[0].text;
      setMonthName(monthName);
    }
  }

  useEffect(() => {
    getDepartments();
    let monthName = months?.filter(item => item.value === selectedMonth)[0].text;
    setMonthName(monthName);
    getKAMList();

    let searchUrl = window.location.search;
    let params = new URLSearchParams(searchUrl);
    let paramsKam = params.get('emp_id');
    let kamId = paramsKam ? paramsKam * 1 : undefined;
    setParamKAM(kamId);
  }, []);

  useEffect(() => {
    if(selectedDepartment) getKAMList();
  }, [selectedDepartment]);

  useEffect(() => {
    // if (currentPage === 1) getEmployeeList(EMPLOYEE_PA_LIST);
    // else setCurrentPage(1);
    if(selectedYear && monthName) getEmployeeList(MANAGEMENT_PA_LIST);
  }, [selectedYear, monthName, selectedDepartment, selectedKAM, currentPage, paramKAM]);

  useEffect(() => {
    if(paUserList && status){
      let updatedList = [];
      Object.values(paUserList).forEach(paUser=>{
        if(paUser[0].status === status) {
          updatedList.push(customList.find(data=> data.emp_id === paUser[0].emp_id));
          // console.log("paUser[0].status", paUser[0].status);
          // console.log("updatedList", updatedList);
        }
      })
      setList(updatedList);
    }
    else if(selectedDepartment || selectedKAM || paramKAM) getEmployeeList(MANAGEMENT_PA_LIST);
  }, [status, selectedDepartment, selectedKAM, paramKAM]);
  
  useEffect(() => {
    if(paTypeList){
      let defaultPA = paTypeList[0].id;
      setSelectedPA(defaultPA);
    }
  }, [paTypeList]);

  return (
    <Wrapper>
      {/* <SearchFilter
        search={search}
        filter={filter}
        filterOptions={[{ type: "date_range" }]}
        failsafe
      /> */}
      <Flex space="1rem" justify="flex-start">
        <Select 
            allowClear={false}
            disabled={isDisabledType}
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
        <Select 
            allowClear={false}
            disabled={isDisabledType}
            style={{width: '20%', 'marginRight': '1rem'}} 
            placeholder='Month'
            showSearch
            value={selectedMonth}
            onChange={(value)=>monthCalculation(value)}
            filterOption={(input, option) =>
                option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0}
        >
            {months.map(m => <Select.Option key={m.value} value={m.value}>{m.text}</Select.Option>)}
        </Select>
        <Select allowClear={true} 
          disabled={isDisabledType}
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
          disabled={isDisabledType}
          style={{width: '25%', 'marginRight': '1rem'}} 
          placeholder='Employee'
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
          option.props.children
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0}
          value={selectedKAM ? selectedKAM : paramKAM }
          onChange={(e) => setSelectedKAM(e)}>
          {
            kamList?.length ? 
                kamList.map(kam => <Select.Option value={kam.emp_id} key={kam.emp_id}>{kam.name}</Select.Option>) : ''
          }
      </Select>
        {/* <Select 
            allowClear={true}
            disabled={isDisabledType}
            style={{width: '20%', 'marginRight': '1rem'}} 
            placeholder='Status'
            showSearch
            onChange={(value)=>setStatus(value)}
            filterOption={(input, option) =>
                option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0}
        >
          <Select.Option key='Created' value='Created'>Created</Select.Option>
            <Select.Option key='Reviewed' value='Reviewed'>Reviewed</Select.Option>
        </Select> */}
      </Flex>
      <Divider />
      {list ? (
        <Table
          className="pa-employee-table"
          dataSource={list}
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
        <Skeleton active className="pad" />
      )}

      <Modal
        title="Select User PA Type"
        centered
        visible={permissionModal}
        onCancel={() => setPermissionModal(false)}
        footer={false}
        maskClosable={false}
      >
        <Select 
          allowClear={true}
          style={{width: '100%', 'margin': '0.5rem 0rem'}} 
          showSearch
          placeholder='Select PA Type'
          value={selectedPA ? selectedPA : undefined }
          onChange={(value)=>setSelectedPA(value)}
          filterOption={(input, option) =>
          option.props.children
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0
          }
        >   
          {
            paTypeList?.length ? 
              paTypeList.map(pa => <Select.Option value={pa.id} key={pa.id}>{pa.name}</Select.Option>) : ''
          }
        </Select>
        
        <Button
            // loading={loading}
            size="large"
            block
            type="primary"
            htmlType="submit"
          >
            <Link 
            to={`/supervisor-panel/pa-fillup-create?empId=${rowData?.emp_id}&empName=${rowData?.name}${'&department_id=' + rowData?.department_id}${'&pa_type_id=' + selectedPA}${'&departmentName='+ rowData?.designation}${selectedYear ? '&year='+ selectedYear : ''}${monthName ? '&monthName='+ monthName : ''}`} 
            style={{ color:'#FFFFFF' }}>Proceed</Link>
          </Button>
      </Modal>

    </Wrapper>
  );
};
