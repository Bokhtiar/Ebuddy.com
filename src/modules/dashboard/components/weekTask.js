/** @format */

import React, { useEffect, useState } from "react";
import moment from "moment";
import { Row, Col, Card, Icon, Button } from "antd";
import { getData } from "../../../scripts/api-service";
import { WEEKLY_USER_ACTIVITIES } from "../../../scripts/api";
import { activityColorSet } from "../../../scripts/helper";

export default function WeekTask({ handelSelectDate }) {
  const [weeksList, setWeekList] = useState([]);
  const [disabledButton, setDisabledButton] = useState();
  const [weekNumber, setWeekNumber] = useState(0);
  const [taskActivity, setTaskActivity] = useState();

  const checkDateContent = (date) => {
    var isafter = moment().isAfter(date);
    return isafter ? "blue" : "";
  };

  const getWeeklyTaskActivity = async () => {
    setDisabledButton(true);
    let res = await getData(
      WEEKLY_USER_ACTIVITIES +
        `?from_date=${weeksList[0]}&to_date=${weeksList[6]}`,
    );

    if (res) {
      let masterData = res?.data?.data;
      setDisabledButton(false);
      setTaskActivity(masterData);
    }
  };

  const showWeekTaskStatusContent = (date) => {
    if (taskActivity) {
      return taskActivity[date];
    }
  };

  useEffect(() => {
    const dateformat = "YYYY-MM-DD";
    function getWeekDaysByDate(date) {
      var date = date ? moment(date) : moment(),
        weeklength = 7,
        result = [];
      date = date.startOf("week");

      while (weeklength--) {
        result.push(date.format(dateformat));
        date.add(1, "day");
      }
      return result;
    }

    setWeekList(
      getWeekDaysByDate(moment().add(weekNumber, "d").format("YYYY-MM-DD")),
    );
  }, [weekNumber]);

  useEffect(() => {
    if (weeksList?.length) getWeeklyTaskActivity();
    console.log({ weeksList });
  }, [weeksList]);

  return (
    <div className="week-task">
      <Card className="landing-card animated fadeInUp">
        <Row gutter={16}>
          {weeksList.map((day, idx) => (
            <Col className="gutter-row" key={"tast-" + idx} span={3}>
              <div className="gutter-box" onClick={() => handelSelectDate(day)}>
                <p className="mb-1">{moment(day).format("ddd")}</p>
                <div className={`circle ${checkDateContent(day)}`}>
                  {moment(day).format("DD")}
                </div>

                {showWeekTaskStatusContent(day)?.length ? (
                  <div className="week-task-status-content">
                    {showWeekTaskStatusContent(day).map((task) => (
                      <div
                        className="task-code-content"
                        key={"task--" + task.id}
                        style={{ background: activityColorSet(task.status) }}
                      ></div>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </Col>
          ))}
          <Col className="gutter-row " span={3}>
            <div
              className="gutter-box arrow-handeler"
              style={{ display: "flex" }}
            >
              <Button
                disabled={disabledButton}
                type="link"
                block
                onClick={() => setWeekNumber(weekNumber - 7)}
                className="px-1"
              >
                <Icon type="left" style={{ fontSize: "1.5rem" }} />
              </Button>

              <Button
                type="link"
                block
                onClick={() => setWeekNumber(weekNumber + 7)}
                className="px-1"
                disabled={weekNumber >= 0 || disabledButton}
              >
                <Icon type="right" style={{ fontSize: "1.5rem" }} />
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
