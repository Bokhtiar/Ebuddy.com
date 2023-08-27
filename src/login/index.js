import React, { useState } from "react";
import { connect } from "react-redux";
import "./style.css";
import * as CryptoJS from "crypto-js";
import { Form, Icon, Input, Button, Card, Typography } from "antd";
import { login } from "../scripts/postData";
import * as Cookies from "js-cookie";
import { alertPop } from "../scripts/message";
import { checkRes } from "../scripts/checkRes";
import { Wrapper } from "../modules/commons/Wrapper";
import {getPermissions} from "../scripts/helper";

const Login_ = props => {
  const [state, setState] = useState({
    user: "",
    password: "",
    btnLoading: false
  });

  const [reset, setReset] = useState();

  const userId = e => {
    setState({
      ...state,
      user: e.target.value
    });
  };

  const submit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        setState({ ...state, btnLoading: true });
        let res = await login(values);
        if(res){
          if (checkRes(res.status)) {
            getPermissions();
            let token = CryptoJS.AES.encrypt(
              res.data.data.token,
              "$%sslWireless$$_SslCommerz44Ebuddy%$"
            );
            // sessionStorage.setItem('token', token)
            Cookies.set("profile", JSON.stringify(res.data.data.user));
            Cookies.set("token", token);
            window.location = "/";
            setState({ ...state, btnLoading: false });
          } else if (res.length > 0) {
            res.map(elem => {
              alertPop("error", elem);
            });
            setState({ ...state, btnLoading: false });
          } else {
            alertPop("error", "Something went wrong!");
            setState({ ...state, btnLoading: false });
          }
        }
      }
    });
  };

  return (
    <Wrapper bg='https://cdn.pixabay.com/photo/2020/04/04/21/00/twilight-5003856_1280.jpg'>
      {reset ? (
        <Card className="login-Container">
          <Form onSubmit={submit} className="login-form">
            <Typography.Title level={2}>
              <span>
                <Icon type="user" />
              </span>{" "}
              Login
            </Typography.Title>
            <div className="space" />
            <Form.Item>
              {props.form.getFieldDecorator("emp_id", {
                rules: [{ required: true, message: "ID is required!" }]
              })(
                <Input
                  autoComplete="off"
                  onChange={userId}
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="UserID"
                />
              )}
            </Form.Item>
            <Form.Item>
              {props.form.getFieldDecorator("password", {
                rules: [{ required: true }]
              })(
                <Input
                  onChange={e => {
                    setState({ ...state, password: e.target.value });
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
                loading={state.btnLoading}
                disabled={state.disabled}
              >
                Log in
              </Button>
            </Form.Item>
            {/* <a onClick={this.forgotPassword}>Forgot password?</a> */}
          </Form>
          <div className="pad">
            <Button onClick={() => setReset(true)} type="link">
              Reset password
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="login-Container">
          <Form onSubmit={submit} className="login-form">
            <Typography.Title level={2}>
              <span>
                <Icon type="user" />
              </span>{" "}
              Login
            </Typography.Title>
            <div className="space" />
            <Form.Item>
              {props.form.getFieldDecorator("emp_id", {
                rules: [{ required: true, message: "ID is required!" }]
              })(
                <Input
                  autoComplete="off"
                  onChange={userId}
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="UserID"
                />
              )}
            </Form.Item>
            <Form.Item>
              {props.form.getFieldDecorator("password", {
                rules: [{ required: true }]
              })(
                <Input
                  onChange={e => {
                    setState({ ...state, password: e.target.value });
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
                loading={state.btnLoading}
                disabled={state.disabled}
              >
                Log in
              </Button>
            </Form.Item>
            {/* <a onClick={this.forgotPassword}>Forgot password?</a> */}
          </Form>
          {/* <div className="pad">
            <Button onClick={() => setReset(true)} type="link">
              Reset password
            </Button>
          </div> */}
        </Card>
      )}
    </Wrapper>
  );
};
const Login = Form.create({ name: "login" })(Login_);

export default connect()(Login);
