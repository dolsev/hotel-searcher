//initialState.jsx
export const initialState = {
    searchQuery: '',
    favouritesCount: 0,
    searchResults: [],
}

export const selectSearchQuery = state => state.searchQuery;
export const selectSearchResults = state => state.searchResults;

