import React, { Component, Fragment } from "react";
import { Form, Input, Button, Modal, Select } from "antd";
import { getData } from "../../scripts/getData";
import { postData } from "../../scripts/postData";
import { alertPop } from "../../scripts/message";
import { checkRes, errorHandle } from "../../scripts/error";
import LocationSearchInput from "./Gmap";
import { connect } from "react-redux";
import { validatePhone, validateEmail } from "../../scripts/validate";

class Company_ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      company_options: [],
      branch_options: [],
      person_options: [],
      modal: false
    };
  }

  async componentWillMount() {
    this.companyList();
  }

  companyList = async () => {
    let res = await getData("accounts/v1/company");
    if (res.data.data) {
      this.setState(
        {
          companies: res.data.data.map(elem => {
            return {
              name: elem.name,
              id: elem.id
            };
          })
        },
        () => {
          this.setState({
            company_options: this.state.companies
          });
        }
      );
    }
  };

  searchCompany = value => {
    this.setState({
      company_options: this.state.companies.filter(elem => {
        return elem.name.toLowerCase().includes(value.toLowerCase());
      })
    });
  };

  branchList = async id => {
    let res = await getData(`accounts/v1/company/branch?id=${id}`);
    if (res.data.data) {
      this.setState({
        branches: res.data.data,
        branch_options: res.data.data
      });
    }
  };

  searchBranch = value => {
    this.setState({
      branch_options: this.state.branches.filter(elem => {
        return elem.name.toLowerCase().includes(value.toLowerCase());
      })
    });
  };

  personList = async id => {
    let res = await getData(`accounts/v1/company/contact-person?id=${id}`);
    if (res.data.data) {
      this.setState({
        persons: res.data.data,
        person_options: res.data.data
      });
    }
  };

  searchPerson = value => {
    this.setState({
      person_options: this.state.persons.filter(elem => {
        return elem.name.toLowerCase().includes(value.toLowerCase());
      })
    });
  };

  modal = () => {
    this.setState({
      modal: !this.state.modal,
      new_company_name: null,
      new_branch_name: null,
      new_branch_email: null,
      new_branch_phone: null,
      new_person_email: null,
      new_person_name: null,
      new_person_phone: null
    });
  };

  newCompany = async () => {
    this.setState({ newCompanyLoad: true });
    if (this.state.type === "company") {
      let data = {
        category_id: 1,
        name: this.state.new_company_name,
        type_id: 1
      };
      let res = await postData("accounts/v1/company", data);
      if (res) {
        if (checkRes(res.status)) {
          this.setState({
            company_id: res.data.data.id,
            current_company: this.state.new_company_name
          });
          this.companyList();
          this.sendData();
          this.modal();
          alertPop("success", "Company added!");
        } else {
          res.map(elem => {
            alertPop("error", elem);
          });
        }
      } else {
        errorHandle(res);
      }
    } else if (this.state.type === "branch") {
      if (
        validateEmail(this.state.new_branch_email) &&
        validatePhone(this.state.new_branch_phone)
      ) {
        let data = {
          company_id: this.state.company_id,
          email: this.state.new_branch_email,
          location_address: this.props.address
            ? this.props.address.address
            : null,
          location_latlong: this.props.address
            ? `${this.props.address.latlong.lat},${this.props.address.latlong.lng}`
            : null,
          name: this.state.new_branch_name,
          phone: this.state.new_branch_phone,
          type_id: 1
        };
        let res = await postData("accounts/v1/company/branch", data);
        if (res) {
          if (checkRes(res.status)) {
            this.setState({
              branch_id: res.data.data.id,
              current_branch: this.state.new_branch_name
            });
            this.branchList();
            this.sendData();
            this.personList();
            alertPop("success", "Branch added!");
            this.modal();
          } else {
            res.map(elem => {
              alertPop("error", elem);
            });
          }
        } else {
          errorHandle(res);
        }
      } else {
        alertPop('error', 'Fill up the form accordingly!')
      }
    } else if (this.state.type === "person") {
      if (
        validateEmail(this.state.new_person_email) &&
        validatePhone(this.state.new_person_phone)
      ) {
        let data = {
          branch_id: this.state.branch_id,
          company_id: this.state.company_id,
          designation: this.state.new_person_designation,
          email: this.state.new_person_email,
          name: this.state.new_person_name,
          phone: this.state.new_person_phone,
          type_id: 1
        };
        let res = await postData("accounts/v1/company/contact-person", data);
        if (res) {
          if (checkRes(res.status)) {
            this.setState({
              person_id: res.data.data.id,
              current_person: this.state.new_person_name
            });
            this.personList();
            this.sendData();
            alertPop("success", "Person added!");
            this.modal();
          } else {
            res.map(elem => {
              alertPop("error", elem);
            });
          }
        } else {
          errorHandle(res);
        }
      } else {
        alertPop('error', 'Fill up the form accordingly!')
      }
    }
    this.setState({ newCompanyLoad: null });
  };

  sendData = () => {
    this.props.companyInfo({
      company_id: this.state.company_id,
      branch_id: this.state.branch_id,
      person_id: this.state.person_id
    });
  };

  render() {
    return (
      <Form>
        <Form.Item required label="Company name">
          <Select
            showSearch
            showArrow={true}
            placeholder="Company name"
            filterOption={false}
            value={this.state.current_company || []}
            onChange={e => {
              this.setState({
                company_id: e,
                current_branch: null,
                current_person: null,
                branch_id: null,
                person_id: null
              });
              this.branchList(e);
            }}
            onSearch={value => this.searchCompany(value)}
            className="stretch"
          >
            <Select.Option
              className="border-bottom"
              onClick={() => {
                this.setState({
                  type: "company"
                });
                this.modal();
              }}
              value={-1}
            >
              + Add new
            </Select.Option>
            {this.state.company_options.map(elem => {
              return (
                <Select.Option
                  value={elem.id}
                  onClick={() => {
                    this.setState({
                      current_company: elem.name
                    });
                  }}
                >
                  {elem.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item required label="Branch">
          <Select
            showSearch
            showArrow={true}
            placeholder="Branch name"
            value={this.state.current_branch || []}
            filterOption={false}
            onChange={e => {
              if (e > 0) {
                this.setState({
                  branch_id: e,
                  current_person: null,
                  person_id: null
                });
                this.personList(e);
              }
            }}
            onSearch={value => this.searchBranch(value)}
            className="stretch"
          >
            <Select.Option
              className="border-bottom"
              onClick={() => {
                this.setState({
                  type: "branch"
                });
                this.modal();
              }}
              value={-1}
            >
              + Add new
            </Select.Option>
            {this.state.branch_options.map(elem => {
              return (
                <Select.Option
                  value={elem.id}
                  onClick={() => {
                    this.setState({
                      current_branch: elem.name
                    });
                  }}
                >
                  {elem.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item required label="Contact person">
          <Select
            showSearch
            showArrow={true}
            placeholder="Contact person"
            value={this.state.current_person || []}
            filterOption={false}
            onChange={e => {
              if (e > 0) {
                this.setState(
                  {
                    person_id: e
                  },
                  () => {
                    this.sendData();
                  }
                );
              }
            }}
            onSearch={value => this.searchPerson(value)}
            className="stretch"
          >
            <Select.Option
              onClick={() => {
                this.setState({
                  type: "person"
                });
                this.modal();
              }}
              value={-1}
            >
              + Add new
            </Select.Option>
            {this.state.person_options.map(elem => {
              return (
                <Select.Option
                  value={elem.id}
                  onClick={() => {
                    this.setState({
                      current_person: elem.name
                    });
                  }}
                >
                  {elem.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Modal
          title={
            this.state.type === "company"
              ? "Add new company"
              : this.state.type === "branch"
              ? "Add new branch"
              : this.state.type === "person"
              ? "Add new person"
              : []
          }
          centered
          visible={this.state.modal}
          footer={null}
          onCancel={this.modal}
        >
          {this.state.type === "company" ? (
            <Fragment>
              <Form.Item required label="Company name">
                <Input
                  placeholder="Company name"
                  className="stretch"
                  value={this.state.new_company_name || []}
                  onChange={e => {
                    this.setState({
                      new_company_name: e.target.value
                    });
                  }}
                />
              </Form.Item>
            </Fragment>
          ) : this.state.type === "branch" ? (
            <Fragment>
              <Form.Item required label="Branch name">
                <Input
                  placeholder="Branch name"
                  className="stretch"
                  value={this.state.new_branch_name || []}
                  onChange={e => {
                    this.setState({
                      new_branch_name: e.target.value
                    });
                  }}
                />
              </Form.Item>
              <Form.Item required label="Location">
                <LocationSearchInput />
              </Form.Item>
              <Form.Item
                required
                label="Email"
                validateStatus={
                  this.state.new_branch_email
                    ? validateEmail(this.state.new_branch_email)
                      ? ""
                      : "error"
                    : ""
                }
                help={
                  this.state.new_branch_email
                    ? validateEmail(this.state.new_branch_email)
                      ? ""
                      : "Enter a valid email"
                    : ""
                }
              >
                <Input
                  placeholder="Email"
                  value={this.state.new_branch_email || []}
                  onChange={e => {
                    this.setState({
                      new_branch_email: e.target.value
                    });
                  }}
                />
              </Form.Item>
              <Form.Item
                required
                label="Contact number"
                validateStatus={
                  this.state.new_branch_phone
                    ? validatePhone(this.state.new_branch_phone)
                      ? ""
                      : "error"
                    : ""
                }
                help={
                  this.state.new_branch_phone
                    ? validatePhone(this.state.new_branch_phone)
                      ? ""
                      : "Enter a valid phone number"
                    : ""
                }
              >
                <Input
                  placeholder="Contact number"
                  value={this.state.new_branch_phone || []}
                  onChange={e => {
                    this.setState({
                      new_branch_phone: e.target.value
                    });
                  }}
                />
              </Form.Item>
            </Fragment>
          ) : this.state.type === "person" ? (
            <Fragment>
              <Form.Item required label="Person name">
                <Input
                  placeholder="Person name"
                  className="stretch"
                  value={this.state.new_person_name || []}
                  onChange={e => {
                    this.setState({
                      new_person_name: e.target.value
                    });
                  }}
                />
              </Form.Item>
              <Form.Item
                required
                label="Email"
                validateStatus={
                  this.state.new_person_email
                    ? validateEmail(this.state.new_person_email)
                      ? ""
                      : "error"
                    : ""
                }
                help={
                  this.state.new_person_email
                    ? validateEmail(this.state.new_person_email)
                      ? ""
                      : "Enter a valid email"
                    : ""
                }
              >
                <Input
                  placeholder="Email"
                  className="stretch"
                  value={this.state.new_person_email || []}
                  onChange={e => {
                    this.setState({
                      new_person_email: e.target.value
                    });
                  }}
                />
              </Form.Item>
              <Form.Item
                required
                label="Contact number"
                validateStatus={
                  this.state.new_person_phone
                    ? validatePhone(this.state.new_person_phone)
                      ? ""
                      : "error"
                    : ""
                }
                help={
                  this.state.new_person_phone
                    ? validatePhone(this.state.new_person_phone)
                      ? ""
                      : "Enter a valid phone number"
                    : ""
                }
              >
                <Input
                  placeholder="Contact number"
                  className="stretch"
                  value={this.state.new_person_phone || []}
                  onChange={e => {
                    this.setState({
                      new_person_phone: e.target.value
                    });
                  }}
                />
              </Form.Item>
              <Form.Item required label="Designation">
                <Input
                  placeholder="Designation"
                  className="stretch"
                  value={this.state.new_person_designation || []}
                  onChange={e => {
                    this.setState({
                      new_person_designation: e.target.value
                    });
                  }}
                />
              </Form.Item>
            </Fragment>
          ) : (
            []
          )}
          <Button
            onClick={this.newCompany}
            type="primary"
            loading={this.state.newCompanyLoad}
            block
          >
            Submit
          </Button>
        </Modal>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    address: state.address.address
  };
};

const Company = Form.create({ name: "person" })(
  connect(mapStateToProps, null)(Company_)
);

export default Company;
