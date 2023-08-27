import React from 'react';
import { Card, Row, Col } from 'antd';

const StatusCard = ({icon, title, dataIcon, data, bgColor, textColor, color}) => {
  return (
    <Card style={{height: 100, backgroundColor: bgColor, padding: 0}}>
        <div style={{display:'flex', justifyContent: 'space-between'}}>
            <div>
                <img 
                    src={icon} 
                    alt="icon"
                />
            </div>
            <div style={{textAlign: 'right', display: 'flex', flexDirection: 'column'}}>
                <div style={{display:' flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems:'baseline'}}>
                    {dataIcon && <img 
                        src={dataIcon} 
                        alt="upward-icon"
                        style={{marginRight: '5px'}}
                    />}
                    <h2  style={{color: textColor}}><strong>{data}</strong></h2>
                </div>
                <p style={{color: color, fontSize: '13px'}}>{title}</p>
            </div>
        </div>
    </Card>
  )
}

export default StatusCard