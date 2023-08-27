import React from 'react'
import {Button, Table} from "antd";

export default function ExtendedProjects() {
    const dataSource = [
        {
          key: '1',
          name: 'Mike',
          age: 32,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
      ];
      
      const columns = [
        {
          title: 'Project Name',
          dataIndex: 'name',
          key: 'name',
          width: '40%',
        },
        {
          title: 'OLD DEADLINE',
          dataIndex: 'age',
          key: 'age',
        },
        {
            title: 'NEW DEADLINE',
            dataIndex: 'age',
            key: 'age',
          },
        {
          title: 'ACTION',
          key: 'address',
          render: (row) => <Button type="link"><u>Details</u></Button>
        },
      ];
      
    return (
        <div className="dashboard-item p-3">
            <p>Extended Projects</p>
            <Table dataSource={dataSource} columns={columns} pagination={false} />
        </div>
    )
}
