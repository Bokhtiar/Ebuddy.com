import * as actionTypes from '../actions/actionTypes';

export default (state = {}, action) => {
    switch (action.type){

      case actionTypes.TEST:
        return {
            ...state,
            test : action.test
        }

      default:
        return state

    }
}