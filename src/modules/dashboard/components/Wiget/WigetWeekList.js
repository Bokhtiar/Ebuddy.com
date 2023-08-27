/** @format */

import React from "react";
import {
  WigetTaskStatusListContextData,
  WigetWeekListContext,
} from "./wiget-context-api";
import WigetDayCard from "./WigetDayCard";
import { Tooltip } from "antd";
import moment from "moment";
import { Row, Col, Card, Icon, Button, Typography } from "antd";
const WigetWeekList = () => {
  return (
    <WigetWeekListContext.Consumer>
      {({
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
      }) => {
        // console.log({ WigetWeekListContext: weeksList });
        return weeksList?.map((day, idx) => {
          // console.log({ day });
          return (
            <Col key={"tast-" + idx}>
              <Tooltip
                title={
                  <div>
                    <p style={{ textAlign: "center" }}>
                      {getMonthAndYear(day)}
                    </p>
                  </div>
                }
              >
                <div
                  onClick={() => {
                    setSelectedDate(day);
                    getWeeklyTaskCountAction(`?md_dashboard=${mdDashboard}`);
                    getMeetingTracksAction(
                      `?date=${day}&md_dashboard=${mdDashboard}`,
                    );
                    getEmployeeScheduleWorkAction(
                      `?date=${day}&md_dashboard=${mdDashboard}`,
                    );
                  }}
                >
                  <WigetTaskStatusListContextData.Provider
                    value={{ activityCountAllUser, day }}
                  >
                    <WigetDayCard
                      feedbackEvent={() => {
                        setIsVisible(true);
                        setSelectedDate(day);
                      }}
                      getTaskListAction={getEmployeeTaskListAction}
                      isSelected={selectedDate === day}
                      date={moment(day).format("DD, ddd")}
                    />
                  </WigetTaskStatusListContextData.Provider>
                </div>
              </Tooltip>
            </Col>
          );
        });
      }}
    </WigetWeekListContext.Consumer>
  );
};

export default WigetWeekList;
