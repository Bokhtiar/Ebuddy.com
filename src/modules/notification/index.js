import React, { Component } from 'react'
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Panel from "./Panel";
import Sidebar from "../commons/Sidebar";
import {notification} from "../../scripts/routes";
import {getPermissions} from "../../scripts/helper";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
          newNotification: {}
        };
    }

    componentDidMount() {
        getPermissions()
        .then(response => {
            if (response && response.length) {
                const permNames = response.map((item) => item.name);

                // notification.items.forEach(item => {
                //     if (item.name === 'Notification List' && !permNames.includes('Can manage User')) {
                //         item.notVisible = true
                //     }
                // });
                
                // this.setState({newNotification: notification})
            }
        })
    }

    render() {
        return (
            <Wrapper className="flex_r">
                <Sidebar sidebar={notification} />
                {/* <Sidebar sidebar={this.state.newNotification} /> */}
                <div style={{ width: "100%", overflow: "hidden"}}>
                    <Route path="/notification" component={Panel} exact />
                    <Route path="/notification/:name" component={Panel} exact />
                    <Route path="/notification/:name/:id" component={Panel} exact />
                </div>
            </Wrapper>
        )
    }
}

export default connect()(Notification);
