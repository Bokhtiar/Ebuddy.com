import { Button, Input, Radio, Select } from "antd";
import React, { useState } from "react";
import { MILESTONE_STATUS } from "../../../../scripts/api";
import ConfigView from "../../__commons__/ConfigView";
import {dateFormat} from "../../../../scripts/helper";

const MilestoneStatus = () => {
  const [edit, setEdit] = useState();
  const columns = [
    { title: "Name", dataIndex: "name", key: "fname" },
    { title: "Created By", key: "cb", render: (r) => r?.created_by?.name },
    { title: "Created Date", 
      // dataIndex: "created_at", 
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
      label: "Milestone status name",
      name: "name",
      component: <Input size="large" placeholder="Milestone status name" />,
    },
    {
      id: 2,
      label: "Color",
      name: "color",
      component: (
        <Select size="large" placeholder="color" showSearch
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }>
          <Select.Option value="#fadb11">Yellow</Select.Option>
          <Select.Option value="#f5202e">Red</Select.Option>
          <Select.Option value="#f98b14">Orange</Select.Option>
          <Select.Option value="#a0d914">Green</Select.Option>
          <Select.Option value="#12c2c2">Cyan</Select.Option>
          <Select.Option value="#1690ff">Blue</Select.Option>
          <Select.Option value="#732ed1">Purple</Select.Option>
          <Select.Option value="#ea2f95">Magenta</Select.Option>
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
    {
      id: 5,
      label: "Attachemnt",
      name: "attachment_check",
      component: (
        <Radio.Group>
          <Radio value={1}>Yes</Radio>
          <Radio value={0}>No</Radio>
        </Radio.Group>
      ),
    },
  ];

  return (
    <ConfigView
      columns={columns}
      title="Milestone Status Setup"
      title_extension="Milestone Status"
      list_api={MILESTONE_STATUS}
      create_submit_api={MILESTONE_STATUS}
      edit_submit_api={MILESTONE_STATUS}
      form_fields={fields}
      edit={edit}
      setEdit={setEdit}
    />
  );
};

export default MilestoneStatus;
