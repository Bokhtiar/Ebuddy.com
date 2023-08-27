import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    PageHeader,
    Row,
    Select,
} from "antd";
import * as Cookies from "js-cookie";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
    ACTIVITY_PRIORITY_LIST_2,
    ASSIGNEE_WISE_REPORTER,
    CUSTOM_SOP_FUNCTION_LIST,
    DEPARTMENT_WISE_SOP_LIST,
    PIS_COMPANY_LIST_All,
    PIS_DEPARTMENT_LIST,
    SOP_TEAM_WISE_USER_LIST,
    SOP_USER_ACTIVITY_CREATE,
    SOP_WISE_ACTIVITY_LIST,
    SOP_WISE_FUNCTION_TYPE_LIST,
    TASK_SETUP_SOP_LIST,
    TEAMS_LIST_ALL,
} from "../../../../scripts/api";
import { getData, postData } from "../../../../scripts/api-service";
import { alertPop } from "../../../../scripts/message";
import { Wrapper } from "../../../commons/Wrapper";
import TaskScheduleUpdate from "../../../task-activity/TaskScheduleUpdate";

const { Option } = Select;
const { TextArea } = Input;

const ActivityCreateForm = Form.create()(
  ({ form, activityDetails, isTaskUpdate }) => {
    const [loading, setLoading] = useState();
    const [userInfo, setUserInfo] = useState();
    const [fileUpload, setFileUpload] = useState();
    const [activityRepeat, setActivityRepeat] = useState(undefined);
    const [unsetAssignee, setUnsetAssignee] = useState(false);
    const [activityTillDate, setActivityTillDate] = useState(false);
    const [startDate, setStartDate] = useState();
    const [companyList, setCompanyList] = useState();
    const [selectedCompany, setSelectedCompany] = useState();
    const [departmentList, setDepartmentList] = useState();
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
    const [departmentWiseSOP, setDepartmentWiseSOP] = useState();
    const [scheduleStartTime, setScheduleStartTime] = useState(
      activityDetails?.start_time || null
    );
    const [scheduleEndTime, setScheduleEndTime] = useState(
      activityDetails?.end_time || null
    );
    const [isChecked, setIsChecked] = useState(
      activityDetails
        ? activityDetails.hasOwnProperty("schedule_work") &&
          activityDetails.schedule_work === 1
          ? true
          : false
        : false
    );
    const history = useHistory();

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
      if (value?.start_time) formData.append("start_time", value?.start_time);
      if (value?.end_time) formData.append("end_time", value?.end_time);
      if (value?.schedule_work)
      formData.append("schedule_work", value?.schedule_work);
      if (fileUpload) formData.append("attachment", fileUpload);

      formData.append("reporter", assigneeWiseReporterId);
      if (activityRepeat !== undefined)
        formData.append("repeats", value?.repeats || null);
      if (activityTillDate)
        formData.append(
          "repeats_till_date",
          value.repeats_till_date.format("YYYY-MM-DD") + ""
        );
      formData.append(
        "status",
        isTaskUpdate ? activityDetails?.activity_status || "To-Do" : "To-Do"
      );
      formData.append("start_date", value.start_date.format("YYYY-MM-DD") + "");
      formData.append("due_date", value.due_date.format("YYYY-MM-DD") + "");

      if (selectedSop)
        formData.append(
          "sop_setup_id",
          !isTaskUpdate ? value.sop_setup_id : null
        );
      if (selectedSopActivity)
        formData.append(
          "sop_activity_setup_id",
          !isTaskUpdate ? value.sop_activity_setup_id : null
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
      //return;
      const url = SOP_USER_ACTIVITY_CREATE;

      postData(url, formData).then((res) => {
        if (res) {
          alertPop("success", "Successfully complete the process");
          // setModal(false);
          setLoading(false);
          setFileUpload();
          document.getElementById("activity-attachemnt-name").innerHTML = null;
          form.resetFields();
          history.push(`/sop/list-my-sop-activity`);
        } else {
          setLoading(false);
        }
      });
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

    const getDepartmentWiseSOP = async (id) => {
      let url = DEPARTMENT_WISE_SOP_LIST + "?department_id=" + id;
      let res = await getData(url);

      if (res) {
        let masterData = res.data.data;
        setDepartmentWiseSOP(masterData);
      }
    };

    const getTeamList = async (id) => {
      let url = TEAMS_LIST_ALL + "?department_id=" + id;
      let res = await getData(url);

      if (res) {
        let masterData = res.data.data;
        setTeamList(masterData);
      }
    };

    const getFunctionTypeList = async (dept_id, sop_setup_id) => {
      // let url = TASK_SOP_FUNCTION_TYPE_LIST + '?';
      let url = SOP_WISE_FUNCTION_TYPE_LIST + "?";
      if (dept_id) url += "&department_id=" + dept_id;
      if (sop_setup_id) url += "&sop_setup_id=" + sop_setup_id;
      let res = await getData(url);

      if (res) {
        let masterData = res.data.data;
        setFunctionTypeList(masterData);
      }
    };

    const getFunctionList = async () => {
      let url = CUSTOM_SOP_FUNCTION_LIST + "?";
      if (selectedFunctionType)
        url += "&function_type_id=" + selectedFunctionType;
      if (selectedSop) url += "&sop_setup_id=" + selectedSop;
      let res = await getData(url);

      if (res) {
        let masterData = res.data.data;
        setFunctionList(masterData);
      }
    };

    const getSOPSetupList = async () => {
      let res = await getData(
        TASK_SETUP_SOP_LIST + "?company_id=" + selectedCompany
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

    const getAssigneeList = async (dept_id, team_id) => {
      // let url = USER_LIST + "?";
      let url = SOP_TEAM_WISE_USER_LIST + "?";
      if (dept_id) url += "&department_id=" + dept_id;
      if (team_id) url += "&team_id=" + team_id;
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

    const handleDate = (value) => {
      if (value === undefined) {
        setActivityTillDate(false);
        setActivityRepeat(undefined);
        form.setFieldsValue({ repeats_till_date: undefined });
      } else {
        if (value === "Daily")
          form.setFieldsValue({ due_date: moment(startDate) });
        if (value === "Weekly")
          form.setFieldsValue({ due_date: moment(startDate).add(7, "d") });
        if (value === "Monthly")
          form.setFieldsValue({ due_date: moment(startDate).add(1, "M") });
        setActivityRepeat(value);
        setActivityTillDate(true);
      }
    };

    useEffect(() => {
      getUser();
      getCompanyList();
      getDepartmentList();
      getPriorityList();
    }, []);

    useEffect(() => {
      if (userInfo?.company_id) {
        getSOPSetupList();
      }
      if (userInfo?.department_id) {
        getFunctionTypeList(userInfo?.department_id);
        getDepartmentWiseSOP(userInfo?.department_id);
        // getAssigneeList(userInfo?.department_id, userInfo?.team_id);
        getTeamList(userInfo?.department_id);
        setSelectedDepartment(userInfo?.department_id);
      }
    }, [userInfo]);

    useEffect(() => {
      if (selectedDepartment) {
        getDepartmentWiseSOP(selectedDepartment);
        getTeamList(selectedDepartment);
      }
    }, [selectedDepartment]);

    useEffect(() => {
      if (selectedDepartment && selectedSop) {
        getFunctionTypeList(selectedDepartment, selectedSop);
      }
    }, [selectedSop]);

    useEffect(() => {
      getFunctionList();
    }, [selectedFunctionType]);

    useEffect(() => {
      getSOPActivityList();
    }, [selectedFunctionId]);

    useEffect(() => {
      if (selectedSopActivity) {
        let resultArray = sopActivityList.filter(
          (item) => item.id === selectedSopActivity
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
      if (scheduleStartTime !== null && scheduleEndTime !== null) {
        const timeFormat = "hh:mm";

        // Parse the selected times using the format
        const parsedStartTime = moment(scheduleStartTime, timeFormat);
        const parsedEndTime = moment(scheduleEndTime, timeFormat);

        if (parsedStartTime <= parsedEndTime) {
          const diff = parsedEndTime.diff(parsedStartTime, "minutes");
          form.setFieldsValue({ estimation_time: diff });
          // console.log('timeDifferenceInMinutes' ,diff);
        } else {
          // console.log({scheduleStartTime,scheduleEndTime});
          if (scheduleStartTime !== "" && scheduleEndTime !== "") {
            alertPop("error", "Invalid time format");
          }
        }
      }
    }, [scheduleStartTime, scheduleEndTime]);

    useEffect(() => {
      setIsChecked(activityDetails?.schedule_work);
    }, [activityDetails]);

    const localSubmit = (e) => {
      e.preventDefault();
      form.validateFields((err, values) => {
        if (!err) {
          if (isChecked) {
            submit(
              {
                ...values,
                start_time: moment(values?.start_time).format("HH:mm") || null,
                end_time: moment(values?.end_time).format("HH:mm") || null,
                schedule_work: 1,
              },
              form
            );
          } else {
            submit(
              {
                ...values,
                schedule_work: "0",
              },
              form
            );
          }
        } else {
          console.log({ err });
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
      <Wrapper>
        <PageHeader
          style={{
            border: "1px solid rgb(235, 237, 240)",
          }}
          onBack={() => history.push(`/sop/list-my-sop-activity`)}
          subTitle="Back to list"
        />
        <Form
          layout="vertical"
          onSubmit={localSubmit}
          style={{ margin: "1rem" }}
        >
          <Row gutter={32}>
            <Col span={12}>
              <Form.Item label={"Company"}>
                {form.getFieldDecorator("company_id", {
                  rules: [{ required: true, message: "Required!" }],
                  initialValue: userInfo?.company_id
                    ? userInfo?.company_id
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
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"Department"}>
                {form.getFieldDecorator("department_id", {
                  rules: [{ required: true, message: "Required!" }],
                  initialValue: userInfo?.department_id
                    ? userInfo?.department_id
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
                    onChange={(value) => {
                      setSelectedDepartment(value);
                      form.resetFields([
                        "sop_setup_id",
                        "team_id",
                        "function_type_id",
                        "function_id",
                        "sop_activity_setup_id",
                        "assignee",
                        "reporter",
                        "estimation_time",
                      ]);
                      setFunctionTypeList();
                      setFunctionList();
                      setSopActivityList();
                    }}
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
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
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
                    onChange={(value) => {
                      setSelectedSop(value);
                      form.resetFields([
                        "sop_activity_setup_id",
                        "function_type_id",
                        "estimation_time",
                      ]);
                      setFunctionTypeList();
                      setFunctionList();
                      setSopActivityList();
                    }}
                    showSearch
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {departmentWiseSOP?.map((sop, index) => (
                      <Select.Option
                        key={`sop-${index}-${sop.id}`}
                        value={sop.id}
                      >
                        {sop.name}
                      </Select.Option>
                    ))}
                    {/* {sopSetupList?.map((sop, index) =>
                                    <Select.Option key={`sop-${index}-${sop.id}`}
                                    value={sop.id}>{sop.name}</Select.Option>
                                )} */}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"Team"}>
                {form.getFieldDecorator("team_id", {
                  rules: [{ required: true, message: "Required!" }],
                  // initialValue: activityDetails?.team_id ? activityDetails?.team_id : undefined
                })(
                  <Select
                    getPopupContainer={(trigger) => trigger.parentNode}
                    placeholder="Select Team"
                    size="large"
                    showSearch
                    onChange={(value) => {
                      getAssigneeList(selectedDepartment, value);
                    }}
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
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={32}>
            <Col span={12}>
              <Form.Item label={"Function Type"}>
                {form.getFieldDecorator("function_type_id", {
                  rules: [{ required: true, message: "Required!" }],
                  // initialValue: activityDetails?.function_type_id ? activityDetails?.function_type_id : undefined
                })(
                  <Select
                    getPopupContainer={(trigger) => trigger.parentNode}
                    placeholder="Select Function Type"
                    size="large"
                    onChange={(value) => {
                      setSelectedFunctionType(value);
                      form.resetFields([
                        "function_id",
                        "sop_activity_setup_id",
                        "estimation_time",
                      ]);
                      setFunctionList();
                      setSopActivityList();
                    }}
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
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12} style={{ float: "right" }}>
              <Form.Item label={"Function Name"}>
                {form.getFieldDecorator("function_id", {
                  rules: [{ required: true, message: "Required!" }],
                  // initialValue: activityDetails?.function_id? activityDetails?.function_id : undefined
                })(
                  <Select
                    getPopupContainer={(trigger) => trigger.parentNode}
                    size="large"
                    placeholder="Select function name"
                    showSearch
                    onChange={(value) => {
                      setSelectedFunctionId(value);
                      form.resetFields([
                        "sop_activity_setup_id",
                        "estimation_time",
                      ]);
                      setSopActivityList();
                    }}
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
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          {!isTaskUpdate ? (
            <Row gutter={32}>
              <Col span={24} style={{ float: "right" }}>
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
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          ) : null}
          <hr className="line-top-border" />
          <Row gutter={32}>
            <Col span={12}>
              <Form.Item label={"Assignee"}>
                {form.getFieldDecorator("assignee", {
                  rules: [{ required: true, message: "Required!" }],
                  // initialValue: activityDetails?.assignee?.emp_id ? activityDetails?.assignee?.emp_id : undefined
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
                  </Select>
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
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={32}>
            <Col span={12}>
              <Form.Item label={"Repeat Type"}>
                {form.getFieldDecorator("repeats", {
                  // rules: [{required: true, message: "Required!"}],
                  // initialValue: cardData?.name ? cardData?.name : undefined
                })(
                  <Select
                    allowClear={true}
                    size="large"
                    placeholder="Repeat Type"
                    showSearch
                    optionFilterProp="children"
                    onChange={handleDate}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    // value={selectedDepartment ? selectedDepartment : undefined }
                    // onChange={(value) => setBusinessType(value)}
                  >
                    <Select.Option key="Daily" value="Daily">
                      Daily
                    </Select.Option>
                    <Select.Option key="Weekly" value="Weekly">
                      Weekly
                    </Select.Option>
                    <Select.Option key="Monthly" value="Monthly">
                      Monthly
                    </Select.Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"Repeats Till Date"}>
                {form.getFieldDecorator("repeats_till_date", {
                  rules: [{ required: activityTillDate, message: "Required!" }],
                  initialValue: !activityTillDate
                    ? ""
                    : activityDetails?.repeats_till_date
                    ? moment(new Date(activityDetails?.repeats_till_date))
                    : "",
                })(
                  <DatePicker
                    disabled={!activityTillDate}
                    size="large"
                    placeholder="Enter Till Date"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          {/* {scheduleStartTime && <Row gutter={32}>
                    <Col span={8}>
                        <TaskScheduleUpdate
                            scheduleStartTime={scheduleStartTime}
                            scheduleEndTime={scheduleEndTime}
                            setScheduleEndTime={setScheduleEndTime}
                            setScheduleStartTime={setScheduleStartTime}
                        />
                    </Col>
                </Row>} */}

          <Row gutter={32}>
            <Col span={12}>
              <Form.Item label={"Start date"}>
                {form.getFieldDecorator("start_date", {
                  rules: [{ required: true, message: "Required!" }],
                  initialValue: moment(),
                })(
                  <DatePicker
                    onChange={setDate}
                    size="large"
                    placeholder="Enter Start Date"
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"End DATE"}>
                {form.getFieldDecorator("due_date", {
                  rules: [{ required: true, message: "Required!" }],
                  // initialValue: activityDetails?.due_date ? moment(new Date(activityDetails?.due_date)) : ''
                })(
                  <DatePicker
                    disabled={activityRepeat ? true : false}
                    size="large"
                    placeholder="Enter End Date"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={10}>
              <TaskScheduleUpdate
                scheduleStartTime={scheduleStartTime}
                scheduleEndTime={scheduleEndTime}
                setScheduleEndTime={setScheduleEndTime}
                setScheduleStartTime={setScheduleStartTime}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                form={form}
                activityDetails={activityDetails}
              />
            </Col>
            <Col span={7}>
              <Form.Item label={"Estimated Time (Minutes)"}>
                {form.getFieldDecorator("estimation_time", {
                  rules: [{ required: true, message: "Required!" }],
                  // initialValue: activityDetails?.estimation_time
                })(
                  <InputNumber
                    size="large"
                    placeholder="Enter estimated time"
                    style={{ width: "100%" }}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item label={"Priority"}>
                {form.getFieldDecorator("activity_priority_id", {
                  rules: [{ required: true, message: "Required!" }],
                  // initialValue: activityDetails?.priority ? activityDetails?.priority?.name : 1
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
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <hr className="line-top-border" />
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
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <hr className="line-top-border" />
          <Row gutter={16} style={{ display: "flex", alignItems: "center" }}>
            <Col span={18}>
              <div
                className="file-upload-content"
                style={{ marginTop: "1rem" }}
              >
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
      </Wrapper>
    );
  }
);

export default ActivityCreateForm;
