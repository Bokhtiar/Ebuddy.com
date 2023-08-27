import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import Panel from "./Panel";
import Sidebar from "../commons/Sidebar";
import { cbs } from "../../scripts/routes";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

class Cbs extends Component {
  constructor(props) {
    super(props);
    this.state = { sidebar: {} };
  }

  async componentDidMount() {
    this.setState({
      sidebar: await cbs()
    });
  }

  // Main method
  render() {
    return (
      <Wrapper className="flex_r">
        <Sidebar sidebar={this.state.sidebar} />
        <div style={{ width: "100%"}}>
          <Route path="/cbs" component={Panel} exact />
          <Route path="/cbs/:name" component={Panel} exact />
          <Route path="/cbs/:name/:page/:id" component={Panel} exact />
          <Route
            path="/cbs/:name/:page/:id/:details/:cbs_id"
            component={Panel}
            exact
          />
          <Route
            path="/cbs/:name/:page/:id/:details/:cbs_id/:mod"
            component={Panel}
          />
        </div>
      </Wrapper>
    );
  }
}

export default connect()(Cbs);
