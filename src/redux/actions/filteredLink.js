import * as actionTypes from './actionTypes';

export const filteredLink = (data) => {
    return {
      type: actionTypes.FILTERED_LINK,
      filteredLink: data
    }
}