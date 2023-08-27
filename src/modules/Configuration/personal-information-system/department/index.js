import { Button, Input, Radio, Tag, Select } from "antd";
import React, { useState, useEffect } from "react";
import {
  PIS_DEPARTMENT,
  COMPANY_LIST,
  DESIGNATION_LIST_ALL,
  USER_LIST
} from "../../../../scripts/api";
import ConfigView from "../../__commons__/ConfigView";
import {dateFormat} from "../../../../scripts/helper";
import { getData } from "../../../../scripts/api-service";

export default () => {
  const [edit, setEdit] = useState();
  const [companyList, setCompanyList] = useState();
  const [designationtList, setDesignationtList] = useState();
  const [pocList, setPOCList] = useState();

  const getDesignationtList = async () => {
    let res = await getData(DESIGNATION_LIST_ALL);

    if (res) {
        let masterData = res?.data?.data;
        if (res) {
          setDesignationtList(masterData);
        }
    }
  }
  
  const getPOCList = async () => {
    let res = await getData(USER_LIST);

    if (res) {
        let masterData = res?.data?.data;
        if (res) {
          setPOCList(masterData);
        }
    }
  }

  const getCompanyList = async () => {
    let res = await getData(COMPANY_LIST);

    if (res) {
        let masterData = res?.data?.data;
        if (res) {
          setCompanyList(masterData);
        }
    }
  }

  useEffect(()=>{
    getDesignationtList();
    getCompanyList();
    getPOCList();
  },[]);

  const columns = [
    { title: "Department Name", 
      dataIndex: "name", 
      key: "fname" 
    },
    { title: "Created By",  key: "cd", render: ({ created_by }) => <span>{created_by?.name}</span>},
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
          setEdit({
            id: record.id,
            company_id: record.company_id,
            name: record.name,
            name_bn: record.name_bn,
            designations: record.associate_designations?.map(dept=> dept.designation_id),
            employees: record.associate_pocs?.map(poc=> poc.emp_id),
            status: record.status
          })
          }} type="link">
          Edit
        </Button>
      ),
    },
  ];

  const fields = [
    {
      id: 1,
      label: "Company Name",
      name: "company_id",
      component: 
        <Select 
          size="large" 
          placeholder="Select Company" 
          showSearch 
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {companyList ? companyList.map(com=>{
            return(<Select.Option key={com.id} value={com.id}>{com.name}</Select.Option>)
          }) : null}
      </Select>,
    },
    {
      id: 2,
      label: "Department Name",
      name: "name",
      component: <Input size="large" placeholder="Department Name" />,
    },
    {
      id: 3,
      label: "ডিপার্টমেন্টের নাম",
      name: "name_bn",
      component: <Input size="large" placeholder="ডিপার্টমেন্টের নাম" />,
    },
    {
      id: 4,
      label: "Designation",
      name: "designations",
      component: 
        <Select 
          size="large"
          mode="multiple"
          placeholder="Select Designation" 
          showSearch 
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {designationtList ? designationtList?.map(com=>{
            return(<Select.Option key={com.id} value={com.id}>{com.name}</Select.Option>)
          }) : null}
      </Select>,
    },
    {
      id: 5,
      label: "POC",
      name: "employees",
      component: 
        <Select 
          size="large"
          mode="multiple"
          placeholder="Select employees" 
          showSearch 
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {pocList ? pocList?.map(poc=>{
            return(<Select.Option key={poc.emp_id} value={poc.emp_id}>{poc.name}</Select.Option>)
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
      title="Department"
      title_extension="Department" //create or edit new --title_extn--
      list_api={PIS_DEPARTMENT}
      create_submit_api={PIS_DEPARTMENT}
      edit_submit_api={PIS_DEPARTMENT}
      form_fields={fields}
      edit={edit}
      setEdit={setEdit}
    />
    </>
  );
};
