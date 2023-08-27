import { Button, Input, Radio, Row, Col } from "antd";
import React, { useState } from "react";
import {
  COMPANY_SIZE_CREATE,
  COMPANY_SIZE_LIST,
} from "../../../../scripts/api";
import ConfigView from "../../__commons__/ConfigView";
import {dateFormat} from "../../../../scripts/helper";

export default () => {
  const [edit, setEdit] = useState();
  const columns = [
    { title: "Company size", dataIndex: "name", key: "fname" },
    {
      title: "Employee number",
      key: "en",
      render: (r) => `${r.min_emp}-${r.max_emp}`,
    },
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
      label: "Company size name",
      name: "name",
      component: <Input size="large" placeholder="Enter size name" />,
      helper: "Ex: small, srartup, medium, large, very large",
    },
    // {
    //   id: 2,
    //   label: "Minimum number of employees",
    //   name: "min_emp",
    //   component: <Input size="large" placeholder="Min. number of employees" />,
    // },
    {
      id: 3,
      label: "Number of employees",
      requiredCheck: true,
      components: [
        {
          id: 1,
          name: 'min_emp',
          component: <Input size="large" placeholder="From" className="mr-4" />,
          required: false,
        },
        {
          id: 2,
          name: 'max_emp',
          component: <Input size="large" placeholder="To" />,
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
      title="Company Size Setup"
      title_extension="Company Size" //create or edit new --title_extn--
      list_api={COMPANY_SIZE_LIST}
      create_submit_api={COMPANY_SIZE_CREATE}
      edit_submit_api={COMPANY_SIZE_LIST}
      form_fields={fields}
      edit={edit}
      setEdit={setEdit}
    />
  );
};
