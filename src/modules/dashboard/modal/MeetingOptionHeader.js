import React from 'react'

const MeetingOptionHeader = ({
    headerTitle
}) => {
    return (
        <small style={{ fontWeight: "normal", color: "#888" }}>
            {headerTitle}
        </small>
    )
}

export default MeetingOptionHeader