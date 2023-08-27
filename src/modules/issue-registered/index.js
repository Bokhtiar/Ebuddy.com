import React, { Component } from 'react'
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Panel from "./Panel";
import Sidebar from "../commons/Sidebar";
import {issueRegister} from "../../scripts/routes";
// import {getPermissions} from "../../scripts/helper";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

class IssueRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newIssueRegister: {}
        };
    }

    // componentDidMount() {
    //     // console.log('permissions',getPermissions() )
    //     getPermissions()
    //     .then(response => {
    //         if (response && response.length) {
    //             const permNames = response.map((item) => item.name);

    //             supervisorPanel.items.forEach(item => {
    //                 if (item.name === 'Employee List' && !permNames.includes('View KAM list')) {
    //                     item.notVisible = true
    //                 }

    //                 if (item.name === 'Projects List' && !permNames.includes('View project list by KAM')) {
    //                     item.notVisible = true
    //                 }

    //                 if (item.name === 'Task Review' && !permNames.includes('Can view activity review list')) {
    //                     item.notVisible = true
    //                 }

    //                 if (item.name === 'Milestone Review' && !permNames.includes('Can view milestone review list')) {
    //                     item.notVisible = true
    //                 }

    //                 if (item.name === 'Milestone Calendar' && !permNames.includes('Can view milestone calender')) {
    //                     item.notVisible = true
    //                 }

    //                 if (item.name === 'Report' && !permNames.includes('Can view milestone calender')) {
    //                     item.notVisible = true
    //                 }
    //             });
                
    //             this.setState({newSupervisorPanel: supervisorPanel})
    //         }
    //     })
    // }

    render() {
        console.log('sidebaraaaaaaaaaaa', issueRegister);

        return (
            <Wrapper className="flex_r">
                <Sidebar sidebar={issueRegister} />
                {/* <Sidebar sidebar={this.state.newSupervisorPanel} /> */}
                <div style={{ width: "100%", overflow: "hidden"}}>
                    <Route path="/issue-register" component={Panel} exact />
                    <Route path="/issue-register/:name" component={Panel} exact />
                    <Route path="/issue-register/:name/:id" component={Panel} exact />
                </div>
            </Wrapper>
        )
    }
}

export default connect()(IssueRegister);
