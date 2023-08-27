import React from 'react'
import { Row, Col } from 'antd';
import StatusCard from './StatusCard';
import newClientsIcon from '../../../../../assets/icons/add-user1.svg';
import totalProjectIcon from '../../../../../assets/icons/users-group.svg';
import leadClientIcon from '../../../../../assets/icons/group-160343.svg';
import existingClientsIcon from '../../../../../assets/icons/switch-account.svg';
import onboardAmountIcon from '../../../../../assets/icons/complete-rate.svg';
import leadAmountGreenIcon from '../../../../../assets/icons/lead_amount.svg';
import invoiceAmountGreenIcon from '../../../../../assets/icons/invoice_amount.svg';
import onboardedAmountGreenIcon from '../../../../../assets/icons/onboarded_amount.svg';
import holdAtVisitIcon from '../../../../../assets/icons/hold_at_visit.svg';
import holdAtPoposalIcon from '../../../../../assets/icons/hold_at_proposal.svg';
import clientInPipelineIcon from '../../../../../assets/icons/client_in_pipeline.svg';
import milestoneRunIcon from '../../../../../assets/icons/milestone_run.svg';
import offeredIcon from '../../../../../assets/icons/offered.svg';

const index = ({data}) => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={5}>
          <StatusCard color='#fff' icon={totalProjectIcon} title="Total" data={data.total_client} bgColor="#1884E6" textColor="white"/>
        </Col>
        <Col span={5}>
          <StatusCard color='#fff' icon={offeredIcon} title="Offered" data={data.offered} bgColor="#41BC75" textColor="white"/>
        </Col>
        <Col span={5}>
          <StatusCard color='#fff' icon={newClientsIcon} title="New" data={data.new_client} bgColor="#F39C12" textColor="white"/>
        </Col>
        <Col span={5}>
          <StatusCard color='#fff' icon={existingClientsIcon} title="Existing" data={data.existing_client} bgColor="#7501d3" textColor="white"/>
        </Col>
        <Col span={4}>
          <StatusCard color='#fff' icon={leadClientIcon} title="Lead" data={data.lead_client} bgColor="#D800D8" textColor="white"/>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={5}>
          <StatusCard color='#000' icon={holdAtVisitIcon} title="Hold at Visit" data={data.hold_at_visit} bgColor="white" textColor="##000"/>
        </Col>
        <Col span={5}>
          <StatusCard color='#000' icon={onboardAmountIcon} title="Hold at Pitch"  data={data.hold_at_pitch} bgColor="white" textColor="#000"/>
        </Col>
        <Col span={5}>
          <StatusCard color='#000' icon={holdAtPoposalIcon} title="Hold at Proposal" data={data.hold_at_proposal} bgColor="white" textColor="#000"/>
        </Col>
        <Col span={5}>
          <StatusCard color='#000' icon={clientInPipelineIcon} title="Client in Pipeline"  data={data.client_in_pipeline} bgColor="white" textColor="#000"/>
        </Col>
        <Col span={4}>
          <StatusCard color='#000' icon={milestoneRunIcon} title="Pending Milestone"  data={data.pending_milestone} bgColor="white" textColor="#000"/>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <StatusCard color='#000' icon={leadAmountGreenIcon} title="Lead Amount" data={data.lead_amount} bgColor="#E6FDB9" textColor="#000"/>
        </Col>
        <Col span={8}>
          <StatusCard color='#000' icon={onboardedAmountGreenIcon} title="Onboared Amount" data={data.onboarded_amount} bgColor="#E6FDB9" textColor="#000"/>
        </Col>
        <Col span={8}>
          <StatusCard color='#000' icon={invoiceAmountGreenIcon} title="Invoice Amount" data={data.invoice_amount} bgColor="#E6FDB9" textColor="#000"/>
        </Col>
      </Row>
    </div>
  )
}

export default index