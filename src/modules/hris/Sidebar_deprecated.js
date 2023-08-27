import React, {Component, Fragment} from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Button, Typography, Collapse } from 'antd'
import { Link, withRouter } from 'react-router-dom' 
import cbs_img from '../../assets/cbs.svg'
import { getData } from '../../scripts/getData'

const Wrapper = styled.div`
    height : 100vh;
    width : 100%;
    overflow : auto;
    padding-top : 5rem;
    border-right : 0.5px solid lightgray;
    z-index : 10;
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
        background-color: #0084e6 !important;
        font-weight : 700;
        color : white;
        user-select : none;
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

    // componentDidUpdate(prevProps) {
    //     if (this.props.location.pathname !== prevProps.location.pathname) {
    //         // alert('Route change!');
    //     }
    // }

    render () {
        return (
            <Wrapper>
                <Typography.Title className='title left-pad-2' level={4}>
                    HR System
                </Typography.Title>
                <div className='buttons-container'>
                    <Link to='/hris/attendance' className='LINK'>
                        <button onClick={this.clicked} className={`button ${window.location.href.split('/').slice(-1)[0] === 'attendance' || window.location.href.split('/').slice(-1)[0] === 'hris' ? 'active' : ''}`}>
                            Attendance
                        </button>
                    </Link>
                    <Link to='/hris/leave-apply' className='LINK'>
                        <Collapse 
                            activeKey={`${window.location.href.split('/').slice(-1)[0].split('-')[0] === 'leave' ? 1 : 0}`} 
                            expandIconPosition='right' 
                            onClick={this.clicked} 
                            className={`${window.location.href.split('/').slice(-1)[0].split('-')[0] === 'leave' ? 'active' : ''}`}
                        >
                            <Collapse.Panel accordion={true} key={1} 
                                header={
                                    <div onClick={this.clicked} className={`button ${window.location.href.split('/').slice(-1)[0].split('-')[0] === 'leave' ? 'active' : ''}`}>
                                        Leave status
                                    </div>
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
                        </Collapse>
                    </Link>
                    <Link to='/hris/daily-meal' className='LINK'>
                        <button onClick={this.clicked} className={`button ${window.location.href.split('/').slice(-1)[0] === 'daily-meal' ? 'active' : ''}`}>
                            Daily meal
                        </button>
                    </Link>
                    <Link to='/hris/certificate-apply' className='LINK'>
                        <Collapse activeKey={`${window.location.href.split('/').slice(-1)[0].split('-')[0] === 'certificate' ? 1 : 0}`} expandIconPosition='right' onClick={this.clicked} className={`${window.location.href.split('/').slice(-1)[0].split('-')[0] === 'certificate' ? 'active' : ''}`}>
                            <Collapse.Panel accordion={true} key={1} 
                                header={
                                    <div onClick={this.clicked} className={`button ${window.location.href.split('/').slice(-1)[0].split('-')[0] === 'certificate' ? 'active' : ''}`}>
                                        Certificates
                                    </div>
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
                        </Collapse>
                    </Link>
                    <Link to='/hris/issue-apply' className='LINK'>
                        <Collapse activeKey={`${window.location.href.split('/').slice(-1)[0].split('-')[0] === 'issue' ? 1 : 0}`} expandIconPosition='right' onClick={this.clicked} className={`${window.location.href.split('/').slice(-1)[0].split('-')[0] === 'issue' ? 'active' : ''}`}>
                            <Collapse.Panel accordion={true} key={1} 
                                header={
                                    <div onClick={this.clicked} className={`button ${window.location.href.split('/').slice(-1)[0].split('-')[0] === 'issue' ? 'active' : ''}`}>
                                        Issue
                                    </div>
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

// export default connect()(Sidebar)
export default connect()(withRouter(props => <Sidebar {...props}/>));
