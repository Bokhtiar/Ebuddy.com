import { Button, Col, Form, Icon, Row, Modal } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Flex } from "../Flex";

import {CLIENT_DEPARTMENT_DELETE} from "../../../scripts/api";
import {getData} from "../../../scripts/api-service";
import { alertPop } from "../../../scripts/message";

const StyledBtn = styled(Button)`
  padding: 0 4.2rem;
`;

export default Form.create()(
  ({
    form,
    fields,
    loading,
    current,
    setCurrent,
    steps,
    formData,
    setFormData,
    setEditSubmitNow,
    isDetailsView
  }) => {
    const [formCount, setFormCount] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [detaislId, setdetailsId] = useState();
    const [keyId, setkeyId] = useState()

    const addForm = () => {
      setFormCount((state) => [
        ...state,
        { key: Date.now(), fields: [...fields] },
      ]);
    };

    const removeForm = (id, fields) => {
      let find = fields.find(e => e.key === id);

      if (find) {
        let deid = find.fields.find(i => i.label === "id");

        if (deid && deid.defaultValue && current === 3) {
          setDeleteModal(true);
          setdetailsId(deid.defaultValue);
          setkeyId(id);
        } else {
          setFormCount((state) => state.filter((item) => item.key !== id));
        }
      } else {
        setFormCount((state) => state.filter((item) => item.key !== id));
      }

      // setFormCount((state) => state.filter((item) => item.key !== id));
    };

    const deleteDepartment = async () => {
      if (detaislId) {
          let res = await getData(CLIENT_DEPARTMENT_DELETE + detaislId);

          if (res) {
            setdetailsId(null);
            setDeleteModal(false);

            setFormCount((state) => state.filter((item) => item.key !== keyId));
            setkeyId(null)
            alertPop('success', "Department delete successfully");
          }
      }
    }

    const localSubmit = () => {
      form.validateFields((err, values) => {
        if (!err) {
          let all_values = [];
          //get all values
          for (const [key, value] of Object.entries(values)) {
            // all_values.push({
            //   id: key.split("-")[0],
            //   [key.split("-")[1]]: value,
            // });

            let data = {
              id: key.split("-")[0],
            };

            if (key.split("-")[1] !== 'id')  data[key.split("-")[1]] = value;
            if (key.split("-")[1] === 'id') data.dep_id = value;

            all_values.push(data);
          }
          //get unique ids
          let result = [
            ...new Set(Object.keys(values).map((item) => item.split("-")[0])),
          ].map((item) => {
            let temp = {}; //optimization scope below - todo - O(n^n)
            all_values.map((val) => {
              if (val.id === item) temp = { ...temp, ...val };
            });
            delete temp.id;
            return temp;
          });
          const entry = { ...formData, [current]: [...result] };

          setFormData(entry);
          if (current < steps.length - 1) {
            setCurrent((state) => state + 1);
          }
        }
      });
    };

    const prevStep = () => current > 0 && setCurrent((state) => state - 1);

    useEffect(() => {
      if (formData && formData[current]) {
        setFormCount(
          // Object.values(formData[current]).map((fdata, idx) => ({
          formData[current].map((fdata, idx) => ({
            key: Date.now() + idx,
            fields: fields.map((field) => ({
              ...field,
              defaultValue: fdata[field.name],
            })),
          }))
        );
        form.setFieldsValue(formData[current]);
      } else {
        setFormCount([{ key: Date.now(), fields: [...fields] }]);
      }

      // console.log("current", current);
      // console.log('steps', steps.length - 1);
    }, [current, steps]);

    return (
      <>
      <Form style={{ width: "100%" }}>
        <Row gutter={16}>
          {fields &&
            fields.map(({ id, label, full, col }) => (
              <Col key={id} span={full ? 24 : col ? col : 12}>
                <Flex space="0.5rem" />
                <p className="b-title">{label}</p>
                <Flex space="0.1rem" />
              </Col>
            ))}
        </Row>
        {formCount?.map(({ key, fields }, idx) => (
          <Row gutter={16}>
            {fields &&
              fields.map(
                ({
                  id,
                  name,
                  component,
                  full,
                  col,
                  defaultValue,
                  customRules,
                  hiden,
                  notRequired
                }) => (
                  <Col key={id} span={full ? 24 : col ? col : 12} style={hiden ? {display: 'none'} : ''}>
                    <Form.Item>
                      {form.getFieldDecorator(`${key}-${name}`, {
                        rules: [
                          { required: notRequired ? false : true, message: "Required!" },
                          ...(typeof customRules == "object"
                            ? customRules
                            : []),
                        ],
                        initialValue: defaultValue,
                      })(component)}
                    </Form.Item>
                  </Col>
                )
              )}
            <Col span={2}>
              {/* formCount.length - 1 */}

              {idx === 0 ? (
                <Button
                  onClick={addForm}
                  type="primary"
                  size="large"
                  icon="plus"
                  ghost
                />
              ) : (
                <Button
                  onClick={() => removeForm(key, formCount)}
                  type="danger"
                  size="large"
                  icon="minus"
                  ghost
                />
              )}
            </Col>
          </Row>
        ))}
        <Flex space="1rem" />
        <Flex full justify="space-between">
          <StyledBtn
            size="large"
            type="primary"
            disabled={current < 1}
            onClick={prevStep}
          >
            Prev
          </StyledBtn>
          {
            (!(isDetailsView && current === (steps.length - 1))) ? <StyledBtn
                size="large"
                type="primary"
                onClick={() => {
                  if (current === steps.length - 1) {
                    form.submit(localSubmit);
                    setEditSubmitNow(true);
                  } else {
                    form.submit(localSubmit);
                    setEditSubmitNow(false);
                  }
                }}
              >
                {current === steps.length - 1 ? "Submit" : "Next"}
              </StyledBtn> : ''
          }
          
        </Flex>
      </Form>

      <Modal
        visible={deleteModal}
        title="Delete Department"
        onCancel={() => setDeleteModal(false)}
        footer={null}
      >
        <div className="mb-5 mt-3" style={{textAlign: 'center'}}>
          Are you sure you want to delete this Item. You will not get this item back.</div>

        <Button type="danger" block onClick={deleteDepartment}>Delete</Button>
      </Modal>
      </>
    );
  }
);
