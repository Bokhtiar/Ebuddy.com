import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Radio, Select, Checkbox, Table, Row, Col } from "antd";

export default function ListDetails({ form, itemId }) {

    return (
        <>
            <Row gutter={32}>
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
                        // initialValue: !edit?.status ? 0 : 1 || undefined
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
