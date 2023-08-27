import React, { useEffect, useState } from 'react';
import {
    Input, Row, Col, Select, Checkbox, Tag,
    Form, Button, PageHeader, Icon, DatePicker, InputNumber, Divider
} from "antd";
import { useHistory } from "react-router-dom";
import { TableWrapper, Wrapper } from "../../../commons/Wrapper";
import { CBS_CREATE, CBS_TYPES_LIST, CBS_CLAIM_TYPES_LIST } from "../../../../scripts/api";
import { alertPop } from "../../../../scripts/message";
import { getData, postData } from "../../../../scripts/api-service";
import { mobileNumberValidationPattern } from "../../../../scripts/helper"
import moment from 'moment';

export default function CreateCBS() {
    return <CreateForm />;
}

const CreateForm = Form.create()(({ form }) => {
    const [fileUpload, setFileUpload] = useState();
    const [selectCategory, setSelectCategory] = useState();
    const [selectCBSType, setSelectCBSType] = useState(0);
    const [cbsTypesList, setCBSTypesList] = useState();
    const [cbsClaimTypesList, setCBSClaimTypesList] = useState();
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const getCBSTypesList = async () => {
        let url = CBS_TYPES_LIST;
        let res = await getData(url);

        if (res) {
            let masterData = res?.data?.data;
            if (res.data.code === 200) {
                setCBSTypesList(masterData);
            }
        }
    }

    const getCBSClaimTypesList = async () => {
        let url = CBS_CLAIM_TYPES_LIST;
        if (selectCBSType) url = url + '?cbs_type_id=' + selectCBSType;
        let res = await getData(url);

        if (res) {
            let masterData = res?.data?.data;
            if (res.data.code === 200) {
                setCBSClaimTypesList(masterData);
            }
        }
    }

    const fileUploadHandler = async (event) => {
        let value = event.target.files[0];
        document.getElementById('cbs-attachement-name').innerHTML = value.name;
        setFileUpload(value);
    }

    const localSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                setLoading(true);
                let formData = new FormData();
                if (values?.cbs_type_id) formData.append("cbs_type_id", values?.cbs_type_id);
                if (values?.cbs_claim_type_id) formData.append("cbs_claim_type_id", values?.cbs_claim_type_id);
                //reimbursement
                if (values?.expense_category) formData.append("expense_category", values?.expense_category);
                if (values?.expense_nature) formData.append("expense_nature", values?.expense_nature);
                if (values?.claim_purpose) formData.append("claim_purpose", values?.claim_purpose);
                //transport
                if (values?.title) formData.append("title", values?.title);
                if (values?.person_name) formData.append("person_name", values?.person_name);
                if (values?.company_name) formData.append("company_name", values?.company_name);
                if (values?.contact_number) formData.append("contact_number", values?.contact_number);
                if (values?.transport_start_location) formData.append("transport_start_location", values?.transport_start_location);
                if (values?.transport_end_location) formData.append("transport_end_location", values?.transport_end_location);
                if (values?.transport_type) formData.append("transport_type", values?.transport_type);
                //food
                if (values?.restaurant_name) formData.append("restaurant_name", values?.restaurant_name);
                if (values?.food_type) formData.append("food_type", values?.food_type);
                if (values?.quantity) formData.append("quantity", values?.quantity);
                if (values?.number_of_person) formData.append("number_of_person", values?.number_of_person);
                //other
                if (values?.claim_date) formData.append("claim_date", moment(values?.claim_date).format("YYYY-MM-DD"));
                if (values?.claim_type_description) formData.append("claim_type_description", values?.claim_type_description);
                if (fileUpload) formData.append("attachment", fileUpload);
                //gift
                if (values?.gift_name) formData.append("gift_name", values?.gift_name);
                //casual purchase
                if (values?.casual_purchase_name) formData.append("casual_purchase_name", values?.casual_purchase_name);
                if (values?.amount > 0) {
                    formData.append("amount", values?.amount ? values?.amount : 0);

                    postData(CBS_CREATE, formData).then(res => {
                        if (res?.data?.code === 201) {
                            alertPop("success", "Successfully complete the process");
                            history.push('/cbs/my-bills')
                            setLoading(false);
                            setFileUpload();
                            form.resetFields('cbs-attachement-name');
                            // document.getElementById('cbs-attachement-name').innerHTML = null;
                            form.resetFields();
                        }
                        else {
                            setLoading(false);
                        };
                    });
                }
                else {
                    alertPop("error", "Amount cannot be negative");
                    setLoading(false);
                }
            }
        })
    }

    useEffect(() => {
        getCBSTypesList();
    }, []);

    useEffect(() => {
        if (selectCBSType) {
            form.resetFields('cbs_claim_type_id');
            getCBSClaimTypesList();
        }
    }, [selectCBSType]);

    return (
        <Wrapper>
            <PageHeader
                style={{
                    border: '1px solid rgb(235, 237, 240)',
                }}
                title="CBS Claim"
            >
            </PageHeader>
            <Form
                onSubmit={localSubmit}
            >
                <Row gutter={16} style={{ margin: '1rem' }}>
                    <Col span={12}>
                        <Form.Item label={'Claim Purpose'}>
                            {form.getFieldDecorator('cbs_type_id', {
                                rules: [{ required: true, message: "Required!" }],
                                // initialValue: nonBusiness ? activityDetails?.contact_person?.id : activityDetails?.client_department_id ? activityDetails?.client_department_id : undefined
                            })(<Select
                                // style={{width: '15%', 'marginRight': '1rem'}}
                                size="large"
                                showSearch
                                placeholder='Select Purpose'
                                dropdownMatchSelectWidth={false}
                                onChange={(value) => {
                                    setSelectCBSType(value);
                                    setSelectCategory();
                                }}
                                filterOption={(input, option) =>
                                    option.props.children
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {cbsTypesList ? cbsTypesList.map(cbs => {
                                    return (
                                        <Select.Option value={cbs.id} label={cbs.name}>{cbs.name}</Select.Option>
                                    )
                                }) : null}
                            </Select>)}
                        </Form.Item>
                    </Col>
                    {(selectCBSType === 1) || (selectCBSType === 2) ?
                        <Col span={12}>
                            <Form.Item label={selectCBSType === 2 ? 'Expense Category' : 'Category'}>
                                {form.getFieldDecorator('cbs_claim_type_id', {
                                    rules: [{ required: true, message: "Required!" }],
                                    // initialValue: nonBusiness ? activityDetails?.contact_person?.id : activityDetails?.client_department_id ? activityDetails?.client_department_id : undefined
                                })(<Select
                                    // style={{width: '15%', 'marginRight': '1rem'}} 
                                    size="large"
                                    showSearch
                                    placeholder={selectCBSType === 2 ? 'Select Expense Category' : 'Select Category'}
                                    dropdownMatchSelectWidth={false}
                                    onChange={(value) => setSelectCategory(value)}
                                    filterOption={(input, option) =>
                                        option.props.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {cbsClaimTypesList ? cbsClaimTypesList.map(cbsClaimType => {
                                        return (
                                            <Select.Option key={cbsClaimType.id} value={cbsClaimType.id}>{cbsClaimType.name}</Select.Option>
                                        )
                                    }) : null}
                                </Select>)}
                            </Form.Item>
                        </Col>
                        : null}
                </Row>
                {selectCBSType === 3 ? //Others
                    <div>
                        <Row gutter={16} style={{ margin: '1rem' }}>
                            <Col span={12}>
                                <Form.Item label={'Date'}>
                                    {form.getFieldDecorator('claim_date', {
                                        rules: [{ required: true, message: "Required!" }],
                                        // initialValue: nonBusiness ? activityDetails?.contact_person?.id : activityDetails?.client_department_id ? activityDetails?.client_department_id : undefined
                                    })(<DatePicker
                                        size="large"
                                        placeholder="Enter date"
                                        disabledDate={(current) => {
                                            let customStartDate = moment().subtract(14, 'days').format("YYYY-MM-DD");
                                            let customEndDate = moment().add(1, 'days').format("YYYY-MM-DD");
                                            return current <= moment(customStartDate, "YYYY-MM-DD") || current >= moment(customEndDate, "YYYY-MM-DD");
                                        }}
                                    />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={'Amount'}>
                                    {form.getFieldDecorator('amount', {
                                        rules: [{ required: true, message: "Required!" }],
                                        // initialValue: nonBusiness ? activityDetails?.contact_person?.id : activityDetails?.client_department_id ? activityDetails?.client_department_id : undefined
                                    })(<InputNumber size="large" placeholder="Enter Amount" min={0} style={{ width: '100%' }} />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ margin: '1rem' }}>
                            <Col span={12}>
                                <Form.Item label={'Description'}>
                                    {form.getFieldDecorator('claim_type_description', {
                                        rules: [{ required: true, message: "Required!" }],
                                        // initialValue: nonBusiness ? activityDetails?.contact_person?.id : activityDetails?.client_department_id ? activityDetails?.client_department_id : undefined
                                    })(<Input.TextArea rows={4} size="large" placeholder="Enter Description" />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <div className="file-upload-content" style={{ marginTop: '1rem' }}>
                                    <label htmlFor="file-upload-field"><span style={{ fontWeight: 700, fontSize: '0.8rem', color: '#808080' }}>ATTACHMENT</span>&nbsp;<small>(Non-anonymous question)</small></label>
                                    <div className="file-upload-wrapper" data-text="">
                                        <span className="attacment-filename" id="cbs-attachement-name"></span>
                                        <input
                                            name="file-upload-field" type="file" className="file-upload-field" value=""
                                            onChange={fileUploadHandler}
                                            accept=".jpeg,.bmp,.png,.jpg,.pdf,.doc,.docx, .xlsx, .ppt"
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    : null}
                {selectCBSType === 2 ? // Reimbursement
                    <div>
                        <Row gutter={16} style={{ margin: '1rem' }}>
                            <Col span={12}>
                                <Form.Item label={'Expense Nature'}>
                                    {form.getFieldDecorator('expense_nature', {
                                        rules: [{ required: true, message: "Required!" }],
                                        // initialValue: nonBusiness ? activityDetails?.contact_person?.id : activityDetails?.client_department_id ? activityDetails?.client_department_id : undefined
                                    })(<Input size="large" placeholder="Enter Nature of Expense" />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={'Purpose'}>
                                    {form.getFieldDecorator('claim_purpose', {
                                        rules: [{ required: true, message: "Required!" }],
                                        // initialValue: nonBusiness ? activityDetails?.contact_person?.id : activityDetails?.client_department_id ? activityDetails?.client_department_id : undefined
                                    })(<Input size="large" placeholder="Enter Purpose" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ margin: '1rem' }}>
                            <Col span={12}>
                                <Form.Item label={'Date of Expense'}>
                                    {form.getFieldDecorator('claim_date', {
                                        rules: [{ required: true, message: "Required!" }],
                                        // initialValue: nonBusiness ? activityDetails?.contact_person?.id : activityDetails?.client_department_id ? activityDetails?.client_department_id : undefined
                                    })(<DatePicker
                                        size="large"
                                        placeholder="Enter Date of Expense"
                                        disabledDate={(current) => {
                                            let customStartDate = moment().subtract(14, 'days').format("YYYY-MM-DD");
                                            let customEndDate = moment().add(1, 'days').format("YYYY-MM-DD");
                                            return current <= moment(customStartDate, "YYYY-MM-DD") || current >= moment(customEndDate, "YYYY-MM-DD");
                                        }}
                                    />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={'Amount'}>
                                    {form.getFieldDecorator('amount', {
                                        rules: [{ required: true, message: "Required!" }],
                                        // initialValue: nonBusiness ? activityDetails?.contact_person?.id : activityDetails?.client_department_id ? activityDetails?.client_department_id : undefined
                                    })(<InputNumber size="large" placeholder="Enter Amount" min={0} style={{ width: '100%' }} />)}
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                    : null}
                {selectCategory === 3 ?  //Transport
                    <div>
                        <Row gutter={16} style={{ margin: '1rem' }}>
                            <Col span={12}>
                                <Form.Item label={'Meeting Title'}>
                                    {form.getFieldDecorator('title', {
                                        rules: [{ required: true, message: "Required!" }],
                                        // initialValue: nonBusiness ? activityDetails?.contact_person?.id : activityDetails?.client_department_id ? activityDetails?.client_department_id : undefined
                                    })(<Input
                                        size="large"
                                        placeholder="Enter Meeting title"
                                    // value="New Eskaton"
                                    />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={'Person Name'}>
                                    {form.getFieldDecorator('person_name', {
                                        rules: [{ required: true, message: "Required!" }],
                                        // initialValue: nonBusiness ? activityDetails?.contact_person?.id : activityDetails?.client_department_id ? activityDetails?.client_department_id : undefined
                                    })(<Input size="large" placeholder="Enter Person/Company Name" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ margin: '1rem' }}>
                            <Col span={12}>
                                <Form.Item label={'Company/Institute Name or Branch Name'}>
                                    {form.getFieldDecorator('company_name', {
                                        rules: [{ required: true, message: "Required!" }],
                                        // initialValue: nonBusiness ? activityDetails?.contact_person?.id : activityDetails?.client_department_id ? activityDetails?.client_department_id : undefined
                                    })(<Input size="large" placeholder="Enter Company Name" />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={'Contact Number'}>
                                    {form.getFieldDecorator('contact_number', {
                                        rules: [{ required: true, message: "Required!" },
                                        {
                                            pattern: mobileNumberValidationPattern,
                                            message: "Please enter a valid mobile no",
                                        }],
                                        // initialValue: nonBusiness ? activityDetails?.contact_person?.id : activityDetails?.client_department_id ? activityDetails?.client_department_id : undefined
                                    })(<Input size="large" placeholder="Enter Contact Number" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ margin: '1rem' }}>
                            <Col span={12}>
                                <Form.Item label={'Start Location'}>
                                    {form.getFieldDecorator('transport_start_location', {
                                        rules: [{ required: true, message: "Required!" }],
                                        initialValue: "New Eskaton"
                                    })(<Input size="large" placeholder="Enter Start Location" />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={'End Location'}>
                                    {form.getFieldDecorator('transport_end_location', {
                                        rules: [{ required: true, message: "Required!" }],
                                        // initialValue: nonBusiness ? activityDetails?.contact_person?.id : activityDetails?.client_department_id ? activityDetails?.client_department_id : undefined
                                    })(<Input size="large" placeholder="Enter End Location" />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ margin: '1rem' }}>
                            <Col span={12}>
                                <Form.Item label={'Transport Type'}>
                                    {form.getFieldDecorator('transport_type', {
                                        rules: [{ required: true, message: "Required!" }],
                                        // initialValue: nonBusiness ? activityDetails?.contact_person?.id : activityDetails?.client_department_id ? activityDetails?.client_department_id : undefined
                                    })(<Select
                                        // style={{width: '15%', 'marginRight': '1rem'}}
                                        size="large"
                                        showSearch
                                        placeholder='Select Transport Type'
                                        dropdownMatchSelectWidth={false}
                                        // onChange={(value)=>setSelectDepartment(value)}
                                        filterOption={(input, option) =>
                                            option.props.children
                                                .toLowerCase()
                                                .indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        <Select.Option value="Bus" label="Bus">Bus</Select.Option>
                                        <Select.Option value="Rickshaw" label="Rickshaw">Rickshaw</Select.Option>
                                        <Select.Option value="Cng" label="Cng">Cng</Select.Option>
                                        <Select.Option value="Own" label="Own">Own</Select.Option>
                                        <Select.Option value="Other" label="Other">Other</Select.Option>
                                    </Select>)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label={'Amount'}>
                                    {form.getFieldDecorator('amount', {
                                        rules: [{ required: true, message: "Required!" }],
                                        // initialValue: nonBusiness ? activityDetails?.contact_person?.id : activityDetails?.client_department_id ? activityDetails?.client_department_id : undefined
                                    })(<InputNumber size="large" placeholder="Enter Amount" min={0} style={{ width: '100%' }} />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ margin: '1rem' }}>
                            <Col span={12}>
                                <Form.Item label={'Date of Expense'}>
                                    {form.getFieldDecorator('claim_date', {
                                        rules: [{ required: true, message: "Required!" }],
                                        // initialValue: nonBusiness ? activityDetails?.contact_person?.id : activityDetails?.client_department_id ? activityDetails?.client_department_id : undefined
                                    })(<DatePicker
                                        size="large"
                                        placeholder="Enter Date of Expense"
                                        disabledDate={(current) => {
                                            let customStartDate = moment().subtract(14, 'days').format("YYYY-MM-DD");
                                            let customEndDate = moment().add(1, 'days').format("YYYY-MM-DD");
                                            return current <= moment(customStartDate, "YYYY-MM-DD") || current >= moment(customEndDate, "YYYY-MM-DD");
                                        }}
                                    />)}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <div className="file-upload-content" style={{ marginTop: '1rem' }}>
                                    <label htmlFor="file-upload-field"><span style={{ fontWeight: 700, fontSize: '0.8rem', color: '#808080' }}>ATTACHMENT</span>&nbsp;<small>(Non-anonymous question)</small></label>
                                    <div className="file-upload-wrapper" data-text="">
                                        <span className="attacment-filename" id="cbs-attachement-name"></span>
                                        <input
                                            name="file-upload-field" type="file" className="file-upload-field" value=""
                                            onChange={fileUploadHandler}
                                            accept=".jpeg,.bmp,.png,.jpg,.pdf,.doc,.docx, .xlsx, .ppt"
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    : selectCategory === 1 ?  //Food
                        <div>
                            <Row gutter={16} style={{ margin: '1rem' }}>
                                <Col span={12}>
                                    <Form.Item label={'Restaurant Name'}>
                                        {form.getFieldDecorator('restaurant_name', {
                                            rules: [{ required: true, message: "Required!" }],
                                            // initialValue: nonBusiness ? activityDetails?.contact_person?.id : activityDetails?.client_department_id ? activityDetails?.client_department_id : undefined
                                        })(<Input size="large" placeholder="Enter Restaurant Name" />)}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label={'Food Type'}>
                                        {form.getFieldDecorator('food_type', {
                                            rules: [{ required: true, message: "Required!" }],
                                            // initialValue: nonBusiness ? activityDetails?.contact_person?.id : activityDetails?.client_department_id ? activityDetails?.client_department_id : undefined
                                        })(<Select
                                            // style={{width: '15%', 'marginRight': '1rem'}} 
                                            size="large"
                                            showSearch
                                            placeholder='Select Food Type'
                                            dropdownMatchSelectWidth={false}
                                            // onChange={(value)=>setSelectDepartment(value)}
                                            filterOption={(input, option) =>
                                                option.props.children
                                                    .toLowerCase()
                                                    .indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            <Select.Option value="Breakfast" label="Breakfast">Breakfast</Select.Option>
                                            <Select.Option value="Lunch" label="Lunch">Lunch</Select.Option>
                                            <Select.Option value="Dinner" label="Dinner">Dinner</Select.Option>
                                            <Select.Option value="Snacks" label="Snacks">Snacks</Select.Option>
                                        </Select>)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16} style={{ margin: '1rem' }}>
                                <Col span={12}>
                                    <Form.Item label={'Quantity'}>
                                        {form.getFieldDecorator('quantity', {
                                            rules: [{ required: true, message: "Required!" }],
                                            // initialValue: nonBusiness ? activityDetails?.contact_person?.id : activityDetails?.client_department_id ? activityDetails?.client_department_id : undefined
                                        })(<Input size="large" placeholder="Enter Quantity" />)}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label={'Bill Date'}>
                                        {form.getFieldDecorator('claim_date', {
                                            rules: [{ required: true, message: "Required!" }],
                                            // initialValue: nonBusiness ? activityDetails?.contact_person?.id : activityDetails?.client_department_id ? activityDetails?.client_department_id : undefined
                                        })(<DatePicker
                                            size="large"
                                            placeholder="Select Bill Date"
                                            disabledDate={(current) => {
                                                let customStartDate = moment().subtract(14, 'days').format("YYYY-MM-DD");
                                                let customEndDate = moment().add(1, 'days').format("YYYY-MM-DD");
                                                return current <= moment(customStartDate, "YYYY-MM-DD") || current >= moment(customEndDate, "YYYY-MM-DD");
                                            }}
                                        />)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16} style={{ margin: '1rem' }}>
                                <Col span={12}>
                                    <Form.Item label={'Number of Person'}>
                                        {form.getFieldDecorator('number_of_person', {
                                            rules: [{ required: true, message: "Required!" }],
                                            // initialValue: nonBusiness ? activityDetails?.contact_person?.id : activityDetails?.client_department_id ? activityDetails?.client_department_id : undefined
                                        })(<Input size="large" placeholder="Enter Number of Person" />)}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label={'Bill Amount'}>
                                        {form.getFieldDecorator('amount', {
                                            rules: [{ required: true, message: "Required!" }],
                                            // initialValue: nonBusiness ? activityDetails?.contact_person?.id : activityDetails?.client_department_id ? activityDetails?.client_department_id : undefined
                                        })(<InputNumber size="large" placeholder="Enter Amount" min={0} style={{ width: '100%' }} />)}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16} style={{ margin: '1rem' }}>
                                <Col span={12}>
                                    <div className="file-upload-content" style={{ marginTop: '1rem' }}>
                                        <label htmlFor="file-upload-field"><span style={{ fontWeight: 700, fontSize: '0.8rem', color: '#808080' }}>ATTACHMENT</span>&nbsp;<small>(Non-anonymous question)</small></label>
                                        <div className="file-upload-wrapper" data-text="">
                                            <span className="attacment-filename" id="cbs-attachement-name"></span>
                                            <input
                                                name="file-upload-field" type="file" className="file-upload-field" value=""
                                                onChange={fileUploadHandler}
                                                accept=".jpeg,.bmp,.png,.jpg,.pdf,.doc,.docx, .xlsx, .ppt"
                                            />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        : selectCategory === 5 ?  //Entertainment
                            <div>
                                <Row gutter={16} style={{ margin: '1rem' }}>
                                    <Col span={12}>
                                        <Form.Item label={'Description'}>
                                            {form.getFieldDecorator('claim_type_description', {
                                                rules: [{ required: true, message: "Required!" }],
                                                // initialValue: nonBusiness ? activityDetails?.contact_person?.id : activityDetails?.client_department_id ? activityDetails?.client_department_id : undefined
                                            })(<Input.TextArea rows={4} size="large" placeholder="Enter Description" />)}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <div className="file-upload-content" style={{ marginTop: '1rem' }}>
                                            <label htmlFor="file-upload-field"><span style={{ fontWeight: 700, fontSize: '0.8rem', color: '#808080' }}>ATTACHMENT</span>&nbsp;<small>(Non-anonymous question)</small></label>
                                            <div className="file-upload-wrapper" data-text="">
                                                <span className="attacment-filename" id="cbs-attachement-name"></span>
                                                <input
                                                    name="file-upload-field" type="file" className="file-upload-field" value=""
                                                    onChange={fileUploadHandler}
                                                    accept=".jpeg,.bmp,.png,.jpg,.pdf,.doc,.docx, .xlsx, .ppt"
                                                />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            : selectCategory === 2 ?  //Gift
                                <div>
                                    <Row gutter={16} style={{ margin: '1rem' }}>
                                        <Col span={12}>
                                            <Form.Item label={'Gift Name'}>
                                                {form.getFieldDecorator('gift_name', {
                                                    rules: [{ required: true, message: "Required!" }],
                                                    // initialValue: nonBusiness ? activityDetails?.contact_person?.id : activityDetails?.client_department_id ? activityDetails?.client_department_id : undefined
                                                })(<Input size="large" placeholder="Enter Gift Name" />)}
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <div className="file-upload-content" style={{ marginTop: '1rem' }}>
                                                <label htmlFor="file-upload-field"><span style={{ fontWeight: 700, fontSize: '0.8rem', color: '#808080' }}>ATTACHMENT</span>&nbsp;<small>(Non-anonymous question)</small></label>
                                                <div className="file-upload-wrapper" data-text="">
                                                    <span className="attacment-filename" id="cbs-attachement-name"></span>
                                                    <input
                                                        name="file-upload-field" type="file" className="file-upload-field" value=""
                                                        onChange={fileUploadHandler}
                                                        accept=".jpeg,.bmp,.png,.jpg,.pdf,.doc,.docx, .xlsx, .ppt"
                                                    />
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                : selectCategory === 6 ?  //Casual Purchase
                                    <div>
                                        <Row gutter={16} style={{ margin: '1rem' }}>
                                            <Col span={12}>
                                                <Form.Item label={'Name'}>
                                                    {form.getFieldDecorator('casual_purchase_name', {
                                                        rules: [{ required: true, message: "Required!" }],
                                                        // initialValue: nonBusiness ? activityDetails?.contact_person?.id : activityDetails?.client_department_id ? activityDetails?.client_department_id : undefined
                                                    })(<Input size="large" placeholder="Enter Casual Purchase Name" />)}
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <div className="file-upload-content" style={{ marginTop: '1rem' }}>
                                                    <label htmlFor="file-upload-field"><span style={{ fontWeight: 700, fontSize: '0.8rem', color: '#808080' }}>ATTACHMENT</span>&nbsp;<small>(Non-anonymous question)</small></label>
                                                    <div className="file-upload-wrapper" data-text="">
                                                        <span className="attacment-filename" id="cbs-attachement-name"></span>
                                                        <input
                                                            name="file-upload-field" type="file" className="file-upload-field" value=""
                                                            onChange={fileUploadHandler}
                                                            accept=".jpeg,.bmp,.png,.jpg,.pdf,.doc,.docx, .xlsx, .ppt"
                                                        />
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    : selectCategory === 4 ?  //Other
                                        <div>
                                            <Row gutter={16} style={{ margin: '1rem' }}>
                                                <Col span={12}>
                                                    <Form.Item label={'Date'}>
                                                        {form.getFieldDecorator('claim_date', {
                                                            rules: [{ required: true, message: "Required!" }],
                                                            // initialValue: nonBusiness ? activityDetails?.contact_person?.id : activityDetails?.client_department_id ? activityDetails?.client_department_id : undefined
                                                        })(<DatePicker
                                                            size="large"
                                                            placeholder="Enter date"
                                                            disabledDate={(current) => {
                                                                let customStartDate = moment().subtract(14, 'days').format("YYYY-MM-DD");
                                                                let customEndDate = moment().add(1, 'days').format("YYYY-MM-DD");
                                                                return current <= moment(customStartDate, "YYYY-MM-DD") || current >= moment(customEndDate, "YYYY-MM-DD");
                                                            }}
                                                        />)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item label={'Amount'}>
                                                        {form.getFieldDecorator('amount', {
                                                            rules: [{ required: true, message: "Required!" }],
                                                            // initialValue: nonBusiness ? activityDetails?.contact_person?.id : activityDetails?.client_department_id ? activityDetails?.client_department_id : undefined
                                                        })(<InputNumber size="large" placeholder="Enter Amount" min={0} style={{ width: '100%' }} />)}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={16} style={{ margin: '1rem' }}>
                                                <Col span={12}>
                                                    <Form.Item label={'Description'}>
                                                        {form.getFieldDecorator('claim_type_description', {
                                                            rules: [{ required: true, message: "Required!" }],
                                                            // initialValue: nonBusiness ? activityDetails?.contact_person?.id : activityDetails?.client_department_id ? activityDetails?.client_department_id : undefined
                                                        })(<Input.TextArea rows={4} size="large" placeholder="Enter Description" />)}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <div className="file-upload-content" style={{ marginTop: '1rem' }}>
                                                        <label htmlFor="file-upload-field"><span style={{ fontWeight: 700, fontSize: '0.8rem', color: '#808080' }}>ATTACHMENT</span>&nbsp;<small>(Non-anonymous question)</small></label>
                                                        <div className="file-upload-wrapper" data-text="">
                                                            <span className="attacment-filename" id="cbs-attachement-name"></span>
                                                            <input
                                                                name="file-upload-field" type="file" className="file-upload-field" value=""
                                                                onChange={fileUploadHandler}
                                                                accept=".jpeg,.bmp,.png,.jpg,.pdf,.doc,.docx, .xlsx, .ppt"
                                                            />
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        : null}
                <Divider />
                <Row gutter={16} style={{ margin: '1rem' }}>
                    <Col span={21}></Col>
                    <Col span={3}>
                        <Button
                            style={{ width: 'auto' }}
                            loading={loading}
                            block
                            type="primary"
                            htmlType="submit"
                        >
                            Create New
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Wrapper>
    )
})
