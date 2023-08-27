import React, { Component } from "react";
import { TableWrapper } from "../commons/Wrapper";
import SearchFilter from "../commons/SearchFilter";
import { Link, withRouter } from "react-router-dom";
import { Row, Skeleton, Button } from "antd";
import Table from "../commons/Table";
import { getData, postData } from "../../scripts/api-service";
import {
  BILL_PROC,
  BILL_PROC_SUMMARY,
  SCB_REPORT,
  ALL_REPORT,
  CASH_REPORT,
  TO_BANK_OR_PAID
} from "../../scripts/api";
import Paginate from "../commons/Paginate";
import { alertPop } from "../../scripts/message";

class BillProc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      my_status: [
        {
          id: 1,
          value: 1,
          title: "Processing"
        },
        {
          id: 2,
          value: 2,
          title: "Processing for bank"
        },
        {
          id: 3,
          value: 3,
          title: "Paid"
        }
      ]
    };
  }

  componentDidMount() {
    this.view(
      `${BILL_PROC}?page=${this.props.params.page}&status=${this.props.params.id}`
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        table_data: null
      });
      this.view(
        `${BILL_PROC}?page=${this.props.params.page}&status=${this.props.params.id}`
      );
    }
  }

  view = async que => {
    let res = await getData(que);
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
          },
          loading: false
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
        header: [
          {
            type: "text",
            name: "Date range",
            lg: 6
          },
          {
            type: "text",
            name: "Summary",
            lg: 5
          },
          {
            type: "text",
            name: "Amount",
            lg: 2
          }
        ],
        body: this.state.tempData.map(elem => {
          return {
            to: `/cbs/bill-process/${this.props.params.page}/${this.props.params.id}/expand/${elem.id}`,
            buttons:
              this.props.params.id === "1" || this.props.params.id === "2"
                ? true
                : false,
            data: [
              {
                type: "text",
                name: `${elem.date_from} - ${elem.date_to}`,
                lg: 6
              },
              {
                type: "text",
                name: elem.summery,
                lg: 5
              },
              {
                type: "text",
                name: elem.amount,
                lg: 2
              },
              ...this.setButtons(elem)
            ]
          };
        })
      }
    });
  };

  setButtons = elem => {
    if (this.props.params.id === "1") {
      return [
        {
          type: "button",
          name: "Summary",
          btn_type: "primary",
          ghost: true,
          icon: "download",
          btn_id: elem.id,
          loading: this.state.summary_btn_loading === elem.id ? true : false,
          method: this.summary,
          lg: { offset: 2, span: 3 }
        },
        {
          type: "button",
          name: "Process",
          btn_type: "primary",
          btn_id: elem.id,
          loading: this.state.process_btn_loading === elem.id ? true : false,
          method: _ => this.process(elem.id, "process"),
          lg: { offset: 1, span: 3 }
        }
      ];
    } else if (this.props.params.id === "2") {
      return [
        {
          type: "button",
          name: "SCB",
          btn_type: "primary",
          ghost: true,
          icon: "download",
          btn_id: elem.id,
          loading: this.state.scb_btn_loading === elem.id ? true : false,
          method: _ => this.bank_report(SCB_REPORT, elem.id, "scb"),
          lg: 3
        },
        {
          type: "button",
          name: "Cash",
          btn_type: "primary",
          ghost: true,
          icon: "download",
          btn_id: elem.id,
          loading: this.state.cash_btn_loading === elem.id ? true : false,
          method: _ => this.bank_report(CASH_REPORT, elem.id, "cash"),
          lg: 3
        },
        {
          type: "button",
          name: "All",
          btn_type: "primary",
          ghost: true,
          icon: "download",
          btn_id: elem.id,
          loading: this.state.all_btn_loading === elem.id ? true : false,
          method: _ => this.bank_report(ALL_REPORT, elem.id, "all"),
          lg: 3
        },
        {
          type: "button",
          name: "Paid",
          btn_type: "primary",
          btn_id: elem.id,
          loading: this.state.paid_btn_loading === elem.id ? true : false,
          method: _ => this.process(elem.id, "paid"),
          lg: 2
        }
      ];
    } else {
      return [];
    }
  };

  bank_report = async (api, id, type) => {
    let selector = `${type}_btn_loading`;
    this.loading(selector, id);
    let res = await getData(`${api}?id=${id}`);
    if (res) {
      if (res.data && res.data.data && res.data.data.file) {
        window.open(res.data.data.file, "_blank");
      } else {
        alertPop("error", "File not found.");
      }
    }
    this.loading(selector);
  };

  process = async (id, process_type) => {
    let selector = `${process_type}_btn_loading`;
    this.loading(selector, id);
    let data = {
      process_id: id,
      status: process_type === "process" ? 2 : process_type === "paid" ? 3 : ""
    };
    let res = await postData(TO_BANK_OR_PAID, data);
    if (res) {
      this.view(
        `${BILL_PROC}?page=${this.props.params.page}&status=${this.props.params.id}`
      );
      alertPop("success", "Success.");
    }
    this.loading(selector);
  };

  summary = async id => {
    this.loading("summary_btn_loading", id);
    let res = await getData(`${BILL_PROC_SUMMARY}?id=${id}`);
    if (res) {
      if (res.data && res.data.data && res.data.data.file) {
        window.open(res.data.data.file, "_blank");
      } else {
        alertPop("error", "File not found.");
      }
    }
    this.loading("summary_btn_loading");
  };

  loading = (selector, id) => {
    if (id) {
      this.setState({ [selector]: id }, () => {
        this.prepareTable();
      });
    } else {
      this.setState({ [selector]: null }, () => {
        this.prepareTable();
      });
    }
  };

  paginate = page => {
    if (page) {
      this.props.history.push(
        `/cbs/bill-process/${page}/${this.props.params.id}`
      );
    }
  };

  render() {
    return (
      <TableWrapper>
        <SearchFilter title="Bill in process" />
        <div className="half-pad" />
        <Row className="side-pad">
          {this.state.my_status.map(elem => {
            return (
              <Link
                to={`/cbs/bill-process/1/${elem.value}`}
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
                </Button>
              </Link>
            );
          })}
        </Row>
        {this.state.table_data ? (
          <Table top-bod data={this.state.table_data} pagination={this.state.page_info.count > 1 ? true : false}/>
        ) : (
          <Skeleton className="pad" active />
        )}
        <Paginate
          page_info={this.state.page_info}
          current={this.props.params.page}
          paginate={this.paginate}
        />
      </TableWrapper>
    );
  }
}

export default withRouter(props => <BillProc {...props} />);
