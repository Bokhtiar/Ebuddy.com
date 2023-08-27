import React from 'react';
import { Col, Row, Select } from "antd";
import { Bar } from 'react-chartjs-2';

const { Option } = Select;
export default function RevenueStatistics() {
    
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Target',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: '#0084e6',
            },
            {
                label: 'Achivement',
                data: [2, 3, 20, 5, 1, 4],
                backgroundColor: '#05a728',
            },
        ],
    };
  
    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
        plugins: {
            legend: {
              position: 'bottom',
            },
        }
    };

    return (
        <div className="dashboard-item p-3">
            <Row gutter={16} className="mb-3">
                <Col span={10}>
                    <h4>Revenue Statistics</h4>
                </Col>
                <Col span={14} style={{textAlign: 'right', display: 'flex'}}>
                    <Select
                        className="mr-3"
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Employee"
                        optionFilterProp="children"
                        // onChange={onChange}
                        filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                    </Select>
                    <Select defaultValue="Monthly" style={{ width: 120 }} 
                        // onChange={handleChange}
                    >
                        <Option value="Monthly">Monthly</Option>
                        <Option value="Quarterly">Quarterly</Option>
                        <Option value="Yearly">Yearly</Option>
                    </Select>
                </Col>
            </Row>
            <Bar data={data} options={options} />
        </div>
    )
}
