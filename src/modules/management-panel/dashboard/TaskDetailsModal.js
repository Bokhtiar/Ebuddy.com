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
    TASK_ACTIVITY_ATTACHMENT_UPLOAD, REVIEW_STATUS_LISTVIEW
} from "../../../scripts/api";
import attachmentIcon from "../../../assets/attached.svg";
import {openAttchment,range} from "../../../scripts/helper";

const {Panel} = Collapse;

function callback(key) {
    // console.log(key);
}

const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
`;

export default function TaskDetailsModal({activityDetails, setModal, updateEvent, page, reviewRatingList, selectReview, selectRating, tableBody, rowData}) {
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
        review: activityDetails?.reviewRating?.id,
        rating: activityDetails?.review_rating
    });
    const [image, setImage] = useState();
    const [activityId, setActivityId] = useState();
    const [reviewList, setReviewList] = useState();
    const [review, setReview] = useState();
    const [activityStatus, setActivityStatus] = useState();

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
        // console.log('image',event.target.value)
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

                    alertPop("success", "Successfully compete the process");
                } else {
                    alertPop("error", res[0]);
                    // alertPop("error", "Check your internet connection!");
                }
            });

            updateEvent();
        }
    }

    const getReviewList = async (event) => {
        let res = await getData(REVIEW_STATUS_LISTVIEW);
        if (res) {
            setReviewList(res?.data?.data)
        }
    }

    useEffect(()=>{    
        getReviewList();   
        setActivityStatus(rowData?.activity.status || null);
        setReview(rowData?.review_status || null);
    },[rowData])

    return (
        <div>
            {console.log('row',rowData)}
            <Row gutter={32}>
                <Col span={18}>
                    <p><span>ID</span>#{rowData.activity.id}</p>
                    <h2>{rowData.activity.title}</h2>
                </Col>
                <Col span={6}>
                    <Select style={{marginTop: '2rem'}} placeholder='Select Status'
                    value={activityStatus}>
                        <Select.Option key='Reviewed' value='Reviewed'>Reviewed</Select.Option>
                        <Select.Option key='Pending' value='Pending'>Pending</Select.Option> 
                        <Select.Option key='To-Do' value='To-Do'>To-Do</Select.Option>
                        <Select.Option key='WIP' value='WIP'>WIP</Select.Option>
                        <Select.Option key='Done' value='Done'>Done</Select.Option>
                    </Select>
                </Col>
            </Row>
            <hr className="line-top-border"/>
            <br/>
            <Row gutter={32}>
                <Col span={17} style={{borderRight: '1px solid #ccc'}}>
                        <>
                            <Row gutter={32}>
                                <Col span={24}>
                                    <h4>Supervisor Review</h4>
                                    <Select style={{marginTop: '1rem'}} placeholder='Supervisor Review'
                                    // onChange={(value)=>setReview(value)}
                                    // value={review}
                                    >
                                        {
                                            reviewList?.map(review=>{
                                                return(
                                                    <Select.Option 
                                                        key={review.id}
                                                        value={review.id}
                                                        style={{color: review?.color ? review?.color : 'black'}}
                                                    >
                                                        {review.name}
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
                        </>                    

                    <h3 style={{marginBottom: '1rem'}}>Already Communicated</h3>
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
                                <p>{rowData.contact_person_details ? rowData.contact_person_details?.contact_name : 'N/A'}</p>
                                <p>{rowData.contact_person_details ? rowData.contact_person_details?.contact_email : 'N/A'}</p>
                                <p>{rowData.contact_person_details ? rowData.contact_person_details?.contact_mobile : 'N/A'}</p>
                                <p>{rowData.contact_person_details ? rowData.contact_person_details?.client_department?.department_name : 'N/A'}</p>
                            </Col>
                        </Row>
                    </div>

                    <hr className="line-top-border"/>
                    <br/>

                    <div>
                        <p>Remarks</p>
                        <Card style={{width: '100%'}}>
                            <p>N/A</p>
                        </Card>
                    </div>

                    <hr className="line-top-border"/>
                    <br/>
                    <div style={{marginTop: '1rem'}}>
                        <p>Comments</p>
                        <Input onKeyDown={commentHandler} id='js-comment-text'/>

                        <Collapse accordion defaultActiveKey={1} 
                        onChange={callback} 
                        style={{marginTop: '1rem'}}>
                            <Panel header="All Comments" key="1">
                                {/* {prepareDataForUpdate?.comments?.map((comment, index) => ( */}
                                    <Card key={1} style={{width: '100%'}}>
                                        <p>Dummy Comment</p>
                                    </Card>
                                {/* ))} */}
                            </Panel>
                        </Collapse>
                    </div>

                    <div className="mt-3">
                        <Button type="primary" style={{width: "100%"}} 
                        // onClick={updateTask}
                        >
                            Update Now
                        </Button>
                    </div>
                </Col>


                <Col span={7}>
                    <div className="mb-4">
                        <span>Parent Task/Activity</span>
                        <h3 className="mt-1">{rowData.parent_activity ? rowData.parent_activity.title : 'N/A'}</h3>
                    </div>

                    <div className="mb-4">
                        <span>Activity Type</span>
                        <h3 className="mt-1">{rowData.activity_type ? rowData.activity_type.name : 'N/A'}</h3> 
                    </div>

                    <div className="mb-4">
                        <span>Priority</span>
                        <h3 className="mt-1">{rowData.activity_Priority ? rowData.activity_Priority.name : 'N/A'}</h3>
                    </div>

                    <div className="mb-4">
                        <span>Project Name</span>
                        <h3 className="mt-1">{rowData.activity.project.description}</h3>
                    </div>

                    <div className="mb-4">
                        <span>Milestone Name</span>
                        <h3 className="mt-1">{rowData.milestone ? rowData.milestone.full_name : 'N/A'}</h3>
                    </div>
                    <div className="mb-4">
                        <label>Assignee Name</label>
                        <h3 className="mt-1">{rowData.assignee ? rowData.assignee.name : 'N/A'}</h3>
                    </div>

                    <div className="mb-4">
                        <span>Reporter Name</span>
                        <h3 className="mt-1">{rowData.reporter ? rowData.reporter.name : 'N/A'}</h3>
                    </div>
                    <div className="mb-4">
                        <span>Due/End Date</span>
                        <h3 className="mt-1">{rowData.activity.due_date ? rowData.activity.due_date : 'N/A'}</h3>
                        {/*"March 18, 2021, 10:30 AM"*/}
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
