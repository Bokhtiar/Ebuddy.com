import React, { useState, useEffect } from 'react';
import { Table, PageHeader, Select, Button, Icon, DatePicker } from 'antd';
import { 
  MANAGEMENT_USAGE_REPORT, 
  MANAGEMENT_USAGE_EXPORT,
  DEPARTMENT_LIST,
} from "../../../scripts/api";
import { Wrapper} from "../../commons/Wrapper";
import {Flex} from "../../commons/Flex";
import {getData} from "../../../scripts/api-service";
import moment from "moment";
import {alertPop} from "../../../scripts/message";

let years = [],
nextYear = moment().add(10, 'Y').format('YYYY');

for (let i = 2000; i <= nextYear; i++) {
  years.push(i.toString());
}

const UsageReport = () => {
  const [usageReportList, setUsageReportList] = useState([]);
  const [startFrom, setStartFrom] = useState(moment().format("YYYY-MM-DD"));
  const [endFrom, setEndFrom] = useState(moment().format("YYYY-MM-DD"));
  // const [currentPage, setCurrentPage] = useState(1);
  // const [pageCount, setPageCount] = useState();
  const currentDate = new Date();
  const dateFormat = 'YYYY-MM-DD';

  
  const handleDateChange = (date, dateString) => {
    setStartFrom(dateString[0]);
    setEndFrom(dateString[1]);
  };

  const getUsageReportList = async () => {
    let url = MANAGEMENT_USAGE_REPORT + "?";
    if(startFrom && endFrom) url += "&from_date=" + startFrom + "&to_date=" + endFrom;
    let res = await getData(url);
    if(res){
      let masterData = res?.data?.data;
      setUsageReportList(masterData);
      // setPageCount(res?.data?.data?.last_page);
    }
  }

  const exportData = async () => {
    let url = MANAGEMENT_USAGE_EXPORT + '?';
    if(startFrom && endFrom) url += "&from_date=" + startFrom + "&to_date=" + endFrom;
    let res = await getData(url);
    if(res){
      let masterData = res?.data?.data;
      window.open(masterData);
    }
  }

  useEffect(()=>{
    if(startFrom && endFrom) getUsageReportList();
  },[startFrom, endFrom])

  const columns = [
    {
      title: 'Department Name',
      dataIndex: 'dept_name',
      key: 'department_name',
    },
    {
      title: 'Total Activities',
      dataIndex: 'activities',
      key: 'total_activities',
    },
    {
      title: 'SOP Activities',
      dataIndex: 'sop_activities',
      key: 'sop_activities',
    },
    {
      title: 'Pitches',
      dataIndex: 'pitches',
      key: 'pitches',
    },
    {
      title: 'Projects',
      dataIndex: 'projects',
      key: 'projects',
    },
    {
      title: 'Project Milestones',
      dataIndex: 'project_milestone',
      key: 'projects_milestones',
    }
  ];

  return (
    <Wrapper>
      <PageHeader
        style={{
          border: '1px solid rgb(235, 237, 240)',
        }}
        title="Usage Report"
        extra={[
          <Button 
            type="primary" 
            onClick={exportData}
          >
            <Icon type="download" />
            Download Excel
          </Button>,
        ]}
      />
      <Flex space="1rem" justify="normal">
        <DatePicker.RangePicker 
          placeholder="Select date range" 
          size="medium" 
          defaultValue={[
            moment(currentDate, dateFormat), 
            moment(currentDate, dateFormat)
          ]} 
          format={dateFormat}
          onChange={handleDateChange} 
          style={{width: '300px', 'marginRight': '0.5rem'}}
        />
      </Flex>
      <Table
        rowKey={record => record.dept_id}
        columns={columns}
        dataSource={usageReportList}
        bordered
        size="middle"
      //   scroll={{ x: 'calc(100vw + 150rem)', y: 'calc(100vh - 13rem)' }}
        // pagination={{
        //   current: currentPage,
        //   total: pageCount * 10,
        //   onChange: (page) => setCurrentPage(page),
        // }}
        pagination={false}
      />
      <br />
      
    </Wrapper>
  )
}

export default UsageReport;