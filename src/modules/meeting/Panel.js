import React, {Component, Fragment} from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import MyMeeting from './MyMeeting'
import AddNew from './AddNew'
import Details from './Details'
import { error404 } from '../../scripts/error'

const Wrapper = styled.div`
    height : 100%;
    width : 100%;
` 
const components = {
    'my-meeting' : MyMeeting,
    'created-only' : MyMeeting,
    'subordinate' : MyMeeting,
    'add-new' : AddNew,
    'details' : Details,
    'not-found' : error404
}
 
class Panel extends Component {
    // Main method
    render () {
        const Tag = this.props.match.params.id ?
        components['details']
        : this.props.match.params.name in components ? 
                    components[this.props.match.params.name] : 
                    (!this.props.match.params.name || this.props.match.params.name === '/' ?
                    components['my-meeting'] : components['not-found'])
        return (
            <Wrapper>
                <Tag params={this.props.match.params}/>
            </Wrapper>
        )
    }
}

export default connect()(Panel)