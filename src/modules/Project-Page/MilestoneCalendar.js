import React, {useEffect, useState} from 'react';
import {TableWrapper, Wrapper} from "../commons/Wrapper";
import SearchFilter from "../commons/SearchFilter";
import {Flex} from "../commons/Flex";
import {Col, Row, Select} from "antd";
import MilestoneCalendar from "../commons/milestoneCalendar/index";
import {KAM_TARGET_PARAM, REVIEW_STATUS_LISTVIEW, ALL_PROJECT_SETUP_LIST, PROJECT_MILESTONE, MILESTONE_STATUS_LIST, DEPARTMENT_LIST, PROJECT_MILESTONE_SEARCH, USER_LIST} from "../../scripts/api";
import {getData, postData} from "../../scripts/api-service";

const { Option } = Select;

const ProjectCalendar = () =>{
    const [departments, setDepartments] = useState([]);
    const [viewType, setViewType] = useState('day');
    const [dateRange, setDateRange] = useState('');
    const [taskData, setTaskData] = useState();
    const [projectList, setProjectList] = useState([]);
    const [selectedProject, setSelectedProject] = useState();
    const [reviewLagent, setReviewLagent] = useState([]);
    const [selectedMilestone, setSelectedMilestone] = useState();
    const [searchText, setSearchText]  = useState();
    const [milestoneList, setMilestoneList] = useState([]);
    const [milestoneStatus, setMilestoneStatus] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState();
    const [kamList, setKamList] = useState();
    const [selectedKam, setSelectedKam] = useState()

    const search = (value) => {
        setSearchText(value)
    };

    const filter = (date) => {};

    const getAllProjects = async () => {
        let res = await getData(ALL_PROJECT_SETUP_LIST);

        if (res) {
            let masterData = res?.data?.data;
            setProjectList(masterData);
        }
    }

    // const getMilestoneList = async () => {
    //     let res = await getData(PROJECT_MILESTONE);

    //     if (res) {
    //         let masterData = res?.data?.data;
    //         setMilestoneList(masterData);
    //     }
    // }

    const getMilestoneStatus = async () => {
        let res = await getData(MILESTONE_STATUS_LIST);

        if (res) {
            let masterData = res?.data?.data;
            setMilestoneStatus(masterData);
        }
    }

    const handelViewType = (type) => {
        setViewType(type);
    }

    const handelDateRange = (date) => {
        setDateRange(date);
    }

    const getProjectMilestone = async () => {
        let query = {};

        if (dateRange?.start && dateRange?.end) {
            query.from_date = dateRange?.start;
            query.to_date = dateRange?.end;
        };

        if (selectedProject) query.project_id = selectedProject;
        if (searchText) query.search = searchText;
        if (selectedMilestone) query.project_milestone_id = selectedMilestone;
        if (selectedDepartment) query.kam_department_id = selectedDepartment;
        if (selectedKam) query.kam = selectedKam;

        let res = await postData(PROJECT_MILESTONE_SEARCH, query);

        if (res) {
            let masterData = res?.data?.data;
            setTaskData(masterData);
        }
    }

    const selectProject = (value) => {
        setSelectedProject(value);
    }

    const milestoneFilter = (value) => {
        setSelectedMilestone(value)
    }

    const getDepartments = async () => {
        let res  = await getData(DEPARTMENT_LIST);

        if (res) {
            let masterData = res.data.data;
            setDepartments(masterData);
        }
    }

    const getMilestoneReviewList = async () => {
        let res  = await getData(REVIEW_STATUS_LISTVIEW);

        if (res) {
            let masterData = res.data.data;
            setReviewLagent(masterData);
        }
    }

    const getKamList = async () => {
        let url = USER_LIST + '?department_id=' + selectedDepartment;
        let res = await getData(url);

        if (res) {
            let masterData = res?.data?.data;
            setKamList(masterData);
        }
    }

    useEffect(() => {
        getDepartments();
        getAllProjects();
        // getMilestoneList();
        getMilestoneStatus();
        getMilestoneReviewList();
    }, [])

    useEffect(() => {
        if (selectedDepartment) getKamList();
    }, [selectedDepartment])

    useEffect(() => {
        if (dateRange && dateRange.start && dateRange.end) {
            getProjectMilestone()
        }
    }, [dateRange, selectedProject, selectedKam, searchText, selectedDepartment])

    return (
        <Wrapper>
            {/* <SearchFilter
                search={search}
                filter={filter}
                // filterOptions={[]}
                failsafe
            /> */}
            <Flex space="1rem" justify="normal">
                <Select 
                    allowClear
                    style={{width: '30%', 'marginRight': '1rem'}} 
                    showSearch
                    placeholder='Department Filter'
                    onChange={(e) => setSelectedDepartment(e)}
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
                    allowClear
                    style={{width: '30%', 'marginRight': '1rem'}} 
                    placeholder='KAM Filter'
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                    option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0}
                     onChange={(v) => setSelectedKam(v)}>
                    {kamList && kamList.length
                        ? kamList.map((data) => {
                            return (
                            <Option key={data.emp_id} value={data.emp_id}>
                                {data.name}
                            </Option>
                            );
                        }) : ""
                    }
                </Select>
                <Select 
                    allowClear
                    style={{width: '30%', 'marginRight': '1rem'}}
                    showSearch
                    placeholder="Project Filter"
                    optionFilterProp="children"
                    onChange={selectProject}
                    filterOption={(input, option) =>
                    option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }>
                    {projectList && projectList.length
                        ? projectList.map((data) => {
                            return (
                            <Option key={data.id} value={data.id}>
                                {data.name}
                            </Option>
                            );
                        }) : ""
                    }
                </Select>
            </Flex>

            <div className="px-4 pt-4">
                <Row>
                    <Col span={12}>
                        <p>Milestone Legend</p>
                        <Flex className="mt-3" justify="normal">
                            {
                                milestoneStatus && milestoneStatus.length ? milestoneStatus.map(review => <span key={review.id} className="mr-3">
                                        <span className="badge-milestone" style={{background: review.color}}></span>
                                        {review.name}
                                    </span> ) : ''
                            }
                        </Flex>
                    </Col>
                    
                    <Col span={12}>
                        {
                            viewType !== 'month' && reviewLagent?.length ? <>
                            <p>Review Legend</p>
                                {
                                     reviewLagent.map(review => <span key={review.id} className="mr-3 mb-2" style={{display: "inline-block" }}>
                                            <span className="badge-review" style={{background: review.color}}></span>
                                            {review.name}
                                        </span> )
                                }
                            </> : ''
                        }
                    </Col>
                </Row>
            </div>

            <div className="p-4" style={{overflow: "scroll"}}>
                <MilestoneCalendar
                    milestones={taskData}
                    ProjectStatus= {milestoneStatus}
                    reviewLagent={reviewLagent}
                    handelViewType={handelViewType}
                    handelDateRange={handelDateRange}>    
                </MilestoneCalendar>
            </div>
        </Wrapper>
    )
}

export default ProjectCalendar;