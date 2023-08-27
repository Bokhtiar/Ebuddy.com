import React from 'react'
import MeetingOptionItem from './MeetingOption';
import MeetingOption from './MeetingOption';
import MeetingOptionHeader from './MeetingOptionHeader';

const NotesTracker = ({
    dataSource
}) => {
    return (
        <>
            <MeetingOptionHeader headerTitle={'Notes Tracker'}/>
            <MeetingOption
                avatarImageSrc={dataSource?.profile_pic}
                title={dataSource.name}
                subTitle={dataSource.designation}
            />
        </>

    )
}

export default NotesTracker;