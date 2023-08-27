import React from 'react'
import { Select, Row, Col, Form, Input, Radio, Button, Checkbox } from 'antd'

const sopForm = Form.create()(({form}) => {
  return (
    <Form 
        // onSubmit={localSubmit}
    >
        <Row gutter={16}>
            <Col span={12}>
                <Form.Item label={'DEPARTMENT'}>
                    {form.getFieldDecorator('department_id', {
                        rules: [{required: true, message: "Required!"}],
                        // initialValue: activityDetails?.department_id ? activityDetails?.department_id : userInfo ? userInfo?.department_id : undefined
                    })(<Select 
                        allowClear={false} 
                        size="large" 
                        placeholder='Department Select'
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                        option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0}
                        // onChange={(value)=> { departmentChangeHandel(value); setUnsetAssignee(true) }}
                        >
                        {/* {departments && departments.length 
                            ? departments.map((dep) => {
                                return (
                                    <Option key={dep.id} 
                                        value={dep.id}
                                    >
                                        {dep.dept_name}
                                    </Option>
                                )})
                            : ""
                        } */}
                    </Select>)}
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item label={'TEAM'}>
                    {form.getFieldDecorator('team', {
                        rules: [{required: true, message: "Required!"}],
                        // initialValue: activityDetails?.department_id ? activityDetails?.department_id : userInfo ? userInfo?.department_id : undefined
                    })(<Select 
                        allowClear={false} 
                        size="large" 
                        placeholder='Department Select'
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                        option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0}
                        // onChange={(value)=> { departmentChangeHandel(value); setUnsetAssignee(true) }}
                        >
                        {/* {departments && departments.length 
                            ? departments.map((dep) => {
                                return (
                                    <Option key={dep.id} 
                                        value={dep.id}
                                    >
                                        {dep.dept_name}
                                    </Option>
                                )})
                            : ""
                        } */}
                    </Select>)}
                </Form.Item>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Form.Item label={'SOP Title'}>
                    {form.getFieldDecorator('sop_title', {
                        rules: [{required: true, message: "Required!"}],
                        // initialValue: activityDetails?.department_id ? activityDetails?.department_id : userInfo ? userInfo?.department_id : undefined
                    })(<Input size="large" placeholder="Enter Title"/>)}
                </Form.Item>
            </Col>
        </Row>
        <Row style={{display: 'flex', alignItems:'center'}}>
            <Col span={12}>
                <Form.Item label={'Status'}>
                    {form.getFieldDecorator('status', {
                        rules: [{required: true, message: "Required!"}],
                        // initialValue: activityDetails?.department_id ? activityDetails?.department_id : userInfo ? userInfo?.department_id : undefined
                    })(
                        <Radio.Group>
                            <Radio value={1}>Active</Radio>
                            <Radio value={0}>Inactive</Radio>
                        </Radio.Group>
                    )}
                </Form.Item>
            </Col> 
            <Col span={7}>
                {<Form.Item label={''} style={{marginTop: '3.5rem'}}>
                    {form.getFieldDecorator('is_create_another', {})(
                        <Checkbox 
                            // checked={isCreateAnother} 
                            // onChange={e => setIsCreateAnother(e.target.checked)}
                        >
                            Create Another
                        </Checkbox>)}
                </Form.Item>}
            </Col>
            <Col span={5}>
                <Button
                    style={{width: 'auto', marginTop: '2rem'}}
                    // loading={loading}
                    block
                    type="primary"
                    htmlType="submit"
                >
                    {/* {isUpdateState ? 'Update' : 'Create New'} */}Create New
                </Button>
            </Col>
        </Row>
    </Form>
  )
})

export default sopForm