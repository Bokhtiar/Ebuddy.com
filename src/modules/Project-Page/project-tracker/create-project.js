import React, { useState, useEffect } from 'react';
import { Input, InputNumber, Radio, Select, Tooltip, Button, DatePicker, Form, Row, Col, Divider } from "antd";
import { useHistory } from 'react-router-dom';
import { Wrapper } from "../../commons/Wrapper";
import {
    PROJECT_DEFAULT_MILESTONES, 
    MILESTONE_REASONS, 
    CLIENT_DROPDOWN_LIST, 
    USER_LIST,
    CLIENT_POC_LIST,
    SERVICE_SETUP_DROPDOWN_LIST,
    PROJECT_TRACKER_CREATE
} from "../../../scripts/api";
import {getData, postData} from "../../../scripts/api-service";
import moment from 'moment';
import { alertPop } from '../../../scripts/message';

const CreateProject = Form.create()(({form, milestoneFields, setModal}) => {
    const [milestones, setMilestones] = useState([]);
    const [formContent, setFormContent] = useState([]);
    const [milestoneList, setMilestoneList] = useState([]);
    const [milestoneSerials, setMilestoneSerials] = useState({});
    const [milestoneReasonList, setMilestoneReasonList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [clientPOCList, setClientPOCList] = useState([]);
    const [serviceList, setServiceList] = useState([]);
    const [decisionMakerList, setDecisionMakerList] = useState([]);
    const [clientValue, setClientValue] = useState();
    const [clientDropdownList, setClientDropdownList] = useState();
    const [serviceName, setServiceName] = useState();
    const history = useHistory();

    const getMilestoneList = async () => {
        let url = PROJECT_DEFAULT_MILESTONES + "?";
        let res = await getData(url);
    
        if (res) {
          let masterData = res?.data?.data;
          setMilestoneList(masterData);
        }
    };

    const getMilestoneReasonList = async () => {
        let url = MILESTONE_REASONS + "?";
        let res = await getData(url);
    
        if (res) {
          let masterData = res?.data?.data;
          console.log("masterData>>>>>", masterData);
          setMilestoneReasonList(masterData);
        }
    };

    const getClientDropdownList = async (value) => {
        let url = CLIENT_DROPDOWN_LIST + "?paginate=30";
        if(value) url+= "&search=" + value;
        let res = await getData(url);
    
        if (res) {
          let masterData = res?.data?.data?.data;
          setClientDropdownList(masterData);
        }
    };

    const getUserList = async () => {
        let url = USER_LIST + "?";
        let res = await getData(url);
    
        if (res) {
          let masterData = res?.data?.data;
          setUserList(masterData);
        }
    };
    
    const getClientPOCList = async (value) => {
        let url = CLIENT_POC_LIST+ "?";
        if(value) url+= "&client_id=" + value;
        let res = await getData(url);
    
        if (res) {
          let masterData = res?.data?.data;
          let result = masterData.filter(item=> item.decision_maker === 1);
          setDecisionMakerList(result);
          setClientPOCList(masterData);
        }
    };

    const getServiceList = async () => {
        let url = SERVICE_SETUP_DROPDOWN_LIST+ "?";
        let res = await getData(url);
    
        if (res) {
          let masterData = res?.data?.data;
          setServiceList(masterData);
        }
    };

    const localSubmit = (e) => {
        e.preventDefault();
        form.validateFields(async(err, values) => {
        if (!err) {
            let milestonesList = [];

            if(milestoneList){
                milestoneList.forEach(item=>{
                    milestonesList.push(
                        {
                            "id": null,
                            "milestone_id": item.id,
                            "serial": item.serial,
                            "milestone_status_id": item.status, 
                            "milestone_reason_id": values[`milestone_reason_id-${item.id}`], 
                            "plan_start_date": moment(values[`plan_start_date-${item.id}`]).format("YYYY-MM-DD"),
                            "plan_end_date": moment(values[`plan_end_date-${item.id}`]).format("YYYY-MM-DD")
                        }
                    )
                })
            }

            let payload = {
                "id": null,
                "client_id": values?.client_id ? values?.client_id : null, 
                "client_type": values?.client_type ? values?.client_type : null, 
                "brand": values?.brand ? values?.brand : null, 
                "service_id": values?.service_id ? values?.service_id : null,
                "kam": values?.kam_id ? values?.kam_id : null,
                "client_poc": values?.client_poc ? values?.client_poc : null, 
                "decision_maker_poc_id": values?.decision_maker_poc_id ? values?.decision_maker_poc_id : null, 
                "name": values?.name ? values?.name : null,
                "value": values?.value ? values?.value : null, 
                "milestones": milestonesList.map((milestone, indexOfMilestone) => {
                    return {
                        ...milestone,
                        ["serial"]: milestoneSerials[milestone.id] ? milestoneSerials[milestone.id] : milestone.serial? milestone.serial : indexOfMilestone+1
                    }
                })
            }

            let url = PROJECT_TRACKER_CREATE;
            let res = await postData(url, payload);

            if (res) { 
                let masterData = res?.data?.data;
                setModal(false);
                alertPop('success', 'Process completed successfully')
            }
        }
        })
    }

    useEffect(() => {
        getMilestoneList();
        getMilestoneReasonList();
        getServiceList();
        getUserList();

        setFormContent([{
            key: Date.now(),
            fields: [...milestoneFields]
        }]);
    }, []);

    useEffect(()=>{
        if(clientValue) getClientPOCList(clientValue);
        if(clientValue && serviceName) {
            let clientName = clientDropdownList.find(item => item.id === clientValue);
            let serviceNamefind = serviceList.find(item => item.id === serviceName);
            let projectName = `${clientName?.name}-${serviceNamefind?.name}`;
            form.setFieldsValue({"name" : projectName})
        }
    },[clientValue, serviceName]);

    return(
        <Form 
            onSubmit={localSubmit}
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label={'Client Name'}>
                    {form.getFieldDecorator('client_id', {
                        // initialValue: cardData?.name ? cardData?.name : undefined
                    })(<Select 
                        allowClear
                        size="large"
                        showSearch
                        placeholder='Client Name'
                        dropdownMatchSelectWidth={false}
                        onSearch={(value) => {
                            console.log("value", value);
                            getClientDropdownList(value);
                        }}
                        onChange={(value)=> setClientValue(value)}
                        filterOption={(input, option) =>
                        option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        >
                            {clientDropdownList ? clientDropdownList?.map(client=>{
                                return(
                                    <Select.Option key={client?.id} value={client?.id}>{client?.name}</Select.Option>
                                )
                            }): null}
                        </Select>)}
                        <small>* Please type your desired client's name!</small>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'Client Type'}>
                    {form.getFieldDecorator('client_type', {
                        // initialValue: cardData?.name ? cardData?.name : undefined
                    })(<Select 
                        allowClear
                        size="large"
                        showSearch
                        placeholder='Client Type'
                        dropdownMatchSelectWidth={false}
                        filterOption={(input, option) =>
                        option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        >
                        <Select.Option key="New" value="New" label="New">New</Select.Option>
                        <Select.Option key="Existing" value="Existing" label="Existing">Existing</Select.Option>
                        <Select.Option key="Lead" value="Lead" label="Lead">Lead</Select.Option>
                    </Select>)}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label={'Brand Name'}>
                    {form.getFieldDecorator('brand', {
                        // initialValue: cardData?.name ? cardData?.name : undefined
                    })(<Input placeholder="Enter brand name" size="large"/>)}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'KAM'}>
                    {form.getFieldDecorator('kam_id', {
                        // initialValue: cardData?.name ? cardData?.name : undefined
                    })(<Select 
                        allowClear
                        size="large"
                        showSearch
                        placeholder='KAM'
                        dropdownMatchSelectWidth={false}
                        filterOption={(input, option) =>
                        option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        >
                        {userList ? userList?.map(user=>{
                            return(
                                <Select.Option key={user?.emp_id} value={user?.emp_id}>{user?.name}</Select.Option>
                            )
                        }): null}
                    </Select>)}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label={'Service'}>
                    {form.getFieldDecorator('service_id', {
                        // initialValue: cardData?.name ? cardData?.name : undefined
                    })(<Select 
                        allowClear
                        size="large"
                        showSearch
                        placeholder='Service Name'
                        onChange={(value)=> setServiceName(value)}
                        dropdownMatchSelectWidth={false}
                        filterOption={(input, option) =>
                        option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        >
                        {serviceList ? serviceList?.map(user=>{
                            return(
                                <Select.Option key={user?.id} value={user?.id}>{user?.name}</Select.Option>
                            )
                        }): null}
                    </Select>)}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'Client POC'}>
                    {form.getFieldDecorator('client_poc', {
                        // initialValue: cardData?.name ? cardData?.name : undefined
                    })(<Select 
                        allowClear
                        size="large"
                        showSearch
                        placeholder='Client POC'
                        dropdownMatchSelectWidth={false}
                        filterOption={(input, option) =>
                        option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        >
                        {clientPOCList ? clientPOCList?.map(user=>{
                            return(
                                <Select.Option key={user?.id} value={user?.id}>{user?.contact_name}</Select.Option>
                            )
                        }): null}
                    </Select>)}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label={'Decision Maker Name'}>
                    {form.getFieldDecorator('decision_maker_poc_id', {
                        // initialValue: cardData?.name ? cardData?.name : undefined
                    })(<Select 
                        allowClear
                        size="large"
                        showSearch
                        placeholder='Decision Maker Name'
                        dropdownMatchSelectWidth={false}
                        filterOption={(input, option) =>
                        option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        >
                        {decisionMakerList ? decisionMakerList?.map(user=>{
                            return(
                                <Select.Option key={user?.id} value={user?.id}>{user?.contact_name}</Select.Option>
                            )
                        }): null}
                    </Select>)}
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={'Value'}>
                    {form.getFieldDecorator('value', {
                        // initialValue: cardData?.name ? cardData?.name : undefined
                    })(<InputNumber placeholder="Value" size="large" style={{width: '100%'}}/>)}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item label={'Project Name'}>
                    {form.getFieldDecorator('name', {
                    })(<Input 
                            placeholder="Project Name" 
                            size="large" 
                            disabled
                        />)}
                    </Form.Item>
                </Col>
            </Row>
            <h4>Milestones</h4>
            <Divider />
            {milestoneList ? milestoneList?.map((item,index)=>{
                return (
                    <Row gutter={16} key={`milestones-${item.id}`}>
                        <Col span={0}>
                            <Form.Item label={''}>
                                {form.getFieldDecorator('milestone_id', {
                                    // rules: [{required: true, message: "Required!"}],
                                    initialValue: item?.id ? item?.id : undefined
                                })(
                                    <Input placeholder="Milestone" size="large" hidden/>,
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item label={'Milestone Name'}>
                                {form.getFieldDecorator('milestone_name', {
                                    // rules: [{required: true, message: "Required!"}],
                                    initialValue: item?.full_name ? item?.full_name : undefined
                                })(
                                    <Input placeholder="Milestone" size="large" disabled/>,
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Form.Item required={false} label={'Serial'}>
                                <InputNumber placeholder="Serial" min={1} max={milestoneList.length} defaultValue={index+1} onChange={(e) => {
                                    setMilestoneSerials({ ...milestoneSerials, [item.id]: e })
                                }} />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item label={'Reason'}>
                                {form.getFieldDecorator(`milestone_reason_id-${item.id}`, {
                                    // rules: [{required: true, message: "Required!"}],
                                    // initialValue: item?.full_name ? item?.full_name : undefined
                                })(
                                    <Select 
                                        size="large" 
                                        placeholder="Reason" 
                                        showSearch
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {milestoneReasonList ? milestoneReasonList?.map(reasons=>{
                                            return(
                                                <Select.Option key={reasons?.id} value={reasons?.id}>{reasons?.name}</Select.Option>
                                            )
                                        }): null}
                                    </Select>,
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Form.Item label={'Status'}>
                                {form.getFieldDecorator('milestone_status_id', {
                                    // rules: [{required: true, message: "Required!"}],
                                    initialValue: item?.status === 1 ? "Active" : "Inactive"
                                })(
                                    <Input placeholder="Status"size="large" disabled/>,
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label={'Planned Start Date'}>
                                {form.getFieldDecorator(`plan_start_date-${item.id}`, {
                                    // rules: [{required: true, message: "Required!"}],
                                    // initialValue: item?.full_name ? item?.full_name : undefined
                                })(
                                    <DatePicker placeholder="Select Start Date" size="large"/>,
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={4}> 
                            <Form.Item label={'Planned End Date'}>
                                {form.getFieldDecorator(`plan_end_date-${item.id}`, {
                                    // rules: [{required: true, message: "Required!"}],
                                    // initialValue: item?.full_name ? item?.full_name : undefined
                                })(
                                    <DatePicker placeholder="Select End Date" size="large"/>,
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                )
            })
            : null}
            <div style={{ textAlign: 'right' }}>
                <Button 
                    size='large' 
                    type="primary" 
                    htmlType="submit"
                >
                    Create
                </Button>
            </div>
        </Form>
    )
})

export default CreateProject;


