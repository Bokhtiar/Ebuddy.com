/** @format */

import { Col, Row } from "antd";
import orderBy from "lodash/orderBy";
import moment from "moment";
import React from "react";

const MeetingDetailsTab = ({ meeting }) => {
  return (
    <div>
      <h4 style={{ color: "blue", fontWeight: "normal" }}>Meeting Schedule</h4>
      <Row>
        <Col span={12}>
          <small style={{ fontWeight: "normal", color: "#888" }}>
            Meeting Date
          </small>
          <p style={{ color: "black" }}>
            {moment(meeting?.date).format("MMM D, YYYY")}
          </p>
        </Col>
        <Col span={12}>
          <small style={{ fontWeight: "normal", color: "#888" }}>
            Duration
          </small>
          <p style={{ color: "black" }}>
            {meeting?.start_time} - {meeting?.end_time}
            {meeting?.duration ? `(${meeting?.duration} Minutes)` : null}
          </p>
        </Col>
      </Row>
      <h4 style={{ color: "blue", fontWeight: "normal" }}>Meeting Agenda</h4>
      <ul style={{ paddingLeft: "2px" }}>
        {meeting?.meeting_agendas?.length
          ? orderBy(
              meeting?.meeting_agendas.map((d, i) => ({
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
        {meeting?.meeting_ideas?.length ? (
          <h4 style={{ color: "blue", fontWeight: "normal" }}>Meeting Ideas</h4>
        ) : (
          ""
        )}
        <ul style={{ paddingLeft: "16px" }}>
          {meeting?.meeting_ideas.length
            ? meeting?.meeting_ideas.map((row) => <li>{row?.name}</li>)
            : ""}
        </ul>
      </div>
    </div>
  );
};

export default MeetingDetailsTab;
