import React, { Component } from 'react';
import styled from "styled-components";
import { ErrorPage } from "../commons/ErrorPage";
import FeedbackListConfig from "./configuration/feedback/list";
import FeedbackForm from "./configuration/feedback/form";
import CardList from "./configuration/card/list";
import CardForm from "./configuration/card/form";
import QuestionList from "./configuration/question/list";
import QuestionForm from "./configuration/question/form";
import FeedbackSubmissionList from "./configuration/feedback-submission/list";
import FeedbackSubmissionInitiate from "./configuration/feedback-submission/initiate";
import FeedbackCardWiseQuestion from "./configuration/feedback-submission/card-wise-question-answer";
import UserWiseFeedbackList from "./user-wise-feedback-list";
import FeedbackCardWiseQuestionView from "./user-wise-feedback-list/feedback-card-wise-question-view";
// import PitchList from "./list";
import FeedbackBulkUpload from "./bulk-upload";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const components = {
    "user-wise-feedback-list": UserWiseFeedbackList,
    "config-feedback-list": FeedbackListConfig,
    "config-feedback-form": FeedbackForm,
    "config-feedback-card-list": CardList,
    "config-feedback-card-form": CardForm,
    "config-feedback-question-list": QuestionList,
    "config-feedback-question-form": QuestionForm,
    "my-feedback-list": FeedbackSubmissionList,
    "my-feedback-submission-initiate": FeedbackSubmissionInitiate,
    "my-feedback-card-wise-question-list": FeedbackCardWiseQuestion,
    "feedback-card-wise-question-view": FeedbackCardWiseQuestionView,
    // "feedback-list": PitchList,
    "feedback-bulk-upload": FeedbackBulkUpload,
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
