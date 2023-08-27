/** @format */

import { Button, Col, Form, Row } from "antd";
import React, { useEffect } from "react";
import styled from "styled-components";
import { Flex } from "../Flex";

const Helper = styled.p`
  font-size: 0.8rem;
  margin: -0.5rem 0 -1rem 0;
  color: gray;
`;

export const CreateForm = Form.create()(
  ({ form, submit, fields, loading, edit, isView, setColor, flag }) => {
    const localSubmit = (e) => {
      e.preventDefault();
      form.validateFields((err, values) => {
        // console.log(values);
        if (!err) submit(values, form);
      });
    };

    useEffect(() => {
      if (edit) {
        form.setFieldsValue(edit);
        if (flag === "color") setColor({ hex: edit.color });
      }
    }, [edit]);

    useEffect(() => {
      // console.log(form, submit, fields, loading, edit, isView, setColor, flag );
    }, []);

    return (
      <Form onSubmit={localSubmit}>
        {fields &&
          fields.map(({ id, label, name, component, helper, components }) => (
            <Form.Item label={label} key={`form-item-${id}`}>
              {components && components.length ? (
                <>
                  <Flex full justify="space-between">
                    {components.map(({ id, name, component, required }) => (
                      <>
                        {form.getFieldDecorator(name, {
                          rules: [{ required: required, message: "Required!" }],
                        })(component)}
                      </>
                    ))}
                  </Flex>
                </>
              ) : (
                <>
                  {form.getFieldDecorator(name, {
                    rules: [{ required: true, message: "Required!" }],
                  })(component)}
                </>
              )}

              {helper && <Helper>{helper}</Helper>}
            </Form.Item>
          ))}
        {!isView ? (
          <Button
            loading={loading}
            size="large"
            block
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        ) : (
          ""
        )}
      </Form>
    );
  },
);
