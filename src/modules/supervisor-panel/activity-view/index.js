import React, {useState, useEffect} from 'react';
import { TableWrapper, Wrapper } from "../../commons/Wrapper";
import SearchFilter from "../../commons/SearchFilter";
import {Flex} from "../../commons/Flex";
import { Table, Select, Button, Icon } from 'antd';
import moment from "moment";
import { DEPARTMENT_LIST, USER_TEAM_LIST, ACTIVITY_VIEW_REPORT, ACTIVITY_VIEW_EXPORT, USER_LIST } from "../../../scripts/api";
import { getData } from "../../../scripts/api-service";
import {alertPop} from "../../../scripts/message";

const columns = [
  {
    title: 'SL',
    width: 50,
    key: 'name',
    fixed: 'left',
    render: (r, l, idx) => <>{idx + 1}</>,
  },
  {
    title: 'Employees',
    width: 150,
    dataIndex: 'Employee Name',
    key: 'Employee Name',
    fixed: 'left',
  },
  {
    title: 'Supervisor Name',
    width: 220,
    dataIndex: 'Supervisor Name',
    key: 'Supervisor Name',
    fixed: 'left',
  },
];

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

export default function ActivityView() {
  const [filterData, setFilter] = useState();
  const [dataColoums, setDataColoums] = useState([]);
  const [isDisabledType, setIsDisabledType] = useState(true);
  const [selectedYear, setSelectedYear] = useState(moment().format("YYYY"));
  const [selectedMonth, setSelectedMonth] = useState(moment().format("M")); 
  const [monthName, setMonthName] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState();
  const [departments, setDepartments] = useState();
  const [kamList, setKAMList] = useState();
  const [selectedKAM, setSelectedKAM] = useState();
  const [activityViewReport, setActivityViewReport] = useState([]);

  const search = (value) => {
      setFilter((preState) => ({
          ...preState,
          search: value
      }))
  };

  const filter = (date) => {
      //todo
      setFilter((preState) => ({
          ...preState,
          date: date
      }))
  };

  const monthCalculation = (value) =>{
    setSelectedMonth(value);
    if(value){
      let monthName = months?.filter(item => item.value === value)[0].text;
      setMonthName(monthName);
    }
  };
  
  const getDepartments = async () => {
    let res  = await getData(DEPARTMENT_LIST);

    if (res) {
        let masterData = res.data.data;
        setDepartments(masterData);
    }
  }

  const getKAMList = async () => {
    let url = USER_LIST + '?department_id=' + selectedDepartment;
    let res = await getData(url);

    if (res) {
        let masterData = res?.data?.data || [];
        setKAMList(masterData);
    }
  }

  const getActivityReportView = async () => {
    setIsDisabledType(true);
    // let res = await getData(ACTIVITY_VIEW_REPORT + `?year=${selectedYear}&month=${selectedMonth}`);
    let url = ACTIVITY_VIEW_REPORT + `?year=${selectedYear}&month=${selectedMonth}`;
    if(filterData) url += `&search=${filterData.search}`;
    if(selectedDepartment) url += `&department_id=${selectedDepartment}`;
    if(selectedKAM) url += `&supervisor_id=${selectedKAM}`;

    let res = await getData(url);
    if (res) {
      let masterData = res?.data?.data;

      setActivityViewReport(masterData);
      setIsDisabledType(false);
    }
  }

  const exportData = async() =>{
    let url = ACTIVITY_VIEW_EXPORT + "/";
    if (selectedYear && selectedMonth ) {
        url = url + selectedYear + '/' + selectedMonth + '?';
        if(filterData) url += `&search=${filterData.search}`;
        if(selectedDepartment) url += `&department_id=${selectedDepartment}`;
        if(selectedKAM) url += `&supervisor_id=${selectedKAM}`;

        let res = await getData(url);
        // let masterData = res?.data?.data;
        window.open(res?.data?.data);
    }
    else alertPop("error", "Please select year and month");
    // window.open("https://ssl-employeebuddy.s3.ap-southeast-1.amazonaws.com/reports/activityReviewReport_2_2022.xlsx?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAUZ5MIVA5F46WHSB5%2F20220217%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20220217T064725Z&X-Amz-SignedHeaders=host&X-Amz-Expires=600&X-Amz-Signature=3398bf7759b20ac81c386ae5715215d1c6dbef3dbaabcd7e7e6c4de48f8661b2")
  }

  useEffect(() => {
    let contentColumns = [...columns];
    let days = Array.from({length: moment(`${selectedYear}-${selectedMonth}`).daysInMonth()}, (x, i) => moment(`${selectedYear}-${selectedMonth}`).startOf('month').add(i, 'days').format('ddd, DD'));
    
    if (days?.length) {
      days.forEach(day => {
        contentColumns.push({ 
          title: day, 
          dataIndex: `dates.${moment(day + ', ' + selectedMonth, "ddd, DD, M").format("YYYY-MM-DD")}`,
          key: day.replace(/, /gi, "-"),
          width: 80,
          render:(data)=> 
          <>
            <div className={`activity-view-td ${!data ? "" : data?.done ? 'active-done' : 'inactive-done'}`}></div>
          </>
        });
      });
    };

    console.log(contentColumns);

    setDataColoums(contentColumns);
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    getDepartments();
    getKAMList();
  }, [])

  useEffect(() => {
    if(selectedDepartment) getKAMList();
  }, [selectedDepartment]);

  useEffect(() => {
    getActivityReportView();
  }, [filterData, selectedYear, selectedMonth, selectedDepartment, selectedKAM]);

  return (
    <Wrapper style={{width: "95%"}}>
      <SearchFilter
          search={search}
          filter={filter}
          // filterOptions={[{type: "date_range"}]}
          failsafe
      />
    <Flex space="1rem" justify="normal">
      <Select 
            allowClear={false}
            disabled={isDisabledType}
            style={{width: '12%', 'marginRight': '1rem'}} 
            placeholder='Year'
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

      <Select 
            allowClear={false}
            disabled={isDisabledType}
            style={{width: '20%', 'marginRight': '1rem'}} 
            placeholder='Month'
            showSearch
            value={selectedMonth}
            onChange={(value)=>monthCalculation(value)}
            filterOption={(input, option) =>
                option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0}
      >
          {months.map(m => <Select.Option key={m.value} value={m.value}>{m.text}</Select.Option>)}
      </Select>

      <Select allowClear={true} 
          disabled={isDisabledType}
          style={{width: '25%', 'marginRight': '1rem'}} 
          placeholder='Department'
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
          option.props.children
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0}
          value={selectedDepartment ? selectedDepartment : undefined }
          onChange={(value) => {setSelectedDepartment(value); setIsDisabledType(true); setSelectedKAM(null) }}>
          {
              departments?.length ? 
                  departments.map(dep => <Select.Option value={dep.id} key={dep.id}>{dep.name}</Select.Option>) : ''
          }
      </Select>

      <Select 
        allowClear={true} 
        disabled={isDisabledType}
        style={{width: '25%', 'marginRight': '1rem'}} 
        placeholder='Supervisor'
        showSearch
        optionFilterProp="children"
        onChange={(e)=> {setSelectedKAM(e); setIsDisabledType(true);}}
        value={selectedKAM ? selectedKAM : undefined}
        filterOption={(input, option) =>
        option.props.children
        .toLowerCase()
        .indexOf(input.toLowerCase()) >= 0}
        >
        {
            kamList?.length ? 
                kamList.map(kam => <Select.Option value={kam.emp_id} key={kam.emp_id}>{kam.name}</Select.Option>) : ''
        }
    </Select>
    <Button 
      type="primary" 
      onClick={exportData}
    ><Icon type="download" />Download Excel</Button>

    </Flex>

    <Table dataSource={activityViewReport} columns={dataColoums} className="activity-view-report"
      pagination={false} 
      scroll={{ x:3100 }}/>

    </Wrapper>
  )
}
