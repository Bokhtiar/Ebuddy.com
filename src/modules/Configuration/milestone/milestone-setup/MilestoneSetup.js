import { Button, Input, Radio, Select, Checkbox } from "antd";
import React, { useEffect, useState } from "react";
import {
  DEPARTMENT_LIST,
  MILESTONES,
  MILESTONES_CREATE,
  MILESTONE_TYPE,
} from "../../../../scripts/api";
import { getData } from "../../../../scripts/api-service";
import { alertPop } from "../../../../scripts/message";
import ConfigView from "../../__commons__/ConfigView";
import { dateFormat } from "../../../../scripts/helper";
const Status = {
  INIT: 'INIT',
  YES: 'YES',
  NO: 'NO'
}
const MilestoneSetup = () => {
  const [edit, setEdit] = useState();
  const [msTypes, setMsTypes] = useState();
  const [departments, setDepartmentList] = useState();
  const [isDefaultDepartment, setIsDefaultDepartment] = useState(Status.INIT);


  const getMilestoneTypes = async () => {
    const res = await getData(MILESTONE_TYPE + '?paginate=0');
    if (res) setMsTypes(res.data?.data);
    else alertPop("error", "Milestone types not found");
  };
  const getDepartmentList = async () => {
    let url = DEPARTMENT_LIST;

    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      setDepartmentList(masterData);
    }
  };
  useEffect(() => {
    getMilestoneTypes();
    getDepartmentList();
  }, []);

  const columns = [
    { title: "Full Name", dataIndex: "full_name", key: "fname" },
    { title: "Short Name", dataIndex: "short_name", key: "sname" },
    { title: "Category", dataIndex: "milestone_type.name", key: "cat" },
    { title: "Created By", key: "cb", render: (r) => r?.created_by?.name },
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
      render: (record) => (
        <Button onClick={() => {
          const departments = record?.departments.map(d => d?.department_id)
          setEdit({...record, departments: departments.length ? departments : [], default: record.departments[0]?.default ? record.departments[0]?.default : null })
        }} type="link">
          Edit
        </Button>
      ),
    },
  ];
  const [selectedDepartment, setSelectedDepartment] = useState();

  const fields = [
    {
      id: 1,
      label: "Full Name",
      name: "full_name",
      component: <Input size="large" placeholder="Full name" />,
    },
    {
      id: 2,
      label: "Short Name",
      name: "short_name",
      component: <Input size="large" placeholder="Short name" />,
    },
    {
      id: 3,
      label: "Type",
      name: "milestone_type_id",
      component: (
        <Select placeholder="Milestone type" size="large" showSearch
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
    {
      id: 6,
      label: "Default",
      name: "default",
      component: (
        <Radio.Group>
          <Radio onClick={() => setIsDefaultDepartment(Status.YES)} value={1}>Yes</Radio>
          <Radio onClick={() => setIsDefaultDepartment(Status.NO)} value={0}>No</Radio>
        </Radio.Group>
      ),
    },

    {
      id: 5,
      label: "DEPARTMENT",
      name: "departments",
      component: (
        <Select
          size="large"
          placeholder="Select Department"
          disabled={!departments?.length}
          mode="multiple" 
          // getPopupContainer={trigger => trigger.parentNode} 
          // defaultValue={['a10', 'c12']}
          showSearch
          filterOption={(input, option) => {
            // console.log('\n\n filter options',option, input);
            return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          }
        >
          {departments ? departments.map(dept => {

            return (<Select.Option key={dept.id} value={dept.id}>{dept.name}</Select.Option>)
          }) : null}
          {/* {departments ? console.log(departments): null} */}
        </Select>
      ),
      required: false
    },

    {
      id: 7,
      label: "Attachemnt",
      name: "attachment_required",
      component: (
        <Radio.Group>
          <Radio value={1}>Yes</Radio>
          <Radio value={0}>No</Radio>
        </Radio.Group>
      ),
    },
  ];

  return (
    <ConfigView
      columns={columns}
      title="Milestone Setup"
      title_extension="Milestone Setup"
      list_api={MILESTONES}
      create_submit_api={MILESTONES_CREATE}
      edit_submit_api={MILESTONES}
      form_fields={fields}
      edit={edit}
      setEdit={setEdit}
    />
  );
};

export default MilestoneSetup;
