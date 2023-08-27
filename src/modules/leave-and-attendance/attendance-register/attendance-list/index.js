import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Button, Select, Table, Icon,Tag, DatePicker} from "antd";
import {
  EMPLOYEE_INFO_LIST,
  EMPLOYEE_LIST,
  USER_LIST,
  ATTENDANCE_REGISTER,
  PIS_COMPANY_LIST,
  PIS_DEPARTMENT_LIST
} from "../../../../scripts/api";
import {alertPop} from "../../../../scripts/message";
import {getData} from "../../../../scripts/api-service";
import {Flex} from "../../../commons/Flex";
import {TableWrapper, Wrapper} from "../../../commons/Wrapper";
import moment from 'moment';
import sales_task from "../../../../assets/icons/test/sales_task_icon.svg";

export default () => {
    const [companyList, setCompanyList] = useState();
    const [selectedCompany, setSelectedCompany] = useState();
    const [departmentList, setDepartmentList] = useState();
    const [selectedDepartment, setSelectedDepartment] = useState();
    const [employeeList, setEmployeeList] = useState();
    const [selectedEmployee, setSelectedEmployee] = useState();
    const [attendanceRegisterList, setAttendanceRegisterList] = useState();
    const [selectedStatus, setSelectedStatus] = useState();
    const [selectedJoiningDate, setSelectedJoiningDate] = useState();
    const [currentPage, setCurrentPage] = useState();
    const [pageCount, setPageCount] = useState();

    const getAttendanceRegisterList= async () => {
      let url = ATTENDANCE_REGISTER + "?";
      if (currentPage) url = url + `&page=${currentPage}`;
      if (selectedEmployee) url = url + "&emp_id=" + selectedEmployee;
      if (selectedCompany) url = url + "&company_id=" + selectedCompany;
      if (selectedDepartment) url = url + "&department_id=" + selectedDepartment;
      if (selectedStatus) url = url + "&status=" + selectedStatus;
  
      let res = await getData(url);
  
      if (res) {
        let masterData = res?.data?.data?.data;
        setAttendanceRegisterList(masterData);
        setPageCount(res?.data?.data?.last_page);
      }
    };

    const getCompanyList = async () => {
      let url = PIS_COMPANY_LIST + "?";
      let res = await getData(url);
  
      if (res) {
        let masterData = res?.data?.data?.data;
        setCompanyList(masterData);
      }
    };

    const getDepartmentList = async () => {
      let url = PIS_DEPARTMENT_LIST + "?"; 
      if(selectedCompany) url = url + "&company_id=" + selectedCompany;
      let res = await getData(url);
  
      if (res) {
        let masterData = res?.data?.data;
        setDepartmentList(masterData);
      }
    };

    const getEmployeeList = async () => {
      let url = EMPLOYEE_INFO_LIST + "?";
      if(selectedDepartment) url = url + "&department_id=" + selectedDepartment;
      let res = await getData(url);
  
      if (res) {
        let masterData = res?.data?.data;
        setEmployeeList(masterData);
      }
    };
  
    useEffect(()=>{
      getCompanyList();
      // getAttendanceRegisterList();
    },[]);

    useEffect(()=>{
      if(selectedCompany) getDepartmentList();
    },[selectedCompany]);
  
    useEffect(()=>{
      if(selectedDepartment) getEmployeeList();
    },[selectedDepartment]);

    useEffect(()=>{
      getAttendanceRegisterList();
    },[selectedEmployee, selectedCompany, selectedDepartment, selectedStatus, currentPage]);

    const columns = [
        { 
          title: "Company Name",
          key: "company_name",
          render: (row) => row?.company?.name
        },
        { title: "Department",
          key: "department",
          render: (row) => row?.department?.name
        },
        { title: "Employee",
          key: "employee", 
          render: (row) => row?.employee?.name 
        },
        {
          title: "Date",
          key: "date",
          render: (row) => moment(row?.date).format("D MMM YYYY") ,
        },
        {
          title: "In Time",
          key: "in_time",
          render: (row) => row?.first_in_time
        },
        {
          title: "Status",
          key: "status",
          render: (row) => row?.status
        },
        {
          title: "Action",
          key: "action",
          render: (row) => 
          <>
            {/* <Button 
                type="link"
                // onClick={() => window.open(`/supervisor-panel/nominee-view?rowId=${row.id}&month=${selecedMonth}&year=${selecedYear}`)}
            >
                Details
            </Button> */}
            <Button 
              type="link"
            >
              <Link 
                to={`/leave-and-attendance/attendance-single-entry?rowId=${row?.id}`}>
                  Edit
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
                      to={`/leave-and-attendance/attendance-single-entry`}>
                        Assign New Attendance
                    </Link>
                </Button>
                <Select 
                    allowClear={true}
                    style={{width: '25%', 'marginRight': '1rem'}} 
                    placeholder='Company'
                    showSearch
                    value={selectedCompany}
                    onChange={(value)=>{
                      setSelectedCompany(value)
                      setSelectedDepartment(null)
                      setSelectedEmployee(null)
                    }} 
                    filterOption={(input, option) =>
                      option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0}
                >
                    {companyList?.map(m => <Select.Option key={m.value} value={m.id}>{m.name}</Select.Option>)}
                </Select>
                <Select 
                    allowClear={true}
                    style={{width: '25%', 'marginRight': '1rem'}} 
                    placeholder='Department'
                    showSearch
                    value={selectedDepartment ? selectedDepartment : undefined}
                    onChange={(value)=>{
                      setSelectedDepartment(value)
                      setSelectedEmployee(null)
                    }}
                    filterOption={(input, option) =>
                      option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0}
                >
                    {departmentList?.map(m => <Select.Option key={m.value} value={m.id}>{m.name}</Select.Option>)}
                </Select>
                <Select 
                    allowClear={true}
                    style={{width: '25%', 'marginRight': '1rem'}} 
                    placeholder='Employee'
                    showSearch
                    value={selectedEmployee ? selectedEmployee : undefined}
                    onChange={(value)=>setSelectedEmployee(value)}
                    filterOption={(input, option) =>
                      option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0}
                >
                    {employeeList?.map(m => <Select.Option key={m.value} value={m.emp_id}>{m.name}</Select.Option>)}
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
                    <Select.Option key="Normal" value="Normal">Normal</Select.Option>
                    <Select.Option key="Late-In" value="Late-In">Late-In</Select.Option>
                    <Select.Option key="Half-Day" value="Half-Day">Half-Day</Select.Option>
                    <Select.Option key="Work-From-Home" value="Work-From-Home">Work-From-Home</Select.Option>
                    <Select.Option key="Absence" value="Absence">Absence</Select.Option>
                    <Select.Option key="Out-Duty" value="Out-Duty">Out-Duty</Select.Option>
                    <Select.Option key="Leave" value="Leave">Leave</Select.Option>
                    <Select.Option key="Adjustment" value="Adjustment">Adjustment</Select.Option>
                </Select>
            </Flex>
            {attendanceRegisterList?.length > 0 ? (
                <Table
                    dataSource={attendanceRegisterList}
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