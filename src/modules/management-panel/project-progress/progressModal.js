import React, { useState, useEffect } from 'react';
import { Button, Progress, Row, Col } from "antd";
import { Chart } from "react-google-charts";

const ProgressModal = ({setModal, activities, milestoneData}) => {

  const [chartData, setChartData] = useState();

  const chartColumns = [
    { type: "string", label: "Task ID" },
    { type: "string", label: "Task Name" },
    { type: "string", label: "Status" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "Duration" },
    { type: "number", label: "Percent Complete" },
    { type: "string", label: "Dependencies" },
  ];
        
  
  const options = {
      height: 400,
      gantt: {
        labelStyle: {
            fontSize: 14,
            color: '#757575'
          },
        trackHeight: 40,
        criticalPathEnabled: false,
      }
  };

  useEffect(()=>{
    let tempArray = [];
    if(activities){
      activities.forEach(item=>{
        let payload = [
          `item.id-${item.id}`,
          item.code,
          item.status,
          new Date(item.start_date.split("-").join(",")),
          new Date(item.due_date.split("-").join(",")),
          null,
          100,
          null
        ];
        tempArray.push(payload);
      })
      const data = [chartColumns, ...tempArray];
      setChartData(data);
    }
  },[activities])

  return (
    <>
      <Row gutter={32} style={{display: 'flex', alignItems: 'center', margin: '2rem 0 0.5rem'}}>
        <Col span={12}><h2>{milestoneData?.milestone?.full_name || 'Milestone Progress'}</h2></Col>
        <Col span={12}>
          <Progress
            percent={milestoneData?.progress}
            status="active"
            strokeWidth={25}
            // format={() => parseInt(milestoneData?.progress) === 100 ? 'Done' : `${milestoneData?.progress}  %`}
          />
        </Col>
      </Row>
      <Chart
          chartType="Gantt"
          width="100%"
          height="100%"
          data={chartData}
          options={options}
      />
    </>
  )
}


export default ProgressModal