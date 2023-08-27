import React, { useEffect, useState } from 'react';
import { Col, Row, Select } from "antd";
import { Bar } from 'react-chartjs-2';

const { Option } = Select;
export default function RevenueStatistics({progree, reviewFilterHandel, departments}) {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        if (progree) {
            let labels = progree.map(e => e.label),
                targetData = progree.map(e => e.total_target),
                achivmentData = progree.map(e => e.total_achievement);

            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: 'Target',
                        data: targetData,
                        backgroundColor: '#0084e6',
                    },
                    {
                        label: 'Achivement',
                        data: achivmentData,
                        backgroundColor: '#05a728',
                    },
                ],
            })
        } else setChartData({})
    }, [progree])
    
    // const data = {
    //     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    //     datasets: [
    //         {
    //             label: 'Target',
    //             data: [12, 19, 3, 5, 2, 3],
    //             backgroundColor: '#0084e6',
    //         },
    //         {
    //             label: 'Achivement',
    //             data: [2, 3, 20, 5, 1, 4],
    //             backgroundColor: '#05a728',
    //         },
    //     ],
    // };

    const onChangeDepartment = (data) => {
        reviewFilterHandel({rev_dept_id: data});
    }

    const onChangeTime = (data) => {
        reviewFilterHandel({rev_filter: data});
    }
  
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
                    <h4><strong>Revenue Progress</strong></h4>
                </Col>
                <Col span={14} style={{textAlign: 'right', display: 'flex'}}>
                    <Select
                        className="mr-3"
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Department"
                        optionFilterProp="children"
                        onChange={onChangeDepartment}
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
                        onChange={onChangeTime}
                    >
                        <Option value="monthly">Monthly</Option>
                        <Option value="quarterly">Quarterly</Option>
                        <Option value="yearly">Yearly</Option>
                    </Select>
                </Col>
            </Row>
            <Bar data={chartData} options={options} />
        </div>
    )
}
