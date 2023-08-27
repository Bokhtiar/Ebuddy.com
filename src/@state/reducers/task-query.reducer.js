/** @format */

// Actions.js

import { createActions, createReducer } from "reduxsauce";

const { Types, Creators } = createActions({
  queryTasks: ["page", "assigneeId", "status"],
  queryTasksSuccess: ["data"],
  queryTasksFailure: ["error"],
  querySubTasks: ["taskId"],
  querySubTasksSuccess: ["data"],
  querySubTasksFailure: ["error"],
});
export { Types, Creators };
const initialState = {
  tasks: [],
  subTasks: [],
  error: null,
  isFetching: null,
  isLoading: null,
  paginatorInfo: {
    currentPage: null,
    totalPages: null,
    nextPage: null,
    previousPage: null,
    fromItem: null,
    toItem: null,
    totalItems: null,
  },
};
const queryTasksSuccess = (state, action) => ({
  ...state,
  tasks: action.data,
  isFetching: false,
  error: null,
});
const queryTasks = (state, action) => ({
  ...state,
  isFetching: true,
  error: null,
});

const queryTasksFailure = (state, action) => ({
  ...state,
  isFetching: false,
  error: action.error,
});
const querySubTasksSuccess = (state, action) => ({
  ...state,
  subTasks: action.data,
  isFetching: false,
  error: null,
});
const querySubTasks = (state, action) => ({
  ...state,
  isFetching: true,
  error: null,
});

const querySubTasksFailure = (state, action) => ({
  ...state,
  isFetching: false,
  error: action.error,
});

export default createReducer(initialState, {
  [Types.QUERY_TASKS]: queryTasks,
  [Types.QUERY_TASKS_SUCCESS]: queryTasksSuccess,
  [Types.QUERY_TASKS_FAILURE]: queryTasksFailure,
  [Types.QUERY_SUB_TASKS]: querySubTasks,
  [Types.QUERY_SUB_TASKS_SUCCESS]: querySubTasksSuccess,
  [Types.QUERY_SUB_TASKS_FAILURE]: querySubTasksFailure,
});
