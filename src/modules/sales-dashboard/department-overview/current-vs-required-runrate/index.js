import React from 'react';
import { Card } from 'antd';
import MultiLineMultiColumnChart from './multi-line-multi-column-chart';

const CurrentVsRequiredRunRate = () => {
  return (
    <Card style={{margin: '1.5rem'}}>
      <p style={{fontWeight: 'bold', color: 'black'}}>Current Vs Required Run Rate</p>
      <MultiLineMultiColumnChart />
    </Card>
  )
}

export default CurrentVsRequiredRunRate;