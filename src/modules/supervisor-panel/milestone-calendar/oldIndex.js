import React, {useEffect, useState} from 'react';
import {TableWrapper} from "../../commons/Wrapper";
import SearchFilter from "../../commons/SearchFilter";
import {Flex} from "../../commons/Flex";
import {Col, Row, Select} from "antd";
import Calendar from "../../commons/Calendar/index";
import {TASK_CALENDAR, SUPERVISOR_KAM_LIST, PROJECT_LIST_BY_ASSIGNEE, PROJECT_MILESTONE, MILESTONE_STATUS_LIST} from "../../../scripts/api";
import {getData, postData} from "../../../scripts/api-service";
import sales_task from "../../../assets/icons/test/sales_task_icon.svg";

const { Option } = Select;

export default function MilestoneCalendar() {
    const [viewType, setViewType] = useState('day');
    const [dateRange, setDateRange] = useState('');
    const [taskData, setTaskData] = useState();
    const [projectList, setProjectList] = useState([]);
    const [selectedProject, setSelectedProject] = useState();
    const [reviewLagent, setReviewLagent] = useState([]);
    const [selectedMilestone, setSelectedMilestone] = useState();
    const [searchText, setSearchText]  = useState();
    const [milestoneList, setMilestoneList] = useState([]);
    const [kamList, setKamList] = useState([]);
    const [selectedKam, setSelectedKam] = useState();
    const [milestoneStatus, setMilestoneStatus] = useState([]);

    const search = (value) => {
        setSearchText(value)
    };

    const filter = (date) => {};

    const getKamList = async () => {
        let res = await getData(SUPERVISOR_KAM_LIST);

        if (res) {
            let masterData = res?.data?.data;
            setKamList(masterData);
        }
    }

    const getMilestoenStatusList = async () => {
        let res = await getData(MILESTONE_STATUS_LIST);

        if (res) {
            let masterData = res?.data?.data;
            setMilestoneStatus(masterData);
        }
    }

    const selectKam = (value) => {
        setSelectedKam(value);
        getProjectList(value);
        setSelectedProject();
    }

    const getProjectList = async (assigneeId) => {
        let res = await getData(PROJECT_LIST_BY_ASSIGNEE + assigneeId);

        if (res) {
            let masterData = res?.data?.data;
            setProjectList(masterData);
        }
    }

    const getMilestoneList = async () => {
        let res = await getData(PROJECT_MILESTONE);

        if (res) {
            let masterData = res?.data?.data;
            setMilestoneList(masterData);
        }
    }

    const handelViewType = (type) => {
        setViewType(type);
    }

    const handelDateRange = (date) => {
        setDateRange(date);
    }

    const getTaskData = async () => {
        let url = TASK_CALENDAR + '?';
        if (dateRange?.start && dateRange?.end) url = url + `&from_date=${dateRange?.start}&to_date=${dateRange?.end}`;
        if (selectedProject) url = url + `&project_id=${selectedProject}`;
        if (selectedKam) url = url + `&kam=${selectedKam}`;

        if (searchText) url = url + `&search=${searchText}`;
        if (selectedMilestone) url = url + `&project_milestone_id=${selectedMilestone}`;

        let res = await getData(url);

        if (res) {
            let masterData = res?.data?.data;
            setTaskData(masterData?.activities);
            setReviewLagent(masterData.review_legend);
        }
    }

    const selectProject = (value) => {
        setSelectedProject(value);
    }

    const milestoneFilter = (value) => {
        setSelectedMilestone(value)
    }

    useEffect(() => {
        getKamList();
        getMilestoneList();
        getMilestoenStatusList();
    }, [])

    useEffect(() => {
        if (selectedProject || (dateRange && dateRange.start && dateRange.end)) {
            getTaskData()
        }
    }, [dateRange, selectedProject, selectedMilestone, searchText])

    return (
        <TableWrapper>
            <SearchFilter
                search={search}
                filter={filter}
                // filterOptions={[]}
                failsafe
            />
            <Flex space="1rem" justify="normal">
                <Select style={{width: '30%', 'marginRight': '1rem'}}
                    showSearch
                    placeholder="Select KAM"
                    optionFilterProp="children"
                    onChange={selectKam}
                    filterOption={(input, option) =>
                    option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }>
                    {kamList && kamList.length
                        ? kamList.map((data) => {
                            return (
                            <Option key={data.id} value={data.emp_id}>
                                {data.name}
                            </Option>
                            );
                        }) : ""
                    }
                </Select>

                <Select style={{width: '30%', 'marginRight': '1rem'}}
                    showSearch
                    placeholder="Select Project"
                    optionFilterProp="children"
                    onChange={selectProject}
                    value={selectedProject || undefined}
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

                <Select style={{width: '30%', 'marginRight': '1rem'}} 
                    placeholder='Milestone List'
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                    option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0}
                     onChange={milestoneFilter}>
                    {milestoneList && milestoneList.length
                        ? milestoneList.map((data) => {
                            return (
                            <Option key={data.id} value={data.id}>
                                {data.full_name}
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
                            viewType !== 'month' && reviewLagent.length ? <>
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
                {/* {
                    selectedKam && selectedProject ?  */}
                    <Calendar
                        tasks={taskData}
                        ProjectStatus= {milestoneStatus}
                        reviewLagent={reviewLagent}
                        handelViewType={handelViewType}
                        handelDateRange={handelDateRange}>    
                    </Calendar> 
                     {/* : <LandingContent></LandingContent>
                 } */}
                
            </div>
        </TableWrapper>
    )
}

const LandingContent = () => {
    return (
        <div className="landing-content mt-5" style={{textAlign: 'center'}}>
            <img src={sales_task} height="200"/>
            <h2>You Must Have Select KAM And Project To Generate Data</h2>
        </div>
    )
}
