import React, { Component, Fragment } from "react";
import styled from "styled-components";
import {
  Divider,
  Button,
  Row,
  Col,
  Typography,
  Switch,
  Modal,
  Form,
  DatePicker,
  Checkbox,
  Empty
} from "antd";
import lunch from "../../assets/lunch.svg";
import breakfast from "../../assets/breakfast.svg";
import { getData } from "../../scripts/getData";
import { postData } from "../../scripts/postData";
import { alertPop } from "../../scripts/message";
import { checkRes } from "../../scripts/checkRes";
import * as moment from "moment";

const Wrapper = styled.div`
  height: 100vh;
  overflow: auto;
  padding-top: 4rem;
`;

const meals = [
  {
    name: "Breakfast",
    id: 1
  },
  {
    name: "Lunch",
    id: 2
  }
  // {
  //     name : 'Dining status',
  //     id : 3
  // }
];

const congrats = [
  {
    title: "Congratulations!",
    code: 987979,
    id: 1,
    message:
      "Congratulations! You are eligible to enjoy FREE Breakfast sponsored by office.",
    date: "17/09/2019"
  },
  {
    title: "Congratulations!",
    code: 987979,
    id: 1,
    message:
      "Congratulations! You are eligible to enjoy FREE Breakfast sponsored by office.",
    date: "17/09/2019"
  },
  {
    title: "Congratulations!",
    code: 987979,
    id: 1,
    message:
      "Congratulations! You are eligible to enjoy FREE Breakfast sponsored by office.",
    date: "17/09/2019"
  }
];

const schedule = [
  {
    date_from: "12/12/12",
    date_to: "12/13/14",
    day_count: "1",
    id: 1
  },
  {
    date_from: "12/12/12",
    date_to: "12/13/14",
    day_count: "1",
    id: 1
  },
  {
    date_from: "12/12/12",
    date_to: "12/13/14",
    day_count: "1",
    id: 1
  }
];

class DailyMeal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_type: 1,
      modal: false,
      allData: []
    };
  }

  componentWillMount() {
    this.bf_left();
    this.lunch_status();
    this.schedules();
  }

  diningStatus = async () => {
    let res = await getData("accounts/v1/hris/dining-status?dining_id=1");
    if (checkRes(res.status)) {
      this.setState({
        dining_status: res.data.data
      });
    } else {
      res.map(elem => {
        alertPop("error", elem);
      });
    }
  };

  schedules = async () => {
    let res = await getData("accounts/v1/hris/daily-lunch-pause-list");
    if (checkRes(res.status)) {
      this.setState({
        schedules: res.data.data
      });
    } else {
      res.map(elem => {
        alertPop("error", elem);
      });
    }
  };

  deleteSchedule = async id => {
    let data = {
      status: 2,
      id: id
    };
    let res = await postData(
      "accounts/v1/hris/daily-lunch-pause-status-change",
      data
    );
    if (checkRes(res.status)) {
      this.schedules();
      alertPop("success", "Schedule deleted!");
    } else {
      res.map(elem => {
        alertPop("error", elem);
      });
    }
  };

  bf_left = async () => {
    let res = await getData("accounts/v1/hris/bf-status");
    if (res.status === 200) {
      this.setState({
        break_fast_left: res.data.data.break_fast_left
      });
    } else {
      res.map(elem => {
        alertPop("error", elem);
      });
    }
  };

  lunch_status = async () => {
    let res = await getData("accounts/v1/hris/daily-lunch-status");
    res.status === 200
      ? this.setState({
          lunch_status: res.data.data.status
        })
      : res.map(elem => {
          alertPop("error", elem);
        });
  };

  change_lunch_status = async () => {
    let data = {
      status: this.state.lunch_status && this.state.lunch_status === 1 ? 2 : 1
    };
    let res = await postData(
      "accounts/v1/hris/daily-lunch-activate-deactivate",
      data
    );
    if (checkRes(res.status)) {
      this.lunch_status();
      alertPop("success", "");
    } else {
      res.map(elem => {
        alertPop("error", elem);
      });
    }
  };

  pause_list = async () => {
    let res = await getData("accounts/v1/hris/daily-lunch-pause-list");
    res.status === 200
      ? this.setState({
          pause_list: res.data.data
        })
      : res.map(elem => {
          alertPop("error", elem);
        });
  };

  req_bf = async () => {
    this.setState({ req_bf: true });
    let res = await getData("accounts/v1/hris/avail-breakfast");
    if (checkRes(res.status)) {
      alertPop("success", "Breakfast booked!");
      this.setState({ req_bf: null });
    } else {
      res.map(elem => {
        alertPop("error", elem);
      });
      this.setState({ req_bf: null });
    }
  };

  req_lunch = async () => {
    this.setState({ req_lunch: true });
    let data = {
      date_from: this.state.guest_lunch_date,
      date_to: this.state.guest_lunch_date,
      guest_quantity: this.state.guest_lunch_count || 0,
      emp_quantity: this.state.emp_checked ? 1 : 0
    };
    let res = await postData("accounts/v1/hris/lunch-request", data);
    if (checkRes(res.status)) {
      alertPop(
        "success",
        `Lunch booked.`
      );
      this.setState({ req_lunch: null });
      this.request_modal();
    } else {
      res.map(elem => {
        alertPop("error", elem);
        this.setState({ req_lunch: null });
      });
    }
  };

  postpone_meal = async () => {
    if (this.state.pause_date_from && this.state.pause_date_to) {
      let data = {
        date_from: this.state.pause_date_from,
        date_to: this.state.pause_date_to
      };
      let res = await postData("accounts/v1/hris/daily-lunch-pause", data);
      if (checkRes(res.status)) {
        alertPop("success", "Lunch paused!");
        this.schedules();
        this.pause_modal();
      } else {
        res.map(elem => {
          alertPop("error", elem);
        });
      }
    } else {
      alertPop("error", "Select dates!");
    }
  };

  pause_modal = () => {
    this.setState({
      pause_modal: !this.state.pause_modal
    });
  };

  request_modal = () => {
    this.setState({
      request_modal: !this.state.request_modal
    });
  };

  render() {
    return (
      <Wrapper>
        <div className="pad">
          {meals.map(elem => {
            return (
              <div className="filter-btn">
                <Button
                  className="meal-btn"
                  onClick={() => {
                    this.setState({ current_type: elem.id });
                  }}
                  type={this.state.current_type === elem.id ? "primary" : ""}
                >
                  {elem.name}
                </Button>
              </div>
            );
          })}
        </div>
        <Divider />
        <Row>
          <Col lg={12}>
            <div className="pad">
              {this.state.current_type === 1 ? (
                <Typography.Text strong className="FIX_th">
                  TOKEN LIST
                </Typography.Text>
              ) : this.state.current_type === 2 ? (
                <Typography.Text strong className="FIX_th">
                  Lunch Status
                </Typography.Text>
              ) : this.state.current_type === 3 ? (
                <Typography.Text strong className="FIX_th">
                  Dining status
                </Typography.Text>
              ) : (
                "Daily meal"
              )}
            </div>
            <Divider />
            {this.state.current_type === 1 ? (
              // congrats.map( val => {
              //     return (
              //         <Fragment>
              //             <Row className='pad'>
              //                 <Col md={16} lg={19}>
              //                     <Typography.Text strong>
              //                         { val.title }
              //                     </Typography.Text>
              //                     <div>
              //                         <Typography.Text>
              //                             { `${val.message} Please give this token to the attendants : ` }
              //                         </Typography.Text>
              //                         <Typography.Text strong className='blue-text'>
              //                             {`${val.code}.`}
              //                         </Typography.Text>
              //                     </div>
              //                 </Col>
              //                 <Col className='text-right' md={{span : 6, offset : 2}} lg={{span : 4, offset : 1}}>
              //                     <Typography.Text strong>
              //                         { val.date }
              //                     </Typography.Text>
              //                 </Col>
              //             </Row>
              //             <Divider />
              //         </Fragment>
              //     )
              // })
              <Empty className="big-space" />
            ) : this.state.current_type === 2 ? (
              <Fragment>
                <Row className="pad">
                  <Col lg={20}>
                    <Typography.Text strong>Daily lunch</Typography.Text>
                    <div>
                      <Typography.Text>
                        To avail daily basis lunch subscribe here.
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col className="right-text" lg={{ span: 3, offset: 1 }}>
                    <Switch
                      defaultChecked={this.state.lunch_status === 1 || false}
                      onChange={e => {
                        this.change_lunch_status();
                      }}
                    />
                  </Col>
                </Row>
                <Divider />
                <Row className="pad">
                  <Col lg={14}>
                    <Typography.Text strong>Pause lunch</Typography.Text>
                    <div>
                      <Typography.Text>
                        Pause your lunch for particular day(s)
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col className="right-text" lg={{ span: 9, offset: 1 }}>
                    <Button
                      disabled={this.state.lunch_status === 2}
                      onClick={() => {
                        this.setState(
                          {
                            postpone_meal: true
                          },
                          () => {
                            this.pause_modal();
                          }
                        );
                      }}
                      type="primary"
                      ghost
                    >
                      + Add Schedule
                    </Button>
                  </Col>
                </Row>
                <div className="space" />
                <Divider />
                <div className="space" />
                {this.state.schedules && this.state.schedules.length > 0
                  ? this.state.schedules.map(val => {
                      return (
                        <div className="pad">
                          <div className="P-BG">
                            <Row>
                              <Col lg={20}>
                                <Typography.Text strong>
                                  {`From : `}
                                </Typography.Text>
                                <Typography.Text>
                                  {val.date_from}
                                </Typography.Text>
                                <div>
                                  <Typography.Text strong>
                                    {`To : `}
                                  </Typography.Text>
                                  <Typography.Text>
                                    {val.date_to}
                                  </Typography.Text>
                                </div>
                              </Col>
                              <Col
                                className="right-text"
                                lg={{ span: 3, offset: 1 }}
                              >
                                <Button
                                  onClick={() => {
                                    this.deleteSchedule(val.id);
                                  }}
                                  icon="delete"
                                />
                              </Col>
                            </Row>
                          </div>
                        </div>
                      );
                    })
                  : []}
              </Fragment>
            ) : this.state.current_type === 3 ? (
              <img
                src={
                  this.state.dining_status ? this.state.dining_status.image : ""
                }
              />
            ) : (
              []
            )}
          </Col>
          <Col lg={12}>
            <Row>
              <Col lg={1}>
                <Divider style={{ minHeight: "100vh" }} type="vertical" />
              </Col>
              <Col lg={23}>
                <div className="meal-book-container">
                  <div>
                    <img
                      src={
                        this.state.current_type === 1
                          ? breakfast
                          : this.state.current_type === 2
                          ? lunch
                          : ""
                      }
                    />
                  </div>
                  <div className="space" />
                  <div>
                    <Typography.Text strong>
                      {this.state.current_type === 1
                        ? `There are still ${
                            this.state.break_fast_left
                              ? this.state.break_fast_left
                              : 0
                          } breakfast tokens left.`
                        : this.state.current_type === 2
                        ? "Extra lunch request for yourself or guest"
                        : ""}
                    </Typography.Text>
                  </div>
                  <div className="space" />
                  {this.state.current_type === 1 ? (
                    <Fragment>
                      <div>
                        <Typography.Text>
                          If you would like to request for paid breakfast Please
                          send SMS to 26969 for paid breakfast. SMS format :
                        </Typography.Text>
                        <Typography.Text className="blue-text">
                          {` ‘BFT employee_id’`}
                        </Typography.Text>
                      </div>
                      <div className="space" />
                      <div>
                        <Typography.Text>
                          or you can send request below. Please make sure to
                          avail a breakfast BDT 35 will be deducted from your
                          account.
                        </Typography.Text>
                      </div>
                    </Fragment>
                  ) : this.state.current_type === 2 ? (
                    <div>
                      <Typography.Text>
                        One day’s Extra lunch for each employee/guest costs BDT
                        140 which will be adjust from employee’s salary account.
                      </Typography.Text>
                    </div>
                  ) : (
                    []
                  )}
                  <div className="big-space" />
                  <Button
                    loading={this.state.req_bf}
                    onClick={
                      this.state.current_type === 1
                        ? this.req_bf
                        : this.state.current_type === 2
                        ? this.request_modal
                        : ""
                    }
                    type="primary"
                    ghost
                  >
                    Send request
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Modal
          title={"Postpone meals"}
          onCancel={() => {
            this.setState({
              postpone_meal: null
            });
            this.pause_modal();
          }}
          centered
          visible={this.state.pause_modal}
          footer={false}
        >
          <Form.Item label="Select date">
            <Row>
              <Col className="right-pad" lg={12}>
                <DatePicker
                  disabledDate={current => {
                    return current < moment().add(0, "day");
                  }}
                  onChange={(date, dateString) => {
                    this.setState({
                      pause_date_from: dateString.split("T")[0]
                    });
                  }}
                />
              </Col>
              <Col className="left-pad" lg={12}>
                <DatePicker
                  disabledDate={current => {
                    return current < moment().add(0, "day");
                  }}
                  onChange={(date, dateString) => {
                    this.setState({
                      pause_date_to: dateString.split("T")[0]
                    });
                  }}
                />
              </Col>
            </Row>
          </Form.Item>
          <Button
            type="primary"
            loading={this.state.req_lunch}
            onClick={this.postpone_meal}
            block
          >
            Submit
          </Button>
        </Modal>
        <Modal
          title="Request lunch"
          onCancel={this.request_modal}
          centered
          visible={this.state.request_modal}
          footer={false}
        >
          <Fragment>
            {this.state.lunch_status && this.state.lunch_status === 2 ? (
              <Fragment>
                <Row>
                  <Col lg={1}>
                    <Checkbox
                      onChange={e => {
                        e.target.checked
                          ? this.setState({
                              emp_checked: true
                            })
                          : this.setState({
                              emp_checked: null
                            });
                      }}
                    />
                  </Col>
                  <Col lg={{ span: 22, offset: 1 }}>
                    <Typography.Text strong>
                      Employee lunch request
                    </Typography.Text>
                    <div>
                      <Typography.Text className="blue-text">
                        {`BDT 70.00 `}
                      </Typography.Text>
                      <Typography.Text>
                        will be deducted from your account.
                      </Typography.Text>
                    </div>
                  </Col>
                </Row>
                <div className="space" />
                <Divider />
              </Fragment>
            ) : (
              ""
            )}
            <div className="space" />
          </Fragment>
          <Row>
            <Col lg={1}>
              <Checkbox
                onChange={e => {
                  e.target.checked
                    ? this.setState({
                        guest_checked: true
                      })
                    : this.setState({
                        guest_checked: null
                      });
                }}
              />
            </Col>
            <Col lg={{ span: 12, offset: 1 }}>
              <Typography.Text strong>Guest lunch request</Typography.Text>
              <div>
                <Typography.Text className="blue-text">
                  {`BDT 140.00 `}
                </Typography.Text>
                <Typography.Text>
                  will be deducted from your account.
                </Typography.Text>
              </div>
            </Col>
            <Col className="right-text" lg={{ span: 9, offset: 1 }}>
              <Button.Group>
                <Button
                  disabled={!this.state.guest_checked}
                  onClick={() => {
                    this.setState({
                      guest_lunch_count:
                        this.state.guest_lunch_count &&
                        this.state.guest_lunch_count > 0
                          ? this.state.guest_lunch_count - 1
                          : 0
                    });
                  }}
                >
                  -
                </Button>
                <Typography.Text className="pad">
                  {this.state.guest_lunch_count || 0}
                </Typography.Text>
                <Button
                  disabled={!this.state.guest_checked}
                  onClick={() => {
                    this.setState({
                      guest_lunch_count: this.state.guest_lunch_count
                        ? this.state.guest_lunch_count + 1
                        : 1
                    });
                  }}
                >
                  +
                </Button>
              </Button.Group>
            </Col>
          </Row>
          <div className="space" />
          <Form.Item label="Select date" required>
            <DatePicker
              onChange={(date, dateString) => {
                this.setState({
                  guest_lunch_date: dateString.split("T")[0]
                });
              }}
            />
          </Form.Item>
          <Button
            type="primary"
            loading={this.state.req_lunch}
            onClick={this.req_lunch}
            block
          >
            Submit
          </Button>
        </Modal>
      </Wrapper>
    );
  }
}

export default DailyMeal;
