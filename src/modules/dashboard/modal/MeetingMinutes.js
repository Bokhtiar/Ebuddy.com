import React from 'react'

const MeetingMinutes = ({
    dataSource
}) => {
    return (
        <div>
            <h4 style={{ color: "blue", fontWeight: "normal" }}>
                Meeting Minute Story
            </h4>
            {dataSource?.meeting_minute_story ? (
                <div>
                    <br />
                    <div dangerouslySetInnerHTML={{ __html: dataSource?.meeting_minute_story }} />
                </div>
            ) : null}
        </div>
    )
}

export default MeetingMinutes;