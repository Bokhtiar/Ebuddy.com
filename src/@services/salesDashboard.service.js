import { NON_BUDGETE_ACHIEVEMENT } from "../scripts/api"
import { getData } from "../scripts/api-service"
import {QueryParamsKey} from '../../src/@statics/index';

export const fetchNonBudgeAchievements = async (input)=> {
    // console.log(input);
    try {
        const url = input.length ? `${NON_BUDGETE_ACHIEVEMENT}${input}` : `${NON_BUDGETE_ACHIEVEMENT}`;
        const data = await getData(url);
        return data;
    } catch (error) {
        throw new Error(error);
    }
    
}