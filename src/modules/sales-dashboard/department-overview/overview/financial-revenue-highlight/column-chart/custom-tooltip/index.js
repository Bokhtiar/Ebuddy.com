import React, { useState, useEffect } from 'react';
import { Badge, Icon } from 'antd';
import moment from 'moment';

const CustomTooltip = ({title, data}) => {

  const [ tooltipData, setTooltipData ] = useState();

  useEffect(()=>{
    let resultData = [];

    if(title === 'YTD Overview'){
      if(data.length){
        resultData = {
          "yearly_target": parseFloat(data[0]?.data?.yearly_target).toFixed(2),
          "yearly_achieve": parseFloat(data[0]?.data?.yearly_achieve || 0).toFixed(2),
          "achievement": parseFloat(data[0]?.data?.yearly_achieve ? data[0]?.data?.yearly_achieve : 0) * 100 / parseFloat(data[0]?.data?.yearly_target).toFixed(2),
          "variance": parseFloat(data[0]?.data?.yearly_achieve ? data[0]?.data?.yearly_achieve : 0) - parseFloat(data[0]?.data?.yearly_target).toFixed(2)
        }
      }
      setTooltipData(resultData);
    }
    else{
      let currentMonth = moment(new Date()).format("MMMM");
      let currentMonthData = data?.find(item=> item.data.month === currentMonth);

      if(currentMonthData){
        resultData = {
          "monthly_target": parseFloat(currentMonthData.data.monthly_target).toFixed(2),
          "monthly_achieve": parseFloat(currentMonthData.data.monthly_achieve || 0).toFixed(2),
          "achievement": parseFloat(currentMonthData.data.monthly_achieve ? currentMonthData.data.monthly_achieve : 0) * 100 / parseFloat(currentMonthData.data.monthly_target).toFixed(2),
          "variance": parseFloat((currentMonthData.data.monthly_achieve ? currentMonthData.data.monthly_achieve : 0) - parseFloat(currentMonthData.data.monthly_target)).toFixed(2)
        }
      }
      setTooltipData(resultData);
    }
  },[data]);

  return (
    <div>
      <div style={{margin: '1rem 0.5rem'}}>
      {title === 'YTD Overview' ? 
        <>
          <p>YTD Overview</p> 
          {/* <Badge color="#59AAE7" text=""/> */}
          <p>
            <strong>YTD: </strong>
            <span>{tooltipData?.yearly_target} / {tooltipData?.yearly_achieve} {tooltipData?.variance >= 0 ? <Icon type="arrow-up" style={{color: '#86C537'}}/> : <Icon type="arrow-down" style={{color: '#F24423'}}/>}</span>
          </p>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <p>Achievement(%)</p>
            <p style={{color: tooltipData?.variance >=0 ? "#86C537" : "#F24423"}}>{parseFloat(tooltipData?.achievement).toFixed(2)}%</p>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <p>Variance with Target</p>
            <p style={{color: tooltipData?.variance >=0 ? "#86C537" : "#F24423"}}>{tooltipData?.variance}</p>
          </div>
        </>

      : 
        <>
          <p>MTD Overview</p>
          {/* <Badge color="#86C537" text=""/> */}
          <p>
            <strong>MTD: </strong>
            <span>{tooltipData?.monthly_target} / {tooltipData?.monthly_achieve} {tooltipData?.variance >= 0 ? <Icon type="arrow-up" style={{color: '#86C537'}}/> : <Icon type="arrow-down" style={{color: '#F24423'}}/>}</span>
          </p>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <p>Achievement(%)</p>
            <p style={{color: tooltipData?.variance >=0 ? "#86C537" : "#F24423"}}>{parseFloat(tooltipData?.achievement).toFixed(2)}%</p>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <p>Variance with Target</p>
            <p style={{color: tooltipData?.variance >=0 ? "#86C537" : "#F24423"}}>{tooltipData?.variance}</p>
          </div>
        </>
      }
    </div>
    </div>
  )
}

export default CustomTooltip;