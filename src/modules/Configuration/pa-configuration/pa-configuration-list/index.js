import { Button, Divider, Modal, Skeleton, Table, Select } from "antd";
import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { PA_CONFIGURATION_SUMMARY, PA_CATEGORY_CREATE, DEPARTMENT_LIST } from "../../../../scripts/api";
import ConfigView from "../../__commons__/ConfigView";
import {dateFormat} from "../../../../scripts/helper";
import { TableWrapper, Wrapper } from "../../../commons/Wrapper";
import { Flex } from "../../../commons/Flex";
import { PageTitle } from "../../../commons/PageTitle";
import SearchFilter from "../../../commons/SearchFilter";
import { getData } from "../../../../scripts/api-service";
import ConfigCreate from '../pa-configuration-create/index';

export default () => {
  const [edit, setEdit] = useState();
  const [modal, setModal] = useState();
  const [list, setList] = useState();
  const [pageCount, setPageCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchString, setSearchString] = useState();
  const [dateFilter, setDateFilter] = useState();
  const [context, setContext] = useState("");
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState();

  const getConfigurationList = async (que) => {
    setList(null);
    let url = que + '?page='+ currentPage;

    if (searchString) url = url + "&search=" + searchString;
    if (dateFilter && dateFilter.date_from && dateFilter.date_to) url = url + `&from_date=${dateFilter.date_from}&to_date=${dateFilter.date_to}`;
    if (selectedDepartment) url = url + "&department_id=" + selectedDepartment ;

    let res = await getData(url);

    if (res) {
      // console.log("dataaaaaaaaaaaa>>>>>>>>>", res?.data?.data?.data);
      setList(res?.data?.data?.data);
      setPageCount(res?.data?.data?.last_page);
    }
  };

  const search = (value) => setSearchString(value);
  const filter = (filter) => setDateFilter(filter);

  const getDepartments = async () => {
    let res  = await getData(DEPARTMENT_LIST);

    if (res) {
        let masterData = res.data.data;
        setDepartments(masterData);
    }
  }

  useEffect(() => {
    getDepartments();
  }, []);

  useEffect(() => {
    getConfigurationList(PA_CONFIGURATION_SUMMARY);
  }, [currentPage]);

  useEffect(() => {
    if (currentPage === 1) getConfigurationList(PA_CONFIGURATION_SUMMARY);
    else setCurrentPage(1);
  }, [dateFilter, searchString, selectedDepartment]);

  const columns = [
    { title: "Department", dataIndex: "name", key: "dept_name" },
    { title: "PA Type", dataIndex: "pa_type_name", key: "pa_type_name" },
    { title: "Category", dataIndex: "pa_category_name", key: "pa_category_name" },
    { title: "Sub Category", dataIndex: "pa_sub_category", key: "pa_sub_category" },
    { title: "Criteria", dataIndex: "pa_criteria", key: "pa_criteria" },
    { title: "Sub Criteria", dataIndex: "pa_sub_criteria", key: "pa_sub_criteria" },
    // {
    //   title: "Status",
    //   key: "sts",
    //   render: (r) => (r.status === 1 ? "Active" : "Inactive"),
    // },
    {
      title: "Action",
      key: "action",
      render: (value, record, index) => {
      // (
      //   <Link to={`/configuration/configuration-update?deptId=${record.department_id}`}>Edit</Link>
      // ),
        const obj = {
          children: <></>,
          props: {},
        };
        if (index % 2 === 0) {
          obj.children = <Link to={`/configuration/configuration-update?deptId=${record.department_id}&paTypeId=${record.pa_type_id}&paTypeName=${record.pa_type_name}`}>Edit</Link>
          obj.props.rowSpan = 2;
        }
        // These two are merged into above cell
        else{
          obj.props.rowSpan = 0;
        }
        return obj;
        // return <button onClick={() => console.log("record>>>>>>>>>", record.pa_type_id)}>click</button>
        ;
      },
    },
  ];

  return (
    <Wrapper>
      {/* <SearchFilter
        search={search}
        filter={filter}
        filterOptions={[{ type: "date_range" }]}
        failsafe
      /> */}
      <Flex space="1rem" justify="space-between">
        {/* <PageTitle>{title}</PageTitle> */}
        {/* <Button onClick={() => setModal(true)} width="40%" type="primary">
          Create New Configuration
        </Button> */}
        <Select 
            allowClear={true}
            style={{width: '40%', 'marginRight': '1rem'}} 
            showSearch
            placeholder='Department Filter'
            value={selectedDepartment ? selectedDepartment : undefined }
            onChange={(value) => setSelectedDepartment(value)}
            filterOption={(input, option) =>
            option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
        >   
            {
                departments?.length ? 
                    departments.map(dep => <Select.Option value={dep.id} key={dep.id}>{dep.name}</Select.Option>) : ''
            }
        </Select>
      </Flex>
      <Divider />
      {list ? (
        <Table
          dataSource={list}
          columns={columns}
          // scroll={{ y: "calc(100vh - 22rem)" }}
          pagination={{
            current: currentPage,
            total: pageCount * 10,
            onChange: (page) => setCurrentPage(page),
          }}
        />
      ) : (
        <Skeleton active className="pad" />
      )}
    </Wrapper>
  );
};
