import { Button, Input, Radio, Tag, Select } from "antd";
import React, { useState, useEffect } from "react";
import {
  PIS_COMPANY_LIST,
} from "../../../../scripts/api";
import ConfigView from "../../__commons__/ConfigView";
import { dateFormat } from "../../../../scripts/helper";
import { getData } from "../../../../scripts/api-service";

export default () => {
  const [edit, setEdit] = useState();
  const [companyList, setCompanyList] = useState();

  const getCompanyList = async () => {
    let res = await getData(PIS_COMPANY_LIST);

    if (res) {
      let masterData = res?.data?.data?.data;
      if (res) {
        setCompanyList(masterData);
      }
    }
  }

  useEffect(() => {
    getCompanyList();
  }, []);

  const columns = [
    {
      title: "Company Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code"
    },
    {
      title: "Short Name",
      dataIndex: "short_name",
      key: "short_name"
    },
    { title: "Created By", key: "cd", render: ({ created_by }) => <span>{created_by?.name}</span> },
    { title: "Created Date", key: "cd", render: ({ created_at }) => <span>{dateFormat(created_at)}</span> },
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
      label: "Company Name",
      name: "name",
      component: <Input size="large" placeholder="Company Name" />,
    },
    {
      id: 2,
      label: "Code",
      name: "code",
      component: <Input size="large" placeholder="Company Code" />,
    },
    {
      id: 3,
      label: "Short Name",
      name: "short_name",
      component: <Input size="large" placeholder="Short Name" />,
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
      title="Company"
      title_extension="Company" //create or edit new --title_extn--
      list_api={PIS_COMPANY_LIST}
      create_submit_api={PIS_COMPANY_LIST}
      edit_submit_api={PIS_COMPANY_LIST}
      form_fields={fields}
      edit={edit}
      setEdit={setEdit}
    />
  </>
  );
};
