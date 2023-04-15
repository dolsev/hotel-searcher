//actions.js

export const updateSearchQuery = (query) => ({
    type: 'UPDATE_SEARCH_QUERY',
    payload: query,
});

export const setSearchResults = (results) => ({
    type: 'SET_SEARCH_RESULTS',
    payload: results,
});
