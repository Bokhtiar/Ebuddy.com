/** @format */

import React, { useEffect } from "react";
import {
  timeDifference,
  percentage,
  getColor,
  getFixedMinutes,
} from "../../timeline/list/TodaySchedule";
import { Tooltip } from "antd";
import { FetchStatus, Status } from "../../../@statics/Status";
import ReportMeetingModal from "./ReportMeetingModal";
import MeetingCellTooltip from "./MeetingCellTooltip";
import moment from "moment";
import { calculateTimeDifference } from "../../../@infrastructure/calculateTimeDifference";
import { scaleXTransformPerMinute } from "../../../@infrastructure/scaleXTransformByminute";

const MeetingCells = ({
  isFetching,
  user,
  hour,
  dataSource,
  color,
  meetingDetails,
  getDetailsAction,
  showModal,
}) => {
  // useEffect(()=>{
  //     if(m?)
  //     moment.duration(m.start_time, m.end_time);
  // },[])
  let lastEnd = 0;
  // eslint-disable-next-line array-callback-return
  const meeting = dataSource.find((m) => {
    const start = m.start_time.split(":")[0];
    const end = m.end_time.split(":")[0];

    const diff = calculateTimeDifference(m.start_time, m.end_time);
    // console.log({diff});
    const scl = scaleXTransformPerMinute(diff);
    // console.log({scl});
    const rightSideValue = m.start_time.split(":")[1].split(" ")[0];
    const diffarence = timeDifference(m.end_time, m.start_time);
    if (
      (start <= hour && end > hour && lastEnd !== end) ||
      (parseInt(start) === hour && parseInt(end) === hour)
    ) {
      lastEnd = end;
      m.diffarence = diffarence;
      m.rightSideValue =
        rightSideValue === "00" ? 0 : percentage(parseInt(rightSideValue));
      return m;
    }
  });
  return meeting ? (
    <>
      <div
        className="meeting__div"
        onClick={() => {
          getDetailsAction(meeting?.meeting_id);
          showModal(true);
        }}
        style={{
          width: `${getFixedMinutes(meeting.diffarence)}%`,
          left: `${meeting.rightSideValue}%`,
          backgroundColor: color ? color : getColor(meeting?.status),
          border: "3px solid #fff",
        }}
      >
        <MeetingCellTooltip meeting={meeting} />
      </div>
    </>
  ) : null;
};
export default MeetingCells;
