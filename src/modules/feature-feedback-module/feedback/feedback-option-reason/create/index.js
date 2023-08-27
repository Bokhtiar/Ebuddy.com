import React, {useState, useEffect} from 'react'
import {useHistory} from "react-router-dom";
import {Button, Select, Radio, Form, Input,PageHeader, Row, Col, Checkbox } from "antd";
import { Wrapper} from "../../../../commons/Wrapper";
import { FFM_FEEDBACK_REASON_CREATE, ALL_PROJECT_SETUP_LIST } from "../../../../../scripts/api";
import {getData, postData} from "../../../../../scripts/api-service";
import { alertPop } from '../../../../../scripts/message';

const FeedbackOptionReasonCreate = Form.create()(({form}) => {
  const [projectList, setProjectList] = useState();
  const [reasonRequired, setReasonRequired] = useState();
  const [loading, setLoading] = useState();
  const history = useHistory();

  const getProjectList = async () => {
    let url = ALL_PROJECT_SETUP_LIST;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      if (res) {
        setProjectList(masterData);
      }
    }
  }

  useEffect(() => {
    getProjectList();
  }, []);

  const localSubmit = (e) => {
    e.preventDefault();
    form.validateFields(async(err, values) => {
      if (!err) {
        setLoading(true);
        let payload = {
          ...values,
        }
        let url = FFM_FEEDBACK_REASON_CREATE;
        let res = await postData(url, payload);

        if (res) {
          let masterData = res?.data?.data;
          history.push('/ffm/config-feedback-option-reason-list');
          alertPop('success', 'Process completed successfully');
          setLoading(false);
        }
        else setLoading(false);
      }
    })
  }

  return (
    <Wrapper>
      <PageHeader
        style={{
          border: '1px solid rgb(235, 237, 240)',
        }}
        onBack={() => history.push('/ffm/config-feedback-option-reason-list')}
        title="Feedback Reason Create"
      />
      <Form 
        className="m-4"
        onSubmit={localSubmit}
      >
        <Row gutter={16}> 
          <Col span={24}>
            <Form.Item label={'Feedback Reason Name'}>
              {form.getFieldDecorator('name', {
              })(<Input size="large" placeholder="Enter Feedback Option Name" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}> 
          <Col span={12}>
            <Form.Item label={'Reasons Type'}>
              {form.getFieldDecorator('type', {
              })(<Radio.Group>
                <Radio value="text">Text</Radio>
                <Radio value="checkbox">Checkbox</Radio>
                <Radio value="radio">Radio</Radio>
              </Radio.Group>)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'Status'}>
              {form.getFieldDecorator('status', {
              })(<Radio.Group>
                  <Radio value={1}>Active</Radio>
                  <Radio value={0}>Inactive</Radio>
                </Radio.Group>)}
            </Form.Item>
          </Col>
        </Row>
        <div style={{display: 'flex', justifyContent:'flex-end'}}>
            <Button 
              style={{width: 'auto'}}
              block
              type="primary"
              htmlType="submit"
              loading={loading}
            > 
              Create
            </Button>
        </div>
      </Form>
    </Wrapper>
  )
})

export default FeedbackOptionReasonCreate;