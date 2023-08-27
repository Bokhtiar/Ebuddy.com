import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../commons/Sidebar";
import { product } from "../../scripts/routes";
import { getPermissions } from "../../scripts/helper";
import Panel from './Panel'

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

class ProductIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
    };
  }

  render() {
    return (
      <Wrapper className="flex_r">
        {/* <Sidebar sidebar={SOP} /> */}
        <Sidebar sidebar={product} />
        <div style={{ width: "100%", overflow: "hidden" }}>
          <Route path="/product" component={Panel} exact />
          <Route path="/product/:name" component={Panel} exact />
        </div>
      </Wrapper>
    );
  }
}

export default connect()(ProductIndex);
