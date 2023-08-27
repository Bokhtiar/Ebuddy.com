/** @format */

import { Col, Row } from "antd";
import React from "react";
import StatusBarItem from "./StatusBarItem";
 
const StatusBarWithCategoryIndicator = () => {
  return (
    <Row>
      <Col span={24}>
        <div style={{ display: "flex", gap: "0.6rem" }}>
          <StatusBarItem status={"TODO"} />
          <StatusBarItem status={"WIP"} />
          <StatusBarItem status={"HOLD"} />
          <StatusBarItem status={"DONE"} />
          <StatusBarItem status={"DUE"} />
          <StatusBarItem status={"BEHIND"} />
          <StatusBarItem status={"TASK"} />
          <StatusBarItem status={"MEETING"} />
          <StatusBarItem status={"SOP"} />
        </div>
      </Col>
    </Row>
  );
};

export default StatusBarWithCategoryIndicator;
