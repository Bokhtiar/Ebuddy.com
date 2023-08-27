import React, { Component, Fragment } from "react";
import { TableWrapper } from '../../commons/Wrapper'
import SearchFilter from "../../commons/SearchFilter";
import Table from "../../commons/Table";
import { Skeleton } from "antd";

const table_data_dummy = 
    {
        width_class : 'width-auto',
        header : [
            {
                type : 'text',
                name : 'Employee',
                lg : 6
            },
            {
                type : 'text',
                name : 'ID',
                lg : 2
            },
            {
                type : 'text',
                name : 'Date',
                lg : 3
            },
            {
                type : 'text',
                name : 'First in',
                lg : 3
            },
            {
                type : 'text',
                name : 'Last out',
                lg : 3
            },
            {
                type : 'text',
                name : 'Work hour',
                lg : 3
            },
            {
                type : 'text',
                name : 'status',
                lg : 2
            },
            {
                type : 'text',
                name : 'Shift',
                lg : 2
            }
        ],
        body : [...Array(7)].map ( elem => {
            return {
                data : [
                    {
                        type : 'head',
                        // src : ''
                        lg : 1
                    },
                    {
                        type : 'text',
                        name : 'Shahriar hasan parash',
                        lg : 5
                    },
                    {
                        type : 'text',
                        name : '1215',
                        lg : 2
                    },
                    {
                        type : 'text',
                        name : '12/08/2019',
                        lg : 3
                    },
                    {
                        type : 'text',
                        name : '9:10 AM',
                        lg : 3
                    },
                    {
                        type : 'text',
                        name : '6:30 PM',
                        lg : 3
                    },
                    {
                        type : 'text',
                        name : '8:05',
                        lg : 3
                    },
                    {
                        type : 'tag',
                        name : 'Normal',
                        color : '#009688',
                        lg : 2
                    },
                    {
                        type : 'text',
                        name : 'Dummy',
                        lg : 2
                    }
                ]
            }
        })
    }


export default class UserReport extends Component {

    constructor(props) {
        super(props)
        this.state = {
            table_data : table_data_dummy
        }
    }

  // Main method
  render() {
    return (
      <TableWrapper>
          <div className="pad">
            <SearchFilter/>
          </div>
          {this.state.table_data ? (
          <Table data={this.state.table_data} />
        ) : (
          <Skeleton className="pad" active />
        )}
      </TableWrapper>
    );
  }
}