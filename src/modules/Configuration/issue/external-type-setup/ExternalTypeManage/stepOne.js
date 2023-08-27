import React, { useEffect, useState } from 'react';
import {Input, Radio, Select, Col, Row, Form} from "antd";

const stepOne = Form.create()(
    ({ form, current, refresh, firstSubmit, externalType }) => {   

    const localSubmit = () => {
        form.validateFields((err, values) => {
            if (!err) {
                firstSubmit(values);
            }
        });
    };
    useEffect(() => {
        if (refresh > 0 && current === 0 ) {
            localSubmit();
        }
    }, [refresh]);

    return (
        <div className="mt-4" style={current === 1 ? {display: 'none'} : {}}>
            <Form>
                <Row gutter={32}>
                    <Col span={16}>
                        <Form.Item label={'External Type'}>
                            {form.getFieldDecorator('name', {
                                rules: [{required: true, message: "Required!"}],
                                initialValue: externalType?.name ? externalType.name : undefined
                            })(<Input size="large" placeholder="External Type"/>)}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label={'Status'}>
                            {form.getFieldDecorator('status', {
                                rules: [{required: true, message: "Required!"}],
                                initialValue: externalType?.status === 0 ? 0 : externalType?.status === 1 ? 1 :undefined
                            })(<Select placeholder="Status" size="large" showSearch
                                    filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }>
                                        <Select.Option value={1}>Active</Select.Option>
                                        <Select.Option value={0}>Inactive</Select.Option>
                                </Select>)}
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    )
})


export default stepOne;
