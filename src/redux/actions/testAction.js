import * as actionTypes from './actionTypes';

export const test = (data) => {
    return {
      type: actionTypes.TEST,
      test: data
    }
}