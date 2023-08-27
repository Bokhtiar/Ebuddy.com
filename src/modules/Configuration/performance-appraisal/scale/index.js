import { Button, Input, Radio, Select, InputNumber } from "antd";
import React, { useState } from "react";
import { PA_SCORE_LIST, PA_SCORE_CREATE } from "../../../../scripts/api";
import ConfigView from "../../__commons__/ConfigView";
import {dateFormat} from "../../../../scripts/helper";
import { SketchPicker } from 'react-color';

export default () => {
  const [edit, setEdit] = useState();
  const [color, setColor] = useState();

  const columns = [
    { title: "Title", dataIndex: "name", key: "name" },
    { title: "Mark Start", dataIndex: "mark_start", key: "mark_start" },
    { title: "Mark End", dataIndex: "mark_end", key: "mark_end" },
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
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (record) => (
    //     <Button onClick={() => setEdit(record)} type="link">
    //       Edit
    //     </Button>
    //   ),
    // },
  ];

  const fields = [
    {
      id: 1,
      label: "PA Score Title",
      name: "name",
      component: <Input size="large" placeholder="PA Score Title" />,
    },
    {
      id: 8,
      label: "",
      name: "color",
      component: <Input size="large" value={color} hidden />,
    },
    {
      id: 2,
      label: `Color`,
      name: "color",
      // component:<ColorPicker width={456} height={250} color={color} onChange={setColor} hideHSV dark  setColor />,
      component:<SketchPicker width={456} color={color?.hex} onChange={setColor} disableAlpha/>,
    },
    {
      id: 3,
      label: "Rating Range",
      requiredCheck: true,
      components: [
        {
          id: 1,
          name: 'mark_start',
          component: <Input size="large" min={1} max={100} placeholder="Start mark" className="mr-4"/>,
          required: true,
        },
        {
          id: 2,
          name: 'mark_end',
          component: <Input size="large" min={1} max={100} placeholder="End mark" />,
          required: true,
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
      title="PA Score Setup"
      title_extension="PA Score Setup" //create or edit new --title_extn--
      list_api={PA_SCORE_LIST}
      create_submit_api={PA_SCORE_CREATE}
      edit_submit_api={PA_SCORE_LIST}
      form_fields={fields}
      edit={edit}
      setEdit={setEdit}
      flag="color"
      setColor={setColor}
    />
  );
};
