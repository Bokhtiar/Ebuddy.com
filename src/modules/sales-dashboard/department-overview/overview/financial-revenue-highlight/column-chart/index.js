import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';
import CustomTooltip from './custom-tooltip';
import moment from 'moment';

const ColumnChart = ({chartData}) => {

  const [data, setData] = useState();

  useEffect(()=>{
    if(chartData){
      let resultData = [];
      let currentYearTarget = 0;
      let currentYearAchievement = 0;

      let currentMonth = moment(new Date()).format("MMMM");
      let currentMonthData = chartData?.find(item=> item.month === currentMonth);

      chartData.forEach(item=>{
        currentYearTarget += parseFloat(item.monthly_target);
        currentYearAchievement += parseFloat(item.monthly_achieve);
      });

      let currentYearData = {
        "yearly_target": currentYearTarget,
        "yearly_achievement": currentYearAchievement,
      }

      if(currentMonthData){
        resultData = [
          {
            "type": "MTD Overview",
            "amount": parseFloat(currentMonthData?.monthly_target),
            "sub_type": "MTD Target",
            "month": currentMonthData.month,
            "monthly_target": currentMonthData?.monthly_target,
            "monthly_achieve": currentMonthData?.monthly_achieve,
          },
          {
            "type": "MTD Overview",
            "amount": parseFloat(currentMonthData?.monthly_achieve),
            "sub_type": "MTD Achieve",
            "monthly_target": currentMonthData?.monthly_target,
            "monthly_achieve": currentMonthData?.monthly_achieve,
          },
          {
            "type": "YTD Overview",
            "amount": parseFloat(currentYearData?.yearly_target).toFixed(2),
            "sub_type": "YTD Target",
            "yearly_target": currentYearData?.yearly_target,
            "yearly_achieve": currentYearData?.yearly_achievement,
          },
          {
            "type": "YTD Overview",
            "amount": parseFloat(currentYearData?.yearly_achievement).toFixed(2),
            "sub_type": "YTD Achieve",
            "yearly_target": currentYearData?.yearly_target,
            "yearly_achieve": currentYearData?.yearly_achievement,
          },
        ]
      }
  
      setData(resultData);
    }
  },[chartData]);

  const config = {
    data,
    height: 250,
    isGroup: true,
    xField: 'type',
    yField: 'amount',
    seriesField: 'sub_type',
    label: {
      position: 'middle',
      layout: [
        {
          type: 'interval-adjust-position',
        },
        {
          type: 'interval-hide-overlap',
        },
        {
          type: 'adjust-color',
        },
      ],
    },
    colorField: 'sub_type', // or seriesField in some cases
    color: ({ sub_type }) => {
      if(sub_type === 'MTD Target'){
        return '#CFE8AF';
      }
      else if(sub_type === 'MTD Achieve'){
        return '#86C537';
      }
      else if(sub_type === 'YTD Target'){
        return '#DEEEFA';
      }
      else if(sub_type === 'YTD Achieve'){
        return '#59AAE7';
      }
    },
    tooltip: {
      customContent: (title, data) => {
        return (
          <>{data ? <CustomTooltip title={title} data={data}/> : null}</>
        )
      }
    }
  };

  return (
    <>{data ? <Column {...config} /> : null}</>
  );
};

export default ColumnChart;

