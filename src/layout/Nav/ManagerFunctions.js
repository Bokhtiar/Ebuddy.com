/** @format */

import { Button } from "antd";
import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { Creators as Command } from "../../@state/reducers/dashboard-report.reducer";
import { selectIsFetching } from "../../@state/selectors/dashboard-report.selector";

const ManagerFunctions = ({
  punchTime,
  profile,
  punchLoading,
  isCXO,
  punch,
  // enableMdDashboard,
  data,
  setData,
  isFetching,
  getUserListMdCtoOthersCommand,
}) => {
  return (
    <div className="P-BG flex_r">
      <div className="punch-time-wrapper">
        <div className="punch-time-group">
          <p className="g-label">First in</p>
          <p className="in-time">{punchTime?.entry}</p>
        </div>
        <div className="punch-time-group">
          <p className="g-label">Last out</p>
          <p className="out-time">{punchTime?.exit}</p>
        </div>
      </div>
      <Button.Group className="full-width half-pad">
        {profile?.punch_eligibility == 1 && !isCXO ? (
          <Button loading={punchLoading} onClick={punch} type="primary">
            Punch
          </Button>
        ) : null}

        {profile?.emp_id == 1006 && isCXO ? (
          <Button
            onClick={() => {
              setData({
                ...data,
                enableMdDashboard: !data.enableMdDashboard === true ? 1 : 0,
              });
              if (!data.enableMdDashboard) {
                getUserListMdCtoOthersCommand(1);
              } else {
                console.log({
                  "[data.enableMdDashboard]": data.enableMdDashboard,
                });
              }
            }}
            type="primary"
          >
            {data.enableMdDashboard ? "CXO" : "MD"}
          </Button>
        ) : null}
        <Button
          onClick={() => {
            window.open("http://hris.sslwireless.com/", "_blank");
          }}
          type="primary"
        >
          HRIS
        </Button>
      </Button.Group>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isFetching: selectIsFetching,
});

const mapDispatchToProps = {
  getUserListMdCtoOthersCommand: Command.getUserListMdCtoOthers,
};

const enhanced = compose(connect(mapStateToProps, mapDispatchToProps));

export default enhanced(ManagerFunctions);
