import React, {useEffect, useState} from 'react';
import {DatePicker, Input, Checkbox, Select, Col, Row, Form, InputNumber} from "antd";
import moment from "moment";


const { Option } = Select;

const children = [];

for (let i = 1971; i < moment().format('YYYY'); i++) {
    children.push(<Option key={i.toString()}>{i}</Option>);
}

const stepTwo = Form.create()(
    ({ form, current, refresh, companyTypes, companySizes, secontSubmit, client, generationList, isDetailsView }) => {
    const [isGroupOfCompany, setIsGroupOfCompany] = useState(false);
    const years = Array.from(new Array(25),(val, index) => index + 2015);
    
    const localSubmit = () => {
        form.validateFields((err, values) => {
            if (!err) {
                secontSubmit(values);
            }
        });
    };
    useEffect(() => {
        if (refresh > 1 && current === 1 ) {
            localSubmit();
        }
    }, [refresh]);

    useEffect(() => {
        setIsGroupOfCompany(!!client?.is_group_of_company)
    }, client)

    
    return (
        <div className="mt-4" style={current !== 1 ? { display: 'none' } : {}}>
            <Form>
                <Row gutter={32}>
                    <Col span={12}>
                        <Form.Item label={'Company type'}>
                            {form.getFieldDecorator('company_type_id', {
                                rules: [{required: true, message: "Required!"}],
                                initialValue: client?.company_type_id ? client.company_type_id : undefined
                            })(<Select placeholder="Type" size="large" showSearch
                                    filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    disabled={isDetailsView ? true : false}
                                >
                                    {companyTypes &&
                                    companyTypes.map(({id, name}) => (
                                        <Select.Option value={id}>{name}</Select.Option>
                                    ))}
                                </Select>)}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={'Establishment Year'}>
                            {form.getFieldDecorator('establish_date', {
                                rules: [{required: false, message: "Required!"}],
                                initialValue: client?.establish_date || undefined
                            })(
                                // <DatePicker size="large"/>
                                // <Select placeholder="Type" size="large" showSearch
                                //     filterOption={(input, option) =>
                                //         option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                //     }>
                                //     {/* {years &&
                                //         years.map((year) => (
                                //         <Select.Option key={year} value={year}>{year}</Select.Option>
                                //     ))} */}
                                //     {children}
                                // </Select>
                                <InputNumber size="large" style={{width: '100%'}} placeholder="Establishment Year" disabled={isDetailsView ? true : false}/>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12} style={{float: 'right'}}>
                        <Form.Item label={'Company size'}>
                            {form.getFieldDecorator('company_size_id', {
                                rules: [{required: false, message: "Required!"}],
                                initialValue: client?.company_size_id ? client.company_size_id : undefined
                            })(<Select placeholder="Size" size="large" showSearch
                                    filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    disabled={isDetailsView ? true : false}
                                >
                                    {companySizes &&
                                    companySizes.map(({id, name}) => (
                                        <Select.Option value={id}>{name}</Select.Option>
                                    ))}
                                </Select>)}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={'Number of branches'}>
                            {form.getFieldDecorator('branch_no', {
                                rules: [{required: false, message: "Required!"}],
                                initialValue: client?.branch_no ? client.branch_no : undefined
                            })(<Input size="large" placeholder="Number of branches" disabled={isDetailsView ? true : false}/>)}
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item label={'Generation'}>
                            {form.getFieldDecorator('generation_id', {
                                rules: [{required: false, message: "Required!"}],
                                initialValue: client?.generation_id ? client.generation_id : undefined
                            })(
                                <Select size="large" placeholder="Generation" showSearch disabled={isDetailsView ? true : false}>
                                    {generationList ? generationList.map(gen => {
                                        return(
                                            <Select.Option key={gen.id} value={gen.id}>
                                            {gen.name}
                                            </Select.Option>
                                        )
                                    }) : ''}
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label={'Head office address'}>
                            {form.getFieldDecorator('head_office_address', {
                                rules: [{required: true, message: "Required!"}],
                                initialValue: client?.head_office_address ? client.head_office_address : undefined
                            })(<Input size="large" placeholder="Head office address" disabled={isDetailsView ? true : false}/>)}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label={'BIN'}>
                            {form.getFieldDecorator('bin', {
                                // rules: [{required: true, message: "Required!"}],
                                initialValue: client?.bin ? client.bin : undefined
                            })(<Input size="large" placeholder="Head office address" />)}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label={'Business Unit'}>
                            {form.getFieldDecorator('business_unit', {
                                // rules: [{required: true, message: "Required!"}],
                                initialValue: client?.business_unit ? client.business_unit : undefined
                            })(<Input size="large" placeholder="Head office address" />)}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label={'Fax'}>
                            {form.getFieldDecorator('fax', {
                                // rules: [{required: true, message: "Required!"}],
                                initialValue: client?.fax ? client.fax : undefined
                            })(<Input size="large" placeholder="Head office address" />)}
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item>
                            {form.getFieldDecorator('is_group_of_company', {
                                    initialValue: client?.is_group_of_company ? 1 : 0,
                                    valuePropName: 'checked',
                                })(<Checkbox 
                                    onChange={(e) => {setIsGroupOfCompany(e.target.checked)}} 
                                    disabled={isDetailsView ? true : false}
                                >IS GROUP OF COMPANY</Checkbox>)}
                        </Form.Item>
                    </Col>
                    
                    {
                        isGroupOfCompany ? <Col span={24}>
                            <Form.Item label={'Group Name'}>
                                {form.getFieldDecorator('group_name', {
                                    rules: [{required: true, message: "Required!"}],
                                    initialValue: client?.group_name ? client.group_name : undefined
                                })(<Input size="large" placeholder="Group name" disabled={isDetailsView ? true : false}/>)}
                            </Form.Item>
                        </Col> : ''
                    }
                </Row>
            </Form>
        </div>
    )
});

export default stepTwo;
