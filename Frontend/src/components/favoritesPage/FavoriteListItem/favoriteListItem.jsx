import React from 'react';
import PropTypes from 'prop-types';

import ShoppingCartCounter from 'components/common/ShoppingCartCounter/shoppingCartCounter';
import OpenDetailsPageButton from 'components/common/OpenDetailsPageButton/openDetailsPageButton';

import './favoriteListItem.scss';

export default class FavoriteListItem extends React.PureComponent {
    static propTypes = {
        book: PropTypes.shape({
            id: PropTypes.number.isRequired,
            image: PropTypes.string,
            authors: PropTypes.array.isRequired,
            name: PropTypes.string.isRequired,
            categories: PropTypes.array.isRequired,
            price: PropTypes.number.isRequired,
            pagesNumber: PropTypes.number,
            publishYear: PropTypes.number
        }).isRequired,
        deleteItem: PropTypes.func.isRequired
    };

    deleteItem = () => {
        const { deleteItem } = this.props;
        deleteItem(this.props.book);
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
            <div className="favorite-list-item">
                <div>
                    <div className="favorite-list-item__title">{book.name}</div>
                    <div className="favorite-list-item__authors">{authors.join(', ')}</div>
                    <div className="favorite-list-item__categories">{categories.join(', ')}</div>
                    <div className="favorite-list-item__pages">Pages: {book.pagesNumber}</div>
                    <div className="favorite-list-item__publishing-year">Publishing year: {book.publishYear}</div>
                    <div className="favorite-list-item__price">Price: {book.price}</div>
                    <ShoppingCartCounter bookId={book.id} className="book-details-page__icon" />
                    <OpenDetailsPageButton bookId={book.id} className="favorite-list-item__open-details-page-button" />
                    <button type="button" className="favorite-list-item__remove-favorite-button" onClick={this.deleteItem}>Remove favorite</button>
                </div>
                <img alt="Item_image" className="favorite-list-item__image" src={book.image} />
            </div>
        );
    }
}
