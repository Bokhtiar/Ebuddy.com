import React, { useState, useEffect } from 'react';
import {Row, Col, Tag, Progress} from "antd";
import demoUser from "../../../assets/dummy.jpg";
import expandActive from "../../../assets/expand-active.svg"
import expandInactive from "../../../assets/expand-inactive.svg";

import {EMPLOYEE_RUNNING_MILESTONE} from "../../../scripts/api";
import {getData} from "../../../scripts/api-service";

export default function MilestoneModal({context, selectedEmpId , notTaskText}) {
    const [milestons, setMileStoens] = useState([]);
    const [selectMileStone, setSelectMilestone] = useState();

    const getMileStoneList = async () => {
        let res = await getData(EMPLOYEE_RUNNING_MILESTONE + "?emp_id=" + selectedEmpId);

        if (res) {
            let masterData = res?.data?.data;
            setMileStoens(masterData);
        }
    }

    useEffect(() => {
        if (selectedEmpId) {
            getMileStoneList();
        }
    }, [selectedEmpId]);

    const showHideDetails = (mileId) => {
        if (selectMileStone === mileId) setSelectMilestone();
        else setSelectMilestone(mileId);
     }

    return (
        <div className="employ-project-modal">
            {
                milestons?.length ? <div>
                    {
                        milestons.map((mile, index) => {
                            return <div className="employ-project-item">
                                        <Row className="cursor-pointer"
                                            onClick={() => showHideDetails(index)}>
                                            <Col span={14}>
                                                <p className="mb-1">Project Name</p>
                                                <strong>{mile.project_title}</strong>
                                            </Col>
                                            <Col span={10}>
                                                <p className="mb-1">Current Milestone</p>
                                                <strong>{mile.current_milestone}</strong>

                                                <img className="activity-icon"
                                                src={selectMileStone === index ? expandActive : expandInactive} height="30" />
                                            </Col>
                                        </Row>
                        
                                        <div className={`mt-4 ${selectMileStone !== index ? 'hide-task-details' : ''}`}>
                                            <hr className="line-top-border"/>
                        
                                            <Row className="mt-3">
                                                <Col span={12} style={{borderRight: "1px solid #ccc"}}>
                                                    <div className="mb-3">
                                                        <p className="mb-1">Project Code</p>
                                                        <strong>{mile?.details?.project_code || 'N/A'}</strong>
                                                    </div>
                        
                                                    <div className="mb-3">
                                                        <p className="mb-1">Project Description</p>
                                                        <strong>{mile?.details?.project_description || 'N/A'}</strong>
                                                    </div>
                        
                                                    <div className="mb-3">
                                                        <p className="mb-1">Project Factors</p>
                                                        <strong>{mile?.details?.project_factors || 'N/A'}</strong>
                                                    </div>
                        
                                                    <div className="mb-3">
                                                        <p className="mb-1">KAM Name</p>
                                                        {
                                                            mile?.details?.kam ? <>
                                                                <img src={mile?.details?.kam?.profile_pic || demoUser} height="25" width="25"></img>
                                                                <strong className="ml-2">{mile?.details?.kam?.name || 'N/A'}</strong>
                                                            </> : ''
                                                        }
                                                    </div>
                        
                                                    <div className="mb-3">
                                                        <p className="mb-1">Client Name</p>
                                                        <strong>{mile?.details?.client_name?.name || 'N/A'}</strong>
                                                    </div>
                                                </Col>
                        
                                                <Col span={12} className="pl-5">
                                                    <div className="mb-3">
                                                        <p className="mb-1">Project Value</p>
                                                        <strong>{mile?.details?.project_value || 'N/A'}</strong>
                                                    </div> 
                        
                                                    <div className="mb-3">
                                                        <p className="mb-1">Total Milestone</p>
                                                        <strong>{mile?.details?.total_milestone || '0'}</strong>
                                                    </div> 
                        
                                                    <div className="mb-3">
                                                        <p className="mb-1">Next Milestone</p>
                                                        <strong>{mile?.details?.next_milestone || 'N/A'}</strong>
                                                    </div> 
                        
                                                    <div className="mb-3">
                                                        <p className="mb-1">Milestone Progress</p>
                                                        <strong>Second Pitch <Tag color="#2db7f5">{mile?.details?.milestone_status?.name || 'N/A'}</Tag></strong>
                                                        <p>Progress: <strong>{mile?.details?.milestone_progress}%</strong></p>
                                                        <Progress percent={mile?.details?.milestone_progress} showInfo={false} style={{width: "70%"}}/>
                                                    </div> 
                                                </Col>
                                            </Row>
                                        </div>   
                                    </div>
                        })
                    }
                </div> : <div className="not-data-text">
                    {notTaskText}
                </div>
            }
        </div>
    )
}
