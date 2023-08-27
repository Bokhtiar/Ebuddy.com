import React, { Component } from "react";
import { TableWrapper } from "../commons/Wrapper";
import SearchFilter from "../commons/SearchFilter";
import Table from "../commons/Table";
import { Link } from 'react-router-dom'
import { Skeleton, Row, Button } from "antd";
import { DELAYED_TASKS } from "../../scripts/api";
import { getData } from "../../scripts/api-service";

const task_status = [
  {
    id : 1,
    name : 'To-do'
  },
  {
    id : 2,
    name : 'Doing'
  },
  {
    id : 3,
    name : 'Completed'
  }
]

export default class Delayed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //todo
    };
  }

  componentDidMount() {
    this.view(DELAYED_TASKS);
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
            name: "title",
            lg: 5
          },
          {
            type: "text",
            name: "project",
            lg: 4
          },
          {
            type: "text",
            name: "created by",
            lg: 4
          },
          {
            type: "text",
            name: "deadline",
            lg: 3
          },
          {
            type: "text",
            name: "priority",
            lg: 2
          },
          {
            type: "text",
            name: "task assignee",
            lg: 6
          }
        ],
        body: []
      }
    });
  };

  render() {
    return (
      <TableWrapper>
        <SearchFilter search filter />
        <div className="half-pad" />
        <Row className="side-pad">
          {task_status.map(btn => {
            return (
              <Link
                to={`/tasks/${this.props.params.name || "delayed-tasks"}/1/${
                  btn.id
                }`}
                className="filter-btn"
              >
                <Button
                  disabled={btn.id !== 1} //specially treated for 'delayed'
                  type={this.props.params.status == btn.id ? "primary" : ""}
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
          <Skeleton active className="pad" />
        )}
      </TableWrapper>
    );
  }
}
