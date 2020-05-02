import { combineReducers } from 'redux';

import books from './booksReducer';
import filter from './filterReducer';

export default combineReducers({
    books,
    filter
});
