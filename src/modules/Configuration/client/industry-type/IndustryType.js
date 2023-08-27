import { Button, Input, Radio } from "antd";
import React, { useState, useEffect } from "react";
import {
  INDUSTRY_TYPE_CREATE,
  INDUSTRY_TYPE_LIST,
} from "../../../../scripts/api";
import ConfigView from "../../__commons__/ConfigView";
import {dateFormat} from "../../../../scripts/helper";

export default () => {
  const [edit, setEdit] = useState();

  const columns = [
    { title: "CODE", dataIndex: "code", key: "code" },
    { title: "INDUSTRY TYPE NAME", dataIndex: "name", key: "fname" },
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
      id: 2,
      label: "Industry type name",
      name: "name",
      component: <Input size="large" placeholder="Industry Type Name" />,
    },
    {
      id: 3,
      label: "Description",
      name: "description",
      component: <Input.TextArea size="large" placeholder="Description" />,
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
      title="Industry Type Setup"
      title_extension="Industry Type" //create or edit new --title_extn--
      list_api={INDUSTRY_TYPE_LIST}
      create_submit_api={INDUSTRY_TYPE_CREATE}
      edit_submit_api={INDUSTRY_TYPE_LIST}
      form_fields={fields}
      edit={edit}
      setEdit={setEdit}
    />
  );
};
