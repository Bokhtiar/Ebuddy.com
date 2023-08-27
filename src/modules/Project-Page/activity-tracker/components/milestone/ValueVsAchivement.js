import React from 'react'
import { Card, Table } from 'antd';
import sales_task from "../../../../../assets/icons/test/sales_task_icon.svg";
import { useState } from 'react';
import { useEffect } from 'react';
import { getData } from "../../../../../scripts/api-service";
import { PIPELINE_VS_ACHIVEMENT_LIST } from "../../../../../scripts/api";

const ValueVsAchivement = () => {

const [apiData, setApiData] = useState();
const [currentPage, setCurrentPage] = useState();
const [pageCount, setPageCount] = useState();

const getApiData = async () => {
  
    let url = PIPELINE_VS_ACHIVEMENT_LIST + "?";

    if (currentPage) url = url + "&page=" + currentPage;

    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data?.data;
      setApiData(masterData);
      setPageCount(res?.data?.data?.last_page);
    }
  };

  useEffect(() => {
    getApiData();
  }, [currentPage]);

  const columns = [
    {
      title: "Client",
      dataIndex: "client_name",
      key: "client_name",
    },
    {
      title: 'Pipeline',
      dataIndex: "pipeline",
      key: 'pipeline'
    },
    {
      title: 'Pipeline Value',
      dataIndex: "pipeline_value",
      key: 'pipeline_value'
    }
  ];

  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ paddingLeft: '5px' }}>Value vs Achievement</span>
        </div>
      }
      size="small"
    >
      {apiData ?
        <Table
          className={apiData?.length === 0 ? 'process-null-content' : ''}
          columns={columns}
          dataSource={apiData}
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

export default ValueVsAchivement