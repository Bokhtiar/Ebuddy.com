import React, { Component, Fragment } from "react";
import SearchFilter from "../../commons/SearchFilter";
import { Skeleton } from "antd";
import { getData } from "../../../scripts/getData";
import { checkRes } from "../../../scripts/checkRes";
import { errorHandle } from "../../../scripts/error";
import Table from "../../commons/Table";
import { TableWrapper } from "../../commons/Wrapper";
import { certificate_status } from "../../../scripts/colors";
import { CERTIFICATE_LIST } from "../../../scripts/api";

const NOT_FOUND = "Not found";

class CertificateList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
      loading: <Skeleton className="pad" active />
    };
  }

  componentWillMount() {
    this.view(`${CERTIFICATE_LIST}?page=1`);
  }

  view = async que => {
    let res = await getData(que);
    if (checkRes(res.status)) {
      this.setState({
        allData: res.data.data.data,
        tempData : res.data.data.data,
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
      }, () => {
        this.prepareTable()
      });
    } else {
      errorHandle(res);
    }
  };

  prepareTable = () => {
    this.setState({
      table_data: {
        width_class: "width-1000",
        header: [
          {
            type: "text",
            name: "Application type",
            lg: 4
          },
          {
            type: "text",
            name: "Purpose",
            lg: 6
          },
          {
            type: "text",
            name: "Needed by",
            lg: 4
          },
          {
            type: "text",
            name: "Applied on",
            lg: 3
          },
          {
            type: "text",
            name: "Status",
            lg: 3
          },
          {
            type: "text",
            name: "Remark",
            lg: 4
          }
        ],
        body: this.state.tempData.map(elem => {
          return {
            data: [
              {
                type: "text",
                name: elem.type_id || NOT_FOUND,
                lg: 4
              },
              {
                type: "text",
                name: elem.description || NOT_FOUND,
                lg: 6
              },
              {
                type: "text",
                name: elem.needed_by.split(" ")[0] || NOT_FOUND,
                lg: 4
              },
              {
                type: "text",
                name: elem.created_at.split(" ")[0],
                lg: 3
              },
              {
                type: "tag",
                name: certificate_status.title[elem.status] || NOT_FOUND,
                color : certificate_status.color[elem.status] || 'black',
                lg: 3
              },
              {
                type: "text",
                name: elem.remark || "-",
                lg: 4
              }
            ]
          };
        })
      }
    })
  }

  search = link => {
    this.setState({
      tempData : this.state.allData.filter( elem => {
        return elem.description.toLowerCase().includes(link.toLowerCase())
      })
    }, () => {
      this.prepareTable()
    })
  };

  render() {
    return (
      <TableWrapper>
          <SearchFilter search={this.search} />
        {this.state.table_data ? (
          <Table data={this.state.table_data} />
        ) : (
          <Skeleton className="pad" active />
        )}
      </TableWrapper>
    );
  }
}

export default CertificateList;
