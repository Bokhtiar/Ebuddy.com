/** @format */

import {
  Button,
  Progress,
  Table
} from "antd";
import React, { useEffect } from "react";
import attachmentIcon from "../../../assets/attached.svg";
import { openAttchment, useNotification } from "../../../scripts/helper";
import { alertPop } from "../../../scripts/message";
import { postData } from "../../../scripts/postData";
import ActivityStatusDropdown from "../../@shared/ActivityStatusDropdown";
import { Wrapper } from "../../commons/Wrapper";

export default function TaskTableView({
  useActivity,
  updateCurrentPage,
  pageCount,
  detailsModalShow,
  managementEditHandler,
  setCurrentPage,
  currentPage,
  setRowData,
  updateEvent,
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
      width: 220,
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
      title: "PROJECT NAME",
      // dataIndex: "project_name",
      key: "project_name",
      width: 200,
      render: (row) => row.projects?.name,
    },
    // {
    //     title: "PRIORITY",
    //     // dataIndex: "activity_Priority",
    //     key: "activity_Priority",
    //     render: (row) => row.activity_priority?.name
    // },

    {
      title: "MILESTONE",
      // dataIndex: "milestone.full_name",
      key: "milestone.full_name",
      width: 170,
      render: (row) => row.project_milestone?.milestone?.full_name,
    },
    {
      title: "MILESTONE PROGRESS",
      key: "created_by",
      width: 200,
      render: (row) => (
        <span>
          <Progress
            percent={row.project_milestone?.progress}
            showInfo={false}
          />
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
      // dataIndex: "review_status.",
      key: "review",
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
      key: "estimated_time",
      width: 100,
      render: (row) => row?.estimated_time,
    },
    {
      title: "ATTACHMENT",
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
      title: "STATUS",
      // dataIndex: "activity_status",
      key: "status",
      width: 130,
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
      render: (_, row) => (
        <>
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
    <Wrapper>
      <Table
        dataSource={useActivity}
        columns={columns}
        scroll={{ x: 1700, y: 600 }}
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
