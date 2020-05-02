import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/common/Icon/icon';
import CategoryListItem from 'components/addBookPage/CategoryListItem/categoryListItem';

import plus from 'styles/icons/plus.svg';
import './addCategoryBlock.scss';

export default class AddCategoryBlock extends React.Component {
    static propTypes = {
        allCategories: PropTypes.array.isRequired,
        categories: PropTypes.array.isRequired,
        addCategory: PropTypes.func.isRequired,
        deleteCategory: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            currentCategory: 'Adventure'
        };
    }

    selectCategory = async (e) => {
        this.setState({ currentCategory: e.target.value });
    }

    createCategoryItems = () => {
        const items = [];
        this.props.allCategories.forEach((element) => {
            items.push(<option key={element.id} value={element.category}>{element.category}</option>);
        });
        return items;
    }

    renderCategories = () => {
        const categories = this.props.categories.map((item, index) => {
            return (
                <CategoryListItem key={index} category={item} deleteCategory={this.props.deleteCategory} />
            );
        });
        return categories;
    }

    addCategory = async () => {
        this.props.addCategory(this.state.currentCategory);
    }

    deleteCategory = async (category) => {
        this.props.deleteCategory(category);
    }

    render() {
        return (
            <section>
                <h2 className="add-category-block__header">Book's categories</h2>
                <div className="add-category-block__field">
                    <label className="add-category-block__field-title">Choose Category</label>
                    <div>
                        <select
                            label="Category"
                            name="category"

                            onChange={this.selectCategory}
                            className="add-category-block__field-input"
                        >
                            {this.createCategoryItems()}
                        </select>
                    </div>
                    <button type="button" className="add-category-block__add-button" onClick={this.addCategory}>
                        <Icon icon={plus} iconClassName="header__button-add-button-icon" />
                    </button>
                </div>
                <ul className="add-category-block__list">
                    {this.renderCategories()}
                </ul>
            </section>
        );
    }
}
