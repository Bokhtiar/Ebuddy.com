import React, {useEffect, useRef, useState} from 'react';
import {
    Input,
    Col,
    Row,
    Select,
    Card,
    Collapse,
    Button, 
} from "antd";
import { useHistory } from "react-router-dom";
import {getData} from "../../scripts/api-service";
import {postData} from "../../scripts/postData";
import {alertPop} from "../../scripts/message";
import {
    TASK_ACTIVITY_ATTACHMENT_UPLOAD, REVIEW_STATUS_LIST, REVIEW_STATUS_LISTVIEW, REVIEW_STATUS_RANGE, ACTIVITY_DETAILS_BY_TASK, ACTIVITY_REVIEW_UPDATE
} from "../../scripts/api";
import attachmentIcon from "../../assets/attached.svg";
import {openAttchment,range} from "../../scripts/helper";
import { Fragment } from 'react';
import demoUser from "../../assets/dummy.jpg";

const {Panel} = Collapse;

const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
`;

export default function TaskDetails({setModal, updateEvent, page, reviewRatingList, tableBody, nonBusiness, rowData, updatedStatus, boardViewStatusFlag, setStatus}) {

    const [taskData, setTaskData] = useState();
    const [commentFlag, setCommentFlag] = useState(false);
    const [statusFlag, setStatusFlag] = useState(false);
    const [ratingRange, setRatingRange] = useState();
    const [reviewRating, setReviewRating] = useState();
    const [review, setReview] = useState();
    const [rating, setRating] = useState();
    const [reviewRatingDisabled, setReviewRatingDisabled] = useState(false);
    const history = useHistory();

    const fileUploadHandler = async (event) => {
        let value = event.target.files[0];
        document.getElementById('attachemnt-name').innerHTML=value.name;

        const formData = new FormData();
        formData.append("file", value);

        let response = await postData(
            TASK_ACTIVITY_ATTACHMENT_UPLOAD + taskData?.id,
            formData
        );
        
        if (response) {
            let masterData = response.data.data;
            if (masterData) {
                // setImage(masterData.attachment)
            }
            alertPop("success", "Successfully complete the process");
            getModalData();
            updateEvent();
        }
        document.getElementById('attachemnt-name').innerHTML='';
    }

    const commentHandler = (e) => {
        if (+e?.keyCode === 13 || +e?.charCode === 13) {
            if(e.target.value.trim() === '') return alertPop("error", "Invalid comment");
            else{
                postData(`task/v1/activity-comments-create`, {
                    activity_id: taskData?.id,
                    comment: e.target.value,
                    status: 1, //confirm by api developer
                }).then(res => {
                    if (res?.data?.code == 201) {
                        setCommentFlag(true);
                        setTimeout(() => {
                            let ele = document.getElementById('js-comment-text');
                            ele.value = '';
                        }, 500)
    
                        alertPop("success", "Successfully complete the process");
                    } else {
                        alertPop("error", res[0]);
                        // alertPop("error", "Check your internet connection!");
                    }
                });
            }
        }
    }

    const activityStatusUpdateHandler = (status) => {
        let payload = { status : status }
        postData(`task/v1/activitiy-status-update/${taskData?.id}`, payload).then(res => {
            if (res?.data?.code == 201) {
                if(res?.data?.data?.status) setStatus(res?.data?.data?.status);
                alertPop("success", "Successfully complete the process");
                setStatusFlag(true);
                updateEvent();
                getModalData();
                // if(res?.data?.data?.status !== 'Done' || res?.data?.data?.status !== 'Reviewed'){
                //     setReviewRatingDisabled(true);
                // }
                // if(res?.data?.data?.status === 'Done' || res?.data?.data?.status === 'Reviewed'){
                //     setReviewRatingDisabled(false);
                // }
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

    const updateTaskReview = async(value, id) => {
        let rating = 0
        //update review data
        const reviewData = {
            review_status: parseInt(value),
            review_rating: parseInt(rating) || 0
        }
        let res = await postData(`${ACTIVITY_REVIEW_UPDATE}${id}`,reviewData);
        if (res?.data?.code == 201 || res?.data?.code == 200) {
            let masterData = res?.data?.data;
            setReview(masterData?.review_status_id);
            alertPop("success", "Successfully complete the process");
        }
        else{
            alertPop("error", res[0]);
            // if (typeof res === "object" && res?.length > 0) {
            //     alertPop("error", res[0]);
            // }else {
            //     alertPop("error", "Check your internet connection!");
            // }
        }
        getReviewRatingRange(value);
    }

    const updateActivityRating = async(value, id) => {
        //update review data
        const reviewData = {
            review_status: parseInt(review),
            review_rating: parseInt(value) || 0
        }
        let res = await postData(`${ACTIVITY_REVIEW_UPDATE}${id}`,reviewData);
        if (res) {
            let masterData = res?.data?.data;
            setReview(masterData?.review_status_id);
            setRating(masterData?.review_rating);
            alertPop("success", "Successfully complete the process");
            updateEvent();
        }
    }

    const getReviewRating = async () => {
        let res = await getData(REVIEW_STATUS_LISTVIEW);
        if (res) {
            setReviewRating(res?.data?.data)
        }
    }

    const getReviewRatingRange = async (reviewId) => {
        let res = await getData(REVIEW_STATUS_RANGE + `/${reviewId}`);
        if (res) {
            setRatingRange(res?.data?.data);
        }
    }

    const getModalData = async () =>{
        let res = await getData(ACTIVITY_DETAILS_BY_TASK + `/${rowData?.id}`);
        if (res) {
            setTaskData(res?.data?.data);
        }
    }

    useEffect(()=>{
        if(rowData?.id || commentFlag || statusFlag || review || rating) getModalData();
    },[rowData, commentFlag, statusFlag, review, rating]);

    
    // useEffect(()=>{
    //     if(updatedStatus !== 'Done' || updatedStatus !== 'Reviewed'){
    //         setReviewRatingDisabled(true);
    //     }
    //     if(updatedStatus === 'Done' || updatedStatus === 'Reviewed'){
    //         setReviewRatingDisabled(false);
    //     }
    // },[updatedStatus]);

    return (
        <div>
            <Row gutter={32}>
                <Col span={18}>
                    <p><span>ID # </span>{taskData?.id}</p>
                    <h2>{taskData?.title}</h2>
                </Col>
                <Col span={6}>
                    <Select style={{marginTop: '2rem'}} placeholder='Select Status'
                        onChange={activityStatusUpdateHandler}
                        disabled={taskData?.status === 'Pending'}
                        value={boardViewStatusFlag === 'board-view' ? updatedStatus : taskData?.status}
                    >
                        {taskData?.status === 'Pending' 
                        ? <Select.Option key='Pending' value='Pending'>Pending</Select.Option> : ''}
                        <Select.Option key='To-Do' value='To-Do'>To-Do</Select.Option>
                        <Select.Option key='WIP' value='WIP'>WIP</Select.Option>
                        <Select.Option key='Hold' value='Hold'>Hold</Select.Option>
                        <Select.Option key='Done' value='Done'>Done</Select.Option>
                        <Select.Option key='Reviewed' value='Reviewed'>Reviewed</Select.Option>
                    </Select>
                </Col>
            </Row>
            <hr className="line-top-border"/>
            <br/>
            <Row gutter={32}>
                <Col span={17} style={{borderRight: '1px solid #ccc'}}>
                    <Row gutter={32}>
                        <Col span={12}>
                            <h4>Review</h4>
                            <Select style={{marginTop: '1rem'}} placeholder='Select Review'
                            disabled={taskData?.status === "Pending" || taskData?.status === "To-Do" || taskData?.status === "WIP" || taskData?.status === "Hold"}
                            // disabled={reviewRatingDisabled}
                                    onChange={(event)=>{updateTaskReview(event, taskData?.id)}}
                                    value={taskData?.review?.id || review || undefined}
                            >
                                {
                                    reviewRatingList?.map(reviewRating=>{
                                        return(
                                            <Select.Option 
                                                key={reviewRating.id} 
                                                value={reviewRating.id}
                                            >
                                                {reviewRating.name}
                                            </Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        </Col>
                        <Col span={12}>
                            <h4>Rating</h4>
                            <Select style={{width: '100%',marginTop: '1rem'}}
                                showSearch
                                placeholder="Select Rating Value"
                                disabled={taskData?.status === "Pending" || taskData?.status === "To-Do" || taskData?.status === "WIP" || taskData?.status === "Hold"}
                                // disabled={reviewRatingDisabled}
                                optionFilterProp="children"
                                value={taskData?.review_rating || rating || undefined}
                                onChange={(event)=> updateActivityRating(event, taskData?.id)}
                                filterOption={(input, option) =>
                                option.props.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                                }>
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
                        </Col>
                    </Row>
                    <br/>
                    <hr className="line-top-border"/>
                    <br/>
                    
                    {
                        taskData?.is_communication ? (
                            <Fragment>
                                <div>
                                    <p>Communicated Person Information</p>
                                    <Row gutter={32}>
                                        <Col span={24} className="ml-2">
                                            <p>Name - {taskData?.contact_person?.contact_name}</p>
                                            <p>Email - {taskData?.contact_person?.contact_email}</p>
                                            <p>Mobile - {taskData?.contact_person?.contact_mobile}</p>
                                            <p>Department - {taskData?.contact_person?.client_department?.department_name}</p>
                                        </Col>
                                    </Row>
                                </div>

                                <hr className="line-top-border"/>
                                <br/>
                            </Fragment>
                        )
                        : ''
                    }
                    
                    <div>
                        <p>Details</p>
                        <Card style={{width: '100%'}}>
                            <p>{taskData?.note || 'N/A'}</p>
                        </Card>
                    </div>

                    <hr className="line-top-border"/>
                    <br/>
                    <div className="file-upload-content">
                        <label htmlFor="file-upload-field">Attachment</label>
                        <div className="file-upload-wrapper" data-text="">
                            <span className="attacment-filename" id="attachemnt-name"></span>
                            <input 
                                name="file-upload-field" type="file" className="file-upload-field" value=""onChange={fileUploadHandler}
                                accept=".jpeg,.bmp,.png,.jpg,.pdf,.doc,.docx, .xlsx"
                            />
                        </div>
                    </div>
                    <br />
                    <hr className="line-top-border"/>

                    <div style={{marginTop: '1rem'}}>
                        <p>Comments</p>
                        <Input onKeyDown={commentHandler} id='js-comment-text'/>

                        <Collapse 
                            accordion 
                            defaultActiveKey={1} 
                            // onChange={callback} 
                            style={{marginTop: '1rem'}}>
                            <Panel header="All Comments" key="1">
                                {taskData?.comments?.map((comment, index) => (
                                    <Card key={`comment-${comment.id}-${index}`} style={{width: '100%'}}>
                                        <div style={{margin: "10px 0px"}}>
                                            <img src={comment?.created_by?.profile_pic || demoUser} width="25" height="25" />
                                            <span style={{marginLeft: "10px"}}>{comment?.created_by?.name}</span>
                                        </div>
                                        <p>{comment.comment}</p>
                                    </Card>
                                ))}
                            </Panel>
                        </Collapse>
                    </div>
                    <div 
                        style={{
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            margin: '1rem'
                        }}
                    >
                        <Button 
                            type="primary" 
                            size="large"
                            onClick={()=> {
                                setModal(false);
                                history.push(`/task-activity/task-sub-activity-create?activity_id=${rowData?.id}&delegate=yes`);
                            }}
                        >Delegate
                        </Button>
                        <Button 
                            type="primary" 
                            size="large"
                            onClick={()=> {
                                setModal(false);
                                history.push(`/task-activity/task-sub-activity-create?activity_id=${rowData?.id}&delegate=no&sub_task=yes`)
                            }}
                        >Sub Task
                        </Button>
                    </div>
                </Col>

                <Col span={7}>
                    <div className="mb-4">
                        <span>Parent Task/Activity</span>
                        <h3 className="mt-1">{taskData?.parent?.title || 'N/A'}</h3>
                    </div>

                    <div className="mb-4">
                        <span>Activity Type</span>
                        <h3 className="mt-1">{taskData?.activity_type?.name}</h3> 
                    </div>
                    <div className="mb-4">
                        <span>Activity Repeat</span>
                        <h3 className="mt-1">{taskData?.repeats ? `${taskData?.repeats} (${taskData?.start_date || ''} ~ ${taskData?.due_date || ''})` : 'N/A'}</h3> 
                    </div>

                    <div className="mb-4">
                        <span>Priority</span>
                        <h3 className="mt-1">{taskData?.activity_priority?.name}</h3>
                    </div>

                    {nonBusiness ? 
                    <>
                    <div className="mb-4">
                        <span>Function Type</span>
                        <h3 className="mt-1">{taskData?.function_type?.name || 'N/A'}</h3>
                    </div>
                    <div className="mb-4">
                        <span>Function Name</span>
                        <h3 className="mt-1">{taskData?.function_activity?.name || 'N/A'}</h3>
                    </div></>
                    :
                    <>
                    <div className="mb-4">
                        <span>Project Name</span>
                        <h3 className="mt-1">{taskData?.projects?.name || 'N/A'}</h3>
                    </div>

                    <div className="mb-4">
                        <span>Milestone Name</span>
                        <h3 className="mt-1">{taskData?.project_milestone?.milestone?.full_name || 'N/A'}</h3>
                    </div></>}

                    <div className="mb-4">
                        <label>Assignee Name</label>
                        <h3 className="mt-1">{taskData?.assigned_user?.name || ''}</h3>
                    </div>

                    <div className="mb-4">
                        <span>Reporter Name</span>
                        <h3 className="mt-1">{taskData?.reporter_user?.name || ''}</h3>
                    </div>

                    <div className="mb-4">
                        <span>Start Date</span>
                        <h3 className="mt-1">{taskData?.start_date || ''}</h3>
                        {/*"March 18, 2021, 10:30 AM"*/}
                    </div>
                    <div className="mb-4">
                        <span>End Date</span>
                        <h3 className="mt-1">{taskData?.due_date || ''}</h3>
                        {/*"March 18, 2021, 10:30 AM"*/}
                    </div>
                    <div className="mb-4">
                        <span>Estimated Time (Minutes)</span>
                        <h3 className="mt-1">{taskData?.estimated_time || ''}</h3>
                    </div>
                    <div className="mb-4">
                        <span>Attachment</span><br /><br />
                        {taskData?.attachment ?
                            <img 
                                src={attachmentIcon} 
                                alt="attachement" 
                                style={{float: 'left', marginTop: '-3px', width:'1.5rem'}} 
                                onClick={() => {openAttchment(taskData?.attachment)}}
                            />:null
                        }
                        
                    </div>
                </Col>
            </Row>
        </div>
    )
}
