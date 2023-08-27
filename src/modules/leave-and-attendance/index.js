import React, { Component } from 'react'
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Panel from "./Panel";
import Sidebar from "../commons/Sidebar";
import {leaveAndAttendance} from "../../scripts/routes";
// import {getPermissions} from "../../scripts/helper";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

class LeaveAndAttendance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newLeaveAndAttendance: {}
        };
    }

    // componentDidMount() {
    //     // console.log('permissions',getPermissions() )
    //     getPermissions()
    //     .then(response => {
    //         if (response && response.length) {
    //             const permNames = response.map((item) => item.name);

    //             employeeRegister.items.forEach(item => {
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
    //             });
                
    //             this.setState({newLeaveAndAttendance: leaveAndAttendance})
    //         }
    //     })
    // }

    render() {
        return (
            <Wrapper className="flex_r">
                <Sidebar sidebar={leaveAndAttendance} />
                {/* <Sidebar sidebar={this.state.newEmployeeRegister} /> */}
                <div style={{ width: "100%", overflow: "hidden"}}>
                    <Route path="/leave-and-attendance" component={Panel} exact />
                    <Route path="/leave-and-attendance/:name" component={Panel} exact />
                    <Route path="/leave-and-attendance/:name/:id" component={Panel} exact />
                </div>
            </Wrapper>
        )
    }
}

export default connect()(LeaveAndAttendance);
