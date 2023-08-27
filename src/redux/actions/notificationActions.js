import * as actionTypes from './actionTypes';

export const fetchNotification = (notification) => {
    return {
        type: actionTypes.FETCH_NOTIFICATION,
        payload:{
            notificationData: notification
        }
    }
}