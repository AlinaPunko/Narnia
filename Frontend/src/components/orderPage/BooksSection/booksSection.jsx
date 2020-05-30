import React from 'react';
import PropTypes from 'prop-types';

import { UserContext } from 'store/context/userContext';
import redirectHelper from 'helpers/redirectHelper';
import localStorageHelper from 'helpers/localStorageHelper';
import bookService from 'services/bookService';
import orderService from 'services/orderService';

import './booksSection.scss';

export default class BooksSection extends React.Component {
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

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            totalPrice: 0
        };
    }

    static contextType = UserContext;

    componentDidMount = async () => {
        const { books } = localStorageHelper.getUserItems(this.context.userId);
        const result = [];

        for (const element of books) {
            const bookInfo = await bookService.getById(element.bookId);
            bookInfo.amount = element.amount;

            this.setState({
                totalPrice: this.state.totalPrice + bookInfo.price * bookInfo.amount
            });
            result.push(bookInfo);
        }

        this.setState({ books: result });
    }

    renderBooks = () => {
        const components = [];
        const { books } = this.state;

        books.forEach((element) => {
            const authors = [];
            element.authors.forEach((author) => {
                authors.push(author);
            });

            const categories = [];
            element.categories.forEach((category) => {
                categories.push(category);
            });

            components.push(
                <div className="books-section-list-item">
                    <div>
                        <div className="books-section-list-item__title">{element.name}</div>
                        <div className="books-section-list-item__authors">{authors.join(', ')}</div>
                        <div className="books-section-list-item__categories">{categories.join(', ')}</div>
                        <div className="books-section-list-item__pages">Pages: {element.pagesNumber}</div>
                        <div className="books-section-list-item__publishing-year">Publishing year: {element.publishYear}</div>
                        <div className="books-section-list-item__price">Price: {element.price}</div>
                        <div className="books-section-list-item__amount">Amount: {element.amount}</div>
                    </div>
                    <img alt="Item_image" className="books-section-list-item__image" src={element.image} />
                </div>
            );
        });

        return components;
    }

    saveOrder = async () => {
        const order = this.state;
        order.userId = this.context.userId;
        const result = await orderService.add(order);
        if (result) {
            alert('We received your order, the manager will call you as soon as possible');
            localStorageHelper.deleteUsersCart(this.context.userId);
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div className="books-section">
                {this.renderBooks()}
                <h2 className="books-section__total-price">Total price: {this.state.totalPrice}</h2>
                <button className="books-section__save-button" type="button" onClick={this.saveOrder}>Pay for order</button>
            </div>
        );
    }
}
