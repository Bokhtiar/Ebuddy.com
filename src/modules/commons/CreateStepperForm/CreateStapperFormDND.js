import { Flex } from "../Flex";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Steps } from "antd";
import styled from "styled-components";

const StyledBtn = styled(Button)`
  padding: 0 4.2rem;
`;

export const CreateStepperForm = ({ setModal, setIsDetailsView, steps, fields, loading, submit, refresh, context, isDetailsView }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData({});
    setCurrentStep(0)
  }, [refresh])

  return (
    <Flex direction="column">
      <Steps current={currentStep}>
        {steps && steps.map((item, idx) => <Steps.Step {...item} />)}
      </Steps>
      <Flex full space="1rem 0">
        <FormBuilder
          fields={steps[currentStep].fields}
          current={currentStep}
          setCurrent={setCurrentStep}
          steps={steps}
          loading={loading}
          formData={formData}
          setFormData={setFormData}
          submit={submit}
          refresh={refresh}
          context={context}
          isDetailsView={isDetailsView}
          setModal={setModal}
          setIsDetailsView={setIsDetailsView}
        />
      </Flex>
    </Flex>
  );
};

const FormBuilder = Form.create()(
  ({
    form,
    fields,
    loading,
    current,
    setCurrent,
    steps,
    formData,
    setFormData,
    submit,
    refresh,
    context,
    isDetailsView,
    setModal, 
    setIsDetailsView
  }) => {
    const localSubmit = (type) => {
      // console.log(type);
      form.validateFields((err, values) => {
        if (!err) {
          const entry = { ...formData, [current]: { ...values } };
          setFormData(entry);
          if (type === 'update_close') {
            submit(entry, type);
          } else {
            if (current < steps.length - 1) {
              setCurrent((state) => state + 1);
            }
          }
        }
      });
    };

    const createProject = () => {
      // console.log({formData});
      submit(formData);
    }

    const prevStep = () => current > 0 && setCurrent((state) => state - 1);

    useEffect(() => {
      if (formData && formData[current]) {
        form.setFieldsValue(formData[current]);
      }
    }, [current]);

    useEffect(() => {
      form.resetFields();
    }, [refresh])

    return (
      <Form style={{ width: "100%" }}>
        <Row gutter={32}>
          {fields &&
            fields.map(({ id, label, name, component, full, col, btn, value, isRequired }) =>
                <Col key={id} span={full ? 24 : col ? col : 12}>
                  {name === 'milestoneConfigure' ? (component) : <Form.Item label={label}>
                          {form.getFieldDecorator(name, {
                            initialValue: value,
                            rules: [{ required: isRequired, message: "Required!" }],
                          })(component)}
                      </Form.Item>}
                </Col>
            )}
        </Row>
        <Flex full justify="space-between">
          <StyledBtn
            size="large"
            type="primary"
            disabled={current < 1}
            onClick={prevStep}
          >
            Previous
          </StyledBtn>
          {current === 1 ? 
            (
              !isDetailsView ? 
              <StyledBtn
                size="large"
                type="primary"
                onClick={() => {
                  // console.log(form);
                  form.submit(createProject);
                }}
              >
                {context === 'edit' ? 'Update Project' : 'Create Project' }
              </StyledBtn> 
              :
              <StyledBtn
                style={{marginLeft: 'auto', marginRight: '10px'}}
                size="large"
                type="primary"
                onClick={() => {
                  setModal(false);
                  setIsDetailsView(false);
                }}
              >
                Close
              </StyledBtn> )
            : 
            (
              <>
                {context === 'edit' && !isDetailsView ?  <StyledBtn
                  style={{marginLeft: 'auto', marginRight: '10px'}}
                  size="large"
                  type="primary"
                  onClick={() => form.submit(() => localSubmit('update_close'))}
                >
                  Update & Close
                </StyledBtn> 
                : ''}
                <StyledBtn
                    size="large"
                    type="primary"
                    onClick={() => form.submit(localSubmit)}
                  >
                    Next Step
                </StyledBtn>
              </>
            )
          } 
        </Flex>
      </Form>
    );
  }
);
