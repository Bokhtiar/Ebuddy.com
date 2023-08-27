import React, { useEffect, useState } from "react";
import { TableWrapper, Wrapper } from "../commons/Wrapper";
import {
  Select,
  Table,
  Button,
  Icon,
  Modal,
  DatePicker,
  InputNumber,
  Upload, 
  message,
} from "antd";
// import { UploadOutlined } from '@ant-design/icons';
import { Flex } from "../commons/Flex";
import uuid from "uuid/v4";
import {getPermissions} from "../../scripts/helper";

import {
  ALL_PROJECT_ROADMAP_LIST,
  PROJECT_MILESTONE_LIST,
  PROJECT_MILESTONE_UPDATE,
  PROJECT_MILESTONE_DELETE,
  PROJECT_MILESTONE_DUPLICATE,
  PROJECT_MILESTONE_ATTACHMENT_UPLOAD,
  PROJECT_MILESTONE,
  PROJECT_MILESTOEN_ADD,
  PROJECT_MILESTONE_DATE_UPDATE
} from "../../scripts/api";
import { getData, postData } from "../../scripts/api-service";
import sales_task from "../../assets/icons/test/sales_task_icon.svg";
import moment from "moment";
import CalenderRM from "./CalenderRM";
import { alertPop } from "../../scripts/message";

const { Option } = Select;

const projectObject = {
  actual_end_date: "",
  actual_start_date: "",
  attachment_required: '',
  id: uuid(),
  milestone_name: "",
  milestone_status_id: '',
  payment: '',
  payment_status_id: '',
  plan_end_date: "",
  plan_start_date: "",
  project_id: null,
  serial: null,
  demo: true,
}

const ProjectRoadmapSertup = (props) => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let paramsProjectId = params.get('projectId');
  let projectId = paramsProjectId ? paramsProjectId * 1 : undefined;

  const [milestoneList, setMilestoenList] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState();
  const [milestoneStatus, setMileStoneStatus] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState([]);
  const [projectMilestone, setProjectMilestone] = useState([]);
  const [selectMileStone, setSelectMilestone] = useState();
  const [dueDateModal, setDuedateModal] = useState();
  const [miletoneStatusModal, setMiletoneStatusModal] = useState();
  const [paymentModal, setPaymentModal] = useState();
  const [paymentStatusModal, setPaymentStatusModal] = useState();
  const [loading, setLoading] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState();
  const [startPlanDateModal, setStartPlanDateModal] = useState();
  const [endPlanDateModal, setEndPlanDateModal] = useState();
  const [startActualDateModal, setStartActualDateModal] = useState();
  const [endActualDateModal, setEndActualDateModal] = useState();
  const [milestoneDeleteModal, setMilestoneDeleteModal] = useState();
  const [milestoneDuplicateModal, setMilestoneDuplicateModal] = useState();
  const [milestoneRoadmapStatus, setMilestoneRoadmapStatus] = useState();
  const [fileUpload, setFileUpload] = useState();
  const [canDeleteMilestone, setCanDeleteMilestone] = useState(false);
  const [paymentMethodModal, setPaymentMethodModal] = useState();
  const [paymentMethods, setPaymentMethods] = useState();

  useEffect(() => {
    getProjects();
    getMilestoenList();

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let paramsProjectId = params.get('projectId');
    let projectId = paramsProjectId ? paramsProjectId * 1 : undefined;

    if (projectId) {
      setSelectedProject(projectId);
      getProjectMilestone(projectId);
    }
    checkPemissions()
  }, []);

  const checkPemissions = async () => {
    let permissions = await getPermissions();

    if (permissions && permissions.length) {
        const permNames = permissions.map((item) => item.name);

        if (permNames.includes('Can delete project milestone')) {
            setCanDeleteMilestone(true);
        }
    }
  }

  const getMilestoenList = async () => {
    let res = await getData(PROJECT_MILESTONE);

    if (res) {
      let masterData = res.data.data;
      setMilestoenList(masterData);
    }
  }

  const getProjects = async () => {
    let res = await getData(ALL_PROJECT_ROADMAP_LIST);

    if (res) {
      let masterData = res.data.data;
      setProjects(masterData);
    }
  };

  const selectProject = (value) => {
    setSelectedProject(value);
    getProjectMilestone(value);
  };

  const getProjectMilestone = async (projectId) => {
    if (projectId) {
      let res = await getData(
        PROJECT_MILESTONE_LIST + projectId  //+ "?page=" + currentPage
      );

      if (res) {
        let masterData = res.data.data;

        setMileStoneStatus(masterData.milestoneStatus);
        setPaymentStatus(masterData.paymentStatus);
        setProjectMilestone(masterData?.project_milestone);
        setPageCount(masterData?.project_milestone?.last_page);
        setMilestoneRoadmapStatus(masterData?.project?.project_type);
        setPaymentMethods(masterData?.paymentMethods);
      }
    }
  };

  useEffect(() => {
    setMileStoneStatus([]);
    setPaymentStatus([]);
    setProjectMilestone([]);

    getProjectMilestone(selectedProject);
  }, [currentPage]);

  const showMilestoneStatus = (status) => {
    if (status && milestoneStatus && milestoneStatus.length) {
      let data = milestoneStatus.find((e) => e.id === status);
      return data && data.name ? data.name : "Status";
    } else return "Status";
  };

  const showPaymentStatus = (status) => {
    if (status && paymentStatus && paymentStatus.length) {
      let data = paymentStatus.find((e) => e.id === status);
      return data && data.name ? data.name : "Status";
    } else return "Status";
  };

  const showPaymentMethods = (status) => {
    if (status && paymentMethods && paymentMethods.length) {
      let data = paymentMethods.find((e) => e.id == status);
      return data && data.title ? data.title : "Method";
    } else return "Method";
  }

  let columns = [
    {
      title: "MILESTONE LIST",
      // dataIndex: "milestone_name",
      key: "milestone_name",
      render: (row) => {
        return <span>{
          row.demo ? <Select
                      // style={{ width: "100%" }}
                      showSearch
                      placeholder="Select Milestone"
                      onChange={(val) => addMilestone(val, row)}
                      dropdownMatchSelectWidth={false}
                      filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {milestoneList && milestoneList.length
                        ? milestoneList.map((data) => {
                            return (
                              <Select.Option key={data.id} value={data.id}>
                                {data.full_name}
                              </Select.Option>
                            );
                          })
                        : ""}
                    </Select> : row.milestone_name
          }</span>
      }
    },
    {
      title: "PLAN START DATE",
      key: "plan_start_date",
      render: (row) => 
      {
        return (
          <span>
            {row.plan_start_date ? row.plan_start_date : ""}
            <Button
              type="link"
              icon="calendar"
              disabled={row.demo}
              onClick={() => {
                setSelectMilestone(row);
                setStartPlanDateModal(true);
              }}
            />
          </span>
        );
      },
    },
    {
      title: "PLAN END DATE",
      // dataIndex: "due_date",
      key: "plan_end_date",
      render: (row) => 
      {
        return (
          <span>
            {row.plan_end_date ? row.plan_end_date : ""}
            <Button
              type="link"
              icon="calendar"
              disabled={row.demo}
              onClick={() => {
                setSelectMilestone(row);
                setEndPlanDateModal(true);
              }}
            />
          </span>
        );
      },
    },
    // {
    //   title: "ACTUAL START DATE",
    //   // dataIndex: "due_date",
    //   key: "actual_start_date",
    //   render: (row) => {
    //     return (
    //       <span>
    //         {row.actual_start_date ? row.actual_start_date : "Enter Date"}
    //         <Button
    //           type="link"
    //           icon="edit"
    //           disabled={row.demo}
    //           onClick={() => {
    //             setSelectMilestone(row);
    //             setStartActualDateModal(true);
    //           }}
    //         />
    //       </span>
    //     );
    //   },
    // },
    // {
    //   title: "ACTUAL END DATE",
    //   // dataIndex: "due_date",
    //   key: "actual_end_date",
    //   render: (row) => {
    //     return (
    //       <span>
    //         {row.actual_end_date ? row.actual_end_date : "Enter Date"}
    //         <Button
    //           type="link"
    //           icon="edit"
    //           disabled={row.demo}
    //           onClick={() => {
    //             setSelectMilestone(row);
    //             setEndActualDateModal(true);
    //           }}
    //         />
    //       </span>
    //     );
    //   },
    // },
    // {
    //   title: "MILESTONE STATUS",
    //   // dataIndex: "status",
    //   key: "status",
    //   render: (row) => {
    //     return (
    //       <span>
    //         {showMilestoneStatus(row.milestone_status_id)}
    //         <Button
    //           type="link"
    //           icon="edit"
    //           disabled={row.demo}
    //           onClick={() => {
    //             setSelectMilestone(row);
    //             setMiletoneStatusModal(true);
    //           }}
    //         />
    //       </span>
    //     );
    //   },
    // },
    // {
    //   title: "PAYMENT",
    //   // dataIndex: "project_name",
    //   key: "PAYMENT",
    //   render: (row) => {
    //     return (
    //       <span>
    //         {row.payment ? row.payment : "Amount"}
    //         <Button
    //           type="link"
    //           icon="edit"
    //           disabled={row.demo}
    //           onClick={() => {
    //             setSelectMilestone(row);
    //             setPaymentModal(true);
    //           }}
    //         />
    //       </span>
    //     );
    //   },
    // },
    // {
    //   title: "PAYMENT STATUS",
    //   key: "payment_status_id",
    //   render: (row) => {
    //     return (
    //       <span>
    //         {showPaymentStatus(row.payment_status_id)}
    //         <Button
    //           type="link"
    //           icon="edit"
    //           disabled={row.demo}
    //           onClick={() => {
    //             setSelectMilestone(row);
    //             setPaymentStatusModal(true);
    //           }}
    //         />
    //       </span>
    //     );
    //   },
    // },
    // {
    //   title: "PAYMENT METHOD",
    //   key: "payment_method_id",
    //   render: (row) => {
    //     return (
    //       <span>
    //         {showPaymentMethods(row.payment_method_id)}
    //         <Button
    //           type="link"
    //           icon="edit"
    //           disabled={row.demo}
    //           onClick={() => {
    //             setSelectMilestone(row);
    //             setPaymentMethodModal(true);
    //           }}
    //         />
    //       </span>
    //     );
    //   },
    // },
    {
        title: "Action",
        key: "action",
        render: (row) => <> 
          <Button className="mr-3" disabled={isAddMilestoneDisable(row)} type="button" onClick={() => AddNewMilestoen(row)}><Icon type="plus" /></Button>
          {
            row.demo ? <Button type="button" onClick={() => removeDemoMilestone(row)} style={{color: 'red'}}><Icon type="delete" /></Button> : ''
          }
          {/* <Button className="mr-3" type="button" onClick={() => {setSelectMilestone(row); setMilestoneDuplicateModal(true)}} ><Icon type="plus" /></Button> */}
          {
            !row.demo && canDeleteMilestone ? <Button type="button" disabled={isAddMilestoneDisable(row)} onClick={() => {setSelectMilestone(row); setMilestoneDeleteModal(true);}} ><Icon type="delete" /></Button> : ''
          }
          
        </>,
    },
  ];

  const addMilestone = async (value, item) => {
    if (item.demo) {
      let data = {
        project_id: item.project_id,
        serial: item.serial,
        milestone_id: value
      };

      let res = await postData(PROJECT_MILESTOEN_ADD, data);

      if (res) {
        alertPop('success', "Milestone added successfully!");
        getProjectMilestone(selectedProject);
      } else {
        alertPop('error', "Something went wrong!")
      }
    } else {
      alertPop('error', "Something went wrong!")
    }
  }

  const isAddMilestoneDisable = (item) => {
    if (item.demo) return true;
    else {
      let index = projectMilestone.findIndex(pro => pro.demo === true);

      if (index !== -1) return true;
      else return false;
    }
  }

  const removeDemoMilestone = (item) => {
    let miles = projectMilestone.filter(m => m.id !== item.id);
    setProjectMilestone([...miles]);
  }

  const AddNewMilestoen = (item) => {
      let index = projectMilestone.findIndex(pro => pro.id === item.id);
      if (index !== -1) {
        let projects = projectMilestone,
            project = projectObject;

        project.serial = item.serial + 1;
        project.project_id = item.project_id;

        projects.splice(index + 1, 0, projectObject);

        setProjectMilestone([...projects]);
      }
  }

  const milstoneDuplicate = async () => {
    let res = await getData(PROJECT_MILESTONE_DUPLICATE + selectMileStone.id);

    if (res) {
      setSelectMilestone(null);
      getProjectMilestone(selectedProject);
      setMilestoneDuplicateModal(false);
      alertPop('success', "milestone duplicate successfully")
    }
  }
  
  const fileUploadHandler = async (event) =>{
    let value = event.target.files[0];
    document.getElementById('attachemnt-name').innerHTML=value.name;
    setFileUpload(value)
  }

  const updateDate = async (type, value, milestoneId, projectId) => {
    setLoading(true);
    if (milestoneId) {
      let updateData = {};

      if (type === "plan_start_date") updateData = {plan_start_date: moment(value).format("YYYY-MM-DD")};
      if (type === "plan_end_date") updateData = {plan_end_date: moment(value).format("YYYY-MM-DD")};

      let res = await postData(
        PROJECT_MILESTONE_UPDATE + milestoneId,
        updateData
      );
      
      if (res) {
        let masterData = res.data.data;
        if (masterData) {
          setLoading(false);
          getProjectMilestone(projectId);
          setSelectMilestone(null);
          setDuedateModal(false);
          setMiletoneStatusModal(false);
          setPaymentModal(false);
          setPaymentStatusModal(false);

          setStartPlanDateModal(false);
          setEndPlanDateModal(false);
          setStartActualDateModal(false);
          setEndActualDateModal(false);
          setPaymentMethodModal(false);
          alertPop('success', "Date updated successfully")
        }
      }
    }
  };

  const updateMilestone = async (type, context) => {
    setLoading(true);
    if (selectMileStone && selectMileStone.id) {
      let updateData = {};

      if (type === "due-date")
        updateData = { due_date: selectMileStone.due_date };
      if (type === "milestone-status"){
        if(fileUpload){
          const formData = new FormData();
          formData.append("file", fileUpload);

          let response = await postData(
            PROJECT_MILESTONE_ATTACHMENT_UPLOAD + selectMileStone.id,
            formData
          );
          
          if (response) {
            let masterData = response.data.data;
            if (masterData) {
              setLoading(false);
              getProjectMilestone(selectedProject);
              setSelectMilestone(null);
              setMiletoneStatusModal(false);
              setFileUpload(null);
            }
            document.getElementById('attachemnt-name').innerHTML=null;
          }
        }
        updateData = { milestone_status_id: selectMileStone.milestone_status_id };
      }
      if (type === "payment") updateData = { payment: selectMileStone.payment };
      if (type === "payment-status")
        updateData = { payment_status_id: selectMileStone.payment_status_id };
      if (type === "payment-status")
        updateData = { payment_status_id: selectMileStone.payment_status_id };
      if (type === "plan_start_date") updateData = {plan_start_date: context === 'remove' ? "" : selectMileStone.plan_start_date};
      if (type === "plan_end_date") updateData = {plan_end_date: context === 'remove' ? "" : selectMileStone.plan_end_date};
      if (type === "actual_start_date") updateData = {actual_start_date: context === 'remove' ? "" : selectMileStone.actual_start_date};
      if (type === "actual_end_date") updateData = {actual_end_date: context === 'remove' ? "" : selectMileStone.actual_end_date};
      if (type === "payment-method") updateData= {payment_method_id: selectMileStone.payment_method_id};

      let res = await postData(
        PROJECT_MILESTONE_UPDATE + selectMileStone.id,
        updateData
      );
      
      if (res) {
        let masterData = res.data.data;
        if (masterData) {
          setLoading(false);
          getProjectMilestone(selectedProject);
          setSelectMilestone(null);
          setDuedateModal(false);
          setMiletoneStatusModal(false);
          setPaymentModal(false);
          setPaymentStatusModal(false);

          setStartPlanDateModal(false);
          setEndPlanDateModal(false);
          setStartActualDateModal(false);
          setEndActualDateModal(false);
          setPaymentMethodModal(false);
        }
      }
    }
  };

  const datePickerChange = (date) => {
    let dueDate = moment(date).format("YYYY-MM-DD");
    setLoading(false);
    
    setSelectMilestone((prevState) => ({
      ...prevState,
      due_date: dueDate,
    }));
  };

  const datePlanStartDatePicker = (date) => {
    let dueDate = moment(date).format("YYYY-MM-DD");
    setLoading(false);

    setSelectMilestone((prevState) => ({
      ...prevState,
      plan_start_date: dueDate,
    }));
  }

  const datePlanEndDatePicker = (date) => {
    let dueDate = moment(date).format("YYYY-MM-DD");
    setLoading(false);

    setSelectMilestone((prevState) => ({
      ...prevState,
      plan_end_date: dueDate,
    }));
  }

  const dateActualStartDatePicker = (date) => {
    let dueDate = moment(date).format("YYYY-MM-DD");
    setLoading(false);

    setSelectMilestone((prevState) => ({
      ...prevState,
      actual_start_date: dueDate,
    }));
  }

  const dateActualEndDatePicker = (date) => {
    let dueDate = moment(date).format("YYYY-MM-DD");
    setLoading(false);

    setSelectMilestone((prevState) => ({
      ...prevState,
      actual_end_date: dueDate,
    }));
  }

  const changeMilestoneStatus = (value) => {
    setSelectMilestone((prevState) => ({
      ...prevState,
      milestone_status_id: value,
    }));
  };

  const changePaymentAmount = (value) => {
    setSelectMilestone((prevState) => ({
      ...prevState,
      payment: value,
    }));
  };

  const changePaymentStatus = (value) => {
    setSelectMilestone((prevState) => ({
      ...prevState,
      payment_status_id: value,
    }));
  };

  const changePaymentMethods = (value) => {
    setSelectMilestone((prevState) => ({
      ...prevState,
      payment_method_id: value,
    }));
  };

  const paginate = (page) => setCurrentPage(page);

  const deleteMilestone = async () => {
    let res = await getData(PROJECT_MILESTONE_DELETE + selectMileStone.id);

    if (res) {
      setSelectMilestone(null);
      getProjectMilestone(selectedProject);
      setMilestoneDeleteModal(false);
      
      alertPop('success', "milestone delete successfully");
    }
  }

  return (
    <>
      <Wrapper>
        <div className="content-title">
          <h2>Create Project Roadmap</h2>
        </div>

        <Flex space="1rem" justify="normal">
          <div className="w-100">
            <label>
              <span style={{ color: "#f5222d" }}>*</span> PROJECT NAME
            </label>
            <Select
              size="large"
              defaultValue={projectId}
              showSearch
              style={{ width: "100%", marginTop: "1rem" }}
              placeholder="Select Project"
              optionFilterProp="children"
              onChange={selectProject}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {projects && projects.length
                ? projects.map((data) => {
                    return (
                      <Option key={data.id} value={data.id}>
                        {data.name}
                      </Option>
                    );
                  })
                : ""}
            </Select>
          </div>
        </Flex>

        <Flex space="1rem">
          {selectedProject ? (
            <Table
              dataSource={projectMilestone}
              bordered
              columns={
                milestoneRoadmapStatus === 'Non-commercial'
                  ? 
                  (
                    columns.filter(col => col.key !== 'PAYMENT' && col.key !== 'payment_status_id')
                  ):columns
              }
              scroll={{ y: "calc(100vh - 0rem)" }}
              pagination={false}
            />
          ) : (
            <LandinContent />
          )}
        </Flex>

        {selectedProject && <CalenderRM milestones={projectMilestone} />}
      </Wrapper>

      {/* Start Due date modal  */}
      <Modal
        visible={dueDateModal}
        title="PLAN DUE DATE"
        onCancel={() => {setDuedateModal(false); setLoading(false)}}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => updateMilestone("due-date")}
          >
            {" "}
            Update{" "}
          </Button>,
        ]}
      >
        <DatePicker
          defaultValue={
            selectMileStone && selectMileStone.due_date
              ? moment(selectMileStone?.due_date, "YYYY-MM-DD")
              : ""
          }
          onChange={datePickerChange}
        />
      </Modal>
      {/* End due date modal  */}

      {/* Start plan date modal  */}
      <Modal
        visible={startPlanDateModal}
        title="PLAN START DATE"
        onCancel={() => {setStartPlanDateModal(false); setLoading(false)}}
        footer={[
          <Button
            key="submit"
            type="danger"
            loading={loading}
            onClick={() => updateMilestone("plan_start_date", 'remove')}
          >
            {" "}
            Remove{" "}
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => updateMilestone("plan_start_date")}
          >
            {" "}
            Update{" "}
          </Button>,
        ]}
      >
        <DatePicker
          allowClear={false}
          value={
            selectMileStone && selectMileStone.plan_start_date
              ? moment(selectMileStone?.plan_start_date, "YYYY-MM-DD")
              : ""
          }
          onChange={datePlanStartDatePicker}
        />
      </Modal>
      {/* End plan date modal  */}

      {/* Start end plan date modal  */}
      <Modal
        visible={endPlanDateModal}
        title="PLAN END DATE"
        onCancel={() => {setEndPlanDateModal(false); setLoading(false);}}
        footer={[
          <Button
            key="submit"
            type="danger"
            loading={loading}
            onClick={() => updateMilestone("plan_end_date", 'remove')}
          >
            {" "}
            Remove{" "}
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => updateMilestone("plan_end_date")}
          >
            {" "}
            Update{" "}
          </Button>,
        ]}
      >
        <DatePicker
          allowClear={false}
          disabledDate={(current) => {
            let customDate = moment(selectMileStone.plan_start_date).format("YYYY-MM-DD");
            return current && current < moment(customDate, "YYYY-MM-DD");
          }} 
          value={
            selectMileStone && selectMileStone?.plan_end_date
              ? moment(selectMileStone?.plan_end_date, "YYYY-MM-DD")
              : ""
          }
          onChange={datePlanEndDatePicker}
        />
      </Modal>
      {/* End end plan date modal  */}

      {/* Start actual date modal  */}
      <Modal
        visible={startActualDateModal}
        title="ACTUAL START DATE"
        onCancel={() => {setStartActualDateModal(false); setLoading(false)}}
        footer={[
          <Button
            key="submit"
            type="danger"
            loading={loading}
            onClick={() => updateMilestone("actual_start_date", 'remove')}
          >
            {" "}
            Remove{" "}
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => updateMilestone("actual_start_date")}
          >
            {" "}
            Update{" "}
          </Button>,
        ]}
      >
        <DatePicker
          allowClear={false}
          value={
            selectMileStone && selectMileStone.actual_start_date
              ? moment(selectMileStone?.actual_start_date, "YYYY-MM-DD")
              : ""
          }
          onChange={dateActualStartDatePicker}
        />
      </Modal>
      {/* End actual date modal  */}

      {/* Start end actual date modal  */}
      <Modal
        visible={endActualDateModal}
        title="ACTUAL END DATE"
        onCancel={() => {setEndActualDateModal(false); setLoading(false)}}
        footer={[
          <Button
            key="submit"
            type="danger"
            loading={loading}
            onClick={() => updateMilestone("actual_start_date", 'remove')}
          >
            {" "}
            Remove{" "}
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => updateMilestone("actual_end_date")}
          >
            {" "}
            Update{" "}
          </Button>,
        ]}
      >
        <DatePicker
          allowClear={false}
          value={
            selectMileStone && selectMileStone.actual_end_date
              ? moment(selectMileStone?.actual_end_date, "YYYY-MM-DD")
              : ""
          }
          onChange={dateActualEndDatePicker}
        />
      </Modal>
      {/* End end actual date modal  */}

      {/* Start Milestone status modal */}
      <Modal
        visible={miletoneStatusModal}
        title="MILESTONE STATUS"
        onCancel={() => {
          setMiletoneStatusModal(false); 
          setLoading(false);
          document.getElementById('attachemnt-name').innerHTML=null;
        }}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => updateMilestone("milestone-status")}
          >
            Update
          </Button>,
        ]}
      >
        <Select
          style={{ width: "100%" }}
          placeholder="Select Status"
          value={selectMileStone?.milestone_status_id || undefined}
          onChange={changeMilestoneStatus}
          showSearch
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {milestoneStatus && milestoneStatus.length
            ? milestoneStatus.map((data) => {
                return (
                  <Select.Option key={data.id} value={data.id}>
                    {data.name}
                  </Select.Option>
                );
              })
            : ""}
        </Select>
        <br/>
        <div className="file-upload-content" style={{marginTop:"1rem"}}>
            <label htmlFor="file-upload-field">Attachment</label>
            <div className="file-upload-wrapper" data-text="">
                <span className="attacment-filename" id="attachemnt-name"></span>
                <input 
                  name="file-upload-field" 
                  type="file" 
                  className="file-upload-field" 
                  value=""
                  accept=".jpeg,.bmp,.png,.jpg,.pdf"
                  onChange={fileUploadHandler}
                />
            </div>
        </div>
      </Modal>
      {/* End Milestone status modal  */}

      {/* Start Payment modal */}
      <Modal
        visible={paymentModal}
        title="Payment"
        onCancel={() => {setPaymentModal(false); setLoading(false)}}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => updateMilestone("payment")}
          >
            Update
          </Button>,
        ]}
      >
        <InputNumber
          size="large"
          style={{ width: "100%" }}
          defaultValue={selectMileStone?.payment || undefined}
          onChange={changePaymentAmount}
        />
      </Modal>
      {/* End Payment modal  */}

      {/* Start payment status modal */}
      <Modal
        visible={paymentStatusModal}
        title="PAYMENT STATUS"
        onCancel={() => {setPaymentStatusModal(false); setLoading(false)}}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => updateMilestone("payment-status")}
          >
            Update
          </Button>,
        ]}
      >
        <Select
          style={{ width: "100%" }}
          placeholder="Select Status"
          value={selectMileStone?.payment_status_id || undefined}
          onChange={changePaymentStatus}
          showSearch
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {paymentStatus && paymentStatus.length
            ? paymentStatus.map((data) => {
                return (
                  <Select.Option key={data.id} value={data.id}>
                    {data.name}
                  </Select.Option>
                );
              })
            : ""}
        </Select>
      </Modal>
      {/* End payment status modal  */}

      {/*start Milestone delete modal*/}
      <Modal
        visible={milestoneDeleteModal}
        title="Delete Milestone"
        onCancel={() => setMilestoneDeleteModal(false)}
        footer={null}
      >
        <div className="mb-5 mt-3" style={{textAlign: 'center'}}>Are you sure you want to delete this milestone. You will not get this miltestone back.</div>

        <Button type="danger" block onClick={deleteMilestone}>Delete</Button>
      </Modal>
      {/* End milestone delete modal  */}

      {/* start milestone dublicate modal  */}
      <Modal
        visible={milestoneDuplicateModal}
        title="Duplicate Milestone"
        onCancel={() => setMilestoneDuplicateModal(false)}
        footer={null}
      >
        <div className="mb-5 mt-3" style={{textAlign: 'center'}}>Are you sure you want to duplicate this milestone?</div>

        <Button type="primary" block onClick={milstoneDuplicate}>Duplicate Milestone</Button>
      </Modal>
      {/* End milestone dubmidate modal  */}

      {/* start Payment methods  */}
      <Modal
        visible={paymentMethodModal}
        title="PAYMENT METHOD"
        onCancel={() => {setPaymentMethodModal(false); setLoading(false)}}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => updateMilestone("payment-method")}
          >
            Update
          </Button>,
        ]}
      >
        <Select
          style={{ width: "100%" }}
          placeholder="Select Status"
          value={selectMileStone?.payment_method_id || undefined}
          onChange={changePaymentMethods}
          showSearch
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {paymentMethods && paymentMethods.length
            ? paymentMethods.map((data) => {
                return (
                  <Select.Option key={data.id} value={data.id}>
                    {data.title}
                  </Select.Option>
                );
              })
            : ""}
        </Select>
      </Modal>

      {/* End Payment Methods  */}
    </>
  );
};

export default ProjectRoadmapSertup;

const LandinContent = () => {
  return (
    <Flex full direction="column" align="center">
      <img src={sales_task} height="220" />
      <h2>You Must Have Select One Project To Generate Data</h2>
    </Flex>
  );
};
