import {Button, Divider, Modal, Select, Skeleton, Table, Icon, Spin, Row, Col } from "antd";
import React, {useEffect, useState} from "react";
import {
    TASK_SUMMARY_REPORT,
    TASK_SUMMARY_REPORT_EXPORT,
    ISSUE_REGISTER_LIST,
    ISSUE_REGISTER
} from "../../../scripts/api";
import {alertPop} from "../../../scripts/message";
import {getData} from "../../../scripts/api-service";
import {Flex} from "../../commons/Flex";
import {PageTitle} from "../../commons/PageTitle";
import SearchFilter from "../../commons/SearchFilter";
import {Wrapper} from "../../commons/Wrapper";
import {dateFormat} from "../../../scripts/helper";
// import DataTable from './DataTable';
import sales_task from "../../../assets/icons/test/sales_task_icon.svg";
import moment from "moment";
import IssueRegisterForm from './IssueRegisterForm';
import attachmentIcon from "../../../assets/attached.svg";
import {openAttchment} from "../../../scripts/helper";


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

export default function RegisteredIssues(){
    const [selectedYear, setSelectedYear] = useState(moment().format("YYYY"));
    const [selectedMonth, setSelectedMonth] = useState(moment().format("M"));
    const [generatedReportList, setGeneratedReportList] = useState();
    const [editedData, setEditedData] = useState();
    const [spinner, setSpinner] = useState(false);
    const [searchValue, setSeatch] = useState();
    const [milestoneColor, setMilestoneColor] = useState();
    const [modal, setModal] = useState();
    const [issueRegisterList, setIssueRegisterList] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState();
    const [isIssueUpdate, setIsIssueUpdate] = useState(false);
    const [row, setRow] = useState();
    const [refresh, setRefresh] = useState(false);

    const paginate = (page) => setCurrentPage(page);

    const search = (value) => {
        setSeatch(value);
    };

    const filter = (date) => {
        // setStartFrom(date?.date_from);
        // setEndFrom(date?.date_to);
        // if(date === null) getAllTaskData();
    };

    const calculateTotal = (row, value) =>{
        let sum = 0;
        Object.values(row.dates).forEach(element => {
            if(value === 'Satisfied') sum+= element.S
            if(value === 'Helped') sum+= element.H
            if(value === 'Unsatisfied') sum+= element.U
            if(value === 'Not Reviewed') sum+= element.N
        });
        return sum; 
    }

    const calculateTotalPercenetage = (row, value) =>{
        let singleElementSum = 0;
        let totalSum = 0;
        let percent = 0;
        Object.values(row.dates).forEach(element => {
            if(value === 'Satisfied') singleElementSum+= element.S
            if(value === 'Helped') singleElementSum+= element.H
            if(value === 'Unsatisfied') singleElementSum+= element.U
            if(value === 'Not Reviewed') singleElementSum+= element.N
        });

        Object.values(row.dates).forEach(element => totalSum += element.S + element.H + element.U + element.N)
        
        if(totalSum > 0) return percent = parseInt((singleElementSum/totalSum) * 100) + '%';
        else return 0 + '%';
    }

    const generateData = async () => {
        setSpinner(true);
        let url = TASK_SUMMARY_REPORT + "?";
        if (selectedYear && selectedMonth ) {
            url = url + 'year=' + selectedYear + '&month=' + selectedMonth;
            let res = await getData(url);
            let masterData = res?.data?.data;
            setSpinner(false);
            setGeneratedReportList(masterData);
        }
        else {
            setSpinner(false);
            alertPop("error", "Please select year and month");
        }
    }

    const exportData = async () => {
        let url = TASK_SUMMARY_REPORT_EXPORT + "/";
        if (selectedYear && selectedMonth ) {
            url = url + selectedYear + '/' + selectedMonth;
            let res = await getData(url);
            let masterData = res?.data?.data;
            window.open(masterData);
        }
        else alertPop("error", "Please select year and month");
    }

    const changeSelectedYear = value => {
        setSelectedYear(value);
    }

    const changeSelectedMonth = value => {
        setSelectedMonth(value);
    }

    useEffect(()=>{
        if(generatedReportList){
            let dateArray = generatedReportList.map(row => Object.entries(row.dates).map(data => ({ 
                title: data[0],
                subColumn: Object.keys(data[1]).map(key => ({ title: key, value: data[1][key] }))
            })));
            setEditedData(dateArray[0]);
        }
    },[generatedReportList])

    const getIssueRegisterList = async () => {
        let res = await getData(ISSUE_REGISTER_LIST + `?page=${currentPage}`);

        if (res) {
            let masterData = res?.data?.data?.data;
            setPageCount(res?.data?.data?.last_page);
            setIssueRegisterList(masterData);
        }
    }

    const findRowData = async (id) => {
        let res = await getData(ISSUE_REGISTER + `/${id}`);

        if (res) {
            let masterData = res?.data?.data;
            setRow(masterData);
        }
    }

    useEffect(()=>{
        generateData();
        getIssueRegisterList();
    },[]);

    useEffect(()=>{
        getIssueRegisterList();
    },[refresh, currentPage]);

    const columns = [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: 'Issued Type User',
          dataIndex: 'issued_user_type',
          key: 'issued_user_type',
        },
        {
          title: 'Issue Type',
          dataIndex: 'issue_type.name',
          key: 'issue_type',
        },
        {
          title: 'Priority',
          dataIndex: 'priority',
          key: 'priority',
        },
        {
          title: 'Reported Date',
          dataIndex: 'reported_date',
          key: 'reported_date',
        },
        {
          title: 'Due Date',
          dataIndex: 'due_date',
          key: 'due_date',
        },
        {
          title: 'Complete Date',
          dataIndex: 'complete_date',
          key: 'complete_date',
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
        },
        {
            title: 'Attachment',
            key: 'attachment',
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
            width: '12%'
        },
        {
            title: "Action",
            key: "action",
            render: (row) =><><Button type="link" onClick={() => {
                setModal(true); 
                setIsIssueUpdate(true);
                findRowData(row?.id);
            }}>Edit</Button></>,
        },
      ];

    return (
        <Wrapper >
            <SearchFilter
                search={search}
                filter={filter}
                filterOptions={false}
                failsafe
            />
            <Row gutter={4} style={{margin:'1rem', display:'flex', alignItems:'center'}}>
                <Col span={7}>
                    <Button 
                        onClick={() => {
                            setModal(true);
                            setIsIssueUpdate(false);
                        }}
                        width="40%" type="primary">
                            Create New HR Issue Register
                    </Button>
                </Col>
            </Row>
                {issueRegisterList ? 
                    <Table 
                        dataSource={issueRegisterList} 
                        columns={columns} 
                        scroll={{y: 1500}}
                        pagination={{
                            current: currentPage,
                            total: pageCount * 10,
                            onChange: (page) => paginate(page),
                        }}
                    /> 
                : null}

            <Modal
                destroyOnClose={true}
                title={[
                    <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'baseline'}}>
                        <span>Create New Issue Register</span>
                    </div>,
                ]}
                centered
                visible={modal}
                width="75vw"
                onCancel={() => setModal(false)}
                footer={false}
            >
                <IssueRegisterForm setModal={setModal} register='issue' isIssueUpdate={isIssueUpdate} setRefresh={setRefresh} refresh={refresh} rowData={row}/>
            </Modal>

        </Wrapper>
    );
};

const LandingContent = () => {
    return (
        <div className="landing-content mt-5" style={{textAlign: 'center'}}>
            <img src={sales_task} height="200"/>
            <h2>No data found for the selected year or month.</h2>
        </div>
    )
}