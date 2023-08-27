import React from 'react';
import { Row, Col } from 'antd';
import IndustryWiseAchievement from './industry-wise-achievement';
import KAMWiseAchievement from './kam-wise-achievement';
import SMSClient from './sms-client';
import TopupClient from './topup-client';

const KAMWiseRevenue = ({data, industryKamWiseRevenueList}) => {
  return (
    <div>
        <Row className="m-4">
            <Col span={24} style={{display: 'flex',  justifyContent:'center', alignItems:'center', color: 'white', backgroundColor:'#0184E6'}}>
                <p style={{fontSize:'20px', margin: '0.5rem', fontWeight: 'bold'}}>KAM WISE REVENUE</p>
            </Col>
            <Col span={24}>
                <IndustryWiseAchievement data={industryKamWiseRevenueList}/>
            </Col>
            <Col span={24}>
                <KAMWiseAchievement data={industryKamWiseRevenueList}/>
            </Col>
        </Row>
        
        <Row className="m-4">
            <Col span={12}>
                <SMSClient pieChartData={data}/>
            </Col>
            <Col span={12}>
                <TopupClient pieChartData={data}/>
            </Col>
        </Row>
    </div>
  )
}

export default KAMWiseRevenue;