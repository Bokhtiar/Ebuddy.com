import React, {useEffect, useState} from 'react';
import { PageHeader, Select, Divider } from 'antd';
import {Wrapper} from "../../commons/Wrapper";
import {Flex} from "../../commons/Flex";
import { REVENUE_DASHBOARD, DEPARTMENT_LIST } from "../../../scripts/api";
import {getData, postData} from "../../../scripts/api-service";
import moment from "moment";
import sslwireless_logo from "../../../assets/ssl_logo.svg";
import sslcommerz_logo from "../../../assets/sslcommerz_logo.png";
import RevenueOverviewGraph from './revenue-overview-graph/index.js';
import RevenueOverviewTable from './revenue-overview-table/index';

let years = [],
nextYear = moment().add(10, 'Y').format('YYYY');

for (let i = 2000; i <= nextYear; i++) {
    years.push(i.toString());
}

let months = [
    {value: "1", text: "January"},
    {value: "2", text: "February"},
    {value: "3", text: "March"},
    {value: "4", text: "April"},
    {value: "5", text: "May"},
    {value: "6", text: "June"},
    {value: "7", text: "July"},
    {value: "8", text: "August"},
    {value: "9", text: "September"},
    {value: "10", text: "October"},
    {value: "11", text: "November"},
    {value: "12", text: "December"}
];

const TVASummary = () => {
  const [selectedYear, setSelectedYear] = useState(moment().format("YYYY"));
  // const [selectedMonth, setSelectedMonth] = useState(moment().format("MMMM"));
  const [selectedMonth, setSelectedMonth] = useState();
  const [departmentList, setDepartmentList] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState();
  const [revenueData, setRevenueData] = useState();
  
  const getRevenueData = async () => {
    let url = REVENUE_DASHBOARD + "?company_id=1"; 
    if(selectedYear) url += '&year=' + selectedYear ;
    if(selectedMonth) url += '&month=' + selectedMonth ;
    if(selectedDepartment) url += '&department_id=' + selectedDepartment ;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      setRevenueData(masterData);
    }
  }

  const getDepartmentList = async () => {
    let url = DEPARTMENT_LIST;
    let res = await getData(url);
    if(res){
      let masterData = res?.data?.data;
      setDepartmentList(masterData);
    }
  }

  useEffect(()=>{
    getRevenueData();
    getDepartmentList();
  },[selectedYear, selectedMonth, selectedDepartment])

  return (
    <Wrapper>
      <PageHeader
        style={{
          border: '1px solid rgb(235, 237, 240)',
        }}
        title="Target Vs Achievement Summary"
      />
      <Flex space="1rem" justify="">
        <Select 
            style={{width: '30%', margin: '0 1rem'}} 
            placeholder='Select Year'
            showSearch
            value={selectedYear}
            onChange={(value)=>setSelectedYear(value)}
            filterOption={(input, option) =>
              option.props.children
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0}
        >
            {years.map(y => <Select.Option key={y} value={y}>{y}</Select.Option>)}
        </Select>
        {/* <Select 
          style={{width: '30%', margin: '0 1rem'}} 
          allowClear={true} 
          placeholder='Department Name'
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
          option.props.children
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0}
          onChange={(value) => setSelectedDepartment(value)}
        >
          {departmentList?.length ? 
            departmentList.map(dept => <Select.Option value={dept.id} key={dept.id}>{dept.name}</Select.Option>) : ''
          }
        </Select> */}
        {/* <Select 
            style={{width: '30%', margin: '0 1rem'}} 
            placeholder='Select Month'
            showSearch
            value={selectedMonth}
            onChange={(value)=>setSelectedMonth(value)}
            filterOption={(input, option) =>
              option.props.children
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0}
        >
            {months.map(m => <Select.Option key={m.value} value={m.text}>{m.text}</Select.Option>)}
        </Select> */}
      </Flex>
      <Divider />
      {/* SSL Wireless Overview */}
      <div className="mx-4 my-4">
        {/* <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop: '2rem'}}>
          <img src={sslwireless_logo} alt="" />
        </div> */}
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop: '2rem', backgroundColor:'#0184E6'}}>
          <h3 style={{color: 'white', margin: 0, padding: '0.5rem'}}>Revenue Overview</h3>
        </div>
        {revenueData ? <RevenueOverviewGraph revenueData={revenueData}/> : null}
        {revenueData ? <RevenueOverviewTable data={revenueData} months={months}/> : null}
      </div>


      {/* SSL Commerz Overview */}
      {/* <div className="mx-4">
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop: '2rem'}}>
          <img src={sslcommerz_logo} alt="" width="200px"/>
        </div>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop: '2rem', backgroundColor:'#0184E6'}}>
          <h3 style={{color: 'white', margin: 0, padding: '0.5rem'}}>Revenue Overview</h3>
        </div>
        <RevenueOverviewGraph />
        <RevenueOverviewTable />
      </div> */}


      {/* Acquisition Overview */}
      {/* <div className="mx-4">
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop: '2rem', backgroundColor:'#A16FFB'}}>
          <h3 style={{color: 'white', margin: 0, padding: '0.5rem'}}>Acquisition Overview</h3>
        </div>
        <RevenueOverviewGraph />
        <RevenueOverviewTable />
      </div> */}
    </Wrapper>
  )
}

export default TVASummary