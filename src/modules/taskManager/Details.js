import React, { Component } from "react";
import { Wrapper } from "../commons/Wrapper";
import {
  Row,
  Col,
  Typography,
  Select,
  Button,
  Icon,
  Popover,
  Tag,
  Avatar,
  Skeleton,
  Modal,
  Input,
  Empty,
} from "antd";
import { getData, postData } from "../../scripts/api-service";
import { task_manager_priority } from "../../scripts/colors";
import {
  CREATE_GET_TASKS,
  DELETE_TASK,
  TASK_COMMENTS,
} from "../../scripts/api";
import dummy from "../../assets/dummy.jpg";
import { Link, withRouter } from "react-router-dom";
import { alertPop } from "../../scripts/message";
import moment from "moment";

const status = {
  "To Do": "yellow",
  Doing: "blue",
  Completed: "green",
  Reviewed: "orange",
};

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status_modal: false,
    };
  }

  componentDidMount() {
    this.view(`${CREATE_GET_TASKS}/${this.props.params.details}`);
    this.getComments();
  }

  getComments = async () => {
    let res = await getData(
      `${TASK_COMMENTS}?task_id=${this.props.params.details}`
    );
    if (res?.data?.data) {
      this.setState({
        comments: res.data.data,
      });
    }
  };

  view = async (que) => {
    let res = await getData(que);
    if (res) {
      this.setState({
        allData: res.data.data,
        status: res.data.data.status,
      });
    }
  };

  statusModal = () => {
    this.setState({
      status_modal: !this.state.status_modal,
    });
  };

  changeStatus = async () => {
    this.setState({ status_loading: true });
    let data = {
      status: this.state.status_temp,
    };
    let res = await postData(
      `${CREATE_GET_TASKS}/${this.props.params.details}`,
      data
    );
    if (res) {
      this.setState(
        {
          status: this.state.status_temp,
          status_loading: null,
        },
        () => {
          this.statusModal();
        }
      );
    } else {
      this.setState({
        status_loading: null,
      });
    }
  };

  deleteTask = async () => {
    let res = await postData(`${DELETE_TASK}/${this.props.params.details}`, {});
    if (res) {
      alertPop("success", "Task deleted.");
      this.props.history.goBack();
    }
  };

  comment = async () => {
    if (this.state.newComment) {
      this.setState({ commentLoading: true });
      let data = {
        task_id: this.props.params.details,
        comment: this.state.newComment,
      };
      let res = await postData(TASK_COMMENTS, data);
      if (res) {
        this.setState({ newComment: null });
        this.getComments();
        alertPop("success", "Comment added");
      }
      this.setState({ commentLoading: null });
    }
  };

  render() {
    let { allData } = this.state;
    return (
      <Wrapper>
        {allData && this.state.status ? (
          <div>
            <div className="pad bottom-bod">
              <Row>
                <Col span={12}>
                  <Typography.Text strong>
                    {allData ? allData.title : ""}
                  </Typography.Text>
                  <div />
                  <Typography.Text className="sub-title">
                    {`Created by ${
                      allData ? allData.creator_profile.name : ""
                    }`}
                  </Typography.Text>
                </Col>
                <Col className="flex_r" md={{ offset: 6, span: 6 }}>
                  <Select
                    onChange={(e) => {
                      this.setState(
                        {
                          status_temp: e,
                        },
                        () => {
                          this.statusModal();
                        }
                      );
                    }}
                    className={`right-pad colored-select-${
                      status[this.state.status]
                    }`}
                    size="large"
                    value={this.state.status}
                  >
                    <Select.Option value="To Do">To do</Select.Option>
                    <Select.Option value="Doing">Doing</Select.Option>
                    <Select.Option value="Completed">Completed</Select.Option>
                    <Select.Option value="Reviewed">Reviewed</Select.Option>
                  </Select>
                  <Popover
                    placement="bottomRight"
                    trigger="click"
                    content={
                      <div
                        style={{ margin: "-0.5rem -0.7rem" }}
                        className="flex_c"
                      >
                        <Link
                          style={{ width: "100%" }}
                          className="P-HOVER left-text"
                          to={`/tasks/${this.props.params.name}/${this.props.params.page}/${this.props.params.status}/${this.props.params.details}/update`}
                        >
                          <Button
                            className="left-text"
                            icon="edit"
                            type="link"
                            block
                          >
                            <span style={{ color: "#2f251c" }}>Edit</span>
                          </Button>
                        </Link>
                        <Button
                          className="P-HOVER left-text"
                          icon="delete"
                          type="link"
                          onClick={this.deleteTask}
                          block
                        >
                          <span style={{ color: "#2f251c" }}>Delete</span>
                        </Button>
                      </div>
                    }
                  >
                    <Button size="large" icon="more" />
                  </Popover>
                </Col>
              </Row>
            </div>
            <div className="side-pad bottom-bod">
              <div className="half-pad" />
              <Row>
                <Col span={12}>
                  <Icon className="right-pad" type="folder-open" />
                  <Typography.Text>
                    {allData ? allData.project.title : ""}
                  </Typography.Text>
                </Col>
                <Col span={6}>
                  <Icon className="right-pad" type="tag" />
                  <Tag
                    color={
                      task_manager_priority[allData ? allData.label : "High"]
                    }
                  >
                    {allData ? allData.label : ""}
                  </Tag>
                </Col>
                <Col span={6}>
                  <Icon className="right-pad" type="calendar" />
                  <Typography.Text>
                    {allData ? allData.due_date : ""}
                  </Typography.Text>
                </Col>
              </Row>
              <div className="half-pad" />
            </div>
            <Row>
              <Col span={12}>
                <div className="flex_r pad bottom-bod side-bod">
                  <Icon type="user" />
                  {allData
                    ? allData.members.slice(0, 6).map((elem) => {
                        return (
                          <div className="left-pad">
                            <Popover content={elem.profile.name}>
                              <Avatar
                                size="small"
                                src={elem.profile.profile_pic}
                              />
                            </Popover>
                          </div>
                        );
                      })
                    : ""}
                  {allData ? (
                    allData.members.length > 6 ? (
                      <Popover
                        trigger="click"
                        content={
                          allData
                            ? allData.members.map((head) => {
                                return (
                                  <div key={head.profile.emp_id}>
                                    <Avatar
                                      size="medium"
                                      src={head.profile.profile_pic || dummy}
                                    />
                                    <Typography.Text className="left-pad">
                                      {head.profile.name}
                                    </Typography.Text>
                                    <div className="half-pad" />
                                  </div>
                                );
                              })
                            : ""
                        }
                      >
                        <Button type="link">Show list</Button>
                      </Popover>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </div>
              </Col>
              <Col className="flex_r bottom-bod side-pad" span={12}>
                {allData ? (
                  allData.members.map((elem) => {
                    if (elem.leader && elem.leader === 1) {
                      return (
                        <>
                          <Icon type="user" />
                          <div className="left-pad flex-row">
                            <div className="vertical-pad">
                              <Popover content={elem.profile?.name}>
                                <Avatar
                                  size="small"
                                  src={elem.profile?.profile_pic}
                                />
                              </Popover>
                            </div>
                            <div className="flex-col half-pad">
                              <Typography.Text className="sub-title">
                                Task Lead
                              </Typography.Text>
                              <div>
                                <Typography.Text>
                                  {elem.profile?.name}
                                </Typography.Text>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    }
                  })
                ) : (
                  ''
                )}
              </Col>
            </Row>
            <div className="pad bottom-bod">
              <Typography.Paragraph ellipsis={{ rows: 2, expandable: true }}>
                {allData ? allData.description : ""}
              </Typography.Paragraph>
            </div>
            <div className="pad">
              <Typography.Text strong>
                {`Comments (${
                  this.state.comments ? this.state.comments.length : 0
                })`}
              </Typography.Text>
            </div>
            {/* comment section */}
            <div>
              {this.state.comments ? (
                this.state.comments.length < 1 ? (
                  <Empty style={{ minHeight: "50vh" }} className="pad" />
                ) : (
                  <div style={{ minHeight: "50vh" }}>
                    {this.state.comments.map((elem) => {
                      return (
                        <div className="side-pad">
                          <div className="p-bg-blue flex-row pad">
                            <div className="right-pad">
                              <Avatar
                                size="large"
                                src={elem.profile?.profile_pic || dummy}
                              />
                            </div>
                            <div className="flex-col full-width">
                              {/* name and date */}
                              <div className="flex-row">
                                <div className="full-width">
                                  <Typography.Text strong>
                                    {elem.profile?.name}
                                  </Typography.Text>
                                </div>
                                <div className="full-width right-text">
                                  <Typography.Text className="sub-title">
                                    {moment(
                                      elem.created_at,
                                      "YYYY-MM-DD hh:mm:ss"
                                    ).format("DD MMMM YYYY")}
                                  </Typography.Text>
                                </div>
                              </div>
                              {/* comment */}
                              <div className="half-pad" />
                              <div>
                                <Typography.Text className="gray-text multi-line-text">
                                  {elem.comment}
                                </Typography.Text>
                              </div>
                            </div>
                          </div>
                          <div className="half-pad" />
                        </div>
                      );
                    })}
                  </div>
                )
              ) : (
                <Skeleton active className="pad" />
              )}
              <div className="white-bg pad sticky-at-bottom flex-row top-bod">
                <div className="flex-row centered right-pad">
                  <Icon type="message" />
                </div>
                <div className="right-pad full-width">
                  <Input.TextArea
                    // onPressEnter={this.comment}
                    value={this.state.newComment || []}
                    onChange={(e) => {
                      this.setState({
                        newComment: e.target.value,
                      });
                    }}
                    className="comment-input"
                    autoSize
                    placeholder="Write your comment here"
                  />
                </div>
                <div style={{ width: "15%" }}>
                  <Button
                    onClick={this.comment}
                    block
                    type="primary"
                    loading={this.state.commentLoading}
                  >
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Skeleton active className="pad" />
        )}
        <Modal
          visible={this.state.status_modal && this.state.status_temp}
          title="Are you sure?"
          onOk={this.changeStatus}
          onCancel={this.statusModal}
          confirmLoading={this.state.status_loading}
        >
          {`Change the task status to '${this.state.status_temp}'.`}
        </Modal>
      </Wrapper>
    );
  }
}

export default withRouter((props) => <Details {...props} />);
