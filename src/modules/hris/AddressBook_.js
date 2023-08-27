import React, { Component } from "react";
import SearchFilter from "../commons/SearchFilter";
import {
  Row,
  Col,
  Button,
  Typography,
  Avatar,
  Pagination,
  Popover,
  Skeleton
} from "antd";
import { getData } from "../../scripts/getData";
import { checkRes } from "../../scripts/checkRes";
import { errorHandle } from "../../scripts/error";
import { slice_15 } from "../../scripts/slice";
import { alertPop } from "../../scripts/message";
import { ADDRESS_BOOK } from "../../scripts/api";
import { Link } from "react-router-dom";
import { TableWrapper } from '../commons/Wrapper'

class AddressBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: <Skeleton className="pad" active />,
      search_string: ""
    };
  }

  componentWillMount() {
    this.view(`${ADDRESS_BOOK}?paginate&page=1`);
  }

  view = async que => {
    this.setState({ loading: <Skeleton className="pad" active /> });
    let res = await getData(que);
    if (res) {
      if (checkRes(res.status)) {
        this.setState({
          allData: res.data.data.data,
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
        });
      } else {
        res.map(error => {
          alertPop("error", error);
        });
      }
    } else {
      errorHandle(res);
    }
  };

  search = que => {
    this.setState(
      {
        search_string: que
      },
      () => {
        this.view(`${ADDRESS_BOOK}?page=1&paginate&name=${que}`);
      }
    );
  };

  filter = link => {
    this.view();
  };

  render() {
    return (
      <TableWrapper>
          <SearchFilter
            search={this.search}
            // filter={this.filter}
            // filterOptions={[
            //   {
            //     type : 'designation',
            //     name : 'Designation',
            //     form : 'select'
            //   },{
            //     type : 'employment status',
            //     name : 'Employment status',
            //     form : 'radio'
            //   }
            // ]}
          />
        <div className="table-container">
          <div className="width-1500">
            <Row className="P-BG pad">
              <Col md={5} xs={5} lg={5}>
                <Typography.Text className="FIX_th" strong>
                  EMPLOYEE NAME
                </Typography.Text>
              </Col>
              <Col md={4} xs={4} lg={4}>
                <Typography.Text className="FIX_th" strong>
                  DEPARTMENT
                </Typography.Text>
              </Col>
              <Col md={2} xs={2} lg={2}>
                <Typography.Text className="FIX_th" strong>
                  ID
                </Typography.Text>
              </Col>
              <Col md={4} xs={4} lg={4}>
                <Typography.Text className="FIX_th" strong>
                  DESIGNATION
                </Typography.Text>
              </Col>
              <Col md={3} xs={3} lg={3}>
                <Typography.Text className="FIX_th" strong>
                  CONTACT
                </Typography.Text>
              </Col>
              <Col md={2} xs={2} lg={2}>
                <Typography.Text className="FIX_th" strong>
                  CATEGORY
                </Typography.Text>
              </Col>
              <Col md={2} xs={2} lg={2}>
                <Typography.Text className="FIX_th" strong>
                  REPORTING TO
                </Typography.Text>
              </Col>
              <Col md={2} xs={2} lg={2}>
                <Typography.Text className="FIX_th" strong>
                  PABX
                </Typography.Text>
              </Col>
            </Row>
            <div>
              {this.state.allData
                ? this.state.allData.map(elem => {
                    return (
                      <Link className='LINK' to={`/profile/personal-details/${elem.emp_id}`} key={elem.id}>
                        <Row className="pad bottom-bod flex_r">
                          <Col md={5} xs={5} lg={5}>
                            <Avatar src={elem.profile_pic} />
                            <Typography.Text strong className="left-pad">
                              {slice_15(elem.name)}
                            </Typography.Text>
                          </Col>
                          <Col md={4} xs={4} lg={4}>
                            <Typography.Text>
                              {slice_15(elem.department)}
                            </Typography.Text>
                          </Col>
                          <Col md={2} xs={2} lg={2}>
                            <Typography.Text>{elem.emp_id}</Typography.Text>
                          </Col>
                          <Col md={4} xs={4} lg={4}>
                            <Typography.Text>
                              {elem.designation.split(',')[0]}
                            </Typography.Text>
                          </Col>
                          <Col md={3} xs={3} lg={3}>
                            <Popover
                              content={
                                <div>
                                  <Typography.Text strong className="FIX_th">
                                    PHONE
                                  </Typography.Text>
                                  <div className="space">
                                    <Typography.Text strong>
                                      {elem.contact_no || "Not available!"}
                                    </Typography.Text>
                                  </div>
                                </div>
                              }
                              trigger="click"
                            >
                              <Button icon="phone" />
                            </Popover>
                            <Popover
                              content={
                                <div>
                                  <Typography.Text strong className="FIX_th">
                                    EMAIL
                                  </Typography.Text>
                                  <div className="space">
                                    <Typography.Text strong>
                                      {elem.email || "Not available!"}
                                    </Typography.Text>
                                  </div>
                                </div>
                              }
                              trigger="click"
                            >
                              <Button
                                style={{ marginLeft: "0.5rem" }}
                                icon="mail"
                              />
                            </Popover>
                          </Col>
                          <Col md={2} xs={2} lg={2}>
                            <Typography.Text>
                              {elem.employee_category}
                            </Typography.Text>
                          </Col>
                          <Col md={2} xs={2} lg={2}>
                            <Typography.Text>
                              {elem.reporting_to || "N/A"}
                            </Typography.Text>
                          </Col>
                          <Col md={2} xs={2} lg={2}>
                            <Typography.Text>
                              {/* {elem.pabx} */}-
                            </Typography.Text>
                          </Col>
                        </Row>
                      </Link>
                    );
                  })
                : this.state.loading}
              <div className="pad" />
            </div>
          </div>
        </div>
        {this.state.page_info &&
        this.state.page_info.current_page &&
        this.state.page_info.count > 1 ? (
          <div className="pagination">
            <Pagination
              onChange={e => {
                this.setState(
                  {
                    allData: null
                  },
                  () => {
                    this.view(
                      `${ADDRESS_BOOK}?page=${e}&paginate&name=${this.state.search_string}`
                    );
                  }
                );
              }}
              total={this.state.page_info.count * 10}
              itemRender={(current, type, originalElement) => {
                if (type === "prev") {
                  return <Button>Prev</Button>;
                }
                if (type === "next") {
                  return <Button>Next</Button>;
                }
                return originalElement;
              }}
            />
          </div>
        ) : (
          ""
        )}
      </TableWrapper>
    );
  }
}

export default AddressBook;
