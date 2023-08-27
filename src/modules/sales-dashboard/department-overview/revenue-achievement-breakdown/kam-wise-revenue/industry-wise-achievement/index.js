import React, { useState } from 'react';
import { Card, Button, Modal } from 'antd';
import GroupColumnChart from './group-column-chart';
import { useHistory } from "react-router-dom";

const IndustryWiseAchievement = ({data}) => {
  const history = useHistory();

  return ( 
    <>
      <Card 
        title="Industry Wise Achievement" 
        extra={
          <Button
            type="primary"
            onClick={()=> history.push('/sales-dashboard/target-vs-aschievement-industry-wise')}
          >View Details</Button>
        } 
        headStyle={{backgroundColor: '#E5F3FC', border: '1px solid #0184E6'}}
      >
        <GroupColumnChart chartData={data}/>
      </Card>
    </>
    
  )
}

export default IndustryWiseAchievement;