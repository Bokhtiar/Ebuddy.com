import React, { useState, useEffect } from 'react';
import { CreateStepperForm } from "../commons/CreateStepperForm/CreateStapperFormDND";
import { Input, Radio, Select, Tooltip, Icon, InputNumber } from "antd";
import MilestoneConfigure from "./MilestoneConfigure";
import * as Cookies from "js-cookie";

const { Option } = Select;

export default function CreateProject(props) {
    const {project, projectSetupParams, createProject, refresh, userTeamList} = props;
    const [departmentContents, setDepartmentContents] = useState([]);
    const [milestones, setMilestones] = useState([]);
    const [departments, setdepartments] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [selectedDepartment, setSelecetdDepartment] = useState();
    const [clients, setClients] = useState([])
    const [userInfo, setUserInfo] = useState();


    useEffect(() => {
        getUserInfo();

        let clients = projectSetupParams?.clients || [],
            content = [];

            setClients(clients);

            clients.forEach(c => {
                content.push(c.department_contacts);
            });

            // var result = content.reduce((r, e) => (r.push(...e), r), [])

            // setDepartmentContents(result);
    },[]);
    
    const getUserInfo = async() => {
        let userProfile = await JSON.parse(Cookies.get("profile"));
        if(userProfile) setUserInfo(userProfile);
    }

    const changeMilestone = (data) => {
        // console.log('[change-milestone]', data);
        setMilestones(data);
    }

    const selectctClient = (value) => {
        let find = projectSetupParams.clients.find(e => e.id === value);
        let activeDepartments = find?.departments?.filter(dept=> dept.status === 1);
        setdepartments(activeDepartments || []);
        setSelecetdDepartment();
        setContacts([])
    }

    const selectDepartment = (value) => {
        setSelecetdDepartment(value);
        let find = departments.find(e => e.id === value);
        let activeContacts = find?.contacts?.filter(contact=> contact.status === 1);
        setContacts(activeContacts || []);
    }

    const selectIndustry = (value) => {
        if (projectSetupParams?.clients && projectSetupParams?.clients.length) {
           let clients = projectSetupParams.clients.filter(e => e.industry_type_id === value);
           setClients(clients);
        }
    } 

    const generalFields = [
        // {
        //     id: 1,
        //     label: "Project Code",
        //     name: "code",
        //     // full: true,
        //     component: <Input size="large" placeholder="Enter Code"/>,
        // },
        {
            id: 1,
            label: "Project Name",
            name: "name",
            full: true,
            isRequired: true,
            component: <Input size="large" placeholder="Enter name" />,
        },
        {
            id: 2,
            label: "Project Type",
            name: "project_type",
            isRequired: true,
            component: <Radio.Group name="radiogroup">
                            <Radio value="Commercial">Commercial</Radio>
                            <Radio value="Non-commercial">Non-Commercial</Radio>
                        </Radio.Group>,
        },
        {
            id: 3,
            label: "Project Value",
            name: "value",
            isRequired: false,
            component: <InputNumber style={{width: '100%'}} size="large" placeholder="Enter a number" />,
        },
        {
            id: 5,
            label: "Project Description",
            name: "description",
            isRequired: true,
            component: <Input.TextArea  size="large" placeholder="Enter Description" />,
        },
        {
            id: 6,
            label: "Factors",
            name: "factors",
            isRequired: false,
            component: <Input.TextArea  size="large" placeholder="Enter Value" />,
        },
        {
            id: 7,
            label: "SELECT PRODUCT/SERVICE TYPE",
            name: "service_type_id",
            isRequired: true,
            component: <Select size="large" placeholder='Select Type'
                        showSearch filterOption={(input, option) =>
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
        isRequired: true,
        component:  <Select size="large" placeholder='Select Product/Service' 
                        showSearch 
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
        isRequired: true,
        component:  <Select size="large" placeholder='Select Industry' showSearch filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    } onChange={selectIndustry}>
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
        isRequired: true,
        component:  <Select size="large" showSearch filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }  placeholder='Select Client' onChange={selectctClient}>
                        {
                            clients ? (
                                clients.map(data => {
                                    return <Select.Option key={data.id} value={data.id}>{data.name}</Select.Option>
                                })
                            ) : ''
                        }
                    </Select>,
        },
        {
        id: 11,
        label: "CLIENT DEPARTMENT",
        name: "client_department_id",
        value: selectedDepartment || undefined,
        isRequired: true,
        component: <Select size="large" placeholder='Select Department' onChange={selectDepartment} 
                        showSearch filterOption={(input, option) =>
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
            isRequired: true,
            component: <Select size="large" placeholder='Select Primary Contact' 
                        showSearch filterOption={(input, option) =>
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
            value: userInfo?.emp_id || '',
            isRequired: true,
            component: <Select size="large" showSearch 
                            placeholder='Select Type'
                            optionFilterProp="children"
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
            value: 0,
            component: <Radio.Group value={0}>
                            <Radio value={1}>Yes</Radio>
                            <Radio value={0}>No</Radio>
                        </Radio.Group>,
        },
        {
            id: 14,
            label: "STATUS",
            name: "status",
            col: 6,
            isRequired: true,
            component: <Radio.Group name="radiogroup">
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
            component: <MilestoneConfigure changeMilestone={changeMilestone} />
        }
    ];
    
    const steps = [
        { key: 1, title: "General Information", fields: generalFields },
        { key: 2, title: "Milestone Configure", fields: milestoneConfigure }
    ];

    const submit = (data) => {
        let project = data[0],
            mileStonesItems = [];

        if (milestones && milestones.length) {
            milestones.map((val, i) => {
                mileStonesItems.push({"milestone_id": val.id, "serial": i + 1})
            })
        }

        project.milestones = JSON.stringify(mileStonesItems);
        createProject(project);
    }

    return <CreateStepperForm steps={steps} submit={submit} refresh={refresh}/>
}
