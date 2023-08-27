import React from 'react';
import { Card } from 'antd';
import MultiLineChart from './multi-line-chart.js/index.js';

const RunRateOverview = ({data}) => {
  return (
    <Card 
      title="Run Rate Overview (BDT)" 
      headStyle={{backgroundColor:'#0184E6', textAlign: 'center', color:'white', fontWeight: 700}}
      style={{height: 350}}
    >
      <MultiLineChart chartData={data}/>
    </Card>
  )
}

export default RunRateOverview;