import React, { Component } from "react";
import { Typography, Tag, Card, Skeleton } from "antd";
import { getData } from "../../scripts/getData";
import moment from "moment";

const CurrentWeek = props => {
  return (
    <Card
      size="small"
      title="Current week"
      // extra={<a href="#">See all</a>}
      className="landing-card animated fadeInUp delay-1s"
    >
      <div className="attendee-grid">
        {props.data.reverse().map(elem => {
          return (
            <div key={elem.date} className="half-pad">
              <div className="flex-col flex-centered calender">
                <Typography.Text>
                  {elem.date
                    .split(",")[0]
                    .slice(0, 3)
                    .toUpperCase()}
                </Typography.Text>
                <Typography.Title style={{ margin: "0" }} level={4}>
                  {moment(elem.date, "dddd, MMMM Do, YYYY").format("DD")}
                </Typography.Title>
              </div>
              <div className='mini-pad' />
              <Tag
                color={
                  elem.attendance_status === "Normal" ? "#41BC75" : "#BC414F"
                }
                style={{ width: "100%", textAlign: "center" }}
              >
                {elem.attendance_status}
              </Tag>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default CurrentWeek;
