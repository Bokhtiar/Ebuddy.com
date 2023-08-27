/** @format */

import { Select } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import styled from "styled-components";
import { StatusColor } from "../../@infrastructure/StatusColor";
import { Creators as Command } from "../../@state/reducers/common.reducer";
import {
  selectActivityStatuses,
  selectError,
  selectIsFetching,
} from "../../@state/selectors/common.selector";
const { Option } = Select;

const ActivityStatusDropdown = ({
  error,
  isFetching,
  activityStatuses,
  getActivityStatusesCommand,
  onChangeEvent,
  presetDisabled,
  presetValue,
}) => {
  useEffect(() => {
    if (!activityStatuses.length) {
      getActivityStatusesCommand();
    }
  }, []);

  const StyleWrapper = styled.div`
    .ant-select-selection {
      background-color: none !important;
      border: 0;
    }
  `;

  return (
    <StyleWrapper>
      <Select
        placeholder="Select Status"
        onChange={onChangeEvent}
        disabled={presetDisabled}
        style={{
          backgroundColor: StatusColor[presetValue],
          borderRadius: 5,
          fontWeight: "bold",
        }}
        value={presetValue}
        className="activity-status"
      >
        {activityStatuses.length &&
          activityStatuses.map((item) => (
            <Option
              style={{
                backgroundColor: StatusColor[item],
                color: "#fff",
                fontWeight: item === "Pending" ? "normal" : "bold",
              }}
              disabled={item === "Pending"}
              key={item}
              value={item}
            >
              {item}
            </Option>
          ))}
      </Select>
    </StyleWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  isFetching: selectIsFetching,
  error: selectError,
  activityStatuses: selectActivityStatuses,
});

const mapDispatchToProps = {
  getActivityStatusesCommand: Command.getActivityStatuses,
};

const enhanced = compose(connect(mapStateToProps, mapDispatchToProps));

export default enhanced(ActivityStatusDropdown);
