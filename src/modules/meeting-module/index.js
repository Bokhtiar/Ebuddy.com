import React, { Component } from 'react'
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Panel from "./Panel";
import Sidebar from "../commons/Sidebar";
import {meeting} from "../../scripts/routes";
import {getPermissions} from "../../scripts/helper";

const Wrapper = styled.div`
  height: 100%;
  width: 97%;
`;

class Meeting extends Component {
    constructor(props) {
        super(props);
        this.state = {
          newMeeting: {}
        };
    }

    componentDidMount() {
        getPermissions()
        .then(response => {
            if (response && response.length) {
                const permNames = response.map((item) => item.name);

                meeting.items.forEach(item => {
                    if (item.name === 'Meeting List' && !permNames.includes('Can view meeting list')) {
                        item.notVisible = true
                    }
                });
                
                this.setState({newMeeting: meeting})
            }
        })
    }

    render() {  
        return ( 
            <Wrapper className="flex_r">
                {/* <Sidebar sidebar={meeting} /> */}
                <Sidebar sidebar={this.state.newMeeting} />
                <div style={{ width: "100%", overflow: "hidden"}}>
                   
                    <Route path="/meeting" component={Panel} exact />
                    <Route path="/meeting/:name" component={Panel} exact />
                    <Route path="/meeting/:name/:id" component={Panel} exact />
                </div>
            </Wrapper>
        )
    }
}

export default connect()(Meeting);
