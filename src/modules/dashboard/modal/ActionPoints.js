/** @format */

import { Table } from "antd";
import React from "react";

const ActionPoints = ({ dataSource, columns }) => {
  return (
    <div>
      <div>
        <h4 style={{ color: "blue", fontWeight: "normal" }}>
          Action Point Name
        </h4>
      </div>
      {dataSource?.meeting_action_points.length > 0 ? (
        <Table
          rowKey={(record) => record.id}
          dataSource={dataSource}
          columns={columns}
          scroll={{ y: "calc(100vh - 22rem)" }}
          pagination={false}
        />
      ) : null}
    </div>
  );
};

export default ActionPoints;
