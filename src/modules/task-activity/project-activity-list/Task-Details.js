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
import {getData} from "../../../scripts/api-service";
import {postData} from "../../../scripts/postData";
import {alertPop} from "../../../scripts/message";
import {
    TASK_ACTIVITY_ATTACHMENT_UPLOAD, REVIEW_STATUS_LIST, REVIEW_STATUS_LISTVIEW, REVIEW_STATUS_RANGE
} from "../../../scripts/api";
import attachmentIcon from "../../../assets/attached.svg";
import {openAttchment,range} from "../../../scripts/helper";
import { Fragment } from 'react';

const {Panel} = Collapse;

function callback(key) {
    // console.log(key);
}

const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
`;

export default function TaskDetails({activityDetails, setModal, updateEvent, page, reviewRatingList, selectReview, selectRating, tableBody, nonBusiness}) {
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
        review: activityDetails?.review_status?.id || activityDetails?.reviewRating?.id,
        rating: activityDetails?.activity_rating || activityDetails?.review_rating
    });
    const [image, setImage] = useState();
    const [activityId, setActivityId] = useState();
    const [eviewAndRating, setReviewAndRating] = useState();
    const [reviewRating, setReviewRating] = useState(activityDetails?.reviewRating || null);
    const [ratingRange, setRatingRange] = useState();

    // let image = ''
    const fileUploadHandler = async (event) => {
        let value = event.target.files[0];
        document.getElementById('attachemnt-name').innerHTML=value.name;

        const formData = new FormData();
        formData.append("file", value);

        let response = await postData(
            TASK_ACTIVITY_ATTACHMENT_UPLOAD + activityDetails?.id,
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

    const imageHandler = (event) =>{
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

    useEffect(() => {
        setDropdownData((prevState) => ({
            ...prevState,
            reporter: activityDetails?.reporter,
            assignee: prevState?.employee_list?.filter(employee => +employee?.emp_id === +activityDetails?.assignee?.emp_id)
        }))
        if(activityDetails?.project_details) dropDownDataSet(`/task/v1/activitiy-select-params/${activityDetails?.project_details?.id}`, false);
    }, []);

    const selectAssigneeHandle = (e) => {
        dropDownDataSet(`task/v1/activity/assigne/${e}`, 'reporter');

        setDropdownData((prevState) => ({
            ...prevState,
            assignee: prevState?.employee_list?.filter(employee => +employee.emp_id === +e)
        }));
        setPrepareDataForUpdate((prepState) => ({
            ...prepState,
            assignee: e,
        }));
        updateEvent();
    };

    const updateActivity = () => {
        let updateData = {
            title: prepareDataForUpdate?.title,
            // status: prepareDataForUpdate?.activity_status,
            assignee: prepareDataForUpdate?.assignee,
            reporter: prepareDataForUpdate?.reporter,
            start_date: prepareDataForUpdate?.start_date,
            due_date: prepareDataForUpdate?.due_date,
            parent_activity_id: prepareDataForUpdate?.parent_activity_id,
        };

        postData(`/task/v1/activitiy-details-update/${activityDetails?.id}`, updateData).then(res => {
            if (res?.data?.code == 201) {
                alertPop("success", "Successfully complete the process");
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
                activity_id: activityDetails?.id,
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

                    alertPop("success", "Successfully complete the process");
                } else {
                    // alertPop("error", "Check your internet connection!");
                    alertPop("error", res[0]);
                }
            });

            updateEvent();
        }
    }

    const activityStatusUpdateHandler = (status) => {
        setPrepareDataForUpdate((prevState) => ({
            ...prevState,
            activity_status: status,
        }));
        let payload = { status : status }
        postData(`task/v1/activitiy-status-update/${activityDetails?.id}`, payload).then(res => {
            if (res?.data?.code == 201) {
                alertPop("success", "Successfully complete the process");
                updateEvent();
            } else {
                // alertPop("error", "Check your internet connection!");
                alertPop("error", res[0]);
                updateEvent();
            }
        });
    }

    // useEffect(() => {
    //     if (prepareDataForUpdate && prevStatus && prepareDataForUpdate.activity_status && prepareDataForUpdate.assignee) {
    //         if (prevStatus !== prepareDataForUpdate.activity_status) {
    //             updateActivity();
    //         }
    //     }
    // }, [prepareDataForUpdate.activity_status]);

    const prevStatus = usePrevious(prepareDataForUpdate.activity_status);
    const prevAssignee = usePrevious(prepareDataForUpdate.assignee);
    const prevReporter = usePrevious(prepareDataForUpdate.activity_status);
    const prevReview = usePrevious(prepareDataForUpdate.review);
    const prevRating = usePrevious(prepareDataForUpdate.rating);

    // const updateTask = () => {
    //     updateActivity();
    // }

    const updateTaskReview = (event, activityId) => {
        setPrepareDataForUpdate((prevState) => ({
            ...prevState,
            review: event,
        }));
        selectReview(event, activityId);
        getReviewRatingRange(event);
        getReviewRating(event);
    }

    const getReviewRating = async (event) => {
        let res = await getData(REVIEW_STATUS_LISTVIEW);
        if (res) {
            setReviewRating(res?.data?.data)
        }
    }

    const getReviewRatingRange = async (event) => {
        let res = await getData(REVIEW_STATUS_RANGE + `/${event}`);
        if (res) {
            setRatingRange(res?.data?.data)
        }
    }

    const updateActivityRating = (event,activityId) => {
        setPrepareDataForUpdate((prevState) => ({
            ...prevState,
            rating: event,
        }));
        selectRating(event,activityId)
    }

    const showActivityType = (value) => {
        if (value) {
            if (typeof value === "string") return value;
            else if (value.name) return value.name;
            else return "N/A";
        } else return "N/A";
    }

    useEffect(()=>{       
        setActivityId(activityDetails?.id || 0);
    },[activityDetails, tableBody])

    return (
        <div>
            <Row gutter={32}>
                <Col span={18}>
                    <p><span>ID</span>{activityDetails?.id}</p>
                    <h2>{activityDetails?.title}</h2>
                </Col>
                <Col span={6}>
                    <Select style={{marginTop: '2rem'}} placeholder='Select Status'
                            onChange={activityStatusUpdateHandler}
                            disabled={activityDetails?.activity_status === 'Pending'}
                            value={prepareDataForUpdate?.activity_status}>
                        {prepareDataForUpdate?.activity_status === 'Pending' 
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
                                    disabled={prepareDataForUpdate?.activity_status === "To-Do" || prepareDataForUpdate?.activity_status === "WIP"}
                                            onChange={(event)=>{updateTaskReview(event, activityId)}}
                                            value={prepareDataForUpdate?.review || undefined}
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
                                        disabled={prepareDataForUpdate?.activity_status === "To-Do" || prepareDataForUpdate?.activity_status === "WIP"}
                                        optionFilterProp="children"
                                        value={prepareDataForUpdate?.rating || undefined}
                                        onChange={(event)=> updateActivityRating(event, activityId)}
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
                        </>:null
                    }
                    
                    {
                        activityDetails?.is_communication ? (
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
                                            <p>{activityDetails?.contact_person_details?.contact_name}</p>
                                            <p>{activityDetails?.contact_person_details?.contact_email}</p>
                                            <p>{activityDetails?.contact_person_details?.contact_mobile}</p>
                                            <p>{activityDetails?.contact_person_details?.client_department?.department_name}</p>
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
                            <p>{activityDetails?.note || 'N/A'}</p>
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
                                {prepareDataForUpdate?.comments?.map((comment, index) => (
                                    <Card key={`comment-${comment.id}-${index}`} style={{width: '100%'}}>
                                        <p>{comment.comment}</p>
                                    </Card>
                                ))}
                            </Panel>
                        </Collapse>
                    </div>

                    {/* <div className="mt-3">
                        <Button type="primary" style={{width: "100%"}} 
                        // onClick={updateTask}
                        >
                            Update Now
                        </Button>
                    </div> */}
                </Col>


                <Col span={7}>
                    <div className="mb-4">
                        <span>Parent Task/Activity</span>
                        <h3 className="mt-1">{activityDetails?.parent_activity?.title || 'N/A'}</h3>
                    </div>

                    <div className="mb-4">
                        <span>Activity Type</span>
                        <h3 className="mt-1">{showActivityType(activityDetails?.activity_type)}</h3> 
                    </div>
                    <div className="mb-4">
                        <span>Activity Repeat</span>
                        <h3 className="mt-1">{activityDetails?.repeats ? `${showActivityType(activityDetails?.repeats)} (${activityDetails?.start_date || ''} ~ ${activityDetails?.due_date || ''})` : 'N/A'}</h3> 
                    </div>

                    <div className="mb-4">
                        <span>Priority</span>
                        <h3 className="mt-1">{showActivityType(activityDetails?.activity_Priority)}</h3>
                    </div>

                    {nonBusiness ? 
                    <>
                    <div className="mb-4">
                        <span>Function Type</span>
                        <h3 className="mt-1">{activityDetails?.function_type?.name || 'N/A'}</h3>
                    </div>
                    <div className="mb-4">
                        <span>Function Name</span>
                        <h3 className="mt-1">{activityDetails?.function_activity?.name || 'N/A'}</h3>
                    </div></>
                    :
                    <>
                    <div className="mb-4">
                        <span>Project Name</span>
                        <h3 className="mt-1">{activityDetails?.project_details?.name || 'N/A'}</h3>
                    </div>

                    <div className="mb-4">
                        <span>Milestone Name</span>
                        <h3 className="mt-1">{activityDetails?.milestone?.full_name || 'N/A'}</h3>
                    </div></>}

                    <div className="mb-4">
                        <label>Assignee Name</label>
                        {/* <Select placeholder='Select Type'
                                defaultValue={activityDetails?.assignee?.emp_id}
                                onChange={selectAssigneeHandle}>
                            {dropdownData?.employee_list?.map((employee, index) =>
                                <Select.Option key={`employee-${index}-${employee.id}`}
                                               value={employee.emp_id}
                                >
                                    {employee.name}</Select.Option>
                            )}
                        </Select> */}
                        <h3 className="mt-1">{activityDetails?.assignee?.name || ''}</h3>
                    </div>

                    <div className="mb-4">
                        <span>Reporter Name</span>
                        <h3 className="mt-1">{dropdownData?.reporter?.name || ''}</h3>
                    </div>

                    <div className="mb-4">
                        <span>Start Date</span>
                        <h3 className="mt-1">{activityDetails?.start_date || ''}</h3>
                        {/*"March 18, 2021, 10:30 AM"*/}
                    </div>
                    <div className="mb-4">
                        <span>End Date</span>
                        <h3 className="mt-1">{activityDetails?.due_date || ''}</h3>
                        {/*"March 18, 2021, 10:30 AM"*/}
                    </div>
                    <div className="mb-4">
                        <span>Attachment</span><br /><br />
                        {image || activityDetails?.attachment ?
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
