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
                    {/* <Link to='/hris/attendance' className='LINK'>
                        <button onClick={this.clicked} className={`button ${window.location.href.split('/').slice(-1)[0] === 'attendance' || window.location.href.split('/').slice(-1)[0] === 'hris' ? 'active' : ''}`}>
                            Attendance
                        </button>
                    </Link> */}
                    <Link to='/hris-settings/attendance-daily' className='LINK'>
                        <Collapse 
                            activeKey={`${window.location.href.split('/').slice(-1)[0].split('-')[0] === 'attendance' ? 1 : 0}`} 
                            expandIconPosition='right' 
                            onClick={this.clicked} 
                            className={`${window.location.href.split('/').slice(-1)[0].split('-')[0] === 'attendance' ? 'active' : ''}`}
                        >
                            <Collapse.Panel accordion={true} key={1} 
                                header={
                                    <div onClick={this.clicked} className={`button ${window.location.href.split('/').slice(-1)[0].split('-')[0] === 'attendance' ? 'active' : ''}`}>
                                        Leave status
                                    </div>
                                }
                                style={{padding : '0'}}
                            >
                                <Link className='LINK' to='/hris-settings/attendance-daily'>
                                    <button onClick={this.clicked} className={`${window.location.href.split('/').slice(-1)[0] === 'attendance-daily' ? 'sub-active' : ''} button`}>
                                        Daily report
                                    </button>
                                </Link>
                                <Link className='LINK' to='/hris-settings/attendance-of-user'>
                                    <button onClick={this.clicked} className={`${window.location.href.split('/').slice(-1)[0] === 'attendance-of-user' ? 'sub-active' : ''} button`}>
                                        User report
                                    </button>
                                </Link>
                                <Link className='LINK' to='/hris-settings/attendance-summary'>
                                    <button onClick={this.clicked} className={`${window.location.href.split('/').slice(-1)[0] === 'attendance-summary' ? 'sub-active' : ''} button`}>
                                        Summary report
                                    </button>
                                </Link>
                            </Collapse.Panel>
                        </Collapse>
                    </Link>
                    <Link to='/hris-settings/shift-list' className='LINK'>
                        <Collapse 
                            activeKey={`${window.location.href.split('/').slice(-1)[0].split('-')[0] === 'shift' ? 1 : 0}`} 
                            expandIconPosition='right' 
                            onClick={this.clicked} 
                            className={`${window.location.href.split('/').slice(-1)[0].split('-')[0] === 'shift' ? 'active' : ''}`}
                        >
                            <Collapse.Panel accordion={true} key={1} 
                                header={
                                    <div onClick={this.clicked} className={`button ${window.location.href.split('/').slice(-1)[0].split('-')[0] === 'shift' ? 'active' : ''}`}>
                                        Shift details
                                    </div>
                                }
                                style={{padding : '0'}}
                            >
                                <Link className='LINK' to='/hris-settings/shift-list'>
                                    <button onClick={this.clicked} className={`${window.location.href.split('/').slice(-1)[0] === 'shift-list' ? 'sub-active' : ''} button`}>
                                        Shift list
                                    </button>
                                </Link>
                                <Link className='LINK' to='/hris-settings/shift-mapping'>
                                    <button onClick={this.clicked} className={`${window.location.href.split('/').slice(-1)[0] === 'shift-mapping' ? 'sub-active' : ''} button`}>
                                        Shift mapping
                                    </button>
                                </Link>
                                <Link className='LINK' to='/hris-settings/shift-rotation'>
                                    <button onClick={this.clicked} className={`${window.location.href.split('/').slice(-1)[0] === 'shift-rotation' ? 'sub-active' : ''} button`}>
                                        Shift rotation
                                    </button>
                                </Link>
                            </Collapse.Panel>
                        </Collapse>
                    </Link>
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
