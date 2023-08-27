import React from 'react'

const MeetingOption = ({
    avatarImageSrc,
    title,
    subTitle
}) => {
    return (
        <>
            <div style={{ marginTop: "5px" }}>
                <Avatar
                    src={avatarImageSrc}
                    size="small"
                    shape="circle"
                    style={{ float: "left", margin: "5px 5px 0 0" }}
                />
                <div style={{ color: "black" }}>
                    {title}
                    <small style={{ fontWeight: "normal", color: "#888" }}>
                        <p>
                            {subTitle}
                        </p>
                    </small>
                </div>
            </div>
        </>
    )
}

export default MeetingOption;