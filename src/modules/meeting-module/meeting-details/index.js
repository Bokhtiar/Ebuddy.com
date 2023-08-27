/** @format */

import {
  Avatar,
  Button,
  Col,
  Divider,
  Form,
  PageHeader,
  Row
} from "antd";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { MEETING_API } from "../../../scripts/api";
import { getData } from "../../../scripts/api-service";
import { calculateDuration } from "../../../scripts/helper";
import { Wrapper } from "../../commons/Wrapper";
import MeetingAgendaList from "../components/meeting-agenda-list";

const MeetingDetails = Form.create()(({ form }) => {
  let searchUrl = window.location.search;
  let params = new URLSearchParams(searchUrl);
  let meetingId = params.get("id");

  const [meetingList, setMeetingList] = useState();
  const [agendaList, setAgendaList] = useState([]);
  const history = useHistory();

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

  useEffect(() => {
    if (meetingId) getMeetingList(meetingId);
  }, [meetingId]);

  return (
    <Wrapper>
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)",
        }}
        onBack={() => history.push("/meeting/meeting-list")}
        title="Meeting Details"
        // subTitle="Back to list"
        extra={[
          <Button key="1" type="primary">
            <Link
              to={`/meeting/meeting-minutes?id=${meetingId}&status=${params.get(
                "status",
              )}`}
            >
              Meeting Minutes
            </Link>
          </Button>,
        ]}
      />
      <div className="mx-4 my-2">
        <small className="meeting_heading_color">
          Meeting ID # {meetingList?.id}
        </small>
        <h2>{meetingList?.title}</h2>
      </div>
      <Divider />
      <Form
        className="m-4"
        // onSubmit={localSubmit}
      >
        <Row gutter={16}>
          <Col span={16}>
            <h4 className="meeting_heading_color">Meeting Schedule</h4>
            <Row gutter={16}>
              <Col span={12}>
                <small>Meeting Date</small>
                <p>{meetingList?.date}</p>
              </Col>
              <Col span={12}>
                <small>Duration</small>
                <p>{`${meetingList?.start_time || '----'} - ${
                  meetingList?.end_time || '----'
                } ${calculateDuration(meetingList?.duration)}`}</p>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <h4 className="meeting_heading_color">Meeting Agenda</h4>
                <MeetingAgendaList agendaList={agendaList} /> 
              </Col>
            </Row>
          </Col>
          <Col span={8} style={{ borderLeft: "1px solid #ccc" }}>
            <div>
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

export default MeetingDetails;
