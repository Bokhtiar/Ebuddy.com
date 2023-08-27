import { getData } from "./api-service";
import cbs_img from "../assets/cbs.svg";
import meeting_img from "../assets/meeting.svg";
import hr_img from "../assets/hr.svg";
import task_img from "../assets/task.svg";
import sales_img from "../assets/sales.svg";
import utility_img from "../assets/utility.svg";
import transport_img from "../assets/transport.svg";
import wfh_img from "../assets/wfh.svg";
import { CBS_ACCESS, CREATE_GET_PROJECT } from "./api";
import Cookies from "js-cookie";

// export const cbs = async () => {
//     let res = await getData(CBS_ACCESS);
//     let sidebar = {
//         title: "Bills",
//         image: cbs_img,
//         items: [
//             {
//                 id: 1,
//                 name: "+ New bill",
//                 to: "/cbs/add-new",
//                 create: true,
//             },
//             {
//                 id: 2,
//                 name: "My bills",
//                 to: "/cbs/my-cbs/1/1",
//                 default: "cbs",
//             },
//         ],
//     };
//     if (res && res.data && res.data.data) {
//         if (res.data.data.team_access) {
//             sidebar.items.push({
//                 id: 3,
//                 name: "Team bills",
//                 to: "/cbs/team-cbs/1/1",
//             });
//         }
//         if (res.data.data.org_access) {
//             sidebar.items.push({
//                 id: 4,
//                 name: "Organizational bills",
//                 to: "/cbs/organizational-cbs/1/2",
//             });
//         }
//         if (res.data.data.process_access) {
//             sidebar.items.push({
//                 id: 5,
//                 name: "Bill in process",
//                 to: "/cbs/bill-process/1/1",
//             });
//         }
//         if (res.data.data.role) {
//             sidebar.items.push({
//                 id: 6,
//                 name: "CBS Roles",
//                 to: "/cbs/cbs-roles/1/1",
//             });
//         }
//     }
//     return sidebar;
// };

export const cbs = {
  title: "CBS",
  image: cbs_img,
  items: [
    {
      id: 1,
      name: "My Bills",
      to: "/cbs/my-bills",
      activeLinks: ["/cbs/my-bills", "/cbs/create-new-cbs"],
      default: "cbs",
    },
    {
      id: 2,
      name: "Approval(Dept)",
      to: "/cbs/approve-bills-dept",
      default: "cbs",
    },
    {
      id: 3,
      name: "Approval(Accounts & Finance)",
      to: "/cbs/approve-bills-accounce",
      default: "cbs",
    },
    {
      id: 4,
      name: "CBS Payments",
      to: "/cbs/cbs-payments",
      default: "cbs",
    },
  ],
};

// export const meeting = {
//     title: "Meeting",
//     image: meeting_img,
//     items: [
//         {
//             id: 1,
//             name: "Create meeting",
//             to: "/meeting/add-new",
//             create: true,
//         },
//         {
//             id: 2,
//             name: "My meeting",
//             to: "/meeting/my-meeting/1/1",
//             default: "meeting",
//         },
//         {
//             id: 3,
//             name: "Created for others",
//             to: "/meeting/created-only/1/1",
//         },
//         {
//             id: 4,
//             name: "Team meeting",
//             to: "/meeting/subordinate/1/1",
//         },
//     ],
// };

export const transport = {
  title: "Transport",
  image: transport_img,
  items: [
    {
      id: 0,
      name: "Book a transport",
      to: "/transport/book-transport",
      create: true,
    },
    {
      id: 1,
      name: "All transport",
      to: "/transport/all-transport",
      default: "transport",
    },
  ],
};

export const roles = {
  title: "Role settings",
  image: hr_img,
  items: [
    {
      id: 1,
      name: "Role permission",
      to: "/roles/permission",
      default: "roles",
    },
    {
      id: 2,
      name: "Role users",
      to: "/roles/users",
    },
  ],
};

export const hris_settings = {
  title: "HR Settings",
  image: hr_img,
  description: "",
  // image : {image},
  items: [
    {
      id: 1,
      name: "Attendance report",
      to: "/hris-settings/attendance-daily",
      default: "hris-settings",
      accordion: [
        {
          id: 1,
          name: "Daily report",
          to: "/hris-settings/attendance-daily",
        },
        {
          id: 2,
          name: "User report",
          to: "/hris-settings/attendance-of-user",
        },
        {
          id: 3,
          name: "Summary report",
          to: "/hris-settings/attendance-summary",
        },
      ],
    },
    {
      id: 2,
      name: "Shift details",
      to: "/hris-settings/shift-list",
      default: "hris-settings",
      accordion: [
        {
          id: 1,
          name: "Shift list",
          to: "/hris-settings/shift-list",
        },
        {
          id: 2,
          name: "Shift mapping",
          to: "/hris-settings/shift-mapping",
        },
        {
          id: 3,
          name: "Shift rotation",
          to: "/hris-settings/shift-rotation",
        },
      ],
    },
    {
      id: 3,
      name: "Settings",
      to: "/hris-settings/settings-general",
      default: "hris-settings",
      accordion: [
        {
          id: 1,
          name: "General settings",
          to: "/hris-settings/settings-general",
        },
        {
          id: 2,
          name: "Advanced settings",
          to: "/hris-settings/settings-advanced",
        },
        {
          id: 3,
          name: "User ID mapping",
          to: "/hris-settings/settings-user-mapping",
        },
        {
          id: 4,
          name: "Absent schedule",
          to: "/hris-settings/settings-absence-schedule",
        },
      ],
    },
    {
      id: 4,
      name: "Organization",
      to: "/hris-settings/employee-general",
      default: "hris-settings",
      accordion: [
        {
          id: 1,
          name: "Employee",
          to: "/hris-settings/employee-general",
        },
        {
          id: 2,
          name: "Department",
          to: "/hris-settings/employee-department",
        },
        {
          id: 3,
          name: "Designation",
          to: "/hris-settings/employee-designation",
        },
        {
          id: 4,
          name: "Resignation",
          to: "/hris-settings/employee-resignation",
        },
        {
          id: 5,
          name: "Company policies",
          to: "/hris-settings/employee-policies",
        },
      ],
    },
  ],
};

export const hris = {
  title: "HR System",
  image: hr_img,
  description: "",
  // image : {image},
  items: [
    {
      id: 1,
      name: "Attendance",
      to: "/hris/attendance",
      default: "hris",
    },
    {
      id: 6,
      name: "Address book",
      to: "/hris/address-book",
    },
    {
      id: 3,
      name: "Daily meal",
      to: "/hris/daily-meal",
    },
    // {
    //   id: 2,
    //   name: "Leave status",
    //   to: "/hris/leave-apply",
    //   accordion: [
    //     {
    //       id: 1,
    //       name: "Apply leave",
    //       to: "/hris/leave-apply"
    //     },
    //     {
    //       id: 2,
    //       name: "My Applications",
    //       to: "/hris/leave-application"
    //     }
    //   ]
    // },
    // {
    //   id: 4,
    //   name: "Certificates",
    //   to: "/hris/certificate-apply",
    //   accordion: [
    //     {
    //       id: 1,
    //       name: "New application",
    //       to: "/hris/certificate-apply"
    //     },
    //     {
    //       id: 2,
    //       name: "Applied list",
    //       to: "/hris/certificate-list"
    //     }
    //   ]
    // },
    // {
    //   id: 5,
    //   name: "Issues",
    //   to: "/hris/issue-apply",
    //   accordion: [
    //     {
    //       id: 1,
    //       name: "New issue",
    //       to: "/hris/issue-apply"
    //     },
    //     {
    //       id: 2,
    //       name: "Applied issues",
    //       to: "/hris/issue-list"
    //     }
    //   ]
    // },
    {
      id: 7,
      name: "Benefits",
      to: "/hris/benefits",
    },
  ],
};

export const utility = {
  title: "Utilities",
  image: utility_img,
  // description : '',
  items: [
    {
      id: 1,
      name: "Top up",
      to: "/utility/top-up",
      default: "utility",
    },
  ],
};

export const task_manager = () => {
  let sidebar = {
    title: "Office tasks",
    image: task_img,
    items: [
      {
        id: 1,
        name: "Create new task",
        to: "/tasks/add-new",
        create: true,
      },
      {
        id: 2,
        name: "My task",
        to: "/tasks/my-tasks/1/1",
        default: "tasks",
      },
      {
        id: 3,
        name: "Projects",
        to: "/tasks/projects/1/1",
      },
      {
        id: 4,
        name: "Team members",
        to: "/tasks/subordinates/1/1",
        defined: "subordinate",
      },
      {
        id: 5,
        name: "My Assigned task",
        to: "/tasks/assigned-by-me/1/1",
        // defined: "subordinate"
      },
    ],
  };
  return sidebar;
};

export const biz_task = {
  title: "Sales tasks",
  image: sales_img,
  description: "",
  // image : {image},
  items: [
    {
      id: 1,
      name: "+ Create new task",
      to: "/quick-tasks/add-new",
      create: true,
    },
    {
      id: 2,
      name: "My task",
      to: "/quick-tasks/my-tasks/1/1",
      default: true,
    },
    {
      id: 3,
      name: "Reporting",
      to: "/quick-tasks/report/1/1",
    },
  ],
};

export const work_from_home = () => {
  let sidebar = {
    title: "Work from home",
    image: wfh_img,
    description: "",
    items: [
      {
        id: 1,
        name: "My Work Status",
        to: "/work-from-home/start-work",
        default: "work-from-home",
      },
      {
        id: 4,
        name: "My Activity Logs",
        to: "/work-from-home/screen-shots",
      },
      {
        id: 2,
        name: "Team's Activity Logs",
        to: "/work-from-home/team-members",
      },
      {
        id: 3,
        name: "Desk Approval",
        to: "/work-from-home/approval/1/",
      },
      {
        id: 5,
        name: "WFH Permission",
        to: "/work-from-home/work-from-home-permission",
        key: "wfh",
      },
    ],
  };

  if (
    Cookies.get("profile") && //checking for id 9000
    JSON.parse(Cookies.get("profile")).emp_id >= 9000 &&
    JSON.parse(Cookies.get("profile")).emp_id <= 9999
  ) {
    sidebar.items.push({
      id: 6,
      name: "Punch Report",
      to: "/work-from-home/punch-report",
    });
  } else {
    sidebar.items.push({
      id: 5,
      name: "Attendance Report",
      to: "/work-from-home/team-attendance",
    });
  }

  return sidebar;
};

export const configModule = {
  title: "Configuration Page",
  image: hr_img,
  description: "",
  items: [
    {
      id: 1,
      name: "Milestone",
      to: "/configuration/milestone-type-setup",
      default: "configuration",
      accordion: [
        {
          id: 0,
          name: "Milestone type",
          to: "/configuration/milestone-type-setup",
        },
        {
          id: 2,
          name: "Milestone status",
          to: "/configuration/milestone-status-setup",
        },
        {
          id: 1,
          name: "Milestone setup",
          to: "/configuration/milestone-setup",
        },
        {
          id: 3,
          name: "Payment status",
          to: "/configuration/milestone-payment-status-setup",
        },
      ],
    },
    {
      id: 2,
      name: "Client",
      to: "/configuration/industry-type-setup",
      default: "configuration",
      accordion: [
        {
          id: 1,
          name: "Industry Type Setup",
          to: "/configuration/industry-type-setup",
        },
        {
          id: 2,
          name: "Industry Sector Setup",
          to: "/configuration/industry-sector-setup",
        },
        {
          id: 3,
          name: "Location Setup",
          to: "/configuration/industry-location-setup",
        },
        {
          id: 4,
          name: "Client Company Type",
          to: "/configuration/industry-client-company-type-setup",
        },
        {
          id: 5,
          name: "Client Designation",
          to: "/configuration/client-designtion-type-setup",
        },
        {
          id: 6,
          name: "Client Company Size",
          to: "/configuration/industry-client-company-size-setup",
        },
        {
          id: 7,
          name: "Client Setup",
          to: "/configuration/industry-client-setup",
        },
        // {
        //     id: 8,
        //     name: "Client Bulk Upload",
        //     to: "/configuration/client-bulk-upload",
        //     notVisible: false
        // },
        // {
        //     id: 9,
        //     name: "Client POC Bulk Upload",
        //     to: "/configuration/client-poc-bulk-upload",
        //     notVisible: false
        // },
      ],
    },
    {
      id: 4,
      name: "Service/Product",
      to: "/configuration/service-product-type-setup",
      default: "configuration",
      accordion: [
        {
          id: 4,
          name: "Service/Product Type",
          to: "/configuration/service-product-type-setup",
        },
        {
          id: 5,
          name: "Service/Product Setup",
          to: "/configuration/service-product-setup",
        },
        // {
        //     id: 3,
        //     name: "Service Bulk Upload",
        //     to: "/configuration/service-product-bulk-upload",
        //     notVisible: false
        // },
      ],
    },
    {
      id: 5,
      name: "Activity/Task",
      to: "/configuration/task-type-setup",
      default: "configuration",
      accordion: [
        {
          id: 6,
          name: "Activity Type Setup",
          to: "/configuration/task-type-setup",
        },
        {
          id: 7,
          name: "Task Priority Setup",
          to: "/configuration/task-priority-setup",
        },
        {
          id: 8,
          name: "Review Setup",
          to: "/configuration/task-review-setup",
        },
      ],
    },
    {
      id: 6,
      name: "Function",
      to: "/configuration/function-type",
      default: "configuration",
      accordion: [
        {
          id: 1,
          name: "Function Type",
          to: "/configuration/function-type",
        },
        {
          id: 2,
          name: "Activity Function",
          to: "/configuration/function-activity",
        },
      ],
    },
    // {
    //     id: 7,
    //     name: "Issue/License Register",
    //     to: "/configuration/setup-issue",
    //     default: "configuration",
    //     accordion: [
    //         {
    //             id: 1,
    //             name: "Issue Setup",
    //             to: "/configuration/setup-issue"
    //         },
    //         {
    //             id: 2,
    //             name: "License Setup",
    //             to: "/configuration/setup-license"
    //         },
    //         {
    //             id: 3,
    //             name: "License Issuer",
    //             to: "/configuration/setup-license-issuer"
    //         },
    //         {
    //             id: 4,
    //             name: "External Setup",
    //             to: "/configuration/setup-external"
    //         },
    //     ],
    // },
    {
      id: 8,
      name: "PA Setup",
      to: "/configuration/pa-category",
      default: "configuration",
      accordion: [
        {
          id: 1,
          name: "PA Category",
          to: "/configuration/pa-category",
        },
        {
          id: 2,
          name: "PA Sub Category",
          to: "/configuration/pa-sub-category",
        },
        {
          id: 3,
          name: "PA Criteria",
          to: "/configuration/pa-criteria",
        },
        {
          id: 4,
          name: "PA Sub Criteria",
          to: "/configuration/pa-sub-criteria",
        },
        {
          id: 5,
          name: "Scale setup",
          to: "/configuration/pa-scale-setup",
        },
      ],
    },
    {
      id: 9,
      name: "PA Configuration",
      to: "/configuration/configuration-list",
      default: "configuration",
      accordion: [
        {
          id: 0,
          name: "PA Configuration List",
          to: "/configuration/configuration-list",
          activeLinks: [
            "/configuration/configuration-list",
            "/configuration/configuration-update",
          ],
        },
        {
          id: 1,
          name: "PA Configuration Create",
          to: "/configuration/configuration-create",
        },
      ],
    },
    {
      id: 10,
      name: "EOM Setup",
      to: "/configuration/eom-category",
      default: "configuration",
      accordion: [
        {
          id: 1,
          name: "Category",
          to: "/configuration/eom-category",
        },
        {
          id: 2,
          name: "Reason",
          to: "/configuration/eom-reason",
        },
        {
          id: 3,
          name: "Attributes",
          to: "/configuration/eom-attributes",
        },
        // {
        //     id: 4,
        //     name: "Department Mapping",
        //     to: "/configuration/eom-department-mapping"
        // },
        {
          id: 5,
          name: "Wings",
          to: "/configuration/eom-wings",
        },
      ],
    },
    {
      id: 11,
      name: "Leave & Attendance",
      to: "/configuration/leave-package",
      default: "configuration",
      accordion: [
        {
          id: 1,
          name: "Leave Package",
          to: "/configuration/leave-package",
        },
      ],
    },
    {
      id: 12,
      name: "Employee Configuration",
      to: "/configuration/pis-company",
      default: "configuration",
      accordion: [
        {
          id: 1,
          name: "Agreement Type",
          to: "/configuration/pis-agreement-type",
        },
        {
          id: 2,
          name: "Block",
          to: "/configuration/pis-block",
        },
        {
          id: 3,
          name: "Business Type",
          to: "/configuration/pis-business-type",
        },
        {
          id: 4,
          name: "Company",
          to: "/configuration/pis-company",
        },
        {
          id: 5,
          name: "Course",
          to: "/configuration/pis-course",
        },
        // {
        //     id: 6,
        //     name: "Days",
        //     to: "/configuration/pis-days"
        // },
        {
          id: 7,
          name: "Department",
          to: "/configuration/pis-department",
        },
        {
          id: 8,
          name: "Designation",
          to: "/configuration/pis-designation",
        },
        {
          id: 9,
          name: "Designation Group",
          to: "/configuration/pis-designation-group",
        },
        {
          id: 10,
          name: "Education",
          to: "/configuration/pis-education",
        },
        {
          id: 11,
          name: "Employee Type",
          to: "/configuration/pis-employee-type",
        },
        {
          id: 12,
          name: "Festival Bonus",
          to: "/configuration/pis-festival-bonus",
        },
        {
          id: 13,
          name: "Floor",
          to: "/configuration/pis-floor",
        },
        {
          id: 14,
          name: "Grade",
          to: "/configuration/pis-grade",
        },
        {
          id: 15,
          name: "Holiday",
          to: "/configuration/pis-holiday",
        },
        {
          id: 16,
          name: "Job Title",
          to: "/configuration/pis-job-title",
        },
        {
          id: 17,
          name: "Language",
          to: "/configuration/pis-language",
        },
        {
          id: 18,
          name: "Legal Status",
          to: "/configuration/pis-legal-status",
        },
        {
          id: 19,
          name: "Line",
          to: "/configuration/pis-line",
        },
        {
          id: 20,
          name: "Payment Term",
          to: "/configuration/pis-payment-term",
        },
        {
          id: 21,
          name: "Payroll Type",
          to: "/configuration/pis-payroll-type",
        },
        {
          id: 22,
          name: "Religion",
          to: "/configuration/pis-religion",
        },
        {
          id: 23,
          name: "Roster Type",
          to: "/configuration/pis-roster-type",
        },
        {
          id: 24,
          name: "Salary Base",
          to: "/configuration/pis-salary-base",
        },
        {
          id: 25,
          name: "Section",
          to: "/configuration/pis-section",
        },
        {
          id: 26,
          name: "Shift Type",
          to: "/configuration/pis-shift-type",
        },
        {
          id: 27,
          name: "Skill Matric",
          to: "/configuration/pis-skill-matric",
        },
        {
          id: 28,
          name: "Skill Type",
          to: "/configuration/pis-skill-type",
        },
        {
          id: 29,
          name: "Specialist",
          to: "/configuration/pis-specialist",
        },
        {
          id: 30,
          name: "Staff Category",
          to: "/configuration/pis-staff-category",
        },
        {
          id: 31,
          name: "Branch/Units",
          to: "/configuration/pis-units",
        },
        {
          id: 32,
          name: "Work Station",
          to: "/configuration/pis-work-station",
        },
        {
          id: 33,
          name: "Zone",
          to: "/configuration/pis-zone",
        },
      ],
    },
    {
      id: 13,
      name: "Bank Configuration",
      to: "/configuration/bank-setup",
      default: "configuration",
      accordion: [
        {
          id: 1,
          name: "Bank Setup",
          to: "/configuration/bank-setup",
        },
        {
          id: 2,
          name: "Branch Setup",
          to: "/configuration/bank-branch-setup",
        },
      ],
    },
    // {
    //     id: 14,
    //     name: "SOP Configure",
    //     to: "/configuration/sop-list",
    //     default: "configuration",
    //     accordion: [
    //         {
    //             id: 1,
    //             name: "SOP List" ,
    //             to: "/configuration/sop-list",
    //         },
    //         {
    //             id: 2,
    //             name: "SOP Setup",
    //             to: "/configuration/sop-setup"
    //         }
    //     ],
    // },
    // {
    //     id: 15,
    //     name: "SOP Activity",
    //     to: "/configuration/activity-list",
    //     default: "configuration",
    //     accordion: [
    //         {
    //             id: 1,
    //             name: "Activity List" ,
    //             to: "/configuration/activity-list",
    //         },
    //         {
    //             id: 2,
    //             name: "Create Activity",
    //             to: "/configuration/activity-create"
    //         }
    //     ],
    // },
    {
      id: 16,
      name: "Team",
      to: "/configuration/team",
      default: "configuration",
    },
    {
      id: 17,
      name: "Project Management",
      to: "/configuration/project-management",
      default: "configuration",
    },
  ],
};

export const projectPage = {
  title: "Project Page",
  image: meeting_img,
  items: [
    {
      id: 1,
      name: "Dashboard",
      to: "/project-page/dashboard",
      default: "project-page",
    },
    {
      id: 2,
      name: "Project List",
      to: "/project-page/project-list",
    },
    {
      id: 3,
      name: "Project Roadmap Setup",
      to: "/project-page/project-roadmap-setup",
    },
    {
      id: 4,
      name: "Project Roadmap Update",
      to: "/project-page/project-roadmap-update",
    },
    {
      id: 5,
      name: "Milestone Calendar",
      to: "/project-page/milestone-calender",
    },
    {
      id: 6,
      name: "Project Tracker",
      to: "/project-page/project-tracker",
    },
    {
      id: 7,
      name: "Bulk Upload",
      to: "/project-page/bulk-upload",
    },
  ],
};

export const supervisorBoard = {
  title: "Supervisor Board",
  image: task_img,
  items: [
    {
      id: 1,
      name: "Quarter Target List",
      to: "/supervisor-board/quarter-target-list",
      default: "quarter-target-list",
    },
    {
      id: 2,
      name: "Target vs Achievement",
      to: "/supervisor-board/target-vs-achievement",
      default: "/supervisor-board/target-vs-achievement",
    },
    {
      id: 3,
      name: "Target View",
      to: "/supervisor-board/target-view",
      default: "/supervisor-board/target-view",
    },
  ],
};

export const performanceAppraisal = {
  title: "Performance Appraisal",
  image: task_img,
  items: [
    {
      id: 1,
      name: "Self PA",
      to: "/performance-appraisal/self-pa",
      default: "/performance-appraisal/self-pa",
      activeLinks: [
        "/performance-appraisal/self-pa",
        "/performance-appraisal/self-pa-fillup-view",
        "/performance-appraisal/pa-fillup-details",
      ],
    },
  ],
};

export const taskActivity = {
  title: "Activity Manager",
  image: task_img,
  items: [
    {
      id: 1,
      name: "My Task",
      to: "/task-activity/my-task-activity",
      default: "task-activity-page",
    },
    {
      id: 2,
      name: "Task List",
      to: "/task-activity/task-activity-list",
      default: "task-activity-page",
      activeLinks: [
        "/task-activity/task-activity-list",
        "/task-activity/task-activity-details",
        "/task-activity/task-sub-activity-create",
      ],
    },
    {
      id: 3,
      name: "Task Calendar",
      to: "/task-activity/user-task-activity-calendar",
      default: "task-activity-page",
    },
    // {
    //     id: 4,
    //     name: "Task Acceptance",
    //     to: "/task-activity/pending-task-list",
    //     default: "task-activity-page",
    //     noticeCount: true,
    //     count_detect_id: 'js-pending-task-noticefication-count'
    // },
    // {
    //     id: 5,
    //     name: "Notification",
    //     to: "/task-activity/notification",
    //     default: "task-activity-page",
    //     noticeCount: true,
    //     count_detect_id: 'js-noticefication-count'
    // },
    {
      id: 6,
      name: "Activity Bulk Upload",
      to: "/task-activity/activity-bulk-upload",
      default: "task-activity-page",
    },
  ],
};

export const supervisorPanel = {
  title: "Supervisor Panel",
  image: task_img,
  items: [
    {
      id: 1,
      name: "Dashboard",
      to: "/supervisor-panel/dashboard",
      default: "supervisor-panel/dashboard",
    },
    {
      id: 2,
      name: "Team",
      to: "/supervisor-panel/employee-list",
      default: "supervisor-panel/employee-list",
    },
    {
      id: 3,
      name: "Team Task",
      to: "/supervisor-panel/team-task",
      default: "supervisor-panel/team-task",
    },
    {
      id: 4,
      name: "Projects",
      to: "/supervisor-panel/projects-list",
      default: "/supervisor-panel/projects-list",
    },
    {
      id: 5,
      name: "Task Review",
      to: "/supervisor-panel/task-review",
      default: "/supervisor-panel/task-review",
    },
    {
      id: 6,
      name: "Milestones Review",
      to: "/supervisor-panel/milestone-review",
      default: "/supervisor-panel/milestone-review",
    },
    {
      id: 7,
      name: "Milestones Calendar",
      to: "/supervisor-panel/milestone-calendar",
      default: "/supervisor-panel/milestone-calendar",
    },
    {
      id: 8,
      name: "Task Summary Report",
      to: "/supervisor-panel/excel-report",
      default: "supervisor-panel",
    },
    {
      id: 9,
      name: "Milestone Summary Report",
      to: "/supervisor-panel/milestone-excel-report",
      default: "supervisor-panel",
    },
    {
      id: 10,
      name: "Target",
      to: "/supervisor-panel/target-list-quarter-wise",
      default: "supervisor-panel",
      accordion: [
        {
          id: 1,
          name: "Quarter Target List",
          to: "/supervisor-panel/target-list-quarter-wise",
          default: "supervisor-panel",
        },
        {
          id: 2,
          name: "Target View",
          to: "/supervisor-panel/target-view",
          default: "supervisor-panel",
        },
        {
          id: 3,
          name: "Target vs Achievement",
          to: "/supervisor-panel/target-vs-achievement",
          default: "supervisor-panel",
        },
      ],
    },
    {
      id: 11,
      name: "Performance Appraisal",
      to: "/supervisor-panel/pa-fillup-list",
      default: "supervisor-panel",
      accordion: [
        {
          id: 0,
          name: "Monthly PA",
          to: "/supervisor-panel/pa-fillup-list",
          activeLinks: [
            "/supervisor-panel/pa-fillup-list",
            "/supervisor-panel/pa-fillup-view",
            "/supervisor-panel/pa-fillup-create",
            "/supervisor-panel/pa-fillup-update",
          ],
        },
        {
          id: 1,
          name: "Yearly PA",
          to: "/supervisor-panel/yearly-pa-list",
        },
        {
          id: 2,
          name: "PA Chart",
          to: "/supervisor-panel/pa-fillup-chart",
        },
      ],
    },
    {
      id: 12,
      name: "Activity View",
      to: "/supervisor-panel/activity-view",
      default: "supervisor-panel",
    },
    {
      id: 13,
      name: "EOM Nominees",
      to: "/supervisor-panel/nominee-list",
      default: "supervisor-panel",
      activeLinks: [
        "/supervisor-panel/nominee-list",
        "/supervisor-panel/nominee-create",
        "/supervisor-panel/nominee-view",
      ],
    },
    {
      id: 14,
      name: "Client Plotter",
      to: "/supervisor-panel/matrix-report",
      default: "supervisor-panel",
      notVisible: false,
      accordion: [
        {
          id: 1,
          name: "Report",
          to: "/supervisor-panel/matrix-report",
          default: "supervisor-panel",
        },
        {
          id: 2,
          name: "Industry Wise Summary",
          to: "/supervisor-panel/matrix-industry-wise-report",
          default: "supervisor-panel",
        },
        {
          id: 3,
          name: "Upload",
          to: "/supervisor-panel/matrix-upload-option",
          default: "supervisor-panel",
        },
      ],
    },
  ],
};

export const managementPanel = {
  title: "Management Panel",
  image: task_img,
  items: [
    {
      id: 2,
      name: "Project",
      to: "/management-panel/project-summary",
      default: "management-panel",
      accordion: [
        {
          id: 1,
          name: "Summary",
          to: "/management-panel/project-summary",
          default: "management-panel",
          activeLinks: [
            "/management-panel/project-summary",
            "/management-panel/project-summary-details",
          ],
        },
        {
          id: 2,
          name: "Calendar",
          to: "/management-panel/project-calendar",
          default: "management-panel",
        },
        {
          id: 3,
          name: "Review",
          to: "/management-panel/project-review",
          default: "management-panel",
        },
        {
          id: 4,
          name: "Date Wise Summary",
          to: "/management-panel/project-monthly-summary",
          default: "management-panel",
        },
        // {
        //     id: 5,
        //     name: "Progress",
        //     to: "/management-panel/project-progress",
        //     default: "management-panel",
        // },
      ],
    },
    {
      id: 3,
      name: "Activity Summary",
      to: "/management-panel/task-summary",
      default: "management-panel",
      accordion: [
        {
          id: 1,
          name: "Summary",
          to: "/management-panel/task-summary",
        },
        {
          id: 2,
          name: "Details",
          to: "/management-panel/task-details",
        },
        {
          id: 3,
          name: "Calendar",
          to: "/management-panel/task-calender",
        },
        {
          id: 4,
          name: "Review Summary",
          to: "/management-panel/task-review-summary",
        },
      ],
    },
    {
      id: 4,
      name: "Performance Appraisal",
      to: "/management-panel/pa-fillup-list",
      default: "management-panel",
      accordion: [
        {
          id: 0,
          name: "Monthly PA",
          to: "/management-panel/pa-fillup-list",
          activeLinks: [
            "/management-panel/pa-fillup-list",
            "/management-panel/pa-fillup-view",
          ],
        },
        {
          id: 1,
          name: "Yearly PA",
          to: "/management-panel/pa-yearly-list",
          activeLinks: [
            "/management-panel/pa-yearly-list",
            "/management-panel/pa-fillup-details",
          ],
        },
        {
          id: 2,
          name: "PA Chart",
          to: "/management-panel/pa-fillup-chart",
        },
      ],
    },
    {
      id: 5,
      name: "EOM Nominees",
      to: "/management-panel/nominee-list",
      default: "management-panel",
      activeLinks: [
        "/management-panel/nominee-list",
        "/management-panel/nominee-create",
        "/management-panel/nominee-view",
      ],
    },
    {
      id: 6,
      name: "Usage Report",
      to: "/management-panel/usage-report",
      default: "management-panel",
    },
    // {
    //     id: 4,
    //     name: "Revenue",
    //     to: "/management-panel/target-vs-achievement",
    //     default: "management-panel",
    //     accordion: [
    //         {
    //             id: 1,
    //             name: "Target vs Achievement",
    //             to: "/management-panel/target-vs-achievement",
    //             default: "management-panel",
    //         },
    //     ],
    // },
  ],
};

export const issueRegister = {
  title: "Issue Register",
  image: hr_img,
  items: [
    {
      id: 1,
      name: "HR Issue Register",
      to: "/issue-register/hr-issue-register",
      default: "issue-register",
    },
    {
      id: 1,
      name: "License Register",
      to: "/issue-register/license-register",
      default: "issue-register",
    },
    {
      id: 4,
      name: "Reports",
      to: "/issue-register/report-issue",
      default: "issue-register",
      accordion: [
        {
          id: 1,
          name: "Issue Report",
          to: "/issue-register/report-issue",
          default: "issue-register",
        },
        {
          id: 2,
          name: "License Report",
          to: "/issue-register/report-license",
          default: "issue-register",
        },
      ],
    },
  ],
};

export const revenueBoard = {
  title: "Revenue Board",
  image: hr_img,
  items: [
    {
      id: 1,
      name: "Quarter Target List",
      to: "/revenue-board/quarter-target-list",
      default: "revenue-board",
    },
    {
      id: 2,
      name: "Target View",
      to: "/revenue-board/target-view",
      default: "revenue-board",
    },
    {
      id: 3,
      name: "Target vs Achievement",
      to: "/revenue-board/target-vs-achievement",
      default: "revenue-board",
    },
  ],
};

export const employeeRegister = {
  title: "Employee Manager",
  image: hr_img,
  items: [
    {
      id: 1,
      name: "Employee List",
      to: "/employee-register/employee-list",
      default: "employee-register",
    },
    {
      id: 2,
      name: "Employee Register",
      to: "/employee-register/registration",
      default: "employee-register",
      activeLinks: [
        "/employee-register/registration",
        "/employee-register/update-registration",
      ],
    },
    {
      id: 3,
      name: "Users",
      to: "/employee-register/user-list",
      default: "employee-register",
      activeLinks: [
        "/employee-register/user-list",
        "/employee-register/user-create",
      ],
      notVisible: false,
    },
  ],
};

export const leaveAndAttendance = {
  title: "Leave & Attendance",
  image: hr_img,
  items: [
    {
      id: 1,
      name: "Leave Deduction",
      to: "/leave-and-attendance/deduction-leave-list",
      default: "leave-and-attendance",
      accordion: [
        {
          id: 1,
          name: "Leave List",
          to: "/leave-and-attendance/deduction-leave-list",
          default: "leave-and-attendance",
        },
        {
          id: 2,
          name: "Leave Entry",
          to: "/leave-and-attendance/deduction-leave-entry",
          default: "leave-and-attendance",
        },
        {
          id: 3,
          name: "Bulk Entry",
          to: "/leave-and-attendance/deduction-bulk-entry",
          default: "leave-and-attendance",
        },
      ],
    },
    {
      id: 2,
      name: "Attendance Register",
      to: "/leave-and-attendance/attendance-list",
      default: "leave-and-attendance",
      accordion: [
        {
          id: 1,
          name: "Attendance List",
          to: "/leave-and-attendance/attendance-list",
          default: "leave-and-attendance",
        },
        {
          id: 2,
          name: "Single Entry",
          to: "/leave-and-attendance/attendance-single-entry",
          default: "leave-and-attendance",
        },
        {
          id: 3,
          name: "Bulk Entry",
          to: "/leave-and-attendance/attendance-bulk-entry",
          default: "leave-and-attendance",
        },
      ],
    },
  ],
};

export const ProjectManagementPanel = {
  title: "Project Management",
  image: task_img,
  items: [
    {
      id: 2,
      name: "Project",
      to: "/project-management/project-summary",
      default: "project-management",
      accordion: [
        {
          id: 1,
          name: "Summary",
          to: "/project-management/project-summary",
          default: "project-management",
          activeLinks: [
            "/project-management/project-summary",
            "/project-management/project-summary-details",
          ],
        },
        {
          id: 2,
          name: "Calendar",
          to: "/project-management/project-calendar",
          default: "project-management",
        },
        {
          id: 4,
          name: "Monthly Summary",
          to: "/project-management/project-monthly-summary",
          default: "project-management",
        },
      ],
    },
    {
      id: 3,
      name: "Activity Summary",
      to: "/project-management/task-summary",
      default: "project-management",
      accordion: [
        {
          id: 1,
          name: "Summary",
          to: "/project-management/task-summary",
        },
        {
          id: 2,
          name: "Details",
          to: "/project-management/task-details",
        },
        {
          id: 3,
          name: "Calendar",
          to: "/project-management/task-calender",
        },
      ],
    },
  ],
};

export const SOP = {
  title: "SOP",
  image: task_img,
  items: [
    {
      id: 1,
      name: "SOP User Activity",
      to: "/sop/list-my-sop-activity",
      default: "sop",
      accordion: [
        {
          id: 1,
          name: "My Activity List",
          to: "/sop/list-my-sop-activity",
          default: "sop",
          activeLinks: [
            "/sop/list-my-sop-activity",
            "/sop/list-sop-activity-create",
            "/sop/list-sop-activity-update",
          ],
          notVisible: false,
        },
        {
          id: 2,
          name: "Team Activity List",
          to: "/sop/list-team-sop-activity",
          default: "sop",
          activeLinks: [
            "/sop/list-team-sop-activity",
            "/sop/list-sop-activity-details",
          ],
          notVisible: false,
        },
      ],
    },
    {
      id: 2,
      name: "SOP Configure",
      to: "/sop/configuration",
      default: "sop",
      accordion: [
        {
          id: 1,
          name: "SOP Setup",
          to: "/sop/configuration",
          default: "sop",
          notVisible: false,
        },
        {
          id: 2,
          name: "Function Type",
          to: "/sop/configuration-function-type",
          default: "sop",
          notVisible: false,
        },
        {
          id: 3,
          name: "Function Name",
          to: "/sop/configuration-function-name",
          default: "sop",
          notVisible: false,
        },
      ],
    },
    {
      id: 3,
      name: "SOP Activity Configure",
      to: "/sop/activity-list",
      default: "sop",
      accordion: [
        {
          id: 1,
          name: "Activity List",
          to: "/sop/activity-list",
          default: "sop",
          notVisible: false,
        },
        {
          id: 2,
          name: "Activity Linkup",
          to: "/sop/activity-linkup",
          default: "sop",
          notVisible: false,
        },
        {
          id: 3,
          name: "Activity Review",
          to: "/sop/activity-review",
          default: "sop",
          notVisible: false,
        },
        {
          id: 4,
          name: "Upload",
          to: "/sop/activity-upload",
          default: "sop",
          notVisible: false,
        },
      ],
    },
    {
      id: 4,
      name: "SOP Manager",
      to: "/sop/sop-list",
      default: "sop",
      accordion: [
        {
          id: 1,
          name: "List",
          to: "/sop/sop-list",
          default: "sop",
          activeLinks: [
            "/sop/sop-list",
            "/sop/sop-initiate-view",
            "/sop/sop-initiate-clone",
          ],
          notVisible: false,
        },
        {
          id: 2,
          name: "Initiate",
          to: "/sop/sop-initiate",
          default: "sop",
          notVisible: false,
        },
      ],
    },
  ],
};

export const notification = {
  title: "Notification",
  image: hr_img,
  items: [
    {
      id: 1,
      name: "Notification List",
      to: "/notification/notification-list",
      default: "notification",
    },
  ],
};

export const meeting = {
  title: "Meeting",
  image: hr_img,
  items: [
    {
      id: 1,
      name: "Meeting List",
      to: "/meeting/meeting-list",
      default: "meeting",
      //   activeLinks: ["/meeting/meeting-list", "/meeting/meeting-update", "/meeting/meeting-details", "/meeting/meeting-minutes", "/meeting/meeting-action-points"],
    },
    {
      id: 1,
      name: "My Meeting List",
      to: "/meeting/my-meeting-list",
      default: "meeting",
      activeLinks: [
        "/meeting/my-meeting-list",
        "/meeting/meeting-update",
        "/meeting/meeting-details",
        "/meeting/meeting-minutes",
        "/meeting/meeting-action-points",
      ],
    },
    {
      id: 2,
      name: "Create Meeting",
      to: "/meeting/meeting-create",
      default: "meeting",
    },
  ],
};

export const salesDashboard = {
  title: "Sales Dashboard",
  image: hr_img,
  items: [
    {
      id: 1,
      name: "Summary",
      to: "/sales-dashboard/sales-summary",
      default: "sales-dashboard",
    },
    {
      id: 2,
      name: "Department Overview (SSL Wireless)",
      to: "/sales-dashboard/sales-department-overview",
      default: "sales-dashboard",
    },
    {
      id: 3,
      name: "Configuration",
      to: "/sales-dashboard/config-sales-head-list",
      default: "sales-dashboard",
      accordion: [
        {
          id: 1,
          name: "Sales Service Head",
          to: "/sales-dashboard/config-sales-head-list",
          activeLinks: [
            "/sales-dashboard/config-sales-head-list",
            "/sales-dashboard/config-sales-head-create",
            "/sales-dashboard/config-sales-head-update",
          ],
        },
        {
          id: 2,
          name: "Target",
          to: "/sales-dashboard/config-sales-target-list",
          activeLinks: [
            "/sales-dashboard/config-sales-target-list",
            "/sales-dashboard/config-sales-target-create",
            "/sales-dashboard/config-sales-target-update",
          ],
        },
      ],
    },
    {
      id: 4,
      name: "Target Bulk Upload",
      to: "/sales-dashboard/sales-target-bulk-upload",
      default: "sales-dashboard",
    },
    {
      id: 5,
      name: "Report",
      to: "/sales-dashboard/target-vs-aschievement",
      default: "sales-dashboard",
      accordion: [
        {
          id: 1,
          name: "Target Vs Achievement",
          to: "/sales-dashboard/target-vs-aschievement",
          default: "sales-dashboard",
        },
        {
          id: 2,
          name: "Industry Wise Achievement",
          to: "/sales-dashboard/target-vs-aschievement-industry-wise",
          default: "sales-dashboard",
        },
        {
          id: 2,
          name: "Non-Budgeted Achievement",
          to: "/sales-dashboard/non-budgeted-achievement",
          default: "sales-dashboard",
        },
      ],
    },
    {
      id: 6,
      name: "Project",
      to: "/sales-dashboard/project-summary",
      default: "management-panel",
      accordion: [
        {
          id: 1,
          name: "Summary",
          to: "/sales-dashboard/project-summary",
          default: "management-panel",
          activeLinks: [
            "/sales-dashboard/project-summary",
            "/sales-dashboard/project-summary-details",
          ],
        },
        {
          id: 2,
          name: "Calendar",
          to: "/sales-dashboard/project-calendar",
          default: "management-panel",
        },
        {
          id: 3,
          name: "Review",
          to: "/sales-dashboard/project-review",
          default: "management-panel",
        },
        {
          id: 4,
          name: "Date Wise Summary",
          to: "/sales-dashboard/project-monthly-summary",
          default: "management-panel",
        },
        {
          id: 5,
          name: "Progress",
          to: "/sales-dashboard/project-progress",
          default: "management-panel",
        },
      ],
    },
    {
      id: 7,
      name: "Activity Summary",
      to: "/sales-dashboard/task-summary",
      default: "management-panel",
      accordion: [
        {
          id: 1,
          name: "Summary",
          to: "/sales-dashboard/task-summary",
        },
        {
          id: 2,
          name: "Details",
          to: "/sales-dashboard/task-details",
        },
        {
          id: 3,
          name: "Calendar",
          to: "/sales-dashboard/task-calender",
        },
        {
          id: 4,
          name: "Review Summary",
          to: "/sales-dashboard/task-review-summary",
        },
      ],
    },
  ],
};

export const pitch = {
  title: "Pitch Manager",
  image: hr_img,
  items: [
    {
      id: 1,
      name: "Pitch List",
      to: "/pitch/pitch-list",
    },
    {
      id: 2,
      name: "Configuration",
      to: "/pitch/config-pitch-list",
      default: "pitch",
      accordion: [
        {
          id: 1,
          name: "Pitch List",
          to: "/pitch/config-pitch-list",
          default: "pitch",
          activeLinks: [
            "/pitch/config-pitch-list",
            "/pitch/config-pitch-create",
          ],
          notVisible: false,
        },
        {
          id: 2,
          name: "Card List",
          to: "/pitch/config-pitch-card-list",
          default: "pitch",
          activeLinks: [
            "/pitch/config-pitch-card-list",
            "/pitch/config-pitch-card-create",
          ],
          notVisible: false,
        },
        {
          id: 3,
          name: "Question List",
          to: "/pitch/config-pitch-question-list",
          default: "pitch",
          activeLinks: [
            "/pitch/config-pitch-question-list",
            "/pitch/config-pitch-question-linkup",
          ],
          notVisible: false,
        },
      ],
    },
    {
      id: 3,
      name: "Bulk Upload",
      to: "/pitch/pitch-bulk-upload",
    },
  ],
};

export const feedback = {
  title: "Feedback Module",
  image: hr_img,
  items: [
    {
      id: 1,
      name: "Feedback List",
      to: "/feedback/user-wise-feedback-list",
      default: "feedback",
      activeLinks: [
        "/feedback/user-wise-feedback-list",
        "/feedback/feedback-card-wise-question-view",
      ],
    },
    {
      id: 2,
      name: "My Feedback List",
      to: "/feedback/my-feedback-list",
      default: "feedback",
      activeLinks: [
        "/feedback/my-feedback-submission-initiate",
        "/feedback/my-feedback-card-wise-question-list",
      ],
      // notVisible: false
    },
    {
      id: 3,
      name: "Configuration",
      to: "/feedback/config-feedback-list",
      default: "feedback",
      accordion: [
        {
          id: 1,
          name: "Feedback List",
          to: "/feedback/config-feedback-list",
          default: "feedback",
          activeLinks: [
            "/feedback/config-feedback-list",
            "/feedback/config-feedback-form",
          ],
          notVisible: false,
        },
        {
          id: 2,
          name: "Card List",
          to: "/feedback/config-feedback-card-list",
          default: "feedback",
          activeLinks: [
            "/feedback/config-feedback-card-list",
            "/feedback/config-feedback-card-form",
          ],
          notVisible: false,
        },
        {
          id: 3,
          name: "Question List",
          to: "/feedback/config-feedback-question-list",
          default: "feedback",
          activeLinks: [
            "/feedback/config-feedback-question-list",
            "/feedback/config-feedback-question-form",
          ],
          notVisible: false,
        },
        {
          id: 4,
          name: "Bulk Upload",
          to: "/feedback/feedback-bulk-upload",
        },
      ],
    },
  ],
};

export const featureFeedbackModule = {
  title: "FFM Module",
  image: hr_img,
  items: [
    {
      id: 1,
      name: "Configuration",
      to: "/ffm/config-project-service-list",
      default: "ffm",
      accordion: [
        {
          id: 1,
          name: "Project Solution/Service",
          to: "/ffm/config-project-service-list",
          default: "ffm",
          activeLinks: [
            "/ffm/config-project-service-list",
            "/ffm/config-project-service-create",
            "/ffm/config-project-service-update",
          ],
        },
        {
          id: 2,
          name: "Solution/Service Module",
          to: "/ffm/config-service-module-list",
          activeLinks: [
            "/ffm/config-service-module-list",
            "/ffm/config-service-module-create",
            "/ffm/config-service-module-update",
          ],
        },
        {
          id: 3,
          name: "Solution/Service Module Feature",
          to: "/ffm/config-service-module-feature-list",
          activeLinks: [
            "/ffm/config-service-module-feature-list",
            "/ffm/config-service-module-feature-create",
            "/ffm/config-service-module-feature-update",
          ],
        },
        {
          id: 4,
          name: "Feedback List",
          to: "/ffm/config-feedback-list",
          activeLinks: [
            "/ffm/config-feedback-list",
            "/ffm/config-feedback-create",
            "/ffm/config-feedback-update",
          ],
        },
        {
          id: 5,
          name: "Feedback Option",
          to: "/ffm/config-feedback-option-list",
          activeLinks: [
            "/ffm/config-feedback-option-list",
            "/ffm/config-feedback-option-create",
            "/ffm/config-feedback-option-update",
          ],
        },
        {
          id: 6,
          name: "Feedback Option Reason",
          to: "/ffm/config-feedback-option-reason-list",
          activeLinks: [
            "/ffm/config-feedback-option-reason-list",
            "/ffm/config-feedback-option-reason-create",
            "/ffm/config-feedback-option-reason-update",
          ],
        },
        {
          id: 7,
          name: "Feature Feedback Configuration",
          to: "/ffm/config-feedback-configuration-list",
          activeLinks: [
            "/ffm/config-feedback-configuration-list",
            "/ffm/config-feedback-configuration-create",
            "/ffm/config-feedback-configuration-update",
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Feature Wise Feedback List",
      to: "/ffm/feature-wise-feedback-list",
      default: "ffm",
    },
  ],
};

export const timeLine = {
  title: "Timeline Module",
  image: "/static/media/hr.b0f9b351.svg",
  items: [
    {
      id: 1,
      name: "Timeline List",
      to: "/timeline/timeline-list",
      default: "timeline",
      activeLinks: [
        "/timeline/user-wise-timeline-list",
        "/timeline/timeline-card-wise-question-view",
      ],
    },
    {
      id: 2,
      name: "My Timeline List",
      to: "/timeline/my-timeline-list",
      default: "feedback",
      activeLinks: [
        "/timeline/my-timeline-submission-initiate",
        "/timeline/my-timeline-card-wise-question-list",
      ],
    },
    {
      id: 3,
      name: "Configuration",
      to: "/timeline/config-timeline-list",
      default: "timeline",
      accordion: [
        {
          id: 1,
          name: "Timeline List",
          to: "/timeline/config-timeline-list",
          default: "timeline",
          activeLinks: [
            "/timeline/config-timeline-list",
            "/timeline/config-timeline-form",
          ],
          notVisible: false,
        },
        {
          id: 2,
          name: "Card List",
          to: "/timeline/config-timeline-card-list",
          default: "timeline",
          activeLinks: [
            "/timeline/config-timeline-card-list",
            "/timeline/config-timeline-card-form",
          ],
          notVisible: false,
        },
        {
          id: 3,
          name: "Question List",
          to: "/timeline/config-timeline-question-list",
          default: "timeline",
          activeLinks: [
            "/timeline/config-timeline-question-list",
            "/timeline/config-timeline-question-form",
          ],
          notVisible: false,
        },
        {
          id: 4,
          name: "Bulk Upload",
          to: "/timeline/timeline-bulk-upload",
        },
      ],
    },
  ],
};


// testing purpase 
export const todo = {
  title: "todo list",
  image: hr_img,
  items: [
    {
      id: 1,
      name: "todo List",
      to: "/todo/todo-list",
      default: "todo",
      accordion: [
        {
          id: 1,
          name: "SOP Setup",
          to: "/sop/configuration",
          default: "sop",
          notVisible: false,
        },
        {
          id: 2,
          name: "Function Type",
          to: "/sop/configuration-function-type",
          default: "sop",
          notVisible: false,
        },
        {
          id: 3,
          name: "Function Name",
          to: "/sop/configuration-function-name",
          default: "sop",
          notVisible: false,
        },
      ],
    },

    {
      id: 2,
      name: "todo create",
      to: "/todo/todo-create",
      default: "todo",
    },
  ],
};

export const product = {
  title: "product list",
  image: hr_img,
  items: [
    {
      id: 1,
      name: "product List",
      to: "/product/product-list",
      default: "product",
    },

    {
      id: 2,
      name: "product create",
      to: "/product/product-create",
      default: "product",
    },
  ],
};
