/** @format */

import { Tooltip } from "antd";
import React, { useState } from "react";
// import MeetingCellTooltip from './MeetingCellTooltip';
import { StatusName } from "../../../@infrastructure/Status";
import { StatusColor } from "../../../@infrastructure/StatusColor";
import { calculateTimeDifference } from "../../../@infrastructure/calculateTimeDifference";
import { scaleXTransformPerMinute } from "../../../@infrastructure/scaleXTransformByminute";
import CalendarCellContent from "./Calendar/CalendarCellContent";
import { CalendarStyleSheet } from "./Calendar/CalenderStyleSheet";

const SopCells = ({
  hour,
  dataSource,
  showModal,
  getDetailsAction
}) => {
  const {
    cellStyle: { wrapper, indication, content },
  } = CalendarStyleSheet;
  const dataCollection = dataSource?.filter((item) =>
    item.start_time && item.end_time ? item : null,
  );
  const [currentIndex, setCurrentIndex] = useState();
  const ZIndexModifier = (index) => {
    return {
      zIndex: index === currentIndex ? 10 : 2,
    };
  };
  const scale = (startTime, endTime) =>
    scaleXTransformPerMinute(calculateTimeDifference(startTime, endTime));
  return dataCollection && dataCollection.length
    ? dataCollection.map(
        (data, index) =>
          data &&
          data?.start_time.split(":")[0] == hour && (
            <div>
              <Tooltip
                title={
                  <CalendarCellContent
                    titleTxt={data.title}
                    startTime={data.start_time}
                    endTime={data.end_time}
                  />
                }
              >
                <div 
                  onTouchStart={(e) => setCurrentIndex(index)}
                  onMouseOver={(e) => setCurrentIndex(index)}
                  style={{ position: "absolute", top: 0, left: 0 }}
                >
                  <div
                    className={"calender-cell-hover"}
                    style={{
                      ...wrapper(
                        StatusName[data.status],
                        scale(data.start_time, data.end_time).parentScale,
                      ),
                      marginTop: `${index + 7}px`,
                      position: "aboslute",
                      ...ZIndexModifier(index),
                    }}
                    onClick={() => {
                      getDetailsAction(data?.id);
                      showModal(true);
                    }}
                  >
                    <div style={{ padding: "1px" }}>
                      <div
                        style={{
                          ...indication(
                            StatusName[data.status],
                            scale(data.start_time, data.end_time).childrenScale,
                          ),
                          background: StatusColor.SOP,
                        }}
                      ></div>
                    </div>
                    <div
                      style={content.wrapper(
                        StatusName[data.status],
                        scale(data.start_time, data.end_time).childrenScale,
                      )}
                    >
                      <CalendarCellContent
                        titleTxt={data.title}
                        startTime={data.start_time}
                        endTime={data.end_time}
                      />
                    </div>
                  </div>
                </div>
                <div style={{ paddingBottom: 15 }}></div>
              </Tooltip>
            </div>
          ),
      )
    : null;
};

export default SopCells;
