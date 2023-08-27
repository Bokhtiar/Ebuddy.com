import React, { useState, useEffect } from "react";
import "./locator.scss";
import GoogleMapReact from "google-map-react";
import { Typography, Input, Button, Avatar, Skeleton, Empty, Tag } from "antd";
import { getData } from "../../scripts/api-service";
import { TEAM_LOCATION } from "../../scripts/api";
import { secret } from "../../scripts/secrets";
import { Wrapper } from "../commons/Wrapper";
import Sidebar from "../commons/Sidebar";
import Cookies from "js-cookie";

const NOT_FOUND = "Not found";

const LocateTeam = (props) => {
  const [center, setCenter] = useState({ lat: 23.7465, lng: 90.3977 });
  const [team, setTeam] = useState();
  const [temp, setTemp] = useState();
  const [showDetails, setShowDetails] = useState();
  const getMembers = async () => {
    let res = await getData(TEAM_LOCATION);
    if (res?.data?.data) {
      setTeam(res.data.data);
      setTemp(res.data.data);
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <Wrapper className="locator-wrapper flex-row">
      <Sidebar custom>
        <div>
          <div className="pad">
            <Typography.Title level={4}>Location tracking</Typography.Title>
            <Typography.Text className="sub-title gray-text" strong>
              Team members list ({team ? team.length : 0})
            </Typography.Text>
            <div className="pad" />
            <Input.Search
              onChange={(e) => {
                setTemp(
                  team.filter((elem) => {
                    return elem.user?.name
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase());
                  })
                );
              }}
              placeholder="Search by name"
            />
          </div>
          <div className="pad" />
          <div className="members-wrapper">
            {temp ? (
              temp.map((elem) => {
                return (
                  <div
                    key={elem.id}
                    onClick={() => {
                      setCenter();
                      setShowDetails(elem.id);
                      setCenter({
                        lat: parseFloat(elem.lat_long.split(",")[0]),
                        lng: parseFloat(elem.lat_long.split(",")[1]),
                      });
                    }}
                    className={`flex-row flex-row-start pad ${
                      `${center.lat},${center.lng}` === elem.lat_long
                        ? "selected-member"
                        : ""
                    }`}
                  >
                    <Avatar src={elem.user?.profile_pic} />
                    <Typography.Text className="left-pad" strong>
                      {elem.user?.name}
                    </Typography.Text>
                  </div>
                );
              })
            ) : (
              <Empty />
            )}
          </div>
        </div>
      </Sidebar>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: secret.googleMapsApiKey,
        }}
        defaultCenter={center}
        center={center}
        onChange={(e) => {
          Cookies.set("zoomLevel", e.zoom);
        }}
        defaultZoom={
          Cookies.get("zoomLevel") ? parseInt(Cookies.get("zoomLevel")) : 8
        }
        distanceToMouse={() => {}}
      >
        {team ? (
          team.map((elem) => {
            return (
              <div
                key={elem.id}
                id={elem.id}
                lat={parseFloat(elem.lat_long.split(",")[0])}
                lng={parseFloat(elem.lat_long.split(",")[1])}
              >
                <div className="map-marker-wrapper">
                  <Avatar
                    onMouseEnter={() => setShowDetails(elem.id)}
                    size="large"
                    src={elem.user?.profile_pic}
                  />
                  <div
                    onMouseLeave={() => setShowDetails()}
                    className={`marker-content ${
                      showDetails === elem.id ? "marker-content-show" : ""
                    }`}
                  >
                    <div className="half-pad" />
                    <Typography.Text ellipsis className="sub-title" strong>
                      {elem.user?.name}
                    </Typography.Text>
                    <div>
                      <Typography.Text ellipsis className="sub-title gray-text">
                        {elem.user?.designation}
                      </Typography.Text>
                    </div>
                    <Typography.Text ellipsis className="sub-title gray-text">
                      {`Employee ID : ${elem.emp_id || "-"}`}
                    </Typography.Text>
                    <div className="top-bod" />
                    <div className='mini-pad' />
                    <Typography.Text ellipsis className="sub-title gray-text">
                      {`First in `}
                      <Typography.Text strong>
                        {elem.user?.punch_report
                          ? elem.user.punch_report.first_in_time
                          : NOT_FOUND}
                      </Typography.Text>
                    </Typography.Text>
                    <Typography.Text
                      ellipsis
                      className="sub-title gray-text left-pad"
                    >
                      {`Last out `}
                      <Typography.Text strong>
                        {elem.user?.punch_report
                          ? elem.user.punch_report.last_out_time
                          : NOT_FOUND}
                      </Typography.Text>
                    </Typography.Text>
                    <div>
                      <Typography.Text ellipsis className="sub-title gray-text">
                        {`Last location updated: ${elem.updated_at || "-"}`}
                      </Typography.Text>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <Skeleton active className="pad" />
        )}
      </GoogleMapReact>
    </Wrapper>
  );
};

export default LocateTeam;
