import { Button, Input, Radio, Tag, Select, Checkbox,Popover } from "antd";
import React, { useState, useEffect } from "react";
import {
  PIS_JOB_TITLE,
  COMPANY_LIST,
  PIS_DEPARTMENT_LIST,
  USER_LIST,
  TEAMS_LIST,
  TEAMS_CREATE
} from "../../../scripts/api";
import ConfigView from "../__commons__/ConfigView";
import { dateFormat } from "../../../scripts/helper";
import { getData } from "../../../scripts/api-service";
import demoUser from "../../../assets/dummy.jpg";

export default () => {
  const [edit, setEdit] = useState();
  const [companyList, setCompanyList] = useState();
  const [departmentList, setDepartmentList] = useState();
  const [employeeList, setEmployeeList] = useState();
  const [selectedCompany, setSelectedCompany] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState();

  const getCompanyList = async () => {
    let res = await getData(COMPANY_LIST);

    if (res) {
      let masterData = res?.data?.data;
      if (res?.data?.code === 200) {
        setCompanyList(masterData);
      }
    }
  }

  const getDepartmentList = async (id) => {
    let url = PIS_DEPARTMENT_LIST +  '?'
    if(id) url= url + "company_id=" + id;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      if (res?.data?.code === 200) {
        setDepartmentList(masterData);
      }
    }
  }

  const getEmployeeList = async (id) => {
    let url = USER_LIST +  '?'
    if(id) url= url + "department_id=" + id;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      if (res?.data?.code === 200) {
        setEmployeeList(masterData);
      }
    }
  }

  const popoverContent = (members) => {
    return (
      <>
        {members.map((item, index) => <li key={`members-list-${index}`}>
          <p>
            <img src={item.employee.profile_pic || demoUser} width="25" height="25" alt="" /> &nbsp;
            <span>{item.employee.name}</span>
          </p>
        </li>)
        }
      </>
  )}

  useEffect(()=>{
    getCompanyList();
  },[]);

  useEffect(()=>{
    if(selectedCompany) getDepartmentList(selectedCompany);
  },[selectedCompany]);

  useEffect(()=>{
    if(selectedDepartment) getEmployeeList(selectedDepartment);
  },[selectedDepartment]);

  useEffect(()=>{
    if(edit) {
      getDepartmentList();
      getEmployeeList();
    }
  },[edit]);

  const columns = [
    {
      title: "Team Name",
      dataIndex: "name",
      key: "team_name"
    },
    {
      title: "Company Name",
      dataIndex: "company.name",
      key: "company_name"
    },
    {
      title: "Department Name",
      dataIndex: "department.name",
      key: "dept_name"
    },
    { 
      title: "Team Members",
      key: "team_members",
      render: (row)=>
      <Popover content={popoverContent(row?.members)}>
        {`${row?.members?.length ? row?.members?.length : 0} people`}
      </Popover>
    },
    { 
      title: "Created Date", 
      key: "cd", render: ({ created_at }) => <span>{dateFormat(created_at)}</span> 
    },
    {
      title: "Status",
      key: "sts",
      render: (r) => (r.status === 1 ? "Active" : "Inactive"),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Button onClick={() => {
          setEdit(record);
        }} type="link">
          Edit
        </Button>
      ),
    },
  ];

  const fields = [
    {
      id: 1,
      label: "Team Name",
      name: "name",
      component: <Input size="large" placeholder="Team Name" />,
    },
    {
      id: 2,
      label: "Company Name",
      name: "company_id",
      component:
      <Select
        size="large"
        placeholder="Select Company"
        onChange={(value)=>setSelectedCompany(value)}
        showSearch
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
          {companyList ? companyList.map(com => {
            return (<Select.Option key={com.id} value={com.id}>{com.name}</Select.Option>)
          }) : null}
        </Select>,
    },
    {
      id: 3,
      label: "Department Name",
      name: "pis_department_id",
      component:
      <Select
        size="large"
        placeholder="Select Department"
        disabled={!departmentList?.length}
        onChange={(value)=>setSelectedDepartment(value)}
        showSearch
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
          {departmentList ? departmentList.map(dept => {
            return (<Select.Option key={dept.id} value={dept.id}>{dept.name}</Select.Option>)
          }) : null}
        </Select>,
    },
    {
      id: 4,
      label: "Team Lead Name",
      name: "lead_id",
      component:
      <Select
        size="large"
        placeholder="Select Team Lead"
        disabled={!employeeList?.length}
        showSearch
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {employeeList ? employeeList.map(emp => {
          return (<Select.Option key={emp.emp_id} value={emp.emp_id}>{emp.name}</Select.Option>)
        }) : null}
      </Select>,
    },
    {
      id: 5,
      label: "Employee Name",
      name: "employees",
      component:
      <Select 
        mode="multiple" 
        getPopupContainer={trigger => trigger.parentNode} 
        size="large" 
        placeholder='Select Employee Name'
        disabled={!employeeList?.length} 
        showSearch
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {employeeList ? employeeList.map(emp => {
          return (<Select.Option key={emp.emp_id} value={emp.emp_id}>{emp.name}</Select.Option>)
        }) : null}
      </Select>,
    },
    {
      id: 6,
      label: "Status",
      name: "status",
      component: (
        <Radio.Group>
          <Radio value={1}>Active</Radio>
          <Radio value={0}>Inactive</Radio>
        </Radio.Group>
      ),
    },
  ];

  return (<>
    <ConfigView
      columns={columns}
      title="Team"
      title_extension="Team" //create or edit new --title_extn--
      list_api={TEAMS_LIST}
      create_submit_api={TEAMS_CREATE}
      edit_submit_api={TEAMS_CREATE}
      form_fields={fields}
      edit={edit}
      setEdit={setEdit}
    />
  </>
  );
};
