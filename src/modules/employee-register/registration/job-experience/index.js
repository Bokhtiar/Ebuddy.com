import React, { useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { Row, Col, Input, Form, Button, Divider, Table, Tag, DatePicker, Icon, Modal } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { confirm } = Modal;

const JobExperience = forwardRef((props, ref) => {
  const { jobExperienceSubmitForm, empInfo, isDetailsView } = props;
  const JobExperienceFormRef = useRef(null);
  const [jobExperience, setJobExperience] = useState([]);


  useImperativeHandle(ref, () => ({
    submitJobExperience() {
      jobExperienceSubmitForm({experiences: JSON.stringify(jobExperience)});
    }
  }));

  useEffect(() => {
     if (empInfo?.experiences) setJobExperience(JSON.parse(empInfo.experiences))
  }, [empInfo.experiences]);

  return <CreateForm ref={JobExperienceFormRef} jobExperience={jobExperience} isDetailsView={isDetailsView} setJobExperience={setJobExperience} />;
})

const CreateForm = Form.create()(({ form, jobExperience, setJobExperience, isDetailsView }) => {
  const columns = [
    {
      title: 'Company Name',
      dataIndex: 'company_name',
      key: 'company_name',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designation',
    },
    {
      title: 'From Date',
      dataIndex: 'from_date',
      key: 'from_date',
    },
    {
      title: 'To Date',
      dataIndex: 'to_date',
      key: 'to_date',
    },
    {
      title: 'Responsibility',
      dataIndex: 'responsibility',
      key: 'responsibility',
    },
    {
      title: "Action",
      key: "action",
      render: (record, row, index) => (<>
              <Button onClick={() => {deleteItem(index)}} type="link" disabled={isDetailsView} className="mr-4">
                <Icon type="delete" />
              </Button>

              <Button onClick={() => {editItem(record, index)}} type="link" disabled={isDetailsView}>
                <Icon type="edit" />
              </Button>
          </>
      ),
  },
  ];

  const editItem = (record, index) => {
    let items = [...jobExperience];
      items.splice(index, 1);
      setJobExperience(items);

      form.setFieldsValue({
        company_name: record.company_name,
        department: record.department,
        designation: record.designation,
        responsibility: record.responsibility,
        date_from_to: [moment(record.from_date, "YYYY-MM-DD"), moment(record.to_date, "YYYY-MM-DD")]
      });
  }

  const deleteItem = (index) => {
    confirm({
      title: 'Do you Want to delete these items?',
      // content: 'Some descriptions',
      onOk() {
        let items = [...jobExperience];
        items.splice(index, 1);
        setJobExperience(items);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        let exps = values;

        if (values?.date_from_to?.length) {
          exps.from_date = moment(values?.date_from_to[0]).format("YYYY-MM-DD");
          exps.to_date = moment(values?.date_from_to[1]).format("YYYY-MM-DD");
        }

        delete exps.date_from_to;
        setJobExperience(oldArray => [...oldArray, exps]);

        form.resetFields();
      }
    });
  };

  return (
    <>
      <Form
        layout="vertical"
        onSubmit={handleSubmit}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={'Company Name'}>
              {form.getFieldDecorator('company_name', {
                // rules: [{ required: true, message: 'Required!' }]
              })(<Input placeholder="Enter company name" size="large" />,
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'Department'}>
              {form.getFieldDecorator('department', {
                // rules: [{ required: true, message: 'Required!' }]
              })(<Input placeholder="Enter department" size="large" />,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={'Designation'}>
              {form.getFieldDecorator('designation', {
                // rules: [{ required: true, message: 'Required!' }],
              })(<Input placeholder="Enter designation" size="large" />,
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'Date(From-To)'}>
              {form.getFieldDecorator('date_from_to', {
                // rules: [{ required: true, message: 'Required!' }]
              })(<RangePicker placeholder="Enter date(from-to)" size="large" />,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label={'Responsibility'}><br />
              {form.getFieldDecorator('responsibility')(<Input.TextArea rows={4} placeholder="Enter description" size="large" style={{ width: "100%" }} />,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Button size="large" type="primary" htmlType="submit" style={{ float: 'right', margin: '1rem' }}
          disabled={isDetailsView}>
          + Add New
        </Button>
      </Form>

      <Divider style={{ margin: '1rem 0' }} />
      <Table columns={columns} dataSource={jobExperience} pagination={false} scroll={{ x: "calc(52vw)" }}/>
    </>
  )
});

export default JobExperience;

