import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import styled from "styled-components";
import Panel from "./Panel";
import Sidebar from "../commons/Sidebar";
import { hris } from "../../scripts/routes";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

class Hris extends Component {
  // Main method
  render() {
    return (
      <Wrapper className="flex_r">
        <Sidebar sidebar={hris} />
        <div style={{ width: "100%" }}>
          <Route path="/hris" component={Panel} exact />
          <Route path="/hris/:name" component={Panel} exact />
          <Route path="/hris/:name/:page" component={Panel} />
        </div>
      </Wrapper>
    );
  }
}

export default connect()(Hris);
