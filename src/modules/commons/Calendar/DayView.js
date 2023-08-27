import React, {useEffect} from 'react';
import { Table, Progress  } from 'antd';
import moment from 'moment';

export default function DayView({tasks,  ProjectStatus, reviewLagent, handelDateRange, nonBusiness}) {
  
  useEffect(() => {
    handelDateRange({start: moment().format('YYYY-MM-DD'), end: moment().format('YYYY-MM-DD')})
  }, []);

  const setReviewColor = (task) => {
    if (reviewLagent && reviewLagent.length && task?.review_status_id) {
        let status = reviewLagent.find(s => s.id === task?.review_status_id);

        if (status) return status.color;
    } else return '#cecece';
  }
    
    const columns = [
      {
        title: 'Assignee',
        // dataIndex: 'assignee.name',
        key: 'name',
        render: (row) => {
          return {
            props: {
              style: { borderLeft: `8px solid ${setReviewColor(row)}` }
            },
            children: <span>{row.assignee.name}</span>
          };
        }
      },
      {
        title: 'Task Name',
        dataIndex: 'title',
        key: 'task_name',
      },
      {
        title: 'Project Name',
        // dataIndex: 'projects.name',
        // key: 'title',
        render: (row)=> row?.projects?.name
      },
      {
        title: 'Milestone Name',
        // dataIndex: 'project_milestone.milestone.full_name',
        // key: 'address',
        render: (row)=> row?.project_milestone?.milestone?.full_name
      },
      {
          title: 'Status',
          key: 'status',
          render: (row) => <span style={{color: setStatusColor(row)}}>{row.status}</span>,
      },
      {
          title:'Payment',
          key: 'payment',
          render: (row) => row?.project_milestone?.payment ? row.project_milestone.payment : '',
      },
      {
          title: 'Progress',
          key: 'progress',
          render: (row) => <span>
                      {/* {row?.project_milestone?.progress} */}
                      <Progress percent={row?.project_milestone?.progress } />
                  </span>,
      },
  ];

    const nonBusinessColumns = [
      {
        title: 'Assignee',
        // dataIndex: 'assignee.name',
        key: 'name',
        render: (row) => {
          return {
            props: {
              style: { borderLeft: `8px solid ${setReviewColor(row)}` }
            },
            children: <span>{row.assignee.name}</span>
          };
        }
      },
      {
        title: 'Task Name',
        dataIndex: 'title',
        key: 'task_name',
      },
      {
        title: 'Function Name',
        // dataIndex: 'projects.name',
        // key: 'title',
        render: (row)=> row?.function_activity?.name ? row?.function_activity?.name : ''
      },
      {
          title: 'Status',
          key: 'status',
          render: (row) => <span style={{color: setStatusColor(row)}}>{row.status}</span>,
      },
      // {
      //     title: 'Progress',
      //     key: 'address',
      //     render: (row) => <span>
      //                 {row?.project_milestone?.progress}
      //                 <Progress percent={row?.project_milestone?.progress } />
      //             </span>,
      // },
  ];

  const setStatusColor = (task) => {
    if (task && task.status && ProjectStatus && ProjectStatus.length) {
        let status = ProjectStatus.find(s => s.name === task.status);

        if (status) return status.color;
    }
  }

  return (
      <Table dataSource={tasks} 
        scroll={{ y: "calc(100vh - 20rem)" }} 
        columns={nonBusiness ? nonBusinessColumns : columns}  
        pagination={false}/>
  )
}
