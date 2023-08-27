import React, { useState, useEffect } from 'react';
import {useHistory} from "react-router-dom";
import {Button, Table, Tag, Select, Modal, Radio, Form, Input, Checkbox } from "antd";
import {TableWrapper, Wrapper} from "../../../../commons/Wrapper";
import {Flex} from "../../../../commons/Flex";
import {getData, postData} from "../../../../../scripts/api-service";
import { FFM_FEEDBACK_DROPDOWN_LIST, FFM_FEEDBACK_LIST } from "../../../../../scripts/api";
import { dateFormat } from "../../../../../scripts/helper";

const FeedbackTypeList = () => {
    const [currentPage, setCurrentPage] = useState();
    const [pageCount, setPageCount] = useState();
    const [feedbackList, setFeedbackList] = useState();
    const [feedbackDropdownList, setFeedbackDropdownList] = useState();
    const [selectedFeedbackId, setSelectedFeedbackId] = useState();
    const [selectedStatus, setSelectedStatus] = useState();
    const history = useHistory();

    const getFeedbackList = async () => {
      let url = FFM_FEEDBACK_LIST + '?';
      if(currentPage) url = url + '&page=' + currentPage;
      if(selectedFeedbackId) url = url + '&feedback_id=' + selectedFeedbackId;
      if(selectedStatus === 1) url = url + '&status=' + 1;
      if(selectedStatus === 0) url = url + '&status=' + 0;
      let res = await getData(url);
  
      if (res) {
        let masterData = res?.data?.data?.data;
        if (res) {
          setFeedbackList(masterData);
          setPageCount(res?.data?.data?.last_page);
        }
      }
    }

    const getFeedbackDropdownList = async () => {
      let res = await getData(FFM_FEEDBACK_DROPDOWN_LIST);
      
      if (res) {
        let masterData = res?.data?.data;
        if (res) {
          setFeedbackDropdownList(masterData);
        }
      }
    }

    const paginate = (page) => setCurrentPage(page);

    useEffect(() => {
      getFeedbackList();
      getFeedbackDropdownList();
    }, []);

    useEffect(() => {
      getFeedbackList();
    }, [currentPage, selectedFeedbackId, selectedStatus]);

    const columns = [
      {
        title: "Feedback Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Feedback Title",
        dataIndex: "title",
        key: "title"
      },
      {
        title: "Created At",
        key: "created_at",
        render: row => <>
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
            history.push(`/ffm/config-feedback-update?feedback_id=${row?.id}`)
          }} type="link">
            Edit
          </Button>
        ),
      },
    ];

    return (
        <Wrapper>
            <Flex space="1rem" justify="normal">
              <Button 
                onClick={()=>
                  history.push('/ffm/config-feedback-create')
                } 
                width="40%" 
                type="primary" 
                style={{'marginRight': '1rem'}}
              >
                Setup Feedback
              </Button>
              <Select 
                allowClear
                style={{width: '30%', 'marginRight': '1rem'}}
                showSearch
                placeholder='Feedback'
                dropdownMatchSelectWidth={false}
                value={selectedFeedbackId}
                onChange={(value)=>setSelectedFeedbackId(value)}
                filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
                }
              >
                {feedbackDropdownList ? feedbackDropdownList.map(feedback=>{
                  return(
                    <Select.Option key={`feedback-${feedback.id}`} value={feedback.id} label={feedback.name}>{feedback.name}</Select.Option>
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
                rowKey={({ record }) => record?.id}
                scroll={{ y: '100vh'}}  
                dataSource={feedbackList} 
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

export default FeedbackTypeList;