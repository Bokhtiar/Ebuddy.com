import React, { useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { Row, Col, Input, Form, Button, Divider, Table, Tag, Icon, Modal  } from 'antd';

const { confirm } = Modal;

const EducationalQualification = forwardRef((props, ref) => {
  const {educationQualifiactionSubmitForm, setEmpInfo, empInfo, isDetailsView} = props;
  const EducationalQualificationFormRef = useRef(null);
  const [eduQua, setEduQua] = useState([]);

  useImperativeHandle(ref, () => ({
    submitEducationalQualification() {
      educationQualifiactionSubmitForm({educations: JSON.stringify(eduQua)});
    }
  }));

  useEffect(() => {
    if (empInfo?.educations) setEduQua(JSON.parse(empInfo.educations));
  }, [empInfo]);


  return <CreateForm ref={EducationalQualificationFormRef} setEduQua={setEduQua}
    eduQua={eduQua} isDetailsView={isDetailsView}/>;
});

const CreateForm = Form.create()(({ form, setEduQua, eduQua, isDetailsView }) => {

  const columns = [
    {
      title: 'Course Name',
      dataIndex: 'course_name',
      key: 'course_name'
    },
    {
      title: 'Passing Year',
      dataIndex: 'passing_year',
      key: 'passing_year',
    },
    {
      title: 'Result',
      dataIndex: 'result',
      key: 'result',
    },
    {
      title: 'Board',
      dataIndex: 'board',
      key: 'board',
    },
    {
      title: 'Major',
      dataIndex: 'major',
      key: 'major',
    },
    {
      title: 'Institute',
      dataIndex: 'institute',
      key: 'institute',
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
    let items = [...eduQua];
      items.splice(index, 1);
      setEduQua(items);

      form.setFieldsValue({
        board: record.board,
        course_name: record.course_name,
        institute: record.institute,
        major: record.major,
        passing_year: record.passing_year,
        result: record.result,
      });
  }


  const deleteItem = (index) => {
    confirm({
      title: 'Do you Want to delete these items?',
      // content: 'Some descriptions',
      onOk() {
        let items = [...eduQua];
        items.splice(index, 1);
        setEduQua(items);
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
        setEduQua(oldArray => [...oldArray, values]);
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
            <Form.Item label={'course name'}>
              {form.getFieldDecorator('course_name', {
                // rules: [{ required: true, message: 'Required!' }],
              })(<Input placeholder="Enter course name" size="large" />,
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'passing year'}>
              {form.getFieldDecorator('passing_year', {
                // rules: [{ required: true, message: 'Required!' }],
              })(<Input placeholder="Enter passing year" size="large" />,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={'result'}>
              {form.getFieldDecorator('result', {
                // rules: [{ required: true, message: 'Required!' }],
              })(<Input placeholder="Enter result" size="large" />,
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'board'}>
              {form.getFieldDecorator('board', {
                // rules: [{ required: true, message: 'Required!' }],
              })(<Input placeholder="Enter board" size="large" />,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={'major'}>
              {form.getFieldDecorator('major', {
                // rules: [{ required: true, message: 'Required!' }],
              })(<Input placeholder="Enter major" size="large" />,
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'institute'}>
              {form.getFieldDecorator('institute', {
                // rules: [{ required: true, message: 'Required!' }],
              })(<Input placeholder="Enter institute" size="large" />,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit" size='large' style={{ float: 'right', margin: '1rem' }} disabled={isDetailsView}>
          + Add New
        </Button>
      </Form>
      <Divider style={{ margin: '1rem 0' }} />
      <Table columns={columns} dataSource={eduQua} pagination={false} scroll={{ x: "calc(52vw)" }}/>
    </>
  )
});

export default EducationalQualification;

