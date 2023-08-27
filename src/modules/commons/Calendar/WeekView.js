import React, {useState, useEffect} from 'react';
import moment from "moment";
import demoUser from "../../../assets/dummy.jpg";

export default function WeekView({tasks, ProjectStatus, reviewLagent, handelDateRange, nonBusiness}) {
    const [weekDays, setWeekDates] = useState();

    useEffect(() => {
        let days = Weekdates(new Date()); //2021, 3, 28
        setWeekDates(days);
        handelDateRange({start: days[0].format("YYYY-MM-DD"), end: days[6].format("YYYY-MM-DD")})
        // handelDateRange({start: "2021-04-25", end: "2021-05-03"})
    }, [])

    const Weekdates = (current) => {
        var week= new Array(); 
        // Starting Monday not Sunday
        current.setDate((current.getDate() - current.getDay() +1));
        for (var i = 0; i < 7; i++) {
            week.push(
                moment(new Date(current)).subtract(1, 'day')
            ); 
            current.setDate(current.getDate() +1);
        }
        return week; 
    }

    const ShowWeekDates = (day) => {
        return <div className="week-header-content">
                <span class="mr-4">
                    {moment(day).format('dddd')}
                </span>
                <span style={{color: '#0084E6'}}>{moment(day).format('DD')}</span>
            </div>
    }

    const showCardItems = (date) => {
        if (tasks && tasks.length) {
            let day = moment(date).format('YYYY-MM-DD');
            let activities = tasks.filter(task => task.due_date === day);
    
            if (activities.length) {
                return activities.map(a => <div className="ant-card ant-card-bordered item-card" 
                style={{ borderLeft: `5px solid ${setReviewColor(a)}`}}>
                    <div className="item-card-body">
                        <div className="mb-2">
                            <span style={{color: "#22f568"}}>#{a.code}</span> - <span>{a?.projects?.name}</span>
                        </div>
                        <div className="mb-2" style={{display: 'flex', alignItems: 'center'}}>
                            <span>{a?.assignee?.name}</span>
                            <img src={a?.assignee?.profile_pic || demoUser} width="20" height="20" className="ml-4"/> 
                        </div>
                        <div className="mb-2">
                            {nonBusiness ? 
                            <>
                                <p>{a.function_activity?.name || ''}</p>
                                <p>{a.function_type?.name || ''}</p>
                            </>
                            : a?.project_milestone?.milestone?.full_name || 'N/A'
                            }
                        </div>
                        <div className="mb-2">
                            <span style={{color: setStatusColor(a)}}>{a.status}</span>
                            <span>  -  </span>
                            <span>{a?.project_milestone?.progress || '0'}%</span>
                        </div>
                    </div>
                </div>)
            }
        }
    }

    const setReviewColor = (task) => {
        if (reviewLagent && reviewLagent.length && task?.review_status_id) {
            let status = reviewLagent.find(s => s.id === task?.review_status_id);

            if (status) return status.color;
        } else return '#cecece';
    }

    const setStatusColor = (task) => {
        if (task && task.status && ProjectStatus && ProjectStatus.length) {
            let status = ProjectStatus.find(s => s.name === task.status);

            if (status) return status.color;
        }
    }

    return (
        <div className="week-calendar-view">
            <div class="grid-container-week">
                {
                    weekDays?.map((day, i) => <div key={i} className="grid-header-item">
                            {ShowWeekDates(day)}

                            <div className="grid-body-item">
                                {showCardItems(day)}
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
