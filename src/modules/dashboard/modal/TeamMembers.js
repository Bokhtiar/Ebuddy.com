import React from 'react'
import MeetingOptionHeader from './MeetingOptionHeader';
import MeetingOption from './MeetingOption';

const TeamMembers = ({
    teamMembers,
}) => {
    return (
        <>
            <MeetingOptionHeader headerTitle={'Team Members'} />
            {teamMembers.map((item) => (
                <MeetingOption
                    avatarImageSrc={item.members.profile_pic}
                    title={item.members?.name}
                    subTitle={item.members.designation}
                />
            ))}
        </>
    )
}

export default TeamMembers;