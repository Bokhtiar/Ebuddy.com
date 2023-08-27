/** @format */

import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Empty, Spin } from "antd";
import { Row, Col, Card, Icon, Button, Typography } from "antd";
import { createStructuredSelector } from "reselect";
import { Creators } from "../../../@state/reducers/dashboard-report.reducer";
import { getWeekDaysByDate } from "../helper-functions";
import { compose } from "redux";
import { connect } from "react-redux";
import { Tooltip } from "antd";
import WigetDayCard from "./Wiget/WigetDayCard";
import { TASK_STATUS } from "../mocks/task-status.mock";
import TaskListModalOfDay from "../OveriviewReport/TaskListModalOfDay";
import { selectActivityCountAllUser } from "../../../@state/selectors/dashboard-report.selector";
import { Status } from "../../../@statics/Status";
import TaskStatus from "../../../@infrastructure/TaskStatus";
import {
  TaskListModalOfDayContext,
  WigetHeaderContext,
  WigetTaskStatusListContext,
  WigetTaskStatusListContextData,
  WigetWeekListContext,
} from "./Wiget/wiget-context-api";
import WigetHeader from "./Wiget/WigetHeader";
import WigetWeekList from "./Wiget/WigetWeekList";

const { Title } = Typography;

const getMonthAndYear = (date) => {
  return moment(date).format("MMM, YYYY");
};
const DashboardWeekTaskWiget = ({
  activityCountAllUser,
  getWeeklyUserActivitiesAction,
  getWeeklyTaskCountAction,
  getMeetingTracksAction,
  getEmployeeScheduleWorkAction,
  getEmployeeTaskListAction,
  getActivityCountAllUserAction,
}) => {
  // const [selectedDate, setSelectedDate] = useState(
  //     moment().format("YYYY-MM-DD")
  // );
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD"),
  );
  const [headerTitle, setHeaderTitle] = useState(moment().format("YYYY-MM-DD"));
  const [weekNumber, setWeekNumber] = useState(0);
  const [mdDashboard, setMdDashboard] = useState(0);
  const weeksList = getWeekDaysByDate(
    moment().add(weekNumber, "d").format("YYYY-MM-DD"),
  );
  useEffect(() => {
    getActivityCountAllUserAction(weeksList[0], weeksList[6]);
    setHeaderTitle(getMonthAndYear(weeksList[0]));

    // console.log({ weeksList, weekNumber });
    // console.log({ activityCountAllUser });
  }, [weekNumber]);

  useEffect(() => {
    getActivityCountAllUserAction(weeksList[0], weeksList[6]);
    setHeaderTitle(getMonthAndYear(weeksList[0]));
    // getEmployeeScheduleWorkAction(
    //   `?date=${moment().format("YYYY-MM-DD")}&md_dashboard=${0}`,
    // );
    // // console.log({ weeksList });
    // // console.log({ activityCountAllUser });
    // // console.log({ selectedDate });
  }, []);

  return (
    Array.isArray(activityCountAllUser) && (
      <>
        <div>
          <Card
            size="small"
            title={
              <WigetHeaderContext.Provider
                value={{
                  data: { headerTitle, weekNumber },
                  eventEmitters: { setWeekNumber },
                }}
              >
                <WigetHeader />
              </WigetHeaderContext.Provider>
            }
            className="animated fadeInUp"
            style={{ padding: 0 }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                columnGap: "0.5px",
                overflowX: "scroll",
                padding: "0.5rem",
              }}
            >
              <WigetWeekListContext.Provider
                value={{
                  activityCountAllUser,
                  getEmployeeTaskListAction,
                  weeksList,
                  getMonthAndYear,
                  selectedDate,
                  setSelectedDate,
                  getWeeklyTaskCountAction,
                  getMeetingTracksAction,
                  getEmployeeScheduleWorkAction,
                  mdDashboard,
                  setIsVisible,
                }}
              >
                <WigetWeekList />
              </WigetWeekListContext.Provider>
            </div>
          </Card>
        </div>
        <TaskListModalOfDayContext.Provider
          value={{ selectedDate, isVisible, setIsVisible }}
        >
          <TaskListModalOfDay />
        </TaskListModalOfDayContext.Provider>
      </>
    )
  );
};

const mapStateToProps = createStructuredSelector({
  activityCountAllUser: selectActivityCountAllUser,
});

const actions = {
  getWeeklyTaskCountAction: Creators.getWeeklyTaskCount,
  getMeetingTracksAction: Creators.getMeetingTracks,
  getWeeklyUserActivitiesAction: Creators.getWeeklyUserActivities,
  getEmployeeScheduleWorkAction: Creators.getEmployeeScheduleWork,
  getEmployeeTaskListAction: Creators.getEmployeeTaskList,
  getActivityCountAllUserAction: Creators.getActivityCountAllUser,
};
const enhanced = compose(connect(mapStateToProps, actions));
export default enhanced(DashboardWeekTaskWiget);
