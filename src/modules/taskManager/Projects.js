import React, { Component } from "react";
import { TableWrapper } from "../commons/Wrapper";
import SearchFilter from "../commons/SearchFilter";
import { Row, Button, Skeleton } from "antd";
import { Link, withRouter } from "react-router-dom";
import { CREATE_GET_PROJECT } from "../../scripts/api";
import { getData } from "../../scripts/api-service"
import Table from "../commons/Table";
import Paginate from "../commons/Paginate";

const task_status = [
  {
    id: 1,
    name: "To-do"
  },
  {
    id: 2,
    name: "Doing"
  },
  {
    id: 3,
    name: "Completed"
  }
];

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // createModal : false
    };
  }

  componentDidMount() {
      this.view(`${CREATE_GET_PROJECT}?page=${this.props.params.page}`);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.view(
        `${CREATE_GET_PROJECT}?page=${this.props.params.page}`
      );
    }
  }

  view = async que => {
    let res = await getData(`${que}${this.state.search_string ? `&search=${this.state.search_string}` : ''}`)
    if (res && res.data && res.data.data) {
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
  }

  prepareTable = () => {
      this.setState({
          table_data : {
              width_class : 'width-1000',
              header : [
                  {
                      type : 'text',
                      name : 'Project name',
                      lg  : 6
                  },
                  {
                      type : 'text',
                      name : 'Description',
                      lg : 12
                  },
                  {
                    type : 'text',
                    name : 'members',
                    lg : 6
                  }
              ],
              body : this.state.tempData.map(elem => {
                return {
                  to: `/tasks/projects/${this.props.params.page}/1/view/${elem.id}/1/1`,
                  data: [
                    {
                        type : 'text',
                        name : elem.title,
                        lg : 6
                    }, {
                        type : 'text',
                        name : elem.description,
                        lg : 12
                    }, {
                      type : 'head-array',
                      src : elem.members.map ( member => {
                        return {
                          id : member.profile.emp_id,
                          name : member.profile.name,
                          profile_pic : member.profile.profile_pic
                        }
                      }),
                      lg : 6
                    }
                  ]
                }
            })
          }
      })
  }

  search = link => {
    this.setState(
      {
        search_string: link
      },
      () => {
        this.view(`${CREATE_GET_PROJECT}?page=1}`);
        this.props.history.push(`/tasks/projects/1/${this.props.params.status || 1}`);
      }
    );
  }

  paginate = page => {
    if (page) {
      this.props.history.push(`/tasks/projects/${page}/${this.props.params.status || 1}`);
    }
  };
  render() {
    return (
      <TableWrapper>
        <SearchFilter search={this.search} create_link="/tasks/projects/create-new" />
        {/* <div className="half-pad" />
        <Row className="side-pad">
          {task_status.map(btn => {
            return (
              <Link
                to={`/tasks/${this.props.params.name || "my-tasks"}/1/${
                  btn.id
                }`}
                className="filter-btn"
              >
                <Button
                  type={this.props.params.status == btn.id ? "primary" : ""}
                >
                  {btn.name}
                </Button>
              </Link>
            );
          })}
        </Row>
        <div className="half-pad" /> */}
        {this.state.table_data ? (
          <Table
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

export default withRouter(props => <Projects {...props} />)