import React from 'react'

import { Table, Button } from 'antd';
import TaskStatus from '../../../@infrastructure/TaskStatus';
import { TaskStatusColor } from '../../../@infrastructure/StatusColor';

const TaskListOfDayFilters = ({
    date,
    onChangeFilter,
    page
}) => {
    const { filterWrappperStyle } = styles;
    return (
        <div style={filterWrappperStyle}>
            <Button
                onClick={() => onChangeFilter(date, TaskStatus.TODO, page)}
                style={{ border: 0, background: TaskStatusColor.TODO, color: '#fff' }}>{TaskStatus.TODO}</Button>
            <Button
                onClick={() => onChangeFilter(date, TaskStatus.CANCELED, page)}
                style={{ border: 0, background: TaskStatusColor.BEHIND, color: '#fff' }}>{TaskStatus.CANCELED}</Button>
            <Button
                onClick={() => onChangeFilter(date, TaskStatus.DONE, page)}
                style={{ border: 0, background: TaskStatusColor.DONE, color: '#fff' }}>{TaskStatus.DONE}</Button>
            <Button
                onClick={() => onChangeFilter(date, TaskStatus.WIP, page)}
                style={{ border: 0, background: TaskStatusColor.WIP, color: '#fff' }}>{TaskStatus.WIP}</Button>
            {/* <Button
                onClick={() => onChangeFilter(date, TaskStatus.TODO, page)}
                style={{ background: TaskStatusColor.DEFAULT }}>{TaskStatus.HOLD}</Button> */}
            <Button
                onClick={() => onChangeFilter(date, TaskStatus.PENDING, page)}
                style={{ border: 0, background: TaskStatusColor.DUE, color: '#fff' }}>{TaskStatus.PENDING}</Button>
            {/* <Button
                onClick={() => onChangeFilter(date, TaskStatus.REVIEWED, page)}
                style={{ border: 0, background: TaskStatusColor.TODO, color: '#fff' }}>{TaskStatus.REVIEWED}</Button> */}
        </div>
    )
}

const styles = {
    filterWrappperStyle: {
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 7rem)',
        columnGap: '0.5rem',
        paddingBottom: '1rem'
    }
}

export default TaskListOfDayFilters