import { Button, Input, Radio } from "antd";
import React, { useState } from "react";
import { LICENSE_ISSUER_LIST, LICENSE_ISSUER_CREATE } from "../../../../scripts/api";
import ConfigView from "../../__commons__/ConfigView";
import {dateFormat} from "../../../../scripts/helper";

export default () => {
  const [edit, setEdit] = useState();
  const columns = [
    { title: "Name", dataIndex: "name", key: "fname" },
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
      label: "License issuer name",
      name: "name",
      component: <Input size="large" placeholder="License issuer name" />,
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
      title="License Issuer Setup"
      title_extension="License Issuer" //create or edit new --title_extn--
      list_api={LICENSE_ISSUER_LIST}
      create_submit_api={LICENSE_ISSUER_CREATE}
      edit_submit_api={LICENSE_ISSUER_LIST}
      form_fields={fields}
      edit={edit}
      setEdit={setEdit}
    />
  );
};
