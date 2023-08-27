import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { Row, Col, Input, Form, Button, Divider, Table, Tag, Icon, Modal } from 'antd';

const { confirm } = Modal;

const Skill = forwardRef((props, ref) => {
  const { skillSubmitForm, empInfo, isDetailsView } = props;
  const SkillsFormRef = useRef(null);
  const [skill, setSkill] = useState([]);

  useImperativeHandle(ref, () => ({
    submitSkill() {
      skillSubmitForm({ skills: JSON.stringify(skill) });
    }
  }));

  useEffect(() => {
    if (empInfo.skills) setSkill(JSON.parse(empInfo.skills));
  }, [empInfo]);

  return <CreateForm ref={SkillsFormRef} setSkill={setSkill} skill={skill} isDetailsView={isDetailsView} />;
})

const CreateForm = Form.create()(({ form, skill, setSkill, isDetailsView }) => {
  const columns = [
    {
      title: 'Skill Type',
      dataIndex: 'skill_type',
      key: 'skill_type',
    },
    {
      title: 'Skill Name',
      dataIndex: 'skill_name',
      key: 'skill_name',
    },
    {
      title: 'Work Percentage',
      dataIndex: 'work_percentage',
      key: 'work_percentage',
    },
    {
      title: 'Work Efficiency',
      dataIndex: 'work_efficiency',
      key: 'work_efficiency',
    },
    {
      title: "Action",
      key: "action",
      render: (record, row, index) => (<>
        <Button onClick={() => { deleteItem(index) }} type="link" disabled={isDetailsView} className="mr-4">
          <Icon type="delete" />
        </Button>

        <Button onClick={() => { editItem(record, index) }} type="link" disabled={isDetailsView}>
          <Icon type="edit" />
        </Button>
      </>
      ),
    },
  ];


  const editItem = (record, index) => {
    let items = [...skill];
    items.splice(index, 1);
    setSkill(items);

    form.setFieldsValue({
      skill_name: record.skill_name,
      skill_type: record.skill_type,
      work_efficiency: record.work_efficiency,
      work_percentage: record.work_percentage
    });
  }

  const deleteItem = (index) => {
    confirm({
      title: 'Do you Want to delete these items?',
      // content: 'Some descriptions',
      onOk() {
        let items = [...skill];
        items.splice(index, 1);
        setSkill(items);
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
        setSkill(oldArray => [...oldArray, values]);
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
            <Form.Item label={'skill type'}>
              {form.getFieldDecorator('skill_type', {
                // rules: [{ required: true, message: 'Required!' }],
              })(<Input placeholder="Enter skill type" size="large" />,
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'skill name'}>
              {form.getFieldDecorator('skill_name', {
                // rules: [{ required: true, message: 'Required!' }],
              })(<Input placeholder="Enter skill name" size="large" />,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={'work percentage'}>
              {form.getFieldDecorator('work_percentage')(<Input placeholder="Enter work percentage" size="large" />,
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={'work efficiency'}>
              {form.getFieldDecorator('work_efficiency')(<Input placeholder="Enter work efficiency" size="large" />,
              )}
            </Form.Item>
          </Col>
        </Row>

        <Button type="primary" htmlType="submit" style={{ float: 'right', margin: '1rem' }} size="large" disabled={isDetailsView}>
          + Add New
        </Button>
      </Form>

      <Divider style={{ margin: '1rem 0' }} />
      <Table columns={columns} dataSource={skill} pagination={false} scroll={{ x: "calc(52vw)" }}/>
    </>
  )
});

export default Skill;

