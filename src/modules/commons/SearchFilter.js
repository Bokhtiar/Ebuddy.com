import {
  Button,
  Col,
  DatePicker,
  Empty,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Typography
} from "antd";
import moment from "moment";
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class SearchFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      searchString: ""
    };
  }

  modal = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  clearFilter = () => {
    this.setState(
      {
        filter: null
      },
      () => {
        this.props.filter(this.state.filter);
      }
    );
  };

  generateSearch = () => {
    this.props.search(this.state.searchString);
  };

  generateFilter = () => {
    if(this.state.filter?.date_to && this.state.filter?.date_from){
      if (
        moment(this.state.filter.date_to).isSameOrAfter(
          this.state.filter.date_from
        )
      ) {
        this.setState(
          {
            filter: {
              ...this.state.filter,
              date_from: this.state.filter.date_from
                ? this.state.filter.date_from.split("T")[0]
                : "",
              date_to: this.state.filter.date_to
                ? this.state.filter.date_to.split("T")[0]
                : ""
            }
          },
          () => {
            this.props.filter(this.state.filter);
            this.modal();
          }
        );
      } 
      else {
        let temp = this.state.filter.date_from || "";
        this.setState(
          {
            filter: {
              ...this.state.filter,
              date_from: this.state.filter.date_to
                ? this.state.filter.date_to.split("T")[0]
                : "",
              date_to: temp.split("T")[0]
            }
          },
          () => {
            this.props.filter(this.state.filter);
            this.modal();
          }
        );
      }
    }
  };

  render() {
    return (
      <Fragment>
        <div className="side-pad bottom-bod">
          <div className="mini-pad" />
          <Row className="centered">
            {this.props.title ? (
              <Col
                span={this.props.create || this.props.create_link ? 18 : 21}
                className="right-pad"
              >
                <Typography.Title style={{ margin: 0 }} level={4}>
                  {this.props.title}
                </Typography.Title>
              </Col>
            ) : (
              <Col
                span={this.props.create || this.props.create_link ? 18 : this.props.onlySearch ? 24 : 21}
                className="right-pad"
              >
                {this.props.search ?
                <Input.Search
                allowClear
                placeholder="input search text"
                onChange={e => {
                  this.setState(
                    {
                      searchString: e.target.value || ""
                    },
                    () => {
                      if (this.state.searchString == "") {
                        this.generateSearch();
                      }
                    }
                  );
                }}
                onSearch={this.generateSearch}
                enterButton={<Button type="primary">Search</Button>}
              /> : ''}
              </Col>
            )}
            <Col span={this.props.filter ? 3 : 0}>
              {this.props.failsafe && this.state.filter ? (
                <Row>
                  <Col span={18}>
                    <Button onClick={this.modal} type="primary" block ghost>
                      Filter
                    </Button>
                  </Col>
                  <Col span={6}>
                    <Button
                      className="no-border"
                      onClick={this.clearFilter}
                      icon="close"
                    />
                  </Col>
                </Row>
              ) : (
                <Button onClick={this.modal} type="primary" ghost block>
                  Filter
                </Button>
              )}
            </Col>
            {this.props.create_link ? (
              <Col className="left-pad" span={this.props.filter ? 3 : 6}>
                <Link to={this.props.create_link}>
                  <Button type="primary" block>
                    + Create
                  </Button>
                </Link>
              </Col>
            ) : (
              ""
            )}
            {this.props.create ? (
              <Col className="left-pad" span={3}>
                <Button onClick={this.props.create} type="primary" block>
                  + Create
                </Button>
              </Col>
            ) : (
              ""
            )}
          </Row>
          {/* {
            this.state.filter ?
            <div className='attendee-grid'>
              {
                Object.values(this.state.filter).map( elem => {
                  return (
                    <Button>{elem}</Button>
                  )
                })
              }
            </div> : ''
          } */}
          <div className="mini-pad" />
        </div>
        <Modal
          title="Filter"
          centered
          visible={this.state.modal}
          footer={null}
          onCancel={this.modal}
        >
          {this.props.filterOptions ? (
            this.props.filterOptions.map((elem, index) => {
              switch (elem.type) {
                case "dropdown":
                  return (
                    <Form.Item label={elem.name} required={elem.required}>
                      <Select
                        placeholder={elem.name}
                        value={
                          this.state.filter &&
                          this.state.filter[elem.return_value] &&
                          elem.options
                            ? elem.options.filter(opt => {
                                return (
                                  opt.id ===
                                  this.state.filter[elem.return_value]
                                );
                              })[0].name
                            : []
                        }
                        onChange={value => {
                          this.setState({
                            filter: {
                              ...this.state.filter,
                              [elem.return_value]: value
                            }
                          });
                        }}
                      >
                        {elem.options.map(option => {
                          return (
                            <Select.Option value={option.id}>
                              {option.name}
                            </Select.Option>
                          );
                        })}
                        {elem.async ? 
                        <Select.Option disabled key={-1}>
                          <Button onClick={elem.async_func} type='link' block>
                            {elem.async}
                          </Button>
                        </Select.Option>
                        : ''}
                      </Select>
                    </Form.Item>
                  );
                case "date" :
                  return (
                    <Form.Item
                          label={elem.name || 'Date'}
                          required={elem.required}
                        >
                          <DatePicker
                            value={
                              this.state.filter &&
                          this.state.filter[elem.return_value] ?
                          moment(this.state.filter[elem.return_value]) : ''
                            }
                            onChange={(date, date_string) => {
                              this.setState({
                                filter: {
                                  ...this.state.filter,
                                  [elem.return_value]: date_string
                                }
                              });
                            }}
                          />
                        </Form.Item>
                  )
                case "date_range":
                  return (
                    <Row key={`date-filter-${index}`}>
                      <Col lg={12} md={12} xs={12} className="right-pad">
                        <Form.Item
                          label="Starting date"
                          required={elem.required}
                        >
                          <DatePicker
                            value={
                              this.state.filter && this.state.filter.date_from
                                ? moment(this.state.filter.date_from)
                                : ""
                            }
                            onChange={(date, dateString) => {
                              this.setState({
                                filter: {
                                  ...this.state.filter,
                                  date_from: dateString
                                }
                              });
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} xs={12} className="left-pad">
                        <Form.Item label="Till date" required={elem.required}>
                          <DatePicker
                            value={
                              this.state.filter && this.state.filter.date_to
                                ? moment(this.state.filter.date_to)
                                : ""
                            }
                            onChange={(date, dateString) => {
                              this.setState({
                                filter: {
                                  ...this.state.filter,
                                  date_to: dateString
                                }
                              });
                            }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  );
                default:
                  return [];
              }
            })
          ) : (
            <Empty description="No filters available" className="big-space" />
          )}
          <Button
            onClick={this.generateFilter}
            size="large"
            type="primary"
            block
            // disabled={this.props.failsafe ? true : false}
          >
            Filter
          </Button>
        </Modal>
      </Fragment>
    );
  }
}

export default SearchFilter;
