import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { UserContext } from 'store/context/userContext';
import OpenDetailsPageButton from 'components/common/OpenDetailsPageButton/openDetailsPageButton';
import ShoppingCartCounter from 'components/common/ShoppingCartCounter/shoppingCartCounter';
import FavoriteButton from 'components/common/FavoriteButton/favoriteButton';
import Icon from 'components/common/Icon/icon';
import favoritesServices from 'services/favoritesService';
import favoriteItemHelper from 'helpers/favoriteItemHelper';
import urlHelper from 'helpers/urlHelper';
import routing from 'constants/routing';

import edit from 'styles/icons/edit.svg';
import './booksListItem.scss';

export default class BooksListItem extends React.Component {
    static propTypes = {
        book: PropTypes.shape({
            id: PropTypes.number.isRequired,
            image: PropTypes.string,
            authors: PropTypes.array.isRequired,
            name: PropTypes.string.isRequired,
            categories: PropTypes.array.isRequired,
            price: PropTypes.number.isRequired,
            pages: PropTypes.number,
            publishingYear: PropTypes.number
        }).isRequired
    };

    static contextType = UserContext;

    constructor(props, context) {
        super(props, context);
        this.state = { isFavorite: favoriteItemHelper.isFavorite(this.props.book, this.context.favoriteBooks) };
    }

    toggleFavoriteState = () => {
        this.state.isFavorite
            ? favoritesServices.deleteItem(this.props.book, this.context.userId)
            : favoritesServices.add(this.props.book, this.context.userId);
        this.setState({ isFavorite: !this.state.isFavorite });
    }

    render() {
        const { book } = this.props;
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
                    ({ role }) => (
                        <div className="books-list-item">
                            <img alt="book" src={book.image} className="books-list-item__image" />
                            <div className="books-list-item__information">
                                <div className="books-list-item__title">{book.name}</div>
                                <div className="books-list-item__authors">{authors.join(', ')}</div>
                                <div className="books-list-item__categories">{categories.join(', ')}</div>
                                <div className="books-list-item__price">{book.price} р.</div>
                                {role === 'admin'
                                    && (
                                        <Link to={urlHelper.getUrlWithParameter(routing.addBookPage.url, /:id/, book.id)}>
                                            <button type="button" className="books-list-item__button">
                                                <Icon icon={edit} iconClassName="books-list-item__button-icon" />
                                            </button>
                                        </Link>
                                    )}
                                <OpenDetailsPageButton bookId={book.id} className="books-list-item__open-details-page-button" />
                                <FavoriteButton book={book} className="books-list-item__favorite-button" />
                                <ShoppingCartCounter bookId={book.id} className="" />
                            </div>
                        </div>
                    )
                }
            </UserContext.Consumer>
        );
    }
}
