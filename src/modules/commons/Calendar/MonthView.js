import React, { useEffect, useState } from 'react';
import moment from "moment";
import {Popover, Button} from "antd";

export default function MonthView({tasks, ProjectStatus, selectedYear, selectedMonth, handelDateRange, nonBusiness}) {
    const [weekDate, setWeekdates] = useState([]);

    useEffect(() => {
        let lastMonthDate = moment(`${selectedYear}-${selectedMonth}-01`, 'YYYY-MM-DD').endOf("month").format("DD");
        let weeks = getWeeksInMonth(selectedYear, selectedMonth - 1);
        let firstWeek = WeekdatesNumber(new Date(selectedYear, selectedMonth - 1, 1));
        let lastWeek = WeekdatesNumber(new Date(selectedYear, selectedMonth - 1, lastMonthDate));

        weeks[0].dates = firstWeek;
        weeks[weeks.length - 1].dates = lastWeek;

        setWeekdates(weeks);
        
        let weekFirst = Weekdates(new Date(selectedYear, selectedMonth - 1, 1));
        let weekLast = Weekdates(new Date(selectedYear, selectedMonth - 1, lastMonthDate));

        handelDateRange({start: weekFirst[0], end: weekLast[6]})
    }, [selectedYear, selectedMonth])

    const getWeeksInMonth = (year, month) =>  {
        const weeks = [],
          firstDate = new Date(year, month, 1),
          lastDate = new Date(year, month + 1, 0),
          numDays = lastDate.getDate();
      
        let dayOfWeekCounter = firstDate.getDay();
      
        for (let date = 1; date <= numDays; date++) {
          if (dayOfWeekCounter === 0 || weeks.length === 0) {
            weeks.push([]);
          }
          weeks[weeks.length - 1].push(date);
          dayOfWeekCounter = (dayOfWeekCounter + 1) % 7;
        }
      
        return weeks
          .filter((w) => !!w.length)
          .map((w) => ({
            start: w[0],
            end: w[w.length - 1],
            dates: w,
        }));
    }

    const WeekdatesNumber = (current) => {
        var week= new Array(); 
        // Starting Monday not Sunday
        current.setDate((current.getDate() - current.getDay() +1));
        for (var i = 0; i < 7; i++) {
            week.push(
                moment(new Date(current)).subtract(1, 'day').format("D")
            ); 
            current.setDate(current.getDate() +1);
        }
        return week; 
    }

    const Weekdates = (current) => {
        var week= new Array(); 
        // Starting Monday not Sunday
        current.setDate((current.getDate() - current.getDay() +1));
        for (var i = 0; i < 7; i++) {
            week.push(
                moment(new Date(current)).subtract(1, 'day').format("YYYY-MM-DD")
            ); 
            current.setDate(current.getDate() +1);
        }
        return week; 
    }
    
    const isPreviousMonth = (week, day) => {
        if (week.start <=  day *1 && week.end  >= day * 1) return false;
        else return true;
    }

    const manageString = (number) => {
        if (number >= 0 && number <=9) return "0" + number;
        else return number; 
    }

    const popoverContent = (content) => {
       return content.map(c => <li>
                <span class="ant-badge ant-badge-status ant-badge-not-a-wrapper">
                    <span class="ant-badge-status-dot ant-badge-status-warning" style={{background: ShowStatusColor(c)}}></span>
                    <span class="ant-badge-status-text">
                        {c.code || ''}
                        <br/>
                        {nonBusiness ? 
                            <>
                                <p class="ml-3">{c?.id || ''}</p>
                                <p class="ml-3">{c?.function_activity?.name || ''}</p>
                            </>
                            :
                            <span class="ml-3">{c?.projects?.name || ''}</span>
                        }
                    </span>
                </span>
            </li>)
    };
    
    const monthType = (week, day) => {
        if (week.start <=  day *1 && week.end  >= day * 1) return "current";
        else if (week.start <=  day *1) return "prev";
        else if (week.end  >= day * 1) return "next";
        else return null;
    }

    const setMonthForCal = (week, day) => {
        let monthT = monthType(week, day);

        if (monthT === 'prev') return ((selectedMonth * 1) - 1);
        else if (monthT === 'next') return ((selectedMonth * 1) + 1);
        else return selectedMonth;
    }

    const manageTaskActivityList = (week, day) => {
        if (tasks && tasks.length) {
            let date = `${selectedYear}-${manageString(setMonthForCal(week, day))}-${manageString(day)}`;
            let activities = tasks.filter(t => t.due_date === date); 

            if (activities && activities.length) {
                let firstPart = [];

                for (let i = 0; i < activities.length; i++) {
                    if (i === 1) { break; };
                    firstPart.push(activities[i]);
                }

                return <> 
                    {firstPart.map(a => <li>
                        <span class="ant-badge ant-badge-status ant-badge-not-a-wrapper">
                            <span class="ant-badge-status-dot ant-badge-status-warning" style={{background: ShowStatusColor(a)}}></span>
                            <span class="ant-badge-status-text">
                                {a.code || ''}
                                <br/>
                                {nonBusiness ? 
                                    <>
                                        <p class="ml-3">{a?.id || ''}</p>
                                        <p class="ml-3">{a?.function_activity?.name || ''}</p>
                                    </>
                                    :
                                    <span class="ml-3">{a?.projects?.name || ''}</span>
                                }                   
                            </span>
                        </span>
                    </li>)}
                    {
                        activities.length > 1 ? <li>
                                <span className="ant-badge ant-badge-status ant-badge-not-a-wrapper">
                                    <span className="ant-badge-status-text">
                                    <Popover content={popoverContent(activities)} title={moment(date, "YYYY-MM-DD").format('dddd DD MMMM, YYYY')}>
                                        <Button className="pl-0" type="link">+{activities.length - 1} more</Button>
                                    </Popover>
                                    </span>
                                </span>
                            </li> : ''
                    }  
                </>
            } else return null;
        } else return null;
    }

    const ShowStatusColor = (task) => {
        if (task && task.status && ProjectStatus && ProjectStatus.length) {
            let status = ProjectStatus.find(s => s.name === task.status);

            if (status) return status.color;
        }
    }




    return (
        <div className="ant-fullcalendar ant-fullcalendar-full ant-fullcalendar-fullscreen mt-4 month-calendar-view">
            <div className="ant-fullcalendar-calendar-body">
                <table className="ant-fullcalendar-table" cellspacing="0" role="grid">
                    <thead>
                        <tr role="row">
                            <th role="columnheader" title="Sun" className="ant-fullcalendar-column-header">
                                <span className="ant-fullcalendar-column-header-inner">Sunday</span>
                            </th>
                            <th role="columnheader" title="Mon" className="ant-fullcalendar-column-header">
                                <span className="ant-fullcalendar-column-header-inner">Monday</span>
                            </th>
                            <th role="columnheader" title="Tue" className="ant-fullcalendar-column-header">
                                <span className="ant-fullcalendar-column-header-inner">Tuesday</span>
                            </th>
                            <th role="columnheader" title="Wed" className="ant-fullcalendar-column-header">
                                <span className="ant-fullcalendar-column-header-inner">Wednesday</span>
                            </th>
                            <th role="columnheader" title="Thu" className="ant-fullcalendar-column-header">
                                <span className="ant-fullcalendar-column-header-inner">Thursday</span>
                            </th>
                            <th role="columnheader" title="Fri" className="ant-fullcalendar-column-header">
                                <span className="ant-fullcalendar-column-header-inner">Friday</span>
                            </th>
                            <th role="columnheader" title="Sat" className="ant-fullcalendar-column-header">
                                <span className="ant-fullcalendar-column-header-inner">Saturday</span>
                            </th>
                        </tr>
                    </thead>

                    <tbody className="ant-fullcalendar-tbody">
                        {
                            weekDate.length ? <>
                                {
                                    weekDate.map((week, i) => <tr role="row" key={i} className="">
                                        {
                                            week?.dates?.length ? <>
                                                {
                                                    week.dates.map(day => <td title="" key={day} className={`ant-fullcalendar-cell
                                                        ${isPreviousMonth(week, day) ? 'ant-fullcalendar-last-month-cell' : ''}`}>
                                                                <div className="ant-fullcalendar-date">
                                                                    <div className="ant-fullcalendar-value">
                                                                        {day}
                                                                    </div>
                                                                    <div className="ant-fullcalendar-content">
                                                                        <ul className="events pl-2">
                                                                            {
                                                                                manageTaskActivityList(week, day)
                                                                            }
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </td>)
                                                }
                                            </> : ''
                                        }
                                    </tr>)
                                }
                            </> : null
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
