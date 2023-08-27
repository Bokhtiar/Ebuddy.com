import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Col, Row, Select } from "antd";

const { Option } = Select;

export default function MilestoneReview() {
    const data = {
        labels: ['First Pitch', 'Second Pitch', 'Proposal Send', 'Scope Analysis', 'Revised Proposal', 'Work Order'],
        datasets: [
            {
                label: 'Expected Progess',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: '#7e028d',
            },
            {
                label: 'Actual progress',
                data: [2, 3, 20, 5, 1, 4],
                backgroundColor: '#caa109',
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
                <Col span={6}>
                    <h4>Milestone Review</h4>
                </Col>
                <Col span={18} style={{textAlign: 'right', display: 'flex'}}>
                    <Select
                        className="mr-3"
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Project Name"
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
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Milestone Name"
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
                </Col>
            </Row>
            <Bar data={data} options={options} />
        </div>
    )
}
