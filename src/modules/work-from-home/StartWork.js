import React, { useState, useEffect } from "react";
import { Wrapper } from "../commons/Wrapper";
import { Row, Col, Typography, Button, Avatar, Tag } from "antd";
import moment from "moment";
import dummy from "../../assets/dummy.jpg";
import { getData } from "../../scripts/api-service";
import { LOGGED_TIME } from "../../scripts/api";
import { alertPop } from "../../scripts/message";

const NOT_FOUND = "Not found";

const StartWork = props => {
  const [all_data, setAllData] = useState();

  const view = async () => {
    let res = await getData(LOGGED_TIME);
    if (res.data?.data?.logs_web) {
      setAllData(res.data?.data);
    }
  };

  useEffect(() => {
    view();
  }, []);

  return (
    <Wrapper>
      <Row className="pad">
        <Col span={12}>
          <Typography.Text strong>
            {moment().format("MMMM DD, YYYY")}
          </Typography.Text>
          <div>
            <Typography.Text>{moment().format("dddd")}</Typography.Text>
          </div>
        </Col>
        <Col className="right-text" span={12}>
          <Button
            disabled
            onClick={() => {
              //todo
              alert("What?");
            }}
            type="outline"
          >
            Stop
          </Button>
          <Button
            disabled
            onClick={() => {
              //todo
              alertPop("What?");
            }}
            style={{ marginLeft: "1rem" }}
            type="primary"
          >
            Start
          </Button>
        </Col>
      </Row>
      <div className="bottom-bod" />
      <Row className="bottom-bod">
        <Col className="side-bod" span={12}>
          <div className="centered pad">
            <Typography.Text>Working time</Typography.Text>
            <Typography.Text className="left-pad" strong>
              {all_data
                ? all_data.total_logged_time > 60
                  ? `${Math.floor(
                      all_data.total_logged_time / 60
                    )} Hours & ${Math.floor(
                      all_data.total_logged_time % 60
                    )} Minutes`
                  : `${all_data.total_logged_time} minutes`
                : "---"}
            </Typography.Text>
          </div>
        </Col>
        <Col className="side-bod" span={12}>
          <div className="centered pad">
            <Typography.Text>Idle time</Typography.Text>
            <Typography.Text className="left-pad" strong>
              {" "}
              ---{" "}
            </Typography.Text>
          </div>
        </Col>
      </Row>
      <Row className="P-BG">
        <Col span={12} className="side-bod">
          <div className="flex_r pad">
            <Typography.Text className="full-width">
              Total working time
            </Typography.Text>
            <div className="full-width right-text">
              <Typography.Text strong>
                {all_data
                  ? all_data.total_logged_time > 60
                    ? `${Math.floor(
                        all_data.total_logged_time / 60
                      )} Hours & ${Math.floor(
                        all_data.total_logged_time % 60
                      )} Minutes`
                    : `${all_data.total_logged_time} minutes`
                  : "---"}
              </Typography.Text>
            </div>
          </div>
          <div className="time-history-list">
            {all_data?.logs_web && all_data?.logs_web.length > 0
              ? all_data.logs_web.map(elem => {
                  return (
                    <div className="side-pad">
                      <div className="flex_r">
                        <div className="full-width">
                          <Typography.Text>Working time</Typography.Text>
                        </div>
                        <div className="full-width right-text">
                          <Typography.Text strong>
                            {elem.logged_time
                              ? elem.logged_time > 60
                                ? `${Math.floor(
                                    elem.logged_time / 60
                                  )} Hours & ${Math.floor(
                                    elem.logged_time % 60
                                  )} Minutes`
                                : `${elem.logged_time} minutes`
                              : NOT_FOUND}
                          </Typography.Text>
                        </div>
                      </div>
                      <Typography.Text className="FIX_th">
                        {`${elem.started_at || NOT_FOUND} - ${elem.ended_at ||
                          NOT_FOUND}`}
                      </Typography.Text>
                      <div className="mini-pad" />
                    </div>
                  );
                })
              : ""}
          </div>
        </Col>
        <Col span={12} className="side-bod">
          <div className="flex_r pad">
            <Typography.Text className="full-width">
              Total idle time
            </Typography.Text>
            <div className="full-width right-text">
              <Typography.Text strong>---</Typography.Text>
            </div>
          </div>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default StartWork;
