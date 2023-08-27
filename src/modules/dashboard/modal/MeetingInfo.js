import React from 'react'
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
  import moment from "moment";

const MeetingInfo = ({
    dataSource
}) => {
    return (
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
                        {moment(dataSource?.date).format("MMM D, YYYY")}
                    </p>
                </Col>
                <Col span={12}>
                    <small style={{ fontWeight: "normal", color: "#888" }}>
                        Duration
                    </small>
                    <p style={{ color: "black" }}>
                        {dataSource?.start_time} -{" "}
                        {dataSource?.end_time} (
                        {dataSource?.duration} Hour)
                    </p>
                </Col>
            </Row>
            <h4 style={{ color: "blue", fontWeight: "normal" }}>
                Meeting Agenda
            </h4>
            <ul style={{ paddingLeft: "16px" }}>
                {dataSource?.meeting_agendas.length
                    ? dataSource?.meeting_agendas.map((row) => (
                        <li>{row?.title}</li>
                    ))
                    : ""}
            </ul>
            <div>
                {dataSource?.meeting_ideas?.length ? (
                    <h4 style={{ color: "blue", fontWeight: "normal" }}>
                        Meeting Ideas
                    </h4>
                ) : ''}
                <ul style={{ paddingLeft: "16px" }}>
                    {dataSource?.meeting_ideas.length
                        ? dataSource?.meeting_ideas.map((row) => (
                            <li>{row?.name}</li>
                        ))
                        : ""}
                </ul>
            </div>
        </div>
    )
}

export default MeetingInfo