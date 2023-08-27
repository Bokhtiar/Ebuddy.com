import React, { useState, useEffect } from 'react'
import { Button, Modal, Table, Select, Tag, Row, Col, Form } from "antd";
import SearchFilter from "../../commons/SearchFilter";
import { TableWrapper, Wrapper } from "../../commons/Wrapper";
import { Flex } from "../../commons/Flex";
import moment from "moment";
import QuarterForm from "./QuarterForm";
import QuarterCreateForm from "./QuarterCreateForm";
import {
    KAM_TARGET_PARAM,
    KAM_TARGET_LIST,
    KAM_TARGET_DELETE
} from "../../../scripts/api";
import {getData,postData} from "../../../scripts/api-service";
import { alertPop } from "../../../scripts/message";
import sales_task from "../../../assets/icons/test/sales_task_icon.svg";

const years = [];
for(let i= 2000; i <= moment().format('YYYY'); i++) {
    years.push(i.toString());
}

export default function QuarterTargetList() {
    const [quarterModal, setQuarterModal] = useState(false);
    const [quarterCreateModal, setQuarterCreateModal] = useState(false);
    const [year, setYear] = useState(moment().format('YYYY'));
    const [quarter, setQuarter] = useState();
    const [KAM, setKAM] = useState();
    const [serviceType, setServiceType] = useState();
    const [serviceName, setServiceName] = useState();
    const [params, setParams] = useState();
    const [targetList, setTargetList] = useState();
    const [toggle, setToggle] = useState(false);
    const [rowData, setRowData] = useState();
    const [flag, setFlag] = useState();

    const search = (serach) => {
        
    };

    const filter = (date) => {
        
    };

    const localSubmit = () => {

    } 

    const handleDelete = async(id) =>{
        let url = KAM_TARGET_DELETE + '/' + id;
        let res = await getData(url);
        if(res) {
            alertPop('success', "Quarter target deleted successfully!");
            setToggle(!toggle);
        }
        else alertPop('error', "Cannot delete quarter target!");
    }

    
    useEffect(()=>{
        //get params
        const getKamTargetList = async () => {
            let url = KAM_TARGET_PARAM;
            let res = await getData(url);
            let masterData = res?.data?.data;
            setParams(masterData);
        }
        getKamTargetList();
    },[])
       
    useEffect(()=>{
        // get targer list
        const getQuarterTargetList = async () => {
            let url = KAM_TARGET_LIST + '?';
            if(year) url = url + 'year=' + year;
            if(quarter) url = url + '&quarter=' + quarter;
            if(KAM) url = url + '&kam_id=' + KAM;
            if(serviceType) url = url + '&service_type_id=' + serviceType;
            if(serviceName) url = url + '&service_id=' + serviceName;

            let res = await getData(url);
            let masterData = res?.data?.data?.data;
            setTargetList(masterData);
        }
        getQuarterTargetList();
    },[year, quarter, KAM, serviceType, serviceName, toggle])

    const columns = [
        {
          title: 'Year',
          dataIndex: 'year',
          key: 'year',
        },
        {
            title: 'Quarter',
            dataIndex: 'target_quarter',
            key: 'target_quarter',
        },
        {
            title: 'Kam',
            dataIndex: 'kam',
            render: kam => <p>{kam.name}</p>
        },
        {
            title: 'Client',
            dataIndex: 'client',
            render: client => <p>{client.name}</p>
        },
        {
            title: 'Service',
            dataIndex: 'service',
            render: service => <p>{service.short_name}</p>
        },
        {
            title: 'OTC',
            dataIndex: 'otc_amount',
            key: 'otc_amount',
        },
        {
          title: 'MRC/AMC',
          dataIndex: 'mrc_amount',
          key: 'mrc_amount',
        },
        {
          title: 'TOTAL',
          key: 'total',
          render: (row) => <Tag color="blue">{row.otc_amount + row.mrc_amount}</Tag>
        },
        {
            title: "Action",
            key: "action",
            render: row => 
            <>
                <Button 
                    type="link"
                    onClick={()=>{
                        setQuarterModal(true);
                        setRowData(row);
                        setFlag("edit")
                    }}
                >Edit</Button>
                <Button 
                    type="link" 
                    style={{color:'red'}} 
                    onClick={()=>handleDelete(row.id)}
                >Delete</Button>
                {/* <Button type="link">Details</Button> */}
            </>,
        },
    ];

    return (
        // <TableWrapper>
        <Wrapper>
            <SearchFilter
                search={search}
                filter={filter}
                filterOptions={[{ type: "date_range" }]}
                failsafe
            />

            <Flex space="1rem" justify="normal">
                <Button
                    width="40%" type="primary" style={{'marginRight': '1rem'}} onClick={() => {
                        setQuarterCreateModal(true);
                        setFlag("create");
                    }}>
                    Create New Quarterly Target
                </Button>
                
                <Select allowClear={true} showSearch
                        style={{width : '9rem', 'marginRight': '1rem'}} 
                        placeholder='Select Year' 
                        onChange={(event)=>setYear(event)}
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        defaultValue={moment().format('YYYY')}
                        >
                        {
                            years.map(year => <Select.Option key={year} value={year}>{year}</Select.Option>)
                        }
                </Select>

                <Select allowClear={true} showSearch
                        style={{width : '9rem', 'marginRight': '1rem'}} 
                        placeholder='Quarter Filter' 
                        onChange={(event)=>setQuarter(event)}
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
                    <Select.Option value="Quarter 1">Quarter 1</Select.Option>
                    <Select.Option value="Quarter 2">Quarter 2</Select.Option>
                    <Select.Option value="Quarter 3">Quarter 3</Select.Option>
                    <Select.Option value="Quarter 4">Quarter 4</Select.Option>
                </Select>

                <Select allowClear={true} showSearch
                        style={{width : '9rem', 'marginRight': '1rem'}} 
                        placeholder='Select KAM' 
                        onChange={(event)=>setKAM(event)}
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
                            {params?.kam.map(kam=>{
                                return(
                                    <Select.Option key={kam.emp_id} value={kam.emp_id}>{kam.name}</Select.Option>
                                )
                            })}
                </Select>

                <Select allowClear={true} showSearch
                        style={{width : '9rem', 'marginRight': '1rem'}} 
                        placeholder='Service Type' 
                        onChange={(event)=>setServiceType(event)}
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
                            {params?.service_type.map(service=>{
                                return(
                                    <Select.Option key={service.id} value={service.id}>{service.name}</Select.Option>
                                )
                            })}
                </Select>

                <Select allowClear={true} showSearch
                        style={{width : '9rem', 'marginRight': '1rem'}} 
                        placeholder='Service Filter' 
                        onChange={(event)=>setServiceName(event)}
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
                            {params?.service.map(service=>{
                                return(
                                    <Select.Option key={service.id} value={service.id}>{service.full_name}</Select.Option>
                                )
                            })}
                </Select>
            </Flex>

            {targetList ?
            <Table dataSource={targetList} columns={columns} rowKey={row=> row.id}/>
            :<LandingContent/>
            }

            <Modal
                title="New Quarterly Target"
                visible={quarterCreateModal}
                footer={false}
                width="60vw"
                onCancel={() => {setQuarterCreateModal(false)}}
            >
                <QuarterCreateForm 
                    years={years}
                    setQuarterModal={setQuarterCreateModal}
                    quarterModal={quarterCreateModal}
                    flag={flag}
                    setToggle={setToggle}
                    toggle={toggle}
                >
                </QuarterCreateForm>
            </Modal>

            <Modal
                title="New Quarterly Target"
                visible={quarterModal}
                footer={false}
                width="60vw"
                onCancel={() => {setQuarterModal(false)}}
            >
                <QuarterForm 
                    years={years}
                    setQuarterModal={setQuarterModal}
                    quarterModal={quarterModal}
                    rowData={rowData}
                    flag={flag}
                    setToggle={setToggle}
                    toggle={toggle}
                >
                </QuarterForm>
            </Modal>
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
