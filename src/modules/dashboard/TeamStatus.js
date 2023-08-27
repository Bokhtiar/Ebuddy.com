import React, { Component } from "react";
import { Card, Typography } from "antd";

const TeamStatus = props => {
  const {
    total_employee_absent,
    total_employee,
    total_employee_on_leave,
    total_employee_at_office,
    total_employee_at_out_duty
  } = props.data;

  return (
    <Card
      size="small"
      title="Team status"
      className="landing-card animated fadeInUp delay-3s"
    >
      <div className="attendee-grid">
        <div className="pad center-text">
          <Typography.Title
            style={{ lineHeight: "1px", paddingTop: "1rem" }}
            level={4}
          >
            {total_employee}
          </Typography.Title>
          <Typography.Text>Total</Typography.Text>
        </div>
        <div className="pad center-text">
          <Typography.Title
            style={{ lineHeight: "1px", paddingTop: "1rem" }}
            level={4}
          >
            {total_employee_at_office}
          </Typography.Title>
          <Typography.Text>In office</Typography.Text>
        </div>
        {/* <i class="material-icons">keyboard_arrow_up</i> */}
        <div className="pad center-text">
          <Typography.Title
            style={{ lineHeight: "1px", paddingTop: "1rem" }}
            level={4}
          >
            {total_employee_at_out_duty}
          </Typography.Title>
          <Typography.Text>Out office</Typography.Text>
        </div>
        <div className="pad center-text">
          <Typography.Title
            style={{ lineHeight: "1px", paddingTop: "1rem" }}
            level={4}
          >
            {total_employee_on_leave}
          </Typography.Title>
          <Typography.Text>On leave</Typography.Text>
        </div>
        <div className="pad center-text">
          <Typography.Title
            style={{ lineHeight: "1px", paddingTop: "1rem" }}
            level={4}
          >
            {total_employee_absent}
          </Typography.Title>
          <Typography.Text>Absent</Typography.Text>
        </div>
      </div>
    </Card>
  );
};

export default TeamStatus;
