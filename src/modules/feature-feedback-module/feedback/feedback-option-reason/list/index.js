import React, { useState, useEffect } from 'react';
import {useHistory} from "react-router-dom";
import {Button, Table, Tag, Select } from "antd";
import {Wrapper} from "../../../../commons/Wrapper";
import {Flex} from "../../../../commons/Flex";
import {getData} from "../../../../../scripts/api-service";
import {FFM_FEEDBACK_REASON_DROPDOWN_LIST, FFM_FEEDBACK_REASON_LIST } from "../../../../../scripts/api";
import { dateFormat } from "../../../../../scripts/helper";

const FeedbackOptionReasonList = () => {
    const [currentPage, setCurrentPage] = useState();
    const [pageCount, setPageCount] = useState();
    const [feedbackReasonList, setFeedbackReasonList] = useState();
    const [feedbackReasonDropdownList, setFeedbackReasonDropdownList] = useState();
    const [selectedFeedbackReasonId, setSelectedFeedbackReasonId] = useState();
    const [selectedReasonType, setSelectedReasonType] = useState();
    const [selectedStatus, setSelectedStatus] = useState();
    const history = useHistory();

    const getFeedbackReasonList = async () => {
      let url = FFM_FEEDBACK_REASON_LIST + '?';
      if(currentPage) url = url + '&page=' + currentPage;
      if(selectedFeedbackReasonId) url = url + '&feedback_reason_id=' + selectedFeedbackReasonId;
      if(selectedReasonType) url = url + '&reason_type=' + selectedReasonType;
      if(selectedStatus === 1) url = url + '&status=' + 1;
      if(selectedStatus === 0) url = url + '&status=' + 0;
      let res = await getData(url);
  
      if (res) {
        let masterData = res?.data?.data?.data;
        if (res) {
          setFeedbackReasonList(masterData);
          setPageCount(res?.data?.data?.last_page);
        }
      }
    }
    
    const getFeedbackReasonDropdownList = async () => {
      let url = FFM_FEEDBACK_REASON_DROPDOWN_LIST ;
      let res = await getData(url);
      
      if (res) {
        let masterData = res?.data?.data;
        if (res) {
          setFeedbackReasonDropdownList(masterData);
        }
      }
    }

    const paginate = (page) => setCurrentPage(page);

    useEffect(() => {
      getFeedbackReasonList();
      getFeedbackReasonDropdownList();
    }, []);

    useEffect(() => {
      getFeedbackReasonList();
    }, [currentPage, selectedFeedbackReasonId, selectedReasonType, selectedStatus]);
 
    const columns = [
      {
        title: "Reason Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Reason Type",
        dataIndex: "type",
        key: "reason_type"
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
            history.push(`/ffm/config-feedback-option-reason-update?feedback_option_reason_id=${row?.id}`)
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
                      history.push('/ffm/config-feedback-option-reason-create')
                    } 
                    width="40%" 
                    type="primary" 
                    style={{'marginRight': '1rem'}}
                >
                  Setup Feedback Reason
                </Button>
                <Select 
                  allowClear
                  style={{width: '30%', 'marginRight': '1rem'}}
                  showSearch
                  placeholder='Feedback Reason'
                  dropdownMatchSelectWidth={false}
                  value={selectedFeedbackReasonId}
                  onChange={(value)=>setSelectedFeedbackReasonId(value)}
                  filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {feedbackReasonDropdownList ? feedbackReasonDropdownList.map(reason=>{
                    return(
                      <Select.Option key={`reason-${reason.id}`} value={reason.id} label={reason.name}>{reason.name}</Select.Option>
                    )
                  }):null}
                </Select>
                <Select 
                  allowClear
                  style={{width: '30%', 'marginRight': '1rem'}} 
                  showSearch
                  placeholder="Reason Type"
                  dropdownMatchSelectWidth={false}
                  value={selectedReasonType}
                  onChange={(value)=>setSelectedReasonType(value)}
                  filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                  }
              >
                <Select.Option key="text" value="text">Text</Select.Option>
                <Select.Option key="number" value="number">Number</Select.Option>
                <Select.Option key="radio" value="radio">Radio</Select.Option>
                <Select.Option key="checkbox" value="checkbox">Checkbox</Select.Option>
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
                dataSource={feedbackReasonList} 
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

export default FeedbackOptionReasonList;