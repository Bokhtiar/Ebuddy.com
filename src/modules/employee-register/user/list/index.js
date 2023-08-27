
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Select, Table, Tag, Input } from "antd";
import {
  PIS_COMPANY_LIST,
  PIS_DEPARTMENT_LIST,
  EMPLOYEE_INFO_LIST,
  USER_LIST,
  EMPLOYEE_LIST_ALL
} from "../../../../scripts/api";
import { alertPop } from "../../../../scripts/message";
import { getData } from "../../../../scripts/api-service";
import { Flex } from "../../../commons/Flex";
import { TableWrapper, Wrapper } from "../../../commons/Wrapper";
import moment from 'moment';
import sales_task from "../../../../assets/icons/test/sales_task_icon.svg";

export default () => {
  const [pageCount, setPageCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [companyList, setCompanyList] = useState();
  const [selectedCompany, setSelectedCompany] = useState();
  const [departmentList, setDepartmentList] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState();
  const [employeeList, setEmployeeList] = useState();
  const [employeeInfoList, setEmployeeInfoList] = useState();
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [selectedStatus, setSelectedStatus] = useState();
  const [selectedJoiningDate, setSelectedJoiningDate] = useState();
  const [empId, setEmpId] = useState();
  const [loading, setLoading] = useState(false);

  const statusColor = (rowData) => {
    if (rowData?.status === 'Inactive') return <Tag color="red" style={{ backgroundColor: '#FFFFFF', color: 'red' }}>Inactive</Tag>;
    if (rowData?.status === 'Active') return <Tag color="green" style={{ backgroundColor: '#FFFFFF', color: 'green' }}>Active</Tag>;
  }

  const getEmployeeInfoList = async () => {
    setEmployeeInfoList(null);
    // + '?page='+ currentPage
    let url = EMPLOYEE_LIST_ALL + '?page='+ currentPage;
    if (selectedCompany) url = url + "&company_id=" + selectedCompany;
    if (selectedDepartment) url = url + "&department_id=" + selectedDepartment;
    if (selectedEmployee) url = url + "&emp_id=" + selectedEmployee;
    if (empId) {
      setLoading(true);
      url = url + "&emp_id=" + empId;
    }
    if (selectedJoiningDate) url = url + "&joining_date=" + moment(selectedJoiningDate).format('YYYY-MM-DD');
    if (selectedStatus !== undefined) url = url + "&status=" + selectedStatus;

    let res = await getData(url);

    if (res) {
      setLoading(false);
      let masterData = res?.data?.data?.data;
      setEmployeeInfoList(masterData || []);
      setPageCount(res?.data?.data?.last_page);
    }
  };

  const getCompanyList = async () => {
    let url = PIS_COMPANY_LIST + "?";
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data?.data;
      setCompanyList(masterData);
    }
  };

  const getDepartmentList = async () => {
    let url = PIS_DEPARTMENT_LIST + "?"; 
    if(selectedCompany) url = url + "&company_id=" + selectedCompany;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      setDepartmentList(masterData);
    }
  };

  const getUserList = async () => {
        let url = USER_LIST + "?";
        if(selectedDepartment) url = url + "department_id=" + selectedDepartment; 
        let res = await getData(url);
    
        if (res) {
            let masterData = res?.data?.data;
            if (res.data.code === 200) {
              setEmployeeList(masterData);
            }
        }
  }

  useEffect(()=>{
    getCompanyList();
  },[]);

  useEffect(()=>{
    if(selectedCompany) getDepartmentList();
  },[selectedCompany]);

  useEffect(()=>{
    if(selectedDepartment) getUserList();
  },[selectedDepartment]);

  useEffect(() => {
    getEmployeeInfoList();
  }, [selectedCompany, selectedDepartment, selectedEmployee, selectedStatus, currentPage, empId]);
  
  const columns = [
    {
      title: "Emp ID",
      key: "emp_id",
      render: (row) => row?.emp_id
    },
    {
      title: "Employee Name",
      key: "employee_name",
      render: (row) => row?.name
    },
    {
      title: "Company Name",
      key: "company_name",
      render: (row) => row?.company?.name
    },
    {
      title: "Department Name",
      key: "department_name",
      render: (row) => row?.department?.name
    },
    {
      title: "Designation",
      key: "designation",
      render: (row) => row?.designation?.name
    },
    {
      title: "Joining Date",
      key: "joining_date",
      render: (row) => moment(row?.joining_date).format("D MMM YYYY"),
    },
    {
      title: "Status",
      key: "sts",
      render: (row) => statusColor(row)
    },
    {
      title: "Action",
      key: "action",
      render: (row) =>
        <Button
          type="link"
          onClick={() => window.open(`/employee-register/user-create?emp_id=${row?.emp_id}&edit=1`)}
        >
          Edit
        </Button>
    },
  ];

  return (
    // <TableWrapper>
    <Wrapper>
      <Flex space="1rem" justify="">
        <Input.Search
          placeholder="Search by employee ID"
          enterButton="Search"
          onSearch={(value) => setEmpId(value)}
          loading={loading}
        />
      </Flex>
      <Flex space="1rem" justify="">
        <Button
          style={{ width: '25%', 'marginRight': '1rem' }}
          type="primary"
        >
          <Link
            to={`/employee-register/user-create`}>
            Create New User
          </Link>
        </Button>
        <Select 
          allowClear={true}
          style={{width: '25%', 'marginRight': '1rem'}} 
          placeholder='Company'
          showSearch
          value={selectedCompany}
          onChange={(value)=>{
            setSelectedCompany(value)
            setSelectedDepartment(null)
            setSelectedEmployee(null)
          }}
          filterOption={(input, option) =>
            option.props.children
            .toLowerCase()
            .indexOf(input.toLowerCase()) >= 0}
        >
            {companyList?.map(m => <Select.Option key={m.value} value={m.id}>{m.name}</Select.Option>)}
        </Select>
        <Select 
          allowClear={true}
          style={{width: '25%', 'marginRight': '1rem'}} 
          placeholder='Department'
          showSearch
          value={selectedDepartment ? selectedDepartment : undefined}
          onChange={(value)=>{
            setSelectedDepartment(value)
            setSelectedEmployee(null)
          }}
          filterOption={(input, option) =>
            option.props.children
            .toLowerCase()
            .indexOf(input.toLowerCase()) >= 0}
        >
          {departmentList?.map(m => <Select.Option key={m.value} value={m.id}>{m.name}</Select.Option>)}
        </Select>
        <Select 
          allowClear={true}
          style={{width: '25%', 'marginRight': '1rem'}} 
          placeholder='Employee'
          showSearch
          value={selectedEmployee ? selectedEmployee : undefined}
          onChange={(value)=>setSelectedEmployee(value)}
          filterOption={(input, option) =>
            option.props.children
            .toLowerCase()
            .indexOf(input.toLowerCase()) >= 0}
        >
          {employeeList?.map(m => <Select.Option key={m.value} value={m.emp_id}>{m.name}</Select.Option>)}
        </Select>
        <Select
          allowClear={true}
          style={{ width: '25%', 'marginRight': '1rem' }}
          placeholder='Status'
          showSearch
          value={selectedStatus}
          onChange={(value) => setSelectedStatus(value)}
          filterOption={(input, option) =>
            option.props.children
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0}
        >
          <Select.Option key="Active" value={1}>Active</Select.Option>
          <Select.Option key="Inactive" value={0}>Inactive</Select.Option>
          {/* <Select.Option key="Blocked" value={3}>Blocked</Select.Option> */}
        </Select>
      </Flex>
      {employeeInfoList?.length > 0 ? (
        <Table
          dataSource={employeeInfoList}
          columns={columns}
          scroll={{ y: "calc(100vh - 19rem)" }}
          // pagination={false}
          pagination={{
            current: currentPage,
            total: pageCount * 10,
            onChange: (page) => setCurrentPage(page),
          }}
        />
      ) : <LandingContent />}
    </Wrapper>
  );
};

const LandingContent = () => {
  return (
    <div className="landing-content mt-5" style={{ textAlign: 'center' }}>
      <img src={sales_task} height="200" />
      <h2>No Data found</h2>
    </div>
  )
}