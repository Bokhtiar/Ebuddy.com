/** @format */

import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Typography, Collapse, Skeleton, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";
import transport_img from "../../assets/transport.svg";

const Wrapper = styled.div`
  height: 100vh;
  width: ${(props) => (props.closed ? "18px" : "250px")};
  min-width: ${(props) => (props.closed ? "18px" : "250px")};
  overflow: ${(props) => (props.custom ? "none" : "auto")};
  padding-top: ${(props) => (props.custom ? 0 : "4.5rem")};
  border-right: 0.5px solid lightgray;
  transition: all ease-in-out 0.1s;
  font-size: 0.8rem;
  box-shadow: ${(props) =>
    props.closed ? "inset -5px 1px 5px #00000018" : ""};

  .shrink-btn {
    position: absolute;
    bottom: 3rem;
    z-index: 99;
    font-size: 0.9rem;
    padding: 0.3rem;
    text-align: center;
    background-color: white;
    -webkit-box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.3);
    border-radius: 1rem;
    color: #0084e6;
    left: ${(props) => (props.closed ? "64px" : "296px")};
    transform: ${(props) => (props.closed ? "rotate(0deg)" : "rotate(180deg)")};
    transition: all ease-in-out 0.2s;

    :hover {
      -webkit-box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.4);
      -moz-box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.4);
      box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.4);
    }
  }
  .visible-on-condition {
    width: 100%;
    display: ${(props) => (props.closed ? "none" : "")};
    transition: all ease-in-out 0.2s;
  }
  .button {
    width: 100%;
    border-radius: 4px;
    padding: 0.8rem;
    text-align: left;
    cursor: pointer;
    user-select: none;
    outline: none;
    background-color: transparent;
    border: 0;
    color: #6c757e;
  }
  .active {
    background-color: #0084e6 !important;
    font-weight: 700;
    color: white;
    user-select: none;
  }
  .ant-collapse {
    background-color: transparent;
    border: 0;
  }
  .ant-collapse-content {
    border: 0;
    background-color: #f6f6f6;
    border-radius: 5px;
  }
  .ant-collapse-content-box {
    padding: 0 0 0 0.8rem;
  }
  .ant-collapse-item {
    padding: 0;
    border: 0;
  }
  .ant-collapse-header {
    padding: 0 !important;
    background-color: transparent;
    border: 0;
    color: #6c757e;
  }

  .no-content {
    .ant-collapse-content-box {
      display: none;
    }
  }

  .ant-collapse-item-active {
    .ant-collapse-header {
      border-radius: 4px;
      font-weight: 700;
      user-select: none;
    }
  }
`;

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      close: null,
      sidebar_open: true,
      closed: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      // console.log(this.props)
    }
  }

  clicked = (e) => {
    let items = document.getElementsByClassName("button");
    for (let i = 0; i < items.length; i++) {
      if (items[i].classList.contains("accordion")) {
        //todo
      } else {
        items[i].classList.remove("active");
      }
    }
    if (e.target.classList.contains("button")) {
      if (e.target.classList.contains("sub-active")) {
        //todo
      } else {
        e.target.classList.add("active");
      }
    }
    if (e.target.classList.contains("ADDNEW")) {
      for (let i = 0; i < items.length; i++) {
        items[i].classList.remove("active");
      }
    }
  };

  isSubActiveContent = (link, item) => {
    if (item?.activeLinks?.length) {
      let findIndex = item.activeLinks.findIndex((i) => i === link);

      return findIndex === -1 ? false : true;
    } else {
      return link === item.to ? true : false;
    }
  };

  isRootActiveContent = (link, item) => {
    if (item?.activeLinks?.length) {
      let findIndex = item.activeLinks.findIndex((i) => i === link);
      return findIndex === -1 ? false : true;
    } else return false;
  };

  render() {
    return (
      <Wrapper
        closed={this.state.closed}
        width={this.state.side_bar_open_width || ""}
        custom={this.props.custom}
      >
        {this.props.custom ? (
          this.props.children
        ) : this.props.sidebar ? (
          <div className="visible-on-condition">
            <Typography.Title
              id="side-bar"
              className="title left-pad-2"
              level={4}
            >
              {this.props.sidebar.title}
            </Typography.Title>
            <div className="pad">
              {this.props.sidebar.items ? (
                <Collapse
                  accordion
                  expandIconPosition="right"
                  onClick={this.clicked}
                >
                  {this.props.sidebar.items.map((elem, index) => {
                    if (!elem.notVisible) {
                      if (elem.accordion) {
                        return (
                          <Collapse.Panel
                            header={
                              <div
                                className={`button accordion ${
                                  window.location.href
                                    .split("/")
                                    .slice(-1)[0]
                                    .split("-")[0] ===
                                  elem.to.split("/")[2].split("-")[0]
                                    ? "active"
                                    : ""
                                }`}
                              >
                                {elem.name}
                              </div>
                            }
                            style={{ padding: "0" }}
                            key={`button-accordion-${index}`}
                          >
                            {elem.accordion.map((val, index) => {
                              if (!val.notVisible) {
                                // window.location.href
                                //           .split("/")
                                //           .slice(-1)[0] ===
                                //         val.to.split("/").slice(-1)[0]
                                // window.location.pathname === val.to
                                return (
                                  <Link
                                    className="LINK"
                                    to={val.to}
                                    key={`link-button-${index}`}
                                  >
                                    <button
                                      onClick={this.clicked}
                                      className={`button ${
                                        this.isSubActiveContent(
                                          window.location.pathname,
                                          val,
                                        )
                                          ? "sub-active"
                                          : ""
                                      }`}
                                    >
                                      {val.name}
                                    </button>
                                  </Link>
                                );
                              }
                            })}
                          </Collapse.Panel>
                        );
                      } else {
                        if (elem.create) {
                          return (
                            <Collapse.Panel
                              style={{ marginBottom: "20px" }}
                              header={
                                <Link to={elem.to} className="LINK">
                                  <button
                                    onClick={this.clicked}
                                    className={`button ${
                                      window.location.href
                                        .split("/")
                                        .slice(-1)[0] ===
                                        elem.to.split("/")[2] ||
                                      (elem.default &&
                                        elem.default ===
                                          window.location.href
                                            .split("/")
                                            .slice(-1)[0])
                                        ? "active"
                                        : ""
                                    }`}
                                  >
                                    {elem.name}
                                  </button>
                                </Link>
                              }
                              showArrow={false}
                              className="ADDNEW no-content"
                            />
                          );
                        } else {
                          return (
                            <Collapse.Panel
                              header={
                                <Link to={elem.to} className="LINK">
                                  <button
                                    onClick={this.clicked}
                                    className={`button ${
                                      this.props.location.pathname.split(
                                        "/",
                                      )[2] === elem.to.split("/")[2] ||
                                      (elem.defined &&
                                        this.props.location.pathname
                                          .split("/")[2]
                                          .split("-")[0] === elem.defined) ||
                                      (elem.default &&
                                        elem.default ===
                                          window.location.href
                                            .split("/")
                                            .slice(-1)[0]) ||
                                      this.isRootActiveContent(
                                        window.location.pathname,
                                        elem,
                                      )
                                        ? "active"
                                        : ""
                                    }`}
                                  >
                                    {elem.name}
                                    {elem.noticeCount ? (
                                      <span
                                        className="notice-count"
                                        id={elem.count_detect_id}
                                        style={{ display: "none" }}
                                      ></span>
                                    ) : (
                                      ""
                                    )}
                                  </button>
                                </Link>
                              }
                              showArrow={false}
                              className="no-content"
                              key={`collapse-panel-${index}`}
                            />
                          );
                        }
                      }
                    }
                  })}
                </Collapse>
              ) : (
                <Skeleton active />
              )}
            </div>
            <div className="pad flex_c">
              <img
                style={{ width: "98%" }}
                src={this.props.sidebar.image}
                alt="meeting"
              />
            </div>
          </div>
        ) : (
          <Skeleton className="pad" active />
        )}
        <Icon
          onClick={() => {
            this.setState({
              closed: !this.state.closed,
            });
          }}
          className="shrink-btn"
          type="right"
        />
      </Wrapper>
    );
  }
}

export default connect()(withRouter((props) => <Sidebar {...props} />));
