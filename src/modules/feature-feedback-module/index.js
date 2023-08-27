import React, { Component } from 'react'
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Panel from "./Panel";
import Sidebar from "../commons/Sidebar";
import {featureFeedbackModule} from "../../scripts/routes";
import {getPermissions} from "../../scripts/helper";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

class FeatureFeedbackModule extends Component {
    constructor(props) {
        super(props);
        this.state = {
          newFeatureFeedbackModule: {}
        };
    }

    // componentDidMount() {
    //     getPermissions()
    //     .then(response => {
    //         if (response && response.length) {
    //             const permNames = response.map((item) => item.name);

    //             featureFeedbackModule.items.forEach(item => {
    //                 if (item.name === 'Notification List' && !permNames.includes('Can manage User')) {
    //                     item.notVisible = true
    //                 }
    //             });
                
    //             this.setState({newFeatureFeedbackModule: featureFeedbackModule})
    //         }
    //     })
    // }

    render() {
        return (
            <Wrapper className="flex_r">
                <Sidebar sidebar={featureFeedbackModule} />
                {/* <Sidebar sidebar={this.state.newNotification} /> */}
                <div style={{ width: "100%", overflow: "hidden"}}>
                    <Route path="/ffm" component={Panel} exact />
                    <Route path="/ffm/:name" component={Panel} exact />
                    <Route path="/ffm/:name/:id" component={Panel} exact />
                </div>
            </Wrapper>
        )
    }
}

export default connect()(FeatureFeedbackModule);
