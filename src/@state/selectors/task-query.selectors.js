/** @format */

import { createSelector } from "reselect";

const selectQueryTaskState = (state) => state.queryTasks;

export const selectTasks = createSelector(
  [selectQueryTaskState],
  ({ tasks }) => tasks,
);

export const selectError = createSelector(
  [selectQueryTaskState],
  ({ error }) => error,
);

export const selectIsFetching = createSelector(
  [selectQueryTaskState],
  ({ isFetching }) => isFetching,
);

export const selectPaginatorInfo = createSelector(
  [selectQueryTaskState],
  ({ paginatorInfo }) => paginatorInfo,
);
