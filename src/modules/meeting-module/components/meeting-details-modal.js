import { Avatar, Col, Modal, Radio, Row, Table } from "antd";
import orderBy from "lodash/orderBy";
import moment from "moment";
import React, { useState } from "react";
import sales_task from "../../../assets/icons/test/sales_task_icon.svg";

const MeetingDetailsModal = ({ modal, setModal, findMeetingDetails }) => {
  const [meetingDetails, setMeetingDetails] = useState(true);
  const [meetingTimes, setMeetingTimes] = useState(false);
  const [meetingPoints, setMeetingPoints] = useState(false);

  const handleMeetingGroupChange = (e) => {
    if (e.target.value === "meeting_minutes") {
      setMeetingDetails(false);
      setMeetingTimes(true);
      setMeetingPoints(false);
    } else if (e.target.value === "action_points") {
      setMeetingDetails(false);
      setMeetingTimes(false);
      setMeetingPoints(true);
    } else {
      setMeetingDetails(true);
      setMeetingTimes(false);
      setMeetingPoints(false);
    }
  };

  const modalTitle = (
    <div>
      <small>
        <span style={{ fontWeight: "normal", color: "blue" }}>
          Meeting Id:{" "}
        </span>
        <span style={{ fontWeight: "normal", color: "#888" }}>
          #{findMeetingDetails?.id}
        </span>
      </small>
      <div>{findMeetingDetails?.title}</div>
    </div>
  );

  const modalColumns = [
    {
      title: "Action Point",
      dataIndex: "action_point",
      key: "action_point",
    },
    {
      title: "Responsible Person",
      key: "responsible_person",
      render: (row) => {
        return (
          <div>
            <Avatar
              src={row?.assignee_info?.profile_pic}
              size="small"
              shape="circle"
              style={{ float: "left", marginRight: "5px" }}
            />
            <div>{row?.assignee_info?.name}</div>
          </div>
        );
      },
    },
    {
      title: "Due Date",
      dataIndex: "due_date",
      key: "due_date",
      render: (row) => moment(row).format("MMM D, YYYY"),
    },
  ];
  return (
    <Modal
      title={modalTitle}
      centered
      visible={modal}
      onCancel={() => setModal(false)}
      footer={false}
      width={800}
      zIndex={2000}
    >
      <Row>
        <Col
          span={16}
          style={{ borderRight: "1px solid #ddd", paddingRight: "10px" }}
        >
          <Radio.Group
            defaultValue="meeting_details"
            onChange={handleMeetingGroupChange}
          >
            <Radio.Button value="meeting_details">Meeting Details</Radio.Button>
            <Radio.Button value="meeting_minutes">Meeting Minutes</Radio.Button>
            <Radio.Button value="action_points">Action Points</Radio.Button>
          </Radio.Group>
          <br />
          <br />
          {meetingDetails && (
            <div>
              <h4 style={{ color: "blue", fontWeight: "normal" }}>
                Meeting Schedule
              </h4>
              <Row>
                <Col span={12}>
                  <small style={{ fontWeight: "normal", color: "#888" }}>
                    Meeting Date
                  </small>
                  <p style={{ color: "black" }}>
                    {moment(findMeetingDetails?.date).format("MMM D, YYYY")}
                  </p>
                </Col>
                <Col span={12}>
                  <small style={{ fontWeight: "normal", color: "#888" }}>
                    Duration
                  </small>
                  <p style={{ color: "black" }}>
                    {findMeetingDetails?.start_time} -{" "}
                    {findMeetingDetails?.end_time} (
                    {findMeetingDetails?.duration} minutes)
                  </p>
                </Col>
              </Row>
              <h4 style={{ color: "blue", fontWeight: "normal" }}>
                Meeting Agenda
              </h4>
              <ul style={{ paddingLeft: "2px" }}>
                {findMeetingDetails?.meeting_agendas?.length
                  ? orderBy(
                      findMeetingDetails?.meeting_agendas?.map((d, i) => ({
                        id: i,
                        data: d.title,
                      })),
                      "id",
                      "desc"
                    )?.map(({ id, data }, index) => {
                      return (
                        <div key={id}>
                          {index + 1}. {data}
                        </div>
                      );
                    })
                  : null}
              </ul>
              <div>
                {findMeetingDetails?.meeting_ideas?.length ? (
                  <h4 style={{ color: "blue", fontWeight: "normal" }}>
                    Meeting Ideas
                  </h4>
                ) : (
                  ""
                )}
                <ul style={{ paddingLeft: "16px" }}>
                  {findMeetingDetails?.meeting_ideas.length
                    ? findMeetingDetails?.meeting_ideas.map((row) => (
                        <li>{row?.name}</li>
                      ))
                    : ""}
                </ul>
              </div>
            </div>
          )}
          {meetingTimes && (
            <div>
              <h4 style={{ color: "blue", fontWeight: "normal" }}>
                Meeting Minute Story
              </h4>
              {findMeetingDetails?.meeting_minute_story ? (
                <div>
                  <br />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: findMeetingDetails?.meeting_minute_story,
                    }}
                  />
                </div>
              ) : (
                <LandingContent />
              )}
            </div>
          )}
          {meetingPoints && (
            <div>
              <div>
                <h4 style={{ color: "blue", fontWeight: "normal" }}>
                  Action Point Name
                </h4>
              </div>
              {/* <Table columns={modalColumns} dataSource={modalData} />; */}
              {findMeetingDetails?.meeting_action_points.length > 0 ? (
                <Table
                  rowKey={(record) => record.id}
                  dataSource={findMeetingDetails?.meeting_action_points}
                  columns={modalColumns}
                  // pagination={false}
                  scroll={{ y: "calc(100vh - 22rem)" }}
                  pagination={false}
                />
              ) : (
                <LandingContent />
              )}
            </div>
          )}
        </Col>
        <Col
          span={8}
          style={{ borderLeft: "1px solid #ddd", paddingLeft: "10px" }}
        >
          <h4 style={{ color: "blue", fontWeight: "normal" }}>
            Meeting Options
          </h4>
          <Row>
            <Col span={12}>
              <small style={{ fontWeight: "normal", color: "#888" }}>
                Meeting Time
              </small>
              <p style={{ color: "black" }}>{findMeetingDetails?.type}</p>
            </Col>
            <Col span={12}>
              <small style={{ fontWeight: "normal", color: "#888" }}>
                Meeting Nature
              </small>
              <p style={{ color: "black" }}>{findMeetingDetails?.nature}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <small style={{ fontWeight: "normal", color: "#888" }}>
                Project Name
              </small>
              <p style={{ color: "black" }}>
                {findMeetingDetails?.projects?.name}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <small style={{ fontWeight: "normal", color: "#888" }}>
                Milestone Name
              </small>
              <p style={{ color: "black" }}>
                {" "}
                {
                  findMeetingDetails?.project_milestone?.milestone?.full_name
                }{" "}
              </p>
            </Col>
          </Row>
          <h4 style={{ color: "blue", fontWeight: "normal" }}>
            Assignee Options
          </h4>
          <Row>
            <Col>
              <small style={{ fontWeight: "normal", color: "#888" }}>
                Actors
              </small>
              <div style={{ marginTop: "5px" }}>
                <Avatar
                  src={findMeetingDetails?.actor_info?.profile_pic}
                  size="small"
                  shape="circle"
                  style={{ float: "left", margin: "5px 5px 0 0" }}
                />
                <div style={{ color: "black" }}>
                  {findMeetingDetails?.actor_info?.name}
                  <small style={{ fontWeight: "normal", color: "#888" }}>
                    <p>{findMeetingDetails?.actor_info?.designation}</p>
                  </small>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <small style={{ fontWeight: "normal", color: "#888" }}>
                Notes Tracker
              </small>
              <div style={{ marginTop: "5px" }}>
                <Avatar
                  src={findMeetingDetails?.note_tracker_info?.profile_pic}
                  size="small"
                  shape="circle"
                  style={{ float: "left", margin: "5px 5px 0 0" }}
                />
                <div style={{ color: "black" }}>
                  {findMeetingDetails?.note_tracker_info?.name}
                  <small style={{ fontWeight: "normal", color: "#888" }}>
                    <p>{findMeetingDetails?.note_tracker_info?.designation}</p>
                  </small>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <small style={{ fontWeight: "normal", color: "#888" }}>
                Team Members
              </small>
              {findMeetingDetails?.meeting_team_members.length
                ? findMeetingDetails?.meeting_team_members.map((row) => (
                    <div style={{ marginTop: "5px" }}>
                      <Avatar
                        src={row?.members?.profile_pic}
                        size="small"
                        shape="circle"
                        style={{ float: "left", margin: "5px 5px 0 0" }}
                      />
                      <div style={{ color: "black" }}>
                        {row?.members?.name}
                        <small style={{ fontWeight: "normal", color: "#888" }}>
                          <p>{row?.members?.designation}</p>
                        </small>
                      </div>
                    </div>
                  ))
                : ""}
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
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

export default MeetingDetailsModal;
