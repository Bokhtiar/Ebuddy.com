import { Button, Input, Radio, Tag, Select } from "antd";
import React, { useState, useEffect } from "react";
import {
  PIS_DEPARTMENT_LIST,
  LEAVE_PACKAGE,
  COMPANY_LIST
} from "../../../../scripts/api";
import ConfigView from "../../__commons__/ConfigView";
import {dateFormat} from "../../../../scripts/helper";
import { getData } from "../../../../scripts/api-service";

export default () => {
  const [edit, setEdit] = useState();
  const [categoryDropdownList, setCategoryDropdownList] = useState();
  const [departmentList, setDepartmentList] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState();
  const [selectedDepartmentId, setSelectedDepartmentId] = useState();
  const [selectedCompany, setSelectedCompany] = useState();
  const [selectedCompanyId, setSelectedCompanyId] = useState();
  const [companyList, setCompanyList] = useState();

  const getDepartmentList = async () => {
    let res = await getData(PIS_DEPARTMENT_LIST);

    if (res) {
      let masterData = res?.data?.data;
      if (res.data.code === 200) {
        setDepartmentList(masterData);
      }
    }
  }

  const getCompanyList = async () => {
    let res = await getData(COMPANY_LIST);

    if (res) {
      let masterData = res?.data?.data;
      if (res?.data?.code === 200) {
        setCompanyList(masterData);
      }
    }
  }

  useEffect(()=>{
    getCompanyList();
  },[]);

  useEffect(()=>{
    getDepartmentList();
  },[selectedCompanyId, edit]);

  const columns = [
    { title: "Package Name", dataIndex: "name", key: "fname" },
    { title: "Department", 
      key: "department",
      render: row => row.department?.name
    },
    { title: "Company", 
      key: "company",
      render: row => row.company?.name
    },
    { title: "Annual", key: "cb", render: (r) => parseFloat(r.annual_leave || 0).toFixed(2)},
    { title: "Casual", key: "cb", render: (r) => parseFloat(r.casual_leave || 0).toFixed(2) },
    { title: "Medical", key: "cb", render: (r) => parseFloat(r.medical_leave || 0).toFixed(2) },
    { title: "No Pay", render: (r) => parseFloat(r.no_pay_leave || 0).toFixed(2) },
    { title: "Created Date",  key: "cd", render: ({ created_at }) => <span>{dateFormat(created_at)}</span>},
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
          setEdit(record)
          // setEdit({
          //   name: record.name,
          //   departments: record.depts?.map(dept=> dept.department_id),
          //   status: record.status
          // })
          }} type="link">
          Edit
        </Button>
      ),
    },
  ];

  const fields = [
    {
      id: 1,
      label: "Package Name",
      name: "name",
      component: <Input size="large" placeholder="Package Name" />,
    },
    {
      id: 3,
      label: "Select Company",
      name: "company_id",
      component: 
        <Select 
          // mode="multiple"
          size="large" 
          placeholder="Select Company" 
          showSearch 
          // value={edit ? }
          onChange={(value)=>setSelectedCompanyId(value)}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {companyList ? companyList.map(company=>{
            return(<Select.Option key={company.id} value={company.id}>{company.name}</Select.Option>)
          }) : null}
        </Select>,
    },
    {
      id: 2,
      label: "Select Department",
      name: "department_id",
      component: 
        <Select 
          // mode="multiple"
          size="large" 
          placeholder="Select Department" 
          showSearch 
          // value={edit ? }
          onChange={(value)=>setSelectedDepartmentId(value)}
          disabled={!departmentList?.length}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {departmentList ? departmentList.map(dept=>{
            return(<Select.Option key={dept.id} value={dept.id}>{dept.name}</Select.Option>)
          }) : null}
        </Select>,
    },
    {
      id: 4,
      label: "Annual Leave",
      name: "annual_leave",
      component: <Input size="large" placeholder="Annual Leave" />,
    },
    {
      id: 5,
      label: "Casual Leave",
      name: "casual_leave",
      component: <Input size="large" placeholder="Casual Leave" />,
    },
    {
      id: 5,
      label: "Medical Leave",
      name: "medical_leave",
      component: <Input size="large" placeholder="Medical Leave" />,
    },
    {
      id: 6,
      label: "No Pay Leave",
      name: "no_pay_leave",
      component: <Input size="large" placeholder="No Pay Leave" />,
    },
    {
      id: 4,
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
      title="Leave Package"
      title_extension="Leave Package" //create or edit new --title_extn--
      list_api={LEAVE_PACKAGE}
      create_submit_api={LEAVE_PACKAGE}
      edit_submit_api={LEAVE_PACKAGE}
      form_fields={fields}
      edit={edit}
      setEdit={setEdit}
    />
    </>
  );
};
