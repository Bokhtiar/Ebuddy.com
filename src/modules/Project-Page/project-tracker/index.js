import React, { useState, useEffect } from 'react'
import { Button, Modal, Table, Select, Radio, Input, DatePicker } from "antd";
import SearchFilter from "../../commons/SearchFilter";
import { Wrapper } from "../../commons/Wrapper";
import { Flex } from "../../commons/Flex";
import { useHistory } from "react-router-dom";
import CreateProject from "./create-project";
import EditProject from "./edit-project";
import {alertPop} from "../../../scripts/message";
import {dateFormat} from "../../../scripts/helper";
import {getPermissions} from '../../../scripts/helper';
import { PROJECT_SETUP_LIST, PROJECT_SETUP_PARAM, PROJECT_SETUP_CREATE, PROJECT_SETUP_UPDATE, PROJECT_FILTER_PARAM, USER_TEAM_LIST, CLIENT_LIST, ALL_PROJECT_SETUP_LIST, MILESTONES, KAM_TARGET_PARAM, CLIENT_DROPDOWN_LIST, PROJECT_TRACKER_LIST } from "../../../scripts/api";
import { getData, postData } from "../../../scripts/api-service";
import * as Cookies from "js-cookie";
import ActivityForm from "../../task-activity/project-activity-list/Activity-Form";


const { Option } = Select;

const ProjectTrackerList = () => {
    const history = useHistory();
    const [modal, setModal] = useState();
    const [activityModal, setActivityModal] = useState(false);
    const [editModal, setEditModal] = useState();
    const [selectedProject, setSelectedProject] = useState();
    const [allData, setAllData] = useState();
    const [tableBody, setTableBody] = useState([]);
    const [projectSetupParams, setProjectSetupParams] = useState();
    const [refresh, doRefresh] = useState(0);
    const [editProjectId, setEdirProjectId] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState();
    const [filterParam, setFilterParam] = useState();
    const [selectedFilterValues, setSelectedFilterValues] = useState();
    const [isDetailsView, setIsDetailsView] = useState();
    const [userTeamList, setUserTeamList] = useState([]);
    const [canCreateProject, setCanCreateProject] = useState(false)
    const [canUpdateProject, setCanUpdateProject] = useState(false)
    const [clientList, setClientList] = useState()
    const [clientDropdownList, setClientDropdownList] = useState([])
    const [projects, setProjects] = useState()
    const [milestoneList, setMilestoneList] = useState()
    const [params, setParams] = useState()
    const [userInfo, setUserInfo] = useState();
    const [isTaskUpdate, setIsTaskUpdate] = useState();
    const [nonBusiness, setNonBusiness] = useState(false);
    const [permission, setPermission] = useState();
    const [selectedProjectId, setSelectedProjectId] = useState();
    const [resetCount, setResetCount] = useState(0);

    const milestoneFields = [
        {
            id: 1,
            label: "Milestone Name",
            name: "milestone_id",
            col: 5,
            component: (
                <Select 
                    size="large" 
                    placeholder="status" 
                    showSearch
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Select.Option value={1}>Milestone 1 </Select.Option>
                    <Select.Option value={0}>Milestone 2 </Select.Option>
                </Select>
            ),
        },
        {
            id: 2,
            label: "Serial",
            name: "serial",
            col: 3,
            component: (
                <Select size="large" placeholder="status" showSearch
                filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                // disabled={isDetailsView ? true : false}
                >
                    <Select.Option value={1}>Active</Select.Option>
                    <Select.Option value={0}>Inactive</Select.Option>
                </Select>
            ),
        },
        {
            id: 3,
            label: "Milestone Status",
            name: "milestone_status_id",
            col: 3,
            component: (
                <Select 
                    size="large" 
                    placeholder="status" 
                    showSearch
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Select.Option value={1}>Status 1 </Select.Option>
                    <Select.Option value={0}>Status 2 </Select.Option>
                </Select>
            ),
        },
        {
            id: 4,
            label: "Milestone Reason",
            name: "milestone_reason_id",
            col: 3,
            component: (
                <Select 
                    size="large" 
                    placeholder="reason" 
                    showSearch
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Select.Option value={1}>Reason 1 </Select.Option>
                    <Select.Option value={0}>Reason 2 </Select.Option>
                </Select>
            ),
        },
        {
            id: 5,
            label: "Plan Start Date",
            name: "plan_start_date",
            col: 4,
            component: (
                <DatePicker placeholder="Select start date" size="large"/>
            ),
        },
        {
            id: 6,
            label: "Plan End Date",
            name: "plan_end_date",
            col: 4,
            component: (
                <DatePicker placeholder="Select end date" size="large"/>
            ),
        },
        {
            id: 3,
            label: "",
            name: "id",
            col: 1,
            hiden: true,
            notRequired: true,
            component: <Input size="large" />,
        },
    ];

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

    const getUserInfo = async() => {
        let userProfile = await JSON.parse(Cookies.get("profile"));
        if(userProfile) setUserInfo(userProfile);
    }
    
    const getProjectFilterParams = async () => {
        let res = await getData(PROJECT_FILTER_PARAM);

        if (res) {
            let masterData = res.data.data;
            if (res.data.code === 200) {
                setFilterParam(masterData)
            }
        }
    }

    const getProjects = async () => {
        // let url = PROJECT_SETUP_LIST + '?';
        let url = PROJECT_TRACKER_LIST + '?';

        if (currentPage) url = url + '&page=' + currentPage;

        if (selectedFilterValues) {
            if (selectedFilterValues.search) url = url + '&search=' + selectedFilterValues.search;
            if (selectedFilterValues.date) url = url + '&from_date=' + selectedFilterValues.date?.date_from + '&to_date=' + selectedFilterValues.date?.date_to;
            if (selectedFilterValues?.department) {
                url = url + '&kam_department_id=' +selectedFilterValues?.department;
            }
            // if (selectedFilterValues?.kam?.length) url = url + '&kam=' + '[' + selectedFilterValues.kam + ']';
            if (selectedFilterValues?.kam) url = url + '&kam=' + '[' + selectedFilterValues.kam + ']';
            if (selectedFilterValues?.client_id) url = url + '&client_id=' + selectedFilterValues?.client_id;
            if (selectedFilterValues?.client_type) url = url + '&client_type=' + selectedFilterValues?.client_type;
            if (selectedFilterValues?.project_id) url = url + '&project_id=' + selectedFilterValues?.project_id;
            if (selectedFilterValues?.milestone_id) url = url + '&milestone_id=' + selectedFilterValues?.milestone_id;
            if (selectedFilterValues?.status) url = url + '&status=' + selectedFilterValues?.status;
            if (selectedFilterValues?.service_type_id) url = url + '&service_type_id=' + selectedFilterValues?.service_type_id;
            if (selectedFilterValues?.service_id) url = url + '&service_id=' + selectedFilterValues?.service_id;
        }
        
        let res = await getData(url);

        if (res) {
            let masterData = res.data.data;
            if (res.data.code === 200) {
                setAllData(masterData);
                prepareTableBody(masterData);
                setPageCount(masterData.last_page);
            } 
            // else {
            //     alertPop("error", "Check your internet connection!");
            // }
        }
    }

    const prepareTableBody = (masterData) => {
        let data = [];

        if (masterData && masterData?.data?.length) {
            
            masterData.data.map(e => {
                e.project_status = e.status ? 'Active' : 'Inactive';
                data.push(e);
            })

            setTableBody(data);
        } else setTableBody([]);
    }

    const getProjectSetupParams = async () => {
        let res = await getData(PROJECT_SETUP_PARAM);

        if (res) {
            let masterData = res.data.data;
            if (res.data.code === 200) {
                setProjectSetupParams(masterData)
            }
        }
    }

    const search = (serach) => {
        setSelectedFilterValues((preState) => ({
            ...preState,
            'search': serach
        }))
    };

    const filter = (date) => {
        setSelectedFilterValues((preState) => ({
            ...preState,
            'date': date
        }))
    };

    const departmentFilter = (value) => {
        setSelectedFilterValues((preState) => ({
            ...preState,
            'department': value
        }))
    }

    const clientFilter = (value) => {
        setSelectedFilterValues((preState) => ({
            ...preState,
            'client_id': value
        }))
    }

    const clientTypeFilter = (value) => {
        setSelectedFilterValues((preState) => ({
            ...preState,
            'client_type': value
        }))
    }

    const projectsFilter = (value) => {
        setSelectedFilterValues((preState) => ({
            ...preState,
            'project_id': value
        }))
    }

    const milestoneFilter = (value) => {
        setSelectedFilterValues((preState) => ({
            ...preState,
            'milestone_id': value
        }))
    }

    const statusFilter = (value) => {
        setSelectedFilterValues((preState) => ({
            ...preState,
            'status': value
        }))
    }

    const serviceTypeFilter = (value) => {
        setSelectedFilterValues((preState) => ({
            ...preState,
            'service_type_id': value
        }))
    }

    const serviceFilter = (value) => {
        setSelectedFilterValues((preState) => ({
            ...preState,
            'service_id': value
        }))
    }
    const KAMFilter = (value) => {
        setSelectedFilterValues((preState) => ({
            ...preState,
            'kam': value
        }));
    }

    const columns = [
        {
            title: "PROJECT NAME",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "KAM",
            dataIndex: "kam.name",
            key: "kam",
        },
        {
            title: "DEPARTMENT",
            dataIndex: "client_department.department_name",
            key: "department",
        },
        {
            title: "CLIENT",
            dataIndex: "client.name",
            key: "client",
        },
        {
            title: "CREATED BY",
            // dataIndex: "created_by.name",
            key: "created_by",
            render: (row) => <>
                <p className="mb-1">{row?.created_by?.name}</p>
                <p>{dateFormat(row.created_at)}</p>
            </>
        },
        {
            title: "STATUS",
            dataIndex: "project_status",
            key: "status",
        },
        {
            title: "Action",
            key: "action",
            render: (row) => 
            <>
                <Button type="link" onClick={() => {setEditModal(true); setEdirProjectId(row.id); doRefresh(prev => prev + 1); setIsDetailsView(true)}} >Details</Button>
                { canUpdateProject ? 
                    <Button 
                        type="link" 
                        onClick={() => {
                            setEditModal(true); 
                            setEdirProjectId(row.id); 
                            doRefresh(prev => prev + 1); 
                            setIsDetailsView(false)
                        }} 
                    >Edit
                    </Button> 
                : '' }
                <Button type="link" onClick={() => {showRoadmapSetup(row.id)}} >Roadmap</Button>
                <Button type="link" onClick={() => {showTaskActivity(row.id)}} >Activities</Button>
            </>,
        },
    ];

    const showRoadmapSetup = (projectId) => {
        history.push('/project-page/project-roadmap-setup?projectId=' + projectId);
    }

    const showTaskActivity = (projectId) => {
        // history.push('/task-activity/task-activity-list?projectId=' + projectId);
        creteTaskModalOpenHandler(projectId);
    }

    const creteTaskModalOpenHandler = (projectId) => {
        setActivityModal(true);
        setSelectedProject({});
        setIsTaskUpdate(false);
        setSelectedProjectId(projectId);
    }

    const createProject = async (projectData) => {
        let res = await postData(PROJECT_SETUP_CREATE, projectData);

        if (res) {
            if (res.data?.code === 200 || res.data?.code === 201) {
                getProjects();
                setModal(false);
                alertPop("success", "Successfully compete the process");
            }
            // else{
            //     alertPop("error", res?.data?.messages[0]);
            // }
        }
        //  else {
        //     alertPop("error", "Check your internet connection!");
        // }
    };

    const editProject = async (project) => {
        let res = await postData(PROJECT_SETUP_UPDATE + editProjectId, project);

        if (res) {
            if (res.data?.code === 200 || res.data?.code === 201) { 
                getProjects();
                setEditModal(false);
                setEdirProjectId(null);
                alertPop("success", "Successfully compete the process");
            } 
            // else {
            //     alertPop("error", res?.data?.messages[0]);
            // }
        } 
        // else {
        //     alertPop("error", "Check your internet connection!");
        // }
    };

    const getUserTeamList = async () => {
        let res = await getData(USER_TEAM_LIST);

        if (res) {
            setUserTeamList(res.data.data)
        }
    }

    const getClientList = async () => {
        let res = await getData(CLIENT_LIST);
        if (res) {
            // console.log('client', res.data.data?.data);
            let masterData = res.data.data?.data;
            setClientList(masterData);
        }
    }

    const getProjectsList = async () => {
        let res = await getData(ALL_PROJECT_SETUP_LIST);
    
        if (res) {
          let masterData = res.data.data;
          setProjects(masterData);
        }
      };

    const getMilestoneList = async () => {
        let res = await getData(MILESTONES);

        if (res) {
            let masterData = res?.data?.data?.data;
            setMilestoneList(masterData);
        }
    }

    const getKamTargetList = async () => {
        let url = KAM_TARGET_PARAM;
        let res = await getData(url);
        let masterData = res?.data?.data;
        setParams(masterData);
    }

    const paginate = (page) => setCurrentPage(page);

    const checkPemissions = async () => {
        let permissions = await getPermissions();

        if (permissions && permissions.length) {
            const permNames = permissions.map((item) => item.name);
            
            if (permNames.includes('Can create project')) {
                setCanCreateProject(true);
            }
            if (permNames.includes('Can update project')) {
                setCanUpdateProject(true)
            }
        }
    }

    useEffect(() => {
        // getProjects(PROJECT_SETUP_LIST);
        getProjectSetupParams();
        getProjectFilterParams();
        getUserTeamList();
        getClientList();
        // getClientDropdownList();
        getProjectsList();
        getMilestoneList();
        getKamTargetList();
        checkPemissions();
        getUserInfo();
    }, []);

    useEffect(() => {
        setTableBody([]);
        getProjects();
    }, [currentPage]);

    
    useEffect(() => {
        if (currentPage === 1) getProjects();
        else setCurrentPage(1);
    }, [selectedFilterValues])

    return (
        <Wrapper>
            <SearchFilter
                search={search}
                filter={filter}
                filterOptions={[{ type: "date_range" }]}
                failsafe
            />

            <Flex space="1rem" justify="normal">
                {
                    canCreateProject ? <Button onClick={() => {setModal(true); doRefresh(prev => prev + 1); setIsDetailsView(false) }} 
                        width="40%" type="primary" style={{'marginRight': '1rem'}}>
                        Create New Project
                    </Button> : ''
                }
                
                {/* <Select mode="multiple" showSearch
                        style={{width : '30%', 'marginRight': '1rem'}} 
                        placeholder='Kam Department' 
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        onChange={departmentFilter}>
                    {
                        filterParam && filterParam['departments'] && filterParam['departments'].length ? (
                            filterParam['departments'].map(data => {
                                return <Select.Option key={data.id} value={data.id}>{data.department_name}</Select.Option>
                            })
                        ) : ''
                    }
                </Select> */}

                <Select     
                        // mode="multiple"
                        allowClear
                        showSearch
                        style={{width : '30%', 'marginRight': '1rem'}} 
                        placeholder='Select Department' 
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        onChange={departmentFilter}>
                    {
                        filterParam && filterParam['departments'] && filterParam['departments'].length ? (
                            filterParam['departments'].map(data => {
                                return <Select.Option key={data.id} value={data.id}>{data.department_name}</Select.Option>
                            })
                        ) : ''
                    }
                </Select>

                {/* <Select mode="multiple" showSearch
                        style={{width : '30%', 'marginRight': '1rem'}} 
                        placeholder='Select KAM' 
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        onChange={KAMFilter}>
                    {
                        filterParam && filterParam.kams && filterParam.kams.length ? (
                            filterParam.kams.map(data => {
                                return <Select.Option key={data.emp_id} value={data.emp_id}>{data.name}</Select.Option>
                            })
                        ) : ''
                    }
                </Select> */}
                
                <Select 
                    showSearch 
                    allowClear
                    style={{width : '30%', 'marginRight': '1rem'}} 
                    placeholder='Select KAM'
                    optionFilterProp="children"
                    // value={userInfo?.emp_id || ''}
                    onChange={KAMFilter}
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }>
                    {
                        userTeamList && userTeamList.length ? (
                            userTeamList.map(data => {
                                return <Select.Option key={data.emp_id} value={data.emp_id}>{data.name}</Select.Option>
                            })
                        ) : ''
                    }
                </Select>

                <Select 
                    showSearch
                    allowClear
                    style={{width : '30%', 'marginRight': '1rem'}} 
                    placeholder='Select Client Type' 
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    onChange={clientTypeFilter}>
                    <Select.Option key="Client" value="Client">Client</Select.Option>
                    <Select.Option key="Vendor" value="Vendor">Vendor</Select.Option>
                    <Select.Option key="Partners" value="Partners">Partners</Select.Option>
                </Select>

                {/* <Select showSearch
                    style={{width : '30%', 'marginRight': '1rem'}} 
                    placeholder='Select Client' 
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    onChange={clientFilter}>
                    {clientList?.map(data => {
                                return <Select.Option key={data.id} value={data.id}>{data.name}</Select.Option>
                            })
                    }
                </Select> */}

                {/* <Select showSearch
                    style={{width : '30%', 'marginRight': '1rem'}} 
                    placeholder='Select Projects' 
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    onChange={projectsFilter}>
                    {projects?.map(data => {
                                return <Select.Option key={data.id} value={data.id}>{data.name}</Select.Option>
                            })
                    }
                </Select> */}

                {/* <Select showSearch
                    style={{width : '30%', 'marginRight': '1rem'}} 
                    placeholder='Select Milestones' 
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    onChange={milestoneFilter}>
                    {milestoneList?.map(data => {
                                return <Select.Option key={data.id} value={data.id}>{data.full_name}</Select.Option>
                            })
                    }
                </Select> */}

                <Select 
                    allowClear
                    style={{width: '30%', 'marginRight': '1rem'}} 
                    placeholder='Service Type'
                    showSearch
                    dropdownMatchSelectWidth={false}
                    onChange={serviceTypeFilter}
                    filterOption={(input, option) =>
                        option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0}
                >
                    {params?.service_type.map(service=>{
                        return(
                            <Select.Option key={service.id} value={service.id}>{service.name}</Select.Option>
                        )
                    })}
                </Select>

                {/* <Select 
                    // mode="multiple" 
                    style={{width: '30%', 'marginRight': '1rem'}} 
                    placeholder='Service'
                    showSearch
                    dropdownMatchSelectWidth={false}
                    onChange={serviceFilter}
                    filterOption={(input, option) =>
                        option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0}
                >
                   {params?.service.map(service=>{
                        return(
                            <Select.Option key={service.id} value={service.id}>{service.full_name}</Select.Option>
                        )
                    })}
                </Select> */}

                <Select 
                    showSearch
                    allowClear
                    style={{width : '30%', 'marginRight': '1rem'}} 
                    placeholder='Select Status' 
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    onChange={statusFilter}>
                     <Select.Option key="0" value="0">Inactive</Select.Option>
                     <Select.Option key="1" value="1">Active</Select.Option>
                </Select>
            </Flex>

            <Table 
                rowKey={record => record?.id}
                dataSource={tableBody} 
                columns={columns} 
                scroll={{
                    x: 2000,
                    y: 600
                }}
                // scroll={{ y: "calc(100vh - 20rem)" }}
                pagination={{
                current: currentPage,
                total: pageCount * 10,
                onChange: (page) => paginate(page),
                }} />

            <Modal
                title="Create New Project"
                centered
                visible={modal}
                width="75vw"
                onCancel={() => {setModal(false); setIsDetailsView(false)}}
                footer={false}
            >
                <CreateProject 
                    setModal={setModal} 
                    project={selectedProject} 
                    projectSetupParams={projectSetupParams}
                    createProject={createProject}
                    refresh={refresh}
                    userTeamList={userTeamList} 
                    milestoneFields={milestoneFields}
                />
            </Modal>

            <Modal
                title= {isDetailsView ? 'Project Details' : "Update Project"}
                centered
                visible={editModal}
                width="75vw"
                onCancel={() => {setEditModal(false); setIsDetailsView(false)}}
                footer={false}
            >
                <EditProject 
                    setModal={setEditModal}
                    projectSetupParams={projectSetupParams}
                    editProject={editProject}
                    refresh={refresh}
                    projectId={editProjectId}
                    type="edit"
                    isDetailsView={isDetailsView}
                    userTeamList={userTeamList}
                    setIsDetailsView={setIsDetailsView}
                    milestoneFields={milestoneFields}
                ></EditProject>
            </Modal>


            <Modal
                // title={`${isTaskUpdate ? 'Update' : 'Create New'} Task/Activity`}
                title={[
                    <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'baseline'}}>
                        <span>{isTaskUpdate ? 'Update' : 'Create New'} Task/Activity</span>
                        {
                            !isTaskUpdate ? <span>
                                {permission === 'Both' ?<Radio.Group value={nonBusiness ? 2 : 1 } buttonStyle="solid" style={{width: '100%', marginLeft: '2rem'}}>
                                    <Radio.Button onClick={()=> setNonBusiness(false)} value={1}>Business</Radio.Button>
                                    <Radio.Button onClick={()=> setNonBusiness(true)} value={2}>Non-Business</Radio.Button>
                                </Radio.Group> : null}
                            </span> : ''
                        }
                    </div>,
                ]}
                centered
                visible={activityModal}
                width="75vw"
                onCancel={() => {setActivityModal(false); setSelectedProject(); setResetCount(resetCount + 1)}}
                footer={false}
            >
                <ActivityForm 
                    setModal={setActivityModal} 
                    activityDetails={selectedProject} 
                    isTaskUpdate={isTaskUpdate} 
                    // updateEvent={updateEvent}
                    resetCount={resetCount} 
                    projectId={selectedProjectId} 
                    nonBusiness={nonBusiness} 
                    setNonBusiness={setNonBusiness}
                    flag="project-list"
                    modal={activityModal}
                />
            </Modal>

        </Wrapper>
    )
}

export default ProjectTrackerList
