import React, { Component } from 'react';
import styled from "styled-components";
import { ErrorPage } from "../commons/ErrorPage";
import MeetingList from './meeting-list';
import MyMeetingList from './my-meeting-list';
import MeetingCreate from './meeting-create';
import MeetingUpdate from './meeting-update';
import MeetingDetails from './meeting-details';
import MeetingMinutes from './meeting-minutes';
import MeetingActionPoints from './meeting-action-points';
// import {getPermissions} from '../../scripts/helper';
// import Dashboard from './dashboard';
// import Dashboard from './dashboard-new';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const components = { 
    "meeting-list": MeetingList,
    "my-meeting-list": MyMeetingList,
    "meeting-create": MeetingCreate,
    "meeting-update": MeetingUpdate,
    "meeting-details": MeetingDetails,
    "meeting-minutes": MeetingMinutes,
    "meeting-action-points": MeetingActionPoints,
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
