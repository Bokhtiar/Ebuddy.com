import React, { useState, useEffect } from 'react';
import { Table, Select, DatePicker } from "antd";
import {Wrapper} from "../../commons/Wrapper";
import {Flex} from "../../commons/Flex";
import {getData} from "../../../scripts/api-service";
import { DEPARTMENT_LIST, PITCH_INITIATE_LIST, PITCH_DROPDOWN_LIST } from "../../../scripts/api";

const PitchList = () => {
    const [currentPage, setCurrentPage] = useState();
    const [pageCount, setPageCount] = useState();
    const [pitchList, setPitchList] = useState();
    const [pitchDropdownList, setPitchDropdownList] = useState();
    const [startFrom, setStartFrom] = useState();
    const [endFrom, setEndFrom] = useState();
    const [departmentList, setDepartmentList] = useState();
    const [selectedPitch, setSelectedPitch] = useState();
    const [selectedDepartment, setSelectedDepartment] = useState();

    const handleDateChange = (date, dateString) => {
      setStartFrom(dateString[0]);
      setEndFrom(dateString[1]);
    };

    
    const getPitchList = async () => {
      let url = PITCH_INITIATE_LIST + '?';
      if(currentPage) url = url + '&page=' + currentPage;
      if (startFrom && endFrom) url = url + '&from_date=' + startFrom + "&to_date=" + endFrom;
      if(selectedPitch) url = url + '&pitch_id=' + selectedPitch;
      if(selectedDepartment) url = url + '&department_id=' + selectedDepartment;
      let res = await getData(url);
  
      if (res) {
        let masterData = res?.data?.data?.data;
        if (res) {
          setPitchList(masterData);
          setPageCount(res?.data?.data?.last_page);
        }
      }
    }

    const getPitchDropdownList = async () => {
      let res = await getData(PITCH_DROPDOWN_LIST);
      
      if (res) {
        let masterData = res?.data?.data;
        if (res) {
          setPitchDropdownList(masterData);
        }
      }
    }
    
    const getDepartmentList = async (id) => {
      let url = DEPARTMENT_LIST;
      let res = await getData(url);
      
      if (res) {
        let masterData = res?.data?.data;
        if (res) {
          setDepartmentList(masterData);
        }
      }
    }

    const paginate = (page) => setCurrentPage(page);

    useEffect(() => {
      getPitchList();
      getPitchDropdownList();
      getDepartmentList();
    }, []);

    useEffect(() => {
      getPitchList();
    }, [currentPage, startFrom, endFrom, selectedPitch, selectedDepartment]);

    const columns = [
      // {
      //   title: "SL",
      //   dataIndex: "id",
      //   key: "serial"
      // },
      {
        title: "Client Name",
        dataIndex: "client.name",
        key: "client_name"
      },
      {
        title: "Pitch Title",
        dataIndex: "pitch.name",
        key: "pitch_title"
      },
      {
        title: "Date",
        dataIndex: "pitch_date",
        key: "date"
      },
      {
        title: "KAM",
        dataIndex: "created_by.name",
        key: "kam"
      },
      {
        title: 'Feedback',
        children: [
          {
            title: 'Like',
            dataIndex: 'like',
            key: 'like',
            width: 100,
          },
          {
            title: 'Dislike',
            dataIndex: 'dislike',
            key: 'dislike',
            width: 100,
          },
          {
            title: 'No Comments',
            dataIndex: 'no_comments',
            key: 'no-comments',
            width: 100,
          },
          {
            title: 'No Response',
            dataIndex: 'no_response',
            key: 'no-response',
            width: 100,
          },
        ],
      },
      // {
      //   title: "Action",
      //   key: "action",
      //   render: (row) => (
      //     <Button onClick={() => {
      //       setEdit(row);
      //       setModal(true);
      //       setIsUpdate(true);
      //       // history.push(`/pitch/pitch-create?pitch_id=${row?.id}`)
      //     }} type="link">
      //       View
      //     </Button>
      //   ),
      // },
    ];

    return (
      <Wrapper>
        <Flex space="1rem" justify="normal">
          <Select 
            allowClear
            style={{width: '30%', 'marginRight': '1rem'}}
            showSearch
            placeholder='Pitch'
            dropdownMatchSelectWidth={false}
            value={selectedPitch}
            onChange={(value)=>setSelectedPitch(value)}
            filterOption={(input, option) =>
            option.props.children
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0
            }
          >
            {pitchDropdownList ? pitchDropdownList.map(pitch=>{
              return(
                <Select.Option value={pitch.id} label={pitch.name}>{pitch.name}</Select.Option>
              )
            }):null}
          </Select>
          <Select 
            allowClear
            style={{width: '30%', 'marginRight': '1rem'}}
            showSearch
            placeholder='Department'
            dropdownMatchSelectWidth={false}
            value={selectedDepartment}
            onChange={(value)=>setSelectedDepartment(value)}
            filterOption={(input, option) =>
            option.props.children
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0
            }
          >
            {departmentList ? departmentList.map(department=>{
              return(
                <Select.Option value={department.id} label={department.name}>{department.name}</Select.Option>
              )
            }):null}
          </Select>
          <DatePicker.RangePicker
              placeholder="Select date range"
              size="medium"
              onChange={handleDateChange}
              style={{ width: '300px', 'marginRight': '0.5rem' }}
          />
        </Flex>
        <Flex space="1rem" justify="normal">
          <Table 
            bordered
            rowKey={(record) => record?.id}
            scroll={{ y: '100vh'}}  
            dataSource={pitchList} 
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

export default PitchList;