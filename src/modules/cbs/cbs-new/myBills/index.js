import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import {Button, Table, Tooltip, Select, DatePicker } from "antd";
import {TableWrapper, Wrapper} from "../../../commons/Wrapper";
import {Flex} from "../../../commons/Flex";
import {getData, postData} from "../../../../scripts/api-service";
import { MY_BILLS, CBS_TYPES_LIST, CBS_CLAIM_TYPES_LIST, CBS_WITHDRAW } from "../../../../scripts/api";
import demoUser from "../../../../assets/dummy.jpg";
import attachmentIcon from "../../../../assets/attached.svg";
import {openAttchment} from "../../../../scripts/helper";
import moment from 'moment';
import { alertPop } from "../../../../scripts/message";
import { dateFormat } from "../../../../scripts/helper";

const cbsStatus = ['Pending','Approved By Supervisor','Declined By Supervisor','Approved By Dept','Declined By Dept','Approved By Finance','Declined By Finance','Paid','Withdraw'];

const Mybills = () => {
    const [myBillsList, setMyBillsList] = useState();
    const [currentPage, setCurrentPage] = useState();
    const [pageCount, setPageCount] = useState();
    const [selectCategory, setSelectCategory] = useState();
    const [selectCBSType, setSelectCBSType] = useState(0);
    const [cbsTypesList, setCBSTypesList] = useState();
    const [cbsClaimTypesList, setCBSClaimTypesList] = useState();
    const [selectStatus, setSelectStatus] = useState();
    const [selectDateRange, setSelectDateRange] = useState();

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

    const getMyBills = async () => {
        let url = MY_BILLS + '?';
        if(currentPage) url = url + '&page=' + currentPage;
        if(selectCBSType) url = url + '&cbs_type_id=' + selectCBSType;
        if(selectCategory) url = url + '&cbs_claim_type_id=' + selectCategory;
        if (selectStatus) url = url + '&status=' + selectStatus;

        if (selectDateRange?.length) {
            url = url + `&from_date=${moment(selectDateRange[0]).format("YYYY-MM-DD")}&to_date=${moment(selectDateRange[1]).format("YYYY-MM-DD")}`
        }

        
        let res = await getData(url);
    
        if (res) {
            let masterData = res?.data?.data;
            if (res.data.code === 200) {
                setMyBillsList(masterData);
                setPageCount(masterData?.last_page);
            }
        }
    }

    const handleWithdraw = async (id) => {
        let res = await postData(CBS_WITHDRAW, {
            cbs_id: id,
        })

        if (res) {
            alertPop('success', "Status updated successfully");
            getMyBills();
        }
    }

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
            title: "APPLIED BY",
            key: "applied_by",
            render: row => <Tooltip title={row?.assigned_user?.name}>
                <img src={row?.created_by?.profile_pic || demoUser } width="25" height="25" alt={row?.created_by?.name}/>
            </Tooltip> 
        },
        {
            title: "DATE",
            dataIndex: "claim_date",
            key: "claim_date",
        },
        {
            title: "STATUS",
            dataIndex: "status",
            key: "created_at",
        },
        {
            title: "ATTACHMENT",
            key: "attachment_type",
            render: (row) =><span>
                {row?.attachment ? <img src={attachmentIcon} onClick={() => {openAttchment(row?.attachment)}} alt="attachement" width="25" height="25" /> : ''}
            </span> ,
        },
        {
            title: "AMOUNT",
            dataIndex: "amount",
            key: "amount",
        },
        {
            title: "Updated At",
            key: "updated_at",
            render: ({ updated_at }) => <span>{dateFormat(updated_at)}</span>
        },
        {
            title: "Action",
            key: "action",
            render: (row) => <> 
                <Button 
                    // type="primary" 
                    onClick={() => {handleWithdraw(row?.id)}}
                    disabled={row?.status === 'Pending' ? false : true}
                >Withdraw</Button>
            </>,
        },
    ];

    useEffect(()=>{
        getMyBills();
        getCBSTypesList();
        getCBSClaimTypesList();
    },[]);

    useEffect(() => {
        getMyBills(currentPage);
    }, [currentPage, selectCBSType, selectCategory, selectStatus, selectDateRange]);

    useEffect(()=>{
        if(selectCBSType) {
            getCBSClaimTypesList();
            setSelectCategory();
        }
    },[selectCBSType]);

    const paginate = (page) => setCurrentPage(page);

    return (
        <Wrapper>
            <Flex space="1rem" justify="normal">
                <Button 
                    // onClick={creteTaskModalOpenHandler} 
                    width="40%" 
                    // size="large"
                    type="primary" 
                    style={{'marginRight': '1rem'}}
                >
                    <Link to={`/cbs/create-new-cbs`}>
                        Create New CBS
                    </Link>
                </Button>
                <Select 
                    allowClear
                    style={{width: '25%', 'marginRight': '1rem'}}
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
                    style={{width: '25%', 'marginRight': '1rem'}} 
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
                <DatePicker.RangePicker 
                    // size='large' 
                    onChange={(data) => setSelectDateRange(data)} 
                    style={{ width: '25%', 'marginRight': '1rem' }} 
                />
            </Flex>
            <Flex space="1rem" justify="normal">
                <Table 
                    scroll={{ y: '100vh'}}  
                    dataSource={myBillsList} 
                    columns={columns} 
                    pagination={{
                        current: currentPage,
                        total: pageCount * 10,
                        onChange: (page) => paginate(page),
                    }}
                />
            </Flex>
        </Wrapper>
    )
}

export default Mybills