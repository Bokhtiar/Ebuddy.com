import { Button, Input, Radio } from "antd";
import React, { useState } from "react";
import {
  COMPANY_TYPE_CREATE,
  COMPANY_TYPE_LIST,
} from "../../../../scripts/api";
import ConfigView from "../../__commons__/ConfigView";
import {dateFormat} from "../../../../scripts/helper";

export default () => {
  const [edit, setEdit] = useState();
  const columns = [
    { title: "Name", dataIndex: "name", key: "fname" },
    { title: "Created By", key: "cb", render: (r) => r.created_by?.name },
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
      label: "Company type name",
      name: "name",
      component: <Input size="large" placeholder="Company type name" />,
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
      title="Company Type Setup"
      title_extension="Company Type" //create or edit new --title_extn--
      list_api={COMPANY_TYPE_LIST}
      create_submit_api={COMPANY_TYPE_CREATE}
      edit_submit_api={COMPANY_TYPE_LIST}
      form_fields={fields}
      edit={edit}
      setEdit={setEdit}
    />
  );
};
