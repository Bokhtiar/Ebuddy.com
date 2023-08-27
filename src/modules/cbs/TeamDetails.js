import React, {Component, Fragment} from 'react'
import styled from 'styled-components'
import { Icon, Typography, Row, Col, Divider, Tag, Button, Empty, Avatar, Modal, Form, Input } from 'antd'
import { getData } from '../../scripts/getData'
import { _slice_ } from '../../scripts/slice'
import { Link, Redirect } from 'react-router-dom'
import { postData } from '../../scripts/postData'
import { alertPop } from '../../scripts/message'

const Wrapper = styled.div`
    padding-top : 4rem;
    min-height : 100vh;
    width : 100%;
    overflow : auto;
    position : relative;
`

class TeamDetails extends Component {

    constructor (props) {
        super (props)
        this.state = {
            loading : false
        }
    }

    componentWillMount () {
        this.view()
    }

    approveModal = () => {
        this.setState({
            approveModal : !this.state.approveModal
        })
    }

    declineModal = () => {
        this.setState({
            declineModal : !this.state.declineModal
        })
    }

    decline = async () => {
        let red = <Redirect to='/cbs/team-cbs' />
        let data = {
            cbs_id : [this.props.params.id],
            status : 0,
            btnLoading : true
        }
        let res = await postData('cbs/v1/team-cbs-approve-decline', data)
        if (res.status === 200 || res.status === 201 || res.status === 101 ) {
            alertPop('success', `${data.cbs_id.length} Declined`)
            this.setState({
                btnLoading : false,
                redirect : red,
                approveModal : false, 
                declineModal : false,
            })
        } else {
            res.map( elem => {
                alertPop( 'error', elem)
            })
            this.setState({ btnLoading : false })
        }
    }

    approve = async () => {
        let red = <Redirect to='/cbs/team-cbs' />
        let data = {
            cbs_id : [this.props.params.id],
            status : 1,
            btnLoading : true
        }
        let res = await postData('cbs/v1/team-cbs-approve-decline', data)
        if (res.status === 200 || res.status === 201 || res.status === 101 ) {
            alertPop('success', `${data.cbs_id.length} Approved`)
            this.setState({
                btnLoading : false,
                redirect : red,
                approveModal : false, 
                declineModal : false,
            })
        } else {
            res.map( elem => {
                alertPop( 'error', elem)
            })
            this.setState({ btnLoading : false })
        }
    }

    view = async () => {
        this.setState({ loading : true })
        let res = await getData(`cbs/v1/show/${this.props.params.id.split('-')[0]}`)
        this.setState({
            allData : res.data ? res.data.data : null
        })
    }

    render () {
        return (
            <Wrapper>
                <Row>
                    <Col className='pad' style={{textAlign : 'left'}} lg={12}>
                        <Link to='/cbs/team-cbs'>
                            <Icon style={{cursor : 'pointer'}} type="arrow-left" />
                            <Typography.Text style={{paddingLeft : '1rem', userSelect : 'none', cursor : 'pointer'}} strong>Back</Typography.Text>
                        </Link>
                    </Col>
                    <Col className='pad' style={{textAlign : 'right'}} lg={12}>
                        <Typography.Text strong>
                            {this.state.allData ? `Date : ${this.state.allData.created_at.split(' ')[0]}` : []}
                        </Typography.Text>
                    </Col>
                </Row>
                <Divider style={{margin : '0'}} />
                <Row className='scroll'>
                    <Col lg={16}>
                        <Row className='pad'>
                            <Col lg={16}>
                                <Typography.Text strong>
                                    {this.state.allData ? `Bill of ${this.state.allData.name}` : []}
                                </Typography.Text>
                                <div>
                                    <Typography.Text>
                                        {
                                            this.state.allData ?
                                            this.state.allData.purpose ? this.state.allData.purpose : this.state.allData.meeting_id : []
                                        }
                                    </Typography.Text>
                                </div>
                            </Col>
                            <Col style={{textAlign : 'right'}} lg={{span : 7, offset : 1}}>
                                {
                                    this.state.allData ?
                                    <Tag
                                        style={{margin : '0'}}
                                        color = {this.state.allData.status == 1 ? '#17A2B8' : 
                                                this.state.allData.status == 2 ? '#6C757D' :
                                                this.state.allData.status == 3 ? '#6C757D' :
                                                this.state.allData.status == 4 ? '#27AE60' :
                                                this.state.allData.status == 5 ? '#E67E22' :
                                                this.state.allData.status == 6 ? '#E67E22' : 'red'}
                                        >
                                        {this.state.allData.status == 1 ? 'Pending' : 
                                            this.state.allData.status == 2 ? 'Approved By Dept' :
                                            this.state.allData.status == 3 ? 'Approved By Finance' :
                                            this.state.allData.status == 4 ? 'Paid' :
                                            this.state.allData.status == 5 ? 'Declined By Dept' :
                                            this.state.allData.status == 6 ? 'Declined By Finance' : 'error'}
                                    </Tag> : []
                                }
                            </Col>
                        </Row>  
                        <div className='space' />
                        <Row className='pad' style={{backgroundColor : '#f4f7fc'}}>
                            {
                                this.state.allData ? 
                                this.state.allData.foods.length > 0 ?
                                this.state.allData.foods.map( elem => {
                                    return (
                                        <Fragment>
                                            <Col style={{textAlign : 'left'}} lg={18}>
                                                <Typography.Text strong>
                                                    Food : {elem.food_item}
                                                </Typography.Text>
                                                <div>
                                                    <Typography.Text>
                                                        Restaurant : {elem.resturant_name}
                                                    </Typography.Text>
                                                </div>
                                                <div className='space' />
                                                <div className='space' />
                                            </Col>
                                            <Col style={{textAlign : 'right'}} lg={{span : 5, offset : 1}}>
                                            ‎   ৳ {elem.amount}
                                            </Col>
                                        </Fragment>
                                    )
                                }) : [] : []
                            }
                            {
                                this.state.allData ? 
                                this.state.allData.transports.length > 0 ?
                                this.state.allData.transports.map( elem => {
                                    return (
                                        <Fragment>
                                            <Col style={{textAlign : 'left'}} lg={18}>
                                                <Typography.Text strong>
                                                    Transport : Transport
                                                </Typography.Text>
                                                <div>
                                                    <Typography.Text>
                                                        {elem.detail.location ? `From : ${elem.detail.location.location_from_name}` : []}
                                                    </Typography.Text>
                                                </div>
                                                <div>
                                                    <Typography.Text>
                                                        {elem.detail.location ? `To : ${elem.detail.location.location_to_name}` : []}
                                                    </Typography.Text>
                                                </div>
                                                <div className='space' />
                                                <div className='space' />
                                            </Col>
                                            <Col style={{textAlign : 'right'}} lg={{span : 5, offset : 1}}>
                                            ‎   ৳ {elem.detail.amount}
                                            </Col>
                                        </Fragment>
                                    )
                                }) : [] : []
                            }
                            {
                                this.state.allData ? 
                                this.state.allData.others.length > 0 ?
                                this.state.allData.others.map( elem => {
                                    return (
                                        <Fragment>
                                            <Col style={{textAlign : 'left'}} lg={18}>
                                                <Typography.Text strong>
                                                    Others : Others
                                                </Typography.Text>
                                                <div>
                                                    <Typography.Text>
                                                        Description : {elem.description}
                                                    </Typography.Text>
                                                </div>
                                                <div className='space' />
                                                <div className='space' />
                                            </Col>
                                            <Col style={{textAlign : 'right'}} lg={{span : 5, offset : 1}}>
                                            ‎   ৳ {elem.amount}
                                            </Col>
                                        </Fragment>
                                    )
                                }) : [] : []
                            }
                            {
                                this.state.allData ? 
                                <Fragment >
                                    <Divider style={{borderWidth : '1px'}} dashed />
                                    <Col style={{textAlign : 'left'}} lg={18}>
                                        <Typography.Text strong>
                                            Grand total
                                        </Typography.Text>
                                    </Col>
                                    <Col style={{textAlign : 'right'}} lg={{span : 5, offset : 1}}>
                                        <Typography.Text strong>
                                            ৳ {this.state.allData.amount}
                                        </Typography.Text>
                                    </Col>
                                </Fragment>
                                : []
                            }
                        </Row>
                        <div className='space' />
                        {
                            this.state.allData ?
                            this.state.allData.files.length > 0 ?
                            <div className='pad'>
                                <Typography.Text>
                                    Attached files (Invoice)
                                </Typography.Text>
                                <div className='half-pad'/>
                                    <Divider />
                                <div className='half-pad'/>
                                <div className='attendee-grid'>
                                    {
                                        this.state.allData.files.map( elem => {
                                            return (
                                                <div className='half-pad'>
                                                    <Button 
                                                        type='primary' 
                                                        // onClick={()=> {window.download(elem.name, '_blank')}} 
                                                        icon='download'
                                                    >
                                                        <a href={elem.name} className='a_link' download>
                                                            {_slice_(`${elem.name.split('/').slice(-1)[0].split('.')[0]}`, 5) +'.'+ elem.name.split('/').slice(-1)[0].split('.')[1]}
                                                        </a>
                                                    </Button>
                                                </div>
                                            )
                                        })
                                    }
                                    <div className='big-space' />
                                </div>
                            </div>
                            : [] : []
                        }
                    </Col>
                    <Col lg={8}>
                        <Row>
                            <Col lg={1}>
                                <Divider style={{height : '100vh', margin : '0'}} type='vertical' />
                            </Col>
                            <Col lg={22}>
                                {
                                    this.state.allData ?
                                    this.state.allData.flow.length > 0 ? 
                                    this.state.allData.flow.map ( elem => {
                                        return (
                                            <Fragment>
                                                <div className='pad'>
                                                    <Typography.Text strong>
                                                        Approval
                                                    </Typography.Text>
                                                </div>
                                                <Divider style={{margin : '0'}} />
                                                <Row className='pad'>
                                                    <Col lg={4}>
                                                        <div>
                                                            <Avatar size='large' src={elem.user.profile_pic} />
                                                        </div>
                                                    </Col>
                                                    <Col style={{overflow : 'hidden'}} lg={12}>
                                                        <Typography.Text strong>
                                                            {elem.user.name}
                                                        </Typography.Text>
                                                        <div>
                                                            <Typography.Text>
                                                                Employee id : {elem.user.emp_id}
                                                            </Typography.Text>
                                                        </div>
                                                    </Col>
                                                    <Col style={{textAlign : 'right'}} lg={8}>
                                                        {
                                                            elem.status === 1 ? 
                                                            <Tag color='green' style={{margin : '0'}}>
                                                                Approved
                                                            </Tag> :
                                                            <Tag color='orange' style={{margin : '0'}}>
                                                                Declined
                                                            </Tag>
                                                        }
                                                    </Col>
                                                </Row>
                                                <Divider style={{margin : '0'}} />
                                            </Fragment>
                                        )
                                    })
                                    : <Empty style={{paddingTop : '5rem'}} /> : []
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
                {
                    this.state.allData ?
                    this.state.allData.status === 1 ?
                    <div style={{position : 'fixed', bottom : '0'}}>
                        <div className='pad approve-decline-btn'>
                            <Button onClick={this.approveModal} type='primary' ghost>
                                Approve
                            </Button>
                            <Button onClick={this.declineModal} style={{marginLeft : '1rem'}} type='danger' ghost>
                                Decline
                            </Button>
                        </div>
                    </div> : [] : []
                }
                <Modal
                    title="Decline"
                    centered
                    visible={this.state.declineModal}
                    footer={null}
                    onCancel={this.declineModal}
                >
                    <Form.Item label='Decline note'>
                        <Input 
                            value = {this.state.declineNote}
                            onChange={e => {this.setState({
                                declineNote : e.target.value
                            })}}
                        />
                    </Form.Item>
                    <Button onClick={this.decline} loading={this.state.btnLoading} type='danger' block>
                        Decline
                    </Button>
                </Modal>
                <Modal
                    title="Confirm"
                    centered
                    visible={this.state.approveModal}
                    footer={null}
                    onCancel={this.approveModal}
                >
                    <Typography.Text strong>
                        Are you sure?
                    </Typography.Text>
                    <div className='space' />
                    <Button onClick={this.approve} type='primary' loading={this.state.btnLoading} block>
                        Approve
                    </Button>
                </Modal>
                {this.state.redirect ? this.state.redirect : []}
            </Wrapper>
        )
    }
}

export default TeamDetails