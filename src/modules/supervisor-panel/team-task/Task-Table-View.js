import React, { useState, useEffect} from 'react';
import {Select, Table, Button, Progress,Avatar,Popover ,Tag } from "antd";
import attachmentIcon from "../../../assets/attached.svg";
import {openAttchment,range} from "../../../scripts/helper";
import {alertPop} from "../../../scripts/message";


const TaskTableView = (props) =>{
    const {useActivity, updateCurrentPage, reviewRatingList,selectReview, selectRating, review, 
        detailsTaskModalOpenHandler, editTaskModalOpenHandler, pageCount, refresh, setCurrentPage, currentPage, 
        seMileStatus, nonBusiness, ratingRange, setRowData} = props;
 
    const paginate = (page) => setCurrentPage(page);


    useEffect(() => {
        updateCurrentPage(currentPage);
    }, [currentPage,refresh]);

    const columns = [
        {
            title: "Task Code",
            dataIndex: "code",
            key: "code",
        },
        {
            title: "TASK/ACTIVITY NAME",
            // dataIndex: "title",
            key: "title",
            render: (row) => <span style={row.isOverDue && (row.activity_status=== 'To-Do' || row.activity_status=== 'WIP') 
                ? {color: 'red'} : {}}> {row.title} </span>,
            width: '8%'
        },
        {
            title: nonBusiness ? "FUNCTION NAME" : "PROJECT NAME",
            // dataIndex: "project_details.name",
            key: "project_details.name",
            render: (row) => <p>{nonBusiness ? row?.function_activity?.name : row?.projects?.name}</p>
        },
        {
            title: "PRIORITY",
            // dataIndex: "activity_Priority.name",
            key: "activity_Priority.name",
            render: row => <p>{row?.activity_priority?.name}</p>
        },
        {
            title: nonBusiness ? "REPEAT" : "MILESTONE PROGRESS",
            render: (row) =>
            nonBusiness ? 
            <p>{row?.repeats}</p>
            :
            <>
                <p><strong>{row?.project_milestone?.milestone?.full_name}</strong>&nbsp;&nbsp;&nbsp;{row?.activity_status}</p>
                <p>Progress:&nbsp;<strong>{row?.project_milestone?.progress}&nbsp;%</strong></p>
                <Progress 
                    percent={row?.project_milestone?.progress}
                    status="success" 
                    showInfo={false}
                />
            </>,
            key: "milestone.progress",
            width: '9%'
        },
        {
            title: "Due Date",
            // dataIndex: "due_date",
            key: "due_date",
            render: (row) => <span style={row.isOverDue && (row.activity_status=== 'To-Do' || row.activity_status=== 'WIP') 
                ? {color: 'red'} : {}}> {row.due_date} </span>
        },
        {
            title: "Status",
            // dataIndex: "project_details.name",
            key: "activity_status",
            render: (row) => row.isOverDue && (row.status=== 'To-Do' || row.status=== 'WIP') 
            ? <Tag color="red" style={{backgroundColor: '#FFFFFF'}}>{row.status}</Tag>
            : row.status
        },
        {
            title: "Assignee",
            render: (row) => <>
            {row?.assigned_user?.profile_pic 
                ?
                <Popover 
                    content={row?.assigned_user?.name}
                    placement="bottomLeft"
                >
                    <Avatar 
                        src={row?.assigned_user?.profile_pic}   
                        icon="user" 
                        size="medium"
                    />
                </Popover>
                : <Popover 
                        content={row?.assigned_user?.name}
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
            key: "assignee",
        },
        {
            title: "ATTACHMENT",
            render: (row) => 
            <>
            {row.attachment ? 
                <img 
                    src={attachmentIcon} 
                    alt="attachement" 
                    style={{float: 'inherit', marginLeft: '10px', width:'1.5rem'}} 
                    onClick={() => {openAttchment(row.attachment)}}
                />:null     
            }    
            </>,
            key: "attachment",
            width: '8%'
        },
        // {
        //     title: "REVIEW",
        //     render: (row, value, index) => 
        //     <>
        //         <Select style={{width: '100%'}}
        //         showSearch
        //         placeholder="Select Review"
        //         optionFilterProp="children"
        //         // value={row?.reviewRating?.id || undefined}
        //         value={row?.review_status_id ? row?.review_status_id : row?.reviewRating ? row?.reviewRating?.id : undefined}
        //         onChange={(event)=>selectReview(event, row.id, index)}
        //         filterOption={(input, option) =>
        //           option.props.children
        //             .toLowerCase()
        //             .indexOf(input.toLowerCase()) >= 0
        //         }>
        //             {
        //                 reviewRatingList?.map(reviewRating=>{
        //                     return(
        //                         <Select.Option 
        //                             key={reviewRating.id} 
        //                             value={reviewRating.id}
        //                         >
        //                             {reviewRating.name}
        //                         </Select.Option>
        //                     )
        //                 })
        //             }
        //         </Select>
        //     </>,
        //     key: "review_status_id",
        //     width: '12%'
        // },
        // {
        //     title: "RATING",
        //     // dataIndex: "reviewRating",
        //     render: (row, value, index) => 
        //     <>
        //         <Select style={{width: '100%'}}
        //         showSearch
        //         placeholder="Select Rating"
        //         optionFilterProp="children"
        //         value={row?.review_rating || undefined}
        //         onChange={(event)=>selectRating(event,row.id, index)}
        //         filterOption={(input, option) =>
        //           option.props.children
        //             .toLowerCase()
        //             .indexOf(input.toLowerCase()) >= 0
        //         }>
        //             {ratingRange?.map(rating=>{
        //                 return(
        //                     <Select.Option 
        //                         key={rating} 
        //                         value={rating}
        //                     >
        //                         {rating}
        //                     </Select.Option>
        //                 )
        //             })
        //         }
        //         </Select>
        //     </>,
        //     key: "reviewRating",
        //     width: '12%'
        // },
        {
            title: "Action",
            render: (row) => (
                <>
                    <Button 
                        onClick={()=>{
                            detailsTaskModalOpenHandler(row);
                            setRowData(row);
                        }} 
                        type="link"
                    >
                         Details
                    </Button>
                    {/* <Button 
                        onClick={()=>editTaskModalOpenHandler(row)} type="link"
                    >
                        Edit
                    </Button> */}
                </>
            ),
            key: "action",
            width: '15%'
        },
    ];

    
    return(
        <>
            <Table 
                rowKey={record => record.id}
                dataSource={useActivity}  
                columns={columns}
                scroll={{ x: 1500, y: "calc(100vh - 10rem)" }}
                // pagination={false} 
                pagination={{
                    current: currentPage,
                    total: pageCount * 10,
                    onChange: (page) => paginate(page),
                }} 
                // style={{margin: '10px 0px'}}
            />
        </>
    )
}

export default TaskTableView;