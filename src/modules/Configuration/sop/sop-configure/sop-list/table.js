import React, {useEffect, useState} from 'react';
import { Button, Divider, Modal, Table, Select, Icon, Progress, Tag } from "antd";
// import attachmentIcon from "../../../assets/attached.svg";
import {Wrapper} from "../../../../commons/Wrapper";
// import {openAttchment} from "../../../scripts/helper";
import {postData} from "../../../../../scripts/postData";
import {alertPop} from "../../../../../scripts/message";

export default function TaskTableView({useActivity, 
    updateCurrentPage, pageCount, detailsModalShow, 
    managementEditHandler, setCurrentPage, currentPage, setRowData, updateEvent}) {
    // const [currentPage, setCurrentPage] = useState(1);

    const activityStatusUpdateHandler = (event, row) => {
        let payload = { status : event }
        postData(`task/v1/activitiy-status-update/${row?.id}`, payload).then(res => {
            if (res?.data?.code == 201) {
                alertPop("success", "Successfully complete the process");
                updateEvent();
            } 
            else{
                alertPop("error", res[0]);
                // if (res?.data?.code == 422) {
                //     alertPop("error", res?.data?.messages[0]);
                // }else {
                //     alertPop("error", "Check your internet connection!");
                // }
            }
        });
    }

    // useEffect(() => {
    //     updateCurrentPage(currentPage);
    // }, [currentPage]);

    const paginate = (page) => setCurrentPage(page);


    const columns = [
        {
            title: "Department",
            // dataIndex: "department",
            key: "task_code",
            render: (row) => <span>
                    {row.code}
                </span>
        },
        {
            title: "Team",
            key: "title",
            render: (row) => <span style={row.isOverDue && (row.activity_status=== 'To-Do' || row.activity_status=== 'WIP') 
                ? {color: 'red'} : {}}> {row.title} </span>
        },
        {
            title: "SOP",
            // dataIndex: "project_name",
            key: "project_name",
            render: row => row.projects?.name
        },
        {
            title: "Created By",
            // dataIndex: "project_name",
            key: "project_name",
            render: row => row.projects?.name
        },
        {
            title: "STATUS",
            // dataIndex: "activity_status",
            key: "status",
            render: (row) =>
            <Select placeholder='Select Status'
                onChange={(event)=> activityStatusUpdateHandler(event, row)}
                // disabled={taskData?.status === 'Pending'}
                value={row.status}
            >
                <Select.Option key='Pending' value='Pending'>Pending</Select.Option>
                <Select.Option key='To-Do' value='To-Do'>To-Do</Select.Option>
                <Select.Option key='WIP' value='WIP'>WIP</Select.Option>
                <Select.Option key='Hold' value='Hold'>Hold</Select.Option>
                <Select.Option key='Done' value='Done'>Done</Select.Option>
                <Select.Option key='Reviewed' value='Reviewed'>Reviewed</Select.Option>
            </Select>
                 
        },
        {
            title: "Action",
            key: "action",
            render: (row) => <> 
                <Button 
                    type="link" 
                    onClick={() => {
                        detailsModalShow(row); 
                        setRowData(row);
                    }}>Details</Button>
                    <Button type="link" onClick={() => {managementEditHandler(row)}}>Edit</Button>
                </>,
        },
    ];

    return (
        <Wrapper>
            <Table 
                dataSource={useActivity}  columns={columns}
                // scroll={{ y: "calc(100vh - 28rem)" }}
                // pagination={{
                //     current: currentPage,
                //     total: pageCount * 10,
                //     onChange: (page) => paginate(page),
                // }} 
                pagination={false} 
            />
        </Wrapper>
    )
}
