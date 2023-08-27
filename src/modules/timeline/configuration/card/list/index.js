import React, { useState, useEffect } from 'react';
import {useHistory} from "react-router-dom";
import {Button, Table, Tag, Select, Modal, Radio, Form, Input, Checkbox, Row, Col } from "antd";
import {TableWrapper, Wrapper} from "../../../../commons/Wrapper";
import {Flex} from "../../../../commons/Flex";
import {getData, postData} from "../../../../../scripts/api-service";
import { PIS_COMPANY_LIST, FEEDBACK_DROPDOWN_LIST, PIS_DEPARTMENT_LIST, TEAMS_LIST_ALL, FEEDBACK_CARD } from "../../../../../scripts/api";
import { dateFormat } from "../../../../../scripts/helper";
import { alertPop } from '../../../../../scripts/message';
import expandActive from "../../../../../assets/expand-active.svg"
import expandInactive from "../../../../../assets/expand-inactive.svg";

const CardList = () => {
    const [currentPage, setCurrentPage] = useState();
    const [pageCount, setPageCount] = useState();
    const [feedbackCardList, setFeedbackCardList] = useState();
    const [companyList, setCompanyList] = useState();
    const [feedbackDropdownList, setFeedbackDropdownList] = useState();
    const [selectedCompanyId, setSelectedCompanyId] = useState();
    const [selectedPitchId, setSelectedPitchId] = useState();
    const [selectedStatus, setSelectedStatus] = useState(1);
    const [modal, setModal] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [edit, setEdit] = useState();
    const [isCreateAnother, setIsCreateAnother] = useState();
    const history = useHistory();

    const getFeedbackCardList = async () => {
      let url = FEEDBACK_CARD + '?';
      if(currentPage) url = url + '&page=' + currentPage;
      if(selectedCompanyId) url = url + '&company_id=' + selectedCompanyId;
      if(selectedCompanyId && selectedPitchId) url = url + '&pitch_id=' + selectedPitchId;
      if(selectedStatus === 1) url = url + '&status=' + 1;
      if(selectedStatus === 0) url = url + '&status=' + 0;
      let res = await getData(url);
  
      if (res) {
        let masterData = res?.data?.data?.data;
        if (res) {
          setFeedbackCardList(masterData);
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

    const getFeedbackDropdownList = async (id) => {
      let url = FEEDBACK_DROPDOWN_LIST + '?company_id=' + id;
      let res = await getData(url);
      
      if (res) {
        let masterData = res?.data?.data;
        if (res?.data?.code === 200) {
          setFeedbackDropdownList(masterData);
        }
      }
    }
    
    const paginate = (page) => setCurrentPage(page);

    useEffect(() => {
      getFeedbackCardList();
      getCompanyList();
    }, []);

    useEffect(() => {
      if(selectedCompanyId) {
        getFeedbackDropdownList(selectedCompanyId);
        setSelectedPitchId(undefined);
      }
      else {
        getFeedbackDropdownList(null);
        setSelectedPitchId(undefined);
      }
    }, [selectedCompanyId]);

    useEffect(() => {
      getFeedbackCardList();
    }, [currentPage, selectedCompanyId, selectedStatus, selectedPitchId]);

    const columns = [
      {
        title: "Card Name",
        dataIndex: "name",
        key: "card_name"
      },
      {
        title: "Company Name",
        dataIndex: "company.name",
        key: "company_name"
      },
      {
        title: "Feedback Title",
        dataIndex: "feedback.name",
        key: "feedback_title",
      },
      {
        title: "Service Type & Name",
        key: "service",
        render: row => <>
          <p><small>{row?.service?.full_name}</small></p>
          <p><strong>{row?.service_type?.name}</strong></p>
        </>
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
        render: (row) => <Button onClick={() => {
          // setEdit(row);
          // setModal(true);
          // setIsUpdate(true);
          history.push(`/feedback/config-feedback-card-form?card_id=${row?.id}`)
        }} type="link">
          Edit
        </Button>,
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
                      history.push('/feedback/config-feedback-card-form')
                    } 
                    width="40%" 
                    type="primary" 
                    style={{'marginRight': '1rem'}}
                >
                  Setup New Card
                </Button>
                <Select 
                  allowClear
                  style={{width: '30%', 'marginRight': '1rem'}}
                  showSearch
                  placeholder='Company'
                  dropdownMatchSelectWidth={false}
                  onChange={(value)=>setSelectedCompanyId(value)}
                  filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {companyList ? companyList.map(com=>{
                    return(
                      <Select.Option value={com.id} label={com.name}>{com.name}</Select.Option>
                    )
                  }):null}
                </Select>
                <Select 
                  allowClear
                  style={{width: '30%', 'marginRight': '1rem'}}
                  showSearch
                  placeholder='Feedback'
                  dropdownMatchSelectWidth={false}
                  value={selectedPitchId}
                  onChange={(value)=>setSelectedPitchId(value)}
                  filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {feedbackDropdownList ? feedbackDropdownList.map(feedback=>{
                    return(
                      <Select.Option value={feedback.id} label={feedback.name}>{feedback.name}</Select.Option>
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
                dataSource={feedbackCardList} 
                columns={columns} 
                pagination={{
                  current: currentPage,
                  total: pageCount * 10,
                  onChange: (page) => paginate(page),
                }}
                expandedRowRender={(record) => 
                  <Row gutter={16}>
                    <Col span={24}>{record?.description}</Col>
                  </Row>
                }
                expandIconAsCell={false}
                expandIcon = {({ expanded, onExpand, record }) => 
                <img 
                  className="activity-icon" 
                  onClick={e => onExpand(record, e)}
                  src={expanded ? expandActive : expandInactive} height="30" 
                />}
                expandIconColumnIndex={7}
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

export default CardList;