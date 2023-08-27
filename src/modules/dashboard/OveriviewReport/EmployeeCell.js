import React from 'react'
import { Divider, Tooltip } from "antd";
const dumyUserPicUrl = "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png";
const EmployeeCell = ({
    userName = '',
    imgUrl = dumyUserPicUrl,
}) => {
    return (
        <>
            <div className="employee">
                <div className="employee__avatar">
                    <img
                        src={imgUrl}
                        alt="avatar"
                    />
                </div>
                <Tooltip title={userName}>
                    <div className="employee__name">
                        <p>{userName}</p>
                    </div>
                </Tooltip>
            </div>
        </>
    )
}

export default EmployeeCell