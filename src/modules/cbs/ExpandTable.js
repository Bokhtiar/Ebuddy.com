import React, { Component } from "react";
import { TableWrapper } from "../commons/Wrapper";
import { Link, withRouter } from "react-router-dom";
import SearchFilter from "../commons/SearchFilter";
import { Row, Button, Skeleton } from "antd";
import { BILL_PROC_SHOW } from "../../scripts/api";
import { getData } from "../../scripts/api-service";
import { _my_cbs } from "../../scripts/colors";
import Table from "../commons/Table";

const NOT_FOUND = "Not found";

class ExpandTable extends Component {
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
        `${BILL_PROC_SHOW}?id=${this.props.params.cbs_id}`
      );
  }

  view = async que => {
    let res = await getData(que);
    if (res) {
      this.setState(
        {
          allData: res.data.data,
          tempData: res.data.data,
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
  }

  prepareTable = () => {
    this.setState({
      table_data: {
        width_class: "width-1000",
        back_header : window.location.pathname.split('expand')[0],
        body: this.state.tempData.map(elem => {
          return {
            collapse: elem.cbs.map(cbs => {
              return {
                to: `/cbs/bill-process/${this.props.params.page}/${this.props.params.id}/details/${cbs.id}`,
                id: cbs.id,
                data: [
                  {
                    type: "text",
                    name: cbs.name,
                    lg: { offset: 3, span: 6 }
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
                  }
                ]
              };
            }),
            // to: `/cbs/team-cbs/${this.props.params.page}/${this.props.params.id}/details/${elem.id}`,
            data: [
              {
                type: "head",
                src: elem.user_details.profile_pic,
                lg: { offset: 2, span: 1 }
                // lg : 1
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
            ]
          };
        })
      }
    });
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
                style={{ marginBottom: "1rem" }}
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
          <Table data={this.state.table_data} />
        ) : (
          <Skeleton className="pad" active />
        )}
      </TableWrapper>
    );
  }
}

export default withRouter(props => <ExpandTable {...props} />);
