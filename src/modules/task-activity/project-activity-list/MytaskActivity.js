/** @format */

import { Button, Icon, Modal, Radio, Select } from "antd";
import React, { useEffect, useState } from "react";
import sales_task from "../../../assets/icons/test/sales_task_icon.svg";
import { alertPop } from "../../../scripts/message";
import { Flex } from "../../commons/Flex";
import SearchFilter from "../../commons/SearchFilter";
import { TableWrapper } from "../../commons/Wrapper";
import ActivityForm from "./Activity-Form";
import NonBusinessTableView from "./NonBusinessTableView";
import TaskBoard from "./Task-Board";
import TaskTableView from "./Task-Table-View";

import moment from "moment";
import {
  ACTIVITY_PRIORITY_LIST_2,
  ACTIVITY_REVIEW_UPDATE,
  ACTIVITY_STATUS_UPDATE,
  MY_TASK_LIST,
  REVIEW_STATUS_LISTVIEW
} from "../../../scripts/api";
import { getData, postData } from "../../../scripts/api-service";
import { getPermissions } from "../../../scripts/helper";
import CommonModal from "../../commons/commonModal";
import TotalEstimatedTime from "./TotalEstimatedTime";

export default function MytaskActivity() {
  const [modal, setModal] = useState();
  const [detailsModal, setDetailsModal] = useState();
  const [selectedProject, setSelectedProject] = useState({});
  const [showBorstView, setShowBorstView] = useState(false);
  const [useActivity, setUserActivity] = useState([]);
  const [pageCount, setPageCount] = useState();
  const [startFrom, setStartFrom] = useState();
  const [endFrom, setEndFrom] = useState();
  const [singleDate, setSingleDate] = useState();
  const [searchValue, setSearchValue] = useState();
  const [isTaskUpdate, setIsTaskUpdate] = useState(false);
  const [refresh, doRefresh] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateGroupFilter, setDateGroupFilter] = useState("today");
  const [clientType, setClientType] = useState();
  const [priorityList, setPriorityList] = useState();
  const [priority, setPriority] = useState();
  const [taskStatus, setTaskStatus] = useState();
  const [reviewList, setReviewList] = useState([]);
  const [review, setReview] = useState([]);
  const [nonBusiness, setNonBusiness] = useState(undefined);
  const [businessCount, setBusinessCount] = useState();
  const [NonBusinessCount, setNonBusinessCount] = useState();
  const [permission, setPermission] = useState();
  const [isDisabledType, setIsDisabledType] = useState(true);
  const [rowData, setRowData] = useState(true);
  const [status, setStatus] = useState();
  const [boardViewStatusFlag, setBoardViewStatusFlag] = useState("");
  const [resetCount, setResetCount] = useState(0);
  const [repeats, setRepeats] = useState();

  const [totalEstimatedTime, setTotalEstimatedTime] = useState(undefined);

  const getPermissionsList = async () => {
    let permissions = await getPermissions();
    if (permissions && permissions.length) {
      const permNames = permissions.map((item) => item.name);
      if (
        permNames.includes("Business Activities") &&
        permNames.includes("Non-Business Activities")
      ) {
        setPermission("Both");
      } else if (permNames.includes("Business Activities")) {
        setPermission("Business");
        setNonBusiness(false);
      } else if (permNames.includes("Non-Business Activities")) {
        setPermission("Non-Business");
        setNonBusiness(true);
      }
    }
  };

  const getProirityList = async () => {
    let res = await getData(ACTIVITY_PRIORITY_LIST_2);

    if (res) {
      let masterData = res?.data?.data;
      setPriorityList(masterData);
    }
  };

  const getUserActivity = async () => {
    if (permission) {
      // let url = USER_ACTIVITY_LIST + "?";
      let url = MY_TASK_LIST + "?";
      if (permission === "Non-Business") url = url + "&user_type=non-business";
      else if (permission === "Business") url = url + "&user_type=business";
      else if (permission === "Both" && nonBusiness)
        url = url + "&user_type=non-business";
      else if (permission === "Both" && !nonBusiness)
        url = url + "&user_type=business";

      if (startFrom && endFrom)
        url = url + "&from_date=" + startFrom + "&to_date=" + endFrom;
      else if (singleDate) url = url + "&single_date=" + singleDate;

      if (searchValue) url = url + "&search=" + searchValue;
      if (priority) url = url + "&priority_id=" + priority;
      if (taskStatus) url = url + "&status=" + taskStatus;
      if (repeats) url = url + "&repeats=" + repeats;

      let res = await getData(url);

      if (res) {
        //console.log({ res });
        setTotalEstimatedTime(res?.data?.extra_data?.total_estimated_time);
        let masterData = res.data.data;
        if (!nonBusiness) {
          setBusinessCount(`[${res?.data?.count}]` || null);
          setNonBusinessCount(null);
        }
        if (nonBusiness) {
          setBusinessCount(null);
          setNonBusinessCount(`[${res?.data?.count}]` || null);
        }
        if (res.data.code === 200) {
          let activities = [];

          masterData.forEach((act) => {
            act.isOverDue = moment().subtract(1, "d") >= moment(act.due_date);
            activities.push(act);
          });
          //console.log({ activities });
          setUserActivity(activities || {});
          setPageCount(masterData.last_page);
        }

        setIsDisabledType(false);
      }
    }
  };

  const search = (value) => {
    setSearchValue(value);
  };

  const filter = (date) => {
    if (date) {
      setDateGroupFilter(undefined);
      setStartFrom(date.date_from);
      setEndFrom(date.date_to);
    } else {
      setSingleDate(moment().format("YYYY-MM-DD"));
      setDateGroupFilter("today");
    }
  };

  const detailsModalShow = (data) => {
    setDetailsModal(true);
    setSelectedProject(data);
  };

  const updateActionStatus = async ({ activityId, status }) => {
    if (activityId && status) {
      let res = await postData(ACTIVITY_STATUS_UPDATE + activityId, {
        status: status,
      });

      if (res && (res?.data?.code === 201 || res?.data?.code === 200)) {
        let masterData = res.data.data;
        setStatus(masterData?.status);
        setBoardViewStatusFlag("board-view");
        getUserActivity();
        alertPop("success", "Successfully completed the process");
      }
      // else {
      //     alertPop("error", res?.data?.messages[0]);
      //     console.log("res?.data>>>>", res?.data);
      //     getUserActivity();
      //     if (res?.data?.code == 422) {
      //         alertPop("error", res?.data?.messages[0]);
      //     }else {
      //         alertPop("error", "Check your internet connection!");
      //     }
      // }
    }
  };

  const updateCurrentpage = (page) => {
    getUserActivity(page);
  };

  const dateFilter = (value) => {
    setDateGroupFilter(value);

    switch (value) {
      case "yesterday":
        setStartFrom();
        setEndFrom();
        setSingleDate(moment().subtract(1, "days").format("YYYY-MM-DD"));
        break;
      // case "today":
      //     setStartFrom();
      //     setEndFrom();
      //     setSingleDate(moment().format('YYYY-MM-DD'));
      //     break;
      case "tomorrow":
        setStartFrom();
        setEndFrom();
        setSingleDate(moment().add(1, "days").format("YYYY-MM-DD"));
        break;
      case "this_week":
        setStartFrom(moment().clone().startOf("week").format("YYYY-MM-DD"));
        setEndFrom(moment().clone().endOf("week").format("YYYY-MM-DD"));
        setSingleDate();
        break;
      case "this_month":
        setStartFrom(moment().clone().startOf("month").format("YYYY-MM-DD"));
        setEndFrom(moment().clone().endOf("month").format("YYYY-MM-DD"));
        setSingleDate();
        break;
      case "default":
        setStartFrom("");
        setEndFrom("");
        setSingleDate("");
        break;
      default:
        setStartFrom();
        setEndFrom();
        setSingleDate(moment().format("YYYY-MM-DD"));
        break;
    }
    setIsDisabledType(true);
  };

  const selectReview = (value, id) => {
    setReview(value);
  };

  const selectRating = (value, id) => {
    postReviewData(value, id);
  };

  const postReviewData = async (value, id) => {
    const reviewData = {
      review_status: parseInt(review),
      review_rating: parseInt(value),
    };
    let res = await postData(`${ACTIVITY_REVIEW_UPDATE}${id}`, reviewData);
    if (res) {
      let masterData = res?.data?.data;
      alertPop("success", "Successfully complete the process");
    }
  };

  const getReviewList = async () => {
    let res = await getData(REVIEW_STATUS_LISTVIEW);

    if (res) {
      let masterData = res?.data?.data;
      setReviewList(masterData);
    }
  };

  useEffect(() => {
    getProirityList();
    getPermissionsList();
    getReviewList();
    setSingleDate(moment().format("YYYY-MM-DD"));
  }, []);

  useEffect(() => {
    if (
      searchValue ||
      endFrom ||
      singleDate ||
      priority ||
      taskStatus ||
      showBorstView ||
      repeats ||
      nonBusiness ||
      !nonBusiness ||
      permission
    )
      getUserActivity();
  }, [
    searchValue,
    endFrom,
    singleDate,
    priority,
    taskStatus,
    showBorstView,
    nonBusiness,
    permission,
    repeats,
  ]);

  useEffect(() => {
    if (refresh) getUserActivity();
  }, [refresh]);

  const updateEvent = () => {
    // setIsTaskUpdate(true);
    doRefresh((prev) => prev + 1);
  };

  const updateTask = (data) => {
    // console.log("update", data);
  };

  const managementEditHandler = (data) => {
    setModal(true);
    setSelectedProject(data);
    setIsTaskUpdate(true);
  };

  // const updateViewOption = (value) => {
  //     setShowBorstView(value);
  // }

  return (
    <TableWrapper>
      <div style={{ width: showBorstView ? "96%" : "" }}>
        <SearchFilter
          search={search}
          filter={filter}
          filterOptions={[{ type: "date_range" }]}
          failsafe
        />
      </div>

      {/* <Flex space="1rem" justify="normal"> */}
      <Flex
        space="1rem"
        justify="normal"
        style={{ width: showBorstView ? "96%" : "" }}
      >
        <Button
          onClick={() => {
            setModal(true);
            setIsTaskUpdate(false);
          }}
          width="40%"
          type="primary"
          style={{ marginRight: "1rem" }}
        >
          Create New Activity
        </Button>
        {permission === "Both" ? (
          <Radio.Group
            defaultValue="1"
            buttonStyle="solid"
            style={{ width: "30%" }}
            onChange={() => {
              setIsDisabledType(true);
            }}
          >
            <Radio.Button
              onClick={() => setNonBusiness(false)}
              value="1"
              disabled={isDisabledType}
            >
              Business {businessCount}
            </Radio.Button>
            <Radio.Button
              onClick={() => setNonBusiness(true)}
              value="2"
              disabled={isDisabledType}
            >
              Non-Business {NonBusinessCount}
            </Radio.Button>
          </Radio.Group>
        ) : (
          console.log({ permission })
        )}
        <Select
          style={{ width: "12%", marginRight: "1rem" }}
          value={dateGroupFilter}
          disabled={isDisabledType}
          placeholder="Date Wise Group Filter"
          onChange={dateFilter}
          showSearch
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          <Select.Option key="d" value="default">
            Default
          </Select.Option>
          <Select.Option key="Y" value="yesterday">
            Yesterday
          </Select.Option>
          <Select.Option key="G" value="today">
            Today
          </Select.Option>
          <Select.Option key="R" value="tomorrow">
            Tomorrow
          </Select.Option>
          <Select.Option key="B" value="this_week">
            This Week
          </Select.Option>
          <Select.Option key="A" value="this_month">
            This Month
          </Select.Option>
        </Select>
        <Select
          allowClear={true}
          showSearch
          style={{ width: "10%", marginRight: "1rem" }}
          placeholder="Priority"
          disabled={isDisabledType}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
          onChange={(value) => {
            setPriority(value);
            setIsDisabledType(true);
          }}
        >
          {priorityList?.map((status) => (
            <Select.Option key={`milestone-${status.id}`} value={status.id}>
              {status.name}
            </Select.Option>
          ))}
        </Select>
        {/* <ActivityStatusDropdown
          presetValue={row.status}
          presetDisabled={isDisabledType}
          onChangeEvent={(event) => {
            
          }}
        /> */}

        <Select
          allowClear={true}
          showSearch
          style={{ width: "10%", marginRight: "1rem" }}
          disabled={isDisabledType}
          placeholder="Status"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
          onChange={(value) => {
            setTaskStatus(value);
            setIsDisabledType(true);
          }}
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
          <Select.Option key="Cancel" value="Cancel">
            Cancel
          </Select.Option>
        </Select>
        <Select
          allowClear={true}
          showSearch
          style={{ width: "10%" }}
          disabled={isDisabledType}
          placeholder="Repeat"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
          onChange={(value) => {
            setRepeats(value);
            setIsDisabledType(true);
          }}
        >
          <Select.Option key="Daily" value="Daily">
            Daily
          </Select.Option>
          <Select.Option key="Weekly" value="Weekly">
            Weekly
          </Select.Option>
          <Select.Option key="Monthly" value="Monthly">
            Monthly
          </Select.Option>
          <Select.Option key="Quarterly" value="Quarterly">
            Quarterly
          </Select.Option>
          <Select.Option key="Half" value="Half">
            Half Yearly
          </Select.Option>
          <Select.Option key="Yearly" value="Yearly">
            Yearly
          </Select.Option>
        </Select>
      </Flex>
      <Flex space="1rem" justify="normal">
        <Button
          onClick={() => {
            setShowBorstView(true);
            setIsDisabledType(true);
          }}
          disabled={showBorstView || isDisabledType}
        >
          <Icon type="appstore" />
        </Button>
        <Button
          onClick={() => {
            setShowBorstView(false);
            setIsDisabledType(true);
          }}
          disabled={!showBorstView || isDisabledType}
        >
          <Icon type="unordered-list" />
        </Button>
        <div className="ml-3 pt-2 base_font_size">
          View Type ({showBorstView ? "Board View" : "List View"})
        </div>
        <div className="ml-3 pt-2 base_font_size">
          Total Estimated Time :
          {totalEstimatedTime && (
            <TotalEstimatedTime totalEstimatedTime={totalEstimatedTime} />
          )}
        </div>
      </Flex>
      {showBorstView ? (
        <TaskBoard
          detailsModalShow={detailsModalShow}
          useActivity={useActivity}
          updateActionStatus={updateActionStatus}
          nonBusiness={nonBusiness}
          setRowData={setRowData}
        ></TaskBoard>
      ) : nonBusiness ? (
        <NonBusinessTableView
          totalEstimatedTime={totalEstimatedTime}
          detailsModalShow={detailsModalShow}
          useActivity={useActivity}
          updateCurrentPage={updateCurrentpage}
          pageCount={pageCount}
          managementEditHandler={managementEditHandler}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          setRowData={setRowData}
          updateEvent={updateEvent}
        ></NonBusinessTableView>
      ) : (
        <TaskTableView
          totalEstimatedTime={totalEstimatedTime}
          detailsModalShow={detailsModalShow}
          useActivity={useActivity}
          updateCurrentPage={updateCurrentpage}
          pageCount={pageCount}
          managementEditHandler={managementEditHandler}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          setRowData={setRowData}
          updateEvent={updateEvent}
        ></TaskTableView>
      )}

      {/* <LandinContent></LandinContent> */}

      <Modal
        title={[
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "baseline",
            }}
          >
            <span>{isTaskUpdate ? "Update" : "Create New"} Task/Activity</span>
            {!isTaskUpdate ? (
              <span>
                {permission === "Both" ? (
                  <Radio.Group
                    value={nonBusiness ? 2 : 1}
                    buttonStyle="solid"
                    style={{ width: "100%", marginLeft: "2rem" }}
                  >
                    <Radio.Button
                      onClick={() => setNonBusiness(false)}
                      value={1}
                    >
                      Business
                    </Radio.Button>
                    <Radio.Button
                      onClick={() => setNonBusiness(true)}
                      value={2}
                    >
                      Non-Business
                    </Radio.Button>
                  </Radio.Group>
                ) : null}
              </span>
            ) : (
              ""
            )}
          </div>,
        ]}
        centered
        visible={modal}
        width="75vw"
        onCancel={() => {
          setModal(false);
          setSelectedProject({});
          setResetCount(resetCount + 1);
        }}
        footer={false}
        maskClosable={false}
      >
        <ActivityForm
          setModal={setModal}
          activityDetails={selectedProject}
          resetCount={resetCount}
          isTaskUpdate={isTaskUpdate}
          updateEvent={updateEvent}
          nonBusiness={nonBusiness}
          setNonBusiness={setNonBusiness}
          modal={modal}
        />
      </Modal>

      <Modal
        title=""
        visible={detailsModal}
        width="60vw"
        onCancel={() => {
          setDetailsModal(false);
          getUserActivity();
          setSelectedProject();
        }}
        footer={false}
        maskClosable={false}
      >
        {selectedProject ? (
          // <TaskDetails
          //     setModal={setModal}
          //     page="task-review"
          //     reviewRatingList={reviewList}
          //     selectReview={selectReview}
          //     selectRating={selectRating}
          //     updateTask={updateTask}
          //     activityDetails={selectedProject}
          //     updateEvent={updateEvent}
          //     nonBusiness={nonBusiness}
          // />
          <CommonModal
            setModal={setDetailsModal}
            reviewRatingList={reviewList}
            nonBusiness={nonBusiness}
            rowData={rowData}
            updateEvent={updateEvent}
            updatedStatus={status}
            setStatus={setStatus}
            boardViewStatusFlag={boardViewStatusFlag}
          />
        ) : (
          ""
        )}
      </Modal>
    </TableWrapper>
  );
}

const LandinContent = () => {
  return (
    <div className="landing-content" style={{ textAlign: "center" }}>
      <img src={sales_task} height="300" />
      <h1>Please Select One Project To Generate Data</h1>
    </div>
  );
};
