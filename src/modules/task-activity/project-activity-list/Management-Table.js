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

export default function ManagementTable({
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
        if (res?.data?.code === 201) {
          setStatus(res?.data?.data?.status);
          updateEvent();
          alertPop("success", "Successfully complete the process");
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
    // {
    //   title: "Task Code",
    //   dataIndex: "code",
    //   key: "code",
    // },
    {
      title: "TASK/ACTIVITY NAME",
      dataIndex: "title",
      key: "title",
      width: 200,
    },
    {
      title: "MILESTONE",
      dataIndex: "project_milestone.milestone.full_name",
      key: "project_milestone.milestone.full_name",
      width: 140,
    },
    {
      title: "CREATED BY",
      key: "created_at",
      width: 150,
      render: (row) => (
        <div>
          <p>{row?.created_by?.name}</p>
          <p>{dateFormat(row?.created_at)}</p>
        </div>
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
      width: 130,
      // dataIndex: "attachment_type.name",
      key: "attachment_type.name",
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
      // dataIndex: "status",
      key: "status",
      fixed: "right",
      width: 125,
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
          x: 1610,
          y: 500,
        }}
        dataSource={[...projectList]}
        columns={columns}
        pagination={pagination}
        onChange={(pagination) => apiCall(pagination.current)}
      />
    </>
  );
}
