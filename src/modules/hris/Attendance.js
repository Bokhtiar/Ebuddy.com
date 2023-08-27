import React, { Component } from "react";
import { Skeleton } from "antd";
import { getData } from "../../scripts/getData";
import * as Cookies from "js-cookie";
import { WEEKLY_ATTENDANCE } from "../../scripts/api";
import { TableWrapper } from "../commons/Wrapper";
import Table from "../commons/Table";

const statuses = {
  1: {
    title: "Normal",
    color: "#4caf50"
  },
  2: {
    title: "Late In",
    color: "#ff9800"
  },
  3: {
    title: "Half Day",
    color: "#fbc02d"
  },
  4: {
    title: "Absence",
    color: "#f44336"
  }
};

const NOT_FOUND = "Not found";

class Attendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
      myProfile: JSON.parse(Cookies.get("profile")),
      modal: false,
      loading: <Skeleton className="pad" />,
      statuses: [
        { id: 1, title: "Normal" },
        { id: 2, title: "Absent" },
        { id: 3, title: "Half-day" }
      ]
    };
  }

  componentDidMount() {
    this.view(WEEKLY_ATTENDANCE);
  }

  view = async que => {
    let res = await getData(que);
    if (res) {
      if (res?.data?.data?.length > 0) {
        this.setState(
          {
            allData: res?.data?.data
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
    }
  };

  prepareTable = () => {
    this.setState({
      table_data: {
        width_class: "width-1000",
        header: [
          {
            type: "text",
            name: "employee name",
            lg: 5
          },
          {
            type: "text",
            name: "department",
            lg: 3
          },
          {
            type: "text",
            name: "id",
            lg: 2
          },
          {
            type: "text",
            name: "date",
            lg: 5
          },
          {
            type: "text",
            name: "in time",
            lg: 2
          },
          {
            type: "text",
            name: "out time",
            lg: 2
          },
          {
            type: "text",
            name: "time spent",
            lg: 3
          },
          {
            type: "text",
            name: "status",
            lg: 2
          }
        ],
        body: this.state.allData.reverse().map(elem => {
          return {
            data: [
              {
                type: "text",
                name: this.state.myProfile.name || NOT_FOUND,
                lg: 5
              },
              {
                type: "text",
                name: this.state.myProfile.department || NOT_FOUND,
                lg: 3
              },
              {
                type: "text",
                name: this.state.myProfile.emp_id || NOT_FOUND,
                lg: 2
              },
              {
                type: "text",
                name: elem.date
                  ? `${elem.date.split(",")[1]}${elem.date.split(",")[2]}`
                  : NOT_FOUND,
                lg: 5
              },
              {
                type: "text",
                name: elem.first_in_time || NOT_FOUND,
                lg: 2
              },
              {
                type: "text",
                name: elem.last_out || NOT_FOUND,
                lg: 2
              },
              {
                type: "text",
                name: elem.spent_working_hours || NOT_FOUND,
                lg: 3
              },
              {
                type: "tag",
                color:
                  statuses[
                    elem.attendance_status === "Absence"
                      ? 4
                      : elem.attendance_status === "Late In"
                      ? 3
                      : elem.attendance_status === "Normal"
                      ? 1
                      : 2
                  ].color,
                name: elem.attendance_status,
                lg: 2
              }
            ]
          };
        })
      }
    });
  };

  render() {
    return (
      <TableWrapper>
        {this.state.table_data ? (
          <Table data={this.state.table_data} />
        ) : (
          <Skeleton active className="pad" />
        )}
      </TableWrapper>
    );
  }
}

export default Attendance;
