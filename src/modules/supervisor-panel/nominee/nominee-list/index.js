
import {Button, Divider, Modal, Select, Skeleton, Table, Icon,Tag} from "antd";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {
    DEPARTMENT_LIST,
    KAM_TARGET_PARAM,
    TARGET_VS_ACHIEVEMENT,
    EOM_NOMINEE_LIST,
    EOM_NOMINEE_EXPORT
} from "../../../../scripts/api";
import {alertPop} from "../../../../scripts/message";
import {getData} from "../../../../scripts/api-service";
import {Flex} from "../../../commons/Flex";
import {PageTitle} from "../../../commons/PageTitle";
import SearchFilter from "../../../commons/SearchFilter";
import {TableWrapper, Wrapper} from "../../../commons/Wrapper";
// import AddNew from "./AddNew";
import {dateFormat} from "../../../../scripts/helper";
import DataTable from './DataTable';
import moment from 'moment';
import sales_task from "../../../../assets/icons/test/sales_task_icon.svg";

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
    const [selecedYear, setSelectedYear] = useState(moment().format("YYYY"));
    const [selecedMonth, setSelectedMonth] = useState(moment().format("MMMM"));
    // const [selecedYear, setSelectedYear] = useState();
    // const [selecedMonth, setSelectedMonth] = useState();
    const [quarter, setQuarter] = useState();
    const [serviceType, setServiceType] = useState();
    const [serviceName, setServiceName] = useState();
    const [KAM, setKAM] = useState();
    const [nomineeList, setNomineeList] = useState();

    const search = (value) => {
        //todo
        setSearchString(value);
    };

    const filter = (date) => {
        //todo
        setFilterData(date);
    };

    const getKamTargetList = async () => {
        let url = KAM_TARGET_PARAM;
        let res = await getData(url);
        let masterData = res?.data?.data;
        setParams(masterData);
    }

    const getDeaprtmentList = async () => {
        let res = await getData(DEPARTMENT_LIST);

        if (res) {
            let masterData = res?.data?.data;
            setDepartmentList(masterData);
        }
    }

    const getNomineeList = async () => {
        let url = EOM_NOMINEE_LIST + '?';
        if(selectDepartment) url += '&department_id=' + selectDepartment;
        if(selecedYear) url += '&year=' + selecedYear;
        if(selecedMonth) url += '&month=' + selecedMonth;
        const res = await getData(url);
        if (res) {
            let masterData = res?.data?.data;
            setNomineeList(masterData);
        } else alertPop("error", "Data not found");
    }

    const exportData = async () => {
        let url = EOM_NOMINEE_EXPORT + "?";
        if (selecedYear && selecedMonth ) {
            // let monthName = months?.filter(item => item.value === selecedMonth)[0].text;
            url = url + '&year=' + selecedYear + '&month=' + selecedMonth;
            if(selectDepartment) url = url + '&department_id=' + selectDepartment;
            let res = await getData(url);
            let masterData = res?.data?.data;
            window.open(masterData);
        }
        else alertPop("error", "Please select year and month");
    }

    const columns = [
        { 
          title: "Employee",
          key: "name",
          render: (row) => <span>{row?.employee?.name}</span>
        },
        { title: "Wings Name",
          key: "wings_name",
          render: (row) => <span>{row?.eom_wing?.name}</span>
        },
        { title: "Key Achievement", key: "key_achievement", render: (row) => row?.key_achievement },
        // { title: "Reason",  
        //   key: "reason", 
        //   render: row => <p>{row.eom_reasons?.map(reason => <Tag>{reason.eom_reason_name}</Tag>)}</p>
        // },
        {
          title: "Total Marks",
          key: "sts",
          render: (row) => row?.total_mark ,
        },
        {
          title: "Scale",
          key: "sts",
          render: (row) => <span style={{color: row?.eom_scale?.color}}>{row?.eom_scale?.name}</span>,
        },
        {
          title: "Action",
          key: "action",
          render: (row) => 
          <>
            {/* <Link 
                to={`/supervisor-panel/nominee-view?rowId=${row.id}&month=${selecedMonth}&year=${selecedYear}`}>
                View
            </Link> */}
            <Button 
                type="link"
                onClick={() => window.open(`/supervisor-panel/nominee-view?rowId=${row.id}&month=${selecedMonth}&year=${selecedYear}`)}
            >
                View
            </Button>
          </>,
        },
      ];

    useEffect(()=>{
        getNomineeList();
    },[selecedYear, selecedMonth, selectDepartment]);

    useEffect(()=>{
        getDeaprtmentList();
        getKamTargetList();
    },[]);

    return (
        <TableWrapper>
            {/* <SearchFilter
                search={search}
                filter={filter}
                filterOptions={false}
                failsafe
            /> */}
            <Flex space="1rem" justify="">
                <Button 
                  style={{width: '20%', 'marginRight': '1rem'}}
                  type="primary" 
                >
                    <Link 
                      to={`/supervisor-panel/nominee-create`}>
                        Create New Nominee
                    </Link>
                </Button>
                <Select 
                    allowClear={true}
                    style={{width: '15%', 'marginRight': '1rem'}} 
                    placeholder='Year'
                    showSearch
                    value={selecedYear}
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
                    style={{width: '15%', 'marginRight': '1rem'}} 
                    placeholder='Month'
                    showSearch
                    value={selecedMonth}
                    onChange={(value)=>setSelectedMonth(value)}
                    filterOption={(input, option) =>
                        option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0}
                >
                    {months.map(m => <Select.Option key={m.value} value={m.text}>{m.text}</Select.Option>)}
                </Select>
                <Select 
                    style={{width: '15%', 'marginRight': '1rem'}} 
                    showSearch
                    placeholder='Department'
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
                {/* <Select 
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
                </Select> */}
                {/* <Select 
                    allowClear={true}
                    style={{width: '15%', 'marginRight': '1rem'}} 
                    placeholder='Scale'
                    showSearch
                    dropdownMatchSelectWidth={false}
                    onChange={(event)=>setKAM(event)}
                    filterOption={(input, option) =>
                        option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0}
                >
                    {params?.kam.map(kam=>{
                        return(
                            <Select.Option key={kam.emp_id} value={kam.emp_id}>{kam.name}</Select.Option>
                        )
                    })}
                </Select> */}
                {/* <Button 
                  style={{width: '20%', 'marginRight': '1rem'}}
                  type="primary" 
                  onClick={exportData}
                ><Icon type="download" />
                  Download Excel
                </Button> */}
            </Flex>
            {nomineeList?.length > 0 ? (
                // <DataTable 
                //     nomineeList={nomineeList}
                // />
                <Table
                    dataSource={nomineeList}
                    columns={columns}
                    scroll={{ y: "calc(100vh - 13rem)" }}
                    pagination={false}
                    // pagination={{
                    //     current: currentPage,
                    //     total: pageCount * 10,
                    //     onChange: (page) => setCurrentPage(page),
                    // }}
                />
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