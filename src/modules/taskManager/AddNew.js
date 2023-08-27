import React, { Component } from "react";
import { Wrapper } from "../commons/Wrapper";
import {
  Typography,
  Form,
  Button,
  Input,
  Row,
  Col,
  DatePicker,
  Avatar,
  Icon,
  Modal,
  Select,
  Skeleton,
  Empty,
  Badge,
} from "antd";
import add_new from "../../assets/add_new.svg";
import { getData, postData } from "../../scripts/api-service";
import {
  ADDRESS_BOOK_PAGE,
  CREATE_GET_PROJECT,
  CREATE_GET_TASKS,
} from "../../scripts/api";
import { slice_5 } from "../../scripts/slice";
import { alertPop } from "../../scripts/message";
import dummy_pic from "../../assets/dummy.jpg";
import { Redirect } from "react-router-dom";
import moment from "moment";
import Assignee from "../../commons/Assignee";

const priority = [
  {
    id: "Low",
    name: "Low",
  },
  {
    id: "Medium",
    name: "Medium",
  },
  {
    id: "High",
    name: "High",
  },
];

class AddNew_ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // project_page: 1,
      project_page: 1,
      employees: [],
      projects: [],
      priorities: priority,
      modal: false,
      assignee_temp: [],
      assignees: [],
      assignees_id: [],
      assignee_temp_id: [],
    };
  }

  componentWillMount() {
    if (this.props.params.details) {
      this.getDetails();
    }
  }

  componentDidMount() {
    this.projectList();
  }

  projectList = async () => {
    let res = await getData(
      `${CREATE_GET_PROJECT}?page=${this.state.project_page}${
        this.state.project_search_string
          ? `&search=${this.state.project_search_string}`
          : ""
      }`
    );
    if (res) {
      if (this.state.project_page === 1) {
        this.setState({
          projects: res.data.data.data,
          project_last_page: res.data.data.last_page,
        });
      } else {
        this.setState({
          projects: [...this.state.projects, ...res.data.data.data],
          project_last_page: res.data.data.last_page,
        });
      }
    }
  };

  projectLoadMore = () => {
    this.setState(
      {
        project_load_more_loading: true,
        project_page: this.state.project_page + 1,
      },
      () => {
        if (this.state.project_page <= this.state.project_last_page) {
          this.projectList();
        }
      }
    );
  };

  submit = async (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ btnLoading: true });
        let data = {
          project_id: values.project,
          title: values.task_title,
          description: values.task_details,
          leader_id : values.leader_id,
          employees: this.state.assignees.map((elem) => {
            return elem.emp_id;
          }),
          due_date: moment(values.completed_by).format().split("T")[0],
          label: values.task_priority,
        };
        let res = await postData(
          this.props.params.details
            ? `${CREATE_GET_TASKS}/${this.props.params.details}`
            : CREATE_GET_TASKS,
          data
        );
        if (res) {
          this.setState({
            red: (
              <Redirect
                to={
                  this.props.params.details
                    ? `/tasks/${this.props.params.name || "my-tasks"}/1/1/${
                        this.props.params.details
                      }`
                    : `/tasks/my-tasks/1/1`
                }
              />
            ),
          });
          alertPop(
            "success",
            this.props.params.update ? "Task updated." : "Task created."
          );
        }
      }
    });
  };

  modal = () => {
    this.setState({
      assignee_temp: [],
      assignee_temp_id: [],
      modal: !this.state.modal,
    });
  };

  assignee = (assignees) => {
    this.setState({
      assignees: assignees,
    });
  };

  getDetails = async () => {
    let res = await getData(`${CREATE_GET_TASKS}/${this.props.params.details}`);
    if (res) {
      this.setState({
        u_title: res.data.data.title,
        u_project: this.props.params.details ? null : res.data.data.project.id,
        u_details: res.data.data.description,
        u_label: res.data.data.label,
        u_due: res.data.data.due_date,
        u_leader_id: res.data.data.members.filter((elem) => {
          return elem.leader && elem.leader === 1
        })[0]?.emp_id,
        assignees: res.data.data.members.map((elem) => {
          return elem.profile;
        }),
      });
    }
  };

  render() {
    return (
      <Wrapper>
        <div className="half-pad" />
        <Typography.Title className="side-pad" level={4}>
          {this.props.params.details ? "Update task" : "Create task"}
        </Typography.Title>
        <Row>
          <Col span={12}>
            <Form onSubmit={this.submit} className="pad">
              <Form.Item label="task title">
                {this.props.form.getFieldDecorator("task_title", {
                  initialValue: this.state.u_title || [],
                  rules: [{ required: true, message: "Title is required!" }],
                })(
                  <Input
                    type="text"
                    placeholder={this.state.u_title || "Title"}
                  />
                )}
              </Form.Item>
              {this.props.params.details ? (
                ""
              ) : (
                <Form.Item label="project name">
                  {this.props.form.getFieldDecorator("project", {
                    initialValue: this.state.u_project || [],
                    rules: [{ required: true, message: "Select a project!" }],
                  })(
                    <Select
                      showSearch
                      filterOption={false}
                      onSearch={(e) => {
                        this.setState(
                          {
                            project_search_string: e || "",
                            projects: [],
                            project_page: 1,
                          },
                          () => {
                            this.projectList();
                          }
                        );
                      }}
                      allowClear
                      placeholder="Select a project"
                    >
                      {this.state.projects.map((elem) => {
                        return (
                          <Select.Option key={elem.id} value={elem.id}>
                            {elem.title}
                          </Select.Option>
                        );
                      })}
                      {this.state.project_last_page >=
                      this.state.project_page ? (
                        <Select.Option disabled key={-1}>
                          <Button
                            onClick={this.projectLoadMore}
                            type="link"
                            block
                          >
                            Load more
                          </Button>
                        </Select.Option>
                      ) : (
                        ""
                      )}
                    </Select>
                  )}
                </Form.Item>
              )}
              <Form.Item label="task details">
                {this.props.form.getFieldDecorator("task_details", {
                  initialValue: this.state.u_details || [],
                  rules: [{ required: true, message: "Details is required!" }],
                })(
                  <Input.TextArea
                    type="text"
                    placeholder={this.state.u_details || "Task details"}
                  />
                )}
              </Form.Item>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Priority">
                    {this.props.form.getFieldDecorator("task_priority", {
                      initialValue: this.state.u_label || [],
                      rules: [{ required: true, message: "Select priority!" }],
                    })(
                      <Select allowClear placeholder="Select priority">
                        {this.state.priorities.map((elem) => {
                          return (
                            <Select.Option value={elem.id}>
                              {elem.name}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="completed by">
                    {this.props.form.getFieldDecorator("completed_by", {
                      initialValue: this.state.u_due
                        ? moment(this.state.u_due)
                        : "",
                      rules: [{ required: true, message: "Date is required!" }],
                    })(<DatePicker />)}
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item required label="Task assigned to">
                {this.props.params.details ? (
                  this.state.assignees.length > 0 ? (
                    <Assignee
                      assigned={this.state.assignees}
                      method={this.assignee}
                    />
                  ) : (
                    <Skeleton className="pad" active />
                  )
                ) : (
                  <Assignee
                    assigned={this.state.assignees}
                    method={this.assignee}
                  />
                )}
              </Form.Item>
              <Form.Item label="Task lead (From assignee)">
                {this.props.form.getFieldDecorator("leader_id", {
                  initialValue: this.state.u_leader_id,
                  rules: [
                    { required: true, message: "Task leader is required!" },
                  ],
                })(
                  <Select
                    filterOption={false}
                    allowClear
                    placeholder="Select task lead"
                  >
                    {this.state.assignees.map((elem) => {
                      return (
                        <Select.Option key={elem.id} value={elem.emp_id}>
                          {elem.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                )}
              </Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
                {this.props.params.details ? "Update task" : "Create task"}
              </Button>
            </Form>
          </Col>
        </Row>

        {this.state.red ? this.state.red : ""}
      </Wrapper>
    );
  }
}

const AddNew = Form.create()(AddNew_);
export default AddNew;
