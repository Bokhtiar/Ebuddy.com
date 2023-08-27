import React, {useEffect, useState} from 'react'
import {Select, Table, Button, Row, Col, Modal,Icon,Dropdown,Menu,Badge } from "antd";
import SearchFilter from "../../commons/SearchFilter";
import {TableWrapper,Wrapper} from "../../commons/Wrapper";
import {Flex} from "../../commons/Flex";
import {getData, postData} from "../../../scripts/api-service";
import {
    MILESTONE_REVIEW_LIST, 
    SUPERVISOR_KAM_LIST,
    KAM_PROJECT_LIST,
    MILESTONE_STATUS_UPDATE,
    MILESTONE_REVIEW_UPDATE,
    PROJECT_MILESTONE_ATTACHMENT_UPLOAD
} from "../../../scripts/api";

import attachmentIcon from "../../../assets/attached.svg";
import {openAttchment, dateCheck} from "../../../scripts/helper";

import ProjectProgress from './ProjectProgress'
import MilestoneTimeline from './MilestoneTimeline'
import './Legend.css';
import sales_task from "../../../assets/icons/test/sales_task_icon.svg";
import {alertPop} from "../../../scripts/message";

export default function MilestoneReview() {
    let searchUrl = window.location.search;
    let params = new URLSearchParams(searchUrl);
    let paramsKam = params.get('kam');
    let kamId = paramsKam ? paramsKam * 1 : undefined;
    let paramsProjectId = params.get('projectId');
    let projectId = paramsProjectId ? paramsProjectId * 1 : undefined;

    const [pageCount, setPageCount] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [visible, setVisible] = useState(false);
    const [tableData, setTableData] = useState(false);
    const [kAMList, setKAMList] = useState();
    const [projectList, setProjectList] = useState();
    const [searchValue, setSearchValue] = useState();
    const [startFrom, setStartFrom] = useState();
    const [endFrom, setEndFrom] = useState();
    const [projectID, setProjectID] = useState();
    const [selectedAssigneeId, setSelectedAssigneeId] = useState();
    const [fileUpload, setFileUpload] = useState();
    const [allData, setAllData] = useState();
    const [taskId, setTaskId] = useState();
    const [milestoneSelectedLegendMenu, setMilestoneSelectedLegendMenu] = useState('To-Do');
    const [milestoneSelectedReviewMenu, setMilestoneSelectedReviewMenu] = useState('To-Do');
    // const [attachementRequired, setAttachementRequired] = useState();
    // const [attachmentCheck, setAttachmentCheck] = useState();

    
    const search = (value) => {
        setSearchValue(value);
    };

    const filter = (date) => {
        setStartFrom(date?.date_from);
        setEndFrom(date?.date_to);
        // if(date === null) getAllTaskData();
    };

    const getKAMList = async () => {
        let res = await getData(SUPERVISOR_KAM_LIST);

        if (res) {
            let masterData = res?.data?.data;
            setKAMList(masterData);
        }
    }

    const getProjectList = async () => {
        let url = KAM_PROJECT_LIST;
        if(selectedAssigneeId) url = url + '?emp_id=' + selectedAssigneeId;
        if(kamId) url = url + '?emp_id=' + kamId;

        let res = await getData(url);

        if (res) {
            let masterData = res?.data?.data;
            setProjectList(masterData);
        }
    }

    const getMilestoneReview = async () => {
        let url = MILESTONE_REVIEW_LIST + "?";

        // if (projectID) url = url + 'project_id=' + projectID;
        // if (startFrom && endFrom ) url = url + '&from_date=' + startFrom + '&to_date=' + endFrom;
        // if (searchValue) url = url + '&search=' + searchValue;

        let res = await getData(url);

        if (res) {
            let masterData = res?.data?.data;
            // const milestoneData = masterData?.milestone?.data;
            // setTableData(milestoneData);
            setAllData(masterData);
        }
    }

    const getMilestoneList = async () => {
        let url = MILESTONE_REVIEW_LIST + "?paginate=0";

        if (projectID) url = url + '&project_id=' + projectID;
        if (projectId) url = url + '&project_id=' + projectId;
        if (startFrom && endFrom ) url = url + '&from_date=' + startFrom + '&to_date=' + endFrom;
        if (searchValue) url = url + '&search=' + searchValue;

        let res = await getData(url);

        if (res) {
            let masterData = res?.data?.data;
            const milestoneData = masterData?.milestone;
            setTableData(milestoneData);
        }
    }

    const updateMilestoneStatus = async (value,id) => {
        const reviewData = {
            milestone_status_id: value
        }
        let res = await postData(`${MILESTONE_STATUS_UPDATE}${id}`,reviewData);
        if (res) {
            let masterData = res?.data?.data;
            getMilestoneList();
            alertPop("success", "Successfully complete the process");
        }
    }

    const updateMilestoneReview = async (value,id) => {
        const reviewData = {
            review_status_id: value
        }
        let res = await postData(`${MILESTONE_REVIEW_UPDATE}${id}`,reviewData);
        if (res) {
            let masterData = res?.data?.data;
            getMilestoneList();
            alertPop("success", "Successfully complete the process");
        }
    }

    const showModal = (event, row) =>{
        setVisible(true)
    } 

    const handleOk = e => {
        setVisible(false)
    };

    const handleCancel = e => {
        setVisible(false)
    };

    const selectKAM = (value) => {
        setSelectedAssigneeId(value);
        setProjectID();
    }

    const projectFilter = (value) => {
        setProjectID(value);
    }

    let image = ''
    const fileUploadHandler = async (event) =>{
        let value = event.target.files[0];
        document.getElementById('attachemnt-name').innerHTML=value.name;
        image = value;
    }

    const updateMilestoneStatusModal = async() => {
        const formData = new FormData();
        formData.append("file", image);

        let response = await postData(
            PROJECT_MILESTONE_ATTACHMENT_UPLOAD + taskId,
            formData
        );
        
        if (response) {
            let masterData = response.data.data;
            alertPop("success", "Successfully complete the process");
            if (masterData) {
                //to do
            }
            getMilestoneList();
        }
        document.getElementById('attachemnt-name').innerHTML=null;
        setTaskId();
        handleCancel();
    }

    // const handleButtonClick = (type) => {
    //     showModal(visible);
    // }

    const handleMilestoneLegend = async(value,row) => {
        let attachementRequired = ''
        let attachmentCheck = ''
        setTaskId(row.id);
        allData.milestone.data.map(milestone=>{
            if(milestone.id === row.id){
                attachementRequired = milestone.attachment_required
            }
        })
        allData.milestone_legend.map(legend=>{
            if(legend.id === value){
                attachmentCheck = legend.attachment_check
            }
        })
        if( attachementRequired && attachmentCheck){
            await showModal(visible);
            if(!visible) updateMilestoneStatus(value,row.id);
        }
        else{
            updateMilestoneStatus(value,row.id);
        }
    }

    const handleMilestoneReview = (value,id) => {
        updateMilestoneReview(value,id);
    }

    const handleReviewMenuClick = ({key}) => {
        setMilestoneSelectedReviewMenu(key)
    }

    const paginate = (page) => setCurrentPage(page);

    useEffect(() => {
        getKAMList();
        getMilestoneReview();
    }, [])

    // useEffect(() => {
    //     if (projectId && kamId) {
    //         setSelectedAssigneeId(kamId);
    //         setProjectID(projectId);
    //     }
    // }, [projectId, kamId])

    useEffect(() => {
        if(selectedAssigneeId || kamId) getProjectList();
    }, [selectedAssigneeId, kamId])

    useEffect(() => {
        if(searchValue || projectID || projectId || startFrom || endFrom) getMilestoneList();
        // setCurrentPage(1);
    }, [searchValue, projectID, startFrom, endFrom, projectId])

    const milestoneReviewMenu = (
        <>
            {allData && allData?.review_legend.map(data=>{
                return(
                    <Menu onClick={handleReviewMenuClick}>
                        <Menu.Item 
                            key={data.name}
                            style={{backgroundColor:`${data.color}`}}
                        >
                            {data.name}
                            <Icon type="edit" />
                        </Menu.Item>
                    </Menu>
                    )
                })
            }
        </>
    ); 

    const columns = [
        {
            title: "MILESTONE NAME",
            render: (row) => (
                <div style={{color:`${dateCheck(row.actual_end_date, row?.milestone_status_id)}`}}>
                    <Badge color={dateCheck(row.actual_end_date, row?.milestone_status_id) === 'black' ? 'transparent' : dateCheck(row.actual_end_date, row?.milestone_status_id)}/>
                    {row?.milestone?.full_name || ''} 
                </div>
            ),   
            key: "milestone.full_name",
            width:'15%'
        },
        {
            title: "PLAN START DATE",
            render: (row) => (
                <div style={{color:`${dateCheck(row.actual_end_date, row?.milestone_status_id)}`}}>
                    <Badge color={dateCheck(row.actual_end_date, row?.milestone_status_id) === 'black' ? 'transparent' : dateCheck(row.actual_end_date, row?.milestone_status_id)}/>
                    {row?.plan_start_date || ''}
                </div>
            ),
            key: "plan_start_date",
            width:'11%'
        },
        {
            title: "PLAN END DATE",
            render: (row) => (
                <div style={{color:`${dateCheck(row.actual_end_date, row?.milestone_status_id)}`}}>
                    <Badge color={dateCheck(row.actual_end_date, row?.milestone_status_id) === 'black' ? 'transparent' : dateCheck(row.actual_end_date, row?.milestone_status_id)}/>
                    {row?.plan_end_date || ''}
                </div>
            ),
            key: "plan_end_date",
            width:'11%'
        },
        {
            title: "ACTUAL START DATE",
            render: (row) => (
                <div style={{color:`${dateCheck(row.actual_end_date, row?.milestone_status_id)}`}}>
                    <Badge color={dateCheck(row.actual_end_date, row?.milestone_status_id) === 'black' ? 'transparent' : dateCheck(row.actual_end_date,row?.milestone_status_id)}/>
                    {row?.actual_start_date || ''}
                </div>
            ),
            key: "actual_start_date",
            width:'11%'
        },
        {
            title: "ACTUAL END DATE",
            render: (row) => (
                <div style={{color:`${dateCheck(row.actual_end_date, row?.milestone_status_id)}`}}>
                    <Badge color={dateCheck(row.actual_end_date, row?.milestone_status_id) === 'black' ? 'transparent' : dateCheck(row.actual_end_date, row?.milestone_status_id)}/>
                    {row?.actual_end_date || ''} 
                </div>
            ),
            key: "actual_end_date",
            width:'11%'
        },
        {
            title: "STATUS",
            key: "milestone_status.name",
            render: (row) => (
                <div >
                    <Select 
                        size="medium" 
                        placeholder='Select Status'
                        value={row?.milestone_status_id|| undefined}
                        onChange={(event)=>handleMilestoneLegend(event,row)}
                    >
                        {allData && allData?.milestone_legend.map((data,index)=>{
                            return(
                                <Select.Option 
                                    key={`${data.id}-${index}`}
                                    value={data.id}
                                >
                                <span style={{color: data.color}}>{data.name}</span>
                                </Select.Option>
                            )
                        })}
                    </Select>
                </div>
            ),
            width:'20%'
        },
        {
            title: "ATTACHMENT",
            render: (row) => 
            <>
            {row.attachment ? 
                <img 
                    src={attachmentIcon} 
                    alt="attachement" 
                    style={{float: 'right', marginTop: '-3px', width:'1.5rem'}} 
                    onClick={() => {openAttchment(row.attachment)}}
                />: <p></p>    
            }    
            </>,
            key: "attachment",
            width:'10%'
        },
        {
            title: "PAYMENT",
            render: (row) => (
                <div>
                    {row?.payment || ''} 
                </div>
            ),
            key: "payment",
            width:'10%'
        },
        {
            title: "PAYMENT STATUS",
            render: (row) => (
                <div>
                    {row?.payment_status?.name || ''} 
                </div>
            ),
            key: "payment_status.name",
            width:'10%'
        },
        {
            title: "Review",
            key: "action",
            render: (row) => (
                <div >
                    <Select 
                        size="medium" 
                        placeholder='Select Review'
                        value={row?.review_status_id|| undefined}
                        onChange={(event)=>handleMilestoneReview(event,row.id)}
                    >
                        {allData && allData?.review_legend.map((data,index)=>{
                            return(
                                <Select.Option 
                                    key={`${data.id}-${index}`}
                                    value={data.id}
                                >
                                    <span style={{color: data.color}}>{data.name}</span>
                                </Select.Option>
                            )
                        })}
                    </Select>
                </div>
            ),
            width:'20%'
        },
    ];

    return (
        <>
        <Wrapper>
            <SearchFilter
                search={search}
                filter={filter}
                filterOptions={[{type: "date_range"}]}
                failsafe
            />

            <Flex space="1rem" justify="normal">
                <Select 
                    allowClear={true} 
                    style={{width: '30%', 'marginRight': '1rem'}} 
                    showSearch
                    placeholder='Select KAM'
                    onChange={selectKAM}
                    defaultValue={kamId}
                    filterOption={(input, option) =>
                    option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {kAMList && kAMList.length
                        ? kAMList.map((data) => {
                            return (
                            <Select.Option 
                                key={data.id} 
                                value={data.emp_id}
                            >
                                {data.name}
                            </Select.Option>
                            );
                        }) : ""
                    }
                </Select>

                <Select 
                    allowClear={true}
                    style={{width: '30%', 'marginRight': '1rem'}} 
                    placeholder='Select Project'
                    showSearch
                    // defaultValue={projectId}
                    filterOption={(input, option) =>
                        option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0}
                    onChange={projectFilter}
                    value={projectID || projectId || undefined}
                >
                    {projectList && projectList.length
                        ? projectList.map((project) => {
                            return (
                                <Select.Option 
                                    key={project.id} 
                                    value={project.id}
                                >
                                    {project.name}
                                </Select.Option>
                            )})
                        : ""
                    }
                </Select>

            </Flex>

            {/* {selectedAssigneeId && projectID 
                ? ( */}
                    <div className='legend_style'>
                        <Row gutter={32} style={{margin: '10px'}}>
                            <Col span={8} className='legendSquared'>
                                <p>Milestone Legend</p><br />
                                <div className='each_legend' style={{marginTop:'1rem'}}> 
                                {
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
                                }
                                </div> 
                            </Col>
                            <Col span={8} className='legendCircle'>
                                <p>Milestone Date Color Legend</p><br />
                                <div className='each_legend' style={{marginTop:'1rem'}}>
                                    <p style={{color:'#54a0ff'}}><span className="next10"></span>Next 6-10 days</p>
                                    <p style={{color:'#5f27cd'}}><span className="next5"></span>Next 1-5 days</p>
                                    <p style={{color:'#ee5253'}}><span className="over"></span>Date Over</p>
                                </div> 
                            </Col>
                            <Col span={8} className='legendBordered'>
                                <p>Review Legend</p><br />
                                <div className='each_legend' style={{marginTop:'1rem'}}>
                                    {
                                        allData && allData?.review_legend?.length && allData?.review_legend.map((data)=>{
                                            return(
                                                <>
                                                    <p>
                                                        <span key={data.id} style={{ border: `2px solid ${data.color}`}}></span>
                                                        {data.name}
                                                    </p>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </Col>
                        </Row>
                        {tableData ?
                        <>
                            <Table bordered 
                                dataSource={tableData} 
                                columns={columns}
                                // scroll={{ x: '1500px' }}
                                scroll={{ y: "calc(100vh - 22rem)" }}
                                pagination={false}
                                // pagination={{
                                //     current: currentPage,
                                //     total: pageCount * 10,
                                //     onChange: (page) => paginate(page),
                                // }}
                                style={{ margin: '0.5rem'}} 
                            />
                            
                            <Row gutter={32} style={{margin: '10px'}}>
                                <Col span={10}>
                                    <ProjectProgress 
                                        milestoneList={tableData}
                                    />
                                </Col>
                                <Col span={11}>
                                    <MilestoneTimeline 
                                        milestoneList={tableData}
                                    />
                                </Col>
                            </Row>
                        </>
                        :<LandingContent />}
                    </div>
                {/* ):<LandingContent />
            } */}
        </Wrapper>

        {/* Open when status button is clicked */}
        <Modal
          title="Milestone Completion Criteria"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
            <p style={{
                backgroundColor:'#fff200', 
                padding: '5px', 
                border: '1px solid #FFC312',
                borderRadius:'3px'}}
            >You need to upload billing documents for change this milestone status, Otherwise status will stay same.</p><br />

            <div className="file-upload-content">
                <label htmlFor="file-upload-field">Attachment</label>
                <div className="file-upload-wrapper" data-text="">
                    <span className="attacment-filename" id="attachemnt-name"></span>
                    <input 
                        name="file-upload-field" 
                        type="file" className="file-upload-field" value=""onChange={fileUploadHandler}
                        accept=".jpeg,.bmp,.png,.jpg,.pdf,.doc,.docx, .xlsx"
                    />
                </div>
            </div><br />

            <Button 
                type="primary" 
                style={{width: "100%"}} 
                onClick={updateMilestoneStatusModal}
            >
                Upload
            </Button>
        </Modal>

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