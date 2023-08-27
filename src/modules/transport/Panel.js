import React, {Component, Fragment} from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import AddNew from './AddNew'
import AllTransport from './AllTransport'
import { error404 } from '../../scripts/error'

const Wrapper = styled.div`
    height : 100%;
    width : 100%;
`
const components = {
    'book-transport' : AddNew,
    'all-transport' : AllTransport,
    'not-found' : error404
}

class Panel extends Component {
    // Main method
    render () {
        const Tag = this.props.match.params.name in components ? 
                    components[this.props.match.params.name] : 
                    (!this.props.match.params.name || this.props.match.params.name === '/' ?
                    components['all-transport'] : components['not-found'])

        return (
            <Wrapper>
                <Tag />
            </Wrapper>
        )
    }
}

export default connect()(Panel)