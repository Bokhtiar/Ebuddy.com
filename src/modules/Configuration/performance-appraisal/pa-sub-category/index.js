import { Button, Input, Radio, Select, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import { PA_SUB_CATEGORY_LIST, PA_SUB_CATEGORY_CREATE, PA_CATEGORY_DROPDOWN_LIST } from "../../../../scripts/api";
import ConfigView from "../../__commons__/ConfigView";
import {dateFormat} from "../../../../scripts/helper";
import { getData } from "../../../../scripts/api-service";

export default () => {
  const [edit, setEdit] = useState();
  const [categoryList, setCategoryList] = useState();

  const getCategoryList = async () => {
    let res = await getData(PA_CATEGORY_DROPDOWN_LIST);

    if (res) {
        let masterData = res?.data?.data;
        if (res.data.code === 200) {
            setCategoryList(masterData);
        }
    }
  }

  useEffect(()=>{
    getCategoryList();
  }, []);

  const columns = [
    { title: "Category", dataIndex: "category.name", key: "fname" },
    { title: "Sub Category", dataIndex: "name", key: "fname" },
    { title: "Created By", key: "cb", render: (r) => r?.created_by?.name },
    { title: "Created Date", 
      key: "cd",
      render: ({ created_at }) => <span>{dateFormat(created_at)}</span>,
    },
    { title: "Weight", dataIndex: "weight", key: "weight" },
    {
      title: "Status",
      key: "sts",
      render: (r) => (r.status === 1 ? "Active" : "Inactive"),
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (record) => (
    //     <Button onClick={() => setEdit(record)} type="link">
    //       Edit
    //     </Button>
    //   ),
    // },
  ];

  const fields = [
    {
      id: 1,
      label: "SELECT PARENT CATEGORY",
      name: "pa_category_id",
      component: 
        <Select 
            size="large" 
            placeholder="Select Parent Category" 
            showSearch 
            // onChange={(value)=>setSelectedDepartment(value)}
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
      label: "SUB CATEGORY NAME",
      name: "name",
      component: <Input size="large" placeholder="Sub Category Name" />,
    },
    {
      id: 3,
      label: "Weight",
      name: "weight",
      component: <InputNumber size="large" min={1} max={100} placeholder="Weight" />,
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
      title="PA Sub Category"
      title_extension="PA Sub Category" //create or edit new --title_extn--
      list_api={PA_SUB_CATEGORY_LIST}
      create_submit_api={PA_SUB_CATEGORY_CREATE}
      edit_submit_api={PA_SUB_CATEGORY_LIST}
      form_fields={fields}
      edit={edit}
      setEdit={setEdit}
      flag="subCategory"
    />
  );
};
