import React, {Component, Fragment} from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Permissions from './Permissions'
import Users from './Users'
import SendNotification from './SendNotification'
import { error404 } from '../../scripts/error'

const Wrapper = styled.div`
    height : 100%;
    width : 100%;
`
const components = {
    'permission' : Permissions,
    'users' : Users,
    'send-notification' : SendNotification,
    'not-found' : error404
}

class Panel extends Component {
    // Main method
    render () {
        const Tag = this.props.match.params.name in components ? 
                    components[this.props.match.params.name] : 
                    (!this.props.match.params.name || this.props.match.params.name === '/' ?
                    components['permission'] : components['not-found'])
        return (
            <Wrapper>
                <Tag />
            </Wrapper>
        )
    }
}

export default connect()(Panel)