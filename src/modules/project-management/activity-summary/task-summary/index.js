import React, {useEffect, useState} from 'react'
import {Select, Table, Progress, DatePicker, Radio } from "antd";
import SearchFilter from "../../../commons/SearchFilter";
import {Wrapper} from "../../../commons/Wrapper";
import {Flex} from "../../../commons/Flex";
import {getData} from "../../../../scripts/api-service";
import {
    SUPERVISOR_KAM_LIST,
    PROJECT_TASK_SUMMARY_LIST,
    DEPARTMENT_LIST,
    USER_TEAM_LIST,
    SUPERVISOR_WISE_KAM_LIST,
    PROJECT_ACTIVITY_SUMMARY_LIST
} from "../../../../scripts/api";

import sales_task from "../../../../assets/icons/test/sales_task_icon.svg";
import moment from "moment";
import {Link} from "react-router-dom";
import {getPermissions} from '../../../../scripts/helper';

export default function TaskSummary() {
    let searchUrl = window.location.search;
    let params = new URLSearchParams(searchUrl);
    let paramsKam = params.get('empId');
    let kamId = paramsKam ? paramsKam * 1 : undefined;
    
    const [pageCount, setPageCount] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [tableData, setTableData] = useState();
    const [kAMList, setKAMList] = useState();
    const [userList, setUserList] = useState([]);
    const [departmentList, setDepartmentList] = useState();
    const [searchValue, setSearchValue] = useState();
    const [startFrom, setStartFrom] = useState();
    const [endFrom, setEndFrom] = useState();
    const [selectedAssigneeId, setSelectedAssigneeId] = useState();
    const [departmentId, setDepartmentId] = useState();
    const [supervisor, selectSupervisor] = useState();
    const [nonBusiness, setNonBusiness] = useState(false);
    const [businessCount, setBusinessCount] = useState();
    const [NonBusinessCount, setNonBusinessCount] = useState();
    const [permission, setPermission] = useState();
    const [isDisabledType, setIsDisabledType] = useState(true);
    const [supervisorWiseKAMList, setSupervisorWiseKAMList] = useState();
    const [projectList, setProjectList] = useState();
    const [selectedProject, setSelectedProject] = useState();

    const search = (value) => {
        setSearchValue(value);
    };

    const filter = (date) => {
        setStartFrom(date?.date_from);
        setEndFrom(date?.date_to);
        // if(date === null) getAllTaskData();
    };

    const getKAMList = async () => {
        let res = await getData(USER_TEAM_LIST + '?department_id='+  departmentId);

        if (res) {
            let masterData = res?.data?.data;
            setKAMList(masterData);
            setUserList(masterData)
        }
    }

    const getSupervisorWiseKAMList = async () => {
        let res = await getData(SUPERVISOR_WISE_KAM_LIST + '/'+  supervisor);

        if (res) {
            let masterData = res?.data?.data;
            setSupervisorWiseKAMList(masterData);
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
            // else if (permNames.includes('Non-Business Activities')) {
            //     setPermission('Non-Business');
            //     setNonBusiness(true);
            // }
        }
    }

    const getAllProjects = async () => {
        let res = await getData(PROJECT_ACTIVITY_SUMMARY_LIST);

        if (res) {
            let masterData = res?.data?.data;
            setProjectList(masterData);
        }
    }

    const getDeaprtmentList = async () => {
        let res = await getData(DEPARTMENT_LIST);

        if (res) {
            let masterData = res?.data?.data;
            setDepartmentList(masterData);
        }
    }

    const getTaskSummaryList = async () => {
        let url = PROJECT_TASK_SUMMARY_LIST + "?";

        if (selectedAssigneeId) url = url + '&emp_id=' + selectedAssigneeId;
        if (departmentId) url = url + '&department_id=' + departmentId;
        if (supervisor) url = url + '&reporter_id=' + supervisor;
        if (startFrom && endFrom ) url = url + '&from_date=' + startFrom + '&to_date=' + endFrom;
        if (searchValue) url = url + '&search=' + searchValue;
        if (selectedProject) url = url + '&project_id=' + selectedProject;
        // if (nonBusiness || permission === 'Non-Business') url = url + '&user_type=non-business';
        // if (!nonBusiness || permission === 'Business') url = url + '&user_type=business';

        let res = await getData(url);

        if (res) {
            let masterData = res?.data?.data;
            setTableData(masterData);

            // if (!nonBusiness) {
            //     setBusinessCount(`[${res?.data?.count}]` || null); 
            //     setNonBusinessCount(null);
            // }
            // if (nonBusiness) {
            //     setBusinessCount(null); 
            //     setNonBusinessCount(`[${res?.data?.count}]` || null);
            // }
            setIsDisabledType(false);
        }
    }

    const selectKAM = (value) => {
        setSelectedAssigneeId(value);
    }

    const selectDepartment = (value) => {
        setDepartmentId(value);
        
        // let kams = userList.filter(k => k?.emp_department?.id == value);
        // setKAMList(kams);
    }

    const handleDateChange = (value) => {
        let from_date = moment(value._d).startOf('month');
        let end_date = moment(value._d).endOf('month');
        setStartFrom(moment(from_date).format('YYYY-MM-DD'));
        setEndFrom(moment(end_date).format('YYYY-MM-DD'));
    }

    const paginate = (page) => setCurrentPage(page);

    useEffect(() => {
        getDeaprtmentList();
        // getKAMList();
        getPermissionsList();
        getAllProjects();

        let searchUrl = window.location.search;
        let params = new URLSearchParams(searchUrl);
        let paramsKam = params.get('empId');
        let kamId = paramsKam ? paramsKam * 1 : undefined;

        if (kamId) setSelectedAssigneeId(kamId);
    }, [])

    useEffect(() => {
        getTaskSummaryList();
    }, [selectedAssigneeId, supervisor, departmentId, startFrom, endFrom, searchValue, nonBusiness, permission, selectedProject]);

    useEffect(() => {
        if(departmentId) getKAMList();
    }, [departmentId]);

    useEffect(() => {
        if(supervisor) getSupervisorWiseKAMList();
    }, [supervisor]);

    const columns = [
        {
            title: "EMPLOYEE",
            dataIndex: 'assigned_user',
            render: assigned_user => 
                <Link to={`/project-management/task-details?projectId=${selectedProject}`} style={{textDecoration: 'underline', color:'#5BB7FF'}}>
                    {assigned_user?.name}
                </Link>
        },
        {
            title: "DESIGNATION",
            dataIndex: 'assigned_user',
            render: assigned_user => <p>{assigned_user?.designation?.designation_name}</p>
        },
        {
            title: 'Task',
            children: [
                {
                    title: "TOTAL",
                    dataIndex: 'total',
                    key:'total',
                    render: total => <p style={{color: 'blue'}}>{total}</p>
                },
                {
                    title: "COMPLETE",
                    dataIndex: 'completed',
                    key:'completed',
                    render: completed => <p style={{color: 'green'}}>{parseInt(completed)}</p>

                },
                {
                    title: "DUE",
                    render: (row) => <p style={{color: 'red'}}>{row.total-row.completed}</p>
                },
                {
                    title: "PLANNED PROGRESS",
                    render: (row) => (
                       <Progress percent={Math.round(row.completed) !== 0 ? Math.round((Math.round(row.completed)/row.total) * 100) : 0} /> 
                    ),   
                },
            ],
        },
        {
            title: "AVERAGE RATING",
            dataIndex: 'review_score',
            render: review_score => review_score ? Math.round(review_score) : 0
        },
    ];

    return (
        <>
        <Wrapper>
            <SearchFilter
                search={search}
                filter={filter}
                filterOptions={[{type: "date_range"}]}
                failsafe
            />

            <Flex space="1rem" justify="normal">
                <Select allowClear={true} style={{width: '70%', 'marginRight': '1rem'}}
                    showSearch
                    placeholder="Project"
                    optionFilterProp="children"
                    onChange={(value)=>setSelectedProject(value)}
                    filterOption={(input, option) =>
                    option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }>
                    {projectList && projectList.length
                        ? projectList.map((data) => {
                            return (
                            <Select.Option key={data.id} value={data.id}>
                                {data.name}
                            </Select.Option>
                            );
                        }) : ""
                    }
                </Select>
            </Flex>
            {selectedProject ? 
            <Table 
                bordered 
                dataSource={tableData} 
                columns={columns}
                // scroll={{ y: "calc(100vh - 20rem)" }}
                pagination={{
                    current: currentPage,
                    total: pageCount * 10,
                    onChange: (page) => paginate(page),
                }} 
            /> : <LandingContent />}
        </Wrapper>
        </>
    )
}

const LandingContent = () => {
    return (
        <div className="landing-content mt-5" style={{textAlign: 'center'}}>
            <img src={sales_task} height="200"/>
            <h2>You Must Have Select Project To Generate Data</h2>
        </div>
    )
}