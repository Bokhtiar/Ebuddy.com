import React, {useEffect, useState} from 'react';
import { useHistory, useParams } from "react-router-dom";
import {Select, Table, Button, Row, Col, Modal,Icon,Dropdown,Menu,Badge, Progress, PageHeader, DatePicker, Radio  } from "antd";
import SearchFilter from "../../../commons/SearchFilter";
import {TableWrapper,Wrapper} from "../../../commons/Wrapper";
import {Flex} from "../../../commons/Flex";
import {getData, postData} from "../../../../scripts/api-service";
import {
    ACTIVITY_LIST_BY_USER,
    REVIEW_STATUS_LISTVIEW,
    DEPARTMENT_LIST,
    USER_TEAM_LIST,
    ACTIVITY_REVIEW_UPDATE,
    MANAGEMENT_TASK_DETAILS,
    ALL_PROJECT_SETUP_LIST,
    PROJECT_MILESTONE,
    USER_LIST
} from "../../../../scripts/api";

import attachmentIcon from "../../../../assets/attached.svg";
import {openAttchment, dateCheck} from "../../../../scripts/helper";
import sales_task from "../../../../assets/icons/test/sales_task_icon.svg";
import {alertPop} from "../../../../scripts/message";
// import TaskDetailsModal from '../../../task-activity/project-activity-list/Task-Details';
import TaskDetailsModal from './TaskDetailsModal';
import {getPermissions} from '../../../../scripts/helper';
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
    const [departments, setDepartments] = useState([]);
    const [userTeamList, setUserTeamList] = useState([]);
    const [employeeId, setEmployeeId] = useState(kamId);
    const [employeeName, setEmployeeName] = useState();
    const [selectDepartment, setSelectDepartment] = useState(departmentId);
    const [projectDropedownList, setProjectDropedownList] = useState();
    const [selectedProject, setSelectedProject] = useState(projectId);
    const [milestoneList, setMilestoneList] = useState([]);
    const [selectedMilestone, setSelectedMilestone] = useState();
    // const [review, setReview] = useState();
    const [nonBusiness, setNonBusiness] = useState(bType === 'non-buisness' ? true : false);
    const [businessCount, setBusinessCount] = useState();
    const [NonBusinessCount, setNonBusinessCount] = useState();
    const [permission, setPermission] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState();
    const [isDisabledType, setIsDisabledType] = useState(true);
    const [reviewList, setReviewList] = useState([]);
    const [refresh, doRefresh] = useState(0);

    const search = (value) => {
        setSearchValue(value);
    };

    const paginate = (page) => setCurrentPage(page);

    const handleDateChange = (date, dateString) => {
        setStartFrom(dateString[0]);
        setEndFrom(dateString[1]);
    };

    const getPermissionsList = async () => {
        let permissions = await getPermissions();
        if (permissions && permissions.length) {
            const permNames = permissions.map((item) => item.name);
            if (permNames.includes('Business Activities') && permNames.includes('Non-Business Activities')) {
                setPermission('Both');
            }
            else if (permNames.includes('Business Activities')) {
                setPermission('Business');
                setNonBusiness(false);
            }
            else if (permNames.includes('Non-Business Activities')) {
                setPermission('Non-Business');
                setNonBusiness(true);
            }
        }
    }

    const getReviewList = async () => {
        let res = await getData(REVIEW_STATUS_LISTVIEW);

        if (res) {
            let masterData = res?.data?.data;
            setReviewList(masterData);
        }
    }

    const getDepartments = async () => {
        let res  = await getData(DEPARTMENT_LIST);

        if (res) {
            let masterData = res.data.data;
            setDepartments(masterData);
        }
    }

    const getUserTeamList = async () => {
        let url = USER_LIST + '?department_id=' + selectDepartment;
        let res = await getData(url);

        if (res) {
            let masterData = res?.data?.data || [];
            setUserTeamList(masterData);
        }
    }

    const getTaskList = async () => {
        // if(employeeId !== undefined){
            let url = MANAGEMENT_TASK_DETAILS + '?';
            if (currentPage) url = url + '&page=' + currentPage;
            if(selectDepartment) url = url + '&assignee_department_id=' + selectDepartment;
            if(employeeId) url = url + '&assignee=' + employeeId;
            if(selectedProject) url = url + '&project_id=' + selectedProject;
            if(selectedMilestone) url = url + '&project_milestone_id=' + selectedMilestone;
            if(review) url = url + '&review_ids=' + review;
            if(status) url = url + '&statuses=' + status;
            if(searchValue) url = url + '&search=' + searchValue;
            if(startFrom && endFrom) url = url + '&from_date=' + startFrom + "&to_date=" + endFrom;
            if (nonBusiness || permission === 'Non-Business') url = url + '&user_type=non-business';
            if (!nonBusiness || permission === 'Business') url = url + '&user_type=business';
            let res = await getData(url);

            if (res) {
                let masterData = res?.data?.data?.data;
                setTaskList(masterData);
                setPageCount(res?.data?.data?.last_page);

                if (!nonBusiness) {
                    setBusinessCount(`[${res?.data?.count}]` || null); 
                    setNonBusinessCount(null);
                }
                if (nonBusiness) {
                    setBusinessCount(null); 
                    setNonBusinessCount(`[${res?.data?.count}]` || null);
                }

                setIsDisabledType(false);
            }
        // }
    }

    const getMilestoneReviewList = async () => {
        let res = await getData(REVIEW_STATUS_LISTVIEW);

        if (res) {
            let masterData = res?.data?.data;
            setMilestoneReviewList(masterData);
        }
    }

    const selectReview = (value,id) => {
        setReview(value);
    }

    const selectRating = (value,id) => {
        postReviewData(value,id);    
    }

    const postReviewData = async (value,id) => {
        const reviewData = {
            review_status: parseInt(review),
            review_rating: parseInt(value)
        }
        let res = await postData(`${ACTIVITY_REVIEW_UPDATE}${id}`,reviewData);
        if (res) {
            let masterData = res?.data?.data;
            alertPop("success", "Successfully complete the process");
        }
    }

    const getProjectDropdownList = async () => {
        let res = await getData(ALL_PROJECT_SETUP_LIST);

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
        getDepartments();
        getProjectDropdownList();
        getMilestoneList();
        getPermissionsList();
        getReviewList();
    }, [])

    useEffect(() => {
        getTaskList();            
    }, [selectDepartment, employeeId, selectedProject, startFrom, endFrom, review, status, selectedMilestone, nonBusiness, permission, refresh, currentPage])
    
    useEffect(() => {
        if(selectDepartment) getUserTeamList();
    }, [selectDepartment]);

    useEffect(() => {
        if (projectMilestoneId) setSelectedMilestone(projectMilestoneId);
    }, [projectMilestoneId]);
  
    const columns = [
        {
            title:  "CLIENT",
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
            title: "END DATE",
            dataIndex: 'due_date', 
        },
        {
            title: "REVIEW",
            render: row => <p style={{color: row?.review?.color ? row?.review.color : 'black'}}>{row?.review?.name || ''}</p>
        },
        {
            title: "RATING",
            // dataIndex: 'activity_rating',
            render: row => <p style={{color: row?.review?.color ? row?.review.color : 'black'}}>{row?.review_rating || ''}</p>
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

    const nonBusinessColumns = [
        {
            title: "FUNCTION NAME",
            // dataIndex: 'project_details',
            render: row => <p>{row?.function_activity?.name}</p>
        },
        {
            title: "FUNCTION TYPE",
            // dataIndex: 'milestone',
            render: row => <p>{row?.function_type?.name}</p>
        },
        {
            title:"Activity Type" ,
            dataIndex: 'activity_type',
            render: activity_type => <p>{activity_type ? activity_type?.name : ''}</p>
        },
        {
            title: "STATUS",
            dataIndex: 'status',
        },
        {
            title: "END DATE",
            dataIndex: 'due_date', 
        },
        {
            title: "REVIEW",
            dataIndex: 'review',  
            render: review => <p style={{color: review?.color ? review.color : 'black'}}>{review?.name || ''}</p>
        },
        {
            title: "RATING",
            // dataIndex: 'row',
            render: row => <p style={{color: row?.review?.color ? row.review.color : 'black'}}
                    >{row?.review_rating || ''}
                </p>
        },
        {
            title: "ACTION",
            key: "action",
            render: (row) =>
                <Button 
                    type="link" 
                    onClick={() => {
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
                // filter={filter}
                // filterOptions={[{type: "date_range"}]}
                failsafe
            />
            {employeeName ? 
            <PageHeader
                style={{
                border: '1px solid rgb(235, 237, 240)',
                }}
                // onBack={() => history.push('/management-panel/task-summary')}
                // backIcon={<Icon type="left" />}
                title={`Employee Name: ${employeeName}`}
            />
            :null}
            <Flex space="0.5rem" justify="normal">
                {permission === 'Both' ? <Radio.Group defaultValue={nonBusiness ? '2' : "1"} buttonStyle="solid" style={{width: '30%'}}
                    onChange={() => {setIsDisabledType(true)}}>
                    <Radio.Button onClick={()=> setNonBusiness(false)} value="1" disabled={isDisabledType}>Business {businessCount}</Radio.Button>
                    <Radio.Button onClick={()=> setNonBusiness(true)} value="2" disabled={isDisabledType}>Non-Business {NonBusinessCount}</Radio.Button>
                </Radio.Group> : null}
                <Select 
                    allowClear={true}
                    size="medium"
                    style={{width: '20%', 'marginRight': '0.5rem'}} 
                    showSearch
                    placeholder='Department Filter'
                    onChange={(value)=>setSelectDepartment(value)}
                    defaultValue={departmentId ? departmentId : undefined }
                    filterOption={(input, option) =>
                    option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                >   
                    {
                        departments?.length ? 
                            departments.map(dep => <Select.Option value={dep.id} key={dep.id}>{dep.name}</Select.Option>) : ''
                    }
                </Select>

                <Select 
                    allowClear={true}
                    size="medium"
                    style={{width: '20%', 'marginRight': '0.5rem'}} 
                    placeholder='Select Assignee'
                    defaultValue={kamId === 'undefined' ? undefined : kamId}
                    // value={kamId}
                    showSearch
                    filterOption={(input, option) =>
                        option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0}
                    onChange={(value) => setEmployeeId(value)}
                >
                    {
                        userTeamList?.length ? 
                            userTeamList.map(kam => <Select.Option value={kam.emp_id} key={kam.emp_id}>{kam.name}</Select.Option>) : ''
                    }
                </Select>

                <DatePicker.RangePicker 
                    placeholder="Select date range" 
                    size="medium" 
                    onChange={handleDateChange} 
                    style={{width: '300px', 'marginRight': '0.5rem'}}
                />
            </Flex>
            <Flex space="0.5rem" justify="normal">
                <Select 
                    allowClear={true}
                    size="medium"
                    mode="multiple"
                    style={{width: '20%', 'marginRight': '0.5rem'}} 
                    showSearch
                    placeholder='Milestone Review'
                    onChange={(value)=>setReview(value)}
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
                    style={{width: '20%', 'marginRight': '0.5rem'}} 
                    placeholder='Select Status' 
                    // defaultValue={milestoneStatus === 'undefined' ? undefined : milestoneStatus} 
                    // value={milestoneStatus} 
                    showSearch
                    filterOption={(input, option) =>
                        option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0}
                    onChange={(value)=>setStatus(value)}
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
                    style={{width: '20%', 'marginRight': '1rem'}} 
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
                    style={{width: '20%', 'marginRight': '1rem'}} 
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
                columns={nonBusiness ? nonBusinessColumns : columns}
                // scroll={{ scrollToFirstRowOnChange: false }}
                // scroll={{ y: "calc(100vh - 20rem)" }}
                rowKey={row=> row.id}
                pagination={{
                    current: currentPage,
                    total: pageCount * 10,
                    onChange: (page) => paginate(page),
                }} 
            />
            :<LandingContent />}
        </Wrapper>

        <Modal
                title=""
                visible={detailsModal}
                width="60vw"
                onCancel={() => setDetailsModal(false)}
                footer={false}
            >  
            {/* <TaskDetailsModal 
                rowId={rowData} 
                page="task-review" 
                reviewRatingList={milestoneReviewList}
                selectReview={selectReview}
                selectRating={selectRating}
                canUpdateStatus={true}
                nonBusiness={nonBusiness}
            />      */}
            <CommonModal 
                reviewRatingList={reviewList} 
                nonBusiness={nonBusiness} 
                rowData={rowData}
                updateEvent={updateEvent}
            />
        </Modal> 
        </>
    )
}

const LandingContent = () => {
    return (
        <div className="landing-content mt-5" style={{textAlign: 'center'}}>
            <img src={sales_task} height="200"/>
            <h2>Please Select Any Filter To Generate Data</h2>
        </div>
    )
}