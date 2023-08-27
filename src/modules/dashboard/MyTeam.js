import React, { Component } from "react";
import { Card, Typography, Skeleton, Avatar, Tooltip } from "antd";
import { getData } from "../../scripts/getData";
import dummy from "../../assets/dummy.jpg";
import { _slice_ } from "../../scripts/slice";

const MyTeam = props => {
  return (
    <Card
      size="small"
      title={`My team (${props.data.length})`}
      className="landing-card animated fadeInUp delay-2s"
    >
      <div className="attendee-grid">
        {props.data.map(elem => {
          return (
            <div key={elem.id} className="pad">
              <Tooltip className='flex-col flex-centered' placement="top" title={elem.name}>
                <Avatar src={elem.profile_pic || dummy} size={56} />
                <Typography.Text>{_slice_(elem.name, 6)}</Typography.Text>
              </Tooltip>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default MyTeam;
