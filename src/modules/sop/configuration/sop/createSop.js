import React, {useEffect, useState} from 'react';
import {Button, Table, Tag, Select, Modal, Radio, Form, Input, Checkbox } from "antd";
import {PIS_DEPARTMENT_LIST, SOP_FUNCTION_TYPE,} from "../../../../scripts/api";
import {getData} from "../../../../scripts/api-service";
import * as Cookies from "js-cookie";

const CreateSop = (props) => {
  const {form, localSubmit, isCreateAnother, setIsCreateAnother, isUpdate, userData, departmentList } = props;

  return (
    <Form onSubmit={localSubmit} key="create">
        <Form.Item label={'SOP Title'}>
        {form.getFieldDecorator('name', {
            initialValue: undefined
        })(<Input placeholder="Enter title" size="large"/>)}
        </Form.Item>
        <Form.Item label={'Department'}>
        {form.getFieldDecorator('department_ids', {
            initialValue: undefined
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
            initialValue: undefined
        })(<Input placeholder="Enter Timeline" size="large"/>)}
        </Form.Item>
        <Form.Item label={'Status'}>
        {form.getFieldDecorator('status', {
            initialValue: undefined
        })(<Radio.Group>
            <Radio value={1}>Active</Radio>
            <Radio value={0}>Inactive</Radio>
            </Radio.Group>)}
        </Form.Item>
        <div style={{display: 'flex', justifyContent:'flex-end'}}>
            <Form.Item label={''}>
                {form.getFieldDecorator('is_create_another', {})(
                <Checkbox 
                    checked={isCreateAnother} 
                    onChange={e => setIsCreateAnother(e.target.checked)}
                >
                    Create Another
                </Checkbox>)}
            </Form.Item>
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

export default CreateSop