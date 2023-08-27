import { Button, Icon, Input, Modal, Select } from "antd";
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import sales_task from "../../../../assets/icons/test/sales_task_icon.svg";
import {
    ACTIVITY_PRIORITY_LIST_2,
    REVIEW_STATUS_LISTVIEW,
    SOP_USER_ACTIVITY_LIST,
    SOP_USER_ACTIVITY_STATUS_UPDATE
} from "../../../../scripts/api";
import { getData, postData } from "../../../../scripts/api-service";
import { alertPop } from "../../../../scripts/message";
import { Flex } from "../../../commons/Flex";
import SearchFilter from "../../../commons/SearchFilter";
import { TableWrapper } from "../../../commons/Wrapper";
import ActivityDetailsModal from "../common/activity-details-modal";
import ActivityForm from "../common/activity-form";
import TaskBoard from "./task-board";
import TaskTableView from "./task-table-view";

export default function ActivityMyList() {
    const [modal, setModal] = useState();
    const [detailsModal, setDetailsModal] = useState();
    const [selectedRow, setSelectedRow] = useState({});
    const [showBorstView, setShowBorstView] = useState(false);
    const [useActivity, setUserActivity] = useState([]);
    const [pageCount, setPageCount] = useState();
    const [startFrom, setStartFrom] = useState();
    const [endFrom, setEndFrom] = useState();
    const [singleDate, setSingleDate] = useState(moment().format('YYYY-MM-DD'))
    const [searchValue, setSearchValue] = useState();
    const [isTaskUpdate, setIsTaskUpdate] = useState(false);
    const [refresh, doRefresh] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [dateGroupFilter, setDateGroupFilter] = useState('today')
    const [priorityList, setPriorityList] = useState()
    const [priority, setPriority] = useState()
    const [taskStatus, setTaskStatus] = useState()
    const [reviewList, setReviewList] = useState([]);
    const [isDisabledType, setIsDisabledType] = useState(true);
    const [rowData, setRowData] = useState(true);
    const [status, setStatus] = useState();
    const [boardViewStatusFlag, setBoardViewStatusFlag] = useState('');
    const [resetCount, setResetCount] = useState(0);
    const [activityInitiateCode, setActivityInitiateCode] = useState(0);

    const getProirityList = async () => {
        let res = await getData(ACTIVITY_PRIORITY_LIST_2);

        if (res) {
            let masterData = res?.data?.data;
            setPriorityList(masterData);
        }
    }

    const getUserActivity = async () => {
        let url = SOP_USER_ACTIVITY_LIST + "?";
        if (startFrom && endFrom ) url = url + '&from_date=' + startFrom + '&to_date=' + endFrom;
        if (singleDate) url = url + '&single_date=' + singleDate;
        if (searchValue) url = url + '&search=' + searchValue;
        if (priority) url = url + '&priority_id=' + priority;
        if (taskStatus) url = url + '&status=' + taskStatus;
        if (activityInitiateCode) url = url + '&initiate_code=' + activityInitiateCode;

        let res = await getData(url);
        if (res) {
            let masterData = res.data.data;
            setUserActivity(masterData || {});
            setPageCount(masterData.last_page);
            setIsDisabledType(false);
        }
    }

    const search = (value) => {
        setSearchValue(value)
    };

    const filter = (date) => {
        if (date) {
            setDateGroupFilter(undefined);
            setStartFrom(date.date_from);
            setEndFrom(date.date_to);
            setSingleDate(undefined);
        } else {
            setDateGroupFilter('today');
            setStartFrom(undefined);
            setEndFrom(undefined);
            setSingleDate(moment().format('YYYY-MM-DD'));
        }
    };

    const detailsModalShow = (data) => {
        setDetailsModal(true);
        setSelectedRow(data);
    }

    const updateActionStatus = async ({activityId, status}) => {
        if (activityId && status) {
            let res = await postData(SOP_USER_ACTIVITY_STATUS_UPDATE + '/' + activityId, {status: status});

            if (res && (res?.data?.code === 201 || res?.data?.code === 200)) {
                let masterData = res.data.data;
                setStatus(masterData?.status);
                setBoardViewStatusFlag("board-view");
                getUserActivity();
                alertPop("success", "Successfully completed the process");
            } 
        }
    }

    const dateFilter = (value) => {
        setDateGroupFilter(value);

        switch(value) {
            case "yesterday":
                setStartFrom();
                setEndFrom();
                setSingleDate(moment().subtract(1,'days').format("YYYY-MM-DD"));
                break;
            // case "today":
            //     setStartFrom();
            //     setEndFrom();
            //     setSingleDate(moment().format('YYYY-MM-DD'));
            //     break;
            case "tomorrow":
                setStartFrom();
                setEndFrom();
                setSingleDate(moment().add(1,'days').format("YYYY-MM-DD"));
                break;
            case "this_week":
                setStartFrom(moment().clone().startOf('week').format("YYYY-MM-DD"));
                setEndFrom(moment().clone().endOf('week').format("YYYY-MM-DD"));
                setSingleDate()
                break;
            case "this_month":
                setStartFrom(moment().clone().startOf('month').format("YYYY-MM-DD"));
                setEndFrom(moment().clone().endOf('month').format("YYYY-MM-DD"));
                setSingleDate();
                break;
            case "default":
                setStartFrom('');
                setEndFrom('');
                setSingleDate('');
                break;
            default:
                setStartFrom();
                setEndFrom();
                setSingleDate(moment().format('YYYY-MM-DD'));
                break;
        }
        setIsDisabledType(true);
    }


    const getReviewList = async () => {
        let res = await getData(REVIEW_STATUS_LISTVIEW);

        if (res) {
            let masterData = res?.data?.data;
            setReviewList(masterData);
        }
    }

    useEffect(() => {
        getProirityList();
        getReviewList();
    }, []);

    useEffect(() => {
        getUserActivity();
    }, [searchValue, singleDate, priority, taskStatus, showBorstView, currentPage, activityInitiateCode, endFrom, startFrom]);

    useEffect(() => {
        if (refresh) getUserActivity();
    }, [refresh])

    
    const updateEvent = () => {
        doRefresh(prev => prev + 1)
    }

    const creteTaskModalOpenHandler = () => {
        setModal(true);
        setSelectedRow({});
        setIsTaskUpdate(false);
    }

    const managementEditHandler = (data) => {
        setModal(true);
        setSelectedRow(data);
        setIsTaskUpdate(true);
    }

    return (
        <TableWrapper>
            <div style={{width: showBorstView ? '96%' : ''}}>
                <SearchFilter
                    search={search}
                    filter={filter}
                    filterOptions={[{type: "date_range"}]}
                    failsafe
                />
            </div>

            {/* <Flex space="1rem" justify="normal"> */}
            <Flex space="1rem" justify="normal" style={{width: showBorstView ? '96%' : ''}}>
                <Button 
                    width="30%" 
                    type="primary" 
                    style={{'marginRight': '1rem'}}
                >
                    <Link 
                      to={`/sop/list-sop-activity-create`}>
                        Create New Activity
                    </Link>
                </Button>
                <Input 
                    allowClear={true}
                    placeholder="Activity initiate code" 
                    style={{width: '25%', 'marginRight': '1rem'}} 
                    onChange={(event)=> setActivityInitiateCode(event.target.value)}
                />
                <Select style={{width: '25%', 'marginRight': '1rem'}} 
                    value={dateGroupFilter} disabled={isDisabledType}
                    placeholder='Date Wise Group Filter' onChange={dateFilter} 
                    showSearch filterOption={(input, option) =>
                        option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }>
                    <Select.Option key='d' value='default'>Default</Select.Option>
                    <Select.Option key='Y' value='yesterday'>Yesterday</Select.Option>
                    <Select.Option key='G' value='today'>Today</Select.Option>
                    <Select.Option key='R' value='tomorrow'>Tomorrow</Select.Option>
                    <Select.Option key='B' value='this_week'>This Week</Select.Option>
                    <Select.Option key='A' value='this_month'>This Month</Select.Option>
                </Select>
                <Select allowClear={true} showSearch
                    style={{width: '25%', 'marginRight': '1rem'}} 
                    placeholder='Priority'
                    disabled={isDisabledType}
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    onChange={(value)=> {setPriority(value); setIsDisabledType(true)}}>
                    {priorityList?.map((status) =>
                        <Select.Option
                            key={`milestone-${status.id}`}
                            value={status.id}>{status.name}
                        </Select.Option>)}
                </Select>
                <Select 
                    allowClear={true}
                    showSearch
                    style={{width: '25%', 'marginRight': '1rem'}} 
                    disabled={isDisabledType}
                    placeholder='Status'
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    onChange={(value)=> {setTaskStatus(value); setIsDisabledType(true)}}>
                    <Select.Option key='Pending' value='Pending'>Pending</Select.Option>
                    <Select.Option key='To-Do' value='To-Do'>To-Do</Select.Option>
                    <Select.Option key='WIP' value='WIP'>WIP</Select.Option>
                    <Select.Option key='Hold' value='Hold'>Hold</Select.Option>
                    <Select.Option key='Done' value='Done'>Done</Select.Option>
                    <Select.Option key='Reviewed' value='Reviewed'>Reviewed</Select.Option>
                </Select>
                {/* <Select 
                    allowClear={true}
                    showSearch
                    style={{width: '20%'}} 
                    disabled={isDisabledType}
                    placeholder='Repeat'
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    onChange={(value)=> {setRepeats(value); setIsDisabledType(true)}}>
                    <Select.Option key='Daily' value='Daily'>Daily</Select.Option>
                    <Select.Option key='Weekly' value='Weekly'>Weekly</Select.Option>
                    <Select.Option key='Monthly' value='Monthly'>Monthly</Select.Option>
                    <Select.Option key='Quarterly' value='Quarterly'>Quarterly</Select.Option>
                    <Select.Option key='Half' value='Half'>Half Yearly</Select.Option>
                    <Select.Option key='Yearly' value='Yearly'>Yearly</Select.Option>
                </Select> */}
            </Flex>
            <Flex space="1rem" justify="normal">
                <Button onClick={() => {setShowBorstView(true); setIsDisabledType(true)}} disabled={showBorstView || isDisabledType}>
                    <Icon type="appstore"/>
                </Button>
                <Button onClick={() => { setShowBorstView(false); setIsDisabledType(true)}} disabled={!showBorstView || isDisabledType}>
                    <Icon type="unordered-list"/>
                </Button>
                <div className="ml-3 pt-2 base_font_size">View Type ({showBorstView ? 'Board View' : 'List View'})</div>
            </Flex>
            {
                showBorstView ? (
                    <TaskBoard 
                        detailsModalShow={detailsModalShow}
                        useActivity={useActivity}
                        updateActionStatus={updateActionStatus}
                        setRowData={setRowData}
                    />
                ):
                    <TaskTableView
                        detailsModalShow={detailsModalShow} 
                        useActivity={useActivity}
                        pageCount={pageCount}
                        managementEditHandler={managementEditHandler}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                        setRowData={setRowData}
                        updateEvent={updateEvent}
                        statusUpdateApi={SOP_USER_ACTIVITY_STATUS_UPDATE}
                    />
            }

            {/* <LandinContent></LandinContent> */}

            <Modal
                title={[
                    <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'baseline'}}>
                        <span>{isTaskUpdate ? 'Update' : 'Create New'} Activity</span>
                    </div>,
                ]}
                centered
                visible={modal}
                width="75vw"
                onCancel={() => {setModal(false); ; setSelectedRow({}); setResetCount(resetCount + 1)}}
                footer={false}
            >
                <ActivityForm 
                    setModal={setModal} 
                    activityDetails={selectedRow} 
                    resetCount={resetCount} 
                    isTaskUpdate={isTaskUpdate} 
                    updateEvent={updateEvent} 
                    modal={modal}
                />
            </Modal>

            <Modal
                title=""
                visible={detailsModal} 
                width="60vw"
                onCancel={() => {setDetailsModal(false); getUserActivity(); setSelectedRow()}}
                footer={false}
                maskClosable={false}
            >
                {selectedRow ? 
                <ActivityDetailsModal 
                    setModal={detailsModalShow} 
                    reviewRatingList={reviewList} 
                    rowData={selectedRow}
                    updateEvent={updateEvent}
                    updatedStatus={status}
                    setStatus={setStatus}
                    boardViewStatusFlag={boardViewStatusFlag}
                />
                : ''}
            </Modal>
        </TableWrapper>
    )
}


const LandinContent = () => {
    return (
        <div className="landing-content" style={{textAlign: 'center'}}>
            <img src={sales_task} height="300"/>
            <h1>Please Select One Project To Generate Data</h1>
        </div>
    )
}

