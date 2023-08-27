import React, {useState, useEffect} from "react";
import { Button, Progress, Row, Col } from "antd";
import { FrappeGantt } from 'frappe-gantt-react';
import '../../../styles/project_progress.scss';

const MilestoneProgress = ({milestoneData, activities}) => {
    const [tasks, setTasks] = useState();

    const setCustomColor = (status) =>{
      if(status === "To-Do") return "todo";
      else if(status === "WIP") return "wip";
      else if(status === "Hold") return "hold";
      else if(status === "Done") return "done";
    }

    useEffect(()=>{
      let tempArray = [];
      if(activities){
        activities.forEach(item=>{
          let payload = {
            id: item.id.toString(),
            name: item.title,
            start: item.start_date,
            end: item.due_date,
            progress: 100,
            dependencies: "",
            custom_class: setCustomColor(item.status)
          };
          tempArray.push(payload);
        })
        setTasks(tempArray);
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
            />
          </Col>
        </Row>
        {console.log("activities>>>>>>", activities)}
        {tasks ? 
          <FrappeGantt
            tasks={tasks}
            viewMode="Day"
            onClick={task => console.log(task)}
            onDateChange={(task, start, end) => console.log(task, start, end)}
            onProgressChange={(task, progress) => console.log(task, progress)}
            onTasksChange={tasks => console.log(tasks)}
          /> 
          : null}
      </>
    );
  };

  export default MilestoneProgress;