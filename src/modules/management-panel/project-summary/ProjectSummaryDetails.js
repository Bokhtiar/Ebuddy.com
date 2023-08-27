import React, {useEffect, useState} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import {Select, Table, Button, Row, Col, Modal,Icon,Dropdown,Menu,Badge, PageHeader, Tag, Progress} from "antd";
import {Wrapper} from "../../commons/Wrapper";
import {getData} from "../../../scripts/api-service";
import {  PROJECT_LIST_BY_KAM, MILESTONE_STATUS_LIST, REVIEW_STATUS_LISTVIEW} from "../../../scripts/api";
import ProjectProgress from './ProjectProgress'
import MilestoneTimeline from './MilestoneTimeline'
import sales_task from "../../../assets/icons/test/sales_task_icon.svg";
import attachmentIcon from "../../../assets/attached.svg";
import {openAttchment, dateCheck} from "../../../scripts/helper";
import {getProgress, doneMilestone, wipMilestone, declinedMilestone, getDuePayment, holdMilestone,
    reviewedCount, next6_10_days, next1_5_days, DateOver, billesTotal} from "./helper";

export default function ProjectSummaryDetails() {
    const [project, setProeject] = useState();
    const [ projectId, setProjectId] = useState();
    const [ departmentId, setDepartmentId] = useState();
    const [ kamId, setKamId] = useState();
    const [ milestoneStatus, setMilestoneStatus] = useState();
    const [reviewLagent, setReviewLagent] = useState([]);
    const history = useHistory();
    let { id } = useParams();

    const getProjectMilestone = async () => {
        let res = await getData(PROJECT_LIST_BY_KAM + '?project_id=' + projectId);

        if (res) {
            let master = res.data.data.data[0];

            setProeject(master)
        }
    }

    const reviewLegendCounter = (legendName) => {
        if(legendName === 'Unsatisfied') return reviewedCount(project?.milestones, 'Unsatisfied');
        if(legendName === 'Helped') return reviewedCount(project?.milestones, 'Helped');
        if(legendName === 'Satisfied') return reviewedCount(project?.milestones, 'Satisfied');
    }

    const milestoneLegendCounter = (legendName) => {
        if(legendName === 'DONE') return doneMilestone(project?.milestones);
        if(legendName === 'WIP') return wipMilestone(project?.milestones);
        if(legendName === 'HOLD') return holdMilestone(project?.milestones);
        if(legendName === 'DECLINED') return declinedMilestone(project?.milestones);
    }

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

    useEffect(() => {
        getMilestoneStatus();
        getMilestoneReviewList();
    }, [])

    useEffect(() => {
        let projectId = id?.substring(0, id?.indexOf("&d="));
        let departmentId = id?.substring(id?.indexOf("&d="), id?.indexOf("&k=")).slice(3);
        let kamId = id?.substring(id?.indexOf("&k=")).slice(3);
        setProjectId(projectId);
        setDepartmentId(departmentId);
        setKamId(kamId);
    }, [id]);

    useEffect(() => {
        if (projectId) getProjectMilestone();
    }, [projectId])

    const columns = [
        {
            title: "MILESTONE NAME",
            render: (milestone, row) => (
                // <div style={{color:`${dateCheck(row.actual_end_date)}`}}>
                //     <Badge color={dateCheck(row.actual_end_date) === 'black' ? 'transparent' : dateCheck(row.actual_end_date)}/>
                //     {row?.milestone.full_name || <p></p>} 
                // </div>
                <Link target="_blank" to={'/management-panel/task-details?milestone=' + milestone?.milestone_id + '&projectId=' + row?.project_id + `&empId=${kamId}&department=${departmentId}`} style={{textDecoration: 'underline', color:'#5BB7FF'}}>
                    <span style={{fontSize: '11px'}}>{milestone?.milestone?.full_name}</span>
                </Link>
                
            ),   
            key: "milestone_id"
        },
        {
            title: "PLAN START DATE",
            render: (mile) => (
                <div style={{color: dateCheck(mile?.plan_end_date, mile?.milestone_status?.id)}}>
                    <p style={{fontSize: '11px'}}>{mile.plan_start_date || ''}</p>
                </div>
            ),
            key: "plan_start"
        },
        {
            title: "PLAN END DATE",
            render: (mile) => (
                <div style={{color: dateCheck(mile?.plan_end_date, mile?.milestone_status?.id)}}>
                    <p style={{fontSize: '11px'}}>{mile?.plan_end_date || ''}</p>
                </div>
            ),
            key: "plan_end_date"
        },
        {
            title: "ACTUAL START DATE",
            render: (mile) => (
                <div style={{color: dateCheck(mile?.plan_end_date, mile?.milestone_status?.id)}}>
                    <p style={{fontSize: '11px'}}>{mile?.actual_start_date || ""}</p>
                </div>
            ),
            key: "actual_start_date"
        },
        {
            title: "ACTUAL END DATE",
            render: (mile) => (
                <div style={{color: dateCheck(mile?.plan_end_date, mile?.milestone_status?.id)}}>
                    <p style={{fontSize: '11px'}}>{mile?.actual_end_date || ""}</p>
                </div>
            ),
            key: "actual_end_date"
        },
        {
            title: "STATUS",
            key: "status",
            render: (milestone) => (
                <>
                    {
                        milestone?.milestone_status?.name ? 
                        <Tag color={milestone?.milestone_status?.color} style={{fontSize: '11px'}}>{milestone?.milestone_status?.name}</Tag> : ''
                    }
                    
                </>
            ),
            width:'10%'
        },
        {
            title: "PAYMENT",
            dataIndex: 'payment',
            render: (payment) => (
                <div>
                    <p style={{fontSize: '11px'}}>{payment || ''}</p>
                </div>
            ),
            key: "payment"
        },
        {
            title: "PAYMENT STATUS",
            dataIndex: 'payment_status',
            render: (payment_status) => (
                <div>
                    <p style={{fontSize: '11px'}}>{payment_status?.name || ''}</p> 
                </div>
            ),
            key: "payment_status"
        },
        {
            title: "Supervisor Review",
            dataIndex: 'milestone_review',
            key: "milestone_review.id",
            render: (review) => (
                <div >
                    { review?.name ? <Tag color={review.color} style={{fontSize: '11px'}}>{review?.name}</Tag> : '' }
                </div>
            ),
            width:'10%'
        },
        {
            title: "ATTACHMENT",
            dataIndex: 'attachment',
            render: (attachment) => 
            <>
                {attachment ? 
                    <img 
                        src={attachmentIcon} 
                        alt="attachement" 
                        style={{ width:'1.5rem' }} 
                        onClick={() => {openAttchment(attachment)}}
                    />: <p></p>    
                }
            </>,
            key: "attachment",
        },
    ];

    return (
        <>
        <Wrapper>
            <PageHeader
                style={{
                border: '1px solid rgb(235, 237, 240)',
                }}
                onBack={() => history.push('/management-panel/project-summary' + "/" + departmentId + "&kam=" + kamId)}
                backIcon={<Icon type="left" />}
                title={`Project Name: ${project?.name}`}
            />
            <>
                <Row gutter={32} style={{margin: '10px'}}>
                    <Col span={5} className='legendSquared'>
                        <p style={{margin: '0px', fontSize: '11px'}}>Milestone Legend</p><br />
                        <div style={{marginTop:'1rem'}} className='legendFont'> 
                            {
                                milestoneStatus && milestoneStatus.map((data)=>{
                                    return(
                                        <>
                                            <div style={{fontSize: '9px', display: 'flex', alignItems: 'center', margin: "10px 0px"}}>
                                                <span key={data.id} style={{background: data.color, color:'white', fontSize: '9px' ,textAlign:'center'}}>{milestoneLegendCounter(data.name)}</span>
                                                <p>{data.name}</p>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                        {/* <div style={{display:'flex'}}>  */}
                        {/* {
                            allData && allData?.milestone_legend.map((data)=>{
                                return(
                                    <>
                                        <p>
                                            <span key={data.id} style={{background: data.color}}></span>
                                            {data.name}
                                        </p>
                                    </>
                                )
                            })
                        } */}
                        {/* <Tag color="#AADE41" style={{textAlign:'center', height: '50px'}}>
                            <p style={{margin:'0px'}}>Done</p>
                            <hr style={{width:'100%', border:'1px solid #EEEEEE'}}/>
                            <p style={{margin:'0px'}}>{doneMilestone(project?.milestones)}</p>
                        </Tag>
                        <Tag color="#F7DB0F" style={{textAlign:'center', height: '50px'}}>
                            <p style={{margin:'0px'}}>WIP</p>
                            <hr style={{width:'100%', border:'1px solid #EEEEEE'}}/>
                            <p style={{margin:'0px'}}>{wipMilestone(project?.milestones)}</p>
                        </Tag>
                        <Tag color="#EC8A23" style={{textAlign:'center', height: '50px'}}>
                            <p style={{margin:'0px'}}>Hold</p>
                            <hr style={{width:'100%', border:'1px solid #EEEEEE'}}/>
                            <p style={{margin:'0px'}}>{holdMilestone(project?.milestones)}</p>
                        </Tag>
                        <Tag color="#E62E2D" style={{textAlign:'center', height: '50px'}}>
                            <p style={{margin:'0px'}}>Declined</p>
                            <hr style={{width:'100%', border:'1px solid #EEEEEE'}}/>
                            <p style={{margin:'0px'}}>{declinedMilestone(project?.milestones)}</p>
                        </Tag> */}
                        
                        {/* </div>  */}
                    </Col>
                    <Col span={5} className='legendBordered'>
                        <p style={{margin: '0px', fontSize: '11px'}}>Review Legend</p><br />
                        <div style={{marginTop:'1rem'}} className='legendFont'>
                            {
                                reviewLagent?.length && reviewLagent.map((data)=>{
                                    return(
                                        <div style={{fontSize: '9px', display: 'flex', alignItems: 'center', margin: "10px 0px"}}>
                                            <span key={data.id} style={{ border: `1.5px solid ${data.color}`, color: data.color, fontSize: '9px', textAlign:'center'}}>{reviewLegendCounter(data.name)}</span>
                                            <span>{data.name}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {/* <div style={{display:'flex'}}>
                            <Tag color="#A0D914" style={{textAlign:'center', height: '50px'}}>
                                <p style={{margin:'0px'}}>Satisfied</p>
                                <hr style={{width:'100%', border:'1px solid #EEEEEE'}}/>
                                <p style={{margin:'0px'}}>{reviewedCount(project?.milestones, 'Satisfied')}</p>
                            </Tag>
                            <Tag color="#EE9B36" style={{textAlign:'center', height: '50px'}}>
                                <p style={{margin:'0px'}}>Helped</p>
                                <hr style={{width:'100%', border:'1px solid #EEEEEE'}}/>
                                <p style={{margin:'0px'}}>{reviewedCount(project?.milestones, 'Helped')}</p>
                            </Tag>
                            <Tag color="#E62E2D" style={{textAlign:'center', height: '50px'}}>
                                <p style={{margin:'0px'}}>Unsatisfied</p>
                                <hr style={{width:'100%', border:'1px solid #EEEEEE'}}/>
                                <p style={{margin:'0px'}}>{reviewedCount(project?.milestones, 'Unsatisfied')}</p>
                            </Tag>
                        </div> */}
                    </Col>
                    <Col span={6}>
                        <p style={{margin: '0px', fontSize: '11px'}}>Milestone Date Color Legend</p><br />
                        <div style={{display:'flex', alignItems: 'baseline'}}>
                            <Badge color="#54a0ff"/>
                            <div style={{marginRight :'10px', display:'flex'}}>
                                <p style={{color: '#54a0ff', width: '80px', fontSize: '9px'}}>Next 6-10 days</p>
                                <p style={{color: '#54a0ff',  fontSize: '9px'}}>{next6_10_days(project?.milestones)}</p>
                            </div>
                        </div>
                        <div style={{display:'flex', alignItems: 'baseline'}}>
                            <Badge color="#5f27cd"/>
                            <div style={{marginRight :'10px', display:'flex'}}>
                                <p style={{color: '#5f27cd', width: '80px', fontSize: '9px'}}>Next 1-5 days</p>
                                <p style={{color: '#5f27cd', fontSize: '9px'}}>{next1_5_days(project?.milestones)}</p>
                            </div>
                        </div>
                        <div style={{display:'flex', alignItems: 'baseline'}}>
                            <Badge color="#ee5253" />
                            <div style={{marginRight :'10px', display:'flex'}}>
                                <p style={{color: '#ee5253', width: '80px', fontSize: '9px'}}>Date Over</p>
                                <p style={{color: '#ee5253',  fontSize: '9px'}}>{DateOver(project?.milestones)}</p>
                            </div>
                        </div> 
                    </Col>

                    <Col span={6}>
                        <p style={{margin: '0px', fontSize: '11px'}}>Payment Status</p><br />
                        <div style={{display:'flex', alignItems: 'center'}}>
                            <div style={{marginRight: '20px', border: '2px solid gray', borderRadius: '5px'}}>
                                <p style={{padding: '5px', margin: '0px', fontSize: '9px', textAlign:'center'}}>Value</p>
                                <hr style={{width:'60px', border:'1px solid gray'}}/>
                                <p style={{color: 'blue', padding: '5px', margin: '0px', fontSize: '9px', textAlign:'center'}}>{project?.value || 0}</p>
                            </div>
                            <div style={{marginRight: '20px', border: '2px solid gray', borderRadius: '5px'}}>
                                <p style={{padding: '5px', margin: '0px', fontSize: '9px', textAlign:'center'}}>Billed</p>
                                <hr style={{width:'60px', border:'1px solid gray'}}/>
                                <p style={{color: 'green', padding: '5px', margin: '0px', fontSize: '9px', textAlign:'center'}}>{billesTotal(project?.milestones)}</p>
                            </div>
                            <div style={{marginRight: '20px', border: '2px solid gray', borderRadius: '5px'}}>
                                <p style={{padding: '5px', margin: '0px',fontSize: '9px', textAlign:'center'}}>Due/Extra</p>
                                <hr style={{width:'60px', border:'1px solid gray'}}/>
                                <p style={{color: 'red', padding: '5px', margin: '0px', fontSize: '9px', textAlign:'center'}}>{getDuePayment(project)}</p>
                            </div>
                            <Progress type="circle" percent={parseInt(getProgress(project?.milestones))} width={40} />
                        </div>
                    </Col>
                </Row>
                <Table bordered 
                    dataSource={project?.milestones || []} 
                    columns={columns}
                    scroll={{ y: "calc(100vh - 20rem)" }}
                    pagination={false} 
                />
                <Row gutter={32} style={{margin: '10px'}}>
                    <Col span={10}>
                        <ProjectProgress 
                            milestoneList={project?.milestones}
                        />
                    </Col>
                    <Col span={11}>
                        <MilestoneTimeline 
                            milestoneList={project?.milestones}
                        />
                    </Col>
                </Row>
            </>
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