import React from 'react';
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
import FeedbackBulkUpload from "./bulk-upload";
import { TimelineList } from './list/timelineList';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const components = {
    "timeline-list": TimelineList,
    "user-wise-timeline-list": UserWiseFeedbackList,
    "config-timeline-list": FeedbackListConfig,
    "config-timeline-form": FeedbackForm,
    "config-timeline-card-list": CardList,
    "config-timeline-card-form": CardForm,
    "config-timeline-question-list": QuestionList,
    "config-timeline-question-form": QuestionForm,
    "my-timeline-list": FeedbackSubmissionList,
    "my-timeline-submission-initiate": FeedbackSubmissionInitiate,
    "my-timeline-card-wise-question-list": FeedbackCardWiseQuestion,
    "timeline-card-wise-question-view": FeedbackCardWiseQuestionView,
    // "feedback-list": PitchList,
    "timeline-bulk-upload": FeedbackBulkUpload,
    //misc.
    "not-found": ErrorPage,
};

const Panel = ({ match }) => {
    const Tag =
        match.params.name in components
            ? components[match.params.name]
            : !match.params.name || match.params.name === "/"
                ? components["attendance"]
                : components["not-found"];

    return (
        <Wrapper>
            <Tag params={match.params} />
        </Wrapper>
    );
};

export default Panel;
