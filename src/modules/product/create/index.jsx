import React, { useState } from "react";
import "../style.css";
import {
  Form,
  Radio,
  Select,
  Typography,
  Row,
  Col,
  Button,
  DatePicker,
  Skeleton,
  Input,
  TimePicker,
  Checkbox,
} from "antd";
import { Wrapper } from "../../commons/Wrapper";

export default function ProductCreate() {
  
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");

  const handleProductSubmit = (e) => {
    e.preventDefault();
    const req = { title, price, qty };
    const data = JSON.parse(localStorage.getItem("product") || "[]");
    data.push(req)
    localStorage.setItem('product', JSON.stringify(data))
    window.location = "/product/product-list";
  };

  return (
    <Wrapper>
      <section className="p-5">
        <h3 className="product-title">Product create</h3>
        <div className="form">
          <Form className="" onSubmit={handleProductSubmit}>
            <div className="ant-row">
              <div className="ant-col ant-col-xs ant-col-xl-12 px-3">
                <Form.Item label={"Product Title"}>
                  <Input
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Product title"
                    type="text"
                  />
                </Form.Item>
              </div>

              <div className="ant-col ant-col-xl ant-col-xl-12 px-3">
                <Form.Item label={"Product price"}>
                  <Input
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Product price"
                    type="number"
                  />
                </Form.Item>
              </div>

              <div className="ant-col ant-col-xl ant-col-xl-24 px-3">
                <Form.Item label={"Product stock quantity"}>
                  <Input
                    onChange={(e) => setQty(e.target.value)}
                    placeholder="Product stock quantity"
                    type="number"
                  />
                </Form.Item>
              </div>

              <div className="ant-col ant-col-xl ant-col-xl-12 px-3">
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Create product
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </section>
    </Wrapper>
  );
}
