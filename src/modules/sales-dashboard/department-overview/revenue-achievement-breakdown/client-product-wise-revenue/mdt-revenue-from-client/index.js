import React from 'react';
import { Card } from 'antd';
import GroupColumnChart from './group-column-chart';

const MDTRevenueFromClient = ({data}) => {
  return (
    <Card 
      title="MDT Revenue From Client (Number)" 
      // extra={<a href="#">View Details</a>} 
      headStyle={{backgroundColor: '#E5F3FC', border: '1px solid #0184E6'}}
    >
      <GroupColumnChart chartData={data}/>
    </Card>
  )
}

export default MDTRevenueFromClient;