import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {getData} from '../../scripts/getData'
import styled from 'styled-components'
import * as moment from 'moment'
import { Typography, Col, Row, Skeleton, Divider, Timeline, Empty } from 'antd'
import { checkRes } from '../../scripts/checkRes'
import { alertPop } from '../../scripts/message'
import { errorHandle } from '../../scripts/error'

const Wrapper = styled.div`
    cursor : pointer;
    padding-top : 4rem;
    height : 100vh;
    width : 100%;
    overflow : auto;
`


class AllTransport extends Component {
    constructor (props) {
        super (props)
        this.state = {
            allData : [],
            empty : <Skeleton active className='pad' />
        }
    }
    componentWillMount () {
        this.view('transport/v1/transport-list')
    }

    view = async (que) => {
        let res = await getData(que)
        if (res) {
            if (checkRes(res.status)) {
                if (res.data.data.length > 0) {
                    this.setState({
                        allData : res.data.data
                    })
                } else {
                    this.setState({
                        allData : [],
                        empty : <Empty className="big-space"/>
                    })
                }
            } else {
                res.map (elem => {
                    alertPop('error', elem)
                })
            }
        } else {
            errorHandle(res)
            this.setState({
                empty : <Empty className="big-space" />
            })
        }
    }
    // Main method
    render () {
        return (
            <Wrapper>
                {
                    this.state.allData &&
                    this.state.allData.length > 0 ?
                    this.state.allData.map ( elem => {
                        return (
                            <Fragment>
                                <div className='pad'>
                                    <Row>
                                        <Col lg={12}>
                                            <Typography.Text strong>
                                                {elem.purpose || 'Meeting'}
                                            </Typography.Text>
                                        </Col>
                                        <Col className='right-text' lg={12}>
                                            <Typography.Text className='FIX_th'>
                                                {moment(elem.date).format("DD MMM YYYY")}
                                            </Typography.Text>
                                        </Col>
                                    </Row>
                                    <div className='space' />
                                    <Timeline>
                                        <Timeline.Item>
                                            <Typography.Text className='sub-title'>
                                                From : {elem.location.location_from_name}
                                            </Typography.Text>
                                        </Timeline.Item>
                                        <Timeline.Item>
                                            <Typography.Text className='sub-title'>
                                                To : {elem.location.location_to_name}
                                            </Typography.Text>
                                        </Timeline.Item>
                                    </Timeline>
                                </div>
                                <Divider />
                            </Fragment>
                        )
                    }) : this.state.empty
                }
            </Wrapper>
        )
    }
}

export default connect()(AllTransport)