import { Button, Input, Radio, Tag, Select } from "antd";
import React, { useState, useEffect } from "react";
import {
  PIS_BANK_LIST,
  PIS_BANK_CREATE,
} from "../../../../scripts/api";
import ConfigView from "../../__commons__/ConfigView";
import {dateFormat} from "../../../../scripts/helper";

export default () => {
  const [edit, setEdit] = useState();

  const columns = [
    { title: "Bank Name", 
      dataIndex: "bank_name", 
      key: "fname" 
    },
    { title: "Created By",  key: "cd", render: ({ created_by }) => <span>{created_by?.name}</span>},
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
        <Button onClick={() => {
            setEdit(record)
          }} type="link">
          Edit
        </Button>
      ),
    },
  ];

  const fields = [
    {
      id: 1,
      label: "Bank Name",
      name: "bank_name",
      component: <Input size="large" placeholder="Bank Name" />,
    },
    {
      id: 2,
      label: "ব্যাংকের নাম",
      name: "bank_name_bn",
      component: <Input size="large" placeholder="ব্যাংকের নাম" />,
    },
    {
      id: 3,
      label: "Code",
      name: "code",
      component: <Input size="large" placeholder="Code" />,
    },
    {
      id: 4,
      label: "Head Office Address",
      name: "head_office_address",
      component: <Input size="large" placeholder="Head Office Address" />,
    },
    {
      id: 5,
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

  return (<>
    <ConfigView
      columns={columns}
      title="Bank"
      title_extension="Bank" //create or edit new --title_extn--
      list_api={PIS_BANK_LIST}
      create_submit_api={PIS_BANK_CREATE}
      edit_submit_api={PIS_BANK_CREATE}
      form_fields={fields}
      edit={edit}
      setEdit={setEdit}
    />
    </>
  );
};
