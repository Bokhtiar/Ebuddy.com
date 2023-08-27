import React, { Component, Fragment } from "react";
import { Button, Form, Input } from "antd";
import { connect } from "react-redux";
import LocationSearchInput from "../meeting/Gmap";
import { postData } from "../../scripts/api-service";
import { CREATE_COMPANY } from "../../scripts/api"
import { validatePhone } from "../../scripts/validate";

class CreateCompany_ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //todo
    };
  }

  componentDidUpdate(prev) {
    if (prev.props !== this.props) {
      if (
        this.props.address &&
        this.state.address !== this.props.address.address
      ) {
        this.setState({
          address: this.props.address.address,
          latlong: this.props.address.latlong
        });
      }
    }
  }

  submit = async e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err && validatePhone(this.state.contact_number)) {
        let data = {
          company_name: values.name,
          // location_address: this.state.address,
          location_address: values.address,
          // location_latlong: `${this.state.latlong.lat}:${this.state.latlong.lng}`,
          location_latlong: '1:1',
          contact_person_name: values.contact_person,
          contact_person_phone: this.state.contact_number
        };
        let res = await postData(CREATE_COMPANY, data);
        if (res && res.data && res.data.data && res.data.data.company_branch) {
          this.props.method({
            company_name : values.name,
            company_id: res.data.data.company_id,
            person_id: res.data.data.id,
            person: res.data.data.name,
            address: res.data.data.company_branch.location_address,
            contact: res.data.data.phone
          });
          this.props.modal()
          this.props.form.resetFields()
          this.setState({
            contact_number : null,
            address : []
          })
        }
      } else {
        if (!this.state.contact_number) {
          this.setState({
            contact_number : '01',
          })
        }
      }
    });
  };

  validatePhoneNumber = (rule, value, callback) => {
    const { form } = this.props;
    if (validatePhone(value)) {
      callback();
    }
    
  };

  render() {
    return (
      <Form onSubmit={this.submit}>
        <Form.Item label="Company name">
          {this.props.form.getFieldDecorator("name", {
            rules: [{ required: true, message: "Company name is required!" }]
          })(<Input placeholder="Company name" />)}
        </Form.Item>
        <Form.Item label="Company Address">
          {this.props.form.getFieldDecorator("address", {
            rules: [{ required: true, message: "Company address is required!" }]
          })(<Input placeholder="Company address" />)}
        </Form.Item>
        {/* <Form.Item
        validateStatus={!this.props.address ? '' : (!this.state.latlong && !this.state.address) ? 'error' : ''}
        help={!this.props.address ? '' : (!this.state.latlong && !this.state.address) ? 'Company address is required!' : ''}
         required label="Company address">
          <LocationSearchInput value={this.state.address}/>
        </Form.Item> */}
        <Form.Item label="Contact person name">
          {this.props.form.getFieldDecorator("contact_person", {
            rules: [{ required: true, message: "Contact person is required!" }]
          })(<Input placeholder="Contact person name" />)}
        </Form.Item>
        <Form.Item
        required
        validateStatus ={this.state.contact_number ? validatePhone(this.state.contact_number) ? '' : 'error' : ''}
        help={this.state.contact_number ? validatePhone(this.state.contact_number) ? '' : 'Invalid phone number' : ''}
         label="Contact number">
          <Input value={this.state.contact_number || []} onChange={ e => {
            this.setState({ contact_number : e.target.value})
          }} placeholder="01XXXXXXXXX" />
        </Form.Item>
        <Button type="primary" htmlType="submit" size="large" block>
          Add company
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    address: state.address.address
  };
};

const CreateCompany = Form.create()(
  connect(mapStateToProps, null)(CreateCompany_)
);
export default CreateCompany;
