import React from 'react';
import { Progress, Divider, Card } from 'antd';

const CustomTooltip = ({title, data}) => {

    const calculateAchievement = (data) =>{
        if(data?.monthly_achieved) {
            let result = parseFloat(data?.monthly_achieved) - parseFloat(data?.monthly_target);
            return result.toFixed(4);
        }
        else return 0;
    }

    const calculateAchievementPercentage = (data) =>{
        if(data?.monthly_achieved) {
            let result = (data?.monthly_achieved * 100) / data?.monthly_target;
            return result.toFixed(4);
        }
        else return 0;
    }
    
  return (
    <div style={{height: '300px', overflow: 'scroll'}}>
        {data.map(revenueData => {
            return(
                <>
                    <div style={{margin: '1rem 0.5rem'}}>
                        <p>{revenueData?.data?.department_name} - {revenueData?.title} Month Overview</p>
                        <p><strong>Monthly Target: </strong>{revenueData?.data?.monthly_target}</p>
                        <p><strong>Achieved: </strong><span style={{color: calculateAchievement(revenueData?.data) > 0 ? '#61C635' : '#F2473F'}}>{` ${revenueData?.data?.monthly_achieved} (${calculateAchievementPercentage(revenueData?.data)})%`}</span></p>
                        <p><strong>Target: </strong>{revenueData?.data?.total_target}</p>
                        <Progress percent={calculateAchievementPercentage(revenueData?.data)} status="active" />
                    </div>
                    <Divider />
                </>
            )
        })}
    </div>
  )
}

export default CustomTooltip;