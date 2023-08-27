import { Button, Input, Radio, Select, Tag } from "antd";
import React, { useEffect, useState } from "react";
import {
  DEPARTMENT_LIST,
  EOM_REASON_LIST,
  EOM_REASON_CREATE,
  EOM_CATEGORY_DROPDOWN_LIST,
} from "../../../../scripts/api";
import ConfigView from "../../__commons__/ConfigView";
import {dateFormat} from "../../../../scripts/helper";
// import { ConfigurationServicePlaceholders } from "aws-sdk/lib/config_service_placeholders";
import { getData, postData } from "../../../../scripts/api-service";

export default () => {
  const [edit, setEdit] = useState();
  const [categoryDropdownList, setCategoryDropdownList] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [departmentList, setDepartmentList] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState();
  const [selectedDepartmentId, setSelectedDepartmentId] = useState();

  const getDepartmentList = async () => {
    let res = await getData(DEPARTMENT_LIST);

    if (res) {
        let masterData = res?.data?.data;
        if (res.data.code === 200) {
            setDepartmentList(masterData);
        }
    }
  }

  const getCategoryDropdownList = async () => {
    let url = EOM_CATEGORY_DROPDOWN_LIST;
    let res = await getData(url);

    if (res) {
        let masterData = res?.data?.data;
        if (res.data.code === 200) {
          setCategoryDropdownList(masterData);
        }
    }
  }

  useEffect(()=>{
    getDepartmentList();
    getCategoryDropdownList()
  },[]);

  const columns = [
    { 
      title: "EOM Category",
      key: "name",
      render: (row) => <span>{row?.name}</span>
    },
    { title: "Department",
      key: "department",
      render: (row) => <p><Tag>Engineering</Tag><Tag>Data</Tag></p>
    },
    { title: "Created By", key: "cb", render: (row) => row?.created_by?.name },
    { title: "Created Date",  key: "cd", render: ({ created_at }) => <span>{dateFormat(created_at)}</span>},
    {
      title: "Status",
      key: "sts",
      render: (row) => (row?.status === 1 ? "Active" : "Inactive"),
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (record) => 
    //   <>
    //     <Button onClick={() => setEdit(record)} type="link">
    //       Edit
    //     </Button>
    //   </>,
    // },
  ];

  const fields = [
    {
      id: 1,
      label: "Select Category",
      name: "eom_category_id",
      component: 
        <Select 
          size="large" 
          placeholder="Select Category" 
          showSearch 
          // onChange={(value)=>setSelectedDepartmentId(value)}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {categoryDropdownList ? categoryDropdownList.map(cat=>{
            return(<Select.Option key={cat.id} value={cat.id}>{cat.name}</Select.Option>)
          }) : null}
      </Select>,
    },
    {
      id: 2,
      label: "Select Department",
      name: "name",
      component: 
        <Select 
          size="large" 
          placeholder="Select Department" 
          showSearch 
          onChange={(value)=>setSelectedDepartmentId(value)}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {departmentList ? departmentList.map(dept=>{
            return(<Select.Option key={dept.id} value={dept.id}>{dept.dept_name}</Select.Option>)
          }) : null}
        </Select>,
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

  return (
    <ConfigView
      columns={columns}
      title="Department Mapping"
      title_extension="Department Mapping" //create or edit new --title_extn--
      list_api={EOM_REASON_LIST}
      create_submit_api={EOM_REASON_CREATE}
      edit_submit_api={EOM_REASON_LIST}
      form_fields={fields}
      // edit={edit}
      // setEdit={setEdit}
      departmentList={departmentList}
      selectedDepartment={selectedDepartment}
      setSelectedDepartment={setSelectedDepartment}
      categoryDropdownList={categoryDropdownList}
      setSelectedCategory={setSelectedCategory}
      selectedCategory={selectedCategory}
      flag="eom-dept-map"
    />
  );
};
