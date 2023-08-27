import React from 'react'
import { Card, Button, Table, Divider, Tag, Progress } from 'antd';
import moment from 'moment';
import sales_task from "../../../../assets/icons/test/sales_task_icon.svg";

const index = ({ title, overdue, icon, data }) => {


  const calculateDate = (row) => {
    let plannedEndDate = moment(row?.plan_end_date);
    let actualEndDate = moment(row?.actual_end_date);
    let overdue = actualEndDate.diff(plannedEndDate, "days");

    if (overdue) {
      if (plannedEndDate < actualEndDate) {
        return <p style={{ color: '#F65A5A' }}>{overdue}  Days</p>
      }
      else {
        return <p>{overdue}  Days</p>
      }
    }
    else {
      return moment(row?.deadline).format("DD/MM/YYYY");
    }
  }

  const columns = [
    {
      title: 'Milestone Name',
      key: 'name',
      render: row => <>
        <p><strong>{row?.milestone_name}</strong></p>
        <small>Project: {row?.project_name}</small>
      </>,
      width: '50%',
    },
    {
      title: 'Progress',
      key: 'age',
      render: row => <>
        <p>Progress : {row?.progress}%</p>
        <Progress percent={row?.progress} showInfo={false} />
      </>
    },
    {
      title: overdue ? 'Over Due' : 'Deadline',
      key: 'date',
      render: row => calculateDate(row)
    },
  ];

  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={icon} alt="progress-icon" height="15px" />
          <span style={{ paddingLeft: '5px' }}>{title}</span>
        </div>
      }
      size="small"
    // extra={<Button type="primary">View All</Button>}
    >
      {data ?
        <Table
          className={data.length === 0 ? 'process-null-content' : ''}
          columns={columns}
          dataSource={data}
          pagination={false}
          // scroll={{ y: "calc(100vh - 16rem)" }} 
          scroll={{ y: 300 }}  //fixed height as required
        /> : <LandingContent />}
    </Card>
  )
}

const LandingContent = () => {
  return (
    <div className="landing-content m-5" style={{ textAlign: 'center' }}>
      <img src={sales_task} height="50" />
      <h2>No Data Found</h2>
    </div>
  )
}

export default index