import React, {useState, useEffect} from 'react';
import {Card, Select, Row, Col, Table, Button, Progress, Tag, Modal, Radio } from "antd";
import SearchFilter from "../../commons/SearchFilter";
import {TableWrapper, Wrapper} from "../../commons/Wrapper";
import {Flex} from "../../commons/Flex";
import demoUser from "../../../assets/dummy.jpg";
import { useHistory } from "react-router-dom";

import {SUPERVISOR_KAM_LIST, PROJECT_FILTER_PARAM, EMPLOYEE_FUNCTIONAL_ACTIVITIES} from "../../../scripts/api";
import {getData, postData} from "../../../scripts/api-service";

import MilestoneModal from "./MilestoneModal";
import TaskModal from "./TaskModal";
import {getPermissions} from '../../../scripts/helper';

const { Option } = Select;

export default function EmployeeList() {
    const history = useHistory();
    const [allEmployees, setAllEmployees] = useState([]);
    const [employees, setEmployees] = useState([]);
    // const [filterParam, setFilterParam] = useState();
    const [projectModal, setProjectModal] = useState();
    const [taskModal, settaskModal] = useState();
    const [overduetaskModal, setOverduetaskModal] = useState();
    const [selectedEmpId, setSelectedEmpId] = useState([]);
    const [filterData, setFilter] = useState();
    const [departments, setDepartments] = useState();
    const [selectedDepartment, setSelectedDepartment] = useState();
    const [nonBusiness, setNonBusiness] = useState();
    const [businessCount, setBusinessCount] = useState();
    const [NonBusinessCount, setNonBusinessCount] = useState();
    const [permission, setPermission] = useState();
    const [modalData, setModalData] = useState();
    const [isDisabledType, setIsDisabledType] = useState(true);

    const search = (value) => {
        setFilter((preState) => ({
            ...preState,
            search: value
        }))
    };

    const filter = (data) => {
        setFilter((preState) => ({
            ...preState,
            department_id: data?.department_id || null
        }))
    };

    const getPermissionsList = async () => {
        let permissions = await getPermissions();
        if (permissions && permissions.length) {
            const permNames = permissions.map((item) => item.name);
            if (permNames.includes('Business Activities') && permNames.includes('Non-Business Activities')) {
                setPermission('Both');
                setNonBusiness(false);
            } else if (permNames.includes('Business Activities')) {
                setPermission('Business');
                setNonBusiness(false);
            } else if (permNames.includes('Non-Business Activities')) {
                setPermission('Non-Business');
                setNonBusiness(true);
            }
        }
    }

    const getEmployees = async () => {
        let url = SUPERVISOR_KAM_LIST + '?';

        if (filterData?.search) url = url + '&search=' + filterData.search;
        if (selectedDepartment) url = url + '&department_id=' + selectedDepartment;
        // if (nonBusiness || permission === 'Non-Business') url = url + '&user_type=non-business';
        if (!nonBusiness || permission === 'Business') url = url + '&user_type=business';

        let res = await getData(url);

        if (res) {
            let masterData = res?.data?.data || [],
                departments = [];

            if (!nonBusiness) {
                setBusinessCount(`[${res?.data?.count}]` || null); 
                setNonBusinessCount(null);
            }

            masterData.forEach(item => {
                if (item.projects) {

                    let totalsCurrentMilestone = 0,
                        totalsRunningTask = 0,
                        totalsDueTasks = 0;

                    item.projects.forEach(pro => {
                        totalsCurrentMilestone += pro?.current_milestones?.length || 0;
                        totalsRunningTask += pro?.running_tasks?.length || 0;
                        totalsDueTasks += pro?.overdue_tasks?.length || 0;
                    });

                    item.totalsCurrentMilestone = totalsCurrentMilestone;
                    item.totalsRunningTask = totalsRunningTask;
                    item.totalsDueTasks = totalsDueTasks;
                }

                let index = departments.findIndex(de => de.id === item?.emp_department?.id);
                if (index === -1) departments.push(item?.emp_department);
            })

            setDepartments(departments);
            setAllEmployees(masterData);
            setEmployees(masterData);
            setIsDisabledType(false);
        }
    }

    const getNonBusinessEmployees = async () => {
        let url = EMPLOYEE_FUNCTIONAL_ACTIVITIES + '?';

        if (filterData?.search) url = url + '&search=' + filterData.search;
        if (selectedDepartment) url = url + '&department_id=' + selectedDepartment;
        if (nonBusiness || permission === 'Non-Business') url = url + '&user_type=non-business';
        // if (!nonBusiness || permission === 'Business') url = url + '&user_type=business';

        let res = await getData(url);

        if (res) {
            let masterData = res?.data?.data || [],
                departments = [];

            if (nonBusiness) {
                setBusinessCount(null); 
                setNonBusinessCount(`[${res?.data?.count}]` || null);
            }

            masterData.forEach(item => {
                    let totalsRunningTask = item?.running_functional_tasks_count,
                        totalsDueTasks = item?.overdue_functional_tasks_count;

                    item.totalsRunningTask = totalsRunningTask;
                    item.totalsDueTasks = totalsDueTasks;

                let index = departments.findIndex(de => de.id === item?.emp_department?.id);
                if (index === -1) departments.push(item?.emp_department);
            })

            setDepartments(departments);
            setAllEmployees(masterData);
            setEmployees(masterData);
            setIsDisabledType(false);
        }
    }

    const moveToProjectList = (data) => {
        history.push('/supervisor-panel/projects-list?kam=' + data.emp_id);
    }

    const columns = [
        {
            title: "Employee Name",
            key: "name",
            render: (r) => <a style={{wordWrap:'break-word'}} onClick={() => moveToProjectList(r)}> <u>{r?.name}</u> </a>,
        },
        {
            title: "RUNNING PROJECTS",
            render: (r) => <Button type="link"> {r?.projects?.length || 0} </Button>,
            key: "emp_id"
        },
        {
            title: "RUNNING MILESTONE",
            render: (r) => <Button type="link" onClick={() => {setProjectModal(true); setSelectedEmpId(r.emp_id)}}> 
                    <u>{r.totalsCurrentMilestone || 0}</u>
                </Button>,
            key: "emp_id"
        },
        {
            title: "RUNNING TASK",
            key: "emp_id",
            render: (r) => <Button type="link" onClick={() => {settaskModal(true); setSelectedEmpId(r.emp_id)}}> 
                   <u> {r?.totalsRunningTask || 0} </u>
                </Button>,
        },
        {
            title: "OVERDUE TASK",
            key: "emp_id",
            render: (r) => <Button type="link" style={{color: "#ff4d4f"}} 
                onClick={() => {setOverduetaskModal(true); setSelectedEmpId(r.emp_id)}}> 
                <u>{r?.totalsDueTasks || 0}</u> 
            </Button>,
        }
    ];

    const nonBusinessColumn = [
        {
            title: "Employee Name",
            key: "name",
            render: (r) => <a style={{wordWrap:'break-word'}} onClick={() => moveToProjectList(r)}> <u>{r?.name}</u> </a>,
        },
        {
            title: "RUNNING TASK",
            key: "emp_id",
            render: (r) => <Button type="link" onClick={() => {
                settaskModal(true); setSelectedDepartment(r.department_id);setModalData(r.running_functional_tasks);}}> 
                   <u> {r?.totalsRunningTask || 0} </u>
                </Button>,
        },
        {
            title: "OVERDUE TASK",
            key: "emp_id",
            render: (r) => <Button type="link" style={{color: "#ff4d4f"}} 
                onClick={() => {setOverduetaskModal(true); setSelectedDepartment(r.department_id);setModalData(r.overdue_functional_tasks); }}> 
                <u>{r?.totalsDueTasks || 0}</u> 
            </Button>,
        }
    ];

    const departmentSelect = (value) => {
        // setFilter((preState) => ({
        //     ...preState,
        //     department_id: value
        // }))
        setSelectedDepartment(value);
        let filter = allEmployees.filter(emp => emp?.department_id === value);

        setEmployees([...filter])
    }

    useEffect(() => {
        getPermissionsList();
    }, []);

    useEffect(() => {
        if (typeof nonBusiness === 'boolean' ) {
            if(nonBusiness) getNonBusinessEmployees();
            if(!nonBusiness)  getEmployees();    
        }
    }, [nonBusiness, filterData]);

    return (
        // <TableWrapper>
        <Wrapper>
            <SearchFilter
                search={search}
                // filter={filter}
                failsafe
            />

            <Flex space="1rem" justify="normal">
                {permission === 'Both' ? <Radio.Group defaultValue="1" buttonStyle="solid" style={{width: '32%'}} 
                    onChange={() => {setIsDisabledType(true)}}>
                    <Radio.Button onClick={()=> setNonBusiness(false)} value="1" disabled={isDisabledType}>
                        Business {businessCount}
                    </Radio.Button>
                    <Radio.Button onClick={()=> setNonBusiness(true)} value="2" disabled={isDisabledType}>
                        Non-Business {NonBusinessCount}
                    </Radio.Button>
                </Radio.Group> : null
                }
                <Select allowClear={true} style={{width: '25%', 'marginRight': '1rem'}} 
                    placeholder='Department Select'
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                    option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0}
                    onChange={departmentSelect}>
                    {departments && departments.length 
                        ? departments.map((dep) => {
                            return (
                                <Option key={dep.id} 
                                    value={dep.id}
                                >
                                    {dep.name}
                                </Option>
                            )})
                        : ""
                    }
                </Select>
            </Flex>

            <Table 
                dataSource={employees}  
                columns={nonBusiness ? nonBusinessColumn : columns}
                scroll={{ y: "calc(100vh - 20rem)" }}
                pagination={false} 
            />

            <Modal width="50vw"
                visible={projectModal}
                title="Running Milestone"
                onCancel={() => setProjectModal(false)}
                footer={null}>
                <MilestoneModal 
                    context={'rinning-milestone'}
                    selectedEmpId={selectedEmpId}
                    notTaskText={"This employee doesn't have any running milestone."}
                    ></MilestoneModal>
            </Modal>

            <Modal width="50vw"
                visible={taskModal}
                title="Running Tasks"
                onCancel={() => {settaskModal(false)}}
                footer={null}>
                <TaskModal
                    context={'running'}
                    selectedEmpId={selectedEmpId}
                    selectedDepartment={selectedDepartment}
                    notTaskText={"This employee doesn't have any running task."}
                    nonBusiness={nonBusiness}
                    modalData={modalData}>
                </TaskModal>
            </Modal>

            <Modal width="50vw"
                visible={overduetaskModal}
                title="Overdue Tasks"
                onCancel={() => {setOverduetaskModal(false)}}
                footer={null}>
                <TaskModal
                    context={'overDue'}
                    selectedEmpId={selectedEmpId}
                    selectedDepartment={selectedDepartment}
                    notTaskText={"This employee doesn't have any overdue task."}
                    nonBusiness={nonBusiness}
                    modalData={modalData}>
                </TaskModal>
            </Modal>
        </Wrapper>
    )
}
