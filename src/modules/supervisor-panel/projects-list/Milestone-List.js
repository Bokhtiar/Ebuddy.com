import React from 'react';
import { Table,Tag } from 'antd';


export default function MilestoneList({milestones}) {
    const columns = [
        {
          title: 'Project Name',
          // dataIndex: 'project.name',
          key: 'project.name',
          render: (r) => <span>{r?.project?.name || 'N/A'}</span>
        },
        {
          title: 'Milestone Name',
          // dataIndex: 'milestone.full_name',
          key: 'milestone.full_name',
          render: (r) => <span>{r?.milestone?.full_name || 'N/A'}</span>
        },
        {
          title: 'Start Date',
          key: 'milestone_id',
          render: (r) => <span>{r?.plan_start_date || 'N/A'}</span>
        },
        {
            title: 'End Date',
            render: (r) => <span>{r?.plan_end_date || 'N/A'}</span>,
            key: 'updated_at',
        },
        {
            title: 'Actual End Date',
            render: (r) => <span>{r?.actual_end_date || 'N/A'}</span>,
            key: 'created_at',
        },
          {
            title: 'Status',
            key: 'Status',
            render: (r) => <Tag color={r?.milestone_status?.color}>
            {r?.milestone_status?.name || 'N/A'}</Tag>
            // <span>{r?.milestone_status?.name || 'N/A'}</span>,
          },
    ];

    return (
        <Table dataSource={milestones} columns={columns} pagination={false} />
    )
}
