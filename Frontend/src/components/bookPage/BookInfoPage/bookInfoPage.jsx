import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { UserContext } from 'store/context/userContext';
import ShoppingCartCounter from 'components/common/ShoppingCartCounter/shoppingCartCounter';
import Icon from 'components/common/Icon/icon';
import FavoriteButton from 'components/common/FavoriteButton/favoriteButton';
import CommentsSection from 'components/bookPage/CommentsSection/commentsSection';
import bookService from 'services/bookService';
import urlHelper from 'helpers/urlHelper';
import routing from 'constants/routing';

import edit from 'styles/icons/edit.svg';
import './bookInfoPage.scss';

export default class BookInfoPage extends React.PureComponent {
    static propTypes = {
        match: PropTypes.shape({
            path: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            isExact: PropTypes.bool.isRequired,
            params: PropTypes.shape({
                id: PropTypes.string.isRequired
            }).isRequired
        }).isRequired
    }

    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = { book: null };
        this.getBook(this.props.match.params.id);
    }

    async getBook(id) {
        const result = await bookService.getById(id);
        this.setState({ book: result });
    }

    render() {
        const { book } = this.state;

        if (!book) {
            return null;
        }

        const authors = [];
        book.authors.forEach((author) => {
            authors.push(author);
        });

        const categories = [];
        book.categories.forEach((category) => {
            categories.push(category);
        });

        return (
            <UserContext.Consumer>
                {
                    ({ userId, role }) => (
                        <div>
                            <section className="book-details-page">
                                <div className="book-details-page__content">
                                    <h1 className="book-details-page__title">{book.name}</h1>
                                    <div className="book-details-page__authors">{authors.join(', ')}</div>
                                    <div className="book-details-page__categories">{categories.join(', ')}</div>
                                    <div className="book-details-page__pages">Pages: {book.pagesNumber}</div>
                                    <div className="book-details-page__publishing-year">Publishing year: {book.publishYear}</div>
                                    <div className="book-details-page__price">Price: {book.price}</div>
                                    {role === 'admin'
                                        && (
                                            <Link to={urlHelper.getUrlWithParameter(routing.addBookPage.url, /:id/, this.props.match.params.id)}>
                                                <button type="button" className="book-details-page__button">
                                                    <Icon icon={edit} iconClassName="book-details-page__icon" />
                                                </button>
                                            </Link>
                                        )}
                                    <FavoriteButton book={book} className="book-details-page__button" />
                                    <ShoppingCartCounter bookId={book.id} className="book-details-page__icon" />
                                    <p className="book-details-page__description">{book.description}</p>
                                </div>
                                <img alt="Item_image" className="book-details-page__image" src={book.image} />
                            </section>
                            {
                                userId
                                && (
                                    <CommentsSection bookId={book.id} />
                                )
                            }
                        </div>
                    )
                }
            </UserContext.Consumer>
        );
    }
}
