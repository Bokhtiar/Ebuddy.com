/** @format */

import { call, debounce, put } from "redux-saga/effects";
import { fetchActivityStatusListService } from "../../@services/common.service";
import {
  Creators as CommonCommands,
  Types as CommonTypes,
} from "../reducers/common.reducer";

export function* getActivityStatusesRequest() {
  try {
    const { data } = yield call(fetchActivityStatusListService);
   // console.log({ data });
    yield put(CommonCommands.getActivityStatusesSuccess(data));
  } catch (error) {
    yield put(CommonCommands.getActivityStatusesFailure(error));
  }
}

export default function* commonSagas() {
  yield debounce(
    1500,
    CommonTypes.GET_ACTIVITY_STATUSES,
    getActivityStatusesRequest,
  );
}
