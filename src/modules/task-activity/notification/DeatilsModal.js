import React, {useEffect, useState} from 'react'
import {
    Input,
    Col,
    Row,
    Select,
    Card,
    Collapse,
    Button,
} from "antd";
import {alertPop} from "../../../scripts/message";

import {
    ACTIVITY_DETAILS, 
    NOTIFICATION_ACTIVE, 
    NOTIFICATION_REJECT,
    TASK_ACTIVITY_ATTACHMENT_UPLOAD,
    ACTIVITY_STATUS_UPDATE
} from "../../../scripts/api";
import {getData, postData} from "../../../scripts/api-service";
import demoUser from "../../../assets/dummy.jpg";
import attachmentIcon from "../../../assets/attached.svg";
import {dateFormat,openAttchment} from "../../../scripts/helper";
import { Fragment } from 'react';

const {Panel} = Collapse;

export default function DeatilsContent({notification, setDetailsModal,updateEvent, getNotificationList}) {
    const {activity_id, notification_id, status} = notification;
    const [activity, setActivity] = useState({});
    const [image, setImage] = useState();
    
    const getActivity = async () => {
        let res = await getData(ACTIVITY_DETAILS + activity_id);

        if (res) {
            let masterData = res?.data?.data;
            // console.log("masterData", masterData);
            setActivity(masterData)
        }
    }

    let fileName = ''
    const fileUploadHandler = async (event) => {
        let value = event.target.files[0];
        document.getElementById('attachemnt-name').innerHTML=value.name;
        fileName = value.name;

        const formData = new FormData();
        formData.append("file", value);

        let response = await postData(
            TASK_ACTIVITY_ATTACHMENT_UPLOAD + activity_id,
            formData
        );
        
        if (response) {
            let masterData = response.data.data;
            if (masterData) {
                setImage(masterData.attachment)
            }
        }
    }

    const notiReject = async () => {
        let res = await postData(NOTIFICATION_REJECT + notification_id, {});

        if (res) {
            getNotificationList()
            setDetailsModal(false);
            alertPop('success', "Notification reject successfully!" )
        } else {
            alertPop('error', 'Something went wrong');
        }
    }

    const notiAccept = async () => {
        let res = await postData(NOTIFICATION_ACTIVE + notification_id, {});

        if (res) {
            getNotificationList()
            setDetailsModal(false);
            alertPop('success', "Notification accept successfully!" );
        } else {
            alertPop('error', 'Something went wrong');
        }
    }

    const commentHandler = (e) => {
        if (+e?.keyCode === 13 || +e?.charCode === 13) {

            postData(`task/v1/activity-comments-create`, {
                activity_id: activity_id,
                comment: e.target.value,
                status: 1, //confirm by api developer
            }).then(res => {
                if (res?.data?.code == 201) {
                    setActivity((prevState) => ({
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
                } 
                // else {
                //     // alertPop("error", "Check your internet connection!");
                //     alertPop("error", res?.data?.messages[0]);
                // }
            });
        }
    }

    const updateActionStatus = async (activity_id, status) => {
        if (activity_id && status) {
            let res = await postData(ACTIVITY_STATUS_UPDATE + activity_id, {status: status});

            if (res && (res?.data?.code === 201 || res?.data?.code === 200)) {
                let masterData = res.data.data;
                getActivity();
                alertPop("success", "Successfully completed the process");
            } else {
                getActivity();
                // alertPop("error", "Check your internet connection!");
                // alertPop("error", res?.data?.messages[0]);
            }
        }
        getNotificationList();
    }

    const activityStatusUpdateHandler = (status) => {
        updateActionStatus(activity_id, status);
    }

    useEffect(() => {
        getActivity();
        // updateActionStatus(activity_id, status);
    }, [activity_id])

    return (
        <div>
            {activity ? <>
                <Row gutter={32}>
                    <Col span={18}>
                        <p><span>ID #</span>{activity.id}</p>
                        <h2>{activity.title}</h2>
                    </Col>
                    <Col span={6}>
                        {/* <Select style={{marginTop: '2rem'}} placeholder='Select Status'
                        onChange={activityStatusUpdateHandler}
                                value={activity?.activity_status}
                                >
                            <Select.Option key='Pending' value='Pending'>Pending</Select.Option>
                            <Select.Option key='To-Do' value='To-Do'>To-Do</Select.Option>
                            <Select.Option key='WIP' value='WIP'>WIP</Select.Option>
                            <Select.Option key='Done' value='Done'>Done</Select.Option>
                            <Select.Option key='Reviewed' value='Reviewed'>Reviewed</Select.Option>
                        </Select> */}
                    </Col>
                </Row>

                <hr className="line-top-border"/>
                <br/>

                <Row gutter={32}>
                    <Col span={17} style={{borderRight: '1px solid #ccc'}}>
                        {console.log('comm', activity?.is_communication)}
                        {
                            activity?.is_communication ? (
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
                                                <p>{activity?.contact_person_details?.contact_name}</p>
                                                <p>{activity?.contact_person_details?.contact_email}</p>
                                                <p>{activity?.contact_person_details?.contact_mobile}</p>
                                                <p>{activity?.contact_person_details?.client_department?.department_name}</p>
                                            </Col>
                                        </Row>
                                    </div>

                                    <hr className="line-top-border"/>
                                    <br/>
                                </Fragment>
                            ) : ''
                        }

                        <div>
                            <p>Remarks</p>
                            <Card style={{width: '100%'}}>
                                {activity?.note || 'N/A'}
                            </Card>
                        </div>

                        <hr className="line-top-border"/>
                        <br/>

                        {/* <div className="file-upload-content">
                            <label htmlFor="file-upload-field">Attachment</label>
                            <div className="file-upload-wrapper" data-text="">
                                <span className="attacment-filename" id="attachemnt-name"></span>
                                <input name="file-upload-field" type="file" className="file-upload-field" value=""onChange={fileUploadHandler}/>
                            </div>
                        </div>

                        <hr className="line-top-border"/> */}

                        <div style={{marginTop: '1rem'}}>
                            <p>Comments</p>
                            <Input onKeyDown={commentHandler} id='js-comment-text'/>

                            <Collapse accordion defaultActiveKey={1} style={{marginTop: '1rem'}}>
                                <Panel header="All Comments" key="1">
                                    {activity?.comments?.map((comment, index) => (
                                        <Card key={`comment-${comment.id}-${index}`} style={{width: '100%'}}>
                                            <Row>
                                                <p>{comment.comment}</p>
                                            </Row>
                                            <Row>
                                                <Col span={6} style={{fontSize:'10px'}}><img src={demoUser} alt="demoUser" style={{width:'1rem', paddingRight:'2px'}}/>
                                                    {comment?.created_by?.name}
                                                </Col>
                                                <Col span={12}></Col>
                                                <Col span={6}style={{fontSize:'10px'}}>
                                                {dateFormat(comment.created_at)}
                                                </Col>
                                            </Row>
                                            
                                        </Card>
                                    ))}
                                </Panel>
                            </Collapse>
                        </div>
                        {/* disabled */}
                        <div className="mt-3">
                            <Button disabled={status === 'Rejected'} type="primary" onClick={() => notiReject()}> Reject </Button>
                            <Button disabled={status === 'Accepted'} type="primary" style={{float: "right"}} onClick={() => notiAccept()}> Accept </Button>
                        </div>
                    </Col>

                    <Col span={7}>
                        <div className="mb-4">
                            <span>Parent Task/Activity</span>
                            <h3 className="mt-1">{activity?.parent_activity?.title || 'N/A'}</h3>
                        </div>

                        <div className="mb-4">
                            <span>Activity Type</span>
                            <h3 className="mt-1">{activity?.activity_type?.name || 'N/A'}</h3>
                        </div>

                        <div className="mb-4">
                            <span>Priority</span>
                            <h3 className="mt-1">{ activity?.activity_Priority?.name || 'N/A' }</h3>
                        </div>

                        <div className="mb-4">
                            <span>Activity Repeat</span>
                            <h3 className="mt-1">{ activity?.repeats || 'N/A' }</h3>
                        </div>

                        {activity?.function_type ? 
                            <>
                                <div className="mb-4">
                                    <span>Function Type </span>
                                    <h3 className="mt-1">{ activity?.function_type?.name || 'N/A' }</h3>
                                </div>

                                <div className="mb-4">
                                    <span>Function Name</span>
                                    <h3 className="mt-1">{activity?.function_activity?.name || ''}</h3>
                                </div>
                            </>
                            :
                            <>
                                <div className="mb-4">
                                    <span>Project Name</span>
                                    <h3 className="mt-1">{ activity?.project_details?.name || 'N/A' }</h3>
                                </div>

                                <div className="mb-4">
                                    <span>Milestone Name</span>
                                    <h3 className="mt-1">{activity?.milestone?.full_name || ''}</h3>
                                </div>
                            </>
                        }

                        <div className="mb-4">
                            <label>Assignee Name</label>
                            <h3 className="mt-1">
                                <img src={activity?.assignee?.profile_pic || demoUser} hight="25" width="25" className="mr-3"/>
                                {activity?.assignee?.name || ''}
                            </h3>
                        </div>

                        <div className="mb-4">
                            <span>Reporter Name</span>
                            <h3 className="mt-1">
                                <img src={activity?.reporter?.profile_pic || demoUser} hight="25" width="25" className="mr-3"/>
                                {activity?.reporter?.name || ''}
                            </h3>
                        </div>

                        <div className="mb-4">
                            <span>Start Date</span>
                            <h3 className="mt-1">{activity?.start_date || ''}</h3>
                        </div>
                        <div className="mb-4">
                            <span>End Date</span>
                            <h3 className="mt-1">{activity?.due_date || ''}</h3>
                        </div>
                        {/* <div className="mb-4">
                            <span>Attachment</span><br /><br />
                            {activity?.attachment ? 
                                <img 
                                    src={attachmentIcon} 
                                    alt="attachement" 
                                    style={{float: 'left', marginTop: '-3px', width:'1.5rem'}} 
                                    onClick={() => {openAttchment(activity?.attachment)}}
                                />:null
                            }
                        </div> */}
                    </Col>
                </Row>
            </> : ''
        }
        </div>
    )
}
