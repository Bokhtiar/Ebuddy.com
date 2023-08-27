import React, { Component } from "react";
import { Input, Avatar, Typography, Empty, Skeleton, Button } from "antd";
import dummy_pic from "../../assets/dummy.jpg";
import { ADDRESS_BOOK_PAGE } from "../../scripts/api";
import { getData } from "../../scripts/api-service";

export default class PickEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      assignees: [],
      assignees_id: [],
      assignee_temp: [],
      employees: [],
      assignee_temp_id: []
    };
  }

  componentWillMount() {
    this.employeeList();
  }

  employeeList = async () => {
    let res = await getData(
      `${ADDRESS_BOOK_PAGE}&page=${this.state.page}${
        this.state.search_string ? `&name=${this.state.search_string}` : ""
      }`
    );
    if (res) {
      this.setState(
        {
          employees: [...this.state.employees, ...res.data.data.data],
          last_page: res.data.data.last_page
        },
        () => {
          this.setState({
            load_more_loading: null
          });
        }
      );
    }
  };

  loadMore = () => {
    this.setState(
      {
        load_more_loading: true,
        page: this.state.page + 1
      },
      () => {
        this.employeeList();
      }
    );
  };

  render() {
    return (
      <div>
        <Input.Search
          allowClear
          placeholder="Search"
          value={this.state.search_string || []}
          onSearch={() => {
            this.setState(
              {
                page: 1,
                employees: []
              },
              () => {
                this.employeeList("search");
              }
            );
          }}
          onChange={e => {
            this.setState({
              search_string: e.target.value || ""
            });
          }}
        />
        <div className="half-pad" />
        <div className='subordinates-container'>
          {this.state.employees ? (
            this.state.employees.length > 0 ? (
              this.state.employees
                .filter(sub => {
                  if (!this.props.current_members.map(mem => {
                      return mem.emp_id
                  }).includes(sub.emp_id)) {
                    return sub;
                  }
                })
                .map(elem => {
                  return (
                    <div
                      key={elem.emp_id}
                      onClick={() => {
                        this.setState({
                          assignee_temp: this.state.assignee_temp_id.includes(
                            elem.emp_id
                          )
                            ? this.state.assignee_temp.filter(assignee => {
                                return assignee.emp_id !== elem.emp_id;
                              })
                            : [...this.state.assignee_temp, elem],
                          assignee_temp_id: this.state.assignee_temp_id.includes(
                            elem.emp_id
                          )
                            ? this.state.assignee_temp_id.filter(assignee => {
                                return assignee !== elem.emp_id;
                              })
                            : [...this.state.assignee_temp_id, elem.emp_id]
                        });
                      }}
                      className='half-pad'
                    //   className={
                    //     this.state.assignee_temp_id.includes(elem.emp_id)
                    //       ? "flex_r P-HOVER half-pad employee-select"
                    //       : "flex_r P-HOVER half-pad"
                    //   }
                    >
                      <div className="flex_r half-pad">
                      <div>
                        <Avatar src={elem.profile_pic || dummy_pic} />
                      </div>
                      <div style={{ width: "100%" }} className="left-pad">
                        <Typography.Text strong>{elem.name}</Typography.Text>
                        <div>
                          <Typography.Text>{elem.designation}</Typography.Text>
                        </div>
                      </div>
                      <div>
                        <Button onClick={_=>this.props.method(elem)} size="small" type="primary">
                          Add
                        </Button>
                      </div>
                    </div>
                    </div>
                  );
                })
            ) : (
              <Empty className="big-space" />
            )
          ) : (
            <Skeleton active className="pad" />
          )}
          {this.state.page < this.state.last_page ? (
            <div className="pad">
              <Button
                type="primary"
                onClick={this.loadMore}
                ghost
                loading={this.state.load_more_loading}
                size="small"
                block
              >
                Load more
              </Button>
            </div>
          ) : (
            []
          )}
        </div>
        <div className="half-pad" />
      </div>
    );
  }
}
