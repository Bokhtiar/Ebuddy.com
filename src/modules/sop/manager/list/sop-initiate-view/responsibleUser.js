import React,{useState, useEffect} from 'react'
import { Button, Form, Input, Select, Row, Col, PageHeader, DatePicker } from "antd";
import { TASK_SETUP_SOP_LIST, SOP_WISE_DEPARTMENT_DESIGNATION_LIST, TEAMS_LIST_ALL, USER_LIST } from '../../../../../scripts/api';
import { getData, postData } from '../../../../../scripts/api-service';

const ResponsibleUser = (props) => {
    const {row, rowIndex, form, department_id, disabledTeamAssignee, flag} = props;
    const [teamsList, setTeamsList] = useState();
    const [selectedTeam, setSelectedTeam] = useState();
    const [teamMembers, setTeamMembers] = useState();
    const [employeeList, setEmployeeList] = useState();

    const getTeamsList = async(id) => {
        let url = TEAMS_LIST_ALL + "?";
        if(id) url = url + '&department_id=' + id ;
        let res = await getData(url);
    
        if (res) {
          setTeamsList(res?.data?.data);
        }
    }

    const getEmployeeList = async(deptid, teamId) => {
        let url = USER_LIST + '?'; 
        if(deptid) url += '&department_id=' + deptid;
        if(teamId) url += '&team_id=' + teamId;
        let res  = await getData(url);
    
        if (res) {
            let masterData = res?.data?.data;
            setEmployeeList(masterData);
        }
    }

    const getTeamMembers = async(val) => {
        if(teamsList?.length){
            let data = teamsList.find(team => team.id === val);
            setTeamMembers(data.members);
        }
    }

    useEffect(()=>{
        if(department_id) {
            getTeamsList(department_id);
            if(selectedTeam) getEmployeeList(department_id, selectedTeam)
        }
    },[department_id, selectedTeam])

    useEffect(()=>{
        if(row?.team_id || row?.assignee) {
            getTeamsList(row?.department_id);
            getEmployeeList(department_id, row?.team_id)
        }
    },[row])

    useEffect(()=>{
        if(selectedTeam) getTeamMembers(selectedTeam);
    },[selectedTeam])

    useEffect(()=>{
        if(teamsList && row?.team_id) getTeamMembers(row?.team_id);
    },[teamsList, row?.team_id])

    return (
        <div>
            <Row gutter={32} key={row?.id}>
                <Col span={6}>
                    <Form.Item label={'Department'}>
                    {form.getFieldDecorator(`department_id-${row?.id}`, {
                        rules: [{ required: true, message: "Required!" }],
                        initialValue: row?.department ? row?.department?.name : undefined
                    })(<Input 
                        placeholder="Enter department" 
                        size="large" 
                        disabled
                        />)}
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label={'Designation'}>
                    {form.getFieldDecorator(`designation_id-${row?.id}`, {
                        rules: [{ required: true, message: "Required!" }],
                        initialValue: row?.designation ? row?.designation?.name : undefined
                    })(<Input placeholder="Enter designation" size="large" disabled/>)}
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label={'Team'}>
                    {form.getFieldDecorator(`team-${row?.department_id}-${rowIndex}`, {
                        rules: [{ required: true, message: "Required!" }],
                        initialValue: row?.team_id ? row?.team_id : undefined
                    })(<Select 
                            placeholder='Select Team' 
                            size="large" 
                            onChange={(value) => {
                                getTeamMembers(value);
                                setSelectedTeam(value);
                                form.resetFields(`assignee-${row?.department_id}-${rowIndex}`)
                            }}
                            disabled={disabledTeamAssignee}
                            showSearch
                            filterOption={(input, option) =>
                                option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0}
                        >
                        {teamsList?.map((team, index) =>
                        <Select.Option key={`team-${index}-${team.id}`} value={team.id}>{team.name}</Select.Option>
                        )}
                    </Select>)}
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label={'Employees'}>
                    {form.getFieldDecorator(`assignee-${row?.department_id}-${rowIndex}`, {
                        rules: [{ required: true, message: "Required!" }],
                        initialValue: row?.assignee ? row?.assignee: undefined
                    })(<Select 
                            placeholder='Select Employee' 
                            size="large" 
                            // onChange={(val) => handelSOPSetupSelect(val)}
                            disabled={disabledTeamAssignee}
                            showSearch
                            filterOption={(input, option) =>
                                option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0}
                        >
                        {employeeList ? employeeList?.map((members, index) =>(
                            <Select.Option key={`team-${index}-${members?.emp_id}`} value={members?.emp_id}>{members?.name}</Select.Option>
                        )) : null}
                        </Select>)}
                    </Form.Item>
                </Col>
            </Row>
        </div>
    )
}

export default ResponsibleUser;