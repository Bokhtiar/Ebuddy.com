import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import styled from "styled-components";
import Panel from "./Panel";
import Sidebar from "../commons/Sidebar";
import { roles } from "../../scripts/routes";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

class Roles extends Component {
  // Main method
  render() {
    return (
      <Wrapper className="flex_r">
        <Sidebar sidebar={roles} />
        <div style={{ width: "100%" }}>
          <Route path="/roles/" component={Panel} exact />
          <Route path="/roles/:name" component={Panel} exact />
        </div>
      </Wrapper>
    );
  }
}

export default connect()(Roles);
