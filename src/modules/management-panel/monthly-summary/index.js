import React, {Fragment, useEffect, useState} from "react";
import {Button, Divider, Modal, Select, Skeleton, Table, Row, Col, Timeline, Collapse,Avatar,Icon, Tag, Progress, PageHeader } from "antd";
import {
    PROJECT_MILESTONE_SUMMARY_REPORT,
    MILESTONE_STATUS_LIST,
    DEPARTMENT_LIST,
    PROJECT_MILESTONE_SUMMARY_EXPORT
} from "../../../scripts/api";
import SingleDate from './SingleDate';
import SingleUserSummary from './SingleUserSummary';
import {alertPop} from "../../../scripts/message";
import {getData} from "../../../scripts/api-service";
import {Flex} from "../../commons/Flex";
import {PageTitle} from "../../commons/PageTitle";
import SearchFilter from "../../commons/SearchFilter";
import {Wrapper} from "../../commons/Wrapper";
import {dateFormat} from "../../../scripts/helper";
import moment from 'moment';
import sales_task from "../../../assets/icons/test/sales_task_icon.svg";

/*
    These are newer modules and ant design Tables are used instead
    of custom designed Tables in the project commons directory
*/
// className: 'text-primary',
//     style: {backgroundColor: 'black'},

let years = [],
    nextYear = moment().add(10, 'Y').format('YYYY');

    for (let i = 1971; i <= nextYear; i++) {
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


export default function MonthlySummary(){
    const [summaryData, setSummaryData] = useState();
    const [milestoneColor, setMilestoneColor] = useState();
    const [selectedYear, setSelectedYear] = useState(moment().format("YYYY"));
    const [selectedMonth, setSelectedMonth] = useState(moment().format("M")); 
    const [departmentList, setDepartmentList] = useState();
    const [selectedDepartment, setSelectedDepartment] = useState();

    const exportData = async () => {
        let url = PROJECT_MILESTONE_SUMMARY_EXPORT + "/";
        if (selectedYear && selectedMonth ) {
            url = url + selectedYear + '/' + selectedMonth;
            let res = await getData(url);
            let masterData = res?.data?.data;
            window.open(masterData);
        }
        else alertPop("error", "Please select year and month");
    }

    const getDeaprtmentList = async () => {
        let res = await getData(DEPARTMENT_LIST);

        if (res) {
            let masterData = res?.data?.data;
            setDepartmentList(masterData);
        }
    }

    const milestoneLegendColor = async() =>{
        const res = await getData(MILESTONE_STATUS_LIST);
        let masterData = res?.data?.data;
        setMilestoneColor(masterData);
    }

    const getMonthlySummary = async () => {
        let url = PROJECT_MILESTONE_SUMMARY_REPORT + "?";
        if(selectedYear) url = url + '&year=' + selectedYear;
        if(selectedMonth) url = url + '&month=' + selectedMonth;
        if(selectedDepartment) url = url + '&department_id=' + selectedDepartment;

        const res = await getData(url);

        if(res){
            let result = [],
                resultDate = [],
                resultUser = [];

            let masterData = res?.data?.data;

            if (masterData?.length) {
                let dates = masterData.map(data=> data.date);
                let uniqueDates = dates.filter((elem, pos)=> dates.indexOf(elem) === pos);

                uniqueDates.forEach(date => {
                    let rowData = {
                        date: date
                    },
                    employesInfo = [];

                    let filterData = masterData.filter(mas => mas.date === date);
                    let empIds = filterData.map(data => data.emp_id),
                        uniqEmpIds = empIds.filter((elem, pos)=> empIds.indexOf(elem) === pos);

                    uniqEmpIds.forEach(empId => {
                        let empInfo = {
                            empId: empId
                        }

                        let fileterEmp = filterData.filter( data => data.emp_id === empId );

                        empInfo.empName = fileterEmp[0]?.emp_name;
                        empInfo.employee = fileterEmp[0]?.employee;

                        empInfo.items = fileterEmp;

                        employesInfo.push(empInfo);
                    })

                    rowData.employees = employesInfo;

                    result.push(rowData)
                })
                
                // let users = masterData.map(data=> data.emp_id);
                // let uniqueUser = users.filter((elem, pos)=> users.indexOf(elem) === pos);
    
                
                // let selectedDate = null;
                // masterData.filter(item=> {
                //     uniqueDates.map(date=>{
                //         if(item.date === date){
                //             uniqueUser.map(user=>{
                //                 if(item.emp_id === user){
                //                     resultUser.push(item);
                //                 }
                //             })
                //             selectedDate = date;
                //         }
                //     })
                // })
                // resultDate.push(resultUser);
                // result.push({"date": selectedDate, "data": resultDate})
                // console.log('result', result)
            }
            setSummaryData(result);
        }
    }

    useEffect(() => {
        getDeaprtmentList();
        milestoneLegendColor();
    },[]);

    useEffect(() => {
        getMonthlySummary();
    },[selectedDepartment, selectedYear, selectedMonth])

    return (
        <Wrapper>
            <PageHeader
                style={{
                border: '1px solid rgb(235, 237, 240)',
                backgroundColor:'#FAFAFA'
                }}
                title="Monthly Summary"
                extra={[
                    <Button type="primary" onClick={exportData}><Icon type="download" />Download Excel</Button>,
                    // <Button type="primary"><Icon type="file-pdf" />PDF View</Button>
                  ]}
            />
            <Row gutter={16} style={{margin:'1rem'}}>
                <Col span={5}>
                <p>Quick Search</p>
                    <Select 
                        allowClear={true}
                        placeholder='Department'
                        showSearch
                        onChange={(value)=>setSelectedDepartment(value)}
                        filterOption={(input, option) =>
                            option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0}
                    >
                        {departmentList ? departmentList.map(dept=>{
                            return(
                                <Select.Option key={dept.id} value={dept.id}>{dept.name}</Select.Option>
                            )
                        }):null}
                    </Select>
                </Col>
                <Col span={5}>
                <p style={{visibility: 'hidden'}}>Quick Search</p>
                    <Select 
                        // mode="multiple" 
                        allowClear={true}
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
                </Col>
                <Col span={5}>
                <p style={{visibility: 'hidden'}}>Quick Search</p>
                    <Select 
                        // mode="multiple" 
                        allowClear={true}
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
                    </Select>
                </Col>
                <Col span={3}></Col>
                <Col span={6} className='legendSquared'>
                    <p>Milestone Legend</p><br />
                    <div style={{marginTop:'1rem'}}> 
                        {milestoneColor ? milestoneColor.map(color=>{
                            return(
                                <p><span style={{background: `${color.color}`}}></span>{color.name}</p>
                            )
                        }):null}
                    </div> 
                </Col>
            </Row>
            {/* <Row style={{margin:'0.5rem 0 2rem 4rem'}}>
                <Timeline style={{margin:'1rem'}}>
                    {summaryData?.length ? 
                        summaryData.map(item=>{
                            return(
                                <SingleDate item={item}/>        
                            )
                        }) : null 
                    }
                </Timeline>
            </Row> */}

            <Row style={{margin:'2rem 0 2rem 4rem'}}>
                <Timeline style={{margin:'1rem'}}>
                    {
                        summaryData?.length ? summaryData.map(item => (
                            <Timeline.Item 
                                key={item.date}
                                dot={
                                    <div style={{ textAlign:'right'}}>
                                        <p><strong>{moment(item.date).format("dddd")}</strong></p>
                                        <p>{item.date}</p>
                                    </div>
                                } 
                                color="black"
                                position="right">
                                    {
                                        item?.employees?.length ? item?.employees.map(userData => <Collapse
                                            defaultActiveKey={userData.empId || 0}
                                            expandIconPosition='right'
                                            style={{margin:'1rem 3rem'}}
                                            bordered="true"
                                            >
                                            <Collapse.Panel 
                                                header={
                                                <div style={{display:'flex'}}>
                                                    <Avatar src={ userData?.employee?.profile_pic }
                                                    size={40} ></Avatar>
                                                    <p style={{marginLeft: '1rem'}} className="mt-2">{userData.empName || ''}</p>
                                                </div>
                                                } 
                                                key={userData.empId || ''}
                                            >
                                                {
                                                    userData?.items?.length && userData.items.map(user => <Fragment>
                                                        <Row gutter={16} style={{display:'flex', alignItems:'center'}}>
                                                            <Col span={6}>
                                                                <strong>{user.project_name}</strong>
                                                                <p>{user.client_name}</p>
                                                            </Col>
                                                            <Col span={4}>
                                                                <Button type="danger" ghost style={{margin: '0.5rem'}}>{user.failed_milestones}</Button>
                                                                <p>Failed Milestone</p>
                                                            </Col>
                                                            <Col span={5}>
                                                                <strong>{user.milestone_name}</strong>
                                                                <div style={{display: 'flex', alignItems:'baseline'}}>
                                                                    <span style={{margin: '0.5rem 0px'}}>{user.milestone_status && <Tag color={user.milestone_status.color}
                                                                            ><strong>{user.milestone_status.name}</strong>
                                                                        </Tag>}
                                                                    </span>
                                                                    <span>{user.review_status ? <p style={{ color: user.review_status.color }}>{user.review_status.name}</p> : null}</span>
                                                                </div>
                                                            </Col>
                                                            <Col span={4}>
                                                                <p>Progress: <strong>{user.milestone_progress}</strong></p>
                                                                <Progress percent={user.milestone_progress} showInfo={false}/>
                                                            </Col>
                                                            <Col span={5} style={{display: 'flex', justifyContent:' center', alignItems: 'center'}}>
                                                                {user.payment ? <strong>{user.payment}</strong> : ''}
                                                                {user.payment_status ? <Tag color="orange" style=
                                                                {{marginLeft:'1rem',backgroundColor: 'white', color:'black', fontSize:'11px'}}>{user.payment_status}</Tag>:null}
                                                            </Col>
                                                        </Row>
                                                        <hr style={{margin:'1rem 0'}}/>
                                                    </Fragment>)
                                                }
                                            </Collapse.Panel>
                                        </Collapse>) : null
                                    }
                            </Timeline.Item>
                        )) : <LandingContent/>
                    }
                </Timeline>
            </Row>
        </Wrapper>
    );
};

const LandingContent = () => {
    return (
        <div className="landing-content mt-5" style={{textAlign: 'center'}}>
            <img src={sales_task} height="200"/>
            <h2>We don't find anything to show here.</h2>
        </div>
    )
}
