/** @format */

import { createActions, createReducer } from "reduxsauce";
import { FetchStatus, Status } from "../../@statics/Status";
import { ActionType } from "../../@types";
import { Message } from "../../@statics/Message";
import uniqBy from "lodash/unionBy";
import floor from "lodash/floor";

const { Types, Creators } = createActions(
  {
    getNonBudgeAchivements: ["input"],
    getNonBudgeAchivementsSuccess: ["data"],
    getNonBudgeAchivementsFailure: ["error"],

    setSearchQuery: ["input"],

    resetNonBudgeAchivements: [],
    resetDateRangeQuery: [],

    resetSearchQuery: [],
  },
  { prefix: "@SalesDashboard/" },
);

export { Types, Creators };

const initialState = {
  error: Status.INITIAL,
  message: Status.INITIAL,
  isFetching: FetchStatus.INITIAL,
  nonBudgeAchivements: Status.INITIAL,
  dateRangeQuery: Status.INITIAL,
  achivementStatus: Status.INITIAL,
  searchQuery: Status.INITIAL,
  perPage: 10,
  prevPageUrl: null,
  to: 10,
  total: 30,
  currentPage: 1,
};

export default createReducer(initialState, {
  [Types.SET_SEARCH_QUERY]: (state, action) => {
    // console.log(action);
    const { key, value } = action.input;
    return {
      ...state,
      searchQuery:
        state.searchQuery === Status.INITIAL
          ? { [key]: value }
          : {
              ...state.searchQuery,
              [key]: value,
            },
    };
  },
  [Types.RESET_SEARCH_QUERY]: (state, action) => {
    return {
      ...state,
      searchQuery: Status.RESET,
    };
  },

  [Types.GET_NON_BUDGE_ACHIVEMENTS]: (state, action) => {
    // console.log(action);
    return {
      ...state,
      message: Status.INITIAL,
      isFetching: FetchStatus.START,
    };
  },

  [Types.GET_NON_BUDGE_ACHIVEMENTS_SUCCESS]: (state, action) => {
    const {
      data: {
        data: {
          data: { data, per_page, prev_page_url, to, total, current_page },
        },
      },
    } = action;
    // console.log(action);
    const list = data
      .map((res) => JSON.parse(res.response))
      .map((item) => {
        return {
          ...item,
          company: item.client_code
            ? `${item.company} (${item.client_code})`
            : `${item.company} `,
          service: item.service_code
            ? `${item.service}  (${item.service_code})`
            : item.service,
          kam: item.kam_id ? `${item.kam}  (${item.kam_id})` : item.kam,
          amount: item.amount ? floor(parseFloat(item.amount), 3) : "--",
        };
      });
    return {
      ...state,
      nonBudgeAchivements: list,
      perPage: per_page,
      prevPageUrl: prev_page_url,
      to: to,
      total: total,
      currentPage: current_page,
      message: Status.SUCCESS,
      isFetching: FetchStatus.SUCCESS,
    };
  },

  [Types.GET_NON_BUDGE_ACHIVEMENTS_FAILURE]: (state, action) => {
    return {
      ...state,
      message: Status.ERROR,
      isFetching: FetchStatus.FAILED,
    };
  },

  [Types.RESET_NON_BUDGE_ACHIVEMENTS]: (state) => {
    return {
      ...state,
      nonBudgeAchivements: Status.RESET,
    };
  },

  [Types.RESET_DATE_RANGE_QUERY]: (state) => {
    return {
      ...state,
      dateRangeQuery: Status.RESET,
    };
  },
});
