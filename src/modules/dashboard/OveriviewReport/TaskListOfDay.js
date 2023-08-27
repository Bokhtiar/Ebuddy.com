/** @format */

import React, { useState } from "react";
import { Table, Button, Avatar, Tag } from "antd";
import TaskStatus from "../../../@infrastructure/TaskStatus";
import {
  StatusColor,
  TaskStatusColor,
} from "../../../@infrastructure/StatusColor";
import TaskListOfDayFilters from "./TaskListOfDayFilters";
import { StatusName } from "../../../@infrastructure/Status";

const TaskListOfDay = ({
  date,
  dataSource,
  paginatorInfo,
  onChangeFilter,
  isFetching,
  getEmployeeTaskListAction,
}) => {
  const columns = [
    {
      title: "TASK NAME",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "FUNCTION NAME",
      dataIndex: "function_activity.name",
      key: "function_activity.name",
    },
    {
      title: "FUNCTION TYPE",
      dataIndex: "function_type.name",
      key: "function_type.name",
    },
    {
      title: "ASSIGNEE",
      // dataIndex: 'assigned_user',
      key: "assigned_user",
      render: (row) => (
        <>
          <Avatar src={row.assigned_user.profile_pic} />{" "}
          <span>{row.assigned_user.name}</span>
        </>
      ),
    },
    {
      title: "START DATE",
      dataIndex: "start_date",
      key: "start_date",
    },
    {
      title: "END DATE",
      dataIndex: "end_date",
      key: "end_date",
    },
    {
      title: "STATUS",
      // dataIndex: 'status',
      key: "status",
      render: ({ status }) => (
        <Tag color={StatusColor[StatusName[status]]}>
          <span style={{ color: "#fff" }}>{status}</span>
        </Tag>
      ),
    },
  ];

  return (
    <div>
      <TaskListOfDayFilters
        date={date}
        page={paginatorInfo.currentPage}
        onChangeFilter={onChangeFilter}
      />
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={isFetching}
        // onChange={handleChange}
        pagination={{
          // defaultPageSize: paginatorInfo.to,
          // position: ["bottomCenter"],
          total: paginatorInfo.total,
          // showSizeChanger: true,
          current: paginatorInfo.currentPage,
          onChange: (page, pageSize) =>
            getEmployeeTaskListAction(date, paginatorInfo?.status, page),
        }}
      />
    </div>
  );
};

const styles = {
  filterWrappperStyle: {
    display: "grid",
  },
};

export default TaskListOfDay;
