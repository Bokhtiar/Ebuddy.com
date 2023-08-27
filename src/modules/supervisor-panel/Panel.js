import React, { Component } from 'react';
import styled from "styled-components";
import { ErrorPage } from "../commons/ErrorPage";
import { EmptyPage }  from "../commons/EmptyPage";
import EmployeeList from "./employee-list/index";
import ProjectList from "./projects-list/index";
import TeamTask from "./team-task";
import TaskReview from "./task-review/index";
import MilestoneReview from "./milestone-review/index";
import MilestoneCalendar from "./milestone-calendar/index";
import {getPermissions} from '../../scripts/helper';
import ExcelReport from "./excel-report/index";
import Dashboard from './dashboard-new/index';
import MilestoneReport from './excel-report/MilestoneReport';
import QuarterTargetList from '../revenue-board/Quarter-Target-List';
import QuarterDetails from '../revenue-board/target-view';
import TargetVsAchievement from '../revenue-board/Target-Vs-Achievement/target-vs-achievement';
import PAFillupList from '../supervisor-panel/pa-fillup/pa-fillup-list/index';
// import PAFillupCreate from '../supervisor-panel/pa-fillup/pa-fillup-create/index';
import PAFillupCreate from '../supervisor-panel/pa-fillup/pa-fillup-create-new/index';
// import PAFillupUpdate from '../supervisor-panel/pa-fillup/pa-fillup-update/index';
import PAFillupUpdate from '../supervisor-panel/pa-fillup/pa-fillup-update-new/index';
// import PAFillupView from '../supervisor-panel/pa-fillup/pa-fillup-view/index';
import PAFillupView from '../supervisor-panel/pa-fillup/pa-fillup-view-new/index';
import PAFillupDetails from '../supervisor-panel/pa-fillup/yearly-pa/pa-details/index';
import PaFillupChart from "./pa-fillup/pa-fillup-chart/index";
import ActivityView from './activity-view';
import NomineeList from './nominee/nominee-list/index';
import NomineeCreate from './nominee/nominee-create/index';
import NomineeView from './nominee/nominee-view/index';
import YearlyPAList from './pa-fillup/yearly-pa/pa-list';
import MatrixReport from './DepartmentServiceMatrix/MatrixReport';
import UploadOption from './DepartmentServiceMatrix/UploadOption';
import IndustryWiseSummary from './DepartmentServiceMatrix/industry-wise-report';

const Wrapper = styled.div`
  height: 100%;
  width: calc(100% - 2rem);
`;

const components = {
    'dashboard': Dashboard,
    "employee-list": EmployeeList,
    "projects-list": ProjectList,
    "team-task": TeamTask,
    "task-review": TaskReview,
    "milestone-review": MilestoneReview,
    "milestone-calendar": MilestoneCalendar,
    "excel-report": ExcelReport,
    "milestone-excel-report": MilestoneReport,
    "target-list-quarter-wise": QuarterTargetList,
    "target-view": QuarterDetails,
    "target-vs-achievement": TargetVsAchievement,
    "pa-fillup-list": PAFillupList,
    "pa-fillup-create": PAFillupCreate,
    "pa-fillup-update": PAFillupUpdate,
    "pa-fillup-details": PAFillupDetails,
    "pa-fillup-view": PAFillupView,
    "pa-fillup-chart": PaFillupChart,
    "yearly-pa-list": YearlyPAList,
    "activity-view": ActivityView,
    "nominee-list": NomineeList,
    "nominee-create": NomineeCreate,
    "nominee-view": NomineeView,
    "matrix-report": MatrixReport,
    "matrix-upload-option": UploadOption,
    "matrix-industry-wise-report": IndustryWiseSummary,
    //misc.
    // "not-found": ErrorPage,
    "not-found": EmptyPage,
};

class Panel extends Component {
    async componentDidMount() {

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

        let permissions = await getPermissions();

        if (permissions && permissions.length) {
            const permNames = permissions.map((item) => item.name);
            // if (!permNames.includes('View KAM list')) {
            //     components['employee-list'] = ErrorPage;
            // }
            // if (!permNames.includes('View project list by KAM')) {
            //     components['projects-list'] = ErrorPage;
            // }
            // if (!permNames.includes('Can view activity review list')) {
            //     components['task-review'] = ErrorPage;
            // }
            // if (!permNames.includes('Can view milestone review list')) {
            //     components['milestone-review'] = ErrorPage;
            // }
            // if (!permNames.includes('Can view milestone calender')) {
            //     components['milestone-calendar'] = ErrorPage;
            // }
            // if (!permNames.includes('Can view milestone calender')) {
            //     components['excel-report'] = ErrorPage;
            // }
            // if (!permNames.includes('Can view milestone calender')) {
            //     components['quarter-target-list'] = ErrorPage;
            // }
            // if (!permNames.includes('Can view milestone calender')) {
            //     components['target-view'] = ErrorPage;
            // }
            // if (!permNames.includes('Can view milestone calender')) {
            //     components['target-vs-achievement'] = ErrorPage;
            // }
        }
        // console.log('components',components)
    }
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
