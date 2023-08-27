import { Button, Input, Radio, InputNumber } from "antd";
import React, { useState } from "react";
import { PA_CATEGORY_LIST, PA_CATEGORY_CREATE } from "../../../../scripts/api";
import ConfigView from "../../__commons__/ConfigView";
import {dateFormat} from "../../../../scripts/helper";

export default () => {
  const [edit, setEdit] = useState();
  const columns = [
    { title: "Category", dataIndex: "name", key: "fname" },
    { title: "Created By", key: "cb", render: (r) => r?.created_by?.name },
    { title: "Created Date", 
      key: "cd",
      render: ({ created_at }) => <span>{dateFormat(created_at)}</span>,
    },
    { title: "Weight", dataIndex: "weight", key: "weight" },
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
      label: "Category",
      name: "name",
      component: <Input size="large" placeholder="Category" />,
    },
    {
      id: 2,
      label: "Weight",
      name: "weight",
      component: <InputNumber size="large" min={1} max={100} placeholder="Weight" />,
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
      title="PA Category"
      title_extension="PA Category" //create or edit new --title_extn--
      list_api={PA_CATEGORY_LIST}
      create_submit_api={PA_CATEGORY_CREATE}
      edit_submit_api={PA_CATEGORY_LIST}
      form_fields={fields}
      edit={edit}
      setEdit={setEdit}
      flag="category"
    />
  );
};
