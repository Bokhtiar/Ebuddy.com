/** @format */

import { ACTIVITY_LIST, ACTIVITY_SUB_TASK_LIST } from "../scripts/api";
import { getData } from "../scripts/api-service";

export const fetchTasks = async (page, assigneeId, status) => {
  const queryParams = {
    page,
    assignee: assigneeId,
    status,
  };

  const urlParams = new URLSearchParams(
    Object.entries(queryParams).filter(([key, value]) => value !== undefined),
  );

  const url = `${ACTIVITY_LIST}?${urlParams.toString()}`;

  const response = await getData(url);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks.");
  }

  const data = await response.json();
  return data;
};
export const fetchActivityDetails = async (input) => {
  try {
    const { data } = await getData(`${ACTIVITY_SUB_TASK_LIST}/${input}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
