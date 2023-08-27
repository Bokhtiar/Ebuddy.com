import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import styled from "styled-components";
import Panel from "./Panel";
import Sidebar from "../commons/Sidebar";
import { Row, Col } from "antd";
import { hris_settings } from "../../scripts/routes";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

class HrSettings extends Component {
  // Main method 
  render() {
    return (
      <Wrapper className='flex_r'>
          <Sidebar sidebar={hris_settings} />
          <div style={{width : '100%'}}>
            <Route path="/hris-settings" component={Panel} exact />
            <Route path="/hris-settings/:name" component={Panel} exact />
          </div>
      </Wrapper>
    );
  }
}

export default connect()(HrSettings);
