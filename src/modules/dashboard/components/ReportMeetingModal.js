/** @format */

import React from "react";
// import { Modal, PageHeader, Form, Divider, Row, Col, Avatar, Badge, Radio } from "antd";
import { Wrapper } from "../../commons/Wrapper";
import { calculateDuration } from "../../../scripts/helper";
// import { useState } from 'react';
import { useEffect, useState } from "react";
import moment from "moment";
import {
  PageHeader,
  Select,
  Button,
  Modal,
  Table,
  Divider,
  Tooltip,
  Popover,
  DatePicker,
  Row,
  Col,
  Radio,
  Avatar,
} from "antd";
import MeetingDetailsTab from "./ReportMeetingModal/MeetingDetailsTab";
import ActionPointTab from "./ReportMeetingModal/ActionPointTab";
import OptionCard from "./ReportMeetingModal/OptionCard";
import MeetingMinutesTab from "./ReportMeetingModal/MeetingMinutesTab";

const ReportMeetingModal = ({ isVisible = false, closeModal, meeting }) => {
  // console.log({ meeting });
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
  useEffect(() => setVisible(isVisible), [isVisible]);
  const [visible, setVisible] = useState(false);
  // const history = useHistory();
  const [meetingTimes, setMeetingTimes] = useState(false);
  const [meetingPoints, setMeetingPoints] = useState(false);

  const [meetingDetails, setMeetingDetails] = useState(true);

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
  return (
    <Modal
      title={meeting?.title}
      visible={isVisible}
      onOk={closeModal}
      onCancel={closeModal}
      width={800}
    >
      <Row>
        <Col
          span={16}
          style={{ borderRight: "1px solid #ddd", paddingRight: "10px" }}
        >
          <Radio.Group onChange={handleMeetingGroupChange}>
            <Radio.Button value="meeting_details">Meeting Details</Radio.Button>
            <Radio.Button value="meeting_minutes">Meeting Minutes</Radio.Button>
            <Radio.Button value="action_points">Action Points</Radio.Button>
          </Radio.Group>
          <br />
          <br />
          {meetingDetails ? (
            <MeetingDetailsTab meeting={meeting} />
          ) : (
            console.log({ meeting })
          )}
          {meetingTimes && <MeetingMinutesTab meeting={meeting} />}
          {meetingPoints && (
            <ActionPointTab meeting={meeting} modalColumns={modalColumns} />
          )}
        </Col>
        <Col
          span={8}
          style={{ borderLeft: "1px solid #ddd", paddingLeft: "10px" }}
        >
          <OptionCard
            cardTitle={"Meeting Options"}
            colData={[
              { title: "Meeting Time", data: meeting?.type },
              { title: "Meeting Nature", data: meeting?.nature },
            ]}
          />

          <OptionCard
            colData={[
              { title: "Project Name", data: meeting?.projects?.name },
              {
                title: "Milestone Name",
                data: meeting?.project_milestone?.milestone?.full_name,
              },
            ]}
            cardTitle={false}
          />

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
                  src={meeting?.actor_info?.profile_pic}
                  size="small"
                  shape="circle"
                  style={{ float: "left", margin: "5px 5px 0 0" }}
                />
                <div style={{ color: "black" }}>
                  {meeting?.actor_info?.name}
                  <small style={{ fontWeight: "normal", color: "#888" }}>
                    <p>{meeting?.actor_info?.designation}</p>
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
                  src={meeting?.note_tracker_info?.profile_pic}
                  size="small"
                  shape="circle"
                  style={{ float: "left", margin: "5px 5px 0 0" }}
                />
                <div style={{ color: "black" }}>
                  {meeting?.note_tracker_info?.name}
                  <small style={{ fontWeight: "normal", color: "#888" }}>
                    <p>{meeting?.note_tracker_info?.designation}</p>
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
              {meeting?.meeting_team_members.length
                ? meeting?.meeting_team_members.map((row) => (
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
    // <Modal
    // title="Meeting Details"
    // visible={isVisible}
    // onOk={closeModal}
    // onCancel={closeModal}
    // width={'80%'}
    // // onCancel={this.handleCancel}
    // >
    //   <div className="mx-4 my-2">
    //     <small className="meeting_heading_color">Meeting ID # {meeting?.id}</small>
    //     <h2>{meeting?.title}</h2>
    //   </div>
    //   <Divider />
    //   <Form
    //     className="m-4"
    //   // onSubmit={localSubmit}
    //   >
    //     <Row gutter={16}>
    //       <Col span={16}>
    //         <h4 className="meeting_heading_color">Meeting Schedule</h4>
    //         <Row gutter={16}>
    //           <Col span={12}>
    //             <small>Meeting Date</small>
    //             <p>{meeting?.date}</p>
    //           </Col>
    //           <Col span={12}>
    //             <small>Duration</small>
    //             <p>{`${meeting?.start_time} - ${meeting?.end_time} ${calculateDuration(meeting?.duration)}`}</p>
    //           </Col>
    //         </Row>
    //         <Row gutter={16}>
    //           <h4 className="meeting_heading_color">Meeting Agenda</h4>
    //           <Col span={24}>
    //             {meeting?.meeting_agendas ?
    //               meeting?.meeting_agendas?.map((item, index) => {
    //                 return (
    //                   <p key={`meeting-agenda-${index}`}>
    //                     <Badge status="processing" text={item.title} />
    //                   </p>
    //                 )
    //               })
    //               : null}
    //           </Col>
    //         </Row>
    //       </Col>
    //       <Col span={8} style={{ borderLeft: '1px solid #ccc' }}>
    //         <div>
    //           <h4 className="meeting_heading_color">Meeting Options</h4>
    //           <Col span={12}>
    //             <small>Meeting Type</small>
    //             <p>{meeting?.type}</p>
    //           </Col>
    //           <Col span={12}>
    //             <small>Meeting Nature</small>
    //             <p>{meeting?.nature}</p>
    //           </Col>
    //           {meeting?.nature === "Business" ?
    //             <>
    //               <Col span={24}>
    //                 <small>Project Name</small>
    //                 <p>{meeting?.projects?.name}</p>
    //               </Col>
    //               <Col span={24}>
    //                 <small>Milestone Name</small>
    //                 <p>{meeting?.projects?.name}</p>
    //               </Col>
    //             </>
    //             :
    //             <>
    //               <Col span={24}>
    //                 <small>Function Type</small>
    //                 <p>{meeting?.function_type?.name}</p>
    //               </Col>
    //               <Col span={24}>
    //                 <small>Function Name</small>
    //                 <p>{meeting?.function_activity?.name}</p>
    //               </Col>
    //             </>
    //           }
    //         </div>
    //         <div>
    //           <h4 className="meeting_heading_color">Assignee Options</h4>
    //           <Col span={24}>
    //             <small>Actor</small>
    //             <p>{meeting?.actor_info?.name}</p>
    //           </Col>
    //           <Col span={24}>
    //             <small>Note Taker</small>
    //             <p>{meeting?.note_tracker_info?.name}</p>
    //           </Col>
    //         </div>
    //         <div>
    //           <small>Team Members</small>
    //           <Row>
    //             {meeting?.meeting_team_members ?
    //               meeting?.meeting_team_members?.map((item, index) => {
    //                 return (
    //                   <div key={`teamMembers-${index}`}>
    //                     <Col span={23}>
    //                       <div style={{ display: 'flex', alignItems: 'stretch' }}>
    //                         <Avatar src={item.members?.profile_pic} size="large" className="mx-1" />
    //                         <div>
    //                           <p style={{ marginBottom: '0' }}>{item.members?.name}</p>
    //                           <p>{item.members?.designation}</p>
    //                         </div>
    //                       </div>
    //                     </Col>
    //                   </div>
    //                 )
    //               })
    //               : null}
    //           </Row>
    //         </div>
    //       </Col>
    //     </Row>
    //   </Form>

    // </Modal>
  );
};

export default ReportMeetingModal;
