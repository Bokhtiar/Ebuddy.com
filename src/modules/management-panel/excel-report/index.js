
import {Button, Divider, Modal, Select, Skeleton, Table, Icon} from "antd";
import React, {useEffect, useState} from "react";
import {
    CLIENT_LIST,
    COMPANY_SIZE_LIST,
    COMPANY_TYPE_LIST,
    INDUSTRY_SECTOR_LIST,
    INDUSTRY_TYPE_LIST,
    GET_CLIENT_FILTER,
    TASK_SUMMARY_REPORT,
    TASK_SUMMARY_REPORT_EXPORT
} from "../../../scripts/api";
import {alertPop} from "../../../scripts/message";
import {getData} from "../../../scripts/api-service";
import {Flex} from "../../commons/Flex";
import {PageTitle} from "../../commons/PageTitle";
import SearchFilter from "../../commons/SearchFilter";
import {TableWrapper} from "../../commons/Wrapper";
import {dateFormat} from "../../../scripts/helper";
import DataTable from './DataTable';
import sales_task from "../../../assets/icons/test/sales_task_icon.svg";
import moment from "moment";


/*
    These are newer modules and ant design Tables are used instead
    of custom designed Tables in the project commons directory
*/
// className: 'text-primary',
//     style: {backgroundColor: 'black'},

let years = [],
    nextYear = moment().add(10, 'Y').format('YYYY');

    for (let i = 1971; i <= nextYear; i++) {
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


export default () => {
    const [modal, setModal] = useState();
    const [edit, setEdit] = useState();
    const [list, setList] = useState();
    const [pageCount, setPageCount] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchString, setSearchString] = useState();
    const [industryTypes, setIndustryTypes] = useState();
    const [industrySectors, setIndustrySectors] = useState();
    const [companyTypes, setCompanyTypes] = useState();
    const [companySizes, setCompanySizes] = useState();
    const [clientDepartment, setClientDeplartment] = useState();
    const [filterData, setFilterData] = useState();
    const [selectedYear, setSelectedYear] = useState();
    const [selectedMonth, setSelectedMonth] = useState();
    const [generatedReportList, setGeneratedReportList] = useState();
    const [editedData, setEditedData] = useState();

    const calculateTotal = (row, value) =>{
        let sum = 0;
        Object.values(row.dates).forEach(element => {
            if(value === 'Satisfied') sum+= element.S
            if(value === 'Helped') sum+= element.H
            if(value === 'Unsatisfied') sum+= element.U
            if(value === 'Not Reviewed') sum+= element.N
        });
        return sum; 
    }

    const calculateTotalPercenetage = (row, value) =>{
        let singleElementSum = 0;
        let totalSum = 0;
        let percent = 0;
        Object.values(row.dates).forEach(element => {
            if(value === 'Satisfied') singleElementSum+= element.S
            if(value === 'Helped') singleElementSum+= element.H
            if(value === 'Unsatisfied') singleElementSum+= element.U
            if(value === 'Not Reviewed') singleElementSum+= element.N
        });

        Object.values(row.dates).forEach(element => totalSum += element.S + element.H + element.U + element.N)
        
        if(totalSum > 0) return percent = parseInt((singleElementSum/totalSum) * 100) + '%';
        else return 0 + '%';
    }

    useEffect(()=>{
        if(generatedReportList){
            let dateArray = generatedReportList.map(row => Object.entries(row.dates).map(data => ({ 
                title: data[0],
                subColumn: Object.keys(data[1]).map(key => ({ title: key, value: data[1][key] }))
            })));
            let result = []
            result.push(dateArray[0])
            setEditedData(result);
        }
    },[generatedReportList])

    const search = (value) => {
        //todo
        setSearchString(value);
    };

    const filter = (date) => {
        //todo
        setFilterData(date);
    };

    const generateData = async () => {
        let url = TASK_SUMMARY_REPORT + "?";
        if (selectedYear && selectedMonth ) {
            url = url + 'year=' + selectedYear + '&month=' + selectedMonth;
            let res = await getData(url);
            let masterData = res?.data?.data;
            setGeneratedReportList(masterData);
            // console.log('data', res?.data?.data)
        }
        else alertPop("error", "Please select year and month");
    }

    const exportData = async () => {
        let url = TASK_SUMMARY_REPORT_EXPORT + "/";
        if (selectedYear && selectedMonth ) {
            url = url + selectedYear + '/' + selectedMonth;
            let res = await getData(url);
            let masterData = res?.data?.data;
            window.open(masterData);
        }
        else alertPop("error", "Please select year and month");
    }

    const changeSelectedYear = value => {
        setSelectedYear(value);
    }

    const changeSelectedMonth = value => {
        setSelectedMonth(value);
    }
    
    useEffect(() => {
        // getIndustryTypes();
        // getIndustrySectors();
        // getCompanyTypes();
        // getCompanySizes();
        // getFilterParams();
    }, []);

    useEffect(() => {
        setList(null);
        // view(CLIENT_LIST);
    }, [currentPage]);

    useEffect(() => {
        setList(null);
        // view(CLIENT_LIST);
    }, [searchString]);

    useEffect(() => {
        if (filterData) {
            setList(null);
            // view(CLIENT_LIST);
        }
    }, filterData)

    return (
        <TableWrapper>
            <SearchFilter
                search={search}
                filter={filter}
                filterOptions={[
                    // { type: "date_range" },
                    {
                        type: "dropdown",
                        name: "Department",
                        return_value: "client_department_id",
                        options: clientDepartment && clientDepartment.length ? clientDepartment.map(item => {
                            return {
                                id: item.id,
                                name: item.department_name
                            };
                        }) : []
                    },
                    {
                        type: "dropdown",
                        name: "Industry Type",
                        return_value: "industry_type",
                        options: industryTypes && industryTypes.length ? industryTypes.map(item => {
                            return {
                                id: item.id,
                                name: item.name
                            };
                        }) : []
                    },
                    {
                        type: "dropdown",
                        name: "Sector",
                        return_value: "industry_sector",
                        options: industrySectors && industrySectors.length ? industrySectors.map(item => {
                            return {
                                id: item.id,
                                name: item.name
                            };
                        }) : []
                    },
                    {
                        type: "dropdown",
                        name: "Company Type",
                        return_value: "company_type",
                        options: companyTypes && companyTypes.length ? companyTypes.map(item => {
                            return {
                                id: item.id,
                                name: item.name
                            };
                        }) : []
                    },
                    {
                        type: "dropdown",
                        name: "Company Size",
                        return_value: "company_size",
                        options: companySizes && companySizes.length ? companySizes.map(item => {
                            return {
                                id: item.id,
                                name: item.name
                            };
                        }) : []
                    },
                    {
                        type: "dropdown",
                        name: "STATUS",
                        return_value: "status",
                        options: [
                            {id: 1, name: "Active"},
                            {id: 2, name: "Inactive"},
                        ]
                    }
                ]}
                failsafe
            />
            <Flex space="1rem" justify="">
                <Select 
                    style={{width: '12%', 'marginRight': '1rem', 'marginLeft': '1rem'}} 
                    placeholder='Select Year'
                    // mode="multiple"
                    showSearch
                    onChange={changeSelectedYear}
                    filterOption={(input, option) =>
                        option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0}
                >
                    {
                        years.map(y => <Select.Option key={y} value={y}>{y}</Select.Option>)
                    }
                </Select>
                <Select 
                    // mode="multiple" 
                    style={{width: '12%', 'marginRight': '1rem'}} 
                    placeholder='Select Month'
                    showSearch
                    onChange={changeSelectedMonth}
                    filterOption={(input, option) =>
                        option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0}
                >
                    {
                        months.map(m => <Select.Option key={m.value} value={m.value}>{m.text}</Select.Option>)
                    }
                </Select>
                <Button type="primary" style={{marginRight: '1rem'}}
                onClick={generateData}
                >Generate Report</Button>
                <Button type="primary" onClick={exportData}><Icon type="download" />Download Excel</Button>
            </Flex>
            {generatedReportList ? (
                // <Table
                //     bordered
                //     dataSource={generatedReportList}
                //     columns={columns}
                //     scroll={{x: 'calc(1920px + 50%)', y: "calc(100vh - 30rem)"}}
                //     pagination={false}
                // />
                <DataTable data={generatedReportList}/>
            ) : <LandingContent />
            }
        </TableWrapper>
    );
};

const LandingContent = () => {
    return (
        <div className="landing-content mt-5" style={{textAlign: 'center'}}>
            <img src={sales_task} height="200"/>
            <h2>Please Select Year And Month To Generate Data</h2>
        </div>
    )
}