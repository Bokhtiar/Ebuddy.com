import React, { Component } from "react";
import { TableWrapper } from "../commons/Wrapper";
import SearchFilter from "../commons/SearchFilter";
import Table from "../commons/Table";
import { Link, withRouter } from "react-router-dom";
import { Skeleton, Row, Button } from "antd";
import {
  CREATE_GET_TASKS,
  CREATE_GET_PROJECT,
  GET_TASK_BY_PROJECT,
} from "../../scripts/api";
import { getData } from "../../scripts/api-service";
import Paginate from "../commons/Paginate";
import dummy from "../../assets/dummy.jpg";
import { task_manager_priority } from "../../scripts/colors";

const NOT_FOUND = "Not found";

const task_status = [
  {
    id: 1,
    name: "To-do",
  },
  {
    id: 2,
    name: "Doing",
  },
  {
    id: 3,
    name: "Completed",
  },
  {
    id: 4,
    name: "Reviewed",
  },
];

const status = {
  1: "to do",
  2: "doing",
  3: "completed",
  4 : "reviewed"
};

class MyTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      project_page: 1,
      load_project_btn: "Load more",
    };
  }

  componentDidMount() {
    this.loadProject();
    const initial_query = `${
      this.props.params.task ? GET_TASK_BY_PROJECT : CREATE_GET_TASKS
    }${
      this.props.params.task
        ? this.props.params.task.includes("emp")
          ? `?emp_id=${this.props.params.task.split("emp")[1]}&`
          : `?project_id=${this.props.params.task}&`
        : "?"
    }page=${
      (this.props.params.task
        ? this.props.params.tpage
        : this.props.params.page) || 1
    }${
      this.props.params.task
        ? `&status=${status[this.props.params.tstatus]}`
        : `&status=${status[this.props.params.status]}`
    }${this.props.params.name === 'assigned-by-me' ? `&created_only=true` : ''}`;
    this.view(initial_query);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const page_change_query = `${
        this.props.params.task ? GET_TASK_BY_PROJECT : CREATE_GET_TASKS
      }${
        this.props.params.task
          ? this.props.params.task.includes("emp")
            ? `?emp_id=${this.props.params.task.split("emp")[1]}&`
            : `?project_id=${this.props.params.task}&`
          : "?"
      }page=${
        (this.props.params.task
          ? this.props.params.tpage
          : this.props.params.page) || 1
      }${
        this.props.params.task
          ? `&status=${status[this.props.params.tstatus]}`
          : `&status=${status[this.props.params.status]}`
      }${this.props.params.name === 'assigned-by-me' ? `&created_only=true` : ''}`;
      this.view(page_change_query);
    }
  }

  checkPageEnding = (start, end) => {
    if (start < end + 1) return "Load more";
    else return null;
  };

  filterOptions = () => {
    this.setState({
      filterOptions: [
        {
          type: "dropdown",
          async: this.checkPageEnding(
            this.state.project_page,
            this.state.project_last_page
          ),
          async_func: this.loadProject,
          name: "Project",
          return_value: "project_id",
          options: this.state.projects,
        },
        {
          type: "date",
          name: "Due date",
          return_value: "due_date",
        },
      ],
    });
  };

  loadProject = async () => {
    let res = await getData(
      `${CREATE_GET_PROJECT}?page=${this.state.project_page}`
    );
    if (res) {
      this.setState(
        {
          project_last_page: res.data.data.last_page,
          project_page: ++this.state.project_page,
          projects: [
            ...this.state.projects,
            ...res.data.data.data.map((elem) => {
              return {
                id: elem.id,
                name: elem.title,
              };
            }),
          ],
        },
        () => {
          this.filterOptions();
        }
      );
      //todo
    }
  };

  view = async (que) => {
    let res = await getData(
      `${que}${
        this.state.search_string ? `&search=${this.state.search_string}` : ""
      }${this.state.project_id ? `&project_id=${this.state.project_id}` : ""}${
        this.state.due_date
          ? `&due_date=${this.state.due_date.split("T")[0]}`
          : ""
      }${
        this.props.params.name === "subordinate"
          ? `&emp_id=${this.props.params.name.split("-")[1]}`
          : ""
      }`
    );
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
            count: res.data.data.last_page,
          },
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
            lg: 5,
          },
          {
            type: "text",
            name: "project",
            lg: 4,
          },
          {
            type: "text",
            name: "created by",
            lg: 5,
          },
          {
            type: "text",
            name: "deadline",
            lg: 3,
          },
          {
            type: "text",
            name: "priority",
            lg: 2,
          },
          {
            type: "text",
            name: "task assignee",
            lg: 5,
          },
        ],
        body: this.state.tempData
          ? this.state.tempData.map((elem) => {
              return {
                to: this.props.params.task
                  ? this.props.params.task.includes("emp")
                    ? `/tasks/subordinates/${this.props.params.page || 1}/${
                        this.props.params.id || 1
                      }/${elem.id}`
                    : `/tasks/projects/${this.props.params.page || 1}/${
                        this.props.params.id || 1
                      }/${elem.id}`
                  : `/tasks/${this.props.params.name || "my-tasks"}/${
                      this.props.params.page || 1
                    }/${this.props.params.id || 1}/${elem.id}`,
                data: [
                  {
                    type: "text",
                    name: elem.title || NOT_FOUND,
                    lg: 5,
                  },
                  {
                    type: "text",
                    name: elem.project.title || NOT_FOUND,
                    lg: 4,
                  },
                  {
                    type: "head",
                    src: elem.creator_profile.profile_pic,
                    lg: 1,
                  },
                  {
                    type: "text",
                    name: elem.creator_profile.name || NOT_FOUND,
                    lg: 4,
                  },
                  {
                    type: "text",
                    name: elem.due_date || NOT_FOUND,
                    lg: 3,
                  },
                  {
                    type: "tag",
                    color: task_manager_priority[elem.label],
                    name: elem.label,
                    lg: 2,
                  },
                  {
                    type: "head-array",
                    src: elem.members.map((user) => {
                      return {
                        id: user.profile.emp_id,
                        name: user.profile.name,
                        profile_pic: user.profile.profile_pic || dummy,
                      };
                    }),
                    lg: 5,
                  },
                ],
              };
            })
          : [],
      },
    });
  };

  search = (link) => {
    this.setState(
      {
        search_string: link,
        project_id: null,
      },
      () => {
        this.view(
          `${this.props.params.task ? GET_TASK_BY_PROJECT : CREATE_GET_TASKS}${
            this.props.params.task
              ? this.props.params.task.includes("emp")
                ? `?emp_id=${this.props.params.task.split("emp")[1]}&`
                : `?project_id=${this.props.params.task}&`
              : "?"
          }page=1${
            this.props.params.task
              ? `&status=${status[this.props.params.tstatus]}`
              : `&status=${status[this.props.params.status]}`
          }`
        );
        this.props.history.push(
          this.props.params.task
            ? `/tasks/${this.props.params.name}/${this.props.params.page}/${
                this.props.params.status || 1
              }/view/${this.props.params.task}/1/${this.props.params.tstatus}`
            : `/tasks/${this.props.params.name || "my-tasks"}/1/${
                this.props.params.status || 1
              }`
        );
      }
    );
  };

  filter = (filters) => {
      this.setState(
        {
          project_id: filters?.project_id ? filters.project_id : null,
          due_date: filters?.due_date ? filters.due_date : null,
          table_data: null,
        },
        () => {
          this.view(
            `${
              this.props.params.task ? GET_TASK_BY_PROJECT : CREATE_GET_TASKS
            }${
              this.props.params.task
                ? this.props.params.task.includes("emp")
                  ? `?emp_id=${this.props.params.task.split("emp")[1]}&`
                  : `?project_id=${this.props.params.task}&`
                : "?"
            }page=1${
              this.props.params.task
                ? `&status=${status[this.props.params.tstatus]}`
                : `&status=${status[this.props.params.status]}`
            }`
          );
          this.props.history.push(
            this.props.params.task
              ? `/tasks/${this.props.params.name}/${this.props.params.page}/${
                  this.props.params.status || 1
                }/view/${this.props.params.task}/1/${this.props.params.tstatus}`
              : `/tasks/${this.props.params.name || "my-tasks"}/1/${
                  this.props.params.status || 1
                }`
          );
        }
      );
  };

  paginate = (page) => {
    if (page) {
      this.props.params.task
        ? this.props.history.push(
            `/tasks/${this.props.params.name}/${this.props.params.page}/${
              this.props.params.status || 1
            }/view/${this.props.params.task}/${page}/${
              this.props.params.tstatus
            }`
          )
        : this.props.history.push(
            `/tasks/${this.props.params.name || "my-tasks"}/${page}/${
              this.props.params.status || 1
            }`
          );
    }
  };

  render() {
    return (
      <TableWrapper>
        {/* {this.props.params.task ? (
          ""
        ) : (
          <> */}
        <SearchFilter
          search={this.search}
          filter={this.filter}
          filterOptions={this.state.filterOptions || ""}
          failsafe
        />
        <div className="half-pad" />
        {/* </>
        )} */}
        <Row className="side-pad">
          {task_status.map((btn) => {
            return (
              <Link
                to={
                  this.props.params.task
                    ? `/tasks/${this.props.params.name || "my-tasks"}/1/${
                        this.props.params.page
                      }/view/${this.props.params.task}/${
                        this.props.params.tpage
                      }/${btn.id}`
                    : `/tasks/${this.props.params.name || "my-tasks"}/1/${
                        btn.id
                      }`
                }
                className="filter-btn"
              >
                <Button
                  onClick={() => {
                    this.setState({
                      table_data: null,
                    });
                  }}
                  type={
                    this.props.params.task
                      ? this.props.params.tstatus == btn.id
                        ? "primary"
                        : ""
                      : this.props.params.status == btn.id
                      ? "primary"
                      : ""
                  }
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

export default withRouter((props) => <MyTask {...props} />);
