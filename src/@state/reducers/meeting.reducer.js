import { createActions, createReducer } from "reduxsauce";
import { FetchStatus, Status } from "../../@statics/Status";

const { Types, Creators } = createActions({
    setMeetingAgenda: ['input'],
    removeMeetingAgenda: ['input'],
    getAgendaList: [''],
    getAgendaListSuccess: ['data'],
    getAgendaListFailure: ['error'],
}, { prefix: '@Meeting/' });

export { Types, Creators };

const initialState = {
    isFetching: FetchStatus.INITIAL,
    error: Status.INITIAL,
    agendaList: Status.INITIAL,
};

export default createReducer(initialState, {
    [Types.SET_MEETING_AGENDA]: (state, action) => {
        return {
            ...state,
        }
    },
    [Types.REMOVE_MEETING_AGENDA]: (state, action) => {
        return {
            ...state,
        }
    },
    [Types.GET_AGENDA_LIST]: (state, action) => {
        return {
            ...state,
        }
    },
    [Types.GET_AGENDA_LIST_SUCCESS]: (state, action) => {
        return {
            ...state,
        }
    },
    [Types.GET_AGENDA_LIST_FAILURE]: (state, action) => {
        return {
            ...state,
        }
    },
})