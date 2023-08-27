import React, {useEffect} from 'react'
import {Button, Select, Radio, Form, Input } from "antd";

const EditSop = (props) => {
    const {form, localSubmit, edit, companyList, isUpdate, departmentList, deptpartmentIds } = props;

    useEffect(()=>{
        // find departments
        let tempArray = [];
        edit.sop_department_info.forEach(item=>{
        tempArray.push(item.department.id)
        })
        form.setFieldsValue({'department_ids': tempArray})
    },[edit])

    return (
        <Form onSubmit={localSubmit} key="edit">
            <Form.Item label={'SOP Title'}>
            {form.getFieldDecorator('name', {
                initialValue: edit ? edit?.name : undefined
            })(<Input placeholder="Enter title" size="large"/>)}
            </Form.Item>
            <Form.Item label={'Department'}>
            {form.getFieldDecorator('department_ids', {
                // initialValue: edit ? deptpartmentIds : undefined
            })(<Select
                mode="multiple"
                getPopupContainer={trigger => trigger.parentNode}
                size="large"
                placeholder='Select Department Name'
                disabled={!departmentList?.length}
                showSearch
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                {departmentList ? departmentList.map(dept => {
                return (<Select.Option key={dept.id} value={dept.id}>{dept.name}</Select.Option>)
                }) : null}
            </Select>)}
            </Form.Item>
            <Form.Item label={'TimeLine(Day Wise)'}>
            {form.getFieldDecorator('estimation', {
                initialValue: edit ? edit?.estimation : undefined
            })(<Input placeholder="Enter Timeline" size="large"/>)}
            </Form.Item>
            <Form.Item label={'Status'}>
            {form.getFieldDecorator('status', {
                // initialValue: !edit ? edit?.status ? 0 : 1 || undefined
                initialValue: !edit ? 1 : edit?.status
            })(<Radio.Group>
                <Radio value={1}>Active</Radio>
                <Radio value={0}>Inactive</Radio>
                </Radio.Group>)}
            </Form.Item>
            <div style={{display: 'flex', justifyContent:'flex-end'}}>
                <Button 
                style={{width: 'auto'}}
                block
                type="primary"
                htmlType="submit"
                > 
                {isUpdate ? 'Update ' : 'Create '} Now
                </Button>
            </div>
        </Form>
    )
}

export default EditSop