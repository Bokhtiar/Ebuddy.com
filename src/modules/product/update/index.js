import React, { useCallback, useEffect, useState } from 'react'
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

export default function ProductEdit() {

    const [fetchData, setFetchData] = useState({});
    let searchUrl = window.location.search;
    let params = new URLSearchParams(searchUrl);
    let id = params.get("id");

    useEffect(() => {
      let data = JSON.parse(localStorage.getItem("product"));
      setFetchData(data[id]);
    }, [id]);
    
    const [title, setTitle] = useState();
    const [price, setPrice] = useState();
    const [qty, setQty] = useState();

    const handleProductSubmit = (e) => {
      e.preventDefault();
      const req = { title, price, qty };
      const data = JSON.parse(localStorage.getItem("product") || "[]");
      
      localStorage.setItem("product", JSON.stringify(data));
      window.location = "/product/product-list";
    };
  
  return (
    <div className='p-5'>
      <Form className="" onSubmit={handleProductSubmit}>
        <div className="ant-row">
          <div className="ant-col ant-col-xs ant-col-xl-12 px-3">
            <Form.Item label={"Product Title"}>
              <Input
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Product title"
                type="text"
                value={fetchData.title}
              />
            </Form.Item>
          </div>

          <div className="ant-col ant-col-xl ant-col-xl-12 px-3">
            <Form.Item label={"Product price"}>
              <Input
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Product price"
                type="number"
                value={fetchData.price}
              />
            </Form.Item>
          </div>

          <div className="ant-col ant-col-xl ant-col-xl-24 px-3">
            <Form.Item label={"Product stock quantity"}>
              <Input
                onChange={(e) => setQty(e.target.value)}
                placeholder="Product stock quantity"
                type="number"
                value={fetchData.qty}
              />
            </Form.Item>
          </div>

          <div className="ant-col ant-col-xl ant-col-xl-12 px-3">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update product
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
}
