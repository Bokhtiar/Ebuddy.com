import { AutoComplete, Avatar, Badge, Button, Col, DatePicker, Divider, Form, Icon, Input, PageHeader, Row, Select, Tag, TimePicker } from "antd";
import * as Cookies from "js-cookie";
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import {
  ACTIVITY_FUNCTION_DROPDOWNLIST,
  ALL_PROJECT_SETUP_LIST,
  CLIENT_DROPDOWN_LIST,
  CLIENT_POC_LIST,
  DEPARTMENT_LIST,
  FUNCTION_TYPES_DROPDOWNLIST,
  MEETING_API,
  MEETING_LOCATION,
  PROJECT_WISE_MILESTONE_LIST,
  USER_LIST
} from "../../../scripts/api";
import { getData, postData } from "../../../scripts/api-service";
import { alertPop } from '../../../scripts/message';
import { Wrapper } from "../../commons/Wrapper";
import MeetingAgendaList from "../components/meeting-agenda-list";

const MeetingUpdate = Form.create()(({ form }) => {
  const departmentId = JSON.parse(Cookies.get("profile")).department_id;
  const employeeId = JSON.parse(Cookies.get("profile")).emp_id;

  let searchUrl = window.location.search;
  let params = new URLSearchParams(searchUrl);
  let meetingId = params.get('id');

  const [businessType, setBusinessType] = useState();
  const [meetingList, setMeetingList] = useState();
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
  const [clientList, setClientList] = useState();
  const [clientPOCList, setClientPOCList] = useState();
  const [selectedClient, setSelectedClient] = useState();
  const [projectId, setProjectId] = useState();
  const [emailList, setEmailList] = useState([]);
  const [emails, setEmails] = useState();
  const [isLoading, setIsloading] = useState(false);
  const [isOptionsLoading, setIsOptionsLoading] = useState(false);
  const history = useHistory();
 
  function getDisabledHours() {
    var hours = [];
    for (let i = 0; i < moment().hour(); i++) {
      hours.push(i);
    }
    return hours;
  }

  const getMeetingList = async (id) => {
    let url = MEETING_API + "/" + id;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      setMeetingList(masterData);
    }
  };

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
    let url = PROJECT_WISE_MILESTONE_LIST;
    if (id) url += id;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      setMilestoneList(masterData);
    }
  }
//console.log('milestone',milestoneList);
  const getFunctionTypeList = async (id) => {
    let url = FUNCTION_TYPES_DROPDOWNLIST + "?";
    if (id) url += "department_id=" + id;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      setFunctionTypeList(masterData);
    }
  }

  const getFunctionNameList = async (id) => {
    let res = await getData(ACTIVITY_FUNCTION_DROPDOWNLIST + '?function_type_id=' + id);

    if (res) {
      let masterData = res?.data?.data;
      setFunctionNameList(masterData);
    }
  }

  const getEmployeeList = async () => {
    setIsOptionsLoading(true);
    let res = await getData(USER_LIST);

    if (res) {
      let masterData = res?.data?.data;
      setEmployeeList(masterData);
    }
    setIsOptionsLoading(false);
  }

  const getMeetingLocation = async () => {
    let res = await getData(MEETING_LOCATION);

    if (res) {
      let masterData = res?.data?.data;
      let meetingNames = [];
      masterData.forEach(item => {
        meetingNames.push(item.name);
      })
      setMeetingLocation(meetingNames);
    }
  }

  const localSubmit = (e, flag) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        setIsloading(true)
        let emails = [];
        emailList.forEach(item => {
          emails.push({ 'email': item })
        })

        let agenda = [];
        agendaList.forEach(item => {
          agenda.push({ 'title': item })
        })

        let members = [];
        teamMembersList.forEach(item => {
          members.push({ 'member': item.emp_id })
        })

        // "2023-05-10T18:20:00.000Z" to "10:20:00"
        // let start_time = moment(values.start_time).format('HH:mm:ss');
        // let end_time = moment(values.end_time).format('HH:mm:ss');
        //calculate meeting duration in hrs
        // "start_time": "10:20:00",
        // // "end_time": "10:30:00",
        let startTime = startMeetingTime?._i ? startMeetingTime?._i : startMeetingTime;
        let endTime = endMeetingTime?._i ? endMeetingTime?._i : endMeetingTime;

        // "start_time": "10:20:00",
        // "end_time": "10:30:00",
        let meetingDuration = moment(endTime, 'HH:mm:ss').diff(moment(startTime, 'HH:mm:ss'), 'hours', true);


        let payload = {
          ...values,
          id: meetingId ? meetingId : "",
          department_id: selectedDepartment,
          date: moment(values.date).format("YYYY-MM-DD"),
          start_time: startTime,
          end_time: endTime,
          repeats_till_date: moment(values.repeats_till_date).format("YYYY-MM-DD"),
          duration: meetingDuration ? parseInt(meetingDuration) : 0,
          actor: employeeId,
          status: flag === "Draft" ? "Draft" : "Pending",
          team_members: members,
          meeting_agendas: agenda,
          external_participants: emails
        }

        let url = MEETING_API;
        let res = await postData(url, payload);

        if (res) {
          let masterData = res?.data?.data;
          setIsloading(false)
          history.push('/meeting/my-meeting-list');
          alertPop('success', 'Meeting updated successfully')
        }
      }
      setIsloading(false);
    })
  }

  const getClientList = async () => {
    let res = await getData(CLIENT_DROPDOWN_LIST);

    if (res) {
      let masterData = res?.data?.data;
      setClientList(masterData);
    }
  }

  const getClientPOCList = async (clientId) => {
    let url = CLIENT_POC_LIST + "?client_id=" + clientId;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      setClientPOCList(masterData);
    }
  }

  useEffect(() => {
    getDepartmentList();
    getProjectList();
    getEmployeeList();
    getMeetingLocation();
    getClientList();
  }, [])

  useEffect(() => {
    if (meetingList) {

      if (meetingList.meeting_external_members) {
        let tempEmails = [];
        meetingList.meeting_external_members.forEach(item => tempEmails.push(item.email))
        setEmailList(tempEmails);
      }

      if (meetingList.meeting_agendas) {
        let tempAgenda = [];
        meetingList.meeting_agendas.forEach(item => tempAgenda.push(item.title))
        setAgendaList(tempAgenda)
      }

      if (meetingList.meeting_team_members) {
        let tempTeamMembers = [];
        if (employeeList) {
          employeeList.forEach(emp => {
            meetingList.meeting_team_members.forEach(mem => {
              if (emp.emp_id === mem.members.emp_id) tempTeamMembers.push(emp)
            })
          })
          setTeamMembersList(tempTeamMembers);
        }
      }

      setBusinessType(meetingList?.nature);
      setMeetingRepeats(meetingList?.repeats);
      setStartMeetingTime(moment(meetingList?.start_time, 'hh:mm a'));
      setEndMeetingTime(moment(meetingList?.end_time, 'hh:mm a'));
    }
  }, [meetingList, employeeList])

  useEffect(()=>{
    if(meetingList) {
      meetingList?.nature === 'Non-Business' && getFunctionNameList(meetingList?.function_type_id);
      meetingList?.nature === 'Business' && getMilestoneList(meetingList?.project_id);
      meetingList?.nature === 'Client' && getClientPOCList(meetingList?.client_id);
    }
  },[meetingList])

  useEffect(() => {
    if (projectId) getMilestoneList(projectId);
  }, [projectId])

  useEffect(() => {
    if (meetingId) getMeetingList(meetingId);
  }, [meetingId]);

  useEffect(() => {
    if (selectedDepartment) getFunctionTypeList(selectedDepartment);
  }, [selectedDepartment]);

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
            title="Update Meeting"
            // subTitle="Back to list"
            extra={[
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
                Update Meeting
              </Button>,
            ]}
          />
          <div className="my-2">
            <small className="meeting_heading_color">
              Meeting ID # {meetingId}
            </small>
            <Form.Item label={"Meeting Title"}>
              {form.getFieldDecorator("title", {
                rules: [{ required: true, message: "Required!" }],
                initialValue: meetingList ? meetingList?.title : undefined,
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
                      initialValue: meetingList?.date
                        ? moment(new Date(meetingList?.date))
                        : moment(),
                    })(<DatePicker placeholder="Enter date" size="large" />)}
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item label={"Start Time"}>
                    {form.getFieldDecorator("start_time", {
                      rules: [{ required: true, message: "Required!" }],
                      initialValue: meetingList?.start_time
                        ? moment(meetingList?.start_time, "hh:mm a")
                        : undefined,
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
                      initialValue: meetingList?.end_time
                        ? moment(meetingList?.end_time, "hh:mm a")
                        : undefined,
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
                      initialValue: meetingList?.department_id
                        ? meetingList?.department_id
                        : selectedDepartment
                        ? selectedDepartment
                        : undefined,
                    })(
                      <Select
                        allowClear={true}
                        size="large"
                        placeholder="Department Name"
                        showSearch
                        optionFilterProp="children"
                        disabled={meetingId ? true : false}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        onChange={(value) => setSelectedDepartment(value)}
                        // disabled={businessType === "Business" ? true : false}
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
                        initialValue: meetingList?.client_id
                          ? meetingList?.client_id
                          : undefined,
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
                        initialValue: meetingList?.client_poc
                          ? meetingList?.client_poc?.id
                          : undefined,
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
                        initialValue: meetingList?.project_id
                          ? meetingList?.project_id
                          : undefined,
                      })(
                        <Select
                          allowClear={true}
                          size="large"
                          placeholder="Project Name"
                          showSearch
                          // optionFilterProp="children"
                          onChange={(value) => setProjectId(value)}
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
                        initialValue: meetingList?.project_milestone_id
                          ? meetingList?.project_milestone_id
                          : undefined,
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
                            ? milestoneList.map((milestone) => (
                                <Select.Option
                                  value={milestone.project_milestone_id}
                                  key={milestone.project_milestone_id}
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
                        initialValue: meetingList?.function_type_id
                          ? meetingList?.function_type_id
                          : undefined,
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
                        initialValue: meetingList?.function_id
                          ? meetingList?.function_id
                          : undefined,
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
                      {form.getFieldDecorator("meeting_agendas", {
                        rules: [!agendaList?.length && { required: true, message: "Required!" }],
                        // initialValue: cardData?.name ? cardData?.name : undefined
                      })(
                        <Input
                          placeholder="Enter meeting agenda point"
                          size="large"
                          onChange={(event) => setAgenda(event.target.value)}
                        />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={3}>
                    <Button
                      size="large"
                      key="1"
                      type="primary"
                      style={{ margin: "30px 0px 0px 15px" }}
                      onClick={() => {
                        agendaList.splice(0, 0, agenda);
                        form.resetFields("meeting_agendas");
                      }}
                    >
                      Add
                    </Button>
                  </Col>
                </div>
              </Row>
              <Row>
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
              <Row>
                <h4 className="meeting_heading_color">Meeting Options</h4>
                <Form.Item label={"Meeting Type"}>
                  {form.getFieldDecorator("type", {
                    rules: [{ required: true, message: "Required!" }],
                    initialValue: meetingList?.type
                      ? meetingList?.type
                      : undefined,
                  })(
                    <Select
                      allowClear={false}
                      size="large"
                      placeholder="Meeting Type"
                      showSearch
                      disabled={meetingId ? true : false}
                      // value={selectedYear}
                      // onChange={(value)=>setSelectedMeetingType(value)}
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
                      disabled={meetingId ? true : false}
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      // value={selectedDepartment ? selectedDepartment : undefined }
                      onChange={(value) => setBusinessType(value)}
                    >
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
                    initialValue: meetingList?.meeting_location?.name
                      ? meetingList?.meeting_location?.name
                      : undefined,
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
                    initialValue: meetingList?.repeats
                      ? meetingList?.repeats
                      : undefined,
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
                      initialValue: meetingList?.repeats_till_date
                        ? moment(meetingList?.repeats_till_date, "hh:mm a")
                        : undefined,
                    })(
                      <DatePicker placeholder="Enter end date" size="large" />
                    )}
                  </Form.Item>
                ) : null}
              </Row>
              <Row>
                <h4 className="meeting_heading_color">Assignee Options</h4>
                <Form.Item label={"Actor"}>
                  {form.getFieldDecorator("actor", {
                    rules: [{ required: true, message: "Required!" }],
                    initialValue: meetingList?.actor
                      ? meetingList?.actor
                      : undefined,
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
                    initialValue: meetingList?.note_tracker
                      ? meetingList?.note_tracker
                      : undefined,
                  })(
                    <Select
                      allowClear={true}
                      size="large"
                      placeholder="Note Taker's Name"
                      showSearch
                      optionFilterProp="children"
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

                <Form.Item label={"Participant"}>
                  {form.getFieldDecorator("team_members", {
                    rules: [{ required: true, message: "Required!" }],
                    initialValue: teamMembersList?.map((data) => data?.emp_id),
                  })(
                    <Select
                      allowClear={true}
                      mode="multiple"
                      size="large"
                      placeholder="Participant's Name"
                      showSearch
                      optionFilterProp="children"
                      loading={isOptionsLoading}
                      // filterOption={(input, option) =>
                      //   option.props.children
                      //     .toLowerCase()
                      //     .indexOf(input.toLowerCase()) >= 0}
                      onChange={(value) => {
                        let tempArray = value.map((v) =>
                          employeeList.find((item) => item.emp_id === v)
                        );
                        // console.log('temp array ',tempArray);
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
                            <Col span={22}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "stretch",
                                }}
                              >
                                <Avatar
                                  src={item.profile_pic}
                                  size="large"
                                  className="mx-1"
                                />
                                <div>
                                  <p style={{ marginBottom: "0" }}>
                                    {item.name}
                                  </p>
                                  <p>{item.designation}</p>
                                </div>
                              </div>
                            </Col>
                            <Col span={2}>
                              <Icon
                                type="delete"
                                style={{
                                  color: "#F2473F",
                                  fontSize: "16px",
                                  marginTop: "20px",
                                }}
                                onClick={() => {
                                  setEmployeeInfo(
                                    employeeInfo?.filter(
                                      (e) => e.emp_id !== item.emp_id
                                    )
                                  );
                                  let tempArray = [...teamMembersList];
                                  tempArray.splice(index, 1);
                                 // console.log("temp array ", tempArray);
                                  setTeamMembersList(tempArray);
                                  form.setFieldsValue({team_members:tempArray?.length ? tempArray.map(data => data.emp_id): []})
                                }}
                              />
                            </Col>
                          </div>
                        );
                      })
                    : null}
                </Row>
              </Row>
              {meetingList?.type === "External" ? (
                <>
                  <Row>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Col span={21}>
                        <Form.Item label={"External Participant"}>
                          {form.getFieldDecorator("email", {
                            rules: [!emailList?.length && { required: true, message: "Required!" }]
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
                          style={{ margin: "30px 0px 0px 15px" }}
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
            </Col>
          </Row>
        </Form>
      </div>
    </Wrapper>
  );
})

export default MeetingUpdate;