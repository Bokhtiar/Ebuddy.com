import React, {Component, Fragment} from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Button, Typography, Collapse, Divider } from 'antd'
import { Link } from 'react-router-dom' 
import cbs_img from '../../assets/cbs.svg'
import { getData } from '../../scripts/getData'

const Wrapper = styled.div`
    height : 100vh;
    width : 100%;
    overflow : auto;
    padding-top : 5rem;
    border-right : 0.5px solid lightgray;
    z-index : 10;
    .title {
        text-align : left;
        padding-left : 2rem;
    }
    .buttons-container {
        padding : 5%;
    }
    .button {
        width : 100%;
        border-radius : 4px;
        padding : 6%;
        text-align : left;
        cursor: pointer;
        user-select : none;
        outline : none;
        background-color: transparent;
        border : 0;
        color : #6c757e;
        /* :focus {
            background-color: #E2F3FF;
        } */
    }
    .active {
        background-color: #E2F3FF !important;
        font-weight : 700;
        user-select : none;
        transition : all ease-in-out 0.5s;
    }
    .ant-collapse {
        background-color: transparent;
        border: 0;
    }
    .ant-collapse-content {
        border : 0;
        background-color: #fafafa;
    }
    .ant-collapse-item {
        padding : 0;
        border : 0;
    }
    .ant-collapse-header {
        padding : 0 !important;
        background-color: transparent;
        border : 0;
    }
`

class Sidebar extends Component {

    constructor ( props ) {
        super( props )
        this.state = {
            has_perm : {},
            current : ''
        }
    }

    clicked = e => {
        this.setState({
            current : e
        })
    }

    async componentWillMount () {
        // let res = await getData('cbs/v1/check-team-cbs-access')
        // this.setState({
        //     has_perm : res.data.data
        // })
    }

    render () {
        return (
            <Wrapper>
                <Typography.Title className='title' level={4}>
                    HR System
                </Typography.Title>
                <div className='buttons-container'>
                    <Collapse 
                        // activeKey={this.state.activeKey} 
                        accordion
                        expandIconPosition='right' 
                        onClick={this.clicked} 
                        // className={`${window.location.href.split('/').slice(-1)[0].split('-')[0] === 'leave' ? 'active' : ''}`}
                    >
                        <Collapse.Panel
                            key = '0'
                            disabled
                            showArrow = {false}
                            header = {
                                <Link to='/hris/attendance' className='LINK'>
                                    <button onClick={this.clicked} className={`button ${window.location.href.split('/').slice(-1)[0] === 'attendance' || window.location.href.split('/').slice(-1)[0] === 'hris' ? 'active' : ''}`}>
                                        Attendance
                                    </button>
                                </Link>
                            }
                        />
                        <Collapse.Panel key='1'
                            // onClick = { () => {
                            //     if (this.state.activeKey === '1') {
                            //         this.setState({
                            //             activeKey : '0'
                            //         })
                            //     } else {
                            //         this.setState({
                            //             activeKey : '1'
                            //         })
                            //     }
                            // }} 
                            header={
                                // <Link to='/hris/leave-apply' className='LINK'>
                                    <div onClick={this.clicked} className={`button ${window.location.href.split('/').slice(-1)[0].split('-')[0] === 'leave' ? 'active' : ''}`}>
                                        Leave status
                                    </div>
                                // </Link>
                            }
                            style={{padding : '0'}}
                        >
                            <Link className='LINK' to='/hris/leave-apply'>
                                <button onClick={this.clicked} className={`${window.location.href.split('/').slice(-1)[0] === 'leave-apply' ? 'sub-active' : ''} button`}>
                                    Apply leave
                                </button>
                            </Link>
                            <Link className='LINK' to='/hris/leave-application'>
                                <button onClick={this.clicked} className={`${window.location.href.split('/').slice(-1)[0] === 'leave-application' ? 'sub-active' : ''} button`}>
                                    My application
                                </button>
                            </Link>
                            {/* <Link className='LINK' to='/hris/leave-application-team'>
                                <button onClick={this.clicked} className={`${window.location.href.split('/').slice(-1)[0] === 'leave-application-team' ? 'sub-active' : ''} button`}>
                                    Team application
                                </button>
                            </Link> */}
                        </Collapse.Panel>
                        <Collapse.Panel key='2'
                            // onClick = { () => {
                            //     this.setState({
                            //         activeKey : 2
                            //     })
                            // }}  
                            header={
                                // <Link to='/hris/certificate-apply' className='LINK'>
                                    <div onClick={this.clicked} className={`button ${window.location.href.split('/').slice(-1)[0].split('-')[0] === 'certificate' ? 'active' : ''}`}>
                                        Certificates
                                    </div>
                                // </Link>
                            }
                            style={{padding : '0'}}
                        >
                            <Link className='LINK' to='/hris/certificate-apply'>
                                <button onClick={this.clicked} className={`${window.location.href.split('/').slice(-1)[0] === 'certificate-apply' ? 'sub-active' : ''} button`}>
                                    New application
                                </button>
                            </Link>
                            <Link className='LINK' to='/hris/certificate-list'>
                                <button onClick={this.clicked} className={`${window.location.href.split('/').slice(-1)[0] === 'certificate-list' ? 'sub-active' : ''} button`}>
                                    Applied list
                                </button>
                            </Link>
                        </Collapse.Panel>
                        <Collapse.Panel key='3'
                            // onClick = { () => {
                            //     this.setState({
                            //         activeKey : 3
                            //     })
                            // }}  
                            header={
                                // <Link to='/hris/issue-apply' className='LINK'>
                                    <div onClick={this.clicked} className={`button ${window.location.href.split('/').slice(-1)[0].split('-')[0] === 'issue' ? 'active' : ''}`}>
                                        Issue
                                    </div>
                                // </Link>
                            }
                            style={{padding : '0'}}
                        >
                            <Link className='LINK' to='/hris/issue-apply'>
                                <button onClick={this.clicked} className={`${window.location.href.split('/').slice(-1)[0] === 'issue-apply' ? 'sub-active' : ''} button`}>
                                    New issue
                                </button>
                            </Link>
                            <Link className='LINK' to='/hris/issue-list'>
                                <button onClick={this.clicked} className={`${window.location.href.split('/').slice(-1)[0] === 'issue-list' ? 'sub-active' : ''} button`}>
                                    Applied issues
                                </button>
                            </Link>
                        </Collapse.Panel>
                    </Collapse>
                    <Link to='/hris/daily-meal' className='LINK'>
                        <button onClick={this.clicked} className={`button ${window.location.href.split('/').slice(-1)[0] === 'daily-meal' ? 'active' : ''}`}>
                            Daily meal
                        </button>
                    </Link>
                    <Link to='/hris/address-book' className='LINK'>
                        <button onClick={this.clicked} className={`button ${window.location.href.split('/').slice(-1)[0] === 'address-book' ? 'active' : ''}`}>
                            Address book
                        </button>
                    </Link>
                    <Link to='/hris/benefits' className='LINK'>
                        <button onClick={this.clicked} className={`button ${window.location.href.split('/').slice(-1)[0] === 'benefits' ? 'active' : ''}`}>
                            Employee benefits
                        </button>
                    </Link>
                    {/* <Link to='/hris/leave-apply' className='LINK'>
                        <Collapse expandIconPosition='right' style={{border : 'none'}}>
                            <Collapse.Panel
                                // className={`button ${(window.location.href.split('/')[4] && window.location.href.split('/')[4] === 'leave-apply') ? 'active' : ''}`}
                                header={
                                    <div className={window.location.href.split('/')[4] === 'leave-apply' ? 'button active' : 'button'}>
                                        Leave status
                                    </div>
                                }
                            >
                                <Button className='button side-accordion-btn flex_r'>
                                    Apply leave
                                </Button>
                                <Button className='button side-accordion-btn flex_r'>
                                    Apply leave
                                </Button>
                                <Button className='button side-accordion-btn flex_r'>
                                    Apply leave
                                </Button>
                            </Collapse.Panel>
                        </Collapse>
                    </Link> */}
                </div>
                <div>
                    <img style={{width : '100%', padding : '1rem'}} src={cbs_img} alt='meeting' />
                </div>
            </Wrapper>
        )
    }
}

export default connect()(Sidebar)