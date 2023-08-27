import React, {Component, Fragment} from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Button, Typography } from 'antd'
import { Link } from 'react-router-dom' 
import meeting_img from '../../assets/meeting.svg'

const Wrapper = styled.div`
    height : 100vh;
    width : 100%;
    overflow : auto;
    padding-top : 5rem;
    border-right : 0.5px solid lightgray;
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
`

class Sidebar extends Component {

    clicked = e => {
        let items = document.getElementsByClassName('button')
        for (let i = 0; i<items.length; i++) {
            items[i].classList.remove('active')
        }
        if( e.target.classList.contains('button')) {
            e.target.classList.add('active')
        }
    }

    render () {
        return (
            <Wrapper>
                <Typography.Title className='title left-pad-2' level={4}>
                    Role settings
                </Typography.Title>
                <div className='buttons-container'>
                    <Link to='/roles' className='LINK'>
                    <button onClick={this.clicked} className={`button ${window.location.href.split('/')[3] === 'roles' && !window.location.href.split('/')[4]  ? 'active' : ''}`}>
                            Role permission
                        </button>
                    </Link>
                    <div className='space' />
                    <Link to='/roles/users' className='LINK'>
                    <button onClick={this.clicked} className={`button ${window.location.href.split('/').slice(-1)[0] === 'users'  ? 'active' : ''}`}>
                            Role users
                        </button>
                    </Link>
                    <div className='space' />
                    {/* <Link to='/roles/send-notification' className='LINK'>
                        <button onClick={this.clicked} className='button'>
                            Send notification
                        </button>
                    </Link> */}
                </div>
                <div>
                    <img style={{width : '100%'}} src={meeting_img} alt='meeting' />
                </div>
            </Wrapper>
        )
    }
}

export default connect()(Sidebar)