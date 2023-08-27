import React from 'react'
import { Card, Table } from 'antd';
import sales_task from "../../../../../assets/icons/test/sales_task_icon.svg";
import { useState } from 'react';
import { useEffect } from 'react';
import { getData } from "../../../../../scripts/api-service";
import { ONBOARD_VS_ACHIEVEMENT_LIST } from "../../../../../scripts/api";

const OnboardVsAchivement = () => {

const [onboardVsAchievement, setOnboardVsAchievement] = useState();
const [currentPage, setCurrentPage] = useState();
const [pageCount, setPageCount] = useState();

// console.log(onboardVsAchievement);

const getOnboardVsAchievement = async () => {
  
    let url = ONBOARD_VS_ACHIEVEMENT_LIST + "?";

    if (currentPage) url = url + "&page=" + currentPage;

    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data?.data;
      setOnboardVsAchievement(masterData);
      setPageCount(res?.data?.data?.last_page);
    }
  };

  useEffect(() => {
    getOnboardVsAchievement();
  }, [currentPage]);

  const columns = [
    {
      title: "Client",
      dataIndex: "client_name",
      key: "client_name",
    },
    {
      title: 'Onboarded Time',
      dataIndex: "onboarding_time",
      key: 'onboarding_time'
    },
    {
      title: 'Amount',
      dataIndex: "onboarded_amount",
      key: 'onboarded_amount'
    }
  ];

  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ paddingLeft: '5px' }}>Onboard vs Achievement</span>
        </div>
      }
      size="small"
    >
      {onboardVsAchievement ?
        <Table
          className={onboardVsAchievement?.length === 0 ? 'process-null-content' : ''}
          columns={columns}
          dataSource={onboardVsAchievement}
          scroll={{ y: 300 }}
          pagination={{
            current: currentPage,
            total: pageCount * 10,
            onChange: (page) => setCurrentPage(page),
          }}
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

export default OnboardVsAchivement