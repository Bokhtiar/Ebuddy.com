import React, {Component} from "react";
import {connect} from "react-redux";
import {Route} from "react-router-dom";
import styled from "styled-components";
import Panel from "./Panel";
import Sidebar from "../commons/Sidebar";
import {supervisorBoard} from "../../scripts/routes";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

class SupervisorBoard extends Component {
    // Main method
    render() {
        return (
            <Wrapper className="flex_r">
                <Sidebar sidebar={supervisorBoard}/>
                <div style={{width: "100%"}}>
                    <Route path="/supervisor-board" component={Panel} exact/>
                    <Route path="/supervisor-board/:name" component={Panel} exact/>
                </div>
            </Wrapper>
        );
    }
}

export default connect()(SupervisorBoard);
