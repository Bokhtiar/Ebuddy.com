import React, { Component } from 'react';
import styled from "styled-components";
import { ErrorPage } from "../commons/ErrorPage";
import ProjectServiceList from './configuration/project-service/list';
import ProjectServiceCreate from './configuration/project-service/create';
import ProjectServiceUpdate from './configuration/project-service/update';
import ServiceModuleList from './configuration/service-module/list';
import ServiceModuleCreate from './configuration/service-module/create';
import ServiceModuleUpdate from './configuration/service-module/update';
import ServiceModuleFeatureList from './configuration/service-module-feature/list';
import ServiceModuleFeatureCreate from './configuration/service-module-feature/create';
import ServiceModuleFeatureUpdate from './configuration/service-module-feature/update';
import FeatureWiseFeedbackList from './feature-wise-feedback/list';
//feedback
import FeedbackList from './feedback/feedback-type/list';
import FeedbackCreate from './feedback/feedback-type/create';
import FeedbackUpdate from './feedback/feedback-type/update';
import FeedbackOptionList from './feedback/feedback-option/list';
import FeedbackOptionCreate from './feedback/feedback-option/create';
import FeedbackOptionUpdate from './feedback/feedback-option/update';
import FeedbackOptionReasonList from './feedback/feedback-option-reason/list';
import FeedbackOptionReasonCreate from './feedback/feedback-option-reason/create';
import FeedbackOptionReasonUpdate from './feedback/feedback-option-reason/update';
import FeedbackConfigurationList from './feedback/feedback-configuration/list';
import FeedbackConfigurationCreate from './feedback/feedback-configuration/create';
import FeedbackConfigurationUpdate from './feedback/feedback-configuration/update';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const components = {
    //configuration
    "config-project-service-list": ProjectServiceList,
    "config-project-service-create": ProjectServiceCreate,
    "config-project-service-update": ProjectServiceUpdate,
    "config-service-module-list": ServiceModuleList,
    "config-service-module-create": ServiceModuleCreate,
    "config-service-module-update": ServiceModuleUpdate,
    "config-service-module-feature-list": ServiceModuleFeatureList,
    "config-service-module-feature-create": ServiceModuleFeatureCreate,
    "config-service-module-feature-update": ServiceModuleFeatureUpdate,
    //feedback
    "config-feedback-list": FeedbackList,
    "config-feedback-create": FeedbackCreate,
    "config-feedback-update": FeedbackUpdate,
    "config-feedback-option-list": FeedbackOptionList,
    "config-feedback-option-create": FeedbackOptionCreate,
    "config-feedback-option-update": FeedbackOptionUpdate,
    "config-feedback-option-reason-list": FeedbackOptionReasonList,
    "config-feedback-option-reason-create": FeedbackOptionReasonCreate,
    "config-feedback-option-reason-update": FeedbackOptionReasonUpdate,
    "config-feedback-configuration-list": FeedbackConfigurationList,
    "config-feedback-configuration-create": FeedbackConfigurationCreate,
    "config-feedback-configuration-update": FeedbackConfigurationUpdate,
    //feature wise feedback list
    "feature-wise-feedback-list": FeatureWiseFeedbackList,
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
