import {Button, Divider, Modal, Skeleton, Table} from "antd";
import React, {useEffect, useState} from "react";
import {
    CLIENT_LIST,
    COMPANY_SIZE_LIST,
    COMPANY_TYPE_LIST,
    INDUSTRY_SECTOR_LIST,
    INDUSTRY_TYPE_LIST,
    INDUSTRY_TYPE_DROPDOWN_LIST,
    GET_CLIENT_FILTER,
    GENERATION_LIST, 
    DESIGNATION_LIST ,
    DESIGNATION_DROPDOWN_LIST,
    INDUSTRY_SECTOR_DROPDOWN_LIST
} from "../../../../scripts/api";
import {alertPop} from "../../../../scripts/message";
import {getData} from "../../../../scripts/api-service";
import {Flex} from "../../../commons/Flex";
import {PageTitle} from "../../../commons/PageTitle";
import SearchFilter from "../../../commons/SearchFilter";
import {TableWrapper, Wrapper} from "../../../commons/Wrapper";
import AddNew from "./AddNew";
import {dateFormat} from "../../../../scripts/helper";
import ClintManage from "./clientManage/index";

/*
    These are newer modules and ant design Tables are used instead
    of custom designed Tables in the project commons directory
*/

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
    const [isDetailsView, setIsDetailsView] = useState();
    const [update, setUpdate] = useState();
    const [generationList, setGenerationList] = useState();
    const [designationList, setDesignationList] = useState();
    const [industryType, setIndustryType] = useState();
    const [savedData, setSavedData] = useState();

    const view = async (que) => {
        let res = await getData(
            `${que}?page=${currentPage}${searchString ? `&search=${searchString}` : ""}
            ${filterData && (filterData.date_from || filterData.date_to) ? `&from_date=${filterData.date_from}&to_date=${filterData.date_to}` : ''}
            ${filterData && filterData.client_department_id ? `&client_department_id=${filterData.client_department_id}` : ''} 
            ${filterData && filterData.industry_sector ? `&industry_sector=${filterData.industry_sector}` : ''} 
            ${filterData && filterData.industry_type ? `&industry_type=${filterData.industry_type}` : ''} 
            ${filterData && filterData.company_type ? `&company_type=${filterData.company_type}` : ''} 
            ${filterData && filterData.company_size ? `&company_size=${filterData.company_size}` : ''}
            ${filterData && filterData.status ? `&status=${filterData.status === 1 ? 1 : 0}` : ''}`
        );
        if (res?.data?.data?.data) {
            setList(res.data.data.data);
            setPageCount(res.data.data.last_page);
        }
    };

    const paginate = (page) => setCurrentPage(page);

    const search = (value) => { setSearchString(value)};

    const filter = (date) => { setFilterData(date)};

    const columns = [
        {title: "Code", dataIndex: "code", key: "code"},
        {title: "Client Name", dataIndex: "name", key: "name"},
        {title: "Company type", dataIndex: "company_type.name", key: "name"},
        {title: "Created by", render: (r) => r.created_by?.name, key: "cb"},
        {
            title: "Created Date",
            key: "cd",
            render: ({created_at}) => <span>{dateFormat(created_at)}</span>,
        },
        {
            title: "Status",
            render: ({status}) => (status === 1 ? "Active" : "Inactive"),
            key: "status",
        },
        {
            title: "Action",
            key: "action",
            render: (record) => (<>
                    <Button onClick={() => {setEdit(record); setIsDetailsView(true)}} type="link">
                        View
                    </Button>
                    <Button onClick={() => {setEdit(record); setIsDetailsView(false)}} type="link">
                        Edit
                    </Button>
                    {/* <Button onClick={() => {setUpdate(record)}} type="link">
                        Edit
                    </Button> */}
                </>
            ),
        },
    ];

    const getIndustryTypes = async () => {
        // const res = await getData(INDUSTRY_TYPE_LIST);
        const res = await getData(INDUSTRY_TYPE_DROPDOWN_LIST);
        // if (res) setIndustryTypes(res.data?.data?.data?.filter(el => el.status == 1)  []);
        if (res) setIndustryTypes(res.data?.data || []);
        else alertPop("error", "Industry types not found");
    };

    
    const getIndustrySector = async (id) => {
        let url = INDUSTRY_SECTOR_DROPDOWN_LIST + "?industry_type_id=" + id;
        const res = await getData(url);
        if (res) setIndustrySectors(res.data?.data);
        else alertPop("error", "Industry sector not found");
    };

    const getIndustrySectors = async () => {
        const res = await getData(INDUSTRY_SECTOR_LIST);
        if (res)
            setIndustrySectors(
                res.data?.data?.data?.filter((industrySector) => industrySector.status == 1) || []
            );
        else alertPop("error", "Industry sectors not found");
    };

    const getCompanyTypes = async () => {
        const res = await getData(COMPANY_TYPE_LIST);
        if (res) setCompanyTypes(res.data?.data?.data?.filter((companyType) => companyType.status == 1) || []);
        else alertPop("error", "Company types not found");
    };

    const getCompanySizes = async () => {
        const res = await getData(COMPANY_SIZE_LIST);
        if (res) setCompanySizes(res.data?.data?.data?.filter((companySize) => companySize.status == 1) || []);
        else alertPop("error", "Company sizes not found");
    };

    const getFilterParams = async () => {
        const res = await getData(GET_CLIENT_FILTER);
        let masterData = res?.data?.data;
        setSavedData(masterData);

        if (res && masterData) {
          setClientDeplartment(masterData.clientDepartment);
          setCompanySizes(masterData.companySize);
          setCompanyTypes(masterData.companyType);
          setIndustryTypes(masterData.industryType);
        }
        else alertPop("error", "Company sizes not found");
    }

    const updateEditClilent = (value) => {
        let department = [];

        if (value && value.length && edit.department_contacts && edit.department_contacts.length) {
            edit.department_contacts.forEach(dep => {
                let find = value.find(val => val.dep_id === dep.id);
                
                // && dep.department_name !== find.dept_name
                if (find ) {
                    dep.department_name = find.dept_name;
                    dep.status = find.status;
                }

                department.push(dep);
            });

            let content = edit;
            content.department_contacts = department;

            setEdit(content);
        }
    }

    const getDesignation = async() =>{
        let res = await getData(DESIGNATION_DROPDOWN_LIST);
        if (res) {
            let masterData = res?.data?.data;
            setDesignationList(masterData);
        }
    }

    const getGeneration = async() => {
        let res = await getData(GENERATION_LIST);
        if (res) {
            let masterData = res?.data?.data;
            setGenerationList(masterData);
        }
    }

    const closeClientManage = () => {
        setModal(false); 
        setIsDetailsView(false);
        setEdit(null);
    }

    useEffect(() => {
        getIndustryTypes();
        // getIndustrySectors();
        // getCompanyTypes();
        // getCompanySizes();
        getFilterParams();
        getDesignation();
        getGeneration();
    }, []);

    useEffect(() => {
        if(industryType) getIndustrySector(industryType);
    }, [industryType]);

    useEffect(() => {
        view(CLIENT_LIST);
    }, [currentPage]);

    // useEffect(() => {
    //     setList(null);
    //     view(CLIENT_LIST);
    // }, [searchString]);

    // useEffect(() => {
    //     if (filterData) {
    //       setList(null);
    //       view(CLIENT_LIST);
    //     }
    // }, filterData)

    useEffect(() => {
        if (currentPage === 1) view(CLIENT_LIST);
        else setCurrentPage(1);
    }, [filterData, searchString]);

    return (
        // <TableWrapper>
        <Wrapper>
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
            <Flex space="1rem" justify="space-between">
                <PageTitle>Client Setup</PageTitle>
                <Button onClick={() => setModal(true)} width="40%" type="primary">
                    Create New Client
                </Button>
            </Flex>
            <Divider/>
            {list ? (
                <Table
                    dataSource={list}
                    columns={columns}
                    // scroll={{y: "calc(100vh - 20rem)"}}
                    pagination={{
                        current: currentPage,
                        total: pageCount * 10,
                        onChange: (page) => paginate(page),
                    }}
                />
            ) : (
                <Skeleton active className="pad"/>
            )}
            {modal && <Modal
                title="Create New Client"
                width="80vw"
                centered
                visible={modal}
                onCancel={() => {setModal(false); setIsDetailsView(false) }}
                footer={false}
                maskClosable={false}
            >
                {modal && (
                    // <AddNew
                    //     industryTypes={industryTypes}
                    //     industrySectors={industrySectors}
                    //     companyTypes={companyTypes}
                    //     companySizes={companySizes}
                    //     setModal={setModal}
                    //     refresh={view}
                    //     edit={edit}
                    // />
                    <ClintManage 
                        industryTypes={industryTypes}
                        industrySectors={industrySectors}
                        companyTypes={companyTypes}
                        companySizes={companySizes}
                        designationList={designationList}
                        generationList={generationList}
                        setModal={setModal}
                        resetData={view}
                        closeClientManage={closeClientManage}
                        setIndustryType={setIndustryType}
                    />
                )}
            </Modal>}
            {edit && <Modal
                title= {isDetailsView ? 'Show Client Details' : "Edit Client"}
                width="80vw"
                centered
                visible={edit}
                onCancel={() => {setEdit(null); setIsDetailsView(false)}}
                footer={false}
                maskClosable={false}
            >
                {edit && (
                    // <AddNew
                    //     industryTypes={industryTypes}
                    //     industrySectors={industrySectors}
                    //     companyTypes={companyTypes}
                    //     companySizes={companySizes}
                    //     setModal={setEdit}
                    //     refresh={view}
                    //     edit={edit}
                    //     isDetailsView={isDetailsView}
                    //     updateEditClilent={updateEditClilent}
                    // />
                    <ClintManage 
                        industryTypes={industryTypes}
                        industrySectors={industrySectors}
                        companyTypes={companyTypes}
                        companySizes={companySizes}
                        designationList={designationList}
                        generationList={generationList}
                        setModal={setModal}
                        resetData={view}
                        edit={edit}
                        setIndustryType={setIndustryType}
                        isDetailsView={isDetailsView}
                        closeClientManage={closeClientManage}
                    />
                )}
            </Modal>}
        </Wrapper>
    );
};
