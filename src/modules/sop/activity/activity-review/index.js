import React, {useState,useEffect} from 'react';
import {Select,Button, Modal,Icon, Row, Col} from "antd";
import SearchFilter from "../../../commons/SearchFilter";
import {Wrapper} from "../../../commons/Wrapper";
import {Flex} from "../../../commons/Flex";
import {
    SUPERVISOR_KAM_LIST,
    REVIEW_STATUS_LISTVIEW, 
    ACTIVITY_REVIEW_UPDATE,
    ACTIVITY_STATUS_UPDATE,
    REVIEW_STATUS_RANGE,
    SOP_ACTIVITY_REVIEW_LIST,
    SOP_ACTIVITY_REVIEW_UPDATE,
    SOP_MULTIPLE_REVIEW_RATING
} from "../../../../scripts/api";
import {getData, postData} from "../../../../scripts/api-service";
import ActivityTableView from "./activity-table-view";
import moment from 'moment';
import sales_task from "../../../../assets/icons/test/sales_task_icon.svg";
import {alertPop} from "../../../../scripts/message";
import ActivityDetailsModal from "../common/activity-details-modal";

const { Option } = Select;

export default function TaskReview() {
    const [pageCount, setPageCount] = useState();
    const [selectedAssignee, setSelectedAssignee] = useState();
    const [assigneeList, setAssigneeList] = useState();
    const [tableBody, setTableBody] = useState([]);
    const [selectedRow, setSelectedRow] = useState({});
    const [selectedProject, setSelectedProject] = useState();
    const [detailsModal, setDetailsModal] = useState(false);
    const [refresh, doRefresh] = useState(0);
    const [searchValue, setSearchValue] = useState();
    const [dateGroupFilter, setDateGroupFilter] = useState()
    const [startFrom, setStartFrom] = useState();
    const [endFrom, setEndFrom] = useState();
    // const [singleDate, setSingleDate] = useState(moment().format('YYYY-MM-DD'))
    const [singleDate, setSingleDate] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [isDisabledType, setIsDisabledType] = useState(true);
    const [ratingRange, setRatingRange] = useState();
    const [reviewList, setReviewList] = useState([]);
    const [rowData, setRowData] = useState();
    const [status, setStatus] = useState();
    const [review, setReview] = useState();
    const [rating, setRating] = useState();
    const [multipleReviewUpdateModal, setMultipleReviewUpdateModal] = useState();
    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [hasSelected, setHasSelected] = useState(false);

    
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            if(selectedRowKeys.length > 0){
                let tempArray = [];
                setHasSelected(true);
                selectedRows.forEach(item=>{
                    if(item.status === "Done"){
                        tempArray.push(item.id)
                    }
                })
                setSelectedRowIds(tempArray);
            } 
            else setHasSelected(false);
        }
    };

    const search = (value) => {
        setSearchValue(value);
    };
    

    const filter = (date) => {
        if (date) {
            setDateGroupFilter(undefined);
            setStartFrom(date.date_from);
            setEndFrom(date.date_to);
        } else {
            setDateGroupFilter('today');
        }
    };

    const getReviewList = async () => {
        let res = await getData(REVIEW_STATUS_LISTVIEW);

        if (res) {
            let masterData = res?.data?.data;
            setReviewList(masterData);
        }
    }

    const selectReview = async(value,id,index) => {
        let flag = "review";
        setReview(value);
        if(index){
            tableBody[index] = {
                ...tableBody[index], 
                'review_status_id': value,
                'review_rating': null
            } ;
        }

        //rating range
        let res = await getData(REVIEW_STATUS_RANGE + `/${value}`);
        if (res) {
            setRatingRange(res?.data?.data)
        }
        // updateEvent();
    }

    const selectRating = (value, id, index) => {
        let flag = "rating";
        if(value && id && (typeof index === "number")) postReviewData(value, id, flag, index);
        setRating(value);    
    }
    
    const postReviewData = async (value, id, flag, index) => {
        let payload = {};

        payload = {
            review_status: review,
            review_rating: parseInt(value) 
        }
        
        let res = await postData(`${SOP_ACTIVITY_REVIEW_UPDATE}/${id}`,payload);
        if (res) {
            let masterData = res?.data?.data;
            alertPop("success", "Successfully complete the process");
            masterData["review_status_id"] = masterData.review_status_id;
            masterData["review_rating"] = masterData.review_rating;

            tableBody[index] = masterData;
            if(flag === "rating") {
                setTableBody(tableBody.splice(index, 1));
            }
            setTableBody([...tableBody]);
        }
        updateEvent();
    }

    const getAllAssignee = async () => {
        let res = await getData(SUPERVISOR_KAM_LIST);

        if (res) {
            let masterData = res?.data?.data;
            setAssigneeList(masterData);
        }
    }

    const getAllReviewData = async () => {
        let url = SOP_ACTIVITY_REVIEW_LIST + "?";

        // url = url + "&unreviewed_only=true&paginate=1";
        url = url + "&paginate=1";
        if (currentPage) url = url + '&page=' + currentPage;
        if (searchValue) url = url + '&search=' + searchValue;
        if (startFrom && endFrom ) url = url + '&from_date=' + startFrom + '&to_date=' + endFrom;
        else if (singleDate) url = url + '&single_date=' + singleDate;
        if (selectedAssignee) url = url + '&assignee=' + selectedAssignee;
        if (status) {
            if(status === 'Reviewed') url = url.replace('&unreviewed_only=true','') + "&status=" + status;
            else url = url + "&status=" + status;
        }

        let res = await getData(url);

        if (res) {
            let masterData = res?.data?.data?.data;
            if (res) {
                setTableBody(masterData);
                setPageCount(res?.data?.data?.last_page);
            };
            setIsDisabledType(false);
        } 
    }

    const selectAssignee = (value) => {
        setSelectedAssignee(value);
        setIsDisabledType(true);
    }

    const updateEvent = () => {
        doRefresh(prev => prev + 1)
    }

    const detailsModalShow = (data) => {
        setDetailsModal(true);
        setSelectedRow(data);
    }

    const detailsTaskModalOpenHandler = (data) => {
        setDetailsModal(true);
        setSelectedProject(data)
    }

    const dateFilter = (value) => {
        setDateGroupFilter(value);

        switch(value) {
            case "yesterday":
                setStartFrom(moment().subtract(1,'days').format("YYYY-MM-DD"));
                setEndFrom(moment().subtract(1,'days').format("YYYY-MM-DD"));
                setSingleDate(moment().subtract(1,'days').format("YYYY-MM-DD"));
                break;
            // case "today":
            //     setStartFrom(moment().format('YYYY-MM-DD'));
            //     setEndFrom(moment().format('YYYY-MM-DD'));
            //     break;
            case "tomorrow":
                setStartFrom(moment().add(1,'days').format("YYYY-MM-DD"));
                setEndFrom(moment().add(1,'days').format("YYYY-MM-DD"));
                setSingleDate(moment().add(1,'days').format("YYYY-MM-DD"));
                break;
            case "this_week":
                setStartFrom(moment().clone().startOf('week').format("YYYY-MM-DD"));
                setEndFrom(moment().clone().endOf('week').format("YYYY-MM-DD"));
                setSingleDate();
                break;
            case "this_month":
                setStartFrom(moment().clone().startOf('month').format("YYYY-MM-DD"));
                setEndFrom(moment().clone().endOf('month').format("YYYY-MM-DD"));
                setSingleDate();
                break;
            case "default":
                setStartFrom('');
                setEndFrom('');
                setSingleDate('');
                break;
            default:
                setStartFrom();
                setEndFrom();
                setSingleDate(moment().format('YYYY-MM-DD'));
                break;

        }
        setIsDisabledType(true);
    }

    const updateReviewRatingFromModal = async() =>{
        let payload = {
            "sop_activites": selectedRowIds,
            "review_status": review,
            "review_rating": rating
        }

        let res = await postData(SOP_MULTIPLE_REVIEW_RATING, payload);
        if (res) {
            let masterData = res?.data?.data;
            alertPop("success", "Process completed successfully!");
            getAllReviewData();
            setSelectedRowIds([]);
            setReview();
            setRating();
        }
    }

    useEffect(() => {
        getAllAssignee();
        getReviewList();
    }, []);
    
    useEffect(() => {
        getAllReviewData();
    }, [searchValue, selectedAssignee, startFrom, endFrom, singleDate, currentPage, refresh, status])
    
    useEffect(() => {
        if(selectedRowIds.length > 0) setHasSelected(true);
        else setHasSelected(false);
    }, [selectedRowIds]);

    
    return (
        <Wrapper style={{width: "96%"}}>
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
                    placeholder='Date' 
                    onChange={dateFilter} 
                    value={dateGroupFilter}
                    disabled={isDisabledType} 
                    showSearch 
                    filterOption={(input, option) =>
                    option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Select.Option key='Y' value='yesterday'>Yesterday</Select.Option>
                    <Select.Option key='G' value='today'>Today</Select.Option>
                    <Select.Option key='R' value='tomorrow'>Tomorrow</Select.Option>
                    <Select.Option key='B' value='this_week'>This Week</Select.Option>
                    <Select.Option key='A' value='this_month'>This Month</Select.Option>
                </Select>
                <Select 
                    allowClear={true} 
                    style={{width: '30%', 'marginRight': '1rem'}}
                    showSearch
                    placeholder="Assignee"
                    optionFilterProp="children"
                    onChange={selectAssignee}
                    disabled={isDisabledType}
                    filterOption={(input, option) =>
                    option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }>
                    {assigneeList && assigneeList.length
                        ? assigneeList.map((data) => {
                            return (
                            <Option 
                                key={data.id} 
                                value={data.emp_id}
                            >
                                {data.name}
                            </Option>
                            );
                        }) : ""
                    }
                </Select>
                <Select 
                    allowClear={true} style={{width: '30%', 'marginRight': '1rem'}}
                    showSearch
                    placeholder="Status"
                    optionFilterProp="children"
                    onChange={(e) => {setStatus(e); setIsDisabledType(true)}}
                    disabled={isDisabledType}
                    filterOption={(input, option) =>
                    option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }>
                    <Select.Option key='Pending' value='Pending'>Pending</Select.Option>
                    <Select.Option key='To-Do' value='To-Do'>To-Do</Select.Option>
                    <Select.Option key='WIP' value='WIP'>WIP</Select.Option>
                    <Select.Option key='Hold' value='Hold'>Hold</Select.Option>
                    <Select.Option key='Done' value='Done'>Done</Select.Option>
                    <Select.Option key='Reviewed' value='Reviewed'>Reviewed</Select.Option>
                </Select>
                <Button 
                    style={{width: '30%', 'marginRight': '1rem'}}
                    type="primary" 
                    // size="large" 
                    disabled={!hasSelected}
                    onClick={() => {setMultipleReviewUpdateModal(true)}}
                > Multiple Review Update
                </Button>
            </Flex>
            {tableBody ? 
                <ActivityTableView
                    detailsTaskModalOpenHandler={detailsTaskModalOpenHandler} 
                    useActivity={tableBody}
                    pageCount={pageCount}
                    reviewRatingList={reviewList}
                    selectReview={selectReview}
                    review={review}
                    selectRating={selectRating}
                    refresh={refresh}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    ratingRange={ratingRange}
                    setRowData={setRowData}
                    rowSelection={rowSelection}
                />
                :
                <LandingContent />
            }
            {/* Details Modal */}
            <Modal
                title=""
                visible={detailsModal}
                width="60vw"
                onCancel={() => {setDetailsModal(false); setSelectedProject()} }
                footer={false}
            >
                {selectedProject ?
                    <ActivityDetailsModal 
                        setModal={detailsModalShow} 
                        reviewRatingList={reviewList} 
                        rowData={rowData}
                        updateEvent={updateEvent}
                        updatedStatus={status}
                        setStatus={setStatus}
                    />
                    : null
                }
                
            </Modal> 

             {/* multiple status update modal */}
             <Modal
                title="Multiple Review Update"
                visible={multipleReviewUpdateModal}
                width="60vw"
                onCancel={() => { setMultipleReviewUpdateModal(false) }}
                footer={[
                    <Button
                        key={1} 
                        type="primary" 
                        // size="large" 
                        onClick={() => {
                            updateReviewRatingFromModal();
                            setMultipleReviewUpdateModal(false);
                        }}
                    > Submit
                    </Button>,
                  ]}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Select 
                            style={{width: '100%'}}
                            showSearch
                            placeholder="Review"
                            optionFilterProp="children"
                            value={review ? review : undefined}
                            onChange={(value)=> selectReview(value)}
                            filterOption={(input, option) =>
                            option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {reviewList?.map(reviewRating=>{
                                return(
                                    <Select.Option 
                                        key={reviewRating.id} 
                                        value={reviewRating.id}
                                    >
                                        {reviewRating.name}
                                    </Select.Option>
                                )
                            })}
                        </Select>
                    </Col>
                    <Col span={12}>
                        <Select 
                            style={{width: '100%'}}
                            showSearch
                            placeholder="Rating"
                            optionFilterProp="children"
                            value={rating ? rating : undefined}
                            onChange={(event)=>selectRating(event)}
                            filterOption={(input, option) =>
                            option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {ratingRange?.map(rating=>{
                                return(
                                    <Select.Option 
                                        key={rating} 
                                        value={rating}
                                    >
                                        {rating}
                                    </Select.Option>
                                )
                            })
                        }
                        </Select>
                    </Col>
                </Row>
            </Modal>
        </Wrapper>
    )
}

const LandingContent = () => {
    return (
        <div className="landing-content mt-5" style={{textAlign: 'center'}}>
            <img src={sales_task} height="200"/>
            <h2>Please Select Assignee And Date To Generate Data</h2>
        </div>
    )
}
