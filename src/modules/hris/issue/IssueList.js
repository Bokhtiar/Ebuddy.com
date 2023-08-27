import React, { Component } from "react";
import SearchFilter from "../../commons/SearchFilter";
import { Empty, Skeleton } from "antd";
import { getData } from "../../../scripts/getData";
import { checkRes } from "../../../scripts/checkRes";
import { errorHandle } from "../../../scripts/error";
import Table from "../../commons/Table";
import { TableWrapper } from "../../commons/Wrapper";
import Paginate from "../../commons/Paginate";
import { ISSUE_LIST } from "../../../scripts/api";

const filterOptions = [
  {
    type: "dropdown",
    name: "Select type",
    return_value: "issue_type",
    // required : true,
    options: [
      {
        id: 1,
        name: "Food"
      },
      {
        id: 2,
        name: "Others"
      }
    ]
  },
  {
    type: "date_range"
    // required : true,
  }
];

class IssueList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
      search_string: "",
      filter_date_from: "",
      filter_date_to: "",
      filter_type: "",
      loading: <Skeleton active className="pad" />
    };
  }

  componentWillMount() {
    this.view(`${ISSUE_LIST}?page=1`);
  }

  view = async que => {
    let res = await getData(que);
    if (checkRes(res.status)) {
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
      errorHandle(res);
    }
  };

  prepareTable = () => {
    this.setState({
      table_data: {
        width_class: "width-auto",
        header: [
          {
            type: "text",
            name: "Issue type",
            lg: 4
          },
          {
            type: "text",
            name: "Details",
            lg: 16
          },
          {
            type: "text",
            name: "Applied on",
            lg: 4
          }
        ],
        body: this.state.tempData.map(elem => {
          return {
            data: [
              {
                type: "text",
                name: elem.type_id,
                lg: 4
              },
              {
                type: "text",
                name: elem.description,
                lg: 16
              },
              {
                type: "text",
                name: elem.created_at.split(" ")[0],
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
        this.view(`${ISSUE_LIST}?page=1&search=${this.state.search_string}`);
      }
    );
  };

  filter = filters => {
    this.setState(
      {
        filter_date_from: filters.date_from || "",
        filter_date_to: filters.date_to || "",
        filter_type: filters.issue_type || "",
        search: ""
      },
      () => {
        this.view(
          `${ISSUE_LIST}?page=1&search=${this.state.search_string}&date_from=${this.state.filter_date_from}&date_to=${this.state.filter_date_to}&type=${this.state.filter_type}`
        );
      }
    );
  };

  paginate = page => {
    this.view(
      `${ISSUE_LIST}?page=${page}&search=${this.state.search_string}&date_from=${this.state.filter_date_from}&date_to=${this.state.filter_date_to}&type=${this.state.filter_type}`
    );
  };

  render() {
    return (
      <TableWrapper>
        <SearchFilter
            search={this.search}
            filter={this.filter}
            filterOptions={filterOptions}
          />
        {this.state.table_data ? (
          <Table data={this.state.table_data} />
        ) : (
          <Skeleton className="pad" active />
        )}
        <div className="half-pad" />
        <Paginate page_info={this.state.page_info} paginate={this.paginate} />
      </TableWrapper>
    );
  }
}

export default IssueList;
