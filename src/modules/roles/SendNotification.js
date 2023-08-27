import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Typography, Form, Button, Radio, Input, DatePicker } from 'antd'
import { postData } from '../../scripts/postData'
import * as moment from 'moment'
import { Redirect } from 'react-router-dom'
import { alertPop } from '../../scripts/message'

const Wrapper = styled.div`
    padding-top : 4rem;
    height : 100vh;
    width : 100%;
    overflow : auto;
    .search-bar {
        padding : 2% 2% 0% 2%;
    }
    .stretch {
        width : 50%;
    }
`

class SendNotification_ extends Component {

    constructor (props) {
        super (props)
        this.state = {
            btnLoading : false,
            redirect : ''
        }
    }

    submit = () => {
        let red = <Redirect to='/roles/send-notification' />
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                this.setState({ btnLoading : true })
                let end_date = JSON.stringify(values.end_date).split('T')[0].split('"')[1]
                let res = await postData('accounts/v1/notification/create', { title : values.title, description : values.description, end_date : end_date, viewer : 1})
                if (res.status && (res.status === 200 || res.status === 201)) {
                    alertPop('success', 'Notification sent')
                    this.setState({
                        btnLoading : false,
                        redirect : red
                    })
                } else {
                    res.map( elem => {
                        alertPop('error', elem)
                    })
                    this.setState({
                        btnLoading : false
                    })
                }
            }
        })
    }

    render () {
        return (
            <Wrapper>
                <div className='search-bar'>
                    <Typography.Title level={4}>
                        Send notifications
                    </Typography.Title>
                    <Form>
                        <Form.Item label='Title'>
                            {this.props.form.getFieldDecorator("title", {
                                rules: [{ required: true }]
                            })(
                                <Input className='stretch'/>
                            )}
                        </Form.Item>
                        <Form.Item label='Description'>
                            {this.props.form.getFieldDecorator("description", {
                                rules: [{ required: true }]
                            })(
                                <Input.TextArea className='stretch'/>
                            )}
                        </Form.Item>
                        <Form.Item label='Date'>
                            {this.props.form.getFieldDecorator("end_date", {
                                rules: [{ required: true, message : 'Date is required' }]
                            })(
                                <DatePicker 
                                    className='stretch' 
                                    disabledDate={current => {
                                        return current < moment().add(0, "day");
                                    }}
                                />
                            )}
                        </Form.Item>
                    </Form>
                    <Button loading={this.state.btnLoading} type='primary' size='large' onClick={this.submit} className='stretch'>Send</Button>
                </div>
                {this.state.redirect}
            </Wrapper>
        )
    }
}

const SendNotification = Form.create({ name: "send_notification" })(
    connect()(SendNotification_)
)

export default SendNotification