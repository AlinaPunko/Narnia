import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/common/Icon/icon';

import './authorListItem.scss';
import minus from 'styles/icons/minus.svg';

export default class AuthorListItem extends React.Component {
    static propTypes = {
        author: PropTypes.string.isRequired,
        deleteAuthor: PropTypes.func.isRequired
    }


    deleteAuthor = () => {
        this.props.deleteAuthor(this.props.author);
    }

    render() {
        return (
            <li className="author-list-item">
                {this.props.author}
                <button type="button" className="author-list-item__delete-button" onClick={this.deleteAuthor}>
                    <Icon icon={minus} iconClassName="author-list-item__delete-button-icon" />
                </button>
            </li>
        );
    }
}
