import * as actionTypes from '../actions/actionTypes';

export default (state = {}, action) => {
    switch (action.type){
      case actionTypes.ADDRESS:
        return {
            ...state,
            address : action.address
        }
      case actionTypes.ADDRESS_HELP:
        return {
          ...state,
          addressHelp : action.addressHelp
        }
      default:
        return state

    }
}