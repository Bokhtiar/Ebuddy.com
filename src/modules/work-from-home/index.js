import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Wrapper } from "../commons/Wrapper";
import Sidebar from "../commons/Sidebar";
import { work_from_home } from "../../scripts/routes";
import WorkStation from "./WorkStation";
import { getData } from "../../scripts/api-service";
import { ELIGIBILITY } from "../../scripts/api";
import { Skeleton, Result, Typography } from "antd";
import StartWork from "./StartWork";
import Approval from "./Approval";
import Subordinates from "./Subordinates";
import MyScreenShots from "./MyScreenShots";
import ScreenShots from "./ScreenShots";
import TeamAttn from "./TeamAttn";
import TeamLog from "./TeamLog";
import Cookies from 'js-cookie'
import PunchReport from "./PunchReport";
import workFromHome from "./workFromHome/index";
import { ErrorPage } from "../commons/ErrorPage";
import {getPermissions} from '../../scripts/helper';

const Warning = () => {
  return (
    <>
      <div className="big-space" />
      <div className="big-space" />
      <Result
        status="warning"
        title="You may not have permission to view this page"
      />
    </>
  );
};

let components = {
  approval: Approval,
  "not-found": WorkStation,
  "team-members": Subordinates,
  "team-screen-shots": ScreenShots,
  "team-time-logs": TeamLog,
  "team-attendance": TeamAttn,
  "punch-report": PunchReport,
  "work-from-home-permission": workFromHome,
};

const WorkFromHome = props => {
  const [workFromHome, setWorkFromHome] = useState(work_from_home());
  
  const permissionCheck = async() =>{
    let permissions = await getPermissions();
    if (permissions && permissions.length) {
        const permNames = permissions.map((item) => item.name);
        if (!permNames.includes('Can manage employee remote punch')) {
            let items = workFromHome.items.filter(item => item.key !== 'wfh');
            setWorkFromHome((prev) => ({
              ...prev,
              items: items
            }));
        }
    }
  }
  
  useEffect(() => {
    permissionCheck();
  }, []);

  return (
    <Wrapper no-pad className="flex_r">
      <Sidebar sidebar={workFromHome} />
      <Switch style={{ width: "100%" }}>
        <Route path="/work-from-home" component={Panel} exact />
        <Route path="/work-from-home/:name" component={Panel} exact />
        <Route path="/work-from-home/:name/:page" component={Panel} exact />
        <Route path="/work-from-home/:name/:page/:id" component={Panel} exact />
      </Switch>
    </Wrapper>
  );
};

const Panel = props => {
  const [eligibility, seEligibility] = useState();
  const [release_render_lock, setRelease_render_lock] = useState();
  const [show, setShow] = useState(true);

  const eligibilityCheck = async () => {
    let res = await getData(ELIGIBILITY);
    if (res && res.data?.data === null) {
      seEligibility("no-data");
    } else if (
      res.data?.data?.workstation_image_uploaded === 0 ||
      (res.data?.data?.workstation_image_uploaded === 1 &&
        res.data?.data?.status === "declined")
    ) {
      seEligibility("no-data");
    } else if (res && res.data?.data?.status === "approved") {
      seEligibility("approved"); //true
    } else {
      seEligibility("pending");
    }
    setRelease_render_lock(true);
  };

  // hide work-from-home-permission button
  const permissionCheck = async() =>{
    let permissions = await getPermissions();
    if (permissions && permissions.length) {
        const permNames = permissions.map((item) => item.name);
        if (!permNames.includes('Can manage employee remote punch')) {
            components['work-from-home-permission'] = ErrorPage;
            setShow(false);
        }
    }
  }
  
  useEffect(() => {
    permissionCheck();
  }, []);

  useEffect(() => {
    eligibilityCheck();
  }, [props]);

  if (eligibility === "approved") {
    components = {
      ...components,
      "start-work": StartWork,
      "screen-shots": MyScreenShots
    };
  }

  const Tag =
    props.match.params.name in components
      ? props.match.params.name === "team-members" &&
        props.match.params.page === "details"
        ? components["team-screen-shots"]
        : props.match.params.page === "logs"
        ? components["team-time-logs"]
        : components[props.match.params.name]
      : !props.match.params.name || props.match.params.name === "/"
      ? components["start-work"] || components["not-found"]
      : components["not-found"];

  return (
    <Wrapper no-pad>
      {release_render_lock ? (
        <Tag
          params={props.match.params}
          eligibility={eligibility}
          method={eligibilityCheck}
        />
      ) : (
        <Skeleton active className="pad" />
      )}
    </Wrapper>
  );
};

export default WorkFromHome;
