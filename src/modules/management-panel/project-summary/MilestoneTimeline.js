import React from 'react'
import { Card, Timeline, Icon } from 'antd';
import { dateFormat } from '../../../scripts/helper';

const MilestoneTimeline = (props) =>{
  const{ milestoneList } = props;

    return (
      <>
        <h3><strong>Milestone Timeline</strong></h3>
        <Card style={{boxShadow:'rgba(0, 0, 0, 0.086)', broderRadius: '5px'}}>
          <Timeline mode="alternate">
            {/* {console.log('milestone',milestoneList )} */}
            {milestoneList?.length && milestoneList.map((milestone, index)=>{
              return(
                index % 2 == 0 
                  ?
                    <Timeline.Item 
                      color="green"
                      position='left'
                      key={1}
                    >
                      <p>{milestone?.milestone?.full_name}</p>
                      <p>{milestone.plan_end_date || ''}</p>
                      {milestone.payment ? <p>{milestone.payment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} BDT</p> : null}
                    </Timeline.Item>
                  : 
                    <Timeline.Item 
                      color="blue"
                      position='right'
                      key={2}
                    >
                      <p>{milestone?.milestone?.full_name}</p>
                      <p>{milestone.plan_end_date || ''}</p>
                      {milestone.payment ? <p>{milestone.payment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} BDT</p> : null}
                    </Timeline.Item>    
              )
            })}
          </Timeline>
        </Card>
      </>
    )
}

export default MilestoneTimeline;
