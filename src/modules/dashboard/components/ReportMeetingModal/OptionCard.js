/** @format */

import React from "react";
import { Row, Col } from "antd";

const CardTitle = ({ title }) => (
  <h4 style={{ color: "blue", fontWeight: "normal" }}>{title}</h4>
);

const CardColumn = ({ title, data }) => (
  <Col span={12}>
    <small style={{ fontWeight: "normal", color: "#888" }}>{title}</small>
    <p style={{ color: "black" }}>{data}</p>
  </Col>
);

const OptionCard = ({ cardTitle, colData }) => {
  return (
    <>
      {cardTitle && <CardTitle title={cardTitle} />}
      <Row>
        {colData.map(({ title, data }, index) => (
          <CardColumn key={`__${index.toString()}`} title={title} data={data} />
        ))}
      </Row>
    </>
  );
};

export default OptionCard;
