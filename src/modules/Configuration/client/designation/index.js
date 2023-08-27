import { Button, Input, Radio } from "antd";
import React, { useState } from "react";
import {
  CLIENT_DESIGNATION_LIST,
  CLIENT_DESIGNATIOIN_CREATE,
  CLIENT_DESIGNATION_UPDATE
} from "../../../../scripts/api";
import ConfigView from "../../__commons__/ConfigView";
import {dateFormat} from "../../../../scripts/helper";

export default () => {
  const [edit, setEdit] = useState();
  const columns = [
    { title: "Name", dataIndex: "name", key: "fname" },
    { title: "Created By", key: "cb", render: (r) => r.created_by?.name },
    { 
      title: "Created Date", 
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
      label: "Designation name",
      name: "name",
      component: <Input size="large" placeholder="Designation name" />,
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
      title="Designation Setup"
      title_extension="Designantion" //create or edit new --title_extn--
      list_api={CLIENT_DESIGNATION_LIST}
      create_submit_api={CLIENT_DESIGNATIOIN_CREATE}
      edit_submit_api={CLIENT_DESIGNATION_UPDATE}
      form_fields={fields}
      edit={edit}
      setEdit={setEdit}
    />
  );
};
