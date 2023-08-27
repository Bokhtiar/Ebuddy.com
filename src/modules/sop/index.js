import React, { Component } from 'react'
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Panel from "./Panel";
import Sidebar from "../commons/Sidebar";
import { SOP } from "../../scripts/routes";
import {getPermissions} from "../../scripts/helper";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

class SOPMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newSOP: {}
        };
    }

    // componentDidMount() {
    //     // console.log('permissions',getPermissions() )
    //     getPermissions()
    //     .then(response => {
    //         if (response && response.length) {
    //             const permNames = response.map((item) => item.name);

    //             sop.items.forEach(item => {
    //                 if (item.name === 'Employee List' && !permNames.includes('View KAM list')) {
    //                     item.notVisible = true
    //                 }

    //                 if (item.name === 'Projects List' && !permNames.includes('View project list by KAM')) {
    //                     item.notVisible = true
    //                 }

    //                 if (item.name === 'Task Review' && !permNames.includes('Can view activity review list')) {
    //                     item.notVisible = true
    //                 }

    //                 if (item.name === 'Milestone Review' && !permNames.includes('Can view milestone review list')) {
    //                     item.notVisible = true
    //                 }

    //                 if (item.name === 'Milestone Calendar' && !permNames.includes('Can view milestone calender')) {
    //                     item.notVisible = true
    //                 }
    //             });

    //             this.setState({newSOP: sop})
    //         }
    //     })
    // }

    componentDidMount() {
        getPermissions().then(response => {
            if (response && response.length) {
                const permNames = response.map((item) => item.name);
    
                SOP.items.forEach(item => {
                  if (item.accordion) {
                    item.accordion.forEach(acc => {
                      if (acc.name === 'SOP Setup' && !permNames.includes('Can config SOP')) {
                        acc.notVisible = true
                      }  
                      else if (acc.name === 'Function Type' && !permNames.includes('Can config SOP function type')) {
                        acc.notVisible = true
                      }  
                      else if (acc.name === 'Function Name' && !permNames.includes('Can config SOP-functions')) {
                        acc.notVisible = true
                      }
                      else if (((acc.name === 'Activity List') || (acc.name === 'Activity Linkup')) && !permNames.includes('Can config SOP-activity')) {
                        acc.notVisible = true
                      }
                      else if (acc.name === 'Upload' && !permNames.includes('Can upload bulk SOP-activity')) {
                        acc.notVisible = true
                      }
                      else if (((acc.name === 'List') || (acc.name === 'Initiate')) && !permNames.includes('Can initiate SOP')) {
                        acc.notVisible = true
                      }
                    });
    
                    // Not visible page added in case of the first element of a sidebar does not have any permission.
                    let finds = item.accordion.filter(it => it.notVisible === true);
                    if (item.accordion?.length === finds?.length) item.notVisible = true;
                  }
    
                  //Full sidebar hide
                //   if (item.name === 'Employee Configuration' && !permNames.includes('Can Manage Employee Register')) {
                //     item.notVisible = true
                //   }
                });
                this.setState({newSOP: SOP})
            }
        })
      }
    

    render() {
        return (
            <Wrapper className="flex_r">
                {/* <Sidebar sidebar={SOP} /> */}
                <Sidebar sidebar={this.state.newSOP} />
                <div style={{ width: "100%", overflow: "hidden" }}>
                    <Route path="/sop" component={Panel} exact />
                    <Route path="/sop/:name" component={Panel} exact />
                    <Route path="/sop/:name/:id" component={Panel} exact />
                </div>
            </Wrapper>
        )
    }
}

export default connect()(SOPMenu);
