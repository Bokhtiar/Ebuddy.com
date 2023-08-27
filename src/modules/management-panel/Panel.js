import React, { Component } from 'react';
import styled from "styled-components";
import { ErrorPage } from "../commons/ErrorPage";
import ProjectSummary from "./project-summary";
import ProjectSummaryDetails from "./project-summary/ProjectSummaryDetails";
import ProjectCalendar from "./project-calendar";
import ProjectReview from "./project-review";
import ProjectProgress from "./project-progress";
import TaskSummary from "./activity-summary/task-summary";
import TaskDetails from "./activity-summary/task-details";
import TaskCalender from "./activity-summary/task-calender";
import TaskReviewSummary from "./activity-summary/task-review-summary/index";
import TargetVsAchievement from "./target-vs-achievement";
import MonthlySummary from "./monthly-summary";
import ExcelReport from "./excel-report";
import PAFillupList from './pa-fillup/pa-fillup-list';
import PAFillupView from './pa-fillup/pa-fillup-view';
import PAFillupChart from './pa-fillup/pa-fillup-chart';
import NomineeList from './nominee/nominee-list/index';
import NomineeCreate from './nominee/nominee-create/index';
import NomineeView from './nominee/nominee-view/index';
import PAFillupDetails from '../supervisor-panel/pa-fillup/yearly-pa/pa-details/index';
import YearlyPAList from './pa-fillup/yearly-pa/pa-list';
import UsageReport from './usage-report';
// import {getPermissions} from '../../scripts/helper';
// import Dashboard from './dashboard';
// import Dashboard from './dashboard-new';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const components = {
    // 'dashboard': Dashboard,
    "project-summary": ProjectSummary,
    "project-calendar": ProjectCalendar,
    "project-review": ProjectReview,
    "project-progress": ProjectProgress,
    "task-summary": TaskSummary,
    "task-details": TaskDetails,
    "task-calender": TaskCalender,
    "task-review-summary": TaskReviewSummary,
    "target-vs-achievement": TargetVsAchievement,
    "project-monthly-summary": MonthlySummary,
    "project-summary-details": ProjectSummaryDetails,
    "excel-report": ExcelReport,
    "pa-fillup-list": PAFillupList,
    "pa-fillup-view": PAFillupView,
    "pa-fillup-chart": PAFillupChart,
    "pa-fillup-details": PAFillupDetails,
    "pa-yearly-list": YearlyPAList,
    "nominee-list": NomineeList,
    "nominee-create": NomineeCreate,
    "nominee-view": NomineeView,
    "usage-report": UsageReport,
    //misc.
    "not-found": ErrorPage,
};


class Panel extends Component {
    // async componentDidMount() {
    //     console.log('components', await getPermissions());

    //     // let res = await getData(MY_PERM);
    //     // if (res) {
    //     //     let masterData = res?.data?.data;
    //     //     console.log('masterData',masterData);
    //     //     const data = masterData.filter(permission=>(
    //     //        permission.name === "Show all notifications"
    //     //     ))
    //     //     if(data.length > 0){
    //     //         return components
    //     //     }else{
    //     //         components.notification = ErrorPage;
    //     //     }
    //     // }

    //     let permissions = await getPermissions();

    //     if (permissions && permissions.length) {
    //         const permNames = permissions.map((item) => item.name);
    //         console.log('perms0',permNames)
    //         if (!permNames.includes('View KAM list')) {
    //             components['employee-list'] = ErrorPage;
    //             console.log("hello");
    //         }
    //         if (!permNames.includes('View project list by KAM')) {
    //             components['projects-list'] = ErrorPage;
    //         }
    //         if (!permNames.includes('Can view activity review list')) {
    //             components['task-review'] = ErrorPage;
    //         }
    //         if (!permNames.includes('Can view milestone review list')) {
    //             components['milestone-review'] = ErrorPage;
    //         }
    //         if (!permNames.includes('Can view milestone calender')) {
    //             components['milestone-calendar'] = ErrorPage;
    //         }
    //     }
    //     console.log('components',components)
    // }
    render() {
        const Tag = this.props.match.params.name in components
            ? components[this.props.match.params.name]
            : !this.props.match.params.name || this.props.match.params.name === "/"
            ? components["attendance"]
            : components["not-found"];

        return (
            <Wrapper>
                <Tag params={this.props.match.params} />
            </Wrapper>
        )
    }
}

export default Panel;
