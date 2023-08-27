import * as actionTypes from '../actions/actionTypes';

export default (state = {}, action) => {
    switch (action.type){

      case actionTypes.ROOM_ID:
        return {
            ...state,
            room_id : action.room_id
        }

      default:
        return state

    }
}