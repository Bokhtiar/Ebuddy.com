import React, { Component } from 'react';
import styled from "styled-components";
import { ErrorPage } from "../commons/ErrorPage";
import RegisteredIssues from "./registered-issues/index";
import LicenseRegister from "./license-register/index";
import IssueReport from "../issue-registered/reports/issue-report/index";
import LicenseReport from "../issue-registered/reports/license-report/index";
// import {getPermissions} from '../../scripts/helper';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const components = {
    "hr-issue-register": RegisteredIssues,
    "license-register": LicenseRegister,
    "report-issue": IssueReport,
    "report-license": LicenseReport,
    // 'dashboard': Dashboard,
    // "employee-list": EmployeeList,
    // "projects-list": ProjectList,
    // "task-review": TaskReview,
    // "milestone-review": MilestoneReview,
    // "milestone-calendar": MilestoneCalendar,
    // "milestone-excel-report": MilestoneReport,
    // "quarter-target-list": QuarterTargetList,
    // "target-view": QuarterDetails,
    // "target-vs-achievement": TargetVsAchievement,
    //misc.
    "not-found": ErrorPage,
};

class Panel extends Component {
    // async componentDidMount() {

        // let res = await getData(MY_PERM);
        // if (res) {
        //     let masterData = res?.data?.data;
        //     console.log('masterData',masterData);
        //     const data = masterData.filter(permission=>(
        //        permission.name === "Show all notifications"
        //     ))
        //     if(data.length > 0){
        //         return components
        //     }else{
        //         components.notification = ErrorPage;
        //     }
        // }

        // let permissions = await getPermissions();
        // if (permissions && permissions.length) {
        //     const permNames = permissions.map((item) => item.name);
        //     if (!permNames.includes('View KAM list')) {
        //         components['employee-list'] = ErrorPage;
        //     }
        //     if (!permNames.includes('View project list by KAM')) {
        //         components['projects-list'] = ErrorPage;
        //     }
        //     if (!permNames.includes('Can view activity review list')) {
        //         components['task-review'] = ErrorPage;
        //     }
        //     if (!permNames.includes('Can view milestone review list')) {
        //         components['milestone-review'] = ErrorPage;
        //     }
        //     if (!permNames.includes('Can view milestone calender')) {
        //         components['milestone-calendar'] = ErrorPage;
        //     }
        //     if (!permNames.includes('Can view milestone calender')) {
        //         components['excel-report'] = ErrorPage;
        //     }
        //     if (!permNames.includes('Can view milestone calender')) {
        //         components['quarter-target-list'] = ErrorPage;
        //     }
        //     if (!permNames.includes('Can view milestone calender')) {
        //         components['target-view'] = ErrorPage;
        //     }
        //     if (!permNames.includes('Can view milestone calender')) {
        //         components['target-vs-achievement'] = ErrorPage;
        //     }
        // }
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
