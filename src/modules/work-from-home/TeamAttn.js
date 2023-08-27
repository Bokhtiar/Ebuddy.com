import React, { Component } from "react";
import { Form, Input, Typography, Row, Button, Skeleton } from "antd";
import { TableWrapper } from "../commons/Wrapper";
import SearchFilter from "../commons/SearchFilter";
import { Link, withRouter } from "react-router-dom";
import {
  PENDING_APPLICATIONS,
  REVIEW_APPLICATION,
  SUBORDINATES,
  TEAM_ATTENDANCE
} from "../../scripts/api";
import { getData, postData } from "../../scripts/api-service";
import Table from "../commons/Table";
import dummy from "../../assets/dummy.jpg";
import { busines_task_status_color, work_from_home_colors } from "../../scripts/colors";
import Paginate from "../commons/Paginate";
import { alertPop } from "../../scripts/message";

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

class TeamAttn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempData : []
    };
  }

  componentDidMount() {
    this.view(TEAM_ATTENDANCE);
  }

  view = async que => {
    let res = await getData(que);
    if (res && res.data?.data) {
      this.setState(
        {
          allData: res.data.data,
          tempData: res.data.data
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
            name: "Employee name",
            lg: 8
          },
          {
            type: "text",
            name: "Employee ID",
            lg: 5
          },
          {
            type: "text",
            name: "Status",
            lg: 4
          },
          {
            type: "text",
            name: "In time",
            lg: { span: 4, offset: 3 }
          }
        ],
        body: this.state.tempData.map(elem => {
          return {
            data: [
              {
                type: "text",
                name: elem.employee?.name || NOT_FOUND,
                lg: 8
              },
              {
                type: "text",
                name: elem.employee?.emp_id || NOT_FOUND,
                lg: 5
              },
              {
                type: "tag",
                name: elem.attendance_status?.status,
                lg : 4,
                color:
                  elem.attendance_status?.status.toLowerCase() === "absent" ? work_from_home_colors.red : 
                  // elem.attendance_status?.status.toLowerCase() === "absence" ? work_from_home_colors.red : 
                  elem.attendance_status?.status.toLowerCase() === "late in" ? work_from_home_colors.orange :
                  elem.attendance_status?.status.toLowerCase() === "leave" ? work_from_home_colors.blue : work_from_home_colors.green
              },
              {
                type: "text",
                name: elem.first_in_time || NOT_FOUND,
                lg : { span: 4, offset: 3 }
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
        {console.log("this.state.table_data>>>>>>>", this.state.table_data)}
        {this.state.table_data ? (
          <Table top-bod data={this.state.table_data} />
        ) : (
          <Skeleton active className="pad" />
        )}
      </TableWrapper>
    );
  }
}

export default withRouter(TeamAttn);
