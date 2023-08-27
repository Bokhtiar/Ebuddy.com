import React from "react";
import { Result } from "antd";
import { alertPop } from "./message";
import * as Cookies from "js-cookie";

export const error404 = () => {
  return (
    <Result
      style={{ paddingTop: "8rem", width : '100%'}}
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
    />
  );
};

export const checkRes = param => {
  if (param === 200 || param === 201 || param === 212) {
    return true;
  } else if (param === 401) {
    Cookies.remove("token");
    window.location = "/";
  } else {
    return false;
  }
};

export const errorHandle = res => {
  if (res && (typeof res === "object")) {
    if(res.length > 0){
      res.map(elem => {
        alertPop("error", elem);
      });
    }
  } else {
    alertPop("error", "Check your internet connection!");
  }
};
