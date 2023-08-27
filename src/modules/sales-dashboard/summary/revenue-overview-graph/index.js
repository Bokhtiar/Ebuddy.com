import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';
import CustomTooltip from './custom-tooltip';

const RevenueOverviewGraph = ({revenueData}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let tempArray = [];
    if(revenueData.chartResult){
      revenueData.chartResult.forEach(item=>{
         tempArray.push(
          {
            'department_name': item.department_name,
            'month': item.month,
            'amount': parseInt(item.monthly_target),
            'monthly_target': item.monthly_target,
            'monthly_achieved': item.monthly_achieve,
            'total_target': item.total_target,
          }
        )
      })
    }
    setData(tempArray);
  }, [revenueData]);

  const config = {
    data,
    xField: 'month',
    yField: 'amount',
    seriesField: 'department_name',
    xAxis: {
      nice: true,
      line: {
        style: {
          stroke: '#aaa',
        },
      },
      tickLine: {
        style: {
          lineWidth: 2,
          stroke: '#aaa',
        },
        length: 5,
      },
    },
    yAxis: {
      label: {
        formatter: (v) => `${(v*1).toFixed(2)} BDT`,
      },
      line: {
        style: {
          stroke: '#fff',
        },
      },
      tickLine: {
        style: {
          lineWidth: 2,
          stroke: '#aaa',
        },
        length: 5,
      },
    },
    legend: {
      position: 'top',
      slidable: true,
      flipPage: true,
      maxRow: 3,
    },
    colorField: 'department_name', // or seriesField in some cases
    color: ({ department_name }) => {
      if(department_name === 'Banking and Financial Services (BFSI)'){
        return '#60C535';
      }
      else if(department_name === 'Business Development'){
        return '#0184E6';
      }
      else if(department_name === 'Government Project'){
        return '#F24423';
      }
      else if(department_name === 'Digital Communications'){
        return '#EB79FC';
      }
      else if(department_name === 'E-Commerce Services'){
        return '#A16FFB';
      }
      return `#${Math.floor(Math.random()*16777215).toString(16)}`; //random color
    },
    smooth: true,
    tooltip: {
      follow: true,
      enterable: true,
      customContent: (title, data) => {
        return (
          <>{data ? <CustomTooltip title={title} data={data}/> : null}</>
        )
      }
    },
    // point: {
    //   shape: () => {
    //     return 'square';
    //   },
    //   style: ({ month }) => {
    //     return {
    //       r: Number(month) % 4 ? 0 : 3, 
    //     };
    //   },
    // },
    point: {
      size: 5,
      style: {
        lineWidth: 1,
        fillOpacity: 1,
      },
      shape: () => {
        return 'diamond';
      },
    },
  };

  return <Line {...config} style={{width: '98%'}}/>;
};

export default RevenueOverviewGraph;