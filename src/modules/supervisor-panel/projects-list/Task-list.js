import React from 'react';
import { Table, Popover } from 'antd';
import demoUser from "../../../assets/dummy.jpg";

export default function TaskList({tasks}) {
    const columns = [
        {
          title: 'Project Name',
          dataIndex: 'projects.name',
          key: 'projects.name',
        },
        {
          title: 'Milestone Name',
          dataIndex: 'project_milestone.milestone.full_name',
          key: 'age',
        },
        {
          title: 'Task Name',
          dataIndex: 'title',
          key: 'title',
        },
        {
            title: 'Assignee',
            key: 'address',
            render: (r) => <span>
                <Popover title={r?.assignee?.name} trigger="hover">
                    <img src={r?.assignee?.profile_pic || demoUser} height="25" width="25"/>
                </Popover>
            </span>,
        },
        {
            title: 'Start Date',
            render: (r) => <span>{r?.start_date || 'N/A'}</span>,
            key: 'address',
        },
        {
            title: 'End Date',
            render: (r) => <span>{r?.due_date || 'N/A'}</span>,
            key: 'address',
        },
        {
            title: 'Status',
            // dataIndex: 'status',
            key: 'status',
            render: (r) => <span style={{color: 'red'}}>{'Overdue'}</span>,
        },
    ];

    return (
        <Table dataSource={tasks} columns={columns} pagination={false} />
    )
}
