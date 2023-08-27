/** @format */

import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Icon,
  Mentions,
  Modal,
  PageHeader,
  Row,
  Table,
} from "antd";
import debounce from "lodash/debounce";
import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import uuid from "uuid/v4";
import {
  MEETING_ACTION_POINT_API,
  MEETING_API,
  USER_LIST,
} from "../../../scripts/api";
import { getData, postData } from "../../../scripts/api-service";
import { calculateDuration } from "../../../scripts/helper";
import { alertPop } from "../../../scripts/message";
import { Wrapper } from "../../commons/Wrapper";
import { ActionPointModel } from "./ActionPointModel";

const MeetingActionPoints = Form.create()(({ form }) => {
  let searchUrl = window.location.search;
  let params = new URLSearchParams(searchUrl);
  let meetingId = params.get("id");

  const [meetingList, setMeetingList] = useState();
  const [employeeList, setEmployeeList] = useState();
  const [actionPointsList, setActionPointsList] = useState([]);
  const [actionPoints, setActionPoints] = useState();
  const [actionPointModal, setActionPointModal] = useState(false);
  const [dueDate, setDueDate] = useState();
  const [rowData, setRowData] = useState();
  const [mentionUserList, setMentionUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchString, setSearchString] = useState();
  const [followupDate, setFollowupDate] = useState();
  const [isFormSubmitLoading, setIsFormSubmitLoading] = useState(false);
  const [isMeetingListLoading, setIsMeetingListLoading] = useState(false);
  const history = useHistory();
  const ref = useRef();

  const getMeetingList = async (id) => {
    setIsMeetingListLoading(true);
    try {
      let url = MEETING_API + "/" + id;
      let res = await getData(url);

      if (res) {
        let masterData = res?.data?.data;
        setMeetingList(masterData);
      }
    } catch (error) {
      console.error(error);
    }
    setIsMeetingListLoading(false);
  };

  const getEmployeeList = async () => {
    let res = await getData(USER_LIST);

    if (res) {
      let masterData = res?.data?.data;
      setEmployeeList(masterData);
    }
  };
  // // console.log("action point list before submit", actionPointsList);
  const localSubmit = (e) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      // // console.log({ err, values });
      if (!err) {
        let validData = new Array();
        // // console.log("action point list after submit", actionPointsList);
        actionPointsList.map((item) => ({
          action_point: item?.action_point || "",
          assignee: item?.assignee || "",
          due_date: item?.due_date || "",
        }));

        let payload = {
          action_points: actionPointsList.map((point) =>
            ActionPointModel(point),
          ),
          follow_up_date: followupDate,
          // follow_up_date: moment(followupDate).format("YYYY-MM-dd"),
        };
        // console.log("payload", payload);
        // console.log({ validData });
        //checking if due date is present or not
        if (!actionPointsList.length) return false;
        else if (meetingList?.status === "Publish") {
          // console.log("status ", meetingList?.status);
          history.push(`/meeting/meeting-list?id=${meetingId}`);
        } else {
          setIsFormSubmitLoading(true);
          let url = MEETING_ACTION_POINT_API(meetingId);
          let res = await postData(url, payload);

          if (res) {
            let masterData = res?.data?.data;
            history.push(`/meeting/meeting-list?id=${meetingId}`);
            alertPop("success", "Meeting action points created successfully");
          }
        }
      }
      setIsFormSubmitLoading(false);
    });
  };

  const handleActionPoint = (data, dateString) => {
    // console.log({ actionPointsList });
    // console.log({ data, dateString });
    if (actionPointsList) {
      // const test = ;
      // // console.log({ test });
      // let finalresult = actionPointsList;
      // // console.log({ actionPointsList });
      setActionPointsList(
        actionPointsList.map((item) => {
          if (item.id === data.id) {
            return {
              ...item,
              due_date: dateString,
            };
          } else {
            return {
              ...data,
              due_date: dateString,
            };
          }
        }),
      );
    }
  };

  const handleSearch = (search) => {
    ref.current = search;
    setSearchString(search);
    setLoading(!!search);
    setMentionUserList();
    debounceLoadGithubUsers(search);
  };

  const loadGithubUsers = async (key) => {
    if (!key) {
      setMentionUserList();
      return;
    }

    let url = USER_LIST + "?search=" + key;
    let res = await getData(url);

    if (res) {
      if (ref.current !== key) return;
      let masterData = res?.data?.data;
      let result = masterData.slice(0, 10);
      setMentionUserList(result);
      setLoading(false);
    }
  };

  const debounceLoadGithubUsers = useCallback(
    debounce(loadGithubUsers, 800),
    [],
  );

  const columns = [
    {
      title: "Action Point",
      dataIndex: "action_point",
      key: "department",
      width: "30%",
    },
    {
      title: "Assignee",
      key: "title",
      width: 100,
      render: (row) => (meetingId ? row?.assignee_info?.name : undefined),
    },
    {
      title: "Due Date",
      // dataIndex: "due_date",
      key: "due_date",
      width: 150,
      render: (row) => (
        <>
          {row?.due_date && actionPointModal ? (
            <>
              <p>{row?.due_date}</p>
              <Icon
                type="edit"
                onClick={() => {
                  setActionPointModal(true);
                  setRowData(row);
                }}
                style={{ color: "#0084E6", fontSize: "20px" }}
              />
            </>
          ) : (
            <div style={{ height: "2rem" }}>
              <Form key={row?.id}>
                <Form.Item>
                  {form.getFieldDecorator("due_date", {
                    // rules: [{required: true, message: "Required!"}],
                    initialValue: row?.due_date
                      ? moment(row?.due_date)
                      : undefined,
                  })(
                    <DatePicker
                      size="default"
                      onChange={(date, dateString) => {
                        setDueDate(dateString);
                        // console.log(dateString);
                        handleActionPoint(row, dateString);
                        setActionPointModal(false);
                        form.resetFields(["assignee", "due_date"]);
                      }}
                      placeholder="Select due date"
                    />,
                  )}
                </Form.Item>
              </Form>
            </div>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      render: (row, record) => (
        <Icon
          type="delete"
          style={{ color: "#F2473F", fontSize: "20px" }}
          onClick={() => {
            const newActionPontList = actionPointsList.filter(
              (action) => action.id !== row.id,
            );
            setActionPointsList(newActionPontList);
          }}
        />
      ),
    },
  ];

  useEffect(() => {
    getEmployeeList();
  }, []);

  useEffect(() => {
    if (meetingId) getMeetingList(meetingId);
  }, [meetingId]);

  useEffect(() => {
    if (meetingList?.meeting_action_points) {
      setActionPointsList(meetingList?.meeting_action_points);
    }
  }, [meetingList?.meeting_action_points]);

  return (
    <Wrapper>
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)",
        }}
        onBack={() => history.push(`/meeting/meeting-minutes?id=${meetingId}`)}
        title="Meeting Action Points"
        // subTitle="Back to list"
        extra={[
          <Button
            key="1"
            type="primary"
            onClick={localSubmit}
            loading={isFormSubmitLoading}
          >
            Submit Action Points
          </Button>,
        ]}
      />
      <Row className="mx-3 my-2" gutter={16}>
        <Col span={16}>
          <small className="meeting_heading_color">
            Meeting ID # {meetingList?.id}
          </small>
          <h2>{meetingList?.title}</h2>
        </Col>
        <Col span={8}>
          <h4 className="meeting_heading_color">Follow up Date :</h4>
          <DatePicker
            allowClear
            onChange={(date, dateString) => {
              setFollowupDate(dateString);
            }}
            placeholder="Select follow up date"
          />
        </Col>
      </Row>
      <Divider className="my-2" />
      <Row gutter={16} className="mx-2 my-2">
        <Col span={16}>
          <h4 className="meeting_heading_color">Meeting Action Points</h4>
          <Row gutter={16} style={{ display: "flex", alignItems: "flex-end" }}>
            <Col span={20}>
              {/* <Form.Item label={'Action Point'}>
              {form.getFieldDecorator('action_point', {
              })(<Input
                  id="action-point-input"
                  style={{ width: '100%' }}
                  size="large"
                  onChange={(event)=> setActionPoints(
                    { "id": uuid(),
                      "action_point": event.target.value,
                      "due_date": "",
                      "assignee": ""
                    }
                  )}
                />)}
              </Form.Item> */}
              <Form.Item label={"Action Point"}>
                <small>
                  ** Please add actions points and <strong>then</strong> mention
                  anyone by typing '@someone' if necessary.{" "}
                </small>
                {form.getFieldDecorator(
                  "action_point",
                  {},
                )(
                  <Mentions
                    style={{ width: "100%" }}
                    loading={loading}
                    onChange={(value) => {
                      let assigneeName = "";
                      let actionPoint = "";

                      if (value.indexOf("@") > 0) {
                        actionPoint = value.substring(0, value.indexOf("@"));
                        assigneeName = value.substring(value.indexOf("@") + 1);
                      } else actionPoint = value;

                      let result = mentionUserList?.find(
                        (item) => item.name.trim() === assigneeName.trim(),
                      );

                      setActionPoints({
                        id: uuid(),
                        action_point: actionPoint,
                        due_date: "",
                        assignee: result ? result.emp_id : undefined,
                        assignee_info: {
                          name: assigneeName, //making an object to mimic the edit data set
                        },
                      });
                    }}
                    onSearch={(search) => handleSearch(search)}
                    disabled={meetingList?.status === "Publish" ? true : false}
                  >
                    {mentionUserList?.map(({ emp_id, name, profile_pic }) => (
                      <Mentions.Option
                        key={emp_id}
                        value={name}
                        className="antd-demo-dynamic-option"
                      >
                        <Avatar src={profile_pic} icon="user" size="small" />
                        &nbsp;
                        <span>{name}</span>
                      </Mentions.Option>
                    ))}
                  </Mentions>,
                )}
              </Form.Item>
            </Col>
            <Col span={4}>
              <Button
                type="primary"
                htmlType="submit"
                size="medium"
                style={{ margin: "0rem 0 1.5rem" }}
                onClick={() => {
                  if (!actionPoints?.assignee_info?.name) {
                    alertPop("error", "Please mention an assignee!");
                  } else if (actionPoints?.assignee_info?.name) {
                    let findIndex = employeeList.find(
                      (item) =>
                        item.name === actionPoints?.assignee_info?.name.trim(),
                    );

                    if (findIndex === undefined) {
                      alertPop("error", "Please mention a valid assignee!");
                    } else {
                      if (actionPoints)
                        setActionPointsList([
                          ...actionPointsList,
                          actionPoints,
                        ]);
                      form.resetFields("action_point");
                    }
                  }
                }}
                disabled={meetingList?.status === "Publish" ? true : false}
              >
                Add
              </Button>
            </Col>
          </Row>
          <Table
            rowKey={(record) => record.id}
            className="pa-employee-table"
            dataSource={actionPointsList}
            columns={columns}
            pagination={false}
            loading={isMeetingListLoading}
            scroll={{ y: "calc(100vh - 22rem)" }}
            // pagination={{
            //   current: currentPage,
            //   total: pageCount * 10,
            //   onChange: (page) => setCurrentPage(page),
            // }}
          />
        </Col>
        <Col span={8} style={{ borderLeft: "1px solid #ccc" }}>
          <div>
            <h4 className="meeting_heading_color">Meeting Schedule</h4>
            <Row gutter={16}>
              <Col span={12}>
                <small>Meeting Date</small>
                <p>{meetingList?.date}</p>
              </Col>
              <Col span={12}>
                <small>Duration</small>
                <p>{`${meetingList?.start_time} - ${
                  meetingList?.end_time
                } ${calculateDuration(meetingList?.duration)}`}</p>
              </Col>
            </Row>
            <h4 className="meeting_heading_color">Meeting Options</h4>
            <Col span={12}>
              <small>Meeting Type</small>
              <p>{meetingList?.type}</p>
            </Col>
            <Col span={12}>
              <small>Meeting Nature</small>
              <p>{meetingList?.nature}</p>
            </Col>
            {meetingList?.nature === "Business" ? (
              <>
                <Col span={24}>
                  <small>Project Name</small>
                  <p>{meetingList?.projects?.name}</p>
                </Col>
                <Col span={24}>
                  <small>Milestone Name</small>
                  <p>{meetingList?.projects?.name}</p>
                </Col>
              </>
            ) : (
              <>
                <Col span={24}>
                  <small>Function Type</small>
                  <p>{meetingList?.function_type?.name}</p>
                </Col>
                <Col span={24}>
                  <small>Function Name</small>
                  <p>{meetingList?.function_activity?.name}</p>
                </Col>
              </>
            )}
          </div>
          <div>
            <h4 className="meeting_heading_color">Assignee Options</h4>
            <Col span={24}>
              <small>Actor</small>
              <p>{meetingList?.actor_info?.name}</p>
            </Col>
            <Col span={24}>
              <small>Note Taker</small>
              <p>{meetingList?.note_tracker_info?.name}</p>
            </Col>
          </div>
        </Col>
      </Row>

      {/* <Modal
        title="Add Assignee and Due Date"
        visible={actionPointModal}
        onOk={() => {
          handleActionPoint(rowData);
          setActionPointModal(false);
          form.resetFields(["assignee", "due_date"]);
        }}
        onCancel={() => setActionPointModal(false)}
      >
        <Form key={rowData?.id}>
          <Form.Item label={"Due Date"}>
            {form.getFieldDecorator("due_date", {
              // rules: [{required: true, message: "Required!"}],
              initialValue: rowData?.due_date
                ? moment(meetingList?.due_date, "hh:mm a")
                : undefined,
            })(
              <DatePicker
                size="large"
                onChange={(date, dateString) => {
                  setDueDate(dateString);
                }}
                placeholder="Select due date"
              />,
            )}
          </Form.Item>
        </Form>
      </Modal> */}
    </Wrapper>
  );
});

export default MeetingActionPoints;
