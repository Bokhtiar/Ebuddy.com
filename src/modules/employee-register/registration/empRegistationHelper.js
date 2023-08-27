import { async } from "react-shimmer";
import {
    BANK_LIST,
    COMPANY_LIST,
    BANK_BRANCH_LIST,
    DEPARTMENT_LIST_ALL,
    DESIGNATION_LIST_ALL,
    BUSINESS_TYPE_LIST,
    PAYROLL_TYPE_LIST,
    DESIGNTION_GROUP_LIST,
    UNITS_LIST,
    JOB_TITLE_LIST,
    GRADE_LIST,
    SECTION_LIST,
    FLOOR_LIST,
    LINE_LIST,
    BLOCK_LIST,
    SKILL_TYPE_LIST,
    EDUCATION_LIST,
    EMPLOYEE_TYPE_LIST,
    FESTIVAL_BONUS_LIST,
    HOLIDAY_LIST,
    LANGUAGE_LIST,
    LEGAL_STATUS_LIST,
    PAYMENT_TERMS_LIST,
    RELIGION_LIST,
    ROSTER_TYPE_LIST,
    SALARY_BASE_LIST,
    DAYS_LIST,
    SHIFT_TYPE_LIST,
    SKILL_MATRIC_LIST,
    SPECIALIST_LIST,
    STAFF_CATEGORY_LIST,
    WORK_STATION_LIST,
    ZONE_LIST,
    COURSE_LIST,
    AGREEMENT_TYPE_LIST,
    USER_LIST,
    LEAVE_PACKAGE_LIST,
    LEAVE_PACKAGE_DROPDOWN_LIST,
    DISTRICTS_LIST
} from "../../../scripts/api"
import { getData } from "../../../scripts/api-service"

export const getBankList = () => {
    return getData(BANK_LIST);
}

export const getBankBranchList = () => {
    return getData(BANK_BRANCH_LIST);
}

export const getCompanyList = () => {
    return getData(COMPANY_LIST);
}

export const getDepartmentList = () => {
    return getData(DEPARTMENT_LIST_ALL);
}

export const getDesignationList = () => {
    return getData(DESIGNATION_LIST_ALL);
}

export const getBusinessTypeList = () => {
    return getData(BUSINESS_TYPE_LIST);
}

export const getPayrollTypeList = () => {
    return getData(PAYROLL_TYPE_LIST);
}

export const getDesignationGroupList = () => {
    return getData(DESIGNTION_GROUP_LIST);
}

export const getUnitsList = () => {
    return getData(UNITS_LIST);
}

export const getJobTitleList = () => {
    return getData(JOB_TITLE_LIST);
}

export const getGradeList = () => {
    return getData(GRADE_LIST);
}

export const getSectionList = () => {
    return getData(SECTION_LIST);
}

export const getFloorList = () => {
    return getData(FLOOR_LIST);
}

export const getLineList = () => {
    return getData(LINE_LIST);
}

export const getBlockList = () => {
    return getData(BLOCK_LIST);
}

export const getSkillTypeList = () => {
    return getData(SKILL_TYPE_LIST);
}

export const getEducationList = () => {
    return getData(EDUCATION_LIST);
}

export const getEmployeeTypeList = () => {
    return getData(EMPLOYEE_TYPE_LIST);
}

export const getFestivalBonusTypeList = () => {
    return getData(FESTIVAL_BONUS_LIST);
}

export const getHolidayList = () => {
    return getData(HOLIDAY_LIST);
}

export const getLanguageList = () => {
    return getData(LANGUAGE_LIST);
}

export const getLegalStatusList = () => {
    return getData(LEGAL_STATUS_LIST);
}

export const getPaymentTermsList = () => {
    return getData(PAYMENT_TERMS_LIST);
}

export const getReligionList = () => {
    return getData(RELIGION_LIST);
}

export const getRosterTypeList = () => {
    return getData(ROSTER_TYPE_LIST);
}

export const getSalaryBaseList = () => {
    return getData(SALARY_BASE_LIST);
}

export const getDaysList = () => {
    return getData(DAYS_LIST);
}

export const getShiftTypeList = () => {
    return getData(SHIFT_TYPE_LIST);
}

export const getSkillMatricList = () => {
    return getData(SKILL_MATRIC_LIST);
}

export const getSpecialistList = () => {
    return getData(SPECIALIST_LIST);
}

export const getStaffCategoryList = () => {
    return getData(STAFF_CATEGORY_LIST);
}

export const getWorkStationList = () => {
    return getData(WORK_STATION_LIST);
}

export const getZoneList = () => {
    return getData(ZONE_LIST);
}

export const getCourseList = () => {
    return getData(COURSE_LIST);
}

export const getAgreementTypeList = () => {
    return getData(AGREEMENT_TYPE_LIST);
}

export const getEmployeelist = () => {
    return getData(USER_LIST);
}

export const getLeavePackageList = () => {
    return getData(LEAVE_PACKAGE_DROPDOWN_LIST);
}

export const getLeavePackage = () => {
    return getData(LEAVE_PACKAGE_LIST);
}

export const getDistrictList = () => {
    return getData(DISTRICTS_LIST);
}

export const commonRemoveItems = (addItems, removeItems) => {
    return ["created_by", "department", "unit", "designation", "job_title", "nominee_image", "nominee_signature", "image", 'signature'];
}

export const dropdownItemsRequests = async () => {
    return await Promise.all([
        getBankList(),
        getBankBranchList(),
        getCompanyList(),
        getDepartmentList(),
        getDesignationList(),
        getBusinessTypeList(),
        getPayrollTypeList(),
        getDesignationGroupList(),
        getUnitsList(),
        getJobTitleList(),
        getGradeList(),
        getSectionList(),
        getFloorList(),
        getLineList(),
        getBlockList(),
        getSkillTypeList(),
        getEducationList(),
        getEmployeeTypeList(),
        getFestivalBonusTypeList(),
        getHolidayList(),
        getLanguageList(),
        getLegalStatusList(),
        getPaymentTermsList(),
        getReligionList(),
        getRosterTypeList(),
        getSalaryBaseList(),
        getDaysList(), //not 
        getShiftTypeList(),
        getSkillMatricList(),
        getSpecialistList(),
        getStaffCategoryList(),
        getWorkStationList(),
        getZoneList(),
        getCourseList(),
        getAgreementTypeList(),
        getEmployeelist(),
        getLeavePackageList(),
        getDistrictList(),
        getLeavePackage()
    ])
        .then(function (results) {
            if (results?.length) {
                let contents = {}

                results.forEach((result, index) => {
                    let masterData = result?.data?.data;
                    if (index === 0) contents.bank = masterData;
                    if (index === 1) contents.bankBranch = masterData;
                    if (index === 2) contents.company = masterData;
                    if (index === 3) contents.department = masterData;
                    if (index === 4) contents.designation = masterData;
                    if (index === 5) contents.businessType = masterData;
                    if (index === 6) contents.payrollType = masterData;
                    if (index === 7) contents.designationGroup = masterData;
                    if (index === 8) contents.units = masterData;
                    if (index === 9) contents.jobTitle = masterData;
                    if (index === 10) contents.grade = masterData;
                    if (index === 11) contents.section = masterData;
                    if (index === 12) contents.floor = masterData;
                    if (index === 13) contents.line = masterData;
                    if (index === 14) contents.block = masterData;
                    if (index === 15) contents.skillType = masterData;
                    if (index === 16) contents.education = masterData;
                    if (index === 17) contents.employeeType = masterData;
                    if (index === 18) contents.festivalBonus = masterData;
                    if (index === 19) contents.holiday = masterData;
                    if (index === 20) contents.language = masterData;
                    if (index === 21) contents.legalStatus = masterData;
                    if (index === 22) contents.paymentTerms = masterData;
                    if (index === 23) contents.religion = masterData;
                    if (index === 24) contents.rosterType = masterData;
                    if (index === 25) contents.salaryBase = masterData;
                    if (index === 26) contents.days = masterData;
                    if (index === 27) contents.shiftType = masterData;
                    if (index === 28) contents.skillMatric = masterData;
                    if (index === 29) contents.specialist = masterData;
                    if (index === 30) contents.staffCategory = masterData;
                    if (index === 31) contents.workStation = masterData;
                    if (index === 32) contents.zone = masterData;
                    if (index === 33) contents.course = masterData;
                    if (index === 34) contents.agreementType = masterData;
                    if (index === 35) contents.employee = masterData;
                    if (index === 36) contents.leavePackage = masterData;
                    if (index === 37) contents.district = masterData;
                    if (index === 38) contents.leavePackageAllList = masterData;
                });
            
                return contents;
            }
        });
}