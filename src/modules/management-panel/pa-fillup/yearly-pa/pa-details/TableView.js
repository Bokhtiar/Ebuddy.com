import React from 'react';
import { Table } from "antd";
import moment from 'moment';

const TableView = ({data}) => {

  const calculateCore = (row) =>{
    let core = (row?.pa_emp_categories[0].emp_score * 4) / 100;
    return core.toFixed(2);
  }

  const calculatePersonal = (row) =>{
    let personal = (row?.pa_emp_categories[1].emp_score * 1) / 100;
    return personal.toFixed(2);
  }

  const calculateTotal = (row) =>{
    let core = (row?.pa_emp_categories[0].emp_score * 4) / 100;
    let personal = (row?.pa_emp_categories[1].emp_score * 1) / 100;
    let total = core + personal;

    return total.toFixed(2);
  }

  const columns = [
      {
        title: 'Date',
        key: 'date',
        render: (row) =>  <span className="employee-month">{row?.month} - {row?.year}</span>
      },
      {
        title: <>
          <p style={{color: '#0184E6'}}>Core - 80</p>
          <p>RATE - PLOT</p>
        </>,
        key: 'core',
        render: (row) =>  <span>{calculateCore(row)}</span>
      },
      {
        title: <>
          <p style={{color: '#F78C2C'}}>Personal - 20</p>
          <p>RATE - PLOT</p>
        </>,
        key: 'personal',
        render: (row) =>  <span>{calculatePersonal(row)}</span>
      },
      {
        title: 'Summary',
        key: 'total',
        render: (row) =>  <span>{calculateTotal(row)}</span>
      },
  ];

  return (
    <Table 
        rowKey={row => row.id}
        dataSource={data} 
        columns={columns} 
        pagination={false}
    />
  )
}

export default TableView