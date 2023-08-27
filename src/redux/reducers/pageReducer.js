import * as actionTypes from '../actions/actionTypes';

export default (state = {}, action) => {
    switch (action.type){

      case actionTypes.PAGE_STATUS:
        return {
            ...state,
            page_status : action.page_status
        }

      default:
        return state

    }
}