import React, {useState, useEffect} from 'react';
import {Card, Select, Table, Button, Tag, Progress, Modal, Icon } from "antd";
import SearchFilter from "../../commons/SearchFilter";
import {TableWrapper, Wrapper} from "../../commons/Wrapper";
import {Flex} from "../../commons/Flex";

import {PROJECT_LIST_BY_KAM, PROJECT_FILTER_PARAM, PROJECT_SETUP_PARAM, SUPERVISOR_KAM_LIST} from "../../../scripts/api";
import {getData, postData} from "../../../scripts/api-service";
import { useHistory } from "react-router-dom";
import MilestoneList from './Milestone-List';
import FailedMilestoneList from './FailedMilestoneList';
import TaskList from './Task-list';
import sales_task from "../../../assets/icons/test/sales_task_icon.svg";

export default function ProjectList() {
    let searchUrl = window.location.search;
    let params = new URLSearchParams(searchUrl);
    let paramsKam = params.get('kam');
    let kamId = paramsKam ? paramsKam * 1 : undefined;

    const history = useHistory();
    const [pageCount, setPageCount] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [projects, setProjects] = useState([]);
    const [filterParam, setFilterParam] = useState();
    const [projectSetupParams, setProjectSetupParams] = useState();
    const [filterData, setFilter] = useState();

    const [milestoenModal, setMilestoenModal] = useState();
    const [failedMilestoenModal, setFailedMilestoenModal] = useState();
    const [taskModal, setTaskModal] = useState();
    const [selectedProject, setSelectedProject] = useState();

    const search = (value) => {
        setFilter((preState) => ({
            ...preState,
            search: value
        }))
    };

    const filter = (date) => {
        //todo
        setFilter((preState) => ({
            ...preState,
            date: date
        }))
    };

    const getProjectLists = async () => {
        let url = PROJECT_LIST_BY_KAM + '?page=' + currentPage;

        if (filterData) {
            if (filterData.search) url = url + "&search=" + filterData.search;
            if (filterData.kam) url = url + "&kam=" + filterData.kam;
        }

        let res = await getData(url);

        if (res) {
            let masterData = res?.data?.data;
            setProjects(masterData.data);
            setPageCount(masterData.last_page);
        }
    }

    const getProjectFilterParams = async () => {
        // let res = await getData(PROJECT_FILTER_PARAM);
        let res = await getData(SUPERVISOR_KAM_LIST);

        if (res) {
            let masterData = res.data.data;
            if (res.data.code === 200) {
                setFilterParam(masterData);
            }
        }
    }

    const getProjectSetupParams = async () => {
        let res = await getData(SUPERVISOR_KAM_LIST);
        // let res = await getData(PROJECT_SETUP_PARAM);

        if (res) {
            let masterData = res.data.data;
            if (res.data.code === 200) {
                setProjectSetupParams(masterData)
            }
        }
    }

    const columns = [
        {
            title: "Project Name",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Total Milestone",
            render: (r) => <Button type="primary" onClick={() => {setMilestoenModal(true); setSelectedProject(r)}} ghost> {r?.milestones?.length || '0'} </Button>,
            key: "cb"
        },
        {
            title: "Failed Milestone",
            render: (r) => <Button type="danger" onClick={() => {setFailedMilestoenModal(true); setSelectedProject(r)}} ghost> {r?.failed_milestones?.length || '0'} </Button>,
            key: "cb"
        },
        {
            title: "Milestone Progress",
            key: "name",
            render: (row) => (
                <>
                {row?.current_milestones?.length > 0
                    ?
                    (row?.current_milestones?.map(current=>{
                        return(
                            <div style={{border: '1px solid #E8E8E8', padding: '0.5rem'}}>
                                <p style={{color:'#4B91FF'}}>{current.milestone.full_name}</p>
                                <Progress percent={current.progress} showInfo={false} />
                            </div>
                        )
                    }))
                    :<p>N/A</p>
                }
                </>
            ),
            width:'20%',
        },
        {
            title: "Total Task",
            render: (r) => <Button type="link">
                {r?.tasks?.length || '0'}
            </Button>,
            key: "cb"
        },
        {
            title: "Overdue Task",
            render: (r) => <Button type="link" onClick={() => {setTaskModal(true); setSelectedProject(r)}}>
                        <u>{r?.overdue_tasks?.length || '0'}</u>
                    </Button>,
            key: "cb"
        },
        {
            title: "Action",
            key: "action",
            render: (record) => (
                <>
                    <Button onClick={() => {showTaskReview(record.id, record?.kam?.emp_id);}} type="link">
                         Task Review
                    </Button><br />
                    <Button onClick={() => showMilestoenReview(record.id, record?.kam?.emp_id)} type="link">
                        Milestone Review
                    </Button>
                </>
            ),
        },
    ];

    const showTaskReview = (projectId, kamId) => {
        history.push('/supervisor-panel/task-review?projectId=' + projectId + '&kam=' + kamId);
    }

    const showMilestoenReview = (projectId, kamId) => {
        history.push('/supervisor-panel/milestone-review?projectId=' + projectId + '&kam=' + kamId);
    }

    const paginate = (page) => setCurrentPage(page);

    const kamSelect = (value) => {
        setFilter((preState) => ({
            ...preState,
            kam: value
        }))
    }

    useEffect(() => {
        if(filterData) getProjectLists();
    }, [currentPage]);

    useEffect(() => {
        if (currentPage === 1 && filterData) getProjectLists();
        else setCurrentPage(1);
    }, [filterData])

    
    useEffect(() => {
        getProjectSetupParams();

        setTimeout(() => {
            if (kamId) {
                setFilter((preState) => ({
                    ...preState,
                    kam: kamId
                }))
            }
        }, 1000)
    }, []);

    return (
        // <TableWrapper>
        <Wrapper>
            <SearchFilter
                search={search}
                filter={filter}
                // filterOptions={[{type: "date_range"}]}
                failsafe
            />

            <Flex space="1rem" justify="normal">
                {/* <Button type="secondary" style={{'marginRight': '1rem'}} >
                    <Icon type="left" />
                    Go back
                </Button> */}

                <Select allowClear={true} showSearch
                        defaultValue={kamId}
                        style={{width: '30%', 'marginRight': '1rem'}} 
                        placeholder='Select KAM'
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        onChange={kamSelect}>
                    {
                        projectSetupParams && projectSetupParams && projectSetupParams.length ? (
                            projectSetupParams.map(data => {
                                return <Select.Option key={data.emp_id} value={data.emp_id}>{data.name}</Select.Option>
                            })
                        ) : ''
                    }
                </Select>
            </Flex>
            {filterData 
                ? 
                    <Table dataSource={projects}  columns={columns}
                    // scroll={{ y: "calc(100vh - 20rem)" }}
                    pagination={{
                        current: currentPage,
                        total: pageCount * 10,
                        onChange: (page) => paginate(page),
                    }}/>
                : <LandingContent />
            }

            <Modal width="70vw"
                visible={milestoenModal}
                title="Milestone List (Total)"
                onCancel={() => {setMilestoenModal(false); setSelectedProject(null)}}
                footer={null}>
                <MilestoneList milestones={selectedProject?.milestones || []}> </MilestoneList>
            </Modal>

            <Modal width="70vw"
                visible={failedMilestoenModal}
                title="Failed Milestone List"
                onCancel={() => {setFailedMilestoenModal(false); setSelectedProject(null)}}
                footer={null}>
                <FailedMilestoneList milestones={selectedProject?.failed_milestones || []}> </FailedMilestoneList>
            </Modal>

            <Modal width="70vw"
                visible={taskModal}
                title="Task List (Overdue)"
                onCancel={() => {setTaskModal(false); setSelectedProject(null)}}
                footer={null}>
                <TaskList tasks={selectedProject?.overdue_tasks || []}></TaskList>
            </Modal>
        </Wrapper>
    )
}


const LandingContent = () => {
    return (
        <div className="landing-content mt-5" style={{textAlign: 'center'}}>
            <img src={sales_task} height="200"/>
            <h2>You Must Have Select KAM To Generate Data</h2>
        </div>
    )
}