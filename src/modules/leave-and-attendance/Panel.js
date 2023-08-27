import React, { Component } from 'react';
import styled from "styled-components";
import { ErrorPage } from "../commons/ErrorPage";
import LeaveList from './leave-deduction/leave-list';
import LeaveEntry from './leave-deduction/leave-entry';
import LeaveBulkImport from './leave-deduction/bulk-entry';
import AttendanceList from './attendance-register/attendance-list';
import AttendanceSingleEntry from './attendance-register/single-entry';
import AttendanceBulkImport from './attendance-register/bulk-import';
// import {getPermissions} from '../../scripts/helper';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const components = {
    "deduction-leave-list": LeaveList,
    "deduction-leave-entry": LeaveEntry,
    "deduction-bulk-entry": LeaveBulkImport,
    "attendance-list": AttendanceList,
    "attendance-single-entry": AttendanceSingleEntry,
    "attendance-bulk-entry": AttendanceBulkImport,
    //misc.
    "not-found": ErrorPage,
};

class Panel extends Component {
    // async componentDidMount() {
    //     console.log('components', await getPermissions());

    //     // let res = await getData(MY_PERM);
    //     // if (res) {
    //     //     let masterData = res?.data?.data;
    //     //     console.log('masterData',masterData);
    //     //     const data = masterData.filter(permission=>(
    //     //        permission.name === "Show all notifications"
    //     //     ))
    //     //     if(data.length > 0){
    //     //         return components
    //     //     }else{
    //     //         components.notification = ErrorPage;
    //     //     }
    //     // }

    //     let permissions = await getPermissions();

    //     if (permissions && permissions.length) {
    //         const permNames = permissions.map((item) => item.name);
    //         console.log('perms0',permNames)
    //         if (!permNames.includes('View KAM list')) {
    //             components['employee-list'] = ErrorPage;
    //             console.log("hello");
    //         }
    //         if (!permNames.includes('View project list by KAM')) {
    //             components['projects-list'] = ErrorPage;
    //         }
    //         if (!permNames.includes('Can view activity review list')) {
    //             components['task-review'] = ErrorPage;
    //         }
    //         if (!permNames.includes('Can view milestone review list')) {
    //             components['milestone-review'] = ErrorPage;
    //         }
    //         if (!permNames.includes('Can view milestone calender')) {
    //             components['milestone-calendar'] = ErrorPage;
    //         }
    //     }
    //     console.log('components',components)
    // }
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
