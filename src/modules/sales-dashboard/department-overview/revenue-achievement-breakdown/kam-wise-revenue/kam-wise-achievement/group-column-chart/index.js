import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/plots';

const GroupColumnChart = ({chartData}) => {

  
  const[data, setData] = useState();

  useEffect(()=>{
    let tempArray = [];
    if(chartData){
      if(chartData.kamWiseResult){
        chartData.kamWiseResult.forEach(item=>{
          tempArray.push(
            {
              name: 'Monthly Target',
              industry: item.name,
              amount: parseInt(item.monthly_target),
            },
            {
              name: 'Monthly Achievement',
              industry: item.name,
              amount: parseInt(item.monthly_achieve),
            },
            {
              name: 'Yearly Target',
              industry: item.name,
              amount: parseInt(item.yearly_target),
            },
            {
              name: 'Yearly Achievement',
              industry: item.name,
              amount: parseInt(item.yearly_achieve),
            },
            )
          })
        }
      }
    setData(tempArray);
  }, [chartData]);

  const config = {
    data: data,
    height: 250,
    isGroup: true,
    xField: 'industry',
    yField: 'amount',
    seriesField: 'name',
    scrollbar: {
      type: 'horizontal',
    },
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
    colorField: 'name', // or seriesField in some cases
    color: ({ name }) => {
      if(name === 'Monthly Target'){
        return '#CFE8AF';
      }
      else if(name === 'Monthly Achievement'){
        return '#86C537';
      }
      else if(name === 'Yearly Target'){
        return '#DEEEFA';
      }
      else if(name === 'Yearly Achievement'){
        return '#59AAE7';
      }
    },
  };

  return (
    <>
      {chartData && chartData ? <Column {...config} /> :null}
    </>
  );
};

export default GroupColumnChart;