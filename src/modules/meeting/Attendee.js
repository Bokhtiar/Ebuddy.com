import React, { Component, Fragment } from "react";
import {
  Form,
  Typography,
  Row,
  Col,
  Button,
  Tooltip,
  Avatar,
  Modal,
  Icon,
  Badge,
  Input,
  Skeleton
} from "antd";
import { getData } from "../../scripts/getData";
import * as Cookies from "js-cookie";
import { checkRes, errorHandle } from "../../scripts/error";
import { alertPop } from "../../scripts/message";
import dummy from "../../assets/dummy.jpg"

class Attendee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attendeeModal: false,
      attendees: [],
      attendees_temp: [],
      all_user: [],
      loading: <Skeleton active />
    };
  }

  async componentWillMount() {
    this.addAttendee(JSON.parse(Cookies.get("profile")));
    // this.addAttendee(JSON.parse(Cookies.get('profile')), 'temp')
    let res = await getData(`accounts/v1/users`);
    if (res) {
      if (checkRes(res.status)) {
        this.setState({
          all_user: res.data.data,
          all_user_temp: res.data.data
        });
      } else {
        res.map(elem => {
          alertPop("error", elem);
        });
      }
    } else {
      errorHandle(res);
    }
  }

  modal = () => {
    if (!this.state.modal) {
      this.setState({
        attendees_temp: this.state.attendees
      });
    }
    this.setState({ modal: !this.state.modal });
  };

  addAttendee = (attendee, temp) => {
    if (temp) {
      this.setState({
        attendees_temp: [...this.state.attendees_temp, attendee]
      });
    } else {
      this.setState(
        {
          attendees: [...this.state.attendees, attendee]
        },
        () => {
          this.props.attendees(
            this.state.attendees.map(elem => {
              return elem.emp_id;
            })
          );
        }
      );
    }
  };

  removeAttendee = (attendee, temp) => {
    if (temp) {
      this.setState({
        attendees_temp: this.state.attendees_temp.filter(elem => {
          return elem.emp_id !== attendee.emp_id;
        })
      });
    } else {
      this.setState(
        {
          attendees: this.state.attendees.filter(elem => {
            return elem.emp_id !== attendee.emp_id;
          }),
          attendees_temp: this.state.attendees_temp.filter(elem => {
            return elem.emp_id !== attendee.emp_id;
          })
        },
        () => {
          this.props.attendees(
            this.state.attendees.map(elem => {
              return elem.emp_id;
            })
          );
        }
      );
    }
  };

  searchUsers = search_value => {
    this.setState({
      all_user_temp: this.state.all_user.filter(elem => {
        return elem.name.toLowerCase().includes(search_value.toLowerCase());
      })
    });
  };

  render() {
    return (
      <div>
        <Form.Item label="Attendee">
          <Button size="small" onClick={this.modal}>
            Add attendee
          </Button>
          <div className="pad" />
          <div className="attendee-grid">
            {this.state.attendees.map(elem => {
              return (
                <Fragment>
                  <div className="attendee-item">
                    <div>
                      <Badge
                        count={
                          <Icon
                            onClick={() => this.removeAttendee(elem)}
                            type="close-circle"
                            theme="filled"
                            style={{ color: "#f5222d" }}
                          />
                        }
                      >
                        <Avatar
                          size="large"
                          shape="square"
                          src={elem.profile_pic || dummy}
                        />
                      </Badge>
                    </div>
                    <Typography.Text className="sub-title">{`${elem.name.slice(
                      0,
                      8
                    )}...`}</Typography.Text>
                  </div>
                </Fragment>
              );
            })}
          </div>
        </Form.Item>
        <Modal
          width="700px"
          title="Add attendee"
          centered
          visible={this.state.modal}
          footer={null}
          onCancel={this.modal}
        >
          <Row style={{ width: "100%" }}>
            <Col md={12}>
              <Input
                placeholder="Search by name"
                showSearch
                onChange={e => this.searchUsers(e.target.value)}
              />
              <div className="space" />
              <div className="user-list">
                {this.state.all_user_temp
                  ? this.state.all_user_temp
                      .filter(val => {
                        return !this.state.attendees_temp.includes(val);
                      })
                      .map(user => (
                        <div key={user.name} className="FIX_cbs_addnew_transports">
                          <Row onClick={() => this.addAttendee(user, "temp")}>
                            <Col md={4}>
                              <Avatar src={user.profile_pic || dummy} />
                            </Col>
                            <Col md={18}>
                              <Typography.Text strong>
                                {user.name}
                              </Typography.Text>
                              <div>
                                <Typography.Text>
                                  {user.designation}
                                </Typography.Text>
                              </div>
                            </Col>
                            <Col md={2}>
                              <i class="material-icons">person_add</i>
                            </Col>
                          </Row>
                        </div>
                      ))
                  : this.state.loading}
              </div>
            </Col>
            <Col md={{ span: 11, offset: 1 }}>
              <Typography.Text strong>
                Attendees ({this.state.attendees_temp.length})
              </Typography.Text>
              <div className="space" />
              {this.state.attendees_temp.map(d => (
                <div
                  style={{
                    maxHeight: "300px",
                    overflow: "auto",
                    padding: "1%"
                  }}
                  className="FIX_cbs_addnew_transports"
                >
                  <Row
                    style={{ alignItems: "center" }}
                    onClick={() => this.removeAttendee(d, "temp")}
                  >
                    <Col md={4}>
                      <Avatar src={d.profile_pic || dummy} />
                    </Col>
                    <Col md={18}>
                      <Typography.Text strong>{d.name}</Typography.Text>
                      <div>
                        <Typography.Text>{d.designation}</Typography.Text>
                      </div>
                    </Col>
                    <Col md={2}>
                      <i class="material-icons">remove_circle</i>
                    </Col>
                  </Row>
                </div>
              ))}
            </Col>
          </Row>
          <div className="space" />
          <Row>
            <Col md={12}>
              <Button
                onClick={() => {
                  this.setState({
                    attendees_temp: []
                  });
                  this.modal();
                }}
                block
              >
                Cancel
              </Button>
            </Col>
            <Col md={{ span: 11, offset: 1 }}>
              <Button
                onClick={() => {
                  this.setState(
                    {
                      attendees: [...new Set(this.state.attendees_temp)],
                      attendees_temp: []
                    },
                    () => {
                      this.props.attendees(
                        this.state.attendees.map(elem => {
                          return elem.emp_id;
                        })
                      );
                    }
                  );
                  this.modal();
                }}
                type="primary"
                block
              >
                Confirm
              </Button>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default Attendee;
