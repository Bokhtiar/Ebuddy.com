import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input } from "antd";
import {
    PASSWORD_RESET,
} from "../scripts/api";
import { postData } from "../scripts/api-service";
import {alertPop} from "../scripts/message";

const ChangePassword = Form.create()(({modal, setModal, form}) => {

    const localSubmit = (e) => {
        e.preventDefault();
        form.validateFields(async(err, values) => {
            if (!err) {
                let payload = {
                ...values,
                }

                let res = await postData(PASSWORD_RESET, payload);
        
                if (res) {
                    let masterData = res?.data?.data;
                    alertPop('success', 'Password updated successfully');
                    setModal(false);
                    form.resetFields();
                }
            }
        })
    } 

  return (
    <div>
           {/* Change Password Modal */}
           <Modal
              title="Change Password"
              visible={modal}
              width="35vw"
              onCancel={() => setModal(false)}
              footer={false}
            >
            <Form onSubmit={localSubmit}>
              <Form.Item label={'Current Password'}>
                {form.getFieldDecorator('current_password',{
                    rules: [{required: true, message: "Required!"}],
                })(<Input placeholder="Enter current password" size="large"/>)}
              </Form.Item>
              <Form.Item label={'New Password)'}>
                {form.getFieldDecorator('password',{
                    rules: [{required: true, message: "Required!"}],
                })(<Input placeholder="Enter new password" size="large"/>)}
              </Form.Item>
              <Form.Item label={'Confirm Password)'}>
                {form.getFieldDecorator('password_confirmation',{
                    rules: [{required: true, message: "Required!"}],
                })(<Input placeholder="Enter confirm password" size="large"/>)}
              </Form.Item>
              <div style={{display: 'flex', justifyContent:'flex-end'}}>
                  <Button 
                    style={{width: 'auto'}}
                    block
                    type="primary"
                    htmlType="submit"
                  > 
                    Update Now
                  </Button>
              </div>
            </Form>
          </Modal> 
    </div>
  )
})

export default ChangePassword