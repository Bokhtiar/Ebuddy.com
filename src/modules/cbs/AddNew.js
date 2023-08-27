import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {getData} from '../../scripts/getData'
import { postData } from '../../scripts/postData'
import styled from 'styled-components'
import {Redirect} from 'react-router-dom'
import moment from 'moment'
import LocationSearchInput from '../meeting/Gmap'
import { Typography, Input, Button, Row, Modal, Col, Form, Select, DatePicker, Upload, Icon, Radio, Checkbox, Card, InputNumber, Empty, Divider, Spin, Skeleton } from 'antd'
import { alertPop } from '../../scripts/message'
import { checkRes } from '../../scripts/checkRes'
import { createMeeting } from '../../scripts/createMeeting'
import { validatePhone, validateAmount } from '../../scripts/validate'
import { errorHandle } from '../../scripts/error'

const Wrapper = styled.div`
    padding-top : 4rem;
    height : 100vh;
    width : 100%;
    overflow : auto;
    .search-bar {
        padding : 2% 2% 0% 2%;
    }
    .ant-upload {
        display : flex;
        width : 100%;
        padding : 0 1rem 0 1rem;
    }
    .ant-upload-list {
        padding : 0 2rem 0 2rem;
    }
    .ant-upload-list-item-name {
        color : #0084e6;
    }
`

const noClaim = (
    <div key={-1} style={{padding : '10%', textAlign : 'center'}}>
        Nothing added to claim
    </div>
)

class AddNew_Form extends Component {
    constructor (props) {
        super (props)
        this.state = {
            view : [],
            name : null,
            claim_type : '',
            type_id : '',
            meetingData : [],
            meetingInput : '',
            claimModal : false,
            claimView : [noClaim],
            transportView : [],
            cart : [],
            redirect : [],
            foodItem : {},
            food : [],
            grandTotal : 0,
            otherCbs : [],
            removeModal : false,
            date : '',
            v : [],
            carData : [],
            time_from : '',
            time_to : '',
            amount : '',
            transport_type_id : '',
            purpose : null,
            btnLoading : false,
            prevs : {},
            val_amount : null,
            attached : [],
            attached_view : [],
            file : [],
            create_loading : false,
            meeting : {},
            // companySelect : false,
            // branchSelect : false,
            // personSelect : false
            other_transport_ids : []
        }
    }

    componentWillMount () {
        this.view()
        this.companyList()
    }

    companyList = async () => {
        let companies = await getData('accounts/v1/company')
        companies.data.data ? 
        this.setState({
            companies : companies.data.data
        }) :
        companies.map( elem => {
            alertPop('error', elem)
        })
    }

    addNewCompany = async () => {
        let data = {
            category_id: 1,
            name: this.state.newCompany,
            type_id: 1
        }
        let res = await postData('accounts/v1/company', data)
        if (checkRes(res.status)) {
            this.setState({
                company_id : res.data.data.id,
                current_company : this.state.newCompany
            }, () => {
                this.companyList()
                this.branchList()
            })
        } else {
            res.map( elem => {
                alertPop('error', elem)
            })
        } 
    }

    branchList = async () => {
        let res = await getData(`accounts/v1/company/branch?id=${this.state.company_id}`)
        if (checkRes(res.status)) {
            this.setState({
                branches : res.data.data
            })
        } else {
            res.map ( elem => {
                alertPop('error', elem)
            })
        }
    }

    addNewBranch = async () => {
        let data = {
            company_id : this.state.company_id,
            email : 'dummy@dummy.com',
            location_address : 'dummy',
            location_latlong : 'dummy',
            name : this.state.newBranch,
            phone : 11111111111,
            type_id : 1
        }
        let res = await postData('accounts/v1/company/branch', data)
        if (checkRes(res.status)) {
            this.setState({
                branch_id : res.data.data.id,
                current_branch : this.state.newBranch
            }, () => {
                this.branchList()
                this.personList()
            })
        } else {
            res.map( elem => {
                alertPop('error', elem)
            })
        } 
    }

    personList = async () => {
        let res = await getData(`accounts/v1/company/contact-person?id=${this.state.branch_id}`)
        if (checkRes(res.status)) {
            this.setState({
                persons : res.data.data
            })
        } else {
            res.map ( elem => {
                alertPop('error', elem)
            })
        }
    }

    addNewPerson = async () => {
        let data = {
            branch_id : this.state.branch_id,
            company_id : this.state.company_id,
            designation : 'dummy',
            email : 'dummy',
            name : this.state.newPerson,
            phone : 11111111111,
            type_id : 1
        }
        let res = await postData('accounts/v1/company/contact-person', data)
        if (checkRes(res.status)) {
            this.setState({
                person_id : res.data.data.id,
                current_person : this.state.newPerson
            }, () => {
                this.personList()
            })
        } else {
            res.map( elem => {
                alertPop('error', elem)
            })
        } 
    }

    createTransport = async () => {
        this.setState({ addTransportLoading : true })
        if (this.state.new_transport_amount && validateAmount(this.state.new_transport_amount)) {
            let data = {
                date:  this.state.date ? this.state.meeting.date : moment().format().split('T')[0],
                location_from_address: this.props.startLoc ? this.props.startLoc.address : '',
                location_from_latlong: this.props.startLoc ? `${this.props.startLoc.latlong.lat},${this.props.startLoc.latlong.lng}` : '',
                location_from_name: this.props.startLoc ? this.props.startLoc.address : '',
                location_to_address: this.props.endLoc ? this.props.endLoc.address : '',
                location_to_latlong: this.props.endLoc ? `${this.props.endLoc.latlong.lat},${this.props.endLoc.latlong.lng}` : '',
                location_to_name: this.props.endLoc ? this.props.endLoc.address : '',
                transport_type_id: 3,
                purpose : this.state.purpose || this.state.meetingInputShow,
                type_id :  this.state.meeting_id ? '1' : '2',
                other_transport_ids : this.state.other_transport_ids ? this.state.other_transport_ids.toString() : '',
                amount : this.state.new_transport_amount ? this.state.new_transport_amount : ''
            }
    
            if (this.state.type_id == 1) {
                data = {...data, meeting_id : this.state.meetingInput }
            } else {
                data = {...data, purpose : this.state.purpose }
            }
    
            let res = await postData('transport/v1/add-transport', data)
            if (checkRes(res.status)) {
                this.transportList()
                this.setState({
                    addTransportLoading : null,
                    new_transport_amount : null,
                    other_transport_ids : [],
                    amount_help : null
                })
            } else {
                errorHandle(res)
                this.setState({
                    addTransportLoading : null
                })
            }
        }
        this.setState({
            addTransportLoading : null
        })
    }

    view = async () => {
        this.meetingSearch('')
        if(this.props.params.id) {
            let res = await getData(`cbs/v1/show/${this.props.params.id}`)
            this.setState({
                name : res.data.data.name,
                type_id : res.data.data.type_id,
                meetingInput : res.data.data.meeting_id || '',
                purpose : res.data.data.purpose || '',
                claimView : [noClaim],
            }, () => {
                res.data.data.foods.map( elem => {
                    let val = {
                        data : {...elem, id : elem.id}
                    }
                    this.cart(val)
                })
                res.data.data.transports.map( elem => {
                    this.cart({...elem, id : elem.id})
                })
                res.data.data.others.map( elem => {
                    this.cart({...elem, id : elem.id})
                })
            })
        }
    }

    meetingSearch = async value => {
        let res = await getData(`rooms/v1/meeting/list?&title=${value}&cbs=true`)
        this.setState({
            meetingData : res.data.data,
        })
    }

    carSearch = async value => {
        let res = await getData(`transport/v1/car-list?date=${new Date()}&time_from=${this.state.time_from}&time_to=${this.state.time_to}`)
        this.setState({
            carData : res.data.data
        })
    }

    claimModal = () => {
        this.setState({
            claimModal : !this.state.claimModal
        }, () => {
            if(this.state.claimModal) {
                this.transportList ()
            }
            this.setState({
                foodItem : {},
                otherValues : {},
                new_transport_amount : null,
                other_transport_ids : [],
                amount_help : null,
                otherAmount_help : null
            })
        })
    }

    remove = () => {
        let view = []
        this.setState({
            otherCbs : this.state.toRemove.data && this.state.toRemove.data.type === 'others' ? 
                        this.state.otherCbs.filter( elem => {
                            return this.state.toRemove.data.id != elem.id
                        }) : this.state.otherCbs,
            grandTotal : this.state.toRemove.amount ? this.state.grandTotal - this.state.toRemove.amount : this.state.grandTotal - parseInt(this.state.toRemove.data.amount)
        })
        if (this.state.toRemove.data) {
            let food = this.state.food
            food = food.filter( elem => { return elem.data.id !== this.state.toRemove.data.id })
            this.setState({
                food : food
            })
        }
        this.state.claimView.forEach(elem => {
            let checkClaim = this.state.toRemove.data ? this.state.toRemove.data.id : this.state.toRemove.id
            if (checkClaim.toString() !== elem[0].key) {
                view.push(elem)
            }
        })
        if (view.length < 1) {
            this.setState({
                claimView : [noClaim],
                grandTotal : 0
            })
        } else {
            this.setState({
                claimView : view
            })
        }
        this.setState({ toRemove : null })
        this.removeModal()
    }

    removeModal = () => {
        this.setState({
            removeModal : !this.state.removeModal
        })
    }

    cart = async (elem) => {
        let view = []
        if (this.state.claimView[0].key === '-1') {
            await this.setState({
                claimView : []
            })
        }
        if (elem.data && elem.data.food_item) {
            this.setState({
                food : [...this.state.food, elem]
            })
        }
        view.push(
            <div className='search-bar' key={elem.data ? elem.data.id : elem.id}>
                <Card 
                    hoverable
                    title={elem.transport_type_id ? 
                            elem.transport_type_id : 
                            elem.data && elem.data.food_item ? 
                            'Food' :
                            'Others'} 
                    extra={<i style={{cursor : 'pointer'}} onClick={() => {
                        this.setState({
                            toRemove : elem
                        })
                        this.removeModal()
                    }} 
                    class="material-icons">close</i>}
                >
                    <Card.Meta
                        description={
                            <Row>
                                <Col lg={20}>
                                    <Typography.Text>
                                        {elem.location ? `From : ${elem.location.location_from_name}` : elem.data && elem.data.food_item || 'Other claim'}
                                    </Typography.Text>
                                    <div>
                                        <Typography.Text>
                                            {elem.location ? `To : ${elem.location.location_to_name}` : ''}
                                        </Typography.Text>
                                    </div>
                                </Col>
                                <Col style={{textAlign : 'right'}} lg={4}>
                                    <Typography.Text strong>
                                        ৳ {elem.amount ? elem.amount : elem.data.amount ? elem.data.amount : elem.detail.amount}
                                    </Typography.Text>
                                </Col>
                            </Row>
                        }
                    />
                </Card>
                <div className='space' />
            </div>
        )
        this.setState ({
            claimView : [...this.state.claimView, view],
            otherCbs : elem.data && elem.data.type === 'others' ? [...this.state.otherCbs, elem.data] : this.state.otherCbs, 
            grandTotal : elem.amount ? elem.amount + this.state.grandTotal : elem.data ? parseInt(elem.data.amount) + this.state.grandTotal : parseInt(elem.detail.amount) + this.state.grandTotal ,
            claimModal : false
        })
    }

    transportList = async () => {
        let query = this.state.meetingInput ? 
                    `transport/v1/transport-list?cbs=true&transport_type_id=2,3&meeting_id=${this.state.meetingInput}` :
                    `transport/v1/transport-list?cbs=true&transport_type_id=2,3`
        let res = await getData(query)
        let view = []
        if(res.data.data) {
            res.data.data.forEach(elem => {
                view.push(
                    <div key={elem.id} className='FIX_cbs_addnew_transports' onClick={() => this.cart(elem)}>
                        <Row>
                            <Col md={11}>
                                <Typography.Text strong>
                                    {elem.transport_type_id}
                                </Typography.Text>
                            </Col>
                            <Col md={{span : 3,  offset : 10}}>
                                <Typography.Text strong>
                                    ৳ {elem.amount}
                                </Typography.Text>
                            </Col>
                        </Row>
                        <Typography.Text>
                            From : {elem.location.location_from_name}
                        </Typography.Text>
                        <div>
                            <Typography.Text>
                                To : {elem.location.location_to_name}
                            </Typography.Text>
                        </div>
                    </div>
                )
            })
        }
        view.push(
            <Button onClick={() => {
                this.setState({
                    v : []
                })
            }} block>
                Create new transport
            </Button>
        )
        this.setState({
            v : view
        })
    }

    foodSubmit = () => {
        let food = {
            data : {...this.state.foodItem, id : new Date()}
        }
        this.cart(food)
    }

    addOtherCbs = () => {
        if (this.state.otherValues && this.state.otherValues.description && this.state.otherValues.amount && validateAmount(this.state.otherValues.amount) && this.state.otherValues.date) {
            let others = {
                data : {
                    ...this.state.otherValues,
                    id : new Date(), 
                    type : 'others',
                    date : this.state.otherValues.date.dateString
                }
            }
            this.cart(others)
        } else {
            alertPop('error', 'Please fill up the form accordingly!')
        }
        // this.props.form.validateFields((err, values) => {
        //     if (!err && this.state.valid_amount.validateStatus === 'success') {
                
        //     } else {
        //         this.setState({
        //             valid_amount : {
        //                 ...this.state.valid_amount,
        //                 validateStatus : 'error'
        //             }
        //         })
        //     }
        // })
    }

    init = async () => {
        this.setState({ create_loading : true })
        if (this.state.attached.length > 0) {
            Promise.all(this.state.attached.map(async (val, index) => {
                const formData = new FormData();
                formData.append('file', val);
                formData.append('type', 'cbs');
        
                let res = await postData('files/v1/upload', formData)
                if (res) {
                    if (checkRes(res.status)) {
                        this.setState({
                            file : [...this.state.file, res.data.data.id],
                        })
                    } else {
                        alertPop('error', 'File could not be uploaded!')
                    }   
                } else {
                    errorHandle(res)
                }
            })).then(() => {
                this.setState({
                    attached : []
                }, () => {
                    this.addClaim()
                })
            })
        } else {
            this.addClaim()
        }
    }

    addClaim = async () => {
        let red = <Redirect to='/cbs/my-cbs/1/1' />
        let data = {
            type_id : this.state.type_id,
            name : this.state.meetingInputShow || this.state.purpose,
        };

        let transport;
        let food;
        let others;

        (this.state.type_id === '1') ? data = {...data, meeting_id : this.state.meetingInput} : data = {...data, purpose : this.state.purpose}
        if (this.state.claimView[0].key !==  '-1') {
            let transportList = this.state.claimView.filter( elem => {
                    return elem[0].key.length < 10
            })
            transport = transportList.map ( elem => {
                return elem[0].key
            })
            food = this.state.food.map( elem=> {
                return {amount : elem.data.amount, food_item : elem.data.food_item, quantity : elem.data.quantity, resturant_name : elem.data.resturant_name}
            })
            others = this.state.otherCbs.map( elem => {
                return {description : elem.description, amount : elem.amount, date : moment(elem.date).format().split('T')[0]}
            })
        }

        data.claim = {
            food : food,
            transport : transport,
            others : others,
        }

        if (this.state.file.length > 0 ) {
            data.files = this.state.file
        }

        let res = await postData('cbs/v1/add-cbs', data)
        if (res.status === 200 || res.status === 201 || res.status === 101 ) {
            alertPop('success', 'CBS created!')
            this.setState({
                btnLoading : false,
                redirect : red,
                create_loading : false,
                file : []
            })
        } else {
            res.map( elem => {
                alertPop('error', elem)
            })
            this.setState({create_loading : false, file : []})
        }
    }

    // Main method
    render () {
        const meetingOptions = this.state.meetingData.map(d => (
            <Select.Option key={d.id} value={d.id}>
                {d.booking_details.title}
            </Select.Option>
        ))

        return (
            <Wrapper>
                <div className='search-bar'>
                    <Typography.Title level={4}>
                        {this.props.params.id ? 'Update your claim' : 'Create a CBS claim'}
                    </Typography.Title>
                    <Row>
                        <Col lg={11} md={11} xs={24}>
                            <Form.Item 
                                label='Claim purpose'
                                required
                                validateStatus={this.state.type_id == 1 || 2 ? '' : 'error'}
                            >
                                <Select 
                                    style={{width : '100%'}} 
                                    value={this.state.type_id == 1 ? 'Meeting' : this.state.type_id == 2 ? 'Other' : [] }
                                    placeholder='Booking purpose'
                                    onChange={value => { this.setState({ type_id : value}) }}
                                >
                                    <Select.Option value='1' >Meeting</Select.Option>
                                    <Select.Option value='2' >Other</Select.Option>
                                </Select>
                            </Form.Item>
                            {this.state.type_id == '2' ? 
                                <Form.Item 
                                    label='Write purpose'
                                    required
                                    help={this.state.purpose === '' ? 'Required' : ''}
                                    validateStatus={this.state.purpose === '' ? 'error' : ''}
                                >
                                    <Input value={this.state.purpose || []} placeholder='Write purpose' onChange={ async e => { await this.setState({ purpose : e.target.value})}} />
                                </Form.Item>
                                :
                                <Form.Item required label='Select meeting'>
                                    <Select 
                                        showArrow={true}
                                        notFoundContent={null}
                                        style={{width : '100%'}} 
                                        value={this.state.meetingInputShow || []}
                                        placeholder={'Select meeting'}
                                        showSearch
                                        defaultActiveFirstOption={false}
                                        filterOption={false}
                                        onSearch={this.meetingSearch}
                                        onChange={value => { 
                                            this.state.meetingData.map( val => {
                                                if (val.id === value) {
                                                    this.setState({
                                                        meetingInputShow : val.booking_details.title
                                                    })
                                                }
                                            })
                                            this.setState({ 
                                                meetingInput : value
                                            }) 
                                        }}
                                    >
                                        <Select.Option className='border-bottom' onClick={() => {
                                            this.setState({
                                                meetingModal : true,
                                            }, () => {
                                                this.meetingSearch('')
                                            })
                                        }} value={-1}>
                                            <Typography.Text>
                                                + Create new meeting
                                            </Typography.Text>
                                        </Select.Option>
                                        {meetingOptions}
                                    </Select>
                                </Form.Item>
                            }
                        </Col>
                        <Col style={{ backgroundColor : '#F2F7FB', marginBottom : '1rem'}} lg={{span : 11, offset : 1}} md={{span : 11, offset : 1}} xs={24}>
                            <div className='search-bar'>
                                <Row style={{borderBottom : '0.5px dashed lightgray'}}>
                                    <Col md={16}>
                                        <Typography.Text string>
                                            Click to add claim
                                        </Typography.Text>
                                    </Col>
                                    <Col style={{textAlign : 'right'}} md={8}>
                                        <Button 
                                            disabled={!this.state.meetingInput && !this.state.purpose} 
                                            shape='round' 
                                            onClick={() => {
                                                this.setState({
                                                    foodItem : {},
                                                    val_amount : null
                                                })
                                                this.claimModal()
                                            }} 
                                            size='small'
                                        >
                                            + Add claim
                                        </Button>
                                        <div className='space' />
                                    </Col>
                                </Row>
                                {this.state.claimView}
                                <div className='search-bar'>
                                    {(this.state.claimView[0] && this.state.claimView[0].key === '-1') ? '' : 
                                        <Card>
                                            <Row>
                                                <Col md={20}>
                                                    <Typography.Text strong>
                                                        Grand total
                                                    </Typography.Text>
                                                </Col>
                                                <Col style={{textAlign : 'right'}} md={4}>
                                                    <Typography.Text strong>
                                                        ৳ {this.state.grandTotal}
                                                    </Typography.Text>
                                                </Col>
                                            </Row>
                                        </Card>
                                    }
                                </div>
                                <div className='space' />
                            </div>
                            <div className='space' />
                            <Divider />
                            <div className='space' />
                            <Row style={{width : '100%'}}>
                                <Col style={{paddingLeft : '2rem'}} lg={14}>
                                    <Typography.Text strong>
                                        Upload invoice
                                    </Typography.Text>
                                    <div>
                                        <Typography.Text>
                                            Upload all necessary bills/invoices related to this CBS
                                        </Typography.Text>
                                    </div>
                                </Col>
                                <Col lg={{span : 9, offset : 1}}>
                                    <Upload
                                        style={{ padding: "0" }}
                                        className='right-text' 
                                        onRemove={file => {
                                            const index = this.state.attached.indexOf(file);
                                            const newFileList = this.state.attached.slice();
                                            newFileList.splice(index, 1);
                                            this.setState({
                                                attached: newFileList
                                            });
                                        }}
                                        beforeUpload={file => {
                                            file.size/1024/1024 < 2 ?
                                            this.setState({
                                                attached : [...this.state.attached, file]
                                            }) :
                                            alertPop('error', 'File must be smaller than 2MB')
                                            return false;
                                        }}
                                        fileList={this.state.attached}
                                    >    
                                            <Button>
                                                <Icon type="upload" /> 
                                                Browse
                                            </Button>
                                    </Upload>
                                </Col>
                            </Row>
                            <div className='space' />
                            <Divider />
                            <div className='space' />
                            <Button 
                                disabled={(!this.state.meetingInput && !this.state.purpose) || !this.state.type_id} 
                                onClick={this.init} 
                                size='large' 
                                loading={this.state.create_loading} 
                                type='primary' 
                                block>Create</Button>
                        </Col>
                    </Row>
                    <Modal
                        title="Add claim"
                        centered
                        visible={this.state.claimModal}
                        footer={null}
                        onCancel={this.claimModal}
                    >
                        <Form.Item label='Claim type'>
                            <Select 
                                style={{width : '100%'}} 
                                placeholder='Claim type'
                                onChange={value => {
                                     this.setState({ claim_type : value})
                                    }
                                }
                            >
                                <Select.Option value='1' >Transport</Select.Option>
                                <Select.Option value='2' >Food</Select.Option>
                                <Select.Option value='3' >Others</Select.Option>
                            </Select>
                        </Form.Item>
                        {this.state.claim_type ?
                            this.state.claim_type === '1' ? 
                                this.state.v.length < 1 ?
                                <Fragment>
                                    <Form.Item required label='Start location'>
                                        <LocationSearchInput />
                                    </Form.Item>
                                    <Form.Item required label='End location'>
                                        <LocationSearchInput help />
                                    </Form.Item>
                                    <Form.Item required label='Transport type'>
                                        <div style={{display : 'inline-block'}}>
                                            <Checkbox onChange={ e => {
                                                e.target.checked ?
                                                this.setState({
                                                    other_transport_ids : [...this.state.other_transport_ids, e.target.value]
                                                }) :
                                                this.setState({
                                                    other_transport_ids : this.state.other_transport_ids.filter( val => {
                                                        return val !== e.target.value
                                                    })
                                                })
                                            }} value='1'>Bus</Checkbox>
                                            <Checkbox onChange={ e => {
                                                e.target.checked ?
                                                this.setState({
                                                    other_transport_ids : [...this.state.other_transport_ids, e.target.value]
                                                }) :
                                                this.setState({
                                                    other_transport_ids : this.state.other_transport_ids.filter( val => {
                                                        return val !== e.target.value
                                                    })
                                                })
                                            }} value='2'>Rickshaw</Checkbox>
                                            <Checkbox onChange={ e => {
                                                e.target.checked ?
                                                this.setState({
                                                    other_transport_ids : [...this.state.other_transport_ids, e.target.value]
                                                }) :
                                                this.setState({
                                                    other_transport_ids : this.state.other_transport_ids.filter( val => {
                                                        return val !== e.target.value
                                                    })
                                                })
                                            }} value='3'>CNG</Checkbox>
                                            <Checkbox onChange={ e => {
                                                e.target.checked ?
                                                this.setState({
                                                    other_transport_ids : [...this.state.other_transport_ids, e.target.value]
                                                }) :
                                                this.setState({
                                                    other_transport_ids : this.state.other_transport_ids.filter( val => {
                                                        return val !== e.target.value
                                                    })
                                                })
                                            }} value='4'>Own</Checkbox>
                                            <Checkbox onChange={ e => {
                                                e.target.checked ?
                                                this.setState({
                                                    other_transport_ids : [...this.state.other_transport_ids, e.target.value]
                                                }) :
                                                this.setState({
                                                    other_transport_ids : this.state.other_transport_ids.filter( val => {
                                                        return val !== e.target.value
                                                    })
                                                })
                                            }} value='5'>Other</Checkbox>
                                        </div>
                                    </Form.Item>
                                    <Form.Item 
                                        required 
                                        label='Amount'
                                        validateStatus={this.state.new_transport_amount ? validateAmount(this.state.new_transport_amount) ? '' : 'error' : ''}
                                        help={this.state.new_transport_amount ? validateAmount(this.state.new_transport_amount) ? '' : 'Enter a valid amount' : ''}
                                    >
                                        <Input 
                                            // type='number'
                                            placeholder='Amount'
                                            value={this.state.new_transport_amount || []}
                                            onChange={ e => {
                                                this.setState({
                                                    new_transport_amount : e.target.value,
                                                })
                                            }}
                                        />
                                    </Form.Item>
                                    <Button loading={this.state.addTransportLoading} onClick={this.createTransport} block type='primary'>
                                        Add transport
                                    </Button>
                                </Fragment> :
                                <Form.Item required label='Select transport'>
                                    <div style={{maxHeight : '250px', overflow : 'auto'}}>
                                        {this.state.v}
                                    </div>
                                </Form.Item> :
                            this.state.claim_type === '3' ?
                                <div>
                                    <Form.Item required label='Description'>
                                        <Input.TextArea
                                            placeholder='Description'
                                            style={{width : '100%'}} 
                                            value={this.state.otherValues.description || []}
                                            onChange = { e=> {
                                                this.setState({
                                                    otherValues : {
                                                        ...this.state.otherValues,
                                                        description : e.target.value
                                                    }
                                                })
                                            }}
                                        />
                                    </Form.Item>
                                    <Form.Item 
                                        label='Amount'
                                        required
                                        validateStatus={this.state.otherValues.amount ? validateAmount(this.state.otherValues.amount) ? '' : 'error' : ''}
                                        help={this.state.otherValues.amount ? validateAmount(this.state.otherValues.amount) ? '' : 'Enter a valid amount' : ''}
                                    >
                                        <Input 
                                            value={this.state.otherValues.amount || []}
                                            placeholder='Amount'
                                            onChange={e => {
                                                this.setState({
                                                    otherValues : {
                                                        ...this.state.otherValues,
                                                        amount : e.target.value
                                                    }
                                                })
                                            }}
                                            style={{width : '100%'}} 
                                        />
                                    </Form.Item>
                                    <Form.Item required label='Date'>
                                            <DatePicker 
                                                format = 'YYYY-MM-DD'
                                                style= {{ width : '100%'}}
                                                disabledDate={current => {
                                                    return current > moment().add(0, "day");
                                                }}
                                                value={this.state.otherValues.date ? moment(this.state.otherValues.date.date) : ''}
                                                onChange = { (dateValue, dateString) => {
                                                    this.setState({
                                                        otherValues : {
                                                            ...this.state.otherValues,
                                                            date : {date : dateString.split('T')[0], dateValue : dateString}
                                                        }
                                                    })
                                                }}
                                            />
                                    </Form.Item>
                                    <Button type='primary' onClick={this.addOtherCbs} block>Add</Button>
                                </div> :
                                <div>
                                    <Row>
                                        <Col md={11}>
                                            <Form.Item label='Restaurant name' required>
                                                <Input 
                                                    placeholder='Restaurant name' 
                                                    value={this.state.foodItem.resturant_name || ''}
                                                    type = 'text'
                                                    onChange={ e => 
                                                        this.setState({ 
                                                            foodItem : 
                                                                    {
                                                                    ...this.state.foodItem, 
                                                                    resturant_name : e.target.value
                                                                    }
                                                            })}
                                                    />
                                            </Form.Item>
                                        </Col>
                                        <Col md={{span : 11, offset : 2}}>
                                            <Form.Item label='Food item' required>
                                                <Select 
                                                    style={{width : '100%'}} 
                                                    placeholder='Food item' 
                                                    value={this.state.foodItem.food_item || []}
                                                    defaultActiveFirstOption={true}
                                                    onChange={ value => 
                                                        this.setState({ 
                                                            foodItem : 
                                                                    {
                                                                    ...this.state.foodItem, 
                                                                    food_item : value
                                                                    }
                                                            })}
                                                    >
                                                        <Select.Option value='Breakfast'>Breakfast</Select.Option>
                                                        <Select.Option value='Lunch'>Lunch</Select.Option>
                                                        <Select.Option value='Dinner'>Dinner</Select.Option>
                                                        <Select.Option value='Snacks'>Snacks</Select.Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={11}>
                                            <Form.Item 
                                                label='Quantity' 
                                                required
                                                validateStatus={this.state.foodItem.quantity && this.state.foodItem.quantity === 'invalid' ? 'error' : ''}
                                                help={this.state.foodItem.quantity && this.state.foodItem.quantity === 'invalid' ? 'Quantity must be greater than 1' : ''}
                                            >
                                                <Input 
                                                    placeholder='Quantity' 
                                                    value={this.state.foodItem.quantity || []}
                                                    type = 'number'
                                                    onChange={ e => 
                                                        e.target.value > 0 ?
                                                            this.setState({
                                                                foodItem : {
                                                                    ...this.state.foodItem,
                                                                    quantity : e.target.value.slice(0,2),
                                                                    amount : this.state.val_amount ? this.state.val_amount * e.target.value : ''
                                                                }
                                                            })
                                                        :
                                                        this.setState({ 
                                                            foodItem : 
                                                                    {
                                                                        ...this.state.foodItem, 
                                                                        quantity : 'invalid',
                                                                    }
                                                            })}
                                                    />
                                            </Form.Item>
                                        </Col>
                                        <Col md={{span : 11, offset : 2}}>
                                            <Form.Item 
                                                label='Bill amount'
                                                required
                                                validateStatus = {this.state.valid_amount && this.state.valid_amount === 'Invalid' ? 'error' : 'success'}
                                                help = {this.state.valid_amount && this.state.valid_amount === 'Invalid' ? 'The amount should be between 1 to 5000' : ''}
                                            >
                                                <Input 
                                                    placeholder='Amount' 
                                                    type = 'number'
                                                    required
                                                    value={this.state.val_amount}
                                                    // value={this.state.foodItem.quantity && this.state.foodItem.quantity > 0 ? this.state.foodItem.amount / this.state.foodItem.quantity : []}
                                                    onChange={ e => 
                                                        (e.target.value > 0 && e.target.value < 5001) ? 
                                                        this.setState({ 
                                                            valid_amount : '',
                                                            val_amount : e.target.value,
                                                            foodItem : 
                                                                    {
                                                                    ...this.state.foodItem, 
                                                                    amount : this.state.foodItem.quantity ? 
                                                                        this.state.foodItem.quantity * e.target.value :
                                                                        e.target.value
                                                                    }
                                                            }) :
                                                        this.setState({
                                                            valid_amount : 'Invalid',
                                                            val_amount : null,
                                                            foodItem : 
                                                                    {
                                                                    ...this.state.foodItem, 
                                                                    amount : []
                                                                    }
                                                        })
                                                        }
                                                        
                                                    />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Button 
                                        disabled={!this.state.foodItem.resturant_name ||
                                                    !this.state.foodItem.amount ||
                                                    !this.state.foodItem.food_item ||
                                                    !this.state.val_amount ||
                                                    !this.state.foodItem.quantity || this.state.foodItem.quantity === 'invalid'
                                                    } 
                                        onClick={this.foodSubmit} 
                                        type='primary'
                                        block
                                    >
                                        Submit
                                    </Button>
                                </div> 
                            : ''
                        }
                    </Modal>
                    <Modal
                        title="Delete claim?"
                        centered
                        visible={this.state.removeModal}
                        footer={null}
                        onCancel={() => {
                            this.setState({
                                toRemove : null
                            })
                            this.removeModal()
                        }}
                    >
                        <Row>
                            <Col lg={11}>
                                <Button block onClick={() => { 
                                    this.setState({ toRemove : null})
                                    this.removeModal()
                                }}>Cancel</Button>
                            </Col>
                            <Col lg={{span : 11, offset : 2}}>
                                <Button onClick={this.remove} type='danger' block>Delete</Button>
                            </Col>
                        </Row>
                    </Modal>
                    <Modal
                        title="Create meeting"
                        centered
                        visible={this.state.meetingModal}
                        footer={null}
                        onCancel={() => {
                            this.setState({meetingModal : false})
                        }}
                    >
                        <Form.Item required label='Meeting title'>
                            <Input
                                placeholder = 'Meeting title'
                                onChange={ e => {
                                    this.setState({
                                        meeting : {
                                            ...this.state.meeting,
                                            title : e.target.value
                                        }
                                    })
                                }}
                            />
                        </Form.Item>
                        <Row>
                            <Col className='right-pad' lg={12}>
                                <Form.Item required label='Meeting date'>
                                    <DatePicker 
                                        disabledDate={current => {
                                            return current > moment().add(0, "day");
                                        }}
                                        onChange={ (date, dateString) => {
                                            this.setState({
                                                meeting : {
                                                    ...this.state.meeting,
                                                    date : dateString
                                                }
                                            })
                                        }}
                                    />
                                </Form.Item>
                            </Col>
                            <Col className='left-pad left-text' lg={12}>
                                <Form.Item required label='Meeting with'>
                                    <Radio.Group onChange={ e => {
                                        this.setState({
                                            meeting : {
                                                ...this.state.meeting,
                                                meeting_with : e.target.value
                                            }
                                        })
                                    }}>
                                        <Radio value='Individual'>Person</Radio>
                                        <Radio value='Company'>Company</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        </Row>
                        {
                            this.state.meeting.meeting_with ?
                            this.state.meeting.meeting_with === 'Company' ?
                            this.state.companies ? 
                                <Fragment>
                                    <Form.Item required label='Company name'>
                                        <Select
                                            showSearch
                                            placeholder='Select Company or type to add one'
                                            // value={this.state.newBranchInput.name || this.state.branchInput}
                                            style={{ width: "100%" }}
                                            defaultActiveFirstOption={false}
                                            filterOption={false}
                                            value={this.state.current_company || []}
                                            onSearch={ e => {
                                                this.setState({
                                                    newCompany : e
                                                })
                                            }}
                                            onChange={ value => {
                                                this.setState({
                                                    company_id : value
                                                }, () => {
                                                    this.branchList()
                                                })
                                            }}
                                            // onChange={this.branchInput}
                                        >
                                            {
                                                this.state.newCompany ?
                                                <Select.Option onClick={this.addNewCompany} className='select-bg' value={-1} >
                                                    <Typography.Text>
                                                        + Click to add
                                                    </Typography.Text>
                                                    <Typography.Text strong>
                                                        {` ${this.state.newCompany}`}
                                                    </Typography.Text>
                                                </Select.Option> :
                                                ''
                                            }
                                            {
                                                this.state.companies.map( elem => {
                                                    return (
                                                        <Select.Option 
                                                            value={elem.id}
                                                            onClick={() => {
                                                                this.setState({
                                                                    current_company : elem.name
                                                                })
                                                            }}
                                                        >
                                                            {elem.name}
                                                        </Select.Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                    {
                                        this.state.branches ? 
                                        <Form.Item required label='Branch name'>
                                            <Select
                                                showSearch
                                                placeholder='Select Branch or type to add one'
                                                // value={this.state.newBranchInput.name || this.state.branchInput}
                                                style={{ width: "100%" }}
                                                defaultActiveFirstOption={false}
                                                filterOption={false}
                                                value={ this.state.current_branch || []}
                                                onSearch={ e => {
                                                    this.setState({
                                                        newBranch : e
                                                    })
                                                }}
                                                onChange={ value => {
                                                    this.setState({
                                                        branch_id : value
                                                    }, () => {
                                                        this.personList()
                                                    })
                                                }}
                                            >
                                                {
                                                    this.state.newBranch ?
                                                    <Select.Option onClick={this.addNewBranch} className='select-bg' value={-1} >
                                                        <Typography.Text>
                                                            + Click to add
                                                        </Typography.Text>
                                                        <Typography.Text strong>
                                                            {` ${this.state.newBranch}`}
                                                        </Typography.Text>
                                                    </Select.Option> : []
                                                }
                                                {
                                                    this.state.branches.map( elem => {
                                                        return (
                                                            <Select.Option 
                                                                onClick={() => {
                                                                    this.setState({
                                                                        current_branch : elem.name
                                                                    })
                                                                }}
                                                                value={elem.id}
                                                            >
                                                                {elem.name}
                                                            </Select.Option>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </Form.Item> : []
                                    }
                                    {
                                        this.state.persons ?
                                        <Form.Item required label='Contact person'>
                                            <Select
                                                showSearch
                                                placeholder='Select Person or type to add one'
                                                // value={this.state.newBranchInput.name || this.state.branchInput}
                                                style={{ width: "100%" }}
                                                defaultActiveFirstOption={false}
                                                filterOption={false}
                                                value={this.state.current_person || []}
                                                onSearch={ e => {
                                                    this.setState({
                                                        newPerson : e
                                                    })
                                                }}
                                                onChange={ value => {
                                                    this.setState({
                                                        person_id : value
                                                    })
                                                }}
                                            >
                                                {
                                                    this.state.newPerson ?
                                                    <Select.Option onClick={this.addNewPerson} className='select-bg' value={-1} >
                                                        <Typography.Text>
                                                            + Click to add
                                                        </Typography.Text>
                                                        <Typography.Text strong>
                                                            {` ${this.state.newPerson}`}
                                                        </Typography.Text>
                                                    </Select.Option> :
                                                    ''
                                                }
                                                {
                                                    this.state.persons.map( elem => {
                                                        return (
                                                            <Select.Option 
                                                                onClick={() => {
                                                                    this.setState({
                                                                        current_person : elem.name
                                                                    })
                                                                }}
                                                                value={elem.id}
                                                            >
                                                                {elem.name}
                                                            </Select.Option>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </Form.Item> : 
                                        <Fragment>
                                            <Spin style={{width : '100%'}} indicator={<Icon type='loading' spin/>}/>
                                            <div className='space' />
                                            <div className='space' />
                                        </Fragment>
                                    }
                                </Fragment>
                            : <Spin className='space' style={{width : '100%'}} indicator={<Icon type='loading' spin/>}/>
                            : 
                            this.state.meeting.meeting_with ?
                            <Fragment>
                                <Form.Item label='Person name'>
                                    <Input 
                                        placeholder='Person name'
                                        onChange={ e => {
                                            this.setState({
                                                meeting : {
                                                    ...this.state.meeting,
                                                    person_name : e.target.value
                                                }
                                            })
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item label='Company/Institute name'>
                                    <Input 
                                        placeholder='Company/Institute name'
                                        onChange={ e => {
                                            this.setState({
                                                meeting : {
                                                    ...this.state.meeting,
                                                    institute_name : e.target.value
                                                }
                                            })
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item 
                                    required 
                                    label='Contact number'
                                    validateStatus={this.state.meeting.contact_number ? validatePhone(this.state.meeting.contact_number) ? '' : 'error' : ''}
                                    help={this.state.meeting.contact_number ? validatePhone(this.state.meeting.contact_number) ? '' : 'Invalid phone number' : ''}
                                >
                                    <Input 
                                        placeholder='Contact number'
                                        value={this.state.meeting.contact_number || []}
                                        onChange={ e => {
                                            if (e.target.value.length < 12) {
                                                this.setState({
                                                    meeting : {
                                                        ...this.state.meeting,
                                                        contact_number : e.target.value
                                                    }
                                                })
                                            }
                                        }}
                                    />
                                </Form.Item>
                            </Fragment> : [] : []
                        }
                        <Button 
                            onClick={ async () => { 
                                this.setState({
                                    meeeting_btn_load : true
                                })
                                let create = await createMeeting({
                                    ...this.state.meeting, 
                                    company_id : this.state.company_id, 
                                    branch_id : this.state.branch_id, 
                                    person_id : this.state.person_id})
                                if (create !== 0) {
                                    this.meetingSearch('')
                                    this.setState({
                                        meetingModal : false,
                                        meeeting_btn_load : null,
                                        meetingInputShow : this.state.meeting.title,
                                        meetingInput : create
                                    }) 
                                } else {
                                    this.setState({
                                        meeeting_btn_load : null
                                    })
                                    // alertPop('error', 'Please  fill up the form accordingly!')
                                }
                            }} 
                            disabled={this.state.create_meeting_disabled}
                            size='large' type='primary' block
                            loading = {this.state.meeeting_btn_load}
                        >
                            Create meeting
                        </Button>
                    </Modal>
                </div>
                {this.state.redirect}
            </Wrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        startLoc : state.address.address,
        endLoc : state.address.addressHelp
    }
}

const AddNew = Form.create({ name: "add_new" })(
    connect(mapStateToProps, null)(AddNew_Form)
)

export default AddNew