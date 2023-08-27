import React from 'react';
import { Pie } from '@ant-design/plots';

const PieChartWithAction = ({pieChartData}) => {

  const config = {
    appendPadding: 10,
    data: pieChartData,
    height: 250,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    legend: false,
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
      {pieChartData && pieChartData?.length ? <Pie {...config} /> : null}
    </>
  );
};

export default PieChartWithAction;