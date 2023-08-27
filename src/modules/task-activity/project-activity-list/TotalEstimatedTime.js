/** @format */

import React from "react";
import { StatusColor } from "../../../@infrastructure/StatusColor";

const TotalEstimatedTime = ({ totalEstimatedTime }) => {
  return (
    totalEstimatedTime && (
      <span
        style={{
          background: StatusColor.TODO,
          marginLeft: 15,
          padding: "5px",
          color: "#fff",
          borderRadius: "3px",
        }}
      >
        {totalEstimatedTime
          ? `${Math.floor(totalEstimatedTime / 60)} hr ${Math.floor(
              (totalEstimatedTime / 60 - Math.floor(totalEstimatedTime / 60)) *
                60,
            )} min`
          : null}
      </span>
    )
  );
};

export default TotalEstimatedTime;
