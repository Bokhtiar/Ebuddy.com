import React, { Component } from "react";
import { Form, Input, Typography, Row, Button, Skeleton } from "antd";
import { TableWrapper } from "../commons/Wrapper";
import SearchFilter from "../commons/SearchFilter";
import { Link, withRouter } from "react-router-dom";
import { PENDING_APPLICATIONS, REVIEW_APPLICATION } from "../../scripts/api";
import { getData, postData } from "../../scripts/api-service";
import Table from "../commons/Table";
import { work_from_home_colors } from "../../scripts/colors";
import Paginate from "../commons/Paginate";
import { alertPop } from "../../scripts/message";

const NOT_FOUND = "Not found";

class Approval extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //todo
    };
  }

  componentDidMount() {
    this.view(
      `${PENDING_APPLICATIONS}?page=${this.props.params.page}`
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.view(
        `${PENDING_APPLICATIONS}?page=${this.props.params.page}`
      );
    }
  }

  workStationPhoto = link => {
    window.open(link, "_blank");
  };

  decline = id => {
    let data = {
      id: id,
      status: "declined"
    };
    (async () => {
      let res = await postData(REVIEW_APPLICATION, data);
      if (res) {
        alertPop("success", "Request declined");
        this.view(`${PENDING_APPLICATIONS}?page=${this.props.params.page}`);
      } else {
        alertPop("error", "Request Failed");
      }
    })();
  };

  approve = id => {
    let data = {
      id: id,
      status: "approved"
    };
    (async () => {
      let res = await postData(REVIEW_APPLICATION, data);
      if (res) {
        alertPop("success", "Request approved");
        this.view(`${PENDING_APPLICATIONS}?page=${this.props.params.page}`);
      } else {
        alertPop("error", "Request Failed");
      }
    })();
  };

  view = async que => {
    let res = await getData(que);
    if (res) {
      this.setState(
        {
          allData: res.data.data.data,
          tempData: res.data.data.data,
          page_info: {
            current_page: res.data.data.current_page,
            count: res.data.data.last_page
          }
        },
        () => {
          this.prepareTable();
        }
      );
    } else {
      this.prepareTable();
    }
  };

  prepareTable = () => {
    this.setState({
      table_data: {
        width_class: "width-1000",
        header: [
          {
            type: "text",
            name: "Employee",
            lg: 8
          },
          {
            type: "text",
            name: "Picture of work station",
            lg: 4
          },
          {
            type: "text",
            name: "Desktop agent",
            lg: 4
          }
        ],
        body: this.state.tempData.map(elem => {
          return {
            data: [
              {
                type: "head",
                src: elem.profile?.profile_pic,
                size: "large",
                lg: 1
              },
              {
                type: "text",
                name: elem.profile?.name || NOT_FOUND,
                lg: 7
              },
              {
                type: "button",
                name: "Open image",
                btn_type: "outline",
                // ghost: true,
                icon: "download",
                btn_id: elem.id,
                loading:
                  this.state.download_btn_loading &&
                  this.state.download_btn_loading === elem.id
                    ? true
                    : false,
                method: _ => this.workStationPhoto(elem.work_station_image),
                lg: 4
              },
              {
                type: "tag",
                name:
                  elem.desktop_agent_installed === 0
                    ? "Not installed"
                    : "Installed",
                color:
                  elem.desktop_agent_installed === 0
                    ? work_from_home_colors.red
                    : work_from_home_colors.green,
                lg: 4
              },
              elem.status === "pending"
                ? {
                    type: "button-group",
                    buttons: [
                      {
                        name: "Decline",
                        btn_type: "danger",
                        // ghost: true,
                        btn_id: elem.id,
                        loading:
                          this.state.decline_btn_loading &&
                          this.state.decline_btn_loading === elem.id
                            ? true
                            : false,
                        method: this.decline
                      },
                      {
                        name: "Approve",
                        btn_type: "primary",
                        // ghost: true,
                        btn_id: elem.id,
                        loading:
                          this.state.approve_btn_loading &&
                          this.state.approve_btn_loading === elem.id
                            ? true
                            : false,
                        method: this.approve
                      }
                    ],
                    lg: 8
                  }
                : {
                    type: "tag",
                    name: elem.status,
                    color : elem.status === 'approved' ? work_from_home_colors.green : work_from_home_colors.red,
                    lg: { span: 2, offset: 6 }
                  }
            ]
          };
        })
      }
    });
  };

  checkPageEnding = (start, end) => {
    if (start < end + 1) return "Load more";
    else return null;
  };

  paginate = page => {
    if (page) {
      this.props.history.push(`/work-from-home/approval/${page}`);
    }
  };

  render() {
    return (
      <TableWrapper>
        {this.state.table_data ? (
          <Table
            top-bod
            data={this.state.table_data}
            pagination={
              this.state.page_info.count && this.state.page_info.count > 1
                ? true
                : false
            }
          />
        ) : (
          <Skeleton active className="pad" />
        )}
        {this.state.page_info ? (
          <Paginate
            page_info={this.state.page_info}
            current={this.props.params.page}
            paginate={this.paginate}
          />
        ) : (
          ""
        )}
      </TableWrapper>
    );
  }
}

export default withRouter(Approval);
