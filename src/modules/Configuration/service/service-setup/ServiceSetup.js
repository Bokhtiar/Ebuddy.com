import { Button, Input, Radio, Select, Tag } from "antd";
import React, { useEffect, useState } from "react";
import {
  SERVICE_SETUP_CREATE,
  SERVICE_SETUP_LIST,
  GET_CLIENT_FILTER,
  GET_SERVICE_TYPE_LIST,
  DEPARTMENT_LIST
} from "../../../../scripts/api";
import { getData } from "../../../../scripts/api-service";
import { alertPop } from "../../../../scripts/message";
import ConfigView from "../../__commons__/ConfigView";
import {dateFormat} from "../../../../scripts/helper";

export default () => {
  const [edit, setEdit] = useState();
  const [msTypes, setMsTypes] = useState();
  const [department, setDepartment] = useState();
  const [isView, setIsView] = useState();

  const getServiceTypes = async () => {
    const res = await getData(GET_SERVICE_TYPE_LIST);
    if (res) setMsTypes(res.data?.data);
    else alertPop("error", "Service types not found");
  };

  const getFilterParams = async () => {
    // const res = await getData(GET_CLIENT_FILTER);
    const res = await getData(DEPARTMENT_LIST);
    let masterData = res?.data?.data;

    if (res && masterData) {
      setDepartment(masterData);

    } else alertPop("error", "Department not found");
  } 

  useEffect(() => {
    getServiceTypes();
    getFilterParams();
  }, []);

  const showServerType = (typeId) => {
    if (msTypes && msTypes.length && typeId) {
      let find = msTypes.find(t => t.id === typeId);
      return find?.name || "---";
    } else return "---"
  }

  const columns = [
    { title: "Code", dataIndex: "code", key: "code" },
    { title: "Name", dataIndex: "full_name", key: "fname" },
    { title: "Type", key: "type", render: ({ service_type_id }) => <span>{showServerType(service_type_id)}</span> },
    { title: "Departments", 
      key: "departments",
      render: row => <>{row?.department_details?.map(dept =>(
        <Tag>{dept?.name}</Tag>
      ))}</>
    },
    { title: "Created By", key: "cb", render: (r) => r.created_by?.name },
    { 
      title: "Created Date", 
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
      render: (record) => (<>
        <Button onClick={() => {
          setEdit(record); 
          setIsView(true)
        }} type="link">
          View
        </Button>

        <Button onClick={() => {
          setEdit(record); 
          setIsView(false);
          }} type="link">
          Edit
        </Button>
        </>
      ),
    },
  ];

  const fields = [
    // {
    //   id: 1,
    //   label: "Service Code",
    //   name: "code",
    //   component: <Input size="large" placeholder="Service code" disabled={isView}/>,
    // },
    {
      id: 2,
      label: "Full name",
      name: "full_name",
      component: <Input size="large" placeholder="Full name" disabled={isView}/>,
    },
    {
      id: 3,
      label: "Short name",
      name: "short_name",
      component: <Input size="large" placeholder="Short name" disabled={isView}/>,
    },
    {
      id: 4,
      label: "Service/Product Type",
      name: "service_type_id",
      component: (
        <Select placeholder="Service/Product Type" size="large" showSearch disabled={isView}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }>
          {msTypes &&
            msTypes.map(({ id, name }) => (
              <Select.Option value={id}>{name}</Select.Option>
            ))}
        </Select>
      ),
    },
    {
      id: 5,
      label: "DEPARTMENT",
      name: "departments",
      component: (
        <Select 
          mode="multiple" 
          getPopupContainer={trigger => trigger.parentNode} 
          placeholder="Department" 
          size="large" 
          showSearch 
          disabled={isView}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {department &&
            department.map(({ id, name }) => (
              <Select.Option key={id} value={id}>{name}</Select.Option>
            ))}
        </Select>
      ),
    },
    {
      id: 6,
      label: "Description",
      name: "description",
      component: <Input.TextArea size="large" placeholder="Description" disabled={isView}/>,
    },
    {
      id: 7,
      label: "Status",
      name: "status",
      component: (
        <Radio.Group disabled={isView}>
          <Radio value={1}>Active</Radio>
          <Radio value={0}>Inactive</Radio>
        </Radio.Group>
      ),
    },
  ];

  return (
    <ConfigView
      columns={columns}
      title="Service/Product Setup"
      title_extension="Service/Product" //create or edit new --title_extn--
      list_api={SERVICE_SETUP_LIST}
      create_submit_api={SERVICE_SETUP_CREATE}
      edit_submit_api={SERVICE_SETUP_LIST}
      form_fields={fields}
      edit={edit}
      setEdit={setEdit}
      isView={isView}
    />
  );
};
