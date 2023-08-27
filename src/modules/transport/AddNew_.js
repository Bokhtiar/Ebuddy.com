import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {getData} from '../../scripts/getData'
import { postData } from '../../scripts/postData'
import styled from 'styled-components'
import {Redirect} from 'react-router-dom'
import * as moment from 'moment'
import LocationSearchInput from '../meeting/Gmap'
import { Typography, Input, Button, Row, Modal, Col, Form, Select, DatePicker, TimePicker, notification, Checkbox } from 'antd'
import { alertPop } from '../../scripts/message'

const Wrapper = styled.div`
    padding-top : 4rem;
    height : 100vh;
    width : 100%;
    overflow : auto;
    .search-bar {
        padding : 2% 2% 0% 2%;
    }
`

const plainOptions = [
    'Bus', 'Rickshaw', 'CNG', 'Own', 'Other'
]

class AddNew extends Component {
    constructor (props) {
        super (props)
        this.state = {
            view : [],
            type_id : '',
            meetingData : [],
            meetingInput : '',
            carInput : '',
            date : '',
            officeTransportModal : false,
            otherTransportModal : false,
            officeView : [],
            otherView : [],
            carData : [],
            time_from : '',
            time_to : '',
            otherOptions : [],
            amount : '',
            transport_type_id : '',
            other_transport_ids : '',
            purpose : '',
            btnLoading : false
        }
    }

    meetingSearch = async value => {
        let res = await getData(`rooms/v1/meeting/search?title=${value}`)
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

    officeTransportModal = () => {
        this.setState({
            officeTransportModal : !this.state.officeTransportModal
        })
    }

    otherTransportModal = () => {
        this.setState({
            otherTransportModal : !this.state.otherTransportModal
        })
    }

    bookCar = () => {
        let bookedView = (
            <div>
                <Typography.Text strong>
                    Booked transport - Office
                </Typography.Text>
                <div>
                    <Typography.Text>
                        {this.state.carInput.name}
                    </Typography.Text>
                </div>
                <div>
                    <Typography.Text>
                        Reg no : {this.state.carInput.reg_no}
                    </Typography.Text>
                </div>
            </div>
        )
        this.setState({
            officeView : bookedView,
        })
        this.officeTransportModal()
    }

    bookOthers = () => {
        let bookedView = (
            <div>
                <Typography.Text strong>
                    Booked transport - Others
                </Typography.Text>
                <div>
                    <Typography.Text>
                        {this.state.otherOptions.slice(0, -1).map( elem => {
                            return elem+', '
                        })} 
                        {this.state.otherOptions[this.state.otherOptions.length-1]}
                    </Typography.Text>
                </div>
                <div>
                    <Typography.Text>
                        Amount : {this.state.amount}
                    </Typography.Text>
                </div>
            </div>
        )
        this.setState({
            officeView : bookedView
        })
        this.otherTransportModal()
    }

    otherOptions = checkedValues => {
        let other_transport_ids = []
        checkedValues.forEach(elem => {
             (elem === 'Bus') ? other_transport_ids.push(1) :
                (elem === 'Rickshaw') ? other_transport_ids.push(2) :
                (elem === 'CNG') ? other_transport_ids.push(3) :
                (elem === 'Own') ? other_transport_ids.push(4) :
                other_transport_ids.push(5)
        })
        let transport_ids = other_transport_ids.toString()
        this.setState({
            otherOptions : checkedValues,
            other_transport_ids : transport_ids
        })
    }

    addTransport = async () => {
        this.setState({ btnLoading : true })
        let data = {
            date:  this.state.date ? this.state.date : '',
            location_from_address: this.props.startLoc ? this.props.startLoc.address : '',
            location_from_latlong: this.props.startLoc ? `${this.props.startLoc.latlong.lat},${this.props.startLoc.latlong.lng}` : '',
            location_from_name: this.props.startLoc ? this.props.startLoc.address : '',
            location_to_address: this.props.endLoc ? this.props.endLoc.address : '',
            location_to_latlong: this.props.endLoc ? `${this.props.endLoc.latlong.lat},${this.props.endLoc.latlong.lng}` : '',
            location_to_name: this.props.endLoc ? this.props.endLoc.address : '',
            transport_type_id: this.state.transport_type_id ? this.state.transport_type_id : '',
            type_id: this.state.type_id ? this.state.type_id : '',
        }
        if (this.state.type_id === '1') {
            data = {...data, meeting_id: this.state.meetingInput || ''}
        } else {
            data = {...data, purpose: this.state.purpose ? this.state.purpose : ''}
        }
        if (this.state.transport_type_id === 1) {
            data = {...data, time_from: this.state.time_from ? this.state.time_from : '', time_to: this.state.time_to ? this.state.time_to : '', car_id : this.state.carInput.id ? this.state.carInput.id : ''}
        } else {
            data = {...data, other_transport_ids: this.state.other_transport_ids ? this.state.other_transport_ids : '', amount: this.state.amount ? this.state.amount : ''}
        }

        let res = await postData('transport/v1/add-transport', data)

        if (res.status === 200 || res.status === 201 || res.status === 101 ) {
            let red = <Redirect to='/transport' />
            alertPop('success', 'Transport booked!')
            this.setState({btnLoading : false, redirect : red})
        } else {
            res.map( elem => {
                alertPop('error', elem)
            })
            this.setState({btnLoading : false})
        }
    }


    // Main method
    render () {
        const carOptions = this.state.carData.map(d => (
            <Select.Option key={d.id} value={{name : d.name, id : d.id, capacity : d.capacity, reg_no : d.reg_no}}>
                <Typography.Text strong>
                    {d.name}
                </Typography.Text>
                <div>
                    <Typography.Text>
                        Capacity : {d.capacity}
                    </Typography.Text>
                </div>
                <div>
                    <Typography.Text>
                        {d.reg_no}
                    </Typography.Text>
                </div>
            </Select.Option>
        ))

        const meetingOptions = this.state.meetingData.map(d => (
            <Select.Option key={d.id} value={d.id}>
                {d.title}
            </Select.Option>
        ))

        return (
            <Wrapper>
                <Typography.Title level={4} className="pad">
                    Book a transport
                </Typography.Title>
                <Row>
                    <Col lg={12} md={12} xs={24} className='pad'>
                        <Form.Item required label='Booking purpose'>
                            <Select 
                                style={{width : '100%'}} 
                                placeholder='Booking purpose'
                                onChange={value => { this.setState({ type_id : value}) }}
                            >
                                <Select.Option value='1' >Meeting</Select.Option>
                                <Select.Option value='2' >Other</Select.Option>
                            </Select>
                        </Form.Item>
                        {this.state.type_id === '2' ? 
                            <Form.Item required label='Write purpose'>
                                <Input onChange={ async e => { await this.setState({ purpose : e.target.value})}} />
                            </Form.Item>
                            :
                            <Form.Item required label='Select meeting'>
                                <Select 
                                    style={{width : '100%'}} 
                                    placeholder='Select meeting'
                                    showSearch
                                    defaultActiveFirstOption={false}
                                    filterOption={false}
                                    onSearch={this.meetingSearch}
                                    onChange={value => { this.setState({ meetingInput : value}) }}
                                >
                                    {meetingOptions}
                                </Select>
                            </Form.Item>
                        }
                        <Form.Item required label='Select date'>
                            <DatePicker style={{ width : '100%'}} onChange={ (date, dateString) => { this.setState({ date : dateString }) }} />
                        </Form.Item>
                    </Col>
                    <Col lg={12} md={12} xs={24} className="pad">
                        <Form.Item required label='Start location'>
                            <LocationSearchInput />
                        </Form.Item>
                        <Form.Item required label='End location'>
                            <LocationSearchInput help />
                        </Form.Item>
                        <Form.Item required label='Select transport'>
                            <Select
                                style={{width : '100%'}} 
                                placeholder='Select transport'
                                onChange={value => { this.setState({ transport_type_id : value}) }}
                            >
                                <Select.Option onClick={this.officeTransportModal} value={1}>Book office transport</Select.Option>
                                <Select.Option onClick={this.otherTransportModal} value={3}>Other transport services</Select.Option>
                            </Select>
                        </Form.Item>
                        {this.state.officeView}
                        <div className='space' />
                        <div className='right-text'>
                            <Button 
                                style={{minWidth : '12rem'}}
                                onClick={this.addTransport} 
                                size='large' loading={this.state.btnLoading} 
                                type='primary'>
                                    Create
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Modal
                    title="Book office transport"
                    centered
                    visible={this.state.officeTransportModal}
                    footer={null}
                    onCancel={this.officeTransportModal}
                >
                    <Form.Item required label='Booking duration'>
                        <Row>
                            <Col md={11}>
                                <TimePicker 
                                    style={{width : '100%'}} 
                                    type='text' 
                                    placeholder='Start time' 
                                    onChange={(time, timeString) => { 
                                        let time_ = timeString.slice(0,5)
                                        this.setState({
                                            time_from : time_
                                        })
                                    }}
                                />
                            </Col>
                            <Col md={{span : 11, offset : 1}}>
                                <TimePicker 
                                    style={{width : '100%'}} 
                                    type='text' 
                                    placeholder='End time' 
                                    onChange={(time, timeString) => { 
                                        let time_ = timeString.slice(0,5)
                                        this.setState({
                                            time_to : time_
                                        })
                                    }}
                                />
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item required label='Please select car'>
                        <Select
                            style={{width : '100%'}} 
                            placeholder='Select car'
                            showSearch
                            value={this.state.carInput.name}
                            defaultActiveFirstOption={false}
                            filterOption={false}
                            onSearch={this.carSearch}
                            onChange={value => { this.setState({ carInput : value}) }}
                            disabled={!this.state.time_from || !this.state.time_to}
                        >
                            {carOptions}
                        </Select>
                    </Form.Item>
                    <Button disabled={!this.state.carInput} onClick={this.bookCar} type='primary' htmlType='submit' block>
                        Submit
                    </Button>
                </Modal>
                <Modal
                    title="Book outside transport"
                    centered
                    visible={this.state.otherTransportModal}
                    footer={null}
                    onCancel={this.otherTransportModal}
                >
                    <Form.Item required label='Please select transport'>
                        <Row>
                            <Checkbox.Group options={plainOptions} onChange={this.otherOptions} />
                        </Row>
                    </Form.Item>
                    <Form.Item required label='Transport cost (in BDT)'>
                        <Input onChange={ async e => { await this.setState({ amount : e.target.value})}} />
                    </Form.Item>
                    <Button disabled={!this.state.amount} onClick={this.bookOthers} type='primary' block>
                        Submit
                    </Button>
                </Modal>
                {this.state.redirect}
            </Wrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        startLoc : state.address.address,
        endLoc : state.addressHelp.addressHelp
    }
}

export default connect(mapStateToProps, null)(AddNew)