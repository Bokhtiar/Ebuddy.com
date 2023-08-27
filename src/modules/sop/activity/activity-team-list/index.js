/** @format */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Select, Input, Icon } from "antd";
import SearchFilter from "../../../commons/SearchFilter";
import { TableWrapper, Wrapper } from "../../../commons/Wrapper";
import { Flex } from "../../../commons/Flex";
import TeamTaskView from "./team-task-view";
import ActivityForm from "../common/activity-form";
import ActivityDetailsModal from "../common/activity-details-modal";
import sales_task from "../../../../assets/icons/test/sales_task_icon.svg";
import { alertPop } from "../../../../scripts/message";
import {
  ACTIVITY_PRIORITY_LIST_2,
  ACTIVITY_REVIEW_UPDATE,
  SOP_TEAM_ACTIVITY_LIST,
  SOP_USER_ACTIVITY_STATUS_UPDATE,
  TASK_SOP_FUNCTION_TYPE_LIST,
  TASK_SOP_FUNCTION_LIST,
  REVIEW_STATUS_LISTVIEW,
  SOP_TEAM_ACTIVITY_EXPORT,
} from "../../../../scripts/api";
import { getData, postData } from "../../../../scripts/api-service";

export default function ActivityTeamList() {
  const [modal, setModal] = useState();
  const [detailsModal, setDetailsModal] = useState();
  const [selectedRow, setSelectedRow] = useState({});
  const [isTaskUpdate, setIsTaskUpdate] = useState(false);
  const [refresh, doRefresh] = useState(0);
  const [filterData, setFilter] = useState();
  const [priorityList, setPriorityList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [review, setReview] = useState([]);
  const [teamActivity, setTeamActivity] = useState([]);
  const [rowData, setRowData] = useState(true);
  const [functionTypeList, setFunctionTypeList] = useState();
  const [functionTypeId, setFunctionTypeId] = useState();
  const [functionNameList, setFunctionNameList] = useState();
  const [functionNameId, setFunctionNameId] = useState();
  const [resetCount, setResetCount] = useState(0);
  const [status, setStatus] = useState();
  const [repeats, setRepeats] = useState();
  const [pageCount, setPageCount] = useState();
  const [currentPage, setCurrentPage] = useState("1");
  const [activityInitiateCode, setActivityInitiateCode] = useState();

  const apiCall = () => {
    let url = SOP_TEAM_ACTIVITY_LIST + "?page=" + currentPage;

    // if (currentPage) url = url + "&page=" + currentPage;
    if (functionTypeId) url = url + "&function_type_id=" + functionTypeId;
    if (functionNameId) url = url + "&function_id=" + functionNameId;
    if (activityInitiateCode)
      url = url + "&initiate_code=" + activityInitiateCode;
    // if (repeats) url = url + '&repeats=' + repeats;
    if (filterData) {
      if (filterData?.search) url = url + "&search=" + filterData?.search;
      if (filterData?.date?.date_to)
        url = url + "&to_date=" + filterData?.date?.date_to;
      if (filterData?.date?.date_from)
        url = url + "&from_date=" + filterData?.date?.date_from;
      // if (filterData?.activityInitiateCode) url = url + '&initiate_code=' + filterData?.activityInitiateCode;
      if (filterData?.status) url = url + "&status=" + filterData?.status;
      if (filterData?.priority_id)
        url = url + "&priority_id=" + filterData?.priority_id;
      if (filterData?.review_status_id)
        url = url + "&review_status_id=" + filterData?.review_status_id;
    }

    getData(url).then((res) => {
      if (res) {
        let masterData = res.data.data;
        setTeamActivity(masterData || {});
        setPageCount(masterData.last_page);
      }
    });
  };

  const exportData = async () => {
    let url = SOP_TEAM_ACTIVITY_EXPORT + "?";
    if (functionTypeId) url = url + "&function_type_id=" + functionTypeId;
    if (functionNameId) url = url + "&function_id=" + functionNameId;
    if (filterData?.status) url = url + "&status=" + filterData?.status;
    if (filterData?.priority_id)
      url = url + "&priority_id=" + filterData?.priority_id;
    let res = await getData(url);
    let masterData = res?.data?.data;
    window.open(masterData);
  };

  useEffect(() => {
    apiCall();
  }, [
    currentPage,
    refresh,
    filterData,
    functionTypeId,
    functionNameId,
    repeats,
    activityInitiateCode,
  ]);

  const getProirityList = async () => {
    let res = await getData(ACTIVITY_PRIORITY_LIST_2);

    if (res) {
      let masterData = res?.data?.data;
      setPriorityList(masterData);
    }
  };

  const getFunctionTypeList = async () => {
    let res = await getData(TASK_SOP_FUNCTION_TYPE_LIST);

    if (res) {
      let masterData = res?.data?.data;
      setFunctionTypeList(masterData);
    }
  };

  const getFunctionNameList = async (id) => {
    let res = await getData(TASK_SOP_FUNCTION_LIST + "?function_type_id=" + id);

    if (res) {
      let masterData = res?.data?.data;
      setFunctionNameList(masterData);
    }
  };

  const getReviewList = async () => {
    let res = await getData(REVIEW_STATUS_LISTVIEW);

    if (res) {
      let masterData = res?.data?.data;
      setReviewList(masterData);
    }
  };

  const filterMilestoneStatus = (value) => {
    setFilter((preState) => ({
      ...preState,
      status: value,
    }));
  };

  const filterPriority = (value) => {
    setFilter((preState) => ({
      ...preState,
      priority_id: value,
    }));
  };

  const search = (value) => {
    setFilter((preState) => ({
      ...preState,
      search: value,
    }));
  };

  const filter = (date) => {
    //todo
    setFilter((preState) => ({
      ...preState,
      date: date,
    }));
  };

  const managementDetailsShow = (data) => {
    setDetailsModal(true);
    setSelectedRow(data);
  };

  const managementEditHandler = (data) => {
    setModal(true);
    setSelectedRow(data);
    setIsTaskUpdate(true);
  };

  const updateEvent = () => {
    doRefresh((prev) => prev + 1);
  };

  const creteTaskModalOpenHandler = () => {
    setModal(true);
    setSelectedRow({});
    setIsTaskUpdate(false);
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

  useEffect(() => {
    getProirityList();
    getFunctionTypeList();
    getReviewList();
  }, []);

  useEffect(() => {
    if (functionTypeId) getFunctionNameList(functionTypeId);
  }, [functionTypeId]);

  return (
    <Wrapper>
      <SearchFilter
        search={search}
        filter={filter}
        filterOptions={[{ type: "date_range" }]}
        failsafe
      />
      <Flex space="1rem" justify="normal">
        {/* <Button onClick={creteTaskModalOpenHandler} width="30%" type="primary" style={{'marginRight': '1rem'}}>
                    Create New Activity
                </Button> */}
        <Button width="30%" type="primary" style={{ marginRight: "1rem" }}>
          <Link to={`/sop/list-sop-activity-create`}>Create New Activity</Link>
        </Button>
        <Input
          allowClear={true}
          placeholder="Initiate Code"
          style={{ width: "25%", marginRight: "1rem" }}
          onChange={(event) => setActivityInitiateCode(event.target.value)}
        />
        <Select
          showSearch
          allowClear={true}
          style={{ width: "25%", marginRight: "1rem" }}
          placeholder="Function Type"
          value={functionTypeId}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
          onChange={(e) => setFunctionTypeId(e)}
        >
          {functionTypeList?.map((func, index) => (
            <Select.Option key={`func-${func.id}`} value={func.id}>
              {func.name}
            </Select.Option>
          ))}
        </Select>
        <Select
          showSearch
          allowClear={true}
          style={{ width: "25%", marginRight: "1rem" }}
          placeholder="Function Name"
          value={functionNameId}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
          onChange={(e) => setFunctionNameId(e)}
        >
          {functionNameList?.map((func) => (
            <Select.Option key={`milestone-${func.id}`} value={func.id}>
              {func.name}
            </Select.Option>
          ))}
        </Select>
        <Select
          showSearch
          allowClear={true}
          style={{ width: "25%", marginRight: "1rem" }}
          placeholder="Priority"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
          onChange={filterPriority}
        >
          {priorityList.map((status) => (
            <Select.Option key={`milestone-${status.id}`} value={status.id}>
              {status.name}
            </Select.Option>
          ))}
        </Select>
        <Select
          allowClear={true}
          showSearch
          style={{ width: "25%", marginRight: "1rem" }}
          placeholder="Status"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
          onChange={filterMilestoneStatus}
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
        <Button type="primary" onClick={exportData}>
          <Icon type="download" />
          Download Excel
        </Button>
      </Flex>
      <TeamTaskView
        managementDetailsShow={managementDetailsShow}
        managementEditHandler={managementEditHandler}
        teamActivity={teamActivity}
        setRowData={setRowData}
        updateEvent={updateEvent}
        setStatus={setStatus}
        statusUpdateApi={SOP_USER_ACTIVITY_STATUS_UPDATE}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        pageCount={pageCount}
      />

      <Modal
        title={[
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "baseline",
            }}
          >
            <span>{isTaskUpdate ? "Update" : "Create New"} Activity</span>
          </div>,
        ]}
        centered
        visible={modal}
        width="75vw"
        onCancel={() => {
          setModal(false);
          setSelectedRow();
          setResetCount(resetCount + 1);
        }}
        footer={false}
      >
        <ActivityForm
          setModal={setModal}
          activityDetails={selectedRow}
          resetCount={resetCount}
          isTaskUpdate={isTaskUpdate}
          updateEvent={updateEvent}
          modal={modal}
        />
      </Modal>

      <Modal
        title=""
        visible={detailsModal}
        width="60vw"
        onCancel={() => {
          setDetailsModal(false);
          setSelectedRow();
        }}
        footer={false}
      >
        {selectedRow ? (
          <ActivityDetailsModal
            setModal={setDetailsModal}
            reviewRatingList={reviewList}
            rowData={selectedRow}
            updatedStatus={status}
            setStatus={setStatus}
            updateEvent={updateEvent}
          />
        ) : (
          ""
        )}
      </Modal>
    </Wrapper>
  );
}

const LandinContent = () => {
  return (
    <div className="landing-content mt-5" style={{ textAlign: "center" }}>
      <img src={sales_task} height="200" />
      <h2>You Must Have Select One Project To Generate Data</h2>
    </div>
  );
};
