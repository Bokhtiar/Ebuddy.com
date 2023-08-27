import React, { Component } from "react";
import styled from "styled-components";
import { ErrorPage } from "../commons/ErrorPage";
import {MenuSelectErrorPage} from "../commons/MenuSelectErrorPage";
import ClientSetup from "./client/client-setup/ClientSetup";
import CompanySize from "./client/company-size/CompanySize";
import CompanyType from "./client/company-type/CompanyType";
import IndustrySector from "./client/industry-sector/IndustrySector";
import IndustryType from "./client/industry-type/IndustryType";
import LocationSetup from "./client/location-setup/LocationSetup";
import MilestoneSetup from "./milestone/milestone-setup/MilestoneSetup";
import MilestoneStatus from "./milestone/milestone-status/MilestoneStatus";
import MilestoneType from "./milestone/milestone-type/MilestoneType";
import PaymentStatus from "./milestone/payment-status/PaymentStatus";
import ServiceSetup from "./service/service-setup/ServiceSetup";
import ServiceType from "./service/service-type/ServiceType";
import ServiceBulkUpload from "./service/bulk-upload";
import ReviewSetup from "./task/review-setup/ReviewSetup";
import TaskPriority from "./task/task-priority/TaskPriority";
import TaskType from "./task/task-type/TaskType";
import FunctionType from "./function/function-type/index";
import ActivityFunction from "./function/activity-function/index";
import ClientDesignation from "./client/designation/index";
import IssueSetup from "./issue/issue-setup/index";
import LicenseSetup from "./issue/license-setup/index";
import LicenseIssuer from "./issue/license-issuer/index";
import ExternalSetup from "./issue/external-type-setup/ExternalTypeSetup";
import PACategory from "./performance-appraisal/pa-category/index";
import PASubCategory from "./performance-appraisal/pa-sub-category/index";
import PACriteria from "./performance-appraisal/pa-criteria/index";
import PASubCriteria from "./performance-appraisal/pa-sub-criteria/index";
import Scale from "./performance-appraisal/scale/index";
import PAConfigurationList from "./pa-configuration/pa-configuration-list/index";
import PAConfigurationCreate from "./pa-configuration/pa-configuration-create/index";
import PAConfigurationUpdate from "./pa-configuration/pa-configuration-update/index";
import EOMCategory from "./eom/category/index";
import EOMReason from "./eom/reason/index";
import EOMAttributes from "./eom/attributes/index";
import EOMDepartmentMapping from "./eom/department-mapping/index";
import EOMWings from "./eom/wings/index";
// import EmployeeInformation from "./personal-information-system/employee-info";
import Department from "./personal-information-system/department/index";
import Designation from "./personal-information-system/designation/index";
import Company from "./personal-information-system/company/index";
// import Gender from "./personal-information-system/gender/index";
import BusinessType from "./personal-information-system/business-type";
import PayrollType from "./personal-information-system/payroll-type";
import DesignationGroup from "./personal-information-system/designation-group";
import Units from "./personal-information-system/units";
import JobTitle from "./personal-information-system/job-title";
import Grade from "./personal-information-system/grade";
import Section from "./personal-information-system/section";
import Floor from "./personal-information-system/floor";
import Line from "./personal-information-system/line";
import Block from "./personal-information-system/block";
import SkillType from "./personal-information-system/skill-type";
import Education from "./personal-information-system/education";
import EmployeeType from "./personal-information-system/employee-type";
import FestivalBonus from "./personal-information-system/festival-bonus";
import Holiday from "./personal-information-system/holiday";
import Language from "./personal-information-system/language";
import LegalStatus from "./personal-information-system/legal-status";
import PaymentTerm from "./personal-information-system/payment-term";
import Religion from "./personal-information-system/religion";
import RosterType from "./personal-information-system/roster-type";
import SalaryBase from "./personal-information-system/salary-base";
import Days from "./personal-information-system/days";
import ShiftType from "./personal-information-system/shift-type";
import SkillMatric from "./personal-information-system/skill-matric";
import Specialist from "./personal-information-system/specialist";
import StaffCategory from "./personal-information-system/staff-category";
import WorkStation from "./personal-information-system/work-station";
import Zone from "./personal-information-system/zone";
import Course from "./personal-information-system/course";
import AgreementType from "./personal-information-system/agreement-type";
import BankSetup from "./bank-configuration/bank-setup";
import BankBranchSetup from "./bank-configuration/bank-branch-setup";
import LeavePackage from "./leave-and-attendance/leave-package/index";
import SOPList from "./sop/sop-configure/sop-list/index";
import SOPSetup from "./sop/sop-configure/sop-setup/index";
import SOPActivityList from "./sop/sop-activity/activity-list/index";
import SOPActivityCreate from "./sop/sop-activity/activity-create/index";
import ClientBulkUpload from "./client/bulk-upload/client";
import ClientPOCBulkUpload from "./client/bulk-upload/client-poc";
import Team from "./team/index";
import {getPermissions} from '../../scripts/helper';
import ProjectManagement from "./project-management/index";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const components = {
  //milestone
  "milestone-type-setup": MilestoneType,
  "milestone-setup": MilestoneSetup,
  "milestone-status-setup": MilestoneStatus,
  "milestone-payment-status-setup": PaymentStatus,
  //client-list
  "industry-type-setup": IndustryType,
  "industry-sector-setup": IndustrySector,
  "industry-location-setup": LocationSetup,
  "industry-client-company-type-setup": CompanyType,
  "industry-client-company-size-setup": CompanySize,
  "industry-client-setup": ClientSetup,
//   "client-bulk-upload": ClientBulkUpload,
//   "client-poc-bulk-upload": ClientPOCBulkUpload,
  "client-designtion-type-setup": ClientDesignation,
  //service
  "service-product-type-setup": ServiceType,
  "service-product-setup": ServiceSetup,
//   "service-product-bulk-upload": ServiceBulkUpload,
  //activity/tasks
  "task-type-setup": TaskType,
  "task-priority-setup": TaskPriority,
  "task-review-setup": ReviewSetup,
  "function-type": FunctionType,
  "function-activity": ActivityFunction,
  //issue/license
  "setup-external": ExternalSetup,
  "setup-issue": IssueSetup,
  "setup-license": LicenseSetup,
  "setup-license-issuer": LicenseIssuer,
  //pa setup
  "pa-category": PACategory,
  "pa-sub-category": PASubCategory,
  "pa-criteria": PACriteria,
  "pa-sub-criteria": PASubCriteria,
  "pa-scale-setup": Scale,
  //pa configuration
  "configuration-list": PAConfigurationList,
  "configuration-create": PAConfigurationCreate,
  "configuration-update": PAConfigurationUpdate,
  //employee of the month
  "eom-category": EOMCategory,
  "eom-reason": EOMReason,
  "eom-attributes": EOMAttributes,
  "eom-department-mapping": EOMDepartmentMapping,
  "eom-wings": EOMWings,
  //personal-information-system
//   "pis-employee-info": EmployeeInformation,
  "pis-department": Department,
  "pis-designation": Designation,
  "pis-company": Company,
//   "pis-gender": Gender,
  "pis-business-type": BusinessType,
  "pis-payroll-type": PayrollType,
  "pis-designation-group": DesignationGroup,
  "pis-units": Units,
  "pis-job-title": JobTitle,
  "pis-grade": Grade,
  "pis-section": Section,
  "pis-floor": Floor,
  "pis-line": Line,
  "pis-block": Block,
  "pis-skill-type": SkillType,
  "pis-education": Education,
  "pis-employee-type": EmployeeType,
  "pis-festival-bonus": FestivalBonus,
  "pis-festival-bonus": FestivalBonus,
  "pis-holiday": Holiday,
  "pis-language": Language,
  "pis-legal-status": LegalStatus,
  "pis-payment-term": PaymentTerm,
  "pis-religion": Religion,
  "pis-roster-type": RosterType,
  "pis-salary-base": SalaryBase,
  "pis-days": Days,
  "pis-shift-type": ShiftType,
  "pis-skill-matric": SkillMatric,
  "pis-specialist": Specialist,
  "pis-staff-category": StaffCategory,
  "pis-work-station": WorkStation,
  "pis-zone": Zone,
  "pis-course": Course,
  "pis-agreement-type": AgreementType,
  //bank
  "bank-setup": BankSetup,
  "bank-branch-setup": BankBranchSetup,
  //leave & attendance
  "leave-package": LeavePackage,
  //sop
  "sop-list": SOPList,
  "sop-setup": SOPSetup,
  "activity-list": SOPActivityList,
  "activity-create": SOPActivityCreate,
  //teams
  "team": Team,
  //project-management
  "project-management": ProjectManagement,
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
        const permNames = permissions.map((item) => item.name);
        //milestone
        if (!permNames.includes('Can manage milestone type setup')) {
            components['milestone-type-setup'] = MenuSelectErrorPage;
        }
        if (!permNames.includes('Can manage milestone setup')) {
            components['milestone-setup'] = ErrorPage;
        }
        if (!permNames.includes('Can manage milestone status setup')) {
            components['milestone-status-setup'] = ErrorPage;
        }
        if (!permNames.includes('Can manage payment status')) {
            components['milestone-payment-status-setup'] = ErrorPage;
        }
        //client-list
        if (!permNames.includes('Can manage industry type setup')) {
            components['industry-type-setup'] = ErrorPage;
        }
        if (!permNames.includes('Can manage industry sector setup')) {
            components['industry-sector-setup'] = ErrorPage;
        }
        if (!permNames.includes('Can manage location setup')) {
            components['industry-location-setup'] = ErrorPage;
        }
        if (!permNames.includes('Can manage company type setup')) {
            components['industry-client-company-type-setup'] = ErrorPage;
        }
        if (!permNames.includes('Can manage company size setup')) {
            components['industry-client-company-size-setup'] = ErrorPage;
        }
        if (!permNames.includes('Can manage client Setup')) {
            components['industry-client-setup'] = ErrorPage;
        }
        //service
        if (!permNames.includes('Can manage service type setup')) {
            components['service-product-type-setup'] = ErrorPage;
        }
        if (!permNames.includes('Can manage activity type setup')) {
            components['service-product-setup'] = ErrorPage;
        }
        //activity/tasks
        if (!permNames.includes('Can manage service setup')) {
            components['task-type-setup'] = ErrorPage;
        }
        if (!permNames.includes('Can manage activity priority setup')) {
            components['task-priority-setup'] = ErrorPage;
        }
        if (!permNames.includes('Can manage review status')) {
            components['task-review-setup'] = ErrorPage;
        }

        if (!permNames.includes('Can manage client Designation')) {
            components['client-designtion-type-setup'] = ErrorPage;
        }

        //performance appraisal
        if (!permNames.includes('Can manage performance appraisal category')) {
            components['pa-category'] = ErrorPage;
        }

        if (!permNames.includes('Can manage performance appraisal sub-category')) {
            components['pa-sub-category'] = ErrorPage;
        }

        if (!permNames.includes('Can manage performance appraisal criteria')) {
            components['pa-criteria'] = ErrorPage;
        }

        if (!permNames.includes('Can manage performance appraisal sub-criteria')) {
            components['pa-sub-criteria'] = ErrorPage;
        }

        if (!permNames.includes('Can manage performance appraisal score')) {
            components['pa-scale-setup'] = ErrorPage;
        }

        if (!permNames.includes('Can configure performance appraisal')) {
            components['configuration-list'] = ErrorPage;
        }

        if (!permNames.includes('Can configure performance appraisal')) {
            components['configuration-create'] = ErrorPage;
        }

        if (!permNames.includes('Can configure performance appraisal')) {
            components['configuration-update'] = ErrorPage;
        }
    }
  }
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
