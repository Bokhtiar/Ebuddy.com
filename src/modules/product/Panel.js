 import React, { Component } from "react";
 import styled from "styled-components";
 import { ErrorPage } from "../commons/ErrorPage";
import ProductList from "./ListProduct";
import ProductCreate from "./create";
import ProductEdit from "./update";



 const Wrapper = styled.div`
   height: 100%;
   width: calc(100% - 4rem);
 `;

 const components = {
   "product-list": ProductList,
   "product-create": ProductCreate,
   "product-edit": ProductEdit,

   //misc.
   "not-found": ErrorPage,
 };

 class Panel extends Component {
   render() {
     const Tag =
       this.props.match.params.name in components
         ? components[this.props.match.params.name]
         : !this.props.match.params.name || this.props.match.params.name === "/"
         ? components["attendance"]
         : components["not-found"];

     return (
       <Wrapper>
         <Tag params={this.props.match.params} />
       </Wrapper>
     );
   }
 }

 export default Panel;
