import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { UserContext } from 'store/context/userContext';
import favoritesService from 'services/favoritesService';
import bookService from 'services/bookService';
import BooksListItem from 'components/booksList/BooksListItem/booksListItem';
import Icon from 'components/common/Icon/icon';

import preloader from 'styles/icons/preloader.svg';

import './booksList.scss';

class BooksList extends React.PureComponent {
    static propTypes = {
        books: PropTypes.array.isRequired,
        addBooks: PropTypes.func.isRequired
    };

    static contextType = UserContext;

    constructor(props, context) {
        super(props, context);

        this.bookPerPage = 12;
        this.state = {
            page: 1,
            isLoading: true,
            renderedBooks: this.bookPerPage
        };
        this.handleScroll = this.handleScroll.bind(this);
        this.loadFavoriteBooks = this.loadFavoriteBooks.bind(this);
    }

    async componentDidMount() {
        await this.loadFavoriteBooks();
        this.loadBooks();
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    async loadFavoriteBooks() {
        if (!this.context.userId) {
            return;
        }
        const favoriteBooks = await favoritesService.getItems(this.context.userId);
        this.context.setFavoriteBooks(favoriteBooks);
    }

    async loadBooks() {
        const result = await bookService.getAll();
        this.props.addBooks(result);
        this.setState({ isLoading: false });
    }

    handleScroll() {
        const lastBook = document.querySelector('.books-list > div:last-child');
        const lastBookOffset = lastBook.offsetTop + lastBook.clientHeight;
        const pageOffset = window.pageYOffset + window.innerHeight;
        if (pageOffset > lastBookOffset) {
            this.loadMore();
        }

        this.setState({ isLoading: false });
    }

    loadMore() {
        const { page, renderedBooks } = this.state;
        this.setState({
            isLoading: true,
            page: page + 1,
            renderedBooks: renderedBooks + this.bookPerPage
        });
    }

    renderBooks() {
        const displayedBooks = this.props.books.slice(0, this.state.renderedBooks);
        return displayedBooks.map((book) => (<BooksListItem book={book} key={book.id} />));
    }

    render() {
        return (
            <>
                <div className="books-list">
                    {
                        this.renderBooks()
                    }
                </div>
                {this.state.isLoading && (
                    <div className="books-list__preloader">
                        <Icon iconClassName="books-list__preloader-icon" icon={preloader} />
                    </div>
                )}
            </>
        );
    }
}

export default connect()(BooksList);
