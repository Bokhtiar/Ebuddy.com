import React from 'react'
import { Row, Col } from 'antd';
import StatusCard from './StatusCard';
import totalProjectIcon from '../../../../assets/icons/total-project.svg';
import completeProjectIcon from '../../../../assets/icons/complete-project.svg';
import workProgressIcon from '../../../../assets/icons/work-progress.svg';
import holdProjectIcon from '../../../../assets/icons/hold-project.svg';
import totalResourcesIcon from '../../../../assets/icons/total-resources.svg';
import completeRateIcon from '../../../../assets/icons/complete-rate.svg';
import delayStartIcon from '../../../../assets/icons/delay-start.svg';
import delayCompleteIcon from '../../../../assets/icons/delay-complete.svg';
import progress from '../../../../assets/icons/progress.svg';

const index = ({data}) => {
  const {total_projects, incompleted_projects, wip_projects, hold_project, total_resources, delayed_start, delayed_completion} = data;

  let completeProjects = total_projects - incompleted_projects;
  let completionRate = completeProjects * 100 / total_projects;
  let delayedStartRate = delayed_start * 100 / total_projects;
  let delayedCompletionRate = delayed_completion * 100 / total_projects;

  return (
    <div>
      <Row gutter={32}>
        <Col span={6}>
          <StatusCard icon={totalProjectIcon} title="Total Projects" data={total_projects} bgColor="#1884E6" textColor="white"/>
        </Col>
        <Col span={6}>
          <StatusCard icon={completeProjectIcon} title="Completed Project" data={completeProjects} bgColor="#41BC75" textColor="white"/>
        </Col>
        <Col span={6}>
          <StatusCard icon={workProgressIcon} title="Work in Progress" data={wip_projects} bgColor="#F39C12" textColor="white"/>
        </Col>
        <Col span={6}>
          <StatusCard icon={holdProjectIcon} title="Hold Project" data={hold_project} bgColor="#F65A5A" textColor="white"/>
        </Col>
      </Row>
      <Row gutter={32}>
        <Col span={6}>
          <StatusCard icon={totalResourcesIcon} title="Total Resources" data={total_resources} bgColor="white" textColor="black"/>
        </Col>
        <Col span={6}>
          <StatusCard icon={completeRateIcon} title="Completion Rate" dataIcon={progress} data={completionRate ? parseFloat(completionRate).toFixed(1) + '%' : 0.0 + '%'} bgColor="white" textColor="black"/>
        </Col>
        <Col span={6}>
          <StatusCard icon={delayStartIcon} title="Delayed Start" dataIcon={progress} data={delayedStartRate ? parseFloat(delayedStartRate).toFixed(1) + '%' : 0.0 + '%'} bgColor="white" textColor="black"/>
        </Col>
        <Col span={6}>
          <StatusCard icon={delayCompleteIcon} title="Delayed Completion" dataIcon={progress} data={delayedCompletionRate ? parseFloat(delayedCompletionRate).toFixed(1) + '%' : 0.0 + '%'} bgColor="white" textColor="black"/>
        </Col>
      </Row>
    </div>
  )
}

export default index