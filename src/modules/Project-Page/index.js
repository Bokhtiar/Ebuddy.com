import React, { Component, Fragment} from 'react';
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Panel from "./Panel";
import Sidebar from "../commons/Sidebar";
import { projectPage } from "../../scripts/routes";
import { error404 } from "../../scripts/error";
import {getPermissions} from "../../scripts/helper";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newProjectPage: {}
        };
    }
    
    componentDidMount() {
        // console.log('permissions',getPermissions() )
        // getPermissions()
        // .then(response => {
        //     const projectListData = response.filter(permission=>(
        //         permission.name === "View project"
        //     ))
        //     const projectRoadmapData = response.filter(permission=>(
        //         permission.name === "View project milestone"
        //     ))
            
        //     this.setPermission(projectListData,projectPage,'Project List');
        //     this.setPermission(projectRoadmapData,projectPage,'Project Roadmap Setup');
           
        // })

        // getPermissions().then(response => {
        //     if (response && response.length) {
        //         const permNames = response.map((item) => item.name);

        //         projectPage.items.forEach(item => {
        //             if (item.name === 'Project List' && !permNames.includes('View project')) {
        //                 item.notVisible = true
        //             }

        //             if (item.name === 'Project Roadmap Setup' && !permNames.includes('View project milestone')) {
        //                 item.notVisible = true
        //             }
        //         });
                
        //         this.setState({newProjectPage: projectPage})
        //     }
        // })

        this.setState({newProjectPage: projectPage})
    }

    //data : state variable
    //panel: projectPage from scripts/routes path
    //sidebarName : page sidebar names to remove
    setPermission = (data,panel,sidebarName) =>{
        if(data.length > 0){
            return this.setState({newProjectPage: panel})
        }else{
            let newProjectPage = panel;
            let findItemIndex = newProjectPage.items.findIndex(item => item.name === sidebarName);
            findItemIndex !== -1 && newProjectPage.items.splice(findItemIndex, 1)
            return this.setState({newProjectPage})
        }
    }

    render() {
        return (
            <Wrapper  className="flex_r">
                <Sidebar sidebar={this.state.newProjectPage} />
                <div style={{ width: "100%", 
                width: "100%",
                maxHeight: 'calc(100vh - 3rem)',
                overflowY: 'scroll'
            }}>
                    <Route path="/project-page" component={Panel} exact />
                    <Route path="/project-page/:name" component={Panel} exact />
                </div>
            </Wrapper>
        )
    }
}

export default connect()(Project);
