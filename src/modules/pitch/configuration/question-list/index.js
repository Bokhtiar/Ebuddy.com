import React, { useState, useEffect } from 'react';
import {useHistory} from "react-router-dom";
import {Button, Table, Tag, Select, Modal, Radio, Form, Input, Checkbox, Row, Col } from "antd";
import {TableWrapper, Wrapper} from "../../../commons/Wrapper";
import {Flex} from "../../../commons/Flex";
import {getData, postData} from "../../../../scripts/api-service";
import { PIS_COMPANY_LIST, PITCH_CARD_FEEDBACK_SETUP, PITCH_DROPDOWN_LIST, PITCH_CARD_DROPDOWN_SETUP } from "../../../../scripts/api";
import { dateFormat } from "../../../../scripts/helper";
import { alertPop } from '../../../../scripts/message';
import expandActive from "../../../../assets/expand-active.svg"
import expandInactive from "../../../../assets/expand-inactive.svg";

const QuestionList = () => {
    const [currentPage, setCurrentPage] = useState();
    const [pageCount, setPageCount] = useState();
    const [questionList, setQuestionList] = useState();
    const [companyList, setCompanyList] = useState();
    const [pitchDropdownList, setPitchDropdownList] = useState();
    const [pitchCardDropdownList, setPitchCardDropdownList] = useState();
    const [selectedPitch, setSelectedPitch] = useState();
    const [selectedPitchCard, setSelectedPitchCard] = useState();
    const [selectedStatus, setSelectedStatus] = useState(1);
    const [modal, setModal] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [edit, setEdit] = useState();
    const [isCreateAnother, setIsCreateAnother] = useState();
    const history = useHistory();

    
    const getSOPList = async () => {
      let url = PITCH_CARD_FEEDBACK_SETUP + '?';
      if(currentPage) url = url + '&page=' + currentPage;
      if(selectedPitch) url = url + '&pitch_id=' + selectedPitch;
      if(selectedPitchCard) url = url + '&pitch_card_id=' + selectedPitchCard;
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

    const getPitchDropdownList = async () => {
      let res = await getData(PITCH_DROPDOWN_LIST);
      
      if (res) {
        let masterData = res?.data?.data;
        if (res?.data?.code === 200) {
          setPitchDropdownList(masterData);
        }
      }
    }

    const getPitchCardDropdownList = async (id) => {
      let url = PITCH_CARD_DROPDOWN_SETUP + '?pitch_id=' + id;
      let res = await getData(url);
      
      if (res) {
        let masterData = res?.data?.data;
        if (res?.data?.code === 200) {
          setPitchCardDropdownList(masterData);
        }
      }
    }

    const expandedRowRender = (record) => {
      const columns = [
        {
          title: "Question Name",
          dataIndex: "name",
          key: "name",
          width: "80%"
        },
        {
          title: "Status",
          key: "status",
          render: (row) => (row.status === 1 ? <Tag color="#A0DA30" style={{color: 'white'}}>Active</Tag> : <Tag color="#F2452F" style={{color: 'white'}}>Inactive</Tag>),
          width: "20%"
        },
      ];
  
      return <Table columns={columns} dataSource={record?.pitch_card_feedbacks} pagination={false} />;
    };
    
    const paginate = (page) => setCurrentPage(page);

    useEffect(() => {
      getSOPList();
      getCompanyList();
      getPitchDropdownList();
    }, []);

    useEffect(() => {
      if(selectedPitch) {
        getPitchCardDropdownList(selectedPitch);
        setSelectedPitchCard(undefined);
      }
      else {
        setPitchCardDropdownList(null);
        setSelectedPitchCard(undefined);
      }
    }, [selectedPitch]);

    useEffect(() => {
      getSOPList();
    }, [currentPage, selectedStatus, selectedPitch, selectedPitchCard]);

    const columns = [
      {
        title: "Company",
        dataIndex: "company.name",
        key: "company"
      },
      {
        title: "Pitch Name",
        dataIndex: "pitch.name",
        key: "pitch"
      },
      {
        title: "Pitch Card Name",
        dataIndex: "name",
        key: "pitch_card",
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
            history.push(`/pitch/config-pitch-question-linkup?card_id=${row?.id}`)
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
                      history.push('/pitch/config-pitch-question-linkup')
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
                  placeholder='Pitch'
                  dropdownMatchSelectWidth={false}
                  onChange={(value)=>setSelectedPitch(value)}
                  filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {pitchDropdownList ? pitchDropdownList.map((pitch, index)=>{
                    return(
                      <Select.Option key={`pitch-${index}`} value={pitch.id} label={pitch.name}>{pitch.name}</Select.Option>
                    )
                  }):null}
                </Select>
                <Select 
                  allowClear
                  style={{width: '30%', 'marginRight': '1rem'}}
                  showSearch
                  placeholder='Pitch Card'
                  dropdownMatchSelectWidth={false}
                  value={selectedPitchCard}
                  onChange={(value)=>setSelectedPitchCard(value)}
                  filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {pitchCardDropdownList ? pitchCardDropdownList.map(pitchCard=>{
                    return(
                      <Select.Option value={pitchCard.id} label={pitchCard.name}>{pitchCard.name}</Select.Option>
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