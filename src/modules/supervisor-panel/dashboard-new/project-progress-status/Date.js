import React from 'react';
import { Row, Col } from 'antd';
import moment from 'moment';

const Date = ({data}) => {

  let startDate = data.milestones[0]?.plan_start_date;
  let endDate = data.milestones?.slice(-1)[0]?.plan_end_date;
  let extendedDate = data.milestones?.slice(-1)[0]?.plan_end_date < data.milestones?.slice(-1)[0]?.actual_end_date ? data.milestones?.slice(-1)[0]?.actual_end_date : null;

  return (
    <div>
        <Row gutter={4} style={{display: 'flex', justifyContent:'space-between'}}>
            <Col span={10}><p><strong>Start</strong></p></Col>
            <Col span={10}><p>{startDate ? moment(startDate).format('DD/MM/YYYY') : 'Not found'}</p></Col>
        </Row>
        <Row gutter={4} style={{display: 'flex', justifyContent:'space-between'}}>
            <Col span={10}><p><strong>End</strong></p></Col>
            <Col span={10}><p>{endDate ? moment(endDate).format('DD/MM/YYYY') : 'Not found'}</p></Col>
        </Row>
        <Row gutter={4} style={{display: 'flex', justifyContent:'space-between'}}>
            <Col span={10}><p style={{color:'#F65A5A'}}><strong>Extended</strong></p></Col>
            <Col span={10}><p style={{color:'#F65A5A'}}>{extendedDate ? moment(extendedDate).format('DD/MM/YYYY') : 'Not found'}</p></Col>
        </Row>
    </div>
  )
}

export default Date;