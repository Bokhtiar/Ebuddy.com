import React from 'react'

const ItemOfMeetingOptions = ({
    title,
    titleTag,
}) => {
    return (
        <>
            <small style={{ fontWeight: "normal", color: "#888" }}>
                {titleTag}
            </small>
            <p style={{ color: "black" }}>{title}</p>
        </>
    )
}

export default ItemOfMeetingOptions;