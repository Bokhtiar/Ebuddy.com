/** @format */

import React, { useEffect, useState } from "react";
import { Button, Table, Tooltip, Select } from "antd";
import demoUser from "../../../assets/dummy.jpg";
import { getData } from "../../../scripts/getData";
import { dateFormat } from "../../../scripts/helper";
import { openAttchment } from "../../../scripts/helper";
import attachmentIcon from "../../../assets/attached.svg";
import { postData } from "../../../scripts/postData";
import { alertPop } from "../../../scripts/message";
import { useNotification } from "../../../scripts/helper";
import ActivityStatusDropdown from "../../@shared/ActivityStatusDropdown";

export default function NonBusinessManagementTable({
  managementDetailsShow,
  managementEditHandler,
  projectList,
  pagination,
  apiCall,
  setRowData,
  updateEvent,
  setStatus,
}) {
  const { getUnreadNotifications } = useNotification();

  const activityStatusUpdateHandler = (event, row) => {
    let payload = { status: event };
    postData(`task/v1/activitiy-status-update/${row?.id}`, payload).then(
      (res) => {
        if (res?.data?.code == 201) {
          alertPop("success", "Successfully complete the process");
          setStatus(res?.data?.data?.status);
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

  const columns = [
    {
      title: "TASK/ACTIVITY NAME",
      dataIndex: "title",
      key: "title",
      width: 200,
    },

    {
      title: "FUNCTION NAME",
      // dataIndex: "activity_Priority.name",
      // key: "activity_Priority.name",
      width: 140,
      render: (row) =>
        row?.function_activity?.name ? row?.function_activity?.name : "",
    },
    {
      title: "FUNCTION TYPE",
      // dataIndex: "activity_Priority.name",
      // key: "activity_Priority.name",
      width: 140,
      render: (row) =>
        row?.function_type?.name ? row?.function_type?.name : "",
    },
    {
      title: "REPEAT",
      key: "repeats",
      width: 100,
      render: (row) => (row?.repeats ? row?.repeats : ""),
    },
    {
      title: "REVIEW",
      // dataIndex: "activity_status",
      // key: "activity_status",
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
      // dataIndex: "attachment",
      key: "attachment",
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
          />{" "}
          <span style={{ padding: "0.5rem" }}>{row?.assigned_user?.name}</span>
        </Tooltip>
      ),
      // width: '20%'
    },
    {
      title: "STATUS",
      // dataIndex: "status",
      key: "status",
      width: 125,
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
            Edit
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Table
        scroll={{
          x: 1000,
          y: 550,
        }}
        dataSource={[...projectList]}
        columns={columns}
        pagination={pagination}
        onChange={(pagination) => apiCall(pagination.current)}
      />
    </>
  );
}
