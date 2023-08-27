import React, {useEffect, useState} from 'react'
import {Select, Table, Tag, Row, Col, Modal,Icon,Dropdown,Menu,Badge } from "antd";
import SearchFilter from "../../commons/SearchFilter";
import {TableWrapper,Wrapper} from "../../commons/Wrapper";
import {Flex} from "../../commons/Flex";
import {getData, postData} from "../../../scripts/api-service";
import {
    KAM_TARGET_PARAM, 
    MILESTONE_STATUS_LIST,
    REVIEW_STATUS_LISTVIEW,
    DEPARTMENT_LIST,
    PROJECT_MILESTONE_SEARCH
} from "../../../scripts/api";

import attachmentIcon from "../../../assets/attached.svg";
import {openAttchment, dateCheck} from "../../../scripts/helper";

import ProjectProgress from './ProjectProgress'
import MilestoneTimeline from './MilestoneTimeline'
import './Legend.css';
import sales_task from "../../../assets/icons/test/sales_task_icon.svg";
import {alertPop} from "../../../scripts/message";

export default function ProjectReview() {
    const [pageCount, setPageCount] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [tableData, setTableData] = useState(false);
    const [searchValue, setSearchValue] = useState();
    const [milestoneStatus, setMilestoneStatus] = useState([]);
    const [reviewLagent, setReviewLagent] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [industry, setIndustry] = useState([])
    const [dateRange, setDateRange] = useState();
    const [selectDepatrment, setSelectDetartment] = useState();
    const [selectIndustry, setSelectIndustry] = useState();
    const [selectMileView, setSelectMileView] = useState();
    const [selectMileReview, setSelectMileReview] = useState();

    const paginate = (page) => setCurrentPage(page);
    const search = (value) => {
        setSearchValue(value);
    };

    const filter = (date) => {
        setDateRange({start: date?.date_from, end: date?.date_to});
    };

    const getMilestoneStatus = async () => {
        let res = await getData(MILESTONE_STATUS_LIST);

        if (res) {
            let masterData = res?.data?.data;
            setMilestoneStatus(masterData);
        }
    }

    const getMilestoneReviewList = async () => {
        let res  = await getData(REVIEW_STATUS_LISTVIEW);

        if (res) {
            let masterData = res.data.data;
            setReviewLagent(masterData);
        }
    }

    const getDepartments = async () => {
        let res  = await getData(DEPARTMENT_LIST);

        if (res) {
            let masterData = res.data.data;
            setDepartments(masterData);
        }
    }

    const getKamList = async () => {
        let res = await getData(KAM_TARGET_PARAM);

        if (res) {
            let masterData = res?.data?.data;
            setIndustry(masterData.industry_type);
        }
    }

    const getProjectMilestone = async () => {
        let query = {
            paginate: true
        };

        if (dateRange && dateRange?.start && dateRange?.end) {
            query.from_date = dateRange?.start;
            query.to_date = dateRange?.end;
        };

        if (currentPage) query.page = currentPage;
        if (searchValue) query.search = searchValue;
        if (selectMileView) query.milestone_view = selectMileView;
        if (selectDepatrment) query.kam_department_id = selectDepatrment;
        if (selectIndustry) query.industry_type_id = selectIndustry;
        if (selectMileReview) query.milestone_review_ids = selectMileReview;

        let res = await postData(PROJECT_MILESTONE_SEARCH, query);

        if (res) {
            let masterData = res?.data?.data;
            setTableData(masterData.data);
            setPageCount(masterData.last_page)
        }
    }

    const selMilestoneReview = (value) => {
        let str = value.toString();
        setSelectMileReview(str);
    }

    useEffect(() => {
        getDepartments()
        getMilestoneStatus();
        getMilestoneReviewList();
        getKamList()
    }, [])

    useEffect(() => {
        getProjectMilestone()
    }, [currentPage, searchValue, dateRange, selectDepatrment, selectIndustry, selectMileView, selectMileReview])

    const columns = [
        {
            title: "Client",
            render: (row) => (
                <div>
                    <p>{row?.client_name}</p>
                    <small>{row?.industry_sector?.name}</small>
                    <p>{row?.industry_type?.name}</p>
                </div>
            ),
            width: 150,
        },
        {
            title: "Project & Description",
            render: (row) => (
                <div>
                    <p>{row?.project_name}</p>
                    <small>{row?.project_description}</small>
                    <p>Value - {row?.project_value}</p>
                </div>
            ),
            width: 200,
        },
        {
            title: "MILESTONE NAME",
            dataIndex: "milestone",
            key: "milestone.full_name"
        },
        {
            title: "PLAN START DATE",
            render: (row) => (
                <div style={{color:`${dateCheck(row.plan_end_date, row?.milestone_status_id)}`}}>
                    <Badge color={dateCheck(row.plan_end_date, row?.milestone_status_id) === 'black' ? 'transparent' : dateCheck(row.plan_end_date)}/>
                    {row?.plan_start_date || <p></p>}
                </div>
            ),
            key: "plan_start_date",
            width: '9%',
        },
        {
            title: "PLAN END DATE",
            render: (row) => (
                <div style={{color:`${dateCheck(row.plan_end_date, row?.milestone_status_id)}`}}>
                    <Badge color={dateCheck(row.plan_end_date, row?.milestone_status_id) === 'black' ? 'transparent' : dateCheck(row.plan_end_date)}/>
                    {row?.plan_end_date || <p></p>}
                </div>
            ),
            key: "plan_end_date",
            width: '9%',
        },
        {
            title: "ACTUAL START DATE",
            render: (row) => (
                <div style={{color:`${dateCheck(row.plan_end_date, row?.milestone_status_id)}`}}>
                    {row?.actual_start_date ? <Badge color={dateCheck(row.plan_end_date, row?.milestone_status_id) === 'black' ? 'transparent' : dateCheck(row.plan_end_date)}/> : ''}
                    {row?.actual_start_date || ''}
                </div>
            ),
            key: "actual_start_date",
            width: '9%',
        },
        {
            title: "ACTUAL END DATE",
            render: (row) => (
                <div style={{color:`${dateCheck(row.plan_end_date, row?.milestone_status_id)}`}}>
                    {row?.actual_end_date ? <Badge color={dateCheck(row.plan_end_date, row?.milestone_status_id) === 'black' ? 'transparent' : dateCheck(row.plan_end_date)}/> : ''}
                    {row?.actual_end_date || ''} 
                </div>
            ),
            key: "actual_end_date",
            width: '9%',
        },
        {
            title: "STATUS",
            key: "milestone_status.name",
            render: (row) => (
                <div>
                    {
                        row.milestone_status && <Tag color={row.milestone_status_color}>
                            {row.milestone_status}</Tag>
                    }
                </div>
            ),
        },
        {
            title: "ATTACHMENT",
            render: (row) => 
            <>
            {row.attachment ? 
                <img 
                    src={attachmentIcon} 
                    alt="attachement" 
                    style={{ marginTop: '-3px', width:'1.5rem'}} 
                    onClick={() => {openAttchment(row.attachment)}}
                />: ''   
            }    
            </>,
            key: "attachment",
        },
        {
            title: "PAYMENT",
            render: (row) => (
                <div>
                    {row?.payment || ''} 
                </div>
            ),
            key: "payment"
        },
        {
            title: "PAYMENT STATUS",
            render: (row) => (
                <div>
                    {row?.payment_status || <p></p>} 
                </div>
            ),
            key: "payment_status.name"
        },
        {
            title: "Review",
            key: "action",
            render: (row) => (
                <div>
                    {row.review_status && <Tag color={row.review_status_color}>{row.review_status}</Tag>}
                </div>
            ),
        },
    ];

    return (
        <>
        <Wrapper>
            <div style={{width: "96%"}}>
                <SearchFilter
                    search={search}
                    filter={filter}
                    filterOptions={[{type: "date_range"}]}
                    failsafe
                />
            </div>
            

            <Flex space="1rem" justify="normal">
                <Select 
                    allowClear={true}
                    style={{width: '20%', 'marginRight': '1rem'}} 
                    showSearch
                    placeholder='Select Department'
                    filterOption={(input, option) =>
                    option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    onChange={value => setSelectDetartment(value)}
                >
                    {
                        departments?.length ? 
                            departments.map(dep => <Select.Option value={dep.id} key={dep.id}>{dep.name}</Select.Option>) : ''
                    }
                </Select>

                <Select 
                    allowClear={true}
                    style={{width: '20%', 'marginRight': '1rem'}} 
                    showSearch
                    placeholder='Select Industry'
                    filterOption={(input, option) =>
                    option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    onChange={value => {setSelectIndustry(value);}}
                >
                    {
                        industry?.length ? 
                        industry.map(dep => <Select.Option value={dep.id} key={dep.id}>{dep.name}</Select.Option>) : ''
                    }
                </Select>
                <Select 
                    mode="multiple"
                    style={{width: '25%', 'marginRight': '1rem'}} 
                    showSearch
                    placeholder='Review'
                    filterOption={(input, option) =>
                    option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    onChange={selMilestoneReview}
                >
                    {reviewLagent && reviewLagent.length
                        ? reviewLagent.map((data) => {
                            return (
                            <Select.Option 
                                key={data.id} 
                                value={data.id}
                            >
                                {data.name}
                            </Select.Option>
                            );
                        }) : ""
                    }
                </Select>

                <Select 
                    allowClear={true}
                    style={{width: '20%', 'marginRight': '1rem'}} 
                    showSearch
                    placeholder='Select Milestone View'
                    filterOption={(input, option) =>
                    option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    onChange={value => {setSelectMileView(value)}}
                >
                    <Select.Option value="all">All</Select.Option>
                    <Select.Option value="today">Today Deadline</Select.Option>
                    <Select.Option value="missed">Already Missed Deadline</Select.Option>
                </Select>
            </Flex>
                    <Row gutter={32} style={{margin: '10px'}}>
                        <Col span={8} className='legendSquared'>
                            <p style={{margin: '0px', fontSize: '11px'}}>Milestone Legend</p><br />
                            <div style={{marginTop:'1rem'}} className='legendFont'> 
                                {
                                    milestoneStatus && milestoneStatus.map((data)=>{
                                        return(
                                            <>
                                                <div style={{fontSize: '9px', display: 'flex', alignItems: 'center', margin: "10px 0px"}}>
                                                    <span key={data.id} style={{background: data.color, color:'white', fontSize: '9px' ,textAlign:'center'}}>
                                                        {/* {milestoneLegendCounter(data.name)} */}
                                                    </span>
                                                    <p>{data.name}</p>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </Col>
                        <Col span={8}>
                            <p style={{margin: '0px', fontSize: '11px'}}>Milestone Date Color Legend</p><br />
                            <div style={{display:'flex', alignItems: 'baseline'}}>
                                <Badge color="#54a0ff"/>
                                <div style={{marginRight :'10px', display:'flex'}}>
                                    <p style={{color: '#54a0ff', width: '80px', fontSize: '9px'}}>Next 6-10 days</p>
                                    {/* <p style={{color: '#54a0ff',  fontSize: '9px'}}>{next6_10_days(project?.milestones)}</p> */}
                                </div>
                            </div>
                            <div style={{display:'flex', alignItems: 'baseline'}}>
                                <Badge color="#5f27cd"/>
                                <div style={{marginRight :'10px', display:'flex'}}>
                                    <p style={{color: '#5f27cd', width: '80px', fontSize: '9px'}}>Next 1-5 days</p>
                                    {/* <p style={{color: '#5f27cd', fontSize: '9px'}}>{next1_5_days(project?.milestones)}</p> */}
                                </div>
                            </div>
                            <div style={{display:'flex', alignItems: 'baseline'}}>
                                <Badge color="#ee5253" />
                                <div style={{marginRight :'10px', display:'flex'}}>
                                    <p style={{color: '#ee5253', width: '80px', fontSize: '9px'}}>Date Over</p>
                                    {/* <p style={{color: '#ee5253',  fontSize: '9px'}}>{DateOver(project?.milestones)}</p> */}
                                </div>
                            </div> 
                        </Col>
                        <Col span={8} className='legendBordered'>
                            <p style={{margin: '0px', fontSize: '11px'}}>Review Legend</p><br />
                            <div style={{marginTop:'1rem'}} className='legendFont'>
                                {
                                    reviewLagent?.length && reviewLagent.map((data)=>{
                                        return(
                                            <div style={{fontSize: '9px', display: 'flex', alignItems: 'center', margin: "10px 0px"}}>
                                                <span key={data.id} style={{ border: `1.5px solid ${data.color}`, color: data.color, fontSize: '9px', textAlign:'center'}}>
                                                    {/* {reviewLegendCounter(data.name)} */}
                                                </span>
                                                <span>{data.name}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Col>
                    </Row>
                    <div style={{width: "95%"}}>
                        <Table bordered 
                            dataSource={tableData} 
                            columns={columns}
                            // scroll={{ x: 900, y: "calc(100vh - 20rem)" }}
                            scroll={{x: 1500, y: "calc(100vh - 22rem)"}}
                            pagination={{
                                current: currentPage,
                                total: pageCount * 10,
                                onChange: (page) => paginate(page),
                            }}
                        />
                    </div>
                    
                    
                    {/* </>
                ):<LandingContent />
            } */}
        </Wrapper>
        </>
    )
}

const LandingContent = () => {
    return (
        <div className="landing-content mt-5" style={{textAlign: 'center'}}>
            <img src={sales_task} height="200"/>
            <h2>Please Select KAM And Project To Generate Data</h2>
        </div>
    )
}