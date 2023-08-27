import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/plots';

const PieChartWithAction = ({chartData}) => {

  const [data, setData] = useState();

  
  useEffect(()=>{
    let tempArray = [];
    if(chartData){
      chartData.forEach(item=>{
        tempArray.push(
          {
            type: item.service_name,
            value: parseInt(item.yearly_achieve)
          }
        )
      })
    }
    setData(tempArray);
  },[chartData]);

  const config = {
    appendPadding: 10,
    data: data,
    height: 450,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
  };
  return (
    <>
      {chartData && chartData.length ? <Pie {...config} /> : null}
    </>
  );
};

export default PieChartWithAction;