import React, { Component } from 'react';
import styled from "styled-components";
import { ErrorPage } from "../commons/ErrorPage";
import SOP from "./configuration/sop";
import FunctionName from "./configuration/function-name";
import FunctionType from "./configuration/function-type";
import ActivityList from "./activity/activity-list";
import ActivityLinkup from "./activity/activity-linkup";
import ActivityReview from "./activity/activity-review";
import ActivityMyList from "./activity/activity-my-list";
import ActivityTeamList from "./activity/activity-team-list";
import ActivityCreate from "./activity/common/activity-create";
import ActivityUpdate from "./activity/common/activity-update";
import SOPActivityDetails from "./activity/activity-details";
import SOPUpload from "./activity/upload";
import SOPList from "./manager/list";
import SOPInitiate from "./manager/initiate";
import SOPInitiateView from "./manager/list/sop-initiate-view";
import SOPInitiateClone from "./manager/list/sop-initiate-clone";

const Wrapper = styled.div`
  height: 100%;
  width: calc(100% - 4rem);
`;

const components = {
    //configuration
    "configuration": SOP,
    "configuration-function-name": FunctionName,
    "configuration-function-type": FunctionType,
    //activity
    "activity-list": ActivityList,
    "activity-linkup": ActivityLinkup,
    "activity-review": ActivityReview,
    "activity-upload": SOPUpload,
    "list-sop-activity-create": ActivityCreate,
    "list-sop-activity-update": ActivityUpdate,
    "list-my-sop-activity": ActivityMyList,
    "list-team-sop-activity": ActivityTeamList,
    "list-sop-activity-details": SOPActivityDetails,
    //manager
    "sop-list": SOPList,
    "sop-initiate": SOPInitiate,
    "sop-initiate-view": SOPInitiateView,
    "sop-initiate-clone": SOPInitiateClone,
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
