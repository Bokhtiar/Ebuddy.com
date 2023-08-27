import React, { useEffect } from 'react';
import { Badge, Icon } from 'antd';

const CustomTooltip = ({title, data}) => {

  return (
    <div>
      <div style={{margin: '1rem 0.5rem'}}>
        <p>{title} Run Rate Overview</p>
        <p><strong>Target: </strong>{data ? data[0]?.data?.amount : 0}</p>
        <p>
          <strong>Achieved: </strong>
          {/* acheive - target >=0 green arrow or red arrow */}
          <span>{data ? data[1]?.data?.amount : 0} {data ? (data[1]?.amount - data[0]?.amount) >=0 ? <Icon type="arrow-up" style={{color: '#86C537'}}/> : <Icon type="arrow-down" style={{color: '#F24423'}}/> : null}</span>
        </p>
        <p>
          <strong>Required: </strong>
          <span>{data ? data[0]?.data?.amount - data[1]?.data?.amount : 0}</span>
        </p>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <p>Achievement(%)</p>
          {/* acheive - target >=0 green arrow or red */}
          <p style={{color: data ? (data[1]?.amount - data[0]?.amount) >=0 ? "#86C537" : "#F24423" : null}}>{data ? data[1]?.amount ? data[1]?.amount : 0 : null} %</p> 
        </div>
      </div>
    </div>
  )
}

export default CustomTooltip