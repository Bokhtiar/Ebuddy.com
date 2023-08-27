import React, { Component, Fragment } from "react";
import { TableWrapper } from "../commons/Wrapper";
import Table from "../commons/Table";
import moment from "moment";
import { withRouter, Link } from "react-router-dom";
import SearchFilter from "../commons/SearchFilter";
import {
  MY_MEETING,
  CREATED_ONLY,
  SUBORDINATE_MEETING,
  SUBORDINATES
} from "../../scripts/api";
import { my_meeting_status } from "../../scripts/meeting/meeting-status";
import { Button, Row, Skeleton } from "antd";
import { _meeting_ } from "../../scripts/colors";
import { getData } from "../../scripts/api-service";

const NOT_FOUND = "Not found";

const meeting_api = {
  "my-meeting": MY_MEETING,
  "created-only": CREATED_ONLY,
  subordinate: SUBORDINATE_MEETING
};

// const filterOptions =

class MyMeeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subs: [],
      filterOptions: [
        {
          type: "dropdown",
          name: "Meeting status",
          return_value: "status",
          // required : true,
          options: [
            {
              id: 1,
              name: "Active"
            },
            {
              id: 2,
              name: "Review"
            },
            {
              id: 3,
              name: "Cancelled"
            },
            {
              id: 4,
              name: "Rejected"
            },
            {
              id: 5,
              name: "Started"
            },
            {
              id: 6,
              name: "Completed"
            }
          ]
        },
        {
          type: "date_range"
          // required : true,
        }
      ]
    };
  }

  api = () => {
    return `${meeting_api[this.props.params.name || "my-meeting"]}?page=${
      this.props.params.page
    }${
      this.props.params.status
        ? `&${
            my_meeting_status.filter(elem => {
              return this.props.params.status === elem.id;
            })[0].ext
          }`
        : ""
    }${
      this.props.params.name === "subordinate" &&
      this.props.params.status === "3"
        ? `&date_to=${
            moment()
              .add(3, "days")
              .format()
              .split("T")[0]
          }`
        : ""
    }`;
  };

  componentDidMount() {
    this.subordinateList();
    this.view(this.api());
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        filterOptions: [
          {
            type: "dropdown",
            name: "Meeting status",
            return_value: "status",
            // required : true,
            options: [
              {
                id: 1,
                name: "Active"
              },
              {
                id: 2,
                name: "Review"
              },
              {
                id: 3,
                name: "Cancelled"
              },
              {
                id: 4,
                name: "Rejected"
              },
              {
                id: 5,
                name: "Started"
              },
              {
                id: 6,
                name: "Completed"
              }
            ]
          },
          {
            type: "date_range"
            // required : true,
          },
          this.props.params.name === "subordinate"
            ? {
                type: "dropdown",
                name: "Subordinate members",
                return_value: "emp_id",
                options: this.state.subs || []
              }
            : {}
        ]
      });
      this.view(this.api());
    }
  }

  subordinateList = async () => {
    let res = await getData(SUBORDINATES);
    this.setState({
      subs: res.data.data.map(elem => {
        return {
          id: elem.emp_id,
          name: elem.name
        };
      })
    });
  };

  view = async que => {
    this.setState({
      table_data: null
    });
    que = `${que}${
      this.state.search_string ? `&title=${this.state.search_string}` : ""
    }${this.state.status ? `&status=${this.state.status}` : `&status=1`}${
      this.state.meeting_location
        ? `&meeting_location=${this.state.meeting_location}`
        : ""
    }${
      this.state.filter_date_from
        ? `&date_from=${this.state.filter_date_from}`
        : ""
    }${
      this.state.filter_date_to ? `&date_to=${this.state.filter_date_to}` : ""
    }`;

    //subordinates work-around
    if (this.props.params.name === "subordinate" && this.state.emp_id) {
      que = `${meeting_api["my-meeting"]}&emp_id=${this.state.emp_id}${
        this.state.status ? `&status=${this.state.status}` : '&status=1'
      }${
        this.state.filter_date_from
          ? `&date_from=${this.state.filter_date_from}`
          : ""
      }${
        this.state.filter_date_to ? `&date_to=${this.state.filter_date_to}` : ""
      }`;
    }

    let res = await getData(que);
    if (res) {
      this.setState(
        {
          allData: res.data.data
        },
        () => {
          this.prepareTable();
        }
      );
    } else {
      this.setState({
        table_data: []
      });
    }
  };

  prepareTable = () => {
    this.setState({
      table_data: {
        width_class: "width-1000",
        header: [
          {
            type: "text",
            name: "meeting title",
            lg: 12
          },
          {
            type: "text",
            name: "Status",
            lg: 5
          },
          {
            type: "text",
            name: "Date",
            lg: { offset: 1, span: 6 }
          }
        ],
        body: this.state.allData.map(elem => {
          return {
            to: `/meeting/${this.props.params.name || "my-meeting"}/${this.props
              .params.page || "1"}/${this.props.params.status || "1"}/${
              elem.id
            }`,
            data: [
              {
                type: "text",
                name: elem.booking_details.title,
                lg: 12
              },
              {
                type: "tag",
                name: _meeting_.title[elem.status] || NOT_FOUND,
                color: _meeting_.color[elem.status] || "black",
                lg: 5
              },
              {
                type: "text",
                name: moment(elem.booking_details.date).format("DD MMM YYYY"),
                lg: { offset: 1, span: 6 }
              }
            ]
          };
        })
      }
    });
  };

  search = link => {
    if (link || this.state.search_string) {
      this.setState(
        {
          search_string: link
        },
        () => {
          this.view(this.api());
        }
      );
    }
  };

  filter = filters => {
    if (filters) {
      this.setState(
        {
          filter_date_from: filters.date_from || "",
          filter_date_to: filters.date_to || "",
          status: filters.status || "",
          emp_id: filters.emp_id || ""
        },
        () => {
          this.view(this.api());
        }
      );
    } else {
      this.setState(
        {
          filter_date_from: null,
          filter_date_to: null,
          status: null,
          emp_id: null
        },
        () => {
          this.view(this.api());
        }
      );
    }
  };

  paginate = page => {
    if (page) {
      this.props.history.push(
        `/meeting/${this.props.params.name || "my-meeting"}/${page}/${
          this.props.params.id
        }`
      );
    }
  };

  render() {
    return (
      <TableWrapper>
        <SearchFilter
          search={this.search}
          filter={this.filter}
          filterOptions={this.state.filterOptions}
          failsafe
        />
        <div className="half-pad" />
        <Row className="side-pad">
          {my_meeting_status.map(btn => {
            return (
              <Link
                to={`/meeting/${this.props.params.name || "my-meeting"}/1/${
                  btn.id
                }`}
                className="filter-btn"
              >
                <Button
                  type={this.props.params.status === btn.id ? "primary" : ""}
                >
                  {btn.name}
                </Button>
              </Link>
            );
          })}
        </Row>
        {this.state.table_data ? (
          <Table top-bod data={this.state.table_data} />
        ) : (
          <Skeleton className="pad" active />
        )}
      </TableWrapper>
    );
  }
}

export default withRouter(props => <MyMeeting {...props} />);
