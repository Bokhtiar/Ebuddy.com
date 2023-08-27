import React, { useState, useEffect } from 'react';
import {useHistory} from "react-router-dom";
import {Button, Table, Tag, Select, Popover} from "antd";
import {Wrapper} from "../../../../commons/Wrapper";
import {Flex} from "../../../../commons/Flex";
import {getData} from "../../../../../scripts/api-service";
import {FFM_FEEDBACK_CONFIGURATION_LIST, FFM_SERVICE_DROPDOWN_LIST, ALL_PROJECT_SETUP_LIST , FFM_FEATURE_FEEDBACK_DROPDOWN_LIST, FFM_SERVICE_MODULE_DROPDOWN_LIST } from "../../../../../scripts/api";

const FeedbackConfigurationList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState();
    const [feedbackConfigList, setFeedbackConfigList] = useState();
    const [projectDropdownList, setProjectDropdownList] = useState();
    const [serviceDropDownList, setServiceDropDownList] = useState();
    const [selectedProjectId, setSelectedProjectId] = useState();
    const [selectedServiceModuleId, setSelectedServiceModuleId] = useState();
    const [serviceModuleDropDownList, setServiceModuleDropDownList] = useState();
    const [selectedFeedbackId, setSelectedFeedbackId] = useState();
    const [feedbackDropDownList, setFeedbackDropDownList] = useState();
    const [selectedServiceId, setSelectedServiceId] = useState();
    const history = useHistory();

    const getFeedbackConfigList = async () => {
      let url = FFM_FEEDBACK_CONFIGURATION_LIST + '?';
      if(currentPage) url = url + '&page=' + currentPage;
      if(selectedProjectId) url = url + '&project_id=' + selectedProjectId;
      if(selectedServiceId) url = url + '&ffm_service_id=' + selectedServiceId;
      if(selectedServiceModuleId) url = url + '&ffm_module_id=' + selectedServiceModuleId;
      if(selectedFeedbackId) url = url + '&ffm_feedback_id=' + selectedFeedbackId;
      let res = await getData(url);
  
      if (res) {
        let masterData = res?.data?.data?.data;
        if (res) {
          setFeedbackConfigList(masterData);
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

    const getServiceModuleDropDownList = async (id) => {
      let url = FFM_SERVICE_MODULE_DROPDOWN_LIST + '?service_id=' + id;
      let res = await getData(url);
      
      if (res) {
        let masterData = res?.data?.data;
        if (res) {
          setServiceModuleDropDownList(masterData);
        }
      }
    }

    const getFeedbackDropDownList = async () => {
      let url = FFM_FEATURE_FEEDBACK_DROPDOWN_LIST ;
      let res = await getData(url);
      
      if (res) {
        let masterData = res?.data?.data;
        if (res) {
          setFeedbackDropDownList(masterData);
        }
      }
    }

    const paginate = (page) => setCurrentPage(page);

    useEffect(() => {
      getFeedbackConfigList();
      getProjectDropdownList();
      getFeedbackDropDownList();
    }, []);

    useEffect(() => {
      getServiceDropDownList(selectedProjectId);
    }, [selectedProjectId]);

    useEffect(() => {
      getServiceModuleDropDownList(selectedServiceId);
    }, [selectedServiceId]);

    useEffect(() => {
      getFeedbackConfigList();
    }, [currentPage, selectedProjectId, selectedServiceId, selectedServiceModuleId, selectedFeedbackId]);

    const columns = [
      {
        title: "Project",
        dataIndex: "project.name",
        key: "project"
      },
      {
        title: "Service",
        dataIndex: "ffm_service.name",
        key: "ffm_service"
      },
      {
        title: "Service Module",
        dataIndex: "ffm_module.name",
        key: "ffm_module"
      },
      {
        title: "Feature",
        dataIndex: "ffm_feature.name",
        key: "ffm_feature"
      },
      {
        title: "Feedback",
        dataIndex: "ffm_feedback.name",
        key: "ffm_feedback"
      },
      {
        title: "Feedback Options",
        key: "ffm_feedback_options",
        render: row => <p>{row?.ffm_feedback_options_configs?.map(item=>{
          return(
            <Popover 
              content={(
                <div>
                  {item.ffm_feedback_reasons_configs[0]?.ffm_reasons?.name ? <Tag>{item.ffm_feedback_reasons_configs[0]?.ffm_reasons?.name}</Tag> : null}
                </div>
              )} 
              title="Reasons"
            >
              <Tag>{item.ffm_options?.name}</Tag>
            </Popover>
          )
        })}</p>
      },
      {
        title: "Action",
        key: "action",
        render: (row) => (
          <Button onClick={() => {
            history.push(`/ffm/config-feedback-configuration-update?feedback_configuration_id=${row?.id}`)
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
                history.push('/ffm/config-feedback-configuration-create')
              } 
              width="40%" 
              type="primary" 
              style={{'marginRight': '1rem'}}
            >
              Setup Feedback Configuration
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
                setServiceModuleDropDownList();
                setSelectedServiceModuleId();
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
              onChange={(value)=>{
                setSelectedServiceId(value);
                setServiceModuleDropDownList();
                setSelectedServiceModuleId();
              }}
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
              placeholder='Service Module'
              dropdownMatchSelectWidth={false}
              value={selectedServiceModuleId}
              onChange={(value)=>setSelectedServiceModuleId(value)}
              filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
              }
            >
              {serviceModuleDropDownList ? serviceModuleDropDownList.map(serviceModule=>{
                return(
                  <Select.Option value={serviceModule.id} label={serviceModule.name}>{serviceModule.name}</Select.Option>
                )
              }):null}
            </Select>
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
              {feedbackDropDownList ? feedbackDropDownList.map(feedback=>{
                return(
                  <Select.Option value={feedback.id} label={feedback.name}>{feedback.name}</Select.Option>
                )
              }):null}
            </Select>
          </Flex>
          <Flex space="1rem" justify="normal">
            <Table 
              rowKey={({ record }) => record?.id}
              scroll={{ x: 'calc(900px + 50%)', y: "calc(100vh-20rem)" }}
              dataSource={feedbackConfigList} 
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

export default FeedbackConfigurationList;