import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {getData} from '../../scripts/getData'
import {postData} from '../../scripts/postData'
import styled from 'styled-components'
import { alertPop } from '../../scripts/message'
import moment from 'moment'
import { Radio, Typography, Input, Button, Row, Col, Select, Skeleton, Form } from 'antd'

const Wrapper = styled.div`
    padding-top : 4rem;
    height : 100vh;
    width : 100%;
    overflow : auto;
    .search-bar {
        padding : 2% 2% 0% 2%;
    }
    .list {
        padding : 2% 1% 2% 3%;
        :hover {
            background-color: #E2F3FF;
        }
    }
`


class Topup_form extends Component {
    constructor (props) {
        super (props)
        this.state = {
            meetingList : [],
            active : true,
            searchString : '',
            loading : true,
            history : [],
            loading : false,
            btnLoading : false,
            //post data
            amount : 0,
            mobile_no : 0,
            operator_id : '',
            pincode : '',
            type : ''
        }
    }

    async componentWillMount () {
        this.setState({ loading : true})
        let res = await getData('accounts/v1/e-buddy/recharge-log')
        let historyView = []
        historyView.push(
            <Typography.Title level={4} style={{padding : '2% 1% 3% 3%'}}>
                History
            </Typography.Title>
        )
        if (res.data) {
            res.data.data.forEach(elem => {
                historyView.push(
                    <Row className='list'>
                        <Col md={7}>
                            <Typography.Text strong>
                                {elem.number}
                            </Typography.Text>
                        </Col>
                        <Col md={7}>
                            <Typography.Text>
                                ৳ {elem.amount}
                            </Typography.Text>
                        </Col>
                        <Col md={10}>
                            <Typography.Text>
                                {`${moment(elem.created_at).format('LT')} on ${moment(elem.created_at).format('ll')}`}
                            </Typography.Text> 
                        </Col>
                    </Row>
                )
            })
        }
        this.setState({
            history : historyView,
            loading : false
        })
    }


    recharge = () => {
        this.setState({btnLoading : true})
        let data = {
            amount : this.state.amount,
        }
        this.props.form.validateFields( async (err, values) => {
            if (!err) {
                data = {
                    ...data,
                    mobile_no : values.mobile_no,
                    operator_id : values.operator_id,
                    pincode : values.pincode,
                    type : values.type,
                    amount : values.amount
                }
                let res = await postData ('recharge/v1/init', data)
                if (res.status === 200 || res.status === 201 || res.status === 101 ) {
                    alertPop('success', 'Recharge successful!')
                    this.setState({btnLoading : false})
                } else {
                    res.map( elem => {
                        alertPop('error', elem)
                    })
                    this.setState({btnLoading : false})
                }
            } else {
                this.setState({ btnLoading : false })
            }
        })
    }

    // Main method
    render () {
        return (
            <Wrapper>
                <div className='search-bar'>
                    <Row>
                        <Col md={3} xs={24}>
                            <Typography.Title level={3}>
                                Topup
                            </Typography.Title>
                            <Typography.Text>
                                Mobile recharge
                            </Typography.Text>
                        </Col>
                        <Col md={{span : 5, offset : 1}} xs={24}>
                            <Form>
                                <Form.Item label='Enter phone number'>
                                    {this.props.form.getFieldDecorator("mobile_no", {
                                        rules: [{ required: true, message: "Please enter a valid phone number!" }]
                                    })(
                                        <Input
                                            type='number' 
                                            style={{width : '100%'}} 
                                            placeHolder='01X XXXX XXXX'
                                        />
                                    )}
                                </Form.Item>
                                <Form.Item label='Operator'>
                                    {this.props.form.getFieldDecorator("operator_id", {
                                        rules: [{ required: true, message: "Please choose an operator!" }]
                                    })(
                                        <Select
                                            style={{width : '100%'}}
                                            placeholder='Select operator'
                                        >
                                            <Select.Option key='G' value='G'>Grameenphone</Select.Option>
                                            <Select.Option key='R' value='R'>Robi</Select.Option>
                                            <Select.Option key='B' value='B'>Banglalink</Select.Option>
                                            <Select.Option key='A' value='A'>Airtel</Select.Option>
                                            <Select.Option key='T' value='T'>Teletalk</Select.Option>
                                        </Select>
                                    )}
                                </Form.Item>
                                <Form.Item label='Type'>
                                    {this.props.form.getFieldDecorator("type", {
                                        rules: [{ required: true, message: "Please select a type!" }]
                                    })(
                                        <Radio.Group name="radiogroup">
                                            <Radio value={'Post-Paid'}>Postpaid</Radio>
                                            <Radio value={'Pre-Paid'}>Prepaid</Radio>
                                        </Radio.Group>
                                    )}
                                </Form.Item>
                                <Form.Item label='Topup amount'>
                                    {this.props.form.getFieldDecorator("amount", {
                                        rules: [{ required: true, message: "Please enter an amount!" }]
                                    })(
                                        <Input 
                                            style={{ width : '100%' }} 
                                            // value={this.state.amount} 
                                            type='number'
                                            // onChange={e => {
                                            //     this.setState({
                                            //         amount : e.target.value
                                            //     })
                                            // }}
                                        />
                                    )}
                                    <Row>
                                        {/* <Col md={5}>
                                            <Button onClick={() => {
                                                this.setState({
                                                    amount : 50
                                                })
                                            }} block>
                                                50
                                            </Button>
                                        </Col>
                                        <Col md={{ span : 5, offset : 1}}>
                                            <Button onClick={() => {
                                                this.setState({
                                                    amount : 100
                                                })
                                            }} block >
                                                100
                                            </Button>
                                        </Col>
                                        <Col md={{ span : 5, offset : 1}}>
                                            <Button onClick={() => {
                                                this.setState({
                                                    amount : 300
                                                })
                                            }} block>
                                                300
                                            </Button>
                                        </Col>
                                        <Col md={{ span : 5, offset : 1}}>
                                            <Button onClick={() => {
                                                this.setState({
                                                    amount : 500
                                                })
                                            }} block>
                                                500
                                            </Button>
                                        </Col> */}
                                    </Row>
                                </Form.Item>
                                <Form.Item label='Pin code'>
                                    {this.props.form.getFieldDecorator("pincode", {
                                        rules: [{ required: true, message: "Please select a type!" }]
                                    })(
                                        <Input 
                                            style={{ width : '100%' }} 
                                            type='password'
                                        />
                                    )}
                                </Form.Item>
                                <Button onClick={this.recharge} type='primary' size='large' loading={this.state.btnLoading}  block>Confirm</Button>
                                
                            </Form>
                        </Col>
                        <Col 
                            style={{borderLeft : '0.5px solid lightgray'}} 
                            md={{span : 14, offset : 1}} 
                            xs={24}
                        >
                            {this.state.loading ? <Skeleton className='search-bar' active /> : this.state.history}
                        </Col>
                    </Row>
                </div>
            </Wrapper>
        )
    }
}

const Topup = Form.create({ name: "normal_login" })(
  Topup_form
);

export default connect()(Topup)