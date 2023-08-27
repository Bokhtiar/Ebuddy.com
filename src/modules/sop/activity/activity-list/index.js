import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Select, Table, Icon, Tag, DatePicker } from "antd";
import { TASK_SOP_ACTIVITIES, PIS_DEPARTMENT_LIST, TASK_SOP_FUNCTION_TYPE_LIST, TASK_SOP_FUNCTION_LIST } from "../../../../scripts/api";
import { getData } from "../../../../scripts/api-service";
import { Flex } from "../../../commons/Flex";
import { Wrapper } from "../../../commons/Wrapper";
import SearchFilter from "../../../commons/SearchFilter";
import sales_task from "../../../../assets/icons/test/sales_task_icon.svg";
import { dateFormat } from "../../../../scripts/helper";
import { dropdownItemsRequest, findDepartment, findDesignation, findFunction, findFunctionType } from "../../SopHelper";
import expandActive from "../../../../assets/expand-active.svg"
import expandInactive from "../../../../assets/expand-inactive.svg";

export default () => {
  const [activityList, setActivityList] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [pageCount, setPageCount] = useState();
  const [sopSetData, setSOPSetData] = useState();
  const [searchData, setSearch] = useState();
  const [departmentList, setDepartmentList] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState();
  const [functionTypeList, setFunctionTypeList] = useState();
  const [selectedFunctionType, setSelectedFunctionType] = useState();
  const [functionList, setFunctionList] = useState();
  const [selectedFunction, setSelectedFunction] = useState();

  const search = (value) => {
    setSearch(prevState => ({
      ...prevState,
      "search": value
    }))
  };

  const filter = (date) => {
      setSearch(prevState => ({
        ...prevState,
        "from_date": date?.date_from,
        "to_date": date?.date_to
      }))
  };

  const getActivityList = async () => {
    let url = TASK_SOP_ACTIVITIES + "?";

    if (currentPage) url = url + '&page=' + currentPage;
    if (selectedDepartment) url = url + '&department_id=' + selectedDepartment;
    if (selectedFunctionType) url = url + '&function_type_id=' + selectedFunctionType;
    if (selectedFunction) url = url + '&function_id=' + selectedFunction;
    
    if (searchData) {
      if (searchData.company_id) url = url + '&company_id=' + searchData.company_id;
      if (searchData.status) url = url + '&status=' + searchData.status;
      if (searchData.search) url = url + '&search=' + searchData.search;
      if (searchData.from_date) url = url + '&from_date=' + searchData.from_date;
      if (searchData.to_date) url = url + '&to_date=' + searchData.to_date;
    }

    let res = await getData(url);
    console.log("response active list", res.data.data);
    if (res) {
      let masterData = res?.data?.data?.data;
      setActivityList(masterData);
      setPageCount(res?.data?.data?.last_page);
    }
  };

  const getDepartmentList = async () => {
    let url = PIS_DEPARTMENT_LIST + "?"; 
    // url = url + "&company_id=" + company_id;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      if (res?.data?.code === 200) {
        setDepartmentList(masterData);
      }
    }
  }

  const getFunctionTypeList = async (id) => {
    let url = TASK_SOP_FUNCTION_TYPE_LIST + "?department_id=" + id; 
    // url = url + "&company_id=" + company_id;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      if (res?.data?.code === 200) {
        setFunctionTypeList(masterData);
      }
    }
  }

  const getFunctionList = async (id) => {
    let url = TASK_SOP_FUNCTION_LIST + "?function_type_id=" + id; 
    // url = url + "&company_id=" + company_id;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      if (res?.data?.code === 200) {
        setFunctionList(masterData);
      }
    }
  }

  const getAllSOPData = async () => {
    let res = await dropdownItemsRequest();
    setSOPSetData(res);
  };

  useEffect(() => {
    getAllSOPData();
    getDepartmentList();
  }, []);

  useEffect(() => {
    getFunctionTypeList(selectedDepartment);
  }, [selectedDepartment]);

  useEffect(() => {
    getFunctionList(selectedFunctionType);
  }, [selectedFunctionType]);

  useEffect(() => {
    getActivityList();
  }, [currentPage, searchData, selectedDepartment, selectedFunctionType, selectedFunction]);

  const columns = [
    {
      title: 'Company',
      key: 'company',
      render: (row) => <>{row.company?.name}</>
    },
    {
      title: "Departments",
      // dataIndex: "company.name",
      // key: "company_name"
      render: row => row?.sop_department_info?.map((item, index)=>{
        return <Tag key={`department-${index}`} className="m-1">{item.department?.name}</Tag>
      }),
      width: '40%'
    },
    { title: 'SOP Title', dataIndex: 'name', key: 'name' },
    { title: 'Estimation', dataIndex: 'estimation', key: 'estimation' },
    {
      title: "Total Activities",
      key: "activity",
      render: (row) => <>{row.activity?.length || 0}</>
    },
    {
      title: "Created By",
      key: "created_by",
      render: (row) => <div>
        <p>{row?.created_by?.name}</p>
        <p>{dateFormat(row?.created_at)}</p>
      </div>
    },
    {
      title: "Status",
      key: "status",
      render: (row) => <>{row.status ? <Tag color="#87d068" style={{ color: "#fff" }}>Active</Tag> : <Tag color="#f50" style={{ color: "#fff" }}>Inactive</Tag>}</>
    },
    {
      title: "Action",
      key: "action",
      render: (row) =>
        <>
          <Button type="link">
            <Link to={`/sop/activity-linkup?activityId=${row.id}`}> Edit </Link>
          </Button>
        </>,
    },
    {
      title: "",
      key: "progress",
      // width: "20px"
    }
  ];

  const expandedRowRender = (record) => {
    const columns = [
      {
        title: "Activity",
        key: "activity",
        render: (row) => row?.activity_name,
      },
      {
        title: 'Department & Designation',
        key: 'department_id',
        render: (record) => (
          <div>
            <p>{findDepartment(record.department_id, sopSetData?.PISDepartment)}</p>
            <p>{findDesignation(record.designation_id, sopSetData?.designation)}</p>
          </div>
        ),
      },
      {
        title: "Func. Type & Name",
        key: "func_type_name",
        render: (row) => <div>
          <p>{findFunction(row?.function_id, sopSetData?.function)}</p>
          <p>{findFunctionType(row?.function_type_id, sopSetData?.functionType)}</p>
        </div>
      },
      {
        title: "Est. Time & Date",
        key: "est_time_date",
        render: (row) => <div>
          <p>Day {row.estimation_day}</p>
          <p>{row.estimation_time}m</p>
        </div>,
      },
      {
        title: "Created By",
        key: "created_by",
        render: (row) => <div>
          <p>{row?.created_by?.name}</p>
          <p>{dateFormat(row?.created_at)}</p>
        </div>
      },
      {
        title: "Status",
        key: "status",
        render: (row) => <>{row.status ? <Tag color="#87d068" style={{ color: "#fff" }}>Active</Tag> : <Tag color="#f50" style={{ color: "#fff" }}>Inactive</Tag>}</>
      },
    ];

    return <Table columns={columns} dataSource={record?.activity} pagination={false} />;
  };

  return (
    <Wrapper>
      <SearchFilter
          search={search}
          filter={filter}
          filterOptions={[{type: "date_range"}]}
          failsafe
      />
      
      <Flex space="1rem" justify="">
        <Button 
          style={{ width: '20%', 'marginRight': '1rem' }}
          type="primary"
        >
          <Link
            to={`/sop/activity-linkup`}>
            Activity Linkup
          </Link>
        </Button>

        <Select
          allowClear
          style={{width: '20%', 'marginRight': '1rem'}} 
          getPopupContainer={trigger => trigger.parentNode}
          dropdownMatchSelectWidth={false}
          placeholder='Department'
          disabled={!departmentList?.length}
          onChange={(value)=> {
            setSelectedDepartment(value);
            setFunctionTypeList();
            setFunctionList();
            setSelectedFunctionType();
            setSelectedFunction();
          }}
          showSearch
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {departmentList ? departmentList.map(dept => {
          return (<Select.Option key={dept.id} value={dept.id}>{dept.name}</Select.Option>)
          }) : null}
        </Select>
        <Select
          allowClear
          style={{width: '20%', 'marginRight': '1rem'}} 
          getPopupContainer={trigger => trigger.parentNode}
          dropdownMatchSelectWidth={false}
          placeholder='Function Type'
          // disabled={!departmentList?.length}
          value={selectedFunctionType}
          onChange={(value)=> {
            setSelectedFunctionType(value);
            setFunctionList();
            setSelectedFunction();
          }}
          showSearch
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {functionTypeList ? functionTypeList.map(funcType => {
          return (<Select.Option key={funcType.id} value={funcType.id}>{funcType.name}</Select.Option>)
          }) : null}
        </Select>
        <Select
          allowClear
          style={{width: '20%', 'marginRight': '1rem'}} 
          getPopupContainer={trigger => trigger.parentNode}
          dropdownMatchSelectWidth={false}
          placeholder='Function Name'
          // disabled={!departmentList?.length}
          value={selectedFunction}
          onChange={(value)=> setSelectedFunction(value)}
          showSearch
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {functionList ? functionList.map(funcName => {
          return (<Select.Option key={funcName.id} value={funcName.id}>{funcName.name}</Select.Option>)
          }) : null}
        </Select>
        <Select 
          allowClear={true}
          style={{ width: '25%', 'marginRight': '1rem' }}
          placeholder='Status'
          showSearch
          value={searchData?.status || undefined}
          onChange={(value) => {
            setSearch(prevState => ({
              ...prevState,
              "status": value
            }))
          }}
          filterOption={(input, option) =>
            option.props.children
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0}
        >
          <Select.Option key="Active" value="1">Active</Select.Option>
          <Select.Option key="Inactive" value="0">Inactive</Select.Option>
        </Select>
      </Flex>

      {activityList?.length > 0 ? (
        <Table
          scroll={{
            x: 1500,
            y: 650
          }}
          className="components-table-demo-nested"
          columns={columns}
          dataSource={activityList}
          expandedRowRender={expandedRowRender}
          pagination={{
            current: currentPage,
            total: pageCount * 10,
            onChange: (page) => setCurrentPage(page),
          }}
          expandIconAsCell={false}
          expandIcon = {({ expanded, onExpand, record }) => <img className="activity-icon" onClick={e => onExpand(record, e)}
              src={expanded ? expandActive : expandInactive} height="30" />}
          expandIconColumnIndex={8}
        />
      ) : <LandingContent />
      }
    </Wrapper>
  );
};

const LandingContent = () => {
  return (
    <div className="landing-content mt-5" style={{ textAlign: 'center' }}>
      <img src={sales_task} height="200" />
      <h2>No Data found</h2>
    </div>
  )
}