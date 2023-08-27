import React, { useState, useEffect } from 'react';
import {useHistory} from "react-router-dom";
import {Button, Table, Tag, Select, Modal, Radio, Form, Input, Checkbox } from "antd";
import {TableWrapper, Wrapper} from "../../../commons/Wrapper";
import {Flex} from "../../../commons/Flex";
import {getData, postData} from "../../../../scripts/api-service";
import { INDUSTRY_TYPE_DROPDOWN_LIST, FEEDBACK_SERVICE_LIST, FEEDBACK_SERVICE_TYPE_LIST, FEEDBACK_INITIATE, DEPARTMENT_LIST_ALL ,INDUSTRY_TYPE_PLOTTER } from "../../../../scripts/api";
import { dateFormat } from "../../../../scripts/helper";
import sales_task from "../../../../assets/icons/test/sales_task_icon.svg";
import DetailsModal from "./details-modal";

const IndustryWiseSummary = () => {
    const [currentPage, setCurrentPage] = useState();
    const [pageCount, setPageCount] = useState();
    const [industryWisePlotterList, setIndustryWisePlotterList] = useState();
    const [departmentList, setDepartmentList] = useState();
    const [serviceTypeList, setServiceTypeList] = useState();
    const [industryTypeList, setIndustryTypeList] = useState();
    const [selectedDepartmentId, setSelectedDepartmentId] = useState();
    const [selectedServiceTypeId, setSelectedServiceTypeId] = useState();
    const [selectedIndustryTypeId, setSelectedIndustryTypeId] = useState();
    const [selectedSynergy, setSelectedSynergy] = useState();
    const [modal, setModal] = useState(false);
    const [modalData, setModalData] = useState();
    const history = useHistory();
    
    const getIndustryWisePlotterList = async () => {
      let url = INDUSTRY_TYPE_PLOTTER + '?';
      if(currentPage) url = url + '&page=' + currentPage;
      if(selectedDepartmentId) url = url + '&department_id=' + selectedDepartmentId;
      if(selectedIndustryTypeId) url = url + '&industry_type_id=' + selectedIndustryTypeId;
      if(selectedServiceTypeId) url = url + '&service_type_id=' + selectedServiceTypeId;
      if(selectedSynergy) url = url + '&synergy=' + selectedSynergy;
      let res = await getData(url);
  
      if (res) {
        let masterData = res?.data?.data;
        console.log("masterData>>>>>>>", masterData);
        if (res) {
            setIndustryWisePlotterList(masterData);
            setPageCount(res?.data?.data?.last_page);
        }
      }
    }

    const getDepartmentList = async () => {
      let res = await getData(DEPARTMENT_LIST_ALL);
      
      if (res) {
        let masterData = res?.data?.data;
        if (res) {
            setDepartmentList(masterData);
        }
      }
    }
    
    const getIndustryTypeList = async () => {
        let url = FEEDBACK_SERVICE_LIST + '?';
        if(selectedServiceTypeId) url += "service_type_id=" + selectedServiceTypeId;
        let res = await getData(url);
        
        if (res) {
          let masterData = res?.data?.data;
          if (res) {
            setIndustryTypeList(masterData);
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

    const paginate = (page) => setCurrentPage(page);

    useEffect(() => {
        getDepartmentList();
        getIndustryTypeList();
        getServiceTypeList();
    }, []);

    useEffect(() => {
        if(selectedDepartmentId) getIndustryWisePlotterList();
    }, [currentPage, selectedDepartmentId, selectedServiceTypeId, selectedIndustryTypeId, selectedSynergy]);


    const columns = [
      {
        title: "Industry",
        dataIndex: "industry_name",
        key: "industry"
      },
      {
        title: "Onboarded",
        key: "onboarded",
        render: row => 
        <Button
            type="primary"
            size="small"
            onClick={()=>{
                setModal(true);
                setModalData(row?.onboarded)
            }}
        >
            {row?.onboarded?.length}
        </Button>
      },
      {
        title: "Potential",
        key: "potential",
        render: row => 
        <Button
            type="primary"
            size="small"
            onClick={()=>{
                setModal(true);
                setModalData(row?.potential)
            }}
        >
            {row?.potential?.length}
        </Button>
      },
    ];

    return (
        <Wrapper>
            <Flex space="1rem" justify="normal">
                <Select 
                  allowClear
                  style={{width: '30%', 'marginRight': '1rem'}}
                  showSearch
                  placeholder='Department'
                  dropdownMatchSelectWidth={false}
                  onChange={(value)=>setSelectedDepartmentId(value)}
                  filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {departmentList ? departmentList.map(dept=>{
                    return(
                      <Select.Option key={dept.id} value={dept.id} label={dept.name}>{dept.name}</Select.Option>
                    )
                  }):null}
                </Select>
                <Select 
                  allowClear
                  style={{width: '30%', 'marginRight': '1rem'}}
                  showSearch
                  placeholder='Industry Type'
                  dropdownMatchSelectWidth={false}
                  value={selectedIndustryTypeId}
                  onChange={(value)=>setSelectedIndustryTypeId(value)}
                  filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {industryTypeList ? industryTypeList.map(industryType=>{
                    return(
                      <Select.Option key={industryType.id} value={industryType.id} label={industryType.name}>{industryType.name}</Select.Option>
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
                      <Select.Option key={serviceType.id} value={serviceType.id} label={serviceType.name}>{serviceType.name}</Select.Option>
                    )
                  }):null}
                </Select>
                <Select 
                    allowClear
                    style={{width: '30%', 'marginRight': '1rem'}} 
                    showSearch
                    placeholder="Synergy"
                    dropdownMatchSelectWidth={false}
                    value={selectedSynergy}
                    onChange={(value)=>setSelectedSynergy(value)}
                    filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                    }
                >
                  <Select.Option key="P" value="Potential">Potential</Select.Option>
                  <Select.Option key="O" value="Onboarded">Onboarded</Select.Option>
                </Select>
            </Flex>
            {selectedDepartmentId ?
            <Table 
                rowKey={(record) => record?.industry_id}
                scroll={{ y: '100vh'}}  
                dataSource={industryWisePlotterList} 
                columns={columns} 
                pagination={{
                current: currentPage,
                total: pageCount * 10,
                onChange: (page) => paginate(page),
                }}
            />
            :
            <LandingContent />
            }

            {/* common modal */}
            <Modal width="50vw"
                visible={modal}
                title="Details"
                onCancel={() => {setModal(false)}}
                footer={null}
            >
                <DetailsModal data={modalData}/>
            </Modal>
        </Wrapper>
    )
}

export default IndustryWiseSummary;

const LandingContent = () => {
  return (
    <div className="landing-content mt-5" style={{textAlign: 'center'}}>
      <img src={sales_task} height="200"/>
      <h2>Please Select a Department to generate data</h2>
    </div>
  )
}