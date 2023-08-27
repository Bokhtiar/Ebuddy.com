import React, { Component } from "react";
import {
  Typography,
  Tooltip,
  Button,
  Row,
  Col,
  Avatar,
  Modal,
  Skeleton
} from "antd";
import { getData } from "../../scripts/getData";
import { postData } from "../../scripts/postData";
import { alertPop } from "../../scripts/message";
import * as Cookies from "js-cookie";
import { checkRes } from "../../scripts/checkRes";
import { TableWrapper } from "../commons/Wrapper";
import Table from "../commons/Table";
import { _slice_ } from "../../scripts/slice";

class RolesCBS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subordinates: [],
      subordinates_local: [],
      addModal: false,
      kamla: [],
      boss: [],
      allData: [],
      update: false,
      admin: [],
      assigned: [],
      deleteModal: false,
      non_admin: []
    };
  }

  async componentDidMount() {
    let subs = await getData("accounts/v1/e-buddy/subordinate-list");
    this.setState({
      subordinates: subs.data.data
    });
    this.roleData();
  }

  roleData = async () => {
    let res = await getData("cbs/v1/get-cbs-approval-mapping");
    let assigned = [];
    res.data.data.map(elem => {
      elem.all_mapped_users.map(v => {
        assigned.push(v.emp_id);
      });
      if (
        elem.mapped_emp_details.emp_id ===
        JSON.parse(Cookies.get("profile")).emp_id
      ) {
        this.setState({
          non_admin: elem.all_mapped_users
        });
      }
    });
    this.setState(
      {
        allData: res.data.data,
        admin: res.data.data.map(item => {
          return item.mapped_emp_details.emp_id;
        }),
        assigned: assigned
      },
      () => {
        this.prepareTable();
      }
    );
    // this.fix()
  };

  addModal = () => {
    this.setState({
      addModal: !this.state.addModal
    });
  };

  deleteModal = () => {
    this.setState({
      deleteModal: !this.state.deleteModal
    });
  };

  addRole = async () => {
    let data = {
      emp_id: [
        ...this.state.kamla.map(elem => {
          return elem.emp_id;
        })
      ],
      mapped_emp_id: this.state.boss ? this.state.boss[0].emp_id : ""
    };
    let res = await postData("cbs/v1/add-cbs-approval-mapping", data);
    if (res.status && (res.status === 200 || res.status === 201)) {
      alertPop("success", "Employees assigned!");
      this.addModal();
      this.setState({
        kamla: [],
        boss: []
      });
      this.roleData();
    } else {
      res.map(elem => {
        alertPop("error", elem);
      });
    }
  };

  updateRole = async () => {
    let prev_list = [];
    this.state.allData.map(val => {
      if (
        val.mapped_emp_details.emp_id ==
        JSON.parse(Cookies.get("profile")).emp_id
      ) {
        val.all_mapped_users.map(v => {
          prev_list.push(v.emp_id);
        });
      }
    });
    let data = {
      emp_id: this.state.kamla.map(elem => {
        return elem.emp_id;
      }),
      mapped_emp_id: this.state.boss[0] ? this.state.boss[0].emp_id : []
    };
    let left = this.state.all_left.filter(elem => {
      return !data.emp_id.includes(elem.emp_id);
    });
    let left_data = {
      emp_id: [
        ...prev_list,
        ...left.map(elem => {
          return elem.emp_id;
        })
      ].filter(v => {
        return !data.emp_id.includes(v);
      }),
      mapped_emp_id: JSON.parse(Cookies.get("profile")).emp_id
    };
    let res = await postData("cbs/v1/update-cbs-approval-mapping", data);
    let left_res = await postData(
      "cbs/v1/update-cbs-approval-mapping",
      left_data
    );
    if (checkRes(res.status)) {
      if (
        left_res.status &&
        (left_res.status === 200 || left_res.status === 201)
      ) {
        this.addModal();
        alertPop("success", "Employees updated!");
        this.roleData();
        this.setState({
          kamla: [],
          boss: [],
          update: false,
          all_left: []
        });
      } else {
        left_res.map(e => {
          alertPop("error", e);
        });
      }
    } else {
      res.map(elem => {
        alertPop("error", elem);
      });
    }
  };

  removeThis = (elem, type) => {
    if (type === "boss") {
      this.setState({
        boss: [],
        subordinates_local: [elem, ...this.state.subordinates_local]
      });
    } else if (type === "kamla") {
      this.setState({
        kamla: this.state.kamla.filter(item => {
          return item.emp_id !== elem.emp_id;
        }),
        subordinates_local: [elem, ...this.state.subordinates_local]
      });
    }
  };

  deleteRole = async elem => {
    let data = {
      emp_id: [
        ...elem.all_mapped_users.map(val => {
          return val.emp_id;
        }),
        elem.mapped_emp_details.emp_id
      ],
      mapped_emp_id: JSON.parse(Cookies.get("profile")).emp_id
    };
    let res = await postData("cbs/v1/add-cbs-approval-mapping", data);
    if (res.status && (res.status === 200 || res.status === 201)) {
      alertPop("success", "Employees updated!");
      this.roleData();
      this.setState({
        kamla: [],
        boss: [],
        toDelete: null,
        deleteModal: false
        // update : false,
      });
    } else {
      res.map(elem => {
        alertPop("error", elem);
      });
    }
  };

  prepareTable = () => {
    this.setState({
      table_data: {
        width_class: "width-1000",
        header_buttons: true,
        header: [
          {
            type: "text",
            name: "CBS admin",
            lg: 6
          },
          {
            type: "text",
            name: "Employees",
            lg: 15
          },
          {
            type: "button",
            btn_type: "primary",
            block: true,
            method: this.createBtn,
            name: "Create",
            lg: 3
          }
        ],
        body: this.state.allData.map(elem => {
          return {
            buttons: true,
            data: [
              {
                type: "head",
                size: "medium",
                src: elem.mapped_emp_details.profile_pic,
                lg: 2
              },
              {
                type: "text",
                name: _slice_(elem.mapped_emp_details.name, 10),
                lg: 4
              },
              {
                type : 'head-array',
                src: elem.all_mapped_users.map(user => {
                  return {
                    id: user.emp_details.emp_id,
                    name: user.emp_details.name,
                    profile_pic: user.emp_details.profile_pic
                  };
                }),
                lg : 12
              },
              JSON.parse(Cookies.get("profile")).emp_id !==
                  elem.mapped_emp_details.emp_id ?
                  {
                    type: 'button',
                    btn_type: 'primary',
                    name : 'Edit',
                    ghost : true,
                    block : true,
                    method : _=>this.editBtn(elem),
                    lg : 3
                  } : {},
                  JSON.parse(Cookies.get("profile")).emp_id !==
                  elem.mapped_emp_details.emp_id ?
                  {
                    type: 'button',
                    btn_type: 'danger',
                    name : 'Delete',
                    ghost : true,
                    block : true,
                    method : _=>this.deleteBtn(elem),
                    lg : 3
                  } : {}
            ]
          };
        })
      }
    });
  };

  createBtn = () => {
    this.setState(
      {
        kamla: [],
        boss: [],
        update: false,
        subordinates_local: this.state.subordinates.filter(val => {
          return !this.state.admin.includes(val.emp_id);
        })
      },
      () => {
        // this.roleData()
        this.addModal();
      }
    );
  };

  editBtn = (elem) => {
    this.setState(
      {
        boss: [elem.mapped_emp_details],
        kamla: elem.all_mapped_users.map(val => {
          return val.emp_details;
        })
      },
      () => {
        let exist = [
          ...this.state.boss.map(a => {
            return a.emp_id;
          }),
          ...this.state.kamla.map(b => {
            return b.emp_id;
          })
        ];
        this.setState(
          {
            subordinates_local: this.state.subordinates.filter(
              value => {
                return !exist.includes(value.emp_id);
              }
            ),
            update: true,
            all_left: this.state.kamla
          },
          () => {
            this.addModal();
          }
        );
      }
    );
  }

  deleteBtn = (elem) => {
    this.setState({
      toDelete: elem
    });
    this.deleteModal();
  }

  render() {
    return (
      <TableWrapper>
        {this.state.table_data ? (
          <Table data={this.state.table_data} />
        ) : (
          <Skeleton active className="pad" />
        )}
        <Modal
          width="300px"
          title={
            <Typography.Text stong>
              Are you sure to delete this role?
            </Typography.Text>
          }
          centered
          visible={this.state.deleteModal}
          onCancel={this.deleteModal}
          footer={false}
        >
          <Row>
            <Col lg={11}>
              <Button
                onClick={() => {
                  this.setState({
                    toDelete: null
                  });
                  this.deleteModal();
                }}
                block
              >
                Cancel
              </Button>
            </Col>
            <Col lg={{ span: 11, offset: 2 }}>
              <Button
                type="danger"
                onClick={() => {
                  this.deleteRole(this.state.toDelete);
                }}
                block
              >
                Delete
              </Button>
            </Col>
          </Row>
        </Modal>
        <Modal
        className="modal-no-pad"
          width={this.state.update ? "400px" : "700px"}
          title={
            this.state.update ? (
              <Row>
                <Col lg={3}>
                  <Avatar
                    size="large"
                    src={
                      this.state.boss.length > 0
                        ? this.state.boss[0].profile_pic
                        : ""
                    }
                  />
                </Col>
                <Col style={{ paddingLeft: "1rem" }} lg={18}>
                  <Typography.Text>Edit employees for</Typography.Text>
                  <div>
                    <Typography.Text strong>
                      {this.state.boss[0].name}
                    </Typography.Text>
                  </div>
                </Col>
              </Row>
            ) : (
              <Typography.Text stong>CBS Roles</Typography.Text>
            )
          }
          centered
          visible={this.state.addModal}
          onCancel={this.addModal}
          footer={false}
        >
          <Row>
            <Col style={{ padding: "0.5rem" }} lg={this.state.update ? 24 : 12}>
              <Typography.Text strong>Employees</Typography.Text>
              <div className="space" />
              {this.state.kamla.length > 0 ? (
                <div className="FIX_grid">
                  {this.state.kamla.map(elem => {
                    return (
                      <div>
                        <Tooltip
                          title={
                            <Button.Group>
                              <Typography.Text
                                style={{ color: "white" }}
                                strong
                              >
                                {elem.name}
                              </Typography.Text>
                              <Button
                                onClick={() => this.removeThis(elem, "kamla")}
                                style={{ border: "0" }}
                                ghost
                                icon="close"
                              />
                            </Button.Group>
                          }
                        >
                          <div style={{ textAlign: "center" }}>
                            <Avatar
                              style={{ textAlign: "center" }}
                              size="large"
                              src={elem.profile_pic}
                            />
                          </div>
                          <div style={{ textAlign: "center" }}>
                            {`${elem.name.slice(0, 6)}...`}
                          </div>
                        </Tooltip>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className='P-BG center-text pad'>
                  None selected!
                </div>
              )}
              <div className='half-pad' />
              <Typography.Text strong>Employee list</Typography.Text>
              <div
              className="P-BG"
                style={{ height: "300px", overflow: "auto", padding: "0.5rem" }}
              >
                {this.state.subordinates_local
                  .filter(v => {
                    return !this.state.admin.includes(v.emp_id);
                  })
                  .map(elem => {
                    return (
                      <div
                        className="flex_r P-HOVER"
                        onClick={() => {
                          this.setState({
                            kamla: [...this.state.kamla, elem],
                            subordinates_local: this.state.subordinates_local.filter(
                              item => {
                                return item.emp_id !== elem.emp_id;
                              }
                            )
                          });
                        }}
                      >
                        <div className="FIX_space">
                          <Avatar src={elem.profile_pic} />
                        </div>
                        <div className="FIX_space">
                          <Typography.Text strong>{elem.name}</Typography.Text>
                          <div>
                            <Typography.Text>
                              {elem.designation}
                            </Typography.Text>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </Col>
            {this.state.update ? (
              []
            ) : (
              <Col style={{ padding: "0.5rem" }} lg={12}>
                <Typography.Text strong>Employee admin</Typography.Text>
                <div className="space" />
                {this.state.boss.length > 0 ? (
                  <div className="FIX_grid">
                    {this.state.boss.map(elem => {
                      return (
                        <div>
                          <Tooltip
                            title={
                              <Button.Group>
                                <Typography.Text
                                  style={{ color: "white" }}
                                  strong
                                >
                                  {elem.name}
                                </Typography.Text>
                                <Button
                                  onClick={_ => this.removeThis(elem, "boss")}
                                  style={{ border: "0" }}
                                  ghost
                                  icon="close"
                                />
                              </Button.Group>
                            }
                          >
                            <div style={{ textAlign: "center" }}>
                              <Avatar
                                style={{ textAlign: "center" }}
                                size="large"
                                src={elem.profile_pic}
                              />
                            </div>
                            <div style={{ textAlign: "center" }}>
                              {`${elem.name.slice(0, 6)}...`}
                            </div>
                          </Tooltip>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className='P-BG center-text pad'>
                  None selected!
                </div>
                )}
                <div className='half-pad' />
                <Typography.Text strong>Employee list</Typography.Text>
                <div
                className="P-BG"
                  style={{
                    height: "300px",
                    overflow: "auto",
                    padding: "0.5rem"
                  }}
                >
                  {/* {this.state.non_admin.map(elem => { */}
                    {this.state.subordinates.map(elem => {
                    return (
                      <div
                        className="flex_r P-HOVER"
                        onClick={() => {
                          this.setState({
                            subordinates_local: [
                              ...this.state.subordinates_local.filter(item => {
                                return item.emp_id !== elem.emp_id;
                              }),
                              ...this.state.boss
                            ],
                            // boss: [elem.emp_details]
                            boss: [elem]
                          });
                        }}
                      >
                        <div className="FIX_space">
                          <Avatar
                            src={elem.profile_pic}
                          />
                        </div>
                        <div className="FIX_space">
                          <Typography.Text strong>
                            {elem.name}
                            {/* {elem.emp_details ? elem.emp_details.name : []} */}
                          </Typography.Text>
                          <div>
                            <Typography.Text>
                              {/* {elem.emp_details
                                ? elem.emp_details.designation
                                : []} */}
                                {elem.designation}
                            </Typography.Text>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Col>
            )}
          </Row>
          <Row className='side-pad'>
          <Button
            disabled={this.state.boss.length < 1 || this.state.kamla.length < 1}
            onClick={this.state.update ? this.updateRole : this.addRole}
            type="primary"
            size='large'
            block
          >
            {this.state.update ? 'Update' : 'Create'}
          </Button>
          </Row>
          <div className="half-pad" />
        </Modal>
      </TableWrapper>
    );
  }
}

export default RolesCBS;
