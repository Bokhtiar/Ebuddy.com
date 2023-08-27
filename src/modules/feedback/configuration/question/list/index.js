import React, { useState, useEffect } from 'react';
import {useHistory} from "react-router-dom";
import {Button, Table, Tag, Select, Modal, Radio, Form, Input, Checkbox, Row, Col } from "antd";
import {TableWrapper, Wrapper} from "../../../../commons/Wrapper";
import {Flex} from "../../../../commons/Flex";
import {getData, postData} from "../../../../../scripts/api-service";
import { PIS_COMPANY_LIST, FEEDBACK_QUESTION, FEEDBACK_QUESTION_LIST,  FEEDBACK_DROPDOWN_LIST, FEEDBACK_CARD_DROPDOWN_LIST } from "../../../../../scripts/api";
import { dateFormat } from "../../../../../scripts/helper";
import { alertPop } from '../../../../../scripts/message';
import expandActive from "../../../../../assets/expand-active.svg"
import expandInactive from "../../../../../assets/expand-inactive.svg";

const QuestionList = () => {
    const [currentPage, setCurrentPage] = useState();
    const [pageCount, setPageCount] = useState();
    const [questionList, setQuestionList] = useState();
    const [companyList, setCompanyList] = useState();
    const [feedbackDropdownList, setFeedbackDropdownList] = useState();
    const [feedbackCardDropdownList, setFeedbackCardDropdownList] = useState();
    const [selectedFeedback, setSelectedFeedback] = useState();
    const [selectedFeedbackCard, setSelectedFeedbackCard] = useState();
    const [selectedStatus, setSelectedStatus] = useState(1);
    const [modal, setModal] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [edit, setEdit] = useState();
    const [isCreateAnother, setIsCreateAnother] = useState();
    const history = useHistory();

    
    const getQuestionList = async () => {
      let url = FEEDBACK_QUESTION_LIST + '?';
      if(currentPage) url = url + '&page=' + currentPage;
      if(selectedFeedback) url = url + '&feedback_id=' + selectedFeedback;
      if(selectedFeedbackCard) url = url + '&feedback_card_id=' + selectedFeedbackCard;
      if(selectedStatus === 1) url = url + '&status=' + 1;
      if(selectedStatus === 0) url = url + '&status=' + 0;
      let res = await getData(url);
  
      if (res) {
        let masterData = res?.data?.data?.data;
        if (res?.data?.code === 200) {
          setQuestionList(masterData);
          setPageCount(res?.data?.data.last_page);
        }
      }
    }
    
    const getCompanyList = async () => {
      let res = await getData(PIS_COMPANY_LIST);
      
      if (res) {
        let masterData = res?.data?.data?.data;
        if (res?.data?.code === 200) {
          setCompanyList(masterData);
        }
      }
    }

    const getFeedbackDropdownList = async () => {
      let res = await getData(FEEDBACK_DROPDOWN_LIST);
      
      if (res) {
        let masterData = res?.data?.data;
        if (res?.data?.code === 200) {
          setFeedbackDropdownList(masterData);
        }
      }
    }

    const getFeedbackCardDropdownList = async (id) => {
      let url = FEEDBACK_CARD_DROPDOWN_LIST + '?pitch_id=' + id;
      let res = await getData(url);
      
      if (res) {
        let masterData = res?.data?.data;
        if (res?.data?.code === 200) {
          setFeedbackCardDropdownList(masterData);
        }
      }
    }

    const expandedRowRender = (record) => {
      console.log("row>>>>>", record)
      const columns = [
        {
          title: "Question Name",
          dataIndex: "name",
          key: "question",
        },
        {
          title: "Answer Title",
          dataIndex: "answer",
          key: "answer",
        },
        {
          title: "Answer Type",
          dataIndex: "type",
          key: "type",
        },
        {
          title: "Status",
          key: "status",
          render: (row) => (row.status === 1 ? <Tag color="#A0DA30" style={{color: 'white'}}>Active</Tag> : <Tag color="#F2452F" style={{color: 'white'}}>Inactive</Tag>),
        },
      ];
  
      return <Table rowKey={record => record?.id} columns={columns} dataSource={record?.questions} pagination={false} />;
    };
    
    const paginate = (page) => setCurrentPage(page);

    useEffect(() => {
      getQuestionList();
      getCompanyList();
      getFeedbackDropdownList();
    }, []);

    useEffect(() => {
      if(selectedFeedback) {
        getFeedbackCardDropdownList(selectedFeedback);
        setSelectedFeedbackCard(undefined);
      }
      else {
        getFeedbackCardDropdownList(null);
        setSelectedFeedbackCard(undefined);
      }
    }, [selectedFeedback]);

    useEffect(() => {
      getQuestionList();
    }, [currentPage, selectedStatus, selectedFeedback, selectedFeedbackCard]);

    const columns = [
      {
        title: "Company",
        dataIndex: "company.name",
        key: "company"
      },
      {
        title: "Feedback Name",
        dataIndex: "feedback.name",
        key: "feedback"
      },
      {
        title: "Feedback Card Name",
        dataIndex: "name",
        key: "feedback_card",
      },
      {
        title: "Service Type",
        dataIndex: "service_type.name",
        key: "service_type_name"
      },
      {
        title: "Service",
        dataIndex: "service.full_name",
        key: "service_name"
      },
      {
        title: "Created By",
        key: "created_by",
        render: row => <>
          <p>{row?.created_by?.name}</p>
          <p style={{color: '#808791'}}>{dateFormat(row?.created_at)}</p>
        </>
      },
      {
        title: "Status",
        key: "status",
        render: (row) => (row.status === 1 ? <Tag color="#A0DA30" style={{color: 'white'}}>Active</Tag> : <Tag color="#F2452F" style={{color: 'white'}}>Inactive</Tag>),
      },
      {
        title: "Action",
        key: "action",
        render: (row) => (
          <Button onClick={() => {
            history.push(`/feedback/config-feedback-question-form?card_id=${row?.id}`)
          }} type="link">
            Edit
          </Button>
        ),
      },
      {
        title: "",
        key: "progress",
        // width: "20px"
      }
    ];

    return (
        <Wrapper>
            <Flex space="1rem" justify="normal">
                <Button 
                    // onClick={()=>setModal(true)} 
                    onClick={()=>
                      history.push('/feedback/config-feedback-question-form')
                    } 
                    width="40%" 
                    type="primary" 
                    style={{'marginRight': '1rem'}}
                >
                  Create New Question
                </Button>
                <Select 
                  allowClear
                  style={{width: '30%', 'marginRight': '1rem'}}
                  showSearch
                  placeholder='Feedback'
                  dropdownMatchSelectWidth={false}
                  onChange={(value)=>setSelectedFeedback(value)}
                  filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {feedbackDropdownList ? feedbackDropdownList.map((feedback, index)=>{
                    return(
                      <Select.Option key={`feedback-${index}`} value={feedback.id} label={feedback.name}>{feedback.name}</Select.Option>
                    )
                  }):null}
                </Select>
                <Select 
                  allowClear
                  style={{width: '30%', 'marginRight': '1rem'}}
                  showSearch
                  placeholder='Feedback Card'
                  dropdownMatchSelectWidth={false}
                  value={selectedFeedbackCard}
                  onChange={(value)=>setSelectedFeedbackCard(value)}
                  filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {feedbackCardDropdownList ? feedbackCardDropdownList.map(feedbackCard=>{
                    return(
                      <Select.Option key={feedbackCard.id} value={feedbackCard.id} label={feedbackCard.name}>{feedbackCard.name}</Select.Option>
                    )
                  }):null}
                </Select>
                <Select 
                    allowClear
                    style={{width: '30%', 'marginRight': '1rem'}} 
                    showSearch
                    placeholder="Status"
                    dropdownMatchSelectWidth={false}
                    value={selectedStatus}
                    onChange={(value)=>setSelectedStatus(value)}
                    filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                    }
                >
                  <Select.Option key="Active" value={1}>Active</Select.Option>
                  <Select.Option key="Inactive" value={0}>Inactive</Select.Option>
                </Select>
            </Flex>
            <Flex space="1rem" justify="normal">
              <Table 
                rowKey={record => record?.id}
                scroll={{ y: '100vh'}}  
                dataSource={questionList} 
                columns={columns} 
                pagination={{
                  current: currentPage,
                  total: pageCount * 10,
                  onChange: (page) => paginate(page),
                }}
                expandedRowRender={(record) => expandedRowRender(record)}
                expandIconAsCell={false}
                expandIcon = {({ expanded, onExpand, record }) => <img className="activity-icon" onClick={e => onExpand(record, e)}
                    src={expanded ? expandActive : expandInactive} height="30" />}
                expandIconColumnIndex={8}
              />
            </Flex>

            {/* SOP Setup Modal */}
            <Modal
              title="Setup New Pitch"
              visible={modal}
              width="35vw"
              onCancel={() => {
                setModal(false);
                setIsUpdate(false);
                setIsCreateAnother(false);
              }}
              footer={false}
            >
          </Modal> 
        </Wrapper>
    )
}

export default QuestionList;