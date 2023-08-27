import React, { useEffect, useState } from 'react'
import { Card, Progress, Row, Col  } from 'antd';
import {getProgress} from "./helper";

const ProjectProgress = (props) =>{
    const { milestoneList } = props;
    const [milestoens, setMilestons] = useState([])
    
    useEffect(() => {
        setMilestons(milestoneList)
    }, [milestoneList])

    return (
        <>
            <h3><strong>Project Progress</strong></h3>
            <Card>
                <Progress 
                    strokeLinecap="square" 
                    percent={getProgress(milestoens)} 
                    // percent={100} 
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
                {
                    milestoens?.length ? milestoens.map(mile => {
                        return <Row gutter={32} key={1}>
                        <Col span={10}>
                            <p>{mile?.milestone?.full_name}</p>
                        </Col>
                        <Col span={14}>
                            <Progress strokeLinecap="square" percent={mile.progress || 0}/>
                        </Col>
                    </Row>
                    }) : ''
                }
            </Card>
        </>
    )
}

export default ProjectProgress;