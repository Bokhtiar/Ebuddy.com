import React, {useState, useEffect} from 'react'
import {useHistory} from "react-router-dom";
import {Button, Select, Radio, Form, Input,PageHeader, Row, Col } from "antd";
import { Wrapper} from "../../../../commons/Wrapper";
import { FFM_FEEDBACK_CREATE, ALL_PROJECT_SETUP_LIST } from "../../../../../scripts/api";
import {getData, postData} from "../../../../../scripts/api-service";
import { alertPop } from '../../../../../scripts/message';

const FeedbackCreate = Form.create()(({form}) => {
  const [projectList, setProjectList] = useState();
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
        let url = FFM_FEEDBACK_CREATE;
        let res = await postData(url, payload);

        if (res) {
          let masterData = res?.data?.data;
          history.push('/ffm/config-feedback-list');
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
        onBack={() => history.push('/ffm/config-feedback-list')}
        title="Feedback Create"
      />
      <Form 
        className="m-4"
        onSubmit={localSubmit}
      >
        <Row gutter={16}> 
          <Col span={24}>
            <Form.Item label={'Feedback Name'}>
              {form.getFieldDecorator('name', {
              })(<Input size="large" placeholder="Enter Feedback Name" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}> 
          <Col span={24}>
            <Form.Item label={'Feedback Title'}>
              {form.getFieldDecorator('title', {
              })(<Input size="large" placeholder="Enter Feedback Title"/>)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
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

export default FeedbackCreate;