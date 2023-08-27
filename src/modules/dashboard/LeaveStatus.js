import React from "react";
import { Card, Typography } from "antd";

const LeaveStatus = props => {
  return (
    <Card
      size="small"
      title="Leave status"
      className="landing-card animated fadeInUp"
    >
      <div className="attendee-grid">
        {props.data.map(elem => {
          return (
            <div className="pad center-text">
              <Typography.Title
                style={{ lineHeight: "3px", paddingTop: "1rem" }}
                level={4}
              >
                {elem.quantity}
              </Typography.Title>
              <Typography.Text>{elem.leave_title}</Typography.Text>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default LeaveStatus;
