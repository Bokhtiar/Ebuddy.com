import React, { useEffect, useState } from "react";
import { Row, Col, DatePicker, Select } from "antd";
import { Wrapper } from "../../commons/Wrapper";
import Card from "./components/card";
import { getData } from "../../../scripts/api-service";
import { PROJECT_DASHBOARD_COUNTS, USER_LIST } from "../../../scripts/api";
import OnboardVsAchivement from "./components/milestone/OnboardVsAchivement";
import ValueVsAchivement from "./components/milestone/ValueVsAchivement";
import ClientBreakDown from "./components/milestone/ClientBreakDown";
import ValueVsAchivementChart from "./components/milestone/ValueVsAchivementChart";
import OnboardVsAchivementChart from "./components/milestone/OnboardVsAchivementChart";

const { Option } = Select;

const ActivityTracker = () => {
  const { RangePicker } = DatePicker;
  const [dashboardData, setDashboardData] = useState();
  const [users, setUsers] = useState();
  const [kamId, setKamId] = useState(null);
  const [dateRange, setDateRange] = useState(null);

  const getDashboardData = async () => {
    let url = PROJECT_DASHBOARD_COUNTS;
    if(kamId && dateRange) {
      url = url + '?kam_id=' + kamId + '&from_date=' + dateRange[0] + '&to_date' + dateRange[1]
    } else {
      if(kamId) {
        url = url + '?kam_id=' + kamId;
      } else if(dateRange) {
        url = url + '?from_date=' + dateRange[0] + '&to_date' + dateRange[1]
      }
    }
    let res = await getData(url);
    if (res) {
      let masterData = res?.data?.data;
      setDashboardData(masterData);
    }
  };


  const getUserData = async () => {
    let res = await getData(USER_LIST);

    if (res) {
      let masterData = res?.data?.data;
      setUsers(masterData);
    }
  };

  const onChangeSelect = (value) => {
    setKamId(value);
  };

  useEffect(() => {
    getUserData();
    getDashboardData();
  }, []);

  useEffect(() => {
    getDashboardData();
  }, [kamId, dateRange]);

  return (
    <Wrapper
      className="mx-2"
      style={{ width: "99%", marginTop: "1rem", marginBottom: 0 }}
    >
      <Row>
        <Col span={12}>
          <h2>Overview - Business Development</h2>
        </Col>
        <Col style={{ textAlign: "right" }} span={12}>
          <Row>
            <Col style={{ paddingRight: "5px" }} span={12}>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select"
                optionFilterProp="children"
                onChange={onChangeSelect}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {users?.length
                  ? users.map((user) => (
                      <Option value={user.emp_id} key={user.emp_id}>
                        {user.name}
                      </Option>
                    ))
                  : ""}
              </Select>
            </Col>
            <Col style={{ paddingLeft: "5px" }} span={12}>
              <RangePicker style={{ textAlign: 'left' }} onChange={(date, dateString) => setDateRange(dateString)}/>
            </Col>
          </Row>
        </Col>
      </Row>
      {dashboardData ? <Card data={dashboardData} /> : null}
      <Row gutter={16}>
        <Col span={12}>
          {<ValueVsAchivementChart />}
        </Col>
        <Col span={12}>
          {<OnboardVsAchivementChart />}
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          {<ValueVsAchivement />}
        </Col>
        <Col span={12}>
          {<OnboardVsAchivement />}
        </Col>
      </Row>
      {<ClientBreakDown />}
    </Wrapper>
  );
};

export default ActivityTracker;
