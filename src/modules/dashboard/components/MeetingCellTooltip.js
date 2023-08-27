import React from 'react'
import { Tooltip } from 'antd';

const MeetingCellTooltip = ({
    meeting
}) => {
    return (
        <>
            <Tooltip
                title={
                    <div>
                        <p>{meeting.title}</p>
                        <p>
                            ({meeting.start_time} - {meeting.end_time})
                        </p>
                    </div>
                }
            >
                <div className="meeting__div__inner">
                    <h5>
                        {meeting.title} {meeting.diffarence}
                    </h5>
                    <p>
                        ({meeting.start_time} - {meeting.end_time})
                    </p>
                </div>
            </Tooltip>
        </>
    )
}

export default MeetingCellTooltip