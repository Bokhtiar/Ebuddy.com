import React, { useState, useEffect } from 'react'
import { Button, Modal, Table, Select, Tag, Row, Col, Form, Switch, Tooltip, Input } from "antd";
import SearchFilter from "../../commons/SearchFilter";
import { TableWrapper, Wrapper } from "../../commons/Wrapper";
import { Flex } from "../../commons/Flex";
import moment from "moment";
// import QuarterForm from "./QuarterForm";
// import QuarterCreateForm from "./QuarterCreateForm";
import {
    KAM_TARGET_PARAM,
    KAM_TARGET_LIST,
    CHANGE_PUNCH_ELIGIBILITIES,
    REMOTE_PUNCH_ELIGIBILITIES,
    DEPARTMENT_LIST
} from "../../../scripts/api";
import {getData,postData} from "../../../scripts/api-service";
import { alertPop } from "../../../scripts/message";
import sales_task from "../../../assets/icons/test/sales_task_icon.svg";
import demoUser from "../../../assets/dummy.jpg";

const years = [];
for(let i= 2000; i <= moment().format('YYYY'); i++) {
    years.push(i.toString());
}

export default function QuarterTargetList() {
    const [toggle, setToggle] = useState(false);
    const [pageCount, setPageCount] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [departmentList, setDepartmentList] = useState();
    const [department, setDepartment] = useState();
    const [employee, setEmployee] = useState({
        id: '',
        name: ''
    });
    const [list, setList] = useState();
    const [clickSwitch, setClickSwitch] = useState(false);

    const paginate = (page) => setCurrentPage(page);

    const handleChange = (checked, row) => {
        let formData = new FormData();
        if(checked) formData.append("punch_eligibility", 1);
        if(!checked) formData.append("punch_eligibility", 0);
        if(row?.emp_id) formData.append("emp_id", row?.emp_id);

        const url = CHANGE_PUNCH_ELIGIBILITIES;
        postData(url, formData).then(res => {
            if (res?.data?.code == 200) {
                alertPop("success", "Successfully complete the process");
                setClickSwitch(true);

                let users = [];

                list.forEach(data => {
                    if (data.id === res?.data?.data.id) users.push(res?.data?.data);
                    else users.push(data)
                });

                setList(users);
            }
            // else alertPop("error", "Check your internet connection");
        });
    }

    const handleEmployeeName = (event) => {
        setEmployee({
            ...employee,
            name: event.target.value
        });
    }

    const handleEmployeeID = (event) => {
        setEmployee({
            ...employee,
            id: event.target.value
        });
    }

    const getList = async() =>{
        let url = REMOTE_PUNCH_ELIGIBILITIES + `?page=${currentPage}`;
        if(department) url = url + '&department_id=' + department;
        if(employee?.name !== '') url = url + '&name=' + employee?.name;
        if(employee?.id !== '') url = url + '&emp_id=' + employee?.id;
        let res = await getData(url);
        if(res) {
            let masterData = res?.data?.data?.data;
            setPageCount(res?.data?.data?.last_page);
            setList(masterData);
        }
    }

    const getDepartments = async() =>{
        let url = DEPARTMENT_LIST ;
        let res = await getData(url);
        if(res) {
            let masterData = res?.data?.data;
            setDepartmentList(masterData);
        }
        else alertPop('error', "Cannot delete quarter target!");
    }

    useEffect(()=>{
        getList();
        getDepartments();
    },[]);

    useEffect(()=>{
        getList();
    },[toggle, currentPage]);

    const manageChack = (row) => {
        return row.punch_eligibility * 1;
    }

    const columns = [
        {
          title: 'Employee Name (ID)',
          key: 'year',
          render: (row) => <p>{row?.name} ({row?.emp_id})</p>
        },
        {
            title: 'Image',
            render: (row) => <Tooltip title={row?.name}>
                            <img src={row?.profile_pic || demoUser} width="25" height="25" alt={row?.name}/>
                        </Tooltip>,
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
        },
        {
            title: 'Designation',
            dataIndex: 'designation',
            key: 'designation',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: "Action",
            key: "action",
            render: row => 
            <>
                <Switch checked={manageChack(row)} 
                    onChange={(checked)=> handleChange(checked, row)} />
            </>,
        },
    ];

    return (
        <Wrapper>
            <Flex space="1rem" justify="normal">               
                <Select showSearch
                        style={{'marginRight': '1rem'}} 
                        placeholder='Select Department' 
                        onChange={(value)=>setDepartment(value)}
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        >
                        {
                            departmentList ? departmentList?.map(item => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>) : null
                        }
                </Select>

                <Input style={{'marginRight': '1rem'}} placeholder='Enter Employee Name' onChange={handleEmployeeName}/>
                <Input style={{'marginRight': '1rem'}} placeholder='Enter Employee ID' onChange={handleEmployeeID}/>
                <Button type="primary" icon="search" onClick={()=>setToggle(!toggle)}>Search</Button>
            </Flex>

            <Table 
                dataSource={list} 
                columns={columns} 
                rowKey={row=> row.id}
                pagination={{
                    current: currentPage,
                    total: pageCount * 10,
                    onChange: (page) => paginate(page),
                }}
            />
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
