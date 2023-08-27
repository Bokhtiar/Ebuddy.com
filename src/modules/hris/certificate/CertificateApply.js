import React, { Component, Fragment } from "react";
import styled from "styled-components";
import {
  Typography,
  Row,
  Col,
  Form,
  Select,
  DatePicker,
  TimePicker,
  Button
} from "antd";
import * as moment from "moment";
import TextArea from "antd/lib/input/TextArea";
import * as Cookies from "js-cookie";
import { getData } from "../../../scripts/getData";
import { postData } from "../../../scripts/postData";
import { checkRes } from "../../../scripts/checkRes";
import { alertPop } from "../../../scripts/message";
import { Redirect } from "react-router-dom";
import { errorHandle } from "../../../scripts/error";
import { validateText } from "../../../scripts/validate";

const Wrapper = styled.div`
  height: 100vh;
  overflow: auto;
  padding-top: 4rem;
`;

const applicationText = {
  greetings: "Dear sir, ",
  certify: "This is to certify that ",
  address:
    "has been serving with us at Software Shop Limited, 93 B, New Eskaton Road, Dhaka-1000, Bangladesh as ",
  from: "from",
  to: " to ",
  emp_id: "His Employee ID number is ",
  testimony:
    "This is a testimony of his deep professionalism and strong commitment to the company. ",
  footer:
    " is a sincere, enthusiastic and hardworking individual with excellent moral character to the best of my knowledge. ",
  yours: "Yours Sincerely, "
};

class CertificateApply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      certificateTypes: [],
      applicationText: applicationText,
      myProfile: JSON.parse(Cookies.get("profile")),
      employment_from: "His joining date",
      employment_to: "till date"
    };
  }

  componentWillMount() {
    this.applicationTypes();
  }

  applicationTypes = async () => {
    let res = await getData("accounts/v1/hris/application-types");
    if (res.status) {
      if (checkRes(res.status)) {
        this.setState({
          certificateTypes: res.data.data
        });
      } else {
        res.map(elem => {
          alertPop("error", elem);
        });
      }
    } else {
      alertPop("error", "Something went wrong!");
    }
  };

  apply = async () => {
    let red = <Redirect to="/hris/certificate-list" />;
    let data = {
      type_id: this.state.certificate_type ? this.state.certificate_type : "",
      description: this.state.needed_purpose ? this.state.needed_purpose : "",
      needed_by:
        this.state.needed_date && this.state.needed_time
          ? `${this.state.needed_date} ${this.state.needed_time}`
          : ""
    };
    let res = await postData("accounts/v1/hris/apply-application", data);
    if (res) {
      if (checkRes(res.status)) {
        this.setState({
          red: red
        });
        alertPop("success", "Application submitted!");
      } else if (res.length > 0) {
        res.map(elem => {
          alertPop("error", elem);
        });
      } else {
        alertPop("error", "Something went wrong!");
      }
    } else {
      errorHandle(res);
    }
  };

  render() {
    return (
      <Wrapper>
        <Typography.Title className="pad" level={4}>
          Apply new application
        </Typography.Title>
        <Row className="pad">
          <Col lg={12} className="right-pad">
            <Form.Item required label="Certificate type">
              <Select
                placeholder="Select certificate type"
                onChange={value => {
                  this.setState({
                    certificate_type: value
                  });
                }}
              >
                {this.state.certificateTypes.map(elem => {
                  return (
                    <Select.Option value={elem.id}>
                      {elem.type_name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item required label="By when needed ?">
              <Row>
                <Col lg={12} className="right-pad">
                  <TimePicker
                    style={{ width: "100%" }}
                    format="HH:mm"
                    onChange={(time, timeString) => {
                      this.setState({
                        needed_time: timeString
                      });
                    }}
                  />
                </Col>
                <Col lg={12} className="left-pad">
                  <DatePicker
                    disabledDate={current => {
                      return current < moment().add(-1, "day");
                    }}
                    onChange={(date, dateString) => {
                      this.setState({
                        needed_date: dateString.split("T")[0]
                      });
                    }}
                  />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item
              validateStatus={validateText(this.state.needed_purpose)}
              help={validateText(this.state.needed_purpose, "help")}
              required
              label="Purpose"
            >
              <TextArea
                value={this.state.needed_purpose || []}
                placeholder="Write purpose"
                onChange={e => {
                  this.setState({
                    needed_purpose: e.target.value
                  });
                }}
              />
            </Form.Item>
            <Row>
              <Col lg={12}>
                <Button
                  type="primary"
                  onClick={() => {
                    this.apply();
                  }}
                  block
                  size="large"
                >
                  Apply
                </Button>
              </Col>
            </Row>
          </Col>
          <Col lg={12} className="left-pad">
            <div className="P-BG pad">
              <div>
                <Typography.Text strong>{`Subject : `}</Typography.Text>
                <Typography.Text>{`Applying for `}</Typography.Text>
                <Typography.Text className="blue-text" strong>
                  {this.state.certificate_type
                    ? this.state.certificateTypes.map(val => {
                        if (val.id === this.state.certificate_type) {
                          return val.type_name;
                        }
                      })
                    : `{{Certificate type}}`}
                </Typography.Text>
              </div>
              <div className="pad" />
              {this.state.applicationText ? (
                <Fragment>
                  <div>
                    <Typography.Text>
                      {this.state.applicationText.greetings}
                    </Typography.Text>
                  </div>
                  <div className="pad" />
                  <div>
                    <Typography.Text>
                      {this.state.applicationText.certify}
                    </Typography.Text>
                    <Typography.Text strong className="blue-text">
                      {` ${this.state.myProfile.name} `}
                    </Typography.Text>
                    <Typography.Text>
                      {this.state.applicationText.address}
                    </Typography.Text>
                    <Typography.Text strong className="blue-text">
                      {` ${this.state.myProfile.designation} `}
                    </Typography.Text>
                    <Typography.Text>
                      {this.state.applicationText.from}
                    </Typography.Text>
                    <Typography.Text strong className="blue-text">
                      {` ${this.state.employment_from} `}
                    </Typography.Text>
                    <Typography.Text>
                      {this.state.applicationText.to}
                    </Typography.Text>
                    <Typography.Text strong className="blue-text">
                      {` ${this.state.employment_to}. `}
                    </Typography.Text>
                    <Typography.Text>
                      {this.state.applicationText.emp_id}
                    </Typography.Text>
                    <Typography.Text strong className="blue-text">
                      {` ${this.state.myProfile.emp_id}. `}
                    </Typography.Text>
                    <Typography.Text>
                      {this.state.applicationText.testimony}
                    </Typography.Text>
                  </div>
                  <div className="pad" />
                  <div>
                    <Typography.Text strong className="blue-text">
                      {`${this.state.myProfile.name} `}
                    </Typography.Text>
                    <Typography.Text>
                      {this.state.applicationText.footer}
                    </Typography.Text>
                  </div>
                  <div className="pad" />
                  <div>
                    <Typography.Text>
                      {this.state.applicationText.yours}
                    </Typography.Text>
                  </div>
                  <div>
                    <Typography.Text strong className="blue-text">
                      HR,
                    </Typography.Text>
                  </div>
                  <div>
                    <Typography.Text>SSL Wireless</Typography.Text>
                  </div>
                </Fragment>
              ) : (
                []
              )}
            </div>
          </Col>
        </Row>
        {this.state.red ? this.state.red : []}
      </Wrapper>
    );
  }
}

export default CertificateApply;
