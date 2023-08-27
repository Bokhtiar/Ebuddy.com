import { PageHeader } from 'antd'
import React, { useEffect, useState } from 'react'
import { Select, Divider, Button, Icon, Spin } from 'antd';
import { Flex } from "../../commons/Flex";
import { PIS_DEPARTMENT_LIST, INDUSTRY_TYPE_DROPDOWN_LIST, SERVICE_TYPE_DROPDOWN_LIST, DEPARTMENT_SERVICE_MATRIX, DEPARTMENT_SERVICE_MATRIX_EXPORT } from '../../../scripts/api';
import { getData, postData } from '../../../scripts/api-service';
import { Wrapper } from '../../commons/Wrapper'
import * as Cookies from "js-cookie";
import sales_task from "../../../assets/icons/test/sales_task_icon.svg";

export default function MatrixReport() {
    const company_id = JSON.parse(Cookies.get("profile")).company_id;
    const [filterData, setFilterData] = useState();
    const [selectValue, setSelectedValue] = useState();
    const [serviceTypes, setServiceTypes] = useState([]);
    const [services, setServices] = useState([]);
    const [clientList, setClientList] = useState();
    const [loading, setLoading] = useState(false);

    const getDepartmentList = async () => {
        let url = PIS_DEPARTMENT_LIST + '?' + "&company_id=" + company_id;
        const res = await getData(url);

        if (res) {
            let masterData = res?.data?.data;
            if (res?.data?.code === 200) {
                setFilterData(prevState => ({
                    ...prevState,
                    ["department"]: masterData
                }));
            }
        }
    };

    const getIndustryType = async () => {
        let res = await getData(INDUSTRY_TYPE_DROPDOWN_LIST);

        if (res) {
            let masterData = res?.data?.data;
            // setIndustryTypeList(masterData);
            setFilterData(prevState => ({
                ...prevState,
                ["industryType"]: masterData
            }));
        }
    }

    const getServiceTypeList = async() => {
        let res = await getData(SERVICE_TYPE_DROPDOWN_LIST);

        if (res) {
            let masterData = res?.data?.data;
            setFilterData(prevState => ({
                ...prevState,
                ["serviceType"]: masterData
            }));
        }
    }

    const getSynergyList = async() => {
        let res = await getData(SERVICE_TYPE_DROPDOWN_LIST);

        if (res) {
            let masterData = res?.data?.data;
            setFilterData(prevState => ({
                ...prevState,
                ["synergy"]: masterData
            }));
        }
    }

    const getDepartmentServiceMatrix = async () => {
        if (selectValue && selectValue?.department_id && selectValue?.industry_type_id) {
            setLoading(true);
            let url = DEPARTMENT_SERVICE_MATRIX + 
                `?department_id=${selectValue?.department_id}&industry_type_id=${selectValue?.industry_type_id}`;

            if (selectValue?.service_type_id) url = url +`&service_type_id=${selectValue?.service_type_id}`;
            if (selectValue?.synergy) url = url +`&synergy=${selectValue?.synergy}`;

            // let url = DEPARTMENT_SERVICE_MATRIX + `?department_id=60&industry_type_id=1`;
            let res = await getData(url);

            if (res) {
                let masterData = res?.data?.data;
                setServiceTypes(masterData?.service_types);
                setClientList(masterData?.clients);

                if (masterData?.service_types?.length) {
                    let serviceT = masterData.service_types.map(item => item.services);

                    let allService = serviceT.reduce((r, e) => (r.push(...e), r), []);
                    setServices(allService);
                }
                setLoading(false);
            }
        }
    }

    const showServiceSynergy = (serId, cServices, context) => {
        if (cServices?.length && serId) {
            let data = cServices.find(item => item.service_id === serId);

            if (data) {
                if (context === 'color') {
                    return data.color;
                } else return data.synergy;
            }
        }
    };

    const showTotalPro = (serId) => {
        if (serId && clientList?.length) {
            let total = 0;

            clientList.forEach(cli => {
                let serFin = cli.services.find(item => item.service_id === serId);
                if (serFin && serFin.synergy === "P") total += 1;
            });

            return total;
        }
    }

    const downloadExcel = async () => {
        if (selectValue && selectValue?.department_id && selectValue?.industry_type_id) { 
            let url = DEPARTMENT_SERVICE_MATRIX_EXPORT + `?department_id=${selectValue?.department_id}&industry_type_id=${selectValue?.industry_type_id}`;

            if (selectValue?.service_type_id) url = url +`&service_type_id=${selectValue?.service_type_id}`;

            let res = await getData(url);
            let masterData = res?.data?.data;
            window.open(masterData);
        }
    }

    // useEffect(() => {
    //     getDepartmentServiceMatrix()
    // }, [selectValue])

    useEffect(() => {
        getDepartmentList();
        getIndustryType();
        getServiceTypeList()
        getSynergyList()
    }, []);

    return (
        <Wrapper>
            <PageHeader style={{
                border: '1px solid rgb(235, 237, 240)',
            }}
                title="Department Service Matrix Report" />

            <Flex space="1rem" justify="">
                <Select
                    style={{ width: '30%', margin: '0 1rem' }}
                    allowClear={true}
                    placeholder='Department Name'
                    showSearch
                    optionFilterProp="children"
                    onChange={val => setSelectedValue(prevState => ({
                        ...prevState,
                        ["department_id"]: val
                    }))}
                    filterOption={(input, option) =>
                        option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0}
                >
                    {filterData?.department?.length ?
                        filterData?.department.map(dept => <Select.Option value={dept.id} key={dept.id}>{dept.name}</Select.Option>) : ''
                    }
                </Select>
                <Select
                    style={{ width: '30%', margin: '0 1rem' }}
                    allowClear={true}
                    placeholder='Industry Type'
                    showSearch
                    optionFilterProp="children"
                    onChange={val => setSelectedValue(prevState => ({
                        ...prevState,
                        ["industry_type_id"]: val
                    }))}
                    filterOption={(input, option) =>
                        option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0}
                >
                    {filterData?.industryType?.length ?
                        filterData?.industryType.map(industryType => {
                            return (
                                <Select.Option key={industryType.id} value={industryType.id}>{industryType.name}</Select.Option>
                            )
                        }) : ''
                    }
                </Select>
                <Select
                    style={{ width: '30%', margin: '0 1rem' }}
                    allowClear={true}
                    placeholder='Service Type'
                    showSearch
                    optionFilterProp="children"
                    onChange={val => setSelectedValue(prevState => ({
                        ...prevState,
                        ["service_type_id"]: val
                    }))}
                    filterOption={(input, option) =>
                        option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0}
                >
                    {filterData?.serviceType?.length ?
                        filterData?.serviceType.map(service => {
                            return (
                                <Select.Option key={service.id} value={service.id}>{service.name}</Select.Option>
                            )
                        }) : ''
                    }
                </Select>
                <Select
                    style={{ width: '30%', margin: '0 1rem' }}
                    allowClear={true}
                    placeholder='Synergy'
                    showSearch
                    optionFilterProp="children"
                    onChange={val => setSelectedValue(prevState => ({
                        ...prevState,
                        ["synergy"]: val
                    }))}
                    filterOption={(input, option) =>
                        option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0}
                >
                    <Select.Option key="O" value="O">Onboarded</Select.Option>
                    <Select.Option key="P" value="P">Potential</Select.Option>
                </Select>


                <Button type="primary" disabled={!(selectValue?.department_id && selectValue?.industry_type_id)}
                    onClick={() => getDepartmentServiceMatrix()}
                    style={{ marginRight: "1rem" }}>Generate Report</Button>
                <Button type="primary" onClick={downloadExcel} 
                    disabled={!(selectValue?.department_id && selectValue?.industry_type_id)}><Icon type="download" />Download Excel</Button>
            </Flex>
            <Divider />

            {
                selectValue && selectValue?.department_id && selectValue?.industry_type_id && services.length ? <>
                    <div style={{ width: "100%", overflow: "hidden" }}>
                        <table id="data-table" style={{ maxWidth: "95%" }}>
                            <thead>
                                <tr>
                                    <th className='t-header'></th>
                                    <th className='t-header bg-dark-yellow'>Potential -P</th>
                                    {
                                        serviceTypes.length ? serviceTypes.map(type => <th className='t-header text-center' colspan={type?.services?.length || 1}>{type.name}</th>) : ''
                                    }
                                </tr>
                                <tr>
                                    <th className='t-header'>SL</th>
                                    <th className='t-header'>Client Name</th>
                                    {
                                        services.length ? services.map(type => <th className='t-header'>{type.full_name}</th>) : ''
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    clientList?.length ? clientList.map((client, idx) => <tr>
                                        <td className="t-body">{idx + 1}</td>
                                        <td className="t-body">{client?.client_name}</td>
                                        {
                                            services.length ? services.map(ser => <td className="t-body" style={{ background: showServiceSynergy(ser.id, client?.services, 'color') }}>
                                                {showServiceSynergy(ser.id, client?.services)}
                                            </td>) : ''
                                        }
                                    </tr>) : ''
                                }
                                <tr>
                                    <td colspan="2"></td>
                                    {
                                        services.length ? services.map(ser => <td className="t-body">{showTotalPro(ser.id)}</td>) : ''
                                    }
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </> : <div className="landing-content mt-5" style={{ textAlign: 'center' }}>
                    {loading ?
                        <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />
                        :
                        <>
                            <img src={sales_task} height="200" />
                            <h2>Please Select Department and Industry Type To Generate Data</h2>
                        </>
                    }
                    {/* <div className="landing-content mt-5" style={{ textAlign: 'center' }}>
                        <img src={sales_task} height="200" />
                        <h2>Please Select Department and Industry Type To Generate Data</h2>
                    </div> */}
                </div>
            }
        </Wrapper>
    )
}
