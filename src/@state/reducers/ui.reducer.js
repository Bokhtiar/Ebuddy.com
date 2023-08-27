import { createActions, createReducer } from "reduxsauce";
import { FetchStatus, Status } from "../../@statics/Status";
import Logger from "../../Logger";
import { ActionType } from "../../@types";
import { Message } from "../../@statics/Message";

const { Types, Creators } = createActions({

    getSearchInput: ['input'],
    getSearchInputSuccess: ['data'],
    getSearchInputFailure: ['error'],

    setSearchInput: ['input'],

    setQuery: ['key', 'data'],

    getQuery: ['key'],
    getQuerySuccess: ['data'],
    getQueryFailure: ['error'],
    

}, { prefix: '@UI/' });
export { Types, Creators };

const initialState = {
    error: Status.INITIAL,
    searchText: Status.INITIAL,
    queries: Status.INITIAL,
    assigneeQuery: Status.INITIAL,
};

export default createReducer(initialState, {

    [Types.SET_QUERY]: (state, action) => {
        return;
    },
    [Types.GET_QUERY]: (state, action) => {
        return;
    },
    [Types.GET_QUERY_SUCCESS]: (state, action) => {
        return;
    },
    [Types.GET_QUERY_FAILURE]: (state, action) => {
        return;
    },

    [Types.SET_SEARCH_INPUT]: (state, action) => {
        const { input } = action;
        Logger("[Types.SET_SEARCH_INPUT]", input)
        return {
            ...state,
            error: Status.EMPTY,
            searchText: input,
        }
    },
    [Types.GET_SEARCH_INPUT]: (state, action) => {
        return {
            ...state,
            error: Status.EMPTY,
        }
    },

    [Types.GET_SEARCH_INPUT_SUCCESS]: (state, action) => {
        const { data } = action;
        return {
            ...state,
            error: Status.EMPTY,
            searchText: data,
        }
    },

    [Types.GET_SEARCH_INPUT_FAILURE]: (state, action) => {
        return {
            ...state,
            error: Status.ERROR,
            searchText: Status.RESET,
        }
    }
})