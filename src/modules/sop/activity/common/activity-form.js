/** @format */

import React, { useState, useEffect } from "react";
import {
  Input,
  Col,
  Row,
  Select,
  DatePicker,
  Form,
  Button,
  InputNumber,
} from "antd";
import styled from "styled-components";
import { getData, postData } from "../../../../scripts/api-service";
import moment from "moment";
import { alertPop } from "../../../../scripts/message";
import * as Cookies from "js-cookie";
import {
  USER_LIST,
  PIS_COMPANY_LIST_All,
  PIS_DEPARTMENT_LIST,
  DESIGNATION_LIST_ALL,
  TEAMS_LIST_ALL,
  TASK_SOP_FUNCTION_TYPE_LIST,
  TASK_SOP_FUNCTION_LIST,
  ASSIGNEE_WISE_REPORTER,
  SOP_USER_ACTIVITY_CREATE,
  SOP_USER_ACTIVITY_UPDATE,
  ACTIVITY_PRIORITY_LIST_2,
  TASK_SETUP_SOP_LIST,
  SOP_WISE_ACTIVITY_LIST,
} from "../../../../scripts/api";
import { communication_mediums } from "./activity-form-helper";

const Helper = styled.p`
  font-size: 0.8rem;
  margin: -0.5rem 0 -1rem 0;
  color: gray;
`;

const { Option } = Select;
const { TextArea } = Input;

const ActivityForm = Form.create()(
  ({
    form,
    setModal,
    activityDetails,
    isTaskUpdate,
    updateEvent,
    flag,
    modal,
    resetCount,
  }) => {
    const [loading, setLoading] = useState();
    const [dropdownData, setDropdownData] = useState();
    const [userInfo, setUserInfo] = useState();
    const [fileUpload, setFileUpload] = useState();
    const [activityRepeat, setActivityRepeat] = useState(undefined);
    const [pOCList, setPOCList] = useState();
    const [isCommunication, setIsCommunication] = useState();
    const [unsetAssignee, setUnsetAssignee] = useState(false);
    const [activityTillDate, setActivityTillDate] = useState(false);
    const [startDate, setStartDate] = useState();
    const [companyList, setCompanyList] = useState();
    const [selectedCompany, setSelectedCompany] = useState();
    const [departmentList, setDepartmentList] = useState();
    const [designationList, setDesignationList] = useState();
    const [teamList, setTeamList] = useState();
    const [functionTypeList, setFunctionTypeList] = useState();
    const [functionList, setFunctionList] = useState();
    const [assigneeList, setAssigneeList] = useState();
    const [selectedAssignee, setSelectedAssignee] = useState();
    const [assigneeWiseReporterId, setAssigneeWiseReporterId] = useState();
    const [priorityList, setPriorityList] = useState();
    const [assigneeWiseReporter, setAssigneeWiseReporter] = useState();
    const [sopSetupList, setSopSetupList] = useState();
    const [selectedSop, setSelectedSop] = useState();
    const [sopActivityList, setSopActivityList] = useState();
    const [selectedSopActivity, setSelectedSopActivity] = useState();
    const [selectedDepartment, setSelectedDepartment] = useState();
    const [selectedDesignation, setSelectedDesignation] = useState();
    const [selectedFunctionType, setSelectedFunctionType] = useState();
    const [selectedFunctionId, setSelectedFunctionId] = useState();

    const fileUploadHandler = async (event) => {
      let value = event.target.files[0];
      document.getElementById("activity-attachemnt-name").innerHTML =
        value.name;
      setFileUpload(value);
    };

    const submit = (value, form) => {
      setLoading(true);

      let formData = new FormData();
      if (value?.company_id) formData.append("company_id", value?.company_id);
      if (value?.department_id)
        formData.append("department_id", value?.department_id);
      if (value?.designation_id)
        formData.append("designation_id", value?.designation_id);
      if (value?.function_type_id)
        formData.append("function_type_id", value?.function_type_id);
      if (value?.function_id)
        formData.append("function_id", value?.function_id);
      if (value?.team_id) formData.append("team_id", value?.team_id);
      if (value?.estimation_time)
        formData.append("estimation_time", value?.estimation_time);
      if (value?.title) formData.append("title", value?.title);
      if (value?.parent_activity_id)
        formData.append("parent_activity_id", value?.parent_activity_id);
      if (value?.activity_type_id)
        formData.append("activity_type_id", value?.activity_type_id);
      if (value?.activity_priority_id)
        formData.append("activity_priority_id", value?.activity_priority_id);
      if (value?.assignee) formData.append("assignee", value?.assignee);
      if (value?.communication_medium)
        formData.append("communication_medium", value?.communication_medium);
      if (value?.client_department_id)
        formData.append("client_department_id", value?.client_department_id);
      if (value?.note) formData.append("note", value?.note);
      if (value?.estimated_time)
        formData.append("estimated_time", value?.estimated_time);
      if (fileUpload) formData.append("attachment", fileUpload);

      if (activityRepeat !== undefined)
        formData.append("repeats", value?.repeats || null);
      formData.append("reporter", assigneeWiseReporterId);
      formData.append(
        "status",
        isTaskUpdate ? activityDetails?.activity_status || "To-Do" : "To-Do",
      );
      formData.append("start_date", value.start_date.format("YYYY-MM-DD") + "");
      formData.append("due_date", value.due_date.format("YYYY-MM-DD") + "");
      if (activityTillDate)
        formData.append(
          "repeats_till_date",
          value.repeats_till_date.format("YYYY-MM-DD") + "",
        );
      if (selectedSop)
        formData.append(
          "sop_setup_id",
          !isTaskUpdate ? value.sop_setup_id : null,
        );
      if (selectedSopActivity)
        formData.append(
          "sop_activity_setup_id",
          !isTaskUpdate ? value.sop_activity_setup_id : null,
        );

      if (!value.parent_activity_id) delete value.parent_activity_id;
      if (value.activity_type_id === 3) formData.append("is_communication", 1);
      if (value.activity_type_id === 2) formData.append("is_communication", 0);

      if (value.due_date && value.start_date && activityRepeat === undefined) {
        let startDate = moment(value.start_date).format("YYYY-MM-DD");
        let endDate = moment(value.due_date).format("YYYY-MM-DD");
        if (endDate < startDate) {
          alertPop("error", "Start date must be less then end date.");
          setLoading(false);
          return false;
        }
      }

      if (value.repeats_till_date && activityTillDate) {
        let startDate = moment(value.start_date).format("YYYY-MM-DD");
        let tillDate = moment(value.repeats_till_date).format("YYYY-MM-DD");
        if (tillDate < startDate) {
          alertPop("error", "Start date must be less then till date.");
          setLoading(false);
          return false;
        }
      }

      const url = isTaskUpdate
        ? `${SOP_USER_ACTIVITY_UPDATE}/${activityDetails?.id}`
        : SOP_USER_ACTIVITY_CREATE;
      postData(url, formData)
        .then((res) => {
          if (res) {
            alertPop("success", "Successfully complete the process");
            setModal(false);
            setLoading(false);
            setFileUpload();
            document.getElementById("activity-attachemnt-name").innerHTML =
              null;
            form.resetFields();
          } else {
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error({ error });
          setLoading(false);
        })
        .finally(() => setLoading(false));
    };

    const getUser = async () => {
      let userProfile = await JSON.parse(Cookies.get("profile"));
      setUserInfo(userProfile);
    };

    const getCompanyList = async () => {
      let res = await getData(PIS_COMPANY_LIST_All);

      if (res) {
        let masterData = res.data.data;
        setCompanyList(masterData);
      }
    };

    const getDepartmentList = async () => {
      let res = await getData(PIS_DEPARTMENT_LIST);

      if (res) {
        let masterData = res.data.data;
        setDepartmentList(masterData);
      }
    };

    const getDesignationList = async () => {
      let res = await getData(DESIGNATION_LIST_ALL);

      if (res) {
        let masterData = res.data.data;
        setDesignationList(masterData);
      }
    };

    const getTeamList = async (id) => {
      console.log("teammmmmmmm ");
      let url = TEAMS_LIST_ALL + "?department_id=" + id;
      let res = await getData(url);

      if (res) {
        let masterData = res.data.data;
        console.log("masterData>>>>>", masterData);
        setTeamList(masterData);
      }
    };

    const getFunctionTypeList = async (id) => {
      console.log("function typeeeeeeeee ");

      let url = TASK_SOP_FUNCTION_TYPE_LIST;
      if (id) url += "?department_id=" + id;
      let res = await getData(url);

      if (res) {
        let masterData = res.data.data;
        setFunctionTypeList(masterData);
      }
    };

    const getFunctionList = async () => {
      let url = TASK_SOP_FUNCTION_LIST;
      if (selectedFunctionType)
        url += "?function_type_id=" + selectedFunctionType;
      let res = await getData(url);

      if (res) {
        let masterData = res.data.data;
        setFunctionList(masterData);
      }
    };

    const getSOPSetupList = async () => {
      let res = await getData(
        TASK_SETUP_SOP_LIST + "?company_id=" + selectedCompany,
      );

      if (res) {
        let masterData = res?.data?.data;
        setSopSetupList(masterData);
      }
    };

    const getSOPActivityList = async () => {
      let url = SOP_WISE_ACTIVITY_LIST + "?";
      if (selectedCompany) url += "&company_id=" + selectedCompany;
      if (selectedDepartment) url += "&department_id=" + selectedDepartment;
      if (selectedDesignation) url += "&designation_id=" + selectedDesignation;
      if (selectedFunctionType)
        url += "&function_type_id=" + selectedFunctionType;
      if (selectedFunctionId) url += "&function_id=" + selectedFunctionId;
      if (selectedSop) url += "&sop_setup_id=" + selectedSop;

      let res = await getData(url);

      if (res) {
        let masterData = res?.data?.data;
        setSopActivityList(masterData);
      }
    };

    const getAssigneeList = async () => {
      let url = USER_LIST;
      // if(deptId) url += '?department_id=' + deptId;
      let res = await getData(url);

      if (res) {
        let masterData = res?.data?.data;
        setAssigneeList(masterData);
      }
    };

    const getPriorityList = async () => {
      let url = ACTIVITY_PRIORITY_LIST_2;
      // if(deptId) url += '?department_id=' + deptId;
      let res = await getData(url);

      if (res) {
        let masterData = res?.data?.data;
        setPriorityList(masterData);
      }
    };

    const getAssigneeWiseReporter = async (id) => {
      let url = ASSIGNEE_WISE_REPORTER + "/" + id;
      let res = await getData(url);

      if (res) {
        let masterData = res?.data?.data;
        setAssigneeWiseReporter(masterData.name);
        setAssigneeWiseReporterId(masterData.emp_id);
      }
    };

    useEffect(() => {
      getUser();
      getCompanyList();
      getAssigneeList();
      getPriorityList();
    }, []);

    useEffect(() => {
      if (selectedCompany) {
        getSOPSetupList();
        getDepartmentList();
        getDesignationList();
      }
    }, [selectedCompany]);

    useEffect(() => {
      if (isTaskUpdate) {
        getSOPSetupList();
        getDepartmentList();
        getDesignationList();
        getTeamList();
        getFunctionTypeList();
        getFunctionList();
      }
    }, [isTaskUpdate]);

    useEffect(() => {
      if (selectedDepartment) {
        getFunctionTypeList(selectedDepartment);
        getTeamList(selectedDepartment);
      }
    }, [selectedDepartment]);

    useEffect(() => {
      if (selectedFunctionType) getFunctionList();
    }, [selectedFunctionType]);

    useEffect(() => {
      getSOPActivityList();
    }, [
      selectedSop,
      selectedCompany,
      selectedDepartment,
      selectedDesignation,
      selectedFunctionType,
      selectedFunctionId,
    ]);

    useEffect(() => {
      if (selectedSopActivity) {
        let resultArray = sopActivityList.filter(
          (item) => item.id === selectedSopActivity,
        );
        form.setFieldsValue({
          estimation_time: resultArray[0].estimation_time,
        });
      }
    }, [selectedSopActivity]);

    useEffect(() => {
      if (selectedAssignee) getAssigneeWiseReporter(selectedAssignee);
    }, [selectedAssignee]);

    useEffect(() => {
      if (activityDetails)
        setSelectedAssignee(activityDetails?.assignee?.emp_id);
    }, [activityDetails]);

    useEffect(() => {
      if (userInfo && !isTaskUpdate) {
        activityDetails.company_id = userInfo.company_id;
        activityDetails.department_id = userInfo.department_id;
        activityDetails.designation_id = userInfo.designation_id;
        setSelectedCompany(userInfo.company_id);
        setSelectedDepartment(userInfo.department_id);
        setSelectedDesignation(userInfo.designation_id);
      }
    }, [userInfo]);

    const localSubmit = (e) => {
      e.preventDefault();
      form.validateFields((err, values) => {
        if (!err) {
          submit(values, form);
        }
      });
    };

    const setDate = (value) => {
      setStartDate(value);
      if (activityRepeat === "Daily")
        form.setFieldsValue({ due_date: moment(value) });
      if (activityRepeat === "Weekly")
        form.setFieldsValue({ due_date: moment(value).add(7, "d") });
      if (activityRepeat === "Monthly")
        form.setFieldsValue({ due_date: moment(value).add(1, "M") });
      if (activityRepeat === "Quarterly")
        form.setFieldsValue({ due_date: moment(value).add(3, "M") });
      if (activityRepeat === "Half Yearly")
        form.setFieldsValue({ due_date: moment(value).add(6, "M") });
      if (activityRepeat === "Yearly")
        form.setFieldsValue({ due_date: moment(value).add(1, "y") });
    };

    return (
      <Form onSubmit={localSubmit}>
        <Row gutter={32}>
          <Col span={12}>
            <Form.Item label={"Company"}>
              {form.getFieldDecorator("company_id", {
                rules: [{ required: true, message: "Required!" }],
                initialValue: activityDetails?.company_id
                  ? activityDetails?.company_id
                  : undefined,
              })(
                <Select
                  allowClear={false}
                  size="large"
                  placeholder="Select Company"
                  disabled={true}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={(value) => {
                    setSelectedCompany(value);
                    setUnsetAssignee(true);
                  }}
                >
                  {companyList && companyList.length
                    ? companyList.map((company) => {
                        return (
                          <Option key={company.id} value={company.id}>
                            {company.name}
                          </Option>
                        );
                      })
                    : ""}
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={"Department"}>
              {form.getFieldDecorator("department_id", {
                rules: [{ required: true, message: "Required!" }],
                initialValue: activityDetails?.department_id
                  ? activityDetails?.department_id
                  : undefined,
              })(
                <Select
                  allowClear={false}
                  size="large"
                  placeholder="Department Select"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={(value) => setSelectedDepartment(value)}
                >
                  {departmentList && departmentList.length
                    ? departmentList.map((dep) => {
                        return (
                          <Option key={dep.id} value={dep.id}>
                            {dep.name}
                          </Option>
                        );
                      })
                    : ""}
                </Select>,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={32}>
          <Col span={12}>
            <Form.Item label={"Designation"}>
              {form.getFieldDecorator("designation_id", {
                rules: [{ required: true, message: "Required!" }],
                initialValue: activityDetails?.designation_id
                  ? activityDetails?.designation_id
                  : undefined,
              })(
                <Select
                  allowClear={false}
                  size="large"
                  placeholder="Select Designation"
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={(value) => setSelectedDesignation(value)}
                >
                  {designationList && designationList.length
                    ? designationList.map((desig) => {
                        return (
                          <Option key={desig.id} value={desig.id}>
                            {desig.name}
                          </Option>
                        );
                      })
                    : ""}
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={"Team"}>
              {form.getFieldDecorator("team_id", {
                rules: [{ required: true, message: "Required!" }],
                initialValue: activityDetails?.team_id
                  ? activityDetails?.team_id
                  : undefined,
              })(
                <Select
                  getPopupContainer={(trigger) => trigger.parentNode}
                  placeholder="Select Team"
                  size="large"
                  showSearch
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {teamList?.map((team, index) => (
                    <Select.Option
                      key={`team-${index}-${team.id}`}
                      value={team.id}
                    >
                      {team.name}
                    </Select.Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={32}>
          <Col span={12}>
            <Form.Item label={"Function Type"}>
              {form.getFieldDecorator("function_type_id", {
                rules: [{ required: true, message: "Required!" }],
                initialValue: activityDetails?.function_type_id
                  ? activityDetails?.function_type_id
                  : undefined,
              })(
                <Select
                  getPopupContainer={(trigger) => trigger.parentNode}
                  placeholder="Select Function Type"
                  size="large"
                  onChange={(value) => setSelectedFunctionType(value)}
                  showSearch
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {functionTypeList?.map((func_type, index) => (
                    <Select.Option
                      key={`func_type-${index}-${func_type.id}`}
                      value={func_type.id}
                    >
                      {func_type.name}
                    </Select.Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col span={12} style={{ float: "right" }}>
            <Form.Item label={"Function Name"}>
              {form.getFieldDecorator("function_id", {
                rules: [{ required: true, message: "Required!" }],
                initialValue: activityDetails?.function_id
                  ? activityDetails?.function_id
                  : undefined,
              })(
                <Select
                  getPopupContainer={(trigger) => trigger.parentNode}
                  size="large"
                  placeholder="Select function name"
                  showSearch
                  onChange={(value) => setSelectedFunctionId(value)}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {functionList?.map((activityFunction, index) => (
                    <Select.Option
                      key={`activityFunction-${index}-${activityFunction.id}`}
                      value={activityFunction.id}
                    >
                      {activityFunction.name}
                    </Select.Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
          </Col>
        </Row>
        {!isTaskUpdate ? (
          <Row gutter={32}>
            <Col span={12}>
              <Form.Item label={"SOP"}>
                {form.getFieldDecorator("sop_setup_id", {
                  rules: [{ required: true, message: "Required!" }],
                  // initialValue: activityDetails?.function_type_id ? activityDetails?.sop_setup_id : undefined
                })(
                  <Select
                    getPopupContainer={(trigger) => trigger.parentNode}
                    placeholder="Select Sop"
                    size="large"
                    onChange={(value) => setSelectedSop(value)}
                    showSearch
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {sopSetupList?.map((sop, index) => (
                      <Select.Option
                        key={`sop-${index}-${sop.id}`}
                        value={sop.id}
                      >
                        {sop.name}
                      </Select.Option>
                    ))}
                  </Select>,
                )}
              </Form.Item>
            </Col>
            <Col span={12} style={{ float: "right" }}>
              <Form.Item label={"Sop Activity"}>
                {form.getFieldDecorator("sop_activity_setup_id", {
                  rules: [{ required: true, message: "Required!" }],
                  // initialValue: activityDetails?.function_id? activityDetails?.function_id : undefined
                })(
                  <Select
                    getPopupContainer={(trigger) => trigger.parentNode}
                    size="large"
                    placeholder="Select sop activity"
                    showSearch
                    onChange={(value) => setSelectedSopActivity(value)}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {sopActivityList?.map((sopActivity, index) => (
                      <Select.Option
                        key={`sopActivity-${index}-${sopActivity.id}`}
                        value={sopActivity.id}
                      >
                        {sopActivity.activity_name}
                      </Select.Option>
                    ))}
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>
        ) : null}
        <hr className="line-top-border" />
        {/* <Row gutter={32}>
                <Col span={24}>
                    <Form.Item label={'Activity Title'}>
                        {form.getFieldDecorator('title', {
                            rules: [{required: true, message: "Required!"}],
                            initialValue: activityDetails?.title
                        })(<Input size="large" placeholder="Enter Title"/>)}
                    </Form.Item>
                </Col>
            </Row> */}
        <Row gutter={32}>
          <Col span={12}>
            <Form.Item label={"Assignee"}>
              {form.getFieldDecorator("assignee", {
                rules: [{ required: true, message: "Required!" }],
                initialValue: activityDetails?.assignee?.emp_id
                  ? activityDetails?.assignee?.emp_id
                  : undefined,
              })(
                <Select
                  showSearch
                  getPopupContainer={(trigger) => trigger.parentNode}
                  size="large"
                  placeholder="Select Assignee"
                  onChange={(value) => setSelectedAssignee(value)}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {assigneeList?.map((employee, index) => (
                    <Option
                      key={`employee-${index}-${employee.id}`}
                      value={employee.emp_id}
                    >
                      {employee.name}
                    </Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={"REPORTER"}>
              {form.getFieldDecorator("reporter", {
                rules: [{ required: true, message: "Required!" }],
                initialValue: assigneeWiseReporter
                  ? assigneeWiseReporter
                  : undefined,
              })(
                <Input
                  size="large"
                  placeholder="Enter reporter name"
                  disabled
                />,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={32}>
          {/* <Col span={8}>
                    <Form.Item label={'ACTIVITY REPEAT'}>
                        {form.getFieldDecorator('repeats', {
                            // rules: [{required: true, message: "Required!"}],
                            initialValue: activityDetails?.repeats? activityDetails?.repeats : undefined
                        })(
                        <Select showSearch
                                    getPopupContainer={trigger => trigger.parentNode}
                                    allowClear={true}
                                    size="large"
                                    placeholder='Select Activity Repeat Time' 
                                    onChange={handleDate}
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }>
                            <Select.Option key="Daily" value="Daily">Daily</Select.Option>
                            <Select.Option key="Weekly" value="Weekly">Weekly</Select.Option>
                            <Select.Option key="Monthly" value="Monthly">Monthly</Select.Option>
                            <Select.Option key="Quarterly" value="Quarterly">Quarterly</Select.Option>
                            <Select.Option key="Half Yearly" value="Half Yearly">Half Yearly</Select.Option>
                            <Select.Option key="Yearly" value="Yearly">Yearly</Select.Option>
                        </Select>
                        )} 
                    </Form.Item>
                </Col> */}
          <Col span={12}>
            <Form.Item label={"Start date"}>
              {form.getFieldDecorator("start_date", {
                rules: [{ required: true, message: "Required!" }],
                initialValue: activityDetails?.start_date
                  ? moment(new Date(activityDetails?.start_date))
                  : moment(),
              })(
                <DatePicker
                  onChange={setDate}
                  size="large"
                  placeholder="Enter Start Date"
                />,
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={"End DATE"}>
              {form.getFieldDecorator("due_date", {
                rules: [{ required: true, message: "Required!" }],
                initialValue: activityDetails?.due_date
                  ? moment(new Date(activityDetails?.due_date))
                  : "",
              })(
                <DatePicker
                  disabled={activityRepeat ? true : false}
                  size="large"
                  placeholder="Enter End Date"
                />,
              )}
            </Form.Item>
          </Col>
        </Row>

        {/* <hr className="line-top-border"/> */}
        <Row gutter={32}>
          {/* <Col span={8}>
                    <Form.Item label={'Repeats Till Date'}>
                        {form.getFieldDecorator('repeats_till_date', {
                            rules: [{required: activityTillDate, message: "Required!"}],
                            initialValue: !activityTillDate ? '' : activityDetails?.repeats_till_date ? moment(new Date(activityDetails?.repeats_till_date)) : ''
                        })(<DatePicker disabled={!activityTillDate} size="large" placeholder="Enter Till Date"/>)}
                    </Form.Item>
                </Col> */}
          {/* <Col span={12}>
                    <Form.Item label={'ACTIVITY TYPE'}>
                        {form.getFieldDecorator('activity_type_id', {
                            rules: [{required: true, message: "Required!"}],
                            initialValue: activityDetails?.activity_type?.id ? activityDetails?.activity_type?.id : activityDetails?.activity_type_formatted?.id ? activityDetails?.activity_type_formatted?.id : defaultActivityType ? defaultActivityType : undefined
                        })(
                            <Select getPopupContainer={trigger => trigger.parentNode} size="large" placeholder='Select Type' onChange={handleCommunication} showSearch
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>   
                            {dropdownData?.activity_types?.map((activity_type, index) =>
                                    <Select.Option key={`activity_type-${index}-${activity_type.id}`} value={activity_type.id}>{activity_type.name}</Select.Option>
                                )}
                            </Select>
                        )}
                    </Form.Item>
                </Col> */}
          <Col span={12}>
            <Form.Item label={"Estimated Time (Minutes)"}>
              {form.getFieldDecorator("estimation_time", {
                rules: [{ required: true, message: "Required!" }],
                initialValue: activityDetails?.estimation_time,
              })(
                <InputNumber
                  size="large"
                  placeholder="Enter estimated time"
                  style={{ width: "100%" }}
                />,
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={"Priority"}>
              {form.getFieldDecorator("activity_priority_id", {
                rules: [{ required: true, message: "Required!" }],
                initialValue: activityDetails?.priority
                  ? activityDetails?.priority?.name
                  : 1,
              })(
                <Select
                  getPopupContainer={(trigger) => trigger.parentNode}
                  size="large"
                  placeholder="Select Priority"
                  showSearch
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {priorityList?.map((pr, index) => (
                    <Select.Option key={`pr-${index}-${pr.id}`} value={pr.id}>
                      {pr.name}
                    </Select.Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
          </Col>
        </Row>
        <hr className="line-top-border" />

        {/*<Helper>(Dev Note - Communication Medium and Communication Person fields will only show if activity type is selected as "Communication")</Helper>*/}

        {/* <Col span={8} style={{marginTop: '30px'}}>
                    <Form.Item label={''}>
                        {form.getFieldDecorator('is_communication', {})(<Checkbox
                            defaultChecked={activityDetails?.is_communication}
                            onChange={(e) => setIsCommunication(e.target.checked)}>
                                IS COMMUNICATION?</Checkbox>)}
                    </Form.Item>
                </Col> */}
        {/* {isCommunication ? <Row gutter={32}>
                <Col span={8}>
                    <Form.Item label={'COMMUNICATION MEDIUM'}>
                        {form.getFieldDecorator('communication_medium', {
                            rules: [{required: true, message: "Required!"}],
                            initialValue: activityDetails?.communication_medium ? activityDetails?.communication_medium : undefined
                        })(<Select getPopupContainer={trigger => trigger.parentNode} size="large" placeholder='Select Communication' showSearch
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }>
                            {communication_mediums?.map((communication_medium, index) =>
                                <Select.Option key={`communication_medium-${index}-${communication_medium.value}`}
                                                value={communication_medium.value}>{communication_medium.label}</Select.Option>
                            )}
                        </Select>)}
                        <Helper>(Dev Note - Communication Medium 3 value pre defined- "Visit, Call, Email")</Helper>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label={'CLIENT NAME'}>
                        {form.getFieldDecorator('client_id', {
                            rules: [{required: true, message: "Required!"}],
                            initialValue: activityDetails?.contact_person_details?.client_id ? activityDetails?.contact_person_details?.client_id : activityDetails?.contact_person ? activityDetails?.contact_person?.client_id : undefined
                        })(<Select 
                                getPopupContainer={trigger => trigger.parentNode} size="large" placeholder='Select Client' 
                                showSearch
                                // onChange={(id) => {clientManage(id); form.resetFields('client_department_id')}}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }>
                                {clientList?.map((client, index) =>
                                    <Select.Option key={`client-${index}-${client.id}`}
                                                value={client.id}>{client.name}</Select.Option>
                                )}
                        </Select>)}
                        <Helper>(Dev Note - Communication Medium 3 value pre defined- "Visit, Call, Email")</Helper>
                    </Form.Item>
                </Col> 
                <Col span={8}>
                    <Form.Item label={'COMMUNICATION PERSON'}>
                        {form.getFieldDecorator('client_department_id', {
                            rules: [{required: true, message: "Required!"}],
                            initialValue: activityDetails?.client_department_id ? activityDetails?.client_department_id : undefined
                        })(<Select getPopupContainer={trigger => trigger.parentNode} size="large" placeholder='Client Contact List' showSearch
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }>
                                {pOCList?.map((person, index) =>
                                <Select.Option key={`person-${index}-${person.id}`}
                                            value={person.id}>{person.contact_name}</Select.Option>
                                )}
                                {dropdownData?.contact_person?.map((person, index) =>
                                    <Select.Option key={`person-${index}-${person.id}`}
                                                value={person.id}>{person.contact_name}</Select.Option>
                                )}
                        </Select>)}
                    </Form.Item>
                </Col> 
                </Row>: null} */}
        <Row gutter={32}>
          <Col span={24}>
            <Form.Item label={"NOTES/REMARKS"}>
              {form.getFieldDecorator("note", {
                rules: [{ required: false, message: "Required!" }],
                initialValue: activityDetails?.note,
              })(
                <TextArea
                  autoSize={{ minRows: 2, maxRows: 6 }}
                  placeholder="Enter Note"
                />,
              )}
            </Form.Item>
          </Col>
        </Row>
        <hr className="line-top-border" />
        <Row gutter={16} style={{ display: "flex", alignItems: "center" }}>
          <Col span={18}>
            <div className="file-upload-content" style={{ marginTop: "1rem" }}>
              <label htmlFor="file-upload-field">
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    color: "#808080",
                  }}
                >
                  FILE ATTACHMENT
                </span>
              </label>
              <div className="file-upload-wrapper" data-text="">
                <span
                  className="attacment-filename"
                  id="activity-attachemnt-name"
                ></span>
                <input
                  name="file-upload-field"
                  type="file"
                  className="file-upload-field"
                  value=""
                  onChange={fileUploadHandler}
                  accept=".jpeg,.bmp,.png,.jpg,.pdf,.doc,.docx, .xlsx, .ppt"
                />
              </div>
            </div>
          </Col>
          <Col span={3}></Col>
          {/* <Col span={4}>
                    {!isUpdateState && <Form.Item label={''} style={{marginTop: '3.5rem'}}>
                        {form.getFieldDecorator('is_create_another', {})(
                            <Checkbox checked={isCreateAnother} onChange={e => setIsCreateAnother(e.target.checked)}>
                                Create Another
                            </Checkbox>)}
                    </Form.Item>}
                </Col> */}
          <Col span={2}>
            <Button
              style={{ width: "auto", marginTop: "2rem" }}
              loading={loading}
              block
              size="large"
              type="primary"
              htmlType="submit"
            >
              {isTaskUpdate ? "Update" : "Create"}
            </Button>
          </Col>
        </Row>
      </Form>
    );
  },
);

export default ActivityForm;
