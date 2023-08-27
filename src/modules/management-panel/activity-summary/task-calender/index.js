import React, {useEffect, useState} from 'react';
import {TableWrapper} from "../../../commons/Wrapper";
import SearchFilter from "../../../commons/SearchFilter";
import {Flex} from "../../../commons/Flex";
import {Col, Row, Select, Radio} from "antd";
import Calendar from "../../../commons/Calendar/index";
import {TASK_CALENDAR, ALL_PROJECT_SETUP_LIST, PROJECT_MILESTONE, MILESTONE_STATUS_LIST} from "../../../../scripts/api";
import {getData, postData} from "../../../../scripts/api-service";
import {getPermissions} from '../../../../scripts/helper';

const { Option } = Select;
const ProjectStatus = [
    {
        id: 1,
        text: "To-Do",
        color: "#0bc20b"
    },
    {
        id: 2,
        text: "WIP",
        color: "#fdac18"
    },
    {
        id: 3,
        text: "Done",
        color: "#747474"
    },
    {
        id: 4,
        text: "Reviewed",
        color: "#f5222d"
    }
]

export default function UserActivityCalendar() {
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
    const [nonBusiness, setNonBusiness] = useState(false);
    const [businessCount, setBusinessCount] = useState();
    const [NonBusinessCount, setNonBusinessCount] = useState();
    const [permission, setPermission] = useState();
    const [isDisabledType, setIsDisabledType] = useState(true);

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

    const getMilestoneList = async () => {
        let res = await getData(PROJECT_MILESTONE);

        if (res) {
            let masterData = res?.data?.data;
            setMilestoneList(masterData);
        }
    }

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

    const getTaskData = async () => {

        if (permission) {
            let url = TASK_CALENDAR + '?';
            
            if (permission === 'Non-Business') url = url + '&user_type=non-business';
            else if (permission === 'Business') url = url + '&user_type=business';
            else if (permission === 'Both' && nonBusiness ) url = url + '&user_type=non-business';
            else if (permission === 'Both' && !nonBusiness ) url = url + '&user_type=business';
            
            if (dateRange?.start && dateRange?.end) url = url + `&from_date=${dateRange?.start}&to_date=${dateRange?.end}`;
            if (selectedProject) url = url + `&project_id=${selectedProject}`;
            if (searchText) url = url + `&search=${searchText}`;
            if (selectedMilestone) url = url + `&project_milestone_id=${selectedMilestone}`;
            // if (nonBusiness || permission === 'Non-Business') url = url + '&user_type=non-business';
            // if (!nonBusiness || permission === 'Business') url = url + '&user_type=business';

            let res = await getData(url);

            if (res) {
                let masterData = res?.data?.data;
                let activityCount = masterData?.activities?.length;
                if (!nonBusiness) {
                    setBusinessCount(activityCount > 0 ? `[${activityCount}]` : null); 
                    setNonBusinessCount(null);
                }
                if (nonBusiness) {
                    setBusinessCount(null); 
                    setNonBusinessCount(activityCount > 0 ? `[${activityCount}]` : null);
                }
                setTaskData(masterData?.activities);
                setReviewLagent(masterData.review_legend);

                
                setIsDisabledType(false);
            }
        }
    }

    const selectProject = (value) => {
        setSelectedProject(value);
    }

    const milestoneFilter = (value) => {
        setSelectedMilestone(value)
    }

    useEffect(() => {
        getAllProjects();
        getMilestoneList();
        getMilestoneStatus();
        getPermissionsList();
    }, [])

    // useEffect(() => {
    //     if (dateRange && dateRange.start && dateRange.end) {
    //         getTaskData();
    //     }
    // }, [dateRange])

    useEffect(() => {
        if (selectedProject || selectedMilestone || searchText || dateRange) {
            getTaskData();
        }
    }, [selectedProject, selectedMilestone, searchText, dateRange, permission, nonBusiness])

    return (
        <TableWrapper>
            <SearchFilter
                search={search}
                filter={filter}
                // filterOptions={[]}
                failsafe
            />
            <Flex space="1rem" justify="normal">
                {permission === 'Both' ? <Radio.Group defaultValue="1" buttonStyle="solid" style={{width: '32%'}}
                    onChange={() => {setIsDisabledType(true)}}>
                    <Radio.Button onClick={()=> setNonBusiness(false)} value="1" disabled={isDisabledType}>Business {businessCount}</Radio.Button>
                    <Radio.Button onClick={()=> setNonBusiness(true)} value="2" disabled={isDisabledType}>Non-Business {NonBusinessCount}</Radio.Button>
                </Radio.Group> : null}
                <Select allowClear={true} style={{width: '30%', 'marginRight': '1rem'}}
                showSearch
                placeholder="Project List"
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
                <Select allowClear={true} style={{width: '30%', 'marginRight': '1rem'}} 
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
                <Calendar
                    tasks={taskData}
                    ProjectStatus= {milestoneStatus}
                    reviewLagent={reviewLagent}
                    handelViewType={handelViewType}
                    handelDateRange={handelDateRange}
                    nonBusiness={nonBusiness}>    
                </Calendar>
            </div>
        </TableWrapper>
    )
}
