import React, {useState, useEffect} from 'react'
import {useHistory} from "react-router-dom";
import {Button, Select, Radio, Form, Input,PageHeader, Row, Col, Checkbox } from "antd";
import { Wrapper} from "../../../../commons/Wrapper";
import { FFM_FEEDBACK_OPTION_UPDATE, ALL_PROJECT_SETUP_LIST, FFM_FEEDBACK_OPTION_BY_ID } from "../../../../../scripts/api";
import {getData, postData} from "../../../../../scripts/api-service";
import { alertPop } from '../../../../../scripts/message';

const FeedbackOptionUpdate = Form.create()(({form}) => {
  const [feedbackOptionData, setFeedbackOptionData] = useState();
  const [reasonRequired, setReasonRequired] = useState();
  const [loading, setLoading] = useState();
  const history = useHistory();

  let searchUrl = window.location.search;
  let params = new URLSearchParams(searchUrl);
  let paramsFeedbackOptionId = params.get('feedback_option_id');
  let feedbackOptionId = paramsFeedbackOptionId ? paramsFeedbackOptionId * 1 : undefined;

  const getFeedbackOptionById = async (id) => {
    let url = FFM_FEEDBACK_OPTION_BY_ID + "/" + id;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      if (res) {
        setFeedbackOptionData(masterData);
      }
    }
  }

  useEffect(() => {
    if(feedbackOptionId) {
      getFeedbackOptionById(feedbackOptionId)
    }
  }, [feedbackOptionId]);

  const localSubmit = (e) => {
    e.preventDefault();
    form.validateFields(async(err, values) => {
      if (!err) {
        setLoading(true);
        let payload = {
          ...values,
        }
        let url = FFM_FEEDBACK_OPTION_UPDATE + "/" + feedbackOptionId;
        let res = await postData(url, payload);

        if (res) {
          let masterData = res?.data?.data;
          history.push('/ffm/config-feedback-option-list');
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
        onBack={() => history.push('/ffm/config-feedback-option-list')}
        title="Feedback Option Update"
      />
      <Form 
        className="m-4"
        onSubmit={localSubmit}
      >
        <Row gutter={16}> 
          <Col span={24}>
            <Form.Item label={'Feedback Option Name'}>
              {form.getFieldDecorator('name', {
                initialValue: feedbackOptionData?.name ? feedbackOptionData?.name : undefined
              })(<Input size="large" placeholder="Enter Feedback Option Name" />)}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}> 
          <Col span={12}>
            <Form.Item label={'Is Reason Required'}>
              {form.getFieldDecorator('reason_required', {
                initialValue: feedbackOptionData?.reason_required ? feedbackOptionData?.reason_required : undefined
              })(<Checkbox onChange={(event)=>setReasonRequired(event.target.checked)}/>)}
            </Form.Item>
          </Col>
          {reasonRequired ? <Col span={12}>
            <Form.Item label={'Reasons Type'}>
              {form.getFieldDecorator('reason_type', {
                initialValue: feedbackOptionData?.reason_type ? feedbackOptionData?.reason_type : undefined
              })(<Select 
                allowClear
                size="large"
                showSearch
                placeholder='Select Reason Type'
                dropdownMatchSelectWidth={false}
                filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
                }
              >
                <Select.Option key="Text" value="text">Text</Select.Option>
                <Select.Option key="Check Box" value="checkbox">Check Box</Select.Option>
                <Select.Option key="Radio" value="radio">Radio</Select.Option>
            </Select>)}
            </Form.Item>
          </Col> : null}
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label={'Status'}>
              {form.getFieldDecorator('status', {
                initialValue: feedbackOptionData?.status ? feedbackOptionData?.status : undefined
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
              Update
            </Button>
        </div>
      </Form>
    </Wrapper>
  )
})

export default FeedbackOptionUpdate;