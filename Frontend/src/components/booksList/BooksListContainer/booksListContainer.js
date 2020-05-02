import { connect } from 'react-redux';
import { addBooks } from 'store/actions';
import BooksList from 'components/booksList/BooksList/booksList';

const arrayContainsArray = (superset, subset) => {
    if (subset.length === 0) {
        return true;
    }
    return subset.every((value) => {
        return (superset.indexOf(value) >= 0);
    });
};

const getFilteredBooks = (books, filter) => {
    return books.filter((book) => book.price <= filter.price
        && book.publishYear <= filter.publishingYear
        && book.pagesNumber <= filter.pages
        && book.name.toLowerCase().includes(filter.searchNameQuery.toLowerCase())
        && book.authors.join().toLowerCase().includes(filter.searchAuthorQuery.toLowerCase())
        && arrayContainsArray(book.categories, filter.categories));
};

const mapStateToProps = (state) => ({
    books: getFilteredBooks(state.books, state.filter)
});

const mapDispatchToProps = (dispatch) => ({
    addBooks: (result) => dispatch(addBooks(result))
});

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
