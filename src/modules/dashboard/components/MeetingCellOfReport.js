import React from 'react'

const MeetingCellOfReport = ({
    meetings
}) => {
  return (
    <>
        {meetings.map((meeting, index)=> {
            return (<p key={index.toString()}>{meeting.title}</p>)
        })}
    </>
  )
}

export default MeetingCellOfReport;