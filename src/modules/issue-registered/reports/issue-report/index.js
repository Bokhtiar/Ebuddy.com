import {Button, Divider, Modal, Select, Skeleton, Table, Icon, Spin, Row, Col, Pagination } from "antd";
import React, {useEffect, useState} from "react";
import {
    TASK_SUMMARY_REPORT,
    TASK_SUMMARY_REPORT_EXPORT,
    ISSUE_REGISTER_LIST,
    ISSUE_REGISTER,
    ISSUE_REGISTER_REPORT,
    USER_TEAM_LIST,
    ISSUE_TYPE_DROPDOWN_LIST,
    ISSUE_REGISTER_EXPORT
} from "../../../../scripts/api";
import {alertPop} from "../../../../scripts/message";
import {getData} from "../../../../scripts/api-service";
import {Flex} from "../../../commons/Flex";
import {PageTitle} from "../../../commons/PageTitle";
import SearchFilter from "../../../commons/SearchFilter";
import {TableWrapper,Wrapper} from "../../../commons/Wrapper";
import {dateFormat} from "../../../../scripts/helper";
import DataTable from './DataTable';
// import sales_task from "../../../assets/icons/test/sales_task_icon.svg";
import moment from "moment";


/*
    These are newer modules and ant design Tables are used instead
    of custom designed Tables in the project commons directory
*/
// className: 'text-primary',
//     style: {backgroundColor: 'black'},

let years = [],
    nextYear = moment().add(10, 'Y').format('YYYY');

    for (let i = 1971; i <= nextYear; i++) {
        years.push(i.toString());
    }

let months = [
    {value: "1", text: "January"},
    {value: "2", text: "February"},
    {value: "3", text: "March"},
    {value: "4", text: "April"},
    {value: "5", text: "May"},
    {value: "6", text: "June"},
    {value: "7", text: "July"},
    {value: "8", text: "August"},
    {value: "9", text: "September"},
    {value: "10", text: "October"},
    {value: "11", text: "November"},
    {value: "12", text: "December"}
];

export default function IssueReport(){
    const [startFrom, setStartFrom] = useState();
    const [endFrom, setEndFrom] = useState();
    const [searchValue, setSeatch] = useState();
    const [modal, setModal] = useState();
    const [issueRegisterList, setIssueRegisterList] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState();
    const [isIssueUpdate, setIsIssueUpdate] = useState(false);
    const [row, setRow] = useState();
    const [refresh, setRefresh] = useState(false);
    const [issueReport, setIssueReport] = useState(false);
    const [assigneeList, setAssigneeList] = useState();
    const [selectedAssignee, setSelectedAssignee] = useState();
    const [selectedIssuer, setSelectedIssuer] = useState();
    const [selectedStatus, setSelectedStatus] = useState();
    const [issueTypeList, setIssueTypeList] = useState();

    const paginate = (page) => setCurrentPage(page);

    const search = (value) => {
        setSeatch(value);
    };

    const filter = (date) => {
        setStartFrom(date?.date_from);
        setEndFrom(date?.date_to);
        if(date === null) getIssueReport();
    };

    const getIssueReport = async () => {
        let url = ISSUE_REGISTER_REPORT + `?page=${currentPage}`;
        if(selectedAssignee) url = url + '&assignee=' + selectedAssignee;
        if(selectedIssuer) url = url + '&issued_user_type=' + selectedIssuer;
        if(selectedStatus) url = url + '&status=' + selectedStatus;
        // if(searchValue) url = url + '&search=' + searchValue;
        // if(startFrom && endFrom) url = url + '&status=' + selectedStatus;

        let res = await getData(url);
        if (res) {
            let masterData = res?.data?.data?.data;
            setPageCount(res?.data?.data?.last_page);
            setIssueReport(masterData);
        }
    }

    const getAssigneeList = async () => {
        let res = await getData(USER_TEAM_LIST);

        if (res) {
            let masterData = res?.data?.data;
            setAssigneeList(masterData);
        }
    } 

    const getIssueTypeList = async () => {
        let res = await getData(ISSUE_TYPE_DROPDOWN_LIST);

        if (res) {
            let masterData = res?.data?.data;
            setIssueTypeList(masterData);
        }
    } 

    const exportData = async () => {
        let url = ISSUE_REGISTER_EXPORT + '?';
        if(selectedAssignee) url = url + '&assignee=' + selectedAssignee;
        if(selectedIssuer) url = url + '&issued_user_type=' + selectedIssuer;
        if(selectedStatus) url = url + '&status=' + selectedStatus;
        let res = await getData(url);
        let masterData = res?.data?.data;
        // console.log('masterData>>>>>>>>>>', masterData);
        window.open(masterData);
    }

    useEffect(()=>{
        getIssueReport();
        getAssigneeList();
        getIssueTypeList();
    },[]);

    useEffect(()=>{
        getIssueReport();
    },[selectedAssignee,selectedIssuer,selectedStatus, searchValue, currentPage, issueTypeList])

    const columns = [
        {
          title: 'Issue/Activity',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: 'Assignee',
          dataIndex: 'assignee.name',
          key: 'assignee.name',
        },
        {
          title: 'Dependency',
          key: 'parent_issues',
          render: row => Array.prototype.map.call(row?.parent_issues, function(item) { return item.title; }).join(",")
        },
        {
          title: 'Issue Type',
          key: 'issue_type',
          render: row => row?.issue_type?.name
        },
        {
          title: 'Issued By',
          key: 'issued_by',
          render: row => <p>{row?.issued_by?.name}</p>
        },
        {
          title: 'Priority',
          dataIndex: 'priority',
          key: 'priority',
        },
        {
          title: 'Reported Date',
          key: 'reported_date',
          render: row => moment(row?.reported_date).format('YYYY-MM-DD')
        },
        {
          title: 'Exp Due Date',
          key: 'due_date',
          render: row => moment(row?.due_date).format('YYYY-MM-DD')
        },
        {
          title: "Day's Remain",
          key: 'remaining',
          render: row => row?.due_date ? moment(row?.due_date).from(moment().format('YYYY-MM-DD')) : null
        },
        {
          title: 'Closed Date',
          key: 'complete_date',
          render: row => row?.complete_date ? moment(row?.complete_date).format('YYYY-MM-DD') : null
        },
        {
          title: 'Age',
          key: 'age',
          render: row => row?.reported_date ? moment(row?.reported_date).from(moment().format('YYYY-MM-DD')) : null 
        },
        // {
        //     title: "STATUS",
        //     key: "status",
        //     render: (row) => row?.status ? <p>{row?.status}</p> : null
        // },
      ];

    return (
        <Wrapper style={{width: '95%'}}>
            <SearchFilter
                search={search}
                filter={filter}
                filterOptions={false}
                failsafe
            />
            <Row gutter={4} style={{margin:'1rem', display:'flex', alignItems:'center'}}>
                <Col span={4}>
                    <Select 
                        allowClear={true}
                        dropdownMatchSelectWidth={false}
                        placeholder='Assignee'
                        showSearch
                        onChange={(value)=>setSelectedAssignee(value)}
                        filterOption={(input, option) =>
                            option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 2}
                    >
                        {assigneeList ? assigneeList.map(dept=>{
                            return(
                                <Select.Option key={dept.emp_id} value={dept.emp_id}>{dept.name}</Select.Option>
                            )
                        }):null}
                    </Select>
                </Col>
                <Col span={4}>
                    <Select 
                        allowClear={true}
                        placeholder='Issued By'
                        showSearch
                        onChange={(value)=>setSelectedIssuer(value)}
                        filterOption={(input, option) =>
                            option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0}
                    >    
                        <Select.Option key={1} value="Internal">Internal</Select.Option>
                        <Select.Option key={2} value="Client">Client</Select.Option>
                        <Select.Option key={3} value="External">External</Select.Option>
                    </Select>
                </Col>
                <Col span={4}>
                    <Select 
                        allowClear={true}
                        placeholder='Status'
                        showSearch
                        onChange={(value)=>setSelectedStatus(value)}
                        filterOption={(input, option) =>
                            option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0}
                    >
                        <Select.Option key={1} value="Open">Open</Select.Option>
                        <Select.Option key={2} value="WIP">WIP</Select.Option>
                        <Select.Option key={3} value="Closed">Closed</Select.Option>
                    </Select>
                </Col>
                <Col span={4}><Button type="primary" onClick={exportData}><Icon type="download" />Download Excel</Button></Col>
                <Col span={1}></Col>
                <Col span={6} className='legendSquared'>
                    <p>Issue Type Legend</p><br />
                    <div style={{marginTop:'1rem', display: 'flex'}}> 
                        <div style={{fontSize: '9px', display: 'flex', alignItems: 'center'}}>
                            <span key={1} style={{background: '#F1C40F', color:'white', fontSize: '9px' ,textAlign:'center'}}>4</span>
                            <span>Blocker</span>
                        </div>
                        <div style={{fontSize: '9px', display: 'flex', alignItems: 'center', marginLeft:'12px'}}>
                            <span key={1} style={{background: '#ED7D32', color:'white', fontSize: '9px' ,textAlign:'center'}}>3</span>
                            <span>Critical</span>
                        </div>
                        <div style={{fontSize: '9px', display: 'flex', alignItems: 'center', marginLeft:'12px'}}>
                            <span key={1} style={{background: '#0284E6', color:'white', fontSize: '9px' ,textAlign:'center'}}>2</span>
                            <span>Major</span>
                        </div>
                        <div style={{fontSize: '9px', display: 'flex', alignItems: 'center', marginLeft:'12px'}}>
                            <span key={1} style={{background: '#9DC3E6', color:'white', fontSize: '9px' ,textAlign:'center'}}>1</span>
                            <span>Minor</span>
                        </div>
                    </div> 
                </Col>
            </Row>
            {issueReport ? 
                // <Table 
                //     dataSource={issueReport} 
                //     columns={columns} 
                //     scroll={{ x: '1200px' }}
                //     pagination={{
                //         current: currentPage,
                //         total: pageCount * 10,
                //         onChange: (page) => paginate(page),
                //     }}
                // /> 
                <><DataTable data={issueReport} issueTypeList={issueTypeList}/>
                <Pagination style={{float: 'right', margin: '10px'}} defaultCurrent={currentPage} total={pageCount * 10} onChange={(page) => paginate(page)} /></>
            : LandingContent}
        </Wrapper>
    );
};

const LandingContent = () => {
    return (
        <div className="landing-content mt-5" style={{textAlign: 'center'}}>
            {/* <img src={sales_task} height="200"/> */}
            <h2>No data found</h2>
        </div>
    )
}