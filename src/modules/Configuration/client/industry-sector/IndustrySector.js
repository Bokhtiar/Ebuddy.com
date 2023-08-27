import { Button, Input, Radio, Select } from "antd";
import React, { useEffect, useState } from "react";
import {
  INDUSTRY_SECTOR_CREATE,
  INDUSTRY_SECTOR_LIST,
  INDUSTRY_TYPE_LIST,
  INDUSTRY_TYPE_DROPDOWN_LIST
} from "../../../../scripts/api";
import { getData } from "../../../../scripts/api-service";
import { alertPop } from "../../../../scripts/message";
import ConfigView from "../../__commons__/ConfigView";
import {dateFormat} from "../../../../scripts/helper";

export default () => {
  const [edit, setEdit] = useState();
  const [msTypes, setMsTypes] = useState();

  const getIndustryTypes = async () => {
    // const res = await getData(INDUSTRY_TYPE_LIST);
    const res = await getData(INDUSTRY_TYPE_DROPDOWN_LIST);
    if (res) setMsTypes(res.data?.data);
    else alertPop("error", "Industry types not found");
  };
  
  useEffect(() => {
    getIndustryTypes();
  }, []);

  const columns = [
    { title: "CODE", key: "code", dataIndex: "code"},
    { title: "SECTOR NAME", dataIndex: "name", key: "fname" },
    { title: "INDUSTRY TYPE", key: "name", render: (r) => r?.industry_type?.name },
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
        <Button onClick={() => setEdit(record)} type="link">
          Edit
        </Button>
      ),
    },
  ];

  const fields = [
    {
      id: 1,
      label: "Sector name",
      name: "name",
      component: <Input size="large" placeholder="Industry Sector Name" />,
    },
    {
      id: 3,
      label: "INDUSTRY Type",
      name: "industry_type_id",
      component: (
        <Select placeholder="Type" size="large" showSearch
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }>
          {msTypes &&
            msTypes.map(type => (
              <Select.Option key={type.id} value={type.id}>{type.name}</Select.Option>
            ))}
        </Select>
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

  return (
    <ConfigView
      columns={columns}
      title="Industry Sector"
      title_extension="Industry Sector" //create or edit new --title_extn--
      list_api={INDUSTRY_SECTOR_LIST}
      create_submit_api={INDUSTRY_SECTOR_CREATE}
      edit_submit_api={INDUSTRY_SECTOR_LIST}
      form_fields={fields}
      edit={edit}
      setEdit={setEdit}
    />
  );
};
