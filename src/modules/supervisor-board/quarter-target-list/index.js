import {Button, Divider, Modal, Select, Skeleton, Table} from "antd";
import React, {useEffect, useState} from "react";
import {
    CLIENT_LIST,
    COMPANY_SIZE_LIST,
    COMPANY_TYPE_LIST,
    INDUSTRY_SECTOR_LIST,
    INDUSTRY_TYPE_LIST,
    GET_CLIENT_FILTER
} from "../../../scripts/api";
import {alertPop} from "../../../scripts/message";
import {getData} from "../../../scripts/api-service";
import {Flex} from "../../commons/Flex";
import SearchFilter from "../../commons/SearchFilter";
import {TableWrapper} from "../../commons/Wrapper";
import AddNew from "./AddNew";

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

    const search = (value) => {
        //todo
        setSearchString(value);
    };

    const filter = (date) => {
        //todo
        setFilterData(date);
    };

    const columns = [
        {
            title: "Year",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Quarter",
            dataIndex: "company_type.name",
            key: "name"
        },
        {
            title: "KAM",
            render: (r) => r.created_by?.name,
            key: "cb"
        },
        {
            title: "Service",
            dataIndex: "company_type.name",
            key: "name"
        },
        {
            title: "OTC",
            dataIndex: "company_type.name",
            key: "name"
        },
        {
            title: "MRC/AMC",
            dataIndex: "company_type.name",
            key: "name"
        },
        {
            title: "Total",
            dataIndex: "company_type.name",
            key: "name"
        },
        {
            title: "Action",
            key: "action",
            render: (record) => (
                <Flex space="1rem" justify="space-between">
                    <Button onClick={() => setEdit(record)} type="link">
                        Edit
                    </Button>
                    <Button danger onClick={() => setEdit(record)} type="link">
                        Delete
                    </Button>
                    <Button onClick={() => setEdit(record)} type="link">
                        Details
                    </Button>
                </Flex>
            ),
        },
    ];

    const getIndustryTypes = async () => {
        const res = await getData(INDUSTRY_TYPE_LIST);
        if (res) setIndustryTypes(res.data?.data?.data?.filter(el => el.status == 1) || []);
        else alertPop("error", "Industry types not found");
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

        if (res && masterData) {
            setClientDeplartment(masterData.clientDepartment);
            setCompanySizes(masterData.companySize);
            setCompanyTypes(masterData.companyType);
            setIndustryTypes(masterData.industryType);
            setIndustrySectors(masterData.industrySector)
        } else alertPop("error", "Company sizes not found");
    }

    useEffect(() => {
        // getIndustryTypes();
        // getIndustrySectors();
        // getCompanyTypes();
        // getCompanySizes();
        getFilterParams();
    }, []);

    useEffect(() => {
        setList(null);
        view(CLIENT_LIST);
    }, [currentPage]);

    useEffect(() => {
        setList(null);
        view(CLIENT_LIST);
    }, [searchString]);

    useEffect(() => {
        if (filterData) {
            setList(null);
            view(CLIENT_LIST);
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
            <Flex space="1rem" justify="space-between">
                <Button onClick={() => setModal(true)} width="40%" type="primary">
                    Create New Quarter Target
                </Button>

                <Select style={{width: '30%', 'marginRight': '1rem', 'marginLeft': '1rem'}} placeholder='Select Year'
                        mode="multiple">
                    {[{id: 1, name: 'Test1'}]?.map((project, index) =>
                        <Select.Option
                            key={`project-${project.id}`}
                            value={project.id}>{project.name}
                        </Select.Option>)}
                </Select>
                <Select mode="multiple" style={{width: '30%', 'marginRight': '1rem'}} placeholder='Select Quarter'
                >
                    {[{id: 1, name: 'Test1'}]?.map((project, index) =>
                        <Select.Option
                            key={`project-${project.id}`}
                            value={project.id}>{project.name}
                        </Select.Option>)}
                </Select>
                <Select mode="multiple" style={{width: '30%', 'marginRight': '1rem'}} placeholder='Select KAM'
                >
                    {[{id: 1, name: 'Test1'}]?.map((project, index) =>
                        <Select.Option
                            key={`project-${project.id}`}
                            value={project.id}>{project.name}
                        </Select.Option>)}
                </Select>
                <Select mode="multiple" style={{width: '30%', 'marginRight': '1rem'}} placeholder='Select Service Type'
                >
                    {[{id: 1, name: 'Test1'}]?.map((project, index) =>
                        <Select.Option
                            key={`project-${project.id}`}
                            value={project.id}>{project.name}
                        </Select.Option>)}
                </Select>
                <Select mode="multiple" style={{width: '30%', 'marginRight': '1rem'}} placeholder='Select Service'
                >
                    {[{id: 1, name: 'Test1'}]?.map((project, index) =>
                        <Select.Option
                            key={`project-${project.id}`}
                            value={project.id}>{project.name}
                        </Select.Option>)}
                </Select>
            </Flex>
            <Divider/>
            {list ? (
                <Table
                    dataSource={list}
                    columns={columns}
                    scroll={{y: "calc(100vh - 20rem)"}}
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
                title="New Quarterly Target"
                width="80vw"
                centered
                visible={modal}
                onCancel={() => setModal(false)}
                footer={false}
                maskClosable={false}
            >
                {modal && (
                    <AddNew
                        industryTypes={industryTypes}
                        industrySectors={industrySectors}
                        companyTypes={companyTypes}
                        companySizes={companySizes}
                        setModal={setModal}
                        refresh={view}
                    />
                )}
            </Modal>}
            {edit && <Modal
                title="Edit Quarterly Target"
                width="80vw"
                centered
                visible={edit}
                onCancel={() => setEdit(null)}
                footer={false}
                maskClosable={false}
            >
                {edit && (
                    <AddNew
                        industryTypes={industryTypes}
                        industrySectors={industrySectors}
                        companyTypes={companyTypes}
                        companySizes={companySizes}
                        setModal={setEdit}
                        refresh={view}
                        edit={edit}
                    />
                )}
            </Modal>}
        </TableWrapper>
    );
}
;
