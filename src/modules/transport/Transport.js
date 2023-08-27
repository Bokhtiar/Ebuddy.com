import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {Route} from 'react-router-dom'
import styled from 'styled-components'
import Panel from './Panel'
import Sidebar from '../commons/Sidebar'
import {Row, Col} from 'antd'
import { transport } from '../../scripts/routes'

const Wrapper = styled.div`
    height : 100%;
    width : 100%;
`

class Transport extends Component {
    // Main method
    render () {
        return (
            <Wrapper className='flex_r'>
                <Sidebar sidebar={transport} />
                <div style={{width : '100%'}}>
                <Route path='/transport' component={Panel} exact/>
                        <Route path='/transport/:name' component={Panel} exact/>
                </div>
            </Wrapper>
        )
    }
}


export default connect()(Transport)