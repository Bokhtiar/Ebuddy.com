/** @format */

import React, { useState, useEffect } from "react";
import { Table, PageHeader, Select, Button, Icon } from "antd";
import {
  SALES_TARGET_VS_ACHIEVEMENT,
  SALES_TARGET_VS_ACHIEVEMENT_EXPORT,
  DEPARTMENT_LIST,
  USER_LIST,
  INDUSTRY_TYPE_DROPDOWN_LIST,
  CLIENT_DROPDOWN_LIST,
  SERVICE_TYPE_DROPDOWN_LIST,
  SERVICE_SETUP_DROPDOWN_LIST,
} from "../../../../scripts/api";
import { Wrapper } from "../../../commons/Wrapper";
import { Flex } from "../../../commons/Flex";
import { getData } from "../../../../scripts/api-service";
import moment from "moment";
import { alertPop } from "../../../../scripts/message";

let years = [],
  nextYear = moment().add(10, "Y").format("YYYY");

for (let i = 2000; i <= nextYear; i++) {
  years.push(i.toString());
}

const SalesTargetVsAchievement = () => {
  const [selectedYear, setSelectedYear] = useState(moment().format("YYYY"));
  const [targetVsAchievementList, setTargetVsAchievementList] = useState([]);
  const [industryType, setIndustryType] = useState();
  const [serviceType, setServiceType] = useState();
  const [serviceName, setServiceName] = useState();
  const [client, setClient] = useState();
  const [department, setDepartment] = useState();
  const [KAM, setKAM] = useState();
  const [departmentList, setDepartmentList] = useState();
  const [kamList, setKAMList] = useState();
  const [industryTypeList, setIndustryTypeList] = useState();
  const [clientList, setClientList] = useState();
  const [serviceTypeList, setServiceTypeList] = useState();
  const [serviceSetupList, setServiceSetupList] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [pageCount, setPageCount] = useState();

  const getDepartmentList = async () => {
    let url = DEPARTMENT_LIST;
    let res = await getData(url);
    if (res) {
      let masterData = res?.data?.data;
      setDepartmentList(masterData);
    }
  };

  const getKAMList = async (id) => {
    let url = USER_LIST + "?department_id=" + id;
    let res = await getData(url);
    if (res) {
      let masterData = res?.data?.data;
      setKAMList(masterData);
    }
  };

  const getIndustryTypeList = async () => {
    let url = INDUSTRY_TYPE_DROPDOWN_LIST;
    let res = await getData(url);
    if (res) {
      let masterData = res?.data?.data;
      setIndustryTypeList(masterData);
    }
  };

  const getClientList = async (id) => {
    let url = CLIENT_DROPDOWN_LIST + "?industry_type=" + id;
    let res = await getData(url);
    if (res) {
      let masterData = res?.data?.data;
      setClientList(masterData);
    }
  };

  const getServiceTypeList = async () => {
    let url = SERVICE_TYPE_DROPDOWN_LIST;
    let res = await getData(url);
    if (res) {
      let masterData = res?.data?.data;
      setServiceTypeList(masterData);
    }
  };

  const getServiceSetupList = async (id) => {
    let url = SERVICE_SETUP_DROPDOWN_LIST + "?service_type_id=" + id;
    let res = await getData(url);
    if (res) {
      let masterData = res?.data?.data;
      setServiceSetupList(masterData);
    }
  };

  const getTargetVsAchievementList = async () => {
    let url = SALES_TARGET_VS_ACHIEVEMENT + "?";
    if (selectedYear) url += "&year=" + selectedYear;
    if (department) url = url + "&department_id=" + department;
    if (industryType) url = url + "&industry_type_id=" + industryType;
    if (serviceType) url = url + "&service_type_id=" + serviceType;
    if (serviceName) url = url + "&service_id=" + serviceName;
    if (client) url = url + "&client_id=" + client;
    if (KAM) url = url + "&kam_id=" + KAM;
    let res = await getData(url);
    if (res) {
      let masterData = res?.data?.data?.data;
      setTargetVsAchievementList(masterData);
      setPageCount(res?.data?.data?.last_page);
    }
  };

  const handlePercentage = (target, achievement) => {
    if (Number(target) === 0) return `0%`;
    else return (achievement * 100) / target + "%";
  };

  const exportData = async () => {
    let url = SALES_TARGET_VS_ACHIEVEMENT_EXPORT + "?";
    if (selectedYear) {
      url += "&year=" + selectedYear;
      if (department) url = url + "&department_id=" + department;
      if (industryType) url = url + "&industry_type_id=" + industryType;
      if (serviceType) url = url + "&service_type_id=" + serviceType;
      if (serviceName) url = url + "&service_id=" + serviceName;
      if (client) url = url + "&client_id=" + client;
      if (KAM) url = url + "&kam_id=" + KAM;
      let res = await getData(url);
      if (res) {
        let masterData = res?.data?.data;
        window.open(masterData);
      }
    } else alertPop("error", "Please select year");
  };

  useEffect(() => {
    getDepartmentList();
    getIndustryTypeList();
    getServiceTypeList();
  }, []);

  useEffect(() => {
    getKAMList(department);
  }, [department]);

  useEffect(() => {
    getClientList(industryType);
  }, [industryType]);

  useEffect(() => {
    getServiceSetupList(serviceType);
  }, [serviceType]);

  useEffect(() => {
    getTargetVsAchievementList();
  }, [
    currentPage,
    selectedYear,
    department,
    industryType,
    KAM,
    serviceType,
    serviceName,
    client,
  ]);

  const columns = [
    {
      title: "KAM Name",
      dataIndex: "kam.name",
      key: "kam_name",
      width: 80,
    },
    {
      title: "Service Name",
      dataIndex: "service.full_name",
      key: "service_name",
      width: 80,
    },
    {
      title: "Client Name",
      dataIndex: "client.name",
      key: "client_name",
      width: 80,
    },
    {
      title: "Industry Name",
      dataIndex: "industry_type.name",
      key: "industry_name",
      width: 80,
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      width: 80,
    },
    {
      title: "January",
      children: [
        {
          title: "Target",
          dataIndex: "january_target",
          key: "january_target",
          width: 120,
        },
        {
          title: "Achievement",
          dataIndex: "january_achieve",
          key: "january_achieve",
          width: 120,
        },
        {
          title: "Percentage",
          key: "january_percentage",
          render: (row) =>
            handlePercentage(row?.january_target, row?.january_achieve),
          width: 120,
        },
      ],
    },
    {
      title: "February",
      children: [
        {
          title: "Target",
          dataIndex: "february_target",
          key: "february_target",
          width: 120,
        },
        {
          title: "Achievement",
          dataIndex: "february_achieve",
          key: "february_achieve",
          width: 120,
        },
        {
          title: "Percentage",
          key: "february_percentage",
          render: (row) =>
            handlePercentage(row?.february_target, row?.february_achieve),
          width: 120,
        },
      ],
    },
    {
      title: "March",
      children: [
        {
          title: "Target",
          dataIndex: "march_target",
          key: "march_target",
          width: 120,
        },
        {
          title: "Achievement",
          dataIndex: "march_achieve",
          key: "march_achieve",
          width: 120,
        },
        {
          title: "Percentage",
          key: "march_percentage",
          render: (row) =>
            handlePercentage(row?.march_target, row?.march_achieve),
          width: 120,
        },
      ],
    },
    {
      title: "April",
      children: [
        {
          title: "Target",
          dataIndex: "april_target",
          key: "april_target",
          width: 120,
        },
        {
          title: "Achievement",
          dataIndex: "april_achieve",
          key: "april_achieve",
          width: 120,
        },
        {
          title: "Percentage",
          key: "april_percentage",
          render: (row) =>
            handlePercentage(row?.april_target, row?.april_achieve),
          width: 120,
        },
      ],
    },
    {
      title: "May",
      children: [
        {
          title: "Target",
          dataIndex: "may_target",
          key: "may_target",
          width: 120,
        },
        {
          title: "Achievement",
          dataIndex: "may_achieve",
          key: "may_achieve",
          width: 120,
        },
        {
          title: "Percentage",
          key: "may_percentage",
          render: (row) => handlePercentage(row?.may_target, row?.may_achieve),
          width: 120,
        },
      ],
    },
    {
      title: "June",
      children: [
        {
          title: "Target",
          dataIndex: "june_target",
          key: "june_target",
          width: 120,
        },
        {
          title: "Achievement",
          dataIndex: "june_achieve",
          key: "june_achieve",
          width: 120,
        },
        {
          title: "Percentage",
          key: "june_percentage",
          render: (row) =>
            handlePercentage(row?.june_target, row?.june_achieve),
          width: 120,
        },
      ],
    },
    {
      title: "July",
      children: [
        {
          title: "Target",
          dataIndex: "july_target",
          key: "july_target",
          width: 120,
        },
        {
          title: "Achievement",
          dataIndex: "july_achieve",
          key: "july_achieve",
          width: 120,
        },
        {
          title: "Percentage",
          key: "july_percentage",
          render: (row) =>
            handlePercentage(row?.july_target, row?.july_achieve),
          width: 120,
        },
      ],
    },
    {
      title: "August",
      children: [
        {
          title: "Target",
          dataIndex: "august_target",
          key: "august_target",
          width: 120,
        },
        {
          title: "Achievement",
          dataIndex: "august_achieve",
          key: "august_achieve",
          width: 120,
        },
        {
          title: "Percentage",
          key: "august_percentage",
          render: (row) =>
            handlePercentage(row?.august_target, row?.august_achieve),
          width: 120,
        },
      ],
    },
    {
      title: "September",
      children: [
        {
          title: "Target",
          dataIndex: "september_target",
          key: "september_target",
          width: 120,
        },
        {
          title: "Achievement",
          dataIndex: "september_achieve",
          key: "september_achieve",
          width: 120,
        },
        {
          title: "Percentage",
          key: "september_percentage",
          render: (row) =>
            handlePercentage(row?.september_target, row?.september_achieve),
          width: 120,
        },
      ],
    },
    {
      title: "October",
      children: [
        {
          title: "Target",
          dataIndex: "october_target",
          key: "october_target",
          width: 120,
        },
        {
          title: "Achievement",
          dataIndex: "october_achieve",
          key: "october_achieve",
          width: 120,
        },
        {
          title: "Percentage",
          key: "october_percentage",
          render: (row) =>
            handlePercentage(row?.october_target, row?.october_achieve),
          width: 120,
        },
      ],
    },
    {
      title: "November",
      children: [
        {
          title: "Target",
          dataIndex: "november_target",
          key: "november_target",
          width: 120,
        },
        {
          title: "Achievement",
          dataIndex: "november_achieve",
          key: "november_achieve",
          width: 120,
        },
        {
          title: "Percentage",
          key: "november_percentage",
          render: (row) =>
            handlePercentage(row?.november_target, row?.november_achieve),
          width: 120,
        },
      ],
    },
    {
      title: "December",
      children: [
        {
          title: "Target",
          dataIndex: "december_target",
          key: "december_target",
          width: 120,
        },
        {
          title: "Achievement",
          dataIndex: "december_achieve",
          key: "december_achieve",
          width: 120,
        },
        {
          title: "Percentage",
          key: "december_percentage",
          render: (row) =>
            handlePercentage(row?.december_target, row?.december_achieve),
          width: 120,
        },
      ],
    },
    {
      title: "Total",
      children: [
        {
          title: "Target",
          dataIndex: "total_target",
          key: "total_target",
          width: 150,
        },
        {
          title: "Achievement",
          dataIndex: "total_achieve",
          key: "total_achieve",
          width: 150,
        },
        {
          title: "Percentage",
          key: "total_percentage",
          render: (row) =>
            handlePercentage(row?.total_target, row?.total_achieve),
          width: 150,
        },
      ],
    },
  ];

  return (
    <Wrapper style={{ width: "95%" }}>
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)",
        }}
        title="Sales Target Vs Achievement Report"
        extra={[
          <Button type="primary" onClick={exportData} key="report-button">
            <Icon type="download" />
            Download Excel
          </Button>,
        ]}
      />
      <Flex space="1rem" justify="normal">
        <Select
          style={{ width: "30%", marginRight: "1rem" }}
          placeholder="Year"
          showSearch
          value={selectedYear}
          onChange={(value) => setSelectedYear(value)}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {years.map((y) => (
            <Select.Option key={y} value={y}>
              {y}
            </Select.Option>
          ))}
        </Select>
        <Select
          allowClear={true}
          showSearch
          style={{ width: "20%", marginRight: "1rem" }}
          placeholder="Department"
          dropdownMatchSelectWidth={false}
          onChange={(event) => {
            setDepartment(event);
            setKAMList();
            setKAM();
          }}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {departmentList?.map((dept) => {
            return (
              <Select.Option key={dept.id} value={dept.id}>
                {dept.name}
              </Select.Option>
            );
          })}
        </Select>

        <Select
          allowClear={true}
          showSearch
          style={{ width: "20%", marginRight: "1rem" }}
          placeholder="KAM"
          dropdownMatchSelectWidth={false}
          value={KAM}
          onChange={(event) => setKAM(event)}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {kamList?.map((kam) => {
            return (
              <Select.Option key={kam.emp_id} value={kam.emp_id}>
                {kam.name}
              </Select.Option>
            );
          })}
        </Select>

        <Select
          allowClear={true}
          showSearch
          style={{ width: "20%", marginRight: "1rem" }}
          placeholder="Industry Type"
          dropdownMatchSelectWidth={false}
          onChange={(event) => {
            setIndustryType(event);
            setClientList();
            setClient();
          }}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {industryTypeList?.map((industryType) => {
            return (
              <Select.Option key={industryType.id} value={industryType.id}>
                {industryType.name}
              </Select.Option>
            );
          })}
        </Select>
        <Select
          allowClear={true}
          showSearch
          style={{ width: "20%", marginRight: "1rem" }}
          placeholder="Client"
          dropdownMatchSelectWidth={false}
          value={client}
          onChange={(event) => setClient(event)}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {clientList?.map((client) => {
            return (
              <Select.Option key={client.id} value={client.id}>
                {client.name}
              </Select.Option>
            );
          })}
        </Select>

        <Select
          allowClear={true}
          showSearch
          style={{ width: "20%", marginRight: "1rem" }}
          placeholder="Service Type"
          dropdownMatchSelectWidth={false}
          onChange={(event) => {
            setServiceType(event);
            setServiceSetupList();
            setServiceName();
          }}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {serviceTypeList?.map((serviceType) => {
            return (
              <Select.Option key={serviceType.id} value={serviceType.id}>
                {serviceType.name}
              </Select.Option>
            );
          })}
        </Select>

        <Select
          allowClear={true}
          showSearch
          style={{ width: "20%", marginRight: "1rem" }}
          placeholder="Service"
          dropdownMatchSelectWidth={false}
          value={serviceName}
          onChange={(event) => setServiceName(event)}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {serviceSetupList?.map((service) => {
            return (
              <Select.Option key={service.id} value={service.id}>
                {service.name}
              </Select.Option>
            );
          })}
        </Select>
      </Flex>
      <Table
        rowKey={(record) =>
          `${record?.kam_id}${record?.service_id}${record?.client_id}`
        }
        columns={columns}
        dataSource={targetVsAchievementList}
        bordered
        size="middle"
        scroll={{ x: "calc(100vw + 150rem)", y: "calc(100vh - 13rem)" }}
        pagination={{
          current: currentPage,
          total: pageCount * 10,
          onChange: (page) => setCurrentPage(page),
        }}
      />
    </Wrapper>
  );
};

export default SalesTargetVsAchievement;
