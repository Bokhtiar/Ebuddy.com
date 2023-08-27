import React, {Component} from "react";
import styled from "styled-components";
import {ErrorPage} from "../commons/ErrorPage";
import QuarterTargetList from './quarter-target-list';
import TargetVsAchievement from './target-vs-achievement';
import TargetView from './target-view';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const components = {
    "quarter-target-list": QuarterTargetList,
    "target-vs-achievement": TargetVsAchievement,
    "target-view": TargetView,
    "not-found": ErrorPage,
};

class Panel extends Component {
    render() {
        const Tag =
            this.props.match.params.name in components
                ? components[this.props.match.params.name]
                : !this.props.match.params.name || this.props.match.params.name === "/"
                ? components["attendance"]
                : components["not-found"];
        console.info(this.props.match);
        return (
            <Wrapper>
                <Tag params={this.props.match.params}/>
            </Wrapper>
        );
    }
}

export default Panel;
