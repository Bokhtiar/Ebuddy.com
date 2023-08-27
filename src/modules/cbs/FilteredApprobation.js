import React, { Component, Fragment } from 'react'
import { Button, Tooltip, Modal, Form, Radio, Select, DatePicker } from 'antd'
import { connect } from 'react-redux'
import { getData } from '../../scripts/getData'
import { filteredLink } from '../../redux/actions/filteredLink'
import * as moment from 'moment'

class FilteredApprobation extends Component {

    constructor (props) {
        super (props)
        this.state = {
            modal : false,
            date_from : '',
            date_to : '',
            name : '',
            options : [],
            sub_id : ''
        }
    }

    componentWillMount () {
        this.options()
    }

    modal = () => {
        this.setState({
            modal : !this.state.modal
        })
    }

    options = async () => {
        let response = ''
        if (this.state.name.length > 0) {
            let res = await getData(`accounts/v1/e-buddy/subordinate-list?name=${this.state.name}`)
            response = res.data.data
        } else {
            let res = await getData('accounts/v1/e-buddy/subordinate-list')
            response = res.data.data
        }
        this.setState({
            options : 
                response.map( elem => {
                    return (
                        <Select.Option value={elem.emp_id}>
                            {elem.name}
                        </Select.Option>
                    )
                })
        })
    }

    dateRange = (dateString) => {
        this.setState({
            date_from : dateString[0],
            date_to : dateString[1]
        })
    }

    search = () => {

        let link = `cbs/v1/subordinate-list?`

        if (this.state.date_from && this.state.date_to) {
            link += `&date_from=${this.state.date_from}&date_to=${this.state.date_to}`
        }

        if (this.state.status) {
            link += `&status=${this.state.status}`
        }

        this.props.filteredLink(link)
        this.modal()
    }

    render () {
        return (
            <Fragment>
                <Tooltip title='Filtered search'>
                    <Button onClick={this.modal} type="primary" shape="circle" icon="filter" />
                </Tooltip>
                <Modal
                    title="Filtered search"
                    centered
                    visible={this.state.modal}
                    footer={false}
                    onCancel={this.modal}
                >
                    <Form.Item label='Select date range'>
                        <DatePicker.RangePicker
                            // disabledTime={disabledRangeTime}
                            style={{width : '100%'}}
                            placeholder={['Date from', 'Date to']}
                            format="YYYY-MM-DD"
                            onChange={(value, dateString) => this.dateRange(dateString)}
                        />
                    </Form.Item>
                    <Form.Item label='Status'>
                        <Select 
                            showSearch
                            style={{width : '100%'}} 
                            placeholder='Select status' 
                            onSearch={value => {
                                this.setState({
                                    name : value
                                }, () => { this.options()})
                            }}
                        >
                            {this.state.options}
                        </Select>
                    </Form.Item>
                    <Button onClick={this.search} type='primary' size='large' block>
                        Search
                    </Button>
                </Modal>
            </Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        filteredLink : e => dispatch(filteredLink(e))
    }
}


export default connect(null, mapDispatchToProps)(FilteredApprobation)