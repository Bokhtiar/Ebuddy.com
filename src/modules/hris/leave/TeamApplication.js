import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Row, Col, Button, Input, Divider, Typography, Avatar, Tag, Modal, Form, DatePicker, Select } from 'antd'
import { getData } from '../../../scripts/getData'
import { alertPop } from '../../../scripts/message'
import * as Cookies from 'js-cookie'
import PendingLeave from './PendingLeave'
import Applied from './Applied'
import TeamApplicationList from './TeamApplicationList'

const Wrapper = styled.div`
    min-height : 100vh;
    overflow : auto;
    padding-top : 4rem;
`

class TeamApplication extends Component {

    constructor ( props ) {
        super ( props )
        this.state = {
            allData : JSON.parse(Cookies.get('profile')),
            current_type : 1,
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
                <div className='pad'>
                    <Row>
                        <Col md={21}>
                            <Input.Search 
                                style={{paddingRight : '0.5rem'}}
                                placeholder="input search text" 
                                // onSearch={value => this.view(`cbs/v1/my-list?page=1&name=${value}`)} 
                                enterButton={<Button type='primary' >Search</Button>}
                            />
                        </Col>
                        <Col style={{paddingLeft : '1rem'}} md={3}>
                            {/* <FilteredSearch /> */}
                            <Button onClick={this.modal} type='primary' ghost block>
                                Filter
                            </Button>
                        </Col>
                    </Row>
                </div>
                <div className='pad'>
                    <div className='filter-btn'>
                        <Button onClick={() => {this.setState({current_type : 1})}} type={this.state.current_type === 1 ? 'primary' : ''}>
                            Waiting for approval
                        </Button>
                    </div>
                    <div className='filter-btn'>
                        <Button onClick={() => {this.setState({current_type : 2})}} type={this.state.current_type === 2 ? 'primary' : ''}>
                            Approved by you
                        </Button>
                    </div>
                    <div className='filter-btn'>
                        <Button onClick={() => {this.setState({current_type : 3})}} type={this.state.current_type === 3 ? 'primary' : ''}>
                            Declined by you
                        </Button>
                    </div>
                </div>
                <Divider />
                <TeamApplicationList type={this.state.current_type} />
                <Modal
                    title='Filter'
                    centered
                    visible={this.state.modal}
                    footer={false}
                    onCancel={this.modal}
                >
                    <Form.Item label='Employee name'>
                        <Input 
                            onChange={ e => {
                                this.setState({
                                    emp_name : e.target.value
                                })
                            }} 
                            placeholder='Employee name'
                        />
                    </Form.Item>
                    <Form.Item label='Select date range'>
                        <Row>
                            <Col lg={11}>
                                <DatePicker 
                                    style={{width : '100%'}}
                                    onChange={ (date, dateString) => {
                                        this.setState({
                                            date_from : dateString
                                        })
                                    }} 
                                    placeholder='Date from'
                                />
                            </Col>
                            <Col lg={{span  : 11, offset : 2}}>
                                <DatePicker 
                                    style={{width : '100%'}}
                                    onChange={ (date, dateString) => {
                                        this.setState({
                                            date_from : dateString
                                        })
                                    }} 
                                    placeholder='Date from'
                                />
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item label='Select status'>
                        <Select
                            onChange={value => {
                                this.setState({
                                    current_type : value
                                })
                            }}
                            style={{ width : '100%'}}
                            placeholder = 'Select status'
                        >
                            {
                                this.state.statuses.map( val => {
                                    return (
                                        <Select.Option value={val.id}>
                                            {val.title}
                                        </Select.Option>
                                    )
                                }) || []
                            }
                        </Select>
                    </Form.Item>
                    <Button type='primary' size='large' block>
                        Search
                    </Button>
                </Modal>
            </Wrapper>
        )
    }
}

export default TeamApplication