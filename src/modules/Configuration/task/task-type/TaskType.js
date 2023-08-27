import { Button, Input, Radio, Tag } from "antd";
import React, { useState } from "react";
import {
  ACTIVITY_TYPE_CREATE,
  ACTIVITY_TYPE_LIST,
} from "../../../../scripts/api";
import ConfigView from "../../__commons__/ConfigView";
import {dateFormat} from "../../../../scripts/helper";

export default () => {
  const [edit, setEdit] = useState();
  const columns = [
    { title: "ACTIVITY TYPE", dataIndex: "name", key: "fname" },
    { title: "Created By", key: "cb", render: (r) => r.created_by?.name },
    { title: "Created Date",  key: "cd", render: ({ created_at }) => <span>{dateFormat(created_at)}</span>},
    {
      title: "Default",
      key: "def",
      render: (r) => (r.default === 1 ? <Tag color="gold">Yes</Tag> : <Tag color="blue">No</Tag>),
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
      label: "Task/Activity type name",
      name: "name",
      component: <Input size="large" placeholder="Task/Activity type name" />,
    },
    {
      id: 4,
      label: "Is Default",
      name: "default",
      component: (
        <Radio.Group>
          <Radio value={1}>Yes</Radio>
          <Radio value={0}>No</Radio>
        </Radio.Group>
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
      title="Activity Type Setup"
      title_extension="Activity Type" //create or edit new --title_extn--
      list_api={ACTIVITY_TYPE_LIST}
      create_submit_api={ACTIVITY_TYPE_CREATE}
      edit_submit_api={ACTIVITY_TYPE_LIST}
      form_fields={fields}
      edit={edit}
      setEdit={setEdit}
    />
  );
};
