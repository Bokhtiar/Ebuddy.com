import React, { Component } from "react";
import { getData } from "../../scripts/getData";
import { postData } from "../../scripts/postData";
import {
  Typography,
  Row,
  Col,
  Button,
  Skeleton,
  Empty,
  Modal,
  Avatar
} from "antd";
import { Wrapper } from "../commons/Wrapper";
import PickEmployee from "../commons/PickEmployee";
import {
  GET_ROLES_DATA,
  GET_ROLE_USERS,
  ADD_USER_TO_ROLE,
  REMOVE_USER_FROM_ROLE
} from "../../scripts/api";
// import { useSelector, useDispatch } from "react-redux";
// import { StoreResponse } from "../../redux/actions";

// const store_name = "existing_roles_data";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: [],
      res: {},
      toggleModal: false,
      allEmployees: [],
      members: [],
      temp_members: [],
      btnLoading: false,
      role: ""
    };
  }

  async componentWillMount() {
    // useDispatch(StoreResponse(GET_ROLES_DATA, store_name))
    // console.log(useSelector(state => state[store_name]))
    this.view(GET_ROLES_DATA);
  }

  view = async que => {
    let res = await getData(que);
    if (res) {
      this.setState({
        all_data: res.data.data
      });
    }
  };

  toggleModal = () => {
    this.setState({
      toggleModal: !this.state.toggleModal
    });
  };

  modal = async value => {
    let res = await getData(`${GET_ROLE_USERS}${value}`);
    this.setState({
      members: res.data.data,
      temp_members: res.data.data,
      role: value
    });
    this.toggleModal();
  };

  updateUsers = async () => {
      this.setState({ confirm_loading: true })
    let to_add = {
      users: this.state.temp_members.map(emp => {
        return emp.emp_id;
      })
    };
    let res = await postData(`${ADD_USER_TO_ROLE}${this.state.role}`, to_add);
    if (res) {
      let to_remove = {
        users: [...new Set(this.state.members.concat(this.state.temp_members))]
          .filter(elem => {
            return !this.state.temp_members
              .map(tmp => {
                return tmp.emp_id;
              })
              .includes(elem.emp_id);
          })
          .map(emp => {
            return emp.emp_id;
          })
      };
      let remove_res = await postData(
        `${REMOVE_USER_FROM_ROLE}${this.state.role}`,
        to_remove
      );
      if (remove_res) {
        this.toggleModal();
      }
    }
    this.setState({ confirm_loading : null })
  };

  pickEmployee = emp => {
    this.setState({
      temp_members: [...this.state.temp_members, emp]
    });
  };

  render() {
    const { all_data, members, role, temp_members } = this.state;
    return (
      <Wrapper>
        <Typography.Title className="pad" level={4}>
          Role users
        </Typography.Title>
        <div className="top-bod" />
        {all_data ? (
          all_data.length < 1 ? (
            <Empty />
          ) : (
            all_data.map(elem => {
              return (
                <div className="flex_r pad bottom-bod">
                  <div style={{ width: "100%" }}>
                    <Typography.Text strong>{elem.name}</Typography.Text>
                    {/* <div className="flex_r"> */}
                    <Row gutter>
                      {elem.permissions.map((perm, index) => {
                        return (
                          <Typography.Text>
                            {perm.name}
                            {index !== elem.permissions.length - 1 ? `, ` : ""}
                          </Typography.Text>
                        );
                      })}
                    </Row>
                    {/* </div> */}
                  </div>
                  <Button
                    onClick={_ => this.modal(elem.name)}
                    type="primary"
                    shape="round"
                  >
                    Add/Remove
                  </Button>
                </div>
              );
            })
          )
        ) : (
          <Skeleton active className="pad" />
        )}
        <Modal
          title={role}
          style={{ minWidth: "700px" }}
          centered
          footer={false}
          visible={this.state.toggleModal}
          onCancel={this.toggleModal}
        >
          <Row gutter={6}>
            <Col span={12}>
              <PickEmployee
                method={this.pickEmployee}
                current_members={temp_members}
              />
            </Col>
            <Col span={12}>
              <Typography.Text strong>Current {role}</Typography.Text>
              <div className="half-pad" />
              <div className="subordinates-container">
                {temp_members && temp_members.length > 0 ? 
                temp_members.map(elem => {
                  return (
                    <div className="flex_r half-pad emp-container">
                      <div>
                        <Avatar src={elem.profile_pic} />
                      </div>
                      <div style={{ width: "100%" }} className="left-pad">
                        <Typography.Text strong>{elem.name}</Typography.Text>
                        <div>
                          <Typography.Text>{elem.designation}</Typography.Text>
                        </div>
                      </div>
                      <div>
                        <Button
                          onClick={() => {
                            this.setState({
                              temp_members: temp_members.filter(tmp => {
                                return tmp.emp_id !== elem.emp_id;
                              })
                            });
                          }}
                          size="small"
                          type="danger"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  );
                }) : <Empty className="big-space" />}
              </div>
            </Col>
          </Row>
          <div className="half-pad" />
          <Button loading={this.state.confirm_loading} onClick={this.updateUsers} block type="primary" size="large">
            Confirm
          </Button>
        </Modal>
      </Wrapper>
    );
  }
}

export default Users;
