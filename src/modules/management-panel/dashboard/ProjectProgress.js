import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Col, Row, Select } from "antd";

const { Option } = Select;

export default function ProjectProgress({mileStone, departments, projectFilterHandel}) {
    const [chatData, setChatData] = useState();

    useEffect(() => {
        if (mileStone) {
            let lables = mileStone.map(l => l.project_name),
                totalMilestone = mileStone.map(tm => tm?.total_milestones?.count),
                completed = mileStone.map(c => c?.completed_milestones?.count ),
                hold = mileStone.map(h => h?.hold_milestones?.count ),
                failed = mileStone.map(f => f?.failed_milestones?.count );

            setChatData({
                labels: lables ,
                datasets: [
                    {
                        label: 'Total Milestone',
                        data: totalMilestone,
                        backgroundColor: mileStone[0]?.total_milestones?.color,
                    },
                    {
                        label: 'Completed',
                        data: completed,
                        backgroundColor: mileStone[0]?.completed_milestones?.color,
                    },
                    {
                        label: 'Hold',
                        data: hold,
                        backgroundColor: mileStone[0]?.hold_milestones?.color,
                    },
                    {
                        label: 'Failed',
                        data: failed,
                        backgroundColor: mileStone[0]?.failed_milestones?.color,
                    },
                ],
            })

        } else setChatData({})
    }, [mileStone])

    // const data = {
    //     labels: ['SSL Certificate', 'SMS Service', 'Apps Security', 'Utility BIll', 'Security Service', 'Payment Gateway'],
    //     datasets: [
    //         {
    //             label: 'Total Milestone',
    //             data: [12, 19, 3, 5, 2, 3],
    //             backgroundColor: '#005db4',
    //         },
    //         {
    //             label: 'Completed',
    //             data: [2, 3, 20, 5, 1, 4],
    //             backgroundColor: '#309300',
    //         },
    //         {
    //             label: 'Hold',
    //             data: [12, 19, 3, 5, 2, 3],
    //             backgroundColor: '#caa109',
    //         },
    //         {
    //             label: 'Failed',
    //             data: [2, 3, 20, 5, 1, 4],
    //             backgroundColor: '#dd0000',
    //         },
    //     ],
    // };
  
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
                    <h4><strong>Project Progress</strong></h4>
                </Col>
                <Col span={14} style={{textAlign: 'right', display: 'flex'}}>
                    <Select
                        className="mr-3"
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Department"
                        optionFilterProp="children"
                        onChange={value => {projectFilterHandel({progress_dept_id: value})}}
                        filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {
                            departments?.length && departments.map(dep => <Option 
                                value={dep.id} key={dep.id}>{dep.dept_name}</Option>)
                        }
                    </Select>
                    <Select defaultValue="Monthly" style={{ width: 120 }} 
                        onChange={value => {projectFilterHandel({queterCheck: value})}}
                    >
                        <Option value="month">Monthly</Option>
                        <Option value="quarterly">Quarterly</Option>
                        <Option value="yearly"> Yearly </Option>
                    </Select>
                </Col>
            </Row>
            <Bar data={chatData} options={options} />
        </div>
    )
}
