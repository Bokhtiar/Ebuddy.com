import React from 'react'
import { Card, Timeline, Icon } from 'antd';
import { dateFormat } from '../../../scripts/helper';

const MilestoneTimeline = (props) =>{
  const{ milestoneList } = props;
  // console.log('milestoneList',milestoneList)

    return (
      <>
        <h3><strong>Milestone Timeline</strong></h3>
        <Card style={{boxShadow:'rgba(0, 0, 0, 0.086)', broderRadius: '5px'}}>
          <Timeline mode="alternate">
            {milestoneList && milestoneList.map((milestone, index)=>{
              return(
                index % 2 == 0 
                  ?
                    <Timeline.Item 
                      color="green"
                      position='left'
                      key={`${milestone.id}-${index}`}
                    >
                      <p>{milestone.milestone.full_name}</p>
                      <p>{milestone.actual_end_date || null}</p>
                      <p>{milestone.payment}</p>
                    </Timeline.Item>
                  :
                    <Timeline.Item 
                      color="blue"
                      position='right'
                      key={`${milestone.id}-${index}`}
                    >
                      <p>{milestone.milestone.full_name}</p>
                      <p>{milestone.actual_end_date || null}</p>
                      <p>{milestone.payment}</p>
                    </Timeline.Item>    
              )
            })}
          </Timeline>
        </Card>
      </>
    )
}

export default MilestoneTimeline;
