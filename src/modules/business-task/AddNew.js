import React, { Component } from "react";
import {
  Form,
  Input,
  Typography,
  Select,
  Row,
  Col,
  Button,
  Badge,
  Icon,
  Avatar,
  Modal,
  Empty,
  Skeleton,
  DatePicker,
  TimePicker,
} from "antd";
import { Wrapper } from "../commons/Wrapper";
import { getData, postData } from "../../scripts/api-service";
import {
  GET_TASK_TYPES,
  GET_COMPANY_LIST,
  ADDRESS_BOOK_PAGE,
  CREATE_GET_BIZ_TASKS,
} from "../../scripts/api";
import dummy_pic from "../../assets/dummy.jpg";
import add_new from "../../assets/add_new.svg";
import { Redirect } from "react-router-dom";
import { slice_5 } from "../../scripts/slice";
import CreateCompany from "../commons/CreateCompany";
import moment from "moment";
import Assignee from "../../commons/Assignee";

const NOT_FOUND = "Not found";

class AddNew_ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      assignees: [],
      assignees_id: [],
      assignee_temp: [],
      employees: [],
      assignee_temp_id: [],
    };
  }

  componentDidMount() {
    this.getTaskTypes();
    this.getCompanies();
  }

  getTaskTypes = async () => {
    let res = await getData(GET_TASK_TYPES);
    this.setState({
      task_types: res.data.data,
    });
  };

  getCompanies = async () => {
    let res = await getData(GET_COMPANY_LIST);
    this.setState({
      companies: res.data.data,
    });
  };

  modal = () => {
    this.setState({
      assignee_temp: [],
      assignee_temp_id: [],
      modal: !this.state.modal,
    });
  };

  companyModal = () => {
    this.setState({
      company_temp: [],
      company_modal: !this.state.company_modal,
    });
  };

  assignee = (assignees) => {
    this.setState({
      assignees: [...assignees],
    });
  };

  newCompany = async (data) => {
    let res = await getData(GET_COMPANY_LIST);
    if (res) {
      this.props.form.setFieldsValue({
        company_name: data.company_id,
      });
      this.setState({
        companies: res.data.data,
        new_company_id: data.company_id,
        contact_person_id: data.person_id,
        contact_person: data.person,
        company_address: data.address,
        contact_number: data.contact,
      });
    }
  };

  submit = async (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ create_loading: true });
        let data = {
          company_id: values.company_name,
          type_id: values.task_type,
          attendees: this.state.assignees.map((elem) => {
            return elem.emp_id;
          }),
          date: moment(values.date).format().split("T")[0],
          time: moment(values.time).format("HH:mm"),
          // contact_person_id : this.state.contact_person_id,
          remarks: values.remarks,
        };
        // console.log(data)
        let res = await postData(CREATE_GET_BIZ_TASKS, data);
        if (res) {
          this.setState({
            red: <Redirect to="/quick-tasks/my-tasks/1/1" />,
            create_loading: null,
          });
        } else {
          this.setState({
            create_loading: null,
          });
        }
      }
    });
  };

  render() {
    return (
      <Wrapper>
        <Typography.Title className="pad" level={4}>
          Create new task
        </Typography.Title>
        <Form className="side-pad" onSubmit={this.submit}>
          <Row gutter={18}>
            <Col span={12}>
              <Form.Item label="Task type">
                {this.props.form.getFieldDecorator("task_type", {
                  // initialValue : this.state.u_title || [],
                  rules: [
                    { required: true, message: "Task type is required!" },
                  ],
                })(
                  <Select placeholder="Select task type" allowClear>
                    {this.state.task_types
                      ? this.state.task_types.map((elem) => {
                        return (
                          <Select.Option value={elem.value}>
                            {elem.title}
                          </Select.Option>
                        );
                      })
                      : []}
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="Company name">
                {this.props.form.getFieldDecorator("company_name", {
                  initialValue: this.state.new_company_id || [],
                  rules: [
                    { required: true, message: "Company name is required!" },
                  ],
                })(
                  <Select
                    onChange={(e) => {
                      this.state.companies.map((elem) => {
                        if (elem.id === e) {
                          this.setState({
                            contact_person_id: elem.contact_person[0]
                              ? elem.contact_person[0].id
                              : NOT_FOUND,
                            contact_person: elem.contact_person[0]
                              ? elem.contact_person[0].name
                              : NOT_FOUND,
                            company_address: elem.branch[0]
                              ? elem.branch[0].location_address
                              : NOT_FOUND,
                            contact_number: elem.contact_person[0]
                              ? elem.contact_person[0].phone
                              : NOT_FOUND,
                          });
                        }
                      });
                    }}
                    placeholder="Select company"
                    allowClear
                  >
                    <Select.Option key={-1} disabled>
                      <Button
                        type="link"
                        style={{ marginLeft: "-1rem" }}
                        block
                        onClick={this.companyModal}
                        className="left-text"
                      >
                        + Add new
                      </Button>
                    </Select.Option>
                    {this.state.companies
                      ? this.state.companies.map((elem) => {
                        return (
                          <Select.Option value={elem.id}>
                            {elem.name}
                          </Select.Option>
                        );
                      })
                      : []}
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="Company address">
                {this.props.form.getFieldDecorator("company_address", {
                  initialValue: this.state.company_address || [],
                })(
                  <Input
                    value={this.state.company_address || []}
                    placeholder="Company address"
                    disabled
                  />
                )}
              </Form.Item>
              <Form.Item label="Contact person name">
                {this.props.form.getFieldDecorator("contact_person", {
                  initialValue: this.state.contact_person || [],
                })(<Input placeholder="Contact person name" disabled />)}
              </Form.Item>
              <Form.Item label="Contact number">
                {this.props.form.getFieldDecorator("contact_number", {
                  initialValue: this.state.contact_number || [],
                })(<Input placeholder="Contact number" disabled />)}
              </Form.Item>
              <Form.Item required label="Task assigned to">
                <Assignee method={this.assignee} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Purpose/Remarks">
                {this.props.form.getFieldDecorator("remarks", {
                  // value : this.state.company_address || [],
                })(<Input.TextArea placeholder="Write the purpose here" />)}
              </Form.Item>
              <Form.Item label="Date">
                {this.props.form.getFieldDecorator("date", {
                  // value : this.state.company_address || [],
                  rules: [{ required: true, message: "Date is required!" }],
                })(<DatePicker />)}
              </Form.Item>
              <Form.Item label="Time">
                {this.props.form.getFieldDecorator("time", {
                  // value : this.state.company_address || [],
                  rules: [{ required: true, message: "Time is required!" }],
                })(<TimePicker style={{ width: "100%" }} format="HH:mm" />)}
              </Form.Item>
              <div className="half-pad" />
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={this.state.create_loading}
                block
              >
                Create new task
              </Button>
            </Col>
          </Row>
        </Form>
        {/* modal */}
        <Modal
          onCancel={this.companyModal}
          title="Create new company"
          visible={this.state.company_modal}
          footer={false}
        >
          <CreateCompany
            modal={this.companyModal}
            method={this.newCompany}
            status={this.state.company_modal}
          />
        </Modal>
        {this.state.red ? this.state.red : ""}
      </Wrapper>
    );
  }
}

const AddNew = Form.create()(AddNew_);
export default AddNew;
