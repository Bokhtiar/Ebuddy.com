/** @format */

export const api_link = process.env.REACT_APP_BASE;

//general

export const ME = "accounts/v1/me";
export const DIGITAL_ATTENDANCE = "accounts/v1/hris/emp-attendance";
export const TEAM_DIGITAL_ATTENDANCE = "accounts/v1/hris/team-attendance";
export const SUBORDINATES = "accounts/v1/e-buddy/subordinate-list";
export const DEPTS = "accounts/v1/hris/department-list";
export const MY_PERM = "accounts/v1/get-my-permissions";
export const LAST_ENTRY_TIME = "accounts/v1/hris/last-entry-time";
// export const DEPARTMENT_LIST = "accounts/v1/hris/department-list"
export const DEPARTMENT_LIST = "accounts/v1/pis-department-list";

//hris
export const ADDRESS_BOOK_PAGE = "accounts/v1/users?paginate";
export const ADDRESS_BOOK = "accounts/v1/users";
export const PROFILE_DETAILS = "accounts/v1/profile";
export const ISSUE_LIST = "accounts/v1/hris/complains";
export const CERTIFICATE_LIST = "accounts/v1/hris/applications";
export const GET_ISSUE_TYPES = "accounts/v1/hris/complain-types";

export const WEEKLY_ATTENDANCE = "accounts/v1/hris/current-week-attendance";
export const TEAM_STATUS = "accounts/v1/hris/my-team-status";
export const ALL_NOTIFICATIONS = "accounts/v1/notification/all";
export const LEAVE_BALANCE = "accounts/v1/hris/leave-balance";
export const MY_TEAM = "accounts/v1/hris/my-team";
export const PASSWORD_RESET = "accounts/v1/password-reset";

//cbs
export const CBS_ACCESS = "cbs/v1/check-team-cbs-access";
export const MY_CBS = "cbs/v1/my-list";
export const MY_CBS_COUNT = "cbs/v1/my-status-with-count";

export const TEAM_CBS = "cbs/v1/team-cbs-list";
export const TEAM_CBS_COUNT = "cbs/v1/status-with-count";
export const TEAM_APPROVE_DECLINE = "cbs/v1/team-cbs-approve-decline"; //POST

export const ORG_CBS = "cbs/v1/org-cbs-list";
export const ORG_CBS_COUNT = "cbs/v1/org-status-with-count";
export const ORG_APPROVE_DECLINE = "cbs/v1/finance-cbs-approve-decline";
export const CBS_PAID = "cbs/v1/finance-cbs-paid";

export const BILL_PROC_COUNT = ""; // todo for Backend
export const BILL_PROC = "cbs/v1/bill-in-process";
export const BILL_PROC_SHOW = "cbs/v1/bill-in-process-show";
export const BILL_PROC_SUMMARY = "cbs/v1/get-summery-report";
export const SCB_REPORT = "cbs/v1/get-process-bank-scb-report";
export const CASH_REPORT = "cbs/v1/get-process-bank-cash-report";
export const ALL_REPORT = "cbs/v1/get-process-bank-all-report";
export const TO_BANK_OR_PAID = "cbs/v1/bill-in-process-update"; //POST, Status = 2 ? to-bank, Status = 3 ? mark-as-paid

export const CBS_ROLES_SUBORDINATES =
  "accounts/v1/e-buddy/subordinate-list?cbs=true";
export const CBS_MAPPING = "cbs/v1/get-cbs-approval-mapping";
export const ADD_CBS_MAPPING = "cbs/v1/add-cbs-approval-mapping";
export const UPDATE_CBS_MAPPING = "cbs/v1/update-cbs-approval-mapping";

//meeting
// export const MY_MEETING = "rooms/v1/meeting/list?";
export const MY_MEETING = "rooms/v1/meeting/list";
export const CREATED_ONLY = "rooms/v1/meeting/list?created_only=true";
export const SUBORDINATE_MEETING = "rooms/v1/meeting/list?subordinate=true";
// rooms/v1/meeting/list?created_only=true&?&title=${value}
// export const SUB_MEETING = "accounts/v1/e-buddy/subordinate-list";

//cbs new
export const MY_BILLS = "cbs/v1/cbs-list";
export const CBS_TYPES_LIST = "cbs/v1/cbs-types-list";
export const CBS_CLAIM_TYPES_LIST = "cbs/v1/cbs-claim-types-list";
export const CBS_CREATE = "cbs/v1/attachment/create-cbs"; //"cbs/v1/create-cbs";
export const CBS_APPROVAL_LIST_DEPT = "cbs/v1/supervisor-or-dept-approval-list";
export const CBS_APPROVAL_LIST_FINANCE = "cbs/v1/finance-approval-list";
export const CBS_SUPERVISOR_APPROVAL =
  "cbs/v1/supervisor-or-dept-approve-reject";
export const CBS_FINANCE_APPROVAL = "cbs/v1/finance-approval";
export const CBS_PAID_LIST = "cbs/v1/finance-pay-list";
export const CBS_WITHDRAW = "cbs/v1/withdraw-cbs";

//utility
export const RECHARGE_LOG = "accounts/v1/e-buddy/recharge-log";
export const RECHARGE = "recharge/v1/init";

//task management
export const CREATE_GET_PROJECT = "task/v1/project";
// export const GET_TASK_BY_PROJECT = 'rooms/v1/task';
export const GET_TASK_BY_PROJECT = "task/v1/task";
export const CREATE_GET_TASKS = "task/v1/task";
export const DELAYED_TASKS = "";
export const DELETE_TASK = "task/v1/task-delete"; //POST
export const TASK_COMMENTS = "task/v1/comment";

//task management business
export const GET_TASK_TYPES = "rooms/v1/task-types";
export const CREATE_GET_BIZ_TASKS = "rooms/v1/task";
export const CREATE_COMPANY = "rooms/v1/create-company";
export const GET_COMPANY_LIST = "accounts/v1/company";
export const GET_BIZ_TASK_REPORTING = "rooms/v1/task-reporting";
export const TASK_REPORTING_DETAILS = "rooms/v1/task-reporting-show";

//role settings
export const GET_ROLES_DATA = "accounts/v1/get-roles";
export const GET_ROLE_USERS = "accounts/v1/get-role-users/";
export const GET_USER_ROLES = "accounts/v1/get-user-roles";
export const ADD_USER_TO_ROLE = "accounts/v1/add-role-users/";
export const REMOVE_USER_FROM_ROLE = "accounts/v1/remove-role-users/";

//work from home

export const ELIGIBILITY = "accounts/v1/track/eligibility";
export const WFH_FILE_UPLOAD = "files/v1/upload";
export const LOGGED_TIME = "accounts/v1/track/logged-time";
export const PENDING_APPLICATIONS = "accounts/v1/track/eligibility-application";
export const REVIEW_APPLICATION =
  "accounts/v1/track/eligibility-application-review";
export const SCREENSHOTS = "accounts/v1/track/subordinate-screenshots";
export const MY_SS = "accounts/v1/track/my-desktop-ss";
export const TEAM_ATTENDANCE = "accounts/v1/track/team-attendance";
export const TEAM_MEMBERS = "accounts/v1/e-buddy/subordinate-list?track=true";
export const PUNCH_REPORT = "accounts/v1/hris/punch-report";
export const REMOTE_PUNCH_ELIGIBILITIES =
  "accounts/v1/hris/remote-punch-eligibilities";
export const CHANGE_PUNCH_ELIGIBILITIES =
  "accounts/v1/hris/change-punch-eligibility";

//Team locator
export const TEAM_LOCATION = "accounts/v1/location/get-team";

//Config module
export const MILESTONE_TYPE = "task/v1/milestone-type";
export const MILESTONE_STATUS = "task/v1/milestone-status";
export const MILESTONES = "task/v1/milestones";
export const MILESTONES_CREATE = "task/v1/milestones-create";
export const PAYMENT_STATUS = "task/v1/payment-status";
export const INDUSTRY_TYPE_CREATE = "task/v1/industry-type-create";
export const INDUSTRY_TYPE_LIST = "task/v1/industry-type";
export const INDUSTRY_TYPE_DROPDOWN_LIST = "task/v1/industry-type-list";
export const INDUSTRY_SECTOR_CREATE = "task/v1/industry-sector-create";
export const INDUSTRY_SECTOR_LIST = "task/v1/industry-sector";
export const INDUSTRY_SECTOR_DROPDOWN_LIST = "task/v1/industry-sector-list";
export const LOC_CREATE = "task/v1/locations-create";
export const LOCATION = "task/v1/locations";
export const COMPANY_TYPE_CREATE = "task/v1/company-type-create";
export const COMPANY_TYPE_LIST = "task/v1/company-type";
export const COMPANY_SIZE_CREATE = "task/v1/company-size-create";
export const COMPANY_SIZE_LIST = "task/v1/company-size";
export const CLIENT_LIST = "task/v1/clients";
export const CLIENT_POC_LIST = "task/v1/client-poc-list";
export const CLIENT_CREATE = "task/v1/clients-create";
export const CLIENT_BULK_UPLOAD = "task/v1/attachment/bulk-client-upload";
export const CLIENT_POC_BULK_UPLOAD =
  "task/v1/attachment/bulk-client-poc-upload";
export const SERVICE_TYPE_CREATE = "task/v1/service-type-create";
export const SERVICE_TYPE_LIST = "task/v1/service-type";
export const SERVICE_TYPE_DROPDOWN_LIST = "task/v1/service-type-list";
export const SERVICE_SETUP_CREATE = "task/v1/service-setup-create";
export const SERVICE_SETUP_LIST = "task/v1/service-setup";
export const SERVICE_SETUP_DROPDOWN_LIST = "task/v1/service-setup-list";
export const SERVICE_BULK_UPLOAD = "task/v1/attachment/bulk-service-upload";
export const ACTIVITY_TYPE_CREATE = "task/v1/activity-type-create";
export const ACTIVITY_TYPE_LIST = "task/v1/activity-type";
export const ACTIVITY_PRIORITY_CREATE = "task/v1/task-priority-create";
export const ACTIVITY_PRIORITY_LIST = "task/v1/task-priority";
export const ACTIVITY_PRIORITY_LIST_2 = "task/v1/task-priority-list";
export const REVIEW_STATUS_CREATE = "task/v1/reviews-status-create";
export const REVIEW_STATUS_LIST = "task/v1/reviews-status";
export const GET_CLIENT_FILTER = "task/v1/client-filter-params";
export const GET_MILESTONE_TYPE_LIST = "task/v1/milestone-type-list";
export const GET_SERVICE_TYPE_LIST = "task/v1/service-type-list";
export const PROJECT_MILESTONE_DELETE = "task/v1/project-milestone-delete/";
export const PROJECT_MILESTONE_DUPLICATE =
  "task/v1/project-milestone-duplicate/";
export const REVIEW_STATUS_LISTVIEW = "task/v1/reviews-status-list";
export const REVIEW_STATUS_RANGE = "task/v1/reviews-status-range";
export const MILESTONE_STATUS_LIST = "task/v1/milestone-status-list";
export const CLIENT_DEPARTMENT_DELETE = "task/v1/client-department-delete/";
export const CLIENT_DEPARTMENT_POC_DELETE = "task/v1/client-poc-delete/";
export const GENERATION_LIST = "task/v1/client-generation-list";
export const DESIGNATION_LIST = "task/v1/client-designation-list";
export const DESIGNATION_DROPDOWN_LIST =
  "task/v1/client-designation-dropdown-list";
export const CLIENT_DESIGNATION_LIST = "task/v1/client-designation-list";
export const CLIENT_DESIGNATION_VIEW = "task/v1/client-designation-view/";
export const CLIENT_DESIGNATION_UPDATE = "task/v1/client-designation-update";
export const CLIENT_DESIGNATIOIN_CREATE = "task/v1/client-designation-create";
export const FUNCTION_TYPES_LIST = "task/v1/function-types";
export const FUNCTION_TYPES_UPDATE = "task/v1/function-type";
export const FUNCTION_TYPES_CREATE = "task/v1/function-type-create";
export const FUNCTION_TYPES_DROPDOWNLIST = "task/v1/function-types-dropdown";
export const ACTIVITY_FUNCTION_LIST = "task/v1/activity-functions";
export const ACTIVITY_FUNCTION_CREATE = "task/v1/activity-function-create";
export const ACTIVITY_FUNCTION_UPDATE = "task/v1/activity-function";
export const ACTIVITY_FUNCTION_DROPDOWNLIST =
  "task/v1/activity-functions-dropdown";
export const ACTIVITY_CREATE_WITH_ATTACHMENT =
  "task/v1/attachment/activity-create";
export const ACTIVITY_UPDATE_WITH_ATTACHMENT =
  "task/v1/attachment/activity-update";
export const ISSUE_TYPE_DROPDOWN_LIST = "task/v1/issue-type-list";
export const ISSUE_TYPE_LIST = "task/v1/issue-type";
export const ISSUE_TYPE_CREATE = "task/v1/issue-type-create";
export const LICENSE_TYPE_DROPDOWN_LIST = "task/v1/license-type-list";
export const LICENSE_TYPE_LIST = "task/v1/license-type";
export const LICENSE_TYPE_CREATE = "task/v1/license-type-create";
export const LICENSE_ISSUER_DROPDOWN_LIST = "task/v1/license-issuer-list";
export const LICENSE_ISSUER_LIST = "task/v1/license-issuer";
export const LICENSE_ISSUER_CREATE = "task/v1/license-issuer-create";
export const EXTERNAL_TYPE_LIST = "task/v1/external-type";
export const EXTERNAL_TYPE_CREATE = "task/v1/external-type-create";
export const EXTERNAL_POC = "task/v1/external-poc";
export const EXTERNAL_TYPE_DROPDOWN_LIST = "task/v1/external-type-list";
export const PA_CATEGORY_LIST = "task/v1/pa-category";
export const PA_CATEGORY_DROPDOWN_LIST = "task/v1/pa-category-list";
export const PA_CATEGORY_CREATE = "task/v1/pa-category-create";
export const PA_SUB_CATEGORY_LIST = "task/v1/pa-sub-category";
export const PA_SUB_CATEGORY_DROPDOWN_LIST = "task/v1/pa-sub-category-list";
export const PA_SUB_CATEGORY_CREATE = "task/v1/pa-sub-category-create";
export const PA_CRITERIA_LIST = "task/v1/pa-criteria";
export const PA_CRITERIA_DROPDOWN_LIST = "task/v1/pa-criteria-list";
export const PA_CRITERIA_CREATE = "task/v1/pa-criteria-create";
export const PA_SUB_CRITERIA_LIST = "task/v1/pa-sub-criteria";
export const PA_SUB_CRITERIA_DROPDOWN_LIST = "task/v1/pa-sub-criteria-list";
export const PA_SUB_CRITERIA_CREATE = "task/v1/pa-sub-criteria-create";
export const PA_SCORE_LIST = "task/v1/pa-score";
export const PA_SCORE_DROPDOWN_LIST = "task/v1/pa-score-list";
export const PA_SCORE_CREATE = "task/v1/pa-score-create";
export const PA_CATEGORY_CONFIGURATION_LIST = "task/v1/pa-category-config-list";
export const PA_CONFIGURATION_SUMMARY = "task/v1/pa-config-summary";
export const PA_SUB_CATEGORY_CONFIGURATION_LIST =
  "task/v1/pa-sub-category-config-list";
export const PA_CRITERIA_CONFIGURATION_LIST = "task/v1/pa-criteria-config-list";
export const PA_SUB_CRITERIA_CONFIGURATION_LIST =
  "task/v1/pa-sub-criteria-config-list";
export const PA_CATEGORY_CONFIGURATION_CREATE =
  "task/v1/pa-category-config-create";
export const PA_CRITERIA_CONFIGURATION_CREATE = "task/v1/pa-criteria-config";
export const PA_CRITERIA_CONFIGURATION_UPDATE =
  "task/v1/pa-criteria-config-update";
export const PA_SUB_CRITERIA_CONFIGURATION_CREATE =
  "task/v1/pa-sub-criteria-config";
export const PA_SUB_CRITERIA_CONFIGURATION_UPDATE =
  "task/v1/pa-sub-criteria-config";
export const PA_CONFIG_SUMMARY = "task/v1/pa-config-summary";
export const PA_TYPE_LIST = "task/v1/pa-type-list";
export const EMP_PA_TYPE = "task/v1/emp-pa-type";
export const EOM_CATEGORY_LIST = "task/v1/eom-category";
export const EOM_CATEGORY_DROPDOWN_LIST = "task/v1/eom-category-list";
export const EOM_CATEGORY_CREATE = "task/v1/eom-category-create";
export const EOM_REASON_LIST = "task/v1/eom-reason";
export const EOM_REASON_CREATE = "task/v1/eom-reason-create";
export const EOM_ATTRIBUTE_LIST = "task/v1/eom-attribute";
export const EOM_ATTRIBUTE_CREATE = "task/v1/eom-attribute-create";
export const EOM_WINGS_LIST = "task/v1/eom-wings";
export const EOM_WINGS_CREATE = "task/v1/eom-wings-create";
export const PIS_COMPANY_LIST = "accounts/v1/company";
export const PIS_COMPANY_LIST_All = "accounts/v1/company-list";
// export const PIS_DEPARTMENT_LIST= "accounts/v1/department-list"
export const PIS_DEPARTMENT_LIST = "accounts/v1/pis-department-list";
export const PIS_DEPARTMENT = "accounts/v1/department";
export const PIS_DESIGNATION = "accounts/v1/designation";
export const PIS_DESIGNATION_GROUP = "accounts/v1/designation-group";
export const PIS_JOB_TITLE = "accounts/v1/job-title";
export const PIS_BLOCK = "accounts/v1/block";
export const PIS_GRADE = "accounts/v1/grade";
export const PIS_BUSINESS_TYPE = "accounts/v1/business-type";
export const PIS_FLOOR = "accounts/v1/floor";
export const PIS_SALARY_BASE = "accounts/v1/salary-base";
export const PIS_SKILL_TYPE = "accounts/v1/skill-type";
export const PIS_BANK_LIST = "accounts/v1/banks";
export const PIS_BANK_CREATE = "accounts/v1/bank";
export const PIS_BANK_BRANCH_LIST = "accounts/v1/bank-branches";
export const PIS_BANK_BRANCH_CREATE = "accounts/v1/bank-branch";
export const PIS_EDUCATION = "accounts/v1/education";
export const PIS_EMPLOYEE_TYPE = "accounts/v1/employee-type";
export const PIS_FESTIVAL_BONUS = "accounts/v1/festival-bonus";
export const PIS_HOLIDAY = "accounts/v1/holiday";
export const PIS_LANGUAGE = "accounts/v1/language";
export const PIS_LEGAL_STATUS = "accounts/v1/legal-status";
export const PIS_PAYMENT_TERM = "accounts/v1/payment-term";
export const PIS_RELIGION = "accounts/v1/religion";
export const PIS_ROSTER_TYPE = "accounts/v1/roster-type";
export const PIS_DAYS = "accounts/v1/days";
export const PIS_SHIFT_TYPE = "accounts/v1/shift-type";
export const PIS_SKILL_MATRIC = "accounts/v1/skill-matric";
export const PIS_SPECIALIST = "accounts/v1/specialist";
export const PIS_STAFF_CATEGORY = "accounts/v1/staff-category";
export const PIS_WORK_STATION = "accounts/v1/work-station";
export const PIS_ZONE = "accounts/v1/zone";
export const PIS_COURSE = "accounts/v1/course";
export const PIS_AGREEMENT_TYPE = "accounts/v1/agreement-type";
export const PIS_LINE = "accounts/v1/line";
export const PIS_SECTION = "accounts/v1/section";
export const PIS_UNITS = "accounts/v1/units";
export const PIS_PAYROLL_TYPE = "accounts/v1/payroll-type";
export const LEAVE_PACKAGE_LIST = "accounts/v1/leave-package-list";
export const LEAVE_PACKAGE = "accounts/v1/leave-package";
export const LEAVE_APPLICATION = "accounts/v1/leave-application";
export const LEAVE_BULK_UPLOAD = "accounts/v1/attachment/leave-bulk-entry";
export const ATTENDANCE_REGISTER = "accounts/v1/attendence-register";
export const ATTENDANCE_BULK_UPLOAD =
  "accounts/v1/attachment/attendence-bulk-upload";
export const ATTENDANCE_BULK_EXPORT = "upload-formats/bulk_attendance.xlsx";
export const TEAMS_LIST = "accounts/v1/pis-teams";
// export const TEAMS_LIST_ALL = "task/sop/v1/team-list"
export const TEAMS_LIST_ALL = "accounts/v1/pis-team-list";
export const TEAMS_CREATE = "accounts/v1/pis-team";
export const PROJECT_MANAGEMENT_LIST = "task/v1/project-management";
export const PITCH_INITIATE_LIST = "task/v1/pitch/initiate";
export const PITCH_SETUP = "task/v1/pitch";
export const PITCH_DROPDOWN_LIST = "task/v1/pitch/list";
export const PITCH_CARD_SETUP = "task/v1/pitch/card";
export const PITCH_CARD_DROPDOWN_SETUP = "task/v1/pitch/card/list";
export const PITCH_CARD_FEEDBACK_SETUP = "task/v1/pitch/card/feedbacks";
export const PITCH_CARD_FEEDBACK = "task/v1/pitch/card/feedback";
export const PITCH_CARD_FEEDBACK_QUESTION_LIST = "task/v1/pitch/card/feedback";
export const PITCH_BULK_UPLOAD = "task/v1/attachment/pitch/bulk-upload";

// Project Setup
export const PROJECT_DASHBOARD_COUNTS = "task/v1/project-dashboard-counts";
export const ONBOARD_VS_ACHIEVEMENT_LIST = "task/v1/onboard-vs-achivement";
export const PIPELINE_VS_ACHIVEMENT_LIST = "task/v1/pipeline-vs-achivement";
export const EXISTING_VS_NEW_CLIENT = "task/v1/existing-vs-new-client";
export const LEAD_AMOUNT_VS_ONBOARD_AMOUNT_CHART =
  "task/v1/lead-amount-vs-onboard-amount-chart";
export const ONBOARD_AMOUNT_VS_TOTAL_ACHIEVEMENT_AMOUNT_CHART =
  "task/v1/onboard-amount-vs-total-achievement-amount-chart";
export const PROJECT_SETUP_LIST = "task/v1/project-setup";
export const PROJECT_FILTER_PARAM = "task/v1/project-filter-param";
export const ALL_PROJECT_SETUP_LIST = "task/v1/project-setup-list";
export const ALL_PROJECT_ROADMAP_LIST = "task/v1/project-roadmap-list";
export const PROJECT_SETUP_PARAM = "task/v1/project-setup-param";
export const PROJECT_MILESTONE = "task/v1/milestones-list";
export const PROJECT_SETUP_CREATE = "task/v1/project-setup-create";
export const PROJECT_SETUP_VIEW = "task/v1/project-setup-view/";
export const PROJECT_SETUP_UPDATE = "task/v1/project-setup/";
export const PROJECT_MILESTONE_LIST = "task/v1/project-milestone/";
export const PROJECT_MILESTONE_UPDATE = "task/v1/project-milestone-update/";
export const USER_ACTIVITY_LIST = "task/v1/users-activitiy-list";
export const MY_TASK_LIST = "task/v1/user-activities";
export const ACTIVITY_STATUS_UPDATE = "task/v1/activitiy-status-update/";
export const PROJECT_MILESTONE_DELETE_ALL =
  "task/v1/project-milestone-delete-all/";
export const PROJECT_MILESTONE_ATTACHMENT_UPLOAD =
  "task/v1/file/project-milestone-update/";
export const PROJECT_MILESTOEN_ADD = "task/v1/project-milestone-add";
export const PROJECT_MILESTONE_SEARCH = "task/v1/project-milestone-search";
export const ASSIGNEE_WISE_REPORTER = "task/v1/activity/assigne";
export const PROJECT_MILESTONE_DATE_UPDATE =
  "task/v1/project-milestone-date-update/";
export const PROJECT_DEFAULT_MILESTONES = "task/v1/default-milestones";
export const MILESTONE_REASONS = "task/v1/milestone-reason-list";
export const PROJECT_TRACKER_CREATE = "task/v1/create-project";
export const PROJECT_TRACKER_UPDATE = "task/v1/update-project";
export const PROJECT_TRACKER_LIST = "task/v1/project-tracker-list";
export const PROJECT_WISE_MILESTONE_BULK_UPLOAD =
  "task/v1/attachment/project-wise-milestone-bulk-upload";
export const PROJECT_BULK_UPLOAD = "task/v1/attachment/project-bulk-upload";
//Task activity
export const TASK_ACTIVITY_ATTACHMENT_UPLOAD =
  "task/v1/file/activity-attachment/";
export const ACTIVITY_DETAILS = "task/v1/activitiy-details/";
export const FUNCTION_TYPE_ACTIVITY_PARAMS =
  "task/v1/function-type-activitiy-params";
export const WEEKLY_USER_ACTIVITIES = "task/v1/weekly-user-activities";
export const USER_LIST = "task/v1/user-list";
export const EMPLOYEE_LIST_ALL = "task/v1/emp-list";
export const CLIENT_POCS = "task/v1/client-pocs";
export const TASK_ACTIVITY_COMMENT_CREATE = "task/v1/activity-comments-create";
export const PROJECT_WISE_MILESTONE_LIST = "task/v1/project-milestone-list/";

// Superviser view
export const TASK_CALENDAR = "task/v1/task-calender";
export const PROJECT_SUMMARY_TASK_CALENDAR =
  "task/v1/project/summary-task-calendar";

// Milestone
export const MILESTONE_REVIEW_LIST = "task/v1/milestone-review-list";
export const KAM_PROJECT_LIST = "task/v1/kam-project-list";

//superviser
export const EMPLOYEE_LIST = "task/v1/employee-list";
export const PROJECT_LIST_BY_KAM = "task/v1/project-list-by-kam";
export const SUPERVISOR_KAM_LIST = "task/v1/supervisor-kam-list";
export const EMPLOYEE_RUNNING_MILESTONE =
  "task/v1/employee-running-milestone-list";
export const USER_TEAM_LIST = "task/v1/user-team-list";
export const SUPERVISOR_TEAM_TASK = "task/v1/supervisor/team-task-list";
export const SUPERVISOR_TEAM_TASK_EXPORT =
  "task/v1/supervisor/team-task-export";
export const EOM_NOMINEE_LIST = "task/v1/eom-nominee-list";
export const EOM_NOMINEE_CREATE = "task/v1/eom-nominee-create";
export const EOM_NOMINEE_EXPORT = "task/v1/eom-nominee-export";

// Project Management
export const PROJECT_SUMMARY_LIST_BY_KAM =
  "task/v1/project/summary-list-by-kam";
export const PROJECT_ACTIVITY_SUMMARY_TASK_LIST =
  "task/v1/project/summary-task-list";
export const PROJECT_ACTIVITY_SUMMARY_LIST = "task/v1/project/summary-list";
export const PROJECT_TASK_SUMMARY_LIST = "task/v1/project/task-summary";

//supervisor - task review
// export const ACTIVITY_TASK_REVIEW = "/task/v1/activities-review";
export const ACTIVITY_TASK_REVIEW = "task/v1/review-task-list";
export const ACTIVITY_REVIEW_UPDATE = "task/v1/activities-review-update/";
export const ACTIVITY_RATING_UPDATE = "task/v1/activities-rating-update/";
export const PROJECT_LIST_BY_ASSIGNEE = "task/v1/projecy-list-by-assignee/";
export const INDUSTRY_TYPE_PLOTTER = "task/v1/industry-service-plotter";

//supervisor - milestone review
export const KAM_LIST = "accounts/v1/e-buddy/subordinate-list";
export const MILESTONE_STATUS_UPDATE = "task/v1/milestone-status-update/";
export const MILESTONE_REVIEW_UPDATE = "task/v1/milestone-review-update/";

//supervisor - pa fillup
export const EMPLOYEE_PA_LIST = "task/v1/employee-pa-list";
export const FIND_EMPLOYEE_PA = "task/v1/find-employee-pa";
export const EMPLOYEE_PA_CREATE = "task/v1/employee-pa";
export const EMPLOYEE_PA_UPDATE = "task/v1/employee-pa-update";
export const EMPLOYEE_PA_CHART = "task/v1/employee-pa-chart";
export const ACTIVITY_VIEW_REPORT = "task/v1/activity-view-report";
export const ACTIVITY_VIEW_EXPORT = "task/v1/activity-view-export";
export const PA_CHART_EXPORT = "task/v1/employee-pa-chart-export";
export const YEARLY_PA_LIST = "task/v1/yearly-employee-pa";
export const YEARLY_PA_CHART_EXPORT = "task/v1/yearly-employee-pa-chart-export";

//self pa
export const SELF_PA_LIST = "task/v1/user-wise-pa-list";

//task activity/review
export const ACTIVITY_ATTACHMENT_LINK = "task/v1/activity-attachment-link?";

export const EMPLOYEE_RUNNING_TASKS = "task/v1/employee-running-task";
export const EMPLOYEE_OVERDUE_TASKS = "task/v1/employee-overdue-task";
export const EMPLOYEE_FUNCTIONAL_ACTIVITIES =
  "task/v1/employee-functional-activities?";
// export const ACTIVITY_BULK_UPLOAD = "task/v1/attachment/activity-bulk-upload";
export const BUSINESS_ACTIVITY_BULK_UPLOAD =
  "task/v1/attachment/business-activity-bulk-upload";
export const NON_BUSINESS_ACTIVITY_BULK_UPLOAD =
  "task/v1/attachment/non-business-activity-bulk-upload";
export const TASK_MULTIPLE_REVIEW_RATING = "task/v1/activities/multiple-review";

//Notifications
export const NOTIFICATION_LIST = "task/v1/notification-list";
export const NOTIFICATIONS_LIST = "accounts/v1/notification-list";
export const PENDING_TASK_NOTIFICATION_LIST =
  "task/v1/pending-task-notification-list";
export const NOTIFICATION_ACTIVE = "task/v1/notification-accept/";
export const NOTIFICATION_REJECT = "task/v1/notification-reject/";
export const UNREAD_NOTIFICATION_COUNT = "task/v1/unread-notification-count";
export const UNREAD_PENDING_TASK_NOTIFICATION_COUNT =
  "task/v1/unread-pending-task-notification-count";
export const MARK_ALL_NOTIFICATION_READ = "task/v1/mark-all-notification-read";
export const MARK_ALL_PENDING_TASK_NOTIFICATION_READ =
  "task/v1/mark-pending-task-notification-read";
export const MARK_SINGLE_NOTIFICATION =
  "accounts/v1/notification-list/mark-as-read";
export const MARK_ALL_NOTIFICATION =
  "accounts/v1/notification-list/mark-as-read-all";
export const NOTIFICATIONS_LIST_UNREAD = "accounts/v1/notification-list/unread";

//task-summary-report
export const TASK_SUMMARY_REPORT = "task/v1/task-summary-report";
export const TASK_SUMMARY_REPORT_EXPORT = "task/v1/task-summary-export";
export const MILESTONE_SUMMARY_REPORT_EXPORT =
  "task/v1/project-milestone-summary-export";
export const ISSUE_REGISTER_REPORT = "task/v1/issue-register-report";
export const LICENSE_REGISTER_REPORT = "task/v1/license-register-report";

//management-panel
export const MANAGEMENT_TASK_SUMMARY = "task/v1/management-task-summary";
export const MANAGEMENT_DHASHBOARD = "task/v1/management-dashboard";
export const PROJECT_MILESTONE_SUMMARY_REPORT =
  "task/v1/project-milestone-summary-report";
export const PROJECT_MILESTONE_SUMMARY_EXPORT =
  "task/v1/project-milestone-summary-export";
export const MILESTONE_WISE_PROJECT_REPORT_EXPORT =
  "task/v1/milestone-wise-project-report-export";
export const MILESTONE_WISE_PROJECT_REPORT =
  "task/v1/milestone-wise-project-report";
export const ACTIVITY_LIST_BY_USER = "task/v1/activitiy-list-by-user";
export const ACTIVITY_LIST_ALL = "task/v1/activitiy-list-all";
export const TARGET_VS_ACHIEVEMENT = "task/v1/target-vs-achievement";
export const MANAGEMENT_TASK_DETAILS = "task/v1/management-task-details";
export const ACTIVITY_DETAILS_BY_TASK = "task/v1/activities";
export const SUPERVISOR_WISE_KAM_LIST = "task/v1/employee-subordinates";
export const MANAGEMENT_PA_LIST = "task/v1/management-pa-list";
export const MANAGEMENT_USAGE_REPORT = "task/v1/usages-report";
export const MANAGEMENT_USAGE_EXPORT = "task/v1/usages-report-export";

//revenue board
export const KAM_TARGET_PARAM = "task/v1/kam-target-param";
export const KAM_TARGET_CREATE = "task/v1/kam-target-create";
export const KAM_TARGET_LIST = "task/v1/kam-target";
export const KAM_TARGET_DELETE = "task/v1/kam-target-delete";

// register
export const LICENSE_REGISTER_LIST = "task/v1/license-register-list";
export const LICENSE_REGISTER = "task/v1/license-register";
export const LICENSE_REGISTER_DROPDOWN_LIST =
  "task/v1/license-register-dropdown";
export const LICENSE_REGISTER_CREATE = "task/v1/attachment/license-create";
export const LICENSE_REGISTER_UPDATE = "task/v1/attachment/license-update";
export const ISSUE_REGISTER_DROPDOWN_LIST = "task/v1/issue-register-dropdown";
export const ISSUE_REGISTER_LIST = "task/v1/issue-register-list";
export const ISSUE_REGISTER = "task/v1/issue-register";
export const ISSUE_REGISTER_CREATE = "task/v1/attachment/issue-register-create";
export const ISSUE_REGISTER_UPDATE = "task/v1/attachment/issue-register-update";
export const ISSUE_REGISTER_EXPORT = "task/v1/issue-register-export";
export const LICENSE_REGISTER_EXPORT = "task/v1/license-register-export";

// dashboard
export const DASHBOARD_CARD = "task/v1/dashboard";
export const PROJECT_WISE_PROGRESS = "task/v1/project-wise-progress";
export const PROJECT_WISE_PRIORITIES = "task/v1/project-wise-priorities";
export const MILESTONES_UPCOMING_DEADLINE =
  "task/v1/milestones-upcoming-deadline";
export const OVERDUE_MILESTONES = "task/v1/overdue-milestones";
export const LATEST_COMMENTS = "task/v1/latest-comments";

// Employee Registration
export const ADD_EMPLOYEE_INFO = "accounts/v1/attachment/employee-info";
export const EMPLOYEE_INFO_LIST = "accounts/v1/employee-info-list";
export const EMPLOYEE_INFO_ITEMS = "accounts/v1/employee-info";
export const EMPLOYEE_INFO = "accounts/v1/employee-info/";

// Dropdowns
export const COMPANY_LIST = "accounts/v1/company-list";
export const BANK_LIST = "accounts/v1/bank-list";
export const BANK_BRANCH_LIST = "accounts/v1/bank-branch-list";
// export const DEPARTMENT_LIST_ALL = "accounts/v1/department-list";
export const DEPARTMENT_LIST_ALL = "accounts/v1/pis-department-list";
export const DESIGNATION_LIST_ALL = "accounts/v1/designation-list";
export const BUSINESS_TYPE_LIST = "accounts/v1/business-type-list";
export const PAYROLL_TYPE_LIST = "accounts/v1/payroll-type-list";
export const DESIGNTION_GROUP_LIST = "accounts/v1/designation-group-list";
export const UNITS_LIST = "accounts/v1/units-list";
export const JOB_TITLE_LIST = "accounts/v1/job-title-list";
export const GRADE_LIST = "accounts/v1/grade-list";
export const SECTION_LIST = "accounts/v1/section-list";
export const FLOOR_LIST = "accounts/v1/floor-list";
export const LINE_LIST = "accounts/v1/line-list";
export const BLOCK_LIST = "accounts/v1/block-list";
export const SKILL_TYPE_LIST = "accounts/v1/skill-type-list";
export const EDUCATION_LIST = "accounts/v1/education-list";
export const EMPLOYEE_TYPE_LIST = "accounts/v1/employee-type-list";
export const FESTIVAL_BONUS_LIST = "accounts/v1/festival-bonus-list";
export const HOLIDAY_LIST = "accounts/v1/holiday-list";
export const LANGUAGE_LIST = "accounts/v1/language-list";
export const LEAVE_PACKAGE_DROPDOWN_LIST = "accounts/v1/leave-package-list";
export const LEGAL_STATUS_LIST = "accounts/v1/legal-status-list";
export const PAYMENT_TERMS_LIST = "accounts/v1/payment-term-list";
export const RELIGION_LIST = "accounts/v1/religion-list";
export const ROSTER_TYPE_LIST = "accounts/v1/roster-type-list";
export const SALARY_BASE_LIST = "accounts/v1/salary-base-list";
export const DAYS_LIST = "accounts/v1/days-list";
export const SHIFT_TYPE_LIST = "accounts/v1/shift-type-list";
export const SKILL_MATRIC_LIST = "accounts/v1/skill-matric-list";
export const SPECIALIST_LIST = "accounts/v1/specialist-list";
export const STAFF_CATEGORY_LIST = "accounts/v1/staff-category-list";
export const WORK_STATION_LIST = "accounts/v1/work-station-list";
export const ZONE_LIST = "accounts/v1/zone-list";
export const COURSE_LIST = "accounts/v1/course-list";
export const AGREEMENT_TYPE_LIST = "accounts/v1/agreement-type-list";
export const DISTRICTS_LIST = "accounts/v1/districts-list";

// sop
export const TASK_SOP_FUNCTION_LIST = "task/sop/v1/functions/list";
export const CUSTOM_SOP_FUNCTION_LIST =
  "task/sop/v1/functions/sop-function-list";
export const TASK_SOP_FUNCTION_TYPE_LIST = "task/sop/v1/function-type/list";
export const TASK_SETUP_SOP_LIST = "task/sop/v1/setup-sop/list";
export const TASK_SOP_ACTIVITIES = "task/sop/v1/activities";
export const SOP_SETUP = "task/sop/v1/setup-sop";
export const SOP_FUNCTION_TYPE = "task/sop/v1/function-type";
export const SOP_FUNCTION_NAME = "task/sop/v1/functions";
export const SOP_ACTIVITY_BULK_UPLOAD =
  "task/v1/attachment/sop/activity-bulk-upload";
export const SOP_WISE_DEPARTMENT_DESIGNATION_LIST =
  "task/sop/v1/sop-initiate/designation";
export const SOP_INITIATE = "task/sop/v1/sop-initiate";
export const SOP_BULK_UPLOAD_LIST = "task/sop/v1/activity-bulk-upload";
export const SOP_USER_ACTIVITY_LIST = "task/sop/v1/user-activities";
export const SOP_TEAM_ACTIVITY_LIST = "task/sop/v1/team-activity-list";
export const SOP_USER_ACTIVITY_STATUS_UPDATE =
  "task/sop/v1/user-activities/status-update";
export const SOP_USER_ACTIVITY_CREATE =
  "task/v1/attachment/sop/activity-create";
export const SOP_USER_ACTIVITY_UPDATE =
  "task/v1/attachment/sop/update-activities";
export const SOP_USER_ACTIVITY_DETAILS = "task/sop/v1/user-activities";
export const SOP_ACTIVITY_ATTACHMENT_UPLOAD =
  "task/v1/attachment/sop/activity-attachment-upload";
export const SOP_ACTIVITY_COMMENT =
  "task/sop/v1/user-activities/activity-comments";
export const SOP_ACTIVITY_DELETE = "task/sop/v1/activities/sop";
export const SOP_ACTIVITY_REVIEW_LIST = "task/sop/v1/reviewer-activity/list";
export const SOP_ACTIVITY_REVIEW_UPDATE =
  "task/sop/v1/reviewer-activity/review-update";
export const SOP_WISE_ACTIVITY_LIST =
  "task/sop/v1/activities/sop-wise-activity-list";
export const SOP_WISE_DEPARTMENT_LIST = "task/sop/v1/sop-wise-department-list";
export const DEPARTMENT_WISE_SOP_LIST = "task/sop/v1/department-wise-sop-list";
export const SOP_WISE_FUNCTION_TYPE_LIST =
  "task/sop/v1/function-type/sop-wise-list";
export const SOP_TEAM_WISE_USER_LIST = "task/sop/v1/team-wise-user-list";
export const SOP_MULTIPLE_REVIEW_RATING =
  "task/sop/v1/reviewer-activity/multiple-review";
export const SOP_TEAM_ACTIVITY_EXPORT = "task/v1/sop/team-activity-export";

//user-module
// export const USER_CREATE = "accounts/v1/user"
export const USER_CREATE = "accounts/v1/user-create";
export const USER_UPDATE = "accounts/v1/user-update";

//meeting module
export const MEETING_API = "task/v1/meeting";
export const MY_MEETING_API = "task/v1/meeting/my-meetings";
export const MEETING_MINUTE_API = (id) =>
  `task/v1/meeting/${id}/submit-meeting-minute`;
export const MEETING_ACTION_POINT_API = (id) =>
  `task/v1/meeting/${id}/submit-meeting-action-point`;
export const MEETING_LOCATION = "task/v1/meeting/search/location";
export const MEETING_PUBLISH = "task/v1/meeting/minutes/pdf";
export const MEETING_PUBLISH_MAIL = "task/v1/meeting/minutes/pdf/publish/mail";
export const FOLLOWUP_MEETING_CREATE =
  "task/v1/meeting/follow-up-meeting-create";
export const FIND_MEETING_BY_ID = "task/v1/meeting";
export const MEETING_CANCEL = "task/v1/meeting/meeting-cancel";
export const MEETING_CLIENT_LIST = "task/v1/client-list-meeting";
export const MEETING_USER_LIST = "task/v1/user-list-meeting"

//sales dashboard
export const SALES_SERVICE_HEAD = "task/v1/sales/service-head";
export const CLIENT_DROPDOWN_LIST = "task/v1/client-list";
export const SALES_TARGET = "task/v1/sales/target";
export const SALES_TARGET_DROPDOWN_LIST = "task/v1/sales/service-head-list";
export const SALES_TARGET_BULK_UPLOAD =
  "task/v1/attachment/sales-dashboard/bulk-upload";
export const REVENUE_DASHBOARD = "task/v1/sales/revenue-dashboard";
export const DEPARTMENT_WISE_TARGET_ACHIEVEMENT =
  "task/v1/sales/department-wise-target-achievement";
export const TOP_TEN_SMS_TOP_TEN_CLIENT =
  "task/v1/sales/top-ten-sms-and-top-up-client";
export const KAM_WISE_REVENUE = "task/v1/sales/kam-wise-revenue";
export const INDUSTRY_KAM_WISE_REVENUE =
  "task/v1/sales/industry-kam-wise-revenue";
export const YEARLY_PRODUCT_WISE_REVENUE =
  "task/v1/sales/yearly-product-wise-revenue";
export const SALES_TARGET_VS_ACHIEVEMENT =
  "task/v1/sales/sales-target-achievement-report";
export const SALES_TARGET_VS_ACHIEVEMENT_EXPORT =
  "task/v1/sales/sales-target-achievement-report-export";
export const SALES_INDUSTRY_WISE_TARGET_VS_ACHIEVEMENT =
  "task/v1/sales/industry-wise-target-achievement-report";
export const NON_BUDGETE_ACHIEVEMENT = "task/v1/sales/achievement-response";

// feature feedback module
export const FFM_SERVICE_LIST = "task/v1/ffm/service-list";
export const FFM_SERVICE_DROPDOWN_LIST = "task/v1/ffm/service-dropdown-list";
export const FFM_SERVICE_CREATE = "task/v1/ffm/service-create";
export const FFM_SERVICE_UPDATE = "task/v1/ffm/service-update";
export const FFM_SERVICE_BY_ID = "task/v1/ffm/service-show";
export const FFM_SERVICE_MODULE_LIST = "task/v1/ffm/service-module-list";
export const FFM_SERVICE_MODULE_DROPDOWN_LIST =
  "task/v1/ffm/feature-dropdown-list";
export const FFM_SERVICE_MODULE_CREATE = "task/v1/ffm/service-module-create";
export const FFM_SERVICE_MODULE_UPDATE = "task/v1/ffm/service-module-update";
export const FFM_SERVICE_MODULE_FEATURE_LIST = "task/v1/ffm/feature-list";
export const FFM_SERVICE_MODULE_FEATURE_DROPDOWN_LIST =
  "task/v1/ffm/feature-dropdown-list";
export const FFM_SERVICE_MODULE_FEATURE_BY_ID = "task/v1/ffm/feature-show";
export const FFM_SERVICE_MODULE_FEATURE_CREATE = "task/v1/ffm/feature-create";
export const FFM_SERVICE_MODULE_FEATURE_UPDATE = "task/v1/ffm/feature-update";
export const FFM_FEATURE_FEEDBACK_LIST = "task/v1/ffm/user-feedback-list";
export const FFM_FEATURE_FEEDBACK_DROPDOWN_LIST =
  "task/v1/ffm/feedback-dropdown-list";
export const FFM_FEEDBACK_LIST = "task/v1/ffm/feedback-list";
export const FFM_FEEDBACK_BY_ID = "task/v1/ffm/feedback-show";
export const FFM_FEEDBACK_DROPDOWN_LIST = "task/v1/ffm/feedback-dropdown-list";
export const FFM_FEEDBACK_CREATE = "task/v1/ffm/feedback-create";
export const FFM_FEEDBACK_UPDATE = "task/v1/ffm/feedback-update";
export const FFM_FEEDBACK_OPTION_LIST = "task/v1/ffm/feedback-option-list";
export const FFM_FEEDBACK_OPTION_DROPDOWN_LIST =
  "task/v1/ffm/feedback-option-dropdown-list";
export const FFM_FEEDBACK_OPTION_BY_ID = "task/v1/ffm/feedback-option-show";
export const FFM_FEEDBACK_OPTION_CREATE = "task/v1/ffm/feedback-option-create";
export const FFM_FEEDBACK_OPTION_UPDATE = "task/v1/ffm/feedback-option-update";
export const FFM_FEEDBACK_REASON_LIST = "task/v1/ffm/feedback-reason-list";
export const FFM_FEEDBACK_REASON_DROPDOWN_LIST =
  "task/v1/ffm/feedback-reason-dropdown-list";
export const FFM_FEEDBACK_REASON_BY_ID = "task/v1/ffm/feedback-reason-show";
export const FFM_FEEDBACK_REASON_CREATE = "task/v1/ffm/feedback-reason-create";
export const FFM_FEEDBACK_REASON_UPDATE = "task/v1/ffm/feedback-reason-update";
export const FFM_FEEDBACK_CONFIGURATION_LIST =
  "task/v1/ffm/feedback-config-list";
export const FFM_FEEDBACK_CONFIGURATION_BY_ID =
  "task/v1/ffm/feedback-config-show";
export const FFM_FEEDBACK_CONFIGURATION_CREATE = "task/v1/ffm/feedback-config";
export const DEPARTMENT_SERVICE_MATRIX = "task/v1/department-service-matrix";
export const DEPARTMENT_SERVICE_MATRIX_EXPORT =
  "task/v1/department-service-matrix-export";
export const DEPARTMENT_SERVICE_MATRIX_BULK_UPLOAD =
  "task/v1/attachment/service-matrix-bulk-upload";

//feedback
export const USER_WISE_FEEDBACK_LIST = "task/v1/feedback/kam-initiate-list";
export const FEEDBACK_SERVICE_TYPE_LIST = "task/v1/feedback/service-type-list";
export const FEEDBACK_SERVICE_LIST = "task/v1/feedback/service-list";
export const FEEDBACK = "task/v1/feedback";
export const FEEDBACK_DROPDOWN_LIST = "task/v1/feedback/list";
export const FEEDBACK_CARD = "task/v1/feedback/card";
export const FEEDBACK_CARD_DROPDOWN_LIST = "task/v1/feedback/card/list";
export const FEEDBACK_QUESTION_LIST = "task/v1/feedback/card/questions";
export const FEEDBACK_QUESTION = "task/v1/feedback/card/question";
export const FEEDBACK_QUESTION_DELETE = "task/v1/pitch/card/feedback";
export const FEEDBACK_QUESTION_VIEW = "task/v1/feedback/card/questions/view";
export const FEEDBACK_QUESTION_DROPDOWN_LIST =
  "task/v1/feedback/card/question/list";
export const FEEDBACK_INITIATE = "task/v1/feedback/initiate";
export const FEEDBACK_INITIATE_BY_CARD_ID = "task/v1/feedback/initiate/card";
export const FEEDBACK_INITIATE_ALL_LIST = "task/v1/feedback/initiate";
export const MULTIPLE_APPROVAL = "cbs/v1/multiple-approval";
export const CBS_EXPORT = "cbs/v1/cbs-export";
export const FEEDBACK_BULK_UPLOAD = "task/v1/attachment/feedback/bulk-upload";

// Activity Section

export const GET_DAILY_MEETINGS = "task/v1/md/dashboard/employee-meetings";
export const EMPLOYEE_MEETINGS = "task/v1/md/dashboard/employee-meetings";
export const EMPLOYEE_SCHEDULE_WORK =
  "task/v1/md/dashboard/employee-schedule-work";
export const WEEKLY_TASK_LIST = "task/v1/md/dashboard/weekly-task-count";
export const WEEKLY_TASK_COUNT = "task/v1/md/dashboard/weekly-task-count";
export const ACTIVITY_LIST = "task/v1/md/dashboard/employee-activities";
export const ACTIVITY_SUB_TASK_LIST = "task/v1/md/dashboard/activity-sub-tasks";
export const MEETING_TRACKS = "task/v1/md/dashboard/meeting-tracks";
export const USER_LIST_MD_CTO_OTHERS =
  "task/v1/md/dashboard/user-list-md-cto-others";
export const MEETING_TASK_LIST = "task/v1/md/dashboard/meeting-task-list";
// employee-task-list?date=2023-06-17&status=Done
export const EMPLOYEE_TASK_LIST = "task/v1/md/dashboard/employee-task-list";
// task/v1/activity-count-all-user?from_date=2022-06-01&to_date=2022-06-07
export const ACTIVITY_COUNT_ALL_USER =
  "task/v1/md/dashboard/date-wise-activity-count";
export const ACTIVITY_STATUS_LIST = "task/v1/activity-status";
