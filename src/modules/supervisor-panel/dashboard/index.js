import React from 'react'
import {TableWrapper, Wrapper} from "../../commons/Wrapper";
import {Col, Row} from "antd";
import project_icon from "../../../assets/icons/test/project_icon.svg";
import activity_icon from "../../../assets/icons/management-icon.svg";
import teammates_icon from "../../../assets/icons/teammate.svg";
import active_milestone from '../../../assets/icons/milestone-color.svg';

import ExtendedProjects from './ExtendedProjects';
import TaskReview from "./TaskReview";
import TodaysTask from "./TodaysTask";
import RevenueStatistics from './RevenueStatistics';
import MilestoneReview from './MilestoneReview';
import MilestoneStatus from './MilestoneStatus';

export default function Dashboard() {
    return (
        <Wrapper className="supervisor-dashboard pb-5">
            <Row gutter={32} className="mt-5 mx-3 dashboard-items">
                <Col span={6}>
                    <div className="dashboard-item">
                        <Row>
                            <Col span={6}>
                                <img src={project_icon} />
                            </Col>
                            <Col span={18} className="media-body">
                                <h2 className="mb-1">57</h2>
                                <p>Active Projects</p>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col span={6}>
                    <div className="dashboard-item">
                        <Row>
                            <Col span={6}>
                                <img src={active_milestone} className="m-4" />
                            </Col>
                            <Col span={18} className="media-body">
                                <h2 className="mb-1">57</h2>
                                <p>Active Milestone</p>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col span={6}>
                    <div className="dashboard-item">
                        <Row>
                            <Col span={6}>
                                <img src={activity_icon} className="m-4" />
                            </Col>
                            <Col span={18} className="media-body">
                                <h2 className="mb-1">57</h2>
                                <p>Active Task</p>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col span={6}>
                    <div className="dashboard-item">
                        <Row>
                            <Col span={6}>
                                <img src={teammates_icon} className="m-4"/>
                            </Col>
                            <Col span={18} className="media-body">
                                <h2 className="mb-1">57</h2>
                                <p>Active Teammate</p>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>

            <Row gutter={32} className="mx-3 mt-5 dashboard-items">
                <Col span={12}>
                    <RevenueStatistics></RevenueStatistics>
                </Col>
                <Col span={12}>
                    <MilestoneStatus></MilestoneStatus>
                </Col>
            </Row>
            <Row gutter={32} className="mx-3 mt-5 dashboard-items">
                <Col span={12}>
                    <MilestoneReview></MilestoneReview>
                </Col>
                <Col span={12}>
                    <ExtendedProjects></ExtendedProjects>
                </Col>
            </Row>

            <Row gutter={32} className="mx-3 mt-5 dashboard-items">
                <Col span={16}>
                    <TaskReview></TaskReview>
                </Col>
                <Col span={8}>
                    <TodaysTask></TodaysTask>
                </Col>
            </Row>
        </Wrapper>
    )
}
