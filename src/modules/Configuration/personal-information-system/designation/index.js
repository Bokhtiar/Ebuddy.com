import { Button, Input, Radio, Select } from "antd";
import React, { useState, useEffect } from "react";
import { PIS_DESIGNATION, COMPANY_LIST } from "../../../../scripts/api";
import ConfigView from "../../__commons__/ConfigView";
import {dateFormat} from "../../../../scripts/helper";
import { getData } from "../../../../scripts/api-service";

export default () => {
  const [edit, setEdit] = useState();
  const [companyList, setCompanyList] = useState();
  
  const getCompanyList = async () => {
    let res = await getData(COMPANY_LIST);

    if (res) {
      let masterData = res?.data?.data;
      if (res) {
        setCompanyList(masterData);
      }
    }
  }

  const columns = [
    { title: "Designation", dataIndex: "name", key: "designation" },
    { title: "Created By", key: "cb", render: (r) => r?.created_by?.name },
    { title: "Created Date", 
      key: "cd",
      render: ({ created_at }) => <span>{dateFormat(created_at)}</span>,
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
        <Button onClick={() => setEdit(record)} type="link">
          Edit
        </Button>
      ),
    },
  ];
  

  const fields = [
    {
      id: 1,
      label: "Designation",
      name: "name",
      component: <Input size="large" placeholder="Designation" />,
    },
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
      id: 5,
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


  useEffect(()=>{
    getCompanyList();
  },[]);

  return (
    <ConfigView
      columns={columns}
      title="Designation Setup"
      title_extension="Designation" //create or edit new --title_extn--
      list_api={PIS_DESIGNATION}
      create_submit_api={PIS_DESIGNATION}
      edit_submit_api={PIS_DESIGNATION}
      form_fields={fields}
      edit={edit}
      setEdit={setEdit}
    />
  );
};