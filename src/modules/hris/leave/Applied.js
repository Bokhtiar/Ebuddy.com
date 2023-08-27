import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Row, Col, Button, Input, Divider, Typography, Avatar, Tag, Modal, Form, DatePicker, Select, Card } from 'antd'
import { getData } from '../../../scripts/getData'
import { alertPop } from '../../../scripts/message'
import * as Cookies from 'js-cookie'

const Wrapper = styled.div`
    
`

class Applied extends Component {

    constructor ( props ) {
        super ( props )
        this.state = {
            allData : JSON.parse(Cookies.get('profile')),
            modal : false,
            statuses : [{id : 1, title : 'Normal'},{id : 2, title : 'Absent'},{id : 3, title : 'Half-day'}],
            pop : false
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

    pop = () => {
        this.setState({
            pop : !this.state.pop
        })
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
                    <Col lg={2}>
                        <Typography.Text strong className='FIX_th'>
                            START DATE
                        </Typography.Text>
                    </Col>
                    <Col lg={2}>
                        <Typography.Text strong className='FIX_th'>
                            END DATE
                        </Typography.Text>
                    </Col>
                    <Col lg={2}>
                        <Typography.Text strong className='FIX_th'>
                            JOINING DATE
                        </Typography.Text>
                    </Col>
                    <Col lg={5}>
                        <Typography.Text strong className='FIX_th'>
                            APPROVAL WAITING FOR
                        </Typography.Text>
                    </Col>
                    <Col lg={4}>
                        <Typography.Text strong className='FIX_th'>
                            REASON
                        </Typography.Text>
                    </Col>
                    <Col lg={2}>
                        <Typography.Text strong className='FIX_th'>
                            DAYS
                        </Typography.Text>
                    </Col>
                    <Col lg={2}>
                        <Typography.Text strong className='FIX_th'>
                            TYPE
                        </Typography.Text>
                    </Col>
                    <Col lg={3}>
                        <Typography.Text strong className='FIX_th'>
                            REASON OF CANCEL
                        </Typography.Text>
                    </Col>
                    <Col lg={2}>
                        <Typography.Text strong className='FIX_th'>
                            STATUS
                        </Typography.Text>
                    </Col>
                </Row>
                <Divider />
                {[...Array(5)].map( (elem, index) => {
                    return (
                        <Fragment>
                            <Row className='pad flex_r'>
                                <Col className='left-text' lg={2}>
                                    <Typography.Text strong>
                                        30/10/2019
                                    </Typography.Text>
                                </Col>
                                <Col className='left-text' lg={2}>
                                    <Typography.Text strong>
                                        30/10/2019
                                    </Typography.Text>
                                </Col>
                                <Col className='left-text' lg={2}>
                                    <Typography.Text strong>
                                        30/10/2019
                                    </Typography.Text>
                                </Col>
                                <Col className='left-text' lg={5}>
                                    <Avatar src={this.state.allData ? this.state.allData.profile_pic : []} />
                                    <Typography.Text style={{paddingLeft : '1rem'}} strong>
                                        {this.state.allData ? this.state.allData.name.length > 15 ? `${this.state.allData.name.slice(0,15)}...` : this.state.allData.name : []}
                                    </Typography.Text>
                                    <i tabIndex='0' onClick={() => {this.setState({pop : this.state.pop === index ? null : index})}} className={`material-icons dot-button ${this.state.pop === index ? 'dot-button-focus' : ''}`}>
                                        more_horiz
                                        <Card className={this.state.pop === index ? 'block bounceIn pop-card' : 'none bounceOut pop-card'}>
                                            <Typography.Text strong className='FIX_th'>
                                                Approval flow :
                                            </Typography.Text>
                                            <div className='space' />
                                            {
                                                [...Array(3)].map ( val => {
                                                    return (
                                                        <Fragment>
                                                            <Row>
                                                                <Col lg={2}>
                                                                    <Avatar size='large' src={this.state.allData ? this.state.allData.profile_pic : []} />
                                                                </Col>
                                                                <Col lg={{span : 13, offset : 3}}>
                                                                    <Typography.Text strong>
                                                                        {this.state.allData ? this.state.allData.name.length > 15 ? `${this.state.allData.name.slice(0,15)}...` : this.state.allData.name : []}
                                                                    </Typography.Text>
                                                                    <div>
                                                                        <Typography.Text>
                                                                            Employee ID : 1219
                                                                        </Typography.Text>
                                                                    </div>
                                                                </Col>
                                                                <Col lg={{span : 5, offset : 1}}>
                                                                    <Tag color='green'>
                                                                        Approved
                                                                    </Tag>
                                                                </Col>
                                                            </Row>
                                                            <div className='space' />
                                                        </Fragment>
                                                    )
                                                })
                                            }
                                        </Card>
                                    </i>
                                </Col>
                                <Col className='left-text' lg={4}>
                                    <Typography.Text strong>
                                    {this.state.allData.reason ? this.state.allData.reason.length > 15 ? `${this.state.allData.reason.slice(0,15)}...` : this.state.allData.reason : 'Some reason'}
                                    </Typography.Text>
                                </Col>
                                <Col className='left-text' lg={2}>
                                    <Typography.Text strong>
                                        02
                                    </Typography.Text>
                                </Col>
                                <Col className='left-text' lg={2}>
                                    <Typography.Text strong>
                                        Annual
                                    </Typography.Text>
                                </Col>
                                <Col className='left-text' lg={3}>
                                    <Typography.Text strong>
                                        N/A
                                    </Typography.Text>
                                </Col>
                                <Col className='left-text' lg={2}>
                                    <Tag color='#25B713'>
                                        Normal
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

export default Applied