import React, { useState, useEffect } from 'react';
import {useHistory} from "react-router-dom";
import {Button, Table, Tag, Select} from "antd";
import { Wrapper} from "../../../../commons/Wrapper";
import {Flex} from "../../../../commons/Flex";
import {getData} from "../../../../../scripts/api-service";
import { FFM_FEEDBACK_OPTION_LIST, FFM_FEEDBACK_OPTION_DROPDOWN_LIST } from "../../../../../scripts/api";
import { dateFormat } from "../../../../../scripts/helper";

const FeedbackOptionList = () => {
    const [currentPage, setCurrentPage] = useState();
    const [pageCount, setPageCount] = useState();
    const [feedbackOptionList, setFeedbackOptionList] = useState();
    const [fedbackOptionDropdownList, setFeedbackOptionDropdownList] = useState();
    const [selectedFeedbackOptionId, setSelectedFeedbackOptionId] = useState();
    const [selectedStatus, setSelectedStatus] = useState();
    const history = useHistory();

    const getFeedbackOptionList = async () => {
      let url = FFM_FEEDBACK_OPTION_LIST + '?';
      if(currentPage) url = url + '&page=' + currentPage;
      if(selectedFeedbackOptionId) url = url + '&feedback_option_id=' + selectedFeedbackOptionId;
      if(selectedStatus === 1) url = url + '&status=' + 1;
      if(selectedStatus === 0) url = url + '&status=' + 0;
      let res = await getData(url);
  
      if (res) {
        let masterData = res?.data?.data?.data;
        if (res) {
          setFeedbackOptionList(masterData);
          setPageCount(res?.data?.data?.last_page);
        }
      }
    }
    
    const getFeedbackOptionDropdownList = async () => {
      let res = await getData(FFM_FEEDBACK_OPTION_DROPDOWN_LIST);
      
      if (res) {
        let masterData = res?.data?.data;
        if (res) {
          setFeedbackOptionDropdownList(masterData);
        }
      }
    }
    
    const paginate = (page) => setCurrentPage(page);

    useEffect(() => {
      getFeedbackOptionList();
      getFeedbackOptionDropdownList();
    }, []);

    useEffect(() => {
      getFeedbackOptionList();
    }, [currentPage, selectedFeedbackOptionId, selectedStatus]);

    const columns = [
      {
        title: "Feedback Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Feedback Reason",
        dataIndex: "reason_type",
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
            history.push(`/ffm/config-feedback-option-update?feedback_option_id=${row?.id}`)
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
                      history.push('/ffm/config-feedback-option-create')
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
                  placeholder='Feedback Option'
                  dropdownMatchSelectWidth={false}
                  value={selectedFeedbackOptionId}
                  onChange={(value)=>setSelectedFeedbackOptionId(value)}
                  filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {fedbackOptionDropdownList ? fedbackOptionDropdownList.map(option=>{
                    return(
                      <Select.Option key={`option-${option.id}`} value={option.id} label={option.name}>{option.name}</Select.Option>
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
                dataSource={feedbackOptionList} 
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

export default FeedbackOptionList;