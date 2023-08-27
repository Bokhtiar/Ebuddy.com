import React from 'react';
import {Card, Col, Row, Tooltip, Radio, Button, Select } from "antd";
const { Option } = Select;

export default function TodaysTask() {
    const showPercentage = (value) => <span>{value}%</span>;

    return (
        <div className="dashboard-item p-3">
            <Row gutter={16} className="mb-3">
                <Col span={12}>
                    <h4>Today's Task</h4>
                </Col>
                <Col span={12} style={{textAlign: 'right'}}>
                    <Select placeholder="Employee" style={{ width: 120 }} 
                        // onChange={handleChange}
                    >
                        <Option value="Satisfied">Satisfied</Option>
                        <Option value="Unsatisfied">Unsatisfied</Option>
                        <Option value="helped"> Helped </Option>
                    </Select>
                </Col>
            </Row>
            <div>
                <Row gutter={16}>
                    <Col span={12}>
                        <Card bordered={false} style={{ background: '#ECECEC', textAlign: 'center' }}>
                            <h5>Tasks</h5>
                            <p>30</p>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card bordered={false} style={{ background: '#ECECEC', textAlign: 'center'}}>
                            <h5>Overdue Tasks</h5>
                            <p>45</p>
                        </Card>
                    </Col>
                </Row>
            </div>

            <div className="today-progress mt-3">
                <div className="progress">
                    <div className="complete-task task-item" style={{width: '30%', textAlign: 'center', color: '#fff'}}>
                        {/* <Tooltip placement="topLeft" title={() => showPercentage(30)} visible={true}
                        arrowPointAtCenter={true} defaultVisible={true}></Tooltip> */}
                        30%
                    </div>
                    <div className="hold-task task-item" style={{width: '40%', textAlign: 'center', color: '#fff'}}>
                        {/* <Tooltip placement="topLeft" title={() => showPercentage(40)} visible={true}
                        arrowPointAtCenter={true} defaultVisible={true}></Tooltip> */}
                        40%
                    </div>
                    <div className="overdue-task task-item" style={{width: '30%', textAlign: 'center', color: '#fff'}}>
                        {/* <Tooltip placement="topLeft" title={() => showPercentage(30)} visible={true}
                        arrowPointAtCenter={true} defaultVisible={true}></Tooltip> */}
                        30%
                    </div>
                </div>
            </div>

            <div className="task-type mt-4">
                <Row>
                    <Col span={20}>
                        <Radio.Group name="radiogroup" defaultValue={1}>
                            <Radio value={1} className="completed-task">Completed Tasks</Radio>
                        </Radio.Group>
                    </Col>
                    <Col span={4}>
                        <Button type="link"><u>8</u></Button>
                    </Col>
                </Row>

                <Row>
                    <Col span={20}>
                        <Radio.Group name="radiogroup" defaultValue={1}>
                            <Radio value={1} className="hold-task">On Hold Tasks</Radio>
                        </Radio.Group>
                    </Col>
                    <Col span={4}>
                        <Button type="link"><u>8</u></Button>
                    </Col>
                </Row>

                <Row>
                    <Col span={20}>
                        <Radio.Group name="radiogroup" defaultValue={1}>
                            <Radio value={1} className="overdue-task">Overdue Tasks</Radio>
                        </Radio.Group>
                    </Col>
                    <Col span={4}>
                        <Button type="link"><u>8</u></Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
