import React, { Component, Fragment } from "react";
import { getData, postData } from "../../scripts/api-service";
import { Link } from "react-router-dom";
import { TableWrapper } from "../commons/Wrapper";
import {
  Typography,
  Button,
  Row,
  Skeleton,
  Modal,
  Col,
  Form,
  Input
} from "antd";
import { _my_cbs } from "../../scripts/colors";
import {
  ORG_CBS_COUNT,
  ORG_CBS,
  ORG_APPROVE_DECLINE,
  CBS_PAID
} from "../../scripts/api";
import Table from "../commons/Table";
import Paginate from "../commons/Paginate";
import SearchFilter from "../commons/SearchFilter";
import { alertPop } from "../../scripts/message";
import { getSubordinates } from "../../scripts/org";

const NOT_FOUND = "Not found";

export default class OrgCBS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
      my_status: [],
      modal: false,
      filterOptions: [
        {
          type: "date_range"
        }
      ]
    };
  }

  async componentDidMount() {
    this.setState({
      filterOptions: [
        ...this.state.filterOptions,
        {
          type: "dropdown",
          name: "Select employee",
          return_value: "subordinates",
          options: (await getSubordinates()).map(sub => {
            return {
              id: sub.emp_id,
              name: sub.name
            };
          })
        }
      ]
    });
    this.view(
      `${ORG_CBS}?page=${this.props.params.page}&status=${this.props.params.id}`
    );
    this.getCount();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.view(
        `${ORG_CBS}?page=${this.props.params.page}&status=${this.props.params.id}`
      );
    }
  }

  getCount = async () => {
    let my_status = await getData(ORG_CBS_COUNT);
    if (my_status && my_status.data.data) {
      this.setState({
        my_status: my_status.data.data
      });
    }
  };

  view = async que => {
    this.setState({
      table_data: null
    });
    let res = await getData(
      `${que}${
        this.state.filter_emp ? `&emp_id=${this.state.filter_emp}` : ""
      }${
        this.state.filter_date_from
          ? `&date_from=${this.state.filter_date_from}`
          : ""
      }${
        this.state.filter_date_to ? `&date_to=${this.state.filter_date_to}` : ""
      }`
    );
    if (res) {
      this.setState(
        {
          allData: res.data.data.data,
          tempData: res.data.data.data,
          page_info: {
            current_page: res.data.data.current_page,
            prev_page_url: res.data.data.prev_page_url
              ? res.data.data.prev_page_url.split("imaladin.com/")[1]
              : null,
            next_page_url: res.data.data.next_page_url
              ? res.data.data.next_page_url.split("imaladin.com/")[1]
              : null,
            count: res.data.data.last_page
          }
        },
        () => {
          this.prepareTable();
        }
      );
    } else {
      this.setState({
        table_data: []
      });
    }
  };

  prepareTable = () => {
    this.setState({
      table_data: {
        width_class: "width-1000",
        header_buttons: this.props.params.id === "2" ? true : false,
        header: [
          {
            type: "text",
            name: "Employee",
            lg: { offset: 2, span: 8 }
          },
          {
            type: "text",
            name: "Date range",
            lg: 5
          },
          {
            type: "text",
            name: "Total amount",
            lg: 3
          },
          {
            type: "text",
            name: "Status",
            lg: this.props.params.id === "2" ? 3 : 6
          },
          this.props.params.id === "2"
            ? {
                type: "cbs-button",
                name: "Approve all",
                btn_color: "#509e76",
                btn_id: "approve",
                method: this.callModal,
                lg: 3
              }
            : {}
        ],
        body: this.state.tempData.map(elem => {
          return {
            selectable: this.props.params.id === "2" ? true : false,
            // buttons: this.props.params.id === "3" ? true : false,
            collapse: elem.cbs.map(cbs => {
              return {
                selectable: this.props.params.id === "2" ? true : false,
                buttons: this.props.params.id === "2" ? true : false,
                to: `/cbs/organizational-cbs/${this.props.params.page}/${this.props.params.id}/details/${cbs.id}`,
                id: cbs.id,
                data: [
                  {
                    type: "text",
                    name: cbs.name,
                    lg:
                      this.props.params.id === "2" ? 6 : { offset: 3, span: 6 }
                  },
                  {
                    type: "text",
                    name: cbs.created_at.split(" ")[0] || "-",
                    lg: { offset: 1, span: 5 }
                  },
                  {
                    type: "text",
                    name: cbs.amount,
                    lg: 3
                  },
                  this.props.params.id === "2"
                    ? {
                        type: "button",
                        name: "Decline",
                        btn_color: "red",
                        btn_id: "decline",
                        method: this.callModal,
                        lg: { offset: 3, span: 3 }
                      }
                    : {}
                ]
              };
            }),
            //   to: `/cbs/organizational-cbs/${this.props.params.page}/${this.props.params.id}/details/${elem.id}`,
            data: [
              {
                type: "head",
                src: elem.user_details.profile_pic,
                lg: this.props.params.id === "2" ? 1 : { offset: 2, span: 1 }
              },
              {
                type: "text",
                name: elem.user_details.name || NOT_FOUND,
                lg: 5
              },
              {
                type: "tag",
                name: `${elem.cbs.length} CBS` || NOT_FOUND,
                color: "#0084e6",
                lg: 2
              },
              {
                type: "text",
                name: elem.date_range,
                lg: 5
              },
              {
                type: "text",
                name: elem.amount || NOT_FOUND,
                lg: 3
              },
              {
                type: "tag",
                name: _my_cbs.title[this.props.params.id] || NOT_FOUND,
                color: _my_cbs.color[this.props.params.id] || "black",
                lg: 3
              }
              // this.props.params.id === "3"
              //   ? {
              //     type: "button",
              //     name: "Paid",
              //     btn_color: "#509e76",
              //     btn_id : 'paid',
              //     method : this.callModal,
              //     lg: 3                  }
              //   : {}
            ]
          };
        })
      }
    });
  };

  // paid = async () => {
  //   let data = {
  //     cbs_id : this.state.selected.map( cbs => {
  //       return cbs.id
  //     }),
  //     status : 4
  //   }
  //   let res = await postData(CBS_PAID, data)
  //   if(res) {
  //     this.view(
  //       `${ORG_CBS}?page=${this.props.params.page}&status=${this.props.params.id}`
  //     );
  //     alertPop('success', `${this.state.selected.length} CBS marked as paid`)
  //   } else {
  //     alertPop('error', 'Failed')
  //   }
  //   this.modal()
  // }

  approve = async () => {
    let date = [
      ...new Set(
        this.state.selected.map(val => {
          return val.created_at.split(" ")[0];
        })
      )
    ].sort();
    let data = {
      cbs_id: this.state.selected.map(cbs => {
        return cbs.id;
      }),
      status: 1,
      date_from: date[0],
      date_to: date[date.length - 1],
      summery: this.state.summary
    };
    let res = await postData(ORG_APPROVE_DECLINE, data);
    if (res) {
      this.view(
        `${ORG_CBS}?page=${this.props.params.page}&status=${this.props.params.id}`
      );
      alertPop("success", `${this.state.selected.length} CBS Approved`);
    } else {
      alertPop("error", "Failed");
    }
    this.getCount();
    this.modal();
  };

  decline = async () => {
    let data = {
      cbs_id: this.state.selected.map(cbs => {
        return cbs.id;
      }),
      status: 0,
      note: this.state.note
    };
    let res = await postData(ORG_APPROVE_DECLINE, data);
    if (res) {
      this.view(
        `${ORG_CBS}?page=${this.props.params.page}&status=${this.props.params.id}`
      );
      alertPop("success", `${this.state.selected.length} CBS Declined`);
    } else {
      alertPop("error", "Failed");
    }
    this.getCount();
    this.modal();
  };

  callModal = (type, selected) => {
    this.setState(
      {
        modal_type: type,
        selected: this.state.tempData
          .map(elem => {
            return elem.cbs.filter(cbs => {
              return selected.includes(cbs.id);
            });
          })
          .flat()
      },
      () => {
        this.modal();
      }
    );
  };

  modal = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  filter = filters => {
    this.setState(
      {
        filter_date_from: filters.date_from || "",
        filter_date_to: filters.date_to || "",
        filter_emp: filters.subordinates || ""
      },
      () => {
        this.view(
          `${ORG_CBS}?page=${this.props.params.page}&status=${this.props.params.id}1&status=${this.props.params.id}`
        );
      }
    );
  };

  paginate = page => {
    if (page) {
      this.props.history.push(
        `/cbs/organizational-cbs/${page}/${this.props.params.id}`
      );
    }
  };

  // Main method
  render() {
    return (
      <TableWrapper>
        <SearchFilter
          title="Organizational bills"
          filter={this.filter}
          filterOptions={this.state.filterOptions}
        />
        <div className="half-pad" />
        <Row className="side-pad">
          {this.state.my_status.map((elem, index) => {
            return (
              <Link
                to={`/cbs/organizational-cbs/1/${elem.value}`}
                key={elem.id}
                className="filter-btn"
              >
                <Button
                  id="btn"
                  tabIndex="0"
                  className="btn"
                  type={this.props.params.id == elem.value ? "primary" : ""}
                  onClick={() => {
                    document.getElementById("btn").classList.remove(":focus");
                  }}
                >
                  {elem.title}
                  <Typography.Text
                    style={{
                      margin: "0 -0.7rem 0 1rem",
                      color:
                        this.props.params.id == elem.value
                          ? "white"
                          : "#000000f1"
                    }}
                    code
                  >
                    {elem.number_count}
                  </Typography.Text>
                </Button>
              </Link>
            );
          })}
        </Row>
        {this.state.table_data ? (
          <Table
            top-bod
            data={this.state.table_data}
            pagination={this.state.page_info.count > 1 ? true : false}
          />
        ) : (
          <Skeleton className="pad" active />
        )}
        <Paginate
          page_info={this.state.page_info}
          current={this.props.params.page}
          paginate={this.paginate}
        />
        <Modal
          title={
            this.state.modal_type === "approve" ? (
              <Typography.Text style={{ color: "#00B969" }} strong>
                Approve following CBS?
              </Typography.Text>
            ) : this.state.modal_type === "decline" ? (
              <Typography.Text style={{ color: "#EC3336" }} strong>
                Decline following CBS?
              </Typography.Text>
            ) : this.state.modal_type === "paid" ? (
              <Typography.Text style={{ color: "#EC3336" }} strong>
                Mark as paid following CBS?
              </Typography.Text>
            ) : (
              ""
            )
          }
          centered
          visible={this.state.modal}
          footer={false}
          onCancel={() => {
            this.setState({
              modal: false,
              selectedCBS: [],
              modalType: ""
            });
          }}
        >
          {this.state.modal_type === "approve" ? (
            <Fragment>
              <Typography.Text strong>Are you sure?</Typography.Text>
              <div className="pad" />
              <div className="P-BG">
                <Row>
                  <Col lg={12}>Total CBS ({this.state.selected.length})</Col>
                  <Col style={{ textAlign: "right" }} lg={12}>
                    {`৳${this.state.selected
                      .map(cbs => {
                        return cbs.amount;
                      })
                      .reduce((a, b) => a + b, 0)}`}
                  </Col>
                </Row>
              </div>
              <div className="space" />
              <div className="space" />
              <div>
                <Form.Item required label="Summary">
                  <Input.TextArea
                    onChange={e => {
                      this.setState({
                        summary: e.target.value
                      });
                    }}
                    placeHolder="Write summary here"
                  />
                </Form.Item>
              </div>
              <div className="space" />
              <div className="space" />
              <Row>
                <Col lg={{ span: 8, offset: 8 }}>
                  <Button
                    onClick={this.approve}
                    style={{ borderColor: "#00B969", color: "#00B969" }}
                    block
                    ghost
                  >
                    Approve
                  </Button>
                </Col>
              </Row>
            </Fragment>
          ) : this.state.modal_type === "paid" ? (
            <Fragment>
              <Typography.Text strong>Are you sure?</Typography.Text>
              <div className="pad" />
              <div className="P-BG">
                <Row>
                  <Col lg={12}>Total CBS ({this.state.selected.length})</Col>
                  <Col style={{ textAlign: "right" }} lg={12}>
                    {`৳${this.state.selected
                      .map(cbs => {
                        return cbs.amount;
                      })
                      .reduce((a, b) => a + b, 0)}`}
                  </Col>
                </Row>
              </div>
              <div className="space" />
              <div className="space" />
              <div className="space" />
              <Row>
                <Col lg={{ span: 8, offset: 8 }}>
                  <Button
                    onClick={this.paid}
                    style={{ borderColor: "#00B969", color: "#00B969" }}
                    block
                    ghost
                  >
                    Mark as paid
                  </Button>
                </Col>
              </Row>
            </Fragment>
          ) : this.state.modal_type === "decline" ? (
            <Fragment>
              <Typography.Text strong>Are you sure?</Typography.Text>
              <div className="space" />
              <div className="P-BG">
                <Row>
                  <Col lg={12}>Total CBS ({this.state.selected.length})</Col>
                  <Col style={{ textAlign: "right" }} lg={12}>
                    {`৳${this.state.selected
                      .map(cbs => {
                        return cbs.amount;
                      })
                      .reduce((a, b) => a + b, 0)}`}
                  </Col>
                </Row>
              </div>
              <div className="space" />
              <div>
                <Form.Item label="Declining reason">
                  <Input.TextArea
                    onChange={e => {
                      this.setState({
                        note: e.target.value
                      });
                    }}
                    placeHolder="Write reason here"
                  />
                </Form.Item>
              </div>
              <div className="space" />
              <div className="space" />
              <Row>
                <Col lg={{ span: 8, offset: 8 }}>
                  <Button onClick={this.decline} type="danger" block ghost>
                    Decline
                  </Button>
                </Col>
              </Row>
            </Fragment>
          ) : (
            ""
          )}
        </Modal>
      </TableWrapper>
    );
  }
}
