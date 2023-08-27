import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/plots';

const GroupColumnChart = ({chartData}) => {

  const [data, setData] = useState();

  useEffect(()=>{
    let resultArray = [];
    if(chartData){
      let tempArray = Object.values(chartData);
      tempArray.forEach(item=>{
        resultArray.push({
          name: 'Actual',
          client_name: item.kam_name,
          amount: item.actual_client,
        })

        resultArray.push({
          name: 'Plan',
          client_name: item.kam_name,
          amount: item.planed_client,
        })
      })     
    }
    setData(resultArray);
  },[chartData]);

  const config = {
    data: data,
    height: 250,
    isGroup: true,
    xField: 'client_name',
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
  };
  return (
  <>
    {data && data?.length ? <Column {...config} /> : null}
  </>
  );
};

export default GroupColumnChart;