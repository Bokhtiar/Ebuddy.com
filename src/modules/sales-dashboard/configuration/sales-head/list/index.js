import React, { useState, useEffect } from 'react'
import { Button, Modal, Table, Select, Tag, Row, Col, Form, Popover, Avatar } from "antd";
import SearchFilter from "../../../../commons/SearchFilter";
import { TableWrapper, Wrapper } from "../../../../commons/Wrapper";
import { Flex } from "../../../../commons/Flex";
import moment from "moment";
import { useHistory } from "react-router-dom";
import {
    SALES_SERVICE_HEAD,
    KAM_TARGET_PARAM,
    DEPARTMENT_LIST,
    USER_LIST,
    INDUSTRY_TYPE_DROPDOWN_LIST,
    INDUSTRY_SECTOR_DROPDOWN_LIST,
    CLIENT_DROPDOWN_LIST,
    SERVICE_TYPE_DROPDOWN_LIST,
    SERVICE_SETUP_DROPDOWN_LIST
} from "../../../../../scripts/api";
import {getData,postData} from "../../../../../scripts/api-service";
import { alertPop } from "../../../../../scripts/message";
import sales_task from "../../../../../assets/icons/test/sales_task_icon.svg";

export default function Configuration() {
    const [industryType, setIndustryType] = useState();
    const [industrySector, setIndustrySector] = useState();
    const [serviceType, setServiceType] = useState();
    const [serviceName, setServiceName] = useState();
    const [client, setClient] = useState();
    const [department, setDepartment] = useState();
    const [KAM, setKAM] = useState();
    const [type, setType] = useState();
    const [status, setStatus] = useState();
    const [params, setParams] = useState();
    const [targetList, setTargetList] = useState();
    const [toggle, setToggle] = useState(false);
    const [rowData, setRowData] = useState();
    const [flag, setFlag] = useState();
    const [searchValue, setSearchValue] = useState();
    const [startFrom, setStartFrom] = useState();
    const [endFrom, setEndFrom] = useState();
    const [departmentList, setDepartmentList] = useState();
    const [kamList, setKAMList] = useState();
    const [industryTypeList, setIndustryTypeList] = useState();
    const [industrySectorList, setIndustrySectorList] = useState();
    const [clientList, setClientList] = useState();
    const [serviceTypeList, setServiceTypeList] = useState();
    const [serviceSetupList, setServiceSetupList] = useState();
    const [currentPage, setCurrentPage] = useState();
    const [pageCount, setPageCount] = useState();
    const history = useHistory();

    const search = (value) => {
        setSearchValue(value);
    };

    const filter = (date) => {
        setStartFrom(date?.date_from);
        setEndFrom(date?.date_to);
    };

    //get params
    const getKamTargetList = async () => {
        let url = KAM_TARGET_PARAM;
        let res = await getData(url);
        if(res){
            let masterData = res?.data?.data;
            setParams(masterData);
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

    const getKAMList = async (id) => {
        let url = USER_LIST + "?department_id=" + id;
        let res = await getData(url);
        if(res){
            let masterData = res?.data?.data;
            setKAMList(masterData);
        }
    }

    const getIndustryTypeList = async () => {
        let url = INDUSTRY_TYPE_DROPDOWN_LIST;
        let res = await getData(url);
        if(res){
            let masterData = res?.data?.data;
            setIndustryTypeList(masterData);
        }
    }

    const getIndustrySectorList = async (id) => {
        let url = INDUSTRY_SECTOR_DROPDOWN_LIST + "?industry_type_id=" + id;
        let res = await getData(url);
        if(res){
            let masterData = res?.data?.data;
            setIndustrySectorList(masterData);
        }
    }

    const getClientList = async (id) => {
        let url = CLIENT_DROPDOWN_LIST + "?industry_sector=" + id;
        let res = await getData(url);
        if(res){
            let masterData = res?.data?.data;
            setClientList(masterData);
        }
    }
    
    const getServiceTypeList = async () => {
        let url = SERVICE_TYPE_DROPDOWN_LIST;
        let res = await getData(url);
        if(res){
            let masterData = res?.data?.data;
            setServiceTypeList(masterData);
        }
    }
    
    const getServiceSetupList = async (id) => {
        let url = SERVICE_SETUP_DROPDOWN_LIST + "?service_type_id=" + id;
        let res = await getData(url);
        if(res){
            let masterData = res?.data?.data;
            setServiceSetupList(masterData);
        }
    }

    // get targer list
    const getSalesServiceHeadList = async () => {
        let url = SALES_SERVICE_HEAD + '?&page=' + currentPage;
        if(searchValue) url = url + '&search=' + searchValue;
        if(startFrom) url = url + '&from_date=' + startFrom;
        if(endFrom) url = url + '&to_date=' + endFrom;
        if(department) url = url + '&department_id=' + department;
        if(industryType) url = url + '&industry_type_id=' + industryType;
        if(industrySector) url = url + '&industry_sector_id=' + industrySector;
        if(serviceType) url = url + '&service_type_id=' + serviceType;
        if(serviceName) url = url + '&service_id=' + serviceName;
        if(client) url = url + '&client_id=' + client;
        if(KAM) url = url + '&kam_id=' + KAM;
        if(type) url = url + '&type=' + type;
        if(status) url = url + '&status=' + status;

        
        let res = await getData(url);
        let masterData = res?.data?.data?.data;
        setTargetList(masterData);
        setPageCount(res?.data?.data?.last_page);
    }

    useEffect(()=>{
        getDepartmentList();
        getSalesServiceHeadList();
        getKamTargetList();
        getIndustryTypeList();
        getServiceTypeList();
    },[]);
       
    useEffect(()=>{
        getKAMList(department);
    },[department]);

    useEffect(()=>{
        getIndustrySectorList(industryType);
    },[industryType]);

    useEffect(()=>{
        getClientList(industrySector);
    },[industrySector]);

    useEffect(()=>{
        getServiceSetupList(serviceType);
    },[serviceType]);

    useEffect(()=>{
        getSalesServiceHeadList();
    },[currentPage, department, searchValue, startFrom, endFrom, industryType, industrySector, KAM, serviceType, serviceName, client, toggle, type, status])

    const columns = [
        {
          title: 'Code',
          dataIndex: 'code',
          key: 'code',
          width: '20%'
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Industry Type',
            dataIndex: 'industry_type.name',
            key: 'industry_type.name',
        },
        {
            title: 'Industry Sector',
            dataIndex: 'industry_sector.name',
            key: 'industry_sector.name',
        },
        {
            title: 'Service Type',
            dataIndex: 'service_type.name',
            key: 'service_type.name'
        },
        {
            title: 'Service',
            dataIndex: 'service.full_name',
            key: 'service.full_name'
        },
        {
            title: 'Client',
            dataIndex: 'client.name',
            key: 'client.name',
        },
        {
            title: "KAM",
            render: (row) => <>
            {row?.kam?.profile_pic 
                ?
                <Popover 
                    content={row?.kam?.name}
                    placement="bottomLeft"
                >
                    <Avatar 
                        src={row?.kam?.profile_pic}   
                        icon="user" 
                        size="medium"
                    />
                </Popover>
                : <Popover 
                        content={row?.kam?.name}
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
            key: "kam",
        },
        {
            title: "Action",
            key: "action",
            render: row => 
            <>
                <Button 
                    type="link"
                    onClick={()=>{
                        history.push(`/sales-dashboard/config-sales-head-update?row_id=${row.id}`)
                    }}
                >Edit</Button>
            </>,
        },
    ];

    
    return (
        <Wrapper>
            <SearchFilter
                search={search}
                filter={filter}
                filterOptions={[{ type: "date_range" }]}
                failsafe
            />

            <Flex space="1rem" justify="normal">
                <Button
                    type="primary" 
                    style={{width: '20%', marginRight: '1rem'}} 
                    onClick={() => history.push('/sales-dashboard/config-sales-head-create')}
                >
                    Create Service Head
                </Button>

                <Select 
                    allowClear={true} 
                    showSearch
                    style={{width : '20%', 'marginRight': '1rem'}} 
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
                    style={{width : '20%', 'marginRight': '1rem'}} 
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

                <Select 
                    allowClear={true} 
                    showSearch
                    style={{width : '20%', 'marginRight': '1rem'}} 
                    placeholder='Industry Type' 
                    dropdownMatchSelectWidth={false}
                    onChange={(event)=>{
                        setIndustryType(event);
                        setIndustrySectorList();
                        setClientList();
                        setIndustrySector();
                        setClient();
                    }}
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {industryTypeList?.map(industryType=>{
                        return(
                            <Select.Option key={industryType.id} value={industryType.id}>{industryType.name}</Select.Option>
                        )
                    })}
                </Select>

                <Select 
                    allowClear={true} 
                    showSearch
                    style={{width : '20%', 'marginRight': '1rem'}} 
                    placeholder='Industry' 
                    dropdownMatchSelectWidth={false}
                    value={industrySector}
                    onChange={(event)=>{
                        setIndustrySector(event);
                        setClientList();
                        setClient();
                    }}
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {industrySectorList?.map(industrySector=>{
                        return(
                            <Select.Option key={industrySector.id} value={industrySector.id}>{industrySector.name}</Select.Option>
                        )
                    })}
                </Select>
            </Flex>
            <Flex space="1rem" justify="normal">
                <Select 
                    allowClear={true} 
                    showSearch
                    style={{width : '20%', 'marginRight': '1rem'}} 
                    placeholder='Client' 
                    dropdownMatchSelectWidth={false}
                    value={client}
                    onChange={(event)=>setClient(event)}
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {clientList?.map(client=>{
                        return(
                            <Select.Option key={client.id} value={client.id}>{client.name}</Select.Option>
                        )
                    })}
                </Select>

                <Select 
                    allowClear={true} 
                    showSearch
                    style={{width : '20%', 'marginRight': '1rem'}} 
                    placeholder='Service Type' 
                    dropdownMatchSelectWidth={false}
                    onChange={(event)=>{
                        setServiceType(event);
                        setServiceSetupList();
                        setServiceName();
                    }}
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {serviceTypeList?.map(serviceType=>{
                        return(
                            <Select.Option key={serviceType.id} value={serviceType.id}>{serviceType.name}</Select.Option>
                        )
                    })}
                </Select>

                <Select 
                    allowClear={true} 
                    showSearch
                    style={{width : '20%', 'marginRight': '1rem'}} 
                    placeholder='Service' 
                    dropdownMatchSelectWidth={false}
                    value={serviceName}
                    onChange={(event)=>setServiceName(event)}
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {serviceSetupList?.map(service=>{
                        return(
                            <Select.Option key={service.id} value={service.id}>{service.name}</Select.Option>
                        )
                    })}
                </Select>

                <Select 
                    allowClear={true} 
                    showSearch
                    style={{width : '20%', 'marginRight': '1rem'}} 
                    placeholder='Type' 
                    dropdownMatchSelectWidth={false}
                    onChange={(event)=>setType(event)}
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Select.Option key="Monetary" value="Monetary">Monetary</Select.Option>
                    <Select.Option key="Acquisition" value="Acquisition">Acquisition</Select.Option>
                </Select>

                <Select 
                    allowClear={true} 
                    showSearch
                    style={{width : '20%', 'marginRight': '1rem'}} 
                    placeholder='Status' 
                    dropdownMatchSelectWidth={false}
                    onChange={(event)=>setStatus(event)}
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Select.Option key={1} value="1">Active</Select.Option>
                    <Select.Option key={0} value="0">Inactive</Select.Option>
                </Select>
            </Flex>

            {targetList ?
                <Table 
                    key={record => record.id}
                    dataSource={targetList} 
                    columns={columns} 
                    rowKey={row=> row.id}
                    scroll={{ x: 2000, y: 550 }}
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
