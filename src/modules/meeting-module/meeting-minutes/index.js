/** @format */

import {
  Avatar,
  Badge,
  Button,
  Col,
  Divider,
  Form,
  Icon,
  Input,
  PageHeader,
  Row,
  Select,
  Switch,
} from "antd";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useHistory } from "react-router-dom";
import uuid from "uuid/v4";
import {
  MEETING_API,
  MEETING_MINUTE_API,
  USER_LIST,
} from "../../../scripts/api";
import { getData, postData } from "../../../scripts/api-service";
import { calculateDuration } from "../../../scripts/helper";
import { alertPop } from "../../../scripts/message";
import { Wrapper } from "../../commons/Wrapper";
import MeetingAgendaList from "../components/meeting-agenda-list";
import { ActionType } from "./ActionType";
// import '../../../styles/meeting.scss'

const MeetingMinutes = Form.create()(({ form }) => {
  let searchUrl = window.location.search;
  let params = new URLSearchParams(searchUrl);
  let meetingId = params.get("id");

  const [meetingList, setMeetingList] = useState();
  const [employeeList, setEmployeeList] = useState();
  const [teamMembersList, setTeamMembersList] = useState([]);
  const [employeeInfo, setEmployeeInfo] = useState();
  const [hasMeetingIdea, setHasMeetingIdea] = useState(false);
  const [newIdeas, setNewIdeas] = useState([]);
  const [newIdeaList, setNewIdeaList] = useState([]);
  const [agendaList, setAgendaList] = useState([]);
  const [isLoading,setIsLoading] = useState(false);

  const [actionName, setActionName] = useState(ActionType.DEFAULT);

  const history = useHistory();

  const modules = {
    toolbar: {
      container: "#toolbar",
    },
  };

  const getMeetingList = async (id) => {
    let url = MEETING_API + "/" + id;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      setMeetingList(masterData);

      if (masterData?.meeting_agendas) {
        let tempAgenda = [];
        masterData.meeting_agendas.forEach(item => tempAgenda.push(item.title))
        setAgendaList(tempAgenda)
      }
    }
  };

  const getEmployeeList = async () => {
    let res = await getData(USER_LIST);

    if (res) {
      let masterData = res?.data?.data;
      setEmployeeList(masterData);
    }
  };

  const localSubmit = (e) => {
    // console.log(e);
    e.preventDefault();
    form.validateFields(async (err, values) => {
      console.log(err, values);
      if (!err) {
        setIsLoading(true);
        let members = [];
        let meetingIdeas = [];

        teamMembersList.forEach((item) => {
          members.push({ people: item.emp_id });
        });

        newIdeaList.forEach((item) => {
          meetingIdeas.push({
            name: item.name,
          });
        });

        delete values.meeting_idea;
        if (employeeInfo) {
          teamMembersList.splice(0, 0, employeeInfo);

          form.resetFields("acknowledgement_people");
        }

        let payload = {
          ...values,
          has_meeting_idea: hasMeetingIdea === true ? 1 : 0,
          acknowledgement_people: members,
          meeting_ideas: meetingIdeas,
        };

       // history.push(`/meeting/meeting-action-points?id=${meetingId}`);
        let url = MEETING_MINUTE_API(meetingId);
        let res = await postData(url, payload);

        if (res) {
          history.push(`/meeting/meeting-action-points?id=${meetingId}`);
          if (actionName === ActionType.MEETING_MINUTES) {
            alertPop("success", "Meeting minute updated successfully");
          }
        }
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getEmployeeList();
  }, []);

  useEffect(() => {
    getMeetingList(meetingId);
  }, [meetingId]);

  useEffect(() => {
    if (meetingId && meetingList) {
      console.log("has_meeting_idea>>>", meetingList?.has_meeting_idea);
      setHasMeetingIdea(meetingList?.has_meeting_idea);
      // form.setFieldsValue({
      //   meeting_idea: meetingList?.meeting_ideas ? meetingList?.meeting_ideas : undefined,
      // })
      setNewIdeaList(meetingList?.meeting_ideas);
    }
  }, [meetingList]);

  return (
    <Wrapper>
      <Form className="m-4" onSubmit={localSubmit}>
        <PageHeader
          style={{
            border: "1px solid rgb(235, 237, 240)",
          }}
          onBack={() => history.push("/meeting/meeting-list")}
          title="Meeting Deatils"
          // subTitle="Back to list"
          extra={[
            <Button
              onClick={() =>
                setActionName(
                  meetingList?.meeting_minute_story
                    ? ActionType.ACTION_POINT
                    : ActionType.MEETING_MINUTES,
                )
              }
              key="1"
              type="primary"
              htmlType="submit"
              loading={isLoading}
            >
              {meetingList?.meeting_minute_story
                ? "Action Point"
                : "Submit Meeting Minutes"}
            </Button>,
            meetingList?.meeting_minute_story &&
            params.get("status") != "Publish" ? (
              <Button
                onClick={() => setActionName(ActionType.MEETING_MINUTES)}
                key="2"
                type="primary"
                htmlType="submit"
              >
                {"Update Meeting Minutes"}
              </Button>
            ) : null,
          ]}
        />
        <div className="my-2">
          <small className="meeting_heading_color">
            Meeting ID # {meetingList?.id}
          </small>
          <h2>{meetingList?.title}</h2>
        </div>
        <Divider className="my-2" />
        <Row gutter={16}>
          <Col span={16}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Form.Item label={""}>
                {form.getFieldDecorator("meeting_idea_switch", {
                  valuePropName: "checked",
                  initialValue: meetingList?.has_meeting_idea
                    ? meetingList?.has_meeting_idea
                    : undefined,
                  // rules: [{required: true, message: "Required!"}],
                  // initialValue: meetingList?.has_meeting_idea ? meetingList?.has_meeting_idea : undefined
                })(
                  <Switch
                    size="small"
                    checkedChildren={<Icon type="check" />}
                    unCheckedChildren={<Icon type="close" />}
                    style={{ margin: "0.8rem 0.5rem 0" }}
                    onChange={(checked) => {
                      // setHasMeetingIdea(!hasMeetingIdea);
                      setHasMeetingIdea(!hasMeetingIdea);
                    }}
                    disabled={meetingList?.has_meeting_idea}
                  />,
                )}
              </Form.Item>
              <h2>Is there any idea comes from this meeting?</h2>
            </div>
            {hasMeetingIdea ? (
              <>
                {!meetingList?.meeting_minute_story ? (
                  <Row
                    gutter={16}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Col span={20}>
                      <Form.Item label={"Idea"}>
                        {form.getFieldDecorator("meeting_idea", {
                          rules: [
                            {
                              required: hasMeetingIdea && !newIdeaList.length,
                              message: "Required!",
                            },
                          ],
                          // initialValue: undefined
                        })(
                          <Input
                            placeholder="Enter Meeting ideas"
                            size="large"
                            onChange={(event) =>
                              setNewIdeas({
                                id: uuid(),
                                name: event?.target?.value,
                              })
                            }
                          />,
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <Button
                        size="large"
                        key="1"
                        type="primary"
                        style={{ marginTop: "15px" }}
                        onClick={() => {
                          if (newIdeas?.name)
                            setNewIdeaList([...newIdeaList, newIdeas]);
                          form.resetFields("meeting_idea");
                        }}
                        disabled={!newIdeas?.name}
                      >
                        Add
                      </Button>
                    </Col>
                  </Row>
                ) : null}
                <Row>
                  {newIdeaList?.length > 0 ? <h3>Idea List</h3> : null}
                  {newIdeaList
                    ? newIdeaList?.map((item, index) => {
                        return (
                          <div
                            key={`all-questions-id-${index}`}
                            className="my-3"
                          >
                            <Col span={22}>
                              <Badge status="processing" text={item.name} />
                            </Col>
                            {!meetingList?.meeting_minute_story ? (
                              <Col>
                                <Icon
                                  type="delete"
                                  style={{
                                    color: "#F2452F",
                                    fontSize: "1.5rem",
                                  }}
                                  onClick={() => {
                                    let tempArray = [...newIdeaList];
                                    tempArray.splice(index, 1);
                                    setNewIdeaList(tempArray);
                                    setNewIdeas();
                                  }}
                                />
                              </Col>
                            ) : null}
                          </div>
                        );
                      })
                    : null}
                </Row>
              </>
            ) : null}
            <Divider className="my-3" />

            <h4 className="meeting_heading_color">Meeting Minutes</h4>
            <Form.Item label={"Description/Story"}>
              {form.getFieldDecorator("meeting_minute_story", {
                rules: [{ required: true, message: "Required!" }],
                initialValue: meetingList?.meeting_minute_story
                  ? meetingList?.meeting_minute_story
                  : undefined,
                // })(<Input.TextArea placeholder="Enter description" rows={15} disabled={meetingList?.meeting_minute_story ? true : false}/>)}
              })(
                <ReactQuill
                  className="meeting-editor"
                  theme="snow"
                  readOnly={false}
                  modules={{
                    toolbar: [
                      [{ font: [] }],
                      [{ size: [] }],
                      ["bold", "italic", "underline", "strike", "blockquote"],
                      [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                      ],
                    ],
                    clipboard: {
                      // toggle to add extra line breaks when pasting HTML:
                      matchVisual: false,
                    },
                  }}
                  formats={[
                    "header",
                    "font",
                    "size",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "list",
                    "bullet",
                    "indent",
                    "link",
                    "image",
                    "video",
                  ]}
                />,
              )}
            </Form.Item>
            <div>
              <h4 className="meeting_heading_color">For Acknowledgement</h4>
              <Row
                gutter={16}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Col span={21}>
                  <Form.Item label={"Additional Acknowledgement People List"}>
                    {form.getFieldDecorator("acknowledgement_people", {
                      // initialValue: cardData?.name ? cardData?.name : undefined
                    })(
                      <Select
                        allowClear={true}
                        mode="multiple"
                        size="large"
                        placeholder="Team Members Name"
                        showSearch
                        optionFilterProp="children"
                        // filterOption={(input, option) =>
                        //   option.props.children
                        //     .toLowerCase()
                        //     .indexOf(input.toLowerCase()) >= 0
                        // }
                        onChange={(value) => {
                          // console.log({ value });
                           let tempArray = value.map((v) =>
                             employeeList.find((item) => item.emp_id === v)
                           );
                           //console.log({ tempArray });
                           setEmployeeInfo(tempArray);
                           setTeamMembersList(tempArray);
                         }}
                        disabled={
                          meetingList?.meeting_minute_story ? true : false
                        }
                      >
                        {employeeList?.map((employee) => (
                          <Select.Option
                            value={employee.emp_id}
                            key={employee.emp_id}
                          >
                            {employee.name}
                          </Select.Option>
                        ))}
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
                {/* <Col span={3}>
                  <Button
                    size="large"
                    key="1"
                    type="primary"
                    style={{ marginTop: "15px" }}
                    onClick={() => {
                      if (employeeInfo)
                        teamMembersList.splice(0, 0, employeeInfo);
                      form.resetFields("acknowledgement_people");
                    }}
                  >
                    Add
                  </Button>
                </Col> */}
              </Row>
              <Row>
                <Col span={24}>
                  <small>{`${
                    meetingList?.meeting_team_members
                      ? meetingList?.meeting_team_members?.length
                      : 0
                  } attending team members already received this meeting minutes`}</small>
                </Col>
              </Row>
              <Row className="my-4">
                {teamMembersList
                  ? teamMembersList.map((item, index) => {
                      return (
                        <div key={`teamMembers-${index}`}>
                          <Col span={23}>
                            <div style={{ display: "flex" }}>
                              <Avatar
                                src={item.profile_pic}
                                size="large"
                                className="mx-1"
                              />
                              <div>
                                <p style={{ marginBottom: 0 }}>{item.name}</p>
                                <p>{item.designation}</p>
                              </div>
                            </div>
                          </Col>
                          <Col span={1}>
                            <Icon
                              type="delete"
                              style={{ color: "#F2473F", fontSize: "20px" }}
                              onClick={() => {
                                setEmployeeInfo(
                                  employeeInfo.filter(
                                    (e) => e.emp_id !== item.emp_id
                                  )
                                );
                                let tempArray = [...teamMembersList];
                                tempArray.splice(index, 1);
                                setTeamMembersList(tempArray);
                                form.setFieldsValue({acknowledgement_people:tempArray?.length ? tempArray.map(data => data.emp_id): []})
                              }}
                            />
                          </Col>
                        </div>
                      );
                    })
                  : null}
              </Row>
            </div>
          </Col>
          <Col span={8} style={{ borderLeft: "1px solid #ccc" }}>
            <div>
              <h4 className="meeting_heading_color">Meeting Schedule</h4>
              <Row gutter={16}>
                <Col span={12}>
                  <small>Meeting Date</small>
                  <p>{meetingList?.date}</p>
                </Col>
                <Col span={12}>
                  <small>Duration</small>
                  <p>{`${meetingList?.start_time} - ${
                    meetingList?.end_time
                  } (${calculateDuration(meetingList?.duration)})`}</p>
                </Col>
              </Row>
              <h4 className="meeting_heading_color">Meeting Options</h4>
              <Col span={12}>
                <small>Meeting Type</small>
                <p>{meetingList?.type}</p>
              </Col>
              <Col span={12}>
                <small>Meeting Nature</small>
                <p>{meetingList?.nature}</p>
              </Col>
              {meetingList?.nature === "Business" ? (
                <>
                  <Col span={24}>
                    <small>Project Name</small>
                    <p>{meetingList?.projects?.name}</p>
                  </Col>
                  <Col span={24}>
                    <small>Milestone Name</small>
                    <p>{meetingList?.projects?.name}</p>
                  </Col>
                </>
              ) : (
                <>
                  <Col span={24}>
                    <small>Function Type</small>
                    <p>{meetingList?.function_type?.name}</p>
                  </Col>
                  <Col span={24}>
                    <small>Function Name</small>
                    <p>{meetingList?.function_activity?.name}</p>
                  </Col>
                </>
              )}
            </div>
            <h4 className="meeting_heading_color">Meeting Agenda</h4>
            <Col span={24}>
              <MeetingAgendaList agendaList={agendaList} /> 
            </Col>
            <div>
              <h4 className="meeting_heading_color">Assignee Options</h4>
              <Col span={24}>
                <small>Actor</small>
                <p>{meetingList?.actor_info?.name}</p>
              </Col>
              <Col span={24}>
                <small>Note Taker</small>
                <p>{meetingList?.note_tracker_info?.name}</p>
              </Col>
            </div>
            <div>
              <small>Team Members</small>
              <Row>
                {meetingList?.meeting_team_members
                  ? meetingList?.meeting_team_members?.map((item, index) => {
                      return (
                        <div key={`teamMembers-${index}`}>
                          <Col span={23}>
                            <div
                              style={{ display: "flex", alignItems: "stretch" }}
                            >
                              <Avatar
                                src={item.members?.profile_pic}
                                size="large"
                                className="mx-1"
                              />
                              <div>
                                <p style={{ marginBottom: "0" }}>
                                  {item.members?.name}
                                </p>
                                <p>{item.members?.designation}</p>
                              </div>
                            </div>
                          </Col>
                        </div>
                      );
                    })
                  : null}
              </Row>
            </div>
          </Col>
        </Row>
      </Form>
    </Wrapper>
  );
});

export default MeetingMinutes;
