import React, { useState } from "react";
import { Wrapper } from "../commons/Wrapper";
import { Typography, Form, Button, Input } from "antd";
import { postData } from "../../scripts/api-service";
import { CREATE_GET_PROJECT } from "../../scripts/api";
import { alertPop } from "../../scripts/message";
import { useHistory } from "react-router-dom";
import Assignee from "../../commons/Assignee";

const AddProject = Form.create({ name: "add_project" })(props => {
  const [assignees, setAssignees] = useState();
  const [loading, setLoading] = useState();
  const history = useHistory();

  const submit = async e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        if (assignees && assignees.length > 0) {
          setLoading(true);
          const data = {
            ...values,
            employees: assignees.map(elem => elem.emp_id)
          };
          let res = await postData(CREATE_GET_PROJECT, data);
          if (res) {
            alertPop("success", "created");
            history.push(`/tasks/projects/1/1`);
          }
          setLoading(null);
        } else {
          alertPop("error", "Assignee is required");
        }
      }
    });
  };

  return (
    <Wrapper>
      <Typography.Title className="pad bottom-bod" level={4}>
        Add a project
      </Typography.Title>
      <Form className="pad" style={{ width: "50%" }} onSubmit={submit}>
        <Form.Item label="Project title">
          {props.form.getFieldDecorator("title", {
            rules: [{ required: true, message: "Title is required!" }]
          })(<Input placeholder="Project title" />)}
        </Form.Item>
        <Form.Item label="Project description">
          {props.form.getFieldDecorator("description", {
            rules: [{ required: true, message: "Description is required!" }]
          })(<Input.TextArea placeholder="Project description" />)}
        </Form.Item>
        <Form.Item name="assignees" label="Project assignee">
          <Assignee method={setAssignees} />
        </Form.Item>
        <Form.Item name="button">
          <Button
            size="large"
            htmlType="submit"
            type="primary"
            loading={loading}
            block
          >
            Create project
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
});

export default AddProject;
