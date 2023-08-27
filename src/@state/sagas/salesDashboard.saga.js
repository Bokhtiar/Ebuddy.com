/** @format */

import { takeLatest, call, put } from "redux-saga/effects";
import { getData } from "../../scripts/api-service";
import { NON_BUDGETE_ACHIEVEMENT } from "../../scripts/api";
import { Creators, Types } from "../reducers/salesDashboard.reducer";
import { fetchNonBudgeAchievements } from "../../@services/salesDashboard.service";

export function* getNonBudgeAchivementsRequest(action) {
  // console.log(action);
  const { input } = action;
  try {
    const data = yield call(fetchNonBudgeAchievements, input);
    yield put(Creators.getNonBudgeAchivementsSuccess(data));
  } catch (error) {
    yield put(Creators.getNonBudgeAchivementsFailure(error));
  }
}

export default function* salesDashboardSagas() {
  yield takeLatest(
    Types.GET_NON_BUDGE_ACHIVEMENTS,
    getNonBudgeAchivementsRequest,
  );
}
