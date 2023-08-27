import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Wrapper } from "../commons/Wrapper";
import Sidebar from "../commons/Sidebar";
import { error404 } from "../../scripts/error";
import { utility } from "../../scripts/routes";
import Topup from "./Topup";

const components = {
  "top-up": Topup,
  "not-found": error404
};

export default class Utility extends Component {
  // Main method
  render() {
    return (
      <Wrapper no-pad className="flex_r">
        <Sidebar sidebar={utility} />
        <Switch style={{ width: "100%" }}>
          <Route path="/utility" component={Panel} exact />
          <Route path="/utility/:name" component={Panel} exact />
        </Switch>
      </Wrapper>
    );
  }
}

class Panel extends Component {
  render() {
    const Tag =
      this.props.match.params.name in components
        ? components[this.props.match.params.name]
        : !this.props.match.params.name || this.props.match.params.name === "/"
        ? components["top-up"]
        : components["not-found"];
    return (
      <Wrapper no-pad>
        <Tag params={this.props.match.params} />
      </Wrapper>
    );
  }
}
