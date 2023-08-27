import { Button, Input, Radio, Tag, Select } from "antd";
import React, { useState, useEffect } from "react";
import {
  SKILL_TYPE_LIST,
  PIS_SKILL_MATRIC,
  COMPANY_LIST
} from "../../../../scripts/api";
import ConfigView from "../../__commons__/ConfigView";
import {dateFormat} from "../../../../scripts/helper";
import { getData } from "../../../../scripts/api-service";

export default () => {
  const [edit, setEdit] = useState();
  const [companyList, setCompanyList] = useState();
  const [skillTypeList, setSkillTypeList] = useState();

  const getSkillTypeList = async () => {
    let res = await getData(SKILL_TYPE_LIST);

    if (res) {
      let masterData = res?.data?.data;
      if (res.data.code === 200) {
        setSkillTypeList(masterData);
      }
    }
  }

  const getCompanyList = async () => {
    let res = await getData(COMPANY_LIST);

    if (res) {
      let masterData = res?.data?.data;
      if (res) {
        setCompanyList(masterData);
      }
    }
  }

  useEffect(()=>{
    getSkillTypeList();
    getCompanyList();
  },[]);

  const columns = [
    { title: "Skill Matric", 
      dataIndex: "name", 
      key: "fname" 
    },
    { title: "Created By",  key: "cd", render: ({ created_by }) => <span>{created_by?.name}</span>},
    { title: "Created Date",  key: "cd", render: ({ created_at }) => <span>{dateFormat(created_at)}</span>},
    {
      title: "Status",
      key: "sts",
      render: (r) => (r.status === 1 ? "Active" : "Inactive"),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Button onClick={() => {
            setEdit(record)
          }} type="link">
          Edit
        </Button>
      ),
    },
  ];

  const fields = [
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
      id: 2,
      label: "Skill Type",
      name: "skill_type_id",
      component: 
        <Select 
          size="large" 
          placeholder="Select Skill Type" 
          showSearch 
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {skillTypeList ? skillTypeList.map(com=>{
            return(<Select.Option key={com.id} value={com.id}>{com.name}</Select.Option>)
          }) : null}
      </Select>,
    },
    {
      id: 3,
      label: "Skill Matric",
      name: "name",
      component: <Input size="large" placeholder="Skill Matric" />,
    },
    {
      id: 5,
      label: "Code",
      name: "code",
      component: <Input size="large" placeholder="code" />,
    },
    {
      id: 6,
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
      title="Skill Matric"
      title_extension="Skill Matric" //create or edit new --title_extn--
      list_api={PIS_SKILL_MATRIC}
      create_submit_api={PIS_SKILL_MATRIC}
      edit_submit_api={PIS_SKILL_MATRIC}
      form_fields={fields}
      edit={edit}
      setEdit={setEdit}
    />
    </>
  );
};
