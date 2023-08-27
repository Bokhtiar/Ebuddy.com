import { Button, Input, Radio, Select, InputNumber } from "antd";
import React, { useState, useEffect } from "react";
import {
  PIS_BANK_BRANCH_LIST,
  PIS_BANK_BRANCH_CREATE,
  PIS_BANK_LIST
} from "../../../../scripts/api";
import ConfigView from "../../__commons__/ConfigView";
import {dateFormat} from "../../../../scripts/helper";
import { getData } from "../../../../scripts/api-service";

export default () => {
  const [edit, setEdit] = useState();
  const [bankList, setBankList] = useState();

  const getBankList = async () => {
    let res = await getData(PIS_BANK_LIST);

    if (res) {
      let masterData = res?.data?.data?.data;
      if (res) {
        setBankList(masterData);
      }
    }
  }

  useEffect(()=>{
    getBankList();
  },[]);

  const columns = [
    { title: "Bank Name", 
      dataIndex: "bank.bank_name", 
      key: "fname" 
    },
    { title: "Branch Name", 
      dataIndex: "branch_name", 
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
      name: "bank_id",
      component:
        <Select 
          size="large" 
          placeholder="Select Bank" 
          showSearch 
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {bankList ? bankList.map(com=>{
            return(<Select.Option key={com.id} value={com.id}>{com.bank_name}</Select.Option>)
          }) : null}
        </Select>,
    },
    {
      id: 2,
      label: "Branch Name",
      name: "branch_name",
      component: <Input size="large" placeholder="Branch Name" />,
    },
    {
      id: 3,
      label: "Branch Code",
      name: "branch_code",
      component: <Input size="large" placeholder="Branch Code" />,
    },
    {
      id: 4,
      label: "Routing No",
      name: "routing_no",
      component: <InputNumber size="large" placeholder="Routing No" style={{width: '100%'}} min={0} max={999999999}/>,
    },
    {
      id: 5,
      label: "Address",
      name: "address",
      component: <Input size="large" placeholder="Address" />,
    },
    {
      id: 6,
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
      title="Bank Branch"
      title_extension="Bank Branch" //create or edit new --title_extn--
      list_api={PIS_BANK_BRANCH_LIST}
      create_submit_api={PIS_BANK_BRANCH_CREATE}
      edit_submit_api={PIS_BANK_BRANCH_CREATE}
      form_fields={fields}
      edit={edit}
      setEdit={setEdit}
    />
    </>
  );
};
