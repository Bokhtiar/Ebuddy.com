import React, { Fragment, Component } from "react";
import { Button, Row, Col, Avatar, Typography, Skeleton, Divider } from "antd";
import { Wrapper, Img } from "../commons/Wrapper";
import * as Cookies from "js-cookie";
import love from "../../assets/love.svg";
import birthday from "../../assets/birthday.svg";
import blood from "../../assets/blood.svg";
import { slice_15 } from "../../scripts/slice";
import { getData } from "../../scripts/getData";
import { PROFILE_DETAILS } from "../../scripts/api";
import { checkRes, errorHandle } from "../../scripts/error";
import dummy from "../../assets/dummy.jpg";
import ProfileElement from "../commons/ProfileElement";

const personal_details = [
  {
    title: "Marital status",
    description: "Married"
  },
  {
    title: "Nationality",
    description: "Bangladeshi"
  },
  {
    title: "National ID",
    description: "00000000000000"
    // file: {
    //   link: "https://www.google.com",
    //   name: "NID.pdf"
    // }
  },
  {
    title: "E-TIN number",
    description: "111111114444444444"
    // file: {
    //   link: "https://www.google.com",
    //   name: "NID.pdf"
    // }
  },
  {
    title: "Passport",
    description: "999999999999999999"
  }
];

const job_details = [
  {
    title: "Job title",
    description: "Senior Executive"
  },
  {
    title: "Department",
    description: "Business development"
  },
  {
    title: "Employee id",
    description: "1219"
  },
  {
    title: "Job Category",
    description: "Full time"
  },
  {
    title: "Employment status",
    description: "Permanent"
  },
  {
    title: "Joining date",
    description: "17/09/18"
  },
  {
    title: "Reporting to",
    description: "Ashish Chakravorty"
  },
  {
    title: "PABX",
    description: "1029"
  },
  {
    title: "Location",
    description: "Dhaka"
  }
];

const NOT_FOUND = "Not found";

class PersonalDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cv: {}
    };
  }

  componentWillMount() {
    this.props.params.id
      ? this.view()
      : this.setState({
          myProfile: JSON.parse(Cookies.get("profile")),
          personal_details: personal_details,
          job_details: job_details
        });
  }

  view = async () => {
    let res = await getData(
      `${PROFILE_DETAILS}?emp_id=${this.props.params.id}`
    );
    if (res) {
      if (checkRes(res.status)) {
        this.setState({
          myProfile: {
            profile_pic: res.data.data.profile_pic || dummy,
            name: res.data.data.name,
            gender: res.data.data.profile
              ? res.data.data.profile.gender
              : NOT_FOUND,
            birth_date: res.data.data.profile
              ? res.data.data.profile.date_of_birth
              : NOT_FOUND,
            blood_group: res.data.data.profile
              ? res.data.data.profile.blood_group
              : NOT_FOUND
          },
          personal_details: [
            {
              title: "Marital status",
              description: res.data.data.profile
                ? res.data.data.profile.marital_status
                : NOT_FOUND
            },
            {
              title: "Nationality",
              description: res.data.data.profile
                ? res.data.data.profile.nationality
                : NOT_FOUND
            },
            {
              title: "National ID",
              description: res.data.data.profile
                ? res.data.data.profile.national_id
                : NOT_FOUND
            },
            {
              title: "E-TIN number",
              description: res.data.data.profile
                ? res.data.data.profile.e_tin_no
                : NOT_FOUND
            },
            {
              title: "Passport",
              description: res.data.data.profile
                ? res.data.data.profile.passport_no
                : NOT_FOUND
            }
          ],
          job_details: [
            {
              title: "Job title",
              description: res.data.data.designation
            },
            {
              title: "Department",
              description: res.data.data.department
            },
            {
              title: "Employee id",
              description: res.data.data.emp_id
            },
            // {
            //   title: "Job Category",
            //   description: res.data.data.job_category || NOT_FOUND
            // },
            {
              title: "Employment status",
              description: res.data.data.employee_category || NOT_FOUND
            },
            {
              title: "Joining date",
              description: res.data.data.joining_date || NOT_FOUND
            },
            {
              title: "Reporting to",
              description: res.data.data.reporting_to_name || NOT_FOUND
            },
            {
              title: "PABX",
              description: res.data.data.pabx || NOT_FOUND
            },
            {
              title: "Location",
              description: res.data.data.location || NOT_FOUND
            }
          ]
        });
      } else {
      }
    } else {
      errorHandle(res);
    }
  };

  render() {
    return (
      <Wrapper>
        {this.state.myProfile &&
        this.state.personal_details &&
        this.state.job_details ? (
          <Row className="bottom-bod">
            <Col className="side-bod" lg={12}>
              <div className="big-space center-text">
                <Avatar size={150} src={this.state.myProfile.profile_pic} />
              </div>
              <div className="center-text">
                <Typography.Title level={4} className="blue-text" strong>
                  {this.state.myProfile.name}
                </Typography.Title>
              </div>
              <Row className="pad">
                <Col xs={8} md={8} lg={8}>
                  <div className="icon-container flex_r">
                    <Img src={love} />
                    <div className="left-pad">
                      <Typography.Text className="FIX_th">
                        Gender
                      </Typography.Text>
                      <div>
                        <Typography.Text>
                          {this.state.myProfile.gender || "Not found"}
                        </Typography.Text>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs={8} md={8} lg={8}>
                  <div className="icon-container  flex_r">
                    <Img src={birthday} />
                    <div className="left-pad">
                      <Typography.Text className="FIX_th">
                        Date of birth
                      </Typography.Text>
                      <div>
                        <Typography.Text>
                          {this.state.myProfile.birth_date || "Not found"}
                        </Typography.Text>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs={8} md={8} lg={8}>
                  <div className="icon-container flex_r">
                    <Img src={blood} />
                    <div className="left-pad">
                      <Typography.Text className="FIX_th">
                        Blood group
                      </Typography.Text>
                      <div>
                        <Typography.Text>
                          {this.state.myProfile.blood_group || "Not found"}
                        </Typography.Text>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="space" />
              <Divider />
              <div className="space" />
              <div className="pad">
                <Typography.Title level={4}>Personal details</Typography.Title>
              </div>
              <div className="space" />
              <div className="pad profile-details-container">
                {this.state.personal_details.map(elem => {
                  return <ProfileElement data={elem} />;
                })}
              </div>
            </Col>
            <Col lg={12}>
              <div className="pad">
                <Typography.Title level={4}>Job details</Typography.Title>
              </div>
              <div className="pad profile-details-container">
                {this.state.job_details.map(elem => {
                  return (
                    <div key={elem.id}>
                      <Typography.Text className="FIX_th">
                        {elem.title}
                      </Typography.Text>
                      <div>
                        <Typography.Text>
                          {elem.description || "Not found"}
                        </Typography.Text>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Divider />
              <div className="pad">
                <Typography.Title level={4}>CV/Resume</Typography.Title>
                <div className="space" />
                <div>
                  <Button
                    icon="download"
                    disabled={!this.state.cv.name}
                    onClick={() => {
                      window.open(this.state.cv.link, "_blank");
                    }}
                  >
                    <Typography.Text className="FIX_th">
                      {slice_15(this.state.cv.name || "Download")}
                    </Typography.Text>
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        ) : (
          <Skeleton className="pad" active />
        )}
      </Wrapper>
    );
  }
}

export default PersonalDetails;
