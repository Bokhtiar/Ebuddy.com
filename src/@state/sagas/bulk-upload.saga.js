/** @format */

import { takeLatest, call, put } from "redux-saga/effects";
import {
  projectBulkUploadService,
  milestoneBulkUploadService,
} from "../../@services/bulk-upload.service";
import { Creators, Types } from "../reducers/bulk-upload.reducer";

export function* projectBulkUploadRequest(action) {
  const { input } = action;
  // console.log(input);
  try {
    const data = yield call(projectBulkUploadService, input);
    yield put(Creators.projectBulkUploadSuccess(data));
  } catch (error) {
    yield put(Creators.projectBulkUploadFailure(error));
  }
}

export function* milestoneBulkUploadRequest(action) {
  const { input } = action;
  // console.log(action);
  try {
    const data = yield call(milestoneBulkUploadService, input);
    yield put(Creators.milestoneBulkUploadSuccess(data));
  } catch (error) {
    yield put(Creators.milestoneBulkUploadFailure(error));
  }
}

export default function* bulkUploadSagas() {
  yield takeLatest(Types.PROJECT_BULK_UPLOAD, projectBulkUploadRequest);
  yield takeLatest(Types.MILESTONE_BULK_UPLOAD, milestoneBulkUploadRequest);
}
