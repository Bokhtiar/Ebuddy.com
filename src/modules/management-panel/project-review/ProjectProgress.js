import React from 'react'
import { Card, Progress, Row, Col  } from 'antd';
import { average } from '../../../scripts/helper';

const ProjectProgress = (props) =>{
    const { milestoneList } = props;
    let timelineArray = []

    {milestoneList &&  milestoneList.map(milestone => {
        return(
            timelineArray = [...timelineArray,milestone.progress]
        )
    })}
    return (
        <>
            <h3><strong>Project Progress</strong></h3>
            <Card>
                <Progress 
                    strokeLinecap="square" 
                    percent={average(timelineArray)} 
                />
                <p>Project over all progress</p><br />

                <Row gutter={32}>
                    <Col span={10}>
                        <p style={{textDecoration: 'underline'}}><strong>Milestone</strong></p>
                    </Col>
                    <Col span={14}>
                        <p style={{textDecoration: 'underline'}}><strong>Progress</strong></p>
                    </Col>
                </Row>
                {milestoneList &&  milestoneList.map((milestone,index) => {
                    return(
                        <Row gutter={32} key={`${milestone.id}-${index}`}>
                            <Col span={10}>
                                <p>{milestone.milestone.full_name}</p>
                            </Col>
                            <Col span={14}>
                                <Progress strokeLinecap="square" percent={milestone.progress} />
                            </Col>
                        </Row>
                    )
                })}
            </Card>
        </>
    )
}

export default ProjectProgress;