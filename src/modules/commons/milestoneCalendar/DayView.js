import React, {useEffect} from 'react';
import { Table, Progress  } from 'antd';
import moment from 'moment';

export default function DayView({milestones, ProjectStatus, reviewLagent, handelDateRange}) {
  
  useEffect(() => {
    handelDateRange({start: moment().format('YYYY-MM-DD'), end: moment().format('YYYY-MM-DD')})
  }, []);
    
  const columns = [
      {
        title: 'KAM Name',
        key: 'name',
        render: (row) => {
          return {
            props: {
              style: { borderLeft: `8px solid ${row.review_status_color ? row.review_status_color : '#cecece'}` }
            },
            children: <span>{row.kam_name}</span>
          };
        }
      },
      {
        title: 'Project Name',
        dataIndex: 'project_name',
        key: 'title',
      },
      {
        title: 'Milestone Name',
        dataIndex: 'milestone',
        key: 'milestone',
      },
      {
          title: 'Status',
          key: 'status',
          render: (row) => <span style={{color: row?.milestone_status_color}}>{row.milestone_status}</span>,
      },
      {
          title: 'Payment',
          key: 'payment',
          dataIndex: 'payment',
      },
      {
          title: 'Progress',
          key: 'address',
          render: (row) => <span>
                      {/* {row?.progress} */}
                      <Progress percent={ row?.progress } />
                  </span>,
      },
  ];

  return (
      <Table dataSource={milestones} 
        scroll={{ y: "calc(100vh - 20rem)" }} 
        columns={columns}  
        pagination={false}/>
  )
}
