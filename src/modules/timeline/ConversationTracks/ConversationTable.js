/** @format */

import { Avatar, Button, Col, Modal, Radio, Row, Table } from "antd";
import { debounce } from "lodash";
import ceil from "lodash/ceil";
import orderBy from "lodash/orderBy";
import moment from "moment";
import React, { useEffect, useState } from "react";
import sales_task from "../../../assets/icons/test/sales_task_icon.svg";
import { FIND_MEETING_BY_ID, MEETING_TRACKS } from "../../../scripts/api";
import { getData } from "../../../scripts/api-service";
import TaskList from "../../timeline/ConversationTracks/Task-list";

export const ConversationTable = ({
  selectedDate,
  searchQuery,
  mdDashboard,
}) => {
  const [conservationsData, setConservationsData] = React.useState([]);
  const [taskModal, setTaskModal] = useState();
  const [meetingId, setMeetingId] = useState();
  const [loading, setLoading] = useState(false);
  const [meetingNature, setMeetingNature] = useState("");
  const [status, setStatus] = useState("");
  const [delegated, setDelegated] = useState(0);
  const [findMeetingDetails, setFindMeetingDetails] = useState();
  const [modal, setModal] = useState();
  const [meetingDetails, setMeetingDetails] = useState(true);
  const [meetingTimes, setMeetingTimes] = useState(false);
  const [meetingPoints, setMeetingPoints] = useState(false);

  useEffect(() => {
    conservationData();
  }, [selectedDate, mdDashboard]);

  useEffect(() => {
    const handleSearch = debounce((value) => {
      conservationData();
    }, 500);

    handleSearch(searchQuery);

    return () => {
      handleSearch.cancel();
    };
  }, [searchQuery]);

  const columns = [
    {
      title: "SL",
      dataIndex: "key",
      key: "sl",
    },
    {
      title: "MEETING NAME",
      key: "meeting_name",
      render: (row) => (
        <span onClick={() => manageModal(row.meeting_id)}>
          {row.meeting_name}
        </span>
      ),
    },
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "ACTION POINT",
      dataIndex: "total_action_point",
      key: "total_action_point",
    },
    {
      title: "ACTION POINT PROGRESS",
      dataIndex: "action_point_progress",
      key: "action_point_progress",
      render: (action_point_progress) => {
        return (
          <>
            <p className="conversation_progress_p">
              Progress:&nbsp;
              <strong>
                {action_point_progress ? ceil(action_point_progress, 2) : "0"}
                &nbsp;%
              </strong>
            </p>
            <progress
              id="file"
              value={
                action_point_progress ? ceil(action_point_progress, 2) : "0"
              }
              max="100"
            >
              {" "}
              ${action_point_progress ? ceil(action_point_progress, 2) : "0"}%
            </progress>
          </>
        );
      },
    },
    {
      title: "TODO",
      dataIndex: "to-do",
      key: "to-do",
      render: (_, r) => {
        return (
          <p
            className="todo__cell"
            onClick={() => {
              if (r["to-do"] > 0) {
                setTaskModal(true);
                setMeetingId(r.meeting_id);
                setMeetingNature(r.nature);
                setStatus("To-Do");
                setDelegated(r.delegated);
              }
            }}
          >
            <span>{r["to-do"]}</span>
          </p>
        );
      },
    },
    {
      title: "WIP",
      dataIndex: "wip",
      key: "wip",
      render: (_, r) => {
        return (
          <p
            className="wip__cell"
            onClick={() => {
              if (r.wip > 0) {
                setTaskModal(true);
                setMeetingId(r.meeting_id);
                setMeetingNature(r.nature);
                setStatus("WIP");
                setDelegated(r.delegated);
              }
            }}
          >
            <span>{r.wip}</span>
          </p>
        );
      },
    },
    {
      title: "DONE",
      dataIndex: "done",
      key: "done",
      render: (_, r) => {
        return (
          <p
            className="done__cell"
            onClick={() => {
              if (r.done > 0) {
                setTaskModal(true);
                setMeetingId(r.meeting_id);
                setMeetingNature(r.nature);
                setStatus("Done");
                setDelegated(r.delegated);
              }
            }}
          >
            <span>{r.done}</span>
          </p>
        );
      },
    },
    {
      title: "LINKED MEETING",
      key: "linked_meeting",
      dataIndex: "linked_meeting",
      render: (value) => {
        return (
          <p
            className="linked_meeting__cell"
            style={{
              textAlign: "center",
            }}
          >
            <span>{value}</span>
          </p>
        );
      },
    },
    {
      title: "DELEGATED",
      key: "delegated",
      dataIndex: "delegated",
      render: (value) => {
        return (
          <p
            className="delegated__cell"
            style={{
              textAlign: "center",
            }}
          >
            <span>{value}</span>
          </p>
        );
      },
    },
  ];

  const conservationData = async () => {
    setLoading(true);
    let url = MEETING_TRACKS + "?md_dashboard=" + mdDashboard;
    if (selectedDate)
      url =
        url + "&from_date=" + selectedDate[0] + "&to_date=" + selectedDate[1];
    if (searchQuery) url = url + "&search=" + searchQuery;
    const { data } = await getData(url);
    // setConservationsData(data?.data);
    if (data) {
      const modifiedData = data?.data?.map((item, index) => {
        return {
          ...item,
          key: index + 1,
        };
      });
      setConservationsData(modifiedData);
    }
    setLoading(false);
  };

  const manageModal = (id) => {
    setModal(true);
    getMeetingById(id);
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

  const getMeetingById = async (id) => {
    let url = FIND_MEETING_BY_ID + "/" + id;
    let res = await getData(url);
    if (res) {
      let masterData = res?.data?.data;
      setFindMeetingDetails(masterData);
    }
  };

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

  const LandingContent = () => {
    return (
      <div className="landing-content mt-5" style={{ textAlign: "center" }}>
        <img src={sales_task} height="200" />
        <h2>No data found for the selection.</h2>
      </div>
    );
  };

  return (
    <>
      <Table
        loading={loading}
        columns={columns}
        dataSource={conservationsData}
      />
      <Modal
        width="70vw"
        bodyStyle={{ padding: "0px" }}
        visible={taskModal}
        title="Task List"
        onCancel={() => {
          setTaskModal(false);
        }}
        footer={[
          <Button type="primary" onClick={() => setTaskModal(false)}>
            Close
          </Button>,
        ]}
      >
        <TaskList
          meetingId={meetingId}
          status={status}
          meetingNature={meetingNature}
          delegated={delegated}
        ></TaskList>
      </Modal>
      <Modal
        title={modalTitle}
        centered
        visible={modal}
        onCancel={() => setModal(false)}
        footer={false}
        width={800}
      >
        <Row>
          <Col
            span={16}
            style={{ borderRight: "1px solid #ddd", paddingRight: "10px" }}
          >
            <Radio.Group onChange={handleMeetingGroupChange}>
              <Radio.Button value="meeting_details">
                Meeting Details
              </Radio.Button>
              <Radio.Button value="meeting_minutes">
                Meeting Minutes
              </Radio.Button>
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
                      <p>
                        {findMeetingDetails?.note_tracker_info?.designation}
                      </p>
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
                          <small
                            style={{ fontWeight: "normal", color: "#888" }}
                          >
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
    </>
  );
};
