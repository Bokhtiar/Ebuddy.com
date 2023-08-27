import { Button, Input, Radio, Select, InputNumber } from "antd";
import React, { useState } from "react";
import {
  REVIEW_STATUS_CREATE,
  REVIEW_STATUS_LIST,
} from "../../../../scripts/api";
import ConfigView from "../../__commons__/ConfigView";
import {dateFormat} from "../../../../scripts/helper";

export default () => {
  const [edit, setEdit] = useState();
  const columns = [
    { title: "Review Title", dataIndex: "name", key: "fname" },
    { title: "RATING RANGE",
      key: "ratting_range",
      render: (row) => <>
        <span>{row.start_rating}</span> - <span>{row.end_rating}</span>
      </>  
    },
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
      label: "Review Title",
      name: "name",
      component: <Input size="large" placeholder="Review Title" />,
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
          <Select.Option value="#d1ca04">Yellow</Select.Option>
          <Select.Option value="#f85a5b">Red</Select.Option>
          <Select.Option value="#f29e3b">Orange</Select.Option>
          <Select.Option value="#4ebe76">Green</Select.Option>
          <Select.Option value="#12c2c2">Cyan</Select.Option>
          <Select.Option value="#1690ff">Blue</Select.Option>
          <Select.Option value="#732ed1">Purple</Select.Option>
          <Select.Option value="#ea2f95">Magenta</Select.Option>
          <Select.Option value="#999999">Gray</Select.Option>
        </Select>
      ),
    },
    {
      id: 3,
      label: "Rating Range",
      requiredCheck: true,
      components: [
        {
          id: 1,
          name: 'start_rating',
          component: <InputNumber size="large" placeholder="From" className="mr-4 w-100" />,
          required: false,
        },
        {
          id: 2,
          name: 'end_rating',
          component: <InputNumber size="large" placeholder="To" className="mr-4 w-100"/>,
          required: false,
        }
      ]
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
      title="Review Setup"
      title_extension="Review Setup" //create or edit new --title_extn--
      list_api={REVIEW_STATUS_LIST}
      create_submit_api={REVIEW_STATUS_CREATE}
      edit_submit_api={REVIEW_STATUS_LIST}
      form_fields={fields}
      edit={edit}
      setEdit={setEdit}
    />
  );
};
