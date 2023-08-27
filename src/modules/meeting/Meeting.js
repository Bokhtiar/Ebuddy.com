import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Panel from "./Panel";
import Sidebar from "../commons/Sidebar";
import { meeting } from "../../scripts/routes";
import { error404 } from "../../scripts/error";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

class Meeting extends Component {
  // Main method
  render() {
    return (
      <Wrapper className="flex_r">
        <Sidebar sidebar={meeting} />
        <Switch style={{ width: "100%" }}>
          <Route path="/meeting/:name" component={Panel} exact />
          <Route path="/meeting/:name/:page/:status" component={Panel} exact />
          <Route
            path="/meeting/:name/:page/:status/:id"
            component={Panel}
            exact
          />
          <Route
            path="/meeting/:name/:page/:status/:id/:mod"
            component={Panel}
          />
          <Route component={error404} exact />
        </Switch>
      </Wrapper>
    );
  }
}

export default connect()(Meeting);
