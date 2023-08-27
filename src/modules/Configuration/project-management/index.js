import { Button, Input, Radio, Tag, Select, Checkbox, Popover } from "antd";
import React, { useState, useEffect } from "react";
import {
  PROJECT_SETUP_LIST,
  ALL_PROJECT_SETUP_LIST,
  USER_LIST,
  PROJECT_MANAGEMENT_LIST,
  TEAMS_CREATE
} from "../../../scripts/api";
import ConfigView from "../__commons__/ConfigView";
import { dateFormat } from "../../../scripts/helper";
import { getData } from "../../../scripts/api-service";

export default () => {
  const [edit, setEdit] = useState();
  const [projectList, setProjectList] = useState();
  const [employeeList, setEmployeeList] = useState();
  const [searProject, setSearProject] = useState('');
  const [listData, setListData] = useState([]);
  const [count, setCount] = useState(1);

  const getProjectList = async (search) => {
    let url = ALL_PROJECT_SETUP_LIST + '?limit=50';
    if (search) url += `&search=${search}`;

    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data?.data;
      setProjectList(masterData);
    }
  }

  const getEmployeeList = async () => {
    let res = await getData(USER_LIST);

    if (res) {
      let masterData = res?.data?.data;
      if (res?.data?.code === 200) {
        setEmployeeList(masterData);
      }
    }
  }

  const handleProjectSearch = (val) => {
    setSearProject(val);
    getProjectList(val);
  }

  const manageListData = (list) => {
    setListData(list);
  }

  useEffect(() => {
    getProjectList();
    getEmployeeList();
  }, []);

  useEffect(() => {
    if (listData?.length && projectList?.length && count) {
      listData.forEach(item => {
        let idx = projectList.findIndex(pro => pro.id === item.id);

        if (idx === -1) {
          projectList.push({ id: item.id, name: item.name });
        }
      });

      setProjectList([...projectList]);
      setCount(0)
    }
  }, [listData, projectList]);

  const columns = [
    {
      title: "Project Name",
      dataIndex: "name",
      key: "project_name"
    },
    {
      title: "Employees",
      key: "emp_name",
      render: row => 
        <Popover 
          content={row?.managements?.map(item => <Tag>{item.employee?.name}</Tag>)}
          trigger="hover"
        >
          <Button>Employee Names</Button>
        </Popover>
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Button onClick={() => {
          setEdit(record);
        }} type="link">
          Edit
        </Button>
      ),
    },
  ];

  const fields = [
    {
      id: 1,
      label: "Project Name",
      name: "project_id",
      component:
        <Select
          size="large"
          placeholder="Select Project"
          value={searProject}
          showSearch
          filterOption={false}
          onSearch={(val) => handleProjectSearch(val)}
        >
          {projectList ? projectList.map(project => {
            return (<Select.Option key={"project-id" + project.id} value={project.id}>{project.name}</Select.Option>)
          }) : null}
        </Select>,
    },
    {
      id: 2,
      label: "Employee Name",
      name: "emp_ids",
      component:
        <Select
          mode="multiple"
          getPopupContainer={trigger => trigger.parentNode}
          size="large"
          placeholder='Select Employee Name'
          showSearch
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {employeeList ? employeeList.map(emp => {
            return (<Select.Option key={emp.emp_id} value={emp.emp_id}>{emp.name}</Select.Option>)
          }) : null}
        </Select>,
    },
    // {
    //   id: 3,
    //   label: "Status",
    //   name: "status",
    //   component: (
    //     <Radio.Group>
    //       <Radio value={1}>Active</Radio>
    //       <Radio value={0}>Inactive</Radio>
    //     </Radio.Group>
    //   ),
    // },
  ];

  return (<>
    <ConfigView
      columns={columns}
      title="Project Management"
      title_extension="Project Management" //create or edit new --title_extn--
      list_api={PROJECT_MANAGEMENT_LIST}
      create_submit_api={PROJECT_MANAGEMENT_LIST}
      edit_submit_api={PROJECT_MANAGEMENT_LIST}
      form_fields={fields}
      edit={edit}
      setEdit={setEdit}
      manageListData={manageListData}
    />
  </>
  );
};
