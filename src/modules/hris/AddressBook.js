import React, { Component } from "react";
import SearchFilter from "../commons/SearchFilter";
import { Skeleton } from "antd";
import { getData } from "../../scripts/getData";
import { ADDRESS_BOOK } from "../../scripts/api";
import { TableWrapper } from "../commons/Wrapper";
import Table from "../commons/Table";
import Paginate from "../commons/Paginate";
import { withRouter } from "react-router-dom";

const NOT_FOUND = "Not found";

class AddressBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //todo
    };
  }

  componentDidMount() {
    this.view(
      `${ADDRESS_BOOK}?page=${
        this.props.params.page ? this.props.params.page : "1"
      }&paginate`
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.view(
        `${ADDRESS_BOOK}?page=${
          this.props.params.page ? this.props.params.page : "1"
        }&paginate`
      );
    }
  }

  view = async que => {
    this.setState({ table_data: null });
    let res = await getData(
      `${que}${
        this.state.search_string ? `&name=${this.state.search_string}` : ""
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
          },
          loading: false
        },
        () => {
          this.prepareTable();
        }
      );
    }
  };

  prepareTable = () => {
    this.setState({
      table_data: {
        width_class: "width-1500",
        header: [
          {
            type: "text",
            name: "Employee name",
            lg: 5
          },
          {
            type: "text",
            name: "Department",
            lg: 4
          },
          {
            type: "text",
            name: "Id",
            lg: 2
          },
          {
            type: "text",
            name: "Designation",
            lg: 4
          },
          {
            type: "text",
            name: "Contact",
            lg: 3
          },
          {
            type: "text",
            name: "Category",
            lg: 2
          },
          {
            type: "text",
            name: "Reporting to",
            lg: 2
          },
          {
            type: "text",
            name: "Pabx",
            lg: 2
          }
        ],
        body: this.state.tempData.map(elem => {
          return {
            data: [
              {
                type: "text",
                name: elem.name || NOT_FOUND,
                lg: 5
              },
              {
                type: "text",
                name: elem.department || NOT_FOUND,
                lg: 4
              },
              {
                type: "text",
                name: elem.emp_id || NOT_FOUND,
                lg: 2
              },
              {
                type: "text",
                name: elem.designation || NOT_FOUND,
                lg: 4
              },
              {
                type: "text",
                name: elem.contact_no || NOT_FOUND,
                lg: 3
              },
              {
                type: "text",
                name: elem.employee_category || NOT_FOUND,
                lg: 2
              },
              {
                type: "text",
                name: elem.reporting_to || NOT_FOUND,
                lg: 2
              },
              {
                type: "text",
                // name: {/* {elem.pabx} */},
                name: "-",
                lg: 2
              }
            ]
          };
        })
      }
    });
  };

  search = que => {
    this.setState(
      {
        search_string: que
      },
      () => {
        this.view(`${ADDRESS_BOOK}?page=1&paginate`);
        this.props.history.push(`/hris/address-book/1`);
      }
    );
  };

  paginate = page => {
    if (page) {
      this.props.history.push(`/hris/address-book/${page}`);
    }
  };

  render() {
    return (
      <TableWrapper>
        <SearchFilter search={this.search} />
        {this.state.table_data ? (
          <Table
            data={this.state.table_data}
            pagination={this.state.page_info.count > 1}
          />
        ) : (
          <Skeleton active className="pad" />
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

export default withRouter(props => <AddressBook {...props} />);
