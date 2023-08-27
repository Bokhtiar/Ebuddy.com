import {Button, Divider, Modal, Select, Skeleton, Table, Icon} from "antd";
import React, {useEffect, useState} from "react";

import {
    MILESTONE_SUMMARY_REPORT_EXPORT
} from "../../../scripts/api";
import {alertPop} from "../../../scripts/message";
import {getData} from "../../../scripts/api-service";
import {Flex} from "../../commons/Flex";
import {PageTitle} from "../../commons/PageTitle";
import SearchFilter from "../../commons/SearchFilter";
import {Wrapper} from "../../commons/Wrapper";
import {dateFormat} from "../../../scripts/helper";
import DataTable from './DataTable';
import sales_task from "../../../assets/icons/test/sales_task_icon.svg";
import moment from "moment";

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

export default function MilestoneReport() {
    const [selectedYear, setSelectedYear] = useState(moment().format("YYYY"));
    const [selectedMonth, setSelectedMonth] = useState(moment().format("M"));
    
    const changeSelectedYear = value => {
        setSelectedYear(value);
    }
    
    const changeSelectedMonth = value => {
        setSelectedMonth(value);
    }

    const exportData = async () => {
        let url = MILESTONE_SUMMARY_REPORT_EXPORT + "/";
        if (selectedYear && selectedMonth ) {
            url = url + selectedYear + '/' + selectedMonth;
            let res = await getData(url);
            let masterData = res?.data?.data;
            window.open(masterData);
        }
        else alertPop("error", "Please select year and month");
    }

    return (
        <Wrapper style={{width: "95%"}}>
            <Flex space="1rem" justify="">
                <Select 
                    style={{width: '20%', 'marginRight': '1rem', 'marginLeft': '1rem'}} 
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
                    style={{width: '20%', 'marginRight': '1rem'}} 
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

                <Button type="primary" onClick={exportData}><Icon type="download" />Download Excel</Button>
            </Flex>
        </Wrapper>
    )
}
