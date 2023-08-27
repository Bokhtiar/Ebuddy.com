import React, { Component, Fragment } from "react";
import styled from "styled-components";
import SearchFilter from "../../commons/SearchFilter";
import {
  Divider,
  Row,
  Col,
  Button,
  Typography,
  Tag,
  Form,
  Select,
  Input,
  Avatar
} from "antd";
import { certificate_status_colors } from "../../../scripts/colors";
import * as Cookies from "js-cookie";
import { checkRes, errorHandle } from "../../../scripts/error";
import { Redirect } from "react-router-dom";
import { alertPop } from "../../../scripts/message";
import { postData } from "../../../scripts/postData";
import { validateText } from "../../../scripts/validate";
import { GET_ISSUE_TYPES } from "../../../scripts/api";
import { getData } from "../../../scripts/api-service"

const Wrapper = styled.div`
  height: 100vh;
  overflow: auto;
  padding-top: 4rem;
`;

const resPerson = {
  name: "J.M. Redwan",
  emp_id: 1219,
  profile_pic:
    "http://hris.sslwireless.com/employee-doc/image/1219-1502871390_232.jpg"
};

const issueText = {
  greetings: "Dear Sir, "
};

class IssueApply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issueTypes: [],
      res_person: resPerson,
      issueText: issueText,
      myProfile: JSON.parse(Cookies.get("profile"))
    };
  }

  componentWillMount() {
    this.issueTypes();
  }

  issueTypes = async () => {
    let res = await getData(GET_ISSUE_TYPES);
    if (res) {
      this.setState({
        issueTypes: res.data.data
      });
    }
  };

  apply = async () => {
    let red = <Redirect to="/hris/issue-list" />;
    let data = {
      type_id: this.state.issue_type || "",
      description: this.state.issue_details || ""
    };
    let res = await postData("accounts/v1/hris/complain", data);
    if (checkRes(res.status)) {
      this.setState({
        red: red
      });
      alertPop("success", "Issue submitted!");
    } else {
      errorHandle(res);
    }
  };

  render() {
    return (
      <Wrapper>
        <Typography.Title className="pad" level={4}>
          Apply issue
        </Typography.Title>
        <Row className="pad">
          <Col lg={12} className="right-pad">
            <Form.Item required label="Issue type">
              <Select
                placeholder="Select issue type"
                onChange={value => {
                  this.setState({
                    issue_type: value
                  });
                }}
              >
                {this.state.issueTypes.map(elem => {
                  return (
                    <Select.Option value={elem.id}>
                      {elem.type_name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              validateStatus={validateText(this.state.issue_details)}
              help={validateText(this.state.issue_details, "help")}
              required
              label="Details"
            >
              <Input.TextArea
                value={this.state.issue_details}
                placeholder="Write details here"
                onChange={e => {
                  this.setState({
                    issue_details: e.target.value
                  });
                }}
              />
            </Form.Item>
            <Row>
              <Col lg={12}>
                <Button onClick={this.apply} size="large" type="primary" block>
                  Apply
                </Button>
              </Col>
            </Row>
          </Col>
          {this.state.issueText ? (
            <Col lg={12} className="left-pad pad P-BG">
              <Typography.Text strong>Subject :</Typography.Text>
              <Typography.Text>{` Regarding `}</Typography.Text>
              <Typography.Text strong className="blue-text">
                {this.state.issue_type
                  ? this.state.issueTypes.map(elem => {
                      if (elem.id === this.state.issue_type) {
                        return elem.type_name;
                      }
                    })
                  : `{{Issue type}} `}{" "}
                issue.
              </Typography.Text>
              <div className="pad" />
              <Typography.Text>
                {this.state.issueText.greetings}
              </Typography.Text>
              <div className="pad" />
              <Typography.Text>I'm</Typography.Text>
              <Typography.Text className="blue-text" strong>
                {` ${this.state.myProfile.name} `}
              </Typography.Text>
              <Typography.Text>working as</Typography.Text>
              <Typography.Text className="blue-text" strong>
                {` ${this.state.myProfile.designation} `}
              </Typography.Text>
              <Typography.Text>and Employee ID number is</Typography.Text>
              <Typography.Text className="blue-text" strong>
                {` ${this.state.myProfile.emp_id} `}
              </Typography.Text>
              <Typography.Text>
                , writing this issue to inform you that
              </Typography.Text>
              <Typography.Text className="blue-text" strong>
                {` ${this.state.issue_details || `{{details}}`}. `}
              </Typography.Text>
              <div className="pad" />
              <Typography.Text>
                Thank you so much for your concern.
              </Typography.Text>
              <div className="pad" />
              <Typography.Text>Yours sincerely,</Typography.Text>
              <div>
                <Typography.Text className="blue-text" strong>
                  {this.state.myProfile.name}
                </Typography.Text>
              </div>
            </Col>
          ) : (
            []
          )}
        </Row>
        {this.state.red || []}
      </Wrapper>
    );
  }
}

export default IssueApply;
