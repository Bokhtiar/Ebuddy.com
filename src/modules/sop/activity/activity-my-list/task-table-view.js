import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import { Button, Divider, Modal, Table, Select, Icon, Progress, Tag } from "antd";
import attachmentIcon from "../../../../assets/attached.svg";
import {Wrapper} from "../../../commons/Wrapper";
import {openAttchment} from "../../../../scripts/helper";
import {postData} from "../../../../scripts/postData";
import {alertPop} from "../../../../scripts/message";
import { useNotification } from '../../../../scripts/helper';

export default function TaskTableView({useActivity, pageCount, detailsModalShow, managementEditHandler, setCurrentPage, currentPage, setRowData, updateEvent, statusUpdateApi}) {

    const { getUnreadNotifications } = useNotification();

    const activityStatusUpdateHandler = (value, row) => {
        let payload = { 'status' : value }
        postData(`${statusUpdateApi}/${row?.id}`, payload).then(res => {
            if (res) {
                alertPop("success", "Successfully complete the process");
                getUnreadNotifications();
                updateEvent();
            } 
            else{
                alertPop("error", res[0]);
            }
        });
    }
    

    const paginate = (page) => setCurrentPage(page);

    const columns = [
        {
            title: "Company",
            key: "company_name",
            render: (row) => <span>
                    {row?.company?.name}
                </span>
        },
        {
            title: "Activity Code",
            key: "activity_code",
            render: (row) => <span>
                    {row.code}
                </span>
        },
        {
            title: "Activity Initiate Code",
            key: "activity_initiate_code",
            render: (row) => <span>
                    {row.initiate_code}
                </span>
        },
        {
            title: "Activity Name",
            key: "title",
            render: (row) => <span style={row.isOverDue && (row.activity_status=== 'To-Do' || row.activity_status=== 'WIP') 
                ? {color: 'red'} : {}}> {row.title} </span>
        },
        {
            title: "Function Type",
            key: "function_type",
            render: row => row.function_type?.name
        },
        {
            title: "Function Name",
            key: "function_name",
            render: (row) => row.function_name?.name
        },
        {
            title: "Repeats",
            key: "repeats",
            render: (row) => row.repeats
        },
        {
            title: "Priority",
            key: "priority",
            render: (row) => row.priority?.name
        },
        {
            title: "Due Date",
            dataIndex: "due_date",
            key: "due_date",
        },
        // {
        //     title: "Repeats",
        //     key: "repeats",
        //     render: (row) => row?.repeats ? row?.repeats : ''
        // },
        {
            title: "Status",
            key: "status",
            render: (row) =>
            <Select 
                placeholder='Select Status'
                onChange={(value)=> activityStatusUpdateHandler(value, row)}
                value={row.status}
                disabled={row.status === 'Reviewed' ? true : false}
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
            title: "Estimated Time(Mins)",
            key: "estimation_time",
            render: (row) => row?.estimation_time,
        },
        {
            title: "REVIEW",
            key: "review",
            render: (row) => <span style={{color: row?.review?.color}}>{row?.review?.name}</span>,
        },
        {
            title: "Attachment",
            key: "attachment",
            render: (row) =><span>
                {row.attachment ? <img src={attachmentIcon} onClick={() => {openAttchment(row.attachment)}} alt="attachement" width="25" height="25" /> : ''}
            </span> ,
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
                    }}
                >Details</Button>
                <Button 
                    type="link" 
                    onClick={() => {managementEditHandler(row)}}
                >
                    <Link 
                        to={`/sop/list-sop-activity-update?id=${row?.id}&type=user`}>
                        Edit
                    </Link>
                </Button>
            </>,
        },
    ];

    return (
        <Wrapper>
            <Table 
                rowKey={record => record.id}
                dataSource={useActivity}  columns={columns}
                scroll={{ y: "calc(100vh - 20rem)" }} 
                pagination={{
                    current: currentPage,
                    total: pageCount * 10,
                    onChange: (page) => paginate(page),
                }} 
            />
        </Wrapper>
    )
}
