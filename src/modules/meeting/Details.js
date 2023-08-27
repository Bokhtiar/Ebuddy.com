import React, { Component, Fragment } from "react";
import styled from "styled-components";
import completed from "../../assets/meeting_complete.svg";
import { alertPop } from "../../scripts/message";
import * as moment from "moment";
import { getData } from "../../scripts/getData";
import { postData } from "../../scripts/postData";
import { checkRes, errorHandle, error404 } from "../../scripts/error";
import {
  Typography,
  Tag,
  Row,
  Col,
  Button,
  Popover,
  Popconfirm,
  Divider,
  Avatar,
  Tooltip,
  Modal,
  Timeline,
  Icon,
  Form,
  DatePicker,
  TimePicker,
  Skeleton,
  Result,
  Upload,
  Input,
} from "antd";
import { _meeting_ } from "../../scripts/colors";
import { _slice_ } from "../../scripts/slice";
import { Redirect } from "react-router-dom";

const Wrapper = styled.div`
  height: 100vh;
  overflow: auto;
  padding-top: 4rem;
`;

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      no_data: <Skeleton className="pad" active />,
      uploadModal: false,
      attached: [],
    };
  }

  componentWillMount() {
    this.view();
  }

  modal = () => {
    this.setState({
      modal: !this.state.modal,
      modal_values: null,
      new_date: null,
      start_from: null,
      end_time: null,
    });
  };

  uploadModal = () => {
    this.setState({
      uploadModal: !this.state.uploadModal,
      attached: [],
      notes: null,
    });
  };

  // meeting start-end-postpone method
  toogleMeeting = async (toggle) => {
    this.setState({ toggleMeeting: true });
    let data = { id: this.props.params.id };
    let link = "rooms/v1/meeting/update";
    let notification = "";
    let modal = false;

    if (toggle === "start") {
      data = { ...data, status: 5 };
      notification = "Meeting started";
    } else if (toggle === "end") {
      data = { ...data, status: 6 };
      notification = "Meeting ended";
    } else if (toggle === "postpone") {
      data = {
        ...data,
        attendees: this.state.emp_id,
        date: this.state.new_date,
        time_from: this.state.start_from,
        time_to: this.state.end_time,
      };
      link = "rooms/v1/meeting/postpone";
      notification = "Meeting postponed";
      modal = true;
    }

    let res = await postData(link, data);
    if (res) {
      if (checkRes(res.status)) {
        this.view();
        alertPop("success", notification);
        if (modal) {
          // --------if 'postpone' then close the modal---------
          this.modal();
        }
      } else {
        res.map((elem) => {
          alertPop("error", elem);
        });
      }
    } else {
      errorHandle(res);
    }
    this.setState({ toggleMeeting: null });
  };

  addFile = async () => {
    this.setState({ file_loading: true });
    if (this.state.attached.length > 0) {
      Promise.all(
        this.state.attached.map(async (val, index) => {
          const formData = new FormData();
          formData.append("file", val);
          formData.append("type", "meeting");
          formData.append("reference_id", this.props.params.id);

          let file = await postData("files/v1/upload", formData);
          if (file) {
            if (checkRes(file.status)) {
              //
            } else {
              alertPop("error", "File could not be uploaded!");
            }
          } else {
            errorHandle(file);
          }
        })
      ).then(() => {
        this.setState({
          attached: [],
        });
        this.view();
        alertPop("success", "File uploaded.");
      });
    }
    if (this.state.notes) {
      let data = {
        meeting_id: this.props.params.id,
        text: this.state.notes,
      };
      let res = await postData("rooms/v1/meeting/add-notes", data);
      if (res) {
        if (checkRes(res.status)) {
          alertPop("success", "Note added.");
        } else {
          alertPop("error", "Failed to add note!");
        }
      } else {
        errorHandle(res);
      }
    }
    this.view();
    this.uploadModal();
    this.setState({ file_loading: null });
  };

  fileDelete = async (fileToDelete) => {
    let res = await postData(`files/v1/delete/${fileToDelete}`, {});
    if (res) {
      if (checkRes(res.status)) {
        this.view();
        alertPop("success", "File deleted.");
      } else {
        res.map((elem) => {
          alertPop("error", elem);
        });
      }
    } else {
      errorHandle(res);
    }
  };

  meetingDelete = async () => {
    let red = <Redirect to={`/meeting/${this.props.params.name}/1/1`} />;
    let data = {
      id: this.props.params.id,
      status: 3,
    };
    let res = await postData("rooms/v1/meeting/update", data);
    if (res) {
      alertPop("success", "Meeting canceled");
      this.setState({
        redirect: red,
      });
    }
  };

  view = async () => {
    let meeting_response = await getData(
      `rooms/v1/meeting/list?id=${this.props.params.id}`
    );
    let transport_response = await getData(
      `transport/v1/transport-list?meeting_id=${this.props.params.id}`
    );
    try {
      if (checkRes(meeting_response.status) && meeting_response.data.data) {
        this.setState({
          meeting_data: meeting_response.data.data,
        });
      } else {
        alertPop("error", "Not found.");
        this.setState({
          no_data: <Result status="404" title="404" subTitle="Not found." />,
        });
      }
      if (checkRes(transport_response.status)) {
        this.setState({
          transport_data: transport_response.data.data,
        });
      } else {
        alertPop("error", "Not found.");
      }
    } catch (error) {
      alertPop("error", error);
      this.setState({
        no_data: <Result status="404" title="404" subTitle="Not found." />,
      });
    }
  };

  render() {
    return (
      <Wrapper>
        {this.state.meeting_data ? (
          <div>
            <Row className="pad">
              <Col lg={22}>
                <Typography.Title level={4}>
                  {this.state.meeting_data.booking_details
                    ? this.state.meeting_data.booking_details.title
                    : []}
                </Typography.Title>
                <div>
                  <Typography.Text className="right-pad">
                    {this.state.meeting_data.details
                      ? this.state.meeting_data.details.meeting_location
                      : []}
                  </Typography.Text>
                  <Tag color={_meeting_.color[this.state.meeting_data.status]}>
                    {_meeting_.title[this.state.meeting_data.status]}
                  </Tag>
                </div>
              </Col>
              <Col className="right-text" lg={{ span: 1, offset: 1 }}>
                {this.state.meeting_data.status == 1 ||
                this.state.meeting_data.status == 2 ||
                this.state.meeting_data.status == 5 ? (
                  <Popover
                    placement="leftTop"
                    content={
                      <Fragment>
                        <Typography.Text className="right-pad">
                          Are you sure?
                        </Typography.Text>
                        <Button onClick={this.meetingDelete} type="danger">
                          Cancel meeting
                        </Button>
                      </Fragment>
                    }
                    trigger="click"
                  >
                    <Button icon="delete" />
                  </Popover>
                ) : (
                  ""
                )}
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col className="side-bod pad meeting-details-container" lg={18}>
                <Row>
                  <Col lg={8} className="right-pad meeting-icon-container">
                    <Typography.Text className="right-pad">
                      <i class="material-icons icon">room</i>
                    </Typography.Text>
                    <Typography.Text>
                      {this.state.meeting_data.details.location_address
                        ? this.state.meeting_data.details.location_address
                        : this.state.meeting_data.booking_details.room_id
                        ? `${this.state.meeting_data.booking_details.room_id.branch.title},
                                                ${this.state.meeting_data.booking_details.room_id.floor.title},
                                                ${this.state.meeting_data.booking_details.room_id.unique_name}`
                        : `N/A`}
                    </Typography.Text>
                  </Col>
                  <Col lg={8} className="right-pad meeting-icon-container">
                    <Typography.Text className="right-pad">
                      <i class="material-icons icon">event</i>
                    </Typography.Text>
                    <div>
                      <Typography.Text strong>
                        {moment(
                          this.state.meeting_data.booking_details.date
                        ).format("DD MMM YYYY") || "00:00"}
                      </Typography.Text>
                      <div>
                        <Typography.Text>
                          <span>
                            {`${
                              moment(
                                this.state.meeting_data.booking_details
                                  .time_from,
                                "h:mm:ss"
                              ).format("LT") || "00:00"
                            } - `}
                          </span>
                          <span>
                            {moment(
                              this.state.meeting_data.booking_details.time_to,
                              "h:mm:ss"
                            ).format("LT") || "00:00"}
                          </span>
                        </Typography.Text>
                      </div>
                    </div>
                  </Col>
                  <Col lg={8} className="right-pad meeting-icon-container">
                    <Typography.Text className="right-pad">
                      <i class="material-icons icon">directions_car</i>
                    </Typography.Text>
                    <div>
                      {this.state.transport_data &&
                      this.state.transport_data.length > 0 ? (
                        this.state.transport_data.slice(0, 1).map((elem) => {
                          return (
                            <Timeline>
                              <Timeline.Item
                                dot={<Icon type="user" />}
                                color="lightgray"
                              >
                                <Typography.Text>
                                  {elem.location.location_from_name}
                                </Typography.Text>
                              </Timeline.Item>
                              <Timeline.Item
                                dot={<Icon type="environment" />}
                                color="lightgray"
                              >
                                <Typography.Text>
                                  {elem.location.location_to_name}
                                </Typography.Text>
                              </Timeline.Item>
                            </Timeline>
                          );
                        })
                      ) : (
                        <Typography.Text>No transport used</Typography.Text>
                      )}
                      {this.state.transport_data &&
                      this.state.transport_data.length > 1 ? (
                        <Fragment>
                          <br />
                          <Popover
                            placement="top"
                            content={
                              <Fragment>
                                <Typography.Text strong>
                                  Transports
                                </Typography.Text>
                                <div className="half-pad" />
                                <Divider />
                                <div className="half-pad" />
                                {this.state.transport_data.map((elem) => {
                                  return (
                                    <Fragment>
                                      <Timeline>
                                        <Timeline.Item
                                          dot={<Icon type="user" />}
                                          color="lightgray"
                                        >
                                          <Typography.Text>
                                            {elem.location.location_from_name}
                                          </Typography.Text>
                                        </Timeline.Item>
                                        <Timeline.Item
                                          dot={<Icon type="environment" />}
                                          color="lightgray"
                                        >
                                          <Typography.Text>
                                            {elem.location.location_to_name}
                                          </Typography.Text>
                                        </Timeline.Item>
                                      </Timeline>
                                      <br />
                                      <Divider />
                                      <br />
                                    </Fragment>
                                  );
                                })}
                              </Fragment>
                            }
                            trigger="click"
                          >
                            <Button type="primary" size="small" block ghost>
                              + {this.state.transport_data.length - 1}
                            </Button>
                          </Popover>
                        </Fragment>
                      ) : (
                        []
                      )}
                    </div>
                  </Col>
                </Row>
                <div className="pad" />
                <Row>
                  <Col lg={8} className="right-pad meeting-icon-container">
                    <Typography.Text className="right-pad">
                      <i class="material-icons icon">perm_contact_calendar</i>
                    </Typography.Text>
                    <div>
                      <Typography.Text strong>
                        {this.state.meeting_data.details
                          .meeting_with_person_name
                          ? this.state.meeting_data.details
                              .meeting_with_person_name
                          : this.state.meeting_data
                              .company_branch_contact_person
                          ? this.state.meeting_data
                              .company_branch_contact_person.name
                          : ""}
                      </Typography.Text>
                      <div>
                        <Typography.Text>
                          {this.state.meeting_data.details
                            .meeting_with_person_contact
                            ? `${this.state.meeting_data.details.meeting_with_person_contact},`
                            : this.state.meeting_data.company
                            ? `${this.state.meeting_data.company.name},`
                            : "N/A"}
                          {this.state.meeting_data.details
                            .meeting_with_person_company
                            ? this.state.meeting_data.details
                                .meeting_with_person_company
                            : this.state.meeting_data.company_branch
                            ? this.state.meeting_data.company_branch
                                .location_address
                            : ""}
                        </Typography.Text>
                      </div>
                    </div>
                  </Col>
                  <Col lg={8} className="right-pad meeting-icon-container">
                    <Typography.Text className="right-pad">
                      <i class="material-icons icon">group</i>
                    </Typography.Text>
                    <div>
                      <Typography.Text strong>Attendee</Typography.Text>
                      <div className="half-pad" />
                      <div className="flex_r">
                        {this.state.meeting_data.booking_details.attendees
                          .length > 0 ? (
                          this.state.meeting_data.booking_details.attendees
                            .slice(0, 2)
                            .map((elem) => {
                              return (
                                <div className="right-pad">
                                  <Tooltip title={elem.name}>
                                    <Avatar src={elem.profile_pic} />
                                  </Tooltip>
                                </div>
                              );
                            })
                        ) : (
                          <Typography.Text>No attendees</Typography.Text>
                        )}
                        {this.state.meeting_data.booking_details.attendees
                          .length > 2 ? (
                          <Popover
                            placement="top"
                            trigger="click"
                            content={
                              <Fragment>
                                <Typography.Text strong>
                                  All attendees
                                </Typography.Text>
                                <div className="half-pad" />
                                <Divider />
                                <div className="half-pad" />
                                {this.state.meeting_data.booking_details.attendees.map(
                                  (elem) => {
                                    return (
                                      <Fragment>
                                        <div className="flex_r">
                                          <div className="right-pad">
                                            <Avatar src={elem.profile_pic} />
                                          </div>
                                          <div>
                                            <Typography.Text>
                                              {elem.name}
                                            </Typography.Text>
                                          </div>
                                        </div>
                                        <div className="half-pad" />
                                      </Fragment>
                                    );
                                  }
                                )}
                              </Fragment>
                            }
                          >
                            <Button type="primary" shape="circle" ghost>
                              <Typography.Text>
                                +
                                {this.state.meeting_data.booking_details
                                  .attendees.length - 2}
                              </Typography.Text>
                            </Button>
                          </Popover>
                        ) : (
                          []
                        )}
                      </div>
                    </div>
                  </Col>
                  <Col lg={8} className="right-pad meeting-icon-container">
                    <Typography.Text className="right-pad">
                      <i class="material-icons icon">format_list_bulleted</i>
                    </Typography.Text>
                    <div>
                      <Typography.Text strong>
                        Discussion points
                      </Typography.Text>
                      <div>
                        <Typography.Text>
                          {this.state.meeting_data.booking_details
                            .discussion_point || "Empty"}
                        </Typography.Text>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col lg={6}>
                {this.state.meeting_data ? (
                  this.state.meeting_data.status === 1 ? (
                    <div className="flex_c big-space">
                      <Typography.Text>
                        Click to start the meeting
                      </Typography.Text>
                      <div className="big-space" />
                      <Button
                        loading={this.state.toggleMeeting}
                        onClick={(_) => this.toogleMeeting("start")}
                        type="primary"
                        ghost
                      >
                        Start
                      </Button>
                      <div className="half-pad" />
                      <Typography.Text
                        onClick={this.modal}
                        className="force_link"
                      >
                        Postpone
                      </Typography.Text>
                    </div>
                  ) : this.state.meeting_data.status === 5 ? (
                    <Fragment>
                      <div className="flex_c big-space">
                        <Typography.Text>
                          Meeting is in progress
                        </Typography.Text>
                        <div className="big-space" />
                        <Button
                          loading={this.state.toggleMeeting}
                          onClick={(_) => this.toogleMeeting("end")}
                          type="danger"
                          ghost
                        >
                          Finish
                        </Button>
                      </div>
                    </Fragment>
                  ) : this.state.meeting_data.status === 6 ? (
                    <Fragment>
                      <div className="flex_c pad">
                        <img
                          className="half-image"
                          src={completed}
                          alt="Meeting completed"
                        />
                        <div>
                          <Typography.Text code strong>
                            Meeting completed
                          </Typography.Text>
                        </div>
                      </div>
                    </Fragment>
                  ) : (
                    []
                  )
                ) : (
                  []
                )}
              </Col>
            </Row>
            <Divider />
            <div className="pad P-BG">
              <Typography.Text className="right-pad" strong>
                Meeting minutes
              </Typography.Text>
              <Button
                onClick={this.uploadModal}
                type="primary"
                size="small"
                ghost
              >
                + Add
              </Button>
            </div>
            <Divider />
            {this.state.meeting_data.notes ||
            this.state.meeting_data.files.length > 0 ? (
              <div className="pad P-BG">
                {this.state.meeting_data.notes ? (
                  <Fragment>
                    <Typography.Text>
                      {this.state.meeting_data.notes || []}
                    </Typography.Text>
                    <div className="pad" />
                  </Fragment>
                ) : (
                  []
                )}
                {this.state.meeting_data.files.length > 0 ? (
                  <Fragment>
                    <div className="attendee-grid">
                      {this.state.meeting_data.files.map((elem) => {
                        return (
                          <div className="half-pad">
                            <Button.Group>
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
                              <Popconfirm
                                title="Are you sure delete this file?"
                                onConfirm={(_) => this.fileDelete(elem.id)}
                                // onCancel={cancel}
                                okText="Delete"
                                cancelText="Cancel"
                                okType="danger"
                              >
                                <Button type="primary">
                                  <Icon type="close-circle" />
                                </Button>
                              </Popconfirm>
                            </Button.Group>
                          </div>
                        );
                      })}
                      <div className="big-space" />
                    </div>
                  </Fragment>
                ) : (
                  []
                )}
              </div>
            ) : (
              []
            )}
            {this.state.redirect}
          </div>
        ) : (
          this.state.no_data
        )}
        <Modal
          title="Postpone meeting"
          centered
          visible={this.state.modal}
          footer={null}
          onCancel={this.modal}
        >
          <Form.Item label="Meeting date">
            <DatePicker
              disabledDate={(current) => {
                return current < moment().add(-1, "day");
              }}
              value={
                this.state.modal_values
                  ? this.state.modal_values.date
                  : // this.state.meeting_data ?
                    // moment(this.state.meeting_data.booking_details.date) :
                    ""
              }
              onChange={(date, dateString) => {
                this.setState({
                  new_date: dateString.split("T")[0],
                  modal_values: {
                    ...this.state.modal_values,
                    date: date,
                  },
                });
              }}
            />
          </Form.Item>
          <Row>
            <Col lg={12} className="right-pad">
              <Form.Item label="Start from">
                <TimePicker
                  value={
                    this.state.modal_values && this.state.modal_values.start
                      ? moment(this.state.modal_values.start)
                      : // this.state.meeting_data ?
                        // moment(this.state.meeting_data.booking_details.time_from, 'h:mm:ss') :
                        ""
                  }
                  use12Hours
                  format={"HH:mm"}
                  style={{ width: "100%" }}
                  onChange={(time, time_string) => {
                    this.setState({
                      start_from: time_string,
                      modal_values: {
                        ...this.state.modal_values,
                        start: time,
                      },
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={12} className="left-pad">
              <Form.Item label="End time">
                <TimePicker
                  value={
                    this.state.modal_values && this.state.modal_values.end
                      ? moment(this.state.modal_values.end)
                      : // // this.state.meeting_data ?
                        // // moment(this.state.meeting_data.booking_details.time_to, 'h:mm:ss'):
                        ""
                  }
                  use12Hours
                  format={"HH:mm"}
                  style={{ width: "100%" }}
                  onChange={(time, time_string) => {
                    this.setState({
                      end_time: time_string,
                      modal_values: {
                        ...this.state.modal_values,
                        end: time,
                      },
                    });
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Button
            onClick={(_) => this.toogleMeeting("postpone")}
            type="primary"
            size="large"
            block
          >
            Postpone
          </Button>
        </Modal>
        <Modal
          title="Meeting minutes"
          centered
          visible={this.state.uploadModal}
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
            <Button onClick={this.addFile} type="primary" block size="large">
              Add
            </Button>
          </div>
        </Modal>
      </Wrapper>
    );
  }
}

export default Details;
