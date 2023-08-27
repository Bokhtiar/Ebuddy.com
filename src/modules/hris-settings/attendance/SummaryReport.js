import React, { Component, Fragment } from "react";
import { TableWrapper } from '../../commons/Wrapper'
import SearchFilter from "../../commons/SearchFilter";
import Table from "../../commons/Table";
import { Skeleton } from "antd";

const table_data_dummy = 
    {
        width_class : 'width-1500',
        header : [
            {
                type : 'text',
                name : 'Employee',
                lg : 5
            },
            {
                type : 'text',
                name : 'ID',
                lg : 2
            },
            {
                type : 'text',
                name : 'Expected working days',
                lg : 3
            },
            {
                type : 'text',
                name : 'Worked days',
                lg : 3
            },
            {
                type : 'text',
                name : 'Expected working hours',
                lg : 4
            },
            {
                type : 'text',
                name : 'Worked hour',
                lg : 3
            },
            {
                type : 'text',
                name : 'Total absence',
                lg : 2
            },
            {
                type : 'text',
                name : 'Overtime',
                lg : 2
            }
        ],
        body : [...Array(10)].map ( elem => {
            return {
                data : [
                    {
                        type : 'head',
                        // src : ''
                        lg : 1
                    },
                    {
                        type : 'text',
                        name : 'Salman rahman desh',
                        lg : 4
                    },
                    {
                        type : 'text',
                        name : '1440',
                        lg : 2
                    },
                    {
                        type : 'text',
                        name : '5',
                        lg : 3
                    },
                    {
                        type : 'text',
                        name : '5',
                        lg : 3
                    },
                    {
                        type : 'text',
                        name : '40',
                        lg : 4
                    },
                    {
                        type : 'text',
                        name : '40',
                        lg : 3
                    },
                    {
                        type : 'text',
                        name : '0',
                        lg : 2
                    },
                    {
                        type : 'text',
                        name : '0',
                        lg : 2
                    }
                ]
            }
        })
    }


export default class SummaryReport extends Component {

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