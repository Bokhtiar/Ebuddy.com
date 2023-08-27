import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Row, Col, Button, Input, Divider, Typography, Avatar, Tag, Modal, Form, DatePicker, Select } from 'antd'
import { getData } from '../../../scripts/getData'
import { alertPop } from '../../../scripts/message'
import * as Cookies from 'js-cookie'

const Wrapper = styled.div`
    
`

class PendingLeave extends Component {

    constructor ( props ) {
        super ( props )
        this.state = {
            allData : JSON.parse(Cookies.get('profile')),
            modal : false,
            statuses : [{id : 1, title : 'Normal'},{id : 2, title : 'Absent'},{id : 3, title : 'Half-day'}]
        }
    }

    componentWillMount () {
        // this.view()
    }

    view = async que => {
        let res = await getData()
        if ( res.status.slice(0,1) == 2 ) {
            this.setState({
                allData : res.data.data
            })
        } else {
            res.map( elem => {
                return alertPop('error', elem)
            })
        }
    }

    modal = () => {
        this.setState({
            modal : !this.state.modal
        })
    }

    render () {
        return (
            <Wrapper>
                <Row className='pad'>
                    <Col lg={5}>
                        <Typography.Text strong className='FIX_th'>
                            EMPLOYEE NAME
                        </Typography.Text>
                    </Col>
                    <Col lg={3}>
                        <Typography.Text strong className='FIX_th'>
                            DEPARTMENT
                        </Typography.Text>
                    </Col>
                    <Col lg={2}>
                        <Typography.Text strong className='FIX_th'>
                            ID
                        </Typography.Text>
                    </Col>
                    <Col lg={3}>
                        <Typography.Text strong className='FIX_th'>
                            DATE
                        </Typography.Text>
                    </Col>
                    <Col lg={3}>
                        <Typography.Text strong className='FIX_th'>
                            IN TIME
                        </Typography.Text>
                    </Col>
                    <Col lg={3}>
                        <Typography.Text strong className='FIX_th'>
                            OUT TIME
                        </Typography.Text>
                    </Col>
                    <Col lg={2}>
                        <Typography.Text strong className='FIX_th'>
                            STATUS
                        </Typography.Text>
                    </Col>
                    <Col lg={3}>
                        <Typography.Text strong className='FIX_th'>
                            APPLICATION STATUS
                        </Typography.Text>
                    </Col>
                </Row>
                <Divider />
                {[...Array(5)].map( elem => {
                    return (
                        <Fragment>
                            <Row className='pad flex_r'>
                                <Col className='left-text' lg={5}>
                                    <Avatar src={this.state.allData ? this.state.allData.profile_pic : []} />
                                    <Typography.Text style={{paddingLeft : '1rem'}} strong>
                                        {this.state.allData ? this.state.allData.name.length > 15 ? `${this.state.allData.name.slice(0,15)}...` : this.state.allData.name : []}
                                    </Typography.Text>
                                </Col>
                                <Col className='left-text' lg={3}>
                                    <Typography.Text strong>
                                        {this.state.allData ? this.state.allData.department.length > 15 ? `${this.state.allData.department.slice(0,10)}...` : this.state.allData.department : []}
                                    </Typography.Text>
                                </Col>
                                <Col className='left-text' lg={2}>
                                    <Typography.Text strong>
                                        {this.state.allData ? this.state.allData.emp_id : []}
                                    </Typography.Text>
                                </Col>
                                <Col className='left-text' lg={3}>
                                    <Typography.Text strong>
                                        30/10/2019
                                    </Typography.Text>
                                </Col>
                                <Col className='left-text' lg={3}>
                                    <Typography.Text strong>
                                        9:15 AM
                                    </Typography.Text>
                                </Col>
                                <Col className='left-text' lg={3}>
                                    <Typography.Text strong>
                                        7:15 AM
                                    </Typography.Text>
                                </Col>
                                <Col className='left-text' lg={2}>
                                    <Tag color='#25B713'>
                                        Normal
                                    </Tag>
                                </Col>
                                <Col className='left-text' lg={3}>
                                    <Tag>
                                        Applied
                                    </Tag>
                                </Col>
                            </Row>
                            <Divider />
                        </Fragment>
                    )
                })}
            </Wrapper>
        )
    }
}

export default PendingLeave