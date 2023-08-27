import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import { Select, Row , Col, Modal, Spin, Icon } from "antd";
import {Wrapper} from "../../commons/Wrapper";
import SearchFilter from "../../commons/SearchFilter";
import ProgressModal from "./progressModal";
import MilestoneProgress from "./milestoneProgress";
import sales_task from "../../../assets/icons/test/sales_task_icon.svg";
import { PROJECT_MILESTONE_LIST, MILESTONE_WISE_PROJECT_REPORT, USER_TEAM_LIST, ALL_PROJECT_SETUP_LIST } from '../../../scripts/api';
import { getData } from "../../../scripts/api-service";
import moment from 'moment';

const ProjectProgress = () =>{
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState();
    const [ tableData, setTableData ] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState();
    const [userTeamList, setUserTeamList] = useState([]);
    const [selectedKAM, setSelectedKAM] = useState();
    const [searchValue, setSeatch] = useState();
    const [projectDropedownList, setProjectDropedownList] = useState();
    const [projectMilestoneList, setProjectMilestoneList] = useState();
    const [selectedProject, setSelectedProject] = useState();
    const [activities, setActivities] = useState();
    const [milestoneData, setMilestoneData] = useState();
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    let { id } = useParams();

    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

    const search = (value) => {
        setSeatch(value);
    };

    const filter = (date) => {
        // setStartFrom(date?.date_from);
        // setEndFrom(date?.date_to);
        // if(date === null) getAllTaskData();
    };

    const paginate = (page) => setCurrentPage(page);

    const getProjectDropdownList = async () => {
        let res = await getData(ALL_PROJECT_SETUP_LIST);

        if (res) {
            let masterData = res.data.data || [];
            setProjectDropedownList(masterData);
        }
    }

    
    const getProjectMilestoneList = async () => {
        setLoading(true);
        let url = MILESTONE_WISE_PROJECT_REPORT + '?';
        if(selectedProject) url += "project_id=" + selectedProject;
        let res = await getData(url);

        if (res) {
            let masterData = res.data.data || [];
            setProjectMilestoneList(masterData);
            setLoading(false);
        }
    }

    const timeDifferentCalculation = (time) => {
        if (time) {
            let createdDateTime = moment(time);
            let todayDateTime = moment(new Date());
            
            if (todayDateTime.diff(createdDateTime, 'minutes') < 60) return todayDateTime.diff(createdDateTime, 'minutes') + ' min ago';
            else if (todayDateTime.diff(createdDateTime, 'hours') < 25) return todayDateTime.diff(createdDateTime, 'hours') + 'h ago';
            // else if (todayDateTime.diff(createdDateTime, 'years') < 365) return todayDateTime.diff(createdDateTime, 'years') + ' yr ago';
            else return todayDateTime.diff(createdDateTime, 'days') + 'd ago';
        }
    };

    useEffect(() => {
        getProjectDropdownList();
    }, []);

    useEffect(() => {
        if (selectedProject) {
            getProjectMilestoneList();
        }
    }, [selectedProject]);

    return(
        <>
            <Wrapper>
                <Row gutter={32} style={{padding:'1rem'}}>
                    <Col span={8}>
                        <Select 
                            allowClear={true}
                            style={{width: '100%', 'marginRight': '1rem'}} 
                            placeholder='Project Filter'
                            showSearch
                            value={selectedProject}
                            onChange={(value) => {setSelectedProject(value)}}
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
                    </Col>
                </Row>
                {projectMilestoneList ? 
                    projectMilestoneList?.milestones?.map(item=>{
                        return(
                            <div className="notification-items px-4 mt-3" key={`progress-${item.id}`}>
                                <div 
                                    className="notification-item" 
                                    key={1} 
                                    style={{background: '#e2e2e2'}}
                                    onClick={(value)=> {
                                        setModal(value);
                                        setActivities(item.activities);
                                        setMilestoneData({
                                            'milestone': item.milestone, 
                                            'progress': item.progress
                                        })
                                    }}
                                >
                                    <Row>
                                        <Col span={20}>
                                            <p>Milestone Name: {item.milestone?.full_name}</p>
                                            <h4>Milestone ID: {item.milestone?.id}</h4>
                                            <small>{timeDifferentCalculation(item.milestone?.created_at)}</small>
                                        </Col>
                                        <Col span={4} style={{textAlign: "center"}}>
                                            <h4 className="ml-2">{item.milestone?.status === 1 ? 'Active' : 'Inactive'}</h4>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        )
                    })
                    : 
                    <LandingContent loading={loading} icon={antIcon}/>
                }
            </Wrapper>

            <Modal 
                title=""
                visible={modal}
                width="60vw"
                onCancel={() => {setModal(false)}}
                footer={false}
                maskClosable={false}>
                    {/* <ProgressModal setModal={setModal} activities={activities} milestoneData={milestoneData}/>     */}
                    <MilestoneProgress activities={activities} milestoneData={milestoneData}/>    
            </Modal>
        </>
    )
}

export default ProjectProgress;

const LandingContent = ({loading, icon}) => {
    return (
        <div className="landing-content mt-5" style={{textAlign: 'center'}}>
            {loading ? 
                <Spin indicator={icon} /> 
            :
            <>
                <img src={sales_task} height="200"/>
               <h2>Please Select Department To Generate Data</h2>
            </>  
            }
        </div>
    )
}