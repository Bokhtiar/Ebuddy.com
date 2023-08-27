import React from 'react';
import { Modal } from 'antd';
import TaskDetails from './commonModal';

export const ActivityModal = ({ open, setOpen, activityTask }) => {
    return (
        <Modal
            title=""
            visible={open}
            width="60vw"
            onCancel={() => setOpen(prev => !prev)}
            footer={false}
            maskClosable={false}
        >
            <TaskDetails activityTask={activityTask} />
        </Modal>
    )
}
