import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  Form,
  Radio,
  Select,
  Typography,
  Row,
  Col,
  Button,
  DatePicker,
  Skeleton,
  Input,
  TimePicker,
  Checkbox
} from "antd";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import { getData } from "../../scripts/getData";
import LocationSearchInput from "./Gmap";
import Attendee from "./Attendee";
import Person from "./Person";
import Company from "./Company";
import { createMeeting } from "../../scripts/meeting/create";
import { validateText } from "../../scripts/validate";
import Assignee from "../../commons/Assignee";

const Wrapper = styled.div`
  padding-top: 4rem;
  height: 100vh;
  width: 100%;
  overflow: auto;
  .form-container {
    padding: 2%;
  }
  .stretch {
    width: 100% !important;
  }
`;

class AddNew_form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: [],
      locationView: [],
      meetingLocation: "",
      attendeeSearch: "",
      attendeeModal: false,
      attendees_: [],
      meeting_type_: 0
    };
  }

  locationRadio = async e => {
    this.setState({ locationView: <Skeleton />, meetingLocation: e });
    if (e === "Indoor") {
      let res = await getData("rooms/v1/room-list");
      this.setState({
        roomOptions: res.data.data.map(elem => {
          return (
            <Select.Option key={elem.id} value={elem.id}>
              {elem.title}
            </Select.Option>
          );
        })
      });
    }
  };

  attendees = elem => {
    this.setState({
      attendees_: JSON.stringify(elem.map(emp => emp.emp_id)).slice(1, -1)
    });
  };

  personInfo = info => {
    this.setState({
      person_info: info
    });
  };

  companyInfo = info => {
    this.setState({
      company_info: info
    });
  };

  submit = () => {
    this.setState({ btnLoading: true });
    let red = <Redirect to="/meeting/my-meeting/1/1" />;
    this.props.form.validateFields(async (err, values) => {
      // if (!err) {
      let data = {
        attendees: this.state.attendees_,
        date: moment(values.date)
          .format()
          .split("T")[0],
        discussion_point: this.state.text_area || "",
        meeting_location: this.state.meetingLocation,
        meeting_with: this.state.meeting_with || "",
        purpose: values.purpose,
        time_from: moment(values.start_time)
          .format()
          .split("T")[1]
          .slice(0, 5),
        time_to: moment(values.end_time)
          .format()
          .split("T")[1]
          .slice(0, 5),
        meeting_type: this.state.meeting_type_,
        title: values.meeting_title,
        room_id: values.room_id,
        ...this.state.person_info,
        ...this.state.company_info
      };
      if (this.state.meetingLocation === "Outdoor") {
        data = {
          ...data,
          location_name: this.props.addressHelp
            ? this.props.addressHelp.address
            : null,
          location_address: this.props.addressHelp
            ? this.props.addressHelp.address
            : this.state.location_address,
          location_latlong: this.props.addressHelp
            ? `${this.props.addressHelp.latlong.lat},${this.props.addressHelp.latlong.lng}`
            : this.state.location_latlong
        };
      }
      if (await createMeeting(data)) {
        this.setState({
          redirect: red
        });
      } else {
        document.getElementById("form").scrollTop = 0;
      }
      // }
    });
    this.setState({ btnLoading: null });
  };

  render() {
    return (
      <Wrapper id="form">
        <div className="form-container">
          <Typography.Title className="stretch" level={4}>
            Meeting creation
          </Typography.Title>
          <Form>
            <Row>
              <Col md={24} lg={12}>
                {/* meeting purpose */}
                <Form.Item label="Select meeting type">
                  {this.props.form.getFieldDecorator("purpose", {
                    rules: [
                      {
                        required: true,
                        message: "Please choose meeting purpose!"
                      }
                    ]
                  })(
                    <Select placeholder="Choose meeting purpose">
                      <Select.Option value="2">Conference</Select.Option>
                      <Select.Option value="3">Interview</Select.Option>
                      <Select.Option value="5">Discussion</Select.Option>
                      <Select.Option value="6">New lead</Select.Option>
                    </Select>
                  )}
                </Form.Item>
                {/* meeting data */}
                <Form.Item label="Select meeting date">
                  {this.props.form.getFieldDecorator("date", {
                    rules: [{ required: true, message: "Please select date!" }]
                  })(
                    <DatePicker
                      className="stretch"
                      disabledDate={current => {
                        return current < moment().add(-1, "day");
                      }}
                    />
                  )}
                </Form.Item>
                {/* meeting location */}
                <Form.Item label="Meeting location">
                  {this.props.form.getFieldDecorator("locationRadio", {
                    rules: [
                      {
                        required: true,
                        message: "Please select meeting location!"
                      }
                    ]
                  })(
                    <Radio.Group
                      onChange={async e =>
                        await this.locationRadio(e.target.value)
                      }
                    >
                      <Radio value={"Indoor"}>Indoor</Radio>
                      <Radio value={"Outdoor"}>Outdoor</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
                {this.state.meetingLocation === "Indoor" ? (
                  <Form.Item label="Select room">
                    {this.props.form.getFieldDecorator("room_id", {
                      rules: [
                        {
                          required: true,
                          message: "Please choose a meeting room!"
                        }
                      ]
                    })(
                      <Select placeholder="Choose a room">
                        {this.state.roomOptions}
                      </Select>
                    )}
                  </Form.Item>
                ) : this.state.meetingLocation === "Outdoor" ? (
                  <Form.Item required label="Select location">
                    {this.props.form.getFieldDecorator("location", {
                      // rules: [{ required: true }]
                    })(<LocationSearchInput help="help" />)}
                  </Form.Item>
                ) : null}
                <Form.Item label="Select attendees" required>
                  <Assignee method={this.attendees} />
                </Form.Item>
              </Col>
              <Col md={24} lg={{ span: 11, offset: 1 }}>
                {/* meeting name */}
                <Form.Item label="Meeting title">
                  {this.props.form.getFieldDecorator("meeting_title", {
                    rules: [
                      { required: true, message: "Please enter meeting title!" }
                    ]
                  })(<Input placeholder="Meeting title" className="stretch" />)}
                </Form.Item>
                <Row>
                  <Col md={11} lg={11}>
                    {/* meeting start time */}
                    <Form.Item label="Meeting starts at">
                      {this.props.form.getFieldDecorator("start_time", {
                        rules: [{ required: true, message: "Select a time" }]
                      })(
                        <TimePicker
                          use12Hours
                          format="h:mm a"
                          className="stretch"
                        />
                      )}
                    </Form.Item>
                  </Col>
                  <Col
                    md={{ span: 11, offset: 2 }}
                    lg={{ span: 11, offset: 2 }}
                  >
                    {/* meeting END time */}
                    <Form.Item label="Meeting ends at">
                      {this.props.form.getFieldDecorator("end_time", {
                        rules: [{ required: true, message: "Select a time" }]
                      })(
                        <TimePicker
                          use12Hours
                          format="h:mm a"
                          className="stretch"
                        />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item>
                  <Checkbox
                    onChange={e => {
                      this.setState({
                        meeting_type_: e.target.checked ? 1 : 0
                      });
                      if (e.target.checked) {
                        this.setState({
                          meeting_with: null
                        });
                      }
                    }}
                  >
                    This is an internal meeting
                  </Checkbox>
                </Form.Item>
                {this.state.meeting_type_ === 0 ? (
                  <Fragment>
                    <Form.Item label="Meeting with">
                      {this.props.form.getFieldDecorator("meeting_with", {
                        rules: [
                          {
                            required: true,
                            message: "Please select meeting with"
                          }
                        ]
                      })(
                        <Radio.Group
                          onChange={e => {
                            this.setState({
                              meeting_with: e.target.value
                            });
                          }}
                        >
                          <Radio value={"Individual"}>Individual</Radio>
                          <Radio value={"Company"}>Company</Radio>
                        </Radio.Group>
                      )}
                    </Form.Item>
                  </Fragment>
                ) : (
                  ""
                )}
                {this.state.meeting_with === "Individual" ? (
                  <Person personInfo={this.personInfo} />
                ) : this.state.meeting_with === "Company" ? (
                  <Company companyInfo={this.companyInfo} />
                ) : (
                  []
                )}
                <Form.Item
                  label="Meeting description"
                  validateStatus={validateText(this.state.text_area)}
                  help={validateText(this.state.text_area, "help")}
                >
                  <Input.TextArea
                    className="stretch"
                    value={this.state.text_area || []}
                    onChange={e => {
                      this.setState({
                        text_area: e.target.value
                      });
                    }}
                  />
                </Form.Item>
                <Button
                  loading={this.state.btnLoading}
                  size="large"
                  onClick={this.submit}
                  type="primary"
                  block
                >
                  Create
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
        {this.state.redirect}
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    address: state.address.address,
    // addressHelp: state.addressHelp.addressHelp,
    addressHelp: state.address.addressHelp
  };
};

const AddNew = Form.create({ name: "add_new" })(
  connect(mapStateToProps, null)(AddNew_form)
);

export default AddNew;
