import {DatePicker, Input, Checkbox, Radio, Select} from "antd";
import React, {useState} from "react";
import {CLIENT_CREATE, CLIENT_LIST, CLIENT_DEPARTMENT_DELETE} from "../../../../scripts/api";
import {postData, getData} from "../../../../scripts/api-service";
import { mobileNumberValidationPattern } from "../../../../scripts/helper";
import {CreateStepperForm} from "../../../commons/CreateStepperForm";
import moment from "moment";
import {alertPop} from "../../../../scripts/message";

const deptFields = [
    {
        id: 1,
        label: "Department Name",
        name: "dept_name",
        col: 16,
        component: <Input size="large" placeholder="Enter dept. name"/>,
    },
    {
        id: 2,
        label: "Status",
        name: "status",
        col: 6,
        component: (
            <Select size="large" placeholder="status">
                <Select.Option value={1}>Active</Select.Option>
                <Select.Option value={0}>Inactive</Select.Option>
            </Select>
        ),
    },
    {
        id: 3,
        label: "",
        name: "id",
        col: 1,
        hiden: true,
        notRequired: true,
        component: <Input size="large"/>,
    },
];

const contactsFieldsModel = [
    {
        id: 1,
        label: "Client department",
        name: "department_name",
        col: 4,
        component: <Select size="large" placeholder="Department"></Select>,
    },
    {
        id: 2,
        label: "Client name",
        name: "contact_name",
        col: 4,
        component: <Input size="large" placeholder="Name"/>,
    },
    {
        id: 3,
        label: "Client email",
        name: "contact_email",
        col: 5,
        component: <Input size="large" placeholder="Email"/>,
        customRules: [
            {
                pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                message: "Please enter a valid email address",
            },
        ],
    },
    {
        id: 4,
        label: "Client mobile",
        name: "contact_mobile",
        col: 5,
        component: <Input size="large" placeholder="Mobile"/>,
        customRules: [
            {
                pattern: mobileNumberValidationPattern,
                message: "Please enter a valid mobile no",
            },
        ],
    },
    {
        id: 5,
        label: "Status",
        name: "status",
        col: 4,
        component: (
            <Select size="large" placeholder="status">
                <Select.Option value={1}>Active</Select.Option>
                <Select.Option value={0}>Inactive</Select.Option>
            </Select>
        ),
    },
    {
        id: 6,
        label: "",
        name: "id",
        col: 1,
        hiden: true,
        notRequired: true,
        component: <Input size="large"/>,
    },
];


export default ({
                    setModal,
                    refresh,
                    edit,
                    industryTypes,
                    industrySectors,
                    companyTypes,
                    companySizes,
                    isDetailsView,
                    updateEditClilent
                }) => {
    const [loading, setLoading] = useState();
    const [contactsFields] = useState([
        ...contactsFieldsModel,
    ]);
    const generalFields = [
        {
            id: 1,
            label: "Type",
            name: "type",
            full: true,
            component: (
                <Radio.Group>
                    <Radio value="Client">Client</Radio>
                    <Radio value="Vendor">Vendor</Radio>
                    <Radio value="Partners">Partners</Radio>
                </Radio.Group>
            ),
        },
        {
            id: 2,
            label: "Company name",
            name: "name",
            component: <Input size="large" placeholder="Company name"/>,
        },
        {
            id: 3,
            label: "Address",
            name: "address",
            component: <Input size="large" placeholder="address"/>,
        },
        {
            id: 5,
            label: "Industry type",
            name: "industry_type_id",
            component: (
                <Select placeholder="Type" size="large" showSearch
                    filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }>
                    {industryTypes &&
                    industryTypes.map(({id, name}) => (
                        <Select.Option value={id}>{name}</Select.Option>
                    ))}
                </Select>
            ),
        },
        {
            id: 6,
            label: "Sector",
            name: "industry_sector_id",
            component: (
                <Select placeholder="Type" size="large" showSearch
                    filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }>
                    {industrySectors &&
                    industrySectors.map(({id, name}) => (
                        <Select.Option value={id}>{name}</Select.Option>
                    ))}
                </Select>
            ),
        },
        {
            id: 7,
            label: "Contact Person Name",
            name: "contact_name",
            component: <Input size="large" placeholder="Contact person name"/>,
        },
        {
            id: 8,
            label: "Contact Person Mobile",
            name: "contact_mobile",
            component: <Input size="large" placeholder="Contact person mobile"/>,
            customRules: [
                {
                    pattern: mobileNumberValidationPattern,
                    message: "Please enter a valid mobile no",
                },
            ],
        },
        {
            id: 9,
            label: "Contact Person Email",
            name: "contact_email",
            component: <Input size="large" placeholder="Contact person email"/>,
            customRules: [
                {
                    pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                    message: "Please enter a valid email address",
                },
            ],
        },
        {
            id: 10,
            label: "Website",
            name: "website",
            component: <Input size="large" placeholder="Website"/>,
        },
    ];

    const profilingFields = [
        {
            id: 1,
            label: "Company type",
            name: "company_type_id",
            component: (
                <Select placeholder="Type" size="large" showSearch
                    filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }>
                    {companyTypes &&
                    companyTypes.map(({id, name}) => (
                        <Select.Option value={id}>{name}</Select.Option>
                    ))}
                </Select>
            ),
        },
        {
            id: 2,
            label: "Establishment Date",
            name: "establish_date",
            component: <DatePicker size="large"/>,
        },
        {
            id: 3,
            label: "Company size",
            name: "company_size_id",
            component: (
                <Select placeholder="Type" size="large" showSearch
                    filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }>
                    {companySizes &&
                    companySizes.map(({id, name}) => (
                        <Select.Option value={id}>{name}</Select.Option>
                    ))}
                </Select>
            ),
            style: {float: 'right'}
        },
        {
            id: 4,
            label: "Number of branches",
            name: "branch_no",
            component: <Input size="large" placeholder="Number of branches"/>,
        },
        {
            id: 5,
            label: "Head office address",
            name: "head_office_address",
            component: <Input size="large" placeholder="Head office address"/>,
            col: 24,
        },
        {
            id: 6,
            // label: "is Group of Company",
            name: "is_group_of_company",
            component: <Checkbox onChange={(e) => {
                let steps = [
                    {key: 1, title: "General", fields: generalFields},
                    {key: 2, title: "Profiling", fields: profilingFields},
                    {key: 3, title: "Departments", fields: deptFields, dynamic: true},
                    {key: 4, title: "Contacts", fields: contactsFields, dynamic: true},
                ];
                steps = steps.map((step) => {
                    if (step.title !== 'Profiling') return step;
                    step.fields = step.fields.map((profilingField) => {
                        if (profilingField.name === 'group_name') {
                            profilingField.required = e.target.checked;
                            profilingField.display = e.target.checked;
                        }
                        return profilingField;
                    });
                    return step;
                });
                setSteps(steps);
            }}>IS GROUP OF COMPANY</Checkbox>,
            col: 12,
            required: false,
            type: 'checkbox',
            otherConfig: {
                initialValue: 0,
                valuePropName: 'checked',
            }
        }, {
            id: 7,
            label: "Group Name",
            name: "group_name",
            component: <Input size="large" placeholder="Group name"/>,
            col: 24,
            display: (() => {
                return !!edit?.is_group_of_company;
            })(),
            required: (() => {
                return !!edit?.is_group_of_company;
            })(),
        },
    ];
    const [steps, setSteps] = useState([
        {key: 1, title: "General", fields: generalFields},
        {key: 2, title: "Profiling", fields: profilingFields},
        {key: 3, title: "Departments", fields: deptFields, dynamic: true},
        {key: 4, title: "Contacts", fields: contactsFields, dynamic: true},
    ]);

    const submit = async (value, submitFlag, currentStep) => {

        if (value[2] && value[2].length > 0) {
            
            if (edit) {
                updateEditClilent(value[2]);
            }

            setSteps((state) => {
                return state.map((item) => {
                    if (item.key === 4) {
                        return {
                            ...item,
                            fields: contactsFieldsModel.map((field) => {
                                if (field.name === "department_name") {
                                    return {
                                        ...field,
                                        component: (
                                            <Select size="large" placeholder="Department" showSearch
                                                filterOption={(input, option) =>
                                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }>
                                                {value[2].map(({dept_name}) => (
                                                    <Select.Option value={dept_name}>
                                                        {dept_name}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        ),
                                    };
                                } else return field;
                            }),
                        };
                    } else return item;
                });
            });
        }

        // && Object.values(value).length === steps.length
        if (value && submitFlag) {
            setLoading(true);

            let scendStep = Object.values(value[2]),
                thardStep = Object.values(value[3]);

            let department = [];

            // console.log("thardStep", thardStep);

            if (edit && scendStep.length ) {
                thardStep.forEach(dep => {
                    let find = scendStep.find(e => e.dep_id === dep.dep_id);
                    
                    // && find.dept_name !== dep.department_name
                    if (find) {
                        dep.department_name = find.dept_name;
                        dep.status = find.status;
                    }

                    dep.id = dep.dep_id || "";
                    delete dep.dep_id;

                    department.push(dep);
                });
            } else {
                department = thardStep || []
            }

            const data = {
                ...value[0],
                ...value[1],
                establish_date: moment(value[1].establish_date).format("YYYY-MM-DD"),
                is_group_of_company: value[1].is_group_of_company ? 1 : 0,
                department_contacts: JSON.stringify(department),
                status: 1,
            };

            const res = await postData(
                edit ? `${CLIENT_LIST}/${edit.id}` : CLIENT_CREATE,
                {...data}
            );

            if (res) {
                setModal(false);
                refresh(CLIENT_LIST);
                alertPop('success', edit ? 'Update process successfully done' : 'Create process successfully done');
            } else {
                alertPop('error', 'Something went wrong');
            }
            setLoading(false);
        }
    };

    const departmentContacts = () => {
        let data = [];

        edit.departments.forEach(dep => {
            if (dep.contacts && dep.contacts.length) {
                dep.contacts.forEach(contact => {
                    contact.department_name = dep.department_name;
                    data.push(contact)
                })
            }
        })

        return data;
    }

    return (
        <CreateStepperForm
            steps={steps}
            submit={submit}
            edit={
                edit && {
                    0: {
                        address: edit.address,
                        contact_email: edit.contact_email,
                        contact_mobile: edit.contact_mobile,
                        contact_name: edit.contact_name,
                        industry_sector_id: edit.industry_sector_id,
                        industry_type_id: edit.industry_type_id,
                        name: edit.name,
                        type: edit.type,
                        website: edit.website,
                    },
                    1: {
                        branch_no: edit.branch_no,
                        company_size_id: edit.company_size_id,
                        company_type_id: edit.company_type_id,
                        is_group_of_company: edit.is_group_of_company,
                        group_name: edit.group_name,
                        establish_date: moment(edit.establish_date),
                        head_office_address: edit.head_office_address,
                    },
                    2: [
                        ...new Set(
                            edit.departments.map((item) => { 
                                return { dep_name: item.department_name, id: item.id, status: item.status}
                            })
                        ),
                    ].map((item) => ({
                        dept_name: item.dep_name,
                        status: item.status,
                        id: item.id
                    })),
                    // 3: edit.department_contacts,
                    3: departmentContacts(),
                }
            }
            isDetailsView={isDetailsView}
        />
    );
};
