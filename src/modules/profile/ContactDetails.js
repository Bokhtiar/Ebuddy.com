import React, { Component, Fragment } from "react";
import { Wrapper } from "../commons/Wrapper";
import { Row, Col, Skeleton, Divider, Typography } from "antd";
import ProfileElement from "../commons/ProfileElement";

const contact_address = [
  {
    title: "Permanent address",
    description: "description"
  },
  {
    title: "Present address",
    description: "description"
  },
  {
    title: "City",
    description: "description"
  },
  {
    title: "State/Province",
    description: "description"
  },
  {
    title: "Postal code",
    description: "description"
  },
  {
    title: "Country",
    description: "description"
  }
];

const contact_numbers = [
  {
    title: "Telephone",
    description: "+880 1600 000 000"
  },
  {
    title: "Mobile",
    description: "+880 1600 000 000"
  },
  {
    title: "Email",
    description: "dummy@gmail.com"
  }
];

export default class ContactDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact_address: contact_address,
      contact_numbers: contact_numbers
    };
  }

  render() {
    return (
      <Wrapper>
        <Row className="bottom-bod">
          <Col className="side-bod" xs={12} md={12} lg={12}>
            <Typography.Title className="pad" level={4}>
              Contact address
            </Typography.Title>
            <div className="pad profile-details-container">
              {this.state.contact_address ? (
                this.state.contact_address.map(elem => {
                  return <ProfileElement data={elem} />;
                })
              ) : (
                <Skeleton className="pad" active />
              )}
            </div>
            <Divider />
            <div className="pad profile-details-container">
              {this.state.contact_numbers ? (
                this.state.contact_numbers.map(elem => {
                  return <ProfileElement data={elem} />;
                })
              ) : (
                <Skeleton className="pad" active />
              )}
            </div>
          </Col>
          <Col className="side-bod left-pad" xs={12} md={12} lg={12}></Col>
        </Row>
      </Wrapper>
    );
  }
}
