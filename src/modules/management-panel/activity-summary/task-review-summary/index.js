import {Button, Divider, Modal, Select, Skeleton, Table, Icon, Spin } from "antd";
import React, {useEffect, useState} from "react";
import {
    TASK_SUMMARY_REPORT,
    TASK_SUMMARY_REPORT_EXPORT
} from "../../../../scripts/api";
import {alertPop} from "../../../../scripts/message";
import {getData} from "../../../../scripts/api-service";
import {Flex} from "../../../commons/Flex";
import {PageTitle} from "../../../commons/PageTitle";
import SearchFilter from "../../../commons/SearchFilter";
import {Wrapper} from "../../../commons/Wrapper";
import {dateFormat} from "../../../../scripts/helper";
import DataTable from './DataTable';
import sales_task from "../../../../assets/icons/test/sales_task_icon.svg";
import moment from "moment";


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


export default () => {
    const [selectedYear, setSelectedYear] = useState(moment().format("YYYY"));
    const [selectedMonth, setSelectedMonth] = useState(moment().format("M"));
    const [generatedReportList, setGeneratedReportList] = useState();
    const [editedData, setEditedData] = useState();
    const [spinner, setSpinner] = useState(false);

    const calculateTotal = (row, value) =>{
        let sum = 0;
        Object.values(row.dates).forEach(element => {
            if(value === 'Satisfied') sum+= element.S
            if(value === 'Helped') sum+= element.H
            if(value === 'Unsatisfied') sum+= element.U
            if(value === 'Not Reviewed') sum+= element.N
        });
        return sum; 
    }

    const calculateTotalPercenetage = (row, value) =>{
        let singleElementSum = 0;
        let totalSum = 0;
        let percent = 0;
        Object.values(row.dates).forEach(element => {
            if(value === 'Satisfied') singleElementSum+= element.S
            if(value === 'Helped') singleElementSum+= element.H
            if(value === 'Unsatisfied') singleElementSum+= element.U
            if(value === 'Not Reviewed') singleElementSum+= element.N
        });

        Object.values(row.dates).forEach(element => totalSum += element.S + element.H + element.U + element.N)
        
        if(totalSum > 0) return percent = parseInt((singleElementSum/totalSum) * 100) + '%';
        else return 0 + '%';
    }

    const generateData = async () => {
        setSpinner(true);
        let url = TASK_SUMMARY_REPORT + "?";
        if (selectedYear && selectedMonth ) {
            url = url + 'year=' + selectedYear + '&month=' + selectedMonth;
            let res = await getData(url);
            let masterData = res?.data?.data;
            setSpinner(false);
            setGeneratedReportList(masterData);
        }
        else {
            setSpinner(false);
            alertPop("error", "Please select year and month");
        }
    }

    const exportData = async () => {
        let url = TASK_SUMMARY_REPORT_EXPORT + "/";
        if (selectedYear && selectedMonth ) {
            url = url + selectedYear + '/' + selectedMonth;
            let res = await getData(url);
            let masterData = res?.data?.data;
            window.open(masterData);
        }
        else alertPop("error", "Please select year and month");
    }

    const changeSelectedYear = value => {
        setSelectedYear(value);
    }

    const changeSelectedMonth = value => {
        setSelectedMonth(value);
    }

    useEffect(()=>{
        if(generatedReportList){
            let dateArray = generatedReportList.map(row => Object.entries(row.dates).map(data => ({ 
                title: data[0],
                subColumn: Object.keys(data[1]).map(key => ({ title: key, value: data[1][key] }))
            })));

            setEditedData(dateArray[0]);
        }
    },[generatedReportList])

    useEffect(()=>{
        generateData();
    },[])

    return (
        <Wrapper style={editedData && editedData.length && editedData.length !== 1 ? {width: "95%"} : {}}>
            <Flex space="1rem" justify="">
                <Select 
                    style={{width: '12%', 'marginRight': '1rem', 'marginLeft': '1rem'}} 
                    placeholder='Select Year'
                    showSearch
                    value={selectedYear}
                    onChange={changeSelectedYear}
                    filterOption={(input, option) =>
                        option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0}
                >
                    {years.map(y => <Select.Option key={y} value={y}>{y}</Select.Option>)}
                </Select>
                <Select 
                    style={{width: '12%', 'marginRight': '1rem'}} 
                    placeholder='Select Month'
                    showSearch
                    value={selectedMonth}
                    onChange={changeSelectedMonth}
                    filterOption={(input, option) =>
                        option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0}
                >
                    {months.map(m => <Select.Option key={m.value} value={m.value}>{m.text}</Select.Option>)}
                </Select>
                <Button type="primary" style={{marginRight: '1rem'}}
                onClick={generateData}
                >Generate Report</Button>
                <Button type="primary" onClick={exportData}><Icon type="download" />Download Excel</Button>
            </Flex>
            {/* {editedData ? editedData.length : ''} */}
            {spinner && <Spin size="large" style={{display: 'flex', justifyContent:'center', alignItems:'center', zIndex:'999', marginTop:'15rem'}}/>}
            {!spinner ? generatedReportList?.length ? <DataTable data={generatedReportList}/>: <LandingContent /> : null}
        </Wrapper>
    );
};

const LandingContent = () => {
    return (
        <div className="landing-content mt-5" style={{textAlign: 'center'}}>
            <img src={sales_task} height="200"/>
            <h2>No data found for the selected year or month.</h2>
        </div>
    )
}