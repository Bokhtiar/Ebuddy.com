import React, {useState,useEffect} from 'react';
import {Select,Button,Input, Modal,Icon,Alert, Radio, DatePicker } from "antd";
import SearchFilter from "../../commons/SearchFilter";
import {TableWrapper, Wrapper} from "../../commons/Wrapper";
import {Flex} from "../../commons/Flex";
import {
    USER_LIST,
    SUPERVISOR_TEAM_TASK,
    PROJECT_LIST_BY_KAM,
    REVIEW_STATUS_LISTVIEW, 
    ACTIVITY_REVIEW_UPDATE,
    ACTIVITY_STATUS_UPDATE,
    REVIEW_STATUS_RANGE,
    SUPERVISOR_TEAM_TASK_EXPORT,
    DEPARTMENT_LIST
} from "../../../scripts/api";
import {getData, postData} from "../../../scripts/api-service";
import ActivityForm from "../../task-activity/project-activity-list/Activity-Form";
import TaskDetails from "../../task-activity/project-activity-list/Task-Details";
import TaskBoard from "./Task-Board";
import TaskTableView from "./Task-Table-View";
import moment from 'moment';
import sales_task from "../../../assets/icons/test/sales_task_icon.svg";
import {alertPop} from "../../../scripts/message";
import {getPermissions} from '../../../scripts/helper';
import CommonModal from "../../commons/commonModal";

const { Option } = Select;

export default function TeamTask() {
    let searchUrl = window.location.search;
    let params = new URLSearchParams(searchUrl);
    let paramsKam = params.get('kam');
    let kamId = paramsKam ? paramsKam * 1 : undefined;
    let paramsProjectId = params.get('projectId');
    let projectId = paramsProjectId ? paramsProjectId * 1 : undefined;

    
    const [pageCount, setPageCount] = useState();
    const [selectedAssignee, setSelectedAssignee] = useState();
    const [departmentList, setDepartmentList] = useState();
    const [selectedDepartment, setSelectedDepartment] = useState();
    const [assigneeList, setAssigneeList] = useState();
    const [tableBody, setTableBody] = useState([]);
    const [isTaskUpdate, setIsTaskUpdate] = useState(false);
    const [modal, setModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState();
    const [detailsModal, setDetailsModal] = useState(false);
    const [refresh, doRefresh] = useState(0);
    const [showBorstView, setShowBorstView] = useState(false);
    const [searchValue, setSearchValue] = useState();
    const [startFrom, setStartFrom] = useState(moment().startOf('month').format('YYYY-MM-DD'));
    const [endFrom, setEndFrom] = useState(moment().endOf('month').format('YYYY-MM-DD'));
    // const [startFrom, setStartFrom] = useState();
    // const [endFrom, setEndFrom] = useState();
    const [projectID, setProjectID] = useState();
    const [projectLIst, setProjectLIst] = useState([]);
    const [reviewRatingList, setReviewRatingList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [milestoneStatus, setMilestoneStatus] = useState();
    const [seMileStatus, setSeMileStatus] = useState()
    const [review, setReview] = useState()
    const [nonBusiness, setNonBusiness] = useState(false);
    const [businessCount, setBusinessCount] = useState();
    const [NonBusinessCount, setNonBusinessCount] = useState();
    const [permission, setPermission] = useState();
    const [isDisabledType, setIsDisabledType] = useState(true);
    const [ratingRange, setRatingRange] = useState();
    const [reviewList, setReviewList] = useState([]);
    const [rowData, setRowData] = useState();
    const [status, setStatus] = useState();
    const [boardViewStatusFlag, setBoardViewStatusFlag] = useState('');
    const [kamList, setKAMList] = useState();
    const [selectedKAM, setSelectedKAM] = useState();
    const [searchString, setSearchString] = useState();

    // const search = (value) => {
    //     setSearchValue(value);
    // };

    // const filter = (date) => {
    //     setStartFrom(date?.date_from);
    //     setEndFrom(date?.date_to);
    //     if(date === null) getAllTaskData();
    // };

    const getReviewList = async () => {
        let res = await getData(REVIEW_STATUS_LISTVIEW);

        if (res) {
            let masterData = res?.data?.data;
            setReviewList(masterData);
        }
    }

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

    const getAllAssignee = async (id) => {
        let url = USER_LIST + "?department_id=" + id;
        let res = await getData(url);

        if (res) {
            let masterData = res?.data?.data;
            setAssigneeList(masterData);
        }
    }

    const getProjectList = async (id) => {
        let res = await getData(PROJECT_LIST_BY_KAM + '?kam=' + id);

        if (res) {
            let masterData = res?.data?.data?.data;
            setProjectLIst(masterData);
        }
    }

    const getDepartmentList = async () => {
        let res  = await getData(DEPARTMENT_LIST);
    
        if (res) {
            let masterData = res.data.data;
            setDepartmentList(masterData);
        }
    }

    const getAllTaskData = async (page) => {
        let url = SUPERVISOR_TEAM_TASK + "?";

        url = url + "&unreviewed_only=true";
        if (showBorstView) url = url + "&paginate=0";
        if (!showBorstView && currentPage) url = url + `&page=${currentPage}`;
        if (projectID) url = url + '&project_id=' + projectID;
        if (selectedKAM) url = url + '&kam=' + selectedKAM;
        if (kamId) url = url + '&kam=' + kamId;
        if (projectId) url = url + '&project_id=' + projectId;
        if (startFrom && endFrom ) url = url + '&from_date=' + startFrom + '&to_date=' + endFrom;
        if (selectedDepartment) url = url + '&assignee_department_id=' + selectedDepartment;
        if (selectedAssignee) url = url + '&assignee=' + selectedAssignee;
        if (searchValue) url = url + '&search=' + searchValue;
        if (seMileStatus) {
            if(seMileStatus === 'Reviewed') url = url.replace('&unreviewed_only=true','') + "&status=" + seMileStatus;
            else url = url + "&status=" + seMileStatus;
        }
        if (nonBusiness || permission === 'Non-Business') url = url + '&user_type=non-business';
        // nested logic because task review is triggered from projects page
        if (!nonBusiness || permission === 'Business') {
            if (kamId) url = url + '&kam=' + kamId;
            else url = url + '&user_type=business';
            //  url = url + '&user_type=business';
        }

        let res = await getData(url);

        if (res) {
            let masterData = res?.data?.data;

            if (!nonBusiness) {
                setBusinessCount(res?.data?.data?.total ? `[${res?.data?.data?.total}]` : `[${res?.data?.count}]`); 
                setNonBusinessCount(null);
            }
            if (nonBusiness) {
                setBusinessCount(null); 
                setNonBusinessCount(res?.data?.data?.total ? `[${res?.data?.data?.total}]` : `[${res?.data?.count}]`);
            }

            if (res.data.code === 200) {
                let activities = [],
                    userActivity = showBorstView ? (masterData || []) : (masterData.data || []);
                    // userActivity = masterData?.data || [];

                if (userActivity && userActivity.length) {
                    userActivity.forEach(act => {
                        act.isOverDue = moment().subtract(1, 'd') >= moment(act.due_date);
                        activities.push(act);
                    });
                }

                setTableBody(activities);
                if (!masterData?.data?.length) setCurrentPage(masterData.last_page);
                setPageCount(masterData.last_page);
            };
            
            setIsDisabledType(false);
        } 
    }

    const getReviewRating = async () => {
        let res = await getData(REVIEW_STATUS_LISTVIEW);

        if (res) {
            let masterData = res?.data?.data;
            setReviewRatingList(masterData);
        }
    }

    const postReviewData = async (value,id, flag, index) => {
        let reviewData = {}

        if(flag === "review"){
            reviewData = {
                review_status: parseInt(value),
                review_rating: undefined
            }
        }

        if(flag === "rating"){
            reviewData = {
                review_status: undefined,
                review_rating: parseInt(value) 
            }
        }
        
        let res = await postData(`${ACTIVITY_REVIEW_UPDATE}${id}`,reviewData);
        if (res) {
            let masterData = res?.data?.data;
            alertPop("success", "Successfully complete the process");
            // masterData['reviewRating']["id"] = masterData.review_status_id;
            // masterData["reviewRating"] = {};
            // masterData.reviewRating["id"] = masterData.review_status_id;
            masterData["review_status_id"] = masterData.review_status_id;
            masterData["review_rating"] = masterData.review_rating;

            tableBody[index] = masterData;
            if(flag === "rating") {
                if (!nonBusiness) {
                    setBusinessCount(businessCount - 1); 
                    setNonBusinessCount(null);
                }
                if (nonBusiness) {
                    setBusinessCount(null); 
                    setNonBusinessCount(NonBusinessCount - 1);
                }
                setTableBody(tableBody.splice(index, 1));
            }
            setTableBody([...tableBody]);
            getAllTaskData();
        }
    }

    const selectAssignee = (value) => {
        setSelectedAssignee(value);
        setProjectLIst(null);
        setProjectID(undefined);
        // getProjectList(value);
        setIsDisabledType(true);
    }

    const selectReview = async(value,id,index) => {
        // setReview(value);
        let flag = "review";
        postReviewData(value,id, flag, index);

        //rating range
        let res = await getData(REVIEW_STATUS_RANGE + `/${value}`);
        if (res) {
            setRatingRange(res?.data?.data)
        }
    }

    const selectRating = (value,id, index) => {
        let flag = "rating";
        postReviewData(value,id, flag, index);    
    }

    const projectFilter = (value) => {
        setProjectID(value);
    }

    const updateEvent = () => {
        // setIsTaskUpdate(true);
        doRefresh(prev => prev + 1)
    }

    const createTaskModalOpenHandler = () => {
        setModal(true)
        setSelectedProject({});
        setIsTaskUpdate(false);
    }

    const editTaskModalOpenHandler = (data) => {
        setModal(true);
        setSelectedProject(data);
        setIsTaskUpdate(true);
    }

    const detailsTaskModalOpenHandler = (data) => {
        setDetailsModal(true);
        setSelectedProject(data)
    }

    const updateCurrentpage = (page) => {
        // getAllTaskData(page)
    }

    const dateFilter = (value) => {
        switch(value) {
            case "yesterday":
                setStartFrom(moment().subtract(1,'days').format("YYYY-MM-DD"));
                setEndFrom(moment().subtract(1,'days').format("YYYY-MM-DD"));
                break;
            case "today":
                setStartFrom(moment().format('YYYY-MM-DD'));
                setEndFrom(moment().format('YYYY-MM-DD'));
                break;
            case "tomorrow":
                setStartFrom(moment().add(1,'days').format("YYYY-MM-DD"));
                setEndFrom(moment().add(1,'days').format("YYYY-MM-DD"));
                break;
            case "this_week":
                setStartFrom(moment().clone().startOf('week').format("YYYY-MM-DD"));
                setEndFrom(moment().clone().endOf('week').format("YYYY-MM-DD"));
                break;
            case "this_month":
                setStartFrom(moment().clone().startOf('month').format("YYYY-MM-DD"));
                setEndFrom(moment().clone().endOf('month').format("YYYY-MM-DD"));
                break;
            default:
                setStartFrom('');
                setEndFrom('');
        }
        setIsDisabledType(true);
    }

    const handleDateChange = (date, dateString) => {
        setStartFrom(dateString[0]);
        setEndFrom(dateString[1]);
    };

    const updateActionStatus = async ({activityId, status}) => {
        if (activityId && status) {
            let res = await postData(ACTIVITY_STATUS_UPDATE + activityId, {status: status});

            if (res && (res?.data?.code === 201 || res?.data?.code === 200)) {
                let masterData = res.data.data;
                setStatus(masterData?.status);
                setBoardViewStatusFlag("board-view");
                getAllTaskData();
                alertPop("success", "Successfully completed the process");
            } 
            // else {
            //     alertPop("error", res?.data?.messages[0]);
            //     if (res?.data?.code == 422) {
            //         alertPop("error", res?.data?.messages[0]);
            //     }else {
            //         alertPop("error", "Check your internet connection!");
            //     }
            // }
        }
    }

    const exportData = async () => {
        let url = SUPERVISOR_TEAM_TASK_EXPORT + '?';
        url = url + "&unreviewed_only=true";
        if(selectedDepartment) url += '&assignee_department_id=' + selectedDepartment;
        if(startFrom && endFrom ) url = url + '&from_date=' + startFrom + '&to_date=' + endFrom;
        if (selectedAssignee) url = url + '&assignee=' + selectedAssignee;
        if (searchValue) url = url + '&search=' + searchValue;
        if (nonBusiness || permission === 'Non-Business') url = url + '&user_type=non-business';
        if (!nonBusiness || permission === 'Business') url = url + '&user_type=business';
        if (seMileStatus) {
            if(seMileStatus === 'Reviewed') url = url.replace('&unreviewed_only=true','') + "&status=" + seMileStatus;
            else url = url + "&status=" + seMileStatus;
        } 
        
        let res = await getData(url);
        if(res){
            let masterData = res?.data?.data;
            window.open(masterData);
        }
    }

    useEffect(() => {
        // getAllAssignee();
        getDepartmentList();
        getPermissionsList();
        getReviewList();

        if (projectId && kamId) {
            getProjectList(kamId);
            getAllTaskData();
        }
    }, []);

    useEffect(() => {
        if (selectedKAM) getProjectList(selectedKAM);
    }, [selectedKAM]);

    useEffect(() => {
        if (selectedDepartment) getAllAssignee(selectedDepartment);
    }, [selectedDepartment]);

    useEffect(() => {
        if(!projectId && !kamId) getAllTaskData();
    }, [projectID, selectedAssignee, startFrom, endFrom, currentPage, seMileStatus, showBorstView, nonBusiness, refresh, selectedKAM, selectedDepartment])

    return (
        <>
            <Wrapper>
                {/* <div style={projectID && showBorstView ? {width: '96%'} : {width: '95%'}}> */}
                {/* <div>
                    <SearchFilter
                        search={search}
                        // filter={filter}
                        filterOptions={[{type: "date_range"}]}
                        failsafe
                    />
                </div> */}
                <Flex space="1rem" justify="normal">
                    {permission === 'Both' ? <Radio.Group defaultValue="1" buttonStyle="solid" style={{width: '20%'}}
                        onChange={() => {setIsDisabledType(true)}}>
                        <Radio.Button onClick={()=> setNonBusiness(false)} value="1" disabled={isDisabledType}>
                            Business 
                        </Radio.Button>
                        <Radio.Button onClick={()=> setNonBusiness(true)} value="2" disabled={isDisabledType}>
                            Non-Business
                        </Radio.Button>
                    </Radio.Group> : null}
                    <Input.Search
                        style={{width: '55%', 'marginRight': '1rem'}}
                        allowClear
                        placeholder="Input search text"
                        onChange={event=> setSearchValue(event.target.value || "")}
                        onSearch={getAllTaskData}
                        enterButton={<Button type="primary">Search</Button>}
                    />
                    <Button 
                        style={{width: '18%', 'marginRight': '1rem'}}
                        type="primary" 
                        onClick={exportData}><Icon type="download" 
                    />Download Excel</Button>
                </Flex>

                <Flex space="1rem" justify="normal">
                    {/* {permission === 'Both' ? <Radio.Group defaultValue="1" buttonStyle="solid" style={{width: '28%'}}
                        onChange={() => {setIsDisabledType(true)}}>
                        <Radio.Button onClick={()=> setNonBusiness(false)} value="1" disabled={isDisabledType}>Business {businessCount}</Radio.Button>
                        <Radio.Button onClick={()=> setNonBusiness(true)} value="2" disabled={isDisabledType}>Non-Business {NonBusinessCount}</Radio.Button>
                    </Radio.Group> : null} */}


                    {/* {!nonBusiness ? <Select allowClear={true} style={{width: '10%', 'marginRight': '1rem'}} 
                        placeholder='Project'
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                        option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0}
                        disabled={isDisabledType}
                        onChange={projectFilter}
                        value={projectId ? projectId : projectID }
                    >
                        {projectLIst && projectLIst.length
                            ? projectLIst.map((project) => {
                                return (
                                    <Option 
                                        key={project.id} 
                                        value={project.id}
                                    >
                                        {project.name}
                                    </Option>
                                )})
                            : ""
                        }
                    </Select>: null } */}
                    <Select 
                        allowClear={true} 
                        style={{width: '18%', 'marginRight': '1rem'}}
                        showSearch
                        placeholder="Department"
                        optionFilterProp="children"
                        onChange={(value)=> setSelectedDepartment(value)}
                        disabled={isDisabledType}
                        filterOption={(input, option) =>
                        option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }>
                        {departmentList && departmentList.length
                            ? departmentList.map((data) => {
                                return (
                                <Option 
                                    key={data.id} 
                                    value={data.id}
                                >
                                    {data.name}
                                </Option>
                                );
                            }) : ""
                        }
                    </Select>
                    <Select allowClear={true} style={{width: '18%', 'marginRight': '1rem'}}
                        showSearch
                        placeholder="Assignee"
                        optionFilterProp="children"
                        onChange={selectAssignee}
                        disabled={isDisabledType}
                        filterOption={(input, option) =>
                        option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }>
                        {assigneeList && assigneeList.length
                            ? assigneeList.map((data) => {
                                return (
                                <Option 
                                    key={data.id} 
                                    value={data.emp_id}
                                >
                                    {data.name}
                                </Option>
                                );
                            }) : ""
                        }
                    </Select>
                    <DatePicker
                        placeholder="Start Date"
                        size="medium"
                        format="YYYY-MM-DD"
                        value={moment(startFrom)}
                        onChange={(date, dateString)=>setStartFrom(dateString)}
                        style={{ width: '18%', 'marginRight': '1rem' }}
                    />
                    <DatePicker
                        placeholder="End Date"
                        size="medium"
                        format="YYYY-MM-DD"
                        defaultValue={moment(endFrom)}
                        onChange={(date, dateString)=>setEndFrom(dateString)}
                        style={{ width: '18%', 'marginRight': '1rem' }}
                    />
                    <Select allowClear={true} style={{width: '18%', 'marginRight': '1rem'}}
                        showSearch
                        placeholder="Status"
                        optionFilterProp="children"
                        onChange={(e) => {setSeMileStatus(e); setIsDisabledType(true)}}
                        // defaultValue={kamId}
                        disabled={isDisabledType}
                        filterOption={(input, option) =>
                        option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }>
                        <Select.Option key='Pending' value='Pending'>Pending</Select.Option>
                        <Select.Option key='To-Do' value='To-Do'>To-Do</Select.Option>
                        <Select.Option key='WIP' value='WIP'>WIP</Select.Option>
                        <Select.Option key='Hold' value='Hold'>Hold</Select.Option>
                        <Select.Option key='Done' value='Done'>Done</Select.Option>
                        <Select.Option key='Reviewed' value='Reviewed'>Reviewed</Select.Option>
                    </Select>

                    {/* <Button type="primary" onClick={exportData}><Icon type="download" />Download Excel</Button> */}
                </Flex>
                {tableBody ? 
                showBorstView ? 
                    <TaskBoard detailsModalShow={detailsTaskModalOpenHandler}
                        useActivity={tableBody}
                        updateActionStatus={updateActionStatus}
                        nonBusiness={nonBusiness}
                        setRowData={setRowData}
                        /> 
                    : <TaskTableView
                        detailsTaskModalOpenHandler={detailsTaskModalOpenHandler} 
                        useActivity={tableBody}
                        updateCurrentPage={updateCurrentpage}
                        pageCount={pageCount}
                        editTaskModalOpenHandler={editTaskModalOpenHandler}
                        // reviewRatingList={reviewRatingList}
                        reviewRatingList={reviewList}
                        selectReview={selectReview}
                        selectRating={selectRating}
                        refresh={refresh}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                        seMileStatus={seMileStatus}
                        nonBusiness={nonBusiness}
                        ratingRange={ratingRange}
                        setRowData={setRowData}
                    ></TaskTableView>
                : <LandingContent />
            }

            </Wrapper>

            {/* Create / Edit Modal */}
            <Modal
                // title={`${isTaskUpdate ? 'Update' : 'Create New'} Task/Activity`}
                title={[
                    <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'baseline'}}>
                        <span>{isTaskUpdate ? 'Update' : 'Create New'} Task/Activity</span>
                        <span>
                        {permission === 'Both' ? <Radio.Group  value={nonBusiness ? 2 : 1 } buttonStyle="solid" style={{width: '100%', marginLeft: '2rem'}}>
                            <Radio.Button onClick={()=> setNonBusiness(false)} value={1}>Business</Radio.Button>
                            <Radio.Button onClick={()=> setNonBusiness(true)} value={2}>Non-Business</Radio.Button>
                        </Radio.Group> : null}
                        </span>
                    </div>,
                ]}
                centered
                visible={modal}
                width="75vw"
                onCancel={() => {setModal(false); setSelectedProject()}}
                footer={false}
            >
                <ActivityForm 
                    setModal={setModal} 
                    activityDetails={selectedProject} isTaskUpdate={isTaskUpdate}
                    updateEvent={updateEvent}
                    nonBusiness={nonBusiness}
                />
            </Modal>

            {/* Details Modal */}
            <Modal
                title=""
                visible={detailsModal}
                width="60vw"
                onCancel={() => {setDetailsModal(false); setSelectedProject()} }
                footer={false}
            >
                {
                    selectedProject ? 
                    // <TaskDetails 
                    //     setModal={setModal} 
                    //     activityDetails={selectedProject}
                    //     updateEvent={updateEvent}
                    //     page={'task-review'}
                    //     reviewRatingList={reviewRatingList}
                    //     selectReview={selectReview}
                    //     selectRating={selectRating}
                    //     tableBody={tableBody}
                    //     nonBusiness={nonBusiness}
                    // /> 
                    <CommonModal 
                        setModal={setModal} 
                        page="task-review" 
                        reviewRatingList={reviewList} 
                        nonBusiness={nonBusiness} 
                        rowData={rowData}
                        updateEvent={updateEvent}
                        updatedStatus={status}
                        boardViewStatusFlag={boardViewStatusFlag}
                        setStatus={setStatus}
                    />
                    : ''
                }
                
            </Modal> 
        </>
    )
}

const LandingContent = () => {
    return (
        <div className="landing-content mt-5" style={{textAlign: 'center'}}>
            <img src={sales_task} height="200"/>
            <h2>Please Select Assignee And Project To Generate Data</h2>
        </div>
    )
}
