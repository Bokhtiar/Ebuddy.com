import React, { useState, useEffect } from 'react';
import { DualAxes } from '@ant-design/plots';
import moment from 'moment';

let months = [
  {value: 1, text: "January"},
  {value: 2, text: "February"},
  {value: 3, text: "March"},
  {value: 4, text: "April"},
  {value: 5, text: "May"},
  {value: 6, text: "June"},
  {value: 7, text: "July"},
  {value: 8, text: "August"},
  {value: 9, text: "September"},
  {value: 10, text: "October"},
  {value: 11, text: "November"},
  {value: 12, text: "December"}
];

const MultiLineMultiColumnChart = ({chartData, year}) => {

  const [targetVsAchievementArray, setTargetVsAchievementArray] = useState([]);
  const [runRateArray, setRunRateArray] = useState([]);

  useEffect(()=>{
    let targetArray = [];
    let achievementArray = [];
    let requiredRunRateArray = [];
    if(chartData){
      chartData.runRate.forEach(item=>{
        targetArray.push({
          month: item.month,
          amount: parseInt(item.monthly_target),
          type: 'target'
        });

        achievementArray.push({
          month: item.month,
          amount: parseInt(item.monthly_achieve),
          type: 'achievement'
        });
      })

      let currentMonthValue = moment(new Date()).format("M");

      for(let i = currentMonthValue; i <= months.length; i++){
        let yearly_target = 0;
        let yearly_achievement = 0;

        if(chartData.runRate){
          chartData.runRate.forEach(item=>{
            if(months[i-1].value >= currentMonthValue){
              yearly_target += parseInt(item.monthly_target);
              yearly_achievement += parseInt(item.monthly_achieve);
            }
          })
  
          let runRateData = (yearly_target - yearly_achievement) / (13 - currentMonthValue);

          requiredRunRateArray.push({
            'month': months[i-1].text,
            'run rate': runRateData.toFixed(4) 
          });
        }
      }

      setTargetVsAchievementArray([...targetArray, ...achievementArray]);
      setRunRateArray([...requiredRunRateArray]);
    }
  },[chartData]);

  const config = {
    data: [targetVsAchievementArray, runRateArray],
    height: 250,
    xField: 'month',
    yField: ['amount', 'run rate'],
    geometryOptions: [
      {
        geometry: 'column',
        isGroup: true,
        seriesField: 'type',
      },
      {
        geometry: 'line',
        lineStyle: {
          lineWidth: 2,
        },
      },
    ],
  };
  return <DualAxes {...config} />;
};

export default MultiLineMultiColumnChart;