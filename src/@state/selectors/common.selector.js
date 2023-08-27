/** @format */

import { createSelector } from "reselect";

export const commonState = (state) => state.common;

export const selectIsFetching = createSelector(
  [commonState],
  ({ isFetching }) => isFetching,
);

export const selectError = createSelector([commonState], ({ error }) => error);

export const selectActivityStatuses = createSelector(
  [commonState],
  ({ activityStatuses }) => activityStatuses,
);
