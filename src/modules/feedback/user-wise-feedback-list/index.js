import React, { useState, useEffect } from 'react';
import {useHistory} from "react-router-dom";
import {Button, Table, Tag, Select, Modal, Radio, Form, Input, Checkbox } from "antd";
import {TableWrapper, Wrapper} from "../../commons/Wrapper";
import {Flex} from "../../commons/Flex";
import {getData, postData} from "../../../scripts/api-service";
import { PIS_COMPANY_LIST_All, FEEDBACK_SERVICE_LIST, FEEDBACK_SERVICE_TYPE_LIST, FEEDBACK_INITIATE, FEEDBACK } from "../../../scripts/api";
import { dateFormat } from "../../../scripts/helper";

const UserWiseFeedbackList = () => {
    const [currentPage, setCurrentPage] = useState();
    const [pageCount, setPageCount] = useState();
    const [feedbackist, setFeedbackist] = useState();
    const [companyList, setCompanyList] = useState();
    const [serviceTypeList, setServiceTypeList] = useState();
    const [serviceList, setServiceList] = useState();
    const [selectedCompanyId, setSelectedCompanyId] = useState();
    const [selectedServiceTypeId, setSelectedServiceTypeId] = useState();
    const [selectedServiceId, setSelectedServiceId] = useState();
    const [selectedStatus, setSelectedStatus] = useState();
    const [modal, setModal] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [edit, setEdit] = useState();
    const [isCreateAnother, setIsCreateAnother] = useState();
    const history = useHistory();
    
    const getUserWiseFeedbackist = async () => {
      let url = FEEDBACK_INITIATE + '?';
      if(currentPage) url = url + '&page=' + currentPage;
      if(selectedCompanyId) url = url + '&company_id=' + selectedCompanyId;
      if(selectedServiceTypeId) url = url + '&service_type_id=' + selectedServiceTypeId;
      if(selectedServiceId) url = url + '&service_id=' + selectedServiceId;
      if(selectedStatus) url = url + '&status=' + selectedStatus;
      let res = await getData(url);
  
      if (res) {
        let masterData = res?.data?.data?.data;
        if (res) {
          setFeedbackist(masterData);
          setPageCount(res?.data?.data?.last_page);
        }
      }
    }

    const getCompanyList = async () => {
      let res = await getData(PIS_COMPANY_LIST_All);
      
      if (res) {
        let masterData = res?.data?.data;
        if (res) {
          setCompanyList(masterData);
        }
      }
    }
    
    const getServiceTypeList = async (id) => {
      let url = FEEDBACK_SERVICE_TYPE_LIST + '?company_id=' + id;
      let res = await getData(url);
      
      if (res) {
        let masterData = res?.data?.data;
        if (res) {
          setServiceTypeList(masterData);
        }
      }
    }
    
    const getServiceList = async () => {
      let url = FEEDBACK_SERVICE_LIST + '?';
      if(selectedServiceTypeId) url += "service_type_id=" + selectedServiceTypeId;
      let res = await getData(url);
      
      if (res) {
        let masterData = res?.data?.data;
        if (res) {
          setServiceList(masterData);
        }
      }
    }

    const paginate = (page) => setCurrentPage(page);

    useEffect(() => {
      getUserWiseFeedbackist();
      getCompanyList();
    }, []);

    useEffect(() => {
      if(selectedCompanyId) {
        getServiceTypeList(selectedCompanyId);
        setSelectedServiceTypeId(undefined);
        setSelectedServiceId(undefined);
      }
      else {
        setServiceTypeList(null);
        setServiceList(null);
        setSelectedServiceTypeId(undefined);
        setSelectedServiceId(undefined);
      }
    }, [selectedCompanyId]);

    useEffect(() => {
      if(selectedServiceTypeId) {
        getServiceList();
        setSelectedServiceId(undefined);
      }
      else{
        setServiceList(null);
        setSelectedServiceId(undefined);
      }
    }, [selectedServiceTypeId]);

    useEffect(() => {
        getUserWiseFeedbackist();
    }, [currentPage, selectedCompanyId, selectedServiceTypeId, selectedServiceId, selectedStatus]);

    const columns = [
      {
        title: "Feedback Title",
        dataIndex: "feedback.name",
        key: "feedback_title"
      },
      {
        title: "Company Name",
        dataIndex: "company.name",
        key: "company_name"
      },
      {
        title: "Service Type & Name",
        key: "service",
        render: row => <>
          <p><strong>{row?.service_type?.name}</strong></p>
          <p>{row?.service?.full_name}</p>
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
        render: (row) =>row?.status,
      },
      {
        title: "Action",
        key: "action",
        render: (row) => (
          <Button onClick={() => {
            setEdit(row);
            setModal(true);
            setIsUpdate(true);
            history.push(`/feedback/feedback-card-wise-question-view?feedback_id=${row?.id}&type=view`)
          }} type="link">
            View
          </Button>
        ),
      },
    ];

    return (
        <Wrapper>
            <Flex space="1rem" justify="normal">
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
                  placeholder='Service Type'
                  dropdownMatchSelectWidth={false}
                  value={selectedServiceTypeId}
                  onChange={(value)=>setSelectedServiceTypeId(value)}
                  filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {serviceTypeList ? serviceTypeList.map(serviceType=>{
                    return(
                      <Select.Option value={serviceType.id} label={serviceType.name}>{serviceType.name}</Select.Option>
                    )
                  }):null}
                </Select>
                <Select 
                  allowClear
                  style={{width: '30%', 'marginRight': '1rem'}}
                  showSearch
                  placeholder='Service'
                  dropdownMatchSelectWidth={false}
                  value={selectedServiceId}
                  onChange={(value)=>setSelectedServiceId(value)}
                  filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {serviceList ? serviceList.map(service=>{
                    return(
                      <Select.Option value={service.id} label={service.name}>{service.name}</Select.Option>
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
                  <Select.Option key="Initiated" value="Initiated">Initiated</Select.Option>
                  <Select.Option key="In Progress" value="In Progress">In Progress</Select.Option>
                  <Select.Option key="Completed" value="Completed">Completed</Select.Option>
                </Select>
            </Flex>
            <Flex space="1rem" justify="normal">
              <Table 
                rowKey={({ record }) => record?.id}
                scroll={{ y: '100vh'}}  
                dataSource={feedbackist} 
                columns={columns} 
                pagination={{
                  current: currentPage,
                  total: pageCount * 10,
                  onChange: (page) => paginate(page),
                }}
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

export default UserWiseFeedbackList;