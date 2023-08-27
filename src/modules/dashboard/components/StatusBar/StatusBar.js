/** @format */

import React from "react";
import StatusBarItem from "./StatusBarItem";

const StatusBar = () => {
  const { wrapper } = styles;
  return (
    <div style={wrapper}>
      <StatusBarItem status={"TODO"} />
      <StatusBarItem status={"WIP"} />
      <StatusBarItem status={"HOLD"} />
      <StatusBarItem status={"DONE"} />
      <StatusBarItem status={"DUE"} />
      <StatusBarItem status={"BEHIND"} />
    </div>
  );
};

const styles = {
  wrapper: { display: "flex", gap: "1rem" },
};

export default StatusBar;
