/** @format */

import React from "react";
import { CalendarStyleSheet } from "../components/Calendar/CalenderStyleSheet";
import { StatusName } from "../../../@infrastructure/Status";
import useScaleTransform from "./useScaleTransform";
import useZIndexModifier from "./useZIndexModifier";
const {
  cellStyle: { wrapper },
} = CalendarStyleSheet;
const useCalenderCellHover = (data, index, currentIndex) => {
  const zAxisStyle = useZIndexModifier(index, currentIndex);
  const scale = useScaleTransform(data);
  return {
    ...wrapper(StatusName[data.status], scale),
    ...zAxisStyle,
  };
};

export default useCalenderCellHover;
