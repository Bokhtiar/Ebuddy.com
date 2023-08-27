import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Radio, Select, Checkbox, Table, Row, Col } from "antd";

export default function ListDetails({ form, itemId, questions, cardId }) {

    useEffect(() => {
        if (questions && itemId) {
            let data = {};
            data[`id-${itemId}`] = itemId;
            data[`name-${itemId}`] = questions.name;
            data[`status-${itemId}`] = questions.status;

            form.setFieldsValue(data);
        }
    }, [cardId, questions])

    return (
        <>
            <Row gutter={32}>
                <Form.Item label={'id'} className="d-none">
                    {form.getFieldDecorator(`id-${itemId}`, {
                        rules: [{ required: false, message: "Required!" }],
                        // initialValue: index
                    })(<Input disabled />)}
                </Form.Item>
                <Col span={18}>
                    <Form.Item label={'Question Title'}>
                        {form.getFieldDecorator(`name-${itemId}`, {
                            rules: [{ required: true, message: "Required!" }],
                            initialValue: undefined
                        })(<Input.TextArea placeholder='Enter Question' rows={3} size="large" />)}
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label={'Status'}>
                    {form.getFieldDecorator(`status-${itemId}`, {
                        initialValue: 1
                    })(<Radio.Group>
                        <Radio value={1}>Active</Radio>
                        <Radio value={0}>Inactive</Radio>
                        </Radio.Group>)}
                    </Form.Item>
                </Col>
            </Row>
        </>
    )
}
