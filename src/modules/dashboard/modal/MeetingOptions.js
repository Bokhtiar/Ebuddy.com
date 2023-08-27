import React from 'react'
import ItemOfMeetingOptions from './ItemOfMeetingOptions'

const MeetingOptions = ({
    dataSource
}) => {
    return (
        <>
            <Row>
                <Col span={12}>
                    <ItemOfMeetingOptions
                        title={dataSource.type}
                        titleTag={'Meeting Time'}
                    />
                </Col>
                <Col span={12}>
                    <ItemOfMeetingOptions
                        title={dataSource.nature}
                        titleTag={'Meeting Nature'}
                    />

                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <ItemOfMeetingOptions
                        title={dataSource.projects.name}
                        titleTag={'Project Name'}
                    />
                </Col>
                <Col span={12}>
                    <ItemOfMeetingOptions
                        title={dataSource.project_milestone?.milestone?.full_name}
                        titleTag={'Milestone Name'}
                    />

                </Col>
            </Row>
        </>
    )
}

export default MeetingOptions