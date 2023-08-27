import { Button, Input, Radio, Tag, Select } from "antd";
import React, { useState, useEffect } from "react";
import {
  PIS_DAYS,
} from "../../../../scripts/api";
import ConfigView from "../../__commons__/ConfigView";
import {dateFormat} from "../../../../scripts/helper";

export default () => {
  const [edit, setEdit] = useState();

  const columns = [
    { title: "Days", 
      dataIndex: "name", 
      key: "fname" 
    },
    { title: "Created By",  key: "cd", render: ({ created_by }) => <span>{dateFormat(created_by)}</span>},
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
      label: "Days",
      name: "name",
      component: <Input size="large" placeholder="Days" />,
    },
    {
      id: 2,
      label: "দিন",
      name: "name_bn",
      component: <Input size="large" placeholder="দিন" />,
    },
    {
      id: 3,
      label: "Code",
      name: "code",
      component: <Input size="large" placeholder="code" />,
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

  return (<>
    <ConfigView
      columns={columns}
      title="Days"
      title_extension="Days" //create or edit new --title_extn--
      list_api={PIS_DAYS}
      create_submit_api={PIS_DAYS}
      edit_submit_api={PIS_DAYS}
      form_fields={fields}
      edit={edit}
      setEdit={setEdit}
    />
    </>
  );
};
