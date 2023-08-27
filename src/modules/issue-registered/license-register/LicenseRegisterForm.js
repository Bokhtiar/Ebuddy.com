import React, {useState, useEffect} from 'react';
import {Input, Radio, Col, Row, Select, DatePicker, Checkbox, Form, Icon, Button, Typography, Empty} from "antd";
import styled from "styled-components";
// import {Flex} from "../../commons/Flex";
import {getData} from "../../../scripts/api-service";
// import {postData} from "../../../scripts/postData";
import {postData} from "../../../scripts/api-service";
import moment from "moment";
import {alertPop} from "../../../scripts/message";
import * as Cookies from "js-cookie";
import {
    FUNCTION_TYPES_DROPDOWNLIST, 
    ACTIVITY_FUNCTION_DROPDOWNLIST, 
    FUNCTION_TYPE_ACTIVITY_PARAMS, 
    ACTIVITY_CREATE_WITH_ATTACHMENT, 
    ACTIVITY_UPDATE_WITH_ATTACHMENT,
    LICENSE_REGISTER_CREATE,
    LICENSE_REGISTER_UPDATE,
    LICENSE_TYPE_DROPDOWN_LIST,
    LICENSE_ISSUER_DROPDOWN_LIST,
    ACTIVITY_PRIORITY_LIST_2,
    LICENSE_REGISTER_DROPDOWN_LIST,
    PROJECT_FILTER_PARAM,
    ASSIGNEE_WISE_REPORTER,
} from "../../../scripts/api";

const Helper = styled.p`
  font-size: 0.8rem;
  margin: -0.5rem 0 -1rem 0;
  color: gray;
`;

const { Option } = Select;
const { TextArea } = Input;

export default function ActivityForm({setModal, activityDetails, isTaskUpdate, updateEvent, projectId, setNonBusiness, register, rowData, isLicenseUpdate, setRefresh, refresh}) {
    const [loading, setLoading] = useState();
    const [dropdownData, setDropdownData] = useState();
    const [userInfo, setUserInfo] = useState();
    const [fileUpload, setFileUpload] = useState();
    const [activityRepeat, setActivityRepeat] = useState(undefined);
    const [licenseTypeDropDownList, setLicenseTypeDropDownList] = useState();
    const [licenseIssuerDropDownList, setLicenseIssuerDropDownList] = useState();
    const [activityPriorityList, setActivityPriorityList] = useState();
    const [licenseRegisterList, setLicenseRegisterList] = useState();
    const [licenseTypeID, setLicenseTypeID] = useState();
    const [assigneeList, setAssigneeList] = useState();
    const [assignee, setAssignee] = useState();
    const [reporter, setReporter] = useState();

    const fileUploadHandler = async (event) => {
        let value = event.target.files[0];
        document.getElementById('license-attachemnt-name').innerHTML=value.name;
        setFileUpload(value);
    }

    const submit = (value, form) => {
        setLoading(true);
        let formData = new FormData();
        if(value?.license_type_id) formData.append("license_type_id", value?.license_type_id);
        if(value?.license_issuer_id) formData.append("license_issuer_id", value?.license_issuer_id);
        if(value?.title) formData.append("title", value?.title);
        if(value?.parent_licenses) formData.append("parent_licenses", `[` + value?.parent_licenses + `]`);
        if(value?.priority) formData.append("priority", value?.priority);
        if(value?.issue_date) formData.append("issue_date", value?.issue_date.format('YYYY-MM-DD') + '');
        if(value?.expire_date) formData.append("expire_date", value?.expire_date.format('YYYY-MM-DD') + '');
        if(value?.renewal_date) formData.append("renewal_date", value?.renewal_date.format('YYYY-MM-DD') + '');
        if(value?.assignee) formData.append("assignee", value?.assignee);
        if(value?.reporter) formData.append("reporter", reporter?.emp_id);
        if(value?.status) formData.append("status", value?.status);
        if(fileUpload) formData.append("attachment", fileUpload);
        
        const url = isLicenseUpdate ? LICENSE_REGISTER_UPDATE + `/${rowData?.id}` : LICENSE_REGISTER_CREATE ;
        postData(url, formData).then(res => {
            if (res?.data?.code == 201) {
                setModal(value.is_create_another == true);
                form.resetFields();
                setLoading(false);
                setRefresh(!refresh);
                alertPop("success", "Successfully complete the process");
                document.getElementById('license-attachemnt-name').innerHTML=null;
            } 
            // else {
            //     alertPop("error", "Check your internet connection!");
            // }
        });
        setLoading(false);
        updateEvent(isTaskUpdate);
    };

    const getLicenseTypeDropDownList = async () => {
        let res = await getData(LICENSE_TYPE_DROPDOWN_LIST);

        if (res) {
            let masterData = res?.data?.data;
            setLicenseTypeDropDownList(masterData);
        }
    }

    const getLicenseIssuerDropDownList = async () => {
        let res = await getData(LICENSE_ISSUER_DROPDOWN_LIST);

        if (res) {
            let masterData = res?.data?.data;
            setLicenseIssuerDropDownList(masterData);
        }
    }

    const getActivityPriorityList = async () => {
        let res = await getData(ACTIVITY_PRIORITY_LIST_2);

        if (res) {
            let masterData = res?.data?.data;
            setActivityPriorityList(masterData);
        }
    }

    const getLicenseRegisterDropdownList = async (id) => {
        let res = await getData(LICENSE_REGISTER_DROPDOWN_LIST);

        if (res) {
            let masterData = res?.data?.data;
            let result = masterData.filter(item=> item.license_type_id === id)
            setLicenseRegisterList(result);
        }
    }

    const getAssigneeList = async () => {
        let res = await getData(PROJECT_FILTER_PARAM);

        if (res) {
            let masterData = res?.data?.data?.kams;
            setAssigneeList(masterData);
        }
    }

    const getReporter = async (assignee) => {
        let res = await getData(ASSIGNEE_WISE_REPORTER + '/' + assignee);

        if (res) {
            let masterData = res?.data?.data;
            setReporter(masterData);
        }
    }

    useEffect(()=>{
        getLicenseTypeDropDownList();
        getLicenseIssuerDropDownList();
        getActivityPriorityList();
        // getLicenseRegisterDropdownList();
        getAssigneeList();
    },[]);

    useEffect(()=>{
        if(licenseTypeID) getLicenseRegisterDropdownList(licenseTypeID);
    },[licenseTypeID]);

    useEffect(()=>{
        if(assignee) getReporter(assignee);
    },[assignee]);

    useEffect(()=>{
        if(rowData) {
            getReporter(rowData?.assignee);
            setLicenseTypeID(rowData?.license_type_id);
        }
    },[rowData]);

    return <CreateForm submit={submit} register={register} licenseTypeDropDownList={licenseTypeDropDownList} licenseIssuerDropDownList={licenseIssuerDropDownList} activityPriorityList={activityPriorityList} licenseRegisterList={licenseRegisterList} setLicenseTypeID={setLicenseTypeID} assigneeList={assigneeList} setAssignee={setAssignee} reporter={reporter} fileUploadHandler={fileUploadHandler} rowData={rowData} isLicenseUpdate={isLicenseUpdate}/>;
}

const CreateForm = Form.create()(
    ({form, submit, loading, licenseTypeDropDownList, register, licenseIssuerDropDownList, activityPriorityList, licenseRegisterList, setLicenseTypeID, setAssignee, assigneeList, reporter,fileUploadHandler, rowData, isLicenseUpdate}) => {
        const [isCommunication, setIsCommunication] = useState();
        const [isAttachmentRequired, setIsAttachmentRequired] = useState();
        const [parentTask, setParentTask] = useState();
        const [defaultActivityType, setDefaultActivityType] = useState();
        const [defaultMilestone, setDefaultMilestone] = useState();
        const [projectID, setProjectID] = useState();
        const [startDate, setStartDate] = useState();

        const localSubmit = (e) => {
            e.preventDefault();
            form.validateFields((err, values) => {
                if (!err) {
                    submit(values, form);
                    form.resetFields();
                }
            });
        };

        useEffect(()=>{
            if(!isLicenseUpdate){
                form.setFieldsValue({
                    title: undefined,
                    license_type_id: undefined,
                    license_issuer_id: undefined,
                    priority: undefined,
                    parent_licenses: undefined,
                    issue_date: undefined,
                    expire_date: undefined,
                    renewal_date: undefined,
                    assignee: undefined,
                    // reporter: undefined,
                });
            }
        },[isLicenseUpdate])
        
        return (
            <Form onSubmit={localSubmit}>
                <><Row gutter={32}>
                    <Col span={24}>
                        <Form.Item label={'Title'}>
                            {form.getFieldDecorator('title', {
                                rules: [{required: true, message: "Required!"}],
                                initialValue: rowData?.title
                            })(<Input size="large" placeholder="Enter Title"/>)}
                        </Form.Item>
                    </Col>
                    </Row> 
                    <Row gutter={32}>
                    <Col span={12}>
                        <Form.Item label={'LICENSE TYPE'}>
                        {form.getFieldDecorator('license_type_id', {
                                rules: [{required: true, message: "Required!"}],
                                initialValue: rowData?.license_type_id ? rowData?.license_type_id : undefined
                            })(
                            <Select getPopupContainer={trigger => trigger.parentNode} size="large" placeholder='Select License Type' showSearch
                            onChange={(value)=>setLicenseTypeID(value)}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                                {licenseTypeDropDownList?.map(item =>
                                    <Select.Option key={`license-${item.id}`}
                                                   value={item.id}>{item.name}</Select.Option>
                                )}
                            </Select>
                            )} 
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={'LICENSE ISSUER'}>
                        {form.getFieldDecorator('license_issuer_id', {
                                rules: [{required: true, message: "Required!"}],
                                initialValue: rowData?.license_issuer_id ? rowData?.license_issuer_id: undefined
                            })(
                            <Select getPopupContainer={trigger => trigger.parentNode} size="large" placeholder='Select License Issuer' showSearch
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                                {licenseIssuerDropDownList?.map(item =>
                                    <Select.Option key={`license-${item.id}`}
                                                   value={item.id}>{item.name}</Select.Option>
                                )}
                            </Select>
                            )} 
                        </Form.Item>
                    </Col>
                    </Row> 
                    <Row gutter={32}>
                    <Col span={12}>
                        <Form.Item label={'ISSUE PRIORITY'}>
                            {form.getFieldDecorator('priority', {
                                rules: [{required: true, message: "Required!"}],
                                initialValue: rowData?.priority ? rowData?.priority : undefined
                            })(
                            <Select getPopupContainer={trigger => trigger.parentNode} size="large" placeholder='Select Priority' showSearch
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                                {/* {activityPriorityList?.map(item =>
                                    <Select.Option key={`milestone-${item.id}`}
                                                   value={item.id}>{item.name}</Select.Option>
                                )} */}
                                <Select.Option key={1} value="BLOCKER">BLOCKER</Select.Option>
                                <Select.Option key={2} value="CRITICAL">CRITICAL</Select.Option>
                                <Select.Option key={4} value="MAJOR">MAJOR</Select.Option>
                                <Select.Option key={6} value="MINOR">MINOR</Select.Option>
                            </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12} style={{float: 'right'}}>
                        <Form.Item label={'Parent License'}>
                            {form.getFieldDecorator('parent_licenses', {
                                // rules: [{required: true, message: "Required!"}],
                                initialValue: rowData?.parentlicenses ? rowData?.parentlicenses.map(item=> item.parent_license_id) : undefined
                            })(
                            <Select mode="multiple" getPopupContainer={trigger => trigger.parentNode} size="large" placeholder='Select Parent License' showSearch
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                                {licenseRegisterList?.map(item =>
                                    <Select.Option key={`milestone-${item.id}`}
                                                   value={item.id}>{item.title}</Select.Option>
                                )}
                            </Select>
                            )} 
                        </Form.Item>
                    </Col>
                </Row> 
                </>
                <Row gutter={32}>
                    <Col span={12}>
                        <Form.Item label={'ISSUE DATE'}>
                            {form.getFieldDecorator('issue_date', {
                                rules: [{required: true, message: "Required!"}],
                                initialValue: rowData?.issue_date ? moment(new Date(rowData?.issue_date)) : undefined
                            })(
                            <DatePicker  size="large" placeholder="Enter Issue Date"/>
                            )} 
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={'EXPIRED DATE'}>
                            {form.getFieldDecorator('expire_date', {
                                rules: [{required: true, message: "Required!"}],
                                initialValue: rowData?.expire_date ? moment(new Date(rowData?.expire_date)) : undefined
                            })(
                            <DatePicker size="large" placeholder="Enter Expire Date"/>
                            )} 
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={32}>
                    <Col span={12}>
                        <Form.Item label={'RENEWAL DATE'}>
                            {form.getFieldDecorator('renewal_date', {
                                // rules: [{required: true, message: "Required!"}],
                                initialValue: rowData?.renewal_date ? moment(new Date(rowData?.renewal_date)) : undefined
                            })(
                            <DatePicker size="large" placeholder="Enter Renewal Date"/>
                            )} 
                        </Form.Item>
                    </Col>
                    {isLicenseUpdate ? <Col span={12}>
                        <Form.Item label={'STATUS'}>
                            {form.getFieldDecorator('status', {
                                rules: [{required: true, message: "Required!"}],
                                initialValue: rowData?.status ? rowData?.status : undefined
                            })(
                            <Select getPopupContainer={trigger => trigger.parentNode} size="large" placeholder='Select Parent License' showSearch
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                                <Select.Option key={1} value="Open">Open</Select.Option>
                                <Select.Option key={1} value="WIP">WIP</Select.Option>
                                <Select.Option key={1} value="CLOSED">Closed</Select.Option>
                            </Select>
                            )} 
                        </Form.Item>
                    </Col> : null}
                </Row>
                <hr className="line-top-border"/>
                <Row gutter={32}>
                    <Col span={12}>
                        <Form.Item label={'ASSIGNEE'}>
                            {form.getFieldDecorator('assignee', {
                                rules: [{required: true, message: "Required!"}],
                                initialValue: rowData?.assignee ? rowData?.assignee : undefined
                            })(
                            <Select getPopupContainer={trigger => trigger.parentNode} size="large" placeholder='Select Assignee' showSearch
                            onChange={(value)=>setAssignee(value)}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                                {assigneeList?.map(item =>
                                    <Select.Option key={`milestone-${item.emp_id}`}
                                                   value={item.emp_id}>{item.name}</Select.Option>
                                )}
                            </Select>
                            )} 
                        </Form.Item>
                    </Col>
                    <Col span={12} >
                        <Form.Item label={'REPORTER'}>
                            {form.getFieldDecorator('reporter', {
                                    rules: [{required: true, message: "Required!"}],
                                    initialValue: reporter?.name || undefined
                                })(
                                <Input size="large" placeholder="Enter reporter name" readOnly={true}/>)}
                        </Form.Item>
                    </Col>
                </Row> 
                <Row gutter={16} style={{display: 'flex', alignItems:'center'}}>
                    <Col span={12}>
                        <div className="file-upload-content" style={{marginTop: '1rem'}}>
                            <label htmlFor="file-upload-field"><span style={{fontWeight: 700, fontSize:'0.8rem', color: '#808080'}}>FILE ATTACHMENT</span></label>
                            <div className="file-upload-wrapper" data-text="">
                                <span className="attacment-filename" id="license-attachemnt-name"></span>
                                <input 
                                    name="file-upload-field" type="file" className="file-upload-field" value=""
                                    onChange={fileUploadHandler}
                                    accept=".jpeg,.bmp,.png,.jpg,.pdf,.doc,.docx, .xlsx"
                                />
                            </div>
                        </div>
                    </Col>
                    <Col span={5}></Col>
                    <Col span={4}>
                        {/* <Form.Item label={''} style={{marginTop: '3.5rem'}}>
                            {form.getFieldDecorator('is_create_another', {})(<Checkbox>Create Another</Checkbox>)}
                        </Form.Item> */}
                    </Col>
                    <Col span={3}>
                        <Button
                            style={{width: 'auto', marginTop: '2rem'}}
                            loading={loading}
                            block
                            type="primary"
                            htmlType="submit"
                        >
                            {isLicenseUpdate ? 'Update' : 'Create New'}
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
);
