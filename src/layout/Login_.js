import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import * as CryptoJS from "crypto-js";
import {
  Form,
  Icon,
  Input,
  Button,
  Card,
  Typography,
} from "antd";
import { login } from "../scripts/postData";
import * as Cookies from "js-cookie";
import { alertPop } from "../scripts/message";
import { checkRes } from "../scripts/checkRes";
import { Wrapper } from "../modules/commons/Wrapper";

class Login_ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disbled: false,
      view: [],
      user: "",
      password: "",
      forgotEmail: "",
      btnLoading: false
    };
  }

  forgotPassword = () => {
    let default_view = (
      <Form onSubmit={this.submitForgot} className="login-form">
        <Typography.Title level={2}>
          <span>
            <Icon type="user" />
          </span>{" "}
          Login
        </Typography.Title>
        <div className="space" />
        <Form.Item>
          <Input
            onChange={this.forgotEmail}
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="UserID"
          />
        </Form.Item>
        <Form.Item>
          {/* <Checkbox>Remember me</Checkbox> */}
          <Button
            block
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Send recovery mail
          </Button>
        </Form.Item>
        <a href="/">Go to login</a>
      </Form>
    );
    this.setState({
      view: default_view
    });
  };

  forgotEmail = e => {
    this.setState({
      forgotEmail: e.target.value
    });
  };

  submitForgot = e => {
    e.preventDefault();
    //todo
  };

  userId = e => {
    this.setState({
      user: e.target.value
    });
  };

  submit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ btnLoading: true });
        let res = await login(values);
        if (checkRes(res.status)) {
          let token = CryptoJS.AES.encrypt(
            res.data.data.token,
            "$%sslWireless$$_SslCommerz44Ebuddy%$"
          );
          // sessionStorage.setItem('token', token)
          Cookies.set("profile", JSON.stringify(res.data.data.user));
          Cookies.set("token", token);
          window.location = "/";
          this.setState({ btnLoading: false });
        } else if (res.length > 0) {
          res.map(elem => {
            alertPop("error", elem);
          });
          this.setState({ btnLoading: false });
        } else {
          alertPop("error", "Something went wrong!");
          this.setState({ btnLoading: false });
        }
      }
    });
  };

  render() {
    return (
      <Wrapper>
        {/* <div className="_style-text">
          <Typography.Text
            strong
            style={{ fontSize: "5rem", fontWeighy: "bold", color: "#1890ff" }}
          >
            {`Employee Buddy `}
          </Typography.Text>
          <div>
            <Typography.Text strong style={{ fontSize: "2rem" }}>
              is a platform which helps organizations to transform Legacy HR to
              Digital HR.
            </Typography.Text>
          </div>
        </div> */}
        <Card className="_loginContainer">
          <Form onSubmit={this.submit} className="login-form">
            <Typography.Title level={2}>
              <span>
                <Icon type="user" />
              </span>{" "}
              Login
            </Typography.Title>
            <div className="space" />
            <Form.Item>
              {this.props.form.getFieldDecorator("emp_id", {
                rules: [{ required: true, message: "ID is required!" }]
              })(
                <Input
                  autoComplete="off"
                  onChange={this.userId}
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="UserID"
                />
              )}
            </Form.Item>
            <Form.Item>
              {this.props.form.getFieldDecorator("password", {
                rules: [{ required: true }]
              })(
                <Input
                  onChange={e => {
                    this.setState({ password: e.target.value });
                  }}
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              {/* <Checkbox>Remember me</Checkbox> */}
              <Button
                block
                type="primary"
                size="large"
                htmlType="submit"
                className="login-form-button"
                loading={this.state.btnLoading}
                disabled={this.state.disabled}
              >
                Log in
              </Button>
            </Form.Item>
            {/* <a onClick={this.forgotPassword}>Forgot password?</a> */}
          </Form>
        </Card>
      </Wrapper>
    );
  }
}

const Login = Form.create({ name: "login" })(Login_);

export default connect()(Login);
