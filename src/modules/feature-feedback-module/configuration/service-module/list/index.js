import React, { useState, useEffect } from 'react';
import {useHistory} from "react-router-dom";
import {Button, Table, Tag, Select } from "antd";
import {Wrapper} from "../../../../commons/Wrapper";
import {Flex} from "../../../../commons/Flex";
import {getData} from "../../../../../scripts/api-service";
import { FFM_SERVICE_DROPDOWN_LIST, FFM_SERVICE_MODULE_LIST, ALL_PROJECT_SETUP_LIST } from "../../../../../scripts/api";
import { dateFormat } from "../../../../../scripts/helper";

const ServiceModuleList = () => {
    const [currentPage, setCurrentPage] = useState();
    const [pageCount, setPageCount] = useState();
    const [serviceModuleList, setServiceModuleList] = useState();
    const [projectDropdownList, setProjectDropdownList] = useState();
    const [serviceDropDownList, setServiceDropDownList] = useState();
    const [selectedProjectId, setSelectedProjectId] = useState();
    const [selectedServiceId, setSelectedServiceId] = useState();
    const [selectedStatus, setSelectedStatus] = useState(1);
    const history = useHistory();

    const getServiceModuleList = async () => {
      let url = FFM_SERVICE_MODULE_LIST + '?';
      if(currentPage) url = url + '&page=' + currentPage;
      if(selectedProjectId) url = url + '&project_id=' + selectedProjectId;
      if(selectedServiceId) url = url + '&ffm_service_id=' + selectedServiceId;
      if(selectedStatus === 1) url = url + '&status=' + 1;
      if(selectedStatus === 0) url = url + '&status=' + 0;
      let res = await getData(url);
  
      if (res) {
        let masterData = res?.data?.data?.data;
        if (res) {
          setServiceModuleList(masterData);
          setPageCount(res?.data?.data?.last_page);
        }
      }
    }
    
    const getProjectDropdownList= async () => {
      let res = await getData(ALL_PROJECT_SETUP_LIST);
      
      if (res) {
        let masterData = res?.data?.data;
        if (res) {
          setProjectDropdownList(masterData);
        }
      }
    }
    
    const getServiceDropDownList = async (id) => {
      let url = FFM_SERVICE_DROPDOWN_LIST + '?project_id=' + id;
      let res = await getData(url);
      
      if (res) {
        let masterData = res?.data?.data;
        if (res) {
          setServiceDropDownList(masterData);
        }
      }
    }

    const paginate = (page) => setCurrentPage(page);

    useEffect(() => {
      getServiceModuleList();
      getProjectDropdownList();
    }, []);
    
    useEffect(() => {
      getServiceDropDownList(selectedProjectId);
    }, [selectedProjectId]);
    
    useEffect(() => {
      getServiceModuleList();
    }, [currentPage, selectedProjectId, selectedServiceId, selectedStatus]);

    const columns = [
      {
        title: "Prooject",
        dataIndex: "project.name",
        key: "project"
      },
      {
        title: "Service",
        dataIndex: "service.name",
        key: "service"
      },
      {
        title: "Service Module",
        dataIndex: "name",
        key: "service_module",
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
            history.push(`/ffm/config-service-module-update?service_module_id=${row?.id}`)
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
                      history.push('/ffm/config-service-module-create')
                    } 
                    width="40%" 
                    type="primary" 
                    style={{'marginRight': '1rem'}}
                >
                  Setup New Service Module
                </Button>
                <Select 
                  allowClear
                  style={{width: '30%', 'marginRight': '1rem'}}
                  showSearch
                  placeholder='Project'
                  dropdownMatchSelectWidth={false}
                  value={selectedProjectId}
                  onChange={(value)=>{
                    setSelectedProjectId(value);
                    setServiceDropDownList();
                    setSelectedServiceId();
                  }}
                  filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {projectDropdownList ? projectDropdownList.map(project=>{
                    return(
                      <Select.Option value={project.id} label={project.name}>{project.name}</Select.Option>
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
                  {serviceDropDownList ? serviceDropDownList.map(service=>{
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
                  <Select.Option key="Active" value={1}>Active</Select.Option>
                  <Select.Option key="Inactive" value={0}>Inactive</Select.Option>
                </Select>
            </Flex>
            <Flex space="1rem" justify="normal">
              <Table 
                rowKey={({ record }) => record?.id}
                scroll={{ y: '100vh'}}  
                dataSource={serviceModuleList} 
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

export default ServiceModuleList;