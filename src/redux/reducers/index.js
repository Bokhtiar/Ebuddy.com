/** @format */

import { combineReducers } from "redux";
import test from "./testReducer";
import contacts from "./contactReducer";
import address from "./addressReducer";
import addressHelp from "./addressReducer";
import filteredLink from "./filteredLinkReducer";
import room_id from "./roomReducer";
import page_status from "./pageReducer";
import notificationReducer from "./notificationReducer";
import salesDashboardReducer from "../../@state/reducers/salesDashboard.reducer";
import dashboardReportReducer from "../../@state/reducers/dashboard-report.reducer";
import bulkUploadReducer from "../../@state/reducers/bulk-upload.reducer";
import meetingReducer from "../../@state/reducers/meeting.reducer";
import commonReducer from "../../@state/reducers/common.reducer";
import taskQueryReducer from "../../@state/reducers/task-query.reducer";

export default combineReducers({
  test,
  contacts,
  address,
  // addressHelp,
  filteredLink,
  room_id,
  page_status,
  notification: notificationReducer,
  salesDashboard: salesDashboardReducer,
  dashboardReport: dashboardReportReducer,
  bulkUpload: bulkUploadReducer,
  meeting: meetingReducer,
  common: commonReducer,
  queryTasks: taskQueryReducer,
});
