import React, {useState, useEffect} from 'react'
import { Button, Table, Select, Row, Col, Avatar, Icon } from "antd";
import { Link } from 'react-router-dom';
import { getData } from '../../../scripts/api-service';
import { MANAGEMENT_DHASHBOARD, REVIEW_STATUS_LISTVIEW, SUPERVISOR_KAM_LIST } from '../../../scripts/api';
import moment from 'moment';
// import {dateFormat} from "../../scripts/helper";

const { Option } = Select;

const SupervisorTaskReview = () => {
    const [dashboardData, setDashboardData] = useState();
    const [milestoneReviewList, setMilestoneReviewList] = useState();
    const [supervisorList, setSupervisorList] = useState();
    const [supervisor, setSupervisor] = useState();
    const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
    const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
    const [status, setStatus] = useState("To-Do");
    const [review, setReview] = useState();

    const getSupervisorList = async () => {
        let res = await getData(SUPERVISOR_KAM_LIST);

        if (res) {
            let masterData = res?.data?.data;
            setSupervisorList(masterData);
        }
    }

    const getMilestoneReviewList = async () => {
        let res = await getData(REVIEW_STATUS_LISTVIEW);

        if (res) {
            let masterData = res?.data?.data;
            setMilestoneReviewList(masterData);
        }
    }

    const getDeshboardData = async () => {
        let url = MANAGEMENT_DHASHBOARD + "?";
        if(supervisor) url = url + "&task_supervisor=" + supervisor;
        if(startDate && endDate) url = url + "&comment_start_date=" + startDate + "&comment_end_date=" + endDate ;
        if(status) url = url + "&task_review_status=" + status ;
        if(review) url = url + "&task_review=" + review ;

        let res = await getData(url);

        if (res) {
            let masterData = res?.data?.data?.activity_data;
            setDashboardData(masterData);
        }
    };

    const handleChange = (value) =>{
        if(value === 'Today'){
            setStartDate(moment().format("YYYY-MM-DD"));
            setEndDate(moment().format("YYYY-MM-DD"));
        }
        if(value === 'Tomorrow'){
            setStartDate(moment().format("YYYY-MM-DD"));
            setEndDate(moment(moment().add(1, 'days')).format("YYYY-MM-DD"));
        }
        if(value === 'Last-7-days'){
            setStartDate(moment(moment().subtract(7, 'days')).format("YYYY-MM-DD"));
            setEndDate(moment().format("YYYY-MM-DD"));
        }
    }

    useEffect(()=>{
        getSupervisorList();
        getMilestoneReviewList();
    },[]);

    useEffect(() => {
        getDeshboardData();
    }, [supervisor, startDate, endDate, status, review]);


    const columns = [
        {
            title: "TASK NAME",
            dataIndex: "title",
            key: "title",
            width: 300
        },
        {
            title: "ASSIGNEE",
            dataIndex: "assignee",
            key: "assignee",
            render: assignee => 
            <div style={{display: 'flex'}}>
                <Avatar src={ assignee.profile_pic }   
                        size={64} 
                        icon="user" 
                        size="medium">
                </Avatar>
                <Link 
                    to={`/management-panel/task-summary?empId=${assignee.emp_id}`} 
                className="ml-2">
                    <p style={{textDecoration: 'underline', color:'#5BB7FF'}}>{assignee.name}</p>
                </Link>
            </div>
        },
        {
            title: "END DATE",
            dataIndex: "due_date",
            key: "due_date",
        },
        {
            title: "STATUS",
            dataIndex: "activity_status",
            key: "activity_status",
        },
        {
            title: "REVIEW",
            dataIndex: "reviewRating",
            key: "review.name",
            render: review => 
                <div> {
                    review &&
                        <p style={{color: review.color}}>{review.name}</p>
                    }
                </div> 
        },
        {
            title: "ACTION",
            key: "action",
            render: (row) => <>
                <Link to={'/management-panel/task-summary?empId=' + row?.assignee?.emp_id }>
                    <Button 
                        type="link" 
                        style={{border: '2px solid #5BB7FF',backgroundColor: 'white',color: '#5BB7FF'}}
                    >Details</Button>
                </Link>
            </>,
        },
    ];

    return (
        <div className="dashboard-item p-3">
            <Row gutter={16} className="mb-3" style={{padding:'0px 10px'}}>
                <Col span={12}>
                    <h4><strong>Supervisor Task Review</strong></h4>
                </Col>
                <Col span={3}>
                    <Select defaultValue="Supervisor" style={{ width: 120 }} 
                        onChange={(value)=>setSupervisor(value)}
                    >
                        {supervisorList ? supervisorList.map(data=>{
                            return(
                                <Option key={data.id} value={data.emp_id}>{data.name}</Option>
                            )
                        }):null}
                    </Select>
                </Col>
                <Col span={3}>
                    <Select defaultValue="Today" style={{ width: 120 }} 
                        onChange={handleChange}
                    >
                        <Option value="Today">Today</Option>
                        <Option value="Tomorrow">Tomorrow</Option>
                        <Option value="Last-7-days">Last 7 days</Option>
                    </Select>
                </Col>
                <Col span={3}>
                    <Select defaultValue="Status" style={{ width: 120 }} 
                        onChange={(value)=>setStatus(value)}
                    >
                        <Option value="To-Do">To-Do</Option>
                        <Option value="Wip">Wip</Option>
                        <Option value="Done">Done</Option>
                        <Option value="Reviewed">Reviewed</Option>
                    </Select>
                </Col>
                <Col span={3}>
                    <Select defaultValue="Review" style={{ width: 120 }} 
                        onChange={(value)=>setReview(value)}
                    >
                        {milestoneReviewList ? milestoneReviewList.map(list=>{
                            return(
                                <Option key={list.id} value={list.id}>{list.name}</Option>
                            )
                        }):null}
                    </Select>
                </Col>
            </Row>
            <Table dataSource={dashboardData} columns={columns} pagination={false}/>
        </div>
    )
}

export default SupervisorTaskReview;
