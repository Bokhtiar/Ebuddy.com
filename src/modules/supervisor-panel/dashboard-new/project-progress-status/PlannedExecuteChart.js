import React from 'react';
import moment from 'moment';

export default function BarChart({data}) {

  const calculateDays = (type) => {
    if(type === 'planned'){
      let startDate = moment(data.milestones[0]?.plan_start_date);
      let endDate = moment(data.milestones?.slice(-1)[0]?.plan_end_date);
      let plannedDate = endDate?.diff(startDate, "days");
      return plannedDate ? plannedDate :  0 ;
    }
    else if(type === 'extend'){
      let startDate = moment(data.milestones[0]?.actual_start_date);
      // let endDate = moment(data.milestones?.slice(-1).actual_end_date);
      let endDate = moment();
      let extendDate = endDate?.diff(startDate, "days");
      return extendDate ? extendDate :  0 ;
    }
  }

  const calculateHeight = (type) => {
    if(type === 'plannedHeight'){
      let startDate = moment(data.milestones[0]?.plan_start_date);
      let endDate = moment(data.milestones?.slice(-1)[0]?.plan_end_date);
      let plannedDate = endDate?.diff(startDate, "days");
      if(plannedDate){
        if(plannedDate > 100) return 100;
        else return plannedDate ;
      }
      else return 0;
    }
    else if(type === 'extendHeight'){
      let startDate = moment(data.milestones[0]?.actual_start_date);
      // let endDate = moment(data.milestones?.slice(-1)[0]?.actual_end_date);
      let endDate = moment();
      let extendDate = endDate?.diff(startDate, "days");
      if(extendDate){
        if(extendDate > 100) return 100;
        else return extendDate ;
      }
      else return 0;
    }
  }

  return (
    <div className='planned-execute'>
      <p className='mt-2'>Planned vs Execute Time</p>
      <section class="bar-chart">
        <div class="skill">
          <div class="graph" style={{ height: `${calculateHeight('plannedHeight')}%`, background: "#41BC75" }}>
            <div class="percentage">{calculateDays('planned')}D</div>
          </div>
          <div class="name">Planned</div>
        </div>
        <div class="skill">
          <div class="graph" style={{ height: `${calculateHeight('extendHeight')}%`, background: "#0084E6" }}>
            <div class="percentage">{calculateDays('extend')}D</div>
          </div>
          <div class="name">Execute</div>
        </div>
      </section>
    </div>
  )
}
