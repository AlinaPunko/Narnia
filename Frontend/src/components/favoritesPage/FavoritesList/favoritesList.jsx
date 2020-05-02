import React from 'react';
import PropTypes from 'prop-types';

import { UserContext } from 'store/context/userContext';
import bookServices from 'services/bookService';
import favoritesServices from 'services/favoritesService';
import FavoriteListItem from 'components/favoritesPage/FavoriteListItem/favoriteListItem';
import PagingPanel from 'components/common/PagingPanel/pagingPanel';

import './favoritesList.scss';

export default class FavoritesList extends React.Component {
    static propTypes = {
        history: PropTypes.shape({
            length: PropTypes.number.isRequired,
            action: PropTypes.string.isRequired,
            location: PropTypes.shape({
                pathname: PropTypes.string.isRequired,
                search: PropTypes.string.isRequired,
                hash: PropTypes.string.isRequired,
                key: PropTypes.string.isRequired
            }),
            push: PropTypes.func.isRequired
        }).isRequired
    }

    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            currentPage: 1
        };
    }

    async componentDidMount() {
        const result = await favoritesServices.getItems(this.context.userId);
        const books = result.map(async (bookId) => {
            return bookServices.getById(bookId);
        });

        Promise.all(books).then((booksArray) => this.setState({ books: booksArray }));
    }

    selectPage = (event) => {
        if (this.state.currentPage !== Number(event.target.id)) {
            this.setState({
                currentPage: Number(event.target.id)
            });
        }
    }

    deleteItem = async (item) => {
        const { books } = this.state;
        await favoritesServices.deleteItem(this.context.userId, item);

        const deletedBook = books.find(
            (book) => book.id === item.id
        );

        books.splice(books.indexOf(deletedBook), 1);
        this.setState({ books });
    }

    renderBooks(currentBooks) {
        return currentBooks.map((book) => (<FavoriteListItem book={book} key={book.id} deleteItem={this.deleteItem} />));
    }

    render() {
        if (this.context.userId === '') {
            this.props.history.push('/login');
            return null;
        }
        const { books, currentPage } = this.state;

        const indexOfLastBook = currentPage * 5;
        const indexOfFirstBook = indexOfLastBook - 5;
        const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
        const pageNumbers = [];

        if (currentPage > 1) {
            pageNumbers.push(currentPage - 1);
        }

        pageNumbers.push(currentPage);
        if (currentPage < Math.ceil(books.length / 5)) {
            pageNumbers.push(currentPage + 1);
        }

        return (
            <div className="favorite-list">
                <div className="favorite-list__title">Your favorite books</div>
                <div className="favorite-list__books">
                    {this.renderBooks(currentBooks)}
                    {
                        books.length > 5
                        && (
                            <PagingPanel
                                pageNumbers={pageNumbers}
                                selectPage={this.selectPage}
                                collectionLength={books.length}
                            />
                        )
                    }
                </div>
            </div>
        );
    }
}
