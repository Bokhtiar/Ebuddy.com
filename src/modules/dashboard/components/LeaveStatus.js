import React from 'react';
import { Card, Row, Col } from 'antd';
import moment from 'moment';

export default function LeaveStatusAll({data}) {
  return (
    <Card className="landing-card animated fadeInUp leave-status">
      <p className="mb-0 gray">{moment().format("YYYY")}</p>
      <h3 className="bold">Leave Status</h3>
      <Row gutter={16} className="mt-4">
        {data ? 
          data.map((leave, index, array) =>{
            return(
              <Col span={index === array.length - 1 ? 4 : 5}>
                <h3 className="bold">{leave.quantity}</h3>
                <p className="gray">{leave.leave_title}</p>
              </Col>
          )})
        :null}
      </Row>
    </Card>
  )
}
