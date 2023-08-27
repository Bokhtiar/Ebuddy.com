import React, { Component, Fragment } from "react";
import styled from "styled-components";
import {
  Typography,
  Divider,
  Form,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  Button,
  Skeleton
} from "antd";
import * as Cookies from "js-cookie";
import { getData } from "../../../scripts/getData";
import { checkRes } from "../../../scripts/checkRes";
import { alertPop } from "../../../scripts/message";
import moment from "moment";
import { validatePhone, validateText } from "../../../scripts/validate";
import { errorHandle } from "../../../scripts/error";
import { postData } from "../../../scripts/postData";
import { Redirect } from "react-router-dom";

const Wrapper = styled.div`
  height: 100vh;
  overflow: auto;
  padding-top: 4rem;
`;
// const dummy_leave_type = [{id : 1, title : 'Annual'}, {id : 2, title : 'Montly'}, {id : 3, title : 'Casual'}, {id : 4, title : 'Sick'}]
const dummy_leave_category = [
  { id: 2, title: "Full day" },
  { id: 1, title: "Half day" }
];
// const dummy_resposible_person = [{name : 'J.M. Redwan', emp_id : 1219}, {name : 'Mahfuzul Alam', emp_id : 9999}, {name : 'Parvez Hamid', emp_id : 2020}]

class ApplyLeave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leave_types: [],
      leave_types_balance: []
    };
  }

  componentWillMount() {
    this.users();
    this.leaveCategory();
    this.leaveTypes();
    this.leaveTypesBalance();
  }

  users = async () => {
    let res = await getData("accounts/v1/users");
    if (res) {
      if (checkRes(res.status)) {
        this.setState(
          {
            users: res.data.data
          },
          () => {
            this.setState({
              responsible_persons: this.state.users
            });
          }
        );
      }
    } else {
      errorHandle(res);
    }
  };

  leaveCategory = async () => {
    //todo
  };

  leaveTypes = async () => {
    let res = await getData("accounts/v1/hris/leave-type");
    if (res) {
      if (checkRes(res.status)) {
        this.setState({
          leave_types: res.data.data
        });
      } else {
        res.map(val => {
          alertPop("error", val);
        });
      }
    } else {
      alertPop("error", "Something went wrong!");
    }
  };

  leaveTypesBalance = async () => {
    let res = await getData("accounts/v1/hris/leave-type-balance");
    if (res) {
      if (checkRes(res.status)) {
        this.setState({
          leave_types_balance: res.data.data
        });
      } else {
        res.map(val => {
          alertPop("error", val);
        });
      }
    } else {
      alertPop("error", "Something went wrong!");
    }
  };

  apply = async () => {
    if (validatePhone(this.state.contact_during_leave)) {
      let red = <Redirect to="/hris/leave-application" />;
      let data = {
        date_from: this.state.date_from,
        date_to: this.state.join_date,
        cover_person_id: this.state.res_person,
        leave_type: this.state.leave_type,
        reason: this.state.reason,
        leave_category: this.state.leave_category,
        contact_details_during_leave: this.state.contact_during_leave
      };

      let res = await postData("accounts/v1/hris/apply-leave", data);
      if (res) {
        if (checkRes(res.status)) {
          this.setState({
            red: red
          });
          alertPop("success", "Applied for leave.");
        } else {
          res.map(elem => {
            alertPop("error", elem);
          });
        }
      } else {
        errorHandle(res);
      }
    } else {
      alertPop('error', 'Enter a valid phone number')
    }
  };

  render() {
    return (
      <Wrapper>
        {/* <div className='grid-8 pad'>
                    {
                        this.state.leave_types_balance.length > 0 ?
                        this.state.leave_types_balance.map( elem => {
                            return (
                                <Fragment>
                                    <Typography.Text strong className='FIX_th'>
                                        {this.state.leave_types_balance.name}
                                    </Typography.Text>
                                    <Typography.Text strong className='FIX_th'>
                                        {
                                            this.state.leave_types_balance.balance && this.state.leave_types_balance.balance.length > 0 ?
                                            ` ${this.state.leave_types_balance.balance[0].total_given}/${this.state.leave_types_balance.balance[0].total_used}` :
                                            ` N/A`
                                        }
                                    </Typography.Text>
                                </Fragment>
                            )
                        }) : <Skeleton paragraph={false} active />
                    }
                </div> */}
        {/* <Divider /> */}
        <Typography.Title className="pad" level={4}>
          Apply for leave
        </Typography.Title>
        <Row className="pad">
          <Col className="right-pad" lg={12}>
            <Row>
              <Col className="right-pad" lg={12}>
                <Form.Item required label="Leave type">
                  <Select
                    onChange={e => {
                      this.setState({
                        leave_type: e
                      });
                    }}
                    placeholder="Select leave type"
                  >
                    {this.state.leave_types && this.state.leave_types.length > 0
                      ? this.state.leave_types.map(elem => {
                          return (
                            <Select.Option value={elem.id}>
                              {elem.name}
                            </Select.Option>
                          );
                        })
                      : []}
                  </Select>
                </Form.Item>
                <Form.Item required label="Date of leave">
                  <DatePicker
                    onChange={(date, dateString) => {
                      this.setState({
                        date_from: dateString
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item required label="Next joining date">
                  <DatePicker
                    onChange={(date, dateString) => {
                      this.setState({
                        join_date: dateString
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item
                  required
                  label="Contact during leave"
                  validateStatus={
                    this.state.contact_during_leave
                      ? validatePhone(this.state.contact_during_leave)
                        ? ""
                        : "error"
                      : ""
                  }
                  help={
                    this.state.contact_during_leave
                      ? validatePhone(this.state.contact_during_leave)
                        ? ""
                        : "Enter a valid number"
                      : ""
                  }
                >
                  <Input
                    placeholder="Contact no."
                    value={this.state.contact_during_leave || []}
                    onChange={e => {
                      if (e.target.value.length < 12) {
                        this.setState({
                          contact_during_leave: e.target.value
                        });
                      }
                    }}
                  />
                </Form.Item>
              </Col>
              <Col className="left-pad" lg={12}>
                <Form.Item required label="Leave category">
                  <Select
                    onChange={e => {
                      this.setState({
                        leave_category: e
                      });
                    }}
                    placeholder="Select leave category"
                  >
                    {dummy_leave_category.map(elem => {
                      return (
                        <Select.Option value={elem.id}>
                          {elem.title}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item required label="Until">
                  <DatePicker
                    onChange={(date, dateString) => {
                      this.setState({
                        date_to: dateString
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item required label="Including total working days">
                  {/* <Input 
                                        type='number'
                                        placeholder='0'
                                        onChange= { e => {
                                            this.setState({
                                                days_count : e.target.value
                                            })
                                        }}
                                    /> */}
                  {this.state.date_from && this.state.date_to ? (
                    <Typography.Text className="P-BG pad" strong>
                      {Math.abs(
                        this.state.leave_category === 1
                          ? moment
                              .duration(
                                moment(this.state.date_from).diff(
                                  moment(this.state.date_to)
                                )
                              )
                              .asDays() / 2
                          : moment
                              .duration(
                                moment(this.state.date_from).diff(
                                  moment(this.state.date_to)
                                )
                              )
                              .asDays()
                      )}
                    </Typography.Text>
                  ) : (
                    "0"
                  )}
                </Form.Item>
                <Form.Item required label="Responsible person">
                  <Select
                    showSearch
                    placeholder="Select responsible person"
                    filterOption={false}
                    onSearch={value => {
                      this.setState({
                        responsible_persons: this.state.users.filter(elem => {
                          return elem.name
                            .toLowerCase()
                            .includes(value.toLowerCase());
                        })
                      });
                    }}
                    onChange={value => {
                      this.setState({
                        res_person: value
                      });
                    }}
                  >
                    {this.state.responsible_persons
                      ? this.state.responsible_persons.map(elem => {
                          return (
                            <Select.Option value={elem.emp_id}>
                              {elem.name}
                            </Select.Option>
                          );
                        })
                      : []}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              validateStatus={validateText(this.state.reason)}
              help={validateText(this.state.reason, 'help')}
              required
              label="Reason of leave"
            >
              <Input.TextArea
                style={{ width: "100%" }}
                value={this.state.reason || []}
                placeholder="Due to"
                onChange={e => {
                  this.setState({
                    reason: e.target.value
                  });
                }}
              />
            </Form.Item>
            <Button onClick={this.apply} size="large" type="primary" block>
              Apply
            </Button>
          </Col>
          <Col className="left-pad" lg={12}>
            <div className="P-BG pad">
              <div className="space">
                <Typography.Text strong>Subject :</Typography.Text>
                <Typography.Text>{` Applying for`}</Typography.Text>
                {this.state.leave_type ? (
                  this.state.leave_types.map(elem => {
                    if (elem.id === this.state.leave_type) {
                      return (
                        <Typography.Text strong className="blue-text">
                          {` ${elem.name} `}
                        </Typography.Text>
                      );
                    }
                  })
                ) : (
                  <Typography.Text strong className="blue-text">
                    {` {{Leave type}} `}
                  </Typography.Text>
                )}
                <Typography.Text>leave.</Typography.Text>
              </div>
              <div className="space" />
              <div className="space">Dear sir,</div>
              <div className="space">
                <Typography.Text>
                  I request you to consider my leave application of
                  <Typography.Text strong className="blue-text">
                    {` ${
                      this.state.date_from && this.state.date_to
                        ? Math.abs(
                            moment
                              .duration(
                                moment(this.state.date_from).diff(
                                  moment(this.state.date_to)
                                )
                              )
                              .asDays()
                          )
                        : "{{days}}"
                    } `}
                  </Typography.Text>
                  day(s) due to
                  <Typography.Text strong className="blue-text">
                    {` ${
                      this.state.reason ? this.state.reason : "{{reason}}"
                    } `}
                  </Typography.Text>
                  . I would like to avail the leave(s) from
                  <Typography.Text strong className="blue-text">
                    {` ${
                      this.state.date_from
                        ? this.state.date_from
                        : "{{start date}}"
                    } `}
                  </Typography.Text>
                  to
                  <Typography.Text strong className="blue-text">
                    {` ${
                      this.state.date_to ? this.state.date_to : "{{end date}}"
                    } `}
                  </Typography.Text>{" "}
                  .
                </Typography.Text>
              </div>
              <div className="space">
                <Typography.Text>
                  I have delegated my current project to
                  <Typography.Text strong className="blue-text">
                    {` ${
                      this.state.res_person
                        ? this.state.res_person
                        : "{{responsible person}}"
                    }`}
                  </Typography.Text>
                  . He/she very well understands about my project and is capable
                  of handling the task without any difficulties.
                </Typography.Text>
              </div>
              <div className="space">
                <Typography.Text>
                  During the day(s) of my absence from office, I can be reached
                  at
                  <Typography.Text strong className="blue-text">
                    {` ${
                      this.state.contact_during_leave
                        ? this.state.contact_during_leave
                        : "{{contact}}"
                    } `}
                  </Typography.Text>{" "}
                  .
                </Typography.Text>
              </div>
              <div>
                <Typography.Text>
                  I will return to the office on
                  <Typography.Text strong className="blue-text">
                    {` ${
                      this.state.join_date
                        ? this.state.join_date
                        : "{{return date}}"
                    } `}
                  </Typography.Text>
                  . In case I want to resume the work sooner or later than the
                  stated date, I will let you know well in advance.
                </Typography.Text>
              </div>
              <div className="space" />
              <div className="space">
                Yours Sincerely,
                <div>
                  <Typography.Text strong>
                    {JSON.parse(Cookies.get("profile")).name}
                  </Typography.Text>
                </div>
              </div>
              <div className="big-space" />
              <div className="space">
                <Row gutter={32}>
                  <Col lg={8}>
                    <Divider className="dark-bg" />
                    <div className="App">
                      <Typography.Text strong>J.M. Redwan</Typography.Text>
                      <div>
                        <Typography.Text>Head of IPD</Typography.Text>
                      </div>
                    </div>
                  </Col>
                  <Col lg={8}>
                    <Divider className="dark-bg" />
                    <div className="App">
                      <Typography.Text strong>Omar Faruq Fahim</Typography.Text>
                      <div>
                        <Typography.Text>Head of HR and Admin</Typography.Text>
                      </div>
                    </div>
                  </Col>
                  <Col lg={8}>
                    <Divider className="dark-bg" />
                    <div className="App">
                      <Typography.Text strong>
                        Shahazada M. Redwan
                      </Typography.Text>
                      <div>
                        <Typography.Text>CTO</Typography.Text>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
        {this.state.red}
      </Wrapper>
    );
  }
}

export default ApplyLeave;
