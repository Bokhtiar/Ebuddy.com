import { Button, Input, Radio, Select, Tag } from "antd";
import React, { useEffect, useState } from "react";
import {
  DEPARTMENT_LIST,
  FUNCTION_TYPES_LIST,
  FUNCTION_TYPES_UPDATE,
  FUNCTION_TYPES_CREATE,
} from "../../../../scripts/api";
import ConfigView from "../../__commons__/ConfigView";
import {dateFormat} from "../../../../scripts/helper";
// import { ConfigurationServicePlaceholders } from "aws-sdk/lib/config_service_placeholders";
import { getData } from "../../../../scripts/api-service";

export default () => {
  const [edit, setEdit] = useState();
  const [departmentList, setDepartmentList] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState();

  const getDepartmentList = async () => {
    let res = await getData(DEPARTMENT_LIST);

    if (res) {
        let masterData = res?.data?.data;
        if (res.data.code === 200) {
          setDepartmentList(masterData);
        }
    }
  }

  useEffect(()=>{
    getDepartmentList();
  },[]);

  const columns = [
    { 
      title: "Department Name",
      key: "dept_name",
      render: (row) => <span>
          {row?.department?.name}
        </span>
    },
    { title: "Function Type", dataIndex: "name", key: "name" },
    { title: "Created By", key: "cb", render: (row) => row?.created_by?.name },
    { title: "Created Date",  key: "cd", render: ({ created_at }) => <span>{dateFormat(created_at)}</span>},
    {
      title: "Status",
      key: "sts",
      render: (row) => row?.status === 1 ? <Tag color="#A0DA30" style={{color: 'white'}}>Active</Tag> : <Tag color="#F2452F" style={{color: 'white'}}>Inactive</Tag>,
    },
    {
      title: "Action",
      key: "action",
      render: (record) => 
      <>
        <Button onClick={() => setEdit(record)} type="link">
          Edit
        </Button>
      </>,
    },
  ];
  

  const fields = [
    {
      id: 1,
      label: "Department Name",
      name: "department_id",
      component: 
        <Select 
          size="large" 
          placeholder="Select Department" 
          showSearch 
          // onChange={(value)=>setSelectedDepartment(value)}
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
      id: 2,
      label: "Function Type",
      name: "name",
      component: <Input size="large" placeholder="Function type" className="mr-4" />,
    },
    {
      id: 3,
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

  
  return (
    <ConfigView
      columns={columns}
      title="Function Type"
      title_extension="Function Type" //create or edit new --title_extn--
      list_api={FUNCTION_TYPES_LIST}
      create_submit_api={FUNCTION_TYPES_CREATE}
      edit_submit_api={FUNCTION_TYPES_UPDATE}
      form_fields={fields}
      edit={edit}
      setEdit={setEdit}
      departmentList={departmentList}
      selectedDepartment={selectedDepartment}
      setSelectedDepartment={setSelectedDepartment}
      flag="function-type"
    />
  );
};
