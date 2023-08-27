/** @format */

import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Modal,
  Table,
  Select,
  Icon,
  Progress,
  Tag,
  Tooltip,
} from "antd";
import demoUser from "../../../assets/dummy.jpg";

import attachmentIcon from "../../../assets/attached.svg";
import { Wrapper } from "../../commons/Wrapper";
import { openAttchment } from "../../../scripts/helper";
import { postData } from "../../../scripts/postData";
import { alertPop } from "../../../scripts/message";
import { useNotification } from "../../../scripts/helper";
import ActivityStatusDropdown from "../../@shared/ActivityStatusDropdown";

export default function NonBusinessTableView({
  useActivity,
  updateCurrentPage,
  pageCount,
  detailsModalShow,
  managementEditHandler,
  setCurrentPage,
  currentPage,
  setRowData,
  updateEvent,
  totalEstimatedTime,
}) {
  const { getUnreadNotifications } = useNotification();

  const activityStatusUpdateHandler = (event, row) => {
    let payload = { status: event };
    postData(`task/v1/activitiy-status-update/${row?.id}`, payload).then(
      (res) => {
        if (res?.data?.code == 201) {
          alertPop("success", "Successfully complete the process");
          updateEvent();
          getUnreadNotifications();
        } else {
          alertPop("error", res[0]);
          // if (res?.data?.code == 422) {
          //     alertPop("error", res?.data?.messages[0]);
          // }else {
          //     alertPop("error", "Check your internet connection!");
          // }
        }
      },
    );
  };

  useEffect(() => {
    updateCurrentPage(currentPage);
  }, [currentPage]);

  const paginate = (page) => setCurrentPage(page);

  const columns = [
    // {
    //   title: "Task Code",
    //   // dataIndex: "department",
    //   key: "task_code",
    //   render: (row) => <span>{row.code}</span>,
    // },
    {
      title: "TASK/ACTIVITY NAME",
      key: "title",
      width: 260,
      render: (row) => (
        <span
          style={
            row.isOverDue &&
            (row.activity_status === "To-Do" || row.activity_status === "WIP")
              ? { color: "red" }
              : {}
          }
        >
          {" "}
          {row.title}{" "}
        </span>
      ),
    },

    {
      title: "FUNCTION NAME",
      // dataIndex: "milestone.full_name",
      key: "function_activity",
      width: 150,
      render: (row) =>
        row?.function_activity?.name ? row?.function_activity?.name : "",
    },
    {
      title: "REPEAT",
      key: "repeats",
      width: 100,
      render: (row) => (row?.repeats ? row?.repeats : ""),
    },
    {
      title: "REVIEW",
      // dataIndex: "review_status.",
      key: "action",
      width: 130,
      render: (row) => (
        <span style={{ color: row?.review?.color }}>{row?.review?.name}</span>
      ),
    },
    {
      title: "START",
      dataIndex: "start_date",
      key: "start_date",
      width: 120,
    },
    {
      title: "DUE",
      dataIndex: "due_date",
      key: "due_date",
      width: 120,
    },
    {
      title: (
        <>
          <small>
            ESTIMATED TIME <br /> (MINUTES)
          </small>
        </>
      ),
      // dataIndex: "activity_status",
      // key: "activity_status",
      width: 100,
      render: (row) => row?.estimated_time,
    },
    {
      title: "ATTACHMENT",
      key: "action",
      width: 130,
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
      title: "ASSIGNEE",
      key: "assignee_profile_pic",
      width: 190,
      render: (row) => (
        <Tooltip title={row?.assigned_user?.name}>
          <img
            src={row?.assigned_user?.profile_pic || demoUser}
            width="25"
            height="25"
            alt={row?.assigned_user?.name}
          />
          <span style={{ padding: "0.5rem" }}>{row?.assigned_user?.name}</span>
        </Tooltip>
      ),
    },
    {
      title: "STATUS",
      // dataIndex: "activity_status",
      key: "status",
      width: 145,
      fixed: "right",
      render: (row) => (
        <ActivityStatusDropdown
          presetValue={row.status}
          // presetDisabled={row.status === "Pending"}
          onChangeEvent={(event) => activityStatusUpdateHandler(event, row)}
        />
      ),
    },

    {
      title: "Action",
      key: "action",
      width: 140,
      fixed: "right",
      render: (row) => (
        <>
          {" "}
          <Button
            type="link"
            onClick={() => {
              detailsModalShow(row);
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
            Edit
          </Button>
        </>
      ),
    },
  ];

  return (
    <Wrapper style={{ padding: "1rem" }}>
      <Table
        dataSource={useActivity}
        columns={columns}
        // scroll={{ y: "calc(100vh - 28rem)" }}
        scroll={{ y: "calc(100vh - 20rem)", x: 1600 }}
        // pagination={{
        //     current: currentPage,
        //     total: pageCount * 10,
        //     onChange: (page) => paginate(page),
        // }}
        pagination={false}
      />
    </Wrapper>
  );
}
