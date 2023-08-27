import React, { Component } from 'react'
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Panel from "./Panel";
import Sidebar from "../commons/Sidebar";
import {employeeRegister} from "../../scripts/routes";
import {getPermissions} from "../../scripts/helper";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

class EmployeeRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newEmployeeRegister: {}
        };
    }

    componentDidMount() {
        getPermissions()
        .then(response => {
            if (response && response.length) {
                const permNames = response.map((item) => item.name);

                employeeRegister.items.forEach(item => {
                    if (item.name === 'Users' && !permNames.includes('Can manage User')) {
                        item.notVisible = true
                    }
                });
                
                this.setState({newEmployeeRegister: employeeRegister})
            }
        })
    }

    render() {
        return (
            <Wrapper className="flex_r">
                {/* <Sidebar sidebar={employeeRegister} /> */}
                <Sidebar sidebar={this.state.newEmployeeRegister} />
                <div style={{ width: "100%", overflow: "hidden"}}>
                    <Route path="/employee-register" component={Panel} exact />
                    <Route path="/employee-register/:name" component={Panel} exact />
                    <Route path="/employee-register/:name/:id" component={Panel} exact />
                </div>
            </Wrapper>
        )
    }
}

export default connect()(EmployeeRegister);
