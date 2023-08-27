import React from 'react'
import { Radio } from 'antd'

const { Group, Button } = Radio;

const MeetingTabs = () => {
    return (
        <Group>
            <Button value="meeting_details">
                Meeting Details
            </Button>
            <Button value="meeting_minutes">
                Meeting Minutes
            </Button>
            <Button value="action_points">
                Action Points
            </Button>
        </Group>
    )
}

export default MeetingTabs;