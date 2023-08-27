import * as actionTypes from './actionTypes';

export const page_status = (data) => {
    return {
      type: actionTypes.PAGE_STATUS,
      page_status: data
    }
}