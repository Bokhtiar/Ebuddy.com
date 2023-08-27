/** @format */

import {
  AutoComplete,
  Avatar,
  Badge,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Icon,
  Input,
  PageHeader,
  Row,
  Select,
  Spin,
  Tag,
  TimePicker,
} from "antd";
import * as Cookies from "js-cookie";
import debounce from "lodash.debounce";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  ACTIVITY_FUNCTION_DROPDOWNLIST,
  ALL_PROJECT_SETUP_LIST,
  CLIENT_POC_LIST,
  DEPARTMENT_LIST,
  FUNCTION_TYPES_DROPDOWNLIST,
  MEETING_API,
  MEETING_CLIENT_LIST,
  MEETING_LOCATION,
  PROJECT_WISE_MILESTONE_LIST,
  USER_LIST
} from "../../../scripts/api";
import { getData, postData } from "../../../scripts/api-service";
import { alertPop } from "../../../scripts/message";
import "../../../styles/meeting.scss";
import { Wrapper } from "../../commons/Wrapper";
import MeetingAgendaList from "../components/meeting-agenda-list";

const MeetingCreate = Form.create()(({ form }) => {
  const departmentId = JSON.parse(Cookies.get("profile")).department_id;
  const employeeId = JSON.parse(Cookies.get("profile")).emp_id;
  const teamId = JSON.parse(Cookies.get("profile")).team_id;

  const [businessType, setBusinessType] = useState("Non-Business");
  const [departmentList, setDepartmentList] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState(departmentId);
  const [projectList, setProjectList] = useState();
  const [milestoneList, setMilestoneList] = useState();
  const [functionTypeList, setFunctionTypeList] = useState();
  const [functionNameList, setFunctionNameList] = useState();
  const [functionTypeId, setFunctionTypeId] = useState();
  const [employeeList, setEmployeeList] = useState();
  const [agendaList, setAgendaList] = useState([]);
  const [agenda, setAgenda] = useState();
  const [teamMembersList, setTeamMembersList] = useState([]);
  const [employeeInfo, setEmployeeInfo] = useState();
  const [startMeetingTime, setStartMeetingTime] = useState();
  const [endMeetingTime, setEndMeetingTime] = useState();
  const [meetingRepeats, setMeetingRepeats] = useState();
  const [meetingLocation, setMeetingLocation] = useState();
  const [selectedMeetingType, setSelectedMeetingType] = useState();
  const [clientList, setClientList] = useState();
  const [clientPOCList, setClientPOCList] = useState();
  const [selectedClient, setSelectedClient] = useState();
  const [projectId, setProjectId] = useState();
  const [emails, setEmails] = useState();
  const [emailList, setEmailList] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [isOptionsLoading, setIsOptionsLoading] = useState({
    clientList: false,
    userList: false,
    noteTakerList: false
  });
  const [isDepartmentChecked, setIsDepartmentChecked] = useState(false);
  const [isTeamChecked, setIsTeamChecked] = useState(false);
  const [departmentTeamMemberList, setDepartmentTeamMemberList] = useState([]);
  const history = useHistory();

  function getDisabledHours() {
    var hours = [];
    for (let i = 0; i < moment().hour(); i++) {
      hours.push(i);
    }
    return hours;
  }

  const getDepartmentList = async () => {
    let url = DEPARTMENT_LIST;

    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      setDepartmentList(masterData);
    }
  };

  const getProjectList = async () => {
    let url = ALL_PROJECT_SETUP_LIST + "?";

    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      setProjectList(masterData);
    }
  };

  const getMilestoneList = async (id) => {
    let url = PROJECT_WISE_MILESTONE_LIST + id;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      setMilestoneList(masterData);
    }
  };

  const getFunctionTypeList = async (id) => {
    let url = FUNCTION_TYPES_DROPDOWNLIST + "?";
    if (id) url += "department_id=" + id;
    let res = await getData(url);

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

  const getEmployeeList = async () => {
    setIsOptionsLoading((prevState) => ({
      ...prevState,
      noteTakerList: true
    }));
    let res = await getData(USER_LIST);

    if (res) {
      let masterData = res?.data?.data;
      setEmployeeList(masterData);
    }
    setIsOptionsLoading((prevState) => ({
      ...prevState,
      noteTakerList: false
    }));
  };

 // console.log('user list',employeeList);

  // const getClientList = async () => {
  //   let res = await getData(CLIENT_DROPDOWN_LIST);

  //   if (res) {
  //     let masterData = res?.data?.data;
  //     setClientList(masterData);
  //   }
  // };

  const getDebouncedClientList = async (value = '') => {
    setIsOptionsLoading((prevState) => ({
      ...prevState,
      clientList: true
    }));
    let res = await getData(MEETING_CLIENT_LIST + "?search=" + value)

    if (res) {
      let masterData = res?.data?.data;
      setClientList(masterData);
    } 
    setIsOptionsLoading((prevState) => ({
      ...prevState,
      clientList: false
    }));
  }

  const loadDebouncedOptions = debounce(getDebouncedClientList, 500);

  const getClientPOCList = async (clientId) => {
    let url = CLIENT_POC_LIST + "?client_id=" + clientId;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      setClientPOCList(masterData);
    }
  };

  const getMeetingLocation = async (type, keyword) => {
    let url = MEETING_LOCATION + "?";

    if (type) url += "&type=" + type;
    if (keyword) url += "&keyword=" + keyword;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      let meetingNames = [];
      masterData.forEach((item) => {
        meetingNames.push(item.name);
      });
      setMeetingLocation(meetingNames);
    }
  };

  let addTeamIdsinTeamList = employeeList?.filter(employee => employee?.team_id === teamId);
  let addDepartmentIdsinTeamList = employeeList?.filter(employee => employee?.department_id === departmentId);

  const handleDepartmentCheck = (e) => {
    if(e.target.checked === true) {
      setIsDepartmentChecked(e.target.checked);
      if(isTeamChecked) {
        setDepartmentTeamMemberList(addTeamIdsinTeamList);
      } else {        
        setDepartmentTeamMemberList(addDepartmentIdsinTeamList);
      }
    } else if(e.target.checked === false){
      setIsDepartmentChecked(e.target.checked);
      if(isTeamChecked) {
        setDepartmentTeamMemberList(addTeamIdsinTeamList);
      } else {
        setDepartmentTeamMemberList([]);
      }
    } 
  }

  const handleTeamCheck = (e) => {
    if(e.target.checked === true) {
      setIsTeamChecked(e.target.checked);
      setDepartmentTeamMemberList(addTeamIdsinTeamList);
    } else if(e.target.checked === false){
      setIsTeamChecked(e.target.checked);
      if(isDepartmentChecked) {
        setDepartmentTeamMemberList(addDepartmentIdsinTeamList);
      } else {
        setDepartmentTeamMemberList([]);
      }
    } 
  }

  const localSubmit = (e, flag) => {
    e.preventDefault();

    form.validateFields(async (err, values) => {
      if (!err) {
        setIsloading(true);
        let emails = [];
        emailList.forEach((item) => {
          emails.push({ email: item });
        });

        let agenda = agendaList.map((i) => ({ title: i }));

        let members = [];
        if(departmentTeamMemberList?.length) {
          let allTeamMembers = [...departmentTeamMemberList,...teamMembersList];
          allTeamMembers.forEach((item) => {
            members.push({ member: item.emp_id });
          });
        } else {
          teamMembersList.forEach((item) => {
            members.push({ member: item.emp_id });
          });
        }      

        //calculate meeting duration in hrs
        let startTime = moment(startMeetingTime, "HH:mm:ss a");
        let endTime = moment(endMeetingTime, "HH:mm:ss a");
        let meetingDuration = endTime.diff(startTime, "minutes");

        let payload = {
          ...values,
          id: "",
          department_id: selectedDepartment,
          date: moment(values.date).format("YYYY-MM-DD"),
          start_time: startMeetingTime,
          end_time: endMeetingTime,
          repeats_till_date: moment(values.repeats_till_date).format(
            "YYYY-MM-DD",
          ),
          duration: meetingDuration ? parseInt(meetingDuration) : 0,
          actor: employeeId,
          status: flag === "Draft" ? "Draft" : "Pending",
          team_members: members,
          meeting_agendas: agenda,
          external_participants: emails,
        };
        //console.log('payload ',payload);
        let url = MEETING_API; 
        let res = await postData(url, payload);

        if (res) {
          let masterData = res?.data?.data;
          setIsloading(false);
          history.push("/meeting/my-meeting-list");
          alertPop("success", "Meeting created successfully");
        }
      }
      setIsloading(false);
    });
  };

  const functionTypeObject = functionTypeList?.find(
    functionType => functionType?.name.toLowerCase() === "meeting"
  );

  const meetingId = functionTypeObject ? functionTypeObject?.id : null;

  const handleMeetingType = (value) => {
    setSelectedMeetingType(value);
    if(businessType === "Non-Business") {
      if(value.toLowerCase() === "internal") {
        const functionNameObject = functionNameList?.find(functionName => functionName.name.toLowerCase() === "meeting with internal");
        const functionNameId = functionNameObject ? functionNameObject?.id : null;
        form.setFieldsValue({function_id:functionNameId})
      } else if (value.toLowerCase() === "external") {
        const functionNameObject = functionNameList?.find(functionName => functionName.name.toLowerCase() === "meeting with external");
        const functionNameId = functionNameObject ? functionNameObject?.id : null;
        form.setFieldsValue({function_id:functionNameId})
      }
    }
  }

  useEffect(() => {
    getDepartmentList();
    getProjectList();
    // getMilestoneList();
    getEmployeeList();
    getMeetingLocation();
   // getClientList();
    getDebouncedClientList();
    //getDebouncedParticipantList();
  }, []);

  useEffect(() => {
    if (projectId) getMilestoneList(projectId);
  }, [projectId]);

  useEffect(() => {
    if (selectedMeetingType) getMeetingLocation(selectedMeetingType);
  }, [selectedMeetingType]);

  useEffect(() => {
    if (selectedDepartment) getFunctionTypeList(selectedDepartment);
  }, [selectedDepartment]);

  useEffect(()=>{
    setFunctionTypeId(functionTypeObject ? functionTypeObject?.id : null);  
  }, [meetingId])

  useEffect(() => {
    if (functionTypeId) getFunctionNameList(functionTypeId);
  }, [functionTypeId]);

  useEffect(() => {
    if (selectedClient) getClientPOCList(selectedClient);
  }, [selectedClient]);

  return (
    <Wrapper>
      <div className="meeting-module">
        <Form className="m-4" onSubmit={localSubmit}>
          <PageHeader
            style={{
              border: "1px solid rgb(235, 237, 240)",
            }}
            // onBack={() => history.push('/configuration/pitch-card-list')}
            title="Create Meeting"
            // subTitle="Back to list"
            extra={[
              <Button
                key="3"
                type="danger"
                ghost
                onClick={() => history.push("/meeting/meeting-list")}
              >
                Discard Meeting
              </Button>,
              <Button
                key="2"
                onClick={(e) => {
                  let flag = "Draft";
                  localSubmit(e, flag);
                }}
              >
                Save as Draft
              </Button>,
              <Button
                key="1"
                type="primary"
                htmlType="submit"
                loading={isLoading}
              >
                Create Meeting
              </Button>,
            ]}
          />
          <div className="my-2">
            <Form.Item label={"Meeting Title"}>
              {form.getFieldDecorator("title", {
                rules: [{ required: true, message: "Required!" }],
                // initialValue: cardData?.name ? cardData?.name : undefined
              })(<Input placeholder="Enter meeting title" size="large" />)}
            </Form.Item>



          </div>
          <Divider className="my-2" />
          <Row gutter={16}>
            <Col span={14}>
              <h4 className="meeting_heading_color">Meeting Schedule</h4>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label={"Meeting Date"}>
                    {form.getFieldDecorator("date", {
                      rules: [{ required: true, message: "Required!" }],
                      // initialValue: cardData?.name ? cardData?.name : undefined
                    })(<DatePicker placeholder="Enter date" size="large" />)}
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item label={"Start Time"}>
                    {form.getFieldDecorator("start_time", {
                      rules: [{ required: true, message: "Required!" }],
                      // initialValue: cardData?.name ? cardData?.name : undefined
                    })(
                      <TimePicker
                        size="large"
                        placeholder="Start time"
                        format="HH:mm"
                        // use12Hours
                        onChange={(time, timeString) =>
                          setStartMeetingTime(timeString)
                        }
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item label={"End Time"}>
                    {form.getFieldDecorator("end_time", {
                      rules: [{ required: true, message: "Required!" }],
                      // initialValue: cardData?.name ? cardData?.name : undefined
                    })(
                      <TimePicker
                        size="large"
                        placeholder="End time"
                        format="HH:mm"
                        // use12Hours
                        onChange={(time, timeString) =>
                          setEndMeetingTime(timeString)
                        }
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Divider className="my-2" />
              <Row gutter={16}>
                <Col span={22}>
                  <Form.Item label={"Department Name"}>
                    {form.getFieldDecorator("department_id", {
                      rules: [{ required: true, message: "Required!" }],
                      initialValue: selectedDepartment
                        ? selectedDepartment
                        : undefined,
                    })(
                      <Select
                        allowClear={true}
                        size="large"
                        placeholder="Department Name"
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        onChange={(value) => setSelectedDepartment(value)}
                        disabled={businessType === "Business" ? true : false}
                      >
                        {departmentList?.length
                          ? departmentList.map((dept) => (
                              <Select.Option value={dept.id} key={dept.id}>
                                {dept.name}
                              </Select.Option>
                            ))
                          : ""}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              {businessType === "Client" ? (
                <Row gutter={16}>
                  <Col span={11}>
                    <Form.Item label={"Client Name"}>
                      {form.getFieldDecorator("client_id", {
                        rules: [{ required: true, message: "Required!" }],
                        // initialValue: cardData?.name ? cardData?.name : undefined
                      })(
                        <Select
                          allowClear={true}
                          size="large"
                          placeholder="Client Name"
                          showSearch
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          onChange={(value) => setSelectedClient(value)}
                          onSearch={loadDebouncedOptions}
                          loading={isOptionsLoading.clientList}
                        >
                          {clientList?.length
                            ? clientList.map((client) => (
                                <Select.Option
                                  value={client.id}
                                  key={client.id}
                                >
                                  {client.name}
                                </Select.Option>
                              ))
                            : ""}
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item label={"Client POC Name"}>
                      {form.getFieldDecorator("client_poc", {
                        // rules: [{required: true, message: "Required!"}],
                        // initialValue: cardData?.name ? cardData?.name : undefined
                      })(
                        <Select
                          allowClear={true}
                          size="large"
                          placeholder="Client POC Name"
                          showSearch
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          // onChange={(value) => setSelectedMilestone(value)}
                        >
                          {clientPOCList?.length
                            ? clientPOCList.map((clientPOC) => (
                                <Select.Option
                                  value={clientPOC.id}
                                  key={clientPOC.id}
                                >
                                  {clientPOC.contact_name}
                                </Select.Option>
                              ))
                            : ""}
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              ) : businessType === "Business" ? (
                <Row gutter={16}>
                  <Col span={11}>
                    <Form.Item label={"Project Name"}>
                      {form.getFieldDecorator("project_id", {
                        rules: [{ required: true, message: "Required!" }],
                        // initialValue: cardData?.name ? cardData?.name : undefined
                      })(
                        <Select
                          allowClear={true}
                          size="large"
                          placeholder="Project Name"
                          showSearch
                          onChange={(value) => setProjectId(value)}
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          // onChange={(value) => setSelectedProject(value)}
                        >
                          {projectList?.length
                            ? projectList.map((project) => (
                                <Select.Option
                                  value={project.id}
                                  key={project.id}
                                >
                                  {project.name}
                                </Select.Option>
                              ))
                            : ""}
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item label={"Milestone Name"}>
                      {form.getFieldDecorator("project_milestone_id", {
                        rules: [{ required: true, message: "Required!" }],
                        // initialValue: cardData?.name ? cardData?.name : undefined
                      })(
                        <Select
                          allowClear={true}
                          size="large"
                          placeholder="Milestone Name"
                          showSearch
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          // onChange={(value) => setSelectedMilestone(value)}
                        >
                          {milestoneList?.length
                            ? milestoneList.map((milestone, index) => (
                                <Select.Option
                                  value={milestone.project_milestone_id}
                                  key={index}
                                >
                                  {milestone.full_name}
                                </Select.Option>
                              ))
                            : ""}
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              ) : (
                <Row gutter={16}>
                  <Col span={11}>
                    <Form.Item label={"Function Type"}>
                      {form.getFieldDecorator("function_type_id", {
                        rules: [{ required: true, message: "Required!" }],
                        initialValue: meetingId,
                      })(
                        <Select
                          allowClear={true}
                          size="large"
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
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item label={"Function Name"}>
                      {form.getFieldDecorator("function_id", {
                        rules: [{ required: true, message: "Required!" }],
                        // initialValue: cardData?.name ? cardData?.name : undefined
                      })(
                        <Select
                          allowClear={true}
                          size="large"
                          placeholder="Function Name"
                          showSearch
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          // onChange={(value) => setSelectedFunction(value)}
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
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              )}
              <Row>
                {/* <h4 className="meeting_heading_color">Meeting Agenda</h4> */}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Col span={21}>
                    <Form.Item label={"Meeting Agenda Point"}>
                      {form.getFieldDecorator("agenda", {
                        rules: [
                          !agendaList?.length && {
                            required: true,
                            message: "Required!",
                          },
                        ],
                        // initialValue: cardData?.name ? cardData?.name : undefined
                      })(
                        <Input
                          placeholder="Enter meeting agenda point"
                          size="large"
                          onChange={(event) => {
                            event.preventDefault();
                            setAgenda(event.target.value);
                            //console.log(event.target.value);
                          }}
                        />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={3}>
                    <Button
                      size="large"
                      key="2"
                      type="primary"
                      style={{ margin: "30px 0px 0px 15px" }}
                      onClick={() => {
                        agendaList.splice(0, 0, agenda);
                        // console.log({
                        //   "[agendaList.splice(0, 0, agenda);]": agendaList,
                        // });
                        form.resetFields("agenda");
                      }}
                    >
                      Add
                    </Button>
                  </Col>
                </div>
              </Row>
              <Row>
                {/* <MeetingAgendaList /> */}
                <small>
                  Add agenda one by one and use{" "}
                  <Tag color="#108ee9"># tag </Tag> to add metadata
                </small>
                <MeetingAgendaList
                  agendaList={agendaList}
                  setAgendaList={setAgendaList}
                  isDelete={true}
                />
              </Row>
            </Col>
            <Col
              span={10}
              style={{ borderLeft: "1px solid #ccc", paddingLeft: "0.5rem" }}
            >
              <div>
                <h4 className="meeting_heading_color">Meeting Options</h4>
                <Form.Item label={"Meeting Type"}>
                  {form.getFieldDecorator("type", {
                    rules: [{ required: true, message: "Required!" }],
                    // initialValue: cardData?.name ? cardData?.name : undefined
                  })(
                    <Select
                      allowClear={false}
                      size="large"
                      placeholder="Meeting Type"
                      showSearch
                      // value={selectedYear}
                      onChange={handleMeetingType}
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Select.Option key="Internal" value="Internal">
                        Internal
                      </Select.Option>
                      <Select.Option key="External" value="External">
                        External
                      </Select.Option>
                    </Select>
                  )}
                </Form.Item>
                <Form.Item label={"Meeting Nature"}>
                  {form.getFieldDecorator("nature", {
                    rules: [{ required: true, message: "Required!" }],
                    initialValue: businessType ? businessType : undefined,
                  })(
                    <Select
                      allowClear={true}
                      size="large"
                      placeholder="Business Type"
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      // value={selectedDepartment ? selectedDepartment : undefined }
                      onChange={(value) => setBusinessType(value)}
                    >
                      <Select.Option key="Client" value="Client">
                        Client
                      </Select.Option>
                      <Select.Option key="Business" value="Business">
                        Business
                      </Select.Option>
                      <Select.Option key="Non-Business" value="Non-Business">
                        Non-Business
                      </Select.Option>
                    </Select>
                  )}
                </Form.Item>
                <Form.Item label={"Meeting Place"}>
                  {form.getFieldDecorator("location", {
                    rules: [{ required: true, message: "Required!" }],
                    // initialValue: cardData?.name ? cardData?.name : undefined
                  })(
                    <AutoComplete
                      size="large"
                      dataSource={meetingLocation}
                      placeholder="Meeting Places"
                      filterOption={(inputValue, option) =>
                        option.props.children
                          .toUpperCase()
                          .indexOf(inputValue.toUpperCase()) !== -1
                      }
                    />
                  )}
                </Form.Item>
                <Form.Item label={"Repeat Type"}>
                  {form.getFieldDecorator("repeats", {
                    // rules: [{required: true, message: "Required!"}],
                    // initialValue: cardData?.name ? cardData?.name : undefined
                  })(
                    <Select
                      allowClear={true}
                      size="large"
                      placeholder="Repeat Type"
                      showSearch
                      optionFilterProp="children"
                      onChange={(value) => setMeetingRepeats(value)}
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      // value={selectedDepartment ? selectedDepartment : undefined }
                      // onChange={(value) => setBusinessType(value)}
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
                      <Select.Option key="Yearly" value="Yearly">
                        Yearly
                      </Select.Option>
                    </Select>
                  )}
                </Form.Item>
                {meetingRepeats ? (
                  <Form.Item label={"Repeat Till Date"}>
                    {form.getFieldDecorator("repeats_till_date", {
                      rules: [{ required: true, message: "Required!" }],
                      // initialValue: cardData?.name ? cardData?.name : undefined
                    })(
                      <DatePicker placeholder="Enter end date" size="large" />
                    )}
                  </Form.Item>
                ) : null}
              </div>
              <div>
                <h4 className="meeting_heading_color">Assignee Options</h4>
                <Form.Item label={"Actor"}>
                  {form.getFieldDecorator("actor", {
                    rules: [{ required: true, message: "Required!" }],
                    initialValue: employeeList?.length ? (
                      employeeId
                    ) : (
                      <Spin size="small" />
                    ),
                  })(
                    <Select
                      allowClear={true}
                      size="large"
                      placeholder="Actor Name"
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      // onChange={(value) => setSelectedFunction(value)}
                      disabled
                    >
                      {employeeList?.map((employee) => (
                        <Select.Option
                          value={employee.emp_id}
                          key={employee.emp_id}
                        >
                          {employee.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
                <Form.Item label={"Note Taker"}>
                  {form.getFieldDecorator("note_tracker", {
                    rules: [{ required: true, message: "Required!" }],
                    initialValue: employeeList?.length ? (
                      employeeId
                    ) : (
                      <Spin size="small" />
                    ),
                  })(
                    <Select
                      allowClear={true}
                      size="large"
                      placeholder="Note Taker's Name"
                      showSearch
                      optionFilterProp="children"
                      loading={isOptionsLoading.noteTakerList}
                      // filterOption={(input, option) =>
                      //   option.props.children
                      //     .toLowerCase()
                      //     .indexOf(input.toLowerCase()) >= 0
                      // }
                      // onChange={(value) => setSelectedFunction(value)}
                    >
                      {employeeList?.map((employee) => (
                        <Select.Option
                          value={employee.emp_id}
                          key={employee.emp_id}
                        >
                          {employee.name}({employee.emp_id})
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
                <Row>
                  <Col span={12}>
                    <Form.Item>
                      <Checkbox onChange={handleDepartmentCheck}>
                        Include Department
                      </Checkbox>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item>
                      <Checkbox onChange={handleTeamCheck}>
                        Include Team{" "}
                      </Checkbox>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item label={"Participant"}>
                  {form.getFieldDecorator("team", {
                    rules: [{ required: true, message: "Required!" }],
                    // initialValue: cardData?.name ? cardData?.name : undefined
                  })(
                    <Select
                      allowClear={true}
                      mode="multiple"
                      size="large"
                      placeholder="Participant's Name"
                      showSearch
                      optionFilterProp="children"
                      loading={isOptionsLoading.noteTakerList}
                      // filterOption={(input, option) => {
                      //   console.log({ input, option });
                      //   return (
                      //     option.props.children
                      //       .toString()
                      //       .toLowerCase()
                      //       .indexOf(input.toLowerCase()) >= 0
                      //   );
                      // }}
                      onChange={(value) => {
                        // console.log({ value });
                        let tempArray = value.map((v) =>
                          employeeList.find((item) => item.emp_id === v)
                        );
                        //console.log({ tempArray });
                        setEmployeeInfo(tempArray);
                        setTeamMembersList(tempArray);
                      }}
                    >
                      {employeeList?.map((employee) => (
                        <Select.Option
                          value={employee.emp_id}
                          key={employee.emp_id}
                        >
                          {employee.name}({employee.emp_id})
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
                <Row>
                  {teamMembersList
                    ? teamMembersList.map((item, index) => {
                        return (
                          <div key={`teamMembers-${index}`}>
                            <Col span={23}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "stretch",
                                }}
                              >
                                <Avatar
                                  src={item?.profile_pic}
                                  size="large"
                                  className="mx-1"
                                />
                                <div>
                                  <p style={{ marginBottom: "0" }}>
                                    {item?.name}
                                  </p>
                                  <p>{item?.designation}</p>
                                </div>
                              </div>
                            </Col>
                            <Col span={1}>
                              <Icon
                                type="delete"
                                style={{
                                  color: "#F2473F",
                                  fontSize: "16px",
                                  marginTop: "20px",
                                }}
                                onClick={() => {
                                  setEmployeeInfo(
                                    employeeInfo.filter(
                                      (e) => e.emp_id !== item.emp_id
                                    )
                                  );
                                  let tempArray = [...teamMembersList];
                                  tempArray.splice(index, 1);
                                  setTeamMembersList(tempArray);
                                  form.setFieldsValue({
                                    team: tempArray?.length
                                      ? tempArray.map((data) => data.emp_id)
                                      : [],
                                  });
                                }}
                              />
                            </Col>
                          </div>
                        );
                      })
                    : null}
                </Row>
                {selectedMeetingType === "External" ? (
                  <>
                    <Row>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Col span={21}>
                          <Form.Item label={"External Participant"}>
                            {form.getFieldDecorator("email", {
                              rules: [
                                !emailList?.length && {
                                  required: true,
                                  message: "Required!",
                                },
                              ],
                              // initialValue: cardData?.name ? cardData?.name : undefined
                            })(
                              <Input
                                placeholder="Enter email address"
                                size="large"
                                onChange={(event) =>
                                  setEmails(event.target.value)
                                }
                              />
                            )}
                          </Form.Item>
                        </Col>
                        <Col span={3}>
                          <Button
                            size="large"
                            key="1"
                            type="primary"
                            style={{ margin: "28px 0px 0px 15px" }}
                            onClick={() => {
                              emailList.splice(0, 0, emails);
                              form.resetFields("email");
                            }}
                          >
                            Add
                          </Button>
                        </Col>
                      </div>
                    </Row>
                    <Row>
                      {emailList
                        ? emailList.map((item, index) => {
                            return (
                              <div key={`email-${index}`}>
                                <Col span={23} className="my-1">
                                  <Badge status="processing" text={item} />
                                </Col>
                                <Col span={1} className="my-1">
                                  <Icon
                                    type="delete"
                                    style={{ color: "#F2473F" }}
                                    onClick={() => {
                                      let tempArray = [...emailList];
                                      tempArray.splice(index, 1);
                                      setEmailList(tempArray);
                                    }}
                                  />
                                </Col>
                              </div>
                            );
                          })
                        : null}
                    </Row>
                  </>
                ) : null}
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </Wrapper>
  );
});

export default MeetingCreate;
