/** @format */

import React from "react";
import { calculateTimeDifference } from "../../../@infrastructure/calculateTimeDifference";

const useCalculateTimeDifference = (startTime, endTime) => {
  return calculateTimeDifference(startTime, endTime);
};

export default useCalculateTimeDifference;
