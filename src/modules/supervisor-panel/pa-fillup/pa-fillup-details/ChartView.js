import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';

const ChartView = ({employeePAData}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let tempArray = [];
    if(employeePAData){

      employeePAData.forEach(item=>{
         tempArray.push(
          {
            'name': item.pa_emp_categories[1].pa_category_name,
            'time': item.month,
            'score': ((item.pa_emp_categories[1].emp_score * 1) / 100).toFixed(2)
          }
        )
      })
      
      employeePAData.forEach(item=>{
        tempArray.push(
          {
            'name': item.pa_emp_categories[0].pa_category_name,
            'time': item.month,
            'score': ((item.pa_emp_categories[0].emp_score * 4) / 100).toFixed(2)
          }
        )
      })

      employeePAData.forEach(item=>{
        tempArray.push(
          {
            'name': 'TOTAL',
            'time': item.month,
            'score': (((item.pa_emp_categories[0].emp_score * 4) / 100) + (item.pa_emp_categories[1].emp_score * 1) / 100).toFixed(2)
          },
        )
      })
    }

    setData(tempArray);

  }, [employeePAData]);

  const config = {
    data,
    xField: 'time',
    yField: 'score',
    seriesField: 'name',
    xAxis: {
      label: {
        formatter: (v) => v.slice(0, 3),
      },
    },
    yAxis: {
      label: {
        formatter: (v) => (v*1).toFixed(2),
      },
    },
    legend: {
      position: 'bottom',
    },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 3000,
      },
    },
  };

  return (
    <Line {...config} style={{backgroundColor: 'white'}}/>
  );
};

export default ChartView;