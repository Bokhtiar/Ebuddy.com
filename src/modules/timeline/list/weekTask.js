import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Row, Col, Card, Icon, Button } from 'antd';
import { getData } from '../../../scripts/api-service';
import { WEEKLY_USER_ACTIVITIES } from '../../../scripts/api';
import { Tooltip } from 'antd';
// import { activityColorSet } from '../../../scripts/helper';

export default function WeekTask({ handelSelectDate, selectedDate, weeksList, weekNumber, setWeekNumber, mdDashboard }) {

    const [disabledButton, setDisabledButton] = useState();
    // const [taskActivity, setTaskActivity] = useState();

    // const checkDateContent = (date) => {
    //     var isafter = moment().isAfter(date);
    //     return isafter ? 'blue' : '';
    // }

    const getWeeklyTaskActivity = async () => {
        setDisabledButton(true);
        let res = await getData(WEEKLY_USER_ACTIVITIES + '?md_dashboard=' + mdDashboard + `?from_date=${weeksList[0]}&to_date=${weeksList[6]}`);

        if (res) {
            let masterData = res?.data?.data;
            setDisabledButton(false);
            // setTaskActivity(masterData);
        }
    }

    // const showWeekTaskStatusContent = (date) => {
    //     if (taskActivity) {
    //         return taskActivity[date];
    //     }
    // }



    useEffect(() => {
        if (weeksList?.length) getWeeklyTaskActivity();
    }, [weeksList])

    useEffect(() => {
        getWeeklyTaskActivity();
    }, [mdDashboard])

    const getMonthAndYear = (date) => {
        return moment(date).format("MMM, YYYY");
    }

    return (
        <div className='week-task'>
            <Card className="landing-card animated fadeInUp">
                <Row gutter={16}>
                    {
                        weeksList.map((day, idx) => <Col className="gutter-row" key={"tast-" + idx} span={3}>
                            <Tooltip title={
                                <div>
                                    <p>{getMonthAndYear(day)}</p>
                                </div>
                            }>
                                <div className="gutter-box" >
                                    <p className='mb-1'>{moment(day).format("ddd")}</p>

                                    <button className={`circle 
                                ${selectedDate === day ? 'blue' : ''}
                                `}
                                        style={{
                                            border: 'none',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => handelSelectDate(day)}
                                    >{moment(day).format("DD")}</button>


                                </div>
                            </Tooltip>
                        </Col>)
                    }
                    <Col className="gutter-row " span={3}>
                        <div className="gutter-box arrow-handeler" style={{ display: 'flex' }}>
                            <Button disabled={disabledButton} type="link" block onClick={() => setWeekNumber(weekNumber - 7)} className="px-1" >
                                <Icon type="left" style={{ fontSize: "1.5rem" }} />
                            </Button>

                            <Button type="link" block onClick={() => setWeekNumber(weekNumber + 7)} className="px-1"
                                disabled={weekNumber >= 0 || disabledButton}>
                                <Icon type="right" style={{ fontSize: "1.5rem" }} />
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div >
    )
}
