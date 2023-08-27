import React from 'react';
import { Card } from 'antd';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Task by State',
          },
        },
    };

    const data = {
        labels: ['To-Do', 'WIP', 'Done', 'Hold'],
        datasets: [
          {
            data: [37, 10, 26, 27],
            backgroundColor: [
              'rgb(24, 132, 230, 0.8)',
              'rgb(243, 156, 18, 0.8)',
              'rgb(65, 188, 117, 0.8)',
              'rgb(246, 90, 90, 0.8)'
            ],
            borderColor: [
              'rgb(24, 132, 230, 1)',
              'rgb(243, 156, 18, 1)',
              'rgb(65, 188, 117, 1)',
              'rgb(246, 90, 90, 1)'
            ],
            borderWidth: 1,
          },
        ],
      };

  return <Card style={{display:'flex', justifyContent:'center', alignItems: 'center', textAlign:'center'}}>
      <Pie style={{height: '300px',width: '335px'}} options={options} data={data} />
    </Card>;
}
