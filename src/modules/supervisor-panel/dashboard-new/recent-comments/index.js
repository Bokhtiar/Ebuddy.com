import React from 'react';
import { Card, Button, Row, Col, Divider, Avatar } from 'antd';
import moment from 'moment';
import sales_task from "../../../../assets/icons/test/sales_task_icon.svg";

const RecentComments = ({title, icon, data}) => {
  return (
    <Card 
      title={
        <div style={{display: 'flex', alignItems: 'center'}}>
            <img src={icon} alt="progress-icon" height="15px"/>
            <span style={{paddingLeft: '5px'}}>{title}</span>
        </div>
      }
        size="small"
    >
    {data ? 
      data?.map(item => {
        return(
          <>
          <Row gutter={16} className="m-2" style={{display: 'flex', alignItems: 'center'}}>
            <Col span={6}>
              <p style={{marginBottom: 0}}><strong>{item.activity_name}</strong></p>
              <small>Projects: {item.project_name}</small>
            </Col>
            <Col span={18} style={{backgroundColor: '#EDF7FD', borderRadius: '10px', padding: '7px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <Avatar src={item.profile_picture} icon="user" size={16}/>
                  <p className="m-1">{item.commented_by}</p>
                </div>
                <small>{moment(item.comment_time).format("DD/MM/YYYY | h:mm A")}</small>
              </div>
              <p style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 0}}>{item.comment}</p>
            </Col>
          </Row>
          <Divider />
          </>
        )
      })
    :<LandingContent />}
    </Card>
  )
}

const LandingContent = () => {
  return (
      <div className="landing-content m-5" style={{textAlign: 'center'}}>
          <img src={sales_task} height="50"/>
          <h2>No Data Found</h2>
      </div>
  )
}

export default RecentComments