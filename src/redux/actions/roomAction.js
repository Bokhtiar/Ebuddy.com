import * as actionTypes from './actionTypes';

export const room_id = (data) => {
    return {
      type: actionTypes.ROOM_ID,
      room_id: data
    }
}