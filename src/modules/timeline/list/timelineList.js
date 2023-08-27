/** @format */

import React, { useContext, useEffect, useState } from "react";
import { Col, Empty, Row, Spin } from "antd";
import WeekTask from "./weekTask";
import ActivityList from "./ActivityList";
import { TodaySchedule } from "./TodaySchedule";
import { GET_DAILY_MEETINGS, WEEKLY_TASK_LIST } from "../../../scripts/api";
import { getData } from "../../../scripts/api-service";
import { ConversationTracks } from "../ConversationTracks/ConversationTracks";
import moment from "moment";
import { ToggleContext } from "../../../context/ToggleProvider";
import DashboardWeekTaskWiget from "../../dashboard/components/DashboardWeekTaskWiget";

export const TimelineList = () => {
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD"),
  );
  const [dailyMeetings, setDailyMeetings] = useState([]);
  const [weeklyTaskList, setWeeklyTaskList] = useState([]);
  const [weeksList, setWeekList] = useState([]);
  const [weekNumber, setWeekNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const { data, setData } = useContext(ToggleContext);

  useEffect(() => {
    const dateformat = "YYYY-MM-DD";

    function getWeekDaysByDate(date) {
      var date = date ? moment(date) : moment(),
        weeklength = 7,
        result = [];
      date = date.startOf("week");

      while (weeklength--) {
        result.push(date.format(dateformat));
        date.add(1, "day");
      }

      return result;
    }

    setWeekList(
      getWeekDaysByDate(moment().add(weekNumber, "d").format("YYYY-MM-DD")),
    );
  }, [weekNumber]);

  const getMeetings = async () => {
    // setLoading(true);
    const { data: dailyMeeting } = await getData(
      `${GET_DAILY_MEETINGS}?date=${selectedDate}&md_dashboard=${data.enableMdDashboard}`,
    );
    setDailyMeetings(dailyMeeting?.data);
    const { data: weeklyTasks } = await getData(
      `${WEEKLY_TASK_LIST}?md_dashboard=${data.enableMdDashboard}`,
    );

    const newWeeklyTasklist = dailyMeeting?.data.map((meeting) => {
      // dailyMeeting.data.find(task => task.emp_id === meeting.emp_id)
      const task =
        weeklyTasks === undefined
          ? null
          : weeklyTasks.data.find((task) => task.emp_id === meeting.emp_id);
      if (task) {
        return task;
      } else {
        return {
          done: 0,
          emp_id: 0,
          pending: 0,
          reviewed: 0,
          ["to-do"]: 0,
          wip: 0,
        };
      }
    });

    setWeeklyTaskList(newWeeklyTasklist);
    // setLoading(false);
  };

  const handelSelectDate = (date) => {
    setSelectedDate(date);
  };
  useEffect(() => {
    getMeetings();
  }, [selectedDate, data.enableMdDashboard]);

  return (
    <>
      {loading ? (
        <div className="activity__spinner">
          <Spin />
        </div>
      ) : (
        <Row className="pad" gutter={16}>
          <Col lg={15} md={12} xs={24}>
            <DashboardWeekTaskWiget />
            {/* <WeekTask
              handelSelectDate={handelSelectDate}
              selectedDate={selectedDate}
              weeksList={weeksList}
              weekNumber={weekNumber}
              setWeekNumber={setWeekNumber}
              mdDashboard={data.enableMdDashboard}
            ></WeekTask> */}
            {dailyMeetings?.length > 0 && weeklyTaskList?.length > 0 ? (
              <TodaySchedule
                selectedDate={selectedDate}
                dailyMeetings={dailyMeetings}
                weeklyTaskList={weeklyTaskList}
              />
            ) : (
              <div className="not__found">
                <Empty />
              </div>
            )}
          </Col>
          <Col lg={9} md={12} xs={24}>
            <ActivityList
              selectedDate={selectedDate}
              mdDashboard={data.enableMdDashboard}
            />
          </Col>

          <Col lg={24} md={12} xs={24}>
            <ConversationTracks mdDashboard={data.enableMdDashboard} />
          </Col>
        </Row>
      )}
    </>
  );
};
