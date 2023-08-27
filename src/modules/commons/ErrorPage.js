import React from "react";
import { Result } from "antd";

export const ErrorPage = () => {
  return (
    <Result
      style={{ paddingTop: "8rem" }}
      status="404"
      title="404 Error"
      subTitle="Sorry, the page you visited does not exist."
    />
  );
};
