/** @format */

import {
  Button,
  DatePicker,
  Divider,
  PageHeader,
  Popover,
  Select,
  Table,
  Tooltip
} from "antd";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import demoUser from "../../../assets/dummy.jpg";
import sales_task from "../../../assets/icons/test/sales_task_icon.svg";
import {
  ACTIVITY_FUNCTION_DROPDOWNLIST,
  ALL_PROJECT_SETUP_LIST,
  FIND_MEETING_BY_ID,
  FOLLOWUP_MEETING_CREATE,
  FUNCTION_TYPES_DROPDOWNLIST,
  MEETING_CANCEL,
  MEETING_CLIENT_LIST,
  MEETING_PUBLISH,
  MEETING_PUBLISH_MAIL,
  MEETING_USER_LIST,
  MY_MEETING_API,
  PROJECT_MILESTONE,
} from "../../../scripts/api";
import { getData, postData } from "../../../scripts/api-service";
import { alertPop } from "../../../scripts/message";
import DebounceSelect from "../../commons/DebounceSelect";
import { Flex } from "../../commons/Flex";
import SearchFilter from "../../commons/SearchFilter";
import { Wrapper } from "../../commons/Wrapper";
import MeetingDetailsModal from "../components/meeting-details-modal";

const MyMeetingList = () => {
  const history = useHistory();
  const [meetingList, setMeetingList] = useState();
  const [selectedMeetingType, setSelectedMeetingType] = useState();
  const [projectList, setProjectList] = useState();
  const [milestoneList, setMilestoneList] = useState();
  const [functionTypeList, setFunctionTypeList] = useState();
  const [functionNameList, setFunctionNameList] = useState();
  const [selectedProject, setSelectedProject] = useState();
  const [selectedMilestone, setSelectedMilestone] = useState();
  const [functionTypeId, setFunctionTypeId] = useState();
  const [selectedFunction, setSelectedFunction] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [pageCount, setPageCount] = useState();
  const [businessType, setBusinessType] = useState();
  const [clientId, setClientId] = useState();
  const [startFrom, setStartFrom] = useState();
  const [endFrom, setEndFrom] = useState();
  const [participantId, setParticipantId] = useState();
  const [clientList, setClientList] = useState();
  const [participantList, setParticipantList] = useState();
  const [findMeetingDetails, setFindMeetingDetails] = useState();
  const [modal, setModal] = useState(false);
  const [searchValue, setSearchValue] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isOptionsLoading, setIsOptionsLoading] = useState({
    clientList: false,
    userList: false,
    publishMail: false
  });

  const manageModal = (id) => {
    setModal(true);
    getMeetingById(id);
  };

  const handleDateChange = (date, dateString) => {
    setStartFrom(dateString[0]);
    setEndFrom(dateString[1]);
  };

  const getMeetingList = async () => {
    setIsLoading(true);
    let url = MY_MEETING_API + "?";

    if (currentPage) url = url + "&page=" + currentPage;
    if (selectedMeetingType) url = url + "&type=" + selectedMeetingType;
    if (businessType) url = url + "&nature=" + businessType;
    if (selectedProject) url = url + "&project_id=" + selectedProject;
    if (selectedMilestone)
      url = url + "&project_milestone_id=" + selectedMilestone;
    if (functionTypeId) url = url + "&function_type_id=" + functionTypeId;
    if (selectedFunction) url = url + "&function_id=" + selectedFunction;
    if (clientId) url = url + "&client_id=" + clientId;
    if (participantId) url = url + "&user_id=" + participantId;
    if (startFrom && endFrom)
      url = url + "&from_date=" + startFrom + "&to_date=" + endFrom;
    if (searchValue) url = url + "&search=" + searchValue;

    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data?.data;
      setMeetingList(masterData);
      setPageCount(res?.data?.data?.last_page);
    }
    setIsLoading(false);
  };

  const search = (value) => {
    setSearchValue(value);
  };

  const getProjectList = async () => {
    let url = ALL_PROJECT_SETUP_LIST + "?";

    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      setProjectList(masterData);
    }
  };

  const getMeetingById = async (id) => {
    let url = FIND_MEETING_BY_ID + "/" + id;
    let res = await getData(url);
    if (res) {
      let masterData = res?.data?.data;
      setFindMeetingDetails(masterData);
    }
  };

  const meetingCancel = async (id) => {
    let url = MEETING_CANCEL + "/" + id;
    let res = await postData(url);
    if (res) {
      getMeetingList();
    }
  };

  const getMilestoneList = async () => {
    let res = await getData(PROJECT_MILESTONE);

    if (res) {
      let masterData = res?.data?.data;
      setMilestoneList(masterData);
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

  const getDebouncedClientList = async (value = "") => {
    setIsOptionsLoading((prevState) => ({
      ...prevState,
      clientList: true,
    }));
    let res = await getData(MEETING_CLIENT_LIST + "?search=" + value);

    if (res) {
      let masterData = res?.data?.data;
      setClientList(masterData);
    }
    setIsOptionsLoading((prevState) => ({
      ...prevState,
      clientList: false,
    }));
  };

  const getDebouncedParticipantList = async (value = "") => {
    setIsOptionsLoading((prevState) => ({
      ...prevState,
      userList: true,
    }));
    let res = await getData(MEETING_USER_LIST + "?search=" + value);

    if (res) {
      let masterData = res?.data?.data;
      setParticipantList(masterData);
    }
    setIsOptionsLoading((prevState) => ({
      ...prevState,
      userList: false,
    }));
  };

  const popoverContent = (members) => {
    return (
      <>
        {members?.map((item, index) => (
          <li key={`members-list-${index}`}>
            <p>
              <img
                src={item.members?.profile_pic || demoUser}
                width="25"
                height="25"
                // alt={item.members.name}
              />{" "}
              &nbsp;
              <span>{item.members?.name}</span>
            </p>
          </li>
        ))}
      </>
    );
  };

  const meetingStatus = (status) => {
    if (status === "Draft")
      return <span style={{ color: "#ECAA2E" }}>Draft</span>;
    else if (status === "Pending")
      return <span style={{ color: "#F24847" }}>Pending</span>;
    else if (status === "In-progress")
      return <span style={{ color: "#0184E6" }}>In-progress</span>;
    else if (status === "Cancel")
      return <span style={{ color: "#F24847" }}>Canceled</span>;
    else if (status === "Publish")
      return <span style={{ color: "#61C635" }}>Published</span>;
    else return <span style={{ color: "#61C635" }}>Done</span>;
  };

  const meetingMinutes = (minutes) => {
    if (!minutes) return <span style={{ color: "#F24847" }}>Pending</span>;
    else return <span style={{ color: "#61C635" }}>Done</span>;
  };

  const exportData = async (id) => {
    let url = MEETING_PUBLISH + "/" + id;
    let res = await getData(url);
    let masterData = res?.data?.data;
    window.open(masterData);
  };
  const publishMail = async (id) => {
    setIsOptionsLoading((prevState) => ({
      ...prevState,
      publishMail: true,
    }));
    let url = MEETING_PUBLISH_MAIL + "/" + id;
    let res = await getData(url);
    if (res) {
      getMeetingList();
      alertPop("success", "Process completed successfully");
    }
    // window.open(masterData);
    setIsOptionsLoading((prevState) => ({
      ...prevState,
      publishMail: false,
    }));
  };
  const createFollowUpMeeting = async (id) => {
    let url = FOLLOWUP_MEETING_CREATE + "/" + id;
    let res = await postData(url);

    if (res) {
      let masterData = res?.data?.data;
      history.push(`/meeting/meeting-update?id=${masterData.id}`);
      alertPop("success", "Followup meeting created successfully");
    }
  };

  useEffect(() => {
    getMeetingList();
    getProjectList();
    getMilestoneList();
    getFunctionTypeList();
    getDebouncedClientList();
    getDebouncedParticipantList();
  }, []);

  useEffect(() => {
    if (functionTypeId) getFunctionNameList(functionTypeId);
  }, [functionTypeId]);

  useEffect(() => {
    getMeetingList();
  }, [
    currentPage,
    selectedMeetingType,
    businessType,
    selectedProject,
    selectedMilestone,
    functionTypeId,
    selectedFunction,
    participantId,
    clientId,
    startFrom,
    endFrom,
    searchValue,
  ]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "department",
      width: 100,
    },
    {
      title: "Title",
      key: "title",
      width: 200,
      render: (row) => (
        <span onClick={() => manageModal(row.id)}>{row.title}</span>
      ),
    },
    {
      title: "Initiator",
      key: "initiator",
      width: 180,
      render: (row) => (
        <Tooltip title={row?.created_by?.name}>
          <img
            src={row?.created_by?.profile_pic || demoUser}
            width="25"
            height="25"
            alt={row?.created_by?.name}
          />{" "}
          &nbsp;&nbsp;
          <span>{row?.created_by?.name}</span>
        </Tooltip>
      ),
    },
    {
      title: "Participant",
      key: "participant",
      width: 100,
      render: (row) => (
        <Popover content={popoverContent(row?.meeting_team_members)}>
          {`${row?.meeting_team_members?.length} people`}
        </Popover>
      ),
    },

    {
      title: "Minute Status",
      key: "min_sts",
      width: 100,
      render: (row) => meetingMinutes(row?.meeting_minute_story),
    },
    {
      title: "Action Point Status",
      key: "ac_sts",
      width: 100,
      render: (row) =>
        row?.has_action_point === 1 ? (
          <span style={{ color: "#61C635" }}>Done</span>
        ) : (
          <span style={{ color: "#F24847" }}>Pending</span>
        ),
    },
    {
      title: "Status",
      key: "sts",
      width: 100,
      render: (row) => meetingStatus(row?.status),
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      fixed: "right",
      render: (row) => (
        <>
          <Popover
            trigger="click"
            content={
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                }}
              >
                <Button className="m-1" size="small" type="primary" ghost>
                  <Link
                    to={`/meeting/meeting-update?id=${row.id}`}
                    style={{ color: "#5BB7FF", fontSize: "11px" }}
                  >
                    Edit
                  </Link>
                </Button>
                <Button
                  className="m-1"
                  size="small"
                  type="primary"
                  color="white"
                  onClick={() => manageModal(row.id)}
                >
                  Deatils
                </Button>
                <Button className="m-1" size="small" type="primary">
                  <Link
                    to={`/meeting/meeting-minutes?id=${row.id}&status=${row.status}`}
                  >
                    Meeting Minutes
                  </Link>
                </Button>
                <Button
                  className="m-1"
                  type="primary"
                  size="small"
                  onClick={() => exportData(row?.id)}
                  disabled={
                    row?.status &&
                    row?.meeting_minute_story &&
                    row?.has_action_point
                      ? false
                      : true
                  }
                >
                  <span
                    style={{
                      color:
                        row?.status &&
                        row?.meeting_minute_story &&
                        row?.has_action_point
                          ? "white"
                          : "gray",
                    }}
                  >
                    Download
                  </span>
                </Button>
                <Button
                  className="m-1"
                  type="primary"
                  size="small"
                  onClick={() => publishMail(row?.id)}
                  disabled={
                    row?.status === "Publish" || row?.has_action_point === 0
                      ? true
                      : false
                  }
                  loading={isOptionsLoading.publishMail}
                >
                  <span
                    style={{
                      color:
                        row?.status === "Publish" || row?.has_action_point === 0
                          ? "gray"
                          : "white",
                    }}
                  >
                    Publish
                  </span>
                </Button>
                <Button
                  className="m-1"
                  type="primary"
                  size="small"
                  onClick={() => createFollowUpMeeting(row.id)}
                >
                  <span style={{ color: "white" }}>Follow Up</span>
                </Button>
                {row?.status !== "Complete" && row?.status !== "Cancel" && (
                  <Button
                    className="m-1"
                    type="danger"
                    size="small"
                    onClick={() => meetingCancel(row.id)}
                  >
                    <span style={{ color: "white" }}>Cancel</span>
                  </Button>
                )}
              </div>
            }
            title="Actions"
          >
            <Button type="primary">Actions</Button>
          </Popover>
        </>
      ),
    },
  ];

  return (
    <Wrapper>
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)",
        }}
        // onBack={() => history.push('/configuration/pitch-card-list')}
        title="My Meeting List"
        // subTitle="Back to list"
      />
      <div style={{ width: "100%" }}>
        <SearchFilter search={search} onlySearch={true} failsafe />
      </div>
      <Flex space="1rem" justify="flex-start">
        <Button
          type="primary"
          style={{ width: "20%", marginRight: "1rem" }}
          onClick={() => history.push("/meeting/meeting-create")}
        >
          Create Meeting
        </Button>
        <Select
          allowClear={false}
          style={{ width: "20%", marginRight: "1rem" }}
          placeholder="Meeting"
          showSearch
          // value={selectedYear}
          onChange={(value) => setSelectedMeetingType(value)}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          <Select.Option key="Internal" value="Internal">
            Internal
          </Select.Option>
          <Select.Option key="External" value="External">
            External
          </Select.Option>
        </Select>
        <Select
          allowClear={true}
          style={{ width: "20%", marginRight: "1rem" }}
          placeholder="Business Type"
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
          // value={selectedDepartment ? selectedDepartment : undefined }
          onChange={(value) => setBusinessType(value)}
        >
          <Select.Option key="Business" value="Business">
            Business
          </Select.Option>
          <Select.Option key="Non-business" value="Non-business">
            Non-business
          </Select.Option>
        </Select>
        {businessType ? (
          businessType === "Business" ? (
            <>
              <Select
                allowClear={true}
                style={{ width: "20%", marginRight: "1rem" }}
                placeholder="Project"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
                onChange={(value) => setSelectedProject(value)}
              >
                {projectList?.length
                  ? projectList.map((project) => (
                      <Select.Option value={project.id} key={project.id}>
                        {project.name}
                      </Select.Option>
                    ))
                  : ""}
              </Select>
              <Select
                allowClear={true}
                style={{ width: "20%", marginRight: "1rem" }}
                placeholder="Milestone"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
                onChange={(value) => setSelectedMilestone(value)}
              >
                {milestoneList?.length
                  ? milestoneList.map((milestone) => (
                      <Select.Option value={milestone.id} key={milestone.id}>
                        {milestone.full_name}
                      </Select.Option>
                    ))
                  : ""}
              </Select>
            </>
          ) : (
            <>
              <Select
                allowClear={true}
                style={{ width: "20%", marginRight: "1rem" }}
                placeholder="Function Type"
                showSearch
                optionFilterProp="children"
                onChange={(value) => setFunctionTypeId(value)}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {functionTypeList?.length
                  ? functionTypeList.map((functionType) => (
                      <Select.Option
                        value={functionType.id}
                        key={functionType.id}
                      >
                        {functionType.name}
                      </Select.Option>
                    ))
                  : ""}
              </Select>
              <Select
                allowClear={true}
                style={{ width: "20%", marginRight: "1rem" }}
                placeholder="Function Name"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
                onChange={(value) => setSelectedFunction(value)}
              >
                {functionNameList?.length
                  ? functionNameList.map((functionName) => (
                      <Select.Option
                        value={functionName.id}
                        key={functionName.id}
                      >
                        {functionName.name}
                      </Select.Option>
                    ))
                  : ""}
              </Select>
            </>
          )
        ) : null}
        <DebounceSelect
          getDebouncedOptions={getDebouncedClientList}
          isOptionsLoading={isOptionsLoading.clientList}
          options={clientList}
          setId={setClientId}
          placeholder="Type client name here"
          value="id"
          key="id"
        />
        <DebounceSelect
          getDebouncedOptions={getDebouncedParticipantList}
          isOptionsLoading={isOptionsLoading.userList}
          options={participantList}
          setId={setParticipantId}
          placeholder="Type participant name here"
          value="emp_id"
          key="emp_id"
        />
        <DatePicker.RangePicker
          placeholder="Select date range"
          size="medium"
          onChange={handleDateChange}
          style={{ width: "300px", marginRight: "0.5rem" }}
        />
      </Flex>
      <Divider />
      <div style={{ padding: "1.5rem" }}>
        <Table
          rowKey={(record) => record.id}
          dataSource={meetingList}
          columns={columns}
          loading={isLoading}
          scroll={{ y: 600 }}
          pagination={{
            current: currentPage,
            total: pageCount * 10,
            onChange: (page) => setCurrentPage(page),
          }}
        />
      </div>
      <MeetingDetailsModal
        modal={modal}
        setModal={setModal}
        findMeetingDetails={findMeetingDetails}
      />
    </Wrapper>
  );
};


const LandingContent = () => {
  return (
    <div className="landing-content mt-5" style={{ textAlign: "center" }}>
      <img src={sales_task} height="200" />
      <h2>No data found for the selection.</h2>
    </div>
  );
};

export default MyMeetingList;
