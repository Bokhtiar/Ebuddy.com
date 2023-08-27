import React, {Component, Fragment} from 'react'
import {Row, Col, Typography, Checkbox, Collapse, Avatar, Icon, Tag, Button, Modal, Form, Input} from 'antd'
import { getData } from '../../scripts/getData'
import { postData } from '../../scripts/postData'
import { alertPop } from '../../scripts/message'
import { Link } from 'react-router-dom'

class UserCBS extends Component {
    constructor (props) {
        super (props)
        this.state = {
            allData : null,
            selected : [],
            selectedCBS : [],
            modal : false,
            modalType : '',
            note : ''
        }
    }

    componentWillMount () {
        this.view()
    }

    view = async () => {
        let res = await getData(this.props.type === 'org' ? `cbs/v1/org-show-by-emp-id?emp_id=${this.props.id}&status=${this.props.status}` : `cbs/v1/team-show-by-emp-id?emp_id=${this.props.id}&status=${this.props.status}`)
        this.setState({
            allData : res.data.data
        })
    }

    paid = async () => {
        let data = {
            cbs_id : this.state.selected,
            status : 4
        }
        let res = await postData('cbs/v1/finance-cbs-paid', data)
        if (res.status === 200 || res.status === 201 || res.status === 101 ) {
            alertPop('success', `${data.cbs_id.length} Marked as paid`)
            this.view()
            this.props.method()
            this.setState({
                selected : [...this.state.selected.filter( elem => {
                    return !data.cbs_id.includes(elem)
                })],
                modal : false
            })
        } else {
            res.map( elem => {
                alertPop( 'error', elem)
            })
        }
    }

    approve = async () => {
        let date  = [...new Set(this.state.selectedCBS.map( val => {
            return val.created_at.split(' ')[0]
        }))].sort()
        let data = {
            cbs_id : this.state.selected,
            status : 1
        }
        if (this.props.type === 'org') {
        data = { ...data,
                summery : this.state.summery,
                date_from : date[0],
                date_to : date[date.length-1],
        }}
        let res = await postData(this.props.type === 'team' ? 'cbs/v1/team-cbs-approve-decline' : 'cbs/v1/finance-cbs-approve-decline', data)
        if (res.status === 200 || res.status === 201 || res.status === 101 ) {
            alertPop('success', `${data.cbs_id.length} Approved`)
            this.view()
            this.props.method()
            this.setState({
                selected : [...this.state.selected.filter( elem => {
                    return !data.cbs_id.includes(elem)
                })],
                modal : false
            })
        } else {
            res.map( elem => {
                alertPop( 'error', elem)
            })
        }
    }

    decline = async () => {
        let data = {
            cbs_id : this.state.selected,
            status : 0,
            note : this.state.note
        }
        let res = await postData(this.props.type === 'team' ? 'cbs/v1/team-cbs-approve-decline' : 'cbs/v1/finance-cbs-approve-decline', data)
        if (res.status === 200 || res.status === 201 || res.status === 101 ) {
            alertPop('success', `${data.cbs_id.length} Declined`)
            this.view()
            this.props.method()
            this.setState({
                modal : false,
                selected : [...this.state.selected.filter( elem => {
                    return !data.cbs_id.includes(elem)
                })],
                note : ''
            })
        } else {
            res.map( elem => {
                alertPop( 'error', elem)
            })
        }
    }

    render () {
        return (
            <Fragment>
                {this.state.allData ? 
                    <Collapse
                        defaultActiveKey={['1']}
                        accordion={this.state.accordion}
                        style={{backgroundColor : 'transparent', border : '0'}}
                        expandIcon={({ isActive }) => 
                            <Col style={{ display : 'flex', alignItems : 'center'}} lg={2}>
                                {
                                    (this.props.type === 'org' && this.props.status === 2) || (this.props.type === 'team' && this.props.status === 1) ?
                                    <Checkbox 
                                        onChange={ e => {
                                            let local = this.state.allData.cbs.map( l => {return l.id})
                                            e.target.checked ?
                                            this.setState({
                                                selected : [...this.state.selected, ...this.state.allData.cbs.map( item => {
                                                    return item.id
                                                })]
                                            }) : 
                                            this.setState({
                                                selected : this.state.selected.filter( value => {
                                                    return !local.includes(value)
                                                })
                                            })
                                        }}
                                        onClick={event => {
                                            // If you don't want click trigger collapse, you can prevent this:
                                            event.stopPropagation();
                                        }}
                                        style={{paddingRight : '1rem'}} 
                                    /> : ''
                                    
                                    
                                }
                                <Icon style={{fontSize : '12pt', color : '#0084E5'}} type={isActive ? 'minus-square' : 'plus-square'}/>
                            </Col>
                        }
                    >
                        <Collapse.Panel 
                            key='1'
                            showArrow={true}
                            style={{borderRadius : '0'}}
                            header={
                                <Row style={{display : 'flex', alignItems : 'center'}}>
                                    <Col lg={{span : 8, offset : 1}}>
                                        <Avatar src={this.state.allData.user_details.profile_pic} />
                                        <Typography.Text strong style={{padding : '0 1rem 0 1rem'}}>
                                            {this.state.allData.user_details.name.length > 15 ? `${this.state.allData.user_details.name.slice(0,10)}...` : this.state.allData.user_details.name}
                                        </Typography.Text>
                                        <Tag color='#0084e6' size='small' >{this.state.allData.cbs.length} CBS</Tag>
                                    </Col>
                                    <Col style={{textAlign : 'left'}} lg={6}>
                                        <Typography.Text>
                                            {this.state.allData.date_range}
                                        </Typography.Text>
                                    </Col>
                                    <Col style={{textAlign : 'left'}} lg={5}>
                                        ৳ {this.state.allData.amount}
                                    </Col>
                                    {
                                        (this.props.type === 'team' && this.props.status === 1) ?
                                        <Col style={{marginLeft : '1.2rem', textAlign : 'right'}} lg={4}>
                                            <Button 
                                                type='primary' 
                                                style={{marginRight : '1rem', color: '#00B969', borderColor :'#00B969'}} 
                                                ghost
                                                disabled={this.state.selected.length < 1}
                                                onClick={event => {
                                                    // If you don't want click trigger collapse, you can prevent this:
                                                    event.stopPropagation();
                                                    this.setState({
                                                        modalType : 'approve',
                                                        selectedCBS : this.state.allData.cbs,
                                                        modal : true
                                                    })
                                                }}
                                            >
                                                Accept all
                                            </Button>
                                        </Col> : 
                                        (this.props.type === 'org' && this.props.status === 2) ?
                                        <Col style={{marginLeft : '1.2rem', textAlign : 'right'}} lg={4}>
                                            <Button 
                                                type='primary' 
                                                style={{marginRight : '1rem', color: '#00B969', borderColor :'#00B969'}} 
                                                ghost
                                                disabled={this.state.selected.length < 1}
                                                onClick={event => {
                                                    // If you don't want click trigger collapse, you can prevent this:
                                                    event.stopPropagation();
                                                    this.setState({
                                                        modalType : 'approve-org',
                                                        selectedCBS : this.state.allData.cbs,
                                                        modal : true
                                                    })
                                                }}
                                            >
                                                Accept all
                                            </Button>
                                        </Col>
                                        :
                                        <Col style={{marginLeft : '1.2rem', textAlign : 'right'}} lg={8}>
                                            { 
                                                this.props.status === 2 ?
                                                <Typography.Text code>
                                                    Approved by department
                                                </Typography.Text> : this.props.status === 3 ?
                                                <Typography.Text code>
                                                    Approved by department
                                                </Typography.Text> : this.props.status === 4 ?
                                                <Typography.Text code>
                                                    Paid
                                                </Typography.Text> : this.props.status === 5 ?
                                                <Typography.Text code>
                                                    Declined by department
                                                </Typography.Text> : this.props.status === 6 ?
                                                <Typography.Text code>
                                                    Declined by finance
                                                </Typography.Text> : ''
                                            }
                                        </Col>
                                    }
                                </Row>
                            }
                        >
                            {this.state.allData.cbs.map( item => {
                                return (
                                        <Row className='collapse-menu' style={{paddingLeft : '46px'}}>
                                            <Col lg={1}>
                                                {
                                                    (this.props.type === 'org' && (this.props.status === 2)) || (this.props.type === 'team' && this.props.status === 1) ?
                                                    <Checkbox 
                                                        onChange={ e => {
                                                            e.target.checked ?
                                                            this.setState({
                                                                selected : [...this.state.selected, item.id]
                                                            }):
                                                            this.setState({
                                                                selected : this.state.selected.filter( val => {
                                                                    return val !== item.id
                                                                })
                                                            })
                                                        }}
                                                        checked = {this.state.selected.includes(item.id)}
                                                    /> : ''
                                                }
                                            </Col>
                                            <Col lg={8}>
                                                <Link className='LINK' to={this.props.type === 'team' ? `/cbs/team-details/${item.id}` : this.props.type === 'org' ? `/cbs/details/org-${item.id}` : `/cbs/details/${item.id}`}>
                                                    <Typography.Text style={{textAlign : 'left'}} strong>
                                                        {item.name.length > 15 ? `Bill of ${item.name.slice(0,15)}...` : `Bill of ${item.name}`}
                                                    </Typography.Text>
                                                </Link>
                                            </Col>                                                        
                                            <Col style={{textAlign : 'left'}} lg={6}>
                                                <Link className='LINK' to={this.props.type === 'team' ? `/cbs/team-details/${item.id}` : this.props.type === 'org' ? `/cbs/details/org-${item.id}` : `/cbs/details/${item.id}`}>
                                                    <Typography.Text>
                                                        {item.updated_at.split(' ')[0]}
                                                    </Typography.Text>
                                                </Link>
                                            </Col>
                                            <Col style={{textAlign : 'left'}} lg={5}>
                                                <Link className='LINK' to={this.props.type === 'team' ? `/cbs/team-details/${item.id}` : this.props.type === 'org' ? `/cbs/details/org-${item.id}` : `/cbs/details/${item.id}`}>
                                                    <Typography.Text>
                                                        ৳ {item.amount}
                                                    </Typography.Text>
                                                </Link>
                                            </Col>
                                            <Col style={{textAlign : 'right'}} lg={4}>
                                                {
                                                    (this.props.type === 'org' && this.props.status === 2) || (this.props.type === 'team' && this.props.status === 1) ?
                                                    <Button 
                                                        type='danger' 
                                                        ghost
                                                        onClick={event => {
                                                            this.setState({
                                                                selected : [item.id]
                                                            }, ()=> {
                                                                this.setState({
                                                                    modalType : 'decline',
                                                                    selectedCBS : [item],
                                                                    modal : true,
                                                                })
                                                            })
                                                        }}
                                                    >
                                                        Decline
                                                    </Button> : ''
                                                }
                                            </Col>
                                        </Row>
                                )
                            })}
                        </Collapse.Panel>
                    </Collapse>
                : ''}
                <Modal
                    title={ this.state.modalType === 'approve' || this.state.modalType === 'approve-org' ?
                            <Typography.Text style={{color : '#00B969'}} strong>
                                Approve following CBS?
                            </Typography.Text>:
                            this.state.modalType === 'paid' ?
                            <Typography.Text style={{color : '#00B969'}} strong>
                                Mark as paid?
                            </Typography.Text> :
                            this.state.modalType === 'decline' ?
                            <Typography.Text style={{color : '#EC3336'}} strong>
                                Decline following CBS?
                            </Typography.Text> : '' }
                    centered
                    visible={this.state.modal}
                    footer={false}
                    onCancel={() => {
                        this.setState({
                            modal : false,
                            selectedCBS : [],
                            modalType : ''
                        })
                    }}
                >
                    {
                        this.state.modalType === 'approve' ? 
                        <Fragment>
                            <Typography.Text strong>
                                Are you sure approve following CBS(s)?
                            </Typography.Text>
                            <div className='space' />
                            <div className='P-BG'>
                                <Row>
                                    <Col lg={12}>
                                        Total CBS ({this.state.selected.length})
                                    </Col>
                                    <Col style={{textAlign : 'right'}} lg={12}>
                                        ৳ {[...this.state.selectedCBS.map( elem => {
                                            if ( this.state.selected.includes(elem.id) ) {
                                                return elem.amount 
                                            } else {
                                                return 0
                                            }
                                        })].reduce( (a,b) => {
                                            return a + b
                                        })}
                                    </Col>
                                </Row>
                            </div>
                            <div className='space' />
                            <div className='space' />
                            <Row>
                                <Col lg={{span : 8, offset : 8}}>
                                    <Button onClick={this.approve} style={{borderColor : '#00B969', color : '#00B969'}} block ghost>
                                        Approve
                                    </Button>
                                </Col>
                            </Row>
                        </Fragment> :
                        this.state.modalType === 'approve-org' ? 
                        <Fragment>
                            <Typography.Text strong>
                                Are you sure approve following CBS(s)?
                            </Typography.Text>
                            <div className='space' />
                            <div className='P-BG'>
                                <Row>
                                    <Col lg={12}>
                                        Total CBS ({this.state.selected.length})
                                    </Col>
                                    <Col style={{textAlign : 'right'}} lg={12}>
                                        ৳ {[...this.state.selectedCBS.map( elem => {
                                            if ( this.state.selected.includes(elem.id) ) {
                                                return elem.amount 
                                            } else {
                                                return 0
                                            }
                                        })].reduce( (a,b) => {
                                            return a + b
                                        })}
                                    </Col>
                                </Row>
                            </div>
                            <div className='space' />
                            <div className='space' />
                            <div>
                                <Form.Item 
                                    required
                                    label='Provide a summary'
                                >
                                        <Input.TextArea
                                            onChange={ e => {
                                                this.setState({
                                                    summery : e.target.value
                                                })
                                            }}
                                            placeHolder = 'Write reason here'
                                        />
                                </Form.Item>
                            </div>
                            <div className='space' />
                            <Row>
                                <Col lg={{span : 8, offset : 8}}>
                                    <Button onClick={this.approve} style={{borderColor : '#00B969', color : '#00B969'}} block ghost>
                                        Approve
                                    </Button>
                                </Col>
                            </Row>
                        </Fragment> :
                        this.state.modalType === 'paid' ? 
                        <Fragment>
                            <Typography.Text strong>
                                Are you sure to mark following CBS(s) paid?
                            </Typography.Text>
                            <div className='space' />
                            <div className='P-BG'>
                                <Row>
                                    <Col lg={12}>
                                        Total CBS ({this.state.selected.length})
                                    </Col>
                                    <Col style={{textAlign : 'right'}} lg={12}>
                                        ৳ {[...this.state.selectedCBS.map( elem => {
                                            if ( this.state.selected.includes(elem.id) ) {
                                                return elem.amount 
                                            } else {
                                                return 0
                                            }
                                        })].reduce( (a,b) => {
                                            return a + b
                                        })}
                                    </Col>
                                </Row>
                            </div>
                            <div className='space' />
                            <div className='space' />
                            <Row>
                                <Col lg={{span : 8, offset : 8}}>
                                    <Button onClick={this.paid} style={{borderColor : '#00B969', color : '#00B969'}} block ghost>
                                        Mark as paid
                                    </Button>
                                </Col>
                            </Row>
                        </Fragment>
                        : this.state.modalType === 'decline' ? 
                        <Fragment>
                            <Typography.Text strong>
                                Are you sure decline following CBS(s)?
                            </Typography.Text>
                            <div className='space' />
                            <div className='P-BG'>
                                <Row>
                                    <Col lg={12}>
                                        Total CBS ({this.state.selected.length})
                                    </Col>
                                    <Col style={{textAlign : 'right'}} lg={12}>
                                        ৳ {[...this.state.selectedCBS.map( elem => {
                                            if ( this.state.selected.includes(elem.id) ) {
                                                return elem.amount 
                                            } else {
                                                return 0
                                            }
                                        })].reduce( (a,b) => {
                                            return a + b
                                        })}
                                    </Col>
                                </Row>
                            </div>
                            <div className='space' />
                            <div>
                                <Form.Item label='Declining reason'>
                                        <Input.TextArea
                                            onChange={ e => {
                                                this.setState({
                                                    note : e.target.value
                                                })
                                            }}
                                            placeHolder = 'Write reason here'
                                        />
                                </Form.Item>
                            </div>
                            <div className='space' />
                            <div className='space' />
                            <Row>
                                <Col lg={{span : 8, offset : 8}}>
                                    <Button onClick={this.decline} type='danger' block ghost>
                                        Delete
                                    </Button>
                                </Col>
                            </Row>
                        </Fragment>
                        : ''
                    }
                </Modal>
            </Fragment>
        )
    }
}

export default UserCBS