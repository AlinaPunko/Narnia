import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/common/Icon/icon';
import AuthorListItem from 'components/addBookPage/AuthorListItem/authorListItem';

import plus from 'styles/icons/plus.svg';
import './addAuthorBlock.scss';

export default class AddAuthorBlock extends React.Component {
    static propTypes = {
        allAuthors: PropTypes.array.isRequired,
        authors: PropTypes.array.isRequired,
        addAuthor: PropTypes.func.isRequired,
        deleteAuthor: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            currentAuthor: 'J.K. Rowling'
        };
    }


    selectAuthor = async (e) => {
        this.setState({ currentAuthor: e.target.value });
    }

    createAuthorItems = () => {
        const items = [];
        this.props.allAuthors.forEach((element) => {
            items.push(<option key={element.id} value={element.name}>{element.name}</option>);
        });
        return items;
    }

    renderAuthors = () => {
        const authors = this.props.authors.map((item, index) => {
            return (
                <AuthorListItem key={index} author={item} deleteAuthor={this.props.deleteAuthor} />
            );
        });
        return authors;
    }

    addAuthor = async () => {
        this.props.addAuthor(this.state.currentAuthor);
    }

    deleteAuthor = async (author) => {
        this.props.deleteAuthor(author);
    }

    render() {
        return (
            <section>
                <h2 className="add-author-block__header">Book's authors</h2>
                <div className="add-author-block__field">
                    <label className="add-author-block__field-title">Choose Author</label>
                    <div>
                        <select
                            label="Author"
                            name="author"
                            value={this.state.currentAuthor}
                            onChange={this.selectAuthor}
                            className="add-author-block__field-input"
                        >
                            {this.createAuthorItems()}
                        </select>
                    </div>
                    <button type="button" className="add-author-block__add-button" onClick={this.addAuthor}>
                        <Icon icon={plus} iconClassName="header__button-add-button-icon" />
                    </button>
                </div>
                <ul className="add-author-block__list">
                    {this.renderAuthors()}
                </ul>
            </section>
        );
    }
}
