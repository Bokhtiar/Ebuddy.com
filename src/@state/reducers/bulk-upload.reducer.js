import { createActions, createReducer } from "reduxsauce";
import { FetchStatus, Status } from "../../@statics/Status";

const { Types, Creators } = createActions({

    projectBulkUpload: ['input'],
    projectBulkUploadSuccess: ['data'],
    projectBulkUploadFailure: ['error'],

    setProjectFilePath: ['input'],
    setMilestoneFilePath: ['input'],

    milestoneBulkUpload: ['input'],
    milestoneBulkUploadSuccess: ['data'],
    milestoneBulkUploadFailure: ['error'],

    resetAll: ['']

}, { prefix: '@BulkUpload/' });

export { Types, Creators };

const initialState = {
    isFetching: FetchStatus.INITIAL,
    error: Status.INITIAL,
    projectUploadMessages: Status.INITIAL,
    milestoneUploadMessages: Status.INITIAL,
    projectFilePath: Status.INITIAL,
    milestoneFilePath: Status.INITIAL,
};

export default createReducer(initialState, {

    [Types.SET_PROJECT_FILE_PATH]: (state, action) => {
        const { input } = action;
        return {
            ...state,
            projectFilePath: input,
        }
    },

    [Types.SET_MILESTONE_FILE_PATH]: (state, action) => {
        const { input } = action;
        return {
            ...state,
            milestoneFilePath: input,
        }
    },

    [Types.PROJECT_BULK_UPLOAD]: (state, action) => {
        // console.log('[PROJECT_BULK_UPLOAD]', action);
        return {
            ...state,
            isFetching: FetchStatus.START,
            error: Status.EMPTY,
        }
    },
    [Types.PROJECT_BULK_UPLOAD_SUCCESS]: (state, action) => {
        const { data: { response, message, status } } = action;
        const { config, data } = response;
        return {
            ...state,
            projectUploadMessages: data,
            isFetching: FetchStatus.SUCCESS,
            error: Status.SUCCESS,
        }
    },
    [Types.PROJECT_BULK_UPLOAD_FAILURE]: (state, action) => {
        // console.log(action);
        return {
            ...state,
            isFetching: FetchStatus.FAILED,
            error: Status.ERROR,
        }
    },

    [Types.MILESTONE_BULK_UPLOAD]: (state, action) => {
        return {
            ...state,
            isFetching: FetchStatus.START,
            error: Status.EMPTY,
        }
    },
    [Types.MILESTONE_BULK_UPLOAD_SUCCESS]: (state, action) => {
        const { data: { response, message, status } } = action;
        const { config, data } = response;
        // console.log(data,);
        return {
            ...state,
            milestoneUploadMessages: data,
            isFetching: FetchStatus.SUCCESS,
            error: Status.SUCCESS,
        }
    },
    [Types.MILESTONE_BULK_UPLOAD_FAILURE]: (state, action) => {
        return {
            ...state,
            isFetching: FetchStatus.FAILED,
            error: Status.ERROR,
        }
    },
    [Types.RESET_ALL]:(state,action)=> initialState
})