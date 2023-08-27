import React, { Component } from "react";
import { Wrapper } from "../commons/Wrapper";
import {
  Row,
  Col,
  Typography,
  Upload,
  Input,
  Button,
  Icon,
  Popover,
  Tag,
  Avatar,
  Skeleton,
  Modal,
  Radio,
  Form,
  DatePicker,
  TimePicker,
  Empty,
} from "antd";
import { getData, postData } from "../../scripts/api-service";
import { busines_task_status_color } from "../../scripts/colors";
import {
  CREATE_GET_BIZ_TASKS,
  TASK_REPORTING_DETAILS,
} from "../../scripts/api";
import dummy from "../../assets/dummy.jpg";
import { Link, withRouter } from "react-router-dom";
import { alertPop } from "../../scripts/message";
import { Fragment } from "react";
import moment from "moment";
import incoming from "../../assets/icons/incoming.svg";
import outgoing from "../../assets/icons/outgoing.svg";

const NOT_FOUND = "Not found";

const status = {
  "To Do": "yellow",
  Doing: "blue",
  Completed: "green",
};

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attached: [],
      api:
        this.props.params.name === "report"
          ? `${TASK_REPORTING_DETAILS}?id=${this.props.params.details}`
          : `${CREATE_GET_BIZ_TASKS}/${this.props.params.details}`,
    };
  }

  componentDidMount() {
    this.view(this.state.api);
  }

  view = async (que) => {
    let res = await getData(que);
    if (res) {
      this.setState({
        allData: res.data.data,
      });
    }
  };

  addFile = async () => {
    this.setState({ file_loading: true });
    if (this.state.attached.length > 0) {
      Promise.all(
        this.state.attached.map(async (val, index) => {
          const formData = new FormData();
          formData.append("file", val);
          formData.append("type", "btask");
          formData.append("reference_id", this.props.params.details);

          let file = await postData("files/v1/upload", formData);
          if (file) {
            alertPop("success", "File uploaded.");
            this.setState(
              {
                allData: null,
              },
              () => {
                this.view(this.state.api);
              }
            );
          }
        })
      ).then(() => {
        this.setState({
          attached: [],
        });
      });
    }
    if (this.state.notes) {
      let data = {
        notes: this.state.notes,
      };
      let res = await postData(
        `${CREATE_GET_BIZ_TASKS}/${this.props.params.details}`,
        data
      );
      if (res) {
        alertPop("success", "Note added.");
        this.setState(
          {
            allData: null,
          },
          () => {
            this.view(this.state.api);
          }
        );
      }
    }
    this.uploadModal();
    this.setState({ file_loading: null });
  };

  changeStatus = async (status, loading_type) => {
    this.setState({ [loading_type]: true });
    let data = {
      status: status,
    };
    let res = await postData(
      `${CREATE_GET_BIZ_TASKS}/${this.props.params.details}`,
      data
    );
    if (res) {
      this.view(this.state.api);
      this.setState({
        [loading_type]: null,
        cancel_modal: null,
      });
    } else {
      this.setState({ [loading_type]: null });
    }
  };

  cancel = () => {
    this.setState({
      cancel_modal: true,
    });
  };

  uploadModal = () => {
    this.setState({
      upload_modal: !this.state.upload_modal,
    });
  };

  postpone = async () => {
    let data = {
      date: this.state.new_date,
      time: this.state.new_time,
    };
    let res = await postData(
      `${CREATE_GET_BIZ_TASKS}/${this.props.params.details}`,
      data
    );
    if (res) {
      this.view(this.state.api);
      this.setState({
        cancel_modal: null,
        postpone: null,
      });
    }
  };

  render() {
    let { allData } = this.state;
    return (
      <Wrapper style={{ position: "relative" }}>
        {allData ? (
          <Row>
            <Col
              className="side-bod fill-height"
              span={this.props.params.name === "report" ? 16 : 24}
            >
              <Row className="pad bottom-bod">
                <Col span={12}>
                  <div className="flex-row">
                    <div
                      onClick={() => {
                        this.props.history.goBack();
                      }}
                    >
                      <Icon style={{ fontSize: "20px" }} type="arrow-left" />
                    </div>
                    <div className="left-pad">
                      <Typography.Text strong>
                        {allData ? allData.type_name : ""}
                      </Typography.Text>
                      <div />
                      <Typography.Text className="sub-title">
                        {`Created by ${
                          allData ? allData.creator_profile.name : ""
                        }`}
                      </Typography.Text>
                    </div>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="full-width flex-col">
                    <div className="full-width right-text">
                      <Tag
                        color={
                          busines_task_status_color.color[
                            allData.status || "pending"
                          ]
                        }
                      >
                        {allData.status.charAt(0).toUpperCase() +
                          allData.status.substring(1) || NOT_FOUND}
                      </Tag>
                      <Typography.Text strong className="left-pad sub-title">
                        {allData
                          ? moment(new Date(allData.date)).format("DD MMMM YY")
                          : ""}
                      </Typography.Text>
                    </div>
                    <div className="full-width right-text sub-title">
                      <Typography.Text>
                        {allData
                          ? moment(allData.time, "HH:mm:ss").format("LT")
                          : ""}
                      </Typography.Text>
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="side-pad bottom-bod">
                <div className="half-pad" />
                <Row>
                  <Col span={8}>
                    <Icon className="right-pad" type="bank" />
                    <Typography.Text>
                      {allData
                        ? allData.company_info
                          ? allData.company_info.name
                          : NOT_FOUND
                        : ""}
                    </Typography.Text>
                  </Col>
                  <Col span={8}>
                    <Icon className="right-pad" type="environment" />
                    {allData &&
                    allData.company_details &&
                    allData.company_details.company_branch
                      ? allData.company_details.company_branch.location_address
                      : NOT_FOUND}
                  </Col>
                </Row>
                <div className="half-pad" />
                <Row>
                  <Col span={8}>
                    <Icon className="right-pad" type="idcard" />
                    <Typography.Text>
                      {allData &&
                      allData.company_details &&
                      allData.company_details.name
                        ? allData.company_details.name
                        : NOT_FOUND}
                    </Typography.Text>
                  </Col>
                  <Col span={8}>
                    <Icon className="right-pad" type="phone" />
                    {allData &&
                    allData.company_details &&
                    allData.company_details.phone
                      ? allData.company_details.phone
                      : NOT_FOUND}
                  </Col>
                </Row>
                <div className="half-pad" />
              </div>
              <div className="flex_r pad bottom-bod">
                <Icon type="user" />
                {allData
                  ? allData.attendees.slice(0, 6).map((elem) => {
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
                  allData.attendees.length > 6 ? (
                    <Popover
                      trigger="click"
                      content={
                        allData
                          ? allData.attendees.map((head) => {
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
              <div className="pad">
                <Typography.Text>
                  {allData?.remarks ? (
                    allData.remarks
                  ) : (
                    <Empty
                      description={
                        <Typography.Text className="sub-title">
                          No remarks added
                        </Typography.Text>
                      }
                      className="pad"
                    />
                  )}
                </Typography.Text>
              </div>
              {allData?.notes ? (
                <div className="pad top-bod">
                  <Typography.Text strong>Notes</Typography.Text>
                  <div className="mini-pad" />
                  <Typography.Text>{allData.notes}</Typography.Text>
                </div>
              ) : (
                ""
              )}
              {allData?.files && allData?.files.length > 0 ? (
                <div className="pad top-bod">
                  <Typography.Text strong>Files</Typography.Text>
                  <div className="mini-pad" />
                  <div className="attendee-grid">
                    {allData.files.map((elem) => {
                      return (
                        <div className="right-pad">
                          <Button
                            icon="download"
                            onClick={(_) => window.open(elem.name, "blank")}
                            type="primary"
                            key={elem.name}
                          >
                            Attachment
                          </Button>
                          <div className="mini-pad" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="semi-pad bottom-bod right-text fixed-start-cancel top-bod">
                {allData && allData.status ? (
                  allData.status === "pending" ? (
                    <div>
                      <Button
                        className="side-pad-wide"
                        loading={this.state.start_loading}
                        onClick={(_) =>
                          this.changeStatus("running", "start_loading")
                        }
                        type="primary-green"
                      >
                        Start
                      </Button>
                      <Button
                        className="side-pad-wide"
                        loading={this.state.cancel_loading}
                        onClick={this.cancel}
                        style={{ marginLeft: "1rem" }}
                        type="danger"
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : allData.status === "running" ? (
                    <div>
                      <Button
                        loading={this.state.end_loading}
                        onClick={(_) =>
                          this.changeStatus("completed", "end_loading")
                        }
                        type="danger"
                      >
                        End
                      </Button>
                    </div>
                  ) : allData.status === "completed" ? (
                    <div>
                      <Button onClick={this.uploadModal} type="primary">
                        Add notes
                      </Button>
                      <Typography.Text className="left-pad" strong>
                        Completed
                      </Typography.Text>
                    </div>
                  ) : allData.status === "cancelled" ? (
                    <div className="half-pad">
                      <Typography.Text strong>Cancelled</Typography.Text>
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  "Server error"
                )}
              </div>
            </Col>
            <Col
              className="p-bg-blue pad fill-height"
              span={this.props.params.name === "report" ? 8 : 0}
            >
              <div className="flex-col">
                <div className="flex-row flex-centered">
                  <Typography.Text className="full-width" strong>
                    Call log
                  </Typography.Text>
                  {/* <Button>Filter</Button> */}
                </div>
                <div className="half-pad" />
                {allData?.call_log && allData?.call_log.length > 0 ? (
                  allData.call_log.map((log) => {
                    return (
                      <div key={log.id}>
                        <div className="pad p-bg-light full-width flex-row rounded">
                          <div>
                            <div className="icon-container-round">
                              <img
                                src={
                                  log.type === "incoming" ? incoming : outgoing
                                }
                                alt="icon"
                                className="icon"
                              />
                            </div>
                          </div>
                          <div className="left-pad full-width">
                            <Typography.Text strong>
                              {log.number}
                            </Typography.Text>
                            <div>
                              <Typography.Text className="sub-title gray-text">
                                {log.name}
                              </Typography.Text>
                            </div>
                            <div className="mini-pad">
                              <Typography.Text className="sub-title">
                                {log.duration
                                  ? log.duration > 60
                                    ? `${Math.floor(
                                        log.duration / 60
                                      )} Minute ${Math.floor(
                                        log.duration % 60
                                      )} Second`
                                    : `${log.duration} Second`
                                  : NOT_FOUND}
                              </Typography.Text>
                            </div>
                            <div>
                              <Tag
                                color={
                                  log.type === "incoming"
                                    ? busines_task_status_color.color.running
                                    : busines_task_status_color.color.completed
                                }
                              >
                                {log.type}
                              </Tag>
                            </div>
                          </div>
                          <div className="flex-col right-text full-width">
                            <Typography.Text
                              strong
                              className="gray-text sub-title"
                            >
                              {moment(new Date(log.date)).format(
                                "DD MMMM YYYY"
                              )}
                            </Typography.Text>
                            <div>
                              <Typography.Text className="gray-text sub-title">
                                {moment(log.time, "hh:mm:ss").format("LT")}
                              </Typography.Text>
                            </div>
                          </div>
                        </div>
                        <div className="half-pad" />
                      </div>
                    );
                  })
                ) : (
                  <Empty />
                )}
              </div>
            </Col>
          </Row>
        ) : (
          <Skeleton active className="pad" />
        )}
        <Modal
          onCancel={() => {
            this.setState({
              cancel_modal: null,
            });
          }}
          title="Cancel meeting"
          visible={this.state.cancel_modal}
          footer={false}
        >
          <Typography.Text strong>
            What is the reason for cancelling?
          </Typography.Text>
          <div className="semi-pad" />
          <Radio.Group
            onChange={(e) => {
              if (e.target.value === "postpone") {
                this.setState({
                  postpone: true,
                });
              } else {
                this.setState({
                  postpone: null,
                });
              }
            }}
          >
            <Radio value="postpone">Change schedule</Radio>
            <div className="half-pad" />
            <Radio value="cancel">Meeting cancelled</Radio>
          </Radio.Group>
          <div className="pad" />
          {this.state.postpone ? (
            <Fragment>
              <Form.Item required label="New meeting date">
                <DatePicker
                  onChange={(date, date_string) => {
                    this.setState({
                      new_date: date_string,
                    });
                  }}
                />
              </Form.Item>
              <Form.Item required label="New meeting time">
                <TimePicker
                  style={{ width: "100%" }}
                  format={"HH:mm"}
                  onChange={(time, time_string) => {
                    this.setState({
                      new_time: time_string,
                    });
                  }}
                />
              </Form.Item>
            </Fragment>
          ) : (
            ""
          )}
          <Button
            onClick={() => {
              if (this.state.postpone) {
                if (this.state.new_date && this.state.new_time) {
                  this.postpone();
                } else {
                  alertPop("error", "Provide new time and date.");
                }
              } else {
                this.changeStatus("cancelled", "cancelled_loading");
              }
            }}
            type="primary"
            block
            size="large"
          >
            Submit
          </Button>
        </Modal>
        <Modal
          title="Add notes"
          centered
          visible={this.state.upload_modal}
          footer={null}
          onCancel={this.uploadModal}
        >
          <div>
            <Form.Item label="Files">
              <Upload.Dragger
                onRemove={(file) => {
                  const index = this.state.attached.indexOf(file);
                  const newFileList = this.state.attached.slice();
                  newFileList.splice(index, 1);
                  this.setState({
                    attached: newFileList,
                  });
                }}
                beforeUpload={(file) => {
                  file.size / 1024 / 1024 < 2
                    ? this.setState({
                        attached: [...this.state.attached, file],
                      })
                    : alertPop("error", "File must be smaller than 2MB");
                  return false;
                }}
                fileList={this.state.attached}
              >
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <Typography.Text strong>Drag or browse files</Typography.Text>
                <div>
                  <Typography.Text>(doc, docx, pdf, jpg)</Typography.Text>
                </div>
              </Upload.Dragger>
            </Form.Item>
            <div className="half-pad" />
            <Form.Item label="Notes">
              <Input.TextArea
                placeholder="Write notes"
                style={{ minHeight: "100px" }}
                onChange={(e) => {
                  this.setState({
                    notes: e.target.value,
                  });
                }}
              />
            </Form.Item>
            <Button
              loading={this.state.file_loading}
              onClick={this.addFile}
              type="primary"
              block
              size="large"
            >
              Add
            </Button>
          </div>
        </Modal>
      </Wrapper>
    );
  }
}

export default withRouter((props) => <Details {...props} />);

