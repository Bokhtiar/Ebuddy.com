/** @format */

import { Table } from "antd";
import React from "react";

const ActionPointTab = ({ meeting, modalColumns }) => {
  return (
    <div>
      <div>
        <h4 style={{ color: "blue", fontWeight: "normal" }}>Action Point</h4>
      </div>
      {/* <Table columns={modalColumns} dataSource={modalData} />; */}
      {meeting?.meeting_action_points.length > 0 ? (
        <Table
          rowKey={(record) => record.id}
          dataSource={meeting?.meeting_action_points}
          columns={modalColumns}
          // pagination={false}
          scroll={{ y: "calc(100vh - 22rem)" }}
          pagination={false}
        />
      ) : null}
    </div>
  );
};

export default ActionPointTab;
