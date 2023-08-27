/** @format */

import { ACTIVITY_STATUS_LIST } from "../scripts/api";
import { getData } from "../scripts/api-service";

export const fetchActivityStatusListService = async () => {
  try {
    const data = await getData(`${ACTIVITY_STATUS_LIST}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
