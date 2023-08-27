import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Select, Button, Row, Col, Table, Tag, Progress, Divider, Icon } from "antd";
import { Wrapper } from "../../commons/Wrapper";
import SearchFilter from "../../commons/SearchFilter";
import expandActive from "../../../assets/expand-active.svg"
import expandInactive from "../../../assets/expand-inactive.svg";
import sales_task from "../../../assets/icons/test/sales_task_icon.svg";
import ProjectSummaryDetails from './ProjectSummaryDetails';
import { Link } from 'react-router-dom';
import { PROJECT_SUMMARY_LIST_BY_KAM, DEPARTMENT_LIST, USER_TEAM_LIST, ALL_PROJECT_SETUP_LIST, MILESTONE_WISE_PROJECT_REPORT_EXPORT } from '../../../scripts/api';
import { getData } from "../../../scripts/api-service";
import {
    getProgress, doneMilestone, wipMilestone,
    YTSMilestone, getDuePayment,
    getExpectedProgress, getActualProgress, getPaymentExpectedProgress, getPaymentActualProgress
} from "./helper";
import {alertPop} from "../../../scripts/message";

const ProjectSummary = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState();
    const [tableData, setTableData] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState();
    const [userTeamList, setUserTeamList] = useState([]);
    const [selectedKAM, setSelectedKAM] = useState();
    const [searchValue, setSeatch] = useState();
    const [projectDropedownList, setProjectDropedownList] = useState();
    const [selectedProject, setSelectedProject] = useState();
    const [isDisableFilter, setIsDisableFilter] = useState(false);
    let { id } = useParams();

    const search = (value) => {
        setSeatch(value);
    };

    const filter = (date) => {};

    const columns = [
        {
            title: "ID",
            dataIndex: "code",
            key: "id",
        },
        {
            title: "CLIENT",
            key: "client.id",
            render: project => <div>
                <h4>{project?.client?.name}</h4>
                <p>{project?.client_department?.department_name}</p>
            </div>,
        },
        {
            title: "PROJECT & DESCRIPTION",
            key: "desc",
            render: project => <div>
                <h4>{project?.name}</h4>
                <p>{project?.description}</p>
            </div>,
        },
        {
            title: "PROJECT VALUE",
            dataIndex: "value",
            key: "value",
        },
        {
            title: "FACTORS",
            dataIndex: "factors",
            key: "factors",
        },
        {
            title: "MILESTONES PROGRESS",
            render: project => showCurrentMilestoen(project),
        },
        {
            title: "",
            key: "progress",
            // width: "20px"
        }
    ];

    const showCurrentMilestoen = (project) => {
        let milestoen = project?.current_milestones?.length ? project.current_milestones[0]
            : project?.milestones?.length ? project?.milestones[0] : null;

        return milestoen ? <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: '10px' }}>
                <div style={{ display: 'flex' }}>
                    <p style={{ marginRight: '10px' }}><strong>{milestoen?.milestone?.full_name}</strong></p>
                    {milestoen?.milestone_status?.name &&
                        <Tag color={milestoen?.milestone_status?.color} style={{ height: '20px' }}><strong>{milestoen?.milestone_status?.name}</strong></Tag>}
                </div>
                <p>Progress: <strong>{milestoen?.progress}%</strong></p>
                <Progress percent={parseInt(milestoen?.progress)} showInfo={false} style={{ width: "70%" }} />
            </div>
        </div> : ''
    }

    const getProjectList = async () => {
        let url = PROJECT_SUMMARY_LIST_BY_KAM + '?';
        if (currentPage) url = url + '&page=' + currentPage;
        if (selectedDepartment) url = url + "&kam_department_id=" + selectedDepartment;
        if (selectedKAM) url = url + "&kam=" + selectedKAM;
        if (searchValue) url = url + "&search=" + searchValue;
        if (selectedProject) url = url + "&project_id=" + selectedProject;
        let res = await getData(url);

        if (res) {
            let masterData = res.data.data;
            setTableData(masterData.data);
            setPageCount(masterData.last_page);

            setIsDisableFilter(false);
        }
    };

    const paginate = (page) => setCurrentPage(page);

    const getDepartments = async () => {
        let res = await getData(DEPARTMENT_LIST);

        if (res) {
            let masterData = res.data.data;
            setDepartments(masterData);
        }
    }

    const selectDepartment = (value) => {
        setSelectedDepartment(value);
    }

    const getUserTeamList = async () => {
        let res = await getData(USER_TEAM_LIST + '?department_id=' + selectedDepartment);

        if (res) {
            let masterData = res?.data?.data || [];
            setUserTeamList(masterData);
        }
    }

    const getProjectDropdownList = async () => {
        let res = await getData(ALL_PROJECT_SETUP_LIST);

        if (res) {
            let masterData = res.data.data || [];
            setProjectDropedownList(masterData);
        }
    }

    const downloadData = async (id) => {
        let url = MILESTONE_WISE_PROJECT_REPORT_EXPORT + "?";
        if(id) {
            url += "project_id=" + id;
            let res = await getData(url);
            if(res){
                let masterData = res?.data?.data;
                window.open(masterData);
            }
            else alertPop("error", "Failed to download");
        }
        else alertPop("error", "Please select a project");
    }

    // useEffect(() => {
    //     getDepartments();
    //     getProjectDropdownList();
    // }, []);

    // useEffect(() => {
    //     if (selectedDepartment) {
    //         getUserTeamList();
    //         // getProjectList();
    //     }
    // }, [selectedDepartment]);

    // useEffect(() => {
    //     if( selectedDepartment && selectedKAM) getProjectList();
    // }, [selectedDepartment, selectedKAM]);

    // useEffect(() => {
    //     if( selectedProject) getProjectList();
    // }, [selectedProject]);

    useEffect(() => {
        getProjectList();
    }, [])

    return (
        <>
            <Wrapper>
                {/* <SearchFilter
                    search={search}
                    filter={filter}
                    filterOptions={false}
                    failsafe
                /> */}

                <Table
                    dataSource={tableData}
                    columns={columns}
                    pagination={{
                        current: currentPage,
                        total: pageCount * 10,
                        onChange: (page) => paginate(page),
                    }}
                    rowKey={record => record.id}
                    expandedRowRender={(project) =>
                        <Row gutter={32} style={{ display: 'flex', alignItems: 'center' }}>
                            <div>
                                <Col span={2}>
                                    <p style={{ fontWeight: 700, fontSize: '12px' }}>{project?.milestones?.length}</p>
                                    <p style={{ fontSize: '10px' }}>Total Milestone</p>
                                </Col>
                                <Col span={2}>
                                    <p style={{ fontWeight: 700, fontSize: '12px' }}>
                                        <span style={{ color: 'green' }}>{doneMilestone(project?.milestones)}</span>
                                        <span>/ {project?.milestones?.length}</span>
                                    </p>
                                    <p style={{ fontSize: '10px' }}>Done Milestone</p>
                                </Col>
                                <Col span={2}>
                                    <p style={{ fontWeight: 700, fontSize: '12px', color: '#FAAD14' }}>{wipMilestone(project?.milestones)}</p>
                                    <p style={{ fontSize: '10px' }}>WIP Milestone</p>
                                </Col>
                                <Col span={2}>
                                    <p style={{ fontWeight: 700, fontSize: '12px', color: 'red' }}>{project?.failed_milestones?.length}</p>
                                    <p style={{ fontSize: '10px' }}>Failed Milestone</p>
                                </Col>
                                <Col span={2}>
                                    <p style={{ fontWeight: 700, fontSize: '12px' }}>{YTSMilestone(project?.milestones)}</p>
                                    <p style={{ fontSize: '10px' }}>YTS Milestone</p>
                                </Col>
                                <Col span={2}>
                                    <Progress
                                        type="circle"
                                        percent={parseInt(getExpectedProgress(project.milestones))}
                                        width={30}
                                        strokeColor={{
                                            '0%': '#FAAD14',
                                            '100%': '#FAAD14',
                                        }}
                                    />
                                    <p style={{ fontSize: '10px' }}>Expected Progress</p>
                                </Col>
                                <Col span={2}>
                                    <Progress
                                        type="circle"
                                        percent={parseInt(getActualProgress(project.milestones))}
                                        width={30}
                                        strokeColor={{
                                            '0%': '#FAAD14',
                                            '100%': '#FAAD14',
                                        }}
                                    />
                                    <p style={{ fontSize: '10px' }}>Actual Progress</p>
                                </Col>
                                <Col span={1}>
                                    <Divider type="vertical" style={{ backgroundColor: '#E8E8E8', height: '100px' }} />
                                    {' '}
                                    <Divider type="vertical" style={{ backgroundColor: '#E8E8E8', height: '100px' }} />
                                </Col>
                                <Col span={2}>
                                    <p style={{ fontWeight: 700, fontSize: '12px', color: 'red' }}>{getDuePayment(project)}</p>
                                    <p style={{ fontSize: '10px' }}>Due/Extra Payment</p>
                                </Col>
                                <Col span={2}>
                                    <Progress
                                        type="circle"
                                        percent={parseInt(getPaymentExpectedProgress(project))}
                                        width={30}
                                        strokeColor={{
                                            '0%': '#1890FF',
                                            '100%': '#1890FF',
                                        }}
                                    />
                                    <p style={{ fontSize: '10px' }}>Expected Progress</p>
                                </Col>
                                <Col span={2}>
                                    <Progress
                                        type="circle"
                                        percent={parseInt(getPaymentActualProgress(project))}
                                        width={30}
                                        strokeColor={{
                                            '0%': '#1890FF',
                                            '100%': '#1890FF',
                                        }}
                                    />
                                    <p style={{ fontSize: '10px' }}>Actual Progress</p>
                                </Col>
                                <Col span={3} style={{ padding: '0px' }}>
                                    <div>
                                        <Link to={"/project-management/project-summary-details/" + project.id + "&d=" + (selectedDepartment || project?.client_department_id) + "&k=" + project?.kam?.emp_id}>
                                            <Button type="primary" style={{ margin: '5px', padding: '2px 5px', fontSize: '10px' }}>
                                                Milestones Details
                                            </Button>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link target="_blank" to={"/project-management/task-details?projectId=" + project.id + "&department=" + selectedDepartment}>
                                            <Button type="primary" style={{ margin: '5px', padding: '2px 5px', fontSize: '10px' }}>Tasks Details</Button>
                                        </Link>
                                    </div>
                                    <div>
                                        <Button type="primary" style={{margin: '5px', padding: '2px 5px', fontSize:'10px'}} onClick={()=>downloadData(project.id)}>Download Excel</Button>
                                    </div>
                                </Col>
                            </div>
                        </Row>
                    }
                    expandIconAsCell={false}
                    expandIcon={({ expanded, onExpand, record }) => <img className="activity-icon" onClick={e => onExpand(record, e)}
                        src={expanded ? expandActive : expandInactive} height="30" />}
                    expandIconColumnIndex={6}
                >
                </Table >
            </Wrapper>
        </>
    )
}

export default ProjectSummary;

const LandingContent = () => {
    return (
        <div className="landing-content mt-5" style={{ textAlign: 'center' }}>
            <img src={sales_task} height="200" />
            <h2>Please Select Department To Generate Data</h2>
        </div>
    )
}