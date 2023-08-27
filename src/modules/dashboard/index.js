import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Row, Col, Card, Typography, Button, Input, Form, Divider } from "antd";
import { Wrapper } from "../commons/Wrapper";
import LeaveStatus from "./LeaveStatus";
import CurrentWeek from "./CurrentWeek";
import MyTeam from "./MyTeam";
import Notifications from "./Notifications";
import TeamStatus from "./TeamStatus";
import { getData } from "../../scripts/api-service";
import Covid19 from "./Covid19";
import {
  ALL_NOTIFICATIONS,
  WEEKLY_ATTENDANCE,
  LEAVE_BALANCE,
  TEAM_STATUS,
  MY_TEAM,
  MY_TASK_LIST,
  TEAM_DIGITAL_ATTENDANCE
} from "../../scripts/api";
import WeekTask from "./components/weekTask";
import DailyTaskList from "./components/DailyTaskList";
import AttendenceCurrentWeek from "./components/CurrentWeek";
import LeaveStatusAll from "./components/LeaveStatus";
import MyTeamList from "./components/MyTeam";
import moment from "moment";
import { getPermissions } from "../../scripts/helper";
import { TimelineList } from "../timeline/list/timelineList";
import DashboardOverviewReportLayout from "./DashboardOverviewReportLayout";

const Landing = props => {
  const [notifications, setNotifications] = useState();
  const [weekly, setWeekly] = useState();
  const [leave_status, setLeaveStatus] = useState();
  const [team_status, setTeamStatus] = useState();
  const [my_team, setMyTeam] = useState();
  const [myTeamAttendance, setMyTeamAttendance] = useState();
  const [my_task_list, setMyTaskList] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [isPermission, setIsPermission] = useState(true);

  const get = async (api, method) => {
    let res = await getData(api);
    if (res && res.data?.data) {
      method(res.data?.data);
    }
  };

  const handelSelectDate = (date) => {
    setSelectedDate(date)
  }

  useEffect(() => {
    permissionData();
  }, [])

  const permissionData = async () => {
    const response = await getPermissions();
    const checkIsPermisson = response?.find(permission => permission?.name === "CXO Dashboard" || permission?.name === "Managing Director");
    if (checkIsPermisson?.name) {
      setIsPermission(true)
    } else {
      setIsPermission(false)
    }
  }

  useEffect(() => {
    get(`${MY_TASK_LIST}?single_date=${selectedDate ? selectedDate : moment().format("YYYY-MM-DD")}`, setMyTaskList);
  }, [selectedDate])

  useEffect(() => {
    // get(ALL_NOTIFICATIONS, setNotifications);


    get(TEAM_STATUS, setTeamStatus);
    get(MY_TEAM, setMyTeam);
    if (!isPermission) {
      get(TEAM_DIGITAL_ATTENDANCE, setMyTeamAttendance);
      get(WEEKLY_ATTENDANCE, setWeekly);
      get(LEAVE_BALANCE, setLeaveStatus);
    }
  }, [isPermission]);



  console.log('LIne 83', isPermission)

  return (
    <Wrapper>
      
      <Row className="pad" gutter={16}>
        {/* <Col lg={8} md={8} xs={24}>
          {leave_status ? <LeaveStatus data={leave_status} /> : ""}
          {weekly ? <CurrentWeek data={weekly} /> : ""}
        </Col>
        <Col lg={8} md={8} xs={24}>
          {my_team ? <MyTeam data={my_team} /> : ""}
        </Col>
        <Col lg={8} md={8} xs={24}>
          {notifications ? <Notifications data={notifications} /> : ""}
          <Covid19 />
        </Col> */}
        {
          isPermission ? <TimelineList /> : <>
            <Col lg={12} md={12} xs={24}>
              <WeekTask handelSelectDate={handelSelectDate}></WeekTask>
              {my_task_list ? <DailyTaskList data={my_task_list} selectedDate={selectedDate}></DailyTaskList> : ''}

            </Col>
            <Col lg={12} md={12} xs={24}>
              {weekly ? <AttendenceCurrentWeek data={weekly}></AttendenceCurrentWeek> : null}
              {leave_status ? <LeaveStatusAll data={leave_status}></LeaveStatusAll> : null}
              {my_team?.length > 0 ? <MyTeamList data={my_team} attendance={myTeamAttendance}></MyTeamList> : null}
            </Col>
          </>
        }
      </Row>
    </Wrapper>
  );
};

export default Landing;
