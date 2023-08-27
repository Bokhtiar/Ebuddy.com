/** @format */

import {
  ACTIVITY_COUNT_ALL_USER,
  ACTIVITY_SUB_TASK_LIST,
  EMPLOYEE_MEETINGS,
  EMPLOYEE_SCHEDULE_WORK,
  EMPLOYEE_TASK_LIST,
  MEETING_API,
  SOP_USER_ACTIVITY_DETAILS,
  USER_LIST_MD_CTO_OTHERS,
  WEEKLY_TASK_COUNT,
  WEEKLY_USER_ACTIVITIES
} from "../scripts/api";
import { getData } from "../scripts/api-service";

export const fetchMeetingTracks = async (input) => {
  try {
    const { data } = await getData(`${EMPLOYEE_MEETINGS}${input}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchUserListMdCTOOthers = async (input) => {
  try {
    let query = input ? `?md_dashboard=${input}` : "";
    const { data } = await getData(`${USER_LIST_MD_CTO_OTHERS}${query}`);

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchWeeklyTaskCount = async (input) => {
  try {
    const { data } = await getData(`${WEEKLY_TASK_COUNT}${input}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
export const fetchWeeklyUserActivities = async (input) => {
  try {
    const { data } = await getData(`${WEEKLY_USER_ACTIVITIES}${input}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
export const fetchEmployeeScheduleWork = async (input) => {
  try {
    const { data } = await getData(`${EMPLOYEE_SCHEDULE_WORK}${input}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
export const fetchMeetingDetails = async (input) => {
  try {
    const { data } = await getData(`${MEETING_API}/${input}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
export const fetchEmployeeTaskList = async (action) => {
  const { date, status, pageNo } = action;
  // console.log(action);
  try {
    if (status && date && !pageNo) {
      const { data } = await getData(
        `${EMPLOYEE_TASK_LIST}?date=${date}&status=${status}`,
      );
      return data;
    } else if (!status && date && !pageNo) {
      const { data } = await getData(`${EMPLOYEE_TASK_LIST}?date=${date}`);
      return data;
    } else if (status && date && pageNo) {
      const { data } = await getData(
        `${EMPLOYEE_TASK_LIST}?date=${date}&status=${status}&page=${pageNo}`,
      );
      return data;
    } else if (!status && date && pageNo) {
      const { data } = await getData(
        `${EMPLOYEE_TASK_LIST}?date=${date}&page=${pageNo}`,
      );
      return data;
    }
  } catch (error) {
    throw new Error(error);
  }
};
export const fetchActivityCountAllUser = async (action) => {
  const { from_date, to_date } = action;
  try {
    const { data } = await getData(
      `${ACTIVITY_COUNT_ALL_USER}?from_date=${from_date}&&to_date=${to_date}`,
    );
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchActivityDetails = async (input) => {
  try {
    const { data } = await getData(`${ACTIVITY_SUB_TASK_LIST}/${input}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchSopDetailsData = async (input) => {
  try {
    const {data} = await getData(SOP_USER_ACTIVITY_DETAILS + `/${input}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
