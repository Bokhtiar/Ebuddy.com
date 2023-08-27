import {getData} from './api-service'
import { SUBORDINATES, DEPTS } from './api';

export const getSubordinates = async () => {
    let res = await getData(SUBORDINATES);
    if (res) {
        return res.data.data
    }
}

export const getDepts = async () => {
    let res = await getData(DEPTS);
    if (res) {
        return res.data.data
    }
}