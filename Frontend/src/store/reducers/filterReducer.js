import actionTypes from 'store/actions/actionTypes';

const defaultState = {
    pages: 1000,
    publishingYear: 2020,
    price: 100,
    searchNameQuery: '',
    searchAuthorQuery: '',
    categories: []
};

const getNewCategories = (state, action) => {
    action.category.shouldInclude
        ? state.categories.push(action.category.category)
        : state.categories.splice(state.categories.indexOf(action.category.category), 1);
    return state.categories;
};

const filter = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.SET_FILTER:
            {
                return {
                    ...state,
                    [action.filter.type]: Number.parseInt(action.filter.value, 10)
                };
            }
        case actionTypes.SET_FILTER_BY_NAME:
            {
                return {
                    ...state,
                    searchNameQuery: action.searchNameQuery
                };
            }
        case actionTypes.SET_FILTER_BY_AUTHOR:
            {
                return {
                    ...state,
                    searchAuthorQuery: action.searchAuthorQuery
                };
            }
        case actionTypes.SET_CATEGORY: {
            return {
                ...state,
                categories: getNewCategories(state, action)
            };
        }
        default:
            return state;
    }
};

export default filter;
