import React, { useState } from 'react';
import {
    Col,
    Row,
} from "antd";
import { Empty } from 'antd';
import './CommonModal.css'
import ActivityTreeview from './ActivityTreeview';

export default function TaskDetails({ activityTask }) {
    const { title, code, due_date, assigned_user, child_activities, activity_type, activity_priority, projects, project_milestone, function_type, function_activity } = activityTask;
    return (
        <div className='modal-section'>
            {/* Header section */}
            <div className='header__section'>
                <div className='header__section__left'>
                    <h5 className="bot-code">{code}</h5>
                    <h3>{title}</h3>
                </div>
                {/* <div className='header__section__right'>
                    <Button type='primary' >Task Delegated</Button>
                </div> */}
            </div>
            <hr className="line-top-border" />
            <br />
            <Row gutter={32}>
                <Col span={17} style={{ borderRight: '1px solid #ccc', maxHeight: '80vh', overflowY: 'scroll' }}>
                    {
                        child_activities?.length > 0 ? <ActivityTreeview child_activities={child_activities} /> : <div className='empty__box'>
                            <Empty />
                        </div>
                    }
                    {/* <ActivityTreeview child_activities={child_activities} /> */}
                </Col>

                <Col span={7}>
                    <div className="right_side_common_div_section">
                        <h5>Due Date</h5>
                        <p>{due_date}</p>
                    </div>
                    <div className="assignee_section">
                        <h5 className='assignee__name'>Assignee Name</h5>
                        <div className="activity_list__item__user">
                            <div className="activity-list__item__user__avatar">
                                <img src={assigned_user?.profile_pic} alt="avatar" />
                            </div>
                            <div className="activity-list__item__user__name">
                                <p>{assigned_user?.name}</p>
                            </div>
                        </div>
                    </div>
                    <hr className='right__side__hr' />
                    <div className="right_side_common_div_section">
                        {activity_type?.name &&
                            <div>
                                <h5>Activity Type</h5>
                                <p>{activity_type?.name}</p>
                            </div>
                        }
                    </div>
                    <div className="right_side_common_div_section">
                        {activity_priority?.name &&
                            <div>
                                <h5>Activity Priority</h5>
                                <p>{activity_priority?.name}</p>
                            </div>
                        }
                    </div>
                    <div className="right_side_common_div_section">
                        {function_type?.name &&
                            <div>
                                <h5>Function Type</h5>
                                <p>{function_type?.name}</p>
                            </div>
                        }
                    </div>
                    <div className="right_side_common_div_section">
                        {function_activity?.name &&
                            <div>
                                <h5>Function Activity</h5>
                                <p>{function_activity?.name}</p>
                            </div>
                        }
                    </div>
                    <div className="right_side_common_div_section">
                        {projects?.name &&
                            <div>
                                <h5>Project Name</h5>
                                <p>{projects?.name}</p>
                            </div>
                        }
                    </div>
                    <div className="right_side_common_div_section">
                        {project_milestone?.milestone?.full_name &&
                            <div>
                                <h5>Milstone Name</h5>
                                <p>{project_milestone?.milestone?.full_name}</p>
                            </div>
                        }
                    </div>
                </Col>
            </Row>
        </div>
    )
}
