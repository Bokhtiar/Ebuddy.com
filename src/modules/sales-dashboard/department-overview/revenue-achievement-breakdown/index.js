import React from 'react';
import { Row, Col } from 'antd';
import KAMWiseRevenue from './kam-wise-revenue';
import ClientProductWiseRevenue from './client-product-wise-revenue';
import NetProfitLoss from './net-profit-loss';

const RevenueAchievementBreakdown = ({topTenSMSTopTenClientData, kamWiseRevenueData, industryKamWiseRevenueList, yearlyProductWiseRevenue}) => {
  return (
    <div>
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop: '1rem'}}>
        <p style={{fontSize:'24px', margin: 0, fontWeight: 'bold', color: 'black'}}>REVENUE ACHIEVEMENT BREAKDOWN</p>
      </div>
      <Row>
        <Col span={24}>
          <KAMWiseRevenue data={topTenSMSTopTenClientData} industryKamWiseRevenueList={industryKamWiseRevenueList}/>
        </Col>
        <Col span={24}>
          <ClientProductWiseRevenue data={kamWiseRevenueData} yearlyProductWiseRevenue={yearlyProductWiseRevenue}/>
        </Col>
        {/* <Col span={24}>
          <NetProfitLoss />
        </Col> */}
      </Row>
    </div>
  )
}

export default RevenueAchievementBreakdown;