import { Button, Input, Radio } from "antd";
import React, { useState } from "react";
import {
  ACTIVITY_PRIORITY_CREATE,
  ACTIVITY_PRIORITY_LIST,
} from "../../../../scripts/api";
import ConfigView from "../../__commons__/ConfigView";
import {dateFormat} from "../../../../scripts/helper";

export default () => {
  const [edit, setEdit] = useState();
  const columns = [
    { title: "Type", dataIndex: "name", key: "fname" },
    { title: "Created By", key: "cb", render: (r) => r.created_by?.name },
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
        <Button onClick={() => setEdit(record)} type="link">
          Edit
        </Button>
      ),
    },
  ];

  const fields = [
    {
      id: 1,
      label: "Priority type",
      name: "name",
      component: <Input size="large" placeholder="Priority type" />,
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
      title="Task Priority Type"
      title_extension="Task Priority Type" //create or edit new --title_extn--
      list_api={ACTIVITY_PRIORITY_LIST}
      create_submit_api={ACTIVITY_PRIORITY_CREATE}
      edit_submit_api={ACTIVITY_PRIORITY_LIST}
      form_fields={fields}
      edit={edit}
      setEdit={setEdit}
    />
  );
};
