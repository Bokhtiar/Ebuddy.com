/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table, Tooltip, Select } from "antd";
import demoUser from "../../../../assets/dummy.jpg";
import { getData } from "../../../../scripts/getData";
import { dateFormat } from "../../../../scripts/helper";
import { openAttchment } from "../../../../scripts/helper";
import attachmentIcon from "../../../../assets/attached.svg";
import { postData } from "../../../../scripts/postData";
import { alertPop } from "../../../../scripts/message";
import { useNotification } from "../../../../scripts/helper";

export default function TeamTaskView({
  managementDetailsShow,
  managementEditHandler,
  teamActivity,
  pageCount,
  setCurrentPage,
  currentPage,
  setRowData,
  updateEvent,
  setStatus,
  statusUpdateApi,
}) {
  const { getUnreadNotifications } = useNotification();

  const activityStatusUpdateHandler = (event, row) => {
    let payload = { status: event };
    postData(`${statusUpdateApi}/${row?.id}`, payload).then((res) => {
      if (res?.data?.code === 200 || res?.data?.code === 201) {
        setStatus(res?.data?.data?.status);
        updateEvent();
        alertPop("success", "Successfully complete the process");
        getUnreadNotifications();
      } else {
        alertPop("error", res[0]);
      }
    });
  };

  const paginate = (page) => setCurrentPage(page);

  const columns = [
    {
      title: "Company",
      dataIndex: "company.name",
      key: "company_name",
    },
    {
      title: "Initiate Code",
      dataIndex: "initiate_code",
      key: "initiate_code",
    },
    {
      title: "Activity Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Function Type",
      dataIndex: "function_type.name",
      key: "function_type",
    },
    {
      title: "Function Name",
      dataIndex: "function_name.name",
      key: "function_name",
    },
    {
      title: "Created By",
      key: "created_at",
      render: (row) => (
        <div>
          <p>{row?.created_by?.name}</p>
          <p>{dateFormat(row?.created_at)}</p>
        </div>
      ),
    },
    {
      title: "Repeats",
      key: "repeats",
      render: (row) => row.repeats,
    },
    {
      title: "priority",
      dataIndex: "priority.name",
      key: "priority.name",
    },
    {
      title: "Due Date",
      dataIndex: "due_date",
      key: "due_date",
    },
    {
      title: "Estimated Time(Mins)",
      key: "estimation_time",
      render: (row) => row?.estimation_time,
    },
    {
      title: "Attachement",
      key: "attachment",
      render: (row) => (
        <span>
          {row.attachment ? (
            <img
              src={attachmentIcon}
              onClick={() => {
                openAttchment(row.attachment);
              }}
              alt="attachement"
              width="25"
              height="25"
            />
          ) : (
            ""
          )}
        </span>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (row) => (
        <Select
          placeholder="Select Status"
          onChange={(event) => activityStatusUpdateHandler(event, row)}
          value={row.status}
        >
          <Select.Option key="Pending" value="Pending">
            Pending
          </Select.Option>
          <Select.Option key="To-Do" value="To-Do">
            To-Do
          </Select.Option>
          <Select.Option key="WIP" value="WIP">
            WIP
          </Select.Option>
          <Select.Option key="Hold" value="Hold">
            Hold
          </Select.Option>
          <Select.Option key="Done" value="Done">
            Done
          </Select.Option>
          <Select.Option key="Reviewed" value="Reviewed">
            Reviewed
          </Select.Option>
        </Select>
      ),
    },
    // {
    //     title: "REPEAT",
    //     key: "repeats",
    //     render: (row) => row?.repeats ? row?.repeats : ''
    // },
    // {
    //     title: "REVIEW",
    //     // dataIndex: "activity_status",
    //     // key: "activity_status",
    //     render: (row) => <span style={{color: row?.review?.color}}>{row?.review?.name}</span>,
    // },
    {
      title: "Assignee",
      key: "assignee_profile_pic",
      render: (row) => (
        <Tooltip title={row?.assignee?.name}>
          <img
            src={row?.assignee?.profile_pic || demoUser}
            width="25"
            height="25"
            alt={row?.assignee?.name}
          />
        </Tooltip>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (row) => (
        <>
          <Button
            type="link"
            onClick={() => {
              managementDetailsShow(row);
              setRowData(row);
            }}
          >
            Details
          </Button>
          <Button
            type="link"
            onClick={() => {
              managementEditHandler(row);
            }}
          >
            <Link to={`/sop/list-sop-activity-update?id=${row?.id}&type=team`}>
              Edit
            </Link>
          </Button>
        </>
      ),
    },
  ];
  return (
    <>
      <Table
        scroll={{ x: 2500, y: 650 }}
        dataSource={teamActivity}
        columns={columns}
        pagination={{
          current: currentPage,
          total: pageCount * 10,
          onChange: (page) => paginate(page),
        }}
      />
    </>
  );
}
