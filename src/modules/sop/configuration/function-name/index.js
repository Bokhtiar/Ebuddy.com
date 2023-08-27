import {Button, Input, Radio, Select} from "antd";
import React, {useEffect, useState} from "react";
import {PIS_DEPARTMENT_LIST, SOP_FUNCTION_NAME, SOP_FUNCTION_TYPE, TASK_SOP_FUNCTION_TYPE_LIST} from "../../../../scripts/api";
import ConfigView from "../../../Configuration/__commons__/ConfigView";
import {getData} from "../../../../scripts/api-service";
import * as Cookies from "js-cookie";

export default () => {
  const company_id = JSON.parse(Cookies.get("profile")).company_id;
  const [edit, setEdit] = useState();
  const [departmentList, setDepartmentList] = useState();
  const [functionTypeList, setFunctionTypeList] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState();
  const [selectedFunctionType, setSelectedFunctionType] = useState();

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

  const getFunctionTypeList = async (department_id = '') => {
    // let url = SOP_FUNCTION_TYPE + "?";
    let url = TASK_SOP_FUNCTION_TYPE_LIST + "?";
    const departmentId = department_id ? department_id : selectedDepartment;

    if(edit) url = url + "&department_id=" + departmentId + '&company_id='+ company_id;
    else url = url + "&department_id=" + selectedDepartment + '&company_id='+ company_id;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      if (res?.data?.code === 200) {
        setFunctionTypeList(masterData);
      }
    }
  }

  useEffect(() => {
    getDepartmentList();
  }, []);

  useEffect(() => {
    if(selectedDepartment) getFunctionTypeList();
  }, [selectedDepartment]);
  
  useEffect(() => {
    if(edit) {
      getDepartmentList();
      getFunctionTypeList(edit.department_id);
    }
  }, [edit]);

  const columns = [
    {
      title: "Function Name",
      dataIndex: "name",
      key: "function_name"
    },
    {
      title: "Company",
      dataIndex: "company.name",
      key: "company_name"
    },
    {
      title: "Department",
      dataIndex: "department.name",
      key: "department_name"
    },
    {
      title: "Function Type",
      dataIndex: "function_type.name",
      key: "function_type"
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
          value={selectedDepartment}
          onChange={(value)=>{
            setSelectedDepartment(value)
            setFunctionTypeList(null)
          }}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {departmentList ? departmentList.map(dept => {
            return (<Select.Option key={dept.id} value={dept.id}>{dept.name}</Select.Option>)
          }) : null}
        </Select>,
    },
    {
      id: 2,
      label: "Function Type",
      name: "function_type_id",
      component:
        <Select
          getPopupContainer={trigger => trigger.parentNode}
          size="large"
          placeholder='Select Function Type'
          // disabled={!departmentList?.length || !functionTypeList?.length}
          showSearch
          value={selectedFunctionType}
          onChange={(value)=>setSelectedFunctionType(value)}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {functionTypeList ? functionTypeList.map(func => {
            return (<Select.Option key={func.id} value={func.id}>{func.name}</Select.Option>)
          }) : null}
        </Select>,
    },
    {
      id: 3,
      label: "Function Name",
      name: "name",
      component: (
        <Input placeholder="Enter function name" size="large"/>
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
      title="Function"
      title_extension="Function" //create or edit new --title_extn--
      list_api={SOP_FUNCTION_NAME}
      create_submit_api={SOP_FUNCTION_NAME}
      edit_submit_api={SOP_FUNCTION_NAME}
      form_fields={fields}
      edit={edit}
      setEdit={setEdit}
      flag="function-activity"
      departmentList={departmentList}
      setSelectedDepartment={setSelectedDepartment}
      selectedDepartment={selectedDepartment}
      functionTypeList={functionTypeList}
    />
  </>
  );
};
