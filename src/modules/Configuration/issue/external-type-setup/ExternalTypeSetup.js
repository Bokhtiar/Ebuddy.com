import {Button, Divider, Modal, Skeleton, Table} from "antd";
import React, {useEffect, useState} from "react";
import {
    EXTERNAL_TYPE_LIST,
    COMPANY_SIZE_LIST,
    COMPANY_TYPE_LIST,
    INDUSTRY_SECTOR_LIST,
    INDUSTRY_TYPE_LIST,
    GET_CLIENT_FILTER,
    GENERATION_LIST, DESIGNATION_LIST 
} from "../../../../scripts/api";
import {alertPop} from "../../../../scripts/message";
import {getData} from "../../../../scripts/api-service";
import {Flex} from "../../../commons/Flex";
import {PageTitle} from "../../../commons/PageTitle";
import SearchFilter from "../../../commons/SearchFilter";
import {TableWrapper, Wrapper} from "../../../commons/Wrapper";
// import AddNew from "./AddNew";
import {dateFormat} from "../../../../scripts/helper";
import ExternalTypeManage from "./ExternalTypeManage/index";

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
    const [externalTypesList, setExternalTypesList] = useState();
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

    const view = async (que) => {
        let res = await getData(
            `${que}?page=${currentPage}${searchString ? `&search=${searchString}` : ""}
            ${filterData && (filterData.date_from || filterData.date_to) ? `&from_date=${filterData.date_from}&to_date=${filterData.date_to}` : ''}
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
        {title: "Name", dataIndex: "name", key: "name"},
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
                    {/* <Button onClick={() => {setEdit(record); setIsDetailsView(true)}} type="link">
                        View
                    </Button> */}
                    <Button onClick={() => {setEdit(record); setIsDetailsView(false)}} type="link">
                        Edit
                    </Button>
                </>
            ),
        },
    ];

    const getFilterParams = async () => {
        const res = await getData(GET_CLIENT_FILTER);
        let masterData = res?.data?.data;

        if (res && masterData) {
          setClientDeplartment(masterData.clientDepartment);
          setCompanySizes(masterData.companySize);
          setCompanyTypes(masterData.companyType);
          setIndustryTypes(masterData.industryType);
          setIndustrySectors(masterData.industrySector)
        }
        else alertPop("error", "Company sizes not found");
    }

    // const updateEditClilent = (value) => {
    //     let department = [];

    //     if (value && value.length && edit.department_contacts && edit.department_contacts.length) {
    //         edit.department_contacts.forEach(dep => {
    //             let find = value.find(val => val.dep_id === dep.id);
                
    //             // && dep.department_name !== find.dept_name
    //             if (find ) {
    //                 dep.department_name = find.dept_name;
    //                 dep.status = find.status;
    //             }

    //             department.push(dep);
    //         });

    //         let content = edit;
    //         content.department_contacts = department;
    //         setEdit(content);
    //     }
    // }

    const closeExternalTypeManage = () => {
        setModal(false); 
        setIsDetailsView(false);
        setEdit(null);
    }

    useEffect(() => {
        getFilterParams();
    }, []);

    useEffect(() => {
        view(EXTERNAL_TYPE_LIST);
    }, [currentPage]);

    useEffect(() => {
        setList(null);
        view(EXTERNAL_TYPE_LIST);
    }, [searchString]);

    // useEffect(() => {
    //     if (filterData) {
    //       setList(null);
    //       view(EXTERNAL_TYPE_LIST);
    //     }
    // }, filterData)

    useEffect(() => {
        if (currentPage === 1) view(EXTERNAL_TYPE_LIST);
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
                <PageTitle>External Setup</PageTitle>
                <Button onClick={() => setModal(true)} width="40%" type="primary">
                    Create New External Type
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
                title="Create New External Type"
                width="80vw"
                centered
                visible={modal}
                onCancel={() => {setModal(false); setIsDetailsView(false) }}
                footer={false}
                maskClosable={false}
            >
                {modal && (
                    <ExternalTypeManage 
                        externalTypesList={externalTypesList}
                        industrySectors={industrySectors}
                        companyTypes={companyTypes}
                        companySizes={companySizes}
                        designationList={designationList}
                        generationList={generationList}
                        setModal={setModal}
                        resetData={view}
                        closeExternalTypeManage={closeExternalTypeManage}
                    />
                )}
            </Modal>}
            {edit && <Modal
                title= {isDetailsView ? 'Show External Type Details' : "Edit External Type"}
                width="80vw"
                centered
                visible={edit}
                onCancel={() => {setEdit(null); setIsDetailsView(false)}}
                footer={false}
                maskClosable={false}
            >
                {edit && (
                    <ExternalTypeManage 
                        setModal={setModal}
                        resetData={view}
                        edit={edit}
                        isDetailsView={isDetailsView}
                        closeExternalTypeManage={closeExternalTypeManage}
                    />
                )}
            </Modal>}
        </Wrapper>
    );
};
