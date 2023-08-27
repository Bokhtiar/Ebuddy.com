import React, {useEffect, useState} from 'react';
import {Button, Card, Checkbox, Col, Form, Icon, Input, Modal, PageHeader, Row, Select} from "antd";
import {Wrapper} from "../../../commons/Wrapper";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import uuid from "uuid/v4";
import {getData, postData} from '../../../../scripts/api-service';
import {
  DEPARTMENT_LIST_ALL,
  PIS_COMPANY_LIST_All,
  SOP_ACTIVITY_DELETE,
  TASK_SETUP_SOP_LIST,
  TASK_SOP_ACTIVITIES,
  SOP_WISE_DEPARTMENT_LIST
} from '../../../../scripts/api';
import ListDetails from './ListDetails';
import {useHistory} from "react-router-dom";
import {alertPop} from '../../../../scripts/message';
import * as Cookies from "js-cookie";

const { TextArea } = Input;
const { confirm } = Modal;

const ActivityLinkup = () => {
  let searchUrl = window.location.search;
  let params = new URLSearchParams(searchUrl);
  let paramsActivity = params.get('activityId');
  let actiId = paramsActivity ? paramsActivity * 1 : undefined;

  const history = useHistory();
  const [companyList, setCompanyList] = useState();
  const [createAnother, setCreateAnother] = useState(false);
  const [activityId, setActivityId] = useState(actiId);
  const [activities, setActivities] = useState();
  const [count, setCount] = useState(0);

  const submit = async (value, form) => {
    let res = await postData(TASK_SOP_ACTIVITIES, value);

    if (res) {
      if (createAnother) {
        form.resetFields();
        setCount(count + 1);
      } else {
        history.push(`/sop/activity-list`);
      }
    }
  };

  const getCompanyList = async () => {
    let res = await getData(PIS_COMPANY_LIST_All);

    if (res) {
      setCompanyList(res?.data?.data);
    }
  }

  const getActivityInfo = async () => {
    let res = await getData(TASK_SOP_ACTIVITIES + '/' + activityId);

    if (res) {
      let masterData = res?.data?.data;
      setActivities(masterData);
    }
  }

  useEffect(() => {
    getCompanyList();
  }, []);

  useEffect(() => {
    if (activityId) {
      getActivityInfo()
    }
  }, [activityId])

  return (
      <Wrapper className="supervisor-dashboard pb-5">
        <PageHeader
            style={{
              border: '1px solid rgb(235, 237, 240)',
              backgroundColor: '#FAFAFA'
            }}
            title="Activity Linkup"
        />

        <div className='mx-4'>
          <CreateForm submit={submit}
                      createAnother={createAnother} setCreateAnother={setCreateAnother}
                      companyList={companyList} activityId={activityId} activities={activities} count={count} />
        </div>
      </Wrapper>
  )
}

const CreateForm = Form.create()(({ form, submit, createAnother, setCreateAnother, companyList, activityId, activities, count }) => {

  const companyId = JSON.parse(Cookies.get("profile")).company_id;
  const [sopDetails, setSopDetails] = useState([{ id: uuid() }]);
  const [departments, setDepartments] = useState();
  const [sopSetupList, setSopSetupList] = useState();
  const [sopWiseDepartmentList, setSOPWiseDepartmentList] = useState();

  const localSubmit = (event) => {
    event.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        let activitiesData = {
          action: activityId ? 'update' : 'create',
          sop_setup_id: values.sop_id,
          company_id: values.company_id,
          details: []
        };

        sopDetails.forEach((sop, idx) => {
          let data = {
            activity_name: values[`activity_name-${sop.id}`],
            "department_id": values[`department_id-${sop.id}`],
            "designation_id": values[`designation_id-${sop.id}`],
            "function_type_id": values[`function_type_id-${sop.id}`],
            "function_id": values[`function_id-${sop.id}`],
            "estimation_time": values[`estimation_time-${sop.id}`],
            "estimation_day": values[`estimation_day-${sop.id}`],
            "is_attachment_required": values[`is_attachment_required-${sop.id}`] ? 1 : 0,
            "status": typeof values[`status-${sop.id}`] === 'number' ? values[`status-${sop.id}`] : 1,
            "serial": idx + 1,
            "id": values[`id-${sop.id}`]
          };

          activitiesData.details.push(data);
        });

        submit(activitiesData, form);
      }
    })
  };

  const handelSOPSetupSelect = (val) => {
    let find = sopSetupList.find(sop => sop.id === val);

    if (find) {
      form.setFieldsValue({
        sop_est_day: find.estimation
      });
    }

    getSOPWiseDepartmentList(val);
  }

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(sopDetails, result.source.index, result.destination.index);
    setSopDetails(items);
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const AddMoreDetails = () => {
    setSopDetails(prevArray => [...prevArray, { id: uuid() }]);
  }

  const removeDetails = (id) => {
    let activity = activities?.activity?.length ? activities?.activity : [];
    let data = activity.find(e => e.newId === id);

    if (activityId && data) {
      showDeleteConfirm(data)
    } else {
      let items = sopDetails.filter(sop => sop.id !== id);
      setSopDetails(items);
    }
  }

  const showDeleteConfirm = (data) => {
    confirm({
      title: 'Are you sure to delete this activity?',
      content: 'After delete this activity, You are unable to get the activity back!',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        getData(`${SOP_ACTIVITY_DELETE}/${data.id}/delete`).then((result) => {
          let items = sopDetails.filter(sop => sop.id !== data.newId);
          setSopDetails(items);
          alertPop('success', "Activity Deleted Successfully");
        }).catch((err) => {

        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const handelCompant = (val) => {
    getPISDepartmentList(val);
    getSOPSetupList(val);

    if (sopDetails?.length) {
      let fields = ["department_id-", "designation_id-", "function_type_id-", "function_id-"],
          removeField = [];

      sopDetails.forEach(sop => {
        fields.forEach(field => {
          removeField.push(`${field}${sop.id}`);
        })
      });

      form.resetFields(removeField);
    }
  }

  useEffect(() => {
    handelCompant(companyId)
  }, []);

  const getSOPSetupList = async (val) => {
    let res = await getData(TASK_SETUP_SOP_LIST + '?company_id=' + val);

    if (res) {
      setSopSetupList(res?.data?.data);
    }
  }

  const getSOPWiseDepartmentList = async (id) => {
    let res = await getData(SOP_WISE_DEPARTMENT_LIST + '?sop_setup_id=' + id);

    if (res) {
      setSOPWiseDepartmentList(res?.data?.data);
    }
  }

  const getPISDepartmentList = async (val) => {
    let res = await getData(DEPARTMENT_LIST_ALL + '?company_id=' + val);

    if (res) {
      setDepartments(res?.data?.data);
    }
  }

  useEffect(() => {
    if (activityId && sopSetupList?.length) handelSOPSetupSelect(activityId);
  }, [activityId && sopSetupList]);


  useEffect(() => {
    if (activities ) {

      form.setFieldsValue({company_id: activities.company_id});
      getPISDepartmentList(activities.company_id);
      getSOPSetupList(activities.company_id);

      if (activities?.activity?.length) {
        let editItems = [];

        activities.activity.forEach(act => {
          let newId = uuid();
          act.newId = newId;

          editItems.push({ id: newId });
        });

        setSopDetails(editItems);
      }
    }
  }, [activities]);

  useEffect(() => {
    setSopDetails([{ id: uuid() }]);
  }, [count])

  return (
      <Form onSubmit={localSubmit}>
        <Row gutter={32}>
          <Col span={12}>
            <Form.Item label={'Select SOP'}>
              {form.getFieldDecorator('sop_id', {
                rules: [{ required: true, message: "Required!" }],
                initialValue: activityId || undefined
              })(<Select
                  showSearch
                  placeholder='Select SOP'
                  size="large"
                  disabled={!sopSetupList?.length}
                  onChange={(val) => handelSOPSetupSelect(val)}
                  filterOption={(input, option) =>
                      option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0}
              >
                {sopSetupList?.map((project, index) =>
                    <Select.Option key={`project-${index}-${project.id}`}
                                   value={project.id}>{project.name}</Select.Option>
                )}
              </Select>)}
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label={'SOP Estimated Day'}>
              {form.getFieldDecorator('sop_est_day', {
                rules: [{ required: true, message: "Required!" }],
                initialValue: undefined
              })(<Input placeholder="SOP Estimated Day" disabled size="large"/>)}
            </Form.Item>
          </Col>
        </Row>

        <div style={{ height: "60vh", overflowY: "scroll" }}>
          <DragDropContext onDragEnd={result => onDragEnd(result, sopDetails, setSopDetails)}>
            <Droppable droppableId="sopDetails" key='sopDetails'>
              {(provided, snapshot) => {
                return (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver ? "lightblue" : '#fff',
                          padding: '4px',
                          // width: '350px',
                          // height: '480px',
                          overflowY: 'auto'
                        }}
                    >
                      {sopDetails.map((item, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: '#fff',
                                      color: snapshot.isDragging ? "#1890ff" : "#000",
                                      borderRadius: '5px',
                                      // 'border': '1px solid #ccc',
                                      ...provided.draggableProps.style
                                    }}
                                >
                                  <Row gutter={16}>
                                    <Col span={22}>
                                      <Card>
                                        <ListDetails 
                                          form={form} 
                                          companyList={companyList}         
                                          index={index}
                                          itemId={item.id} 
                                          departments={departments}
                                          activity={activityId && activities?.activity?.length ? activities.activity[index] : ''}
                                          activities={activities} activityId={activityId}
                                          sopWiseDepartmentList={sopWiseDepartmentList}
                                        ></ListDetails>
                                      </Card>
                                    </Col>

                                    <Col span={2}>
                                      {
                                        sopDetails.length - 1 === index ? <Card style={{
                                          textAlign: 'center',
                                          background: 'rgb(95 158 253)',
                                          color: "#fff"
                                        }} bodyStyle={{ padding: '24px 10px' }} onClick={() => { AddMoreDetails() }}>
                                          <Icon type="plus-circle" style={{ fontSize: "1.5rem" }} />
                                          <br />
                                          Add More
                                        </Card> : ''
                                      }

                                      {
                                        sopDetails.length !== index && sopDetails.length > 1 ? <Card style={{
                                          textAlign: 'center',
                                          background: 'rgb(243 38 38)',
                                          color: "#fff"
                                        }} onClick={() => removeDetails(item.id)}>
                                          <Icon type="delete" style={{ fontSize: "1.5rem" }} />
                                          Remove
                                        </Card> : ''
                                      }

                                    </Col>
                                  </Row>
                                </div>
                            )}
                          </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                )
              }}
            </Droppable>
          </DragDropContext>
        </div>


        <div className='' style={{ textAlign: 'right', marginTop: '2rem' }}>
          {!activityId ? <Checkbox style={{ marginTop: '1rem' }} checked={createAnother}
                    onChange={(e) => setCreateAnother(e.target.checked)}>Create Another
          </Checkbox>
          : null}

          <Button type="primary" size="large" htmlType="submit" id="fourth-click"
                  style={{ float: 'right', marginLeft: "1rem" }}>{ activityId ? 'Update' : 'Create New' }</Button>
        </div>
      </Form>
  )
});

export default ActivityLinkup;