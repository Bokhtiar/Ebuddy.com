import React from 'react'
import { Card, Table } from 'antd';
import sales_task from "../../../../../assets/icons/test/sales_task_icon.svg";
import { useState } from 'react';
import { useEffect } from 'react';
import { getData } from "../../../../../scripts/api-service";
import { EXISTING_VS_NEW_CLIENT } from "../../../../../scripts/api";

const ClientBreakDown = () => {

const [apiData, setApiData] = useState();
// console.log(apiData)

const getApiData = async () => {
  
    let res = await getData(EXISTING_VS_NEW_CLIENT);

    if (res) {
      let masterData = res?.data?.data;
      setApiData(masterData);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  const columns = [
    {
      title: "Client Type",
      dataIndex: "client_type",
      key: "client_type"
    },
    {
      title: "Total Client",
      dataIndex: "total_client",
      key: "total_client"
    },
    {
      title: "Onboarded Clients",
      dataIndex: "onboarded_client",
      key: "onboarded_client"
    },
    {
      title: "Client in pipeline",
      dataIndex: "client_in_pipeline",
      key: "client_in_pipeline"
    },
    {
      title: "Hold at Visit",
      dataIndex: "hold_at_visit",
      key: "hold_at_visit"
    },
    {
      title: "Hold at Pitch",
      dataIndex: "hold_at_pitch",
      key: "hold_at_pitch"
    },
    {
      title: "Hold at Propsal",
      dataIndex: "hold_at_proposal",
      key: "hold_at_proposal"
    },
    {
      title: "Onboarded Amount",
      dataIndex: "onboarded_amount",
      key: "onboarded_amount"
    },
    {
      title: "Revenue in pipeline",
      dataIndex: "revenue_in_pipeline",
      key: "revenue_in_pipeline"
    },
  ];

  const data = [
    {
      key: '1',
      client_type: 'New',
      total_client: apiData?.new?.total_client,
      onboarded_client: apiData?.new?.onboarded_client,
      client_in_pipeline: apiData?.new?.client_in_pipeline,
      hold_at_visit: apiData?.new?.hold_at_visit,
      hold_at_pitch: apiData?.new?.hold_at_pitch,
      hold_at_proposal: apiData?.new?.hold_at_proposal,
      onboarded_amount: apiData?.new?.onboarded_amount,
      revenue_in_pipeline: apiData?.new?.revenue_in_pipeline
    },
    {
      key: '2',
      client_type: 'Existing',
      total_client: apiData?.existing?.total_client,
      onboarded_client: apiData?.existing?.onboarded_client,
      client_in_pipeline: apiData?.existing?.client_in_pipeline,
      hold_at_visit: apiData?.existing?.hold_at_visit,
      hold_at_pitch: apiData?.existing?.hold_at_pitch,
      hold_at_proposal: apiData?.existing?.hold_at_proposal,
      onboarded_amount: apiData?.existing?.onboarded_amount,
      revenue_in_pipeline: apiData?.existing?.revenue_in_pipeline
    },
    {
      key: '3',
      client_type: 'Total',
      total_client: apiData?.new?.total_client + apiData?.existing?.total_client,
      onboarded_client: apiData?.new?.onboarded_client + apiData?.existing?.onboarded_client,
      client_in_pipeline: apiData?.new?.client_in_pipeline + apiData?.existing?.client_in_pipeline,
      hold_at_visit: apiData?.new?.hold_at_visit + apiData?.existing?.hold_at_visit,
      hold_at_pitch: apiData?.new?.hold_at_pitch + apiData?.existing?.hold_at_pitch,
      hold_at_proposal: apiData?.new?.hold_at_proposal + apiData?.existing?.hold_at_proposal,
      onboarded_amount: apiData?.new?.onboarded_amount + apiData?.existing?.onboarded_amount,
      revenue_in_pipeline: apiData?.new?.revenue_in_pipeline + apiData?.existing?.revenue_in_pipeline
    }
  ];

  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ paddingLeft: '5px' }}>Client Breakdown List</span>
        </div>
      }
      size="small"
    >
      {apiData ?
        <Table
          className={apiData?.length === 0 ? 'process-null-content' : ''}
          columns={columns}
          dataSource={data}
          scroll={{ y: 300 }}
          pagination='false'
        /> : <LandingContent />}
    </Card>
  )
}

const LandingContent = () => {
  return (
    <div className="landing-content m-5" style={{ textAlign: 'center' }}>
      <img src={sales_task} height="50" />
      <h2>No Data Found</h2>
    </div>
  )
}

export default ClientBreakDown