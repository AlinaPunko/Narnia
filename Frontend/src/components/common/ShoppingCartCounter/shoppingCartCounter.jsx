import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import Icon from 'components/common/Icon/icon';
import localStorageHelper from 'helpers/localStorageHelper';
import { UserContext } from 'store/context/userContext';

import plus from 'styles/icons/plus.svg';
import minus from 'styles/icons/minus.svg';
import './shoppingCartCounter.scss';

export default class ShoppingCartCounter extends React.Component {
    static propTypes = {
        bookId: PropTypes.number.isRequired,
        className: PropTypes.string.isRequired
    }

    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            currentAmount: 0
        };
    }

    componentDidMount = () => {
        if (this.context.userId) {
            this.setState({
                currentAmount: localStorageHelper.getAmount({ userId: this.context.userId, bookId: this.props.bookId })
            });
        }
    }

    addToShoppingCart = () => {
        localStorageHelper.add({ userId: this.context.userId, bookId: this.props.bookId });
        this.setState({
            currentAmount: ++this.state.currentAmount
        });
    }

    removeFromShoppingCart = () => {
        if (this.state.currentAmount > 0) {
            localStorageHelper.deleteItem({ userId: this.context.userId, bookId: this.props.bookId });
            this.setState({
                currentAmount: --this.state.currentAmount
            });
        }
    }

    render() {
        if (!this.context.userId) {
            return null;
        }

        const IconClass = ClassNames('shopping-cart-counter__button-icon', this.props.className);
        return (
            <div className="shopping-cart-counter">
                <button type="button" className="shopping-cart-counter__button" onClick={this.removeFromShoppingCart}>
                    <Icon icon={minus} iconClassName={IconClass} />
                </button>
                <span className="shopping-cart-counter__value">
                    {this.state.currentAmount}
                </span>
                <button type="button" className="shopping-cart-counter__button" onClick={this.addToShoppingCart}>
                    <Icon icon={plus} iconClassName={IconClass} />
                </button>
            </div>
        );
    }
}
