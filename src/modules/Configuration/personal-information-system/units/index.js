import { Button, Input, Radio, Tag, Select } from "antd";
import React, { useState, useEffect } from "react";
import {
  PIS_UNITS,
  BUSINESS_TYPE_LIST,
  PAYROLL_TYPE_LIST,
  PIS_COMPANY_LIST
} from "../../../../scripts/api";
import ConfigView from "../../__commons__/ConfigView";
import {dateFormat} from "../../../../scripts/helper";
import { getData } from "../../../../scripts/api-service";

export default () => {
  const [edit, setEdit] = useState();
  const [companyList, setCompanyList] = useState();
  const [businessTypeList, setBusinessTypeList] = useState();
  const [payrollTypeList, setPayrollTypeList] = useState();

  const getBusinessTypeList = async () => {
    let res = await getData(BUSINESS_TYPE_LIST);

    if (res) {
      let masterData = res?.data?.data;
      if (res) {
          setBusinessTypeList(masterData);
      }
    }
  }

  const getPayrollTypeList = async () => {
    let res = await getData(PAYROLL_TYPE_LIST);

    if (res) {
        let masterData = res?.data?.data;
        if (res) {
          setPayrollTypeList(masterData);
        }
    }
  }

  const getCompanyList = async () => {
    let res = await getData(PIS_COMPANY_LIST);

    if (res) {
      let masterData = res?.data?.data?.data;
      if (res) {
        setCompanyList(masterData);
      }
    }
  }

  useEffect(()=>{
    getBusinessTypeList();
    getPayrollTypeList();
    getCompanyList();
  },[]);

  const columns = [
    { title: "Unit Name", 
      dataIndex: "name", 
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
      label: "Company Name",
      name: "company_id",
      component: 
        <Select 
          size="large" 
          placeholder="Select Company" 
          showSearch 
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {companyList ? companyList.map(com=>{
            return(<Select.Option key={com.id} value={com.id}>{com.name}</Select.Option>)
          }) : null}
      </Select>,
    },
    {
      id: 2,
      label: "Units",
      name: "name",
      component: <Input size="large" placeholder="Units" />,
    },
    {
      id: 4,
      label: "Business Type",
      name: "business_type_id",
      component: 
        <Select 
          size="large" 
          placeholder="Select Business Type" 
          showSearch 
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {businessTypeList ? businessTypeList.map(com=>{
            return(<Select.Option key={com.id} value={com.id}>{com.name}</Select.Option>)
          }) : null}
      </Select>,
    },
    {
      id: 5,
      label: "Payroll Type",
      name: "payroll_type_id",
      component: 
        <Select 
          size="large" 
          placeholder="Select Payroll Type" 
          showSearch 
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {payrollTypeList ? payrollTypeList.map(com=>{
            return(<Select.Option key={com.id} value={com.id}>{com.name}</Select.Option>)
          }) : null}
      </Select>,
    },
    {
      id: 6,
      label: "Mobile No",
      name: "mobile_no",
      component: <Input size="large" placeholder="Mobile No" />,
    },
    {
      id: 7,
      label: "Phone No",
      name: "phone_no",
      component: <Input size="large" placeholder="Phone No" />,
    },
    {
      id: 8,
      label: "Unit Abbreviation",
      name: "unit_abbreviation",
      component: <Input size="large" placeholder="Unit Abbreviation" />,
    },
    {
      id: 9,
      label: "Group Mail",
      name: "group_mail",
      component: <Input size="large" placeholder="Group Mail" />,
    },
    {
      id: 10,
      label: "Address",
      name: "address",
      component: <Input size="large" placeholder="Address" />,
    },
    {
      id: 11,
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
      title="Branch/Units"
      title_extension="Branch/Units" //create or edit new --title_extn--
      list_api={PIS_UNITS}
      create_submit_api={PIS_UNITS}
      edit_submit_api={PIS_UNITS}
      form_fields={fields}
      edit={edit}
      setEdit={setEdit}
    />
    </>
  );
};
