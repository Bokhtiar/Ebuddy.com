import React, { Component } from 'react'
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Panel from "./Panel";
import Sidebar from "../commons/Sidebar";
import {feedback} from "../../scripts/routes";
import {getPermissions} from "../../scripts/helper";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
          newFeedback: {}
        };
    }

    componentDidMount() {
        getPermissions()
        .then(response => {
            if (response && response.length) {
                const permNames = response.map((item) => item.name);

                feedback.items.forEach(item => {
                    if (((item.name === 'Configuration')) && !permNames.includes('Can config feedback')) {
                        item.notVisible = true
                    }
                    // else if (((item.name === 'Card List') || (item.name === 'Card Create')) && !permNames.includes('Can config pitch-card')) {
                    // item.notVisible = true
                    // }
                    // else if (((item.name === 'Question List') || (item.name === 'Question Linkup')) && !permNames.includes('Can config pitch-card feedback')) {
                    // item.notVisible = true
                    // }
                    // else if ((item.name === 'Configuration') && !permNames.includes('Can manage pitch configuration')) {
                    // item.notVisible = true
                    // }
                    // else if ((item.name === 'Bulk Upload') && !permNames.includes('Can upload pitch configuration')) {
                    // item.notVisible = true
                    // }
                });
                
                this.setState({newFeedback: feedback})
            }
        })
    }

    render() {
        return (
            <Wrapper className="flex_r">
                {/* <Sidebar sidebar={pitch} /> */}
                <Sidebar sidebar={this.state.newFeedback} />
                <div style={{ width: "100%", overflow: "hidden"}}>
                    <Route path="/feedback" component={Panel} exact />
                    <Route path="/feedback/:name" component={Panel} exact />
                    <Route path="/feedback/:name/:id" component={Panel} exact />
                </div>
            </Wrapper>
        )
    }
}

export default connect()(Feedback);
