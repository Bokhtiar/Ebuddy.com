import React, { Component } from 'react'
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Panel from "./Panel";
import Sidebar from "../commons/Sidebar";
import {cbs} from "../../scripts/routes";
import {getPermissions} from "../../scripts/helper";

const Wrapper = styled.div`
  height: 100%;
  width: 100%; 
`;

class CBSPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newCBSPanel: {}
        };
    }

    
    componentDidMount() {
        // console.log('permissions',getPermissions() )
        getPermissions()
        .then(response => {
            if (response && response.length) {
                const permNames = response.map((item) => item.name);

                cbs.items.forEach(item => {
                    if (item.name === 'Approval(Dept)' && !permNames.includes('Can approve cbs(Dept)')) {
                        item.notVisible = true
                    }

                    if (item.name === 'Approval(Accounts & Finance)' && !permNames.includes('Can approve cbs(Finance)')) {
                        item.notVisible = true
                    }

                    if (item.name === 'CBS Payments' && !permNames.includes('Can approve cbs(Finance)')) {
                        item.notVisible = true
                    }

                    // if ((item.name === 'Approval(Accounts & Finance)') && (item.name ===  "CBS Payments") && !permNames.includes('Can approve cbs(Finance)')) {
                    //     item.notVisible = true
                    // }


                    // if (item.name === 'Task Review' && !permNames.includes('Can view activity review list')) {
                    //     item.notVisible = true
                    // }

                    // if (item.name === 'Milestone Review' && !permNames.includes('Can view milestone review list')) {
                    //     item.notVisible = true
                    // }

                    // if (item.name === 'Milestone Calendar' && !permNames.includes('Can view milestone calender')) {
                    //     item.notVisible = true
                    // }

                    // if (item.name === 'Report' && !permNames.includes('Can view milestone calender')) {
                    //     item.notVisible = true
                    // }
                });
                
                this.setState({newCBSPanel: cbs})
            }
        })
    }

    render() {
        return (
            <Wrapper className="flex_r">
                {/* <Sidebar sidebar={supervisorPanel} /> */}
                <Sidebar sidebar={this.state.newCBSPanel} />
                <div style={{ width: "100%", overflow: "hidden"}}>
                    <Route path="/cbs" component={Panel} exact />
                    <Route path="/cbs/:name" component={Panel} exact />
                </div>
            </Wrapper>
        )
    }
}

export default connect()(CBSPanel);
