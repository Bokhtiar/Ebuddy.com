/** @format */

import { createActions, createReducer } from "reduxsauce";

const { Types, Creators } = createActions(
  {
    getActivityStatuses: [],
    getActivityStatusesSuccess: ["data"],
    getActivityStatusesFailure: ["error"],
  },
  { prefix: "@Common/" },
);

export { Types, Creators };

const initialState = {
  activityStatuses: [],
  isFetching: null,
  error: null,
};

export default createReducer(initialState, {
  [Types.GET_ACTIVITY_STATUSES]: (state, action) => {
    return Object.assign(state, {
      isFetching: true,
      error: null,
    });
  },
  [Types.GET_ACTIVITY_STATUSES_SUCCESS]: (state, action) => {
    // console.log({ "[GET_ACTIVITY_STATUSES_SUCCESS]": action });
    const { data } = action;
    return {
      ...state,
      activityStatuses: data["data"],
      isFetching: false,
      error: null,
    };
  },
  [Types.GET_ACTIVITY_STATUSES_FAILURE]: (state, action) => {
    // console.log({ "[GET_ACTIVITY_STATUSES_SUCCESS]": action });
    const { error } = action;
    return Object.assign(state, {
      isFetching: false,
      error: error,
    });
  },
});
