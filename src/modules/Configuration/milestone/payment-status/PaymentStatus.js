import { Button, Input, Radio } from "antd";
import React, { useState } from "react";
import { PAYMENT_STATUS } from "../../../../scripts/api";
import ConfigView from "../../__commons__/ConfigView";
import {dateFormat} from "../../../../scripts/helper";

const PaymentStatus = () => {
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
      label: "Payment status name",
      name: "name",
      component: <Input size="large" placeholder="Payment status name" />,
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
      title="Payment Status Setup"
      title_extension="Payment Status"
      list_api={PAYMENT_STATUS}
      create_submit_api={PAYMENT_STATUS}
      edit_submit_api={PAYMENT_STATUS}
      form_fields={fields}
      edit={edit}
      setEdit={setEdit}
    />
  );
};

export default PaymentStatus;
