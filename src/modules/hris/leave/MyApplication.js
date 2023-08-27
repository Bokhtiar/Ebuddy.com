import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  Input,
  Modal,
  Form,
  DatePicker,
  Select,
  Skeleton
} from "antd";
import { getData } from "../../../scripts/getData";
import { alertPop } from "../../../scripts/message";
import PendingLeave from "./PendingLeave";
import { checkRes } from "../../../scripts/checkRes";
import SearchFilter from "../../commons/SearchFilter";
import { leave_application_status } from "../../../scripts/colors";
import Table from "../../commons/Table";
import { TableWrapper } from "../../commons/Wrapper";
import dummy from "../../../assets/dummy.jpg";

const NOT_FOUND = "Not found";

class MyApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
      current_type: 2,
      modal: false,
      statuses: [
        { id: 1, title: "Normal" },
        { id: 2, title: "Absent" },
        { id: 3, title: "Half-day" }
      ]
    };
  }

  componentWillMount() {
    this.view("accounts/v1/hris/my-leave-applications");
  }

  view = async que => {
    let res = await getData(que);
    if (res) {
      if (checkRes(res.status)) {
        this.setState(
          {
            allData: res.data.data,
            tempData: res.data.data
          },
          () => {
            this.prepareTable();
          }
        );
      } else {
        res.map(elem => {
          alertPop("error", elem);
        });
      }
    } else {
    }
  };

  prepareTable = () => {
    this.setState({
      table_data: {
        width_class: "width-1200",
        header: [
          {
            type: "text",
            name: "Start date",
            lg: 2
          },
          {
            type: "text",
            name: "End date",
            lg: 2
          },
          {
            type: "text",
            name: "Joining date",
            lg: 2
          },
          {
            type: "text",
            name: "Status",
            lg: 2
          },
          {
            type: "text",
            name: "Approval waiting for",
            lg: 5
          },
          {
            type: "text",
            name: "Reason",
            lg: 4
          },
          {
            type: "text",
            name: "Days",
            lg: 2
          },
          {
            type: "text",
            name: "Type",
            lg: 3
          },
          {
            type: "text",
            name: "Remarks",
            lg: 2
          }
        ],
        body: this.state.tempData.map(elem => {
          return {
            data: [
              {
                type: "text",
                name: elem.date_from || NOT_FOUND,
                lg: 2
              },
              {
                type: "text",
                name: elem.date_to || NOT_FOUND,
                lg: 2
              },
              {
                type: "text",
                name: elem.joining_date || "-",
                lg: 2
              },
              {
                type: "tag",
                name: leave_application_status.title[elem.status] || NOT_FOUND,
                color: leave_application_status.color[elem.status] || "black",
                lg: 2
              },
              {
                type: "head",
                src: elem.waiting_for_profile_pic || dummy,
                lg: 1
              },
              {
                type: "text",
                name: elem.waiting_for_name || NOT_FOUND,
                lg: 3
              },
              {
                type: "popover",
                icon_type: "info-circle",
                title: "Approval flow",
                lg: 1,
                popover: elem.flow
                  ? elem.flow.map(val => {
                      return {
                        width_class: "width-300",
                        data: [
                          {
                            type: "head",
                            src: dummy,
                            lg: 7
                          },
                          {
                            type: "text",
                            name: "Shahriar Hasan Parash",
                            tag: NOT_FOUND,
                            color: "black",
                            lg: 17
                          }
                        ]
                      };
                    })
                  : null
              },
              {
                type: "text",
                name: elem.reason || NOT_FOUND,
                lg: 4
              },
              {
                type: "text",
                name: elem.days || "-",
                lg: 2
              },
              {
                type: "text",
                name: elem.leave_type || NOT_FOUND,
                lg: 3
              },
              {
                type: "text",
                name: elem.remarks || "-",
                lg: 2
              }
            ]
          };
        })
      }
    });
  };

  modal = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  search = link => {
    //todo
  };

  render() {
    return (
      <TableWrapper>
        {/* <div className="pad">
          <SearchFilter search={this.search} />
        </div> */}
        {/* <div className='pad'>
                    <div className='filter-btn'>
                        <Button onClick={() => {this.setState({current_type : 1})}} type={this.state.current_type === 1 ? 'primary' : ''}>
                            Pending leave application
                        </Button>
                    </div>
                    <div className='filter-btn'>
                        <Button onClick={() => {this.setState({current_type : 2})}} type={this.state.current_type === 2 ? 'primary' : ''}>
                            All my applications
                        </Button>
                    </div>
                </div> */}
        {this.state.current_type === 1 ? (
          <PendingLeave />
        ) : this.state.current_type === 2 ? (
          this.state.table_data ? (
            <Table data={this.state.table_data} />
          ) : (
            <Skeleton className="pad" active />
          )
        ) : (
          []
        )}
        <Modal
          title="Filter"
          centered
          visible={this.state.modal}
          footer={false}
          onCancel={this.modal}
        >
          <Form.Item label="Employee name">
            <Input
              onChange={e => {
                this.setState({
                  emp_name: e.target.value
                });
              }}
              placeholder="Employee name"
            />
          </Form.Item>
          <Form.Item label="Select date range">
            <Row>
              <Col lg={11}>
                <DatePicker
                  style={{ width: "100%" }}
                  onChange={(date, dateString) => {
                    this.setState({
                      date_from: dateString
                    });
                  }}
                  placeholder="Date from"
                />
              </Col>
              <Col lg={{ span: 11, offset: 2 }}>
                <DatePicker
                  style={{ width: "100%" }}
                  onChange={(date, dateString) => {
                    this.setState({
                      date_from: dateString
                    });
                  }}
                  placeholder="Date from"
                />
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="Select status">
            <Select
              onChange={value => {
                this.setState({
                  current_type: value
                });
              }}
              style={{ width: "100%" }}
              placeholder="Select status"
            >
              {this.state.statuses.map(val => {
                return (
                  <Select.Option value={val.id}>{val.title}</Select.Option>
                );
              }) || []}
            </Select>
          </Form.Item>
          <Button type="primary" size="large" block>
            Search
          </Button>
        </Modal>
      </TableWrapper>
    );
  }
}

export default MyApplication;
