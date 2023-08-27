import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {getData} from '../../scripts/getData'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import * as moment from 'moment'
import { Col, Typography, Input, Button, Row, notification, Skeleton, Checkbox } from 'antd'
import { postData } from '../../scripts/postData';
import { alertPop } from '../../scripts/message'

const Wrapper = styled.div`
    /* padding-top : 4rem; */
    width : 100%;
    .search-bar {
        padding : 2% 2% 0% 2%;
    }
    .role-names {
        padding : 3% 1% 3% 3%;
        cursor: pointer;
        border-bottom : 1px dashed lightgray;
        :hover {
            background-color: #c5def7;
        }
    }
`
const Name = styled.div`
    height : 70vh;
    overflow : auto;
`

const PlaceHolder = (
    <div>
        <Typography.Text strong>
            Select a role
        </Typography.Text>
        <div className='space' />
        <div>
            <Skeleton />
        </div>
    </div>
)
class Permissions extends Component {
    constructor (props) {
        super (props)
        this.state = {
            rolesList : [],
            rolesData : [],
            active : true,
            searchString : '',
            loading : true,
            details : [PlaceHolder],
            permissions : [],
            name : '',
            allPerm : [],
            granted : [],
            checkBox : [],
            checked : {},
            checkName : '',
            allPermRes : [],
            btnLoading : false,
            createNewInput : ''
        }
    }
    componentWillMount () {
        this.setState({loading : true})
        this.callData()
    }

    callData = async () => {
        let res = await getData('accounts/v1/get-roles')
        let resp = await getData('accounts/v1/get-permissions')
        this.allPerm()
        let createNew = {
            name : 'Create new',
            permissions : [],
            type : 'create_new'
            //todo
        }
        this.setState({
            rolesData : [createNew, ...res.data.data],
            allPermRes : resp.data.data
        }, ()=>{ this.view() })
    }

    allPerm = () => {
        this.state.allPermRes.forEach(elem => {
            this.setState({
                [elem.name] : false
            })
        })
    }

    view = () => {
        let names = []
        this.state.rolesData.forEach(elem => {
            names.push(
                <div 
                    style={{
                        backgroundColor : elem.name === 'Create new' ? '#0284e6' : '#F4F8FC',
                    }}
                    onClick={() => this.details(elem)}
                    className = 'role-names'
                >
                    <Typography.Text
                        key={elem.id} 
                        style={{
                            color : elem.name === 'Create new' ? 'white' : '#004471'
                        }}
                        strong
                    >
                        {elem.name}
                    </Typography.Text>
                    <div>
                        {elem.permissions.map( elem =>{
                            return (
                                <Typography.Text key={elem.id}>
                                    {elem.name},
                                </Typography.Text>
                            )
                        })}  
                    </div>
                </div>
            )
        })
        let view = (
            <div className='search-bar'>
                <Typography.Title level={4}>
                    Role list
                </Typography.Title>
                <Row>
                    <Col md={12}>
                        <Name>
                            {names}
                        </Name>
                    </Col>
                    <Col md={{span : 11, offset : 1}}>
                        {this.state.details}
                    </Col>
                </Row>
            </div>
        )
        this.setState({
            rolesList : view,
            loading : false
        })
    }

    submitChecked = async () => {
        this.setState({btnLoading : true})
        let perms = []
        this.state.allPermRes.forEach(elem => {
            if (this.state[elem.name]) {
                perms.push(elem.name)
            }
        })
        let data = {
            name : this.state.checkName === 'Create new' ? this.state.createNewInput : this.state.checkName,
            permissions : perms
        }
        let link = this.state.checkName === 'Create new' ? 'accounts/v1/create-role' : 'accounts/v1/update-role' 
        let res = await postData(link, data)
        if (res.status === 200 || res.status === 201 ) {
            alertPop('success', 'Role created')
            this.callData()
            this.setState({btnLoading : false})
        } else {
            res.map(elem => {
                return alertPop('error', elem)
            })
            this.setState({btnLoading : false})
        }
    }

    checked = async name => {
        await this.setState({
            [name] : !this.state[name]
        })
        this.viewCheck()
    }

    details = async data => {
        this.allPerm()
        await data.permissions.forEach( elem => {
            this.setState({
                [elem.name] : true
            })
        })
        await this.setState({
            checkName : data.name
        })
        this.viewCheck()
    }

    viewCheck = () => {
        let view = (
            <div>
                <Typography.Text strong>
                    {this.state.checkName === 'Create new' ? 'Create new role' : 'Update a role'}
                </Typography.Text>
                <div className='space' />
                <Typography.Text>
                    Role title :
                </Typography.Text>
                <div>
                    <Typography.Text strong>
                        {this.state.checkName === 'Create new' ? 
                        <Input 
                            type = 'text'
                            onChange = { e => { this.setState({ createNewInput : e.target.value.replace(' ', '-')})}}
                        /> : 
                        this.state.checkName}
                    </Typography.Text>
                </div>
                <div 
                    style={{ 
                        padding : '1%', 
                        display : 'flex', 
                        flexDirection : 'column', 
                        justifyContent : 'flex-start',
                        'overflow-y': 'scroll',
                        height: '60vh'
                    }} 
                >
                    {
                        this.state.allPermRes.map( elem => {
                            return (
                                    <Checkbox
                                        type = 'checkbox'
                                        style = {{margin : '0'}}
                                        checked = {this.state[elem.name]}
                                        name = {elem.name}
                                        value = {elem.name}
                                        onChange = {()=>this.checked(elem.name)}
                                    > 
                                        {elem.name}
                                    </Checkbox>
                            )
                        })
                    }
                </div>
                <Button type='primary' size='large' loading={this.state.btnLoading} onClick={this.submitChecked} block>
                    {this.state.checkName === 'Create new' ? 'Create new' : 'Update'}
                </Button>
            </div>
        )

        this.setState({
            details : view
        }, ()=> { this.view() })
    }
    // Main method
    render () {
        return (
            <Wrapper>
                {this.state.loading ? <Skeleton className='search-bar' title={false} active /> : this.state.rolesList}
            </Wrapper>
        )
    }
}

export default connect()(Permissions)