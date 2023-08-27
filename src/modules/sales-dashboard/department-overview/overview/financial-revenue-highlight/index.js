import React from 'react';
import { Card } from 'antd';
import ColumnChart from './column-chart';

const FinancialRevenueHightlight = ({data}) => {
  return (
    <Card 
      title="Financial Revenue Highlight (BDT)" 
      headStyle={{backgroundColor:'#0184E6', textAlign: 'center', color:'white', fontWeight: 700}}
      style={{height: 350}}
    >
      <ColumnChart chartData={data}/>
    </Card>
  )
}

export default FinancialRevenueHightlight;