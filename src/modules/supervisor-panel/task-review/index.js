import React, {useState,useEffect} from 'react';
import {Select,Button,Input, Modal,Icon,Alert, Radio, Row, Col } from "antd";
import SearchFilter from "../../commons/SearchFilter";
import {TableWrapper, Wrapper} from "../../commons/Wrapper";
import {Flex} from "../../commons/Flex";
import {
    SUPERVISOR_KAM_LIST,
    PROJECT_LIST_BY_ASSIGNEE,
    PROJECT_LIST_BY_KAM,
    ALL_PROJECT_SETUP_LIST, 
    ACTIVITY_TASK_REVIEW, 
    REVIEW_STATUS_LISTVIEW, 
    ACTIVITY_REVIEW_UPDATE,
    ACTIVITY_RATING_UPDATE,
    ACTIVITY_STATUS_UPDATE,
    MILESTONE_STATUS_LIST,
    REVIEW_STATUS_RANGE,
    KAM_LIST,
    TASK_MULTIPLE_REVIEW_RATING
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

export default function TaskReview() {
    let searchUrl = window.location.search;
    let params = new URLSearchParams(searchUrl);
    let paramsKam = params.get('kam');
    let kamId = paramsKam ? paramsKam * 1 : undefined;
    let paramsProjectId = params.get('projectId');
    let projectId = paramsProjectId ? paramsProjectId * 1 : undefined;

    const [pageCount, setPageCount] = useState();
    const [selectedAssignee, setSelectedAssignee] = useState();
    const [assigneeList, setAssigneeList] = useState();
    const [tableBody, setTableBody] = useState([]);
    const [isTaskUpdate, setIsTaskUpdate] = useState(false);
    const [modal, setModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState();
    const [detailsModal, setDetailsModal] = useState(false);
    const [refresh, doRefresh] = useState(0);
    const [showBorstView, setShowBorstView] = useState(false);
    const [searchValue, setSearchValue] = useState();
    const [startFrom, setStartFrom] = useState();
    const [endFrom, setEndFrom] = useState();
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
    const [rating, setRating] = useState();
    const [multipleReviewUpdateModal, setMultipleReviewUpdateModal] = useState();
    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [hasSelected, setHasSelected] = useState(false);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            if(selectedRowKeys.length > 0){
                setHasSelected(true);
                setSelectedRowIds(selectedRowKeys);
            } 
            else setHasSelected(false);
        }
    };

    const search = (value) => {
        setSearchValue(value);
    };

    const filter = (date) => {
        setStartFrom(date?.date_from);
        setEndFrom(date?.date_to);
        if(date === null) getAllTaskData();
    };

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

    const getAllAssignee = async () => {
        let res = await getData(SUPERVISOR_KAM_LIST);

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

    const getKAMList = async () => {
        let res = await getData(KAM_LIST);

        if (res) {
            let masterData = res?.data?.data;
            setKAMList(masterData);
        }
    }

    const getAllTaskData = async (page) => {
        let url = ACTIVITY_TASK_REVIEW + "?";

        url = url + "&unreviewed_only=true";
        if (showBorstView) url = url + "&paginate=0";
        if (!showBorstView && currentPage) url = url + `&page=${currentPage}`;
        if (projectID) url = url + '&project_id=' + projectID;
        if (selectedKAM) url = url + '&kam=' + selectedKAM;
        if (kamId) url = url + '&kam=' + kamId;
        if (projectId) url = url + '&project_id=' + projectId;
        if (startFrom && endFrom ) url = url + '&from_date=' + startFrom + '&to_date=' + endFrom;
        if (selectedAssignee) url = url + '&assignee=' + selectedAssignee;
        if (searchValue) url = url + '&search=' + searchValue;
        if (seMileStatus) {
            if(seMileStatus === 'Reviewed') url = url.replace('&unreviewed_only=true','') + "&status=" + seMileStatus;
            else url = url + "&status=" + seMileStatus;
        }
        if (nonBusiness || permission === 'Non-Business') url = url + '&user_type=non-business';
        //nested logic because task review is triggered from projects page
        if (!nonBusiness || permission === 'Business') {
            // if (kamId) url = url + '&kam=' + kamId;
            // else url = url + '&user_type=business';
             url = url + '&user_type=business';
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
        let flag = "review";
        setReview(value);
        if(value && id && (typeof index === "number")) {
            postReviewData(value,id, flag, index);
        }

        //rating range
        let res = await getData(REVIEW_STATUS_RANGE + `/${value}`);
        if (res) {
            setRatingRange(res?.data?.data)
        }
    }
    

    const selectRating = (value,id, index) => {
        let flag = "rating";
        setRating(value);
        if(value && id && (typeof index === "number")){
            postReviewData(value,id, flag, index);  
        }   
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

    const updateActionStatus = async ({activityId, status}) => {
        if (activityId && status) {
            let res = await postData(ACTIVITY_STATUS_UPDATE + activityId, {status: status});

            if (res && (res?.data?.code === 201 || res?.data?.code === 200)) {
                let masterData = res.data.data;
                setStatus(masterData?.status);
                setBoardViewStatusFlag("board-view");
                getAllTaskData(projectID);
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

    const updateReviewRatingFromModal = async() =>{
        let payload = {
            "activites": selectedRowIds,
            "review_status": review,
            "review_rating": rating
        }

        let res = await postData(TASK_MULTIPLE_REVIEW_RATING, payload);
        if (res) {
            let masterData = res?.data?.data;
            alertPop("success", "Process completed successfully!");
            getAllTaskData();
            setRating();
            setReview();
        }
    }

    useEffect(() => {
        getAllAssignee();
        // getReviewRating();
        getPermissionsList();
        getReviewList();
        getKAMList();

        if (projectId && kamId) {
            getProjectList(kamId);
            getAllTaskData();
        }
    }, []);

    useEffect(() => {
        if (selectedKAM) getProjectList(selectedKAM);
    }, [selectedKAM]);

    useEffect(() => {
        if(!projectId && !kamId) getAllTaskData();
    }, [searchValue, projectID, selectedAssignee, startFrom, endFrom, currentPage, seMileStatus, showBorstView, nonBusiness, refresh, selectedKAM])

    return (
        <>
            <Wrapper>
                {/* <div style={{width: projectID && showBorstView ? '96%' : '95%'}}> */}
                <div>
                    <SearchFilter
                        search={search}
                        filter={filter}
                        filterOptions={[{type: "date_range"}]}
                        failsafe
                    />
                </div>

                <Flex space="1rem" justify="normal">
                    {/* onClick={() => {setModal(true); doRefresh(prev => prev + 1) }}  */}
                    {/* <Button 
                        width="40%" 
                        type="primary" 
                        style={{'marginRight': '1rem'}}
                        onClick={createTaskModalOpenHandler}
                    >
                        Create New Activity
                    </Button> */}
                    {/* <Button type="secondary" style={{'marginRight': '1rem'}} >
                        <Icon type="left" />
                        Go back
                    </Button> */}
                    {permission === 'Both' ? <Radio.Group defaultValue="1" buttonStyle="solid" style={{width: '28%'}}
                        onChange={() => {setIsDisabledType(true)}}>
                        <Radio.Button onClick={()=> setNonBusiness(false)} value="1" disabled={isDisabledType}>Business {businessCount}</Radio.Button>
                        <Radio.Button onClick={()=> setNonBusiness(true)} value="2" disabled={isDisabledType}>Non-Business {NonBusinessCount}</Radio.Button>
                    </Radio.Group> : null}

                    <Select allowClear={true} style={{width: '12%', 'marginRight': '1rem'}} 
                        placeholder='KAM'
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                        option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0}
                        disabled={isDisabledType}
                        onChange={(value)=>setSelectedKAM(value)}
                        defaultValue={kamId}
                        // value={projectID || undefined}
                    >
                        {kamList && kamList.length
                            ? kamList.map((kam) => {
                                return (
                                    <Option 
                                        key={kam.emp_id} 
                                        value={kam.emp_id}
                                    >
                                        {kam.name}
                                    </Option>
                                )})
                            : ""
                        }
                    </Select>
                    {!nonBusiness ? <Select allowClear={true} style={{width: '12%', 'marginRight': '1rem'}} 
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
                    </Select>: null }
                    <Select allowClear={true} style={{width: '12%', 'marginRight': '1rem'}}
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
                    <Select allowClear={true} style={{width: '12%', 'marginRight': '1rem'}} 
                    placeholder='Date' onChange={dateFilter} disabled={isDisabledType} showSearch filterOption={(input, option) =>
                        option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }>
                        <Select.Option key='Y' value='yesterday'>Yesterday</Select.Option>
                        <Select.Option key='G' value='today'>Today</Select.Option>
                        <Select.Option key='R' value='tomorrow'>Tomorrow</Select.Option>
                        <Select.Option key='B' value='this_week'>This Week</Select.Option>
                        <Select.Option key='A' value='this_month'>This Month</Select.Option>
                    </Select>

                    <Select allowClear={true} style={{width: '12%', 'marginRight': '1rem'}}
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
                </Flex>

                <Flex space="1rem" justify="normal">
                    <Button disabled={showBorstView || isDisabledType} onClick={() => {
                        setShowBorstView(true); setIsDisabledType(true)
                    }}>
                        <Icon type="appstore"/>
                    </Button>
                    <Button disabled={!showBorstView || isDisabledType} onClick={() => {
                        setShowBorstView(false); setIsDisabledType(true)
                    }}>
                        <Icon type="unordered-list"/>
                    </Button>
                    <div className="ml-3 pt-2">View Type ({showBorstView ? 'Board View' : 'List View'})</div>
                    <Button 
                        style={{width: '20%', 'marginLeft': '5rem'}}
                        type="primary" 
                        // size="large" 
                        disabled={!hasSelected}
                        onClick={() => {setMultipleReviewUpdateModal(true)}}
                    > Multiple Review Update
                    </Button>
                </Flex>
                {
                    // selectedAssignee && projectID ? (
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
                            rowSelection={rowSelection}
                        ></TaskTableView>
                    // ) : <LandingContent />
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

            {/* multiple status update modal */}
            <Modal
                title="Multiple Review Update"
                visible={multipleReviewUpdateModal}
                width="60vw"
                onCancel={() => { setMultipleReviewUpdateModal(false) }}
                footer={[
                    <Button
                        key={1} 
                        type="primary" 
                        // size="large" 
                        onClick={() => {
                            updateReviewRatingFromModal();
                            setMultipleReviewUpdateModal(false);
                        }}
                    > Submit
                    </Button>,
                  ]}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Select 
                            style={{width: '100%'}}
                            showSearch
                            placeholder="Review"
                            optionFilterProp="children"
                            value={review ? review : undefined}
                            onChange={(value)=> selectReview(value)}
                            filterOption={(input, option) =>
                            option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {reviewList?.map(reviewRating=>{
                                return(
                                    <Select.Option 
                                        key={reviewRating.id} 
                                        value={reviewRating.id}
                                    >
                                        {reviewRating.name}
                                    </Select.Option>
                                )
                            })}
                        </Select>
                    </Col>
                    <Col span={12}>
                        <Select 
                            style={{width: '100%'}}
                            showSearch
                            placeholder="Rating"
                            optionFilterProp="children"
                            value={rating ? rating : undefined}
                            onChange={(event)=>selectRating(event)}
                            filterOption={(input, option) =>
                            option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                        >
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
