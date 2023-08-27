import React, { Component, Fragment } from "react";
import {
  Icon,
  Typography,
  Row,
  Col,
  Divider,
  Tag,
  Button,
  Empty,
  Avatar,
  Skeleton,
  Popconfirm
} from "antd";
import { getData, postData } from "../../scripts/api-service";
import { Link, Redirect } from "react-router-dom";
import { _slice_ } from "../../scripts/slice";
import { Wrapper } from "../commons/Wrapper";
import { _my_cbs } from "../../scripts/colors";
import { TEAM_APPROVE_DECLINE } from "../../scripts/api";
import { alertPop } from "../../scripts/message";

class CBSDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loading_time: <Skeleton active className="pad" />
    };
  }

  componentWillMount() {
    this.view();
  }

  view = async () => {
    this.setState({ loading: true });
    let res = await getData(
      `cbs/v1/show/${
        this.props.params.cbs_id.split("-")[0] === "org" ||
        this.props.params.cbs_id.split("-")[0] === "bills"
          ? this.props.params.cbs_id.split("-")[1]
          : this.props.params.cbs_id
      }`
    );
    if (res) {
      if (res.data.data) {
        this.setState({
          allData: res.data.data
        });
      } else {
        this.setState({
          loading_time: <Empty className="big-space" />
        });
      }
    }
  };

  approveDecline = async type => {
    let red = <Redirect to='/cbs/team-cbs/1/1' />
    let data = {
        cbs_id : [this.props.params.cbs_id],
        status : type === 'approve' ? 1 : type === 'decline' ? 0 : '',
    }
    let res = await postData(TEAM_APPROVE_DECLINE, data)
    if (res) {
      alertPop('success', `Bill ${type}d`)
      this.setState({
        redirect : red
      })
    }
  }

  render() {
    return (
      <Wrapper style={{position: 'relative'}}>
        <Row className="bottom-bod">
          <Col className="pad" style={{ textAlign: "left" }} lg={12}>
            <Link to={window.location.pathname.split("/details")[0]}>
              <Icon style={{ cursor: "pointer" }} type="arrow-left" />
              <Typography.Text
                style={{
                  paddingLeft: "1rem",
                  userSelect: "none",
                  cursor: "pointer"
                }}
                strong
              >
                Back
              </Typography.Text>
            </Link>
          </Col>
          <Col className="pad" style={{ textAlign: "right" }} lg={12}>
            <Typography.Text strong>
              {this.state.allData
                ? `Date : ${this.state.allData.created_at.split(" ")[0]}`
                : []}
            </Typography.Text>
          </Col>
        </Row>
        {this.state.allData ? (
          <Fragment>
            <Row className="scroll bottom-bod">
              <Col className='side-bod fill-height' lg={16}>
                <Row className="pad">
                  <Col lg={16}>
                    <Typography.Text strong>
                      {this.state.allData
                        ? `Bill of ${this.state.allData.name}`
                        : []}
                    </Typography.Text>
                    <div>
                      <Typography.Text>
                        {this.state.allData
                          ? this.state.allData.purpose
                            ? this.state.allData.purpose
                            : this.state.allData.meeting_id
                          : []}
                      </Typography.Text>
                    </div>
                  </Col>
                  <Col
                    style={{ textAlign: "right" }}
                    lg={{ span: 7, offset: 1 }}
                  >
                    {this.state.allData ? (
                      <Tag
                        style={{ margin: "0" }}
                        color={
                          _my_cbs.color[this.state.allData.status] || "black"
                        }
                      >
                        {this.state.allData.status == 1
                          ? "Pending"
                          : this.state.allData.status == 2
                          ? "Approved By Dept"
                          : this.state.allData.status == 3
                          ? "Approved By Finance"
                          : this.state.allData.status == 4
                          ? "Paid"
                          : this.state.allData.status == 5
                          ? "Declined By Dept"
                          : this.state.allData.status == 6
                          ? "Declined By Finance"
                          : "error"}
                      </Tag>
                    ) : (
                      []
                    )}
                  </Col>
                </Row>
                <div className="space" />
                <Row className="pad" style={{ backgroundColor: "#f4f7fc"}}>
                  {this.state.allData
                    ? this.state.allData.foods.length > 0
                      ? this.state.allData.foods.map(elem => {
                          return (
                            <Fragment>
                              <Col style={{ textAlign: "left" }} lg={18}>
                                <Typography.Text strong>
                                  Food : {elem.food_item}
                                </Typography.Text>
                                <div>
                                  <Typography.Text>
                                    Restaurant : {elem.resturant_name}
                                  </Typography.Text>
                                </div>
                                <div className="space" />
                                <div className="space" />
                              </Col>
                              <Col
                                style={{ textAlign: "right" }}
                                lg={{ span: 5, offset: 1 }}
                              >
                                ‎ ৳ {elem.amount}
                              </Col>
                            </Fragment>
                          );
                        })
                      : []
                    : []}
                  {this.state.allData
                    ? this.state.allData.transports.length > 0
                      ? this.state.allData.transports.map(elem => {
                          return (
                            <Fragment>
                              <Col style={{ textAlign: "left" }} lg={18}>
                                <Typography.Text strong>
                                  Transport : Transport
                                </Typography.Text>
                                <div>
                                  <Typography.Text>
                                    {elem.detail && elem.detail.location
                                      ? `From : ${elem.detail.location.location_from_name}`
                                      : []}
                                  </Typography.Text>
                                </div>
                                <div>
                                  <Typography.Text>
                                    {elem.detail && elem.detail.location
                                      ? `To : ${elem.detail.location.location_to_name}`
                                      : []}
                                  </Typography.Text>
                                </div>
                                <div className="space" />
                                <div className="space" />
                              </Col>
                              <Col
                                style={{ textAlign: "right" }}
                                lg={{ span: 5, offset: 1 }}
                              >
                                ‎ ৳ {elem.detail ? elem.detail.amount : "-"}
                              </Col>
                            </Fragment>
                          );
                        })
                      : []
                    : []}
                  {this.state.allData
                    ? this.state.allData.others.length > 0
                      ? this.state.allData.others.map(elem => {
                          return (
                            <Fragment>
                              <Col style={{ textAlign: "left" }} lg={18}>
                                <Typography.Text strong>
                                  Others : Others
                                </Typography.Text>
                                <div>
                                  <Typography.Text>
                                    Description : {elem.description}
                                  </Typography.Text>
                                </div>
                                <div className="space" />
                                <div className="space" />
                              </Col>
                              <Col
                                style={{ textAlign: "right" }}
                                lg={{ span: 5, offset: 1 }}
                              >
                                ‎ ৳ {elem.amount}
                              </Col>
                            </Fragment>
                          );
                        })
                      : []
                    : []}
                  {this.state.allData ? (
                    <div>
                      <Col style={{ textAlign: "left" }} lg={18}>
                        <Typography.Text strong>Grand total</Typography.Text>
                      </Col>
                      <Col
                        style={{ textAlign: "right" }}
                        lg={{ span: 5, offset: 1 }}
                      >
                        <Typography.Text strong>
                          ৳ {this.state.allData.amount}
                        </Typography.Text>
                      </Col>
                    </div>
                  ) : (
                    []
                  )}
                </Row>
                {this.state.allData ? (
                  this.state.allData.files.length > 0 ? (
                    <div>
                      <div className="space" />
                      <Typography.Text className="pad">
                        Attached files (Invoice)
                      </Typography.Text>
                      <div className="half-pad" />
                      <Divider />
                      <div className="half-pad" />
                      <div className="attendee-grid">
                        {this.state.allData.files.map(elem => {
                          return (
                            <div className="pad">
                              <Button
                                type="primary"
                                // onClick={()=> {window.download(elem.name, '_blank')}}
                                icon="download"
                              >
                                <a href={elem.name} className="a_link" download>
                                  {_slice_(
                                    `${
                                      elem.name
                                        .split("/")
                                        .slice(-1)[0]
                                        .split(".")[0]
                                    }`,
                                    5
                                  ) +
                                    "." +
                                    elem.name
                                      .split("/")
                                      .slice(-1)[0]
                                      .split(".")[1]}
                                </a>
                              </Button>
                            </div>
                          );
                        })}
                        <div className="big-space" />
                      </div>
                    </div>
                  ) : (
                    []
                  )
                ) : (
                  []
                )}
              </Col>
              <Col style={{ height: "100%" }} lg={8}>
                <Row>
                  <Col lg={24}>
                    {this.state.allData ? (
                      this.state.allData.flow.length > 0 ? (
                        this.state.allData.flow.map(elem => {
                          return (
                            <Fragment>
                              <div className="pad">
                                <Typography.Text strong>
                                  Approval
                                </Typography.Text>
                              </div>
                              <Divider style={{ margin: "0" }} />
                              <Row className="pad">
                                <Col lg={4}>
                                  <div>
                                    <Avatar
                                      size="large"
                                      src={elem.user.profile_pic}
                                    />
                                  </div>
                                </Col>
                                <Col style={{ overflow: "hidden" }} lg={12}>
                                  <Typography.Text strong>
                                    {elem.user.name}
                                  </Typography.Text>
                                  <div>
                                    <Typography.Text>
                                      Employee id : {elem.user.emp_id}
                                    </Typography.Text>
                                  </div>
                                </Col>
                                <Col style={{ textAlign: "right" }} lg={8}>
                                  {elem.status === 1 ? (
                                    <Tag color="green" style={{ margin: "0" }}>
                                      Approved
                                    </Tag>
                                  ) : (
                                    <Tag color="red" style={{ margin: "0" }}>
                                      Declined
                                    </Tag>
                                  )}
                                </Col>
                              </Row>
                              <Divider style={{ margin: "0" }} />
                            </Fragment>
                          );
                        })
                      ) : (
                        <Empty style={{ paddingTop: "5rem" }} />
                      )
                    ) : (
                      []
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
            {this.props.params.mod ? (
              <Row className="semi-pad bottom-bod right-text fixed-approve-decline top-bod">
                <Popconfirm
                  title = 'Are you sure to approve this bill?'
                  onConfirm={_=>this.approveDecline('approve')}
                  okText='Approve'
                  okType='primary'
                  >
                    <Button style={{marginRight : '1rem'}} ghost type="primary">Approve</Button>
                  </Popconfirm>
                  <Popconfirm
                  title = 'Are you sure to decline this bill?'
                  onConfirm={_=>this.approveDecline('decline')}
                  okText='Decline'
                  okType='danger'
                  >
                    <Button ghost type="danger">Decline</Button>
                  </Popconfirm>
                {/* <Col span={2}>
                  <Popconfirm
                  title = 'Are you sure to approve this bill?'
                  onConfirm={_=>this.approveDecline('approve')}
                  okText='Approve'
                  okType='primary'
                  >
                    <Button type="primary-green">Approve</Button>
                  </Popconfirm>
                </Col>
                <Col span={1} />
                <Col span={2}>
                <Popconfirm
                  title = 'Are you sure to decline this bill?'
                  onConfirm={_=>this.approveDecline('decline')}
                  okText='Decline'
                  okType='danger'
                  >
                    <Button type="danger">Decline</Button>
                  </Popconfirm>
                </Col> */}
              </Row>
            ) : (
              ""
            )}
          </Fragment>
        ) : (
          this.state.loading_time
        )}
        {this.state.redirect ? this.state.redirect : []}
      </Wrapper>
    );
  }
}

export default CBSDetails;
