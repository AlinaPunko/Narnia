import React from 'react';
import PropTypes from 'prop-types';

import { UserContext } from 'store/context/userContext';
import BooksSection from 'components/orderPage/BooksSection/booksSection';
import UserInfoSection from 'components/orderPage/UserInfoSection/userInfoSection';

import './orderPage.scss';

export default class OrderPage extends React.Component {
    static contextType = UserContext;

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
    }

    render() {
        if (this.context.userId === '') {
            this.props.history.push('/login');
            return null;
        }

        return (
            <div className="order-page">
                <h1 className="order-page__title">Order info</h1>
                <UserInfoSection />
                <BooksSection history={this.props.history} />
            </div>
        );
    }
}
