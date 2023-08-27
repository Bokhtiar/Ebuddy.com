/** @format */

import React from "react";
import { scaleXTransformPerMinute } from "../../../@infrastructure/scaleXTransformByminute";
import useCalculateTimeDifference from "./useCalculateTimeDifference";

const useScaleTransform = (data) => {
  const { start_time, end_time } = data;
  const timeDiff = useCalculateTimeDifference(start_time, end_time);
  const scale = scaleXTransformPerMinute(timeDiff);
  return scale.parentScale;
};

export default useScaleTransform;
