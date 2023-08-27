import React, {useState, useEffect} from 'react'
import { Button, Table, Select, Row, Col, Modal } from "antd";
// import {dateFormat} from "../../scripts/helper";
import { getData } from '../../../scripts/api-service';
import { MANAGEMENT_DHASHBOARD } from '../../../scripts/api';
import TaskDetailsModal from '../activity-summary/task-details/TaskDetailsModal';
import moment from 'moment';

const { Option } = Select;

const MyComments = () => {
    const [dashboardData, setDashboardData] = useState();
    const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
    const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
    const [detailsModal, setDetailsModal] = useState(false);
    const [rowData, setRowData] = useState();

    const getDeshboardData = async () => {
        let url = MANAGEMENT_DHASHBOARD + "?";
        if(startDate && endDate) url = url + "comment_start_date=" + startDate + "&comment_end_date=" + endDate ;

        let res = await getData(url);

        if (res) {
            let masterData = res?.data?.data?.comments_data;
            setDashboardData(masterData);
        }
    };

    const handleChange = (value) => {
        if(value === 'Today'){
            setStartDate(moment().format("YYYY-MM-DD"));
            setEndDate(moment().format("YYYY-MM-DD"));
        }
        if(value === 'Tomorrow'){
            setStartDate(moment(moment().add(1, 'days')).format("YYYY-MM-DD"));
            setEndDate(moment(moment().add(1, 'days')).format("YYYY-MM-DD"));
        }
        if(value === 'Last-7-days'){
            setStartDate(moment(moment().subtract(7, 'days')).format("YYYY-MM-DD"));
            setEndDate(moment().format("YYYY-MM-DD"));
        }

        if (value === "Yesterday") {
            setStartDate(moment(moment().subtract(1, 'days')).format("YYYY-MM-DD"));
            setEndDate(moment(moment().subtract(1, 'days')).format("YYYY-MM-DD"));
        }
    }

    useEffect(() => {
        getDeshboardData();
    }, [startDate, endDate]);

    const columns = [
        {
            title: "PROJECT NAME",
            dataIndex: "activity",
            key: "activity",
            render: activity => <p>{activity.project.name}</p>
        },
        {
            title: "TASK NAME",
            dataIndex: "activity",
            key: "activity",
            render: activity => <p>{activity.title}</p>
        },
        {
            title: "COMMENT",
            dataIndex: "comment",
            key: "comment",
        },
        {
            title: "Comment DATE",
            dataIndex: "comment_date",
            key: "comment_date",
        },
        {
            title: "STATUS",
            dataIndex: "activity",
            key: "activity",
            render: activity => <p>{activity.status}</p>
        },
        {
            title: "ACTION",
            key: "action",
            render: (row) => <>
                <Button 
                    type="link" 
                    onClick={() => {
                        setDetailsModal(true); 
                        setRowData(row.activity.id);
                    }}  
                >Details</Button>
            </>,
        },
    ];

    return (
        <div className="dashboard-item p-3">
            {console.log('data', rowData)}
            <Row gutter={16} className="mb-3" style={{padding:'0px 10px'}}>
                <Col span={21}>
                    <h4><strong>My Comments</strong></h4>
                </Col>
                <Col span={3}>
                    <Select defaultValue="Today" style={{ width: 120 }} 
                        onChange={handleChange}
                    >
                        <Option value="Today">Today</Option>
                        <Option value="Yesterday">Yesterday</Option>
                        <Option value="Last-7-days">Last 7 days</Option>
                    </Select>
                </Col>
            </Row>
            <Table dataSource={dashboardData} columns={columns} pagination={false}/>

            <Modal
                title=""
                visible={detailsModal}
                width="60vw"
                onCancel={() => setDetailsModal(false)}
                footer={false}
            >    
                <TaskDetailsModal row={rowData} canUpdateStatus={true}/>     
            </Modal> 
        </div>
    )
}

export default MyComments;
