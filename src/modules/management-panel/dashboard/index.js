import React, { Fragment, useEffect, useState } from 'react'
import * as moment from "moment";
import {TableWrapper, Wrapper} from "../../commons/Wrapper";
import {Col, Row} from "antd";
import project_icon from "../../../assets/icons/test/project_icon.svg";
import activity_icon from "../../../assets/icons/management-icon.svg";
import teammates_icon from "../../../assets/icons/teammate.svg";
import active_milestone from '../../../assets/icons/milestone-color.svg';

import RevenueProgress from './RevenueProgress';
import ProjectProgress from "./ProjectProgress";
import MyComments from "./MyComments";
import SupervisorTaskReview from "./SupervisorTaskReview";
import { getData } from '../../../scripts/api-service';
import { MANAGEMENT_DHASHBOARD, DEPARTMENT_LIST } from '../../../scripts/api';
import {CurrentQueterdate} from "../../../scripts/helper";

export default function Dashboard() {
    const [dashboard, getDashboard] = useState();
    const [departments, setDepartments] = useState([]);
    const [reviewProgressFilter, setReviewProgressFilter] = useState();
    const [projectProgressFilter, setProjectProgressFilter] = useState({
        dates: {
            start: moment().startOf('month').format("YYYY-MM-DD"),
            end: moment().endOf("month").format("YYYY-MM-DD") 
        }
    });

    const getDeshboardData = async () => {
        let url = MANAGEMENT_DHASHBOARD + "?";

        if (reviewProgressFilter) {
            if (reviewProgressFilter.rev_filter) url = url + "&rev_filter=" + reviewProgressFilter.rev_filter;
            if (reviewProgressFilter.rev_dept_id) url = url + "&rev_dept_id=" + reviewProgressFilter.rev_dept_id;
        }

        if (projectProgressFilter) {
            if (projectProgressFilter.progress_dept_id) url = url + "&progress_dept_id=" + projectProgressFilter.progress_dept_id;
            if (projectProgressFilter.dates && projectProgressFilter.dates.start && projectProgressFilter.dates.end) {
                url = url + "&from_date=" + projectProgressFilter.dates.start + "&to_date=" + projectProgressFilter.dates.end;
            }
        }

        let res = await getData(url);

        if (res) {
            getDashboard(res.data.data);
        }
    };

    const getDepartments = async () => {
        let res  = await getData(DEPARTMENT_LIST);

        if (res) {
            let masterData = res.data.data;
            setDepartments(masterData);
        }
    }

    const reviewFilterHandel = (data) => {
        if (data.rev_filter) {
            setReviewProgressFilter((prepState) => ({
                ...prepState,
                rev_filter : data.rev_filter
            }))
        }

        if (data.rev_dept_id) {
            setReviewProgressFilter((prepState) => ({
                ...prepState,
                rev_dept_id : data.rev_dept_id
            }))
        }
    }

    const projectFilterHandel = (data) => {
        if (data.progress_dept_id) {
            setProjectProgressFilter((prepState) => ({
                ...prepState,
                progress_dept_id : data.progress_dept_id
            }))
        }

        if ( data.queterCheck) {
            let dates = {};
            if (data.queterCheck === "month") {
                dates = {
                    start: moment().startOf('month').format("YYYY-MM-DD"),
                    end: moment().endOf("month").format("YYYY-MM-DD")
                }
            } else if (data.queterCheck === "quarterly") {
                dates = CurrentQueterdate();
            } else {
                dates = {
                    start: moment().format("YYYY") + "-01-01",
                    end: moment().format("YYYY") + "-12-31"
                }
            }

            setProjectProgressFilter((prepState) => ({
                ...prepState,
                dates : dates
            }));
        }
    }

    useEffect(() => {
        // getDeshboardData();
        getDepartments()
    }, []);

    useEffect(() => {
        getDeshboardData();
    }, [reviewProgressFilter, projectProgressFilter])

    return (
        <Wrapper className="supervisor-dashboard pb-5">
            {
               dashboard?.counts && <Fragment>
                    <Row gutter={32} className="mt-5 mx-3 dashboard-items">
                        <Col span={6}>
                            <div className="dashboard-item">
                                <Row>
                                    <Col span={6}>
                                        <img src={project_icon} />
                                    </Col>
                                    <Col span={18} className="media-body">
                                        <h2 className="mb-1"><strong>{dashboard?.counts?.active_projects || 0}</strong></h2>
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
                                        <h2 className="mb-1"><strong>{dashboard?.counts?.active_milestones || 0}</strong></h2>
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
                                        <h2 className="mb-1"><strong>{dashboard?.counts?.active_activities || 0}</strong></h2>
                                        <p>Active Task</p>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className="dashboard-item">
                                <Row>
                                    <Col span={6}>
                                        <img src={teammates_icon} className="m-4 py-2"/>
                                    </Col>
                                    <Col span={18} className="media-body">
                                        <h2 className="mb-1"><strong>{dashboard?.counts?.total_departments || 0}</strong></h2>
                                        <p>Total Department</p>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
               </Fragment>
            }

            <Row gutter={32} className="mx-3 mt-5 dashboard-items">
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    {
                        dashboard?.revenue_progress?.length && <RevenueProgress 
                            progree={dashboard.revenue_progress}
                            departments={departments}
                            reviewFilterHandel={reviewFilterHandel}
                            />
                    }
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    {
                        dashboard?.milestone_status_chart?.length &&  
                        <ProjectProgress 
                            mileStone={dashboard?.milestone_status_chart}
                            departments={departments} 
                            projectFilterHandel={projectFilterHandel}/>
                    } 
                </Col>
            </Row>

            <Row gutter={32} className="mx-3 mt-5 dashboard-items">
                <Col span={24}>
                    <MyComments />
                </Col>
            </Row>
            
            {
                dashboard?.activity_data && <Row gutter={32} className="mx-3 mt-5 dashboard-items">
                    <Col span={24}>
                        <SupervisorTaskReview />
                    </Col>
                </Row>
            }
        </Wrapper>
    )
}
