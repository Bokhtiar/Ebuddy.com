import { createSelector } from "reselect";

export const taskDataState = state => state.taskData;

export const selectError = createSelector(
    [taskDataState],
    ({ error }) => error
);

export const selectIsFetching = createSelector(
    [taskDataState],
    ({ isFetching }) => isFetching,
)

export const selectTaskPriorites = createSelector(
    [taskDataState],
    ({ taskPriorites }) => taskPriorites,
)