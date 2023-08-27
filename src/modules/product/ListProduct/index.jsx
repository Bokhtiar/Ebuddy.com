import React from "react";
import { Wrapper } from "../../commons/Wrapper";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  DatePicker,
  Divider,
  PageHeader,
  Popover,
  Select,
  Table,
  Tooltip,
} from "antd";

export default function ListProduct() {
  // const data = [
  //   {
  //     id: "0",
  //     title: "test",
  //     price: "40",
  //     qty: "4",
  //   },
  //   {
  //     id: "2",
  //     title: "test2",
  //     price: "40",
  //     qty: "4",
  //   },
  //   {
  //     id: "3",
  //     title: "test3",
  //     price: "40",
  //     qty: "4",
  //   },
  // ];


  const data = JSON.parse(localStorage.getItem("product") || "[]");
  console.log("list",data);
  const columns = [
    {
      title: "title",
      key: "title",
      width: 100,
    },

    {
      title: "price",
      key: "price",
      width: 100,
    },

    {
      title: "qty",
      key: "qty",
      width: 100,
    },
  ];

  // product delete
  const ProductDelete = (i) => {
     let devicesArray = JSON.parse(localStorage.getItem("product"));
     devicesArray.splice(devicesArray.indexOf(i));
     localStorage.setItem("product", JSON.stringify(devicesArray));
  }

  //edit
  


  return (
    <Wrapper>
      <div className="p-5">
        <div style={{ padding: "1.5rem" }}>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Index</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>{product.qty}</td>
                    <td>
                      <Link
                        to={`/product/product-edit?id=${i}`}
                        style={{ color: "#5BB7FF", fontSize: "11px" }}
                      >
                        Edit
                      </Link>
                      <a onClick={(e) => ProductDelete(i)} href="">
                        Delete
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Wrapper>
  );
}
