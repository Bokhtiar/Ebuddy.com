import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  Typography,
  Form,
  Button,
  Row,
  Col,
  Input,
  DatePicker,
  Divider
} from "antd";
import { postData } from "../scripts/postData";
import * as moment from "moment";
import { Redirect } from "react-router-dom";
import { alertPop } from "../scripts/message";
import NotificationHistory from "./NotificationHistory";

const Wrapper = styled.div`
  padding: 5rem 1rem 1rem 1rem;
  height: 100vh;
  width: 100%;
  overflow: auto;
  .stretch {
    width: 100%;
  }
`;

class SendNotification_ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnLoading: false,
      redirect: "",
      history: <NotificationHistory id={new Date()} />
    };
  }

  submit = () => {
    let red = <Redirect to="/send-notification" />;
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ btnLoading: true });
        let end_date = JSON.stringify(values.end_date)
          .split("T")[0]
          .split('"')[1];
        let res = await postData("accounts/v1/notification/create", {
          title: values.title,
          description: values.description,
          end_date: end_date,
          viewer: 1
        });
        if (res.status && (res.status === 200 || res.status === 201)) {
          alertPop("success", "Notification sent");
          this.setState({
            btnLoading: false,
            redirect: red,
            history: <NotificationHistory id={new Date()} />
          });
        } else {
          res.map(elem => {
            alertPop("error", elem);
          });
          this.setState({
            btnLoading: false
          });
        }
      }
    });
  };

  render() {
    return (
      <Wrapper>
        <Row>
          <Col lg={8}>
            <div className="search-bar">
              <Typography.Title level={4}>Send notifications</Typography.Title>
              <Typography.Paragraph level={4}>
                  *Notification will be sent to every mobile phone immediately.
              </Typography.Paragraph>
              <Form>
                <Form.Item label="Title">
                  {this.props.form.getFieldDecorator("title", {
                    rules: [{ required: true }]
                  })(<Input className="stretch" />)}
                </Form.Item>
                <Form.Item label="Description">
                  {this.props.form.getFieldDecorator("description", {
                    rules: [{ required: true }]
                  })(<Input.TextArea className="stretch" />)}
                </Form.Item>
                <Form.Item label="End date">
                  {this.props.form.getFieldDecorator("end_date", {
                    rules: [{ required: true, message: "Date is required" }]
                  })(
                    <DatePicker
                      className="stretch"
                      disabledDate={current => {
                        return current < moment().add(0, "day");
                      }}
                    />
                  )}
                </Form.Item>
              </Form>
              <Button
                loading={this.state.btnLoading}
                type="primary"
                size="large"
                onClick={this.submit}
                className="stretch"
              >
                Send
              </Button>
            </div>
          </Col>
          <Col lg={{ span: 15, offset: 1 }}>{this.state.history}</Col>
        </Row>
        {this.state.redirect}
      </Wrapper>
    );
  }
}

const SendNotification = Form.create({ name: "send_notification" })(
  connect()(SendNotification_)
);

export default SendNotification;
