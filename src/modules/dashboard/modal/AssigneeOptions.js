import React from 'react'
import MeetingOptionHeader from './MeetingOptionHeader'
import MeetingOption from './MeetingOption'

const AssigneeOptions = ({
    dataSource
}) => {
    
    return (
        <>
            <MeetingOptionHeader headerTitle={'Actors'} />
            <MeetingOption 
                avatarImageSrc={dataSource?.profile_pic}
                title={dataSource.name}
                subTitle={dataSource.designation}
            />
        </>
    )
}

export default AssigneeOptions