import React from 'react';
import {Button, Table} from "antd";
import { Col, Row, Select } from "antd";

const { Option } = Select;


export default function TaskReview() {
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
          title: 'TASK NAME',
          dataIndex: 'name',
          key: 'name',
          width: '40%',
        },
        {
          title: 'ASSIGNEE',
          dataIndex: 'age',
          key: 'age',
        },
        {
            title: 'STATUS',
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
           <Row gutter={16} className="mb-3">
                <Col span={6}>
                    <h4>Milestone Status</h4>
                </Col>
                <Col span={18} style={{textAlign: 'right'}}>
                    <Select defaultValue="Today" className="mr-3" style={{ width: 120 }} 
                        // onChange={handleChange}
                    >
                        <Option value="Today">Today</Option>
                        <Option value="Tomorrow">Tomorrow</Option>
                        <Option value="last-7-day"> Last 7 Days </Option>
                    </Select>

                    <Select placeholder="Status"
                      className="mr-3" style={{ width: 120 }} 
                        // onChange={handleChange}
                    >
                        <Option value="todo">Todo</Option>
                        <Option value="WIP">WIP</Option>
                        <Option value="done"> Done </Option>
                        <Option value="reviewed"> reviewed </Option>
                    </Select>

                    <Select placeholder="Review" style={{ width: 120 }} 
                        // onChange={handleChange}
                    >
                        <Option value="Satisfied">Satisfied</Option>
                        <Option value="Unsatisfied">Unsatisfied</Option>
                        <Option value="helped"> Helped </Option>
                    </Select>
                </Col>
            </Row>
            <Table dataSource={dataSource} columns={columns} pagination={false} />
        </div>
    )
}
