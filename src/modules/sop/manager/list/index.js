import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Button, Select, Table, Tag} from "antd";
import {SOP_INITIATE, TASK_SETUP_SOP_LIST} from "../../../../scripts/api";
import {getData} from "../../../../scripts/api-service";
import {Flex} from "../../../commons/Flex";
import {TableWrapper} from "../../../commons/Wrapper";
import sales_task from "../../../../assets/icons/test/sales_task_icon.svg";
import * as Cookies from "js-cookie";

export default () => {
    const company_id = JSON.parse(Cookies.get("profile")).company_id;
    const [sopInitiateList, setSOPInitiateList] = useState();
    const [selectedCompany] = useState(company_id);
    const [sopList, setSOPList] = useState();
    const [selectedSOP, setSelectedSOP] = useState();
    const [selectedStatus, setSelectedStatus] = useState();
    const [currentPage, setCurrentPage] = useState();
    const [pageCount, setPageCount] = useState();

    const getSOPInitiateList = async () => {
      let url = SOP_INITIATE + "?";
      if (currentPage) url = url + `&page=${currentPage}`;
      if (selectedSOP) url = url + `&sop_setup_id=${selectedSOP}`;
      if (selectedCompany) url = url + "&company_id=" + selectedCompany;
      if (selectedStatus) url = url + "&leave_type=" + selectedStatus;
  
      let res = await getData(url);
  
      if (res) {
        let masterData = res?.data?.data?.data;
        setSOPInitiateList(masterData);
        setPageCount(res?.data?.data?.last_page);
      }
    };


    const getSOPList = async () => {
      let url = TASK_SETUP_SOP_LIST + "?"; 
      if(selectedCompany) url = url + "&company_id=" + selectedCompany;
      let res = await getData(url);
  
      if (res) {
        let masterData = res?.data?.data;
        setSOPList(masterData);
      }
    };

    useEffect(()=>{
        if(selectedCompany) getSOPList();
    },[selectedCompany]);

    useEffect(()=>{
      getSOPInitiateList();
    },[ selectedSOP, selectedCompany, selectedStatus, currentPage]);

    const columns = [
        { 
          title: "SOP Title",
          key: "sop",
          render: (row) => row?.sop_setup?.name
        },
        { title: "Company",
          key: "company",
          render: (row) => row?.company?.name
        },
        { title: "Start Date",
          dataIndex: "start_date",
          key: "start_date", 
        },
        {
          title: "End Date",
          dataIndex: "end_date",
          key: "end_date",
        },
        {
          title: "Estimated Day",
          dataIndex: "estimation_day",
          key: "estimation_day",
        },
        // {
        //   title: "Created By",
        //   key: "created_by",
        //   render: (row) => row?.created_by
        // },
        {
          title: "Status",
          key: "status",
          render: (row) => (row.status === 1 ? <Tag color="#A0DA30" style={{color: 'white'}}>Active</Tag> : <Tag color="#F2452F" style={{color: 'white'}}>Inactive</Tag>),
        },
        {
          title: "Action",
          key: "action",
          render: (row) => 
          <>
            <Button 
              type="link"
            >
              <Link to={`/sop/sop-initiate-view?sop_id=${row?.id}&sop_setup_id=${row?.sop_setup_id}`}>
                View
              </Link>
            </Button> &nbsp;
            <Button type="link">
              <Link to={`/sop/sop-initiate-clone?sop_id=${row?.id}&sop_setup_id=${row?.sop_setup_id}`}>
                Clone
              </Link>
            </Button>
          </>,
        },
    ];

    return (
        <TableWrapper>
            <Flex space="1rem" justify="">
                <Button 
                  style={{width: '20%', 'marginRight': '1rem'}}
                  type="primary" 
                >
                    <Link 
                      to={`/sop/sop-initiate`}>
                        Initiate SOP
                    </Link>
                </Button>
                <Select 
                    allowClear={true}
                    style={{width: '25%', 'marginRight': '1rem'}} 
                    placeholder='SOP'
                    showSearch
                    value={selectedSOP}
                    onChange={(value)=> setSelectedSOP(value)}
                    filterOption={(input, option) =>
                      option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0}
                >
                    {sopList?.map((m, idx) => <Select.Option key={idx} value={m.id}>{m.name}</Select.Option>)}
                </Select>
                <Select 
                    allowClear={true}
                    style={{width: '25%', 'marginRight': '1rem'}} 
                    placeholder='Status'
                    showSearch
                    value={selectedStatus}
                    onChange={(value)=>setSelectedStatus(value)}
                    filterOption={(input, option) =>
                        option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0}
                >
                    <Select.Option key="Active" value={1}>Active</Select.Option>
                    <Select.Option key="Inactive" value={0}>Inactive</Select.Option>
                </Select>
            </Flex>
            {sopInitiateList?.length > 0 ? (
                <Table
                    rowKey={record => record.id}
                    dataSource={sopInitiateList}
                    columns={columns}
                    scroll={{ y: "calc(100vh - 15rem)" }}
                    // pagination={false}
                    pagination={{
                        current: currentPage,
                        total: pageCount * 10,
                        onChange: (page) => setCurrentPage(page),
                    }}
                />
            ) : <LandingContent />}
        </TableWrapper>
    );
};

const LandingContent = () => {
    return (
        <div className="landing-content mt-5" style={{textAlign: 'center'}}>
            <img src={sales_task} height="200"/>
            <h2>No Data found</h2>
        </div>
    )
}