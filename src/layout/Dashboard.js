import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Route, HashRouter } from "react-router-dom";
import Nav from "./Nav";
import Board from "./Board";
import { Result, Button } from "antd";
import * as Cookies from "js-cookie";
import { ToggleProvider } from "../context/ToggleProvider";

const Wrapper = styled.div`
height: 100vh;
width: 100vw;
/* min-width : 1000px; */
overflow: auto;
  .nav {
    width: 100%;
    height: 4rem;
    position: fixed;
    z-index: 2;
    border-bottom: 0.5px solid lightgray;
    /* test color */
    background-color: #fafafa;
  }
`;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: Cookies.get("token")
    };
  }

  componentDidUpdate() {
    if (Cookies.get("token") !== this.state.token) {
      window.location = window.location.href;
    }
  }

  render() { 
    return (
      <ToggleProvider>
        <Fragment>
          {Cookies.get("token") ? (
            <Wrapper>
              <div className="nav">
                <Nav />
              </div> 
              <Route path="/" component={Board} exact />
              <Route path="/:module" component={Board} />
            </Wrapper>
          ) : (
            (window.location = "/")
          )}
        </Fragment>
      </ToggleProvider>
    );
  }
}

export default connect()(Dashboard);
