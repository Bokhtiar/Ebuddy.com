import React, {useEffect, useState} from 'react';
import moment from "moment";
import MonthView from "./MonthView";
import WeekView from "./WeekView";
import DayView from "./DayView";

import {Flex} from "../../commons/Flex";
import {Radio, Col, Row, Select, DatePicker} from "antd";

let years = [],
    nextYear = moment().add(10, 'Y').format('YYYY');

    for (let i = 1971; i <= nextYear; i++) {
        years.push(i.toString());
    }

let Months = [
    {value: "1", text: "January"},
    {value: "2", text: "February"},
    {value: "3", text: "March"},
    {value: "4", text: "April"},
    {value: "5", text: "May"},
    {value: "6", text: "June"},
    {value: "7", text: "July"},
    {value: "8", text: "August"},
    {value: "9", text: "September"},
    {value: "10", text: "October"},
    {value: "11", text: "November"},
    {value: "12", text: "December"}
];

export default function MilestoneCalendar(params) {
    const {milestones, ProjectStatus, reviewLagent, handelViewType, handelDateRange} = params;

    const [selectedYear, setSelectedYear] = useState(moment().format('YYYY'));
    const [selectedMonth, setSelectedMonth] = useState(moment().format("M"));
    const [context, setContext] = useState('day');

    const changeContext = (e) => {
        setContext(e.target.value);
        handelViewType(e.target.value);
    }

    const changeSelectedYear = value => {
        setSelectedYear(value);
    }

    const changeSelectedMonth = value => {
        setSelectedMonth(value);
    }

    const sendDateViewValue = (date) => {
        handelDateRange({start: moment(date).format("YYYY-MM-DD"), end: moment(date).format("YYYY-MM-DD")});
    }

    return (
        <div className="calendar-container">
            <Row gutter={2}>
                <Col span={12}> 
                    {
                        context === 'day' ? (
                            <DatePicker defaultValue={moment()} format="dddd DD MMMM, YYYY" 
                                className="mt-3 ml-3" style={{width: "50%"}}
                                allowClear={false}
                                onChange={sendDateViewValue} /> 
                        ) : ''
                    }
                </Col>
                <Col span={5} style={{textAlign: "center"}}>
                    <Flex space="1rem" justify="normal">
                        <Select style={{'marginRight': '0.5rem'}} placeholder='Year' defaultValue={selectedYear} onChange={changeSelectedYear}>
                            {
                                years.map(y => <Select.Option key={y} value={y}>{y}</Select.Option>)
                            }
                        </Select>
                        <Select placeholder='Months' defaultValue={selectedMonth} onChange={changeSelectedMonth}>
                            {
                                Months.map(m => <Select.Option key={m.value} value={m.value}>{m.text}</Select.Option>)
                            }
                        </Select>
                    </Flex>
                </Col>
                <Col span={7} style={{textAlign: "center"}}>
                    <Radio.Group className="mt-3" value={context} onChange={changeContext}>
                        <Radio.Button value="month">Monthly</Radio.Button>
                        <Radio.Button value="week">Weekly</Radio.Button>
                        <Radio.Button value="day">Day View</Radio.Button>
                    </Radio.Group>
                </Col>
            </Row>
            
            {
                context === 'month' ? <MonthView 
                                        milestones={milestones}
                                        ProjectStatus={ProjectStatus}
                                        selectedYear={selectedYear}
                                        selectedMonth={selectedMonth}
                                        handelDateRange={handelDateRange}>
                                    </MonthView> : ''
            }

            {
                context === 'week' ? <WeekView 
                                        milestones={milestones}
                                        ProjectStatus={ProjectStatus}
                                        reviewLagent={reviewLagent}
                                        handelDateRange={handelDateRange}>
                                    </WeekView> : ''
            }

            {
                context === "day" ? <DayView 
                                        milestones={milestones}
                                        ProjectStatus={ProjectStatus}
                                        reviewLagent={reviewLagent}
                                        handelDateRange={handelDateRange}>
                                    </DayView> : ''
            }
            
        </div>
    )
}
