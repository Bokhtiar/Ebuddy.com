import React, { useState, useEffect } from 'react';
import {useHistory} from "react-router-dom";
import {Button, Table, Tag, Select, Modal, Form, Input, Checkbox } from "antd";
import {TableWrapper, Wrapper} from "../../../commons/Wrapper";
import {Flex} from "../../../commons/Flex";
import SearchFilter from "../../../commons/SearchFilter";
import {getData, postData} from "../../../../scripts/api-service";
import { PIS_COMPANY_LIST, SOP_SETUP, PIS_DEPARTMENT_LIST, TEAMS_LIST_ALL } from "../../../../scripts/api";
import { dateFormat } from "../../../../scripts/helper";
import { alertPop } from '../../../../scripts/message';
import CreateSOP from './createSop';
import EditSOP from './editSop';
import cookies from "js-cookie";
import * as Cookies from "js-cookie";

const SOPSetup = Form.create()(({form}) => {
  const company_id = JSON.parse(Cookies.get("profile")).company_id;
  const [departmentList, setDepartmentList] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [pageCount, setPageCount] = useState();
  const [sopList, setSOPList] = useState();
  const [selectedCompanyId, setSelectedCompanyId] = useState();
  const [selectedStatus, setSelectedStatus] = useState();
  const [modal, setModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [edit, setEdit] = useState();
  const [isCreateAnother, setIsCreateAnother] = useState();
  const [userData, setUserData] = useState();
  const [deptIds, setDeptIds] = useState();
  const [searchString, setSearchString] = useState();
  const [dateFilter, setDateFilter] = useState();
  const history = useHistory();

  const search = (value) => setSearchString(value);
  const filter = (filter) => setDateFilter(filter);

  const getSOPList = async () => {
    let url = SOP_SETUP + '?';
    url = url + '&company_id=' + company_id;
    if(currentPage) url = url + '&page=' + currentPage;
    if (searchString) url = url + "&search=" + searchString;
    if (dateFilter && dateFilter.date_from && dateFilter.date_to) url = url + `&from_date=${dateFilter.date_from}&to_date=${dateFilter.date_to}`;
    if(selectedDepartment) url = url + '&department_id=' + selectedDepartment;
    if(selectedStatus === 1) url = url + '&status=' + 1;
    if(selectedStatus === 0) url = url + '&status=' + 0;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data?.data;
      if (res?.data?.code === 200) {
        setSOPList(masterData);
        setPageCount(res?.data?.data.last_page);
      }
    }
  }

  const getDepartmentList = async () => {
    let url = PIS_DEPARTMENT_LIST + "?"; 
    url = url + "&company_id=" + company_id;
    let res = await getData(url);

    if (res) {
      let masterData = res?.data?.data;
      if (res?.data?.code === 200) {
        setDepartmentList(masterData);
      }
    }
  }
  
  const paginate = (page) => setCurrentPage(page);

  const localSubmit = (e) => {
    e.preventDefault();
    form.validateFields(async(err, values) => {
      if (!err) {
        let payload = {
          ...values,
        }
        let url = edit ? SOP_SETUP + '/' + edit?.id : SOP_SETUP;
        let res = await postData(url, payload);

        if (res) {
          let masterData = res?.data?.data;
          history.push('/sop/configuration');
          alertPop('success', 'SOP setup successfully');
          setModal(false);
          getSOPList();
          setIsCreateAnother(false);
          if(isCreateAnother) {
            setModal(true);
          }
          form.resetFields();
        }
      }
    })
  }

  useEffect(() => {
    getSOPList();
    const profile = JSON.parse(cookies.get("profile") || "");
    setUserData(profile);
  }, []);

  useEffect(() => {
    if(company_id) getDepartmentList();
  }, [company_id]);

  useEffect(() => {
    getSOPList();
  }, [currentPage, selectedCompanyId, selectedStatus, selectedDepartment, searchString, dateFilter]);

  const columns = [
    {
      title: "Company",
      dataIndex: "company.name",
      key: "company_name"
    },
    {
      title: "Departments",
      // dataIndex: "company.name",
      // key: "company_name"
      render: row => row?.sop_department_info?.map((item, index)=>{
        return <Tag key={`department-${index}`} className="m-1">{item.department?.name}</Tag>
      }),
      width: '40%'
    },
    {
      title: "SOP Title",
      dataIndex: "name",
      key: "sop_title"
    },
    {
      title: "Timeline",
      key: "estimation",
      render: row => <p style={{color: '#F39D2D'}}><strong>{`${row?.estimation} day(s)`}</strong></p>
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
          setEdit(row);
          setModal(true);
          setIsUpdate(true);
        }} type="link">
          Edit
        </Button>
      ),
    },
  ];

  
  return (
    <Wrapper>
      <SearchFilter
        search={search}
        filter={filter}
        filterOptions={[{ type: "date_range" }]}
        failsafe
      />
        <Flex space="1rem" justify="normal">
            <Button 
                onClick={()=>{
                  setModal(true);
                  setEdit(null);
                }} 
                width="40%" 
                type="primary" 
                style={{'marginRight': '1rem'}}
            >
              Setup New SOP
            </Button>

            <Select
                allowClear
                style={{width: '30%', 'marginRight': '1rem'}} 
                getPopupContainer={trigger => trigger.parentNode}
                dropdownMatchSelectWidth={false}
                placeholder='Select Department'
                disabled={!departmentList?.length}
                onChange={(value)=> setSelectedDepartment(value)}
                showSearch
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                {departmentList ? departmentList.map(dept => {
                return (<Select.Option key={dept.id} value={dept.id}>{dept.name}</Select.Option>)
                }) : null}
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
            dataSource={sopList} 
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
          title="Setup SOP"
          visible={modal}
          width="35vw"
          onCancel={() => {
            setModal(false);
            setIsUpdate(false);
            setIsCreateAnother(false);
            setEdit(null);
          }}
          footer={false}
        >
          {edit ? 
            <EditSOP 
              form={form}
              localSubmit={localSubmit}
              edit={edit}
              isUpdate={isUpdate}
              departmentList={departmentList}
            />
          :
            <CreateSOP 
              form={form}
              localSubmit={localSubmit}
              edit={edit}
              isCreateAnother={isCreateAnother}
              setIsCreateAnother={setIsCreateAnother}
              isUpdate={isUpdate}
              userData={userData}
              departmentList={departmentList}
            />
          }
      </Modal> 
    </Wrapper>
  )
})

export default SOPSetup;