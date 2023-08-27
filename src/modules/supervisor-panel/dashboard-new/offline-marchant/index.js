import React from 'react'
import { Card, Button, Row, Col, Divider  } from 'antd';
import management_icon from "../../../../assets/icons/management-icon.svg";

const OfflineMarchant = ({title, dataIcon}) => {
  return (
    <Card 
      title={
        <div style={{display: 'flex', alignItems: 'center'}}>
            <img src={management_icon} alt="progress-icon" height="15px"/>
            <span style={{paddingLeft: '5px'}}>{title}</span>
        </div>
      }
        size="small"
    >
      <Row gutter={16}>
        <Col span={5} style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
            <img src={management_icon} alt="icon" height="30px" style={{marginRight: '5px'}}/>
            <div>
                <p style={{marginBottom: 0}}><strong>123</strong>{dataIcon && <img src={dataIcon} alt="upward-icon" style={{marginRight: '5px'}}
                    />}</p>
                <p style={{marginBottom: 0}}>Total Merchant</p>
            </div>
        </Col>
        <Col span={5} style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
            <img src={management_icon} alt="icon" height="30px" style={{marginRight: '5px'}}/>
            <div>
                <p style={{marginBottom: 0}}><strong>75/80</strong></p>
                <p style={{marginBottom: 0}}>Onboard/Target</p>
            </div>
        </Col>
        <Col span={5} style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
            <img src={management_icon} alt="icon" height="30px" style={{marginRight: '5px'}}/>
            <div>
                <p style={{marginBottom: 0}}><strong>76%</strong></p>
                <p style={{marginBottom: 0}}>Target Achievement</p>
            </div>
        </Col>
        <Col span={5} style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
            <img src={management_icon} alt="icon" height="30px" style={{marginRight: '5px'}}/>
            <div>
                <p style={{marginBottom: 0}}><strong>123</strong></p>
                <p style={{marginBottom: 0}}>Total Merchant</p>
            </div>
        </Col>
        <Col span={5} style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
            <img src={management_icon} alt="icon" height="30px" style={{marginRight: '5px'}}/>
            <div>
                <p style={{marginBottom: 0}}><strong>123</strong></p>
                <p style={{marginBottom: 0}}>Total Merchant</p>
            </div>
        </Col>
      </Row>
    </Card>
  )
}

export default OfflineMarchant