import React, { useState, useEffect } from 'react';
import {useHistory} from "react-router-dom";
import {Button, Table, Tag, Select, Popover, Icon} from "antd";
import { Wrapper} from "../../../commons/Wrapper";
import {Flex} from "../../../commons/Flex";
import {getData} from "../../../../scripts/api-service";
import { FFM_SERVICE_DROPDOWN_LIST, ALL_PROJECT_SETUP_LIST , FFM_FEATURE_FEEDBACK_DROPDOWN_LIST, FFM_SERVICE_MODULE_DROPDOWN_LIST , FFM_FEATURE_FEEDBACK_LIST } from "../../../../scripts/api";
import ReactPlayer from 'react-player';

const FeatureWiseFeedbackList = () => {
    const [currentPage, setCurrentPage] = useState();
    const [pageCount, setPageCount] = useState();
    const [featureFeedbackList, setFeatureFeedbackList] = useState();
    const [projectDropdownList, setProjectDropdownList] = useState();
    const [serviceDropDownList, setServiceDropDownList] = useState();
    const [selectedProjectId, setSelectedProjectId] = useState();
    const [selectedServiceModuleId, setSelectedServiceModuleId] = useState();
    const [serviceModuleDropDownList, setServiceModuleDropDownList] = useState();
    const [selectedFeedbackId, setSelectedFeedbackId] = useState();
    const [feedbackDropDownList, setFeedbackDropDownList] = useState();
    const [selectedServiceId, setSelectedServiceId] = useState();
    const [selectedStatus, setSelectedStatus] = useState();
    const history = useHistory();

    const getFeatureFeedbackList = async () => {
      let url = FFM_FEATURE_FEEDBACK_LIST + '?';
      if(currentPage) url = url + '&page=' + currentPage;
      if(selectedProjectId) url = url + '&project_id=' + selectedProjectId;
      if(selectedServiceId) url = url + '&ffm_service_id=' + selectedServiceId;
      if(selectedServiceModuleId) url = url + '&module_id=' + selectedServiceModuleId;
      if(selectedFeedbackId) url = url + '&feedback_id=' + selectedFeedbackId;
      if(selectedStatus === 1) url = url + '&status=' + 1;
      if(selectedStatus === 0) url = url + '&status=' + 0;
      let res = await getData(url);
  
      if (res) {
        let masterData = res?.data?.data?.data;
        if (res) {
          setFeatureFeedbackList(masterData);
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

    let audio = new Audio("https://file-examples.com/storage/fec6ed21bf63d96b49d1196/2017/11/file_example_MP3_5MG.mp3")

    const paginate = (page) => setCurrentPage(page);

    useEffect(() => {
      getFeatureFeedbackList();
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
      getFeatureFeedbackList();
    }, [currentPage, selectedProjectId, selectedServiceId, selectedServiceModuleId, selectedFeedbackId, selectedStatus]);

    const columns = [
      {
        title: "Project",
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
        dataIndex: "service_module.name",
        key: "service_module",
      },
      {
        title: "Feature",
        dataIndex: "feature.name",
        key: "feature",
      },
      {
        title: "Feedback",
        dataIndex: "feedback.name",
        key: "feedback",
      },
      {
        title: "Audio",
        key: "audio",
        render: row => 
        <Button shape="circle" disabled={!row?.audio_file}>
          <Popover 
            content={(
              <div>
                <audio controls controlsList="nodownload">
                  <source 
                    // src="https://file-examples.com/storage/fec6ed21bf63d96b49d1196/2017/11/file_example_MP3_5MG.mp3" 
                    src={row?.audio_file}
                    type="audio/ogg" 
                  />
                </audio>
              </div>
            )} 
            title="Audio File" 
            trigger="click"
          >
            <Icon 
              type="audio" 
              style={{fontSize: '1rem'}}
            />
          </Popover>
        </Button>
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
            history.push(`/pitch/config-pitch-create?pitch_id=${row?.id}`)
          }} type="link">
            Edit
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
                rowKey={(record) => record?.id}
                scroll={{ y: '100vh'}}  
                dataSource={featureFeedbackList} 
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

export default FeatureWiseFeedbackList;