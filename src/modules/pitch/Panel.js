import React, { Component } from 'react';
import styled from "styled-components";
import { ErrorPage } from "../commons/ErrorPage";
import PitchListConfig from "./configuration/pitch-list";
import PitchCreate from "./configuration/pitch-create";
import CardList from "./configuration/card-list";
import CardCreate from "./configuration/card-create";
import QuestionList from "./configuration/question-list";
import QuestionLinkup from "./configuration/question-linkup";
import PitchList from "./list";
import PitchBulkUpload from "./upload";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;
 
const components = {
    "config-pitch-list": PitchListConfig,
    "config-pitch-create": PitchCreate,
    "config-pitch-card-list": CardList,
    "config-pitch-card-create": CardCreate,
    "config-pitch-question-list": QuestionList,
    "config-pitch-question-linkup": QuestionLinkup,
    "pitch-list": PitchList,
    "pitch-bulk-upload": PitchBulkUpload,
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
        const Tag =
            this.props.match.params.name in components
                ? components[this.props.match.params.name]
                : !this.props.match.params.name || this.props.match.params.name === "/"
                ? components["attendance"]
                : components["not-found"];
            return (
            <Wrapper>
                <Tag params={this.props.match.params} />
            </Wrapper>
            );
    }
}

export default Panel;
