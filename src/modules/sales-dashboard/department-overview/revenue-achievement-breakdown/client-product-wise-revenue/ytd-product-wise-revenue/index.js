import React from 'react';
import { Card } from 'antd';
import PieChartWithAction from './pie-chart-with-action';

const YTDProductWiseRevenue = ({data}) => {
  return (
    <Card 
        title="YTD Product Wise Revenue" 
        // extra={<a href="#">View Details</a>} 
        headStyle={{backgroundColor: '#E5F3FC', border: '1px solid #0184E6'}}
    >
        <PieChartWithAction chartData={data}/>
    </Card>
  )
}

export default YTDProductWiseRevenue;