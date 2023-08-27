import React, { Component } from 'react'
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Panel from "./Panel";
import Sidebar from "../commons/Sidebar";
import {pitch} from "../../scripts/routes";
import {getPermissions} from "../../scripts/helper";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

class Pitch extends Component {
    constructor(props) {
        super(props);
        this.state = {
          newPitchManager: {}
        };
    }

    componentDidMount() {
        getPermissions()
        .then(response => {
            if (response && response.length) {
                const permNames = response.map((item) => item.name);

                pitch.items.forEach(item => {
                    if (((item.name === 'Pitch List') || (item.name === 'Pitch Create')) && !permNames.includes('Can config pitch')) {
                        item.notVisible = true
                    }
                    else if (((item.name === 'Card List') || (item.name === 'Card Create')) && !permNames.includes('Can config pitch-card')) {
                    item.notVisible = true
                    }
                    else if (((item.name === 'Question List') || (item.name === 'Question Linkup')) && !permNames.includes('Can config pitch-card feedback')) {
                    item.notVisible = true
                    }
                    else if ((item.name === 'Configuration') && !permNames.includes('Can manage pitch configuration')) {
                    item.notVisible = true
                    }
                    else if ((item.name === 'Bulk Upload') && !permNames.includes('Can upload pitch configuration')) {
                    item.notVisible = true
                    }
                });
                
                this.setState({newPitchManager: pitch})
            }
        })
    } 

    render() {
        return (
            <Wrapper className="flex_r">
                {/* <Sidebar sidebar={pitch} /> */}
                <Sidebar sidebar={this.state.newPitchManager} />
                <div style={{ width: "100%", overflow: "hidden"}}>
                    <Route path="/pitch" component={Panel} exact />
                    <Route path="/pitch/:name" component={Panel} exact />
                    <Route path="/pitch/:name/:id" component={Panel} exact />
                </div>
            </Wrapper>
        )
    }
}

export default connect()(Pitch);
