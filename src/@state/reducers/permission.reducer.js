/** @format */

import { createActions, createReducer } from "reduxsauce";
import { FetchStatus, Status } from "../../@statics/Status";
// import Logger from "../../Logger";
import { ActionType } from "../../@types";
import { Message } from "../../@statics/Message";
// import TaskActivityPermission from "../../@acl/TaskActivityPermission";

const { Types, Creators } = createActions(
  {
    getPermissions: ["input"],
    getPermissionsSuccess: ["data"],
    getPermissionsFailure: ["error"],

    getTaskActivityPermission: ["input"],
    getTaskActivityPermissionSuccess: ["data"],
    getTaskActivityPermissionFailure: ["error"],
  },
  { prefix: "@Permissions/" },
);

export { Types, Creators };

const initialState = {
  error: Status.INITIAL,
  message: Status.INITIAL,
  isFetching: FetchStatus.INITIAL,
  permissions: Status.INITIAL,
  taskActivityPermission: Status.INITIAL,
};

export default createReducer(initialState, {
  [Types.GET_PERMISSIONS]: (state, action) => {
    // console.log(action);
    return {
      ...state,
      message: Status.INITIAL,
      isFetching: FetchStatus.START,
      permissions: Status.RESET,
    };
  },

  [Types.GET_PERMISSIONS_SUCCESS]: (state, action) => {
    // console.log(action);
    const { data } = action;
    const message = new Message();
    return {
      ...state,
      error: Status.EMPTY,
      isFetching: FetchStatus.SUCCESS,
      permissions: data,
      message: {
        action: ActionType.PERMISSIONS,
        status: Status.SUCCESS,
        data: message[ActionType.PERMISSIONS[Status.SUCCESS]],
      },
    };
  },

  [Types.GET_PERMISSIONS_FAILURE]: (state, action) => {
    const message = new Message();
    return {
      ...state,
      error: Status.ERROR,
      isFetching: FetchStatus.FAILED,
      permissions: Status.RESET,
      message: {
        action: ActionType.PERMISSIONS,
        status: Status.ERROR,
        data: message[ActionType.PERMISSIONS[Status.ERROR]],
      },
    };
  },
  [Types.GET_TASK_ACTIVITY_PERMISSION]: (state, action) => {
    return {
      ...state,
      message: Status.INITIAL,
      isFetching: FetchStatus.START,
      taskActivityPermission: Status.RESET,
    };
  },

  [Types.GET_TASK_ACTIVITY_PERMISSION_SUCCESS]: (state, action) => {
    const { data } = action;
    return {
      ...state,
      message: Status.INITIAL,
      isFetching: FetchStatus.SUCCESS,
      taskActivityPermission: data,
    };
  },

  [Types.GET_TASK_ACTIVITY_PERMISSION_FAILURE]: (state, action) => {
    const message = new Message();
    return {
      ...state,
      isFetching: FetchStatus.FAILED,
      taskActivityPermission: Status.RESET,
      message: {
        action: ActionType.TASK_ACTIVITY_PERMISSION,
        status: Status.ERROR,
        data: message[ActionType.TASK_ACTIVITY_PERMISSION[Status.ERROR]],
      },
    };
  },
});
