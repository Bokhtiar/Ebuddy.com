import { Button, Input, Radio, Select } from "antd";
import React, { useState, useEffect } from "react";
import { PA_CRITERIA_LIST, PA_CRITERIA_CREATE, PA_CATEGORY_DROPDOWN_LIST, PA_SUB_CATEGORY_DROPDOWN_LIST } from "../../../../scripts/api";
import ConfigView from "../../__commons__/ConfigView";
import {dateFormat} from "../../../../scripts/helper";
import { getData } from "../../../../scripts/api-service";

export default () => {
  const [edit, setEdit] = useState();
  const [categoryList, setCategoryList] = useState();
  const [subCategoryList, setSubCategoryList] = useState();
  const [selectedCategory, setSelectedCategory] = useState();

  const getCategoryList = async () => {
    let res = await getData(PA_CATEGORY_DROPDOWN_LIST);

    if (res) {
        let masterData = res?.data?.data;
        if (res.data.code === 200) {
            setCategoryList(masterData);
        }
    }
  }

  const getSubCategoryList = async () => {
    let res = await getData(PA_SUB_CATEGORY_DROPDOWN_LIST + '?pa_category_id=' + selectedCategory);

    if (res) {
        let masterData = res?.data?.data;
        if (res.data.code === 200) {
          setSubCategoryList(masterData);
        }
    }
  }

  useEffect(()=>{
    getCategoryList();
  }, []);

  useEffect(()=>{
    if(selectedCategory) getSubCategoryList();
  }, [selectedCategory]);

  // useEffect(() => {
  //   console.log("edit ==", edit);
  // }, [edit])

  const columns = [
    { title: "Criteria", dataIndex: "name", key: "criteria" },
    { title: "Category", dataIndex: "category.name", key: "category" },
    { title: "Sub Category", dataIndex: "sub_category.name", key: "subCategory" },
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
        <Button onClick={() => { setEdit(record); setSelectedCategory(record?.category?.id)}} type="link">
          Edit
        </Button>
      ),
    },
  ];

  const fields = [
    {
      id: 1,
      label: "SELECT CATEGORY",
      name: "pa_category_id",
      component: 
        <Select 
            size="large" 
            placeholder="Select Category" 
            showSearch 
            onChange={(value)=>setSelectedCategory(value)}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
          {categoryList ? categoryList.map(category=>{
            return(<Select.Option key={category.id} value={category.id}>{category.name}</Select.Option>)
          }) : null}
        </Select>,
    },
    {
      id: 2,
      label: "SELECT SUB CATEGORY",
      name: "pa_sub_category_id",
      component: 
      <Select 
            size="large" 
            placeholder="Select Sub Category" 
            showSearch 
            // onChange={(value)=>setSelectedDepartment(value)}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
          {subCategoryList ? subCategoryList.map(subCategory=>{
            return(<Select.Option key={subCategory.id} value={subCategory.id}>{subCategory.name}</Select.Option>)
          }) : null}
        </Select>,
    },
    {
      id: 3,
      label: "Criteria",
      name: "name",
      component: <Input size="large" placeholder="Criteria" />,
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
      title="PA Criteria"
      title_extension="PA Criteria" //create or edit new --title_extn--
      list_api={PA_CRITERIA_LIST}
      create_submit_api={PA_CRITERIA_CREATE}
      edit_submit_api={PA_CRITERIA_LIST}
      form_fields={fields}
      edit={edit}
      setEdit={setEdit}
    />
  );
};
