import React from 'react'

const CalendarCellContent = ({
    titleTxt,
    startTime,
    endTime,
}) => {
    return (
        <>
            <div>
                {titleTxt}
            </div>
            <div>
                {startTime} - {endTime}
            </div>
        </>
    )
}

export default CalendarCellContent;