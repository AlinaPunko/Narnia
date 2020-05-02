import actionTypes from 'store/actions/actionTypes';

export const addBooks = (books) => ({
    type: actionTypes.ADD_BOOKS,
    books
});

export const setFilter = (filter) => ({
    type: actionTypes.SET_FILTER,
    filter
});

export const setCategory = (category) => ({
    type: actionTypes.SET_CATEGORY,
    category
});

export const setFilterByName = (searchNameQuery) => ({
    type: actionTypes.SET_FILTER_BY_NAME,
    searchNameQuery
});

export const setFilterByAuthor = (searchAuthorQuery) => ({
    type: actionTypes.SET_FILTER_BY_AUTHOR,
    searchAuthorQuery
});
