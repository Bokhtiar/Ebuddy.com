import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
// import Meeting from "../modules/meeting/Meeting";
import Meeting from "../modules/meeting-module";
import Roles from "../modules/roles/Roles";
import Transport from "../modules/transport/Transport";
import Utility from "../modules/utility";
// import Cbs from "../modules/cbs/Cbs";
import Cbs from "../modules/cbs";
import Hris from "../modules/hris/Hris";
import TaskManager from "../modules/taskManager";
import BizTasks from "../modules/business-task";
import Landing from "../modules/dashboard";
import { Result, Empty, Skeleton } from "antd";
import Drawer from "./Drawer";
import SendNotification from "./SendNotification";
import { getData } from "../scripts/getData";
import { checkRes } from "../scripts/checkRes";
import { errorHandle } from "../scripts/error";
import Profile from "../modules/profile/Profile";
import HrSettings from "../modules/hris-settings";
import WorkFromHome from "../modules/work-from-home";
import LocateTeam from "../modules/locator";
import Cookies from "js-cookie";
import Configuration from "../modules/Configuration";
import Project from "../modules/Project-Page";
import TaskActivity from "../modules/task-activity";
import PerformanceAppraisal from "../modules/performance-appraisal";
import SupervisorBoard from "../modules/supervisor-board";
import SuperviserPanel from "../modules/supervisor-panel";
import ManagementPanel from "../modules/management-panel";
import IssueRegistered from "../modules/issue-registered";
import RevenueBoard from "../modules/revenue-board";
import EmployeeRegister from "../modules/employee-register";
import LeaveAndAttendance from "../modules/leave-and-attendance";
import ProjectManagement from "../modules/project-management";
import Notification from "../modules/notification";
import SOP from "../modules/sop";
import SalesDashboard from "../modules/sales-dashboard";
import TodoIndex from "../modules/todo";
import ProductIndex from "../modules/product";
import Pitch from "../modules/pitch";
import Feedback from "../modules/feedback";
import FeatureFeedbackModule from "../modules/feature-feedback-module";
import Timeline from "../modules/timeline";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  .drawer {
    width: 60px;
  }
  @media (max-width: 400px) {
    .drawer {
      width: 0;
    }
  }
`;

const error404 = () => {
  return (
    // <Result
    //   style={{ paddingTop: "8rem", width: "100%" }}
    //   status="404"
    //   title="404"
    //   subTitle="Sorry, the page you visited does not exist."
    // />
    // <Empty style={{ paddingTop: "10rem", width: "100%" }}/>
    <div style={{ paddingTop: "10rem", width: "100%" }}><Skeleton active /></div>
  );
};

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cbs: false,
      roles: false,
      notifications: false,
      configuration: false,
      projectPage: false,
      taskActivity: false,
      supervisorPanel: false,
      managementPanel: false,
      issueRegistered: false,
      locate: Cookies.get("profile")
        ? JSON.parse(Cookies.get("profile")).department === "Management"
          ? true
          : false
        : false,
    };
  }
  async componentDidMount() {
    let res = await getData("accounts/v1/get-my-permissions");
    if (checkRes(res?.status)) {
      sessionStorage.setItem("ebuddyPermission", JSON.stringify(res?.data?.data));
      this.setState({
        cbs:
          res.data.data.filter((elem) => {
            return elem.name === "Can Avail CBS";
          }).length > 0
            ? true
            : false,
        roles:
          res.data.data.filter((elem) => {
            return elem.name === "Can Manage Roles"//"Can Sent Notification";
          }).length > 0
            ? true
            : false,
        notifications:
          res.data.data.filter((elem) => {
            return elem.name === "Can Sent Notification";//"Can Manage Roles";
          }).length > 0
            ? true
            : false,
        configuration: res.data.data.filter((elem) => {
          return elem.name === "can view configuration page";//"Can Manage Roles";
        }).length > 0
          ? true
          : false,
        projectPage: res.data.data.filter((elem) => {
          return elem.name === "can view project page";//"Can Manage Roles";
        }).length > 0
          ? true
          : false,
        taskActivity: res.data.data.filter((elem) => {
          return elem.name === "can view Activity Page";//"Can Manage Roles";
        }).length > 0
          ? true
          : false,
        supervisorPanel: res.data.data.filter((elem) => {
          return elem.name === "can view Supervisor panel";//"Can Manage Roles";
        }).length > 0
          ? true
          : false,
      });
    } else {
      errorHandle(res);
    }

    let roles = await getData("accounts/v1/get-my-roles");
    if(checkRes(roles?.status)) {
      this.setState({
        supervisorPanel: roles?.data?.data?.map((elem) => {
          return elem === "supervisor";
        }).length > 0
          ? true
          : false,
        managementPanel: roles?.data?.data?.map((elem) => {
          return elem === "Management";
        }).length > 0
          ? true
          : false,
        issueRegistered: roles?.data?.data?.map((elem) => {
          return elem === "Management";
        }).length > 0
          ? true
          : false,
      });
    }
  }
  // Main method
  render() {
    const components = {
      meeting: Meeting,
      utility: Utility,
      roles: this.state.roles ? Roles : error404,
      // roles: Roles,
      transport: Transport,
      cbs: Cbs,
      landing: Landing,
      "send-notification": this.state.notifications
        ? SendNotification
        : error404,
      hris: Hris,
      profile: Profile,
      "hris-settings": HrSettings,
      tasks: TaskManager,
      "not-found": error404,
      "quick-tasks": BizTasks,
      "work-from-home": WorkFromHome,
      "locate-team": this.state.locate ? LocateTeam : error404,
      configuration: this.state.configuration ? Configuration : error404,
      "project-page": this.state.projectPage ? Project : error404,
      "task-activity": this.state.taskActivity ? TaskActivity : error404,
      "performance-appraisal": PerformanceAppraisal,
      "supervisor-board": SupervisorBoard,
      "supervisor-panel": this.state.supervisorPanel ? SuperviserPanel : error404,
      "management-panel": this.state.managementPanel ? ManagementPanel : error404,
      "issue-register": this.state.issueRegistered ? IssueRegistered : error404,
      "revenue-board": RevenueBoard,
      "employee-register": EmployeeRegister,
      "leave-and-attendance": LeaveAndAttendance,
      "project-management": ProjectManagement,
      "sop": SOP,
      "notification": Notification,
      "sales-dashboard": SalesDashboard,
      "pitch": Pitch,
      "ffm": FeatureFeedbackModule,
      "feedback": Feedback,
      "timeline": Timeline,
      "todo" : TodoIndex,
      "product" : ProductIndex,
    }; 

    const Tag =
      this.props.match.params.module in components
        ? components[this.props.match.params.module]
        : !this.props.match.params.module ||
          this.props.match.params.module === "/"
        ? components["landing"]
        : components["not-found"];
    return (
      <Wrapper style={{overflow: "hidden"}}>
        <div className="drawer">
          <Drawer />
        </div>
        <Tag />
      </Wrapper>
    );
  }
}

export default connect()(Board);
