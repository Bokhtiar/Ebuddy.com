import React, { useState, useEffect} from 'react';
import {Select, Table, Button, Progress,Avatar,Popover ,Tag, Checkbox } from "antd";
import attachmentIcon from "../../../../assets/attached.svg";
import {openAttchment,range} from "../../../../scripts/helper";
import {alertPop} from "../../../../scripts/message";

const ActivityTableView = (props) =>{
    const {useActivity, reviewRatingList, selectReview, review, selectRating, detailsTaskModalOpenHandler, pageCount, setCurrentPage, currentPage, ratingRange, setRowData, rowSelection} = props;

    const [approvalChecked, setApprovalChecked] = useState([]);

 
    const showChecked = (itemId) => {
        let findIdx = approvalChecked.findIndex(item => item === itemId);
        return findIdx === -1 ? false : true;
    }

    const stausCheckHandel = (checked, itemId) => {
        if (checked) {
            setApprovalChecked(oldArray => [...oldArray, itemId])
        } else {
            let billIds = [...approvalChecked];

            let idx = billIds.findIndex(i => i === itemId);
            billIds.splice(idx, 1);
            setApprovalChecked(billIds)
        }
    };

    const paginate = (page) => setCurrentPage(page);

    const columns = [
        // {
        //     title: "",
        //     key: "id",
        //     render: (row) => 
        //     <Checkbox 
        //         // checked={showChecked(row.id)} 
        //         // onChange={e => { stausCheckHandel(e.target.checked, row.id) }}
        //         // disabled={row.status !== 'Approved By Dept' ? true : false}
        //     ></Checkbox>,
        // },
        {
            title: "Activity Code",
            dataIndex: "code",
            key: "code",
        },
        {
            title: "Activity Name",
            key: "title",
            render: (row) => row.title,
        },
        {
            title: "Function Type",
            key: "function_type",
            render: (row) => row?.function_type?.name
        },
        {
            title: "Function Name",
            key: "function_name",
            render: (row) => row?.function_name?.name
        },
        {
            title: "Priority",
            key: "priority",
            render: row => row?.priority?.name
        },
        {
            title: "Due Date",
            key: "due_date",
            render: (row) => row.due_date
        },
        {
            title: "Status",
            key: "status",
            render: (row) => (row?.status=== 'To-Do' || row?.status=== 'WIP') 
            ? <Tag color="red" style={{backgroundColor: '#FFFFFF'}}>{row.status}</Tag>
            : row?.status
        },
        {
            title: "Assignee",
            render: (row) => <>
            {row?.assignee?.profile_pic 
                ?
                <Popover 
                    content={row?.assignee?.name}
                    placement="bottomLeft"
                >
                    <Avatar 
                        src={row?.assignee?.profile_pic}   
                        icon="user" 
                        size="medium"
                    />
                </Popover>
                : 
                <Popover 
                    content={row?.assignee?.name}
                    placement="bottomLeft"
                >
                    <Avatar 
                        icon="user" 
                        size="medium"
                    />
                </Popover>
            }
            </>,
            key: "assignee",
        },
        {
            title: "Attachement",
            key:"attachement",
            render: (row) => 
            <>
            {row?.attachment ? 
                <img 
                    src={attachmentIcon} 
                    alt="attachement" 
                    style={{float: 'inherit', marginLeft: '10px', width:'1.5rem'}} 
                    onClick={() => {openAttchment(row?.attachment)}}
                />:null     
            }    
            </>,
            key: "attachment",
            width: '10%'
        },
        {
            title: "Review",
            render: (row, value, index) => 
            <>
                <Select 
                    style={{width: '100%'}}
                    showSearch
                    placeholder="Review"
                    optionFilterProp="children"
                    value={row?.review_status_id ? row?.review_status_id : undefined}
                    onChange={(value)=>{
                        selectReview(value, row.id, index);
                    }}
                    filterOption={(input, option) =>
                    option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {reviewRatingList?.map(reviewRating=>{
                        return(
                            <Select.Option 
                                key={reviewRating.id} 
                                value={reviewRating.id}
                            >
                                {reviewRating.name}
                            </Select.Option>
                        )
                    })}
                </Select>
            </>,
            key: "review_status_id",
            width: '12%'
        },
        {
            title: "Rating",
            render: (row, value, index) => 
            <>
                <Select 
                    style={{width: '100%'}}
                    showSearch
                    placeholder="Rating"
                    optionFilterProp="children"
                    value={row?.review_rating || undefined}
                    onChange={(event)=>selectRating(event,row.id, index)}
                    filterOption={(input, option) =>
                    option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {ratingRange?.map(rating=>{
                        return(
                            <Select.Option 
                                key={rating} 
                                value={rating}
                            >
                                {rating}
                            </Select.Option>
                        )
                    })
                }
                </Select>
            </>,
            key: "reviewRating",
            width: '12%'
        },
        {
            title: "Action",
            render: (row) => (
                <Button 
                    onClick={()=>{
                        detailsTaskModalOpenHandler(row);
                        setRowData(row);
                    }} 
                    type="link"
                >
                        Details
                </Button>
            ),
            key: "action",
        },
    ];

    
    return(
        <Table 
            rowKey={record => record.id}
            rowSelection={rowSelection}
            dataSource={useActivity}  
            columns={columns}
            scroll={{ x: "100rem", y: "calc(100vh - 20rem)" }} 
            pagination={{
                current: currentPage,
                total: pageCount * 10,
                onChange: (page) => paginate(page),
            }} 
        />
    )
}

export default ActivityTableView;