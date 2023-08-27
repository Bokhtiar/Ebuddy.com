import React, { useState, useEffect } from 'react'
import { Button, Modal, Table, Select, Tag, Row, Col, Form, Popover, Avatar } from "antd";
import SearchFilter from "../../../../commons/SearchFilter";
import { TableWrapper, Wrapper } from "../../../../commons/Wrapper";
import { Flex } from "../../../../commons/Flex";
import moment from "moment";
import { useHistory } from "react-router-dom";
import {
    SALES_TARGET,
    DEPARTMENT_LIST,
    USER_LIST,
} from "../../../../../scripts/api";
import {getData,postData} from "../../../../../scripts/api-service";
import { alertPop } from "../../../../../scripts/message";
import sales_task from "../../../../../assets/icons/test/sales_task_icon.svg";

let years = [],
nextYear = moment().add(10, 'Y').format('YYYY');

for (let i = 2000; i <= nextYear; i++) {
    years.push(i.toString());
}

export default function SalesTargetList() {
    const [department, setDepartment] = useState();
    const [KAM, setKAM] = useState();
    const [salesTargetList, setSalesTargetList] = useState();
    const [searchValue, setSearchValue] = useState();
    const [startFrom, setStartFrom] = useState();
    const [endFrom, setEndFrom] = useState();
    const [departmentList, setDepartmentList] = useState();
    const [kamList, setKAMList] = useState();
    const [selectedYear, setSelectedYear] = useState(moment().format("YYYY"));
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState();
    const history = useHistory();

    const search = (value) => {
        setSearchValue(value);
    };

    const filter = (date) => {
        setStartFrom(date?.date_from);
        setEndFrom(date?.date_to);
    };

    const getDepartmentList = async () => {
        let url = DEPARTMENT_LIST;
        let res = await getData(url);
        if(res){
            let masterData = res?.data?.data;
            setDepartmentList(masterData);
        }
    }

    const getKAMList = async (id) => {
        let url = USER_LIST + "?department_id=" + id;
        let res = await getData(url);
        if(res){
            let masterData = res?.data?.data;
            setKAMList(masterData);
        }
    }

    const getSalesTargetList = async () => {
        let url = SALES_TARGET + `?&page=${currentPage}`;
        if(searchValue) url = url + '&search=' + searchValue;
        if(startFrom) url = url + '&from_date=' + startFrom;
        if(endFrom) url = url + '&to_date=' + endFrom;
        if(department) url = url + '&department_id=' + department;
        if(KAM) url = url + '&kam_id=' + KAM;
        if(selectedYear) url = url + '&year=' + selectedYear ;

        let res = await getData(url);
        if(res){
            let masterData = res?.data?.data?.data;
            setSalesTargetList(masterData);
            setPageCount(res?.data?.data?.last_page);
        }
    }

    useEffect(()=>{
        getDepartmentList();
    },[]);
       
    useEffect(()=>{
        getKAMList(department);
    },[department]);

    useEffect(()=>{
        getSalesTargetList();
    },[currentPage, department, searchValue, startFrom, endFrom, KAM, selectedYear])

    
    const columns = [
        {
          title: 'Company',
          dataIndex: 'company.name',
          key: 'company',
        },
        {
            title: 'Department',
            dataIndex: 'department.name',
            key: 'department',
        },
        {
            title: "KAM",
            key: "kam",
            render: (row) => <>
            {row?.service_head?.kam?.profile_pic 
                ?
                <Popover 
                    content={row?.service_head?.kam?.name}
                    placement="bottomLeft"
                >
                    <Avatar 
                        src={row?.service_head?.kam?.profile_pic}   
                        icon="user" 
                        size="medium"
                    />
                </Popover>
                : <Popover 
                        content={row?.service_head?.kam?.name}
                        placement="bottomLeft"
                    >
                        <Avatar 
                            icon="user" 
                            size="medium"
                            // style={{ backgroundColor: '#1e3799' }}
                        />
                    </Popover>
            }
            </>,
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
        },
        {
            title: 'Target',
            dataIndex: 'target_amount',
            key: 'target_amount',
        },
        {
            title: 'Industry Type',
            dataIndex: 'service_head.industry_type.name',
            key: 'industry_type',
        },
        {
            title: 'Industry Sector',
            dataIndex: 'service_head.industry_sector.name',
            key: 'industry_sector',
        },
        {
            title: 'Service Type',
            dataIndex: 'service_head.service_type.name',
            key: 'service_type',
        },
        {
            title: 'Service',
            dataIndex: 'service_head.service.full_name',
            key: 'service',
        },
        {
            title: 'Client',
            dataIndex: 'service_head.client.name',
            key: 'client',
        },
        {
            title: 'Type',
            dataIndex: 'service_head.type',
            key: 'type',
        },
        {
            title: "Action",
            key: "action",
            render: row => 
            <>
                <Button 
                    type="link"
                    onClick={()=>{
                        history.push(`/sales-dashboard/config-sales-target-update?row_id=${row.id}`)
                    }}
                >Edit</Button>
            </>,
        },
    ];

    return (
        <Wrapper>
            {/* <SearchFilter
                search={search}
                filter={filter}
                filterOptions={[{ type: "date_range" }]}
                failsafe
            /> */}


            <Flex space="1rem" justify="normal">
                <Button
                    width="30%" 
                    type="primary" 
                    style={{'marginRight': '1rem'}} 
                    onClick={() => history.push('/sales-dashboard/config-sales-target-create')}
                >
                    Create New Target
                </Button>

                <Select 
                    allowClear={false}
                    style={{width: '20%', 'marginRight': '1rem'}} 
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
                    allowClear={true} 
                    showSearch
                    style={{width: '20%', 'marginRight': '1rem'}} 
                    placeholder='Department' 
                    dropdownMatchSelectWidth={false}
                    onChange={(event)=>{
                        setDepartment(event);
                        setKAMList();
                        setKAM();
                    }}
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
                    showSearch
                    style={{width: '20%', 'marginRight': '1rem'}} 
                    placeholder='KAM' 
                    dropdownMatchSelectWidth={false}
                    value={KAM}
                    onChange={(event)=>setKAM(event)}
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {kamList?.map(kam=>{
                        return(
                            <Select.Option key={kam.emp_id} value={kam.emp_id}>{kam.name}</Select.Option>
                        )
                    })}
                </Select>
            </Flex>
            {salesTargetList ?
                <Table 
                    key={record => record.id}
                    dataSource={salesTargetList} 
                    columns={columns} 
                    rowKey={row=> row.id}
                    scroll={{ y: "calc(100vh - 16rem)" }}
                    pagination={{
                        current: currentPage,
                        total: pageCount * 10,
                        onChange: (page) => setCurrentPage(page),
                    }}
                />
                :<LandingContent/>
            }
        </Wrapper>
    )
}

const LandingContent = () => {
    return (
        <div className="landing-content mt-5" style={{textAlign: 'center'}}>
            <img src={sales_task} height="200"/>
            <h2>You Must Have Select Year And Month To Generate Data</h2>
        </div>
    )
}
