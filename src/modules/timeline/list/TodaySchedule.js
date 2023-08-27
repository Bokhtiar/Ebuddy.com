/** @format */

import React from "react";
import "./TodaySchedule.css";
import { Tooltip } from "antd";
import DashboardOverviewReportLayout from "../../dashboard/DashboardOverviewReportLayout";
export const timeDifference = (lastTime, firstTime) => {
  const lastTimeSplit = lastTime.split(":");
  const firstTimeSplit = firstTime.split(":");

  const lastTimeHour = parseInt(lastTimeSplit[0]);
  const lastTimeMinute = parseInt(lastTimeSplit[1]);
  const firstTimeHour = parseInt(firstTimeSplit[0]);
  const firstTimeMinute = parseInt(firstTimeSplit[1]);

  const hourDifference = lastTimeHour - firstTimeHour;
  const minuteDifference = lastTimeMinute - firstTimeMinute;

  const totalMinutes = hourDifference * 60 + minuteDifference;

  return totalMinutes;
};
export const percentage = (value) => {
  return (value / 60) * 100;
};

export const getFixedMinutes = (value) => {
  if (value === 600) return 100 * 11;
  else if (value === 540) return 100 * 9;
  else if (value === 480) return 100 * 8;
  else if (value === 420) return 100 * 7;
  else if (value === 360) return 100 * 6 + 3;
  else if (value === 300) return 100 * 5 + 2;
  else if (value === 240) return 100 * 4;
  else if (value === 180) return 100 * 2;
  else if (value === 120) return 201;
  else if (value >= 50 && value <= 60) return 100;
  else return value * 2 - 5;
};

export const colorList = [
  "#6957DE",
  "#41BC75",
  "#9B9B9B",
  "#F32E2E",
  "#0072FF",
];

export const getColor = (value) => {
  if (value === "Pending") return colorList[0];
  else if (value === "Complete") return colorList[1];
  else if (value === "Draft") return colorList[2];
  else if (value === "Cancel") return colorList[3];
  else return colorList[0];
};
export const TodaySchedule = ({
  dailyMeetings,
  weeklyTaskList,
  mdDashboard,
}) => {
  return <DashboardOverviewReportLayout />;
};
