import {Button, Divider, Select, Skeleton, Table} from "antd";
import React, {useState} from "react";
import {getData} from "../../../scripts/api-service";
import {Flex} from "../../commons/Flex";
import SearchFilter from "../../commons/SearchFilter";
import {TableWrapper} from "../../commons/Wrapper";

const {Column, ColumnGroup} = Table;


/*
    These are newer modules and ant design Tables are used instead
    of custom designed Tables in the project commons directory
*/
const rowSpanForClient = (value, row, index) => {
    const obj = {
        children: value,
        props: {},
    };
    if (index === 4) {
        obj.props.colSpan = 0;
    }
    return obj;
};

const columns = [
    {
        title: '',
        children: [
            {
                title: 'CLIENT NAME',
                dataIndex: 'client',
                render: (text, raw, index) => {

                    return {
                        children: index < 8 ? text : 'Total Revenue',
                        props: {
                            colSpan: (() => {
                                if (index >= 8) {
                                    return 2;
                                }
                                return 1;
                            })(),
                            rowSpan: (() => {
                                if (index === 8) {
                                    return 2;
                                }
                                if (index === 9) {
                                    return 0;
                                }
                                return index % 2 === 0 ? 2 : 0
                            })(),
                        }
                    };
                }
            },
            {
                title: 'Industry',
                dataIndex: 'industry',
                render: (text, raw, index) => {
                    return {
                        children: index < 8 ? text : 'Total Revenue',
                        props: {
                            colSpan: (() => {
                                if (index >= 8) {
                                    return 0;
                                }
                                return 1;
                            })(),
                            rowSpan: (() => {
                                if (index === 8) {
                                    return 0;
                                }
                                if (index === 9) {
                                    return 0;
                                }
                                return index % 2 === 0 ? 2 : 0
                            })(),
                        }
                    };
                }
            },
            {
                title: '',
                dataIndex: 'email_security',
            },
        ]
    },
    {
        title: 'SECURITY SERVICE',
        children: [
            {
                title: 'EMAIL SECURITY',
                dataIndex: 'ssl_certification',
            },
            {
                title: 'SSL Certification',
                dataIndex: 'endpoint_security_and_protection',
            },
            {
                title: 'Endpoint Security and Protection',
                dataIndex: 'ssl_commerz',
            },
        ]
    },
    {
        title: 'DOCUMENTATION SERVICE',
        children: [
            {
                title: 'SSL COMMERZ',
                dataIndex: 'ssl_certification',
            },
            {
                title: 'VAPT',
                dataIndex: 'ssl_certification',
            },
            {
                title: 'ISO 27001',
                dataIndex: 'endpoint_security_and_protection',
            },
            {
                title: 'TRAINING',
                dataIndex: 'ssl_commerz',
            },
        ]
    },
    {
        title: 'SMS SERVICE',
        children: [
            {
                title: 'TFA SERVICE',
                dataIndex: 'vapt',
            },
            {
                title: 'PCI DSS',
                dataIndex: 'iso27001',
            },
        ]
    },
    {
        title: '',
        children: [
            {
                title: 'Total',
                dataIndex: 'total',
            },
        ]
    }
];
const data = [
    {
        key: '1',
        client: 'John Brown',
        industry: 32,
        email_security: '0571-22098909',
        ssl_certification: 18889898989,
        endpoint_security_and_protection: 'New York No. 1 Lake Park',
        ssl_commerz: 'New York No. 1 Lake Park',
        vapt: 'New York No. 1 Lake Park',
        iso27001: 'New York No. 1 Lake Park',
        training: 'New York No. 1 Lake Park',
        total: Math.floor(Math.random()*1000),
    }, {
        key: '1',
        client: 'John Brown',
        industry: 32,
        email_security: '0571-22098909',
        ssl_certification: 18889898989,
        endpoint_security_and_protection: 'New York No. 1 Lake Park',
        ssl_commerz: 'New York No. 1 Lake Park',
        vapt: 'New York No. 1 Lake Park',
        iso27001: 'New York No. 1 Lake Park',
        training: 'New York No. 1 Lake Park',
        total: Math.floor(Math.random()*1000),
    }, {
        key: '1',
        client: 'John Brown',
        industry: 32,
        email_security: '0571-22098909',
        ssl_certification: 18889898989,
        endpoint_security_and_protection: 'New York No. 1 Lake Park',
        ssl_commerz: 'New York No. 1 Lake Park',
        vapt: 'New York No. 1 Lake Park',
        iso27001: 'New York No. 1 Lake Park',
        training: 'New York No. 1 Lake Park',
        total: Math.floor(Math.random()*1000),
    }, {
        key: '1',
        client: 'John Brown',
        industry: 32,
        email_security: '0571-22098909',
        ssl_certification: 18889898989,
        endpoint_security_and_protection: 'New York No. 1 Lake Park',
        ssl_commerz: 'New York No. 1 Lake Park',
        vapt: 'New York No. 1 Lake Park',
        iso27001: 'New York No. 1 Lake Park',
        training: 'New York No. 1 Lake Park',
        total: Math.floor(Math.random()*1000),
    }, {
        key: '1',
        client: 'John Brown',
        industry: 32,
        email_security: '0571-22098909',
        ssl_certification: 18889898989,
        endpoint_security_and_protection: 'New York No. 1 Lake Park',
        ssl_commerz: 'New York No. 1 Lake Park',
        vapt: 'New York No. 1 Lake Park',
        iso27001: 'New York No. 1 Lake Park',
        training: 'New York No. 1 Lake Park',
        total: Math.floor(Math.random()*1000),
    }, {
        key: '1',
        client: 'John Brown',
        industry: 32,
        email_security: '0571-22098909',
        ssl_certification: 18889898989,
        endpoint_security_and_protection: 'New York No. 1 Lake Park',
        ssl_commerz: 'New York No. 1 Lake Park',
        vapt: 'New York No. 1 Lake Park',
        iso27001: 'New York No. 1 Lake Park',
        training: 'New York No. 1 Lake Park',
        total: Math.floor(Math.random()*1000),
    }, {
        key: '1',
        client: 'John Brown',
        industry: 32,
        email_security: '0571-22098909',
        ssl_certification: 18889898989,
        endpoint_security_and_protection: 'New York No. 1 Lake Park',
        ssl_commerz: 'New York No. 1 Lake Park',
        vapt: 'New York No. 1 Lake Park',
        iso27001: 'New York No. 1 Lake Park',
        training: 'New York No. 1 Lake Park',
        total: Math.floor(Math.random()*1000),
    }, {
        key: '1',
        client: 'John Brown',
        industry: 32,
        email_security: '0571-22098909',
        ssl_certification: 18889898989,
        endpoint_security_and_protection: 'New York No. 1 Lake Park',
        ssl_commerz: 'New York No. 1 Lake Park',
        vapt: 'New York No. 1 Lake Park',
        iso27001: 'New York No. 1 Lake Park',
        training: 'New York No. 1 Lake Park',
        total: Math.floor(Math.random()*1000),
    }, {
        key: '1',
        client: 'John Brown',
        industry: 32,
        email_security: '0571-22098909',
        ssl_certification: 18889898989,
        endpoint_security_and_protection: 'New York No. 1 Lake Park',
        ssl_commerz: 'New York No. 1 Lake Park',
        vapt: 'New York No. 1 Lake Park',
        iso27001: 'New York No. 1 Lake Park',
        training: 'New York No. 1 Lake Park',
        total: Math.floor(Math.random()*1000),
    }, {
        key: '1',
        client: 'John Brown',
        industry: 35552,
        email_security: '10571-22098909',
        ssl_certification: 18889898989,
        endpoint_security_and_protection: 'New York No. 1 Lake Park',
        ssl_commerz: 'New York No. 1 Lake Park',
        vapt: 'New York No. 1 Lake Park',
        iso27001: 'New York No. 1 Lake Park',
        training: 'New York No. 1 Lake Park',
        total: Math.floor(Math.random()*1000),
    },
];
export default () => {
    const [modal, setModal] = useState();
    const [edit, setEdit] = useState();
    const [list, setList] = useState();
    const [pageCount, setPageCount] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [filterData, setFilterData] = useState();
    const [searchString, setSearchString] = useState();

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


    return (
        <TableWrapper>
            <SearchFilter
                search={search}
                filter={filter}
                filterOptions={[]}
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
            {data ? (
                <Table
                    bordered
                    dataSource={data}
                    columns={columns}
                    pagination={false}
                    scroll={{x: 'calc(700px + 50%)', y: "calc(100vh - 30rem)"}}
                />
            ) : (
                <Skeleton active className="pad"/>
            )}
        </TableWrapper>
    );
}
;
