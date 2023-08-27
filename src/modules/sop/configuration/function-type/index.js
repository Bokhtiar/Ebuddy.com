import {Button, Input, Radio, Select} from "antd";
import React, {useEffect, useState} from "react";
import {PIS_DEPARTMENT_LIST, SOP_FUNCTION_TYPE,} from "../../../../scripts/api";
import ConfigView from "../../../Configuration/__commons__/ConfigView";
import {getData} from "../../../../scripts/api-service";
import * as Cookies from "js-cookie";

export default () => {
  const company_id = JSON.parse(Cookies.get("profile")).company_id;
  const [edit, setEdit] = useState();
  const [departmentList, setDepartmentList] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState();

  const getDepartmentList = async () => {
    let url = PIS_DEPARTMENT_LIST + "?"; 
    url = url + "&company_id=" + company_id;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      if (res?.data?.code === 200) {
        setDepartmentList(masterData);
      }
    }
  }

  useEffect(() => {
    if(company_id) getDepartmentList();
  }, [company_id]);

  useEffect(() => {
    if(edit) getDepartmentList();
  }, [edit]);

  const columns = [
    {
      title: "Function Type",
      dataIndex: "name",
      key: "function_type"
    },
    {
      title: "Company Name",
      dataIndex: "company.name",
      key: "company_name"
    },
    {
      title: "Department Name",
      dataIndex: "department.name",
      key: "department_name"
    },
    {
      title: "Status",
      key: "status",
      render: (row) => (row.status === 1 ? "Active" : "Inactive"),
    },
    {
      title: "Action",
      key: "action",
      render: (row) => (
        <Button onClick={() => {
          setEdit(row);
        }} type="link">
          Edit
        </Button>
      ),
    },
  ];

  const fields = [
    {
      id: 1,
      label: "Department Name",
      name: "department_id",
      component:
        <Select
          getPopupContainer={trigger => trigger.parentNode}
          size="large"
          placeholder='Select Department Name'
          disabled={!departmentList?.length}
          showSearch
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {departmentList ? departmentList.map(dept => {
            return (<Select.Option key={dept.id} value={dept.id}>{dept.name}</Select.Option>)
          }) : null}
        </Select>,
    },
    {
      id: 2,
      label: "Function Type Name",
      name: "name",
      component: (
        <Input placeholder="Enter function type name" size="large"/>
      ),
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
      title="Function Type"
      title_extension="Function Type" //create or edit new --title_extn--
      list_api={SOP_FUNCTION_TYPE}
      create_submit_api={SOP_FUNCTION_TYPE}
      edit_submit_api={SOP_FUNCTION_TYPE}
      form_fields={fields}
      edit={edit}
      setEdit={setEdit}
      flag="function-type"
      departmentList={departmentList}
      setSelectedDepartment={setSelectedDepartment}
      selectedDepartment={selectedDepartment}
    />
  </>
  );
};
