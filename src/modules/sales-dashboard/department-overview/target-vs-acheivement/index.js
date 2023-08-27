import React from 'react';
import { Card } from 'antd';
import MultiLineMultiColumnChart from './multi-line-multi-column-chart';

const TargetVsAchievement = ({data, year}) => {
  return (
    <Card style={{margin: '1.5rem'}}>
      <p style={{fontWeight: 'bold', color: 'black'}}>Target Vs Achievement</p>
      <MultiLineMultiColumnChart chartData={data} year={year}/>
    </Card>
  )
}

export default TargetVsAchievement;