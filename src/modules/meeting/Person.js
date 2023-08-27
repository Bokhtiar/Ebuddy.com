import React, {Component, Fragment} from 'react'
import { Form, Input } from 'antd'
import { validatePhone } from '../../scripts/validate'

class Person_ extends Component {

    constructor (props) {
        super (props)
        this.state = {
            //init states
        }
    }

    sendData = () => {
        if (this.state.person_contact && validatePhone(this.state.person_contact)) {
            this.props.personInfo({
                person_name : this.state.person_name,
                person_institute : this.state.person_institute,
                person_contact : this.state.person_contact
            })
        }
    }
    
    render () {
        return (
            <Form>
                <Form.Item required label='Person name'>
                    <Input 
                        placeholder='Person name' 
                        onChange={ e => {
                            this.setState({
                                person_name : e.target.value
                            }, () => {
                                this.sendData()
                            })
                        }} 
                        className='stretch'
                    />
                </Form.Item>
                <Form.Item required label='Institute/Employer'>
                    <Input 
                        placeholder='Institute/Employer' 
                        onChange={ e => {
                            this.setState({
                                person_institute : e.target.value
                            }, () => {
                                this.sendData()
                            })
                        }} 
                        className='stretch'
                    />
                </Form.Item>
                <Form.Item 
                    required label='Contact number'
                    validateStatus={this.state.person_contact ? validatePhone(this.state.person_contact) ? '' : 'error' : ''}
                    help={this.state.person_contact ? validatePhone(this.state.person_contact) ? '' : 'Enter a valid phone number' : ''}
                >
                    <Input 
                        placeholder='Contact number' 
                        value = {this.state.person_contact || []}
                        onChange={ e => {
                            this.setState({
                                person_contact : e.target.value
                            }, () => {
                                this.sendData()
                            })
                        }} 
                        className='stretch'
                    />
                </Form.Item>
            </Form>
        )
    }
}

const Person = Form.create({ name: "person" })(
    Person_
)

export default Person