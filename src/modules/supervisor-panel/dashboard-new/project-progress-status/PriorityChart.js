import React, {useState, useEffect} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
import { ACTIVITY_PRIORITY_CREATE } from '../../../../scripts/api';

const HorizontalChart = ({priorities}) => {

    // const {blocker, critical, major, minor, medium, low} = priorities;
    const [activityPriorities, setActivityPriorities] = useState({
      low: 0, 
      medium: 0, 
      minor: 0, 
      major: 0, 
      critical: 0, 
      blocker: 0
    });

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );
      
    const options = {
        indexAxis: 'x',
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            grid: {
              display: false
            }
          }
        },
        elements: {
          bar: {
            borderWidth: 1,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: false,
          },
          title: {
            display: true,
            text: 'Priority',
          },
        },
      };
      
    const labels = ['Blocker', 'Critical', 'Major', 'Minor', 'Medium', 'Low'];
      
    const data = {
        labels,
        datasets: [
          {
            label: 'Data',
            data: [activityPriorities.blocker, activityPriorities.critical, activityPriorities.major, activityPriorities.minor, activityPriorities.medium, activityPriorities.low],
            // data: [10, 10, 10, 10, 10, 10],
            backgroundColor: ['rgba(24, 132, 230, 1)','rgba(24, 132, 230, 1)','rgba(24, 132, 230, 1)','rgba(24, 132, 230, 1)','rgba(24, 132, 230, 1)', 'rgba(246, 90, 90, 1)'],
            barThickness: 15,
            barPercentage: 0.8,
          },
        ],
      };
      
      const calculatePriority = (priorities) =>{
        let activityPriority = {
          low: 0, 
          medium: 0, 
          minor: 0, 
          major: 0, 
          critical: 0, 
          blocker: 0
        }

        if(priorities){
          priorities.tasks.forEach(item => {
            if(item.activity_priority?.name === 'Low'){
              activityPriority.low += 1;
            } 
            else if(item.activity_priority?.name === 'Medium'){
              activityPriority.medium += 1;
            } 
            else if(item.activity_priority?.name === 'Minor'){
              activityPriority.minor += 1;
            } 
            else if(item.activity_priority?.name === 'Major'){
              activityPriority.major += 1;
            } 
            else if(item.activity_priority?.name === 'Critical'){
              activityPriority.critical += 1;
            } 
            else if(item.activity_priority?.name === 'Blocker'){
              activityPriority.blocker += 1;
            } 
            else return ;
          })
        }
        setActivityPriorities(activityPriority);
      }

      useEffect(()=>{
        calculatePriority(priorities)
      },[priorities])

    return (
        <div>
          <Bar options={options} data={data} />
        </div>
    )
}

export default HorizontalChart;