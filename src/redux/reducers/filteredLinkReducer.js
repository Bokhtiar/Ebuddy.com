import * as actionTypes from '../actions/actionTypes';

export default (state = {}, action) => {
    switch (action.type){

      case actionTypes.FILTERED_LINK:
        return {
            ...state,
            filteredLink : action.filteredLink
        }

      default:
        return state

    }
}