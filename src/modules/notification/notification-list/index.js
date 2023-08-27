import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {TableWrapper} from "../../commons/Wrapper";
import SearchFilter from "../../commons/SearchFilter";
import {Flex} from "../../commons/Flex";
import {Button, Col, Modal, Row, Pagination} from "antd";
// import DeatilsContent from "./DeatilsModal";
import { useNotification } from '../../../scripts/helper';
import {NOTIFICATIONS_LIST, MARK_SINGLE_NOTIFICATION, MARK_ALL_NOTIFICATION} from "../../../scripts/api";
import {getData, postData} from "../../../scripts/api-service";
import moment from 'moment';


export default function Notification() {
    const [detailsModal, setDetailsModal] = useState();
    const [notifications, setNotifications] = useState([]);
    const [selectedNOtification, setSelectedNotification] = useState();
    const [refresh, doRefresh] = useState(0);
    const [searchValue, setSeatchValue] = useState()
    const [totalPage, setTotalPage] = useState()
    const [totalItem, setTotalItem] = useState()
    const [currentPage, setCurrentPage] = useState(1);
    const { getUnreadNotifications } = useNotification();
    const history = useHistory();

    const search = (value) => {
        setSeatchValue(value)
    };

    const filter = (date) => {};

    const getNotificationList = async () => {
        let url = NOTIFICATIONS_LIST + '?';
        if (searchValue) url = url + '&search=' + searchValue;
        if (currentPage) url = url + '&page=' + currentPage;

        let res = await getData(url);

        if (res) {
            let masterData = res?.data?.data?.data;
            setNotifications(masterData);
            setTotalPage(res?.data?.data?.last_page)
            setTotalItem(res?.data?.data?.total)
        }
    }

    const notificationBody = (data, type) => {
        if (data) {
            let value = JSON.parse(data);

            if (type === 'title') return value.title;
            if (type === 'body') return value.body;
            if (type === 'time') return timeDifferentCalculation(value.created_at);
        }
    }

    const timeDifferentCalculation = (time) => {
        if (time) {
            let createdDateTime = moment(time);
            let todayDateTime = moment(new Date());
            
            if (todayDateTime.diff(createdDateTime, 'minutes') < 60) return todayDateTime.diff(createdDateTime, 'minutes') + ' min ago';
            else if (todayDateTime.diff(createdDateTime, 'hours') < 25) return todayDateTime.diff(createdDateTime, 'hours') + 'h ago';
            else return todayDateTime.diff(createdDateTime, 'days') + 'd ago';
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
    

    const readSingleNotification = async (noti) => {
        let res = await postData(MARK_SINGLE_NOTIFICATION + "/" + noti.id);

        if (res) {
            let value = JSON.parse(noti.data);
            if(value.link) history.push(`/${value.link}`);
            doRefresh(prev => prev + 1);
        }
    }

    const readAllNotification = async () => {
        let res = await postData(MARK_ALL_NOTIFICATION);

        if (res) {
            doRefresh(prev => prev + 1);
            getUnreadNotifications();
        }
    }

    useEffect(() => {
        getNotificationList();
    }, [refresh, searchValue, currentPage]);

    return (
        <TableWrapper>
            <SearchFilter
                search={search}
                filter={filter}
                // filterOptions={[]}
                failsafe
            />
            <div className="notification-items px-4 mt-3" style={{overflowY: 'scroll'}}>
                
                { notifications && notifications.length ? <>
                    <Button type="primary" onClick={()=> readAllNotification()} className="my-2">
                        Mark all as read
                    </Button>
                  { notifications.map(noti => {
                      return <div 
                                className="notification-item" 
                                id={`notification-${noti.id}`} 
                                key={noti.id} 
                                style={!noti.read_at ? {background: '#e2e2e2'} : {}}
                                onClick={()=> readSingleNotification(noti)}
                            >
                          <Row>
                              <Col span={24}>
                                  <p>{notificationBody(noti.data, 'title')}</p>
                                  <p dangerouslySetInnerHTML={{__html: notificationBody(noti.data, 'body')}}></p>
                                  <small>{timeDifferentCalculation(noti.created_at)}</small>
                              </Col>
                          </Row>
                      </div>})
                  }
                    <Pagination
                        style={{float: 'right', margin: '10px'}}
                        current={currentPage} 
                        onChange={(page)=> setCurrentPage(page)}  
                        pageSize={10} 
                        total={totalItem}
                    />
                    </> : <div className="mt-3" style={{textAlign: 'center'}}>
                        <h4>There is no notification for you. </h4>
                    </div>
                }
            </div>
        </TableWrapper>
    )
}
