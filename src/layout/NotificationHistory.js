import React, { Component } from 'react'
import { Typography, Card, Row, Col, Divider, Skeleton, Tag, Button, Form, Modal, Input, DatePicker, Empty } from 'antd'
import { getData } from '../scripts/getData'
import styled from 'styled-components'
import {alertPop} from '../scripts/message'
import { postData } from '../scripts/postData'
import * as moment from 'moment'

const Wrapper = styled.div`
    height : 86vh;
    overflow : auto;
`

class NotificationHistory extends Component {
    constructor (props) {
        super (props)
        this.state = {
            allData : {},
            loading : false,
            deleteAnim : {id : '', anim : ''},
            updateModal : false,
            required : false,
            new : {}
        }
    }

    componentWillMount () {
        this.history('accounts/v1/notification/get-all?page=1')
    }

    componentDidUpdate (prev, next) {
        if(this.props.id !== prev.id) {
            this.history('accounts/v1/notification/get-all?page=1')
        }
    }

    history = async link => {
        let res = await getData(link)
        this.setState({
            allData : res.data.data
        })
    }

    updateModal = () => {
        this.setState({ updateModal : !this.state.updateModal })
    }

    delete = async id => {
        let res = await getData(`accounts/v1/notification/delete?id=${id}`)
        this.history(`accounts/v1/notification/get-all?page=${this.state.allData.current_page}`)
        this.setState({ 
            deleteAnim : {
                id : id,
                anim : 'animated bounceOut 0.3s'
            }
        })
        alertPop('success', 'removed!')
    }

    edit = async id => {
        if (this.state.new && this.state.new.title && this.state.new.description && this.state.new.end_date){
            let data = {
                id : id,
                viewer : 1,
                end_date : this.state.new.end_date,
                title : this.state.new.title,
                description : this.state.new.description
            }
            let res = await postData('accounts/v1/notification/update', data)
            if (res.status && (res.status === 200 || res.status === 201)) {
                alertPop('success', 'Notification updated!')
                this.history(`accounts/v1/notification/get-all?page=${this.state.allData.current_page}`)
                this.updateModal()
            } else {
                res.map( elem => {
                    alertPop('error', elem)
                })
            }
        } else {
            this.setState({
                required : true
            })
        }
    }

    render () {
        return (
            <Wrapper className='stretch'>
                <Typography.Title level={4}>
                    Active notifications
                </Typography.Title>
                {this.state.allData.data ?
                    this.state.allData.data.length < 1 ?
                    <Empty /> : 
                    this.state.allData.data.map ( elem => {
                        return (
                            <Card 
                                type ='inner'
                                style={{width : '100%', marginBottom : '1rem'}}
                                hoverable
                                className={this.state.deleteAnim.id === elem.id ? this.state.deleteAnim.anim : ''}
                            >
                                <Row>
                                    <Col lg={15}>
                                        <Typography.Text strong>
                                            {elem.title}
                                        </Typography.Text>
                                        <div className='space'/>
                                        <div>
                                            <Typography.Text>
                                                {elem.description}
                                            </Typography.Text>
                                        </div>
                                    </Col>
                                    <Col style={{textAlign : 'right'}} lg={{span : 5, offset : 1}}>
                                        <Tag color='#1890ff'>{elem.end_date}</Tag>
                                    </Col>
                                    <Col style={{textAlign : 'right', paddingRight : '0.5rem'}} lg={2}>
                                        <i onClick={() => {
                                            this.setState({
                                                toUpdate : elem.id
                                            })
                                            this.updateModal()
                                        }} class="material-icons">edit</i>
                                    </Col>
                                    <Col style={{textAlign : 'right'}} lg={1}>
                                        <i onClick={_=>this.delete(elem.id)} class="material-icons">delete</i>
                                    </Col>
                                </Row>
                            </Card>
                        )
                    })
                 : <Skeleton />}
                {this.state.allData.last_page > 1 ? 
                <Button.Group>
                    <Button onClick={() => this.history(this.state.allData.prev_page_url.split('accounts.imaladin.com/')[1])} disabled={!this.state.allData.prev_page_url}>Prev</Button>
                    {[...Array(this.state.allData.last_page)].map( (elem, index) => {
                        return (
                            <Button type={this.state.allData.current_page === index+1 ? 'primary' : ''} onClick={_=>this.history(`accounts/v1/notification/get-all?page=${index+1}`)}>{index+1}</Button>
                        )
                    })}
                    <Button onClick={() => this.history(this.state.allData.next_page_url.split('accounts.imaladin.com/')[1])} disabled={!this.state.allData.next_page_url}>Next</Button>
                </Button.Group>
                : ''}
                <Modal
                    title='Update notification!'
                    centered
                    visible={this.state.updateModal}
                    onCancel={this.updateModal}
                    footer={false}
                >
                    <Form.Item 
                        label='Title'
                        required
                        validateStatus={this.state.required && !this.state.new.title ? 'error' : ''}
                        help={this.state.required && !this.state.new.title ? 'Title is required!' : ''}
                    >
                        <Input 
                            onChange={ e => {
                                this.setState({
                                    new : {
                                        ...this.state.new,
                                        title : e.target.value
                                    }
                                })
                            }} 
                            placeHolder='title' 
                        />
                    </Form.Item>
                    <Form.Item 
                        label='Description'
                        required
                        validateStatus={this.state.required && !this.state.new.title ? 'error' : ''}
                        help={this.state.required && !this.state.new.title ? 'Description is required!' : ''}
                    >
                        <Input.TextArea 
                            style={{width : '100%'}}
                            onChange={ e => {
                                this.setState({
                                    new : {
                                        ...this.state.new,
                                        description : e.target.value
                                    }
                                })
                            }} 
                            placeHolder='Description'
                        />
                    </Form.Item>
                    <Form.Item 
                        label='End date'
                        required
                        validateStatus={this.state.required && !this.state.new.title ? 'error' : ''}
                        help={this.state.required && !this.state.new.title ? 'Title is required!' : ''}
                    >
                        <DatePicker 
                            style={{width : '100%'}}
                            onChange={(date, dateString) => {
                                this.setState({
                                    new : {
                                        ...this.state.new,
                                        end_date : dateString
                                    }
                                })
                            }}
                            disabledDate={current => {
                                return current < moment().add(0, "day");
                            }}
                        />
                    </Form.Item>
                    <Button type='primary' onClick={_=>this.edit(this.state.toUpdate || '')} block>
                        Update
                    </Button>
                </Modal>
            </Wrapper>
        )
    }
}

export default NotificationHistory