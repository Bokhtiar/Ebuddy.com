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
    ISSUE_TYPE_DROPDOWN_LIST,
    ISSUE_REGISTER_DROPDOWN_LIST,
    PROJECT_FILTER_PARAM,
    ASSIGNEE_WISE_REPORTER,
    DEPARTMENT_LIST,
    USER_TEAM_LIST,
    ISSUE_REGISTER_CREATE,
    ISSUE_REGISTER_UPDATE,
    CLIENT_LIST,
    CLIENT_POC_LIST,
    EXTERNAL_TYPE_DROPDOWN_LIST
} from "../../../scripts/api";

const Helper = styled.p`
  font-size: 0.8rem;
  margin: -0.5rem 0 -1rem 0;
  color: gray;
`;

const { Option } = Select;
const { TextArea } = Input;

export default function ActivityForm({setModal, activityDetails, isTaskUpdate, updateEvent, projectId, setNonBusiness, register, rowData, isIssueUpdate, setRefresh, refresh}) {
    const [loading, setLoading] = useState();
    const [dropdownData, setDropdownData] = useState();
    const [userInfo, setUserInfo] = useState();
    const [fileUpload, setFileUpload] = useState();
    const [activityRepeat, setActivityRepeat] = useState(undefined);
    const [issueTypeDropDownList, setIssueTypeDropDownList] = useState();
    const [issueRegisterDropDownList, setIssueRegisterDropDownList] = useState();
    const [issueTypeID, setIssueTypeID] = useState();
    const [assigneeList, setAssigneeList] = useState();
    const [assignee, setAssignee] = useState();
    const [reporter, setReporter] = useState();
    const [department, setDepartments] = useState();
    const [employeeList, setEmployeeList] = useState();
    const [selectedDepartment, setSelectedDepartment] = useState();
    const [clientList, setClientList] = useState();
    const [clientID, setClientID] = useState();
    const [clientPOCList, setClientPOCList] = useState();
    const [externalTypeList, setExternalTypeList] = useState();
    const [externalTypeID, setExternalTypeID] = useState();
    const [externalPOC, setExternalPOC] = useState();

    const fileUploadHandler = async (event) => {
        let value = event.target.files[0];
        document.getElementById('issue-attachemnt-name').innerHTML=value.name;
        setFileUpload(value);
    }

    const submit = (value, form) => {
        setLoading(true);
        let formData = new FormData();
        if(value?.issue_type_id) formData.append("issue_type_id", value?.issue_type_id);
        if(value?.title) formData.append("title", value?.title);
        if(value?.parent_issues) formData.append("parent_issues", `[` + value?.parent_issues + `]`);
        if(value?.priority) formData.append("priority", value?.priority);
        if(value?.reported_date) formData.append("reported_date", value?.reported_date.format('YYYY-MM-DD') + '');
        if(value?.due_date) formData.append("due_date", value?.due_date.format('YYYY-MM-DD') + '');
        if(value?.complete_date) formData.append("complete_date", value?.complete_date.format('YYYY-MM-DD') + '');
        if(value?.assignee) formData.append("assignee", value?.assignee);
        if(value?.reporter) formData.append("reporter", reporter?.emp_id);
        if(value?.status) formData.append("status", value?.status);
        if(value?.issued_user_type) formData.append("issued_user_type", value?.issued_user_type);
        if(value?.issued_department_id) formData.append("issued_department_id", value?.issued_department_id);
        if(value?.issued_client_id) formData.append("issued_client_id", value?.issued_client_id);
        if(value?.issued_external_id) formData.append("issued_external_id", value?.issued_external_id);
        if(value?.issued_by) formData.append("issued_by", value?.issued_by);
        if(value?.note) formData.append("note", value?.note);
        if(fileUpload) formData.append("attachment", fileUpload);

        const url = isIssueUpdate ? ISSUE_REGISTER_UPDATE + `/${rowData?.id}` : ISSUE_REGISTER_CREATE ;
        postData(url, formData).then(res => {
            if (res?.data?.code == 201) {
                setModal(value.is_create_another == true);
                form.resetFields();
                setLoading(false);
                setRefresh(!refresh);
                alertPop("success", "Successfully complete the process");
                document.getElementById('issue-attachemnt-name').innerHTML=null;
            } 
            // else {
            //     alertPop("error", "Check your internet connection!");
            // }
        });
        setLoading(false);
        updateEvent(isTaskUpdate);
    };

    const getIssueTypeDropDownList = async () => {
        let res = await getData(ISSUE_TYPE_DROPDOWN_LIST);

        if (res) {
            let masterData = res?.data?.data;
            setIssueTypeDropDownList(masterData);
        }
    }

    const getIssueRegisterDropDownList = async (id) => {
        let res = await getData(ISSUE_REGISTER_DROPDOWN_LIST + '?issuer_id=' + id);

        if (res) {
            let masterData = res?.data?.data;
            // let result = masterData.filter(item=> item.issue_type_id === issueTypeID);
            setIssueRegisterDropDownList(masterData);
        }
    }

    // const getActivityPriorityList = async () => {
    //     let res = await getData(ACTIVITY_PRIORITY_LIST_2);

    //     if (res) {
    //         let masterData = res?.data?.data;
    //         setActivityPriorityList(masterData);
    //     }
    // }

    const getAssigneeList = async () => {
        let res = await getData(PROJECT_FILTER_PARAM)

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

    const getDepartments = async () => {
        let res  = await getData(DEPARTMENT_LIST);

        if (res) {
            let masterData = res.data.data;
            setDepartments(masterData);
        }
    }

    const getEmployeeList = async (selectedDepartment) => {
        let res = await getData(USER_TEAM_LIST);

        if (res) {
            let masterData = res.data.data || [];
            let users = masterData.filter(e => e.department_id === selectedDepartment);
            setEmployeeList(users);
        }
    }

    const getClientList = async () => {
        let res = await getData(CLIENT_LIST);

        if (res) {
            let masterData = res?.data?.data?.data || [];
            setClientList(masterData);
        }
    }

    const getClientPOCList = async () => {
        let res = await getData(CLIENT_POC_LIST);

        if (res) {
            let masterData = res?.data?.data|| [];
            let result = masterData.filter(item=> item.client_id === clientID);
            setClientPOCList(result);
        }
    }

    const getExternalTypeList = async (externalTypeID) => {
        let res = await getData(EXTERNAL_TYPE_DROPDOWN_LIST);

        if (res) {
            let masterData = res?.data?.data|| [];
            setExternalTypeList(masterData);
            if(externalTypeID) {
                let result = masterData.filter(item=> item.id === externalTypeID);
                setExternalPOC(result[0]);
            }
        }
    }
    
    useEffect(()=>{
        getIssueTypeDropDownList();
        getAssigneeList();
        getDepartments();
        getClientList();
        getExternalTypeList();
    },[]);

    useEffect(()=>{
        if(issueTypeID) getIssueRegisterDropDownList(issueTypeID);
    },[issueTypeID]);

    useEffect(()=>{
        if(assignee) getReporter(assignee);
    },[assignee]);

    useEffect(()=>{
        if(selectedDepartment) getEmployeeList(selectedDepartment);
    },[selectedDepartment]);

    useEffect(()=>{
        if(clientID) getClientPOCList(clientID);
    },[clientID]);

    useEffect(()=>{
        if(externalTypeID) getExternalTypeList(externalTypeID);
    },[externalTypeID]);

    useEffect(()=>{
        if(rowData) {
            getReporter(rowData?.assignee?.emp_id);
            setIssueTypeID(rowData?.issue_type?.id);
            setSelectedDepartment(rowData?.issued_department_id);
            setClientID(rowData?.issued_client_id);
            setExternalTypeID(rowData?.issued_external_id);
        }
    },[rowData]);

    return <CreateForm submit={submit} register={register} issueTypeDropDownList={issueTypeDropDownList} issueRegisterDropDownList={issueRegisterDropDownList} setIssueTypeID={setIssueTypeID} setAssignee={setAssignee}assigneeList={assigneeList} reporter={reporter} department={department} employeeList={employeeList} setSelectedDepartment={setSelectedDepartment} isIssueUpdate={isIssueUpdate} fileUploadHandler={fileUploadHandler} clientList={clientList} setClientID={setClientID} clientPOCList={clientPOCList} externalTypeList={externalTypeList} rowData={rowData}setExternalTypeID={setExternalTypeID} externalPOC={externalPOC}/>;
}

const CreateForm = Form.create()(
    ({form, submit, loading, register, issueTypeDropDownList, issueRegisterDropDownList, setIssueTypeID, assigneeList, reporter, setAssignee, department, employeeList, setSelectedDepartment, isIssueUpdate,fileUploadHandler, clientList, setClientID, clientPOCList, externalTypeList,rowData,setExternalTypeID, externalPOC}) => {

        const [issedUserType, setIssedUserType] = useState('Internal');

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
            if(!isIssueUpdate) {
                form.setFieldsValue({
                    title: undefined,
                    issue_type_id: undefined,
                    parent_issues: undefined,
                    priority: undefined,
                    reported_date: undefined,
                    due_date: undefined,
                    complete_date: undefined,
                    assignee: undefined,
                    // reporter: undefined,
                    issued_user_type: undefined,
                    issued_by: undefined,
                    attachment: undefined,
                    note: undefined,
                    issued_by: undefined,
                    issued_department_id: undefined,
                    issued_external_id: undefined,
                    issued_client_id: undefined,
                });
            }
        },[isIssueUpdate]);

        useEffect(()=>{
            if(rowData?.issued_user_type) setIssedUserType(rowData?.issued_user_type);
        },[rowData]);
        
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
                        <Form.Item label={'Issue TYPE'}>
                        {form.getFieldDecorator('issue_type_id', {
                                rules: [{required: true, message: "Required!"}],
                                initialValue: rowData?.issue_type ? rowData?.issue_type?.id : undefined
                            })(
                            <Select getPopupContainer={trigger => trigger.parentNode} size="large" placeholder='Select Issue Type' showSearch
                            onChange={(value)=>setIssueTypeID(value)}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                                {issueTypeDropDownList?.map(item =>
                                    <Select.Option key={`issue-${item.id}`}
                                                   value={item.id}>{item.name}</Select.Option>
                                )}
                            </Select>
                            )} 
                        </Form.Item>
                    </Col>
                    <Col span={12} style={{float: 'right'}}>
                        <Form.Item label={'Parent Issues'}>
                            {form.getFieldDecorator('parent_issues', {
                                // rules: [{required: true, message: "Required!"}],
                                initialValue: issueRegisterDropDownList?.length <= 0 ? undefined : rowData?.parent_issues ? rowData?.parent_issues.map(item=> item.id) : undefined
                            })(
                            <Select mode="multiple" getPopupContainer={trigger => trigger.parentNode} size="large" placeholder='Select Parent License' showSearch
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                                {issueRegisterDropDownList?.map(item =>
                                    <Select.Option key={`milestone-${item.id}`}
                                                   value={item.id}>{item.title}</Select.Option>
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
                    <Col span={12}>
                        <Form.Item label={'REPORTED DATE'}>
                            {form.getFieldDecorator('reported_date', {
                                rules: [{required: true, message: "Required!"}],
                                initialValue: rowData?.reported_date ? moment(new Date(rowData?.reported_date)) : undefined
                            })(
                            <DatePicker  size="large" placeholder="Enter reported Date"/>
                            )} 
                        </Form.Item>
                    </Col>
                </Row> 
                </>
                <Row gutter={32}>
                    <Col span={12}>
                        <Form.Item label={'DUE DATE'}>
                            {form.getFieldDecorator('due_date', {
                                rules: [{required: true, message: "Required!"}],
                                initialValue: rowData?.due_date ? moment(new Date(rowData?.due_date)) : undefined
                            })(
                            <DatePicker size="large" placeholder="Enter Due Date"/>
                            )} 
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={'COMPLETED DATE'}>
                            {form.getFieldDecorator('complete_date', {
                                // rules: [{required: true, message: "Required!"}],
                                initialValue: rowData?.complete_date ? moment(new Date(rowData?.complete_date)) : undefined
                            })(
                            <DatePicker size="large" placeholder="Enter completed Date"/>
                            )} 
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={32}>
                    {isIssueUpdate ? <Col span={12}>
                        <Form.Item label={'STATUS'}>
                            {form.getFieldDecorator('status', {
                                rules: [{required: true, message: "Required!"}],
                                initialValue: rowData?.status ? rowData?.status : undefined
                            })(
                            <Select getPopupContainer={trigger => trigger.parentNode} size="large" placeholder='Select Parent License' showSearch
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                                <Select.Option key={1} value="OPEN">Open</Select.Option>
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
                                initialValue: rowData?.assignee ? rowData?.assignee?.emp_id : undefined
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
                                <Input size="large" placeholder="Enter reporter name" readOnly={true} />)}
                        </Form.Item>
                    </Col>
                </Row> 
                <hr className="line-top-border"/>
                <Row gutter={32}>
                    <Col span={8}>
                        <Form.Item label={'ISSUED USER TYPE'}>
                            {form.getFieldDecorator('issued_user_type', {
                                rules: [{required: true, message: "Required!"}],
                                initialValue: issedUserType
                            })(
                            <Select getPopupContainer={trigger => trigger.parentNode} size="large" placeholder='Select Issued user type' showSearch
                            onChange={(value)=>setIssedUserType(value)}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                                {/* {activityPriorityList?.map(item =>
                                    <Select.Option key={`milestone-${item.id}`}
                                                   value={item.id}>{item.name}</Select.Option>
                                )} */}
                                <Select.Option key={1} value="Internal">Internal</Select.Option>
                                <Select.Option key={2} value="Client">Client</Select.Option>
                                <Select.Option key={3} value="External">External</Select.Option>
                            </Select>
                            )}
                        </Form.Item>
                    </Col>
                    {issedUserType === 'Internal' ? <>
                    <Col span={8}>
                        <Form.Item label={'DEPARTMENT'}>
                            {form.getFieldDecorator('issued_department_id', {
                                rules: [{required: true, message: "Required!"}],
                                initialValue: rowData?.issued_department_id ? rowData?.issued_department_id : undefined
                            })(
                            <Select getPopupContainer={trigger => trigger.parentNode} size="large" placeholder='Select department' showSearch
                            onChange={(value)=>setSelectedDepartment(value)}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                                {department?.map(item =>
                                    <Select.Option key={`milestone-${item.id}`}
                                                value={item.id}>{item.name}</Select.Option>
                                )}
                            </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label={'EMPLOYEE'}>
                            {form.getFieldDecorator('issued_by', {
                                rules: [{required: true, message: "Required!"}],
                                initialValue: rowData?.issued_by ? rowData?.issued_by?.id : undefined
                            })(
                            <Select getPopupContainer={trigger => trigger.parentNode} size="large" placeholder='Select employee' showSearch
                            // onChange={(value)=>setIssedUserType(value)}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                                {employeeList?.map(item =>
                                    <Select.Option key={`milestone-${item.emp_id}`}
                                                value={item.emp_id}>{item.name}</Select.Option>
                                )}
                            </Select>
                            )}
                        </Form.Item>
                    </Col></>
                    :
                    issedUserType === 'External' ? <>
                    <Col span={8}>
                        <Form.Item label={'EXTERNAL TYPE'}>
                            {form.getFieldDecorator('issued_external_id', {
                                rules: [{required: true, message: "Required!"}],
                                initialValue: rowData?.issued_external_id ? rowData?.issued_external_id : undefined
                            })(
                            <Select getPopupContainer={trigger => trigger.parentNode} size="large" placeholder='Select External Type' showSearch
                            onChange={(value)=>setExternalTypeID(value)}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                                {externalTypeList?.map(item =>
                                    <Select.Option key={`milestone-${item.id}`}
                                                value={item.id}>{item.name}</Select.Option>
                                )}
                            </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label={'EXTERNAL POC'}>
                            {form.getFieldDecorator('issued_by', {
                                rules: [{required: true, message: "Required!"}],
                                initialValue: rowData?.issued_by ? rowData?.issued_by?.id : undefined
                            })(
                            <Select getPopupContainer={trigger => trigger.parentNode} size="large" placeholder='Select External POC' showSearch
                            // onChange={(value)=>setIssedUserType(value)}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                                {externalPOC?.contacts?.map(item =>
                                    <Select.Option key={`milestone-${item.id}`}
                                                value={item.id}>{item.name}</Select.Option>
                                )}
                            </Select>
                            )}
                        </Form.Item>
                    </Col></>
                    :
                    issedUserType === 'Client' ? <>
                    <Col span={8}>
                        <Form.Item label={'CLIENT'}>
                            {form.getFieldDecorator('issued_client_id', {
                                rules: [{required: true, message: "Required!"}],
                                initialValue: rowData?.issued_client_id ? rowData?.issued_client_id : undefined
                            })(
                            <Select getPopupContainer={trigger => trigger.parentNode} size="large" placeholder='Select Client' showSearch
                            onChange={(value)=>setClientID(value)}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                                {clientList?.map(item =>
                                    <Select.Option key={`milestone-${item.id}`}
                                                value={item.id}>{item.name}</Select.Option>
                                )}
                            </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label={'CLIENT POC'}>
                            {form.getFieldDecorator('issued_by', {
                                rules: [{required: true, message: "Required!"}],
                                initialValue: rowData?.issued_by ? rowData?.issued_by?.id : undefined
                            })(
                            <Select getPopupContainer={trigger => trigger.parentNode} size="large" placeholder='Select Client POC' showSearch
                            // onChange={(value)=>setIssedUserType(value)}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                                {clientPOCList?.map(item =>
                                    <Select.Option key={`milestone-${item.id}`}
                                                value={item.id}>{item.contact_name}</Select.Option>
                                )}
                            </Select>
                            )}
                        </Form.Item>
                    </Col> </>:null}
                </Row>
                <hr className="line-top-border"/>
                <Row gutter={32}>
                    <Col span={24} >
                        <Form.Item label={'NOTE'}>
                            {form.getFieldDecorator('note', {
                                    rules: [{required: true, message: "Required!"}],
                                    initialValue: rowData?.note ? rowData?.note : undefined
                                })(
                                    <Input.TextArea rows={4} />)}
                        </Form.Item>
                    </Col>
                </Row> 
                <hr className="line-top-border"/>
                <Row gutter={16} style={{display: 'flex', alignItems:'center'}}>
                    <Col span={12}>
                        <div className="file-upload-content" style={{marginTop: '1rem'}}>
                            <label htmlFor="file-upload-field"><span style={{fontWeight: 700, fontSize:'0.8rem', color: '#808080'}}>FILE ATTACHMENT</span></label>
                            <div className="file-upload-wrapper" data-text="">
                                <span className="attacment-filename" id="issue-attachemnt-name"></span>
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
                            {isIssueUpdate ? 'Update' : 'Create New'}
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
);
