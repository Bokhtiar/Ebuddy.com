/** @format */

import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select
} from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getData } from "../../../scripts/api-service";
// import {postData} from "../../../scripts/postData";c
import * as Cookies from "js-cookie";
import moment from "moment";
import {
  ACTIVITY_CREATE_WITH_ATTACHMENT,
  ACTIVITY_FUNCTION_DROPDOWNLIST,
  ACTIVITY_UPDATE_WITH_ATTACHMENT,
  CLIENT_POCS,
  CLIENT_POC_LIST,
  DEPARTMENT_LIST,
  FUNCTION_TYPES_DROPDOWNLIST,
  FUNCTION_TYPE_ACTIVITY_PARAMS,
  USER_LIST
} from "../../../scripts/api";
import { postData } from "../../../scripts/api-service";
import { alertPop } from "../../../scripts/message";

import TaskScheduleUpdate from "../TaskScheduleUpdate";
import { communication_mediums } from "./activityFormHelper";

const Helper = styled.p`
  font-size: 0.8rem;
  margin: -0.5rem 0 -1rem 0;
  color: gray;
`;

const { Option } = Select;
const { TextArea } = Input;

export default function ActivityForm({
  setModal,
  activityDetails,
  isTaskUpdate,
  updateEvent,
  projectId,
  nonBusiness,
  setNonBusiness,
  flag,
  modal,
  resetCount,
}) {
  // console.log("activityDetails", activityDetails);
  const [loading, setLoading] = useState();
  const [dropdownData, setDropdownData] = useState();
  const [userInfo, setUserInfo] = useState();
  const [fileUpload, setFileUpload] = useState();
  const [activityRepeat, setActivityRepeat] = useState(undefined);
  const [pOCList, setPOCList] = useState();
  const [departments, setDepartments] = useState();
  const [DepartmentSelect, setdepartmentSelect] = useState();
  const [employeeList, setEmployeeList] = useState();
  const [isCommunication, setIsCommunication] = useState();
  const [unsetAssignee, setUnsetAssignee] = useState(false);
  const [clientList, setClientList] = useState();
  const [activityTillDate, setActivityTillDate] = useState(false);
  const [isCreateAnother, setIsCreateAnother] = useState(false);

  const fileUploadHandler = async (event) => {
    // console.log({ event });
    // let value = event?.target?.value;
    let value = event?.target?.files[0];
    //console.log(value);
    document.getElementById("activity-attachemnt-name").innerHTML = value.name;
    setFileUpload(value);
  };

  const submit = (value, form) => {
    setLoading(true);
    let formData = new FormData();
    if (value?.department_id)
      formData.append("department_id", value?.department_id);
    if (value?.function_type_id)
      formData.append("function_type_id", value?.function_type_id);
    if (value?.function_id) formData.append("function_id", value?.function_id);
    if (value?.project_id) formData.append("project_id", value?.project_id);
    if (value?.project_milestone_id)
      formData.append("project_milestone_id", value?.project_milestone_id);
    if (value?.title) formData.append("title", value?.title);
    if (value?.parent_activity_id)
      formData.append("parent_activity_id", value?.parent_activity_id);
    if (value?.activity_type_id)
      formData.append("activity_type_id", value?.activity_type_id);
    // if(value?.repeats) formData.append("repeats", value?.repeats);
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
    if (value?.schedule_work)
      formData.append("schedule_work", value?.schedule_work);
    if (value?.start_time) formData.append("start_time", value?.start_time);
    if (value?.end_time) formData.append("end_time", value?.end_time);
    if (fileUpload) {
      if (fileUpload.size > 2097152) {
        //2097152 = 2MB
        alertPop("error", "File size is greater than 2MB.");
        setLoading(false);
        return;
      } else {
        formData.append("attachment", fileUpload);
        console.log({ loading });
        setLoading(false);
      }
    }

    if (activityRepeat !== undefined)
      formData.append("repeats", value?.repeats || null);
    formData.append(
      "reporter",
      dropdownData?.reporter?.emp_id || activityDetails?.reporter_user?.emp_id,
    );
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

    // value.reporter = dropdownData?.reporter?.emp_id;
    // value.status = isTaskUpdate ? activityDetails?.activity_status || 'To-Do' : 'To-Do';
    // value.start_date = value.start_date.format('YYYY-MM-DD') + '';
    // value.due_date = value.due_date.format('YYYY-MM-DD') + '';

    if (!value.parent_activity_id) delete value.parent_activity_id;
    // if (value.activity_type_id === 3) value.is_communication = 1;
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

    // const url = isTaskUpdate ? `/task/v1/activities/${activityDetails?.id}` : '/task/v1/activities-create';
    const url = isTaskUpdate
      ? ACTIVITY_UPDATE_WITH_ATTACHMENT + `/${activityDetails?.id}`
      : ACTIVITY_CREATE_WITH_ATTACHMENT;
    // postData(url, value).then(res => {
    postData(url, formData)
      .then((res) => {
        console.log({ formData });
        if (res?.data?.code === 201) {
          alertPop("success", "Successfully complete the process");
          setModal(value.is_create_another == true);
          // setDropdownData((preState) => ({
          //     projectList: preState.projectList
          // }));
          setLoading(false);
          setFileUpload();
          document.getElementById("activity-attachemnt-name").innerHTML = null;
          if (flag !== "project-list") updateEvent();

          // setDropdownData();
          // if (!isTaskUpdate)
          methods.selectAssigneeHandle(userInfo?.emp_id);
          setIsCommunication(0);
          setUnsetAssignee(false);
          setdepartmentSelect(false);

          if (!isCreateAnother) {
            form.resetFields();
            setModal(false);
          }
        }
        // else return ;
        else {
          setLoading(false);
          if (flag !== "project-list") updateEvent(isTaskUpdate);
        }
      })
      .catch((error) => {
        console.error({ error });
        setLoading(false);
      })
      .finally(() => setLoading(false));
    setLoading(false);
  };

  const dropDownDataSet = (url, key) => {
    getData(url).then((res) => {
      //console.log("[dropdown-data-set]", res?.data);

      if (key) {
        setDropdownData((preState) => ({
          ...preState,
          [key]: res?.data?.data || [],
        }));
      } else {
        setDropdownData((preState) => ({
          ...preState,
          ...(res?.data?.data || {}),
        }));
      }
    });
  };

  const methods = {
    projectChangeHandle: (e) => {
      if (e) dropDownDataSet(`task/v1/activitiy-select-params/${e}`, false);
    },
    selectAssigneeHandle: (e) => {
      dropDownDataSet(`task/v1/activity/assigne/${e}`, "reporter");
    },
    functionType: (e) => {
      dropDownDataSet(
        ACTIVITY_FUNCTION_DROPDOWNLIST + "?function_type_id=" + e,
        "activityFunctionList",
      );
      if (e && nonBusiness) {
        dropDownDataSet(FUNCTION_TYPE_ACTIVITY_PARAMS + "/" + e, false);
        // dropDownDataSet(`task/v1/activitiy-select-params/${e}`, false);
      }
    },
  };

  const getUser = async () => {
    let userProfile = await JSON.parse(Cookies.get("profile"));
    setUserInfo(userProfile);

    if (!isTaskUpdate) {
      methods.selectAssigneeHandle(userProfile.emp_id);
    }
  };

  const clientManage = (id) => {
    getData(CLIENT_POC_LIST + "?client_id=" + id).then((res) => {
      if (res) {
        setPOCList(res?.data?.data);
      }
    });
  };

  const getClientList = async (id) => {
    let res = await getData(CLIENT_POCS);
    if (res) {
      setClientList(res?.data?.data);
    }
  };

  const getDepartments = async () => {
    let res = await getData(DEPARTMENT_LIST);

    if (res) {
      let masterData = res.data.data;
      setDepartments(masterData);
    }
  };

  const getAssignee = async (deptId) => {
    let url = USER_LIST;
    if (deptId) url += "?department_id=" + deptId;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      setEmployeeList(masterData);
    }
  };

  const departmentChangeHandel = (value) => {
    setdepartmentSelect(value);
    getAssignee(value);
    dropDownDataSet(
      FUNCTION_TYPES_DROPDOWNLIST + "?department_id=" + value,
      "functionTypeList",
    );
  };

  useEffect(() => {
    if (activityDetails?.contact_person?.client_id)
      clientManage(activityDetails?.contact_person?.client_id);
  }, [activityDetails?.contact_person?.client_id]);

  useEffect(() => {
    getUser();
    getDepartments();
    if (!nonBusiness) getAssignee();
    if (nonBusiness) getAssignee(userInfo?.department_id);
  }, []);

  useEffect(() => {
    getClientList();
  }, [isCommunication]);

  useEffect(() => {
    if (modal && !isTaskUpdate)
      dropDownDataSet(
        FUNCTION_TYPES_DROPDOWNLIST +
          "?department_id=" +
          userInfo?.department_id,
        "functionTypeList",
      );
    if (!modal) setIsCommunication(0);
  }, [userInfo?.department_id, modal]);

  useEffect(() => {
    dropDownDataSet("task/v1/project-setup-list", "projectList");
    if (isTaskUpdate && activityDetails && !nonBusiness) {
      methods.projectChangeHandle(activityDetails?.project_details?.id);
    }

    if (isTaskUpdate && activityDetails)
      setIsCommunication(activityDetails?.is_communication);
    // if(activityDetails?.function_type?.id)dropDownDataSet(FUNCTION_TYPE_ACTIVITY_PARAMS + '/' + activityDetails?.function_type?.id, false);
  }, [activityDetails, isTaskUpdate, nonBusiness]);

  useEffect(() => {
    if (projectId && !nonBusiness) {
      methods.projectChangeHandle(projectId);
    }
  }, [projectId, nonBusiness]);

  useEffect(() => {
    if (nonBusiness && userInfo) {
      //for update
      if (isTaskUpdate && activityDetails?.department_id) {
        getAssignee(activityDetails?.department_id);
        dropDownDataSet(
          FUNCTION_TYPES_DROPDOWNLIST +
            "?department_id=" +
            activityDetails?.department_id,
          "functionTypeList",
        );
      }
      //for logged in user in create
      else if (userInfo?.department_id) {
        getAssignee(userInfo?.department_id);
        dropDownDataSet(
          FUNCTION_TYPES_DROPDOWNLIST +
            "?department_id=" +
            userInfo?.department_id,
          "functionTypeList",
        );
      }
    }
  }, [nonBusiness, userInfo, activityDetails]);

  useEffect(() => {
    if (resetCount) {
      setDropdownData({});
    }
  }, [resetCount]);

  useEffect(() => {
    if (
      typeof activityDetails === "object" &&
      !activityDetails?.reporter_user
    ) {
      getUser();
    }
  }, [activityDetails]);

  useEffect(() => {
    setActivityRepeat(activityDetails?.repeats);
    if (activityDetails?.repeats) setActivityTillDate(true);
    else setActivityTillDate(false);
  }, [activityDetails?.repeats]);

  return (
    <CreateForm
      isCreateAnother={isCreateAnother}
      setIsCreateAnother={setIsCreateAnother}
      submit={submit}
      methods={methods}
      dropdownData={dropdownData}
      projectId={projectId}
      loading={loading}
      activityDetails={activityDetails}
      isUpdateState={isTaskUpdate}
      userInfo={userInfo}
      nonBusiness={nonBusiness}
      fileUploadHandler={fileUploadHandler}
      setActivityRepeat={setActivityRepeat}
      activityRepeat={activityRepeat}
      setDropdownData={setDropdownData}
      modal={modal}
      flag={flag}
      clientManage={clientManage}
      pOCList={pOCList}
      departments={departments}
      setDepartments={setDepartments}
      setdepartmentSelect={setdepartmentSelect}
      employeeList={employeeList}
      DepartmentSelect={DepartmentSelect}
      dropDownDataSet={dropDownDataSet}
      isCommunication={isCommunication}
      setIsCommunication={setIsCommunication}
      isTaskUpdate={isTaskUpdate}
      unsetAssignee={unsetAssignee}
      setUnsetAssignee={setUnsetAssignee}
      departmentChangeHandel={departmentChangeHandel}
      clientList={clientList}
      activityTillDate={activityTillDate}
      setActivityTillDate={setActivityTillDate}
    />
  );
}

const CreateForm = Form.create()(
  ({
    isCreateAnother,
    setIsCreateAnother,
    form,
    submit,
    loading,
    editValues,
    dropdownData,
    methods,
    activityDetails,
    isUpdateState,
    userInfo,
    projectId,
    nonBusiness,
    fileUploadHandler,
    setActivityRepeat,
    activityRepeat,
    setDropdownData,
    modal,
    flag,
    clientManage,
    pOCList,
    departments,
    setDepartments,
    setdepartmentSelect,
    employeeList,
    DepartmentSelect,
    dropDownDataSet,
    isCommunication,
    setIsCommunication,
    isTaskUpdate,
    unsetAssignee,
    setUnsetAssignee,
    departmentChangeHandel,
    clientList,
    activityTillDate,
    setActivityTillDate,
  }) => {
    const [isAttachmentRequired, setIsAttachmentRequired] = useState();
    const [parentTask, setParentTask] = useState();
    const [defaultActivityType, setDefaultActivityType] = useState();
    const [defaultMilestone, setDefaultMilestone] = useState();
    const [projectID, setProjectID] = useState();
    const [startDate, setStartDate] = useState();
    const [scheduleStartTime, setScheduleStartTime] = useState( Object.keys(activityDetails).length ? activityDetails?.start_time : null);
    const [scheduleEndTime, setScheduleEndTime] = useState( Object.keys(activityDetails).length ? activityDetails?.end_time : null);
    const [isChecked, setIsChecked] = useState(
      Object.keys(activityDetails).length
        ? activityDetails.hasOwnProperty("schedule_work") &&
          activityDetails.schedule_work === 1 ? true : false 
        : false
    );
   // console.log({activityDetails});
    const localSubmit = (e) => {
      e.preventDefault();
      //console.log("form", form.getFieldsValue());
      form.validateFields((err, values) => {
        // form.setFieldsValue({ start_time: scheduleStartTime})
        // form.setFieldsValue({ end_time: scheduleEndTime})
        if (!err) {
          if (isChecked) {
            submit(
              {
                ...values,
                start_time: moment(values?.start_time).format("HH:mm") || null,
                end_time: moment(values?.end_time).format("HH:mm") || null,
                schedule_work: 1,
              },
              form,
            );
          } else {
            submit(
              {
                ...values,
                schedule_work: '0',
              },
              form,
            );
          }

          // form.resetFields();
          setDefaultActivityType();
          setDefaultMilestone();
          setIsCreateAnother(false);
        } else {
          console.log({ err });
        }
      });
    };

    const handleCommunication = (value) => {
      //value is 3 for Communication field in activity type dropdown
      if (value === 3) return setIsCommunication(1);
      else return setIsCommunication(0);
    };

    const setDate = (value) => {
      setStartDate(value);
      console.log("value", value);
      // set due_date = start_date
      form.setFieldsValue({ due_date: moment(value) });
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
        if (value === "Quarterly")
          form.setFieldsValue({ due_date: moment(startDate).add(3, "M") });
        if (value === "Half Yearly")
          form.setFieldsValue({ due_date: moment(startDate).add(6, "M") });
        if (value === "Yearly")
          form.setFieldsValue({ due_date: moment(startDate).add(1, "y") });
        setActivityRepeat(value);
        setActivityTillDate(true);
      }
    };

    // const getDepartment = (deptName) =>{
    //     if(departments){
    //         let department = departments?.find(dept => dept.name === deptName);
    //         // dropDownDataSet(FUNCTION_TYPES_DROPDOWNLIST + '?department_id=' + department.id, 'functionTypeList');
    //         // console.log("data>>>>>>>", department.id);
    //         // setdepartmentSelect(department.id);
    //         return department.id;
    //     }
    // }

    useEffect(() => {
      if (!activityDetails) {
        form.setFieldsValue({
          title: undefined,
          estimated_time: undefined,
          due_date: undefined,
        });
      }
    }, []);

    useEffect(() => {
      if (dropdownData?.activity_types?.length) {
        let find = dropdownData.activity_types.find((act) => act.default === 1);

        if (find) setDefaultActivityType(find.id);
        else setDefaultActivityType(dropdownData.activity_types[1].id);
      }

      if (dropdownData?.milestones?.length) {
        let milestone = dropdownData.milestones.sort(function (a, b) {
          return a.serial - b.serial;
        });

        let filter = milestone.filter((mil) => mil.status === "WIP");

        if (filter?.length) {
          setDefaultMilestone(filter[filter.length - 1].id);
        } else {
          setDefaultMilestone(milestone[0].id);
        }
      }
    }, [dropdownData]);

    useEffect(() => {
      if (dropdownData?.projectList?.length) {
        for (let i = 0; i < dropdownData.projectList?.length; i++) {
          if (
            dropdownData.projectList[i].name === "General Activity" &&
            flag !== "project-list"
          ) {
            setProjectID(dropdownData.projectList[i].id);
            if (!nonBusiness)
              methods.projectChangeHandle(dropdownData.projectList[i].id);
          }
        }
      }
    }, [dropdownData?.projectList, flag]);

    useEffect(() => {
      if (activityDetails?.projects?.id && !nonBusiness)
        methods.projectChangeHandle(activityDetails?.projects?.id);
    }, [activityDetails?.projects?.id]);

    useEffect(() => {
      setIsAttachmentRequired(activityDetails?.attachment_type || null);
    }, [activityDetails?.attachment_type]);

    useEffect(() => {
      if (activityDetails?.projects && !nonBusiness)
        methods.projectChangeHandle(activityDetails?.projects?.id);
    }, [activityDetails]);

    useEffect(() => {
      if (activityDetails?.function_type) {
        methods.functionType(activityDetails?.function_type?.id);
      }
    }, [activityDetails?.function_type]);

    useEffect(() => {
      if (dropdownData?.activity_types?.length && !projectId && nonBusiness) {
        let findGeneral = dropdownData.activity_types.find(
          (act) => act.name === "General",
        );
        let findDefault = dropdownData.activity_types.find(
          (act) => act.default === 1,
        );

        if (findGeneral && projectID === 16)
          setDefaultActivityType(findGeneral?.id);
        else setDefaultActivityType(findDefault?.id);
      }
    }, [dropdownData?.activity_types]);

    useEffect(() => {
      if (isUpdateState) {
        form.setFieldsValue({
          activity_type_id: activityDetails?.activity_type?.id
            ? activityDetails?.activity_type?.id
            : activityDetails?.activity_type_formatted?.id
            ? activityDetails?.activity_type_formatted?.id
            : defaultActivityType
            ? defaultActivityType
            : undefined,
        });
      }
      // else{
      //     form.setFieldsValue({activity_type_id : 2 })
      // }
    }, [dropdownData?.activity_types, activityDetails]);

    useEffect(() => {
      if (modal === false) {
        setDropdownData();
        form.resetFields();
      }
    }, [modal]);

    useEffect(()=>{
      if(scheduleStartTime !== null && scheduleEndTime !==null) {
        const timeFormat = "hh:mm";

        // Parse the selected times using the format
        const parsedStartTime = moment(scheduleStartTime, timeFormat);
        const parsedEndTime = moment(scheduleEndTime, timeFormat);

        if(parsedStartTime <= parsedEndTime) {
          const diff = parsedEndTime.diff(parsedStartTime, 'minutes');
          form.setFieldsValue({estimated_time: diff});  
          // console.log('timeDifferenceInMinutes' ,diff);
        } else {
         // console.log({scheduleStartTime,scheduleEndTime});
          if(scheduleStartTime !=='' && scheduleEndTime !=='') {
            alertPop('error', 'Invalid time format');
          }
        }
      }
    },[scheduleStartTime, scheduleEndTime])

    useEffect(() => {
      setIsChecked(activityDetails?.schedule_work);
    }, [activityDetails]);

    return (
      <Form onSubmit={localSubmit}>
        {nonBusiness ? (
          <>
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label={"DEPARTMENT NAME"}>
                  {form.getFieldDecorator("department_id", {
                    rules: [{ required: true, message: "Required!" }],
                    initialValue: activityDetails?.department_id
                      ? activityDetails?.department_id
                      : userInfo
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
                        departmentChangeHandel(value);
                        setUnsetAssignee(true);
                      }}
                    >
                      {departments && departments.length
                        ? departments.map((dep) => {
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
              <Col span={8}>
                <Form.Item label={"FUNCTION TYPE"}>
                  {form.getFieldDecorator("function_type_id", {
                    rules: [{ required: true, message: "Required!" }],
                    initialValue: activityDetails?.function_type
                      ? activityDetails?.function_type?.id
                      : undefined,
                  })(
                    <Select
                      getPopupContainer={(trigger) => trigger.parentNode}
                      placeholder="Select Function Type"
                      size="large"
                      onChange={(value) => {
                        methods.functionType(value);
                        form.resetFields("function_id");
                      }}
                      showSearch
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {dropdownData?.functionTypeList?.map((item, index) => (
                        <Select.Option
                          key={`item-${index}-${item.id}`}
                          value={item.id}
                        >
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col span={8} style={{ float: "right" }}>
                <Form.Item label={"FUNCTION NAME"}>
                  {form.getFieldDecorator("function_id", {
                    rules: [{ required: true, message: "Required!" }],
                    initialValue: activityDetails?.function_activity
                      ? activityDetails?.function_activity?.id
                      : undefined,
                  })(
                    <Select
                      getPopupContainer={(trigger) => trigger.parentNode}
                      size="large"
                      placeholder="Select function name"
                      showSearch
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {dropdownData?.activityFunctionList?.map(
                        (activityFunction, index) => (
                          <Select.Option
                            key={`activityFunction-${index}-${activityFunction.id}`}
                            value={activityFunction.id}
                          >
                            {activityFunction.name}
                          </Select.Option>
                        ),
                      )}
                    </Select>,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <hr className="line-top-border" />
          </>
        ) : null}
        {!nonBusiness ? (
          <>
            <Row gutter={16}>
              <Col span={16}>
                <Form.Item label={"SELECT PROJECT"}>
                  {form.getFieldDecorator("project_id", {
                    rules: [{ required: true, message: "Required!" }],
                    // initialValue: dropdownData?.projectList && activityDetails?.project_details?.id ? activityDetails.project_details.id : projectId ? projectId : projectID
                    initialValue: activityDetails?.projects
                      ? activityDetails?.projects?.id
                      : projectId
                      ? projectId
                      : projectID,
                  })(
                    <Select
                      getPopupContainer={(trigger) => trigger.parentNode}
                      placeholder="Select Project"
                      size="large"
                      onChange={methods.projectChangeHandle}
                      showSearch
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {dropdownData?.projectList?.map((project, index) => (
                        <Select.Option
                          key={`project-${index}-${project.id}`}
                          value={project.id}
                        >
                          {project.name}
                        </Select.Option>
                      ))}
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col span={8} style={{ float: "right" }}>
                <Form.Item label={"Select Milestone"}>
                  {form.getFieldDecorator("project_milestone_id", {
                    rules: [{ required: true, message: "Required!" }],
                    // initialValue: activityDetails?.milestone?.id ? activityDetails?.milestone?.id : defaultMilestone ? defaultMilestone : undefined
                    initialValue: activityDetails?.project_milestone_id
                      ? activityDetails?.project_milestone_id
                      : defaultMilestone
                      ? defaultMilestone
                      : undefined,
                  })(
                    <Select
                      getPopupContainer={(trigger) => trigger.parentNode}
                      size="large"
                      placeholder="Select Milestone"
                      showSearch
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {dropdownData?.milestones?.map((milestone, index) => (
                        <Select.Option
                          key={`milestone-${index}-${milestone.id}`}
                          value={milestone.id}
                        >
                          {milestone.full_name}
                        </Select.Option>
                      ))}
                    </Select>,
                  )}
                </Form.Item>
              </Col>
            </Row>
            <hr className="line-top-border" />
          </>
        ) : null}
        <Row gutter={16}>
          <Col span={17}>
            <Form.Item label={"TASK/ACTIVITY TITLE"}>
              {form.getFieldDecorator("title", {
                rules: [{ required: true, message: "Required!" }],
                initialValue: activityDetails?.title,
              })(<Input size="large" placeholder="Enter Title" />)}
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label={"PRIORITY"}>
              {form.getFieldDecorator("activity_priority_id", {
                rules: [{ required: true, message: "Required!" }],
                initialValue: activityDetails?.activity_priority?.id
                  ? activityDetails?.activity_priority?.id
                  : activityDetails?.activity_Priority_formatted?.id
                  ? activityDetails?.activity_Priority_formatted?.id
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
                  {dropdownData?.priority?.map((pr, index) => (
                    <Select.Option key={`pr-${index}-${pr.id}`} value={pr.id}>
                      {pr.name}
                    </Select.Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label={"PARENT TASK/ACTIVITY"}>
              {form.getFieldDecorator("parent_activity_id", {
                rules: [],
                initialValue: activityDetails?.parent_activity?.id
                  ? activityDetails?.parent_activity?.id
                  : undefined,
              })(
                <Select
                  getPopupContainer={(trigger) => trigger.parentNode}
                  size="large"
                  placeholder="Select Parent task"
                  showSearch
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={(value) => setParentTask(value)}
                >
                  {parentTask || activityDetails?.parent_activity?.id ? (
                    <Select.Option
                      key="99"
                      value={undefined}
                      style={{ color: "red" }}
                    >
                      Remove Parent task
                    </Select.Option>
                  ) : (
                    ""
                  )}

                  {dropdownData?.parent_activity?.map((parent_act, index) => (
                    <Select.Option
                      key={`parent_act-${index}-${parent_act.id}`}
                      value={parent_act.id}
                    >
                      {parent_act.title}
                    </Select.Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
          </Col>
          {/* {console.log("activityDetails",activityDetails)} */}
          {/* activityDetails?.assigned_user?.emp_id ? activityDetails?.assigned_user?.emp_id */}
          <Col span={8}>
            <Form.Item label={"ASSIGNEE"}>
              {form.getFieldDecorator("assignee", {
                rules: [{ required: true, message: "Required!" }],
                initialValue: unsetAssignee
                  ? undefined
                  : activityDetails?.assigned_user?.emp_id
                  ? activityDetails?.assigned_user?.emp_id
                  : activityDetails?.assignee?.emp_id
                  ? activityDetails?.assignee?.emp_id
                  : userInfo?.emp_id
                  ? userInfo?.emp_id
                  : undefined,
              })(
                <Select
                  showSearch
                  getPopupContainer={(trigger) => trigger.parentNode}
                  size="large"
                  placeholder="Select Assignee"
                  onChange={methods.selectAssigneeHandle}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {employeeList?.map((employee, index) => (
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
          <Col span={8}>
            <Form.Item label={"REPORTER"}>
              {form.getFieldDecorator("reporter", {
                rules: [{ required: true, message: "Required!" }],
                initialValue: dropdownData?.reporter?.name
                  ? dropdownData?.reporter?.name
                  : activityDetails?.reporter_user?.name
                  ? activityDetails?.reporter_user?.name
                  : activityDetails?.reporter?.name
                  ? activityDetails?.reporter?.name
                  : undefined,
                // initialValue: activityDetails?.reporter_user?.name || undefined
              })(
                <Input
                  size="large"
                  placeholder="Enter reporter name"
                  readOnly={true}
                />,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label={"ACTIVITY REPEAT"} name="activity_repeat">
              {form.getFieldDecorator("repeats", {
                // rules: [{required: true, message: "Required!"}],
                initialValue: activityDetails?.repeats
                  ? activityDetails?.repeats
                  : undefined,
              })(
                <Select
                  showSearch
                  getPopupContainer={(trigger) => trigger.parentNode}
                  allowClear={true}
                  size="large"
                  //disabled={isChecked}
                  placeholder="Select Activity Repeat Time"
                  onChange={handleDate}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
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
                  <Select.Option key="Quarterly" value="Quarterly">
                    Quarterly
                  </Select.Option>
                  <Select.Option key="Half Yearly" value="Half Yearly">
                    Half Yearly
                  </Select.Option>
                  <Select.Option key="Yearly" value="Yearly">
                    Yearly
                  </Select.Option>
                </Select>,
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={"Repeats Till Date"}>
              {form.getFieldDecorator("repeats_till_date", {
                rules: [
                  {
                    required: activityRepeat ? true : false,
                    message: "Required!",
                  },
                ],
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
                />,
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={"ACTIVITY TYPE"}>
              {form.getFieldDecorator("activity_type_id", {
                rules: [{ required: true, message: "Required!" }],
                initialValue: nonBusiness
                  ? undefined
                  : activityDetails?.activity_type?.id
                  ? activityDetails?.activity_type?.id
                  : activityDetails?.activity_type_formatted?.id
                  ? activityDetails?.activity_type_formatted?.id
                  : defaultActivityType
                  ? defaultActivityType
                  : undefined,
              })(
                <Select
                  getPopupContainer={(trigger) => trigger.parentNode}
                  size="large"
                  placeholder="Select Type"
                  onChange={handleCommunication}
                  showSearch
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {nonBusiness
                    ? dropdownData?.activity_types
                        ?.filter((act) => act.name !== "Project")
                        .map((activity_type, index) => (
                          <Select.Option
                            key={`activity_type-${index}-${activity_type.id}`}
                            value={activity_type.id}
                          >
                            {activity_type.name}
                          </Select.Option>
                        ))
                    : dropdownData?.activity_types?.map(
                        (activity_type, index) => (
                          <Select.Option
                            key={`activity_type-${index}-${activity_type.id}`}
                            value={activity_type.id}
                          >
                            {activity_type.name}
                          </Select.Option>
                        ),
                      )}
                </Select>,
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
          <Col span={6}>
            <Form.Item label={"ESTIMATED TIME (MINUTES)"}>
              {form.getFieldDecorator("estimated_time", {
                rules: [{ required: true, message: "Required!" }],
                initialValue: activityDetails?.estimated_time,
              })(
                <InputNumber
                  size="large"
                  placeholder="Enter estimated time"
                  style={{ width: "100%" }}
                  readOnly={scheduleStartTime  && scheduleEndTime ? true :false}
                />,
              )}
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label={"START DATE"}>
              {form.getFieldDecorator("start_date", {
                rules: [{ required: true, message: "Required!" }],
                initialValue: activityDetails?.start_date
                  ? moment(new Date(activityDetails?.start_date))
                  : "",
              })(
                <DatePicker
                  onChange={setDate}
                  size="large"
                  placeholder="Enter Start Date"
                />,
              )}
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label={"End DATE"}>
              {form.getFieldDecorator("due_date", {
                rules: [{ required: true, message: "Required!" }],
                // initialValue: activityDetails?.start_date ? moment(new Date(activityDetails?.start_date)) : moment()
                initialValue: activityDetails?.due_date
                  ? moment(new Date(activityDetails?.due_date))
                  : "",
              })(
                <DatePicker
                  // disabled={
                  //   isChecked
                  //   // activityRepeat ? true : false
                  // }
                  size="large"
                  placeholder="Enter End Date"
                />,
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

        {isCommunication ? (
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label={"COMMUNICATION MEDIUM"}>
                {form.getFieldDecorator("communication_medium", {
                  rules: [{ required: true, message: "Required!" }],
                  initialValue: activityDetails?.communication_medium
                    ? activityDetails?.communication_medium
                    : undefined,
                })(
                  <Select
                    getPopupContainer={(trigger) => trigger.parentNode}
                    size="large"
                    placeholder="Select Communication"
                    showSearch
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {communication_mediums?.map(
                      (communication_medium, index) => (
                        <Select.Option
                          key={`communication_medium-${index}-${communication_medium.value}`}
                          value={communication_medium.value}
                        >
                          {communication_medium.label}
                        </Select.Option>
                      ),
                    )}
                  </Select>,
                )}
                {/*<Helper>(Dev Note - Communication Medium 3 value pre defined- "Visit, Call, Email")</Helper>*/}
              </Form.Item>
            </Col>
            {nonBusiness ? (
              <Col span={8}>
                <Form.Item label={"CLIENT NAME"}>
                  {form.getFieldDecorator("client_id", {
                    rules: [{ required: true, message: "Required!" }],
                    initialValue: activityDetails?.contact_person_details
                      ?.client_id
                      ? activityDetails?.contact_person_details?.client_id
                      : activityDetails?.contact_person
                      ? activityDetails?.contact_person?.client_id
                      : undefined,
                  })(
                    <Select
                      getPopupContainer={(trigger) => trigger.parentNode}
                      size="large"
                      placeholder="Select Client"
                      showSearch
                      onChange={(id) => {
                        clientManage(id);
                        form.resetFields("client_department_id");
                      }}
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {clientList?.map((client, index) => (
                        <Select.Option
                          key={`client-${index}-${client.id}`}
                          value={client.id}
                        >
                          {client.name}
                        </Select.Option>
                      ))}
                    </Select>,
                  )}
                  {/* <Helper>(Dev Note - Communication Medium 3 value pre defined- "Visit, Call, Email")</Helper> */}
                </Form.Item>
              </Col>
            ) : null}
            <Col span={8}>
              <Form.Item label={"COMMUNICATION PERSON"}>
                {form.getFieldDecorator("client_department_id", {
                  rules: [{ required: true, message: "Required!" }],
                  initialValue: nonBusiness
                    ? activityDetails?.contact_person?.id
                    : activityDetails?.client_department_id
                    ? activityDetails?.client_department_id
                    : undefined,
                })(
                  <Select
                    getPopupContainer={(trigger) => trigger.parentNode}
                    size="large"
                    placeholder="Client Contact List"
                    showSearch
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {nonBusiness
                      ? pOCList?.map((person, index) => (
                          <Select.Option
                            key={`person-${index}-${person.id}`}
                            value={person.id}
                          >
                            {person.contact_name}
                          </Select.Option>
                        ))
                      : dropdownData?.contact_person?.map((person, index) => (
                          <Select.Option
                            key={`person-${index}-${person.id}`}
                            value={person.id}
                          >
                            {person.contact_name}
                          </Select.Option>
                        ))}
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>
        ) : null}
        <Row gutter={16}>
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
        {/* {<Row gutter={16}>
                    <Col span={8} style={{marginTop: '30px'}}>
                        <Form.Item label={''}>
                            {form.getFieldDecorator('is_attachment_require?', {})(<Checkbox
                                defaultChecked={activityDetails?.attachment_type?.id || false}
                                onChange={(e) => setIsAttachmentRequired(e.target.checked)}>IS ATTACHMENT REQUIRE?</Checkbox>)}
                        </Form.Item>
                    </Col>
                    {isAttachmentRequired && <Col span={16}>
                    <Form.Item label={'ATTACHMENT TYPE'}>
                            {form.getFieldDecorator('attachment_type_id', {
                                rules: [{required: true, message: "Required!"}],
                                initialValue: activityDetails?.attachment_type?.id ? activityDetails?.attachment_type?.id : activityDetails?.attachment_type_formatted?.id ? activityDetails?.attachment_type_formatted?.id : undefined
                            })(<Select size="large" placeholder='Select Type' showSearch
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {dropdownData?.attachment_types?.map((at, index) =>
                                    <Select.Option key={`at-${index}-${at.id}`}
                                                   value={at.id}>{at.name}</Select.Option>
                                )}
                            </Select>)}
                        </Form.Item>
                    </Col>}
                </Row>} */}
        {/* <Flex space="1rem" justify="space-between"> */}
        <Row gutter={16} style={{ display: "flex", alignItems: "center" }}>
          <Col span={12}>
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
              {/* <FileUploader
                elementId={"MILESTONE_BULK_UPLOAD"}
                onChangeFilePathEmitter={fileUploadHandler}
              /> */}
              {/* <UploadButton onUploadEvent={fileUploadHandler} /> */}
            </div>
          </Col>
          <Col span={5}></Col>
          <Col span={4}>
            {!isUpdateState && (
              <Form.Item label={""} style={{ marginTop: "3.5rem" }}>
                {form.getFieldDecorator(
                  "is_create_another",
                  {},
                )(
                  <Checkbox
                    checked={isCreateAnother}
                    onChange={(e) => setIsCreateAnother(e.target.checked)}
                  >
                    Create Another
                  </Checkbox>,
                )}
              </Form.Item>
            )}
          </Col>
          <Col span={3}>
            <Button
              style={{ width: "auto", marginTop: "2rem" }}
              loading={loading}
              block
              type="primary"
              htmlType="submit"
            >
              {isUpdateState ? "Update" : "Create New"}
            </Button>
          </Col>
        </Row>
        {/* </Flex> */}
        {/* <Flex space="1rem" justify="flex-end">
                    {!isUpdateState && <Form.Item label={''} style={{marginTop: "-3px"}}>
                        {form.getFieldDecorator('is_create_another', {})(<Checkbox>Create Another?</Checkbox>,)}
                    </Form.Item>}
                    <Button
                        style={{width: 'auto'}}
                        loading={loading}
                        block
                        type="primary"
                        htmlType="submit"
                    >
                        {isUpdateState ? 'Update' : 'Create New'}
                    </Button>
                </Flex> */}
      </Form>
    );
  },
);
