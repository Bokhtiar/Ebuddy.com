/** @format */

import React, { Component, useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  Row,
  Col,
  Button,
  Typography,
  Badge,
  Avatar,
  Popover,
  Icon,
} from "antd";
// import ChangePassword from '../ChangePassword';
import { useNotification } from "../../scripts/helper";
import logo from "../../assets/ssl_logo.svg";
import dummy from "../../assets/dummy.jpg";
import { getData, postData } from "../../scripts/api-service";
import cookies from "js-cookie";
import {
  ME,
  DIGITAL_ATTENDANCE,
  LAST_ENTRY_TIME,
  NOTIFICATIONS_LIST_UNREAD,
  MARK_SINGLE_NOTIFICATION,
} from "../../scripts/api";
import { alertPop } from "../../scripts/message";
import "./nav.scss";
import { mobileAndTabletCheck, getPermissions } from "../../scripts/helper";
import moment from "moment";
import { ToggleContext } from "../../context/ToggleProvider";
import ManagerFunctions from "./ManagerFunctions";

const Nav = () => {
  const { data, setData } = useContext(ToggleContext);
  const { unreadNotificationList } = useSelector(
    (state) => ({
      unreadNotificationList: state.notification.notificationData,
    }),
    shallowEqual,
  );

  const viewWidth = window.innerWidth;
  const profile = JSON.parse(cookies.get("profile") || "");
  const [punchTime, setPunchTime] = useState();
  const [punchLoading, setPunchLoading] = useState();
  const [location, setLocation] = useState({ lat: 1, lng: 1 });
  const [modal, setModal] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [navPermissions, setNavPermissions] = useState(true);
  // const [unreadNotificationList, setUnreadNotificationList] = useState();
  const { getUnreadNotifications } = useNotification();
  const history = useHistory();

  useEffect(() => {
    // console.log({ profile });
  }, []);
  useEffect(() => {
    // console.log({ profile });
  }, [profile]);

  const checkPermission = async () => {
    const result = await getPermissions();
    if (result && result.length) {
      const permNames = result.map((item) => item.name);
      // console.log({ permNames });
      if (permNames.includes("Managing Director")) {
        setNavPermissions(false);
      }
    }
  };

  const getPunchTime = async () => {
    const res = await getData(LAST_ENTRY_TIME);
    if (res?.data?.data) {
      const { entry_time, out_time } = res.data.data;
      setPunchTime({ entry: entry_time, exit: out_time });
    }
  };

  const getCoordinates = async () => {
    await navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position?.coords?.latitude ? position?.coords?.latitude : 1,
        lng: position?.coords?.longitude ? position?.coords?.longitude : 1,
      });
    });
  };

  const getLocation = () => {
    navigator.permissions &&
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (PermissionStatus) {
          if (
            PermissionStatus.state == "granted" ||
            PermissionStatus.state == "prompt"
          ) {
            getCoordinates();
          } else alertPop("error", "Please enable your location service!");
        });
  };

  const punch = async () => {
    // // console.log("34546");
    // if (mobileAndTabletCheck() && navigator.maxTouchPoints > 1) {
    //   // console.log("retyrytu", navigator.maxTouchPoints);
    //   alertPop("success", "===== Punch successful =====");
    //   alertPop("success", navigator.maxTouchPoints);
    // } else {
    //   // console.log("hello");
    // }

    if (mobileAndTabletCheck() && navigator.maxTouchPoints === 1) {
      alertPop("success", "Emulator" + navigator.maxTouchPoints);
    }

    /*
        In the previous version there were two options- punch in and punch out
        punch in and punch out options were represented by type 1 and type 2 repectively
        Later we move to have a single punch button and use type 2 value always
    */

    setPunchLoading(true);
    const res = await postData(DIGITAL_ATTENDANCE, {
      lat_long: `${location.lat}, ${location.lng}`,
      type: 2, // single punch type as described above
      device:
        mobileAndTabletCheck() && navigator.maxTouchPoints > 1
          ? "mobile-or-tab"
          : "pc",
      isEmulator:
        mobileAndTabletCheck() && navigator.maxTouchPoints === 1 ? true : false,
    });
    if (res) {
      setTimeout(async () => {
        getPunchTime();
        setPunchLoading(false);
        alertPop("success", "Punch successful");
        setPunchLoading(false);
        getPunchTime();
        // window.location = "/";
      }, 7000); //timeout for backend requirement (syncing with hris db)
    } else setPunchLoading(false);
  };

  const notificationBody = (data, type) => {
    if (data) {
      let value = JSON.parse(data);

      if (type === "title") return value.title;
      if (type === "body") return value.body;
      if (type === "time") return timeDifferentCalculation(value.created_at);
    }
  };

  const timeDifferentCalculation = (time) => {
    if (time) {
      let createdDateTime = moment(time);
      let todayDateTime = moment(new Date());

      if (todayDateTime.diff(createdDateTime, "minutes") < 60)
        return todayDateTime.diff(createdDateTime, "minutes") + " min ago";
      else if (todayDateTime.diff(createdDateTime, "hours") < 25)
        return todayDateTime.diff(createdDateTime, "hours") + "h ago";
      else return todayDateTime.diff(createdDateTime, "days") + "d ago";
    }
  };

  const readSingleNotification = async (noti) => {
    let res = await postData(MARK_SINGLE_NOTIFICATION + "/" + noti.id);

    if (res) {
      let value = JSON.parse(noti.data);
      getUnreadNotifications();
      if (value.link) history.push(`/${value.link}`);
    }
  };

  // const getUnreadNotifications = async () => {
  //   const res = await getData(NOTIFICATIONS_LIST_UNREAD);
  //   if (res) {
  //     let masterData = res?.data?.data;
  //     setUnreadNotificationList(masterData);
  //   }
  // };

  const logout = () => {
    cookies.remove("token");
    localStorage.clear();
    sessionStorage.clear();
    window.location = "/";
  };

  useEffect(() => {
    getPunchTime();
    getLocation();
    getCoordinates();
    getUnreadNotifications();
    checkPermission();
  }, []);

  useEffect(() => {
    permissionData();
  }, []);

  const permissionData = async () => {
    // const response = await getPermissions();
    // const checkIsPermisson = response?.find(permission => permission?.name === "Managing Director");
    // if (checkIsPermisson?.name) {
    //   setIsManager(true)
    // }
  };

  const permissionList = JSON.parse(sessionStorage.getItem("ebuddyPermission"));
  const isManager = permissionList?.find(
    (permission) => permission?.name === "Managing Director",
  )?.name
    ? true
    : false;
  const isCXO = permissionList?.find(
    (permission) => permission?.name === "CXO Dashboard",
  )?.name
    ? true
    : false;

  return (
    <div className="nav-wrapper">
      <Row>
        <Col lg={4} md={4} xs={0}>
          <div className="nav-container-start">
            <Link className="LINK" to="/">
              <img className="logo left-pad right-pad" src={logo} alt="logo" />
            </Link>
          </div>
        </Col>
        <Col lg={20} md={20} xs={24}>
          <div className="nav-container-end left-pad">
            {navPermissions ? (
              <>
                {!isManager ? (
                  <ManagerFunctions
                    punchTime={punchTime}
                    profile={profile}
                    punchLoading={punchLoading}
                    isCXO={isCXO}
                    punch={punch}
                    // enableMdDashboard={enableMdDashboard}
                    data={data}
                    setData={setData}
                  />
                ) : null}
                <div className="side-pad">
                  <Popover
                    placement="bottomRight"
                    trigger="click"
                    visible={notificationVisible}
                    onVisibleChange={(value) => setNotificationVisible(value)}
                    content={
                      <div className="profile-pop flex_c">
                        {unreadNotificationList &&
                        unreadNotificationList?.notifications?.length ? (
                          <>
                            <h3>Unread Notifications</h3>
                            {unreadNotificationList?.notifications?.map(
                              (noti, index) => (
                                <div
                                  onClick={() => readSingleNotification(noti)}
                                  className="notification"
                                  key={`notification-${index}`}
                                >
                                  <h4>
                                    {notificationBody(noti.data, "title")}
                                  </h4>
                                  <p className="m-0">
                                    {notificationBody(noti.data, "body")}
                                  </p>
                                  <p
                                    style={{
                                      color: "#0184E6",
                                      marginBottom: "0.5rem",
                                    }}
                                  >
                                    <small>
                                      {timeDifferentCalculation(
                                        noti.created_at,
                                      )}
                                    </small>
                                  </p>
                                </div>
                              ),
                            )}
                          </>
                        ) : (
                          <p>No unread notifications</p>
                        )}
                        <Button type="link" style={{ float: "right" }}>
                          <Link to="/notification/notification-list">
                            See all notification
                          </Link>
                        </Button>
                      </div>
                    }
                  >
                    <Badge
                      count={
                        unreadNotificationList
                          ? unreadNotificationList?.total_unread
                          : undefined
                      }
                      style={{ backgroundColor: "#0184E6" }}
                    >
                      <Icon
                        type="bell"
                        style={{
                          fontSize: "1.5rem",
                          marginLeft: "1rem",
                          color: "#808080",
                        }}
                      />
                    </Badge>
                  </Popover>
                </div>
              </>
            ) : null}

            <div className="side-pad">
              <Popover
                placement="bottomRight"
                trigger="click"
                visible={popoverVisible}
                onVisibleChange={(value) => setPopoverVisible(value)}
                content={
                  <div className=" profile-pop flex_r">
                    <div className="right-pad">
                      <Avatar
                        shape="square"
                        size={128}
                        src={profile?.profile_pic || dummy}
                      />
                    </div>
                    <div>
                      <Typography.Text strong>{profile?.name}</Typography.Text>
                      <div>
                        <Typography.Text>
                          {profile?.designation || []},
                        </Typography.Text>
                      </div>
                      <div>
                        <Typography.Text>
                          {profile?.department || []}
                        </Typography.Text>
                      </div>
                      <div className="half-pad" />
                      <div style={{ display: "flex" }}>
                        {/* <Button 
                          onClick={()=>{
                            setModal(true);
                            setPopoverVisible(false);
                          }}
                          type="primary" 
                          style={{marginRight: '1rem'}}
                        >
                          Change Password
                        </Button> */}
                        <Button onClick={logout} type="danger">
                          Log Out
                        </Button>
                      </div>
                    </div>
                  </div>
                }
              >
                <Avatar size="large" src={profile.profile_pic || dummy} />
              </Popover>
            </div>
          </div>
        </Col>
      </Row>
      {/* <ChangePassword modal={modal} setModal={setModal}/> */}
    </div>
  );
};

class Nav_ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myProfile: JSON.parse(cookies.get("profile")),
    };
  }

  componentDidMount() {
    this.me();
  }

  me = async () => {
    let res = await getData(LAST_ENTRY_TIME);
    if (res?.data?.data) {
      this.setState({
        entry_time: res.data.data.entry_time,
        exit_time: res.data.data.out_time,
      });
    }
  };

  punch = async () => {
    this.setState({ punch_loading: true });
    let data = {};
    if (this.state.punch === "Punch in") {
      data = { lat_long: "1,1", type: 1 };
    } else {
      data = { lat_long: "1,1", type: 2 };
    }
    let res = await postData(DIGITAL_ATTENDANCE, data);
    if (res) {
      setTimeout(async () => {
        alertPop("success", "Punch successful");
        window.location = "/";
      }, 7000);
      // this.me();
    } else {
      this.setState({ punch_loading: null });
    }
  };

  ///logout
  logout = () => {
    cookies.remove("token");
    window.location = "/";
  };

  //main method
  render() {
    return (
      <div style={{ height: "4rem", width: "100%" }}>
        <Row className="flex_r">
          <Col lg={4} md={4} xs={0}>
            <div className="nav-container-start">
              <Link className="LINK" to="/">
                <img
                  className="logo left-pad right-pad"
                  src={logo}
                  alt="logo"
                />
              </Link>
            </div>
          </Col>
          <Col span={20}>
            <div className="nav-container-end left-pad">
              <div className="P-BG flex_r side-pad">
                <div className="flex-row full-width">
                  <div className="side-bod half-pad">
                    <Typography.Text
                      style={{ whiteSpace: "nowrap" }}
                      className="blue-text"
                    >
                      First in
                      <Typography.Text strong className="side-pad blue-text">
                        {this.state.entry_time}
                      </Typography.Text>
                    </Typography.Text>
                  </div>
                  <div className="half-pad">
                    <Typography.Text
                      style={{ whiteSpace: "nowrap" }}
                      className="blue-text"
                    >
                      Last out
                      <Typography.Text strong className="side-pad blue-text">
                        {this.state.exit_time}
                      </Typography.Text>
                    </Typography.Text>
                  </div>
                </div>
                <Button.Group className="full-width half-pad">
                  <Button
                    loading={this.state.punch_loading}
                    onClick={this.punch}
                    type="primary"
                    // block
                  >
                    Punch
                  </Button>
                  <Button
                    // loading={this.state.punch_loading}
                    onClick={() => {
                      window.open("http://hris.sslwireless.com/", "_blank");
                    }}
                    type="primary"
                    // block
                  >
                    HRIS
                  </Button>
                </Button.Group>
                {/* </div> */}
              </div>
              <div className="side-pad">
                <Popover
                  placement="bottomRight"
                  trigger="click"
                  content={
                    <div className=" profile-pop flex_r">
                      <div className="right-pad">
                        <Avatar
                          shape="square"
                          size={128}
                          src={this.state.myProfile.profile_pic || dummy}
                        />
                      </div>
                      <div>
                        <Typography.Text strong>
                          {this.state.myProfile.name}
                        </Typography.Text>
                        <div>
                          <Typography.Text>
                            {this.state.myProfile.designation || []},
                          </Typography.Text>
                        </div>
                        <div>
                          <Typography.Text>
                            {this.state.myProfile.department || []}
                          </Typography.Text>
                        </div>
                        <div className="half-pad" />
                        <div>
                          <Button onClick={this.logout} type="danger" block>
                            Log Out
                          </Button>
                        </div>
                      </div>
                    </div>
                  }
                >
                  <Avatar
                    size="large"
                    src={this.state.myProfile.profile_pic || dummy}
                  />
                </Popover>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Nav;

// export default connect()(Nav);
