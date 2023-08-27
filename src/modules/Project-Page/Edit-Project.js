import React, {useState, useEffect} from 'react';
import { PROJECT_SETUP_VIEW } from "../../scripts/api";
import { getData, postData } from "../../scripts/api-service";
import { CreateStepperForm } from "../commons/CreateStepperForm/CreateStapperFormDND";
import { Checkbox, Input, Radio, Select } from "antd";
import MilestoneConfigure from "./MilestoneConfigure";

const { Option } = Select;

export default function EditProject(props) {
    const {setModal, setIsDetailsView, projectId, projectSetupParams, editProject, refresh, type, isDetailsView, userTeamList} = props;
    const [departmentContents, setDepartmentContents] = useState([]);
    const [milestones, setMilestones] = useState([]);
    const [project, setProject] = useState();
    const [departments, setdepartments] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [selectedDepartment, setSelecetdDepartment] = useState();
    const [clients, setClients] = useState([])

    useEffect(() => {
        let clients = projectSetupParams?.clients || [],
            content = [];

            setClients(clients);

            clients.forEach(c => {
                if (c?.departments.length) content.push(c.departments);
            });
            // var result = content.reduce((r, e) => (r.push(...e), r), [])

            // setDepartmentContents(result);
    }, []);

    useEffect(() => {
        getProjectData();
    }, [projectId])

    const getProjectData = async () => {
        if (projectId) {
            let res = await getData(PROJECT_SETUP_VIEW + projectId);

            if (res) {
                let masterData = res.data.data;
                setProject(masterData);
                    selectctClient(masterData?.client_id, true);
                    setContactsList(masterData.client_id, masterData?.client_department_id)

                if (masterData?.industry_type?.id) {
                    selectIndustry(masterData?.industry_type?.id);
                }
            }
        }
    }

    const changeMilestone = (data) => {
        setMilestones(data);
    }

    const selectctClient = (value, check) => {
        if (projectSetupParams?.clients && projectSetupParams?.clients.length) {
            let find = projectSetupParams.clients.find(e => e.id === value);
            let activeDepartments = find?.departments?.filter(dept=> dept.status === 1);
            setdepartments(activeDepartments || []);
            setSelecetdDepartment();
            if (!check) setContacts([])
        }
    }

    const selectDepartment = (value) => {
        if (departments && departments.length) {
            setSelecetdDepartment(value);
            let find = departments.find(e => e.id === value);
            let activeContacts = find?.contacts?.filter(contact=> contact.status === 1);
            setContacts(activeContacts || []);
        }
    }

    const setContactsList = (clientId, depId) => {
        if (projectSetupParams?.clients && projectSetupParams?.clients.length) {
            
            let find = projectSetupParams.clients.find(e => e.id === clientId);
            let activeDepartments = find?.departments?.filter(dept=> dept.status === 1);
            let departments = activeDepartments || [];
            let dep = departments.find(d => d.id === depId);
            let activeContacts = dep?.contacts?.filter(contact=> contact.status === 1);
            setContacts(activeContacts || []);
        }
    }

    const selectIndustry = (value) => {
        if (projectSetupParams?.clients && projectSetupParams?.clients.length) {
           let clients = projectSetupParams.clients.filter(e => e.industry_type_id === value);
           setClients(clients);
        }
    } 

    const generalFields = [
        {
            id: 1,
            label: "Project Code",
            name: "code",
            // full: true,
            value: project?.code || '',
            component: <Input size="large" placeholder="Enter Code" disabled/>,
        },
        {
            id: 2,
            label: "Project Name",
            name: "name",
            value: project?.name || '',
            component: <Input size="large" placeholder="Enter name" disabled={isDetailsView}/>,
        },
        {
            id: 3,
            label: "Project Type",
            name: "project_type",
            value: project?.project_type || '',
            component: <Radio.Group name="radiogroup" disabled={isDetailsView}>
                            <Radio value="Commercial">commercial</Radio>
                            <Radio value="Non-commercial">Non-Commercial</Radio>
                        </Radio.Group>,
        },
        {
            id: 4,
            label: "Project Value",
            name: "value",
            value: project?.value || '',
            component: <Input size="large" placeholder="Enter Value" disabled={isDetailsView}/>,
        },
        {
            id: 5,
            label: "Project Description",
            name: "description",
            value: project?.description || '',
            component: <Input.TextArea  size="large" placeholder="Enter Description" disabled={isDetailsView}/>,
        },
        {
            id: 6,
            label: "Factors",
            name: "factors",
            value: project?.factors || '',
            component: <Input.TextArea  size="large" placeholder="Enter Value" disabled={isDetailsView}/>,
        },
        {
            id: 7,
            label: "SELECT PRODUCT/SERVICE TYPE",
            name: "service_type_id",
            value: project?.service_type_id || '',
            component: <Select 
                            placeholder='Select Type'
                            showSearch 
                            disabled={isDetailsView}
                            filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
                        {
                            projectSetupParams && projectSetupParams.service_type ? (
                                projectSetupParams.service_type.map(data => {
                                    return <Select.Option key={data.id} value={data.id}>{data.name}</Select.Option>
                                })
                            ) : ''
                        }
                        </Select>, 
        },
        {
        id: 8,
        label: "SELECT PRODUCT/SERVICE",
        name: "service_id",
        value: project?.service_id || '',
        component:  <Select 
                        placeholder='Select Type'
                        showSearch 
                        disabled={isDetailsView}
                        filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }>
                        {
                            projectSetupParams && projectSetupParams.services ? (
                                projectSetupParams.services.map(data => {
                                    return <Select.Option key={data.id} value={data.id}>{data.full_name}</Select.Option>
                                })
                            ) : ''
                        }
                    </Select>,
        },
        {
        id: 9,
        label: "INDUSTRY TYPE",
        name: "industry_type_id",
        value: project?.industry_type_id || '',
        component:  <Select 
                        placeholder='Select Type'
                        showSearch 
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        } 
                        onChange={selectIndustry}
                        disabled={isDetailsView}
                    >
                    {
                        projectSetupParams && projectSetupParams.industry_types ? (
                            projectSetupParams.industry_types.map(data => {
                                return <Select.Option key={data.id} value={data.id}>{data.name}</Select.Option>
                            })
                        ) : ''
                    }
                    </Select>,
        },
        {
        id: 10,
        label: "CLIENT NAME",
        name: "client_id",
        value: project?.client_id || '',
        component:  <Select 
                            placeholder='Select Type' 
                            onChange={selectctClient}
                            showSearch 
                            disabled={isDetailsView}
                            filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
                        {/* {
                            (!clients.length || clients.length && clients.findIndex(e => e.id == project?.client?.id) === -1)
                                ? <Select.Option key={project?.client?.id} value={project?.client?.id}>{project?.client?.name}</Select.Option> : ''
                        } */}
                        {
                            
                            clients ? (
                                clients.map(data => {
                                    return <Select.Option key={data.id} value={data.id}>{data.name}</Select.Option>
                                })
                            ) : ''

                            // projectSetupParams && projectSetupParams.clients ? (
                            //     projectSetupParams.clients.map(data => {
                            //         return <Select.Option key={data.id} value={data.id}>{data.name}</Select.Option>
                            //     })
                            // ) : ''
                        }
                    </Select>,
        },
        {
            id: 11,
            label: "CLIENT DEPARTMENT",
            name: "client_department_id",
            value: project?.client_department_id || '',
            component: <Select 
                            placeholder='Select Type' 
                            onChange={selectDepartment}
                            showSearch 
                            disabled={isDetailsView}
                            filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
                        {
                            departments && departments.length ? (
                                departments.map(data => {
                                    return <Select.Option key={data.id} value={data.id}>{data.department_name}</Select.Option>
                                })
                            ) : ''
                        }
                    </Select>,
        },
        {
            id: 12,
            label: "CLIENT POC",
            name: "client_poc",
            value: project?.client_poc?.id || '',
            component: <Select disabled={isDetailsView} placeholder='Select Type' showSearch filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
                {
                    contacts && contacts.length ? (
                        contacts.map(data => {
                            return <Select.Option key={data.id} value={data.id}>{data.contact_name}</Select.Option>
                        })
                    ) : ''
                }
            </Select>,
        },
        {
            id: 13,
            label: "KAM",
            name: "kam",
            value: project?.kam?.emp_id || '',
            component: <Select 
                            showSearch 
                            placeholder='Select Type'
                            optionFilterProp="children"
                            disabled={isDetailsView}
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
        },
        {
            id: 4,
            label: "Pilot Project",
            name: "pilot_project",
            col: 6,
            isRequired: true,
            value: project?.pilot_project || 0,
            component: <Radio.Group name="radiogroup" disabled={isDetailsView}>
                            <Radio value={1}>Yes</Radio>
                            <Radio value={0}>No</Radio>
                        </Radio.Group>,
        },
        {
            id: 14,
            label: "STATUS",
            name: "status",
            col: 6,
            value: (project && project.status) ? 1 : 0,
            component: <Radio.Group name="radiogroup" disabled={isDetailsView}>
                            <Radio value={1}>Active</Radio>
                            <Radio value={0}>Inactive</Radio>
                        </Radio.Group>,
        },
    ];

    const milestoneConfigure = [
        {   
            id: 1,
            name: "milestoneConfigure",
            label: "milestoneConfigure",
            full: true,
            component: 
                <MilestoneConfigure 
                    projectId={projectId} 
                    changeMilestone={changeMilestone} 
                    orderMilestones={project?.milestones} 
                    context="edit" 
                    isDetailsView={isDetailsView} 
                />
        }
    ];

    const steps = [
        { key: 1, title: "General Information", fields: generalFields },
        { key: 2, title: "Milestone Configure", fields: milestoneConfigure }
    ];

    const setStatus = (data) => {
        // if (data && project?.milestones && project.milestones.length) {
        //     let findIndex = project.milestones.findIndex(m => m.)
        // }
        return data?.id?.length > 10 ? 0 : 1;
    }

    const submit = (data, type) => {
        let project = data[0],
            mileStonesItems = [];

        if (type === 'update_close') { 
            if (project.milestones && project.milestones.length) {
                project.milestones.forEach(mile => {
                    mileStonesItems.push({
                        id: mile.id,
                        "milestone_id": mile.milestone_id, 
                        "serial": mile.serial, 
                        'status': mile.status,
                    })
                })
            } 
        } else {
            if (milestones && milestones.length) {
                milestones.map((val, i) => {
                    mileStonesItems.push({
                        id: val.project_milestone_id ? val.project_milestone_id : '',
                        "milestone_id": val.milestone_id * 1, 
                        "serial": i + 1, 
                        'status': setStatus(val),
                    })
                })
            }
        }

        project.milestones = JSON.stringify(mileStonesItems);
        
        editProject(project);
    }

    return <CreateStepperForm steps={steps} submit={submit} refresh={refresh} context="edit" isDetailsView={isDetailsView} setModal={setModal} setIsDetailsView={setIsDetailsView}/>
}
