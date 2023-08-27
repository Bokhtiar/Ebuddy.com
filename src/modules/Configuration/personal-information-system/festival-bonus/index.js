import { Button, Input, Radio, Tag, Select } from "antd";
import React, { useState, useEffect } from "react";
import {
  PIS_FESTIVAL_BONUS,
  COMPANY_LIST
} from "../../../../scripts/api";
import ConfigView from "../../__commons__/ConfigView";
import {dateFormat} from "../../../../scripts/helper";
import { getData } from "../../../../scripts/api-service";

export default () => {
  const [edit, setEdit] = useState();
  const [companyList, setCompanyList] = useState();

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
    getCompanyList();
  },[]);

  const columns = [
    { title: "Festival Bonus", 
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
      label: "Festival Bonus",
      name: "name",
      component: <Input size="large" placeholder="Festival Bonus" />,
    },
    {
      id: 4,
      label: "Code",
      name: "code",
      component: <Input size="large" placeholder="code" />,
    },
    {
      id: 5,
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
      title="Festival Bonus"
      title_extension="Festival Bonus" //create or edit new --title_extn--
      list_api={PIS_FESTIVAL_BONUS}
      create_submit_api={PIS_FESTIVAL_BONUS}
      edit_submit_api={PIS_FESTIVAL_BONUS}
      form_fields={fields}
      edit={edit}
      setEdit={setEdit}
    />
    </>
  );
};
