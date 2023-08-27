import React, {useState, useEffect} from 'react';
import moment from "moment";
import demoUser from "../../../assets/dummy.jpg";

export default function WeekView({milestones, ProjectStatus, reviewLagent, handelDateRange}) {
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
                <span>{moment(day).format('DD')}</span>
            </div>
    }

    const showCardItems = (date) => {
        if (milestones && milestones.length) {
            let day = moment(date).format('YYYY-MM-DD');
            let activities = milestones.filter(task => task.plan_end_date === day);
    
            if (activities.length) {
                return activities.map(a => <div className="ant-card ant-card-bordered item-card" 
                style={{ borderLeft: `5px solid ${a.review_status_color || '#cecece'}`}}>
                    <div className="item-card-body">
                        <div className="mb-2">
                            <span style={{color: "#22f568"}}>#{a.project_code}</span> - <span>{a?.project_name}</span>
                        </div>
                        <div className="mb-2">
                            <span>{a?.client_name}</span>
                            <img src={a?.kam_iamge || demoUser} width="20" height="20" className="ml-4" title={a?.kam_name}/> 
                        </div>
                        <div className="mb-2">
                            {a?.milestone || 'N/A'}
                        </div>
                        <div className="mb-2">
                            <span style={{color: a.milestone_status_color}}>{a.milestone_status}</span>
                            <span>  -  </span>
                            <span>{a?.progress || '0'}%</span>
                        </div>
                    </div>
                </div>)
            }
        }
    }

    return (
        <div className="week-calendar-view">
            <div className="grid-container-week">
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
