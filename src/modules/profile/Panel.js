import React, {Component, Fragment} from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { error404 } from '../../scripts/error'
import PersonalDetails from './PersonalDetails'
import ContactDetails from './ContactDetails'

const Wrapper = styled.div`
    height : 100%;
    width : 100%;
`
const components = {
    'personal-details' : PersonalDetails,
    'contact-details' : ContactDetails,
    // '' : AllTransport,
    'not-found' : error404
}

class Panel extends Component {
    // Main method
    render () {
        const Tag = this.props.match.params.name in components ? 
                    components[this.props.match.params.name] : 
                    (!this.props.match.params.name || this.props.match.params.name === '/' ?
                    components['personal-details'] : components['not-found'])

        return (
            <Wrapper>
                <Tag params={this.props.match.params}/>
            </Wrapper>
        )
    }
}

export default connect()(Panel)