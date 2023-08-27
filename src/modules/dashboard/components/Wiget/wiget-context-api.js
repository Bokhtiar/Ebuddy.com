/** @format */

import { createContext } from "react";

export const WigetHeaderContext = createContext({
  data: {},
  eventEmitters: {},
});

export const WigetTaskStatusListContextData = createContext({});

export const WigetTaskStatusListContext = createContext({
  taskStatusList: (activityCountAllUser, day) => {
    const currentDay = activityCountAllUser?.find((item) => item.date == day);
    return [
      {
        status: "TODO",
        count: currentDay ? currentDay["to-do"] : 0,
      },
      {
        status: "DUE",
        count: currentDay ? currentDay["pending"] : 0,
      },
      {
        status: "DONE",
        count: currentDay ? currentDay["done"] : 0,
      },
    ];
  },
});

export const TaskListModalOfDayContext = createContext({});

export const WigetWeekListContext = createContext({});
