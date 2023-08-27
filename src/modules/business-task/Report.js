import React, { Component } from "react";
import { Form, Input, Typography, Row, Button, Skeleton } from "antd";
import { TableWrapper } from "../commons/Wrapper";
import SearchFilter from "../commons/SearchFilter";
import { Link, withRouter } from "react-router-dom";
import { GET_BIZ_TASK_REPORTING } from "../../scripts/api";
import { getData } from "../../scripts/api-service";
import Table from "../commons/Table";
import dummy from "../../assets/dummy.jpg";
import { busines_task_status_color } from "../../scripts/colors";
import Paginate from "../commons/Paginate";

const NOT_FOUND = "Not found";

const status = [
  {
    id: 1,
    name: "Pending"
  },
  {
    id: 4,
    name: "Running"
  },
  {
    id: 2,
    name: "Cancelled"
  },
  {
    id: 3,
    name: "Completed"
  }
];

const to_call = {
  1: "pending",
  2: "cancelled",
  3: "completed",
  4: "running"
};

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterOptions: [
        {
          type: "date_range"
        }
      ]
    };
  }

  componentDidMount() {
    this.view(
      `${GET_BIZ_TASK_REPORTING}?page=${this.props.params.page}&status=${
        to_call[this.props.params.status]
      }`
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      //   const page_change_query = `${CREATE_GET_TASKS}?page=${this.props.params
      //     .page || 1}&status=${status[this.props.params.status]}`;
      this.view(
        `${GET_BIZ_TASK_REPORTING}?page=${this.props.params.page}&status=${
          to_call[this.props.params.status]
        }${this.state.date_from ? `&from_date=${this.state.date_from}` : ""}${
          this.state.date_to ? `&to_date=${this.state.date_to}` : ""
        }`
      );
    }
  }

  view = async que => {
    let res = await getData(que);
    if (res) {
      this.setState(
        {
          allData: res.data.data.data,
          tempData: res.data.data.data,
          page_info: {
            current_page: res.data.data.current_page,
            prev_page_url: res.data.data.prev_page_url
              ? res.data.data.prev_page_url.split("imaladin.com/")[1]
              : null,
            next_page_url: res.data.data.next_page_url
              ? res.data.data.next_page_url.split("imaladin.com/")[1]
              : null,
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
            name: "type",
            lg: 4
          },
          {
            type: "text",
            name: "task assignee",
            lg: 5
          },
          {
            type: "text",
            name: "company info",
            lg: 5
          },
          {
            type: "text",
            name: "date/time",
            lg: 4
          },
          {
            type: "text",
            name: "status",
            lg: 3
          },
        ],
        body: this.state.tempData.map(elem => {
          return {
            to: `/quick-tasks/${this.props.params.name}/${this.props.params.page}/${this.props.params.status}/${elem.id}`,
            data: [
              {
                type: "text",
                name: elem.type_name || NOT_FOUND,
                lg: 4
              },
              {
                type: "head-array",
                src: elem.attendees.map(user => {
                  return {
                    id: user.profile.emp_id,
                    name: user.profile.name,
                    profile_pic: user.profile.profile_pic || dummy
                  };
                }),
                lg: 5
              },
              {
                type: "text",
                name: elem.company_info ? elem.company_info.name : NOT_FOUND,
                lg: 3
              },
            //   {
            //     type: "head",
            //     src: elem.creator_profile.profile_pic || dummy,
            //     lg: 1
            //   },
            //   {
            //     type: "text",
            //     name: elem.creator_profile.name || NOT_FOUND,
            //     lg: 4
            //   },
              {
                type: "text",
                name:
                  elem.date && elem.time
                    ? `${elem.date}-${elem.time}`
                    : NOT_FOUND,
                lg: 4
              },
              {
                type: "tag",
                color: busines_task_status_color.color[elem.status],
                name:
                  elem.status.charAt(0).toUpperCase() +
                    elem.status.substring(1) || NOT_FOUND,
                lg: 3
              },
              
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

  filter = filters => {
    if (filters) {
      this.setState(
        {
          date_from: filters.date_from || null,
          date_to: filters.date_to || null,
          table_data: null
        },
        () => {
          const filtered_query = `${GET_BIZ_TASK_REPORTING}?page=1&from_date=${
            this.state.date_from
          }&to_date=${this.state.date_to}&status=${
            to_call[this.props.params.status]
          }`;
          this.view(filtered_query);
          this.props.history.push(
            `/quick-tasks/${this.props.params.name || "my-tasks"}/1/${this.props
              .params.status || 1}`
          );
        }
      );
    } else {
      this.setState(
        {
          date_from: null,
          date_to: null,
          table_data: null
        },
        () => {
          this.view(
            `${GET_BIZ_TASK_REPORTING}?page=${this.props.params.page}&status=${
              to_call[this.props.params.status]
            }${
              this.state.date_from ? `&from_date=${this.state.date_from}` : ""
            }${this.state.date_to ? `&to_date=${this.state.date_to}` : ""}`
          );
          this.props.history.push(
            `/quick-tasks/${this.props.params.name || "my-tasks"}/1/${this.props
              .params.status || 1}`
          );
        }
      );
    }
  };

  paginate = page => {
    if (page) {
      this.props.history.push(
        `/quick-tasks/${this.props.params.name || "my-tasks"}/${page}/${this
          .props.params.status || 1}`
      );
    }
  };

  render() {
    return (
      <TableWrapper>
        <SearchFilter
          filter={this.filter}
          filterOptions={this.state.filterOptions || ""}
          failsafe
        />
        <div className="half-pad" />
        <Row className="side-pad">
          {status.map(btn => {
            return (
              <Link
                to={`/quick-tasks/${this.props.params.name || "my-tasks"}/1/${
                  btn.id
                }`}
                className="filter-btn"
              >
                <Button
                  onClick={() => {
                    this.setState({
                      table_data: null
                    });
                  }}
                  type={this.props.params.status == btn.id ? "primary" : ""}
                >
                  {btn.name}
                </Button>
              </Link>
            );
          })}
        </Row>
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

export default withRouter(Report);
