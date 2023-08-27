import React, { useEffect, useState } from 'react';
import { Input, Checkbox, Button, Select, Col, Row, Form, Modal} from "antd";
import {CLIENT_DEPARTMENT_POC_DELETE} from "../../../../../scripts/api"
import { mobileNumberValidationPattern } from "../../../../../scripts/helper"
import {getData} from "../../../../../scripts/api-service";
import { alertPop } from "../../../../../scripts/message";


const stepFour = Form.create()(
    ({ form, current, refresh, departments, submit, client, getClientInfo, generationList, designationList, isDetailsView }) => {

    const [formCount, setFormCount] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [detaislId, setdetailsId] = useState();
    const [keyId, setkeyId] = useState()

    const localSubmit = () => {
        form.validateFields((err, values) => {
            if (!err) {
                let all_values = [];
                //get all values
                for (const [key, value] of Object.entries(values)) {
                    let data = {
                    id: key.split("-")[0],
                    };

                    if (key.split("-")[1] !== 'id')  data[key.split("-")[1]] = value;
                    if (key.split("-")[1] === 'id') data.contact_id = value;

                    all_values.push(data);
                }
                //get unique ids
                let result = [
                    ...new Set(Object.keys(values).map((item) => item.split("-")[0])),
                ].map((item) => {
                    let temp = {}; //optimization scope below - todo - O(n^n)
                    all_values.map((val) => {
                    if (val.id === item) temp = { ...temp, ...val };
                    });
                    delete temp.id;
                    return temp;
                });
                submit(result);
            }
        })
    }

    const addForm = () => {
        setFormCount((state) => [
            ...state,
            { key: Date.now(), fields: [...contactsFieldsModel]}
        ]);
    }

    const removeForm = (id, fields) => {
        let find = fields.find(e => e.key === id);

        if (find) {
            let deid = find.fields.find(i => i.name === "id");

            if (deid && deid.defaultValue) {
                setDeleteModal(true);
                setdetailsId(deid.defaultValue);
                setkeyId(id);
            } else {
                setFormCount((state) => state.filter((item) => item.key !== id));
            }
        } else {
            setFormCount((state) => state.filter((item) => item.key !== id));
        }
    }

    const deleteDepartment = async () => {
        if (detaislId) {
            let res = await getData(CLIENT_DEPARTMENT_POC_DELETE + detaislId);
  
            if (res) {
              setdetailsId(null);
              setDeleteModal(false);
  
              setFormCount((state) => state.filter((item) => item.key !== keyId));
              setkeyId(null);
              getClientInfo();
              alertPop('success', "Department delete successfully");
            }
        }
    }

    useEffect(() => {
        setFormCount([{
            key: Date.now(),
            fields: [...contactsFieldsModel]
        }]);
    }, [])

    useEffect(() => {
        if (refresh > 3 && current === 3) {
            localSubmit();
        }
    }, [refresh]);

    useEffect(() => {
        if (client && client.departments && client.departments.length && formCount && formCount.length) {

            let newContent = [];

            formCount.forEach(data => {
                data.fields= data.fields.map(field => {
                    if (field.name === "department_name") {
                        return {
                            ...field,
                            component: (
                                <Select size="large" placeholder="Department" showSearch
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    disabled={isDetailsView ? true : false}
                                    >
                                    {client.departments.map(({department_name, id}, idx) => (
                                        <Select.Option key={idx} value={id}>
                                            {department_name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            ),
                        };
                    } else return field;
                });

                newContent.push(data);
            })

            setFormCount(newContent);
        }

        if (client && client.departments && client.departments.length ) {
            let forms = [];

            client.departments.forEach(department => {
                department.contacts.forEach(contact => {
                    let data = {
                        key: Math.floor(Math.random() * 11111111),
                        fields: contactsFieldsModel.map(field => {
                            if (field.name === 'department_name') {
                                return {
                                    ...field,
                                    defaultValue: department.department_name
                                }
                            } else if (field.name === "contact_name") {
                                return {
                                    ...field,
                                    defaultValue: contact.contact_name
                                }
                            } else if (field.name === "contact_email") {
                                return {
                                    ...field,
                                    defaultValue: contact.contact_email
                                }
                            } else if (field.name === "contact_mobile") {
                                return {
                                    ...field,
                                    defaultValue: contact.contact_mobile
                                }
                            } else if (field.name === 'status') {
                                return {
                                    ...field,
                                    defaultValue: contact.status
                                }
                            } else if (field.name === 'id') {
                                return {
                                    ...field,
                                    defaultValue: contact.id
                                }
                            }  else if (field.name === 'client_department_id') {
                                return {
                                    ...field,
                                    defaultValue: contact.client_department_id
                                }
                            } else if (field.name === 'client_designation_id') {
                                return {
                                    ...field,
                                    defaultValue: contact.client_designation_id || undefined
                                }
                            } else return field;
                        })
                    };
                    forms.push(data);  
                })
            });

            if (forms?.length) setFormCount(forms);
        }


    }, [client]);

    const contactsFieldsModel = [
        {
            id: 1,
            label: "Contact department",
            name: "department_name",
            col: 4,
            component: <Select size="large" placeholder="Department" dropdownMatchSelectWidth={false} disabled={isDetailsView ? true : false}>
                {client?.departments?.length ? client.departments.map(({department_name, id}, idx) => (
                    <Select.Option key={idx} value={id}>
                        {department_name}
                    </Select.Option>
                )) : ''}
            </Select>,
        },
        {
            id: 2,
            label: "Designation",
            name: "client_designation_id",
            col: 3,
            component: <Select size="large" placeholder="Designation" dropdownMatchSelectWidth={false} showSearch
            filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            disabled={isDetailsView ? true : false}
            >
                {designationList?.length ? designationList.map(des => (
                    <Select.Option key={des.id} value={des.id}>
                        {des.name}
                    </Select.Option>
                )) : ''}
            </Select>,
        },
        {
            id: 3,
            label: "Contact name",
            name: "contact_name",
            col: 4,
            component: <Input size="large" placeholder="Name" disabled={isDetailsView ? true : false}/>,
        },
        {
            id: 4,
            label: "Contact email",
            name: "contact_email",
            col: 4,
            component: <Input size="large" placeholder="Email" disabled={isDetailsView ? true : false}/>,
            customRules: [
                {
                    pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                    message: "Please enter a valid email address",
                },
            ],
        },
        {
            id: 5,
            label: "Contact mobile",
            name: "contact_mobile",
            col: 4,
            component: <Input size="large" placeholder="Mobile" disabled={isDetailsView ? true : false}/>,
            customRules: [
                {
                    pattern: mobileNumberValidationPattern,
                    message: "Please enter a valid mobile no",
                },
            ],
        },
        {
            id: 6,
            label: "Status",
            name: "status",
            col: 3,
            component: (
                <Select size="large" placeholder="status" dropdownMatchSelectWidth={false} showSearch
                filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                disabled={isDetailsView ? true : false}
                >
                    <Select.Option value={1}>Active</Select.Option>
                    <Select.Option value={0}>Inactive</Select.Option>
                </Select>
            ),
        },
        // {
        //     id: 9,
        //     label: "Generation",
        //     name: "generation_id",
        //     col: 3,
        //     component: <Select size="large" placeholder="Generation">
        //         {console.log('generationList in 4',generationList)}
        //         {generationList ? generationList.map(gen => {
        //             return(
        //                 <Select.Option key={gen.id} value={gen.id}>
        //                 {gen.name}
        //                 </Select.Option>
        //             )
        //         }) : ''}
        //     </Select>,
        // },
        {
            id: 7,
            label: "",
            name: "id",
            col: 1,
            hiden: true,
            notRequired: true,
            component: <Input size="large" disabled={isDetailsView ? true : false}/>,
        },
        {
            id: 8,
            label: "",
            name: "client_department_id",
            col: 1,
            hiden: true,
            notRequired: true,
            component: <Input size="large" disabled={isDetailsView ? true : false}/>,
        },
    ];

    return (
        <div className="mt-4" style={current !== 3 ? { display: 'none' } : {}}>
            {/* <Row gutter={16}>
                {contactsFieldsModel &&
                    contactsFieldsModel.map(({ id, label, full, col }) => (
                    <Col key={id} span={full ? 24 : col ? col : 12}>
                        <p className="b-title">{label}</p>
                    </Col>
                    ))}
            </Row> */}

            {formCount?.map(({ key, fields }, idx) => (
                <Row gutter={16} style={{display: 'flex', alignItems: 'center'}}>
                    {fields &&
                    fields.map(
                        ({
                        id,
                        name,
                        label,
                        component,
                        full,
                        col,
                        defaultValue,
                        customRules,
                        hiden,
                        notRequired
                        }) => (
                        <Col key={id} span={full ? 24 : col ? col : 12} style={hiden ? {display: 'none'} : ''}>
                            <Form.Item label={label}>
                            {form.getFieldDecorator(`${key}-${name}`, {
                                rules: [
                                { required: notRequired ? false : true, message: "Required!" },
                                ...(typeof customRules == "object"
                                    ? customRules
                                    : []),
                                ],
                                initialValue: defaultValue,
                            })(component)}
                            </Form.Item>
                        </Col>
                        )
                    )}
                    <Col span={2} style={{marginTop: '1rem'}}>
                    {/* formCount.length - 1 */}

                    {idx === 0 ? (
                        <Button
                        onClick={addForm}
                        type="primary"
                        size="large"
                        icon="plus"
                        ghost
                        disabled={isDetailsView ? true : false}
                        />
                    ) : (
                        <Button
                        onClick={() => removeForm(key, formCount)}
                        type="danger"
                        size="large"
                        icon="minus"
                        ghost
                        disabled={isDetailsView ? true : false}
                        />
                    )}
                    </Col>
                </Row>
            ))}

            <Modal
                visible={deleteModal}
                title="Delete Department"
                onCancel={() => setDeleteModal(false)}
                footer={null}
            >
                <div className="mb-5 mt-3" style={{textAlign: 'center'}}>
                Are you sure you want to delete this department. You will not get this department back.</div>

                <Button type="danger" block onClick={deleteDepartment}>Delete</Button>
            </Modal>
        </div>
    )
});

export default stepFour;
