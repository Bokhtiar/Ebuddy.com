/** @format */

import keyBy from "lodash/keyBy";
import uniqBy from "lodash/uniqBy";
import { createActions, createReducer } from "reduxsauce";
import { FetchStatus, Status } from "../../@statics/Status";

const { Types, Creators } = createActions(
  {
    getMeetingTracks: ["input"],
    getMeetingTracksSuccess: ["data"],
    getMeetingTracksFailure: ["error"],

    getActivity: ["input"],
    getActivitySuccess: ["data"],
    getActivityFailure: ["error"],

    getWeeklyTaskCount: ["input"],
    getWeeklyTaskCountSuccess: ["data"],
    getWeeklyTaskCountFailure: ["error"],

    getUserListMdCtoOthers: ["input"],
    getUserListMdCtoOthersSuccess: ["data"],
    getUserListMdCtoOthersFailure: ["error"],

    getActivityCountAllUser: ["from_date", "to_date"],
    getActivityCountAllUserSuccess: ["data"],
    getActivityCountAllUserFailure: ["error"],

    getWeeklyUserActivities: ["input"],
    getWeeklyUserActivitiesSuccess: ["data"],
    getWeeklyUserActivitiesFailure: ["error"],

    getEmployeeScheduleWork: ["input"],
    getEmployeeScheduleWorkSuccess: ["data"],
    getEmployeeScheduleWorkFailure: ["error"],

    getEmployeeTaskList: ["date", "status", "pageNo"],
    getEmployeeTaskListSuccess: ["data"],
    getEmployeeTaskListFailure: ["error"],

    getMeetingDetails: ["input"],
    getMeetingDetailsSuccess: ["data"],
    getMeetingDetailsFailure: ["error"],
    setActivityId: ["input"],
    resetActivityId: [""],
    resetActivity: [""],

    resetMeetingTracks: [""],
    resetWeeklyTaskCount: [""],
    resetUserListMdCtoOthers: [""],

    getSopDetails: ["input"],
    getSopDetailsSuccess: ["data"],
    getSopDetailsFailure: ["error"]
  },
  { prefix: "@DashboardReports/" },
);

export { Creators, Types };

const initialState = {
  isFetching: FetchStatus.INITIAL,
  error: Status.INITIAL,
  meetingTracks: Status.INITIAL,
  weeklyTaskCount: Status.INITIAL,
  userListMdCTOOthers: Status.INITIAL,
  weeklyUserActivities: Status.INITIAL,
  employeeScheduleWork: Status.INITIAL,
  meeting: Status.INITIAL,
  employeeTaskList: Status.INITIAL,
  activityCountAllUser: Status.INITIAL,
  sop: Status.INITIAL,
  paginatorInfo: {
    perPage: 0,
    prevPageUrl: null,
    from: 0,
    to: 0,
    total: 0,
    currentPage: 0,
  },
};

export default createReducer(initialState, {
  [Types.GET_ACTIVITY_COUNT_ALL_USER]: (state, action) => {
    // console.log({ action });
    return {
      ...state,
      isFetching: FetchStatus.START,
      error: Status.EMPTY,
    };
  },
  [Types.GET_ACTIVITY_COUNT_ALL_USER_SUCCESS]: (state, action) => {
    const { data } = action;

    return {
      ...state,
      activityCountAllUser: data,
      isFetching: FetchStatus.SUCCESS,
      error: Status.EMPTY,
    };
  },
  [Types.GET_ACTIVITY_COUNT_ALL_USER_FAILURE]: (state, action) => {
    return {
      ...state,
      isFetching: FetchStatus.FAILED,
      error: Status.ERROR,
    };
  },

  [Types.GET_EMPLOYEE_TASK_LIST]: (state, action) => {
    // console.log({ action });
    const { status } = action;
    return {
      ...state,
      paginatorInfo: {
        ...state.paginatorInfo,
        status: status,
      },
      isFetching: FetchStatus.START,
      error: Status.EMPTY,
    };
  },
  [Types.GET_EMPLOYEE_TASK_LIST_SUCCESS]: (state, action) => {
    const {
      data: { data, current_page, per_page, to, total, prev_page_url, from },
    } = action;
    // console.log(data, current_page, per_page, to, total, prev_page_url, from);
    return {
      ...state,
      isFetching: FetchStatus.SUCCESS,
      error: Status.EMPTY,
      employeeTaskList: data,
      paginatorInfo: {
        currentPage: current_page,
        perPage: per_page,
        to: to,
        total: total,
        prevPageUrl: prev_page_url,
        from: from,
      },
    };
  },
  [Types.GET_EMPLOYEE_TASK_LIST_FAILURE]: (state, action) => {
    return {
      ...state,
      isFetching: FetchStatus.FAILED,
      error: Status.ERROR,
    };
  },

  [Types.RESET_ACTIVITY]: (state, action) => {
    return {
      ...state,
      activity: Status.RESET,
    };
  },
  [Types.RESET_ACTIVITY_ID]: (state, action) => {
    return {
      ...state,
      activityId: Status.RESET,
    };
  },

  [Types.SET_ACTIVITY_ID]: (state, action) => {
    const { input } = action;
    return {
      ...state,
      activityId: input,
    };
  },

  [Types.GET_MEETING_DETAILS]: (state, action) => {
    return {
      ...state,
      isFetching: FetchStatus.START,
      error: Status.EMPTY,
    };
  },
  [Types.GET_MEETING_DETAILS_SUCCESS]: (state, action) => {
    const { data } = action;
    // console.log({ data });
    return {
      ...state,
      meeting: data,
      isFetching: FetchStatus.SUCCESS,
      error: Status.EMPTY,
    };
  },
  [Types.GET_MEETING_DETAILS_FAILURE]: (state, action) => {
    return {
      ...state,
      isFetching: FetchStatus.FAILED,
      error: Status.EMPTY,
    };
  },
  [Types.GET_ACTIVITY]: (state, action) => {
    return {
      ...state,
      isFetching: FetchStatus.START,
      error: Status.EMPTY,
    };
  },
  [Types.GET_ACTIVITY_SUCCESS]: (state, action) => {
    const { data } = action;
    return {
      ...state,
      activity: data,
      isFetching: FetchStatus.SUCCESS,
      error: Status.EMPTY,
    };
  },
  [Types.GET_ACTIVITY_FAILURE]: (state, action) => {
    return {
      ...state,
      isFetching: FetchStatus.FAILED,
      error: Status.ERROR,
    };
  },
  [Types.GET_EMPLOYEE_SCHEDULE_WORK]: (state, action) => {
    return {
      ...state,
      isFetching: FetchStatus.START,
      error: Status.EMPTY,
    };
  },
  [Types.GET_EMPLOYEE_SCHEDULE_WORK_SUCCESS]: (state, action) => {
    const { data } = action;
    return {
      ...state,
      employeeScheduleWork: data,
      isFetching: FetchStatus.SUCCESS,
      error: Status.EMPTY,
    };
  },
  [Types.GET_EMPLOYEE_SCHEDULE_WORK_FAILURE]: (state, action) => {
    return {
      ...state,
      isFetching: FetchStatus.FAILED,
      error: Status.ERROR,
    };
  },

  [Types.GET_MEETING_TRACKS]: (state, action) => {
    return {
      ...state,
      isFetching: FetchStatus.START,
      error: Status.EMPTY,
    };
  },
  [Types.GET_MEETING_TRACKS_SUCCESS]: (state, action) => {
    const { data } = action;
    // console.log({ data });
    let dataSource = data.map((item) => {
      return {
        ...item,
        meeting: uniqBy(item.meeting, "start_time"),
      };
    });
    return {
      ...state,
      meetingTracks: dataSource,
      isFetching: FetchStatus.SUCCESS,
      error: Status.EMPTY,
    };
  },
  [Types.GET_MEETING_TRACKS_FAILURE]: (state, action) => {
    return {
      ...state,
      isFetching: FetchStatus.FAILED,
      error: Status.ERROR,
    };
  },
  [Types.GET_WEEKLY_TASK_COUNT]: (state, action) => {
    return {
      ...state,
      isFetching: FetchStatus.START,
      error: Status.EMPTY,
    };
  },
  [Types.GET_WEEKLY_TASK_COUNT_SUCCESS]: (state, action) => {
    const { data } = action;
    const mappedData = keyBy(data, "emp_id");
    return {
      ...state,
      weeklyTaskCount: data,
      isFetching: FetchStatus.SUCCESS,
      error: Status.EMPTY,
    };
  },
  [Types.GET_WEEKLY_TASK_COUNT_FAILURE]: (state, action) => {
    return {
      ...state,
      isFetching: FetchStatus.FAILED,
      error: Status.ERROR,
    };
  },
  [Types.GET_USER_LIST_MD_CTO_OTHERS]: (state, action) => {
    return {
      ...state,
      isFetching: FetchStatus.START,
      error: Status.EMPTY,
    };
  },
  [Types.GET_USER_LIST_MD_CTO_OTHERS_SUCCESS]: (state, action) => {
    const { data } = action;
    // console.log({ action });
    return {
      ...state,
      userListMdCTOOthers: data,
      isFetching: FetchStatus.SUCCESS,
      error: Status.EMPTY,
    };
  },
  [Types.GET_USER_LIST_MD_CTO_OTHERS_FAILURE]: (state, action) => {
    return {
      ...state,
      isFetching: FetchStatus.FAILED,
      error: Status.ERROR,
    };
  },
  [Types.GET_WEEKLY_USER_ACTIVITIES]: (state, action) => {
    return {
      ...state,
      isFetching: FetchStatus.INITIAL,
      error: Status.EMPTY,
    };
  },
  [Types.GET_WEEKLY_USER_ACTIVITIES_SUCCESS]: (state, action) => {
    const { data } = action;
    return {
      ...state,
      weeklyUserActivities: data,
      isFetching: FetchStatus.SUCCESS,
      error: Status.ERROR,
    };
  },
  [Types.GET_WEEKLY_USER_ACTIVITIES_FAILURE]: (state, action) => {
    return {
      ...state,
      isFetching: FetchStatus.FAILED,
      error: Status.ERROR,
    };
  },
  [Types.RESET_MEETING_TRACKS]: (state, action) => {
    return {
      ...state,
      meetingTracks: Status.RESET,
    };
  },
  [Types.RESET_WEEKLY_TASK_COUNT]: (state, action) => {
    return {
      ...state,
      weeklyTaskCount: Status.RESET,
    };
  },
  [Types.RESET_USER_LIST_MD_CTO_OTHERS]: (state, action) => {
    return {
      ...state,
      userListMdCTOOthers: Status.RESET,
    };
  },
  [Types.GET_SOP_DETAILS]: (state, action) => {
    return {
      ...state,
      isFetching: FetchStatus.START,
      error: Status.EMPTY,
    };
  },
  [Types.GET_SOP_DETAILS_SUCCESS]: (state, action) => {
    const { data } = action;
    return {
      ...state,
      sop: data,
      isFetching: FetchStatus.SUCCESS,
      error: Status.EMPTY,
    };
  },
  [Types.GET_SOP_DETAILS_FAILURE]: (state, action) => {
    return {
      ...state,
      isFetching: FetchStatus.FAILED,
      error: Status.EMPTY,
    };
  },
});
