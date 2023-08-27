import React, { Component } from "react";
import { Wrapper, TableWrapper } from "../commons/Wrapper";
import {
  Row,
  Col,
  Form,
  Button,
  Input,
  Radio,
  Select,
  Skeleton,
  Typography
} from "antd";
import { RECHARGE_LOG } from "../../scripts/api";
import { getData, postData } from "../../scripts/api-service";
import { alertPop } from "../../scripts/message";
import Table from "../commons/Table";
import moment from "moment";

const NOT_FOUND = "Not found";

class Topup_ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //todo
    };
  }

  componentDidMount() {
    this.view(RECHARGE_LOG);
  }

  view = async que => {
    let res = await getData(que);
    if (res) {
      this.setState(
        {
          allData: res.data.data
        },
        () => {
          this.prepareTable();
        }
      );
    }
  };

  prepareTable = () => {
    this.setState({
      table_data: {
        width_class: "width-600",
        header: [
          {
            type: "text",
            name: "Phone number",
            lg: 8
          },
          {
            type: "text",
            name: "amount",
            lg: 4
          },
          {
            type: "text",
            name: "time",
            lg: 4
          },
          {
            type: "text",
            name: "date",
            lg: 8
          }
        ],
        body: this.state.allData.map(elem => {
          return {
            data: [
              {
                type: "text",
                name: elem.number || NOT_FOUND,
                lg: 8
              },
              {
                type: "text",
                name: elem.amount ? `৳ ${elem.amount}` : NOT_FOUND,
                lg: 4
              },
              {
                type: "text",
                name: elem.created_at
                  ? moment(elem.created_at).format("LT")
                  : NOT_FOUND,
                lg: 4
              },
              {
                type: "text",
                name: elem.created_at
                  ? moment(elem.created_at).format("ll")
                  : NOT_FOUND,
                lg: 8
              }
            ]
          };
        })
      }
    });
  };

  recharge = () => {
    let data = {
      amount: this.state.amount
    };
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ btnLoading: true });
        data = {
          ...data,
          mobile_no: values.mobile_no,
          operator_id: values.operator_id,
          pincode: values.pincode,
          type: values.type,
          amount: values.amount
        };
        let res = await postData("recharge/v1/init", data);
        if (res) {
          alertPop("success", "Recharge successful!");
          this.view(RECHARGE_LOG);
          this.setState({ btnLoading: false });
        } else {
          this.setState({ btnLoading: false });
        }
      }
    });
  };

  render() {
    return (
      <Wrapper no-pad>
        <Row>
          <Col style={{ userSelect: "none" }} span={8} className="P-BG">
            <Wrapper>
              <Form className="pad">
                <Form.Item label="Enter phone number">
                  {this.props.form.getFieldDecorator("mobile_no", {
                    rules: [
                      {
                        required: true,
                        message: "Please enter a valid phone number!"
                      }
                    ]
                  })(
                    <Input
                      type="number"
                      style={{ width: "100%" }}
                      placeHolder="01X XXXX XXXX"
                    />
                  )}
                </Form.Item>
                <Form.Item label="Operator">
                  {this.props.form.getFieldDecorator("operator_id", {
                    rules: [
                      { required: true, message: "Please choose an operator!" }
                    ]
                  })(
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Select operator"
                    >
                      <Select.Option key="G" value="G">
                        Grameenphone
                      </Select.Option>
                      <Select.Option key="R" value="R">
                        Robi
                      </Select.Option>
                      <Select.Option key="B" value="B">
                        Banglalink
                      </Select.Option>
                      <Select.Option key="A" value="A">
                        Airtel
                      </Select.Option>
                      <Select.Option key="T" value="T">
                        Teletalk
                      </Select.Option>
                    </Select>
                  )}
                </Form.Item>
                <Form.Item label="Type">
                  {this.props.form.getFieldDecorator("type", {
                    rules: [
                      { required: true, message: "Please select a type!" }
                    ]
                  })(
                    <Radio.Group name="radiogroup">
                      <Radio value={"Post-Paid"}>Postpaid</Radio>
                      <Radio value={"Pre-Paid"}>Prepaid</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
                <Form.Item label="Topup amount">
                  {this.props.form.getFieldDecorator("amount", {
                    rules: [
                      { required: true, message: "Please enter an amount!" }
                    ]
                  })(<Input style={{ width: "100%" }} type="number" />)}
                </Form.Item>
                <Form.Item label="Pin code">
                  {this.props.form.getFieldDecorator("pincode", {
                    rules: [
                      { required: true, message: "Please select a type!" }
                    ]
                  })(<Input style={{ width: "100%" }} type="password" />)}
                </Form.Item>
                <Button
                  onClick={this.recharge}
                  type="primary"
                  size="large"
                  loading={this.state.btnLoading}
                  block
                >
                  Recharge
                </Button>
                <div className="half-pad" />
              </Form>
            </Wrapper>
          </Col>
          <Col span={16} className="side-bod-left">
            <Wrapper>
              <div className="half-pad" />
              <div className="side-pad">
                <Typography.Title level={4}>History</Typography.Title>
              </div>
              <TableWrapper no-pad>
                {this.state.table_data ? (
                  <Table top-bod data={this.state.table_data} />
                ) : (
                  <Skeleton active className="pad" />
                )}
              </TableWrapper>
            </Wrapper>
          </Col>
        </Row>
      </Wrapper>
    );
  }
}

const Topup = Form.create()(Topup_);
export default Topup;
