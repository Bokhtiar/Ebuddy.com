import React, {useEffect, useState} from 'react';
import { PageHeader, Select, Divider } from 'antd';
import {Wrapper} from "../../commons/Wrapper";
import {Flex} from "../../commons/Flex";
import moment from "moment";
import Overview from './overview';
import { DEPARTMENT_LIST, DEPARTMENT_WISE_TARGET_ACHIEVEMENT, TOP_TEN_SMS_TOP_TEN_CLIENT, KAM_WISE_REVENUE, INDUSTRY_KAM_WISE_REVENUE, YEARLY_PRODUCT_WISE_REVENUE } from "../../../scripts/api";
import {getData,postData} from "../../../scripts/api-service";
import TargetVsAchievement from './target-vs-acheivement';
import CurrentVsRequiredRunRate from './current-vs-required-runrate';
import RevenueAchievementBreakdown from './revenue-achievement-breakdown';
import sales_task from "../../../assets/icons/test/sales_task_icon.svg";

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

const TVADepartmentOverview = () => {
  const [selectedYear, setSelectedYear] = useState(moment().format("YYYY"));
  const [selectedMonth, setSelectedMonth] = useState(moment().format("MMMM"));
  const [departmentList, setDepartmentList] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState();
  const [departmentOverviewData, setDepartmentOverviewData] = useState();
  const [topTenSMSTopTenClientData, setTopTenSMSTopTenClientData] = useState();
  const [kamWiseRevenueData, setKamWiseRevenueData] = useState();
  const [industryKamWiseRevenueList, setIndustryKamWiseRevenueList] = useState();
  const [yearlyProductWiseRevenue, setYearlyProductWiseRevenue] = useState();
  
  const getDepartmentList = async () => {
    let url = DEPARTMENT_LIST;
    let res = await getData(url);
    if(res){
      let masterData = res?.data?.data;
      setDepartmentList(masterData);
    }
  }

  const getDepartmentOverviewData = async () => {
    let url = DEPARTMENT_WISE_TARGET_ACHIEVEMENT + "?";
    if(selectedYear) url+= "&year=" + selectedYear;
    if(selectedDepartment) url+= "&department_id=" + selectedDepartment;
    let res = await getData(url);
    if(res){
      let masterData = res?.data?.data;
      setDepartmentOverviewData(masterData);
    }
  }

  const getKamWiseRevenueData = async () => {
    let url = KAM_WISE_REVENUE + "?";
    if(selectedYear) url+= "&year=" + selectedYear;
    if(selectedDepartment) url+= "&department_id=" + selectedDepartment;
    let res = await getData(url);
    if(res){
      let masterData = res?.data?.data;
      setKamWiseRevenueData(masterData);
    }
  }
  
  const getTopTenSMSTopTenClientData = async () => {
    let url = TOP_TEN_SMS_TOP_TEN_CLIENT + "?";
    if(selectedYear) url+= "&year=" + selectedYear;
    if(selectedDepartment) url+= "&department_id=" + selectedDepartment;
    let res = await getData(url);
    if(res){
      let masterData = res?.data?.data;
      setTopTenSMSTopTenClientData(masterData);
    }
  }

  const getIndustryKamWiseRevenueList = async () => {
    let url = INDUSTRY_KAM_WISE_REVENUE + "?";
    if(selectedYear) url+= "&year=" + selectedYear;
    if(selectedMonth) url+= "&month=" + selectedMonth;
    if(selectedDepartment) url+= "&department_id=" + selectedDepartment;
    let res = await getData(url);
    if(res){
      let masterData = res?.data?.data;
      setIndustryKamWiseRevenueList(masterData);
    }
  }

  const getYearlyProductWiseRevenue = async () => {
    let url = YEARLY_PRODUCT_WISE_REVENUE + "?";
    if(selectedYear) url+= "&year=" + selectedYear;
    if(selectedMonth) url+= "&month=" + selectedMonth;
    if(selectedDepartment) url+= "&department_id=" + selectedDepartment;
    let res = await getData(url);
    if(res){
      let masterData = res?.data?.data;
      setYearlyProductWiseRevenue(masterData);
    }
  }

  useEffect(()=>{
    getDepartmentList();
    getDepartmentOverviewData();
    getKamWiseRevenueData();
    getTopTenSMSTopTenClientData();
    getIndustryKamWiseRevenueList();
    getYearlyProductWiseRevenue();
  },[]);

  useEffect(()=>{
    getDepartmentOverviewData();
    getKamWiseRevenueData();
    getTopTenSMSTopTenClientData();
    getIndustryKamWiseRevenueList();
    getYearlyProductWiseRevenue();
  },[selectedYear, selectedDepartment]);

  
  return (
    <Wrapper>
      <PageHeader
        style={{
          border: '1px solid rgb(235, 237, 240)',
        }}
        title="Target Vs Achievement Department Overview"
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
            placeholder='Select Month'
            showSearch
            value={selectedMonth}
            onChange={(value)=>setSelectedMonth(value)}
            filterOption={(input, option) =>
              option.props.children
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0}
        >
            {months.map(m => <Select.Option key={m.value} value={m.value}>{m.text}</Select.Option>)}
        </Select> */}
        <Select 
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
        </Select>
      </Flex>
      <Divider />
      <Overview data={departmentOverviewData} year={selectedYear}/>
      <TargetVsAchievement data={departmentOverviewData} year={selectedYear}/>
      {/* <CurrentVsRequiredRunRate /> */}
      <Divider />
      <RevenueAchievementBreakdown topTenSMSTopTenClientData={topTenSMSTopTenClientData} kamWiseRevenueData={kamWiseRevenueData} industryKamWiseRevenueList={industryKamWiseRevenueList} yearlyProductWiseRevenue={yearlyProductWiseRevenue}/>
    </Wrapper>
  )
}

export default TVADepartmentOverview;

const LandingContent = () => {
  return (
      <div className="landing-content mt-5" style={{textAlign: 'center'}}>
          <img src={sales_task} height="200"/>
          <h2>Please Select Department To Generate Data</h2>
      </div>
  )
}