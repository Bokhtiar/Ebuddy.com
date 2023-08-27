import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import MyCbs from "./MyCbs";
import MyBills from "./cbs-new/myBills/index";
import ApproveBillsDept from "./cbs-new/approvedBills/index";
import ApproveBillsAccounce from "./cbs-new/approvedBillsAccounce/index";
import CBSCreate from "./cbs-new/myBills/createCBS";
import CBSPayments from "./cbs-new/payments";
import AddNew from "./AddNew";
import CBSDetails from "./CBSDetails"; 
import TeamCBS from "./TeamCBS";
import OrgCBS from "./OrgCBS";
import RolesCBS from "./RolesCBS";
import UserCBS from "./UserCBS";
import BillProc from "./BillProc";
import TeamDetails from "./TeamDetails";
import ExpandTable from "./ExpandTable";
import {getPermissions} from '../../scripts/helper';
import { error404 } from "../../scripts/error";
import { EmptyPage }  from "../commons/EmptyPage";
import { ErrorPage } from "../commons/ErrorPage";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;
const components = {
  // "my-cbs": MyCbs,
  // "add-new": AddNew,
  // "details": CBSDetails,
  // "expand" : ExpandTable,
  // "team-details": TeamDetails,
  // "team-cbs": TeamCBS,
  // "organizational-cbs": OrgCBS,
  // "cbs-roles": RolesCBS,
  // "user-cbs": UserCBS,
  // "bill-process": BillProc,
  "my-bills": MyBills,
  "approve-bills-dept": ApproveBillsDept,
  "approve-bills-accounce": ApproveBillsAccounce,
  "create-new-cbs": CBSCreate,
  "cbs-payments": CBSPayments,
  "not-found": ErrorPage
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
        const permNames = permissions.map((item) => item.name);
        if (!permNames.includes('Can approve cbs(Dept)')) {
            components['approve-bills-dept'] = ErrorPage;
        }
        if (!permNames.includes('Can approve cbs(Finance)')) {
            components['approve-bills-accounce'] = ErrorPage;
        }
        // if (!permNames.includes('View project list by KAM')) {
        //     components['projects-list'] = ErrorPage;
        // }
        // if (!permNames.includes('Can view activity review list')) {
        //     components['task-review'] = ErrorPage;
        // }
        // if (!permNames.includes('Can view milestone review list')) {
        //     components['milestone-review'] = ErrorPage;
        // }
        // if (!permNames.includes('Can view milestone calender')) {
        //     components['milestone-calendar'] = ErrorPage;
        // }
        // if (!permNames.includes('Can view milestone calender')) {
        //     components['excel-report'] = ErrorPage;
        // }
        // if (!permNames.includes('Can view milestone calender')) {
        //     components['quarter-target-list'] = ErrorPage;
        // }
        // if (!permNames.includes('Can view milestone calender')) {
        //     components['target-view'] = ErrorPage;
        // }
        // if (!permNames.includes('Can view milestone calender')) {
        //     components['target-vs-achievement'] = ErrorPage;
        // }
    }
  }


  // Main method
  render() {
    const Tag = this.props.match.params.name in components
        ? components[this.props.match.params.name]
        : !this.props.match.params.name || this.props.match.params.name === "/"
        ? components["my-bills"]
        : components["not-found"];
    return (
      <Wrapper>
        <Tag params={this.props.match.params} />
      </Wrapper>
    );
  }
}

export default connect()(Panel);
