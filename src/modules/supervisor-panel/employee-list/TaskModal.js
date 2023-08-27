import React, { useEffect, useState } from 'react';
import {Row, Col, Tag, Progress} from "antd";
import demoUser from "../../../assets/dummy.jpg";
import expandActive from "../../../assets/expand-active.svg"
import expandInactive from "../../../assets/expand-inactive.svg";
import {alertPop} from "../../../scripts/message";


import {EMPLOYEE_RUNNING_TASKS, EMPLOYEE_OVERDUE_TASKS, EMPLOYEE_FUNCTIONAL_ACTIVITIES} from "../../../scripts/api";
import {getData} from "../../../scripts/api-service";

export default function TaskModal({context, selectedEmpId , notTaskText, nonBusiness, selectedDepartment, modalData}) {
    const [tasks, setTasks] = useState([]);
    const [selectedtaskId, setSelectedTaskId] = useState();

    const getTaskList = async () => {
        let url = "";

        // if (nonBusiness) {
        //     if(selectedDepartment) url = EMPLOYEE_FUNCTIONAL_ACTIVITIES + 'department_id=' + selectedDepartment;
        //     else alertPop('error', "Please select any department");
        // }
        if(!nonBusiness){
            if (context === 'running') url = EMPLOYEE_RUNNING_TASKS + "/" + selectedEmpId + "?user_type=business";
            if (context === 'overDue') url = EMPLOYEE_OVERDUE_TASKS + "/" + selectedEmpId + "?user_type=business";
    
            let res = await getData(url);
    
            if (res) {
                let masterData = res?.data?.data;
                if(!nonBusiness) setTasks(masterData);
            }
        }
    }

    const showHideDetails = (taskId) => {
       if (selectedtaskId === taskId) setSelectedTaskId();
       else setSelectedTaskId(taskId);
    }

    useEffect(() => {
        if (selectedEmpId || selectedDepartment) {
            getTaskList();
        }
        if(nonBusiness && modalData) setTasks(modalData);
    }, [selectedEmpId, selectedDepartment, nonBusiness, modalData]);

    return (
        <div className="employ-project-modal">
            {
                tasks && tasks.length ? <div>
                    {tasks.map(task => {
                        return <div key={nonBusiness ? task?.id : task?.id} className="employ-project-item">
                            <Row onClick={() => nonBusiness ? showHideDetails(task?.id) : showHideDetails(task?.id)} 
                                className="cursor-pointer" id={'js-task-'+ nonBusiness ? task?.id : task?.id}>
                                <Col span={14}>
                                    <p className="mb-1">Task Name</p>
                                    <strong>{task.title}</strong>
                                </Col>
                                <Col span={10}>
                                    {nonBusiness ?
                                    <><p className="mb-1">Function Name</p>
                                    <strong>{task?.function_activity?.name}</strong></>
                                    : 
                                    <><p className="mb-1">Project Name</p>
                                    <strong>{task?.projects?.name}</strong></>}

                                    {nonBusiness ? <img className="activity-icon" onClick={() => showHideDetails(task?.id)} 
                                    src={selectedtaskId === task?.id ? expandActive : expandInactive} height="30" />
                                    : <img className="activity-icon" onClick={() => showHideDetails(task?.id)} 
                                    src={selectedtaskId === task?.id ? expandActive : expandInactive} height="30" />}
                                </Col>
                            </Row>
             
                            <div className={nonBusiness ?  `mt-4 ${selectedtaskId !== task?.id? 'hide-task-details' : ''}` : `mt-4 ${selectedtaskId !== task?.id? 'hide-task-details' : ''}`} id={nonBusiness ? 'js-task-details-'+ task?.id : 'js-task-details-'+ task?.id}>
                                <hr className="line-top-border"/>
            
                                <Row className="mt-3">
                                    <Col span={12} style={{borderRight: "1px solid #ccc"}}>
                                        <div className="mb-3">
                                            <p className="mb-1">Activity Type</p>
                                            <strong>{nonBusiness ? task?.activity_type?.name : task?.activity_type?.name || 'N/A'}</strong>
                                        </div>
            
                                        <div className="mb-3">
                                            <p className="mb-1">Assignee Name</p>
                                            <img src={nonBusiness ? task?.assignee?.profile_pic : task?.assigned_user?.profile_pic || demoUser} height="25" width="25"></img>
                                            <strong className="ml-2">{nonBusiness ? task?.assignee?.name : task?.assigned_user?.name || 'N/A'}</strong>
                                        </div>
            
                                        <div className="mb-3">
                                            <p className="mb-1">Reporter Name</p>
                                            <img src={nonBusiness ? task?.reporter_user?.profile_pic : task?.reporter_user?.profile_pic || demoUser} height="25" width="25"></img>
                                            <strong className="ml-2">{nonBusiness ? task?.reporter_user?.name : task?.reporter_user?.name || 'N/A'}</strong>
                                        </div>
            
                                        {!nonBusiness ? <div className="mb-3">
                                            <p className="mb-1">KAM Name</p>
                                            <strong className="ml-2">{task?.projects?.kam_user?.name || 'N/A'}</strong>
                                        </div> : null}
            
                                        {!nonBusiness ? <div className="mb-3">
                                            <p className="mb-1">Client Name</p>
                                            <strong>{task?.projects?.client?.name || 'N/A'}</strong>
                                        </div> : null}
                                    </Col>
                                    <Col span={12} className="pl-5">
                                        {nonBusiness ?  
                                            <div className="mb-3">
                                                <p className="mb-1">Task Status</p>
                                                <strong>{task?.status || 'N/A'}</strong>
                                            </div>
                                        :null}

                                        <div className="mb-3">
                                            <p className="mb-1">Priority</p>
                                            <strong>{nonBusiness ? task?.activity_priority?.name : task?.activity_priority?.name || 'N/A'}</strong>
                                        </div> 

                                        <div className="mb-3">
                                            <p className="mb-1">Activity Repeat</p>
                                            <strong>{nonBusiness ? task?.repeats : task?.repeats || 'N/A'}</strong>
                                        </div> 
            
                                       {!nonBusiness ? <div className="mb-3">
                                            <p className="mb-1">Milestone Name</p>
                                            <strong>{task?.project_milestone?.milestone?.full_name || 'N/A'}</strong>
                                        </div> : null}
            
                                        <div className="mb-3">
                                            <p className="mb-1">Due/End Date</p>
                                            <strong>{nonBusiness ? task?.due_date :  task?.due_date || 'N/A'}</strong>
                                        </div> 
            
                                        <div className="mb-3">
                                            {nonBusiness ?  '' 
                                            :<><p className="mb-1">Task Progress</p>
                                            <Tag color="#faad14">{task?.status || 'N/A'}</Tag> 
                                            <p>Progress: <strong>{task?.project_milestone?.progress || 0}%</strong></p>
                                            <Progress percent={task?.project_milestone?.progress || 0} showInfo={false} style={{width: "70%"}}/>
                                            </>}
                                        </div> 
                                    </Col>
                                </Row>
                            </div>   
                        </div>
                    })}
                    
                </div> : <div className="not-data-text">
                    {notTaskText}
                </div>
            }
        </div>
    )
}
