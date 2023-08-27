import { Button, Input, Radio, Tag, Select } from "antd";
import React, { useState, useEffect } from "react";
import {
  DEPARTMENT_LIST,
  EOM_CATEGORY_CREATE,
  EOM_CATEGORY_LIST,
  EOM_CATEGORY_DROPDOWN_LIST
} from "../../../../scripts/api";
import ConfigView from "../../__commons__/ConfigView";
import {dateFormat} from "../../../../scripts/helper";
import { getData } from "../../../../scripts/api-service";

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
    getCategoryDropdownList();
  },[]);

  const columns = [
    { title: "EOM Category", dataIndex: "name", key: "fname" },
    { title: "Department", 
      key: "fname",
      render: row => <p>{row.depts?.map(dept => <Tag>{dept.department?.name}</Tag>)}</p>
    },
    { title: "Created By", key: "cb", render: (r) => r.created_by?.name },
    { title: "Created Date",  key: "cd", render: ({ created_at }) => <span>{dateFormat(created_at)}</span>},
    {
      title: "Status",
      key: "sts",
      render: (r) => (r.status === 1 ? "Active" : "Inactive"),
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (record) => (
    //     <Button onClick={() => {
    //       // setEdit(record)
    //       setEdit({
    //         name: record.name,
    //         departments: record.depts?.map(dept=> dept.department_id),
    //         status: record.status
    //       })
    //       }} type="link">
    //       Edit
    //     </Button>
    //   ),
    // },
  ];

  const fields = [
    {
      id: 1,
      label: "Category Name",
      name: "name",
      component: <Input size="large" placeholder="Category Name" />,
    },
    {
      id: 2,
      label: "Select Department",
      name: "departments",
      component: 
        <Select 
          mode="multiple"
          size="large" 
          placeholder="Select Department" 
          showSearch 
          // value={edit ? }
          onChange={(value)=>setSelectedDepartmentId(value)}
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

  return (<>
    <ConfigView
      columns={columns}
      title="EOM Category"
      title_extension="EOM Category" //create or edit new --title_extn--
      list_api={EOM_CATEGORY_LIST}
      create_submit_api={EOM_CATEGORY_CREATE}
      edit_submit_api={EOM_CATEGORY_LIST}
      form_fields={fields}
      // edit={edit}
      // setEdit={setEdit}
      departmentList={departmentList}
      selectedDepartment={selectedDepartment}
      setSelectedDepartment={setSelectedDepartment}
      categoryDropdownList={categoryDropdownList}
      setSelectedCategory={setSelectedCategory}
      selectedCategory={selectedCategory}
      flag="eom-category"
    />
    </>
  );
};
