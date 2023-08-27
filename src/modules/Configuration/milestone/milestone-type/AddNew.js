import { Input, Radio, Select } from "antd";
import React, { useState } from "react";
import { MILESTONE_TYPE } from "../../../../scripts/api";
import { postData } from "../../../../scripts/api-service";
import { CreateForm } from "../../../commons/CreateForm";

export default ({ setModal, refresh, edit, departmentList }) => {
  const [loading, setLoading] = useState();

  const submit = async (value, form) => {
    setLoading(true);
    const res = await postData(
      edit ? `${MILESTONE_TYPE}/${edit.id}` : MILESTONE_TYPE,
      { ...value }
    );

    if (res) {
      form.resetFields();
      refresh(MILESTONE_TYPE);
      setModal(false);
    }
    setLoading(false);
  };

  const fields = [
    {
      id: 1,
      label: "Type Name",
      name: "name",
      component: <Input size="large" placeholder="Type name" />,
    },
    // {
    //   id: 2,
    //   label: "DEPARTMENT",
    //   name: "department_id",
    //   component: (
    //     <Select 
    //       getPopupContainer={trigger => trigger.parentNode} 
    //       placeholder="Department" 
    //       size="large" 
    //       showSearch 
    //       filterOption={(input, option) =>
    //         option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    //       }
    //     >
    //       {departmentList?.length &&
    //         departmentList.map(({ id, name }) => (
    //           <Select.Option key={id} value={id}>{name}</Select.Option>
    //         ))}
    //     </Select>
    //   ),
    // },
    // {
    //   id: 3,
    //   label: "Default",
    //   name: "default",
    //   component: (
    //     <Radio.Group>
    //       <Radio value={1}>Yes</Radio>
    //       <Radio value={0}>No</Radio>
    //     </Radio.Group>
    //   ),
    // },
    {
      id: 2,
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
    <CreateForm submit={submit} fields={fields} loading={loading} edit={edit} />
  );
};
