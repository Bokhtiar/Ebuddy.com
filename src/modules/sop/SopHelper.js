import { DEPARTMENT_LIST_ALL, PIS_COMPANY_LIST_All, DESIGNATION_DROPDOWN_LIST, TASK_SOP_FUNCTION_LIST, TASK_SOP_FUNCTION_TYPE_LIST, TEAMS_LIST_ALL } from "../../scripts/api";
import { getData } from "../../scripts/api-service";

export const getPISDepartmentList = () => {
    return getData(DEPARTMENT_LIST_ALL)
}

export const getDesignation = () => {
    return getData(DESIGNATION_DROPDOWN_LIST)
}

export const getFunctionType = () => {
    return getData(TASK_SOP_FUNCTION_LIST)
}

export const getFunctionTypeList = () => {
    return getData(TASK_SOP_FUNCTION_TYPE_LIST);
} 

export const getCompanyList = () => {
    return getData(PIS_COMPANY_LIST_All);
}

export const dropdownItemsRequest = async () => {
    return await Promise.all([
        getPISDepartmentList(),
        getDesignation(),
        getFunctionType(),
        getFunctionTypeList(),
        getCompanyList()
    ]).then(function (results) {
        let contents = {}

        results.forEach((result, index) => {
            let masterData = result?.data?.data;

            if (index === 0) contents.PISDepartment = masterData;
            if (index === 1) contents.designation = masterData;
            if (index === 2) contents.function = masterData;
            if (index === 3) contents.functionType = masterData;
            if (index === 4) contents.company = masterData;
            // if (index === 5) contents.PISDepartment = masterData;
        });

        return contents;
    });
}

export const findCompanyName = (companyId, company) => {
    if (company?.length && companyId) {
        let data = company.find(com => com.id === companyId);
        return data?.name || '';
    }
}

export const findDepartment = (id, items) => {
    if (items?.length && id) {
        let data = items.find(item => item.id === id);
        return data?.name;
    }
}


export const findDesignation = (id, items) => {
    if (items?.length && id) {
        let data = items.find(item => item.id === id);
        return data?.name;
    }
}

export const findFunction = (id, items) => {
    if (items?.length && id) {
        let data = items.find(item => item.id === id);
        return data?.name;
    }
}

export const findFunctionType = (id, items) => {
    if (items?.length && id) {
        let data = items.find(item => item.id === id);
        return data?.name;
    }
}