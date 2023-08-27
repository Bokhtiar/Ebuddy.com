/** @format */

import { all, fork } from "redux-saga/effects";
import permissionSagas from "./sagas/permission.saga";
import salesDashboardSagas from "./sagas/salesDashboard.saga";
import dashboardReportSagas from "./sagas/dashboard-report.saga";
import bulkUploadSagas from "./sagas/bulk-upload.saga";
import commonSagas from "./sagas/common.saga";

export default function* rootSaga() {
  yield all([
    // fork(permissionSagas),
    fork(salesDashboardSagas),
    fork(dashboardReportSagas),
    fork(bulkUploadSagas),
    fork(commonSagas),
  ]);
}
