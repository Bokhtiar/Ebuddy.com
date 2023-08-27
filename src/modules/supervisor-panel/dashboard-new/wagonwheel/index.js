import React from 'react';
import { Card } from 'antd';
import ReactSpeedometer from "react-d3-speedometer";

const WagonWheel = () => {
  return (
    <Card style={{display:'flex', justifyContent:'center', alignItems: 'center', textAlign:'center'}}>
      <h4>Total utilized work hour</h4>
      <ReactSpeedometer
        maxValue={100}
        value={87.7}
        segments={1}
        customSegmentStops={[0, 87.7, 100]}
        segmentColors={['#3592EA', '#F3F3F3']}
        needleColor="#59CD89"
        needleTransitionDuration={4000}
        needleTransition="easeElastic"
        needleHeightRatio={0.45}
        startColor="#3592EA"
        endColor="#3592EA"
      /> 
    </Card> 
  )
}

export default WagonWheel