import React, {useEffect, useState} from 'react';
import { Input, Checkbox, Button, Select, Col, Row, Form, Modal} from "antd";
import {CLIENT_DEPARTMENT_DELETE} from "../../../../../scripts/api"
import {getData} from "../../../../../scripts/api-service";
import { alertPop } from "../../../../../scripts/message";

const stepThree = Form.create()(
    ({ form, current, refresh, ThirdSubmit, client, getClientInfo, isDetailsView}) => {
    const [formContent, setFormContent] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [detaislId, setdetailsId] = useState();
    const [keyId, setkeyId] = useState()

    const deptFields = [
        {
            id: 1,
            label: "Department Name",
            name: "dept_name",
            col: 16,
            component: <Input size="large" placeholder="Enter dept. name" disabled={isDetailsView ? true : false}/>,
        },
        {
            id: 2,
            label: "Status",
            name: "status",
            col: 6,
            component: (
                <Select size="large" placeholder="status" showSearch
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
        {
            id: 3,
            label: "",
            name: "id",
            col: 1,
            hiden: true,
            notRequired: true,
            component: <Input size="large" disabled={isDetailsView ? true : false}/>,
        },
    ];

    const addForm = () => {
        setFormContent((state) => [
            ...state,
            { key: Date.now(), fields: [...deptFields]}
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
                setFormContent((state) => state.filter((item) => item.key !== id));
            }
        } else {
            setFormContent((state) => state.filter((item) => item.key !== id));
        }
    }

    const deleteDepartment = async () => {
        if (detaislId) {
            let res = await getData(CLIENT_DEPARTMENT_DELETE + detaislId);
  
            if (res) {
              setdetailsId(null);
              setDeleteModal(false);
  
              setFormContent((state) => state.filter((item) => item.key !== keyId));
              setkeyId(null);
              getClientInfo();
              alertPop('success', "Department delete successfully");
            }
        }
    }

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
                    if (key.split("-")[1] === 'id') data.dep_id = value || '';

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
                // const entry = { ...formData, [current]: [...result] };
                ThirdSubmit(result);
            }
        });
    }; 

    useEffect(() => {
        if (refresh > 2 && current === 2 ) {
            localSubmit();
        }
    }, [refresh]);

    useEffect(() => {
        if (client && client.departments && client.departments.length) {
            let forms = [];

            client.departments.forEach(dep => {
                let data = {
                    key: Math.floor(Math.random() * 11111111),
                    fields: deptFields.map(field => {
                        if (field.name === 'dept_name') {
                            return {
                                ...field,
                                defaultValue: dep.department_name
                            }
                        } else if (field.name === 'status') {
                            return {
                                ...field,
                                defaultValue: dep.status
                            }
                        } else if (field.name === 'id') {
                            return {
                                ...field,
                                defaultValue: dep.id
                            }
                        } else return field;
                    })
                };
                forms.push(data);                
            });

            setFormContent(forms);
        }
    }, [client])

    useEffect(() => {
        setFormContent([{
            key: Date.now(),
            fields: [...deptFields]
        }])
    }, [])

    return (
        <div className="mt-4" style={current !== 2 ? { display: 'none' } : {}}>
            <Form>
                {/* <Row gutter={32} className="mb-2">
                    <Col span={16}>
                        <p class="b-title">Department Name</p>
                    </Col>
                    <Col span={6}>
                        <p class="b-title">Status</p>
                    </Col>
                    <Col span={2}>
                    </Col>
                </Row> */}
                
                {
                    formContent.map(({key, fields}, idx) => 
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
                                onClick={() => removeForm(key, formContent)}
                                type="danger"
                                size="large"
                                icon="minus"
                                ghost
                                disabled={isDetailsView ? true : false}
                                />
                            )}
                            </Col>
                        </Row>
                    )
                }
            </Form>

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

export default stepThree;
