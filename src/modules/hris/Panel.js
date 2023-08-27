import React, {Component, Fragment} from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Result } from 'antd'
import Attendance from './Attendance'
import ApplyLeave from './leave/ApplyLeave'
import MyApplication from './leave/MyApplication'
import TeamApplication from './leave/TeamApplication'
import DailyMeal from './DailyMeal'
import CertificateApply from './certificate/CertificateApply'
import CertificateList from './certificate/CertificateList'
import IssueApply from './issue/IssueApply'
import IssueList from './issue/IssueList'
import AddressBook from './AddressBook'
import Benefits from './Benefits'

const error404 = () => {
    return (
        <Result
            style={{paddingTop : '8rem'}}
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
        />
    )
}

const Wrapper = styled.div`
    height : 100%;
    width : 100%;
`

const components = {
    'attendance' : Attendance,
    'leave-apply' : ApplyLeave,
    'leave-application' : MyApplication,
    'leave-application-team' : TeamApplication,
    'daily-meal' : DailyMeal,
    'certificate-apply' : CertificateApply,
    'certificate-list' : CertificateList,
    'issue-apply' : IssueApply,
    'issue-list' : IssueList,
    'address-book' : AddressBook,
    'benefits' : Benefits,
    'not-found' : error404
}

class Panel extends Component {
    // Main method
    render () {
        const Tag = this.props.match.params.name in components ? 
                    components[this.props.match.params.name] : 
                    (!this.props.match.params.name || this.props.match.params.name === '/' ?
                    components['attendance'] : components['not-found'])
        return (
            <Wrapper>
                <Tag params={this.props.match.params}/>
            </Wrapper>
        )
    }
}

export default connect()(Panel)