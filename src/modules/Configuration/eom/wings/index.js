import { Button, Input, Radio, Tag, Select } from "antd";
import React, { useState, useEffect } from "react";
import {
  DEPARTMENT_LIST,
  EOM_WINGS_CREATE,
  EOM_WINGS_LIST,
} from "../../../../scripts/api";
import ConfigView from "../../__commons__/ConfigView";
import {dateFormat} from "../../../../scripts/helper";
import { getData, postData } from "../../../../scripts/api-service";

export default () => {
  const [edit, setEdit] = useState();
  const [departmentList, setDepartmentList] = useState();

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
    { title: "Wings Name", dataIndex: "name", key: "fname" },
    { title: "Department",
       key: "fname",
       render: row => row.department?.name
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
    //     <Button onClick={() => setEdit(record)} type="link">
    //       Edit
    //     </Button>
    //   ),
    // },
  ];

  const fields = [
    {
      id: 1,
      label: "Wings Name",
      name: "name",
      component: <Input size="large" placeholder="Wings Name" />,
    },
    {
      id: 2,
      label: "Select Department",
      name: "department_id",
      component: 
        <Select 
          size="large" 
          placeholder="Select Department" 
          showSearch 
          // onChange={(value)=>setSelectedDepartmentId(value)}
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

  return (
    <ConfigView
      columns={columns}
      title="Wings"
      title_extension="Wings" //create or edit new --title_extn--
      list_api={EOM_WINGS_LIST}
      create_submit_api={EOM_WINGS_CREATE}
      edit_submit_api={EOM_WINGS_LIST}
      form_fields={fields}
      // edit={edit}
      // setEdit={setEdit}
    />
  );
};
