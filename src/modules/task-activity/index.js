/** @format */

import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Panel from "./Panel";
import Sidebar from "../commons/Sidebar";
import { taskActivity } from "../../scripts/routes";
import { getData } from "../../scripts/api-service";
import {
  UNREAD_NOTIFICATION_COUNT,
  UNREAD_PENDING_TASK_NOTIFICATION_COUNT,
} from "../../scripts/api";
import { getPermissions } from "../../scripts/helper";

const Wrapper = styled.div`
  height: 100%;
  width: calc(100% - 5rem);
  padding: 1rem;
`;

class TaskActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTaskActivity: {},
    };
  }

  componentDidMount() {
    this.getNoficationCount();
    this.getPendingTaskNoficationCount();

    getPermissions().then((response) => {
      if (response && response.length) {
        const permNames = response.map((item) => item.name);

        taskActivity.items.forEach((item) => {
          if (
            item.name === "Task/Activity List" &&
            !permNames.includes("Can view activity list")
          ) {
            item.notVisible = true;
          }

          if (
            item.name === "My Task/Activity List" &&
            !permNames.includes("Can view user activity list")
          ) {
            item.notVisible = true;
          }

          if (
            item.name === "User Task/Activity Calendar" &&
            !permNames.includes("Can view milestone calender")
          ) {
            item.notVisible = true;
          }

          if (
            item.name === "Notification" &&
            !permNames.includes("Show all notifications")
          ) {
            item.notVisible = true;
          }

          if (
            item.name === "Activity Bulk Upload" &&
            !permNames.includes("Can upload bulk activities")
          ) {
            item.notVisible = true;
          }
        });

        this.setState({ newTaskActivity: taskActivity });
      }
    });
  }

  getNoficationCount = async () => {
    let res = await getData(UNREAD_NOTIFICATION_COUNT);

    if (res) {
      let masterData = res?.data?.data?.unraed_notification_count;
      let ele = document.getElementById("js-noticefication-count");

      if (masterData) {
        let count = null;

        if (masterData < 10) {
          count = masterData;
        } else {
          count = "9+";
        }

        if (count) {
          if (ele) {
            ele.innerText = count;
            ele.style.display = "inline";

            if (count !== "9+") ele.style.padding = "3px 7px";
          }
        } else {
          ele.style.display = "none";
        }
      } else {
        // ele.style.display = "none";
      }
    }
  };

  getPendingTaskNoficationCount = async () => {
    let res = await getData(UNREAD_PENDING_TASK_NOTIFICATION_COUNT);
    if (res) {
      let masterData = res?.data?.data?.unraed_pending_notification_count;
      let ele = document.getElementById("js-pending-task-noticefication-count");

      if (masterData) {
        let count = null;

        if (masterData < 10) {
          count = masterData;
        } else {
          count = "9+";
        }

        if (count) {
          if (ele) {
            ele.innerText = count;
            ele.style.display = "inline";

            if (count !== "9+") ele.style.padding = "3px 7px";
          }
        } else {
          ele.style.display = "none";
        }
      } else {
        // ele.style.display = "none";
      }
    }
  };

  render() {
    return (
      <Wrapper className="flex_r">
        {/* <Sidebar sidebar={taskActivity} />   */}
        <Sidebar sidebar={this.state.newTaskActivity} />
        <div style={{ width: "100%", overflow: "hidden" }}>
          <Route path="/task-activity" component={Panel} exact />
          <Route path="/task-activity/:name" component={Panel} exact />
        </div>
      </Wrapper>
    );
  }
}

export default connect()(TaskActivity);
