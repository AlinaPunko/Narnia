import actionTypes from 'store/actions/actionTypes';

const books = (state = [], action) => {
    switch (action.type) {
        case actionTypes.ADD_BOOKS:
            return [
                ...state, ...action.books
            ];
        default:
            return state;
    }
};
export default books;
