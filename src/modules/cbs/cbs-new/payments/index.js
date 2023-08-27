/** @format */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Table,
  Tooltip,
  Checkbox,
  Select,
  Drawer,
  Modal,
  Input,
  Form,
  DatePicker,
} from "antd";
import { TableWrapper, Wrapper } from "../../../commons/Wrapper";
import { Flex } from "../../../commons/Flex";
import {
  CBS_TYPES_LIST,
  CBS_CLAIM_TYPES_LIST,
  CBS_APPROVAL_LIST_FINANCE,
  CBS_FINANCE_APPROVAL,
  PIS_DEPARTMENT_LIST,
  USER_LIST,
  MULTIPLE_APPROVAL,
  CBS_EXPORT,
  CBS_PAID_LIST,
} from "../../../../scripts/api";
import { getData, postData } from "../../../../scripts/api-service";
import { alertPop } from "../../../../scripts/message";
import moment from "moment";
import attachmentIcon from "../../../../assets/attached.svg";
import { openAttchment, range, dateFormat } from "../../../../scripts/helper";

const { RangePicker } = DatePicker;

const cbsStatus = ["Approved By Finance", "Paid"];
const actionCBSStatus = ["Approved By Finance", "Paid"];

const CBSPayments = Form.create()(({ form }) => {
  const [drawerShow, setDrawerShow] = useState(false);
  const [approvedList, setApprovedList] = useState();
  const [rowData, setRowData] = useState();
  const [modal, setModal] = useState();
  const [multipleStatusUpdateModal, setMultipleStatusUpdateModal] = useState();
  const [status, setStatus] = useState("");
  const [id, setId] = useState();
  const [declined, setDeclined] = useState(false);
  const [selectCategory, setSelectCategory] = useState();
  const [selectCBSType, setSelectCBSType] = useState(0);
  const [cbsTypesList, setCBSTypesList] = useState();
  const [cbsClaimTypesList, setCBSClaimTypesList] = useState();
  const [pageCount, setPageCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [approvalChecked, setApprovalChecked] = useState([]);
  const [filters, setFilters] = useState();
  const [selectDepertment, setSelectDepartment] = useState();
  const [selectEmploy, setSelectEmploy] = useState();
  const [selectStatus, setSelectStatus] = useState();
  const [selectDateRange, setSelectDateRange] = useState();
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [hasSelected, setHasSelected] = useState(false);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectedRowKeys.length > 0) {
        setHasSelected(true);
        setSelectedRowIds(selectedRowKeys);
      } else setHasSelected(false);
    },
    getCheckboxProps: (record) => ({
      disabled: record.status !== "Approved By Finance", // Column configuration not to be checked
      name: record.status,
    }),
  };

  const paginate = (page) => setCurrentPage(page);

  const getCBSTypesList = async () => {
    let url = CBS_TYPES_LIST;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      if (res.data.code === 200) {
        setCBSTypesList(masterData);
      }
    }
  };

  const getCBSClaimTypesList = async () => {
    let url = CBS_CLAIM_TYPES_LIST;
    if (selectCBSType) url = url + "?cbs_type_id=" + selectCBSType;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      if (res.data.code === 200) {
        setCBSClaimTypesList(masterData);
      }
    }
  };

  const getPaidList = async () => {
    let url = CBS_PAID_LIST + "?";
    if (currentPage) url = url + "&page=" + currentPage;
    if (selectCBSType) url = url + "&cbs_type_id=" + selectCBSType;
    if (selectCategory) url = url + "&cbs_claim_type_id=" + selectCategory;
    if (selectEmploy) url = url + "&emp_id=" + selectEmploy;
    if (selectDepertment) url = url + "&department_id=" + selectDepertment;
    if (selectStatus) url = url + "&status=" + selectStatus;

    if (selectDateRange?.length) {
      url =
        url +
        `&from_date=${moment(selectDateRange[0]).format(
          "YYYY-MM-DD",
        )}&to_date=${moment(selectDateRange[1]).format("YYYY-MM-DD")}`;
    }

    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data?.data;
      if (res.data.code === 200) {
        setApprovedList(masterData);
        setPageCount(res?.data?.data?.last_page);
      }
    }
  };

  const updateApprovalStatus = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        let payload = {
          status: values?.status,
          cbs_id: id,
          remarks: values?.remarks,
        };

        // if (declined && payload?.remarks === undefined) {
        // if (values?.status && payload?.remarks === undefined) {
        //     alertPop("error", "Please enter remarks");
        // }
        // else {
        let url = CBS_FINANCE_APPROVAL;
        postData(url, payload).then((res) => {
          if (res?.data?.code === 201) {
            let masterData = res?.data?.data;
            getPaidList();
            setModal(false);
            form.resetFields("remarks");
            alertPop("success", "Successfully complete the process");
          }
        });
        // }
      }
    });
  };

  const getEmployeeList = async () => {
    let res = await getData(USER_LIST + `?department_id=${selectDepertment}`);

    if (res) {
      let masterData = res?.data?.data;

      setFilters((prevState) => ({
        ...prevState,
        users: masterData,
      }));
    }
  };

  const getDepartmentList = async () => {
    let res = await getData(PIS_DEPARTMENT_LIST);

    if (res) {
      let masterData = res?.data?.data;
      setFilters((prevState) => ({
        ...prevState,
        department: masterData,
      }));
    }
  };

  useEffect(() => {
    getPaidList();
    getCBSTypesList();
    getDepartmentList();
  }, []);

  useEffect(() => {
    if (selectCBSType) {
      getCBSClaimTypesList();
      setSelectCategory();
    }
  }, [selectCBSType]);

  useEffect(() => {
    getPaidList();
  }, [
    selectCBSType,
    selectCategory,
    selectEmploy,
    selectStatus,
    selectDateRange,
    selectDepertment,
    currentPage,
  ]);

  useEffect(() => {
    if (selectDepertment) getEmployeeList();
    else {
      setFilters((prevState) => ({
        ...prevState,
        users: [],
      }));
    }
  }, [selectDepertment]);

  useEffect(() => {
    if (selectedRowIds.length > 0) setHasSelected(true);
    else setHasSelected(false);
  }, [selectedRowIds]);

  const stausCheckHandel = (checked, itemId) => {
    // console.log({ itemId, checked });

    if (checked) {
      setApprovalChecked((oldArray) => [...oldArray, itemId]);
    } else {
      let billIds = [...approvalChecked];

      let idx = billIds.findIndex((i) => i === itemId);
      billIds.splice(idx, 1);
      setApprovalChecked(billIds);
    }
  };

  const ApprovedByFinance = async () => {
    if (selectedRowIds?.length) {
      let res = await postData(MULTIPLE_APPROVAL, {
        cbs_ids: selectedRowIds,
        status: "Paid",
      });

      if (res) {
        alertPop("success", "Status updated successfully");
        getPaidList();
        setApprovalChecked([]);
        setMultipleStatusUpdateModal(false);
      }
    } else {
      alertPop("warning", "Please select CBS");
    }
  };

  const exportHandel = async () => {
    let url = CBS_EXPORT + "?";
    if (selectCBSType) url = url + "&cbs_type_id=" + selectCBSType;
    if (selectCategory) url = url + "&cbs_claim_type_id=" + selectCategory;
    if (selectEmploy) url = url + "&emp_id=" + selectEmploy;
    if (selectDepertment) url = url + "&department_id=" + selectDepertment;
    if (selectStatus) url = url + "&status=" + selectStatus;

    if (selectDateRange?.length) {
      url =
        url +
        `&from_date=${moment(selectDateRange[0]).format(
          "YYYY-MM-DD",
        )}&to_date=${moment(selectDateRange[1]).format("YYYY-MM-DD")}`;
    }

    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      window.open(masterData);
    }
  };

  const showChecked = (itemId) => {
    let findIdx = approvalChecked.findIndex((item) => item === itemId);
    return findIdx === -1 ? false : true;
  };

  const columns = [
    // {
    //     title: "",
    //     key: "id",
    //     render: (row) =>
    //     <Checkbox
    //         checked={showChecked(row.id)}
    //         onChange={e => { stausCheckHandel(e.target.checked, row.id) }}
    //         disabled={row.status !== 'Approved By Finance' ? true : false}
    //     ></Checkbox>,
    // },
    {
      title: "CBS TYPE",
      dataIndex: "cbs_type.name",
      key: "cbs_type",
      width: 250,
      //   fixed: "left",
    },

    {
      title: "CBS CLAIM TYPE",
      dataIndex: "cbs_claim_type.name",
      key: "cbs_claim_type",
      width: 200,
    },
    {
      title: "DEPARTMENT",
      dataIndex: "created_by.department",
      key: "department",
      width: 180,
    },
    {
      title: "APPLIED BY",
      dataIndex: "created_by.name",
      key: "applied_by",
      width: 180,
    },
    {
      title: "DATE",
      dataIndex: "claim_date",
      key: "claim_date",
      width: 180,
    },
    {
      title: "STATUS",
      key: "status",
      dataIndex: "status",
      width: 180,
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
      width: 120,
    },
    {
      title: "ATTACHMENT",
      render: (row) => (
        <>
          {row.attachment ? (
            <img
              src={attachmentIcon}
              alt="attachement"
              style={{ float: "inherit", marginLeft: "10px", width: "1.5rem" }}
              onClick={() => {
                openAttchment(row.attachment);
              }}
            />
          ) : null}
        </>
      ),
      key: "attachment",
      width: 180,
    },
    {
      title: "Paid Date",
      key: "paid_date",
      width: 180,
      render: ({ paid_date }) => <span>{paid_date}</span>,
    },
    {
      title: "Updated Date",
      key: "updated_at",
      width: 180,
      render: ({ updated_at }) => <span>{dateFormat(updated_at)}</span>,
    },
    {
      title: "Action",
      key: "action",
      width: 200,

      render: (row) => (
        <Button
          // type="primary"
          onClick={() => {
            setModal(true);
            setRowData(row);
          }}
          disabled={row.status !== "Approved By Finance" ? true : false}
        >
          {" "}
          Approve/Decline
        </Button>
      ),
    },
    {
      title: "Details",
      key: "details",
      width: 180,
      fixed: "right",
      render: (row) => (
        <Button
          type="link"
          onClick={() => {
            setDrawerShow(true);
            setRowData(row);
          }}
        >
          {" "}
          Details
        </Button>
      ),
    },
  ];

  return (
    <Wrapper>
      <Flex space="1rem" justify="normal">
        <Select
          allowClear
          style={{ width: "25%", marginRight: "1rem" }}
          // size="large"
          showSearch
          placeholder="Select CBS Type"
          dropdownMatchSelectWidth={false}
          onChange={(value) => {
            setSelectCBSType(value);
            setSelectCategory();
          }}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {cbsTypesList
            ? cbsTypesList.map((cbs) => {
                return (
                  <Select.Option value={cbs.id} label={cbs.name}>
                    {cbs.name}
                  </Select.Option>
                );
              })
            : null}
        </Select>
        <Select
          allowClear
          style={{ width: "25%", marginRight: "1rem" }}
          // size="large"
          showSearch
          placeholder="Select CBS Claim Type"
          dropdownMatchSelectWidth={false}
          value={selectCategory}
          onChange={(value) => setSelectCategory(value)}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {cbsClaimTypesList
            ? cbsClaimTypesList.map((cbsClaimType) => {
                return (
                  <Select.Option key={cbsClaimType.id} value={cbsClaimType.id}>
                    {cbsClaimType.name}
                  </Select.Option>
                );
              })
            : null}
        </Select>
        <Select
          allowClear
          style={{ width: "25%", marginRight: "1rem" }}
          // size="large"
          showSearch
          placeholder="Select Department"
          dropdownMatchSelectWidth={false}
          value={selectDepertment}
          onChange={(value) => setSelectDepartment(value)}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {filters?.department?.length
            ? filters?.department.map((dep) => {
                return (
                  <Select.Option key={dep.id} value={dep.id}>
                    {dep.name}
                  </Select.Option>
                );
              })
            : null}
        </Select>
        <Select
          allowClear
          style={{ width: "25%", marginRight: "1rem" }}
          // size="large"
          showSearch
          placeholder="Select User"
          dropdownMatchSelectWidth={false}
          value={selectEmploy}
          onChange={(value) => setSelectEmploy(value)}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {filters?.users?.length
            ? filters?.users.map((user) => {
                return (
                  <Select.Option key={user.emp_id} value={user.emp_id}>
                    {user.name}
                  </Select.Option>
                );
              })
            : null}
        </Select>
        <Select
          allowClear
          style={{ width: "25%", marginRight: "1rem" }}
          // size="large"
          showSearch
          placeholder="Select Status"
          dropdownMatchSelectWidth={false}
          value={selectStatus}
          onChange={(value) => setSelectStatus(value)}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {cbsStatus.map((item) => {
            return (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            );
          })}
        </Select>
        <RangePicker
          // size='large'
          onChange={(data) => setSelectDateRange(data)}
          style={{ width: "25%", marginRight: "1rem" }}
        />
      </Flex>

      <Button
        type="primary"
        className="ml-3"
        // size="large"
        onClick={() => {
          ApprovedByFinance();
        }}
        disabled={!hasSelected}
      >
        {" "}
        Mark As Paid
      </Button>

      <Button
        type="primary"
        className="ml-3"
        // size="large"
        onClick={() => exportHandel()}
      >
        Export
      </Button>

      <Flex space="1rem" justify="normal"></Flex>
      <Table
        rowKey={(record) => record.id}
        // scroll={{ x: 'calc(100vw)' }}
        scroll={{ y: 600, x: 2500 }}
        // dataSource={data}
        dataSource={approvedList}
        columns={columns}
        rowSelection={rowSelection}
        // pagination={false}
        pagination={{
          current: currentPage,
          total: pageCount * 10,
          onChange: (page) => paginate(page),
        }}
        // onChange={(pagination) => apiCall(pagination.current)}
      />

      {/* Approve/Decline */}
      <Modal
        title="Approve / Decline Claim"
        visible={modal}
        width="60vw"
        onCancel={() => {
          setModal(false);
        }}
        footer={false}
      >
        <Form onSubmit={updateApprovalStatus}>
          <Form.Item label={"Remarks"}>
            {form.getFieldDecorator("remarks", {
              // rules: [{ required: true, message: "Please give some remarks!" }],
              // initialValue: nonBusiness ? activityDetails?.contact_person?.id : activityDetails?.client_department_id ? activityDetails?.client_department_id : undefined
            })(
              <Input.TextArea
                rows={4}
                placeholder="Enter remarks (if declined)"
              />,
            )}
          </Form.Item>
          {/* <div style={{ display: 'flex', justifyContent: 'space-around', margin: '1rem' }}>
                        <Button
                            style={{ width: 'auto' }}
                            block
                            type="primary"
                            htmlType="submit"
                            onClick={() => {
                                setStatus("Approved By Finance");
                                setId(rowData.id);
                            }}
                        > Approved By Finance
                        </Button>
                        <Button
                            style={{ width: 'auto' }}
                            block
                            type="danger"
                            htmlType="submit"
                            onClick={() => {
                                setStatus("Declined By Finance");
                                setId(rowData.id);
                                setDeclined(true);
                            }}
                        > Declined By Finance
                        </Button>
                    </div> */}
          <Form.Item label={"Status"}>
            {form.getFieldDecorator("status", {
              rules: [{ required: true, message: "Select a status!" }],
            })(
              <Select
                size="large"
                showSearch
                placeholder="Status Update"
                dropdownMatchSelectWidth={false}
                value={selectEmploy}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {actionCBSStatus.map((item) => {
                  return (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  );
                })}
              </Select>,
            )}
          </Form.Item>
          <Button
            // style={{float: 'right' }}
            block
            type="primary"
            htmlType="submit"
            size="large"
            onClick={() => {
              // setStatus("Declined By Finance");
              setId(rowData.id);
              // setDeclined(true);
            }}
          >
            {" "}
            Submit
          </Button>
        </Form>
      </Modal>

      {/* Details drawer */}
      <Drawer
        title="CBS Details"
        placement="right"
        closable={false}
        onClose={() => setDrawerShow(false)}
        visible={drawerShow}
        width={500}
      >
        {rowData?.created_by?.name ? (
          <p>
            <strong>Applied By: </strong>
            {rowData?.created_by?.name}
          </p>
        ) : (
          ""
        )}
        {rowData?.cbs_type?.name ? (
          <p>
            <strong>CBS Type: </strong>
            {rowData?.cbs_type?.name}
          </p>
        ) : (
          ""
        )}
        {rowData?.cbs_claim_type?.name ? (
          <p>
            <strong>CBS Claim Type: </strong>
            {rowData?.cbs_claim_type?.name}
          </p>
        ) : (
          ""
        )}
        {rowData?.title ? (
          <p>
            <strong>Title: </strong>
            {rowData?.title}
          </p>
        ) : (
          ""
        )}
        {rowData?.claim_purpose ? (
          <p>
            <strong>CBS Claim Purpose: </strong>
            {rowData?.claim_purpose}
          </p>
        ) : (
          ""
        )}
        {rowData?.claim_type_description ? (
          <p>
            <strong>Description: </strong>
            {rowData?.claim_type_description}
          </p>
        ) : (
          ""
        )}
        {rowData?.person_name ? (
          <p>
            <strong>Person Name: </strong>
            {rowData?.person_name}
          </p>
        ) : (
          ""
        )}
        {rowData?.contact_number ? (
          <p>
            <strong>Contact Number: </strong>
            {rowData?.contact_number}
          </p>
        ) : (
          ""
        )}
        {rowData?.transport_type ? (
          <p>
            <strong>Transport Type: </strong>
            {rowData?.transport_type}
          </p>
        ) : (
          ""
        )}
        {rowData?.transport_start_location ? (
          <p>
            <strong>Start Location: </strong>
            {rowData?.transport_start_location}
          </p>
        ) : (
          ""
        )}
        {rowData?.transport_end_location ? (
          <p>
            <strong>End Location: </strong>
            {rowData?.transport_end_location}
          </p>
        ) : (
          ""
        )}
        {rowData?.food_type ? (
          <p>
            <strong>Food Type: </strong>
            {rowData?.food_type}
          </p>
        ) : (
          ""
        )}
        {rowData?.gift_name ? (
          <p>
            <strong>Gift Name: </strong>
            {rowData?.gift_name}
          </p>
        ) : (
          ""
        )}
        {rowData?.restaurant_name ? (
          <p>
            <strong>Restaurent Name: </strong>
            {rowData?.restaurant_name}
          </p>
        ) : (
          ""
        )}
        {rowData?.status ? (
          <p>
            <strong>Status: </strong>
            {rowData?.status}
          </p>
        ) : (
          ""
        )}
        {rowData?.quantity ? (
          <p>
            <strong>Quantity: </strong>
            {rowData?.quantity}
          </p>
        ) : (
          ""
        )}
        {rowData?.remarks ? (
          <p>
            <strong>Reason: </strong>
            {rowData?.remarks}
          </p>
        ) : (
          ""
        )}
      </Drawer>
    </Wrapper>
  );
});

export default CBSPayments;
