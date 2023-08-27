import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';
import CustomTooltip from './custom-tooltip';
import moment from 'moment';

let months = [
  {value: 1, month: "January"},
  {value: 2, month: "February"},
  {value: 3, month: "March"},
  {value: 4, month: "April"},
  {value: 5, month: "May"},
  {value: 6, month: "June"},
  {value: 7, month: "July"},
  {value: 8, month: "August"},
  {value: 9, month: "September"},
  {value: 10, month: "October"},
  {value: 11, month: "November"},
  {value: 12, month: "December"}
];

const MultiLineChart = ({chartData}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let tempArray = [];
    let requiredRunRate = 0;
    let monthlyTarget = 0;
    let monthlyAchievement = 0;
    let yearlyTarget = 0;
    let currentMonthValue = moment().format("M");
    // let currentMonthValue = 10;
    let remainingMonthArray = months.filter(item=> item.value >= currentMonthValue);
    let previousMonthArray = months.filter(item=> item.value < currentMonthValue);

    
    if(chartData){
      
      //pushing target and achievement
      chartData.forEach(item=>{
        monthlyTarget += parseInt(item.monthly_target);
        monthlyAchievement += parseInt(item.monthly_achieve);
        yearlyTarget += parseInt(item.monthly_target);

        tempArray.push(
          {
            'type': 'Target',
            'month': item.month,
            'amount': monthlyTarget
          },
          {
            'type': 'Achieved',
            'month': item.month,
            'amount': monthlyAchievement
          },
        )
      })

      //calculating achievement upto previous month
      let previousAchievementAmount = 0;

      for(let i=0; i<previousMonthArray.length; i++){
        for(let j=0; j<chartData.length; j++){
          if(previousMonthArray[i].month === chartData[j].month){
            previousAchievementAmount += parseInt(chartData[j].monthly_achieve);
          }
        }
      }

      //calculating required run rate
      let requiredRunrate = (parseInt(yearlyTarget) - parseFloat(previousAchievementAmount)) / (remainingMonthArray.length - 1);

      // pushing required run rate 
      for(let i=0; i<remainingMonthArray.length; i++){
        let amount = previousAchievementAmount + requiredRunrate * i; 
        tempArray.push(
          {
            'type': 'Required',
            'month': remainingMonthArray[i].month,
            'amount': amount
          }
        )
      }

      setData(tempArray);
    }
  }, [chartData]);

  const config = {
    data,
    height: 250,
    xField: 'month',
    yField: 'amount',
    seriesField: 'type',
    yAxis: {
      label: {
        formatter: (v) => `${(v*1).toFixed(2)}`,
      },
    },
    colorField: 'type', // or seriesField in some cases
    color: ({ type }) => {
      if(type === 'Target'){
        return '#60C535';
      }
      else if(type === 'Achieved'){
        return '#0184E6';
      }
      else if(type === 'Required'){
        return '#F24423';
      }
    },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 3000,
      },
    },
    tooltip: {
      customContent: (title, data) => {
        return (
          <>{data ? <CustomTooltip title={title} data={data}/> : null}</>
        )
      }
    }
  };

  return <Line {...config} />;
};

export default MultiLineChart;