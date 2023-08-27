import React, { useEffect, useState } from 'react';
import {Input, Radio, Select, Col, Row, Form} from "antd";
import { mobileNumberValidationPattern } from "../../../../../scripts/helper"

const stepOne = Form.create()(
    ({ form, current, refresh, industryTypes, industrySectors, firstSubmit, client, isDetailsView, setIndustryType }) => {   

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
        <div className="mt-4" style={current !== 0 ? {display: 'none'} : {}}>
            <Form>
                <Row gutter={32}>
                    <Col span={24}>
                        <Form.Item label={'Type'}>
                            {form.getFieldDecorator('type', {
                                rules: [{required: true, message: "Required!"}],
                                initialValue: client?.type ? client.type : undefined
                            })(<Radio.Group disabled={isDetailsView ? true : false}>
                                <Radio value="Client">Client</Radio>
                                <Radio value="Vendor">Vendor</Radio>
                                <Radio value="Partners">Partners</Radio>
                            </Radio.Group>)}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={'Company name'}>
                            {form.getFieldDecorator('name', {
                                rules: [{required: true, message: "Required!"}],
                                initialValue: client?.name ? client.name : undefined
                            })(<Input size="large" placeholder="Company name" disabled={isDetailsView ? true : false}/>)}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={'Address'}>
                            {form.getFieldDecorator('address', {
                                rules: [{required: true, message: "Required!"}],
                                initialValue: client?.address ? client.address : undefined
                            })(<Input size="large" placeholder="address" disabled={isDetailsView ? true : false}/>)}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={'Industry type'}>
                            {form.getFieldDecorator('industry_type_id', {
                                rules: [{required: true, message: "Required!"}],
                                initialValue: client?.industry_type_id ? client.industry_type_id : undefined
                            })(<Select 
                                    placeholder="Select industry type" 
                                    size="large" 
                                    showSearch
                                    onChange={(value)=> setIndustryType(value)}
                                    filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    disabled={isDetailsView ? true : false}
                                >
                                    {industryTypes &&
                                    industryTypes.map(({id, name}) => (
                                        <Select.Option value={id}>{name}</Select.Option>
                                    ))}
                                </Select>)}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={'Sector'}>
                            {form.getFieldDecorator('industry_sector_id', {
                                rules: [{required: true, message: "Required!"}],
                                initialValue: client?.industry_sector_id ? client.industry_sector_id : undefined
                            })(<Select placeholder="Select industry sector" size="large" showSearch
                                    filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    disabled={isDetailsView ? true : false}
                                >
                                    {industrySectors &&
                                    industrySectors.map(({id, name}) => (
                                        <Select.Option value={id}>{name}</Select.Option>
                                    ))}
                                </Select>)}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={'Contact Person Name'}>
                            {form.getFieldDecorator('contact_name', {
                                rules: [{required: true, message: "Required!"}],
                                initialValue: client?.contact_name ? client.contact_name : undefined
                            })(<Input size="large" placeholder="Contact person name" disabled={isDetailsView ? true : false}/>)}
                        </Form.Item>
                    </Col>
                    
                    <Col span={12}>
                        <Form.Item label={'Contact Person Mobile'}>
                            {form.getFieldDecorator('contact_mobile', {
                                rules: [{required: true, message: "Required!"}, {
                                    pattern: mobileNumberValidationPattern,
                                    message: "Please enter a valid mobile no",
                                }],
                                initialValue: client?.contact_mobile ? client.contact_mobile : undefined
                            })(<Input size="large" placeholder="Contact person mobile" disabled={isDetailsView ? true : false}/>)}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={'Contact Person Email'}>
                            {form.getFieldDecorator('contact_email', {
                                rules: [{required: true, message: "Required!"}, {
                                    pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                                    message: "Please enter a valid email address",
                                }],
                                initialValue: client?.contact_email ? client.contact_email : undefined
                            })(<Input size="large" placeholder="Contact person email" disabled={isDetailsView ? true : false}/>)}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={'Website'}>
                            {form.getFieldDecorator('website', {
                                rules: [{required: false, message: "Required!"}],
                                initialValue: client?.website ? client.website : undefined
                            })(<Input size="large" placeholder="Website" disabled={isDetailsView ? true : false}/>)}
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    )
})


export default stepOne;
