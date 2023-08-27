/** @format */

import { call, put, takeLatest } from "redux-saga/effects";
// import { fetchTaskSuccess, fetchTaskFailure } from "./Actions";
import { fetchTasks } from "../../@services/task.service";
import {
  Types as TaskQueryTypes,
  Creators as QueryTasks,
} from "../reducers/task-query.reducer";

function* fetchTasksSaga(action) {
  try {
    const { page, assigneeId, status } = action.payload;
    const taskData = yield call(fetchTasks, page, assigneeId, status);
    yield put(QueryTasks.queryTasksSuccess(taskData));
  } catch (error) {
    yield put(QueryTasks.queryTasksFailure(error));
  }
}

export function* watchTasksSaga() {
  yield takeLatest(TaskQueryTypes.QUERY_TASKS, fetchTasksSaga);
}
