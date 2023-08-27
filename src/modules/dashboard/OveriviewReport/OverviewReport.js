/**
 * eslint-disable no-unused-expressions
 *
 * @format
 */

/** @format */

import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { StatusColor } from "../../../@infrastructure/StatusColor";
import { Creators } from "../../../@state/reducers/dashboard-report.reducer";
import {
  selectActivityId,
  selectEmployeeScheduleWork,
  selectError,
  selectIsFetching,
  selectMeeting,
  selectMeetingTracks,
  selectSopDetails,
  selectUserListMdCTOOthers,
  selectWeeklyTaskCount,
} from "../../../@state/selectors/dashboard-report.selector";
import { FetchStatus, Status } from "../../../@statics/Status";
import "../../timeline/list/TodaySchedule";
import ActivityCells from "../components/ActivityCells";
import CalendarCell from "../components/Calendar/CalendarCell";
import ReportMeetingModal from "../components/ReportMeetingModal";
import SopCells from "../components/SopCells";
import SopDeatilsModal from "../components/SopDeatilsModal";
import EmployeeCell from "./EmployeeCell";
import OverviewReportActivityModal from "./OverviewReportActivityModal";
import ReportTableHeader from "./ReportTableHeader";


const OverviewReport = ({
  error,
  isFetching,
  weeklyTaskCount,
  meetingTracks,
  employeeScheduleWork,
  getMeetingTracksAction,
  getWeeklyTaskCountAction,
  getEmployeeScheduleWorkAction,
  getMeetingDetailsAction,
  meetingDetails,
  setActivityIdAction,
  activityId,
  userListMdCTOOthers,
  resetActivityIdAction,
  getEmployeeTaskListAction,
  getUserListMdCtoOthersAction,
  sopDetails,
  getSopDetailsAction
}) => {
  const [isActivityVisible, setActivityVisible] = useState(false);
  const [isMeetingVisible, setMeetingVisible] = useState(false);
  const [isSopVisible, setSopVisible] = useState(false);
  const today = moment().format("YYYY-MM-DD");
  const todayQueryString = `?date=${today}&md_dashboard=${0}`;

  useEffect(() => {
    // getEmployeeScheduleWorkAction(`${todayQueryString}`);
    const time = getMeetingTracksAction(`?date=${moment().format("YYYY-MM-DD")}`);
    
    getUserListMdCtoOthersAction("");
  }, []);
  useEffect(() => {
    if (Array.isArray(meetingTracks)) {
      getWeeklyTaskCountAction("");
    }
  }, []);

  // useEffect(() => {
  //   console.log({ meetingTracks });
  // }, [Array.isArray(meetingTracks)]);

  const hasSopHandler = (user) => {
    const data = Array.isArray(meetingTracks)
      ? meetingTracks?.find(({ emp_id }) => user.emp_id == emp_id)
      : [];
    if (
      // !data?.meetings?.length &&
      // !data?.schedule_activities?.length &&
      data?.sop_activities?.length ||
      data?.activities?.length
    ) {
      return true;
    } else {
      return false;
    }
  };

  
  return (
    <>
      <table style={{ overflowX: "hidden" }}>
        <ReportTableHeader />
        <tbody> 
          {Array.isArray(userListMdCTOOthers)
            ? userListMdCTOOthers?.map((data, index) => {
              console.log("home page", data);


                return (
                  <tr key={index} style={{ height: "90px" }}>
                    <td style={{ border: "none", position: "relative" }}>
                      <EmployeeCell
                        imgUrl={data?.profile_pic}
                        userName={data?.name}
                      />
                    </td>
                    {Array.from({ length: 10 }, (_, i) => i + 9).map((hour) => {
                      
                      return (
                        <td
                          style={{
                            position: "relative",
                            background: hasSopHandler(data)
                              ? StatusColor.Activities
                              : "transparent",
                          }}
                          key={`${data.name}-${hour}`}
                          className="meeting-cell"
                        >
                          <div>
                            {Array.isArray(meetingTracks) &&
                              meetingTracks.length && (
                                <>
                                  <CalendarCell
                                    hour={hour}
                                    isFetching={isFetching}
                                    dataSource={
                                      meetingTracks?.find(
                                        ({ emp_id }) => data.emp_id == emp_id,
                                      )?.meetings
                                    }
                                    getDetailsAction={getMeetingDetailsAction}
                                    showModal={setMeetingVisible}
                                  />
                                  <ActivityCells
                                    isFetching={isFetching}
                                    dataSource={
                                      meetingTracks.find(
                                        ({ emp_id }) => data.emp_id == emp_id,
                                      )?.schedule_activities
                                    }
                                    hour={hour}
                                    setActivityId={setActivityIdAction}
                                    showModal={setActivityVisible}
                                  />
                                  <SopCells
                                    hour={hour}
                                    isFetching={isFetching}
                                    dataSource={
                                      meetingTracks.find(
                                        ({ emp_id }) => data.emp_id == emp_id,
                                      )?.sop_activities
                                    }
                                    showModal={setSopVisible}
                                    getDetailsAction={getSopDetailsAction}
                                  />
                                </>
                              )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            : null}
        </tbody>
        {/* {employeeScheduleWork["isFetching"] === FetchStatus.SUCCESS &&
          meetingTracks["isFetching"] === FetchStatus.SUCCESS && (
            <>
              <tbody>
                {meetingTracks?.map((data, index) => {
                  return (
                    <tr key={index} style={{ height: "90px" }}>
                      <td style={{ border: "none" }}>
                        <EmployeeCell
                          imgUrl={data?.profile_pic}
                          userName={data?.name}
                        />
                      </td>
                      {Array.from({ length: 10 }, (_, i) => i + 9).map(
                        (hour) => {
                          // console.log('data?.meeting?.start_time', data?.meeting);
                          return (
                            <td
                              key={`${data.name}-${hour}`}
                              className="meeting-cell"
                            >
                              <>
                                <CalendarCell
                                  hour={hour}
                                  isFetching={isFetching}
                                  dataSource={data?.meeting}
                                  getDetailsAction={getMeetingDetailsAction}
                                  showModal={setMeetingVisible}
                                />
                                <ActivityCells
                                  isFetching={isFetching}
                                  dataSource={data?.activities}
                                  hour={hour}
                                  setActivityId={setActivityIdAction}
                                  showModal={setActivityVisible}
                                />
                              </>
                            </td>
                          );
                        },
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </>
          )} */}
      </table>

      {isFetching === FetchStatus.SUCCESS &&
        meetingDetails !== Status.INITIAL && (
          <>
            <ReportMeetingModal
              closeModal={() => setMeetingVisible(false)}
              isVisible={isMeetingVisible}
              meeting={meetingDetails}
            />
          </>
      )}
      {isActivityVisible && (
        <OverviewReportActivityModal
          closeModal={() => {
            setActivityVisible(false);
            resetActivityIdAction("");
          }}
          isVisible={isActivityVisible}
        />
      )}
      {isFetching === FetchStatus.SUCCESS &&
        sopDetails !== Status.INITIAL && (
          <>
            <SopDeatilsModal
              closeModal={() => setSopVisible(false)}
              isVisible={isSopVisible}
              sop={sopDetails}
            />
          </>
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  error: selectError,
  isFetching: selectIsFetching,
  weeklyTaskCount: selectWeeklyTaskCount,
  meetingTracks: selectMeetingTracks,
  employeeScheduleWork: selectEmployeeScheduleWork,
  meetingDetails: selectMeeting,
  activityId: selectActivityId,
  userListMdCTOOthers: selectUserListMdCTOOthers,
  sopDetails: selectSopDetails
});

const mapDispatchToProps = {
  getWeeklyTaskCountAction: Creators.getWeeklyTaskCount,
  getMeetingTracksAction: Creators.getMeetingTracks,
  getEmployeeScheduleWorkAction: Creators.getEmployeeScheduleWork,
  getMeetingDetailsAction: Creators.getMeetingDetails,
  setActivityIdAction: Creators.setActivityId,
  resetActivityIdAction: Creators.resetActivityId,
  getEmployeeTaskListAction: Creators.getEmployeeTaskList,
  getUserListMdCtoOthersAction: Creators.getUserListMdCtoOthers,
  getSopDetailsAction: Creators.getSopDetails
};

const enhanced = compose(connect(mapStateToProps, mapDispatchToProps));

export default enhanced(OverviewReport);
