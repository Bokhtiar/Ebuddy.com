/** @format */

import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchActivityCountAllUser,
  fetchActivityDetails,
  fetchEmployeeScheduleWork,
  fetchEmployeeTaskList,
  fetchMeetingDetails,
  fetchMeetingTracks,
  fetchSopDetailsData,
  fetchUserListMdCTOOthers,
  fetchWeeklyTaskCount,
  fetchWeeklyUserActivities,
} from "../../@services/dashboard-report.service";
import { Creators, Types } from "../reducers/dashboard-report.reducer";

export function* getMeetingTracksRequest(action) {
  const { input } = action;
  try {
    const { data } = yield call(fetchMeetingTracks, input);
    // const schedule = yield call(fetchEmployeeScheduleWork,input);
    yield put(Creators.getMeetingTracksSuccess(data));
    // yield put(Creators.getEmployeeScheduleWorkSuccess(schedule));
  } catch (error) {
    yield put(Creators.getMeetingTracksFailure(error));
    // yield put(Creators.getEmployeeScheduleWorkFailure(error));
  }
}
export function* getUserListMdCtoOthersRequest(action) {
  const { input } = action;
  // console.log({ input });
  try {
    const { data } = yield call(fetchUserListMdCTOOthers, input);
    yield put(Creators.getUserListMdCtoOthersSuccess(data));
  } catch (error) {
    yield put(Creators.getUserListMdCtoOthersFailure(error));
  }
}
export function* getWeeklyTaskCountRequest(action) {
  const { input } = action;
  try {
    const { data } = yield call(fetchWeeklyTaskCount, input);
    yield put(Creators.getWeeklyTaskCountSuccess(data));
  } catch (error) {
    yield put(Creators.getWeeklyTaskCountFailure(error));
  }
}
export function* weeklyUserActivitiesRequest(action) {
  const { input } = action;
  // console.log(input);
  try {
    const { data } = yield call(fetchWeeklyUserActivities, input);
    yield put(Creators.getWeeklyUserActivitiesSuccess(data));
  } catch (error) {
    yield put(Creators.getWeeklyUserActivitiesFailure(error));
  }
}

export function* employeeScheduleWorkRequest(action) {
  const { input } = action;
  // console.log(input);
  try {
    const { data } = yield call(fetchEmployeeScheduleWork, input);
    yield put(Creators.getEmployeeScheduleWorkSuccess(data));
  } catch (error) {
    yield put(Creators.getEmployeeScheduleWorkFailure(error));
  }
}
export function* getActivityRequest(action) {
  const { input } = action;
  // console.log(input);
  try {
    const { data } = yield call(fetchActivityDetails, input);
    yield put(Creators.getActivitySuccess(data));
  } catch (error) {
    yield put(Creators.getActivityFailure(error));
  }
}

export function* meetingDetailsRequest(action) {
  const { input } = action;
  // console.log(input);
  try {
    const { data } = yield call(fetchMeetingDetails, input);
    yield put(Creators.getMeetingDetailsSuccess(data));
  } catch (error) {
    yield put(Creators.getMeetingDetailsFailure(error));
  }
}

export function* getEmployeeTaskListRequest(action) {
  // const {input} = action;
  // console.log(input);
  try {
    const { data } = yield call(fetchEmployeeTaskList, action);
    yield put(Creators.getEmployeeTaskListSuccess(data));
  } catch (error) {
    yield put(Creators.getEmployeeTaskListFailure(error));
  }
}

export function* getActivityCountAllUserRequest(action) {
  // const {date, status} = action;
  // console.log(input);
  try {
    const { data } = yield call(fetchActivityCountAllUser, action);
    yield put(Creators.getActivityCountAllUserSuccess(data));
  } catch (error) {
    yield put(Creators.getActivityCountAllUserFailure(error));
  }
}

export function* sopDetailsRequest(action) {
  const { input } = action;
  // console.log(input);
  try {
    const { data } = yield call(fetchSopDetailsData, input);
    yield put(Creators.getSopDetailsSuccess(data));
  } catch (error) {
    yield put(Creators.getSopDetailsFailure(error));
  }
}

export default function* dashboardReportSagas() {
  yield takeLatest(Types.GET_MEETING_TRACKS, getMeetingTracksRequest);
  yield takeLatest(Types.GET_WEEKLY_TASK_COUNT, getWeeklyTaskCountRequest);
  yield takeLatest(
    Types.GET_USER_LIST_MD_CTO_OTHERS,
    getUserListMdCtoOthersRequest,
  );
  yield takeLatest(
    Types.GET_WEEKLY_USER_ACTIVITIES,
    weeklyUserActivitiesRequest,
  );
  yield takeLatest(
    Types.GET_EMPLOYEE_SCHEDULE_WORK,
    employeeScheduleWorkRequest,
  );
  yield takeLatest(Types.GET_MEETING_DETAILS, meetingDetailsRequest);
  yield takeLatest(Types.GET_ACTIVITY, getActivityRequest);
  yield takeLatest(Types.GET_EMPLOYEE_TASK_LIST, getEmployeeTaskListRequest);
  yield takeLatest(
    Types.GET_ACTIVITY_COUNT_ALL_USER,
    getActivityCountAllUserRequest,
  );
  yield takeLatest(Types.GET_SOP_DETAILS, sopDetailsRequest);
}
