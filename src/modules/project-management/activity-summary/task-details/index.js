import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { Select, Table, Button, Row, Col, Modal, Icon, Dropdown, Menu, Badge, Progress, PageHeader, DatePicker, Radio } from "antd";
import SearchFilter from "../../../commons/SearchFilter";
import { TableWrapper, Wrapper } from "../../../commons/Wrapper";
import { Flex } from "../../../commons/Flex";
import { getData, postData } from "../../../../scripts/api-service";
import {
    REVIEW_STATUS_LISTVIEW,
    ACTIVITY_REVIEW_UPDATE,
    MANAGEMENT_TASK_DETAILS,
    PROJECT_ACTIVITY_SUMMARY_LIST,
    PROJECT_MILESTONE,
} from "../../../../scripts/api";

import attachmentIcon from "../../../../assets/attached.svg";
import { openAttchment, dateCheck } from "../../../../scripts/helper";
import sales_task from "../../../../assets/icons/test/sales_task_icon.svg";
import { alertPop } from "../../../../scripts/message";
// import TaskDetailsModal from '../../../task-activity/project-activity-list/Task-Details';
import TaskDetailsModal from './TaskDetailsModal';
import { getPermissions } from '../../../../scripts/helper';
import CommonModal from "../../../commons/commonModal";

export default function TaskDetails() {
    let searchUrl = window.location.search;
    let params = new URLSearchParams(searchUrl);
    let paramsKam = params.get('empId');
    let paramsMilestone = params.get('milestone');
    let paramsProject = params.get('projectId');
    let kamId = paramsKam ? paramsKam * 1 : undefined;
    let paramsDepartment = params.get('department');
    let projectMilestoneId = paramsMilestone ? paramsMilestone * 1 : undefined;
    let projectId = paramsProject ? paramsProject * 1 : undefined;
    let departmentId = paramsDepartment ? paramsDepartment * 1 : undefined;
    let bType = params.get('bType');

    const [searchValue, setSearchValue] = useState();
    const [taskList, setTaskList] = useState();
    const [milestoneReviewList, setMilestoneReviewList] = useState();
    const [detailsModal, setDetailsModal] = useState(false);
    const [startFrom, setStartFrom] = useState();
    const [endFrom, setEndFrom] = useState();
    const [rowData, setRowData] = useState();
    const [review, setReview] = useState();
    const [status, setStatus] = useState();
    const [projectDropedownList, setProjectDropedownList] = useState();
    const [selectedProject, setSelectedProject] = useState(projectId);
    const [milestoneList, setMilestoneList] = useState([]);
    const [selectedMilestone, setSelectedMilestone] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState();
    const [reviewList, setReviewList] = useState([]);
    const [refresh, doRefresh] = useState(0);

    const search = (value) => {
        setSearchValue(value.toString());
    };
    
    const filter = (date) => {
        setStartFrom(date?.date_from);
        setEndFrom(date?.date_to);
        // if(date === null) getAllTaskData();
    };
    
    const paginate = (page) => setCurrentPage(page);

    const handleDateChange = (date, dateString) => {
        setStartFrom(dateString[0]);
        setEndFrom(dateString[1]);
    };

    const getReviewList = async () => {
        let res = await getData(REVIEW_STATUS_LISTVIEW);

        if (res) {
            let masterData = res?.data?.data;
            setReviewList(masterData);
        }
    }

    const getTaskList = async () => {
        let url = MANAGEMENT_TASK_DETAILS + '?';
        if (currentPage) url = url + '&page=' + currentPage;
        if (selectedProject) url = url + '&project_id=' + selectedProject;
        if (selectedMilestone) url = url + '&project_milestone_id=' + selectedMilestone;
        if (review) url = url + '&review_ids=' + review;
        if (status) url = url + '&statuses=' + status;
        if (searchValue) url = url + '&search=' + searchValue;
        if (startFrom && endFrom) url = url + '&from_date=' + startFrom + "&to_date=" + endFrom;
        url = url + '&user_type=business';
        let res = await getData(url);

        if (res) {
            let masterData = res?.data?.data;
            setTaskList(masterData?.data);
            setPageCount(masterData.last_page);
        }
    }

    const getMilestoneReviewList = async () => {
        let res = await getData(REVIEW_STATUS_LISTVIEW);

        if (res) {
            let masterData = res?.data?.data;
            setMilestoneReviewList(masterData);
        }
    }

    const selectReview = (value, id) => {
        setReview(value);
    }

    const selectRating = (value, id) => {
        postReviewData(value, id);
    }

    const postReviewData = async (value, id) => {
        const reviewData = {
            review_status: parseInt(review),
            review_rating: parseInt(value)
        }
        let res = await postData(`${ACTIVITY_REVIEW_UPDATE}${id}`, reviewData);
        if (res) {
            let masterData = res?.data?.data;
            alertPop("success", "Successfully complete the process");
        }
    }

    const getProjectDropdownList = async () => {
        let res = await getData(PROJECT_ACTIVITY_SUMMARY_LIST);

        if (res) {
            let masterData = res.data.data || [];
            setProjectDropedownList(masterData);
        }
    }

    const getMilestoneList = async () => {
        let res = await getData(PROJECT_MILESTONE);

        if (res) {
            let masterData = res?.data?.data;
            setMilestoneList(masterData);
        }
    }

    const updateEvent = () => {
        // setIsTaskUpdate(true);
        doRefresh(prev => prev + 1)
    }

    useEffect(() => {
        getMilestoneReviewList();
        getProjectDropdownList();
        getMilestoneList();
        getReviewList();
    }, [])

    useEffect(() => {
        getTaskList();
    }, [selectedProject, currentPage, startFrom, endFrom, review, status, selectedMilestone, refresh, searchValue])

    useEffect(() => {
        if (projectMilestoneId) setSelectedMilestone(projectMilestoneId);
    }, [projectMilestoneId]);

    const columns = [
        {
            title: "CLIENT",
            render: row => <p>{row?.projects?.client?.name}</p>
        },
        {
            title: "PROJECT NAME",
            // dataIndex: 'project_details',
            render: row => <p>{row?.projects?.name || ''}</p>
        },
        {
            title: "MILESTONE",
            // dataIndex: 'milestone',
            render: row => <p>{row?.project_milestone?.milestone?.full_name}</p>
        },
        {
            title: "TASK/ACTIVITY NAME",
            dataIndex: 'title',
            // render: activity_type => <p>{activity_type ? activity_type?.name : ''}</p>
        },
        {
            title: "STATUS",
            dataIndex: 'status',
        },
        {
            title: "Start DATE",
            dataIndex: 'start_date',
        },
        {
            title: "END DATE",
            dataIndex: 'due_date',
        },
        {
            title: "REVIEW",
            render: row => <p style={{ color: row?.review?.color ? row?.review.color : 'black' }}>{row?.review?.name || ''}</p>
        },
        {
            title: "RATING",
            // dataIndex: 'activity_rating',
            render: row => <p style={{ color: row?.review?.color ? row?.review.color : 'black' }}>{row?.review_rating || ''}</p>
        },
        {
            title: "ACTION",
            key: "action",
            render: (row) =>
                <Button
                    type="link"
                    onClick={() => {
                        // getDetailsData();
                        setDetailsModal(true);
                        setRowData(row);
                    }}
                >Details
                </Button>,
        },
    ];

    return (
        <>
            <Wrapper>
                <SearchFilter
                    search={search}
                    filter={filter}
                    filterOptions={[{type: "date_range"}]}
                    failsafe
                />

                <Flex space="0.5rem" justify="normal">

                    <DatePicker.RangePicker
                        placeholder="Select date range"
                        size="medium"
                        onChange={handleDateChange}
                        style={{ width: '300px', 'marginRight': '0.5rem' }}
                    />
                    <Select
                        allowClear={true}
                        size="medium"
                        mode="multiple"
                        style={{ width: '20%', 'marginRight': '0.5rem' }}
                        showSearch
                        placeholder='Milestone Review'
                        onChange={(value) => setReview(value)}
                        filterOption={(input, option) =>
                            option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {milestoneReviewList
                            ? milestoneReviewList.map((data) => {
                                return (
                                    <Select.Option
                                        key={data.id}
                                        value={data.name}
                                    >
                                        {data.name}
                                    </Select.Option>
                                );
                            }) : ""
                        }
                    </Select>
                    <Select
                        allowClear={true}
                        size="medium"
                        style={{ width: '20%', 'marginRight': '0.5rem' }}
                        placeholder='Select Status'
                        // defaultValue={milestoneStatus === 'undefined' ? undefined : milestoneStatus} 
                        // value={milestoneStatus} 
                        showSearch
                        filterOption={(input, option) =>
                            option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0}
                        onChange={(value) => setStatus(value)}
                    >
                        <Select.Option key='Pending' value='Pending'>Pending</Select.Option>
                        <Select.Option key='To-Do' value='To-Do'>To-Do</Select.Option>
                        <Select.Option key='WIP' value='WIP'>WIP</Select.Option>
                        <Select.Option key='Hold' value='Hold'>Hold</Select.Option>
                        <Select.Option key='Done' value='Done'>Done</Select.Option>
                        <Select.Option key='Reviewed' value='Reviewed'>Reviewed</Select.Option>
                    </Select>
                    <Select
                        allowClear={true}
                        style={{ width: '20%', 'marginRight': '1rem' }}
                        placeholder='Project Filter'
                        showSearch
                        value={selectedProject}
                        onChange={(value) => setSelectedProject(value)}
                        filterOption={(input, option) =>
                            option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0}
                    >
                        {
                            projectDropedownList?.length ?
                                projectDropedownList.map(project => <Select.Option value={project.id} key={project.id}>{project.name}</Select.Option>) : ''
                        }
                    </Select>
                    <Select showSearch
                        allowClear={true}
                        style={{ width: '20%', 'marginRight': '1rem' }}
                        placeholder='Select Milestone'
                        defaultValue={projectMilestoneId === 'undefined' ? undefined : projectMilestoneId}
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        onChange={(value) => setSelectedMilestone(value)}>
                        {milestoneList.map((status) =>
                            <Select.Option
                                key={status.id}
                                value={status.id}>
                                {status.full_name}
                            </Select.Option>)}
                    </Select>
                </Flex>
                {taskList ?
                    <Table
                        bordered
                        dataSource={taskList}
                        columns={columns}
                        // scroll={{ scrollToFirstRowOnChange: false }}
                        // scroll={{ y: "calc(100vh - 20rem)" }}
                        rowKey={row => row.id}
                        pagination={{
                            current: currentPage,
                            total: pageCount * 10,
                            onChange: (page) => paginate(page),
                        }}
                    />
                    : <LandingContent />}
            </Wrapper>

            <Modal
                title=""
                visible={detailsModal}
                width="60vw"
                onCancel={() => setDetailsModal(false)}
                footer={false}
            >
                <CommonModal
                    reviewRatingList={reviewList}
                    nonBusiness={false}
                    rowData={rowData}
                    updateEvent={updateEvent}
                />
            </Modal>
        </>
    )
}

const LandingContent = () => {
    return (
        <div className="landing-content mt-5" style={{ textAlign: 'center' }}>
            <img src={sales_task} height="200" />
            <h2>Please Select Any Filter To Generate Data</h2>
        </div>
    )
}