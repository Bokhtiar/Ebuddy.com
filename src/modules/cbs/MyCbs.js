import React, { Component } from "react";
import { connect } from "react-redux";
import { getData } from "../../scripts/api-service";
import { Link, withRouter } from "react-router-dom";
import * as moment from "moment";
import { TableWrapper } from "../commons/Wrapper";
import {
  Typography,
  Button,
  Row,
  Skeleton,
} from "antd";
import { _my_cbs } from "../../scripts/colors";
import { MY_CBS, MY_CBS_COUNT } from "../../scripts/api";
import Table from "../commons/Table";
import Paginate from "../commons/Paginate";
import SearchFilter from "../commons/SearchFilter";

const NOT_FOUND = "Not found";

const filterOptions = [
  {
    type: "date_range"
  }
];

class MyCbs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
      active: true,
      searchString: "",
      loading: true,
        search_string: "",
        filter_date_from: "",
        filter_date_to: "",
        filter_type: "",
      my_status: [],
      current_type: {
        value: 1,
        title: "Pending"
      }
    };
  }

  componentDidMount() {
    this.view(
      `${MY_CBS}?page=${this.props.params.page}&status=${this.props.params.id}`
    );
    this.getCount();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.view(
        `${MY_CBS}?page=${this.props.params.page}&status=${this.props.params.id}`
      );
    }
  }

  getCount = async () => {
    let my_status = await getData(MY_CBS_COUNT);
    if (my_status && my_status.data && my_status.data.data) {
      this.setState({
        my_status: my_status.data.data
      });
    }
  };

  view = async que => {
    this.setState({
      table_data: null
    });
    let res = await getData(`${que}&name=${this.state.search_string}&date_from=${this.state.filter_date_from}&date_to=${this.state.filter_date_to}&type=${this.state.filter_type}`);
    if (res && res.data && res.data.data.list) {
      this.setState(
        {
          allData: res.data.data.list.data,
          tempData: res.data.data.list.data,
          page_info: {
            current_page: res.data.data.list.current_page,
            prev_page_url: res.data.data.list.prev_page_url
              ? res.data.data.list.prev_page_url.split("imaladin.com/")[1]
              : null,
            next_page_url: res.data.data.list.next_page_url
              ? res.data.data.list.next_page_url.split("imaladin.com/")[1]
              : null,
            count: res.data.data.list.last_page
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
            name: "Cbs title",
            lg: 6
          },
          {
            type: "text",
            name: "Purpose",
            lg: 6
          },
          {
            type: "text",
            name: "Date",
            lg: 4
          },
          {
            type: "text",
            name: "Status",
            lg: 4
          },
          {
            type: "text",
            name: "Amount",
            lg: 4
          }
        ],
        body: this.state.tempData.map(elem => {
          return {
            to: `/cbs/my-cbs/${this.props.params.page}/${this.props.params.id}/details/${elem.id}`,
            data: [
              {
                type: "text",
                name: elem.name || NOT_FOUND,
                lg: 6
              },
              {
                type: "text",
                name: elem.meeting_id ? "Meeting" : "Other",
                lg: 6
              },
              {
                type: "text",
                name: moment(elem.created_at).format("DD MMM YYYY"),
                lg: 4
              },
              {
                type: "tag",
                name: _my_cbs.title[elem.status] || NOT_FOUND,
                color: _my_cbs.color[elem.status] || "black",
                lg: 4
              },
              {
                type: "text",
                name: elem.amount,
                lg: 4
              }
            ]
          };
        })
      }
    });
  };

  search = link => {
    this.setState(
      {
        search_string: link,
        filter_date_from: "",
        filter_date_to: "",
        filter_type: ""
      },
      () => {
        this.view(`${MY_CBS}?page=1&status=${this.props.params.id}`);
        this.props.history.push(`/cbs/my-cbs/1/${this.props.params.id}`);
      }
    );
  };

  filter = filters => {
    this.setState(
      {
        filter_date_from: filters.date_from || "",
        filter_date_to: filters.date_to || "",
        search: ""
      },
      () => {
        this.props.history.push(`/cbs/my-cbs/1/${this.props.params.id}`);
        this.view(`${MY_CBS}?page=1&status=${this.props.params.id}`)
      }
    );
  };

  paginate = page => {
    if (page) {
      this.props.history.push(`/cbs/my-cbs/${page}/${this.props.params.id}`);
    }
  };

  // Main method
  render() {
    return (
      <TableWrapper>
        <SearchFilter
          search={this.search}
          filter={this.filter}
          filterOptions={filterOptions}
        />
        <div className="half-pad" />
        <Row className="side-pad">
          {this.state.my_status.map((elem, index) => {
            return (
              <Link
                to={`/cbs/my-cbs/1/${elem.value}`}
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
          <Table top-bod
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
      </TableWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    filteredLink: state.filteredLink.filteredLink
  };
};

export default connect(
  mapStateToProps,
  null
)(withRouter(props => <MyCbs {...props} />));
