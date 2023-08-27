import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import './index.scss'
import { Wrapper } from "../commons/Wrapper";
import Sidebar from "../commons/Sidebar";
import { error404 } from "../../scripts/error";
import { task_manager } from "../../scripts/routes";
import MyTask from "./MyTask";
import AddNew from "./AddNew";
import Delayed from "./Delayed";
import Details from "./Details";
import Projects from "./Projects";
import AddProject from "./AddProject";
import Subordinates from "./Subordinates";

const components = {
  "my-tasks": MyTask,
  "not-found": error404,
  "add-new": AddNew,
  "delayed-task": Delayed,
  projects: Projects,
  "create-new": AddProject,
  details: Details,
  update: AddNew,
  subordinates: Subordinates,
  "subordinate-tasks": MyTask,
  "assigned-by-me" : MyTask
};

export default class TaskManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //todo
    };
  }

  componentDidMount() {
    this.setState({
      sidebar: task_manager(),
    });
  }

  // Main method
  render() {
    return (
      <Wrapper no-pad className="flex_r">
        <Sidebar sidebar={this.state.sidebar} />
        <Switch style={{ width: "100%" }}>
          <Route path="/tasks" component={Panel} exact />
          <Route path="/tasks/:name" component={Panel} exact />
          <Route path="/tasks/:name/:page" component={Panel} exact />
          <Route path="/tasks/:name/:page/:status" component={Panel} exact />
          <Route
            path="/tasks/:name/:page/:status/:details"
            component={Panel}
            exact
          />
          <Route
            path="/tasks/:name/:page/:status/:details/:update"
            component={Panel}
            exact
          />
          <Route
            path="/tasks/:name/:page/:status/:details/:task/:tpage/:tstatus"
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
    const Tag =
      this.props.match.params.update &&
      this.props.match.params.update === "update"
        ? components["update"]
        : this.props.match.params.page &&
          this.props.match.params.page === "create-new"
        ? components["create-new"]
        : this.props.match.params.details &&
          this.props.match.params.details === "view"
        ? components['my-tasks']
        : this.props.match.params.details
        ? components["details"]
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
