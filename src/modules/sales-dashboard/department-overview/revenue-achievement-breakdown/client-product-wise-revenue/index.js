import React from 'react';
import { Row, Col } from 'antd';
import MDTRevenueFromClient from './mdt-revenue-from-client';
import YTDProductWiseRevenue from './ytd-product-wise-revenue';
import TransactionTDRTrend from './transaction-tdr-trend';

const ClientProductWiseRevenue = ({data, yearlyProductWiseRevenue}) => {
  return (
    <div>
        <Row className="m-4">
            <Col span={24} style={{display: 'flex',  justifyContent:'center', alignItems:'center', color: 'white', backgroundColor:'#0184E6'}}>
                <p style={{fontSize:'20px', margin: '0.5rem', fontWeight: 'bold'}}>CLIENT & PRODUCT WISE REVENUE</p>
            </Col>
            <Col span={24}>
                <MDTRevenueFromClient data={data}/>
            </Col>
            <Col span={24}>
                <YTDProductWiseRevenue data={yearlyProductWiseRevenue}/>
            </Col>
        </Row>
        {/* <Row className="m-4">
            <Col span={24}>
                <TransactionTDRTrend />
            </Col>
        </Row> */}
    </div>
  )
}

export default ClientProductWiseRevenue;