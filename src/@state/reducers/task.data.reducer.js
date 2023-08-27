import { createActions, createReducer } from "reduxsauce";
import { FetchStatus, Status } from "../../@statics/Status";

const { Types, Creators } = createActions({

    taskPriorityList: ['input'],
    taskPriorityListSuccess: ['data'],
    taskPriorityListFailure: ['error'],

}, { prefix: '@TaskData/' });

export { Types, Creators };

const initialState = {
    error: Status.INITIAL,
    isFetching: FetchStatus.INITIAL,
    taskPriorites: Status.INITIAL,
}

export default createReducer(initialState, {
    [Types.TASK_PRIORITY_LIST]: (state, action) => {
        return {
            ...state,
            isFetching: FetchStatus.START,
            taskPriorites: Status.RESET,
        }
    },
    [Types.TASK_PRIORITY_LIST_SUCCESS]: (state, action) => {
        return {

        }
    },
    [Types.TASK_PRIORITY_LIST_FAILURE]: (state, action) => {
        return {

        }
    },


})