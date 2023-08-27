import React, {useEffect, useState} from 'react';
import {TableWrapper} from "../../commons/Wrapper";
import SearchFilter from "../../commons/SearchFilter";
import {Flex} from "../../commons/Flex";
import {Button, Col, Modal, Row, Select} from "antd";
import DeatilsContent from "./DeatilsModal";

import {PENDING_TASK_NOTIFICATION_LIST, MARK_ALL_PENDING_TASK_NOTIFICATION_READ} from "../../../scripts/api";
import {getData} from "../../../scripts/api-service";
import moment from 'moment';

export default function PendingTaskList() {
    
    let searchUrl = window.location.search;
    let params = new URLSearchParams(searchUrl);
    let activityId = params.get('activity_id');

    const [detailsModal, setDetailsModal] = useState();
    const [notifications, setNotifications] = useState([]);
    const [selectedNOtification, setSelectedNotification] = useState();
    const [refresh, doRefresh] = useState(0);
    const [searchValue, setSeatchValue] = useState()

    const search = (value) => {
        setSeatchValue(value)
    };

    const filter = (date) => {};

    const getNotificationList = async () => {
        let url = PENDING_TASK_NOTIFICATION_LIST + '?';
        if (searchValue) url = url + '&search=' + searchValue;
        if (activityId) url = url + "&activity_id=" + activityId;

        let res = await getData(url);

        if (res) {
            let masterData = res?.data?.data;
            setNotifications(masterData)
        }
    }

    const notificationBody = (data, type) => {
        if (data) {
            let value = JSON.parse(data);

            if (type === 'text') return value.body[0];
            if (type === 'projectCode') return value.body[1];
            if (type === 'time') return timeDifferentCalculation(value.body[2]);
        }
    }

    const timeDifferentCalculation = (time) => {
        if (time) {
            let b = moment(time),
            a = moment(new Date());
            
            if (a.diff(b, 'minutes') < 60) return a.diff(b, 'minutes') + ' min ago';
            else if (a.diff(b, 'hours') < 25) return a.diff(b, 'hours') + 'h ago';
            else return a.diff(b, 'days') + 'd ago';
        }
    };

    const setStatusColor = (status) => {
        if (status === 'Accepted') return "green";
        if (status === 'Pending') return "#f9b633";
        if (status === "Rejected") return "red";
    }

    const updateEvent = () => {
        // setIsTaskUpdate(true);
        doRefresh(prev => prev + 1)
    }

    const readAllNotification = async () => {
        let res = await getData(MARK_ALL_PENDING_TASK_NOTIFICATION_READ);

        if (res) {
            let ele = document.getElementById("js-pending-task-noticefication-count");
            if (ele) {
                ele.style.display = "none";
                ele.innerText = '';
            }
        }
    }

    useEffect(() => {
        getNotificationList();
    }, [refresh, searchValue]);

    useEffect(() => {
        setTimeout(() => {
            readAllNotification();
        }, 2000);
    }, [])

    return (
        <TableWrapper>
            <SearchFilter
                search={search}
                filter={filter}
                // filterOptions={[]}
                failsafe
            />
            <div className="notification-items px-4 mt-5" style={{'overflow-y': 'scroll'}}>
                {
                    notifications && notifications.length ? <>
                        {
                            notifications.map(noti => {
                                return <div className="notification-item" id={`notification-${noti.id}`} 
                                    key={noti.id} style={!noti.read_at ? {background: '#e2e2e2'} : {}}>
                                    <Row>
                                        <Col span={20}>
                                            <p>{notificationBody(noti.data, 'text')}</p>
                                            <h4>{notificationBody(noti.data, 'projectCode')}</h4>
                                            <small>{timeDifferentCalculation(noti.created_at)}</small>
                                        </Col>
                                        <Col span={4} style={{textAlign: "center"}}>
                                            <h4 className="ml-2" style={{color: setStatusColor(noti.status)}}>
                                                {noti.status}
                                            </h4>
                                            {
                                                noti.notification_id && noti.activity_id && noti.status === 'Pending' ? <Button type="link" 
                                                    onClick={()=> {setDetailsModal(true); setSelectedNotification(noti)}}>Details</Button> : ''
                                            }
                                        </Col>
                                    </Row>
                                </div>
                            })
                        }
                    </> : <div className="mt-5" style={{textAlign: 'center'}}>
                        <h4>There is no notification for you. </h4>
                    </div>
                }
            </div>
            
            <Modal 
                title=""
                visible={detailsModal}
                width="60vw"
                onCancel={() => {setDetailsModal(false); setSelectedNotification(null)}}
                footer={false}
                maskClosable={false}>
                    {selectedNOtification ? <DeatilsContent 
                        notification={selectedNOtification} 
                        setDetailsModal={setDetailsModal}
                        updateEvent={updateEvent}  
                        getNotificationList={getNotificationList}>    
                    </DeatilsContent> : ''}
                    
            </Modal>

        </TableWrapper>
    )
}
