import cbs from "../../assets/icons/test/cbs_icon.svg";
import meeting from "../../assets/icons/test/meeting_icon.svg";
import hris from "../../assets/icons/test/hris_icon.svg";
import transport from "../../assets/icons/test/transport_icon.svg";
import utility from "../../assets/icons/test/utility_icon.svg";
import notification from "../../assets/icons/test/notification_icon.svg";
import roles from "../../assets/icons/test/roles_icon.svg";
import home from "../../assets/icons/test/home_icon.svg";
import task from "../../assets/icons/test/task_icon.svg";
import sales_task from "../../assets/icons/activity.svg";
import work_from_home from "../../assets/icons/test/wfh_icon.svg";
import locate_team from "../../assets/icons/test/locate_team_icon.svg";
import configuration from "../../assets/icons/test/configuration.svg";
import project_page from "../../assets/icons/test/project_icon.svg";
import supervisor_board from "../../assets/icons/management-icon.svg";
import supervisor_panel from "../../assets/icons/supervisor.svg";
import pa_appraisal from "../../assets/icons/pa.svg";
import management_icon from "../../assets/icons/management.svg";
import review_icon from "../../assets/icons/supervisor-icon.svg";
import progress from "../../assets/icons/test/smartOffice_icon.svg";
import employee_manager from "../../assets/icons/employee-manager-inactive.svg";
import leave_attendance from "../../assets/icons/leave.svg";
import project_management from "../../assets/icons/project.svg";
import sop from "../../assets/icons/sop.svg";
import issue_register from "../../assets/icons/issue-register.svg";
import management_roadmap from "../../assets/icons/roadmap-inactive.svg";
import sales_dashboard from "../../assets/icons/sales-dashboard.svg";
import pitch_icon from "../../assets/icons/pitch.svg";
import feature_feedback from "../../assets/icons/feature-feedback.svg";
import feedback_icon from "../../assets/icons/feedback.svg";

export const drawerItems = [
  {
    id: 1,
    to: "/",
    title: "Home",
    name: "",
    icon: home,
    visible: true,
  },
  // {
  //     id: 2,
  //     to: "/meeting/my-meeting/1/1",
  //     title: "Meeting",
  //     name: "meeting",
  //     icon: meeting,
  //     visible: true,
  // },
  {
    id: 3,
    to: "/meeting/my-meeting-list",
    title: "Meeting",
    name: "meeting",
    icon: meeting,
    visible: false,
  },
  // {
  //     id: 4,
  //     to: "/transport",
  //     title: "Transport",
  //     name: "transport",
  //     icon: transport,
  //     visible: true,
  // },
  {
    id: 5,
    to: "/task-activity/my-task-activity",
    title: "Activity Manager",
    name: "task-activity",
    icon: sales_task,
    visible: false,
  },
  {
    id: 6,
    to: "/sop/list-my-sop-activity",
    title: "SOP",
    name: "sop",
    icon: sop,
    visible: false,
  },
  // {
  //     id: 7,
  //     to: "/tasks/my-tasks/1/1",
  //     title: "Office tasks",
  //     name: "tasks",
  //     icon: task,
  //     visible: true,
  // },
  // {
  //     id: 8,
  //     to: "/quick-tasks/my-tasks/1/1",
  //     title: "Sales Tasks",
  //     name: "quick-tasks",
  //     icon: sales_task,
  //     visible: true,
  // },
  {
    id: 7,
    to: "/pitch/pitch-list",
    title: "Pitch Manager",
    name: "pitch",
    icon: pitch_icon,
    visible: false,
  },
  {
    id: 8,
    to: "/feedback/my-feedback-list",
    title: "Feedback",
    name: "feedback",
    icon: feedback_icon,
    visible: false,
  },
  {
    id: 9,
    to: "/supervisor-panel/dashboard",
    title: "Supervisor Panel",
    name: "supervisor-panel",
    icon: supervisor_panel,
    visible: false,
  },
  {
    id: 10,
    to: "/sales-dashboard/sales-summary",
    title: "Sales Dashboard",
    name: "sales-dashboard",
    icon: sales_dashboard,
    visible: false,
  },
  {
    id: 11,
    to: "/project-page/dashboard",
    title: "Projects Page",
    name: "project-page",
    icon: project_page,
    visible: false,
  }, // new development starts <<28 March 2021>>
  {
    id: 12,
    to: "/management-panel/project-summary",
    title: "Management Panel",
    name: "management-panel",
    icon: management_icon,
    visible: false,
  },
  {
    id: 13,
    to: "/cbs/my-bills",
    title: "CBS Claim",
    name: "cbs",
    icon: cbs,
    visible: false,
  },
  {
    id: 14,
    to: "/configuration/milestone-type-setup",
    title: "Configuration",
    name: "configuration",
    icon: configuration,
    visible: false,
  },
  {
    id: 15,
    to: "/performance-appraisal/self-pa",
    title: "Performance Appraisal",
    name: "performance-appraisal",
    icon: pa_appraisal,
    visible: false,
  },
  {
    id: 16,
    to: "/supervisor-board/quarter-target-list",
    title: "Supervisor Board",
    name: "supervisor-board",
    icon: supervisor_board,
    visible: false,
    width: "auto",
  },
  {
    id: 17,
    to: "/hris-settings",
    title: "HRIS Settings",
    name: "hris-settings",
    icon: roles,
    visible: false,
  },
  // {
  //     id: 17,
  //     to: "/supervisor-panel/employee-list",
  //     title: "Supervisor Panel",
  //     name: "supervisor-panel",
  //     icon: supervisor_panel,
  //     visible: false,
  // },
  {
    id: 18,
    to: "/send-notification",
    title: "Send Notification",
    name: "send-notification",
    icon: notification,
    visible: false,
  },
  {
    id: 19,
    to: "/revenue-board/quarter-target-list",
    title: "Revenue Board",
    name: "revenue-board",
    icon: review_icon,
    visible: false,
  },
  {
    id: 20,
    to: "/issue-register/hr-issue-register",
    title: "Issue Register",
    name: "issue-register",
    icon: issue_register,
    visible: false,
  },
  {
    id: 21,
    to: "/employee-register/employee-list",
    title: "Employee Manager",
    name: "employee-register",
    icon: employee_manager,
    visible: false,
  },
  {
    id: 22,
    to: "/leave-and-attendance/deduction-leave-list",
    title: "Leave & Attendance",
    name: "leave-and-attendance",
    icon: leave_attendance,
    visible: false,
  },
  {
    id: 23,
    to: "/project-management/project-summary",
    title: "Project Management",
    name: "project-management",
    icon: project_management,
    visible: false,
  },
  {
    id: 24,
    // to: "/sop/configuration",
    to: "/hris",
    title: "HRIS",
    name: "hris",
    icon: hris,
    visible: false,
  },
  {
    id: 25,
    to: "/notification/notification-list",
    title: "Notification",
    name: "notification",
    icon: issue_register,
    visible: false,
  },
  {
    id: 26,
    to: "/management-roadmap",
    title: "Management Roadmap",
    name: "management-roadmap",
    icon: management_roadmap,
    visible: false,
  },
  {
    id: 27,
    to: "/roles",
    title: "Roles",
    name: "roles",
    icon: hris,
    visible: false,
  },
  {
    id: 28,
    to: "/utility",
    title: "Utility",
    name: "utility",
    icon: utility,
    visible: false,
  },
  {
    id: 29,
    to: "/work-from-home",
    title: "Work from home",
    name: "work-from-home",
    icon: work_from_home,
    visible: false,
  },
  {
    id: 30,
    to: "/locate-team",
    title: "Locate Team",
    name: "locate-team",
    icon: locate_team,
    visible: false,
  },
  {
    id: 31,
    to: "/todo/todo-list",
    title: "Todo",
    name: "Todo",
    icon: locate_team,
    visible: true,
  },
  {
    id: 32,
    to: "/product/product-list",
    title: "Product List",
    name: "product",
    icon: work_from_home,
    visible: true,
  },

  // {
  //     id: 31,
  //     to: "/ffm/config-project-service-list",
  //     title: "FFM Module",
  //     name: "ffm",
  //     icon: feature_feedback,
  //     visible: true,
  // },
];


