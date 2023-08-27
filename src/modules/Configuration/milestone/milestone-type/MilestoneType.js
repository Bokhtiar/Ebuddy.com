import { Button, Divider, Modal, Skeleton, Table } from "antd";
import React, { useEffect, useState } from "react";
import { MILESTONE_TYPE, DEPARTMENT_LIST } from "../../../../scripts/api";
import { getData } from "../../../../scripts/api-service";
import { Flex } from "../../../commons/Flex";
import { PageTitle } from "../../../commons/PageTitle";
import SearchFilter from "../../../commons/SearchFilter";
import { TableWrapper } from "../../../commons/Wrapper";
import AddNew from "./AddNew";
import {dateFormat} from "../../../../scripts/helper";

/*
    These are newer modules and ant design Tables are used instead
    of custom designed Tables in the project commons directory
*/

const MilestoneType = () => {
  const [modal, setModal] = useState();
  const [edit, setEdit] = useState();
  const [list, setList] = useState();
  const [pageCount, setPageCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchString, setSearchString] = useState();
  const [dateFilter, setDateFilter] = useState();
  const [departmentList, setDepartmentList] = useState();

  const view = async (que) => {
    let res = await getData(
      `${que}?page=${currentPage}${searchString ? `&search=${searchString}` : ''} 
        ${dateFilter ? `&from_date=${dateFilter.date_from}&to_date=${dateFilter.date_to}` : ''}`
    );
    if (res?.data?.data?.data) {
      setList(res.data.data.data);
      setPageCount(res.data.data.last_page);
    }
  };

  const paginate = (page) => setCurrentPage(page);

  const search = (value) => { setSearchString(value) };

  const filter = (date) => { setDateFilter(date) };

  const columns = [
    {
      title: "Type Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Created by",
      render: (record) => record.created_by?.name,
      key: "cb",
    },
    {
      title: "Created date",
      // dataIndex: "created_at",
      key: "address",
      render: ({ created_at }) => <span>{dateFormat(created_at)}</span>,
    },
    {
      title: "Status",
      render: ({ status }) => (status === 1 ? "Active" : "Inactive"),
      key: "status",
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

  const getDepartmentList = async () => {
    let url = DEPARTMENT_LIST;

    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      setDepartmentList(masterData);
    }
  };

  useEffect(() => {
    getDepartmentList();
    view(MILESTONE_TYPE);
  }, [currentPage]);

  // useEffect(() => {
  //   // if (searchString) {
  //     setList(null);
  //     view(MILESTONE_TYPE);
  //   // }
  // }, [searchString]);

  // useEffect(() => {
  //   if (dateFilter) {
  //     setList(null);
  //     view(MILESTONE_TYPE);
  //   }
  // }, dateFilter)

  useEffect(() => {
    if (currentPage === 1) view(MILESTONE_TYPE);
    else setCurrentPage(1);
  }, [dateFilter, searchString]);

  return (
    <TableWrapper>
      <SearchFilter
        search={search}
        filter={filter}
        filterOptions={[{ type: "date_range" }]}
        failsafe
      />
      <Flex space="1rem" justify="space-between">
        <PageTitle>Milestone Type Setup</PageTitle>
        <Button onClick={() => setModal(true)} width="40%" type="primary">
          Create New Milestone Type
        </Button>
      </Flex>
      <Divider />
      {list ? (
        <Table
          dataSource={list}
          columns={columns}
          scroll={{ y: "calc(100vh - 20rem)" }}
          pagination={{
            current: currentPage,
            total: pageCount * 10,
            onChange: (page) => paginate(page),
          }}
        />
      ) : (
        <Skeleton active className="pad" />
      )}
      <Modal
        title="Create New Milestone Type"
        centered
        visible={modal}
        onCancel={() => setModal(false)}
        footer={false}
      >
        <AddNew setModal={setModal} refresh={view} departmentList={departmentList}/>
      </Modal>
      <Modal
        title="Edit Milestone Type"
        centered
        visible={edit}
        onCancel={() => setEdit(null)}
        footer={false}
      >
        <AddNew setModal={setEdit} refresh={view} edit={edit} departmentList={departmentList}/>
      </Modal>
    </TableWrapper>
  );
};

export default MilestoneType;
