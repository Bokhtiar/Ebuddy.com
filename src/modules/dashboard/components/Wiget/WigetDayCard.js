/** @format */

import React from "react";
import {
  ActionStateBg,
  ActionStateColor,
  StatusColor,
} from "../../../../@infrastructure/StatusColor";
import {
  ActionStateName,
  StatusName,
} from "../../../../@infrastructure/Status";
import { Status } from "../../../../@statics/Status";
import {
  WigetTaskStatusListContext,
  WigetTaskStatusListContextData,
} from "./wiget-context-api";

const WigetDayCard = ({
  statusList,
  date,
  isSelected,
  getTaskListAction,
  feedbackEvent,
}) => {
  return (
    <div style={hostStyle()}>
      <div
        style={dayLabelStyle(
          isSelected ? ActionStateName.SELECTED : ActionStateName.INITIAL,
        )}
      >
        {date}
      </div>
      <div style={badgeStyles().wrapper}>
        <WigetTaskStatusListContextData.Consumer>
          {({ activityCountAllUser, day }) => (
            <WigetTaskStatusListContext.Consumer>
              {({ taskStatusList }) =>
                taskStatusList(activityCountAllUser, day)?.map(
                  ({ status, count }, index) => {
                    return (
                      <span
                        onClick={() => {
                          getTaskListAction(day);
                          feedbackEvent();
                        }}
                        key={index.toString()}
                        style={badgeStyles(status).item}
                      >
                        {count}
                      </span>
                    );
                  },
                )
              }
            </WigetTaskStatusListContext.Consumer>
          )}
        </WigetTaskStatusListContextData.Consumer>
      </div>
    </div>
  );
};

const dayLabelStyle = (currentState = ActionStateName.INITIAL) => ({
  background: ActionStateBg[currentState],
  padding: "4px 0px",
  borderRadius: "0.3rem",
  fontSize: "80%",
  fontWeight: "bold",
  textAlign: "center",
  color: ActionStateColor[currentState],
});

const hostStyle = (status = "DEFAULT") => ({
  width: "100%",
  padding: "0.5rem",
  background: "#fff",
  borderRadius: "0.5rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  boxShadow: "0px 0px 2px 1px rgb(221, 221, 221)",
});

const badgeStyles = (status = "DEFAULT") => ({
  wrapper: {
    display: "flex",
    fontSize: "80%",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#fff",
    fontWeight: 500,
    columnGap: "3%",
  },
  item: {
    background: StatusColor[status],
    width: "1.5rem",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: "0.2rem",
  },
});

export default WigetDayCard;
