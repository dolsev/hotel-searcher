//reducers.js
import {initialState} from "./initialState";

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_SEARCH_QUERY':
            return {
                ...state,
                searchQuery: action.payload,
            };
        case 'SET_SEARCH_RESULTS':
            return {
                ...state,
                searchResults: action.payload,
            };
        default:
            return state;
    }
};
