
import {Button, Divider, Modal, Select, Skeleton, Table} from "antd";
import React, {useEffect, useState} from "react";
import {
    DEPARTMENT_LIST,
    KAM_TARGET_PARAM,
    TARGET_VS_ACHIEVEMENT,
    USER_TEAM_LIST
} from "../../../scripts/api";
import {alertPop} from "../../../scripts/message";
import {getData} from "../../../scripts/api-service";
import {Flex} from "../../commons/Flex";
import {PageTitle} from "../../commons/PageTitle";
import SearchFilter from "../../commons/SearchFilter";
import {TableWrapper} from "../../commons/Wrapper";
import AddNew from "./AddNew";
import {dateFormat} from "../../../scripts/helper";
import DataTable from './DataTable';
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

export default () => {
    const [searchString, setSearchString] = useState();
    const [filterData, setFilterData] = useState();
    const [departmentList, setDepartmentList] = useState();
    const [params, setParams] = useState();
    const [selectDepartment, setSelectDepartment] = useState();
    const [selecedYear, setSelectedYear] = useState();
    const [selecedMonth, setSelectedMonth] = useState();
    const [quarter, setQuarter] = useState();
    const [serviceType, setServiceType] = useState();
    const [serviceName, setServiceName] = useState();
    const [KAM, setKAM] = useState();
    const [kamTargetList, setKamTargetList] = useState();
    const [targetVsAchievementData, setTargetVsAchievementData] = useState();
    const [otcTargetTotalforRow, setOtcTargetTotalforRow] = useState(0);
    const [otcAchievementTotalforRow, setOtcAchievementTotalforRow] = useState(0);
    const [mrcTargetTotalforRow, setMrcTargetTotalforRow] = useState(0);
    const [mrcAchievementTotalforRow, setMrcAchievementTotalforRow] = useState(0);

    const search = (value) => {
        //todo
        setSearchString(value);
    };

    const filter = (date) => {
        //todo
        setFilterData(date);
    };

    const getKamTargetList = async () => {
        // let url = KAM_TARGET_PARAM;
        let url = USER_TEAM_LIST + '?department_id='+  selectDepartment;
        let res = await getData(url);
        let masterData = res?.data?.data;
        setKamTargetList(masterData);
    }

    const getDeaprtmentList = async () => {
        let res = await getData(DEPARTMENT_LIST);

        if (res) {
            let masterData = res?.data?.data;
            setDepartmentList(masterData);
        }
    }

    const getTargetVsAchievementData = async () => {
        let url = TARGET_VS_ACHIEVEMENT + '?';
        if(selectDepartment) url += '&department_id=' + selectDepartment;
        if(selecedYear) url += '&year=' + selecedYear;
        if(selecedMonth) url += '&month=' + selecedMonth;
        if(quarter) url += '&quarter=' + quarter;
        if(serviceType) url += '&service_type_id=' + serviceType;
        if(serviceName) url += '&service_ids=' + serviceName;
        if(KAM) url += '&kam_id=' + KAM;
        const res = await getData(url);
        if (res) {
            let masterData = res?.data?.data;
            setTargetVsAchievementData(masterData);
        } else alertPop("error", "Data not found");
    }

    const showOtcMrcValue = (row, index) => {
        return index % 2 === 0 ? <span>{row?.otc_target}/<span style={{color: '#9b59b6'}}>{row?.otc_achievement}</span></span> : <span>{row?.mrc_target}/<span style={{color: '#9b59b6'}}>{row?.mrc_achievement}</span></span>
    }

    useEffect(()=>{
        getTargetVsAchievementData();
    },[selecedYear, selecedMonth, quarter, serviceType, serviceName, KAM]);

    useEffect(()=>{
        getDeaprtmentList();
    },[]);

    useEffect(()=>{
        if(selectDepartment) getKamTargetList();
    },[selectDepartment]);

    return (
        <TableWrapper>
            {/* <SearchFilter
                search={search}
                filter={filter}
                filterOptions={false}
                failsafe
            /> */}
            <Flex space="1rem" justify="">
                <Select 
                    allowClear={true}
                    style={{width: '12%', 'marginRight': '1rem'}} 
                    showSearch
                    placeholder='Select Department'
                    dropdownMatchSelectWidth={false}
                    onChange={(value)=>setSelectDepartment(value)}
                    filterOption={(input, option) =>
                    option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {departmentList?.map(dept=>{
                        return(
                            <Select.Option key={dept.id} value={dept.id}>{dept.name}</Select.Option>
                        )
                    })}
                </Select>
                <Select 
                    allowClear={true}
                    style={{width: '12%', 'marginRight': '1rem'}} 
                    placeholder='Year Filter'
                    showSearch
                    onChange={(value)=>setSelectedYear(value)}                    
                    filterOption={(input, option) =>
                        option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0}
                >
                    {years.map(y => <Select.Option key={y} value={y}>{y}</Select.Option>)}
                </Select>
                <Select 
                    allowClear={true}
                    style={{width: '12%', 'marginRight': '1rem'}} 
                    placeholder='Quarter'
                    showSearch
                    onChange={(event)=>setQuarter(event)}
                    filterOption={(input, option) =>
                        option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0}
                >
                    <Select.Option value="quarter 1">Quarter 1</Select.Option>
                    <Select.Option value="quarter 2">Quarter 2</Select.Option>
                    <Select.Option value="quarter 3">Quarter 3</Select.Option>
                    <Select.Option value="quarter 4">Quarter 4</Select.Option>
                </Select>
                <Select 
                    allowClear={true}
                    style={{width: '12%', 'marginRight': '1rem'}} 
                    placeholder='Month'
                    showSearch
                    onChange={(value)=>setSelectedMonth(value)}
                    filterOption={(input, option) =>
                        option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0}
                >
                    {months.map(m => <Select.Option key={m.value} value={m.text}>{m.text}</Select.Option>)}
                </Select>
                <Select 
                    allowClear={true}
                    style={{width: '12%', 'marginRight': '1rem'}} 
                    placeholder='Service Type'
                    showSearch
                    dropdownMatchSelectWidth={false}
                    onChange={(event)=>setServiceType(event)}
                    filterOption={(input, option) =>
                        option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0}
                >
                    {params?.service_type.map(service=>{
                        return(
                            <Select.Option key={service.id} value={service.id}>{service.name}</Select.Option>
                        )
                    })}
                </Select>
                <Select 
                    mode="multiple" 
                    style={{width: '12%', 'marginRight': '1rem'}} 
                    placeholder='Service'
                    showSearch
                    dropdownMatchSelectWidth={false}
                    onChange={(event)=>setServiceName(event)}
                    filterOption={(input, option) =>
                        option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0}
                >
                   {params?.service.map(service=>{
                        return(
                            <Select.Option key={service.id} value={service.id}>{service.full_name}</Select.Option>
                        )
                    })}
                </Select>
                <Select 
                    allowClear={true}
                    style={{width: '12%', 'marginRight': '1rem'}} 
                    placeholder='KAM Filter'
                    showSearch
                    dropdownMatchSelectWidth={false}
                    onChange={(event)=>setKAM(event)}
                    filterOption={(input, option) =>
                        option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0}
                >
                    {kamTargetList ? kamTargetList.map(kam=>{
                        return(
                            <Select.Option key={kam.emp_id} value={kam.emp_id}>{kam.name}</Select.Option>
                        )
                    }) : null}
                </Select>
            </Flex>
            {targetVsAchievementData?.target_data?.length > 0 ? (
                <DataTable data={targetVsAchievementData}/>
            ) : <LandingContent />}
        </TableWrapper>
    );
};

const LandingContent = () => {
    return (
        <div className="landing-content mt-5" style={{textAlign: 'center'}}>
            <img src={sales_task} height="200"/>
            <h2>No Data found</h2>
        </div>
    )
}