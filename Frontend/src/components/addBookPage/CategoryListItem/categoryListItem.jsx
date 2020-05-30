import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/common/Icon/icon';

import './categoryListItem.scss';
import minus from 'styles/icons/minus.svg';

export default class CategoryListItem extends React.Component {
    static propTypes = {
        category: PropTypes.string.isRequired,
        deleteCategory: PropTypes.func.isRequired
    }


    deleteCategory = () => {
        this.props.deleteCategory(this.props.category);
    }

    render() {
        return (
            <li className="category-list-item">
                {this.props.category}
                <button type="button" className="category-list-item__delete-button" onClick={this.deleteCategory}>
                    <Icon icon={minus} iconClassName="category-list-item__delete-button-icon" />
                </button>
            </li>
        );
    }
}
