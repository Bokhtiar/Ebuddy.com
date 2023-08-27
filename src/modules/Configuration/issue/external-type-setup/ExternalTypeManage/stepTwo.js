import React, { useEffect, useState } from 'react';
import { Input, Checkbox, Button, Select, Col, Row, Form, Modal} from "antd";
import { mobileNumberValidationPattern } from "../../../../../scripts/helper";
import {EXTERNAL_TYPE_DROPDOWN_LIST} from "../../../../../scripts/api"
import {getData} from "../../../../../scripts/api-service";
import { alertPop } from "../../../../../scripts/message";


const stepTwo = Form.create()(
    ({ form, current, refresh, externalTypes, externalType, submit, getExternalTypeInfo }) => {

    const [formCount, setFormCount] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [detaislId, setdetailsId] = useState();
    const [keyId, setkeyId] = useState()
    const [externalTypesList, setExternalTypesList] = useState();
    const [contactsFieldsModel, setContactsFieldsModel] = useState([]);

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

    // const deleteDepartment = async () => {
    //     if (detaislId) {
    //         let res = await getData(CLIENT_DEPARTMENT_POC_DELETE + detaislId);
  
    //         if (res) {
    //           setdetailsId(null);
    //           setDeleteModal(false);
  
    //           setFormCount((state) => state.filter((item) => item.key !== keyId));
    //           setkeyId(null);
    //           getExternalTypeInfo();
    //           alertPop('success', "Department delete successfully");
    //         }
    //     }
    // }

    
    const getExternalTypesList = async () => {
        const res = await getData(EXTERNAL_TYPE_DROPDOWN_LIST);
        if (res) {
            let result = res.data?.data?.data?.filter(el => el.status == 1) || [];
            setExternalTypesList(result);
        }
        else alertPop("error", "External types not found");
    };
    
    useEffect(() => {
        getExternalTypesList();
    }, []);

    useEffect(() => {
        setFormCount([{
            key: Date.now(),
            fields: [...contactsFieldsModel]
        }]);
    }, [contactsFieldsModel]);

    useEffect(() => {
        if (refresh > 1 && current === 1) {
            localSubmit();
        }
    }, [refresh]);

    useEffect(() => {
        // if (externalType && externalType.length && formCount && formCount.length) {

        //     let newContent = [];

        //     formCount.forEach(data => {
        //         data.fields= data.fields.map(field => {
        //             if (field.name === "external_type_id") {
        //                 console.log("24235235");
        //                 return {
        //                     ...field,
        //                     component: (
        //                         <Input placeholder="External Type" size="large" value={externalTypes?.name} 
        //                         className="externl-type-name " disabled/>
        //                     ),
        //                 };
        //             } else return field;
        //         });

        //         newContent.push(data);
        //     })

        //     setFormCount(newContent);
        // }

        if (externalType && externalType?.contacts?.length ) {
            let forms = [];

            externalType.contacts.forEach(contact => {                        
                let data = {
                    key: Math.floor(Math.random() * 11111111),
                    fields: contactsFieldsModel.map(field => {
                        
                        if (field.name === 'external_type_id') {
                            return {
                                ...field,
                                defaultValue: externalType.name
                            }
                        } else if (field.name === "name") {
                            return {
                                ...field,
                                defaultValue: contact.name
                            }
                        } else if (field.name === "email") {
                            return {
                                ...field,
                                defaultValue: contact.email
                            }
                        } else if (field.name === "mobile") {
                            return {
                                ...field,
                                defaultValue: contact.mobile
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
                        } else return field;
                    })
                };

                forms.push(data);  
            });

            if (forms?.length) setFormCount(forms);
        }
    }, [externalType]);


    useEffect(() => {
        const contactsFieldsModel = [
            {
                id: 1,
                label: "External Type",
                name: "external_type_id",
                col: 5,
                defaultValue: externalTypes ? externalTypes?.name : undefined,
                component: <Input placeholder="External Type" size="large" className="externl-type-name" disabled/>,
            },
            {
                id: 3,
                label: "Person name",
                name: "name",
                col: 5,
                component: <Input size="large" placeholder="Name"/>,
            },
            {
                id: 4,
                label: "Person email",
                name: "email",
                col: 4,
                component: <Input size="large" placeholder="Email"/>,
                customRules: [
                    // {
                    //     pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                    //     message: "Please enter a valid email address",
                    // },
                    {
                        pattern: /^\s*[\w\-\+_]+(?:\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(?:\.[\w\-\+_]+)*\s*$/,
                        message: "Please enter a valid email address",
                    },
                ],
            },
            {
                id: 5,
                label: "Person mobile",
                name: "mobile",
                col: 4,
                component: <Input size="large" placeholder="Mobile"/>,
                customRules: [
                    {
                        // pattern: /^(?:\+88|01)?(?:\d{11}|\d{13})$/,
                        pattern: mobileNumberValidationPattern,
                        message: "Please enter a valid mobile no",
                    },
                ],
            },
            {
                id: 6,
                label: "Status",
                name: "status",
                col: 4,
                component: (
                    <Select size="large" placeholder="Status" dropdownMatchSelectWidth={false} showSearch
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }>
                        <Select.Option value={1}>Active</Select.Option>
                        <Select.Option value={0}>Inactive</Select.Option>
                    </Select>
                ),
            },
            {
                id: 7,
                label: "",
                name: "id",
                col: 1,
                hiden: true,
                notRequired: true,
                component: <Input size="large"/>,
            },
        ];

        setContactsFieldsModel(contactsFieldsModel);

    }, [externalTypes?.name])

    return (
        <div className="mt-4" style={current === 0 ? { display: 'none' } : {}}>
            <Row gutter={16}>
                {contactsFieldsModel &&
                    contactsFieldsModel.map(({ id, label, full, col }) => (
                    <Col key={id} span={full ? 24 : col ? col : 12}>
                        <p className="b-title">{label}</p>
                    </Col>
                ))}
            </Row>
            {
                externalTypes ? <>
                    {formCount?.map(({ key, fields }, idx) => (
                        <Row gutter={16}>
                            {fields &&
                            fields.map(
                                ({
                                id,
                                name,
                                component,
                                full,
                                col,
                                defaultValue,
                                customRules,
                                hiden,
                                notRequired
                                }) => (
                                <Col key={id} span={full ? 24 : col ? col : 12} style={hiden ? {display: 'none'} : ''}>
                                    <Form.Item>
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
                            <Col span={2}>
                            {/* formCount.length - 1 */}

                            {idx === 0 ? (
                                <Button
                                onClick={() => addForm()}
                                type="primary"
                                size="large"
                                icon="plus"
                                ghost
                                />
                            ) : (
                                <Button
                                onClick={() => removeForm(key, formCount)}
                                type="danger"
                                size="large"
                                icon="minus"
                                ghost
                                />
                            )}
                            </Col>
                        </Row>
                    ))}
                </> : ''
            }
            

            <Modal
                visible={deleteModal}
                title="Delete Department"
                onCancel={() => setDeleteModal(false)}
                footer={null}
            >
                <div className="mb-5 mt-3" style={{textAlign: 'center'}}>
                Are you sure you want to delete this department. You will not get this department back.</div>

                {/* <Button type="danger" block onClick={deleteDepartment}>Delete</Button> */}
            </Modal>
        </div>
    )
});

export default stepTwo;
