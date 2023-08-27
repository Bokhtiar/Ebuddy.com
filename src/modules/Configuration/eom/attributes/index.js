import { Button, Input, Radio, Select } from "antd";
import React, { useEffect, useState } from "react";
import {
  DEPARTMENT_LIST,
  EOM_ATTRIBUTE_LIST,
  EOM_ATTRIBUTE_CREATE,
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
    getCategoryDropdownList()
  },[]);

  const columns = [
    { 
      title: "Attributes",
      key: "name",
      render: (row) => <span>{row?.name}</span>
    },
    { title: "EOM Category",
      key: "eom_category",
      render: (row) => <span>{row?.eom_category?.name}</span>
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
      label: "Attributes Name",
      name: "name",
      component: <Input size="large" placeholder="Attributes Name" className="mr-4" />,
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
      title="Attribute"
      title_extension="Attribute" //create or edit new --title_extn--
      list_api={EOM_ATTRIBUTE_LIST}
      create_submit_api={EOM_ATTRIBUTE_CREATE}
      edit_submit_api={EOM_ATTRIBUTE_LIST}
      form_fields={fields}
      // edit={edit}
      // setEdit={setEdit}
      categoryDropdownList={categoryDropdownList}
      setSelectedCategory={setSelectedCategory}
      selectedCategory={selectedCategory}
      flag="eom"
    />
  );
};
