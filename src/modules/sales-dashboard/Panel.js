import React, { Component } from 'react';
import styled from "styled-components";
import { ErrorPage } from "../commons/ErrorPage";
import Summary from './summary';
import DepartmentOverview from './department-overview';
import SalesHeadList from './configuration/sales-head/list';
import SalesHeadCreate from './configuration/sales-head/sales-service-head-create';
import SalesHeadUpdate from './configuration/sales-head/sales-service-head-update';
import SalesTargetList from './configuration/target/target-list';
import SalesTargetCreate from './configuration/target/target-create';
import SalesTargetUpdate from './configuration/target/target-update';
import SalesTargetBulkUpload from './target-bulk-upload';
import SalesTargetVsAchievement from './report/target-vs-achievement';
import SalesIndustryWiseTargetVsAchievement from './report/industry-wise-target-vs-achievement';
import ProjectSummary from '../management-panel/project-summary';
import ProjectCalendar from '../management-panel/project-calendar';
import ProjectReview from '../management-panel/project-review';
import ProjectProgress from '../management-panel/project-progress';
import TaskSummary from '../management-panel/activity-summary/task-summary';
import TaskDetails from '../management-panel/activity-summary/task-details';
import TaskCalender from '../management-panel/activity-summary/task-calender';
import TaskReviewSummary from '../management-panel/activity-summary/task-review-summary/index';
import TargetVsAchievement from '../management-panel/target-vs-achievement';
import MonthlySummary from '../management-panel/monthly-summary';
import ProjectSummaryDetails from '../management-panel/project-summary/ProjectSummaryDetails';
import ExcelReport from '../management-panel/excel-report';
import NonBudgetedAchievement from './NonBudgetedAchievement';

const Wrapper = styled.div`
  height: 100%;
  width: calc(100% - 2rem);
`;

const components = {
    //sales service head
    "sales-summary": Summary,
    "sales-department-overview": DepartmentOverview,
    "config-sales-head-list": SalesHeadList,
    "config-sales-head-create": SalesHeadCreate,
    "config-sales-head-update": SalesHeadUpdate,
    //target
    "config-sales-target-list": SalesTargetList,
    "config-sales-target-create": SalesTargetCreate,
    "config-sales-target-update": SalesTargetUpdate,
    "sales-target-bulk-upload": SalesTargetBulkUpload,
    "target-vs-aschievement": SalesTargetVsAchievement,
    "target-vs-aschievement-industry-wise": SalesIndustryWiseTargetVsAchievement,
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
    "non-budgeted-achievement": NonBudgetedAchievement,
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
