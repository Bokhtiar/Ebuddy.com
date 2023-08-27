import React, { Component } from 'react';
import styled from "styled-components";
import { ErrorPage } from "../commons/ErrorPage";
import QuarterTargetList from './Quarter-Target-List';
import QuarterDetails from './target-view';
import TargetVsAchievement from './Target-Vs-Achievement/target-vs-achievement';
import {getPermissions} from '../../scripts/helper';


const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const components = {
    "quarter-target-list": QuarterTargetList,
    "target-view": QuarterDetails,
    "target-vs-achievement": TargetVsAchievement,
    //misc.
    "not-found": ErrorPage,
};

class Panel extends Component {
    async componentDidMount() {
        // let res = await getData(MY_PERM);
        // if (res) {
        //     let masterData = res?.data?.data;
        //     console.log('masterData',masterData);
        //     const data = masterData.filter(permission=>(
        //        permission.name === "Show all notifications"
        //     ))
        //     if(data.length > 0){
        //         return components
        //     }else{
        //         components.notification = ErrorPage;
        //     }
        // }

        let permissions = await getPermissions();

        if (permissions && permissions.length) {
            // const permNames = permissions.map((item) => item.name);
            // console.log('perms0',permNames)
            // if (!permNames.includes('View project')) {
            //     components['project-list'] = ErrorPage;
            // }
            // if (!permNames.includes('View project milestone')) {
            //     components['project-roadmap-setup'] = ErrorPage;
            // }
        }
        // console.log('components',components)
    }
    render() {
        const Tag = this.props.match.params.name in components
        ? components[this.props.match.params.name]
        : !this.props.match.params.name || this.props.match.params.name === "/"
        ? components["attendance"]
        : components["not-found"];


        return (
            <Wrapper>
                <Tag params={this.props.match.params} />
            </Wrapper>
        )
    }
}

export default Panel; 
