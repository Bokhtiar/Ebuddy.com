import React, {useEffect, useState} from 'react';
import {Avatar, Popover, Table} from 'antd';
import demoUser from "../../../assets/dummy.jpg";
import {MEETING_TASK_LIST} from "../../../scripts/api";
import {getData} from "../../../scripts/api-service";

export default function TaskList({meetingId, status, meetingNature, delegated}) {
    let tempColumns = [
        {
            title: 'Task Name',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Function Type',
            dataIndex: 'function_type.name',
            key: 'function_type.name',
        },
        {
            title: 'Function Activity',
            dataIndex: 'function_activity.name',
            key: 'function_activity.name',
        },
        {
            title: 'Assignee',
            key: 'assigned_user',
            render: (r) => <span>
                <Popover title={r?.assigned_user?.name} trigger="hover">
                    <Avatar src={r?.assigned_user?.profile_pic || demoUser} style={{marginRight: '.2rem'}}/> {r?.assigned_user?.name}
                </Popover>
            </span>,
        },
        {
            title: 'Start Date',
            key: 'start_date',
            render: (r) => <span>{r?.start_date || 'N/A'}</span>,
        },
        {
            title: 'End Date',
            key: 'end_date',
            render: (r) => <span>{r?.due_date || 'N/A'}</span>,
        },
        {
            title: 'Status',
            key: 'status',
            render: (r) => <span className='badge badge-secondary text-primary' style={{
                color: '#ffffff', backgroundColor: getColor(r.status)
            }}>{r.status}</span>,
        },
    ];

    const [loading, setLoading] = useState(false);
    const [taskList, setTaskList] = useState([]);
    const [columns, setColumns] = useState(tempColumns);

    useEffect(() => {
        if (meetingNature === 'Business') {
            tempColumns[1].title = 'Project Name';
            tempColumns[1].dataIndex = 'projects.name';
            tempColumns[1].key = 'projects.name';

            tempColumns[2].title = 'Milestone Name';
            tempColumns[2].dataIndex = 'project_milestone.milestone.full_name';
            tempColumns[2].key = 'project_milestone.milestone.full_name';
        }
        setColumns(tempColumns)
        taskListData(meetingId, status, delegated)
    }, [meetingId, status, delegated])

    const taskListData = async (meetingId, status) => {
        setLoading(true)
        setTaskList([]);
        let url = MEETING_TASK_LIST + '/' + meetingId;
        if (status) url = url + '?status=' + status;
        if (delegated > 0) url = url + '?delegated=true';
        const {data} = await getData(url);

        if (data) {
            const modifiedData = data?.data?.map((item, index) => {
                return ({
                    ...item,
                    key: index + 1
                })
            })

            setTaskList(modifiedData);
            console.log(modifiedData)
        }
        setLoading(false)
    }

    const colorList = ['#0084E6', '#41BC75', '#F32E2E', '#FFAC27', '#FFAC27'];

    const getColor = (value) => {
        if (value === 'To-Do') return colorList[0];
        else if (value === 'Done') return colorList[1];
        else if (value === 'Hold') return colorList[2];
        else if (value === 'WIP') return colorList[3];
        else if (value === 'Pending') return colorList[4];
        else if (value === 'Reviewed') return colorList[1];
        else return colorList[0];
    }

    return (
        <Table rowKey="Id" loading={loading} dataSource={taskList} columns={columns} pagination={false}/>
    )
}
