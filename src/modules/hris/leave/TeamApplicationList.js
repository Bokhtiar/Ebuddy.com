import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Row, Col, Button, Input, Divider, Typography, Avatar, Tag, Card, Form, DatePicker, Select } from 'antd'
import { getData } from '../../../scripts/getData'
import { alertPop } from '../../../scripts/message'
import * as Cookies from 'js-cookie'
import TeamApplication from './TeamApplication'

const Wrapper = styled.div`
    
`

class TeamApplicationList extends Component {

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
                    <Col lg={{span : 5, offset : 1}}>
                        <Typography.Text strong className='FIX_th'>
                            EMPLOYEE
                        </Typography.Text>
                    </Col>
                    <Col lg={3}>
                        <Typography.Text strong className='FIX_th'>
                            START DATE
                        </Typography.Text>
                    </Col>
                    <Col lg={3}>
                        <Typography.Text strong className='FIX_th'>
                            END DATE
                        </Typography.Text>
                    </Col>
                    <Col lg={2}>
                        <Typography.Text strong className='FIX_th'>
                            TOTAL DAYS
                        </Typography.Text>
                    </Col>
                    <Col lg={2}>
                        <Typography.Text strong className='FIX_th'>
                            TYPE
                        </Typography.Text>
                    </Col>
                    <Col lg={3}>
                        <Typography.Text strong className='FIX_th'>
                            REASON
                        </Typography.Text>
                    </Col>
                    <Col lg={ this.props.type == 3 ? 2 : 5 }>
                        <Typography.Text strong className='FIX_th'>
                            ACTION
                        </Typography.Text>
                    </Col>
                    <Col lg={ this.props.type == 3 ? 3 : 0 }>
                        <Typography.Text strong className='FIX_th'>
                            DECLINING REASON
                        </Typography.Text>
                    </Col>
                </Row>
                <Divider />
                {console.log(this.state.allData)}
                {[...Array(5)].map( (elem, index) => {
                    return (
                        <Fragment>
                            <Row className='pad flex_r'>
                                <Col lg={1}>
                                    <i tabIndex='0' onClick={() => {this.setState({pop : this.state.pop === index ? null : index})}} className={`material-icons dot-button ${this.state.pop === index ? 'dot-button-focus' : ''}`}>
                                        more_horiz
                                        <Card className={this.state.pop === index ? 'block bounceIn pop-card' : 'none bounceOut pop-card'}>
                                            <Typography.Text strong className='FIX_th'>
                                                Leave status :
                                            </Typography.Text>
                                            <div className='space' />
                                            {
                                                [...Array(8)].map ( val => {
                                                    return (
                                                        <Fragment>
                                                            <Row>
                                                                <Col className='left-text' lg={{span : 18}}>
                                                                    <Typography.Text >
                                                                        Annual (15)
                                                                    </Typography.Text>
                                                                </Col>
                                                                <Col className='right-text' lg={{span : 5, offset : 1}}>
                                                                    <Typography.Text strong>
                                                                        12
                                                                    </Typography.Text>
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
                                <Col className='left-text' lg={5}>
                                    <Avatar src={this.state.allData ? this.state.allData.profile_pic : []} />
                                    <Typography.Text style={{paddingLeft : '1rem'}} strong>
                                        {this.state.allData ? this.state.allData.name.length > 15 ? `${this.state.allData.name.slice(0,15)}...` : this.state.allData.name : []}
                                    </Typography.Text>
                                </Col>
                                <Col className='left-text' lg={3}>
                                    <Typography.Text strong>
                                        30/10/2019
                                    </Typography.Text>
                                </Col>
                                <Col className='left-text' lg={3}>
                                    <Typography.Text strong>
                                        30/10/2019
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
                                        Some reason
                                    </Typography.Text>
                                </Col>
                                <Col className='left-text' lg={this.props.type == 3 ? 2 : 4}>
                                    {
                                        this.props.type == 1 ?
                                        <Row>
                                            <Col className='right-pad' lg={12}>
                                                <Button type='primary' ghost>
                                                    Approve
                                                </Button>
                                            </Col>
                                            <Col className='left-pad' lg={12}>
                                                <Button type='danger' ghost>
                                                    Decline
                                                </Button>
                                            </Col>
                                        </Row> : 
                                        this.props.type == 2 ?
                                        <Tag color='green'>
                                            Approved
                                        </Tag> :
                                        <Tag color='red'>
                                            Declined
                                        </Tag>
                                    }
                                </Col>
                                <Col className='left-text' lg={this.props.type == 3 ? 3 : 0}>
                                    <Typography.Text strong>
                                        Declining reason
                                    </Typography.Text>
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

export default TeamApplicationList