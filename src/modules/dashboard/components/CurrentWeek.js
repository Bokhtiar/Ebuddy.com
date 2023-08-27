import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Row, Col, Card, Icon, Tooltip } from 'antd';

export default function AttendenceCurrentWeek({data}) {
    const [weeksList, setWeekList] = useState([]);

    useEffect(() => {
        const dateformat = "YYYY-MM-DD";
        function getWeekDaysByDate(date) {
            var date = date ? moment(date) : moment(), weeklength=7, result=[];
            date = date.startOf("week")
            while(weeklength--)
            {
                result.push(date.format(dateformat));
                date.add(1,"day")
            }
            return result;
        }

        setWeekList(getWeekDaysByDate());
    }, []);

    const statusWiseValue = (day, context) =>{
      let result = '';
      let dayInfo = data.find(item => moment(item.date, "dddd, MMMM Do YYYY").format("YYYY-MM-DD") === day);
      if(context){
        if(context === 'color') result = checkStatus(dayInfo);
        if(context === 'text') result = checkTitle(dayInfo);
      }
      return result ;
    }

    const checkStatus = (dayInfo) =>{
      if(dayInfo){
        if(dayInfo.attendance_status === 'Normal') return 'circle bold normal';
        else if(dayInfo.attendance_status === 'Late In') return 'circle bold late-in';
        else if(dayInfo.attendance_status === 'Absence') return 'circle bold absence';
        else if(dayInfo.attendance_status === 'Leave') return 'circle bold leave';
        else if(dayInfo.attendance_status === 'Half-Day') return 'circle bold half-day';
        else return 'circle gray bold';
      }
      else return 'circle gray bold';
    }
    
    const checkTitle = (dayInfo) =>{
      if(dayInfo){
        if(dayInfo.attendance_status === 'Normal') return 'Normal';
        else if(dayInfo.attendance_status === 'Late In') return 'Late In';
        else if(dayInfo.attendance_status === 'Absence') return 'Absent';
        else if(dayInfo.attendance_status === 'Leave') return 'Leave';
        else if(dayInfo.attendance_status === 'Half-Day') return 'Half-Day';
        else return '';
      }
      else return '';
    }

    return (
      <div className='current-week'>
        <Card className="landing-card animated fadeInUp">
          <p className="mb-0 header-gray">Attendance</p>
          <h3 className="mb-4 bold">Current Week</h3>
          <Row gutter={16}>
            {
              weeksList.map((day, idx) => <Col className="gutter-row" key={"tast-" + idx} span={3}>
                <div className="gutter-box">
                  <p className='mb-1 header-gray'>{moment(day).format("ddd")}</p>
                  <Tooltip 
                    title={statusWiseValue(day, 'text')}
                  >
                    <div className={statusWiseValue(day, "color")}>{moment(day).format("DD")}</div>
                  </Tooltip>
                </div>
              </Col>)
            }
          </Row>
        </Card>
      </div>
    )
}
