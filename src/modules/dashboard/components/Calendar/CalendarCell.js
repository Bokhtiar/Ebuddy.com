/** @format */

import { Tooltip } from "antd";
import React, { useState } from "react";
import { StatusName } from "../../../../@infrastructure/Status";
import { StatusColor } from "../../../../@infrastructure/StatusColor";
import { calculateTimeDifference } from "../../../../@infrastructure/calculateTimeDifference";
import { scaleXTransformPerMinute } from "../../../../@infrastructure/scaleXTransformByminute";
import CalendarCellContent from "./CalendarCellContent";
import { CalendarStyleSheet } from "./CalenderStyleSheet";

const CalendarCell = ({ dataSource, getDetailsAction, hour, showModal }) => {
  const {
    cellStyle: { wrapper, indication, content },
  } = CalendarStyleSheet;

  const dataCollection = dataSource?.filter((item) =>
    item.start_time && item.end_time ? item : null
  );
  const [currentIndex, setCurrentIndex] = useState();
  const [mnt, setMnt] = useState();

  const scale = (startTime, endTime) =>
    scaleXTransformPerMinute(calculateTimeDifference(startTime, endTime));

  const ZIndexModifier = (index) => {
    return {
      zIndex: index === currentIndex ? 10 : 2,
    };
  };
  return dataCollection && dataCollection.length
    ? dataCollection.map(
        (data, index) =>
          data &&
          data?.start_time.split(":")[0] == hour && (
            
            <>
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
                    // style={{
                    //   ...wrapper(
                    //     StatusName[data.status],
                    //     scale(data.start_time, data.end_time).parentScale
                    //   ),
                    //   marginTop: `${index + 9}px`,
                    //   ...ZIndexModifier(index),
                    // }}
                  
                    style={{
                      ...wrapper(
                        StatusName[data.status],
                        scale(data.start_time, data.end_time).parentScale
                      ),
                      marginTop: `${index + 9}px`,
                      ...ZIndexModifier(index),

                      transform: `translateX(${data.start_time}px)`,
                    }}
                    onClick={() => {
                      getDetailsAction(data?.meeting_id);
                      showModal(true);
                    }}
                    // rgb(250, 227, 12)
                  >
                    <div style={{ padding: "1px" }}>
                      <div
                        style={{
                          ...indication(
                            StatusName[data.status],
                            scale(data.start_time, data.end_time).childrenScale
                          ),
                          background: StatusColor.MEETING,
                        }}
                      ></div>
                    </div>
                    <div
                      style={content.wrapper(
                        StatusName[data.status],
                        scale(data.start_time, data.end_time).childrenScale
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
              </Tooltip>
            </>
          )
      )
    : null;
};

export default CalendarCell;
