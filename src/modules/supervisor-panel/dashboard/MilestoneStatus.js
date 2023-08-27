import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Col, Row, Select } from "antd";

const { Option } = Select;

export default function MilestoneStatus() {
    const data = {
        labels: ['SSL Certificate', 'SMS Service', 'Apps Security', 'Utility BIll', 'Security Service', 'Payment Gateway'],
        datasets: [
            {
                label: 'Total Milestone',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: '#005db4',
            },
            {
                label: 'Completed',
                data: [2, 3, 20, 5, 1, 4],
                backgroundColor: '#309300',
            },
            {
                label: 'Hold',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: '#caa109',
            },
            {
                label: 'Failed',
                data: [2, 3, 20, 5, 1, 4],
                backgroundColor: '#dd0000',
            },
        ],
    };
  
    const options = {
        indexAxis: 'y',
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
                    <h4>Milestone Status</h4>
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
                        <Option value="Yearly"> Yearly </Option>
                    </Select>
                </Col>
            </Row>
            <Bar data={data} options={options} />
        </div>
    )
}
