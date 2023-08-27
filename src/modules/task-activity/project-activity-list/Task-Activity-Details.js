/** @format */

import React, { useEffect, useRef, useState } from "react";
import {
  Input,
  Col,
  Row,
  Select,
  Card,
  Collapse,
  Button,
  PageHeader,
} from "antd";
import { useHistory } from "react-router-dom";
import { TableWrapper, Wrapper } from "../../commons/Wrapper";
import { getData } from "../../../scripts/api-service";
import { postData } from "../../../scripts/postData";
import { alertPop } from "../../../scripts/message";
import {
  REVIEW_STATUS_LISTVIEW,
  REVIEW_STATUS_RANGE,
  ACTIVITY_REVIEW_UPDATE,
  ACTIVITY_DETAILS_BY_TASK,
  SOP_ACTIVITY_ATTACHMENT_UPLOAD,
  SOP_ACTIVITY_COMMENT,
  SOP_USER_ACTIVITY_STATUS_UPDATE,
  NOTIFICATION_REJECT,
  NOTIFICATION_ACTIVE,
  TASK_ACTIVITY_COMMENT_CREATE,
} from "../../../scripts/api";
import attachmentIcon from "../../../assets/attached.svg";
import { openAttchment, range } from "../../../scripts/helper";
import demoUser from "../../../assets/dummy.jpg";
import cookies from "js-cookie";
import { useNotification } from "../../../scripts/helper";

const { Panel } = Collapse;

export default function TaskActivityDetails({
  updateEvent,
  rowData,
  updatedStatus,
  boardViewStatusFlag,
  setStatus,
}) {
  const { getUnreadNotifications } = useNotification();

  let searchUrl = window.location.search;
  let params = new URLSearchParams(searchUrl);
  let paramsId = params.get("id")
    ? params.get("id")
    : params.get("activity_id");
  let activityId = paramsId ? paramsId * 1 : undefined;

  const profile = JSON.parse(cookies.get("profile") || "");
  const history = useHistory();

  const [taskData, setTaskData] = useState();
  const [commentFlag, setCommentFlag] = useState(false);
  const [statusFlag, setStatusFlag] = useState(false);
  const [ratingRange, setRatingRange] = useState();
  const [reviewRatingList, setReviewRatingList] = useState();
  const [review, setReview] = useState();
  const [rating, setRating] = useState();
  const [showButton, setShowButton] = useState(false);

  const getDetailsData = async () => {
    let res = await getData(ACTIVITY_DETAILS_BY_TASK + `/${activityId}`);
    if (res) {
      // console.log('[ACTIVITY_DETAILS_BY_TASK]', res);
      let masterdata = res?.data?.data;
      // console.log('master-data =>>[ACTIVITY_DETAILS_BY_TASK]', masterdata);

      setTaskData(masterdata);
      if (
        masterdata?.status === "Pending" &&
        profile?.emp_id == masterdata.assignee?.emp_id
      )
        setShowButton(true);
      else setShowButton(false);
    }
  };

  const fileUploadHandler = async (event) => {
    let value = event.target.files[0];
    document.getElementById("sop-activity-details-attachemnt").innerHTML =
      value.name;

    const formData = new FormData();
    formData.append("attachment", value);

    let response = await postData(
      SOP_ACTIVITY_ATTACHMENT_UPLOAD + "/" + taskData?.id,
      formData,
    );

    if (response?.status === 200) {
      let masterData = response?.data?.data;
      if (masterData) alertPop("success", "Successfully complete the process");
    } else return alertPop("error", response[0]);
    document.getElementById("sop-activity-details-attachemnt").innerHTML = "";
  };

  const commentHandler = (e) => {
    if (+e?.keyCode === 13 || +e?.charCode === 13) {
      if (e.target.value.trim() === "")
        return alertPop("error", "Invalid comment");
      else {
        postData(TASK_ACTIVITY_COMMENT_CREATE, {
          activity_id: taskData?.id,
          comment: e.target.value,
          // status: 1, //confirm by api developer
        }).then((res) => {
          if (res) {
            setCommentFlag(true);
            setTimeout(() => {
              let ele = document.getElementById("task-activity-comment");
              ele.value = "";
            }, 500);

            alertPop("success", "Successfully complete the process");
          } else return alertPop("error", res[0]);
        });
      }
    }
  };

  const notiReject = async () => {
    let res = await postData(NOTIFICATION_REJECT + activityId, {});

    if (res) {
      alertPop("success", "Activity reject successfully!");
    } else {
      alertPop("error", "Something went wrong");
    }
  };

  const notiAccept = async () => {
    let res = await postData(NOTIFICATION_ACTIVE + activityId, {});

    if (res) {
      alertPop("success", "Activity accept successfully!");
    } else {
      alertPop("error", "Something went wrong");
    }
  };

  const activityStatusUpdateHandler = (status) => {
    let payload = { status: status };
    postData(
      `${SOP_USER_ACTIVITY_STATUS_UPDATE}/${taskData?.id}`,
      payload,
    ).then((res) => {
      if (res) {
        if (res?.data?.data?.status) {
          if (setStatus) setStatus(res?.data?.data?.status);
          alertPop("success", "Successfully complete the process");
          setStatusFlag(true);
          if (updateEvent) updateEvent();
          getDetailsData();
          getUnreadNotifications();
        }
      } else {
        alertPop("error", res[0]);
      }
    });
  };

  const updateTaskReview = async (value, id) => {
    let rating = 0;
    //update review data
    const reviewData = {
      review_status: parseInt(value),
      review_rating: parseInt(rating) || 0,
    };
    let res = await postData(`${ACTIVITY_REVIEW_UPDATE}${id}`, reviewData);
    if (res?.data?.code == 201 || res?.data?.code == 200) {
      let masterData = res?.data?.data;
      setReview(masterData?.review_status_id);
      alertPop("success", "Successfully complete the process");
    } else {
      alertPop("error", res[0]);
    }
    getReviewRatingRange(value);
  };

  const updateActivityRating = async (value, id) => {
    //update review data
    const reviewData = {
      review_status: parseInt(review),
      review_rating: parseInt(value) || 0,
    };
    let res = await postData(`${ACTIVITY_REVIEW_UPDATE}${id}`, reviewData);
    if (res) {
      let masterData = res?.data?.data;
      setReview(masterData?.review_status_id);
      setRating(masterData?.review_rating);
      alertPop("success", "Successfully complete the process");
      updateEvent();
    }
  };

  const getReviewRatingList = async () => {
    let res = await getData(REVIEW_STATUS_LISTVIEW);
    if (res) {
      setReviewRatingList(res?.data?.data);
    }
  };

  const getReviewRatingRange = async (reviewId) => {
    let res = await getData(REVIEW_STATUS_RANGE + `/${reviewId}`);
    if (res) {
      setRatingRange(res?.data?.data);
    }
  };

  useEffect(() => {
    getDetailsData();
    getReviewRatingList();
  }, []);

  useEffect(() => {
    if (taskData?.review?.id) {
      getReviewRatingRange(taskData?.review?.id);
    }
    if (review) {
      getReviewRatingRange(review);
    }
  }, [taskData?.review?.id, review]);

  useEffect(() => {
    if (rowData?.id || commentFlag || statusFlag || review || rating)
      getDetailsData();
  }, [rowData, commentFlag, statusFlag, review, rating]);

  return (
    <Wrapper style={{ margin: "4rem 1.5rem", width: "99%" }}>
      <Row gutter={32} style={{ margin: "0.5rem 0.5rem 0 0" }}>
        <PageHeader
          style={{
            border: "1px solid rgb(235, 237, 240)",
          }}
          onBack={() => history.push(`/task-activity/task-activity-list`)}
          // title="Back to list"
          subTitle="Back to list"
        />
        <Col span={18} className="my-2">
          <p>
            <span>
              <strong>Activity Id # {taskData?.code}</strong>
            </span>{" "}
            &nbsp;&nbsp;&nbsp;
          </p>
          <h2>{taskData?.title}</h2>
        </Col>
        <Col span={6}>
          <Select
            style={{ marginTop: "2rem" }}
            placeholder="Select Status"
            onChange={activityStatusUpdateHandler}
            disabled={
              taskData?.status === "Pending" || taskData?.status === "Reviewed"
            }
            value={
              boardViewStatusFlag === "board-view"
                ? updatedStatus
                : taskData?.status
            }
          >
            {taskData?.status === "Pending" ? (
              <Select.Option key="Pending" value="Pending">
                Pending
              </Select.Option>
            ) : (
              ""
            )}
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
        </Col>
      </Row>
      <hr className="line-top-border" />
      <Row gutter={32} className="my-2">
        <Col span={17} style={{ borderRight: "1px solid #ccc" }}>
          <Row gutter={32}>
            <Col span={12}>
              <h4>Review</h4>
              <Select
                style={{ marginTop: "1rem" }}
                placeholder="Select Review"
                disabled={
                  taskData?.status === "Pending" ||
                  taskData?.status === "To-Do" ||
                  taskData?.status === "WIP" ||
                  taskData?.status === "Hold" ||
                  taskData?.assignee?.emp_id === profile?.emp_id
                }
                onChange={(event) => {
                  updateTaskReview(event, taskData?.id);
                }}
                value={taskData?.review?.id || review || undefined}
              >
                {reviewRatingList?.map((reviewRating) => {
                  return (
                    <Select.Option
                      key={reviewRating.id}
                      value={reviewRating.id}
                    >
                      {reviewRating.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Col>
            <Col span={12}>
              <h4>Rating</h4>
              <Select
                style={{ width: "100%", marginTop: "1rem" }}
                showSearch
                placeholder="Select Rating Value"
                disabled={
                  taskData?.status === "Pending" ||
                  taskData?.status === "To-Do" ||
                  taskData?.status === "WIP" ||
                  taskData?.status === "Hold" ||
                  taskData?.assignee?.emp_id === profile?.emp_id
                }
                // disabled={reviewRatingDisabled}
                optionFilterProp="children"
                value={taskData?.review_rating || rating || undefined}
                onChange={(event) => updateActivityRating(event, taskData?.id)}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {ratingRange?.map((rating) => {
                  return (
                    <Select.Option key={rating} value={rating}>
                      {rating}
                    </Select.Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
          <br />
          <hr className="line-top-border" />
          <br />

          <div>
            <p>Details</p>
            <Card style={{ width: "100%" }}>
              <p>{taskData?.note || "N/A"}</p>
            </Card>
          </div>

          <hr className="line-top-border" />
          <br />
          <div className="file-upload-content">
            <label htmlFor="file-upload-field">Attachment</label>
            <div className="file-upload-wrapper" data-text="">
              <span
                className="attacment-filename"
                id="sop-activity-details-attachemnt"
              ></span>
              <input
                name="file-upload-field"
                type="file"
                className="file-upload-field"
                value=""
                onChange={fileUploadHandler}
                accept=".jpeg,.bmp,.png,.jpg,.pdf,.doc,.docx, .xlsx"
              />
            </div>
          </div>
          <br />
          <hr className="line-top-border" />

          <div style={{ marginTop: "1rem" }}>
            <p>Comments</p>
            <Input onKeyDown={commentHandler} id="task-activity-comment" />

            <Collapse
              accordion
              defaultActiveKey={1}
              // onChange={callback}
              style={{ marginTop: "1rem" }}
            >
              <Panel header="All Comments" key="1">
                {taskData?.comments?.map((comment, index) => (
                  <Card
                    key={`comment-${comment.id}-${index}`}
                    style={{ width: "100%" }}
                  >
                    <div style={{ margin: "10px 0px" }}>
                      <img
                        src={comment?.created_by?.profile_pic || demoUser}
                        width="25"
                        height="25"
                      />
                      <span style={{ marginLeft: "10px" }}>
                        {comment?.created_by?.name}
                      </span>
                    </div>
                    <p>{comment.comment}</p>
                  </Card>
                ))}
              </Panel>
            </Collapse>
          </div>
          {showButton && (
            <div className="mt-3">
              <Button type="primary" onClick={() => notiReject()}>
                {" "}
                Reject{" "}
              </Button>
              <Button
                type="primary"
                style={{ float: "right" }}
                onClick={() => notiAccept()}
              >
                {" "}
                Accept{" "}
              </Button>
            </div>
          )}
        </Col>

        <Col span={7}>
          {!!taskData?.function_type ? (
            <>
              <div className="mb-4">
                <span>Function Type</span>
                <h3 className="mt-1">{taskData?.function_type?.name || ""}</h3>
              </div>
              <div className="mb-4">
                <span>Function Name</span>
                <h3 className="mt-1">{taskData?.function_name?.name || ""}</h3>
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <span>Project Name</span>
                <h3 className="mt-1">{taskData?.projects?.name || ""}</h3>
              </div>
              <div className="mb-4">
                <span>Milestone</span>
                <h3 className="mt-1">
                  {taskData?.project_milestone?.milestone?.full_name || ""}
                </h3>
              </div>
            </>
          )}

          <div className="mb-4">
            <label>Assignee Name</label>
            <h3 className="mt-1">
              {taskData?.assigned_user ? taskData?.assigned_user?.name : ""}
            </h3>
          </div>

          <div className="mb-4">
            <span>Reporter Name</span>
            <h3 className="mt-1">
              {taskData?.reporter_user ? taskData?.reporter_user?.name : ""}
            </h3>
          </div>

          <div className="mb-4">
            <span>Start Date</span>
            <h3 className="mt-1">{taskData?.start_date || ""}</h3>
          </div>
          <div className="mb-4">
            <span>End Date</span>
            <h3 className="mt-1">{taskData?.due_date || ""}</h3>
          </div>
          <div className="mb-4">
            <span>Estimated Time (Minutes)</span>
            <h3 className="mt-1">{taskData?.estimated_time || ""}</h3>
          </div>
          <div className="mb-4">
            <span>Attachment</span>
            <br />
            <br />
            {taskData?.attachment ? (
              <img
                src={attachmentIcon}
                alt="attachement"
                style={{ float: "left", marginTop: "-3px", width: "1.5rem" }}
                onClick={() => {
                  openAttchment(taskData?.attachment);
                }}
              />
            ) : null}
          </div>
        </Col>
      </Row>
    </Wrapper>
  );
}
