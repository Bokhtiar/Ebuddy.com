import * as actionTypes from '../actions/actionTypes';

const initialState = {
    notificationData: {},
};

export default (state = initialState, action) => {
    switch (action.type){
      case actionTypes.FETCH_NOTIFICATION:
        return Object.assign({}, state , action.payload); 
      default:
    }
    return state
}