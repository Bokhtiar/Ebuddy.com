import React, { Component } from "react";
import { Form, Input, Typography, Row, Button, Skeleton } from "antd";
import { TableWrapper } from "../commons/Wrapper";
import SearchFilter from "../commons/SearchFilter";
import { Link, withRouter } from "react-router-dom";
import { TEAM_MEMBERS } from "../../scripts/api";
import { getData, postData } from "../../scripts/api-service";
import Table from "../commons/Table";
import dummy from "../../assets/dummy.jpg";
import { busines_task_status_color, work_from_home_colors } from "../../scripts/colors";
import Paginate from "../commons/Paginate";
import { alertPop } from "../../scripts/message";

const NOT_FOUND = "Not found";

class Subordinates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //todo
    };
  }

  componentDidMount() {
    this.view(TEAM_MEMBERS);
  }

  workStationPhoto = link => {
    window.open(link, "_blank");
  };

  view = async que => {
    let res = await getData(que);
    if (res) {
      this.setState(
        {
          allData: res.data.data,
          tempData: res.data.data,
          page_info: {
            current_page: res.data.data.current_page,
            count: res.data.data.last_page || 0
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
            name: "Employee name",
            lg: 7
          },
          {
            type: "text",
            name: "Employee ID",
            lg: 2
          },
          {
            type : 'text',
            name : 'Workstation',
            lg : 3
          },
          {
            type : 'text',
            name : 'Desktop agent',
            lg : 3
          },
          {
            type : 'text',
            name : 'Status',
            lg : 3
          },
          {
            type: "text",
            name: "Screenshots",
            lg: 3
          },
          {
            type: "text",
            name: "Time logs",
            lg: 3
          }
        ],
        body: this.state.tempData?.map(elem => {
          return {
            data: [
              {
                type: "head",
                src: elem.profile_pic || NOT_FOUND,
                size: "large",
                lg: 1
              },
              {
                type: "text",
                name: elem.name || NOT_FOUND,
                lg: 6
              },
              {
                type: "text",
                name: elem.emp_id || NOT_FOUND,
                lg: 2
              },
              elem.track ?
              {
                type : 'tag',
                name : elem.track?.workstation_image_uploaded === 1 ? 'Uploaded' : 'No data',
                color : elem.track?.workstation_image_uploaded === 1 ? work_from_home_colors.green : work_from_home_colors.red,
                lg : 3
              } :
              {
                type : 'tag',
                name : 'No data',
                color : work_from_home_colors.red,
                lg : 3
              },
              elem.track ?
              {
                type : 'tag',
                name : elem.track?.desktop_agent_installed === 1 ? 'Installed' : 'Not installed',
                color : elem.track?.desktop_agent_installed === 1 ? work_from_home_colors.green : work_from_home_colors.red,
                lg : 3
              } :
              {
                type : 'tag',
                name : 'Not installed',
                color : work_from_home_colors.red,
                lg : 3
              },
              elem.track ?
              {
                type : 'tag',
                name : elem.track?.status,
                color : elem.track?.status === 'approved' ? work_from_home_colors.green : work_from_home_colors.red,
                lg : 3
              } :
              {
                type : 'tag',
                name : 'Not applied',
                color : work_from_home_colors.red,
                lg : 3
              },
              {
                type: "style-btn",
                name: "Screenshots",
                // ghost: true,
                to: `/work-from-home/team-members/details/${elem.emp_id}`,
                lg: 3
              },
              {
                type: "style-btn",
                name: "Logs",
                // ghost: true,
                to: `/work-from-home/team-members/logs/${elem.emp_id}`,
                lg: 3
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
          <Table
            top-bod
            data={this.state.table_data}
          />
        ) : (
          <Skeleton active className="pad" />
        )}
      </TableWrapper>
    );
  }
}

export default withRouter(Subordinates);
