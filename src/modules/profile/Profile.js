import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import styled from "styled-components";
import Panel from "./Panel";
// import Sidebar from "./Sidebar";
import { Row, Col } from "antd";
import Sidebar from "../commons/Sidebar"

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const sidebar = {
  title: "Profile",
  items: [
    {
      id: 1,
      name: `My profile`,
      to: "/profile/personal-details"
    },
    {
      id: 2,
      name: `Contact details`,
      to: "/profile/contact-details"
    },
    // {
    //   id: 3,
    //   name: `Work & education`,
    //   to: "/profile/work-and-education"
    // },
    // {
    //   id: 4,
    //   name: `Financial info & others`,
    //   to: "/profile/fin-and-others"
    // }
  ]
};

class Profile extends Component {
  // Main method
  render() {
    return (
      <Wrapper>
        <Row>
          <Col lg={5} md={6} xs={0}>
            <Sidebar sidebar={sidebar} />
          </Col>
          <Col lg={19} md={18} xs={24}>
            <Route path="/profile" component={Panel} exact />
            {/* <Route path="/employee-details/:id" component={Panel} exact /> */}
            <Route path="/profile/:name" component={Panel} exact />
            <Route path="/profile/:name/:id" component={Panel} exact />
            <Route path="/profile/:name/:id/:edit" component={Panel} exact />
          </Col>
        </Row>
      </Wrapper>
    );
  }
}

export default connect()(Profile);
