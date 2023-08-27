/** @format */

import React from "react";
import { StatusColor } from "../../../../@infrastructure/StatusColor";
import { StatusLabel } from "../../../../@infrastructure/StatusLabel";

const StatusBarItem = ({ status }) => {
  return (
    <div style={styles().wrapper}>
      <span style={styles(status).badged}></span>
      <span>{StatusLabel[status]}</span>
    </div> 
  );
};
const styles = (status = "DEFAULT") => ({
  wrapper: {
    display: "flex",
    gap: "5px",
    alignItems: "center",
    paddingBottom: "1rem",
  },
  badged: {
    width: "1rem",
    height: "1rem",
    display: "flex",
    borderRadius: "3px",
    backgroundColor: StatusColor[status],
  },
});
export default StatusBarItem;
