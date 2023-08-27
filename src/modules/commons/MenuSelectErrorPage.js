import React from "react";
import { Result } from "antd";

export const MenuSelectErrorPage = () => {
  return (
    <Result
      style={{ paddingTop: "8rem" }}
      status="405"
      title="405 Error"
      subTitle="Please select a menu to view page."
    />
  );
};
