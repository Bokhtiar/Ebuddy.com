import React from 'react';
import { Progress } from 'antd';

const ProgressStatus = ({data}) => {

  let totalMilestones = data.milestones?.length;
  let completedMilestones = data.completed_milestones?.length;
  let percentage = (completedMilestones * 100 ) / totalMilestones;

  return (
      <Progress 
        type="circle" 
        percent={percentage} 
        format={percent => 
          <>
            <p style={{marginBottom: '10px', paddingTop: '5px'}}><small>{Math.round(percent) + '%'}</small></p>
            <p style={{marginBottom: '10px'}}><small>Progress</small></p>
            <p style={{fontSize: '12px', paddingTop: '5px'}}>{completedMilestones}/{totalMilestones}</p>
          </>
        } 
      />
  )
}

export default ProgressStatus;