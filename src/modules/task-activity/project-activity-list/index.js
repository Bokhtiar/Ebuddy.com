/** @format */

import React, { useState, Fragment, useEffect } from "react";
import { Button, Divider, Modal, Table, Select, Icon, Radio } from "antd";
import SearchFilter from "../../commons/SearchFilter";
import { TableWrapper, Wrapper } from "../../commons/Wrapper";
import { Flex } from "../../commons/Flex";
import { useHistory } from "react-router-dom";
import ActivityForm from "./Activity-Form";
import TaskDetails from "./Task-Details";
import TaskBoard from "./Task-Board";
import TaskTableView from "./Task-Table-View";
import ManagementTable from "./Management-Table";
import NonBusinessManagementTable from "./NonBusinessManagementTable";
import CommonModal from "../../commons/commonModal";
import sales_task from "../../../assets/icons/test/sales_task_icon.svg";
import { alertPop } from "../../../scripts/message";
import {
  ALL_PROJECT_SETUP_LIST,
  MILESTONE_STATUS_LIST,
  PROJECT_MILESTONE,
  ACTIVITY_PRIORITY_LIST_2,
  REVIEW_STATUS_LISTVIEW,
  ACTIVITY_RATING_UPDATE,
  ACTIVITY_REVIEW_UPDATE,
  KAM_TARGET_PARAM,
  FUNCTION_TYPES_DROPDOWNLIST,
  ACTIVITY_FUNCTION_DROPDOWNLIST,
} from "../../../scripts/api";
import { getData, postData } from "../../../scripts/api-service";
import { getPermissions } from "../../../scripts/helper";

export default function ProjectActivityList() {
  const [modal, setModal] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});
  const [dropdownData, setDropdownData] = useState();
  const [projectId, setProjectId] = useState();
  const [isTaskUpdate, setIsTaskUpdate] = useState(false);
  const [refresh, doRefresh] = useState(0);
  const [filterData, setFilter] = useState();
  const [milestoneStatus, setMilestoneStatus] = useState([]);
  const [milestoneList, setMilestoneList] = useState([]);
  const [priorityList, setPriorityList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [review, setReview] = useState([]);
  const [nonBusiness, setNonBusiness] = useState(false);
  const [businessCount, setBusinessCount] = useState();
  const [NonBusinessCount, setNonBusinessCount] = useState();
  const [projectList, setProjectList] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [permission, setPermission] = useState();
  const [isDisabledType, setIsDisabledType] = useState(true);
  const [rowData, setRowData] = useState(true);
  const [kamList, setKamList] = useState();
  const [selectedKam, setSelectedKam] = useState();
  const [functionTypeList, setFunctionTypeList] = useState();
  const [functionTypeId, setFunctionTypeId] = useState();
  const [functionNameList, setFunctionNameList] = useState();
  const [functionNameId, setFunctionNameId] = useState();
  const [resetCount, setResetCount] = useState(0);
  const [status, setStatus] = useState();
  const [repeats, setRepeats] = useState();

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

  const apiCall = (page) => {
    // `task/v1/activitiy-list-by-project/${projectId}?page=${page}&search=${filterData?.search || ""}&form_date=${filterData?.date?.date_from || ''}&to_date=${filterData?.date?.date_to || ''}`
    if (permission) {
      let url = `task/v1/team-activity-list?page=${page}`;

      if (permission === "Non-Business") url = url + "&user_type=non-business";
      else if (permission === "Business") url = url + "&user_type=business";
      else if (permission === "Both" && nonBusiness)
        url = url + "&user_type=non-business";
      else if (permission === "Both" && !nonBusiness)
        url = url + "&user_type=business";

      if (projectId) url = url + "&project_id=" + projectId;
      if (selectedKam) url = url + "&assignee=" + selectedKam;
      if (functionTypeId) url = url + "&function_type_id=" + functionTypeId;
      if (functionNameId) url = url + "&activity_function_id=" + functionNameId;
      if (repeats) url = url + "&repeats=" + repeats;
      if (filterData) {
        if (filterData?.search) url = url + "&search=" + filterData?.search;
        if (filterData?.date?.date_to)
          url = url + "&to_date=" + filterData?.date?.date_to;
        if (filterData?.date?.date_from)
          url = url + "&from_date=" + filterData?.date?.date_from;
        if (filterData?.status) url = url + "&status=" + filterData?.status;
        if (filterData?.project_milestone_id)
          url =
            url + "&project_milestone_id=" + filterData?.project_milestone_id;
        if (filterData?.priority_id)
          url = url + "&priority_id=" + filterData?.priority_id;
        if (filterData?.review_status_id)
          url = url + "&review_status_id=" + filterData?.review_status_id;
      }
      // if (nonBusiness || permission === 'Non-Business') url = url + '&user_type=non-business';
      // if (!nonBusiness || permission === 'Business') url = url + '&user_type=business';

      getData(url).then((res) => {
        if (res?.data?.data) {
          if (!nonBusiness) {
            setBusinessCount(`[${res?.data?.data?.total}]` || null);
            setNonBusinessCount(null);
          }
          if (nonBusiness) {
            setBusinessCount(null);
            setNonBusinessCount(`[${res?.data?.data?.total}]` || null);
          }
          setProjectList((preState) => res?.data?.data?.data);
          setPagination((prevState) => ({
            total: res?.data?.data?.total,
            current:
              parseInt(res?.data?.data?.from / res?.data?.data?.per_page) + 1,
            pageSize: res?.data?.data?.per_page,
          }));
          setPage(
            parseInt(res?.data?.data?.from / res?.data?.data?.per_page) + 1,
          );

          setIsDisabledType(false);
        }
      });
    }
  };

  const getKamList = async () => {
    let res = await getData(KAM_TARGET_PARAM);

    if (res) {
      let masterData = res?.data?.data;
      setKamList(masterData.kam);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (projectId) apiCall(page);
    }, 1000);
  }, [projectId]);

  useEffect(() => {
    apiCall(page);
  }, [
    refresh,
    filterData,
    nonBusiness,
    selectedKam,
    permission,
    functionTypeId,
    functionNameId,
    repeats,
  ]);

  const dropDownDataSet = (url, key) => {
    getData(url).then((res) => {
      if (key) {
        setDropdownData((preState) => ({
          ...preState,
          [key]: res?.data?.data || [],
        }));
      } else {
        setDropdownData((preState) => ({
          ...preState,
          ...(res?.data?.data || {}),
        }));
      }
    });
  };

  const getMilestoneStatus = async () => {
    let res = await getData(MILESTONE_STATUS_LIST);

    if (res) {
      let masterData = res?.data?.data;
      setMilestoneStatus(masterData);
    }
  };

  const getMilestoneList = async () => {
    let res = await getData(PROJECT_MILESTONE);

    if (res) {
      let masterData = res?.data?.data;
      setMilestoneList(masterData);
    }
  };

  const getProirityList = async () => {
    let res = await getData(ACTIVITY_PRIORITY_LIST_2);

    if (res) {
      let masterData = res?.data?.data;
      setPriorityList(masterData);
    }
  };

  const getReviewList = async () => {
    let res = await getData(REVIEW_STATUS_LISTVIEW);

    if (res) {
      let masterData = res?.data?.data;
      setReviewList(masterData);
    }
  };

  const getFunctionTypeList = async () => {
    let res = await getData(FUNCTION_TYPES_DROPDOWNLIST);

    if (res) {
      let masterData = res?.data?.data;
      setFunctionTypeList(masterData);
    }
  };

  const getFunctionNameList = async (id) => {
    let res = await getData(
      ACTIVITY_FUNCTION_DROPDOWNLIST + "?function_type_id=" + id,
    );

    if (res) {
      let masterData = res?.data?.data;
      setFunctionNameList(masterData);
    }
  };

  useEffect(() => {
    dropDownDataSet(ALL_PROJECT_SETUP_LIST, "projectList");
    getMilestoneStatus();
    getMilestoneList();
    getProirityList();
    getReviewList();
    getPermissionsList();
    getKamList();
    getFunctionTypeList();

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let paramsProjectId = params.get("projectId");
    let projectId = paramsProjectId ? paramsProjectId * 1 : undefined;

    if (projectId) {
      setProjectId(projectId);
      creteTaskModalOpenHandler();
    }
  }, []);

  useEffect(() => {
    if (functionTypeId) getFunctionNameList(functionTypeId);
  }, [functionTypeId]);

  const filterMilestoneStatus = (value) => {
    setFilter((preState) => ({
      ...preState,
      status: value,
    }));
  };

  const filterMilestone = (value) => {
    setFilter((preState) => ({
      ...preState,
      project_milestone_id: value,
    }));
  };

  const filterReview = (value) => {
    setFilter((preState) => ({
      ...preState,
      review_status_id: value,
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
    setSelectedProject(data);
  };

  const managementEditHandler = (data) => {
    setModal(true);
    setSelectedProject(data);
    setIsTaskUpdate(true);
  };

  const updateTask = (data) => {
    // console.log("update", data);
  };

  const updateEvent = () => {
    // setIsTaskUpdate(true);
    doRefresh((prev) => prev + 1);
  };

  const creteTaskModalOpenHandler = () => {
    setModal(true);
    setSelectedProject({});
    setIsTaskUpdate(false);
  };

  const selectRating = (value, id) => {
    postReviewData(value, id);
  };

  const selectReview = (value, id) => {
    setReview(value);
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

  return (
    <Wrapper>
      <SearchFilter
        search={search}
        filter={filter}
        filterOptions={[{ type: "date_range" }]}
        failsafe
      />

      <Flex space="1rem" justify="normal">
        <Button
          onClick={creteTaskModalOpenHandler}
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
            style={{ width: "50%" }}
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
              Non-Business{NonBusinessCount}
            </Radio.Button>
          </Radio.Group>
        ) : null}
      </Flex>
      <Flex space="1rem" justify="normal">
        <Select
          allowClear={true}
          style={{ width: "20%", marginRight: "1rem" }}
          placeholder="Assignee"
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
          onChange={(v) => setSelectedKam(v)}
        >
          {kamList && kamList.length
            ? kamList.map((data) => {
                return (
                  <Select.Option key={data.emp_id} value={data.emp_id}>
                    {data.name}
                  </Select.Option>
                );
              })
            : ""}
        </Select>

        {!nonBusiness ? (
          <>
            <Select
              showSearch
              allowClear={true}
              style={{ width: "20%", marginRight: "1rem" }}
              placeholder="Project"
              value={projectId}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              onChange={(e) => setProjectId(e)}
            >
              {dropdownData?.projectList?.map((project, index) => (
                <Select.Option key={`project-${project.id}`} value={project.id}>
                  {project.name}
                </Select.Option>
              ))}
            </Select>

            <Select
              showSearch
              allowClear={true}
              style={{ width: "20%", marginRight: "1rem" }}
              placeholder="Milestone"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              onChange={filterMilestone}
            >
              {milestoneList.map((status) => (
                <Select.Option key={`milestone-${status.id}`} value={status.id}>
                  {status.full_name}
                </Select.Option>
              ))}
            </Select>
          </>
        ) : (
          <>
            <Select
              showSearch
              allowClear={true}
              style={{ width: "25%", marginRight: "1rem" }}
              placeholder="Function Type"
              value={functionTypeId}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
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
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              onChange={(e) => setFunctionNameId(e)}
            >
              {functionNameList?.map((func) => (
                <Select.Option key={`milestone-${func.id}`} value={func.id}>
                  {func.name}
                </Select.Option>
              ))}
            </Select>
          </>
        )}
        <Select
          showSearch
          allowClear={true}
          style={{ width: "20%", marginRight: "1rem" }}
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
          showSearch
          allowClear={true}
          style={{ width: "20%", marginRight: "1rem" }}
          placeholder="Review"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
          onChange={filterReview}
        >
          {reviewList.map((status) => (
            <Select.Option key={`milestone-${status.id}`} value={status.id}>
              {status.name}
            </Select.Option>
          ))}
        </Select>
        <Select
          allowClear={true}
          showSearch
          style={{ width: "20%", marginRight: "1rem" }}
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
          <Select.Option key="Cancel" value="Cancel">
            Cancel
          </Select.Option>
        </Select>
        <Select
          allowClear={true}
          showSearch
          style={{ width: "20%", marginRight: "1rem" }}
          placeholder="Repeat"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
          onChange={(value) => setRepeats(value)}
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
      {nonBusiness ? (
        <NonBusinessManagementTable
          managementDetailsShow={managementDetailsShow}
          managementEditHandler={managementEditHandler}
          projectList={projectList}
          pagination={pagination}
          apiCall={apiCall}
          setRowData={setRowData}
          updateEvent={updateEvent}
          setStatus={setStatus}
        ></NonBusinessManagementTable>
      ) : (
        <ManagementTable
          managementDetailsShow={managementDetailsShow}
          managementEditHandler={managementEditHandler}
          projectList={projectList}
          pagination={pagination}
          apiCall={apiCall}
          setRowData={setRowData}
          updateEvent={updateEvent}
          setStatus={setStatus}
        />
      )}

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
          setSelectedProject();
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
          projectId={projectId}
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
          //     rowData={rowData}
          // />
          <CommonModal
            setModal={setDetailsModal}
            reviewRatingList={reviewList}
            nonBusiness={nonBusiness}
            rowData={rowData}
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
