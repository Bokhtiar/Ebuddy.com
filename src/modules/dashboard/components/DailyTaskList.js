import React, {Fragment} from 'react'
import { Card, Row, Col, Tag , Icon } from 'antd';
import attachmentIcon from "../../../assets/attached.svg";
import {openAttchment, activityColorSet} from "../../../scripts/helper";

export default function DailyTaskList({data, selectedDate}) {

  return (
    <Fragment>
      {
        data?.length ? <Card className="landing-card animated fadeInUp">
          <p className="mt-0">{selectedDate ? selectedDate : "Today"}</p>
          
          {
            data.map(item => <Card className="landing-card animated fadeInUp" key={item.created_at}>
                <Row gutter={16}>
                  <Col span={18}>
                    <h3>{item.title}</h3>
                    <p>
                      <span style={{color: 'blue'}}>{item.code}</span>
                      {item.repeats ? <Tag color="#2db7f5" style={{marginLeft: '10px'}}>{item.repeats}</Tag> : null}
                      {/* {item?.repeats} */}
                    </p>
                    <Icon type="calendar" /> <span>{item.start_date} - {item.due_date}</span>
                  </Col>
                  <Col span={6}>
                    <p><Tag color={activityColorSet(item.status)}>{item.status}</Tag></p>
                    {/* {
                      item?.activity_type?.name ? <p><Tag color="#87d068">{item?.activity_type?.name}</Tag></p> : ''
                    } */}
                    
                    {item.attachment ? 
                      <img 
                          src={attachmentIcon} 
                          alt="attachement" 
                          style={{float: 'inherit', marginLeft: '10px', width:'1.5rem'}} 
                          onClick={() => {openAttchment(item.attachment)}}
                      />:null     
                    }
                  </Col>
                </Row>
              </Card>)
          }
        </Card> : ''
      }
    </Fragment>
    
  )
}
