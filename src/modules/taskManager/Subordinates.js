import React, { Component } from "react";
import { TableWrapper } from "../commons/Wrapper";
import Table from "../commons/Table";
import { Link } from 'react-router-dom'
import { Skeleton, Row, Button } from "antd";
import { SUBORDINATES } from "../../scripts/api";
import { getData } from "../../scripts/api-service";

export default class Subordinates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //todo
    };
  }

  componentDidMount() {
    this.view(SUBORDINATES);
  }

  view = async que => {
    let res = await getData(que);
    if (res) {
      this.setState(
        {
          allData: res.data.data
        },
        () => {
          this.prepareTable();
        }
      );
    } else {
      this.prepareTable();
    }
  };

  prepareTable = () => {
    this.setState({
      table_data: {
        width_class: "width-1000",
        header: [
          {
            type: "text",
            name: "employee name",
            lg: 8
          },
          {
            type: "text",
            name: "Department",
            lg: 6
          },
          {
            type: "text",
            name: "id",
            lg: 3
          },
          {
            type: "text",
            name: "Designation",
            lg: 6
          }
        ],
        body: this.state.allData.map( elem => {
            return {
                to : `/tasks/subordinates/1/1/view/emp${elem.emp_id}/1/1`,
                data : [
                    {
                        type : 'head',
                        src : elem.profile_pic,
                        lg : 1
                    },
                    {
                        type : 'text',
                        name : elem.name,
                        lg : 7
                    },
                    {
                        type : 'text',
                        name : elem.department,
                        lg : 6
                    },
                    {
                        type : 'text',
                        name : elem.emp_id,
                        lg : 3
                    },
                    {
                        type : 'text',
                        name : elem.designation,
                        lg : 6
                    }
                ]
            }
        })
      }
    });
  };

  render() {
    return (
      <TableWrapper>
        {this.state.table_data ? (
          <Table data={this.state.table_data} />
        ) : (
          <Skeleton active className="pad" />
        )}
      </TableWrapper>
    );
  }
}
