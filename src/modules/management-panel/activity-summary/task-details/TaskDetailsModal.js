import React, {Fragment, useEffect, useRef, useState} from 'react';
import {
    Input,
    Col,
    Row,
    Select,
    Card,
    Collapse,
    Button, 
} from "antd";
import {getData} from "../../../../scripts/api-service";
import {postData} from "../../../../scripts/postData";
import {alertPop} from "../../../../scripts/message";
import {
    TASK_ACTIVITY_ATTACHMENT_UPLOAD, REVIEW_STATUS_LISTVIEW, ACTIVITY_DETAILS_BY_TASK, REVIEW_STATUS_LIST
} from "../../../../scripts/api";
import attachmentIcon from "../../../../assets/attached.svg";
import {openAttchment,range} from "../../../../scripts/helper";

const {Panel} = Collapse;

function callback(key) {
    // console.log(key);
}

const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
`;

export default function TaskDetailsModal({activityDetails, updateEvent, page, reviewRatingList, selectReview, selectRating, rowId, canUpdateStatus, nonBusiness}) {
    const [dropdownData, setDropdownData] = useState({});

    const [prepareDataForUpdate, setPrepareDataForUpdate] = useState({
        project_id: activityDetails?.project_details?.id,
        project_milestone_id: activityDetails?.milestone?.id,
        title: activityDetails?.title,
        parent_activity_id: activityDetails?.parent_activity?.id,
        start_date: activityDetails?.start_date,
        due_date: activityDetails?.due_date,
        activity_priority_id: activityDetails?.activity_Priority?.id,
        assignee: activityDetails?.assignee?.emp_id,
        reporter: activityDetails?.reporter?.emp_id,
        is_communication: activityDetails?.is_communication,
        communication_medium: activityDetails?.communication_medium,
        client_department_id: activityDetails?.contact_person_details?.client_id,
        note: activityDetails?.note,
        milestone_status_id: activityDetails?.milestone?.id,
        activity_status: activityDetails?.activity_status,
        activity_type_id: activityDetails?.activity_type?.id,
        comments: activityDetails?.comments || [],
        review: activityDetails?.review_status?.id,
        rating: activityDetails?.activity_rating
    });
    const [image, setImage] = useState();
    const [activityId, setActivityId] = useState();
    const [reviewList, setReviewList] = useState();
    const [review, setReview] = useState();
    const [activityStatus, setActivityStatus] = useState();
    const [rowData, setRowData] = useState();
    const [reviewRating, setReviewRating] = useState(rowData?.reviewRating || null);

    // let image = ''
    const fileUploadHandler = async (event) => {
        let value = event.target.files[0];
        document.getElementById('attachemnt-name').innerHTML=value.name;

        const formData = new FormData();
        formData.append("file", value);

        let response = await postData(
            TASK_ACTIVITY_ATTACHMENT_UPLOAD + rowId,
            formData
        );
        
        if (response) {
            let masterData = response.data.data;
            if (masterData) {
                setImage(masterData.attachment)
            }
            alertPop("success", "Successfully complete the process");
        }
        document.getElementById('attachemnt-name').innerHTML='';
    }


    const dropDownDataSet = (url, key) => {
        getData(url).then(res => {
            if (key) {
                setDropdownData((preState) => ({
                    ...preState,
                    [key]: res?.data?.data || []
                }));
                if (key === 'reporter') {
                    setPrepareDataForUpdate((prepState) => ({
                        ...prepState,
                        reporter: res?.data?.data?.empid,
                    }));
                }
            } else {
                setDropdownData((preState) => ({
                    ...preState,
                    ...res?.data?.data || {}
                }));
            }
        });
    }

    const updateActivity = () => {
        let updateData = {
            title: prepareDataForUpdate?.title,
            status: prepareDataForUpdate?.activity_status,
            assignee: prepareDataForUpdate?.assignee,
            reporter: prepareDataForUpdate?.reporter,
            start_date: prepareDataForUpdate?.start_date,
            due_date: prepareDataForUpdate?.due_date,
            parent_activity_id: prepareDataForUpdate?.parent_activity_id,
        };

        postData(`/task/v1/activitiy-details-update/${activityDetails?.id}`, updateData).then(res => {
            if (res?.data?.code == 201) {
                alertPop("success", "Successfully compete the process");
                updateEvent();
            } else {
                alertPop("error", res[0]);
                // alertPop("error", "Check your internet connection!");
                updateEvent();
            }
        });
    }

    const commentHandler = (e) => {
        if (+e?.keyCode === 13 || +e?.charCode === 13) {

            postData(`task/v1/activity-comments-create`, {
                activity_id: rowId,
                comment: e.target.value,
                status: 1, //confirm by api developer
            }).then(res => {
                if (res?.data?.code == 201) {
                    setPrepareDataForUpdate((prevState) => ({
                        ...prevState,
                        comments: [...(prevState?.comments || []), {
                            comment: res?.data?.data?.comment,
                            created_at: res?.data?.data?.created_at,
                            id: res?.data?.data?.id,
                        }],
                    }));

                    setTimeout(() => {
                        let ele = document.getElementById('js-comment-text');
                        ele.value = '';
                    }, 500)

                    alertPop("success", "Successfully compete the process");
                } else {
                    alertPop("error", res[0]);
                    // alertPop("error", "Check your internet connection!");
                }
            });

            getRowData();
        }
    }

    const updateActivityRating = (event,activityId) => {
        setPrepareDataForUpdate((prevState) => ({
            ...prevState,
            rating: event,
        }));
        selectRating(event,activityId)
    }

    const updateTaskReview = (event, activityId) => {
        setPrepareDataForUpdate((prevState) => ({
            ...prevState,
            review: event,
        }));
        selectReview(event, activityId);
        getReviewRating(event);
    }

    const getReviewRating = async (event) => {
        let res = await getData(REVIEW_STATUS_LIST + `/${event}`);
        if (res) {
            setReviewRating(res?.data?.data)
        }
    }

    const showActivityType = (value) => {
        if (value) {
            if (typeof value === "string") return value;
            else if (value.name) return value.name;
            else return "N/A";
        } else return "N/A";
    }

    const getReviewList = async (event) => {
        let res = await getData(REVIEW_STATUS_LISTVIEW);
        if (res) {
            setReviewList(res?.data?.data)
        }
    }

    const getRowData = async () => {
        let res = await getData(ACTIVITY_DETAILS_BY_TASK + "/" + rowId);
        // let res = await getData('task/v1/activitiy-list-all');

        if (res) {
            setRowData(res?.data?.data);
        }
    }

    useEffect(()=>{
        if(rowId) getRowData();
    },[rowId]);

    useEffect(()=>{    
        getReviewList();   
        setActivityStatus(rowData?.activity_status || null);
        setPrepareDataForUpdate((prevState) => ({
            ...prevState,
            review: rowData?.review_status?.id,
            rating: rowData?.activity_rating
        }));
    },[rowData])

    return (
        <div>
            <Row gutter={32}>
                <Col span={18}>
                    <p><span>ID #</span>{rowData?.id}</p>
                    <h2>{rowData?.title}</h2>
                </Col>
                <Col span={6}>
                    <Select style={{marginTop: '2rem'}} placeholder='Select Status'
                            // onChange={activityStatusUpdateHandler}
                            disabled={canUpdateStatus}
                            value={rowData?.activity_status}
                    >
                        {rowData?.activity_status === 'Pending' 
                        ? <Select.Option key='Pending' value='Pending'>Pending</Select.Option> : ''}
                        <Select.Option key='To-Do' value='To-Do'>To-Do</Select.Option>
                        <Select.Option key='WIP' value='WIP'>WIP</Select.Option>
                        <Select.Option key='Done' value='Done'>Done</Select.Option>
                        <Select.Option key='Reviewed' value='Reviewed'>Reviewed</Select.Option>
                    </Select>
                </Col>
            </Row>
            <hr className="line-top-border"/>
            <br/>
            <Row gutter={32}>
                <Col span={17} style={{borderRight: '1px solid #ccc'}}>
                    {page === 'task-review' ? 
                        <>
                            <Row gutter={32}>
                                <Col span={12}>
                                    <h4>Review</h4>
                                    <Select style={{marginTop: '1rem'}} placeholder='Select Review'
                                            onChange={(event)=>{updateTaskReview(event, activityId)}}
                                            value={rowData?.review?.id || undefined}
                                            disabled={rowData?.activity_status === "To-Do" || rowData?.activity_status === "WIP"}
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
                                        placeholder="Select Review"
                                        optionFilterProp="children"
                                        disabled={rowData?.activity_status === "To-Do" || rowData?.activity_status === "WIP"}
                                        value={rowData?.review_rating || undefined}
                                        onChange={(event)=> updateActivityRating(event, activityId)}
                                        filterOption={(input, option) =>
                                        option.props.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                        }>
                                            {range(reviewRating?.start_rating, reviewRating?.end_rating)?.map(rating=>{
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
                        </>:null
                    }                    
                    {
                        rowData?.is_communication ? (
                            <Fragment>
                                <div>
                                    <p>Communicated Person Information</p>
                                    <Row gutter={32}>
                                        <Col span={6}>
                                            <p>Name -</p>
                                            <p>Email -</p>
                                            <p>Mobile -</p>
                                            <p>Department -</p>
                                        </Col>
                                        <Col span={18}>
                                            <p>{rowData?.contact_person?.contact_name || 'N/A'}</p>
                                            <p>{rowData?.contact_person?.contact_email || 'N/A'}</p>
                                            <p>{rowData?.contact_person?.contact_mobile || 'N/A'}</p>
                                            <p>{rowData?.contact_person?.client_department?.department_name || 'N/A'}</p>
                                        </Col>
                                    </Row>
                                </div>

                                <hr className="line-top-border"/>
                                <br/>
                            </Fragment>
                        ): ''
                    } 
                    
                    <div>
                        <p>Details</p>
                        <Card style={{width: '100%'}}>
                            <p>{rowData?.note || 'N/A'}</p>
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

                        <Collapse accordion defaultActiveKey={1} onChange={callback} style={{marginTop: '1rem'}}>
                            <Panel header="All Comments" key="1">
                                {rowData?.comments?.map((comment, index) => (
                                    <Card key={`comment-${comment.id}-${index}`} style={{width: '100%'}}>
                                        <p>{comment.comment}</p>
                                    </Card>
                                ))}
                            </Panel>
                        </Collapse>
                    </div>
                </Col>


                <Col span={7}>
                    <div className="mb-4">
                        <span>Parent Task/Activity</span>
                        <h3 className="mt-1">{rowData?.parent?.title || 'N/A'}</h3>
                    </div>

                    <div className="mb-4">
                        <span>Activity Type</span>
                        <h3 className="mt-1">{showActivityType(rowData?.activity_type)}</h3> 
                    </div>

                    <div className="mb-4">
                        <span>Priority</span>
                        <h3 className="mt-1">{showActivityType(rowData?.activity_priority?.name)}</h3>
                    </div>

                    {nonBusiness ? 
                    <>
                    <div className="mb-4">
                        <span>Function Type</span>
                        <h3 className="mt-1">{rowData?.function_type?.name || 'N/A'}</h3>
                    </div>
                    <div className="mb-4">
                        <span>Function Name</span>
                        <h3 className="mt-1">{rowData?.function_activity?.name || 'N/A'}</h3>
                    </div></>
                    :
                    <>
                    <div className="mb-4">
                        <span>Project Name</span>
                        <h3 className="mt-1">{rowData?.projects?.name || 'N/A'}</h3>
                    </div>

                    <div className="mb-4">
                        <span>Milestone Name</span>
                        <h3 className="mt-1">{rowData?.project_milestone?.milestone?.full_name || 'N/A'}</h3>
                    </div></>}

                    <div className="mb-4">
                        <label>Assignee Name</label>
                        <h3 className="mt-1">{rowData?.assigned_user?.name || ''}</h3>
                    </div>

                    <div className="mb-4">
                        <span>Reporter Name</span>
                        <h3 className="mt-1">{rowData?.reporter_user?.name || ''}</h3>
                    </div>

                    <div className="mb-4">
                        <span>Start Date</span>
                        <h3 className="mt-1">{rowData?.start_date || ''}</h3>
                    </div>
                    <div className="mb-4">
                        <span>End Date</span>
                        <h3 className="mt-1">{rowData?.due_date || ''}</h3>
                    </div>
                    <div className="mb-4">
                        <span>Attachment</span><br /><br />
                        {image || rowData?.attachment ?
                            <img 
                                src={attachmentIcon} 
                                alt="attachement" 
                                style={{float: 'left', marginTop: '-3px', width:'1.5rem'}} 
                                onClick={() => {openAttchment(image || activityDetails?.attachment)}}
                            />:null
                        }
                        
                    </div>
                </Col>
            </Row>

      </div>
    )
}

function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();
    // Store current value in ref
    useEffect(() => {
        ref.current = value;
    }, [value]); // Only re-run if value changes
    // Return previous value (happens before update in useEffect above)
    return ref.current;
}
