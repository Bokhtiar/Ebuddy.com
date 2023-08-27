import React, { Component } from 'react';
import styled from "styled-components";
import { ErrorPage } from "../commons/ErrorPage";
import { EmptyPage }  from "../commons/EmptyPage";
import MytaskActivity from "./project-activity-list/MytaskActivity";
import ProjectActivityList from "./project-activity-list/index";
import TaskActivityDetails from "./project-activity-list/Task-Activity-Details";
import UserActivityCalendar from "./user-activity-calender/index";
import Notification from "./notification/index";
import {MY_PERM} from "../../scripts/api";
import {getData} from '../../scripts/getData';
import {getPermissions} from '../../scripts/helper';
import PendingTaskList from './notification/PendingTaskList';
import ActiivityBulkUpload from './activity-bulk-upload/index';
import SubTaskActivityCreate from './project-activity-list/SubTaskActivtyCreate';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;
 
const components = {
    "my-task-activity": MytaskActivity,
    "task-activity-list": ProjectActivityList,
    "task-activity-details": TaskActivityDetails,
    "user-task-activity-calendar": UserActivityCalendar,
    "notification": Notification,
    "pending-task-list": PendingTaskList,
    "activity-bulk-upload": ActiivityBulkUpload,
    "task-sub-activity-create": SubTaskActivityCreate,
    //misc.
    // "not-found": ErrorPage,
    "not-found": EmptyPage,
};

class Panel extends Component {
    async componentDidMount() {
        // console.log('components', await getPermissions());

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
            if (!permNames.includes('Can view activity list')) {
                // components['task-activity-list'] = ErrorPage;
                components['task-activity-list'] = EmptyPage;
            }
            if (!permNames.includes('Can view user activity list')) {
                // components['my-task-activity'] = ErrorPage;
                components['my-task-activity'] = EmptyPage;
            }
            if (!permNames.includes('Can view milestone calender')) {
                // components['user-task-activity-calendar'] = ErrorPage;
                components['user-task-activity-calendar'] = EmptyPage;
            }
            if (!permNames.includes('Show all notifications')) {
                // components.notification = ErrorPage;
                components.notification = EmptyPage;
            }
            if (!permNames.includes('Show all notifications')) {
                components.PendingTaskList = EmptyPage;
                // components.PendingTaskList = ErrorPage;
            }
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
