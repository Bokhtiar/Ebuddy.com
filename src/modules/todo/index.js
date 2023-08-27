 import React, { Component } from "react";
 import { connect } from "react-redux";
 import { Route, Switch } from "react-router-dom";
 import styled from "styled-components";
 import Sidebar from "../commons/Sidebar";
 import { todo } from "../../scripts/routes";
 import { getPermissions } from "../../scripts/helper";
 import Panel from "./Panel";
 
 
 const Wrapper = styled.div`
   height: 100%;
   width: 100%;
 `;

 class TodoIndex extends Component {
   constructor(props) {
     super(props);
     this.state = {
       todo: {},
     };
   }



   render() {
     return (
       <Wrapper className="flex_r">

        
         {/* <Sidebar sidebar={SOP} /> */}
         <Sidebar sidebar={todo} />
         <div style={{ width: "100%", overflow: "hidden" }}>
           <Route path="/todo" component={Panel} exact />
           <Route path="/todo/:name" component={Panel} exact />
          
         </div>
       </Wrapper>
     );
   }
 }

 export default connect()(TodoIndex);
