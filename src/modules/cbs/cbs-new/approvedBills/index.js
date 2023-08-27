import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {Button, Table, Tooltip, Select, Drawer, Modal, Input, Form, DatePicker } from "antd";
import {TableWrapper, Wrapper} from "../../../commons/Wrapper";
import {Flex} from "../../../commons/Flex";
import { CBS_TYPES_LIST, CBS_CLAIM_TYPES_LIST, CBS_APPROVAL_LIST_DEPT, CBS_SUPERVISOR_APPROVAL, MULTIPLE_APPROVAL } from "../../../../scripts/api";
import {getData, postData} from "../../../../scripts/api-service";
import {alertPop} from "../../../../scripts/message";
import attachmentIcon from "../../../../assets/attached.svg";
import {openAttchment,range} from "../../../../scripts/helper";
import moment from 'moment';
import { dateFormat } from "../../../../scripts/helper";

// const cbsStatus = ['Approved By Dept', 'Approved By Finance', 'Declined By Finance', 'Paid'];

const cbsStatus = ['Pending','Approved By Supervisor','Declined By Supervisor','Approved By Dept','Declined By Dept','Approved By Finance','Declined By Finance','Paid','Withdraw'];

const actionCBSStatus = ['Approved By Dept', 'Declined By Dept'];

const ApproveBills = Form.create()(({form}) => {
    const [drawerShow, setDrawerShow] = useState(false);
    const [approvedList, setApprovedList] = useState();
    const [rowData, setRowData] = useState();
    const [modal, setModal] = useState();
    const [status, setStatus] = useState('');
    const [id, setId] = useState();
    const [declined, setDeclined] = useState(false);
    const [selectCategory, setSelectCategory] = useState();
    const [selectCBSType, setSelectCBSType] = useState(0);
    const [cbsTypesList, setCBSTypesList] = useState();
    const [cbsClaimTypesList, setCBSClaimTypesList] = useState();
    const [pageCount, setPageCount] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectStatus, setSelectStatus] = useState('Pending');
    const [selectDateRange, setSelectDateRange] = useState();
    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [hasSelected, setHasSelected] = useState(false);
    const [multipleStatusUpdateModal, setMultipleStatusUpdateModal] = useState();
    const [selectEmploy, setSelectEmploy] = useState();


    
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            if(selectedRowKeys.length > 0){
                setHasSelected(true);
                setSelectedRowIds(selectedRowKeys);
            } 
            else setHasSelected(false);
        },
        getCheckboxProps: record => ({
            disabled: record.status !== 'Pending', // Column configuration not to be checked
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
    }

    const getCBSClaimTypesList = async () => {
        let url = CBS_CLAIM_TYPES_LIST;
        if(selectCBSType) url = url + '?cbs_type_id=' + selectCBSType;
        let res = await getData(url);
    
        if (res) {
            let masterData = res?.data?.data;
            if (res.data.code === 200) {
                setCBSClaimTypesList(masterData);
            }
        }
    }

    const getApprovedList = async () => {
        let url = CBS_APPROVAL_LIST_DEPT + '?';
        if(currentPage) url = url + '&page=' + currentPage;
        if(selectCBSType) url = url + '&cbs_type_id=' + selectCBSType;
        if(selectCategory) url = url + '&cbs_claim_type_id=' + selectCategory;
        if (selectStatus) url = url + '&status=' + selectStatus;
        if (selectEmploy) url = url + '&emp_id=' + selectEmploy;


        if (selectDateRange?.length) {
            url = url + `&from_date=${moment(selectDateRange[0]).format("YYYY-MM-DD")}&to_date=${moment(selectDateRange[1]).format("YYYY-MM-DD")}`
        }

        let res = await getData(url);
        
        if (res) {
            let masterData = res?.data?.data?.data;
            if (res.data.code === 200) {
                setApprovedList(masterData);
                setPageCount(res?.data?.data?.last_page);
            }
        }
    }

    
    const updateApprovalStatus = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                let payload = {
                    status: status,
                    cbs_id: id,
                    remarks: values?.remarks
                }
                if(declined && payload?.remarks === undefined){
                    alertPop("error", "Please enter remarks");
                }
                else{    
                    let url = CBS_SUPERVISOR_APPROVAL;
                    postData(url, payload).then(res => {
                        if (res?.data?.code === 200) {
                            let masterData = res?.data?.data;
                            getApprovedList();
                            setModal(false);
                            setDeclined(false);
                            form.resetFields('remarks');
                            alertPop("success", "Successfully complete the process");
                        }
                    });
                }
            }
        })
    }

    const ApprovedByDepartment = async (value) => {
        if (selectedRowIds?.length) {
            let res = await postData(MULTIPLE_APPROVAL, {
                cbs_ids: selectedRowIds,
                status: value
            })

            if (res) {
                alertPop('success', "Status updated successfully");
                getApprovedList();
                setMultipleStatusUpdateModal(false);
            }
        } else {
            alertPop('warning', "Please select CBS")
        }
    }
    
    useEffect(()=>{
        getApprovedList();
        getCBSTypesList();
    },[]);

    useEffect(()=>{
        if(selectCBSType) {
            getCBSClaimTypesList();
            setSelectCategory();
        }
    },[selectCBSType]);

    useEffect(()=>{
        getApprovedList();
    },[selectCBSType,selectEmploy, selectCategory, currentPage, selectStatus, selectDateRange]);
    
    useEffect(() => {
        if(selectedRowIds.length > 0) setHasSelected(true);
        else setHasSelected(false);
    }, [selectedRowIds]);

    const columns = [
        {
            title: "CBS TYPE",
            dataIndex: "cbs_type.name",
            key: "cbs_type",
        },
        {
            title: "CBS CLAIM TYPE",
            dataIndex: "cbs_claim_type.name",
            key: "cbs_claim_type",
        },
        {
            title: "DEPARTMENT",
            dataIndex: "created_by.department",
            key: "department",
        },
        {
            title: "APPLIED BY",
            dataIndex: "created_by.name",
            key: "applied_by",
        },
        {
            title: "DATE",
            dataIndex: "claim_date",
            key: "claim_date",
        },
        {
            title: "STATUS",
            key: "status",
            dataIndex: "status"
        },
        // {
        //     title: "PURPOSE",
        //     key: "claim_purpose",
        //     dataIndex: "claim_purpose"
        // },
        {
            title: "START LOCATION",
            key: "transport_start_location",
            dataIndex: "transport_start_location"
        },
        {
            title: "END LOCATION",
            key: "transport_end_location",
            dataIndex: "transport_end_location"
        },
        {
            title: "AMOUNT",
            dataIndex: "amount",
            key: "amount",
        },
        {
            title: "TRANSPORT TYPE",
            dataIndex: "transport_type",
            key: "transport_type",
        },
        {
            title: "ATTACHMENT",
            render: (row) => 
            <>
            {row.attachment ? 
                <img 
                    src={attachmentIcon} 
                    alt="attachement" 
                    style={{float: 'inherit', marginLeft: '10px', width:'1.5rem'}} 
                    onClick={() => {openAttchment(row.attachment)}}
                />:null     
            }    
            </>,
            key: "attachment",
        },
        {
            title: "Updated At",
            key: "updated_at",
            render: ({ updated_at }) => <span>{dateFormat(updated_at)}</span>
        },
        {
            title: "Action",
            key: "action",
            render: (row) =>
                <Button 
                    // type="primary" 
                    onClick={() => {
                        setModal(true);
                        setRowData(row);
                    }}
                    disabled={row.status !== 'Pending' ? true : false}
                > Approve/Decline
                </Button>,
            width: '15%'
        },
        {
            title: "Details",
            key: "details",
            render: (row) => 
            <Button 
                type="link" 
                onClick={() => {
                    setDrawerShow(true);
                    setRowData(row);
                }}
            > Details
            </Button>,
        },
    ];

  return (
    <Wrapper>
        <Flex space="1rem" justify="normal">
            <Select 
                allowClear
                style={{width: '40%', 'marginRight': '1rem'}}
                // size="large"
                showSearch
                placeholder='Select CBS Type'
                dropdownMatchSelectWidth={false}
                onChange={(value)=>{
                    setSelectCBSType(value);
                    setSelectCategory();
                }}
                filterOption={(input, option) =>
                option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
            >
                {cbsTypesList ? cbsTypesList.map(cbs=>{
                    return(
                        <Select.Option value={cbs.id} label={cbs.name}>{cbs.name}</Select.Option>
                    )
                }):null}
            </Select>
            <Select 
                allowClear
                style={{width: '40%', 'marginRight': '1rem'}} 
                // size="large"
                showSearch
                placeholder="Select CBS Claim Type"
                dropdownMatchSelectWidth={false}
                value={selectCategory}
                onChange={(value)=>setSelectCategory(value)}
                filterOption={(input, option) =>
                option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
            >
                {cbsClaimTypesList ? cbsClaimTypesList.map(cbsClaimType=>{
                    return (
                        <Select.Option key={cbsClaimType.id} value={cbsClaimType.id}>{cbsClaimType.name}</Select.Option>
                    )
                }):null}
            </Select>
            <Select
                allowClear
                style={{ width: '25%', 'marginRight': '1rem' }}
                // size="large"
                showSearch
                placeholder="Select Status"
                dropdownMatchSelectWidth={false}
                value={selectStatus}
                onChange={(value) => setSelectStatus(value)}
                filterOption={(input, option) =>
                    option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                }
            >
                {cbsStatus.map(item => {
                    return (
                        <Select.Option key={item} value={item}>{item}</Select.Option>
                    )
                })}
            </Select>
            <Select
                    allowClear
                    style={{ width: '25%', 'marginRight': '1rem' }}
                    // size="large"
                    showSearch
                    placeholder="Select User"
                    dropdownMatchSelectWidth={false}
                    value={selectEmploy}
                    onChange={(value) => setSelectEmploy(value)}
                    filterOption={(input, option) =>
                        option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {/* {users?users.map(user => {
                        return (
                            <Select.Option key={user.emp_id} value={user.emp_id}>{user.name}</Select.Option>
                        )
                    }) : null} */}
            </Select>
            <DatePicker.RangePicker 
                // size='large' 
                onChange={(data) => setSelectDateRange(data)} 
                style={{ width: '25%', 'marginRight': '1rem' }} 
            />
            
        </Flex>
        <Button 
            type="primary" 
            className='ml-3' 
            // size="large" 
            onClick={() => {setMultipleStatusUpdateModal(true)}}
            disabled={!hasSelected}
        > Multiple Status Update
        </Button>
        <Flex space="1rem" justify="normal">
            <Table 
                rowKey={record => record.id}
                // scroll={{ x: 'calc(100vw + 10rem)', y: '100vh'}} 
                rowSelection={rowSelection} 
                // scroll={{ y: '100vh'}} 
                // scroll={{ y: "calc(100vh - 20rem)" }} 
                dataSource={approvedList} 
                columns={columns} 
                pagination={{
                    current: currentPage,
                    total: pageCount * 10,
                    onChange: (page) => paginate(page),
                }}
                // onChange={(pagination) => apiCall(pagination.current)}
            />
        </Flex>

        {/* Approve/Decline */}
        <Modal
            title="Approve / Decline Claim"
            visible={modal}
            width="60vw"
            onCancel={() => {setModal(false)} }
            footer={false}
        >
            <Form 
              onSubmit={updateApprovalStatus}
            >
                <Form.Item label={'Remarks'}>
                    {form.getFieldDecorator('remarks', {
                        // rules: [{required: true, message: "Please give some remarks!"}],
                        // initialValue: nonBusiness ? activityDetails?.contact_person?.id : activityDetails?.client_department_id ? activityDetails?.client_department_id : undefined
                    })(<Input.TextArea rows={4} placeholder="Enter remarks" />)}
                </Form.Item>
                <div style={{display: 'flex', justifyContent:'space-around', margin: '1rem'}}>
                    <Button 
                        style={{width: 'auto'}}
                        block
                        type="primary"
                        htmlType="submit"
                        onClick={() => {
                            setStatus("Approved By Dept");
                            setId(rowData.id);
                        }}
                    > Approve
                    </Button>
                    <Button 
                        style={{width: 'auto'}}
                        block
                        type="danger"
                        htmlType="submit"
                        onClick={() => {
                            setStatus("Declined By Dept");
                            setId(rowData.id);
                            setDeclined(true);
                        }}
                    > Decline
                    </Button>
                </div>
            </Form>
        </Modal> 

        {/* multiple status update modal */}
        <Modal
            title="Multiple Status Update"
            visible={multipleStatusUpdateModal}
            width="60vw"
            onCancel={() => { setMultipleStatusUpdateModal(false) }}
            footer={false}
        >

            <Select
                size="large"
                style={{ width: '400px', 'marginLeft': '1rem' }}
                showSearch
                placeholder="Multiple Status Update"
                dropdownMatchSelectWidth={false}
                // value={selectEmploy}
                onChange={(value) => ApprovedByDepartment(value)}
                filterOption={(input, option) =>
                    option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                }
            >
                {actionCBSStatus.map(item => {
                    return (
                        <Select.Option key={item} value={item}>{item}</Select.Option>
                    )
                })}
            </Select>
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
            {rowData?.created_by?.name ? <p><strong>Applied By: </strong>{rowData?.created_by?.name}</p>  : ''}
            {rowData?.cbs_type?.name ? <p><strong>CBS Type: </strong>{rowData?.cbs_type?.name}</p>  : ''}
            {rowData?.cbs_claim_type?.name ? <p><strong>CBS Claim Type: </strong>{rowData?.cbs_claim_type?.name}</p>  : ''}
            {rowData?.title ? <p><strong>Title: </strong>{rowData?.title}</p>  : ''}
            {rowData?.claim_purpose ? <p><strong>CBS Claim Purpose: </strong>{rowData?.claim_purpose}</p>  : ''}
            {rowData?.claim_date ? <p><strong>CBS Claim Date: </strong>{rowData?.claim_date}</p>  : ''}
            {rowData?.claim_type_description ? <p><strong>Description: </strong>{rowData?.claim_type_description}</p>  : ''}
            {rowData?.person_name ? <p><strong>Person Name: </strong>{rowData?.person_name}</p>  : ''}
            {rowData?.contact_number ? <p><strong>Contact Number: </strong>{rowData?.contact_number}</p>  : ''}
            {rowData?.transport_type ? <p><strong>Transport Type: </strong>{rowData?.transport_type}</p>  : ''}
            {rowData?.transport_start_location ? <p><strong>Start Location: </strong>{rowData?.transport_start_location}</p>  : ''}
            {rowData?.transport_end_location ? <p><strong>End Location: </strong>{rowData?.transport_end_location}</p>  : ''}
            {rowData?.food_type ? <p><strong>Food Type: </strong>{rowData?.food_type}</p>  : ''}
            {rowData?.gift_name ? <p><strong>Gift Name: </strong>{rowData?.gift_name}</p>  : ''}
            {rowData?.restaurant_name ? <p><strong>Restaurent Name: </strong>{rowData?.restaurant_name}</p>  : ''}
            {rowData?.status ? <p><strong>Status: </strong>{rowData?.status}</p>  : ''}
            {rowData?.quantity ? <p><strong>Quantity: </strong>{rowData?.quantity}</p>  : ''}
            {rowData?.remarks ? <p><strong>Reason: </strong>{rowData?.remarks}</p>  : ''}
            {rowData?.amount ? <p><strong>Amount: </strong>{rowData?.amount}</p>  : ''}
        </Drawer>
    </Wrapper>
  )
})

export default ApproveBills