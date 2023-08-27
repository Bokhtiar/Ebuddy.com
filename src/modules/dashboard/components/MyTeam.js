import React, {useState, useEffect} from 'react'
import { Card, Row, Col, Avatar } from 'antd';

export default function MyTeamList({data, attendance}) {

  const [attendanceData, setAttendanceData] = useState();

  const checkStatus = (data) =>{
    if(data){
      if(data.attendance_status?.status === 'Normal') return '#41BC75';
      else if(data.attendance_status?.status === 'Late In') return '#BC414F';
      else if(data.attendance_status?.status === 'Absence') return '#ff9f43';
      else if(data.attendance_status?.status === 'Leave') return '#b8e994';
      else if(data.attendance_status?.status === 'Half-Day') return '#b8e994';
      else return 'gray';
    }
    else return 'gray bold';
  }

  useEffect(()=>{
    let tempArray = [];
    if(data && attendance){
      data.forEach(dataItem=>{
        let resultData = attendance.find(item=> item.emp_id == dataItem.emp_id);
        if(resultData){
          resultData['profile_pic'] = dataItem?.profile_pic;
          tempArray.push(resultData);
        }
      })
    }
    setAttendanceData(tempArray)
  },[data, attendance])

  return (
    <Card className="landing-card animated fadeInUp my-teams">
      <h3 className="bold">My Teams</h3>
      <p className="gray">{attendanceData?.length || 0} members</p>
        {attendanceData ? 
          attendanceData.map(team => {
            return(
              <Row gutter={16} className="mt-4">
                <Col span={2}>
                  <Avatar 
                    src={team.profile_pic}
                    size="large" 
                    icon="user" 
                  />
                </Col>
                <Col span={22}>
                  <Row gutter={16}>
                    <Col span={18}>
                      <p className="mb-0 bold">{team.employee?.name}</p>
                    </Col>
                    <Col span={6}>
                      <p className="mb-0 bold">First In: {team.first_in_time}</p>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={18}>
                      <span className="gray">Designation: {team.employee?.designation?.designation_name}</span>
                    </Col>
                    <Col span={6}>
                      <span className="gray">Status: <strong style={{color: checkStatus(team)}}>{team.attendance_status?.status}</strong></span>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )
          })
        :null}
    </Card>
  )
}
