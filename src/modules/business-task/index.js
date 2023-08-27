import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Wrapper } from "../commons/Wrapper";
import Sidebar from "../commons/Sidebar";
import { error404 } from "../../scripts/error";
import { biz_task } from "../../scripts/routes";
import MyTask from "./MyTask";
import AddNew from "./AddNew";
import Details from "./Details";
import Report from "./Report";

const components = {
  "my-tasks": MyTask,
  "not-found": error404,
  "add-new": AddNew,
  "details": Details,
  "report" : Report
};

export default class BizTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //todo
    };
  }

  // Main method
  render() {
    return (
      <Wrapper no-pad className="flex_r">
        <Sidebar sidebar={biz_task} />
        <Switch style={{ width: "100%" }}>
          <Route path="/quick-tasks" component={Panel} exact />
          <Route path="/quick-tasks/:name" component={Panel} exact />
          <Route path="/quick-tasks/:name/:page" component={Panel} exact />
          <Route path="/quick-tasks/:name/:page/:status" component={Panel} exact />
          <Route
            path="/quick-tasks/:name/:page/:status/:details"
            component={Panel}
            exact
          />
          <Route
            path="/quick-tasks/:name/:page/:status/:details/:update"
            component={Panel}
            exact
          />
          <Route path="*" component={error404} exact />
        </Switch>
      </Wrapper>
    );
  }
}

class Panel extends Component {
  render() {
    const Tag = this.props.match.params.update
      ? components["update"]
      : this.props.match.params.page &&
        this.props.match.params.page === "create-new"
      ? components["create-new"]
      : this.props.match.params.details
      ? components["details"]
      : this.props.match.params.name &&
        this.props.match.params.name.includes("subordinate-")
      ? components["subordinate-tasks"]
      : this.props.match.params.name in components
      ? components[this.props.match.params.name]
      : !this.props.match.params.name || this.props.match.params.name === "/"
      ? components["my-tasks"]
      : components["not-found"];
    return (
      <Wrapper no-pad>
        <Tag params={this.props.match.params} />
      </Wrapper>
    );
  }
}
