import React, { useState, useEffect } from 'react';
import {Select, Divider, Popconfirm, message, Button, Popover, Icon } from "antd";
import { Wrapper } from "../../../commons/Wrapper";
import SearchFilter from "../../../commons/SearchFilter";
import { Flex } from "../../../commons/Flex";
import { DEPARTMENT_LIST, USER_TEAM_LIST, SUPERVISOR_WISE_KAM_LIST, EMPLOYEE_PA_CHART, USER_LIST, PA_CHART_EXPORT} from "../../../../scripts/api";
import moment from "moment";
import { getData } from "../../../../scripts/api-service";
import {alertPop} from "../../../../scripts/message";

let years = [],
    nextYear = moment().add(10, 'Y').format('YYYY');

    for (let i = 2000; i <= nextYear; i++) {
        years.push(i.toString());
    }

let months = [
    {value: "1", text: "January"},
    {value: "2", text: "February"},
    {value: "3", text: "March"},
    {value: "4", text: "April"},
    {value: "5", text: "May"},
    {value: "6", text: "June"},
    {value: "7", text: "July"},
    {value: "8", text: "August"},
    {value: "9", text: "September"},
    {value: "10", text: "October"},
    {value: "11", text: "November"},
    {value: "12", text: "December"}
];

const PaFillupChart = () => {
    const [selectedYear, setSelectedYear] = useState();
    const [selectedMonth, setSelectedMonth] = useState(moment().subtract(1, 'months').format("M"));
    const [monthName, setMonthName] = useState(moment().subtract(1, 'months').format("MMMM"));
    const [selectedDepartment, setSelectedDepartment] = useState();
    const [departments, setDepartments] = useState();
    const [selectedKAM, setSelectedKAM] = useState();
    const [kamList, setKAMList] = useState();
    const [supervisorWiseKAMList, setSupervisorWiseKAMList] = useState();
    const [paChartData, setPAChartData] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [status, setStatus] = useState('');
    // const [selectKAM, setSelectKAM] = useState();

    useEffect(() => {
        if (moment().format("M") === '1') {
            setSelectedYear(moment().subtract(1, 'years').format("YYYY"))
        } else {
            setSelectedYear(moment().format("YYYY"))
        }
    }, [])

    const addRelevantClass = (i, j) => {
        if (i > 16 && j > 8) return 'ideal-td'
        else if (i < 9 && j < 5) return 'low-td';
        else return ''
    }

    const getDepartments = async () => {
        let res  = await getData(DEPARTMENT_LIST);
    
        if (res) {
            let masterData = res.data.data;
            setDepartments(masterData);
        }
    }

    const getKAMList = async () => {
        let url = USER_LIST + '?department_id=' + selectedDepartment;
        let res = await getData(url);

        if (res) {
            let masterData = res?.data?.data || [];
            setKAMList(masterData);
        }
    }

    const getSupervisorWiseKAMList = async () => {
        let res = await getData(SUPERVISOR_WISE_KAM_LIST + '/'+  selectedKAM);

        if (res) {
            let masterData = res?.data?.data;
            setSupervisorWiseKAMList(masterData);
        }
    }

    const getEmployeePAChat = async () => {
        let url = EMPLOYEE_PA_CHART + '?';
        
        if(selectedYear) url += '&year=' + selectedYear;
        if(monthName) url += '&month=' + monthName;
        if(selectedDepartment) url += '&department_id=' + selectedDepartment;
        if(selectedKAM) url += '&supervisor_id=' + selectedKAM;
        if(selectedEmployee) url += '&emp_id=' + selectedEmployee;
        if(status) url += '&status=' + status;

        let res = await getData(url);
        if (res) {
            let masterData = res?.data?.data || [];
            if (masterData?.length) {
                let content = [];

                masterData.forEach(data => {
                    data.pa_emp_categories.forEach(item => {
                        if (item.pa_category_name === "CORE") {
                            item.unitWeight = Math.ceil(item.unit_weight * 24) ;
                            data["care"] = item;
                        }

                        if (item.pa_category_name === "BEHAVIOR & PERSONAL SKILLS") {
                            item.unitWeight = Math.ceil(item.unit_weight * 12);
                            data["behavior_personal"] = item;
                        }
                    });
                    content.push(data)
                })
                setPAChartData(content);
            } else {
                setPAChartData([]);
            }
        }
    }

    const addActiveTdClass = (i, j) => {
        let employess = [];

        paChartData.forEach(pa => {
            if (pa?.care?.unitWeight === i && pa?.behavior_personal?.unitWeight === j) {
                employess.push(pa);
            }
        });

        return employess.length ? 'active-pa-td' : '';
    }

    const showEmployeeName = (i, j) => {
        let employess = [];

        paChartData.forEach(pa => {
            if (pa?.care?.unitWeight === i && pa?.behavior_personal?.unitWeight === j) {
                employess.push(pa);
            }
        });

       if (employess.length) return <div>
            <Popover overlayClassName='pa-chart-popover' content={popoverContent(employess)}
                    title={<span>Employess</span>}
                >
                {showEmpName(employess)}
            </Popover> 
       </div>
    };

    const showEmpName = (employess) => {
        if (employess?.length) {
            if (employess.length > 2) {
                return  employess[0].employee.emp_id + ', ' +  employess[1].employee.emp_id + " " + (employess.length - 2) + '+'  
            } else if (employess.length === 2) {
                return  employess[0].employee.emp_id + ', ' +  employess[1].employee.emp_id;
            }  else {
                return  employess[0].employee.emp_id;
            }
        }
    } 

    const popoverContent = (employess) => {
        return <ul class="ant-list-items">
                    {
                        employess.map(emp => <li class="ant-list-item" style={{borderBottom: "1px solid #e8e8e8"}}>
                            {emp.employee.name + '(' + emp.employee.emp_id + ')'}</li>)
                    }
                </ul>;
    }

    const monthCalculation = (value) =>{
        setSelectedMonth(value);
        if(value){
          let monthName = months?.filter(item => item.value === value)[0].text;
          setMonthName(monthName);
        }
    }

    const exportData = async () => {
        let url = PA_CHART_EXPORT + "?";
        if (selectedYear && selectedMonth ) {
            let monthName = months?.filter(item => item.value === selectedMonth)[0].text;
            url = url + '&year=' + selectedYear + '&month=' + monthName;
            if(selectedDepartment) url = url + '&department_id=' + selectedDepartment;
            if(selectedKAM) url = url + '&supervisor_id=' + selectedKAM;
            if(selectedEmployee) url = url + '&emp_id=' + selectedEmployee;
            if(status) url = url + '&status=' + status;
            let res = await getData(url);
            let masterData = res?.data?.data;
            window.open(masterData);
        }
        else alertPop("error", "Please select year and month");
    }

    useEffect(()=> {
        getDepartments();
        getKAMList();
        // getEmployeePAChat();
    },[]);

    useEffect(()=> {
        getEmployeePAChat();
    },[selectedYear, monthName, selectedDepartment, selectedKAM, selectedEmployee, status])

    useEffect(() => {
        if(selectedDepartment) getKAMList();
    }, [selectedDepartment]);

    useEffect(()=>{
        if(selectedKAM) getSupervisorWiseKAMList();
    },[selectedKAM])

    return(
        <Wrapper>
            {/* <SearchFilter
                search={search}
                filter={filter}
                filterOptions={[{ type: "date_range" }]}
                failsafe
            /> */}

            <Flex space="1rem" justify="flex-start">
            <Select 
                allowClear={false}
                // disabled={isDisabledType}
                style={{width: '12%', 'marginRight': '1rem'}} 
                placeholder='Year'
                showSearch
                value={selectedYear}
                onChange={(value)=> { setSelectedYear(value) }}                    
                filterOption={(input, option) =>
                    option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0}
            >
                {years.map(y => <Select.Option key={y} value={y}>{y}</Select.Option>)}
            </Select>
            <Select 
                allowClear={false}
                // disabled={isDisabledType}
                style={{width: '12%', 'marginRight': '1rem'}} 
                placeholder='Month'
                showSearch
                value={selectedMonth}
                onChange={(value)=>monthCalculation(value)}
                filterOption={(input, option) =>
                    option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0}
            >
                {months.map(m => <Select.Option key={m.value} value={m.value}>{m.text}</Select.Option>)}
            </Select>

            <Select allowClear={true} 
            // disabled={isDisabledType}
            style={{width: '15%', 'marginRight': '1rem'}} 
            placeholder='Department'
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
            option.props.children
            .toLowerCase()
            .indexOf(input.toLowerCase()) >= 0}
            value={selectedDepartment ? selectedDepartment : undefined }
            onChange={(e) => {setSelectedDepartment(e); setSelectedKAM(null); setSelectedEmployee(null)}}>
            {
                departments?.length ? 
                    departments.map(dep => <Select.Option value={dep.id} key={dep.id}>{dep.name}</Select.Option>) : ''
            }
        </Select>
            <Select 
            allowClear={true} 
            // disabled={isDisabledType}
            style={{width: '14%', 'marginRight': '1rem'}} 
            placeholder='Supervisor'
            showSearch
            optionFilterProp="children"
            onChange={(e)=> setSelectedKAM(e)}
            value={selectedKAM ? selectedKAM : undefined}
            filterOption={(input, option) =>
            option.props.children
            .toLowerCase()
            .indexOf(input.toLowerCase()) >= 0}
            >
            {
                kamList?.length ? 
                    kamList.map(kam => <Select.Option value={kam.emp_id} key={kam.emp_id}>{kam.name}</Select.Option>) : ''
            }
        </Select>
        <Select 
            allowClear={true}
            style={{width: '14%', 'marginRight': '1rem'}} 
            showSearch
            placeholder='Employee'
            value={selectedEmployee ? selectedEmployee : undefined }
            onChange={(e) => setSelectedEmployee(e)}
            filterOption={(input, option) =>
            option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
        >
            {supervisorWiseKAMList?.map(KAM=>{
                return(
                    <Select.Option key={KAM.id} value={KAM.emp_id}>{KAM.name}</Select.Option>

                )
            })}
        </Select>
            <Select 
                allowClear={true}
                // disabled={isDisabledType}
                style={{width: '12%', 'marginRight': '1rem'}} 
                placeholder='Status'
                showSearch
                onChange={(value)=>setStatus(value)}
                filterOption={(input, option) =>
                    option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0}
            >
            <Select.Option key='Created' value='Created'>Created</Select.Option>
                <Select.Option key='Reviewed' value='Reviewed'>Reviewed</Select.Option>
            </Select>
            <Button type="primary" onClick={exportData}><Icon type="download" />Download Excel</Button>
            </Flex>
            <Divider />

            <div className='pa-chart'>
                <div className='chart-left-content'>
                    <h2>Core Objectives</h2>
                    <div className='core-content'>
                        <span className='core-low low-text' id="core-low">Low</span>
                        <span className='core-medium medium-text'  id="core-medium">Medium</span>
                        <span className='core-high ideal-text' id="core-high">High</span>
                    </div>
                </div>
                <table className='chart-table' style={{width: "100%"}} >
                    <tr>
                        <th colspan="8"></th>
                        <th colspan="4" className="ideal-td">Ideal</th>
                    </tr>
                    <tr>
                        {
                            [1,2,3,4,5,6,7,8,9,10,11,12].map(i => <th key={'th-'+ i}>{i}</th>)
                        }
                    </tr>
                    {
                        [24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(i => <>
                            <tr key={'tr-'+ i} id={"tr-b-" + i}>
                                {
                                    [1,2,3,4,5,6,7,8,9,10,11,12].map(j => <td key={'td-'+ i + '-' + j} id={'td-'+ i + '-' + j} 
                                        className={addRelevantClass(i, j) + " " + addActiveTdClass(i, j) }>
                                        {showEmployeeName(i, j)}
                                    </td>)
                                }
                            </tr>
                        </> )
                    }
                    <tr>
                        <td colspan="4" className='low-text'>Low</td>
                        <td colspan="4" className='medium-text'>Medium</td>
                        <td colspan="4" className="ideal-text">High</td>
                    </tr>
                </table>

                <h2 className='behavior-personal'>BEHAVIOR & PERSONAL SKILLS</h2>
            </div>
        </Wrapper>
    )
}
export default PaFillupChart;

// let e = document.getElementById('tr-b-20');
// undefined
// var rect = e.getBoundingClientRect();
// console.log(rect.top, rect.right, rect.bottom, rect.left);

// function positionElement(el, x, y) {
//     el.style.position = 'absolute';
//     el.style.left = x + 'px';
//     el.style.top = y + 'px';
// }
// positionElement(q, 181, 0 )